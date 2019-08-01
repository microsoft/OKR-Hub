import React = require("react");
import { DetailOKR } from "./DetailOKR";
import { StateContext } from "../StateMangement/StateProvider";
import { Area } from "../Area/Area";
import { ObjectiveZeroData } from "./ObjectiveZeroData";
import { OKRMainState } from "../StateMangement/OKRState";
import { getObjectivesForArea } from "../StateMangement/OKRSelector";

export interface IDetailOKRListProps {
    area: Area;
    selectedTabId: string;
}

export class DetailOKRList extends React.Component<IDetailOKRListProps, {}> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const { selectedArea } = this.context.state as OKRMainState;
        const objectives = getObjectivesForArea(this.context.state, this.props.area); 

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
}