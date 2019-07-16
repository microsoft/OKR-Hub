import { Objective } from "../Objective/Objective";

export interface IDetailViewState {
    area: string;
    timeFrame: string;
    addPanelExpanded: boolean;
    objectives: Objective[];
}