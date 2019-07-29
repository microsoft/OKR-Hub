import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext, IOKRContext } from '../StateMangement/StateProvider';
import AreaForm from "./AreaForm";
import "./AddOKRPanel.scss";

interface IAddAreaPanelState {
    expanded: boolean;
}

export class AddAreaPanel extends React.Component<{}, IAddAreaPanelState> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;
        return (
            <div>
                {stateContext.state.areaPanelExpanded && (
                    <Panel
                        calloutClassName={"add-area-panel"}
                        showSeparator
                        onDismiss={() =>
                            stateContext.actions.toggleAreaPanel({
                                expanded: false
                            })}
                        titleProps={{ text: "Add Product Area" }}
                    >
                        <div className="panel-content">
                            <AreaForm />
                        </div>
                    </Panel>
                )}
            </div>
        );
    }
}