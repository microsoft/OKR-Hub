import * as React from "react";
import { AreaCardProgress } from "./ActiveCardProgress";
import { AreaCardDetailsStatic } from "./AreaCardDetailsStatic";
import { useAreaCardValue } from "../Provider/AreaCardProvider";
import { AreaCardDetailsEdit } from "./AreaCardDetailsEdit";

export const AreaCardDetails: React.FunctionComponent = props => {
	const [{ objectives, editMode }] = useAreaCardValue();

	return <>
		{editMode ? <AreaCardDetailsEdit /> : <AreaCardDetailsStatic />}
		<h4>{`${objectives.length} objectives`}</h4>
		<AreaCardProgress />
	</>
}