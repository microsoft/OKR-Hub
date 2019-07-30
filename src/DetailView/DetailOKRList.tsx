import React = require("react");
import { DetailOKR } from "./DetailOKR";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { Area } from "../Area/Area";
import { ObjectiveZeroData } from "./ObjectiveZeroData";
import { OKRMainState } from "../StateMangement/OKRState";

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
        const { objectives, selectedArea } = this.context.state as OKRMainState;
        if (objectives && objectives.length > 0) {
            return (<>
                {objectives.map((objective, index) => <DetailOKR objective={objective} key={"DetailOKR" + index} />)}
            </>);
        }
        else {
            const areaName = selectedArea ? selectedArea.Name : "";
            return <ObjectiveZeroData areaName={areaName} />
        }
    }

    private loadData = (area: string) => {
        const stateContext = this.context as IOKRContext;
        stateContext.actions.getObjectives({ area: area })
        
        return (<>
            {stateContext.state.objectives.map((objective, index) => <DetailOKR objective={objective} key={"DetailOKR" + index} />)}
        </>);
    }
}