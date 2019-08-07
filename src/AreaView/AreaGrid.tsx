import * as React from "react";
import { Area } from "../Area/Area";
import { AreaCard } from "./AreaCard/AreaCard";
import { AreaZeroData } from "./AreaZeroData";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";

export interface IAreaGridProps {
    areas: Area[];    
}

export class AreaGrid extends React.Component<IAreaGridProps> {
    static contextType = StateContext;
    public render(): JSX.Element {
        const { areas } = this.props;
        const stateContext = this.context as IOKRContext;
        if (areas && areas.length > 0) {
            return <div className="area-grid">
                {this.props.areas.map((area, index) =>
                    <AreaCard
                        area={area}                        
                        identityProvider={stateContext.state.identityProvider}
                        key={index}                                                
                    />
                )}
            </div>
        }
        else {
            return <AreaZeroData />; 
        }
    }
}