import * as React from "react";
import { IPeoplePickerProvider, IIdentity, IdentityPickerDropdown } from "azure-devops-ui/IdentityPicker";

export interface IAreaCardIdentityProps {
    identityProvider: IPeoplePickerProvider;
    ownerId: string;
    editMode: boolean;
}

export const AreaCardIdentity: React.FunctionComponent<IAreaCardIdentityProps> = props => {
    const { identityProvider, ownerId, editMode } = props;

    return <div className="area-identity">
        {editMode ? renderPicker(identityProvider, ownerId) : renderStatic(ownerId)}
    </div>;
};

function renderStatic(ownerId): JSX.Element {
    return <div>{ownerId}</div>;
};

function renderPicker(identityProvider: IPeoplePickerProvider, ownerId: string): JSX.Element {
    return <IdentityPickerDropdown
        onChange={onChange}
        pickerProvider={identityProvider}
        value={identityProvider.getEntityFromUniqueAttribute(ownerId) as IIdentity}
    />;
};

function onChange(identity?: IIdentity) {

};