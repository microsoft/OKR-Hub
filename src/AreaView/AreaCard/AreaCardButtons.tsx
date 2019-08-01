import * as React from "react";
import "../AreaView.scss";
import { IMenuItem, MenuButton } from "azure-devops-ui/Menu";
import { Button } from "azure-devops-ui/Button";

export interface IAreaCardButtons {
    editMode: boolean;
    toggleEditMode: () => void;
    setDeleteDialogState: (state: boolean) => void;
    save: () => void;
}

export const AreaCardButtons: React.FunctionComponent<IAreaCardButtons> = props => {
    const { editMode, toggleEditMode, setDeleteDialogState: setDialogState, save } = props;

    return editMode ?
        renderEditButtons(toggleEditMode, save) :
        renderStaticButtons(toggleEditMode, setDialogState);
}

function renderEditButtons(toggleEditMode, save: Function): JSX.Element {
    return <div className="edit-buttons">
        <Button
            onClick={() => { save() }}
            ariaLabel="Save button"
            iconProps={{ iconName: "CheckMark" }}
            subtle={true}
        />
        <Button
            onClick={toggleEditMode}
            ariaLabel="Cancel button"
            iconProps={{ iconName: "Cancel" }}
            subtle={true}
        />
    </div>;
}

function renderStaticButtons(toggleEditMode, setDeleteDialogState) {
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





