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
    public constructor(props: IObjectiveListProps, state: IObjectiveListState) {
        super(props, state);

        this.state = { objectives: undefined };
    }

    public async componentDidMount() {
        const objectives = await ObjectiveService.getObjectives();
        this.setState({ objectives: objectives });
    }

    public render() {
        return <ObjectiveList objectives={this.state.objectives} objectiveUpdated={this.objectiveUpdated} />;
    }

    private objectiveUpdated = async (updatedObjective: Objective) => {
        await ObjectiveService.saveObjective(updatedObjective);

        const updatedObjectives = this.state.objectives.map(objective => {
            if (objective.Id === updatedObjective.Id) {
                return updatedObjective;
            } else {
                return objective;
            }
        });

        this.setState({ objectives: updatedObjectives });
    };
}
