import * as React from "react";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { Button } from "azure-devops-ui/Button";
import { TextField } from "azure-devops-ui/TextField";
import { Guid } from "guid-typescript";
import { AreaService } from "../Area/AreaService";

export interface IAreaFormState {
    name: string;
    description: string;
}

export default class AreaForm extends React.Component<{}, IAreaFormState> {
    static contextType = StateContext;
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
        }
    }

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;
        const { name, description } = this.state
        return (
            <>
                <div className="area-form-fields">
                    <div>{"Name"}</div>
                    <TextField
                        className="area-form-name"
                        value={name}
                        onChange={(e, newValue) => {
                            this.setState({ name: newValue });
                        }}
                    />
                    <div>{"Description"}</div>
                    <TextField
                        className="area-form-description"
                        value={description}
                        onChange={(e, newValue) => {
                            this.setState({ description: newValue });
                        }}
                    />
                </div>
                <div className="okr-form-submit">
                    <Button text="Create" primary={true} onClick={() => {
                        var toBeCreated = {
                            Name: this.state.name,
                            Description: this.state.description,
                            Version: 0,
                            AreaId: Guid.create().toString(),
                            OwnerId: "",
                        }

                        stateContext.actions.createArea({ toBeCreated })

                    }} />
                    <Button text="Cancel" onClick={() => {
                        stateContext.actions.toggleAreaPanel({
                            expanded: false
                        })
                    }
                    } />
                </div>
            </>
        );
    }
}

