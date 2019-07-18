import * as React from "react";
import Circle from "react-circle";
import { Objective } from "../../Objective/Objective";

export interface IAreaCardProgressProps {
	objectives: Objective[];
}

export class AreaCardProgress extends React.Component<IAreaCardProgressProps> {
	public render(): JSX.Element {
		return <div className="area-progress">
			{this.props.objectives.map((objective, index) => {
				return <span className="area-circle" key={index}>
					<Circle
						progress={objective.Progress * 100}
						showPercentage={false}
						size={"35"}
						lineWidth={"70"}
						progressColor={"rgb(0, 200, 100)"}
					/>
				</span>
			})}
		</div>;
	}
}