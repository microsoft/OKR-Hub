import * as React from "react";
import { StateContext } from "../StateProvider";
import { StatusType } from "azure-devops-ui/Status";
import { Button } from "azure-devops-ui/Button";
import { TextField } from "azure-devops-ui/TextField";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { ObservableValue } from "azure-devops-ui/Core/Observable";

export default class OKRForm extends React.Component<{}, {}> {
    static contextType = StateContext;
    ob = new ObservableValue<string>("");
    
    public render(): JSX.Element {
        const [{ pendingObjective }, dispatch] = this.context;
        return (
            <>
            <TextField
                value={pendingObjective.Name}
                onChange={(e, newValue) => {
                    this.ob.value = newValue;
                    dispatch({
                        type: 'updateObjectiveName',
                        name: newValue
                      });
                    }}
            />
             { pendingObjective.KRs && pendingObjective.KRs.map((kr) => <KREditor id={kr.Id} content={kr.Content} status={kr.Status} comment={kr.Comment}/>)}
             <Button text="Add KR" iconProps={{ iconName: "Add" }} onClick={() => {
                 dispatch({
                    type: 'addKR',
                    content: "",
                    status:  "Queued",
                    comment: ""
                  });
             }}/>
            </>
        );
    }
}

export interface IKREditorProps {
    id: string;
    content: string;
    status: StatusType;
    comment: string;
}

export class KREditor extends React.Component<IKREditorProps, {}> {
    static contextType = StateContext;
    ob = new ObservableValue<string>("");

    public render(): JSX.Element {
        const { id, content, status } = this.props;
        const [{ pendingObjective }, dispatch] = this.context;
        return (<div className="kr-editor">
            <StatusDropDown id={id} status={status} />
            <TextField
                value={content}
                multiline={true}
                onChange={(e, newValue) => {
                    this.ob.value = newValue;
                    dispatch({
                        type: 'updateKRContent',
                        id: id,
                        content: newValue
                      });
                    }}
            />
            <Button iconProps={{ iconName: "Delete" }} onClick={() => {
                dispatch({
                    type: 'removeKR',
                    id: id
                  });
                }}/>
        </div>);
    }
}

export interface IStatusDropDownProps {
    id: string;
    status: StatusType;
}

export class StatusDropDown extends React.Component<IStatusDropDownProps, {}> {
    private selectedItem = new ObservableValue<string>("");
    static contextType = StateContext;

    public render() {
        const { id, status } = this.props;
        const [{ pendingObjective }, dispatch] = this.context;
        return (
            <>
                <Dropdown
                    items={[
                        { id: "Queued", text: "Queued" },
                        { id: "Success", text: "Success" },
                        { id: "Warning", text: "Warning" },
                        { id: "Failed", text: "Failed" }
                    ]}
                    onSelect={(event: React.SyntheticEvent<HTMLElement>, newValue: IListBoxItem<{}>) => {
                        this.selectedItem.value = newValue.text || "";
                        dispatch({
                            type: 'updateKRStatus',
                            id: id,
                            status: newValue.id
                          });
                    }}
                />
            </>
        );
    }
}

