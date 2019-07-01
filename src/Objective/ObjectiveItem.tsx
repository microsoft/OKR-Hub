import * as React from "react";
import { Objective } from "./Objective";
import { TextField } from "azure-devops-ui/TextField";
import { Observable } from "azure-devops-ui/Core/Observable";
//import "./Obj.css";
//import "./Objective.scss";

export interface IObjectiveItemProps {
    objective: Objective;
}

export interface IObjectiveItemState {
    editMode: boolean;
}

export class ObjectiveItem extends React.Component<IObjectiveItemProps, IObjectiveItemState> {
    private editCopy: Observable<Objective> = new Observable<Objective>();

    public constructor(props, state) {
        super();

        this.editCopy.subscribe(this.editCopyUpdated);
        this.editCopy.notify({...props.objective}, "");

        this.state = {
            editMode: false
        }
    }

    public render(): JSX.Element {
        const displayFields = [ "Name", "Owner", "Area", "Status" ];
        return (<>
            <div>
                {displayFields.map(field => {
                    return this.renderField(field)
                })}
            </div>
            <button onClick={() => {this.setState({editMode: !this.state.editMode})}}>EditMode</button>
        </>);
    }

    private renderField(field: string): JSX.Element {
        const { objective } = this.props;

        return (
            <div>
                <label>{field}</label>

                {this.state.editMode ?
                    <TextField value={this.editCopy[field]}/>
                    //<input onChange={(e) => objective[field] = e.target.value} />
                    : <span>{objective[field]}</span>
                }
            </div>
        );
    }

   private editCopyUpdated() {
   };
}