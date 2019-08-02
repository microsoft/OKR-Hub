import * as React from "react";
import { MenuButton, IMenuItem } from "azure-devops-ui/Menu";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsStaticProps {
	area: Area;
	toggleEditMode: () => void;
	setDialogState: (dialogStatus: boolean) => void;
}

export const AreaCardDetailsStatic: React.FunctionComponent<IAreaCardDetailsStaticProps> = props => {
	const { area, toggleEditMode, setDialogState } = props;

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
					setDialogState(true);
				}
			}
		];
	}

	return <>
		<div className="card-header">
			<h3 style={{marginBottom: 10, flexGrow: 1}}><div className="area-name-title">{area.Name}</div></h3>
			<div className="area-context-menu"><MenuButton hideDropdownIcon={true} contextualMenuProps={{ menuProps: { id: "test", items: getButtons(toggleEditMode) } }} iconProps={{ iconName: "More" }} /></div>
		</div>
		<p>{area.Description}</p>
	</>;
}




