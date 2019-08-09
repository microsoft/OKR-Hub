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
    toggleSettings: (data: any) => {}; 
    editKRStatus: (data: any) => {};
    editKRComment: (data: any) => {};
    editArea: (data: any) => {};
    toggleAreaPanel: (data: any) => {};
    updateSelectedArea: (data: any) => {};
    createArea: (data: any) => {};
    createAreaFailed: (data: any) => {};
    setError: (data: any) => {};
    areaOperationFailed: (data: any) => {};
    objectivesOperationFailed: (data: any) => {};
    removeOKR: (data: any) => {};
    removeArea: (data: any) => {};
    getProjectName: (data: any) => {};
    getTimeFrames: (data: any) => {}; 
    addTimeFrames: (data: any) => {}; 
    editTimeFrame: (data: any) => {};
    editTimeFrameSucceed: (data: any) => {}; 
    toggleLinkWorkItemPanel: (data: string) => {};
    getWorkItems: (data: number[]) => {};
    addWorkItems: (data: {ids: string[]; objectiveId: string}) => {};
    deleteWorkItems: (data: {id: number; objectiveId: string}) => {};
    openWorkItem: (data: number) => {};
}

export const useActions = (state: OKRMainState, dispatch) => ({
    navigatePage: data => dispatch({ type: Actions.navigatePage, payload: data }),
    getObjectives: data => dispatch({ type: Actions.getObjectives, payload: data }),
    getAreas: data => dispatch({ type: Actions.getAreas, payload: data }),
    updateSelectedArea: data => dispatch({ type: Actions.updateSelectedArea, payload: data }),
    cancelCreationOrEdit: data => dispatch({ type: Actions.cancelCreationOrEdit, payload: data }),
    editOKR: data => dispatch({ type: Actions.editOKR, payload: data }),
    createOKR: data => dispatch({ type: Actions.createOKR, payload: { data: data, objectives: state.objectives }}),
    toggleAddPanel: data => dispatch({ type: Actions.toggleAddPanel, payload: data }),
    toggleEditPanel: data => dispatch({ type: Actions.toggleEditPanel, payload: data }),
    toggleSettings: data => dispatch({type: Actions.toggleSettings, payload: data}),
    editArea: data => dispatch({ type: Actions.editArea, payload: data }),
    editAreaSucceeded: data => dispatch({ type: Actions.editAreaSucceed, payload: data }),
    editKRStatus: data => dispatch({ type: Actions.editKRStatus, payload: data }),
    editKRComment: data => dispatch({ type: Actions.editKRComment, payload: data }),
    // Create Area
    createArea: data => dispatch({ type: Actions.createArea, payload: { data: data, areas: state.areas } }),
    createAreaSucceed: data => dispatch({ type: Actions.createAreaSucceed, payload: data }),
    createAreaFailed: data => dispatch({ type: Actions.createAreaFailed, payload: data }),
    toggleAreaPanel: data => dispatch({ type: Actions.toggleAreaPanel, payload: data }),
    setError: data => dispatch({ type: Actions.setError, payload: data }),
    areaOperationFailed: data => dispatch({ type: Actions.areaOperationFailed, payload: data }),
    objectivesOperationFailed: data => dispatch({ type: Actions.objectiveOperationFailed, payload: data }),    
    removeOKR: data => dispatch({ type: Actions.removeOKR, payload: data }),
    removeArea: data => dispatch({ type: Actions.removeArea, payload: data }),
    getProjectName: data => dispatch({ type: Actions.getProjectName, payload: data }),
    getTimeFrames: data => dispatch({type: Actions.getTimeFrames, payload: data}),
    addTimeFrames: data => dispatch({type: Actions.addTimeFrame, payload: data}),
    editTimeFrame: data => dispatch({type: Actions.editTimeFrame, payload: data}),
    editTimeFrameSucceed: data => dispatch({type: Actions.editTimeFrameSucceed, payload: data}),
    toggleLinkWorkItemPanel: data => dispatch({ type: Actions.toggleLinkPanel, payload: data }),
    getWorkItems: data => dispatch({type: Actions.getWorkItems, payload: data}),
    addWorkItems: data => dispatch({type: Actions.addWorkItems, payload: {data: data, objectives: state.objectives}}),
    deleteWorkItems: data => dispatch({type: Actions.deleteWorkItems, payload: {data: data, objectives: state.objectives}}),
    openWorkItem: data => dispatch({type: Actions.openWorkItem, payload: data})
} as IOKRActions); 
