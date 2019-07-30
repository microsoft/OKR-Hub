import * as React from "react";
import { ZeroData, ZeroDataActionType } from "azure-devops-ui/ZeroData";

export class AreaZeroData extends React.Component<{}, {}> {

    public render(): JSX.Element {
        const zeroDataString = "Welcome to the OKR Hub!";
        const zeroDataSecondaryText = "Create a Product Area, a grouping of OKRs around product, team, or service.";        
        const zeroDataActionText = "Add Product Area"

        return <ZeroData
            imagePath={'https://cdn.vsassets.io/ext/ms.vss-dashboards-web/dashboard-view-content/images/empty-dashboard.438voqpTHNBIHWTG.svg'}
            imageAltText={zeroDataActionText}
            primaryText={zeroDataString}
            secondaryText={zeroDataSecondaryText}
            actionText={zeroDataActionText}
            actionType={ZeroDataActionType.ctaButton} 
            onActionClick={(event, item) =>
                alert("TODO - open: " + item!.actionText)
            }
            />
    }

}