import * as React from "react";
import { AreaGrid } from "./AreaGrid";
import { Header } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { AddAreaPanel} from '../AreaPanel/AddAreaPanel';
import { useStateValue } from "../StateMangement/StateProvider";
import { useEffect } from "react";

export const AreaView: React.FunctionComponent<{}> = props => {
    const [{objectives, areas }, actions] = useStateValue();    

    useEffect(() => {
        if (objectives.length === 0) {
            actions.getObjectives();
        }
        if (areas.length === 0) {
            actions.getAreas();
        }
    });

    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            important: true,
            id: "create-area",
            text: "New Area", // TODO: Resource file for localization
            onActivate: () => {
                actions({
                    type: 'toggleAddArea',
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
                />
                <AddAreaPanel />
                <AreaGrid areas={areas} objectives={objectives} />
            </div>
    }

    return content;
}