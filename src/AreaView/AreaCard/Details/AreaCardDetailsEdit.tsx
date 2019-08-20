import * as React from "react";
import { Area } from "../../../Area/Area";
import { TextField } from "azure-devops-ui/TextField";

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
				<TextField className="card-product-area-form" value={draftArea.Name} onChange={(val) => { updateDraftName(val.target.value) }} placeholder={"Product Area Name"}/>
			</h3>			
			{buttons}
		</div>
		<div className="card-desc-form">
			<TextField value={draftArea.Description} multiline={true} placeholder={"Description"} onChange={(val) => {updateDraftDescription(val.target.value) }}/>		
		</div>
	</>;
};