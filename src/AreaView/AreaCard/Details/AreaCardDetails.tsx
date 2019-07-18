import * as React from "react";
import { Objective } from "../../../Objective/Objective";
import { AreaCardProgress } from "./ActiveCardProgress";
import { MutableField } from "../../../MutableField";
import { AreaCardDetailsStatic } from "./AreaCardDetailsStatic";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsProps {
	area: Area;
	objectives: Objective[];
	editMode: boolean;
}

export class AreaCardDetails extends React.Component<IAreaCardDetailsProps> {
	public render() {
		const { objectives } = this.props;

		return <>
			{this.props.editMode ? this.renderEditDetails() : <AreaCardDetailsStatic {...this.props} />}
			<h4>{`${objectives.length} objectives`}</h4>
			<AreaCardProgress objectives={objectives} />
		</>;
	}

	private renderEditDetails = (): JSX.Element => {
		const { area } = this.props;

		return <>
			<h3>
				<MutableField value={area.Name} onChange={() => { console.log("saved"); }} />
			</h3>
			<p>
				<MutableField value={area.Description} onChange={() => { }} />
			</p>
		</>;
	};

	private save = (): void => {

	};
}