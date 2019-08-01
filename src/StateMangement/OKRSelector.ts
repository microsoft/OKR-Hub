import { OKRMainState } from './OKRState';
import { Objective } from '../Objective/Objective';
import { Area } from '../Area/Area';

export function getObjectivesForArea(state: OKRMainState, area: Area): Objective[] {
    return state.objectives.filter(objective => { return objective.AreaId === area.AreaId });
}