import { IIdentity, IPersonaConnections, IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { IdentityServiceIds, IVssIdentityService }from "azure-devops-extension-api/Identities";
import * as SDK from "azure-devops-extension-sdk";

export class IdentityProvider implements IPeoplePickerProvider {
	private identities: IIdentity[];

	private async getIdentities(): Promise<IIdentity[]> {
		if (!this.identities) {
			this.identities = [
				this.createSampleIdentity("1", "Alice"),
				this.createSampleIdentity("2", "Bob"),
			];
		}

		return this.identities;
	}

	public getEntityFromUniqueAttribute = async (entityId: string): Promise<IIdentity> => {
		const service = await SDK.getService<IVssIdentityService>(IdentityServiceIds.IdentityService);
		const identities = await service.searchIdentitiesAsync(entityId, ["user"], ["ims", "source"]);
		return await identities[0];
	};

	public onFilterIdentities = async (filter: string, selectedItems?: IIdentity[]): Promise<IIdentity[]> => {
		const service = await SDK.getService<IVssIdentityService>(IdentityServiceIds.IdentityService);
		const identities = await service.searchIdentitiesAsync(filter, ["user"], ["ims", "source"]);
		return identities;
	};

	/*
	public getEntityFromUniqueAttribute = async (entityId: string): Promise<IIdentity> => {
		const coreClient = getClient();
		const location = await coreClient._beginGetLocation(CommonIdentityPickerResourceIds.ServiceArea, CommonIdentityPickerResourceIds.IdentitiesLocationId);
		const identityClient = new CommonIdentityPickerHttpClient(location.area);
		const response = await identityClient.beginGetIdentities({ query: "mipatera", identityTypes: ["user"], operationScopes: ["ims"]});
		const entities: IEntity[] = response.results[0].identities;
		return entities.find(entity => entity.entityId === entityId);
	};

	public onFilterIdentities = async (filter: string, selectedItems?: IIdentity[]): Promise<IIdentity[]> => {
		const coreClient = getClient();
		const location = await coreClient._beginGetLocation(CommonIdentityPickerResourceIds.ServiceArea, CommonIdentityPickerResourceIds.IdentitiesLocationId);
		const identityClient = new CommonIdentityPickerHttpClient(location.area);
		const response = await identityClient.beginGetIdentities({ query: "mipatera", identityTypes: ["user"], operationScopes: ["ims"]});
		const entities: IEntity[] = response.results[0].identities;

		return entities;
	};
	*/

	private createSampleIdentity(id: string, displayName: string) {
		return {
			displayName,
			entityId: id,
			entityType: "user",
			mail: `${displayName}@email.com`,
			originDirectory: "aad",
			originId: "",
			physicalDeliveryOfficeName: "1 Microsoft",
			telephoneNumber: "555-555-5555",
		} as IIdentity;
	}

	public onRequestConnectionInformation = (entity: IIdentity, getDirectReports?: boolean): IPersonaConnections => {
		return { directReports: [] };
	};
}