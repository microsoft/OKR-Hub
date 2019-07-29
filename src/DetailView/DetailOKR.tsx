import * as React from "react";
import { Card } from "azure-devops-ui/Card";
import { SplitterElementPosition, Splitter } from "azure-devops-ui/Splitter";
import { Objective, KR } from "../Objective/Objective";

import "./DetailOKR.scss";
import { Button } from "azure-devops-ui/Button";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import AddOrEditOKRPanel from "../OKRPanel/AddOrEditOKRPanel";
import { MutableStatusDropDown } from "../MutableStatusDropDown";
import { Icon } from "azure-devops-ui/Icon";
import produce from "immer";
import { KRComment } from "./KRComment";

export interface IDetailOKRProps {
    objective: Objective;
}

export class DetailOKR extends React.Component<IDetailOKRProps> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;
        return (
            <div className="okr-list-container">
              <Card>
                <Splitter
                    fixedElement={SplitterElementPosition.Near}
                    fixedSize={60}
                    splitterDirection={1}
                    farElementClassName="kr-list"
                    onRenderNearElement={this._renderObjective}
                    onRenderFarElement={this._renderKRs}
                    disabled={true}
                />
              </Card>
              {stateContext.state.editPanelExpandedKey === this.props.objective.id && <AddOrEditOKRPanel title={"Edit OKR"} objective={this.props.objective}/>}
            </div>
        );
    }

    private _renderObjective = () => {
        const stateContext = this.context as IOKRContext;
        return (
            <div className="objective-title">
                <h3 className="objective-name">{this.props.objective.Name}</h3>
                <Button iconProps={{ iconName: "Edit" }} onClick={() => {
                    stateContext.actions.toggleEditPanel({ expandedKey: this.props.objective.id });
                }} />
            </div>
        );
    }

    private _renderKRs = () => {
        return (
            <>
                {this.props.objective.KRs && this.props.objective.KRs.map((kr, i) => {
                    return this._renderKR(kr, i);
                })}
             </>
        );
    }

    private _renderKR = (kr: KR, i: number) => {
        const stateContext = this.context as IOKRContext;
        return (<div className="kr" key={"kr" + i}>
                    <div className="kr-render">
                        <MutableStatusDropDown value={kr.Status} onSelect={(newValue)=> {
                            stateContext.actions.editKRStatus(produce(this.props.objective, draft => {
                                var found = draft.KRs.filter((x) => x.Id === kr.Id)[0];
                                found.Status = newValue;
                            }));
                        }}/>
                        <div className="kr-content-container">
                            <span className={"kr-content"}>{kr.Content}</span>
                            <Icon iconName="Comment" onClick={()=> {
                                stateContext.actions.editKRComment({id: kr.Id});
                            }} tooltipProps={{text: "Edit Note"}}/>
                        </div>
                    </div>
                    <KRComment kr={kr} isEditMode={stateContext.state.editCommentKey === kr.Id} onCancel={()=> {
                            stateContext.actions.editKRComment({id: undefined});
                        }}
                        onSave={(newValue: string)=> {
                        stateContext.actions.editOKR(produce(this.props.objective, draft => {
                            var found = draft.KRs.filter((x) => x.Id === kr.Id)[0];
                            found.Comment = newValue;
                        }));
                    }}/>
                </div>);
    }
}