import { IIdentity, IPersonaConnections, IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";

export class IdentityProvider implements IPeoplePickerProvider {
	private identities: IIdentity[];

	private getIdentities() {
		if (!this.identities) {
			this.identities = [
				this.createSampleIdentity("1", "Alice"),
				this.createSampleIdentity("2", "Bob"),
			];
		}

		return this.identities;
	}

	public getEntityFromUniqueAttribute = (entityId: string): IIdentity => {
		return this.getIdentities().find(identity => identity.entityId === entityId);
	};

	public onFilterIdentities = (filter: string, selectedItems?: IIdentity[]): IIdentity[] => {
		return this.getIdentities();
	};

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