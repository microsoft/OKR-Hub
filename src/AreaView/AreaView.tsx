import * as React from "react";
import { AreaGrid } from "./AreaGrid";
import { Header } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { AddAreaPanel } from '../AreaPanel/AddAreaPanel';
import { useStateValue } from "../StateMangement/StateProvider";
import { NavigationConstants } from "../OKRConstants";
import { Area } from "../Area/Area";
import { ErrorMessage } from "../ErrorMessage";

export const AreaView: React.FunctionComponent<{}> = props => {
    const stateContext = useStateValue();

    const areaNavigateCallBack = (area: Area): void => {
        stateContext.actions.navigatePage({
            selectedArea: area,
            pageLocation: NavigationConstants.DetailView
        })
    };
    const editAreaCallback = (area: Area): void => {
        stateContext.actions.editArea(area)
    };
    const dismissError = (): void => {
        stateContext.actions.setError({error: undefined});
    }; 
    const removeAreaCallback = (id: string, areaId: string): void => {
        stateContext.actions.removeArea({
            id: id,
            areaId: areaId
        });
    };

    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            important: true,
            id: "create-area",
            text: "New Product Area", // TODO: Resource file for localization
            onActivate: () => {
                stateContext.actions.toggleAreaPanel({
                    expanded: true
                });
            },
            iconProps: {
                iconName: "Add"
            }
        }
    ];

    let content = <div>Loading...</div>;

    // Don't show anything until we have fetched the areas and objectives    
    if (stateContext.state.areas && stateContext.state.objectives) {
        content =
            <div>
                <Header
                    className={"area-view-header"}
                    commandBarItems={[...commandBarItems]}
                    title={"Azure Devops"}
                />
                <ErrorMessage onDismiss={dismissError} error={stateContext.state.error} />
                <AddAreaPanel />
                <AreaGrid areas={stateContext.state.areas} objectives={stateContext.state.objectives} navigateCallback={areaNavigateCallBack} updateAreaCallback={editAreaCallback} removeAreaCallback={removeAreaCallback}/>
            </div>
    }

    return content;
}