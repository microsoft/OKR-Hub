import produce from "immer";
import * as Types from "./OKRActionTypes";
import { OKRMainState } from "../StateMangement/OKRState";
import { NavigationConstants } from "../OKRConstants";
import { Objective } from "../Objective/Objective";
import { Area } from "../Area/Area";
import { IdentityProvider } from "../Identity/IdentityProvider";
import { WorkItem } from "azure-devops-extension-api/WorkItemTracking";
import { object } from "prop-types";

export const initialState: OKRMainState = {
  pageLocation: NavigationConstants.AreaView,
  selectedArea: undefined,
  objectives: undefined,
  areas: undefined,
  timeFrames: undefined,
  error: undefined,
  addPanelExpanded: false,
  editPanelExpandedKey: undefined,
  areaPanelExpanded: false,
  editCommentKey: undefined,
  projectName: "",
  settingsExpanded: false,
  identityProvider: undefined,
  displayedTimeFrame: undefined,
  linkWorkItemExpandedKey: undefined,
  workItemsMap: undefined
}

export const reducer = (state: OKRMainState = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // NAVIGATION
      case Types.navigatePage:
        draft.selectedArea = action.payload.selectedArea ? action.payload.selectedArea : draft.selectedArea;
        draft.pageLocation = action.payload.pageLocation;
        break;
      case Types.updateSelectedArea:
        draft.selectedArea = action.payload.selectedArea;
        break;

      // TIME FRAMES
      case Types.getTimeFramesSucceed:
        draft.timeFrames = action.payload;
        draft.displayedTimeFrame = draft.timeFrames.find((tf) => { return tf.isCurrent });
        break;
      case Types.toggleTimeFrameSettings:
        draft.settingsExpanded = action.payload.expanded;
        break;
      case Types.editTimeFrameSucceed:
        draft.timeFrames = draft.timeFrames.map(tf => {
          return tf.id === action.payload.id ? action.payload : tf;
        });
        break;
      case Types.addTimeFrameSucceed:
        draft.timeFrames.push(action.payload);        
        break;

      // PROJECT NAME
      case Types.getProjectNameSucceed:
        draft.projectName = action.projectName;
        break;
      case Types.getProjectNameFailed:
        draft.error = action.error;
        break;

      // ERRORS
      case Types.setError:
        draft.error = action.payload.error;
        break;

      // AREAS
      case Types.getAreasSucceed:
        draft.areas = action.payload;
        draft.areas.sort((a, b) => {
          return a.Name.localeCompare(b.Name);
        });
        // If an area isn't already selected, set the first areas as the selected area	
        draft.selectedArea = draft.selectedArea ? draft.selectedArea : draft.areas[0];
        draft.identityProvider = new IdentityProvider();
        break;

      case Types.createFirstAreaSuccess:
        draft.areas.push(action.payload.area);
        draft.selectedArea = draft.areas[0];
        draft.areaPanelExpanded = false;

        draft.timeFrames.push(action.payload.timeFrame);
        draft.displayedTimeFrame = action.payload.timeFrame;
        break;

      case Types.toggleAreaPanel:
        draft.areaPanelExpanded = action.payload.expanded
        break;
      case Types.createAreaSucceed:
        draft.areas.push(action.payload);
        draft.areas.sort((a, b) => {
          return a.Name.localeCompare(b.Name);
        });
        draft.areaPanelExpanded = false;
        break;
      case Types.editAreaSucceed:
        draft.areas = draft.areas.map(a => {
          return a.id === action.payload.id ? action.payload : a;
        });
        draft.areaPanelExpanded = false;
        break;
      case Types.removeAreaSucceed:
        draft.areas = draft.areas.filter((area: Area) => {
          return area.id !== action.id;
        })
        break;

      // AREA FAILURES
      case Types.createAreaFailed:
        draft.error = action.error;
        draft.areaPanelExpanded = false;
        break;
      case Types.areaOperationFailed:
        draft.error = action.error;
        break;

      // OBJECTIVES
      case Types.getObjectivesSucceed:
        draft.objectives = action.payload;
        draft.objectives.sort((a, b) => {
          return a.order - b.order;
        });
        break;
      case Types.toggleAddPanel:
        draft.addPanelExpanded = action.payload.expanded;
        break;
      case Types.createOKRSucceed:
        draft.objectives.push(action.payload);
        draft.addPanelExpanded = false;
        break;
      case Types.toggleEditPanel:
        draft.editPanelExpandedKey = action.payload.expandedKey;
        break;
      case Types.toggleLinkPanel:
        draft.linkWorkItemExpandedKey = action.payload;
        break;
      case Types.editOKRSucceed:
        draft.objectives = draft.objectives.map(o => {
          return o.id === action.payload.id ? action.payload : o;
        });
        draft.editPanelExpandedKey = undefined;
        draft.editCommentKey = undefined;
        draft.linkWorkItemExpandedKey = undefined;
        break;
      case Types.cancelCreationOrEdit:
        draft.editPanelExpandedKey = undefined;
        draft.addPanelExpanded = false;
        draft.linkWorkItemExpandedKey = undefined;
        draft.workItemsMap = undefined;
        break;
      case Types.editKRComment:
        draft.editCommentKey = action.payload.id;
        break;
      case Types.removeOKRSucceed:
        draft.objectives = draft.objectives.filter((objective: Objective) => {
          return objective.id !== action.id;
        })
        break;

      //OBJECTIVE FAILURES
      case Types.objectiveOperationFailed:
        draft.error = action.error;
        draft.editPanelExpandedKey = undefined;
        draft.linkWorkItemExpandedKey = undefined;
        draft.addPanelExpanded = false;
        break;
      case Types.getObjectivesFailed:
        draft.objectives = [];
        draft.error = action.error;
        break;

      // WorkItems
      case Types.getWorkItemsSucceed:
        if (!draft.workItemsMap) {
          draft.workItemsMap = {};
        }
        action.workItems.forEach((workItem: WorkItem) => {
          draft.workItemsMap[workItem.id] = workItem;
        });
        break;
      case Types.addWorkItemsSucceed:
        if (!draft.workItemsMap) {
          draft.workItemsMap = {};
        }
        action.workItems.forEach((workItem: WorkItem) => {
          draft.workItemsMap[workItem.id] = workItem;
        });
        draft.objectives = draft.objectives.map(o => {
          return o.id === action.objective.id ? action.objective : o;
        });
        break;
      case Types.deleteWorkItemsSucceed:
        draft.objectives = draft.objectives.map(o => {
          return o.id === action.payload.id ? action.payload : o;
        });
        break;
      default:
        return state;
    }
  });
}