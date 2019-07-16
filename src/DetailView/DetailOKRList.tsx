import React = require("react");
import { Objective } from "../Objective/Objective";
import { DetailOKR } from "./DetailOKR";
import { ObjectiveService } from "../Objective/ObjectiveService";
import { StateContext } from "../StateProvider";

export interface IDetailOKRListProps {
    area: string;
    selectedTabId: string;
}

export class DetailOKRList extends React.Component<IDetailOKRListProps, {}> {
    static contextType = StateContext;
    
    public async componentDidMount() {
        // todo: HOOK WITH SERVICE
        
        //const [{}, dispatch] = this.context;
        //const objectives = await ObjectiveService.getObjectivesByAreaAndTimeFrame(this.props.area, this.props.selectedTabId);
        //dispatch({
        //    type: 'loadObjectives',
        //    objectives: objectives
        //  })
    }
    
    public render(): JSX.Element {
        const [{ objectives }] = this.context;
        return (<>
            {objectives.map(objective => <DetailOKR objective={objective} />)}
        </>);
    }
}