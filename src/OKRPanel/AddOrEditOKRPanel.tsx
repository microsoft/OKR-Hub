import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext, IOKRContext } from '../StateMangement/StateProvider';
import OKRForm from "./OKRForm";
import "./AddOrEditOKRPanel.scss";
import { Objective } from "../Objective/Objective";
import { cancelCreationOrEdit } from "../StateMangement/OKRActionTypes";

interface IAddOrEditOKRPanelProps {
    title: string;
    objective?: Objective;
}

export default class AddOrEditOKRPanel extends React.Component<IAddOrEditOKRPanelProps, {}> {
    static contextType = StateContext;

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;
        const { title, objective } = this.props;
        return (
            <div>
                <Panel
                        calloutClassName={"add-objective-panel"}
                        showSeparator
                        onDismiss={() => stateContext.actions.cancelCreationOrEdit({})}
                        titleProps={{ text: title }}
                    >
                        <div className="panel-content">
                            <OKRForm objective={objective}/>
                        </div>
                </Panel>
            </div>
        );
    }
}