import match from 'conditional-expression';
import * as Actions from "./OKRActionTypes";
import { ObjectiveService } from '../Objective/ObjectiveService';
import { Objective } from '../Objective/Objective';
import { AreaService } from '../Area/AreaService';
import { TimeFrameService} from '../TimeFrame/TimeFrameService'; 
import { Area } from '../Area/Area';
import { OKRDocument } from '../Data/OKRDocument';
import { OKRDataService } from '../Data/OKRDataService';
import { TimeFrame } from '../TimeFrame/TimeFrame';

export const applyMiddleware = dispatch => action =>
  dispatch(action) ||
  match(action.type)
    .equals(Actions.getObjectives).then(()=> {
        if (!action.payload || !action.payload.area) {
            ObjectiveService.instance.getAll().then((allObjectives: Objective[]) => {
                dispatch({
                    type: Actions.getObjectivesSucceed,
                    payload: allObjectives
                })
            }, (error)=> {
                dispatch({
                    type: Actions.getObjectivesFailed,
                    error: error
                });
            });
        }
        else {
            ObjectiveService.instance.getObjectivesByArea(action.payload.area).then((objectives)=> {
                dispatch({
                    type: Actions.getObjectivesSucceed,
                    payload: objectives
                });
            }, (error)=> {
                dispatch({
                    type: Actions.getObjectivesFailed,
                    error: error
                });
            });
        }
    })
    .equals(Actions.getProjectName).then(() => {
        OKRDataService.getProjectName().then((projectName: string) => {
            dispatch({
                type: Actions.getProjectNameSucceed,
                projectName: projectName
            });
        }, (error)=> {
            dispatch({
                type: Actions.getProjectNameFailed,
                error: error
            });
        });
    })
    .equals(Actions.getAreas).then(() => {
        AreaService.instance.getAll().then((allAreas: Area[]) => {
            dispatch({
                type: Actions.getAreasSucceed,
                payload: allAreas
            });
        }, (error)=> {
            dispatch({
                type: Actions.areaOperationFailed,
                error: error
            });
        });
    })
    .equals(Actions.getTimeFrames).then(() => {
        TimeFrameService.instance.getAll().then((allTimeFrames: TimeFrame[]) => {
            dispatch({
                type: Actions.getTimeFramesSucceed,
                payload: allTimeFrames
            });
        }, (error)=> {
            dispatch({
                type: "TODO",
                error: error
            });
        });
    })
    .equals(Actions.addTimeFrame).then(() => {
        ObjectiveService.instance.create(action.payload.data).then((created) => {
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
    })
    .equals(Actions.editOKR).then(() => {
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
    })
    .equals(Actions.editKRStatus).then(() => {
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
    })
    .equals(Actions.createOKR).then(() => {
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
    })
    .equals(Actions.createArea).then(() => {
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
    })
    .equals(Actions.editArea).then(() => {
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
    })
    .equals(Actions.removeOKR).then(()=> {
        ObjectiveService.instance.delete((docuemnt: OKRDocument) => {
            return docuemnt.id === action.payload.id;
        }).then(()=> {
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
    })
    .equals(Actions.removeArea).then(()=> {
        AreaService.instance.delete((area: Area) => {
            return area.id === action.payload.id;
        }).then(()=> {
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
    })
    .else(null);