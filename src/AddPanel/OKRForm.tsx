import * as React from "react";
import { StateContext } from "../StateProvider";
import { Button } from "azure-devops-ui/Button";
import { TextField } from "azure-devops-ui/TextField";
import { KR, Objective } from "../Objective/Objective";
import { ObjectiveService } from "../Objective/ObjectiveService";
import { generateUID } from "VSS/Utils/String";
import produce from "immer";

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
        const [{ area, timeFrame }, dispatch] = this.context;
        const { name, krs } = this.state
        return (
            <>
            <TextField
                className="okr-form-objective-name"
                key={"objectiveName"}
                value={name}
                onChange={(e, newValue) => {
                    this.setState({name: newValue});
                }}
            />
            <fieldset className="okr-form-krs">
                { krs && krs.map((kr) => (
                <div className="kr-editor">
                    <TextField
                        key={kr.Id}
                        value={kr.Content}
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
            </fieldset>
             <Button className="okr-form-add-kr" text="Add KR" iconProps={{ iconName: "Add" }} onClick={() => {
                 this.setState({krs: [...krs, {
                    Id: generateUID(),
                    Content: "",
                    Status:  "Queued",
                    Comment: ""
                  }]});
             }}/>
            <fieldset className="okr-form-submit">
            <Button text="Create" primary={true} onClick={() => {
                  var toBeCreated: Objective = {
                        Owner: this.state.owner,
                        Name: this.state.name,
                        Comments: this.state.comments,
                        KRs: this.state.krs,
                        AreaId: area || "Boards",
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
             <Button text="Cancel" onClick={() => {
                  dispatch({
                    type: 'cancelCreation'
                    });
             }}/>
             </fieldset>
            </>
        );
    }
}

