import * as React from "react";
import { AreaCardProgress } from "./ActiveCardProgress";
import { AreaCardDetailsStatic } from "./AreaCardDetailsStatic";
import { AreaCardDetailsEdit } from "./AreaCardDetailsEdit";
import { Area } from "../../../Area/Area";
import { useStateValue } from '../../../StateMangement/StateProvider';

export interface IAreaCardDetailsProps {
	area: Area;
	editMode: boolean;
	toggleEditMode: () => void;
}

export const AreaCardDetails: React.FunctionComponent<IAreaCardDetailsProps> = props => {
	const stateContext = useStateValue();
	const { area, editMode, toggleEditMode } = props;
	const objectives = stateContext.state.objectives.filter(objective => objective.AreaId == props.area.id);

	return (
		<div className="area-card-details">
			{editMode ? <AreaCardDetailsEdit area={props.area} toggleEditMode={toggleEditMode} /> : <AreaCardDetailsStatic area={props.area} toggleEditMode={toggleEditMode} />}
			<h4>{`${objectives.length} objectives`}</h4>
			<AreaCardProgress area={area} objectives={objectives} />
		</div>
	);
}