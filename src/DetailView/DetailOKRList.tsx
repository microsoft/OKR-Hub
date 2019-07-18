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

    public componentDidMount() {
        if (this.props.area !== "") {
            this.loadData(this.props.area);
        }
    }
    
    public componentDidUpdate(prevProps: IDetailOKRListProps) {
        if (this.props.area !== prevProps.area) {
            this.loadData(this.props.area);
        }
    }
    
    public render(): JSX.Element {
        const [{ objectives }] = this.context;
        return (<>
            {objectives.map(objective => <DetailOKR objective={objective} />)}
        </>);
    }

    private loadData = (area: string) => {
        const [{}, dispatch] = this.context;
        ObjectiveService.instance.getObjectivesByArea(area).then((objectives)=> {
            dispatch({
                type: 'loadObjectives',
                objectives: objectives
            });
        }, (error)=> {
            // TODO: Some error or zero day experience.
            dispatch({
                type: 'loadObjectives',
                objectives: []
            });
        });
    }
}