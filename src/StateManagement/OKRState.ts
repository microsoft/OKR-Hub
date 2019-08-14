import { NavigationConstants } from "../OKRConstants";
import { Objective } from "../Objective/Objective";
import { Area } from "../Area/Area";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { TimeFrame, TimeFrameSet } from "../TimeFrame/TimeFrame";
import { WorkItem } from "azure-devops-extension-api/WorkItemTracking";

export interface OKRMainState {
    pageLocation: NavigationConstants;
    selectedArea: Area;
    objectives: Objective[];
    areas: Area[];
    error: Error;
    addPanelExpanded: boolean;
    editPanelExpandedKey: string;
    linkWorkItemExpandedKey: string;
    areaPanelExpanded: boolean; 
    settingsExpanded: boolean; 
    editCommentKey: string;
    projectName: string;
    identityProvider: IPeoplePickerProvider;
    timeFrameInfo: TimeFrameSet;
    /** On first load this is our current time frame. 
     * If the user navigates to another time frame this is whatever is currently being displayed */
    displayedTimeFrame: TimeFrame;
    workItemsMap: {[key: number]: WorkItem};
}