import * as React from "react";
import "./TimeFrameSettings.scss";
import { TimeFrame } from "../TimeFrame/TimeFrame";
import { MutableField } from "../MutableField";

export interface IEditTimeFrameProps {
    item: TimeFrame;
    saveTimeFrame: (tf: TimeFrame, newName: string) => void;
}

export class EditTimeFrame extends React.Component<IEditTimeFrameProps, {}> {

    public render(): JSX.Element {
        const {
            item,
            saveTimeFrame
        } = this.props;


        return <MutableField className={"time-frame-name"} value={item.name} onChange={(newValue) => saveTimeFrame(item, newValue)} />
    }
}
