import React = require("react");
import { DetailOKR } from "./DetailOKR";
import { ObjectiveService } from "../Objective/ObjectiveService";
import { StateContext } from "../StateProvider";
import { Area } from "../Area/Area"; 
import * as Actions from "./DetailViewActions";

export interface IDetailOKRListProps {
    area: Area;
    selectedTabId: string;
}

export class DetailOKRList extends React.Component<IDetailOKRListProps, {}> {
    static contextType = StateContext;

    public componentDidMount() {
        if (this.props.area && this.props.area.AreaId !== "") {
            this.loadData(this.props.area.AreaId);
        }
    }
    
    public componentDidUpdate(prevProps: IDetailOKRListProps) {
        if (this.props.area !== prevProps.area) {
            this.loadData(this.props.area.AreaId);
        }
    }
    
    public render(): JSX.Element {
        const [{ objectives }] = this.context;
        return (<>
            {objectives.map((objective, index) => <DetailOKR objective={objective} key={index} />)}
        </>);
    }

    private loadData = (area: string) => {
        const [{}, dispatch] = this.context;
        ObjectiveService.instance.getObjectivesByArea(area).then((objectives)=> {
            dispatch({
                type: Actions.getObjectives,
                objectives: objectives
            });
        }, (error)=> {
            // TODO: Some error or zero day experience.
            dispatch({
                type: Actions.getObjectives,
                objectives: []
            });
        });
    }
}