import * as React from "react";
import { Button } from "azure-devops-ui/Button";
import { useStateValue, IOKRContext } from "../../../StateMangement/StateProvider";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsEditProps {
	area: Area,
	toggleEditMode: () => void;
}

export const AreaCardDetailsEdit: React.FunctionComponent<IAreaCardDetailsEditProps> = props => {
	const stateContext = useStateValue();
	const [{ editName, editDescription }, localDispatcher] = React.useState({ editName: props.area.Name, editDescription: props.area.Description});

	return <>
		<div className="card-header">
			<h3>
				<input value={editName} onChange={(val) => { localDispatcher({ editName: val.target.value, editDescription})}} />
			</h3>
			{renderEditButtons(props.area, editName, editDescription, props.toggleEditMode, stateContext)}
		</div>
		<input value={editDescription} onChange={(val) => { localDispatcher({ editName, editDescription: val.target.value})}} />
	</>;
};

function renderEditButtons(area, editName, editDescription, toggleEditMode, stateContext: IOKRContext): JSX.Element {
	return <>
		<Button
			onClick={() => save(area, editName, editDescription, toggleEditMode, stateContext)}
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
	</>;
}

function save(area, editName, editDescription, toggleEditMode, stateContext: IOKRContext): void {
	const newArea = {
		...area,
		Name: editName,
		Description: editDescription,
	};

	stateContext.actions.editArea(newArea);

	toggleEditMode();
}