import * as React from "react";
import "../AreaView.scss";
import { IMenuItem, MenuButton } from "azure-devops-ui/Menu";
import { Button } from "azure-devops-ui/Button";
import { Dialog } from "azure-devops-ui/Dialog";

export interface IAreaCardButtons {
    editMode: boolean;
    toggleEditMode: () => void;
    removeAreaCallback: () => void;
    save: () => void;
}

export const AreaCardButtons: React.FunctionComponent<IAreaCardButtons> = props => {
    const { editMode, toggleEditMode, removeAreaCallback, save } = props;

    const [{ isDialogOpen }, localDispatcher] = React.useState({ isDialogOpen: false });

    const setDeleteDialogState = (dialogStatus: boolean) => {
        localDispatcher({ isDialogOpen: dialogStatus });
    };

    const buttons = editMode ?
        renderEditButtons(toggleEditMode, save) :
        renderStaticButtons(toggleEditMode, setDeleteDialogState);

    const dialog = isDialogOpen ?
        renderDeleteConfirmationDialog(setDeleteDialogState, removeAreaCallback) :
        null;

    return <div>
        {buttons}
        {dialog}
    </div>;
}

function renderEditButtons(toggleEditMode: Function, save: Function): JSX.Element {
    return <div className="edit-buttons">
        <Button
            onClick={() => { save() }}
            ariaLabel="Save button"
            iconProps={{ iconName: "CheckMark" }}
            subtle={true}
        />
        <Button
            onClick={() => toggleEditMode()}
            ariaLabel="Cancel button"
            iconProps={{ iconName: "Cancel" }}
            subtle={true}
        />
    </div>;
}

function renderStaticButtons(toggleEditMode: () => void, setDeleteDialogState): JSX.Element {
    const getButtons = (toggleEditMode: () => void): IMenuItem[] => {
        return [
            {
                id: "edit-button",
                text: "Edit",
                iconProps: { iconName: "Edit" },
                onActivate: toggleEditMode
            },
            {
                id: "delete-button",
                text: "Delete",
                iconProps: { iconName: "Delete" },
                onActivate: () => {
                    setDeleteDialogState(true);
                }
            }
        ];
    }

    return <div className="area-context-menu"><MenuButton hideDropdownIcon={true} contextualMenuProps={{ menuProps: { id: "editButtons", items: getButtons(toggleEditMode) } }} iconProps={{ iconName: "More" }} /></div>;
}

function renderDeleteConfirmationDialog(setDeleteDialogState: Function, removeAreaCallback: Function): JSX.Element {
    return <Dialog
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
                    removeAreaCallback();
                    setDeleteDialogState(false);
                }
            }
        ]}
        onDismiss={() => {
            setDeleteDialogState(false);
        }}>
        {"Are you sure to delete this area?"}
    </Dialog>
}