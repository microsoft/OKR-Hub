import * as React from "react";
import { Area } from "../Area/Area";
import { AreaGrid } from "./AreaGrid";
import { AreaService } from "../Area/AreaService";
import { ObjectiveService } from "../Objective/ObjectiveService";
import { Objective } from "../Objective/Objective";

interface IAreaViewState {
    areas: Area[];
    objectives: Objective[];
}

export class AreaView extends React.Component<{}, IAreaViewState> {
    public constructor(props) {
        super(props);

        this.state = {
            areas: undefined,
            objectives: undefined
        };
    }
    
    public async componentDidMount() {
        const areas = await AreaService.instance.getAll();
        const objectives = await ObjectiveService.instance.getAll();

        this.setState({
            areas,
            objectives
        });
    }

    public render(): JSX.Element {
        let content = <div>Loading...</div>;

        if (this.state.areas) {
            content = <AreaGrid areas={this.state.areas} objectives={this.state.objectives} />;
        }

        return content;
    }
}