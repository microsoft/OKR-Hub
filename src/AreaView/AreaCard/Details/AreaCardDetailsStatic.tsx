import * as React from "react";
import { Objective } from "../../../Objective/Objective";
import { AreaCardProgress } from "./ActiveCardProgress";
import { Link } from "azure-devops-ui/Link";
import { useStateValue } from "../../../StateProvider";
import * as Actions from "../../../DetailView/DetailViewActions";
import { NavigationConstants } from "../../../OKRConstants";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsStaticProps {
	area: Area
	objectives: Objective[];
	editMode: boolean;
}

export const AreaCardDetailsStatic: React.FunctionComponent<IAreaCardDetailsStaticProps> = props => {
	const [{ }, setArea] = useStateValue();
	const [{ }, setPageLocation] = useStateValue();
	const { area, objectives } = props;

	return <>
		<Link onClick={() => { onNameClick(setArea, setPageLocation, area); }}>{area.Name}</Link>
		<p>{area.Description}</p>
	</>;
}

const onNameClick = (setArea, setPageLocation, area): void => {
	setArea({
		type: Actions.updateArea,
		selectedArea: area
	});

	setPageLocation({
		type: Actions.navigatePage,
		pageLocation: NavigationConstants.DetailView
	});
};

