import * as React from "react";
import { AreaGrid } from "./AreaGrid";
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

    let content = <div>Loading...</div>;
    if (areas) {
        content = <AreaGrid areas={areas} objectives={objectives} />;
    }

    return content;
}