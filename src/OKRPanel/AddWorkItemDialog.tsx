import React = require("react");
import { Dialog } from "azure-devops-ui/Dialog";
import { TextField } from "azure-devops-ui/TextField";
import { ObservableValue } from "azure-devops-ui/Core/Observable";

export interface IAddWorkItemDialog {
    isDialogOpen: boolean;
    onCancel: () => void;
    onAdd: (ids: string[]) => void;
}

export class AddWorkItemDialog extends React.Component<IAddWorkItemDialog> {
    private simpleObservable = new ObservableValue<string>("");

    public render(): JSX.Element {
        const { isDialogOpen, onCancel, onAdd } = this.props;
        return isDialogOpen ? (
            <Dialog
                titleProps={{ text: "Add WorkItem" }}
                footerButtonProps={[
                    {
                        text: "Cancel",
                        onClick: () => {
                            onCancel();
                        }
                    },
                    {
                        text: "OK", primary: true, onClick: () => {
                            onAdd(this.simpleObservable.value.split(","))
                        }
                    }
                ]}
                onDismiss={() => {
                    onCancel();
                }}>
                <TextField
                    value={this.simpleObservable}
                    onChange={(e, newValue) => (this.simpleObservable.value = newValue)}
                    placeholder="Enter work item ids, separated by comma"
                />
            </Dialog>
        ) : null;

    }
}