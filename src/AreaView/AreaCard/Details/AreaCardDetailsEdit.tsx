import * as React from "react";
import { MutableField } from "../../../MutableField";
import * as Actions from "../Provider/AreaCardActions";
import { Button } from "azure-devops-ui/Button";
import { useAreaCardValue } from "../Provider/AreaCardProvider";

export const AreaCardDetailsEdit: React.FunctionComponent = props => {
	const [{ area }, areaDispatcher] = useAreaCardValue();

	return (
		<div className="card-header">
			<h3>
				<MutableField value={area.Name} onChange={() => { console.log("saved"); }} />
			</h3>
			<p>
				<MutableField value={area.Description} onChange={() => { }} />
			</p>
			{renderEditButtons(area, areaDispatcher)}
		</div>
	);
};

function renderEditButtons(area, areaDispatcher): JSX.Element {
	return <>
		<Button
			onClick={() => save(area, areaDispatcher)}
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

function save(area, areaDispatcher): void {
	const a = {
		...area,
		Description: this.state.editedDescription,
		Name: this.state.editedName
	}

	this.props.updateAreaCallback(a);

	editModeToggle(areaDispatcher);
}