import * as React from "react";
import { Link } from "azure-devops-ui/Link";
import { useStateValue, IOKRContext } from "../../../StateMangement/StateProvider";
import { NavigationConstants } from "../../../OKRConstants";
import { useAreaCardValue } from "../Provider/AreaCardProvider";
import { MenuButton, IMenuItem } from "azure-devops-ui/Menu";
import * as AreaViewActions from "../Provider/AreaCardActions";

export const AreaCardDetailsStatic: React.FunctionComponent = props => {
	const stateContext: IOKRContext = useStateValue();
	const [{ area }, areaCardDispatcher] = useAreaCardValue();

	return <>
		<div className="card-header">
			<Link onClick={() => { onNameClick(stateContext, area); }}>{area.Name}</Link>
			<p>{area.Description}</p>
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

const onNameClick = (stateContext: IOKRContext, area): void => {
	stateContext.actions.updateSelectedArea({ selectedArea: area});
	stateContext.actions.navigatePage({ pageLocation: NavigationConstants.DetailView});
};

