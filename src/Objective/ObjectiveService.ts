import { Objective } from "./Objective";
import { OKRDataService } from "../Data/OKRDataService";

export class ObjectiveService extends OKRDataService<Objective> {
    private static singleton: ObjectiveService;
    public static get instance(): ObjectiveService {
        if (this.singleton === undefined) {
            this.singleton = new ObjectiveService;
        }

        return this.singleton;
    }

    public getDataCollectionKey(timeFrameId: string): string {
        return "objectives" + timeFrameId;
    }

    public async getObjectivesByArea(area: string): Promise<Objective[]> {
        var all = await this.getAll();
        return all.filter(objective => objective.AreaId === area);
    }
}
