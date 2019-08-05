import { NavigationConstants } from "../OKRConstants";
import { Objective } from "../Objective/Objective";
import { Area } from "../Area/Area";

export interface OKRMainState {
    pageLocation: NavigationConstants;
    selectedArea: Area;
    objectives: Objective[];
    areas: Area[];
    error: Error;
    addPanelExpanded: boolean;
    editPanelExpandedKey: string;
    areaPanelExpanded: boolean; 
    settingsExpanded: boolean; 
    editCommentKey: string;
    projectName: string;
}