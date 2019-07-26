import * as React from "react";
import { Card } from "azure-devops-ui/Card";
import { SplitterElementPosition, Splitter } from "azure-devops-ui/Splitter";
import { Objective, KR } from "../Objective/Objective";

import "./DetailOKR.scss";
import { Button } from "azure-devops-ui/Button";
import { StateContext } from "../StateMangement/StateProvider";
import AddOrEditOKRPanel from "../OKRPanel/AddOrEditOKRPanel";
import { MutableStatusDropDown } from "../MutableStatusDropDown";
import produce from "immer";

export interface IDetailOKRProps {
    objective: Objective;
}

export interface IDetailOKRState {
    
}

export class DetailOKR extends React.Component<IDetailOKRProps, IDetailOKRState> {
    static contextType = StateContext; 

    public render(): JSX.Element {
        const [{editPanelExpandedKey}] = this.context;
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
              {editPanelExpandedKey === this.props.objective.id && <AddOrEditOKRPanel title={"Edit OKR"} objective={this.props.objective}/>}
            </div>
        );
    }

    private _renderObjective = () => {
        const [{}, actions] = this.context;
        return (
            <div className="objective-title">
                <h3 className="objective-name">{this.props.objective.Name}</h3>
                <Button iconProps={{ iconName: "Edit" }} onClick={() => {
                    actions.toggleEditPanel({ expandedKey: this.props.objective.id });
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
        const [{}, actions] = this.context;
        return (<div className="kr" key={"kr" + i}>
                    <MutableStatusDropDown value={kr.Status} onSelect={(newValue)=> {
                        actions.editKRStatus(produce(this.props.objective, draft => {
                            var found = draft.KRs.filter((x) => x.Id === kr.Id)[0];
                            found.Status = newValue;
                        }));
                    }}/>
                    <span className="kr-content">{kr.Content}</span>
                </div>);
    }
}