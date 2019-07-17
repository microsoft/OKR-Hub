import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext } from '../StateProvider';
import OKRForm from "./OKRForm";
import "./AddOKRPanel.scss";
import { ObjectiveService } from "../Objective/ObjectiveService";

interface IAddOKRPanelState {
    expanded: boolean;
}

export default class AddOKRPanel extends React.Component<{}, IAddOKRPanelState> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const [{ addPanelExpanded, pendingObjective }, dispatch] = this.context;
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
                        footerButtonProps={[
                            { text: "Create", primary: true,  onClick: () => {
                                ObjectiveService.instance.create(pendingObjective).then((created) => {
                                    dispatch({
                                        type: 'createOKRSucceed',
                                        id: created.id
                                    });
                                }, (error) => {
                                    // TODO: error experience
                                });
                            }},
                            { text: "Cancel", onClick: () => dispatch({
                                type: 'cancelCreation',
                              }) 
                            }
                        ]}
                    >
                        <div className="panel-content">
                            <OKRForm />
                        </div>
                    </Panel>
                )}
            </div>
        );
    }
}