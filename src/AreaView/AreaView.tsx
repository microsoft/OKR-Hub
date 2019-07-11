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
        const areas = await AreaService.getAreas();
        const objectives = await ObjectiveService.getObjectives();

        const area1: Area = {
            Id: "1",
            Name: "Alpha",
            Description: "The first area",
            OwnerId: "1",
            Version: Date.now()
        };

        const area2: Area = {
            Id: "2",
            Name: "Beta",
            Description: "The second area",
            OwnerId: "2",
            Version: Date.now()
        };

        this.setState({
            areas: [area1, area2],
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