import { Objective } from "../Objective/Objective";

export interface IDetailViewState {
    pageLocation: string;
    area: string;
    timeFrame: string;
    addPanelExpanded: boolean;
    objectives: Objective[];
}