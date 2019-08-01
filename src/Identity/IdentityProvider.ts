import { IIdentity, IPersonaConnections, IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { IdentityServiceIds, IVssIdentityService }from "azure-devops-extension-api/Identities";
import * as SDK from "azure-devops-extension-sdk";

export class IdentityProvider implements IPeoplePickerProvider {
	public getEntityFromUniqueAttribute = async (entityId: string): Promise<IIdentity> => {
		const service = await SDK.getService<IVssIdentityService>(IdentityServiceIds.IdentityService);
		const identities = await service.searchIdentitiesAsync(entityId, ["user"], ["ims", "source"], "uid");
		return await identities[0];
	};

	public onFilterIdentities = async (filter: string, selectedItems?: IIdentity[]): Promise<IIdentity[]> => {
		const service = await SDK.getService<IVssIdentityService>(IdentityServiceIds.IdentityService);
		const identities = await service.searchIdentitiesAsync(filter, ["user"], ["ims", "source"]);
		return identities;
	};

	public onRequestConnectionInformation = (entity: IIdentity, getDirectReports?: boolean): IPersonaConnections => {
		return { directReports: [] };
	};
}