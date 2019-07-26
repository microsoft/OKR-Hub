import produce from "immer";
import * as Types from "./OKRActionTypes";
import { OKRMainState } from "../StateMangement/OKRState";
import { NavigationConstants } from "../OKRConstants";

export const initialState: OKRMainState = {
  pageLocation: NavigationConstants.DetailView,
  selectedArea: undefined,
  objectives: [],
  areas: [],
  error: "",
  addPanelExpanded: false,
  editPanelExpandedKey: undefined,
  areaPanelExpanded: false
};

export const reducer = (state: OKRMainState = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // Navigation
      case Types.navigatePage:
        draft.pageLocation = action.payload.pageLocation;
        break;
      case Types.updateSelectedArea:
        draft.selectedArea = action.payload.selectedArea;
        break;

      // Areas
      case Types.getAreasSucceed:
        draft.areas = action.payload;
        break;
      case Types.getAreasFailed:
        draft.error = action.error;
        break;
      case Types.toggleAreaPanel:
        draft.areaPanelExpanded = action.payload.expanded
        break;
      case Types.createAreaSucceed:
        draft.areas.push(action.payload)
        draft.areaPanelExpanded = false;
        break;

      // Objectives
      case Types.getObjectivesSucceed:
        draft.objectives = action.payload;
        break;
      case Types.getObjectivesFailed:
        draft.objectives = [];
        draft.error = action.error;
        break;
      case Types.toggleAddPanel:
        draft.addPanelExpanded = action.payload.expanded;
        break;
      case Types.createOKRSucceed:
        draft.objectives.push(action.payload);
        draft.addPanelExpanded = false;
        break;
      case Types.createOKRFailed:
        draft.error = action.error;
        break;
      case Types.toggleEditPanel:
        draft.editPanelExpandedKey = action.payload.expandedKey;
        break;
      case Types.editOKRSucceed:
        draft.objectives.map(o => {
          return o.id === action.payload.id ? action.payload : o;
        });
        draft.editPanelExpandedKey = undefined;
        break;
      case Types.editOKRFailed:
        draft.error = action.error;
        break;
      case Types.cancelCreationOrEdit:
        draft.editPanelExpandedKey = undefined;
        draft.addPanelExpanded = false;
        break;
      default:
        return state;
    }
  });
}