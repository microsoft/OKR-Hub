import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext } from '../StateMangement/StateProvider';
import AreaForm from "./AreaForm";
import "./AddOKRPanel.scss";

interface IAddAreaPanelState {
    expanded: boolean;
}

export class AddAreaPanel extends React.Component<{}, IAddAreaPanelState> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const [{ areaPanelExpanded }, actions] = this.context;
        return (
            <div>
                {areaPanelExpanded && (
                    <Panel
                        calloutClassName={"add-area-panel"}
                        showSeparator
                        onDismiss={() =>
                            actions.toggleAreaPanel({
                                expanded: false
                            })}
                        titleProps={{ text: "Add Area" }}
                    >
                        <div className="panel-content">
                            <AreaForm />
                        </div>
                    </Panel>
                )
                }
            </div>
        );
    }
}