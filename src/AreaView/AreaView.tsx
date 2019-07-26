import * as React from "react";
import { AreaGrid } from "./AreaGrid";
import { Header } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { AddAreaPanel } from '../AreaPanel/AddAreaPanel';
import { useStateValue } from "../StateMangement/StateProvider";
import { useEffect } from "react";
import { NavigationConstants } from "../OKRConstants";
import { Area } from "../Area/Area";

export const AreaView: React.FunctionComponent<{}> = props => {
    const [{ objectives, areas }, actions] = useStateValue();

    useEffect(() => {
        if (objectives.length === 0) {
            actions.getObjectives();
        }
        if (areas.length === 0) {
            actions.getAreas();
        }
    });

    const areaNavigateCallBack = (area: Area): void => {
        actions.navigatePage({
            selectedArea: area,
            pageLocation: NavigationConstants.DetailView
        })
    }

    const editAreaCallback = (area: Area): void => {
        actions.editArea(area)
    }

    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            important: true,
            id: "create-area",
            text: "New Area", // TODO: Resource file for localization
            onActivate: () => {
                actions.toggleAreaPanel({
                    expanded: true
                });
            },
            iconProps: {
                iconName: "Add"
            }
        }
    ];

    let content = <div>Loading...</div>;

    if (areas) {
        content =
            <div>
                <Header
                    className={"area-view-header"}
                    commandBarItems={[...commandBarItems]}
                    title={"Azure Devops"}
                />
                <AddAreaPanel />
                <AreaGrid areas={areas} objectives={objectives} navigateCallback={areaNavigateCallBack} updateAreaCallback={editAreaCallback} />
            </div>
    }

    return content;
}