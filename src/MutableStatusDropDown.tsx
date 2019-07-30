import * as React from "react";
import { StatusType, Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { KeyCode } from "azure-devops-ui/Util";

const selectStyle = {
    paddingRight: "5px",
    fontFamily: '"Segoe UI","-apple-system",BlinkMacSystemFont,Roboto'
}

export interface IMutableStatusDropDownProps {
	value: StatusType,
	onSelect: (newValue: StatusType) => void
}

export interface IMutableStatusDropDownState {
    selection: string;
}
export class MutableStatusDropDown extends React.Component<IMutableStatusDropDownProps, IMutableStatusDropDownState> {
    constructor(props) {
        super(props);
        this.state = {selection: undefined};
    }

	public render = (): JSX.Element => {
        const {selection} = this.state;
		if (selection) {
			return (
                <select className="kr-status" value={selection} onChange={this.onChange} onKeyDown={this.onKeyDown} onBlur={this.onBlur} tabIndex={0} autoFocus={true} style={selectStyle}>
                    <option value="Queued">Not Started</option>
                    <option value="Success">On Track</option>
                    <option value="Warning">At Risk</option>
                    <option value="Failed">Incomplete</option>
                    <option value="Canceled">Cancelled</option>
                    <option value="Success">Completed</option>
                </select>);
        }
        else {
            return (<div onClick={this.onReadOnlyClick} className="kr-status">
                    <Status {...Statuses[this.props.value]} size={StatusSize.m} className="status-icon"/>
                   </div>);
        }
	}

	private onReadOnlyClick = (): void => {
        this.setState({selection: this.props.value});
    };
    
	private onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (event.target.value) {
			this.props.onSelect(event.target.value as StatusType);
			this.setState({selection: undefined});
		}
    };

	private onKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>): void => {
		if (event.keyCode === KeyCode.escape) {
			this.setState({selection: undefined});
		}
		else if (event.keyCode === KeyCode.enter) {
			this.onBlur();
		}
	};

	private onBlur = (): void => {
		this.setState({selection: undefined});
    };
}