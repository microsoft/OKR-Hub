import * as React from "react";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { useStateValue } from '../StateManagement/StateProvider';
import { Area } from "../Area/Area";
import { TimeFrameSet, TimeFrame } from "../TimeFrame/TimeFrame";
import { IMenuItem } from "azure-devops-ui/Menu";

export interface IDetailOKRHeaderProps {
    selectedArea: Area;
}

export const DetailOKRHeader: React.SFC<IDetailOKRHeaderProps> = (props: IDetailOKRHeaderProps) => {

    const stateContext = useStateValue();

    const changeDisplayedTimeFrame = (tf: TimeFrame) => {
        stateContext.actions.updateDisplayedTimeFrame(tf); 
        stateContext.actions.getObjectives({timeFrameId: tf.id});
    }

    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            id: "time-frames",
            text: stateContext.state.displayedTimeFrame.name,
            subMenuProps: {
                id: "time-frame-list",
                items: getTimeFramesItems(stateContext.state.timeFrameInfo, changeDisplayedTimeFrame)
            }
        },
        {
            important: true,
            id: "create-okr",
            text: "New OKR",
            onActivate: () => {
                stateContext.actions.toggleAddPanel({ expanded: true });
            },
            iconProps: {
                iconName: "Add"
            }
        }
    ];

    return (
        <div>
            <Header
                className={"detail-okr-header"}
                title={props.selectedArea.Name}
                commandBarItems={[...commandBarItems]}
                titleSize={TitleSize.Medium}
            />
        </div>
    );
}

function getTimeFramesItems(timeFrameSet: TimeFrameSet, changeDisplayedTimeFrameCallback: (timeFrame: TimeFrame) => void): IMenuItem[] {
    return timeFrameSet.timeFrames.map((tf) => {
        return {
            id: "time-frame-nav-" + tf.id,
            text: tf.name,
            onActivate: () => { changeDisplayedTimeFrameCallback(tf) },
        }

    })
}