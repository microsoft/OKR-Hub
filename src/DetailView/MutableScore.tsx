import * as React from "react";
import { KeyCode } from "azure-devops-ui/Util";

export interface IMutableScoreProps {
    value: string,
    onSelect: (newValue: string) => void
}

export interface IMutableScoreState {
    selection: string;
}

export class MutableScore extends React.Component<IMutableScoreProps, IMutableScoreState> {
    constructor(props) {
        super(props);
        this.state = { selection: undefined };
    }

    public render = (): JSX.Element => {
        const { selection } = this.state;
        if (selection) {
            return (<div><select className="kr-score-select" value={selection} onChange={this.onChange} onKeyDown={this.onKeyDown} onBlur={this.onBlur} tabIndex={0} autoFocus={true}>
                {Array.from(Array(10).keys()).map((value) => <option value={value/10}>{value/10}</option> )}
            </select></div>);
        }
        else {
            return (
                <div onClick={this.onReadOnlyClick} className="kr-score" title="Change score">
                    {this.props.value}
                </div>
            );
        }
    }


    private onReadOnlyClick = (): void => {
        this.setState({ selection: this.props.value });
    };

    private onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (event.target.value) {
            this.props.onSelect(event.target.value);
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
}
