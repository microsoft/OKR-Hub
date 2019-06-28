import * as React from "react";
import { Objective } from "./Objective";

export interface IObjectiveItemProps {
    objective: Objective;
}

export interface IObjectiveItemState {
    editMode: boolean;
}

export class ObjectiveItem extends React.Component<IObjectiveItemProps, IObjectiveItemState> {
    public constructor() {
        super();

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
        const initialValue = objective[field];

        return (
            <div>
                <label>{field}</label>

                {this.state.editMode ?
                    <input value={initialValue} onChange={(e) => objective[field] = e.target.value} /> : <span>{objective[field]}</span>
                }
            </div>
        );
    }
}