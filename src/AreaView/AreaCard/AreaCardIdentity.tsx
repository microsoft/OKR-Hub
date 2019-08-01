import * as React from "react";
import { IPeoplePickerProvider, IIdentity, IdentityPickerDropdown } from "azure-devops-ui/IdentityPicker";
import { Area } from "../../Area/Area";

export interface IAreaCardIdentityProps {
    area: Area;
    identityProvider: IPeoplePickerProvider;
    editMode: boolean;
    updateDraftOwner: (udpatedOwnerId: string, updatedOwnerName: string) => void;
}

export const AreaCardIdentity: React.FunctionComponent<IAreaCardIdentityProps> = props => {
    const { identityProvider, area, editMode, updateDraftOwner } = props;    
    const [{ done, selected }, localDispatch] = React.useState({ done: false, selected: undefined });

    React.useEffect(() => {
        let mounted = true;

        (async () => {
            const identityResult = area.OwnerId ? await identityProvider.getEntityFromUniqueAttribute(area.OwnerId) as IIdentity : undefined;
            if (mounted) {
                localDispatch({
                    done: true,
                    selected: identityResult
                });
            }
        })();

        return () => {
            mounted = false;
        };
    }, [props.editMode]);

    if (done) {
        return <div className="area-identity">
            {editMode ? renderPicker(updateDraftOwner, identityProvider, selected) : renderStatic(area)}
        </div>;
    } else {
        return <div />
    }
};

function renderStatic(area: Area): JSX.Element {
    return <div>{area.OwnerName || "unassigned"}</div>;
};

function renderPicker(updateOwnerCallback: Function, identityProvider: IPeoplePickerProvider, selected: IIdentity): JSX.Element {
    return <IdentityPickerDropdown
        onChange={(identity?: IIdentity) => onChange(updateOwnerCallback, identity)}
        pickerProvider={identityProvider}
        value={selected}
    />;
};

function onChange(updateOwnerCallback: Function, identity?: IIdentity) {
    let ownerId = identity ? identity.entityId : undefined;
    let ownerName = identity ? identity.displayName : undefined;

    updateOwnerCallback(ownerId, ownerName);     
};