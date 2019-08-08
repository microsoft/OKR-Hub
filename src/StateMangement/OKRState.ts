import { NavigationConstants } from "../OKRConstants";
import { Objective } from "../Objective/Objective";
import { Area } from "../Area/Area";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { TimeFrame } from "../TimeFrame/TimeFrame";

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
    identityProvider: IPeoplePickerProvider;
    timeFrames: TimeFrame[];
}