
import * as React from "react";
import { Area } from "../Area/Area";
import { AreaCard } from "./AreaCard/AreaCard";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { IdentityProvider } from "../Identity/IdentityProvider";
import { Objective } from "../Objective/Objective";

export interface IAreaGridProps {
    areas: Area[];
    objectives: Objective[];
}

export class AreaGrid extends React.Component<IAreaGridProps> {
    private identityProvider: IPeoplePickerProvider = new IdentityProvider();

    public render(): JSX.Element {
        return <div className="area-grid">
            {this.props.areas.map((area, index) => 
                <AreaCard
                    area={area}
                    objectives={this.getObjectives(area.AreaId)}
                    identityProvider={this.identityProvider}
                    key={index}
                />
            )}
        </div>;
    }

    private getObjectives(areaId: string): Objective[] {
        return this.props.objectives.filter(objective => objective.AreaId === areaId);
    }
}