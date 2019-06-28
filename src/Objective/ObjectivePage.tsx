import * as React from "react";
import { ObjectiveService } from "./ObjectiveService";
import { Objective } from "./Objective";
import { ObjectiveList } from "./ObjectiveList";

export interface IObjectiveListProps {
}

export interface IObjectiveListState {
    objectives: Objective[];
}

export class ObjectivePage extends React.Component<IObjectiveListProps, IObjectiveListState> {
    public constructor() {
        super();

        this.state = {objectives: undefined};
    }

    public async componentDidMount() {
        const objectives = await ObjectiveService.getObjectives();
        this.setState({objectives: objectives});
    }

    public render() {
        return <ObjectiveList objectives={this.state.objectives} />
    }
}