import * as React from "react";
import { MutableField } from "../../../MutableField";
import * as Actions from "../Provider/AreaCardActions";
import { Button } from "azure-devops-ui/Button";
import { useAreaCardValue } from "../Provider/AreaCardProvider";
import { useStateValue, IOKRContext } from "../../../StateMangement/StateProvider";

export const AreaCardDetailsEdit: React.FunctionComponent = props => {
	const stateContext = useStateValue();
	const [{ area }, areaDispatcher] = useAreaCardValue();

	return (
		<div className="card-header">
			<h3>
				<MutableField value={area.Name} onChange={(val) => { area.Name = val; }} />
			</h3>
			<MutableField value={area.Description} onChange={(val) => { areaDispatcher({ type: Actions.updateArea, area: { ...area, Description: val }})}} />
			{renderEditButtons(area, areaDispatcher, stateContext)}
		</div>
	);
};

function renderEditButtons(area, areaDispatcher, stateContext: IOKRContext): JSX.Element {
	return <>
		<Button
			onClick={() => save(area, areaDispatcher, stateContext)}
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

function save(area, areaDispatcher, stateContext: IOKRContext): void {
	const a = {
		...area,
		//Description: this.state.editedDescription,
		//Name: this.state.editedName
	}

	stateContext.actions.editArea(area);

	editModeToggle(areaDispatcher);
}