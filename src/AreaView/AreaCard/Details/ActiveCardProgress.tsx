import * as React from "react";
import Circle from "react-circle";
import { Objective } from "../../../Objective/Objective";
import { useAreaCardValue } from "../Provider/AreaCardProvider";

export const AreaCardProgress: React.FunctionComponent = props => {
	const [{objectives}, areaDispatcher] = useAreaCardValue();

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