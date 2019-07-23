import match from 'conditional-expression';
import * as Actions from "./OKRActionTypes";
import { ObjectiveService } from '../Objective/ObjectiveService';
import { Objective } from '../Objective/Objective';
import { AreaService } from '../Area/AreaService';
import { Area } from '../Area/Area';

export const applyMiddleware = dispatch => action =>
  dispatch(action) ||
  match(action.type)
    .equals(Actions.getObjectives).then(()=> {
        if (!action.payload.area) {
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
            })
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
    .equals(Actions.getAreas).then(() => {
        AreaService.instance.getAll().then((allAreas: Area[]) => {
            dispatch({
                type: Actions.getAreasSucceed,
                payload: allAreas
            });
        }, (error)=> {
            dispatch({
                type: Actions.getAreasFailed,
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
                type: Actions.editOKRFailed,
                error: error
            });
        });
    })
    .equals(Actions.createOKR).then(() => {
        ObjectiveService.instance.create(action.payload).then((created) => {
            dispatch({
                type: Actions.createOKRSucceed,
                payload: created
            });
        }, (error) => {
            dispatch({
                type: Actions.createOKRFailed,
                error: error
            });
        });
    })
    .else(null);