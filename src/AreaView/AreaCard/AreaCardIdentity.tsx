import * as React from "react";
import { IPeoplePickerProvider, IIdentity, IdentityPickerDropdown } from "azure-devops-ui/IdentityPicker";
import { useStateValue, IOKRContext } from "../../StateMangement/StateProvider";
import { Area } from "../../Area/Area";
import { IReadonlyObservableValue, IObservableValue, Observable } from "azure-devops-ui/Core/Observable";

export interface IAreaCardIdentityProps {
    area: Area;
    identityProvider: IPeoplePickerProvider;
    editMode: boolean;
}

export const AreaCardIdentity: React.FunctionComponent<IAreaCardIdentityProps> = props => {
    const { identityProvider, area, editMode } = props;
    const stateContext = useStateValue();
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
    }, []);

    if (done) {
        return <div className="area-identity">
            {editMode ? renderPicker(stateContext, identityProvider, area, selected) : renderStatic(area)}
        </div>;
    } else {
        return <div />
    }
};

function renderStatic(area: Area): JSX.Element {
    return <div>{area.OwnerName || "unassigned"}</div>;
};

function renderPicker(stateContext: IOKRContext, identityProvider: IPeoplePickerProvider, area: Area, selected: IIdentity): JSX.Element {
    return <IdentityPickerDropdown
        onChange={(identity?: IIdentity) => onChange(stateContext, area, identity)}
        pickerProvider={identityProvider}
        value={selected}
    />;
};

function onChange(stateContext: IOKRContext, area: Area, identity?: IIdentity) {
    const newArea = {
        ...area,
        OwnerId: identity ? identity.entityId : undefined,
        OwnerName: identity ? identity.displayName : undefined,
    };

    stateContext.actions.editArea(newArea);
};