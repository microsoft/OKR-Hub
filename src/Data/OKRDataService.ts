import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";
import { OKRDocument } from "./OKRDocument";

export abstract class OKRDataService<T extends OKRDocument> {
    protected abstract getDataCollectionKey(): string;
    private extensionDataService: ExtensionDataService;

    private async getExtensionDataService(): Promise<ExtensionDataService> {
        if (this.extensionDataService === undefined) {
            this.extensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
        }

        return this.extensionDataService;
    }

    private getProjectKey(): string {
        const projectKey =  OKRDataService.getProjectKey(this.getDataCollectionKey());
        return projectKey;
    }

    public static getProjectKey(collection: string) {
        const projectKey = `${VSS.getWebContext().project.id}-${collection}`;
        return projectKey;
    }

    public async getAll(): Promise<T[]> {
        const dataService: ExtensionDataService = await this.getExtensionDataService();
        let documents = [];

        try {
            const projectKey = this.getProjectKey();
            documents = await dataService.getDocuments(projectKey) as T[];
        } catch (_) {
        }

        return documents;
    }

    public async create(object: T): Promise<T> {
        const dataService: ExtensionDataService = await this.getExtensionDataService();
        const projectKey = this.getProjectKey();
        return await dataService.createDocument(projectKey, object);
    }

    public async save(object: T): Promise<T> {
        const dataService: ExtensionDataService = await this.getExtensionDataService();
        const projectKey = this.getProjectKey();
        return await dataService.updateDocument(projectKey, object);
    }

    public async delete(filter: (document: T) => boolean): Promise<void> {
        const dataService: ExtensionDataService = await this.getExtensionDataService();
        const documents: T[] = await this.getAll();
        const filteredDocuments: T[] = documents.filter(filter);
        filteredDocuments.forEach(document => {
            dataService.deleteDocument(this.getProjectKey(), document.id);
        });
    }

    public async deleteAll(): Promise<void> {
        const dataService: ExtensionDataService = await this.getExtensionDataService();
        const documents = await this.getAll();
        documents.forEach(document => {
            dataService.deleteDocument(this.getProjectKey(), document.id);
        });
    }
}