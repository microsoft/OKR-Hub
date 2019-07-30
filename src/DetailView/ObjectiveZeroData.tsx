
import * as React from "react";
import { ZeroData } from "azure-devops-ui/ZeroData";

export class ObjectivesZeroDataProps{
    areaName: string; 
}

export class ObjectiveZeroData extends React.Component<ObjectivesZeroDataProps, {}> {

    public render(): JSX.Element {        
        const {areaName } = this.props; 

        const zeroDataSecondaryText = "Create some Objectives and Key Results for " + areaName;        

        return <ZeroData
            imagePath={require('../Resources/ToDo.png')}
            imageAltText={"Todo list"}            
            secondaryText={zeroDataSecondaryText}>
        </ZeroData>;
    }

}