import { Objective } from "./Objective";
import { StatusType } from "azure-devops-ui/Status";
import { OKRDataService } from "../Data/OKRDataService";

export class ObjectiveService extends OKRDataService<Objective> {
    private static singleton: ObjectiveService;
    public static get instance(): ObjectiveService {
        if (this.singleton === undefined) {
            this.singleton = new ObjectiveService;
        }

        return this.singleton;
    }

    public getDataCollectionKey(): string {
        return "objectives"
    }

    public static async getObjectivesByAreaAndTimeFrame(area: string, timeFrame: string): Promise<Objective[]> {
        // TODO: Create collection and keys based on area and timeframe. Use mock data for now.
        return await [{
            "id": "hi",
            "ObjectiveId": "111",
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
                    Comment: "",
                    Progress: 0.9
                },
                {
                    Id: "12",
                    Content: "KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 KR2 ",
                    Status: "Warning" as StatusType,
                    Comment: "",
                    Progress: 0.5
                },
                {
                    Id: "13",
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
            "id": "hi",
            "ObjectiveId": "222",
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
            "id": "hi",
            "ObjectiveId": "333",
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
