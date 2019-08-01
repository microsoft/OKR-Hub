import * as React from "react";
import { Area } from "../../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import "../AreaView.scss";
import { AreaCardIdentity } from "./AreaCardIdentity";
import { AreaCardDetails } from "./Details/AreaCardDetails";
import { Dialog } from "azure-devops-ui/Dialog";
import { useStateValue } from "../../StateMangement/StateProvider";
import produce from "immer";
import { AreaCardButtons } from "./AreaCardButtons";

export interface IAreaCardProps {
    area: Area;
    identityProvider: IPeoplePickerProvider;
    removeAreaCallback: (id: string, areaId: string) => void;
    onCardClick: (area: Area) => void;
}

export const AreaCard: React.FunctionComponent<IAreaCardProps> = props => {
    const { area, identityProvider, removeAreaCallback, onCardClick } = props;
    const [{ editMode, isDialogOpen, draftArea }, localDispatcher] = React.useState({ editMode: false, isDialogOpen: false, draftArea: undefined });
    const stateContext = useStateValue();

    const toggleEditMode = () => {
        // If starting to edit, set the draft to the passed in area. 
        // If exiting editing, clear the draft. 
        const exitingEditMode = editMode;
        let newDraftArea = exitingEditMode ? undefined : area;

        localDispatcher({ editMode: !editMode, isDialogOpen: isDialogOpen, draftArea: newDraftArea });
    };

    const setDeleteDialogState = (dialogStatus: boolean) => {
        localDispatcher({ editMode: editMode, isDialogOpen: dialogStatus, draftArea: draftArea });
    };

    const updateOwner = (ownerId: string, ownerName: string) => {
        const newArea = produce(draftArea, draft => {
            draft.OwnerId = ownerId;
            draft.OwnerName = ownerName;
        })

        localDispatcher({ editMode: editMode, isDialogOpen: isDialogOpen, draftArea: newArea });
    }

    const updateName = (name: string) => {
        const newArea = produce(draftArea, draft => {
            draft.Name = name;
        })

        localDispatcher({ editMode: editMode, isDialogOpen: isDialogOpen, draftArea: newArea });
    }

    const updateDescription = (description: string) => {
        const newArea = produce(draftArea, draft => {
            draft.Description = description;
        })

        localDispatcher({ editMode: editMode, isDialogOpen: isDialogOpen, draftArea: newArea });
    }

    const save = () => {
        // save before you toggle edit mode. Toggling edit will clear the draft. 
        stateContext.actions.editArea(draftArea);
        toggleEditMode();
    }

    const onClickCard = (e) => {
        if (editMode) {
            e.stopPropagation();
            return;
        }

        var element = e.target;
        while (!element.classList.contains("area-grid")) {
            if (element.classList.contains("area-context-menu")) {
                e.stopPropagation();
                return;
            }
            element = element.parentElement;
        }
        onCardClick(area);
    }

    const buttons = <AreaCardButtons toggleEditMode={toggleEditMode} save={save} editMode={editMode} setDeleteDialogState={setDeleteDialogState} />;

    return (<div onClick={onClickCard}>
        <Card className="area-card">
            <div className="area-card-interior">
                <AreaCardDetails area={area} draftArea={draftArea} editMode={editMode} updateDraftName={updateName} updateDraftDescription={updateDescription} buttons={buttons} />
                <AreaCardIdentity area={editMode? draftArea: area} identityProvider={identityProvider} editMode={editMode} updateDraftOwner={updateOwner} />
                {isDialogOpen &&
                    <Dialog
                        titleProps={{ text: "Delete Area" }}
                        footerButtonProps={[
                            {
                                text: "Cancel",
                                onClick: () => {
                                    setDeleteDialogState(false);
                                }
                            },
                            {
                                text: "OK", primary: true, onClick: () => {
                                    removeAreaCallback(area.id, area.AreaId);
                                    setDeleteDialogState(false);
                                }
                            }
                        ]}
                        onDismiss={() => {
                            setDeleteDialogState(false);
                        }}>
                        {"Are you sure to delete this area?"}
                    </Dialog>}
            </div>
        </Card>
    </div>);
}