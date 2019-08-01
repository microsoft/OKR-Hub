import * as React from "react";
import { AreaCardProgress } from "../AreaCardProgress";
import { AreaCardDetailsStatic } from "./AreaCardDetailsStatic";
import { AreaCardDetailsEdit } from "./AreaCardDetailsEdit";
import { Area } from "../../../Area/Area";
import { useStateValue } from '../../../StateMangement/StateProvider';
import { getObjectivesForArea } from "../../../StateMangement/OKRSelector";

export interface IAreaCardDetailsProps {
	area: Area;
	draftArea: Area; 
	editMode: boolean;
	updateDraftName: (name: string) => void;
	updateDraftDescription: (description: string) => void;
	buttons: JSX.Element; 
}

export const AreaCardDetails: React.FunctionComponent<IAreaCardDetailsProps> = props => {
	const stateContext = useStateValue();

	const { area, draftArea, editMode, updateDraftDescription, updateDraftName, buttons } = props;
	const objectives = getObjectivesForArea(stateContext.state, area); 

	return (
		<div className="area-card-details">
			{editMode ? <AreaCardDetailsEdit draftArea={draftArea} updateDraftName={updateDraftName} updateDraftDescription={updateDraftDescription} buttons={buttons} /> : <AreaCardDetailsStatic area={area} buttons={buttons}/>}
			<h4>{`${objectives.length} objectives`}</h4>
			<AreaCardProgress objectives={objectives} />
		</div>
	);
}