import * as React from "react";
import { Card } from "azure-devops-ui/Card";
import { SplitterElementPosition, Splitter } from "azure-devops-ui/Splitter";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { Objective, KR } from "../Objective/Objective";

import "./DetailOKR.scss";


export interface IDetailOKRProps {
    objective: Objective;
}

export interface IDetailOKRState {
    
}

export class DetailOKR extends React.Component<IDetailOKRProps, IDetailOKRState> {
    public render(): JSX.Element {
        return (
            <div className="kr-list-container">
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
            </div>
        );
    }

    private _renderObjective = () => {
        return (
           <h3>{this.props.objective.Name}</h3>
        );
    }

    private _renderKRs = () => {
        return (
            <>
                {this.props.objective.KRs.map(kr => {
                    return this._renderKR(kr)
                })}
             </>
        );
    }

    private _renderKR = (kr: KR) => {
        return (<div className="kr">
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