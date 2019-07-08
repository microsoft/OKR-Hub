import { Objective } from "./Objective";
import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";
import { StatusType } from "azure-devops-ui/Status";

export class ObjectiveService {
    public static async getObjectives(): Promise<Objective[]> {
        const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        const objectives = await dataService.getDocuments("objectives") as Objective[];
        return objectives;
    }

    public static async saveObjective(objective: Objective): Promise<Objective> {
        const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.updateDocument("objectives", objective);
    }

    public static async getObjectivesByAreaAndTimeFrame(area: string, timeFrame: string): Promise<Objective[]> {
        // TODO: Create collection and keys based on area and timeframe. Use mock data for now.
        return await [{
            "Id": "111",
            "Name": "Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1 Obj1",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["Wendy"],
            "Area": ["Boards"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.6,
            "KRs": [
                {
                    Id: "11",
                    ObjectiveId: "111",
                    Content: "KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1 KR1",
                    Status: "Success" as StatusType,
                    Comment: "",
                    Progress: 0.9
                },
                {
                    Id: "12",
                    ObjectiveId: "111",
                    Content: "KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 ",
                    Status: "Warning" as StatusType,
                    Comment: "",
                    Progress: 0.5
                },
                {
                    Id: "13",
                    ObjectiveId: "111",
                    Content: "KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3 KR3",
                    Status: "Failed" as StatusType,
                    Comment: "",
                    Progress: 0.1
                }
            ],
            "WIT": [],
            "Status": "Warning" as StatusType,
            "Comments": [ ],
            "TimeFrame": "Q2"
        },
        {
            "Id": "222",
            "Name": "Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2 Obj2",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["Wendy"],
            "Area": ["Boards"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.2,
            "KRs": [
                {
                    Id: "21",
                    ObjectiveId: "222",
                    Content: "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test",
                    Status: "Success" as StatusType,
                    Comment: "",
                    Progress: 0.9
                },
            ],
            "WIT": [],
            "Status": "Success" as StatusType,
            "Comments": [ ],
            "TimeFrame": "Q2"
        },
        {
            "Id": "333",
            "Name": "Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3 Obj3",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["SBorg"],
            "Area": ["Boards"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.2,
            "KRs": [
                {
                    Id: "31",
                    ObjectiveId: "333",
                    Content: "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test",
                    Status: "Failed" as StatusType,
                    Comment: "",
                    Progress: 0.1
                },
            ],
            "WIT": [],
            "Status": "Failed" as StatusType,
            "Comments": [ ],
            "TimeFrame": "Q2"
        }];
    }
}
