import * as React from "react";
import { IdentityPickerDropdown, IPeoplePickerProvider, IIdentity } from "azure-devops-ui/IdentityPicker";

export interface IAreaCardIdentityProps {
    ownerId: string;
    identityProvider: IPeoplePickerProvider;
    editMode: boolean;
}

export class AreaCardIdentity extends React.Component<IAreaCardIdentityProps> {
    public render = (): JSX.Element => {
        return <div className="area-identity">
            {this.props.editMode ? this.renderPicker() : this.renderStatic()}
        </div>;
    };

    private renderStatic = (): JSX.Element => {
        return <div>{this.props.ownerId}</div>;
    };

    private renderPicker = (): JSX.Element => {
        return <IdentityPickerDropdown
            onChange={this.onChange}
            pickerProvider={this.props.identityProvider}
            value={this.props.identityProvider.getEntityFromUniqueAttribute(this.props.ownerId) as IIdentity}
        />;
    };

    private onChange = (identity?: IIdentity) => {

    };
}