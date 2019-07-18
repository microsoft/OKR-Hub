import { Area } from "./Area";
import { OKRDataService } from "../Data/OKRDataService";
import { useStateValue } from "../StateProvider";
import { useEffect } from "react";
import * as Actions from "../DetailView//DetailViewActions";

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

export function useAreas(): Area[] {
    const [{ areas }, setAreas] = useStateValue();

    useEffect(() => {
        if (areas.length === 0) {
            AreaService.instance.getAll().then((allAreas: Area[]) => {
                setAreas({
                    type: Actions.getAreas,
                    areas: allAreas
                })
            });
        }
    });

    return areas;
}