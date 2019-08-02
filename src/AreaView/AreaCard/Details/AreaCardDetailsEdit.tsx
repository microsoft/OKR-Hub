import * as React from "react";
import { Button } from "azure-devops-ui/Button";
import { useStateValue, IOKRContext } from "../../../StateMangement/StateProvider";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsEditProps {
	draftArea: Area,
	buttons: JSX.Element; 
	updateDraftName: (name: string) => void;
	updateDraftDescription: (description: string) => void;
}

export const AreaCardDetailsEdit: React.FunctionComponent<IAreaCardDetailsEditProps> = props => {
	const { draftArea, buttons, updateDraftName, updateDraftDescription } = props;		

	return <>
		<div className="card-header">
			<h3>
				<input value={draftArea.Name} onChange={(val) => { updateDraftName(val.target.value) }} />
			</h3>			
			{buttons}
		</div>
		<input value={draftArea.Description} onChange={(val) => {updateDraftDescription(val.target.value) }} />
	</>;
};