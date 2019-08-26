import * as React from "react";
import "./TimeFrameSettings.scss";
import { TimeFrame } from "../TimeFrame/TimeFrame";
import { Guid } from "guid-typescript";
import { TextField } from "azure-devops-ui/TextField";
import { Button } from "azure-devops-ui/Button";

interface INewTimeFrameProps {
    order: number;
    addTimeFrame: (tf: TimeFrame) => void;
    cancel: () => void;
}

interface INewTimeFrameState {
    name: string;
}

export class NewTimeFrame extends React.Component<INewTimeFrameProps, INewTimeFrameState> {

    constructor(props: INewTimeFrameProps) {
        super(props);

        this.state = {
            name: ""
        };
    }

    render() {
        return <div>
            <TextField className={"new-time-frame"} value={this.state.name} onChange={this.onChange} />
            <Button iconProps={{ iconName: "Cancel" }} subtle={true} onClick={this.props.cancel} />
            <Button iconProps={{ iconName: "CheckMark" }} subtle={true} onClick={this.onSave} />
        </div>;
    }

    private onChange = (event, newValue) => {
        this.setState({ name: newValue })
    }

    private onSave = () => {
        if(this.state.name.trim() == ""){
            this.props.cancel();
        }else{
            const newTimeFrame = {
                name: this.state.name,
                id: Guid.create().toString(),
                order: this.props.order
            }

            this.props.addTimeFrame(newTimeFrame);
        }
    }
}