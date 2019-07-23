import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext } from '../StateProvider';
import AreaForm from "./AreaForm";
import "./AddOKRPanel.scss";

interface IAddAreaPanelState {
    expanded: boolean;
}

export class AddAreaPanel extends React.Component<{}, IAddAreaPanelState> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const [{ addAreaPanelExpanded }, dispatch] = this.context;
        return (
            <div>
                { addAreaPanelExpanded && (
                    <Panel
                        calloutClassName={"add-area-panel"}
                        showSeparator
                        onDismiss={() => dispatch({
                            type: "toggleAddArea",
                            expanded: false
                          })}
                        titleProps={{ text: "Add Area" }}
                    >
                        <div className="panel-content">
                            <AreaForm name="" description=""/>
                        </div>
                    </Panel>
                )}
            </div>
        );
    }
}