import * as React from "react";
import "./TimeFrameSettings.scss";
import { TimeFrame, TimeFrameSet } from "../TimeFrame/TimeFrame";
import { EditTimeFrame } from "./EditTimeFrame";
import { Button } from "azure-devops-ui/Button";
import { NewTimeFrame } from "./NewTimeFrame";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { RadioButton, RadioButtonGroup } from "azure-devops-ui/RadioButton";
import produce from "immer";
import { Panel } from "azure-devops-ui/Panel";
import { ContentSize } from "azure-devops-ui/Callout";

export interface IEditTimeFramesProps {
    timeFrameSet: TimeFrameSet;
}

interface IEditTimeFramesFormState {
    addBoxOpen: boolean;
    draftTimeFrameSet: TimeFrameSet;
}

export class EditTimeFramesForm extends React.Component<IEditTimeFramesProps, IEditTimeFramesFormState> {
    static contextType = StateContext;

    constructor(props) {
        super(props);

        this.state = {
            addBoxOpen: false,
            draftTimeFrameSet: props.timeFrameSet
        }
    }

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;

        const {
            draftTimeFrameSet,
            addBoxOpen
        } = this.state;

        const addTimeFrameBox = <NewTimeFrame order={draftTimeFrameSet.timeFrames.length} addTimeFrame={this.addTimeFrame} cancel={this.closeAddBox} />;

        return (<Panel
                size={ContentSize.Large}
                titleProps={{ text: "Time Periods" }}
                footerButtonProps={[
                    {
                        text: "Close",
                        onClick: () => {
                            stateContext.actions.toggleSettings({ expanded: false });
                        }
                    },
                    {
                        text: "Save",
                        onClick: () => {
                            stateContext.actions.editTimeFrame(this.state.draftTimeFrameSet)
                            stateContext.actions.toggleSettings({ expanded: false });
                        },
                        disabled: addBoxOpen 
                    }
                ]}
                onDismiss={() => {
                    stateContext.actions.toggleSettings({ expanded: false });
                }}>
                <div className={"time-frame-settings"}>
                    <div className={"time-frame-settings-header"}>{"Add new time frames below and select which will be the current time frame."}</div>
                    <div>
                        <RadioButtonGroup onSelect={this.changeCurrentTimeFrame} selectedButtonId={draftTimeFrameSet.currentTimeFrameId}>
                            {this.state.draftTimeFrameSet.timeFrames.map((value, index) => (
                                <RadioButton className={"time-frame-box"} id={value.id}>
                                    <EditTimeFrame item={value} saveTimeFrame={this.updateName} />
                                </RadioButton>
                            ))}
                        </RadioButtonGroup>
                        {addBoxOpen && addTimeFrameBox}
                        <Button subtle={true} text={"Add new time frame"} iconProps={{ iconName: "Add" }} onClick={() => this.setState({ addBoxOpen: true })} disabled={addBoxOpen} />
                    </div>
                </div>
            </Panel>

        )
    }

    private closeAddBox = () => {
        this.setState({ addBoxOpen: false });
    }

    private addTimeFrame = (tf) => {
        const newSet = produce(this.state.draftTimeFrameSet, draft => {
            draft.timeFrames.push(tf);
        });
        this.setState({ draftTimeFrameSet: newSet, addBoxOpen: false });
    }

    private updateName = (item: TimeFrame, newName: string) => {
        const newTimeFrames = produce(this.state.draftTimeFrameSet.timeFrames, draft => {
            let editedItem = draft.find((tf) => { return tf.id === item.id });
            editedItem.name = newName; 
        });

        const newState = {
            currentTimeFrameId: this.state.draftTimeFrameSet.currentTimeFrameId,
            id: this.state.draftTimeFrameSet.id,
            timeFrames: newTimeFrames
        }
        this.setState({ draftTimeFrameSet: newState });
    };

    private changeCurrentTimeFrame = (newId: string) => {
        const newTimeFrameSet = produce(this.state.draftTimeFrameSet, draft => {
            draft.currentTimeFrameId = newId;
        });

        this.setState({ draftTimeFrameSet: newTimeFrameSet });
    };
}
