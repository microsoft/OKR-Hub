import * as React from "react";
import { Objective } from "../../Objective/Objective";
import { AreaCardProgress } from "./ActiveCardProgress";
import { MenuButton, IMenuItem, MenuItemType, IMenu } from "azure-devops-ui/Menu";
import { Button } from "azure-devops-ui/Button";
import { TextField } from "azure-devops-ui/TextField";
import { Area } from "../../Area/Area";


export interface IAreaCardDetailsProps {
	area: Area;
	objectives: Objective[];
	navigateCallback: (area: Area) => void;
	updateAreaCallback: (area: Area) => void;
}

interface IAreaCardDetailsState {
	isEditing: boolean;
	editedName: string;
	editedDescription: string;
}

export class AreaCardDetails extends React.Component<IAreaCardDetailsProps, IAreaCardDetailsState> {

	constructor(props: IAreaCardDetailsProps) {
		super(props);
		this.state = {
			isEditing: false,
			editedName: props.area.Name,
			editedDescription: props.area.Description
		}
	}

	public render(): JSX.Element {
		const { objectives, area, navigateCallback } = this.props;
		const { editedName, editedDescription, isEditing } = this.state;

		let button, nameField, descriptionField;

		if (isEditing) {
			button = <Button iconProps={{ iconName: "CheckMark" }} subtle={true} onClick={() => { this.save(area) }} />;
			nameField = <TextField value={editedName} onChange={(event: any, value: string) => { this.setState({ editedName: value }) }} />;
			descriptionField = <TextField value={editedDescription} onChange={(event: any, value: string) => { this.setState({ editedDescription: value }) }} />;

		}
		else {
			button = <MenuButton hideDropdownIcon={true} contextualMenuProps={{ menuProps: { id: "test", items: this.getButtons() } }} iconProps={{ iconName: "MoreVertical" }} />;
			nameField = <h3><div className="area-name-title" onClick={() => { navigateCallback(area) }}>{area.Name}</div></h3>;
			descriptionField = <p> {area.Description}</p>;
		}

		return (
			<div className="area-card-details">
				<div className="card-header">
					{nameField}
					{button}
				</div>
				{descriptionField}
				<h4>{`${objectives.length} objectives`}</h4>
				<AreaCardProgress objectives={objectives} />
			</div>
		);
	}

	private getButtons(): IMenuItem[] {
		return [
			{
				id: "edit-button",
				text: "Edit",
				iconProps: { iconName: "Edit" },
				onActivate: (menuItem: IMenuItem) => { this.setState({ isEditing: true }) }
			},
			{
				id: "delete-button",
				text: "Delete",
				iconProps: { iconName: "Delete" },
				onActivate: () => { alert("To Do") }
			}
		];
	}

	private save = (area: Area): void => {
		this.setState({ isEditing: false });

		const a = {
			...area,
			Description : this.state.editedDescription,
			Name: this.state.editedName
		}
		
		this.props.updateAreaCallback(a);
	};
}