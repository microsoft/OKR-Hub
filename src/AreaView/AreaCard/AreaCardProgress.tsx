import * as React from "react";
import Circle from "react-circle";
import { Objective } from "../../Objective/Objective";

export interface IAreaCardProgressProps {
	objectives: Objective[];
}

export class AreaCardProgress extends React.Component<IAreaCardProgressProps> {
	public render(): JSX.Element {
		const areaProgress = this.calculateProgress();

		return <div className="area-progress">
			<span className="area-circle">
				<Circle
					progress={areaProgress * 100}
					showPercentage={false}
					size={"35"}
					lineWidth={"70"}
					progressColor={"rgb(0, 200, 100)"}
				/>
			</span>			
		</div>;
	}

	public calculateProgress(): number {
		const { objectives } = this.props;
		if (objectives.length > 0) {
			let completedObjectives = 0;
			objectives.forEach((o) => {
				const completedKRs = o.KRs.filter((kr) => { kr.Status === "Success"; })
				const isObjectiveDone = completedKRs.length / o.KRs.length === 1;
				isObjectiveDone ? completedObjectives += 1 : null;
			});

			return completedObjectives / objectives.length;
		}

		return 0;
	}
}