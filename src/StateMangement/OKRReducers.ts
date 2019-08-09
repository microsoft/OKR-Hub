import produce from "immer";
import * as Types from "./OKRActionTypes";
import { OKRMainState } from "../StateMangement/OKRState";
import { NavigationConstants } from "../OKRConstants";
import { Objective } from "../Objective/Objective";
import { Area } from "../Area/Area";
import { IdentityProvider } from "../Identity/IdentityProvider";

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
      case Types.initializeSucceed:
        draft.timeFrames = action.payload[0];
        // On first load, set the displayed time frame as the current time frame
        draft.displayedTimeFrame = draft.timeFrames && draft.timeFrames.length > 0 ? draft.timeFrames.find((tf) => { return tf.isCurrent }) : undefined;

        draft.areas = action.payload[1];
        draft.areas.sort((a, b) => {
          return a.Name.localeCompare(b.Name);
        });
        // If an area isn't already selected, set the first areas as the selected area
        draft.selectedArea = draft.selectedArea ? draft.selectedArea : draft.areas[0];
        draft.identityProvider = new IdentityProvider();
        break;
      case Types.initializeWithZeroData:
        draft.timeFrames = action.payload[0];
        // On first load, set the displayed time frame as the current time frame
        draft.displayedTimeFrame = draft.timeFrames && draft.timeFrames.length > 0 ? draft.timeFrames.find((tf) => { return tf.isCurrent }) : undefined;

        draft.areas = action.payload[1] ? action.payload[1] : [];
        draft.selectedArea = draft.areas[0];
        draft.identityProvider = new IdentityProvider();
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
      case Types.toggleAreaPanel:
        draft.areaPanelExpanded = action.payload.expanded
        break;
      case Types.createAreaSucceed:
        draft.areas.push(action.payload);
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
      case Types.editOKRSucceed:
        draft.objectives = draft.objectives.map(o => {
          return o.id === action.payload.id ? action.payload : o;
        });
        draft.editPanelExpandedKey = undefined;
        draft.editCommentKey = undefined;
        break;
      case Types.cancelCreationOrEdit:
        draft.editPanelExpandedKey = undefined;
        draft.addPanelExpanded = false;
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
        draft.addPanelExpanded = false;
        break;
      case Types.getObjectivesFailed:
        draft.objectives = [];
        draft.error = action.error;
        break;

      default:
        return state;
    }
  });
}