import { Area } from "./Area";
import { OKRDataService } from "../Data/OKRDataService";

export class AreaService extends OKRDataService<Area> {
    private static singleton: AreaService;
    public static get instance(): AreaService {
        if (this.singleton === undefined) {
            this.singleton = new AreaService;
        }

        return this.singleton;
    }

    protected getDataCollectionKey(): string {
        return "areas";
    }
}