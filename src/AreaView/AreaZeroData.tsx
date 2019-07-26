
import * as React from "react";
import { ZeroData } from "azure-devops-ui/ZeroData";

export class AreaZeroData extends React.Component<{}, {}> {

    public render(): JSX.Element {
        const zeroDataString = "Welcome to the OKR Hub!";
        const zeroDataSecondaryText = "To get started, create a new Product Area. Product Areas are a way to group your OKRs. It may be grouped by team, by product, or by service.";        

        return <ZeroData
            imagePath={require('../Resources/ToDo.svg')}
            imageAltText={"Todo list"}
            primaryText={zeroDataString}
            secondaryText={zeroDataSecondaryText}>
        </ZeroData>;
    }

}