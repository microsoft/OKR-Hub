import React = require("react");
import { DetailOKR } from "./DetailOKR";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { Area } from "../Area/Area"; 

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
        if (this.props.area.AreaId !== prevProps.area.AreaId) {
            this.loadData(this.props.area.AreaId);
        }
    }
    
    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;
        return (<>
            {stateContext.state.objectives.map((objective, index) => <DetailOKR objective={objective} key={"DetailOKR" + index} />)}
        </>);
    }

    private loadData = (area: string) => {
        const stateContext = this.context as IOKRContext;
        stateContext.actions.getObjectives({area: area})
    }
}