import * as React from "react";
import { Objective } from "../../Objective/Objective";
import { AreaCardProgress } from "./ActiveCardProgress";
import { TextField } from "azure-devops-ui/TextField";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { MutableField } from "../../MutableField";

export interface IAreaCardDetailsProps {
	name: string;
	description: string;
	objectives: Objective[];
}

export class AreaCardDetails extends React.Component<IAreaCardDetailsProps> {
	public render(): JSX.Element {
		const { objectives } = this.props;

		return <>
			<h3>
				<MutableField value={this.props.name} onChange={() => {console.log("saved");}} />
			</h3>
			<p>
				<MutableField value={this.props.description} onChange={() => {}} />
			</p>
			<h4>{`${objectives.length} objectives`}</h4>
			<AreaCardProgress objectives={objectives} />
		</>;
	}

	private save = (): void => {

	};
}