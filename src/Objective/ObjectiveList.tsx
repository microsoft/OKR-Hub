import * as React from "react";
import { Objective } from "./Objective";
import { ObjectiveItem } from "./ObjectiveItem";

export interface IObjectiveListProps {
    objectives: Objective[];
}

export interface IObjectiveListState {
}

export class ObjectiveList extends React.Component<IObjectiveListProps, IObjectiveListState> {
    public render(): JSX.Element {
        return this.props.objectives ? this.renderList() : <div>Loading...</div>;
    }

    private renderList = (): JSX.Element => {
        return (
            <ul>
                {this.props.objectives.map(objective => {
                    return <li><ObjectiveItem objective={objective} /></li>
                })}
            </ul>
        );
    }
}