import * as Actions from "./DetailViewActions";

export const detailViewReducer = (state, action) => {
  switch (action.type) {
    case Actions.navigatePage:
      return {
        ...state,
        pageLocation: action.pageLocation
      };
    case 'togglePanel':
      return {
        ...state,
        addPanelExpanded: action.expanded
      };
    case Actions.updateArea:
      return {
        ...state,
        area: action.area
      };
    default:
      return state;
  }
};