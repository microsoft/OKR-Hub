import * as React from "react";
import "./TimeFrameSettings.scss";
import { TimeFrame } from "../TimeFrame/TimeFrame";
import { EditTimeFrame } from "./EditTimeFrame";
import { Button } from "azure-devops-ui/Button";
import { NewTimeFrame } from "./NewTimeFrame";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";

export interface IEditTimeFramesProps {
    items: TimeFrame[];
    updateTimeFrame: (tf: TimeFrame) => void;
}

interface IEditTimeFramesFormState {
    isSomeoneBeingEdited: boolean;
    addBoxOpen: boolean; 
}

export class EditTimeFramesForm extends React.Component<IEditTimeFramesProps, IEditTimeFramesFormState> {
    static contextType = StateContext;

    constructor(props) {
        super(props);

        this.state = {
            isSomeoneBeingEdited: false,
            addBoxOpen: false,
        }
    }

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;

        const {
            items,
            updateTimeFrame
        } = this.props;

        // If any cell is in edit mode, lock other cells from editing. 
        // This is to prevent us from setting more than on timeframe as current        
        const updateIfAnyCellIsInEditMode = (value) => {
            this.setState({ isSomeoneBeingEdited: value })
        }

        const updateAddTimeFrameState = (value) => {
            this.setState({addBoxOpen: value})
        }

        const addTimeFrame = <NewTimeFrame updateAddTimeFrameState={updateAddTimeFrameState} order={items.length} addTimeFrame={(tf) => stateContext.actions.addTimeFrames(tf)} isEditingStateCallback={updateIfAnyCellIsInEditMode}/>

        return (
            <div>
                {items.map((value, index) => (
                    <EditTimeFrame item={value} saveTimeFrame={updateTimeFrame} canBeEdited={!this.state.isSomeoneBeingEdited} editingCallback={updateIfAnyCellIsInEditMode} isEditing={false} />
                ))}
                {this.state.addBoxOpen && addTimeFrame}
                <Button subtle={true} text={"Add new time frame"} iconProps={{ iconName: "Add" }} onClick={() => this.setState({ addBoxOpen: true })} disabled={this.state.addBoxOpen} />
            </div>
        )
    }
}
