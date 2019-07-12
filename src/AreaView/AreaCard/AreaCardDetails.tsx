import * as React from "react";
import { Objective } from "../../Objective/Objective";
import { AreaCardProgress } from "./ActiveCardProgress";

export interface IAreaCardDetailsProps {
	name: string;
	description: string;
	objectives: Objective[];
}

export interface IAreaCardDetailsState {
    editName: boolean;
    editDescription: boolean;
}

export class AreaCardDetails extends React.Component<IAreaCardDetailsProps, IAreaCardDetailsState> {
	public constructor(props: IAreaCardDetailsProps, state: IAreaCardDetailsState) {
		super(props, state);

		this.state = {
			editName: undefined,
			editDescription: undefined,
		};
	}

	public render(): JSX.Element {
		const { description, objectives } = this.props;
		
		return <>
			{this.renderName()}
			<p className="area-description">{description}</p>
			<h4>{`${objectives.length} objectives`}</h4>
			<AreaCardProgress objectives={objectives} />
		</>;
	}

	private renderName = (): JSX.Element => {
        let content = <h3 className="area-name" onClick={this.onNameClick}>{this.props.name}</h3>

        if (this.state.editName) {
            content = <input className="area-name-edit" onChange={this.onNameChange} />
        }

        return content;
	};

	private onNameClick = (): void => {
        this.setState({ editName: true });
    };
	
	private onNameChange = (): void => {
	}
}