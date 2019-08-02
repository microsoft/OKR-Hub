import * as React from "react";
import { Area } from "../../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import "../AreaView.scss";
import { AreaCardIdentity } from "./AreaCardIdentity";
import { AreaCardDetails } from "./Details/AreaCardDetails";
import { useStateValue } from "../../StateMangement/StateProvider";
import produce from "immer";
import { AreaCardButtons } from "./AreaCardButtons";
import { NavigationConstants } from "../../OKRConstants";

export interface IAreaCardProps {
    area: Area;
    identityProvider: IPeoplePickerProvider;    
}

export const AreaCard: React.FunctionComponent<IAreaCardProps> = props => {
    const { area, identityProvider } = props;
    const [{ editMode, draftArea }, localDispatcher] = React.useState({ editMode: false, draftArea: undefined });
    const stateContext = useStateValue();

    const toggleEditMode = () => {
        // If starting to edit, set the draft to the passed in area. 
        // If exiting editing, clear the draft. 
        const exitingEditMode = editMode;
        let newDraftArea = exitingEditMode ? undefined : area;

        localDispatcher({ editMode: !editMode, draftArea: newDraftArea });
    };

    const updateOwner = (ownerId: string, ownerName: string) => {
        const newArea = produce(draftArea, draft => {
            draft.OwnerId = ownerId;
            draft.OwnerName = ownerName;
        })

        localDispatcher({ editMode: editMode, draftArea: newArea });
    }

    const updateName = (name: string) => {
        const newArea = produce(draftArea, draft => {
            draft.Name = name;
        })

        localDispatcher({ editMode: editMode, draftArea: newArea });
    }

    const updateDescription = (description: string) => {
        const newArea = produce(draftArea, draft => {
            draft.Description = description;
        })

        localDispatcher({ editMode: editMode, draftArea: newArea });
    }

    const save = () => {
        // save before you toggle edit mode. Toggling edit will clear the draft. 
        stateContext.actions.editArea(draftArea);
        toggleEditMode();
    }

    const removeAreaCallback = (): void => {
        stateContext.actions.removeArea({
            id: area.id,
            areaId: area.AreaId
        });
    };

    const onClickCard = (e) => {
        if (editMode) {
            e.stopPropagation();
            return;
        }

        var element = e.target;
        while(element && !element.classList.contains("area-grid")) {
            if (element.classList.contains("area-context-menu") 
                || element.classList.contains("bolt-callout")) {
                e.stopPropagation();
                return;
            }
            element = element.parentElement;
        }

        stateContext.actions.navigatePage({ pageLocation: NavigationConstants.DetailView, selectedArea: area });
    }

    const buttons = <AreaCardButtons toggleEditMode={toggleEditMode} save={save} editMode={editMode} removeAreaCallback={removeAreaCallback} />;

    return (<div onClick={onClickCard}>
        <Card className="area-card">
            <div className="area-card-interior">
                <AreaCardDetails area={area} draftArea={draftArea} editMode={editMode} updateDraftName={updateName} updateDraftDescription={updateDescription} buttons={buttons} />
                <AreaCardIdentity area={editMode ? draftArea : area} identityProvider={identityProvider} editMode={editMode} updateDraftOwner={updateOwner} />
            </div>
        </Card>
    </div>);
}