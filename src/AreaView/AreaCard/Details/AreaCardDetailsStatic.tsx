import * as React from "react";
import { Link } from "azure-devops-ui/Link";
import { useStateValue } from "../../../StateProvider";
import * as StateActions from "../../../DetailView/DetailViewActions";
import { NavigationConstants } from "../../../OKRConstants";
import { useAreaCardValue } from "../Provider/AreaCardProvider";
import * as AreaViewActions from "../Provider/AreaCardActions";
import { Button } from "azure-devops-ui/Button";

export const AreaCardDetailsStatic: React.FunctionComponent = props => {
	const [{}, stateDispatcher] = useStateValue();
	const [{area}, areaViewDispatcher] = useAreaCardValue();

	return <>
		{renderEditButton(areaViewDispatcher)}
		<Link onClick={() => { onNameClick(stateDispatcher, area); }}>{area.Name}</Link>
		<p>{area.Description}</p>
	</>;
}

function renderEditButton(areaViewDispatcher): JSX.Element {
	return <Button
		onClick={() => areaViewDispatcher({ type: AreaViewActions.toggleEditMode })}
		ariaLabel="Edit button"
		iconProps={{ iconName: "Edit" }}
	/>;
}

const onNameClick = (stateDispatcher, area): void => {
	stateDispatcher({
		type: StateActions.updateArea,
		selectedArea: area
	});

	stateDispatcher({
		type: StateActions.navigatePage,
		pageLocation: NavigationConstants.DetailView
	});
};

