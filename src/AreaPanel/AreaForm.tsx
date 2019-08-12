import * as React from "react";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { Button } from "azure-devops-ui/Button";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { TextField } from "azure-devops-ui/TextField";
import { Guid } from "guid-typescript";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { MutableIdentity } from "../MutableIdentity";

export interface IAreaFormProps {
    identityProvider: IPeoplePickerProvider;
}

export interface IAreaFormState {
    name: string;
    description: string;
    ownerId: string;
    ownerName: string;
}

export default class AreaForm extends React.Component<IAreaFormProps, IAreaFormState> {
    static contextType = StateContext;
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            ownerId: undefined,
            ownerName: undefined,
        }
    }

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;
        const { name, description } = this.state;
        const { identityProvider } = this.props;

        const updateOwnerState = (updatedOwnerId: string, updatedOwnerName: string) => {
            this.setState({ ownerId: updatedOwnerId, ownerName: updatedOwnerName });
        }

        return (
            <>
                <div className="area-form-fields">
                    <TextField
                        className="area-field"
                        placeholder="Product Area"
                        value={name}
                        onChange={(e, newValue) => {
                            this.setState({ name: newValue });
                        }}
                    />
                    <TextField
                        className="area-field"
                        placeholder="Description"
                        value={description}
                        multiline={true}
                        onChange={(e, newValue) => {
                            this.setState({ description: newValue });
                        }}
                    />
                    <div className={"area-field"}>
                        <MutableIdentity className="area-identity" identity={{} as any} identityProvider={identityProvider} editMode={true} updateDraftOwner={updateOwnerState} />
                    </div>
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
                                OwnerId: this.state.ownerId ? this.state.ownerId : "",
                                OwnerName: this.state.ownerName ? this.state.ownerName : ""
                            }

                            if (stateContext.state.displayedTimeFrame === undefined && stateContext.state.areas.length === 0) {
                                stateContext.actions.createFirstArea(toBeCreated);
                            }
                            else {
                                stateContext.actions.createArea(toBeCreated);
                            }

                        }} />
                    </ButtonGroup>
                </div>
            </>
        );
    }
}

