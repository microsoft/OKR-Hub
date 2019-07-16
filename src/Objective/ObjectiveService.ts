import { Objective } from "./Objective";
import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";
import { StatusType } from "azure-devops-ui/Status";

export class ObjectiveService {
    private static collectionKey = "objectives";

    public static async getObjectives(): Promise<Objective[]> {
        const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        const objectives = await dataService.getDocuments(this.collectionKey) as Objective[];
        return objectives;
    }

    public static async saveObjective(objective: Objective): Promise<Objective> {
        const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.updateDocument(this.collectionKey, objective);
    }

    public static async createObjectives(): Promise<Objective[]> {
        
    }

    public static async getObjectivesByAreaAndTimeFrame(area: string, timeFrame: string): Promise<Objective[]> {
        // TODO: Create collection and keys based on area and timeframe. Use mock data for now.
        return await [{
            "Id": "111",
            "AreaId": "1",
            "Name": "Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["Wendy"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.6,
            "KRs": [
                {
                    Id: "11",
                    Content: "KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1",
                    Status: "Success" as StatusType,
                    Comment: ""
                },
                {
                    Id: "12",
                    Content: "KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 ",
                    Status: "Warning" as StatusType,
                    Comment: ""
                },
                {
                    Id: "13",
                    Content: "KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3",
                    Status: "Failed" as StatusType,
                    Comment: ""
                }
            ],
            "WIT": [],
            "Status": "Warning" as StatusType,
            "Comments": [ ],
            "TimeFrame": "Q2"
        },
        {
            "Id": "222",
            "AreaId": "1",
            "Name": "Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["Wendy"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.2,
            "KRs": [
                {
                    Id: "21",
                    Content: "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test",
                    Status: "Success" as StatusType,
                    Comment: ""
                },
            ],
            "WIT": [],
            "Status": "Success" as StatusType,
            "Comments": [ ],
            "TimeFrame": "Q2"
        },
        {
            "Id": "333",
            "AreaId": "2",
            "Name": "Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["SBorg"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.2,
            "KRs": [
                {
                    Id: "31",
                    Content: "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test",
                    Status: "Failed" as StatusType,
                    Comment: ""
                },
            ],
            "WIT": [],
            "Status": "Failed" as StatusType,
            "Comments": [ ],
            "TimeFrame": "Q2"
        }];
    }
}
