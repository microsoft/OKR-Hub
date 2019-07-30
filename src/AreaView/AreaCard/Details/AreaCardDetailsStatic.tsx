import * as React from "react";
import { Link } from "azure-devops-ui/Link";
import { useStateValue } from "../../../StateMangement/StateProvider";
import { NavigationConstants } from "../../../OKRConstants";
import { useAreaCardValue } from "../Provider/AreaCardProvider";
import { MenuButton, IMenuItem } from "azure-devops-ui/Menu";
import * as AreaViewActions from "../Provider/AreaCardActions";

export const AreaCardDetailsStatic: React.FunctionComponent = props => {
	const [{ }, stateDispatcher] = useStateValue();
	const [{ area }, areaCardDispatcher] = useAreaCardValue();

	return <>
		<div className="card-header">
			<Link onClick={() => { onNameClick(stateDispatcher, area); }}>{area.Name}</Link>
			<MenuButton hideDropdownIcon={true} contextualMenuProps={{ menuProps: { id: "test", items: getButtons(areaCardDispatcher) } }} iconProps={{ iconName: "MoreVertical" }} />
		</div>
	</>;
}

function getButtons(areaCardDispatcher): IMenuItem[] {
	return [
		{
			id: "edit-button",
			text: "Edit",
			iconProps: { iconName: "Edit" },
			onActivate: () => areaCardDispatcher({ type: AreaViewActions.toggleEditMode })
		},
		{
			id: "delete-button",
			text: "Delete",
			iconProps: { iconName: "Delete" },
			onActivate: () => { alert("To Do") }
		}
	];
}

const onNameClick = (stateDispatcher, area): void => {
	stateDispatcher.updateArea(area);
	stateDispatcher.selectArea(NavigationConstants.DetailView);
};

