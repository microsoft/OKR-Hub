import produce from "immer";
import { isGuid, generateUID } from "VSS/Utils/String";

export const detailViewReducer = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'loadObjectives':
        draft.objectives = action.objectives;
        break;
      case 'togglePanel':
        draft.addPanelExpanded = action.expanded;
        break;
      case 'updateObjectiveName':
        draft.pendingObjective.Name = action.name;
        break;
      case 'addKR':
        if (!draft.pendingObjective.KRs) {
          draft.pendingObjective.KRs = [];
        }
        draft.pendingObjective.KRs.push({
          Id: generateUID(),
          Content: action.content,
          Status: action.status,
          Comment: action.comment
        });
        break;
      case 'removeKR':
        if (!draft.pendingObjective.KRs) {
          return;
        }
        draft.pendingObjective.KRs = draft.pendingObjective.KRs.filter((kr) => kr.Id !== action.id);
        break;
      case 'updateKRContent':
        if (!draft.pendingObjective.KRs) {
          return;
        }
        var kr = draft.pendingObjective.KRs.filter((kr) => kr.Id === action.id)[0];
        kr.Content = action.content;
        break;
      case 'updateKRStatus':
        if (!draft.pendingObjective.KRs) {
          return;
        }
        var kr = draft.pendingObjective.KRs.filter((kr) => kr.Id === action.id)[0];
        kr.Status = action.status;
      break;
      case 'createOKRSucceed':
        draft.objectives.push(draft.pendingObjective);
        draft.pendingObjective = {};
        draft.addPanelExpanded = false;
        break;
      case 'cancelCreation':
        draft.pendingObjective = {};
        draft.addPanelExpanded = false;
        break;
      case 'createOKRFailed':
        // Error message
        return state;
    }
  });
};