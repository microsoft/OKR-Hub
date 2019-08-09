import { WorkItemTrackingRestClient, WorkItem, WorkItemTrackingServiceIds, IWorkItemFormNavigationService } from "azure-devops-extension-api/WorkItemTracking";
import { getClient } from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk";

export class WorkItemService {
    private static _instance: WorkItemService;

    public static getInstance(): WorkItemService {
        if (!WorkItemService._instance) {
            WorkItemService._instance = new WorkItemService();
        }
        return WorkItemService._instance;
    }

    public async getWorkItems(ids: number[]): Promise<WorkItem[]> {
        await SDK.ready();
        const witHttpClient = getClient(WorkItemTrackingRestClient);
        const fields = ["System.Id","System.WorkItemType","System.Title", "System.TeamProject", "System.State"];
        return await witHttpClient.getWorkItems(ids, undefined, fields);
    }

    public async openWorkItem(id: number) {
        await SDK.ready();
        const navService = await SDK.getService<IWorkItemFormNavigationService>(WorkItemTrackingServiceIds.WorkItemFormNavigationService);
        navService.openWorkItem(id);
    }
}