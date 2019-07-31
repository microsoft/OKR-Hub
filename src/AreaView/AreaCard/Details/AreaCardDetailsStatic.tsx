import * as React from "react";
import { useStateValue, IOKRContext } from "../../../StateMangement/StateProvider";
import { NavigationConstants } from "../../../OKRConstants";
import { MenuButton, IMenuItem } from "azure-devops-ui/Menu";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsStaticProps {
	area: Area;
	toggleEditMode: () => void;
	setDialogState: (dialogStatus: boolean) => void;
}

export const AreaCardDetailsStatic: React.FunctionComponent<IAreaCardDetailsStaticProps> = props => {
	const stateContext: IOKRContext = useStateValue();
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

	const onNameClick = (stateContext: IOKRContext, area: Area): void => {
		stateContext.actions.navigatePage({ pageLocation: NavigationConstants.DetailView, selectedArea: area});
	};

	return <>
		<div className="card-header">
			<h3><div className="area-name-title" onClick={() => { onNameClick(stateContext, area); }}>{area.Name}</div></h3>
			<MenuButton hideDropdownIcon={true} contextualMenuProps={{ menuProps: { id: "test", items: getButtons(toggleEditMode) } }} iconProps={{ iconName: "More" }} />
		</div>
		<p>{area.Description}</p>
	</>;
}




