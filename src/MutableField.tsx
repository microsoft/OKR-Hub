import * as React from "react";
import { Observer } from "azure-devops-ui/Observer";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { TextField } from "azure-devops-ui/TextField";
import { KeyCode } from "azure-devops-ui/Util";

export interface IMutableFieldProps {
	value: string,
	onChange: (newValue: string) => void
}

export class MutableField extends React.Component<IMutableFieldProps> {
	private currentValue = new ObservableValue<string>("");

	public render = (): JSX.Element => {
		return <Observer currentValue={this.currentValue}>
			{(props: { currentValue: string }) => {
				let content = <span className="label" onClick={this.onLabelClick}>{this.props.value}</span>

				if (props.currentValue) {
					content = <TextField
						value={props.currentValue}
						className="textField"
						onKeyDown={this.onKeyDown}
						onChange={this.onChange}
						onClick={this.onBlur}
						autoFocus={true}
					/>
				}

				return <span className="mutableField">{content}</span>;
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
			this.onBlur();
		}
	};

	private onChange = (_, newValue: string): void => {
		this.currentValue.value = newValue;
	};

	private onBlur = (): void => {
		if (this.currentValue.value) {
			this.props.onChange(this.currentValue.value);

			this.currentValue.value = undefined;
		}
	};
}