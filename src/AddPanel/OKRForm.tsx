import * as React from "react";
import { StateContext } from "../StateProvider";
import { Button } from "azure-devops-ui/Button";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { TextField } from "azure-devops-ui/TextField";
import { KR, Objective } from "../Objective/Objective";
import { ObjectiveService } from "../Objective/ObjectiveService";
import produce from "immer";
import { Guid } from "guid-typescript";
export interface IOKRFormProps {
    objectiveName: string;
    krs: KR[];
}

export interface IOKRFormState {
    name: string;
    owner: [];
    krs: KR[];
    comments: [];
}

export default class OKRForm extends React.Component<IOKRFormProps, IOKRFormState> {
    static contextType = StateContext;
    constructor(props: IOKRFormProps) {
        super(props)
        this.state = {
            name: props.objectiveName,
            owner: [],
            krs: props.krs,
            comments:[]
        }
    }
    
    public render(): JSX.Element {
        const [{ areas, selectedArea, timeFrame }, dispatch] = this.context;
        const { name, krs } = this.state
        return (
            <>
            <div className="okr-form-fields">
                <TextField
                    className="okr-form-objective-name"
                    placeholder="Objective"
                    value={name}
                    onChange={(e, newValue) => {
                        this.setState({name: newValue});
                    }}
                />
                <div className="okr-form-krs">
                    { krs && krs.map((kr) => (
                    <div className="kr-editor">
                        <TextField
                            value={kr.Content}
                            placeholder="Key Result"
                            multiline={true}
                            onChange={(e, newValue) => {
                                this.setState(produce(this.state, draft => {
                                    var found = draft.krs.filter((x) => x.Id === kr.Id)[0];
                                    found.Content = newValue;
                                }));
                            }}
                        />
                        <Button iconProps={{ iconName: "Delete" }} onClick={() => {
                            this.setState({krs: krs.filter((x) => x.Id !== kr.Id)});
                        }}/>
                    </div>))}
                </div>
                <Button className="okr-form-add-kr" text="Add KR" iconProps={{ iconName: "Add" }} onClick={() => {
                    this.setState({krs: [...krs, {
                        Id: Guid.create(),
                        Content: "",
                        Status:  "Queued",
                        Comment: ""
                    }]});
                }}/>
                </div>
            <div className="okr-form-submit">
            <ButtonGroup>
                <Button text="Cancel" onClick={() => {
                    dispatch({
                        type: 'cancelCreation'
                        });
                }}/>
                <Button text="Create" primary={true} onClick={() => {
                    var toBeCreated = {
                            Owner: this.state.owner,
                            Name: this.state.name,
                            Comments: this.state.comments,
                            KRs: this.state.krs,
                            AreaId: selectedArea.AreaId || (areas && areas[0].AreaId) || "test",
                            TimeFrame: timeFrame,
                            Progress: 0
                    }
                    ObjectiveService.instance.create(toBeCreated).then((created) => {
                        dispatch({
                            type: 'createOKRSucceed',
                            payload: created
                        });
                    }, (error) => {
                        // TODO: error experience
                    });
                }}/>
             </ButtonGroup>
             </div>
            </>
        );
    }
}

