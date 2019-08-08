import * as Actions from "./OKRActionTypes";
import { ObjectiveService } from '../Objective/ObjectiveService';
import { Objective } from '../Objective/Objective';
import { AreaService } from '../Area/AreaService';
import { TimeFrameService } from '../TimeFrame/TimeFrameService';
import { Area } from '../Area/Area';
import { OKRDocument } from '../Data/OKRDocument';
import { OKRDataService } from '../Data/OKRDataService';
import { TimeFrame } from '../TimeFrame/TimeFrame';
import { WorkItemService } from "../Data/WorkItemService";
import { WorkItem } from "azure-devops-extension-api/WorkItemTracking";

export const applyMiddleware = dispatch => action =>
    dispatch(action) || runMiddleware(dispatch, action);

const runMiddleware = (dispatch, action) => {
    switch (action.type) {
        case Actions.getObjectives:
            ObjectiveService.instance.getAll().then((allObjectives: Objective[]) => {
                dispatch({
                    type: Actions.getObjectivesSucceed,
                    payload: allObjectives
                })
            }, (error) => {
                dispatch({
                    type: Actions.getObjectivesFailed,
                    error: error
                });
            });
            break;
        case Actions.getAreas:
            AreaService.instance.getAll().then((allAreas: Area[]) => {
                dispatch({
                    type: Actions.getAreasSucceed,
                    payload: allAreas
                });
            }, (error) => {
                dispatch({
                    type: Actions.areaOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.getTimeFrames:
            TimeFrameService.instance.getAll().then((allTimeFrames: TimeFrame[]) => {
                dispatch({
                    type: Actions.getTimeFramesSucceed,
                    payload: allTimeFrames
                });
            }, (error) => {
                dispatch({
                    type: "TODO",
                    error: error
                });
            });
            break;
        case Actions.addTimeFrame:
            TimeFrameService.instance.create(action.payload).then((created) => {
                dispatch({
                    type: Actions.addTimeFrameSucceed,
                    payload: created
                });
            }, (error) => {
                dispatch({
                    type: "TODO",
                    error: error
                });
            });
            break;
        case Actions.editTimeFrame:
            TimeFrameService.instance.save(action.payload).then((updated) => {
                dispatch({
                    type: Actions.editTimeFrameSucceed,
                    payload: updated
                });
            }, (error) => {
                dispatch({
                    type: "Todo",
                    error: error
                });
            });
            break;

        case Actions.getProjectName:
            OKRDataService.getProjectName().then((projectName: string) => {
                dispatch({
                    type: Actions.getProjectNameSucceed,
                    projectName: projectName
                });
            }, (error) => {
                dispatch({
                    type: Actions.getProjectNameFailed,
                    error: error
                });
            });
            break;
        case Actions.editOKR:
            ObjectiveService.instance.save(action.payload).then((updated) => {
                dispatch({
                    type: Actions.editOKRSucceed,
                    payload: updated
                });
            }, (error) => {
                dispatch({
                    type: Actions.objectiveOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.editKRStatus:
            ObjectiveService.instance.save(action.payload).then((updated) => {
                dispatch({
                    type: Actions.editOKRSucceed,
                    payload: updated
                });
            }, (error) => {
                dispatch({
                    type: Actions.objectiveOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.createOKR:
            const objectiveOrders = action.payload.objectives.map((value: Objective) => value.order);
            action.payload.data.order = Math.max(...objectiveOrders, 0) + 10;
            ObjectiveService.instance.create(action.payload.data).then((created) => {
                dispatch({
                    type: Actions.createOKRSucceed,
                    payload: created
                });
            }, (error) => {
                dispatch({
                    type: Actions.objectiveOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.createArea:
            const areasOrders = action.payload.areas.map((value: Area) => value.order);
            action.payload.data.order = Math.max(...areasOrders, 0) + 10;
            AreaService.instance.create(action.payload.data).then((created) => {
                dispatch({
                    type: Actions.createAreaSucceed,
                    payload: created
                });
            }, (error) => {
                dispatch({
                    type: Actions.createAreaFailed,
                    error: error
                });
            });
            break;
        case Actions.editArea:
            AreaService.instance.save(action.payload).then((updated) => {
                dispatch({
                    type: Actions.editAreaSucceed,
                    payload: updated
                });
            }, (error) => {
                dispatch({
                    type: Actions.areaOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.removeOKR:
            ObjectiveService.instance.delete((docuemnt: OKRDocument) => {
                return docuemnt.id === action.payload.id;
            }).then(() => {
                dispatch({
                    type: Actions.removeOKRSucceed,
                    id: action.payload.id
                });
            }, (error) => {
                dispatch({
                    type: Actions.objectiveOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.removeArea:
            AreaService.instance.delete((area: Area) => {
                return area.id === action.payload.id;
            }).then(() => {
                dispatch({
                    type: Actions.removeAreaSucceed,
                    id: action.payload.id
                });
                ObjectiveService.instance.delete((okr: Objective) => {
                    return okr.AreaId === action.payload.areaId;
                });
            }, (error) => {
                dispatch({
                    type: Actions.areaOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.getWorkItems:
            WorkItemService.getInstance().getWorkItems(action.payload).then((workItems: WorkItem[]) => {
                dispatch({
                    type: Actions.getWorkItemsSucceed,
                    workItems: workItems
                });
            },
                (error) => {
                    dispatch({
                        type: Actions.objectiveOperationFailed,
                        error: error
                    });
                });
            break;
        case Actions.addWorkItems:
            // TODO: validate the input ids.
            WorkItemService.getInstance().getWorkItems(action.payload.data.ids).then((workItems: WorkItem[]) => {
                var objective = action.payload.objectives.filter((objective: Objective) => {
                    return objective.id === action.payload.data.objectiveId;
                })[0];

                workItems.forEach((workItem: WorkItem) => {
                    if (objective.WorkItems === undefined) {
                        objective.WorkItems = [];
                    }
                    if (objective.WorkItems.indexOf(workItem.id) === -1) {
                        objective.WorkItems.push(workItem.id);
                    }
                });

                ObjectiveService.instance.save(objective).then((updated) => {
                    dispatch({
                        type: Actions.addWorkItemsSucceed,
                        workItems: workItems,
                        objective: updated
                    });
                }, (error) => {
                    dispatch({
                        type: Actions.objectiveOperationFailed,
                        error: error
                    });
                });
            }, (error) => {
                dispatch({
                    type: Actions.objectiveOperationFailed,
                    error: error
                });
            });
            break;
        case Actions.deleteWorkItems:
            var objective = action.payload.objectives.filter((objective: Objective) => {
                return objective.id === action.payload.data.objectiveId;
            })[0];
            objective.WorkItems = objective.WorkItems.filter((id: number) => {
                return id !== action.payload.data.id;
            });
            ObjectiveService.instance.save(objective).then((updated) => {
                dispatch({
                    type: Actions.deleteWorkItemsSucceed,
                    payload: updated
                });
            }, (error) => {
                dispatch({
                    type: Actions.objectiveOperationFailed,
                    error: error
                });
            });
            break;
    }
}