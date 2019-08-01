import * as React from "react";
import { Pill, PillSize, PillVariant } from "azure-devops-ui/Pill";
import { KeyCode } from "azure-devops-ui/Util";
import { IColor } from "azure-devops-ui/Utilities/Color";
import { KRStatus } from "./Objective/Objective";

const selectStyle = {
    paddingRight: "10px",
    fontFamily: '"Segoe UI","-apple-system",BlinkMacSystemFont,Roboto'
}

export interface IMutableStatusDropDownProps {
    value: KRStatus,
    onSelect: (newValue: KRStatus) => void
}

export interface IMutableStatusDropDownState {

    selection: string;
}

export class MutableStatusDropDown extends React.Component<IMutableStatusDropDownProps, IMutableStatusDropDownState> {
    constructor(props) {
        super(props);
        this.state = { selection: undefined };
    }

    public render = (): JSX.Element => {
        const { selection } = this.state;
        if (selection) {
            return (
                <select className="kr-status" value={selection} onChange={this.onChange} onKeyDown={this.onKeyDown} onBlur={this.onBlur} tabIndex={0} autoFocus={true} style={selectStyle}>
                    <option value="NotStarted">Not Started</option>
                    <option value="OnTrack">On Track</option>
                    <option value="AtRisk">At Risk</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Canceled">Canceled</option>
                </select>);
        }
        else {
            return (
                <div onClick={this.onReadOnlyClick} className="kr-status">
                    <Pill
                        className="status-pill"
                        color={this.colorMap[this.props.value]}
                        size={PillSize.regular}
                        variant={PillVariant.colored}
                        onClick={() => {
                          // This is necessary for style purposes.  
                        }}
                    >
                        {this.statusMap[this.props.value]}
                    </Pill>
                </div>
            );
        }
    }

    private onReadOnlyClick = (): void => {
        this.setState({ selection: this.props.value });
    };

    private onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (event.target.value) {
            this.props.onSelect(event.target.value as KRStatus);
            this.setState({ selection: undefined });
        }
    };

    private onKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>): void => {
        if (event.keyCode === KeyCode.escape) {
            this.setState({ selection: undefined });
        }
        else if (event.keyCode === KeyCode.enter) {
            this.onBlur();
        }
    };

    private onBlur = (): void => {
        this.setState({ selection: undefined });
    };

    private green: IColor = {
        red: 0,
        green: 128,
        blue: 0
    };

    private red: IColor = {
        red: 128,
        green: 0,
        blue: 0
    };

    private yellow: IColor = {
        red: 228,
        green: 228,
        blue: 0
    };

    private statusMap = {
        NotStarted: "Not Started",
        OnTrack: "On Track",
        AtRisk: "At Risk",
        Completed: "Completed",
        Canceled: "Canceled",
        Incomplete: "Incomplete"
    }

    private colorMap = {
        NotStarted: this.yellow,
        OnTrack: this.green,
        AtRisk: this.red,
        Completed: this.green,
        Canceled: this.red,
        Incomplete: this.red
    };

}
