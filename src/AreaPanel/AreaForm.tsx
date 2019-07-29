import * as React from "react";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { Button } from "azure-devops-ui/Button";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { TextField } from "azure-devops-ui/TextField";
import { Guid } from "guid-typescript";

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
                    <TextField
                        className="area-form-name"
                        placeholder="Product Area"
                        value={name}
                        onChange={(e, newValue) => {
                            this.setState({ name: newValue });
                        }}
                    />
                    <TextField
                        className="area-form-description"
                        placeholder="Description"
                        value={description}
                        onChange={(e, newValue) => {
                            this.setState({ description: newValue });
                        }}
                    />
                </div>
                <div className="area-form-submit">
                    <ButtonGroup>
                        <Button text="Cancel" onClick={() => {
                            stateContext.actions.toggleAreaPanel({
                                expanded: false
                            })
                        }} />
                        <Button text="Create" primary={true} onClick={() => {
                            var toBeCreated = {
                                Name: this.state.name,
                                Description: this.state.description,
                                Version: 0,
                                AreaId: Guid.create().toString(),
                                OwnerId: "",
                            }

                        stateContext.actions.createArea(toBeCreated)

                        }} />
                    </ButtonGroup>
                </div>
            </>
        );
    }
}

