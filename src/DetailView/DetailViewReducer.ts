export const detailViewReducer = (state, action) => {
    switch (action.type) {
      case 'togglePanel':
        return {
          ...state,
          addPanelExpanded: action.expanded
        };
        
      default:
        return state;
    }
};