import { OKRDocument } from "./OKRDocument";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IExtensionDataService, IExtensionDataManager, IProjectPageService } from "azure-devops-extension-api";

export abstract class OKRDataService<T extends OKRDocument> {
    protected abstract getDataCollectionKey(additionalKey?: string): string;
    private dataManager: IExtensionDataManager;

    private async getDataManager(): Promise<IExtensionDataManager> {
        if (this.dataManager === undefined) {
            await SDK.ready();
            const accessToken = await SDK.getAccessToken();
            const dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
            this.dataManager = await dataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);
        }

        return this.dataManager;
    }

    private async getProjectKey(additionalKey?: string): Promise<string> {
        const projectKey = await OKRDataService.getProjectKey(this.getDataCollectionKey(additionalKey));
        return projectKey;
    }

    public static async getProjectKey(collection: string) {
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        const projectKey = `${project.id}-${collection}`;
        return projectKey;
    }

    public static async getProjectName(): Promise<string> {
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        return project.name;
    }

    public async getAll(additionalKey?: string): Promise<T[]> {
        const dataManager: IExtensionDataManager = await this.getDataManager();
        let documents = [];

        const projectKey = await this.getProjectKey(additionalKey);
        documents = await dataManager.getDocuments(projectKey) as T[];


        return documents;
    }

    public async create(object: T, additionalKey?: string): Promise<T> {
        const dataManager: IExtensionDataManager = await this.getDataManager();

        const projectKey = await this.getProjectKey(additionalKey);
        return await dataManager.createDocument(projectKey, object);
    }

    public async save(object: T, additionalKey?: string): Promise<T> {
        const dataManager: IExtensionDataManager = await this.getDataManager();

        const projectKey = await this.getProjectKey(additionalKey);
        return await dataManager.updateDocument(projectKey, object);
    }

    public async delete(filter: (document: T) => boolean, additionalKey?: string): Promise<void> {
        const dataManager: IExtensionDataManager = await this.getDataManager();
        const documents: T[] = await this.getAll(additionalKey);
        const filteredDocuments: T[] = documents.filter(filter);
        filteredDocuments.forEach(async document => {
            const projectKey = await this.getProjectKey(additionalKey);
            dataManager.deleteDocument(projectKey, document.id);
        });
    }
}