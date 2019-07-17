import * as React from "react";
import { AreaGrid } from "./AreaGrid";
import { useAreas } from "../Area/AreaService";
import { useObjectives } from "../Objective/ObjectiveService";

export const AreaView: React.FunctionComponent<{}> = props => {

    const areas = useAreas();
    const objectives = useObjectives(); 

    let content = <div>Loading...</div>;
    if (areas) {
        content = <AreaGrid areas={areas} objectives={objectives} />;
    }

    return content;
}