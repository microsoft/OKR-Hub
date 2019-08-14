import * as React from "react";
import { ZeroData, ZeroDataActionType } from "azure-devops-ui/ZeroData";
import { StateContext, IOKRContext } from "../StateManagement/StateProvider";

export class ObjectivesZeroDataProps{
    areaName: string; 
}

export class ObjectiveZeroData extends React.Component<ObjectivesZeroDataProps, {}> {
    static contextType = StateContext;

    public render(): JSX.Element {        
        const {areaName} = this.props; 
        const zeroDataSecondaryText = "Create Objectives and Key Results for " + areaName;        
        const zeroDataActionText = "Add OKR"
        const stateContext = this.context as IOKRContext;
        
        return <ZeroData
            imagePath={'https://cdn.vsassets.io/ext/ms.vss-dashboards-web/dashboard-view-content/images/empty-dashboard.438voqpTHNBIHWTG.svg'}
            imageAltText={zeroDataActionText}            
            secondaryText={zeroDataSecondaryText}
            actionText={zeroDataActionText}
            actionType={ZeroDataActionType.ctaButton} 
            onActionClick={() => {
                stateContext.actions.toggleAddPanel({ expanded: true });
            }
            }>
        </ZeroData>;
    }

}