
import { OKRDataService } from "../Data/OKRDataService";
import { TimeFrame } from "./TimeFrame";

export class TimeFrameService extends OKRDataService<TimeFrame> {
    private static singleton: TimeFrameService;
    public static get instance(): TimeFrameService {
        if (this.singleton === undefined) {
            this.singleton = new TimeFrameService;
        }
        return this.singleton;
    }

    public getDataCollectionKey(): string {
        return "timeframe";
    }
}
