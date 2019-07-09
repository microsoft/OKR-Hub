import * as React from "react";
import { Objective } from "./Objective";
import { TextField } from "azure-devops-ui/TextField";
//import "./Obj.css";
//import "./Objective.scss";

export interface IObjectiveItemProps {
    objective: Objective;
    objectiveUpdated: (objective) => void;
}

export interface IObjectiveItemState {
    editMode: boolean;
    editCopy: Objective;
}

export class ObjectiveItem extends React.Component<IObjectiveItemProps, IObjectiveItemState> {
    public constructor(props: IObjectiveItemProps, state: IObjectiveItemState) {
        super(props, state);

        this.state = {
            editMode: false,
            editCopy: undefined,
        }
    }

    public render(): JSX.Element {
        const displayFields = ["Name", "Owner", "Area", "Status"];
        return (<>
            <div>
                {displayFields.map(field => {
                    return this.renderField(field)
                })}
            </div>
            <button onClick={this.toggleEditMode}>EditMode</button>
        </>);
    }

    private renderField(field: string): JSX.Element {
        const { objective } = this.props;

        return (
            <div>
                <label>{field}</label>

                {this.state.editMode ?
                    <TextField
                        value={this.state.editCopy[field]}
                        onChange={(_, newValue) => { this.onFieldChange(field, newValue) }}
                    />
                    : <span>{objective[field]}</span>
                }
            </div>
        );
    }

    private toggleEditMode = async () => {
        if (!this.state.editMode) {
            this.setState({ editCopy: { ...this.props.objective } });
        } else {
            // TODO: Check for no changes.
            await this.props.objectiveUpdated(this.state.editCopy);
        }

        this.setState({ editMode: !this.state.editMode });
    };

    private onFieldChange = (field, newValue) => {
        const updatedCopy = { ...this.state.editCopy }; // Is the copy necessary?
        updatedCopy[field] = newValue;
        this.setState({ editCopy: updatedCopy });
    };
}