import * as React from "react";
import { Card } from "azure-devops-ui/Card";
import { SplitterElementPosition, Splitter } from "azure-devops-ui/Splitter";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { Objective, KR } from "../Objective/Objective";

import "./DetailOKR.scss";
import { Button } from "azure-devops-ui/Button";
import { StateContext } from "../StateMangement/StateProvider";
import AddOrEditOKRPanel from "../OKRPanel/AddOrEditOKRPanel";

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
        return (<div className="kr" key={i}>
        <Status
            {...Statuses[kr.Status]}
            size={StatusSize.m}
            className="status-icon"
            />
        <span className="kr-content">{kr.Content}</span>
        {kr.Comment?<span className="kr-comment">{kr.Comment}</span>: null}
        </div>);
    }
}