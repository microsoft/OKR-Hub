import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext } from '../StateProvider';
import OKRForm from "./OKRForm";
import "./AddOKRPanel.scss";

interface IAddOKRPanelState {
    expanded: boolean;
}

export default class AddOKRPanel extends React.Component<{}, IAddOKRPanelState> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const [{ addPanelExpanded }, dispatch] = this.context;
        return (
            <div>
                { addPanelExpanded && (
                    <Panel
                        calloutClassName={"add-objective-panel"}
                        showSeparator
                        onDismiss={() => dispatch({
                            type: 'togglePanel',
                            expanded: false
                          })}
                        titleProps={{ text: "Add OKR" }}
                    >
                        <div className="panel-content">
                            <OKRForm objectiveName={""} krs={[]}/>
                        </div>
                    </Panel>
                )}
            </div>
        );
    }
}