import * as React from "react";
import { AreaCardProgress } from "./ActiveCardProgress";
import { AreaCardDetailsStatic } from "./AreaCardDetailsStatic";
import { useAreaCardValue } from "../Provider/AreaCardProvider";
import { AreaCardDetailsEdit } from "./AreaCardDetailsEdit";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsProps {
	navigateCallback: (area: Area) => void;
	updateAreaCallback: (area: Area) => void;
}

export const AreaCardDetails: React.FunctionComponent = props => {
	const [{ objectives, editMode }] = useAreaCardValue();

	return (
		<div className="area-card-details">
			{editMode ? <AreaCardDetailsEdit /> : <AreaCardDetailsStatic />}
			<h4>{`${objectives.length} objectives`}</h4>
			<AreaCardProgress />
		</div>
	);
}