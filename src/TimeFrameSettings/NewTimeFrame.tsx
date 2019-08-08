import * as React from "react";
import "./TimeFrameSettings.scss";
import { TimeFrame } from "../TimeFrame/TimeFrame";
import { Guid } from "guid-typescript";
import { EditTimeFrame } from "./EditTimeFrame";

interface INewTimeFrameProps {
    order: number;
    addTimeFrame: (tf: TimeFrame) => void;
    isEditingStateCallback: (value: boolean) => void;
    updateAddTimeFrameState: (value: boolean) => void;
}

interface INewTimeFrameState {
    newTimeFrame: TimeFrame;
}

export class NewTimeFrame extends React.Component<INewTimeFrameProps, INewTimeFrameState> {

    constructor(props) {
        super(props)

        this.state = {
            newTimeFrame: {
                name: "",
                isCurrent: false,
                id: Guid.create().toString(),
                order: props.order
            }
        }
    }

    render() {

        const {
            addTimeFrame,
            isEditingStateCallback,
            updateAddTimeFrameState
        } = this.props;

        const onSave = (tf) => {
            addTimeFrame(tf);
            updateAddTimeFrameState(false);
        }

        return <EditTimeFrame item={this.state.newTimeFrame} saveTimeFrame={onSave} canBeEdited={true} editingCallback={isEditingStateCallback} isEditing={true} />;
    }
}