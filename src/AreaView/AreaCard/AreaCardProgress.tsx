import * as React from "react";
import Circle from "react-circle";
import { Objective } from "../../Objective/Objective";

export interface IAreaCardProgressProps {
	objectives: Objective[];
}

export const AreaCardProgress: React.FunctionComponent<IAreaCardProgressProps> = props => {
	const areaProgress = calculateProgress(props.objectives);

	return <div className="area-progress">
		<span className="area-circle">
			<Circle
				progress={areaProgress * 100}
				showPercentage={false}
				size={"80"}
				lineWidth={"40"}
				progressColor={"rgb(0, 200, 100)"}
				animate={true}
				bgColor={"rgb(201, 201, 201)"}
			/>
		</span>
	</div>;
}

function calculateProgress(objectives: Objective[]): number {
	let allCompletedKRs = 0;
	let allKrs = 0;

	objectives.forEach((o) => {
		const completedKRs = o.KRs.filter((kr) => { return kr.Status === "Completed" });
		allCompletedKRs += completedKRs.length;
		allKrs += o.KRs.length;
	});

	return allKrs > 0 ? (allCompletedKRs / allKrs) : 0;
}; 
