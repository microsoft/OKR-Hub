import produce from "immer";
import * as Actions from "./DetailViewActions";

export const detailViewReducer = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.navigatePage:
        draft.pageLocation = action.pageLocation;
        break;
      case Actions.updateArea:
        draft.area = action.area;
        break;
      case 'loadObjectives':
        draft.objectives = action.objectives;
        break;
      case 'togglePanel':
        draft.addPanelExpanded = action.expanded;
        break;
      case 'createOKRSucceed':
        draft.objectives.push(action.payload);
        draft.addPanelExpanded = false;
        break;
      case 'cancelCreation':
        draft.addPanelExpanded = false;
        break;
      case 'createOKRFailed':
        // Error message
        return state;
    }
  });
}