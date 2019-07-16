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
            "Name": "Azure Boards is loved by engineering teams.",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["Wendy"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.6,
            "KRs": [
                {
                    Id: "11",
                    Content: "Increase NPS from 5% to 20%.",
                    Status: "Success" as StatusType,
                    Comment: "",
                    Progress: 0.9
                },
                {
                    Id: "12",
                    Content: "Produce a navigation design for Azure Boards that significantly reduces the % of “it’s confusing” comments in NPS (currently 36% of all Boards comments and 64% of all Boards detractors' comments).",
                    Status: "Warning" as StatusType,
                    Comment: "",
                    Progress: 0.5
                },
                {
                    Id: "13",
                    Content: "Achieve a 0.75 Apdex score for the Taskboard and Kanban board by rebuilding both experiences on the new platform.",
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
            "Name": "Azure Boards becomes the leading choice for teams using GitHub.",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["Wendy"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.2,
            "KRs": [
                {
                    Id: "21",
                    Content: "Deliver GitHub Enterprise integration in Azure DevOps Server 2019 RTW.",
                    Status: "Success" as StatusType,
                    Comment: "",
                    Progress: 0.9
                },
                {
                    Id: "22",
                    Content: "Deliver an Azure Boards app into the GitHub marketplace with 100+ installs.",
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
            "Name": "The Azure Boards service is optimized for engineering agility and service reliability.",
            "Version": new Date("2019-01-01 2pm"),
            "Owner": ["SBorg"],
            "Target": new Date("2019-07-31"),
            "Progress": 0.2,
            "KRs": [
                {
                    Id: "31",
                    Content: "Stand up an Azure Boards Service in devfabric and successfully run 100% of Azure DevOps L2 tests.",
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
