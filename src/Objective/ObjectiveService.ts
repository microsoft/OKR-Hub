import { Objective } from "./Objective";
import { OKRDataService } from "../Data/OKRDataService";
import { useEffect } from "react";
import { useStateValue } from "../StateProvider";
import * as Actions from "../DetailView//DetailViewActions";

export class ObjectiveService extends OKRDataService<Objective> {
    private static singleton: ObjectiveService;
    public static get instance(): ObjectiveService {
        if (this.singleton === undefined) {
            this.singleton = new ObjectiveService;
        }

        return this.singleton;
    }

    public getDataCollectionKey(): string {
        return "objectives";
    }

    public async getObjectivesByArea(area: string): Promise<Objective[]> {
        var all = await this.getAll();
        return all.filter(objective => objective.AreaId === area);
    }
}

export function useObjectives(): Objective[] {
    const [{ objectives }, setObjectives] = useStateValue();

    useEffect(() => {
        if (objectives.length === 0) {
            ObjectiveService.instance.getAll().then((allObjectives: Objective[]) => {
                setObjectives({
                    type: Actions.getObjectives,
                    objectives: allObjectives
                })
            })
        }
    });

    return objectives;
}

