import * as React from "react";
import { useStateValue, IOKRContext } from "../../../StateMangement/StateProvider";
import { NavigationConstants } from "../../../OKRConstants";
import { MenuButton, IMenuItem } from "azure-devops-ui/Menu";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsStaticProps {
	area: Area,
	toggleEditMode: () => void
}

export const AreaCardDetailsStatic: React.FunctionComponent<IAreaCardDetailsStaticProps> = props => {
	const stateContext: IOKRContext = useStateValue();
	const { area, toggleEditMode } = props;

	return <>
		<div className="card-header">
			<h3><div className="area-name-title" onClick={() => { onNameClick(stateContext, area); }}>{area.Name}</div></h3>
			<MenuButton hideDropdownIcon={true} contextualMenuProps={{ menuProps: { id: "test", items: getButtons(toggleEditMode) } }} iconProps={{ iconName: "MoreVertical" }} />
		</div>
		<p>{area.Description}</p>
	</>;
}

function getButtons(toggleEditMode: () => void): IMenuItem[] {
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
			onActivate: () => { alert("To Do") }
		}
	];
}

const onNameClick = (stateContext: IOKRContext, area): void => {
	stateContext.actions.updateSelectedArea({ selectedArea: area});
	stateContext.actions.navigatePage({ pageLocation: NavigationConstants.DetailView});
};

