import * as React from "react";
import { AreaGrid } from "./AreaGrid";
import { useAreas } from "../Area/AreaService";
import { useObjectives } from "../Objective/ObjectiveService";
import { Header } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { useStateValue } from '../StateProvider';
import { AddAreaPanel} from '../AreaPanel/AddAreaPanel';

export const AreaView: React.FunctionComponent<{}> = props => {

    const areas = useAreas();
    const objectives = useObjectives();

    const [{ selectedArea }, dispatch] = useStateValue();

    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            important: true,
            id: "create-area",
            text: "New Area", // TODO: Resource file for localization
            onActivate: () => {
                dispatch({
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