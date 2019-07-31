import * as React from "react";
import { AreaCardProgress } from "../AreaCardProgress";
import { AreaCardDetailsStatic } from "./AreaCardDetailsStatic";
import { AreaCardDetailsEdit } from "./AreaCardDetailsEdit";
import { Area } from "../../../Area/Area";
import { useStateValue } from '../../../StateMangement/StateProvider';
import { getObjectivesForArea } from "../../../StateMangement/OKRSelector";

export interface IAreaCardDetailsProps {
	area: Area;
	editMode: boolean;
	toggleEditMode: () => void;
	setDialogState: (dialogStatus: boolean) => void;
}

export const AreaCardDetails: React.FunctionComponent<IAreaCardDetailsProps> = props => {
	const stateContext = useStateValue();

	const { area, editMode, toggleEditMode, setDialogState } = props;
	const objectives = getObjectivesForArea(stateContext.state, area); 

	return (
		<div className="area-card-details">
			{editMode ? <AreaCardDetailsEdit area={props.area} toggleEditMode={toggleEditMode} /> : <AreaCardDetailsStatic area={props.area} toggleEditMode={toggleEditMode} setDialogState={setDialogState}/>}
			<h4>{`${objectives.length} objectives`}</h4>
			<AreaCardProgress objectives={objectives} />
		</div>
	);
}