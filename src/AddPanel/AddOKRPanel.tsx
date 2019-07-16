import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext } from '../StateProvider';

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
                        showSeparator
                        onDismiss={() => dispatch({
                            type: 'togglePanel',
                            expanded: false
                          })}
                        titleProps={{ text: "Add OKR" }}
                        footerButtonProps={[
                            { text: "Create", primary: true },
                            { text: "Cancel", onClick: () => dispatch({
                                type: 'togglePanel',
                                expanded: false
                              }) }
                        ]}
                    >
                        <div style={{ height: "1200px" }}>Panel Content</div>
                    </Panel>
                )}
            </div>
        );
    }
}