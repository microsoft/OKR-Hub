import produce from "immer";
import * as Types from "./OKRActionTypes";
import { OKRMainState } from "../StateMangement/OKRState";
import { NavigationConstants } from "../OKRConstants";
import { Objective } from "../Objective/Objective";
import { Area } from "../Area/Area";
import { IdentityPicker } from "azure-devops-ui/IdentityPicker";
import { IdentityProvider } from "../Identity/IdentityProvider";

export const initialState: OKRMainState = {
  pageLocation: NavigationConstants.AreaView,
  selectedArea: undefined,
  objectives: undefined,
  areas: undefined,
  error: undefined,
  addPanelExpanded: false,
  editPanelExpandedKey: undefined,
  areaPanelExpanded: false,
  editCommentKey: undefined,
  projectName: "",
  identityProvider: undefined
}

export const reducer = (state: OKRMainState = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // Navigation
      case Types.navigatePage:
        draft.selectedArea = action.payload.selectedArea ? action.payload.selectedArea : draft.selectedArea;
        draft.pageLocation = action.payload.pageLocation;
        break;
      case Types.updateSelectedArea:
        draft.selectedArea = action.payload.selectedArea;
        break;
      case Types.getProjectNameSucceed:
        draft.projectName = action.projectName;
        break;
      case Types.getProjectNameFailed:
        draft.error = action.error;
        break;

      // Error
      case Types.setError:
        draft.error = action.payload.error;
        break;

      // Areas
      case Types.getAreasSucceed:
        draft.areas = action.payload;
        draft.areas.sort((a, b) => {
          return a.order - b.order;
        });
        // If an area isn't already selected, set the first areas as the selected area
        draft.selectedArea = draft.selectedArea ? draft.selectedArea : draft.areas[0];
        draft.identityProvider = new IdentityProvider();
        break;
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

      // Area failures
      case Types.createAreaFailed:
        draft.error = action.error;
        draft.areaPanelExpanded = false;
        break;
      case Types.areaOperationFailed:
        draft.error = action.error;
        break;

      // Objectives
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

      //Objective failures
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