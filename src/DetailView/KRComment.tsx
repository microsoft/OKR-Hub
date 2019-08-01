import * as React from "react";
import { TextField } from "azure-devops-ui/TextField";
import { Icon } from "azure-devops-ui/Icon";
import { KR } from "../Objective/Objective";
import { Button } from "azure-devops-ui/Button";

interface IKRCommentProps {
    isEditMode: boolean;
    kr: KR;
    onSave: (newValue: string) => void;
    onCancel: () => void;
}

interface IKRCommentState {
    value: string;
}

export class KRComment extends React.Component<IKRCommentProps, IKRCommentState> {
    constructor(props: IKRCommentProps) {
        super(props);
        this.state = { value: props.kr.Comment };
    }

    public render(): JSX.Element {
        const { isEditMode, kr, onSave, onCancel } = this.props;
        return (<div className="kr-comment">
            {isEditMode ? (<div>
                <TextField
                    value={this.state.value}
                    placeholder="Add Note"
                    multiline={true}
                    autoFocus={true}
                    onChange={(e, newValue) => {
                        this.setState({ value: newValue });
                    }
                    } />
                <div className="kr-button-group">
                    <Button iconProps={{ iconName: "Cancel" }} subtle={true} onClick={onCancel} />
                    <Button iconProps={{ iconName: "CheckMark" }} subtle={true} onClick={() => { onSave(this.state.value) }} />
                </div>
            </div>)
                : (kr.Comment ? (<div>
                    <Icon iconName="Comment" />
                    "{kr.Comment}"
                                        </div>) : null)}
        </div>);
    }
}
