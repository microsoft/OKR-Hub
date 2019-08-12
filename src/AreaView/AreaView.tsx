import * as React from "react";
import { AreaGrid } from "./AreaGrid";
import { Header } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { AddAreaPanel } from '../AreaPanel/AddAreaPanel';
import { useStateValue } from "../StateMangement/StateProvider";
import { ErrorMessage } from "../ErrorMessage";
import { TimeFrameSettings } from "../TimeFrameSettings/TimeFrameSettings";

export const AreaView: React.FunctionComponent<{}> = props => {
    const stateContext = useStateValue();

    const dismissError = (): void => {
        stateContext.actions.setError({error: undefined});
    }; 

    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            important: true,
            id: "create-area",
            text: "New Product Area",
            onActivate: () => {
                stateContext.actions.toggleAreaPanel({
                    expanded: true
                });
            },
            iconProps: {
                iconName: "Add"
            }
        }, 
        {
            important: true,
            id: "settings",
            onActivate: () => {
                stateContext.actions.toggleSettings({ expanded: true });
            },
            iconProps: {
                iconName: "Settings"
            }
        }
    ];

    let content = <div>Loading...</div>;

    // Don't show anything until we have fetched the areas and objectives    
    if (stateContext.state.areas) {
        let cbItems = [...commandBarItems]
        // TODO: wait for ZeroData CTA working to enable this hide
        // ZeroData - hide New Product Area button
        // if(stateContext.state.areas && stateContext.state.areas.length < 1){
        //     cbItems = []
        // }
        content =
            <div>
                <Header
                    className={"area-view-header"}
                    commandBarItems={cbItems}
                    title={stateContext.state.projectName}
                />
                <ErrorMessage onDismiss={dismissError} error={stateContext.state.error} />
                <AddAreaPanel />
                {stateContext.state.settingsExpanded && <TimeFrameSettings timeFrames={stateContext.state.timeFrames} />}
                <AreaGrid areas={stateContext.state.areas} />
            </div>
    }

    return content;
}