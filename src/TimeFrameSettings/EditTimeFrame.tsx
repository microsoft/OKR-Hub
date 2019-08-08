import * as React from "react";
import "./TimeFrameSettings.scss";
import { Checkbox } from "azure-devops-ui/Checkbox";
import { TimeFrame } from "../TimeFrame/TimeFrame";
import { TextField } from "azure-devops-ui/TextField";
import { Button } from "azure-devops-ui/Button";

export interface IEditTimeFrameProps {
    item: TimeFrame;
    saveTimeFrame: (tf: TimeFrame) => void;
    canBeEdited: boolean;
    editingCallback: (value: boolean) => void;
    isEditing: boolean;
}

interface IEditTimeFrameState {
    isEditing: boolean;
    draftName: string;
    draftIsCurrent: boolean;
}

export class EditTimeFrame extends React.Component<IEditTimeFrameProps, IEditTimeFrameState> {

    constructor(props: IEditTimeFrameProps) {
        super(props);

        this.state = {
            isEditing: props.isEditing,
            draftIsCurrent: props.item.isCurrent,
            draftName: props.item.name,
        }
    }

    public render(): JSX.Element {
        const {
            item,
            saveTimeFrame,
            canBeEdited,
            editingCallback,
        } = this.props;

        const {
            draftIsCurrent,
            draftName,
            isEditing
        } = this.state;

        let timeFrame;

        if (isEditing) {
            timeFrame = <div className={"time-frame-box"} key={"time-frame" + item.order}>
                <div className={"time-frame-left-content"}>
                    <TextField className={"time-frame-name"} value={draftName} onChange={(event, newValue) => { this.setState({ draftName: newValue }) }} />
                    <Checkbox checked={draftIsCurrent} onChange={(event, newValue) => { this.setState({ draftIsCurrent: newValue }) }} />
                </div>

                <div className="edit-buttons">
                    <Button
                        onClick={() => {
                            this.setState({ isEditing: false })
                            editingCallback(false);
                        }}
                        ariaLabel="Cancel button"
                        iconProps={{ iconName: "Cancel" }}
                        subtle={true}
                    />
                    <Button
                        onClick={() => {
                            saveTimeFrame({ ...item, isCurrent: draftIsCurrent, name: draftName })
                            this.setState({ isEditing: false })
                            editingCallback(false);
                        }}
                        ariaLabel="Save button"
                        iconProps={{ iconName: "CheckMark" }}
                        subtle={true}
                    />
                </div>
            </div>
        }
        else {
            timeFrame = <div className={"time-frame-box"} key={"time-frame" + item.order}>
                <div className={"time-frame-left-content"}>
                    <div className={"time-frame-name"}>{item.name}</div>
                    <Checkbox checked={item.isCurrent} disabled={true} />
                </div>

                {canBeEdited && <div className="edit-buttons">
                    <Button
                        ariaLabel={"Edit"}
                        iconProps={{ iconName: "Edit" }}
                        onClick={() => {
                            this.setState({ isEditing: true });
                            editingCallback(true);
                        }}
                    />
                </div>}
            </div>
        }

        return timeFrame;
    }
}
