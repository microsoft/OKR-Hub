import { Objective } from "./Objective";
import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";

export class ObjectiveService {
    public static async getObjectives(): Promise<Objective[]> {
        const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        const objectives = await dataService.getDocuments("objectives") as Objective[];
        return objectives;
    }
}