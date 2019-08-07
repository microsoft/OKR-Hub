import * as React from "react";
import { Observer } from "azure-devops-ui/Observer";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { TextField } from "azure-devops-ui/TextField";
import { KeyCode } from "azure-devops-ui/Util";
import { Button } from "azure-devops-ui/Button";

export interface IMutableFieldProps {
	value: string,
	onChange: (newValue: string) => void
}

export class MutableField extends React.Component<IMutableFieldProps> {
	private currentValue = new ObservableValue<string>("");

	public render = (): JSX.Element => {
		return <Observer currentValue={this.currentValue}>
			{(props: { currentValue: string }) => {
				if (props.currentValue) {
					return (<div className="mutableField">
						<TextField
							value={props.currentValue}
							className="textField"
							onKeyDown={this.onKeyDown}
							onChange={this.onChange}
							autoFocus={true} />
						<Button iconProps={{ iconName: "Cancel" }} subtle={true} onClick={this.onCancel} />
						<Button iconProps={{ iconName: "CheckMark" }} subtle={true} onClick={this.onSave} />
					</div>)
				}
				else {
					return <div className="mutableField label" onClick={this.onLabelClick} title={this.props.value}>{this.props.value}</div>;	
				}
			}}
		</Observer>;
	};

	private onLabelClick = (): void => {
		this.currentValue.value = this.props.value;
	};

	private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.keyCode === KeyCode.escape) {
			this.currentValue.value = undefined;
		}
		else if (event.keyCode === KeyCode.enter) {
			this.onSave();
		}
	};

	private onChange = (_, newValue: string): void => {
		this.currentValue.value = newValue;
	};

	private onSave = (): void => {
		if (this.currentValue.value) {
			this.props.onChange(this.currentValue.value);

			this.currentValue.value = undefined;
		}
	};

	private onCancel = (): void => {
		this.currentValue.value = undefined;
	}
}