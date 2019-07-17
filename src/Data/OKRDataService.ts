import { OKRDocument } from "./OKRDocument";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IExtensionDataService, IExtensionDataManager, IProjectPageService } from "azure-devops-extension-api"

export abstract class OKRDataService<T extends OKRDocument> {
    protected abstract getDataCollectionKey(): string;
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

    private async getProjectKey(): Promise<string> {
        const projectKey = await OKRDataService.getProjectKey(this.getDataCollectionKey());
        return projectKey;
    }

    public static async getProjectKey(collection: string) {
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        const projectKey = `${project.id}-${collection}`;
        return projectKey;
    }

    public async getAll(): Promise<T[]> {
        const dataManager: IExtensionDataManager = await this.getDataManager();
        let documents = [];
        try {

            const projectKey = await this.getProjectKey();
            documents = await dataManager.getDocuments(projectKey) as T[];
        } catch (_) {
        }

        return documents;
    }

    public async save(object: T): Promise<T> {
        const dataManager: IExtensionDataManager = await this.getDataManager();

        const projectKey = await this.getProjectKey();
        return await dataManager.updateDocument(projectKey, object);
    }

    public async delete(filter: (document: T) => boolean): Promise<void> {
        const dataManager: IExtensionDataManager = await this.getDataManager();
        const documents: T[] = await this.getAll();
        const filteredDocuments: T[] = documents.filter(filter);
        filteredDocuments.forEach(async document => {
            const projectKey = await this.getProjectKey();
            dataManager.deleteDocument(projectKey, document.id);
        });
    }

    public async deleteAll(): Promise<void> {
        const dataManager: IExtensionDataManager = await this.getDataManager();
        const documents = await this.getAll();
        documents.forEach(async document => {
            const projectKey = await this.getProjectKey();
            dataManager.deleteDocument(projectKey, document.id);
        });
    }
}