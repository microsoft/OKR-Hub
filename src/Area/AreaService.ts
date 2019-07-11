import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";
import { Area } from "./Area";

export class AreaService {
    private static collectionKey = "areas";

    public static async getAreas(): Promise<Area[]> {
        const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        let areas = [];

        try {
            areas = await dataService.getDocuments(this.collectionKey) as Area[];
        } catch(_) {
        }

        return areas;
    }

    public static async saveArea(area: Area): Promise<Area> {
        const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.updateDocument(this.collectionKey, area);
    }
}