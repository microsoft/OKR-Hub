import React = require("react");
import { Objective } from "../Objective/Objective";
import { DetailOKR } from "./DetailOKR";
import { ObjectiveService } from "../Objective/ObjectiveService";

export interface IDetailOKRListProps {
    area: string;
    selectedTabId: string;
}

export interface IDetailOKRListState {
    objectives: Objective[];
}

export class DetailOKRList extends React.Component<IDetailOKRListProps, IDetailOKRListState> {
    constructor() {
        super();
        this.state = {objectives: []}
    }

    public async componentDidMount() {
        const objectives = await ObjectiveService.getObjectivesByAreaAndTimeFrame(this.props.area, this.props.selectedTabId);
        this.setState({ objectives: objectives });
    }
    
    public render(): JSX.Element {
        return (<>
            {this.state.objectives.map(objective => <DetailOKR objective={objective} />)};
        </>);
    }
}