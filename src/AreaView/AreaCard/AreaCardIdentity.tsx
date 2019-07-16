import * as React from "react";
import { IdentityPickerDropdown, IPeoplePickerProvider, IIdentity } from "azure-devops-ui/IdentityPicker";

export interface IAreaCardIdentityProps {
    ownerId: string;
	identityProvider: IPeoplePickerProvider;
}

export class AreaCardIdentity extends React.Component<IAreaCardIdentityProps> {
	public render = (): JSX.Element => {
        return <div className="area-identity">
            <IdentityPickerDropdown
                onChange={this.onChange}
                pickerProvider={this.props.identityProvider}
                value={this.props.identityProvider.getEntityFromUniqueAttribute(this.props.ownerId) as IIdentity}
            />
        </div>;
    };

	private onChange = (identity?: IIdentity) => {

    };
}