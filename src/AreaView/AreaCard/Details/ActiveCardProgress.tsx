import * as React from "react";
import Circle from "react-circle";
import { Objective } from "../../../Objective/Objective";
import { Area } from "../../../Area/Area";

export interface IAreaCardProgressProps {
	area: Area,
	objectives: Objective[],
}

export const AreaCardProgress: React.FunctionComponent<IAreaCardProgressProps> = props => {
	const {objectives} = props;

	return <div className="area-progress">
		{objectives.map((objective, index) => {
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