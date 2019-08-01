import * as React from "react";
import { Area } from "../Area/Area";
import { AreaCard } from "./AreaCard/AreaCard";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { IdentityProvider } from "../Identity/IdentityProvider";
import { AreaZeroData } from "./AreaZeroData";

export interface IAreaGridProps {
    areas: Area[];    
    removeAreaCallback: (id: string, areaId: string) => void;
    onCardClick: (area: Area) => void;
}

export class AreaGrid extends React.Component<IAreaGridProps> {

    private identityProvider: IPeoplePickerProvider = new IdentityProvider();

    public render(): JSX.Element {
        const { areas } = this.props;

        if (areas && areas.length > 0) {
            return <div className="area-grid">
                {this.props.areas.map((area, index) =>
                    <AreaCard
                        area={area}                        
                        identityProvider={this.identityProvider}
                        key={index}
                        removeAreaCallback={this.props.removeAreaCallback}
                        onCardClick={this.props.onCardClick}
                    />
                )}
            </div>
        }
        else {
            return <AreaZeroData />; 
        }
    }
}