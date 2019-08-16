import * as React from "react";
import { IPeoplePickerProvider, IIdentity, IdentityPickerDropdown } from "azure-devops-ui/IdentityPicker";
import { IOwnerIdentity } from "./Data/OKRDocument";

export interface IMutableIdentityProps {
    identity: IOwnerIdentity;
    identityProvider: IPeoplePickerProvider;
    editMode: boolean;
    className: string;
    updateDraftOwner: (udpatedOwnerId: string, updatedOwnerName: string) => void;
    onBlur?: () => void;
    onClick?: () => void;
    calloutWidth?: number;
}

export const MutableIdentity: React.FunctionComponent<IMutableIdentityProps> = props => {
    const { identityProvider, identity, editMode, updateDraftOwner, calloutWidth } = props;    
    const [{ done, selected }, localDispatch] = React.useState({ done: false, selected: undefined });

    React.useEffect(() => {
        let mounted = true;

        (async () => {
            const identityResult = identity.OwnerId ? await identityProvider.getEntityFromUniqueAttribute(identity.OwnerId) as IIdentity : undefined;
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

    function onClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

    function onBlur() {
        if (props.onBlur) {
            props.onBlur();
        }
    }

    if (done) {
        return <div className={props.className} onClick={onClick}>
            {editMode ? renderPicker(updateDraftOwner, identityProvider, selected, onBlur, calloutWidth? calloutWidth : 300) : renderStatic(identity)}
        </div>;
    } else {
        return <div />
    }
};

function renderStatic(identity: IOwnerIdentity): JSX.Element {
    return <div>{identity.OwnerName || "Needs Assignee"}</div>;
};

function renderPicker(updateOwnerCallback: Function, identityProvider: IPeoplePickerProvider, selected: IIdentity, onBlur: () => void, calloutWidth: number): JSX.Element {
    return <IdentityPickerDropdown
        onChange={(identity?: IIdentity) => onChange(updateOwnerCallback, identity)}
        pickerProvider={identityProvider}
        editPlaceholder={"Start typing to search"}
        value={selected}
        autoFocus={true}
        onBlur={onBlur}
        calloutWidth={calloutWidth}
    />;
};


function onChange(updateOwnerCallback: Function, identity?: IIdentity) {
    let ownerId = identity ? identity.entityId : undefined;
    let ownerName = identity ? identity.displayName : undefined;

    updateOwnerCallback(ownerId, ownerName);     
};