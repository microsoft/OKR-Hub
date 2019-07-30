import * as React from "react";
import { MutableField } from "../../../MutableField";
import * as Actions from "../Provider/AreaCardActions";
import { Button } from "azure-devops-ui/Button";
import { useAreaCardValue } from "../Provider/AreaCardProvider";
import { useStateValue, IOKRContext } from "../../../StateMangement/StateProvider";

export const AreaCardDetailsEdit: React.FunctionComponent = props => {
	const stateContext = useStateValue();
	const [{ area }, areaDispatcher] = useAreaCardValue();
	const [{ editName, editDescription }, localDispatcher] = React.useState({ editName: area.Name, editDescription: area.Description});

	return <>
		<div className="card-header">
			<h3>
				<input value={editName} onChange={(val) => { localDispatcher({ editName: val.target.value, editDescription})}} />
			</h3>
			{renderEditButtons(area, areaDispatcher, editName, editDescription, stateContext)}
		</div>
		<input value={editDescription} onChange={(val) => { localDispatcher({ editName, editDescription: val.target.value})}} />
	</>;
};

function renderEditButtons(area, areaDispatcher, editName, editDescription, stateContext: IOKRContext): JSX.Element {
	return <>
		<Button
			onClick={() => save(area, areaDispatcher, editName, editDescription, stateContext)}
			ariaLabel="Save button"
			iconProps={{ iconName: "CheckMark" }}
			subtle={true}
		/>
		<Button
			onClick={() => editModeToggle(areaDispatcher)}
			ariaLabel="Cancel button"
			iconProps={{ iconName: "Cancel" }}
			subtle={true}
		/>
	</>;
}

function editModeToggle(areaDispatcher): void {
	areaDispatcher({
		type: Actions.toggleEditMode
	});
}

function save(area, areaDispatcher, editName, editDescription, stateContext: IOKRContext): void {
	const newArea = {
		...area,
		Name: editName,
		Description: editDescription,
	};

	areaDispatcher({type: Actions.updateArea, area: newArea});
	stateContext.actions.editArea(newArea);

	editModeToggle(areaDispatcher);
}