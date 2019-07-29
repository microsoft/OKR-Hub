import * as React from "react";
import { IdentityPickerDropdown, IPeoplePickerProvider, IIdentity } from "azure-devops-ui/IdentityPicker";
import { useAreaCardValue } from "./Provider/AreaCardProvider";

export interface IAreaCardIdentityProps {
    identityProvider: IPeoplePickerProvider;
    ownerId: string;
}

export const AreaCardIdentity: React.FunctionComponent<IAreaCardIdentityProps> = props => {
    const { identityProvider, ownerId } = props;
    const [{editMode}] = useAreaCardValue();
    
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