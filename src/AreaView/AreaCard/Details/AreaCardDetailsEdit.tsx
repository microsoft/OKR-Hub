import * as React from "react";
import { MutableField } from "../../../MutableField";
import * as Actions from "../Provider/AreaCardActions";
import { Button } from "azure-devops-ui/Button";
import { useAreaCardValue } from "../Provider/AreaCardProvider";

export const AreaCardDetailsEdit: React.FunctionComponent = props => {
	const [{ area }, areaDispatcher] = useAreaCardValue();

	return <>
		{renderEditButtons(areaDispatcher)}
		<h3>
			<MutableField value={area.Name} onChange={() => { console.log("saved"); }} />
		</h3>
		<p>
			<MutableField value={area.Description} onChange={() => { }} />
		</p>
	</>;
};

function renderEditButtons(areaDispatcher): JSX.Element {
	return <>
		<Button
			onClick={() => save(areaDispatcher)}
			ariaLabel="Save button"
			iconProps={{ iconName: "Save" }}
		/>
		<Button
			onClick={() => editModeToggle(areaDispatcher)}
			ariaLabel="Cancel button"
			iconProps={{ iconName: "Cancel" }}
		/>
	</>;
}

function editModeToggle(areaDispatcher): void {
	areaDispatcher({
		type: Actions.toggleEditMode
	});
}

function save(areaDispatcher): void {

	editModeToggle(areaDispatcher);
}