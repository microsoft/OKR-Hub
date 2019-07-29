
import * as Actions from "./OKRActionTypes";
import { OKRMainState } from "./OKRState";

export interface IOKRActions {
    // TODO: type the data.
    navigatePage: (data: any) => {};
    getObjectives: (data: any) => {};
    getAreas: (data: any) => {};
    cancelCreationOrEdit: (data: any) => {};
    editOKR: (data: any) => {};
    createOKR: (data: any) => {};
    toggleAddPanel: (data: any) => {};
    toggleEditPanel: (data: any) => {};
    editKRStatus: (data: any) => {};
    editKRComment: (data: any) => {};
    editArea: (data: any) => {};
    toggleAreaPanel: (data: any) => {};
    updateSelectedArea: (data: any) => {};
    createArea: (data: any) => {};
}
// TODO: type the data.
export const useActions = (state: OKRMainState, dispatch) => ({
    navigatePage: data => dispatch({ type: Actions.navigatePage, payload: data }),
    getObjectives: data => dispatch({ type: Actions.getObjectives, payload: data }),
    getAreas: data => dispatch({ type: Actions.getAreas, payload: data }),
    updateSelectedArea: data => dispatch({ type: Actions.updateSelectedArea, payload: data }),
    cancelCreationOrEdit: data => dispatch({ type: Actions.cancelCreationOrEdit, payload: data }),
    editOKR: data => dispatch({ type: Actions.editOKR, payload: data }),
    createOKR: data => dispatch({ type: Actions.createOKR, payload: data }),
    toggleAddPanel: data => dispatch({ type: Actions.toggleAddPanel, payload: data }),
    toggleEditPanel: data => dispatch({ type: Actions.toggleEditPanel, payload: data }),
    editArea: data => dispatch({ type: Actions.editArea, payload: data }),
    editAreaSucceeded: data => dispatch({ type: Actions.editAreaSucceed, payload: data }),
    editKRStatus: data => dispatch({type: Actions.editKRStatus, payload: data}),
    editKRComment: data => dispatch({type: Actions.editKRComment, payload: data}),
    // Create Area
    createArea: data => dispatch({type: Actions.createArea, payload: data}),
    createAreaSucceed: data => dispatch({type: Actions.createAreaSucceed, payload: data}),
    toggleAreaPanel: data => dispatch({ type: Actions.toggleAreaPanel, payload: data })
} as IOKRActions); 
