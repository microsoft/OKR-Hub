import * as React from "react";
import { Card } from "azure-devops-ui/Card";
import { SplitterElementPosition, Splitter } from "azure-devops-ui/Splitter";
import { Objective, KR } from "../Objective/Objective";

import "./DetailOKR.scss";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import AddOrEditOKRPanel from "../OKRPanel/AddOrEditOKRPanel";
import { MutableStatusDropDown } from "../MutableStatusDropDown";
import { Icon } from "azure-devops-ui/Icon";
import produce from "immer";
import { KRComment } from "./KRComment";
import { MenuButton, IMenuItem } from "azure-devops-ui/Menu";
import { Dialog } from "azure-devops-ui/Dialog";
import { MutableScore } from "./MutableScore";

export interface IDetailOKRProps {
    objective: Objective;
}

export interface IDetailOKRState {
    isDialogOpen: boolean;
}

export class DetailOKR extends React.Component<IDetailOKRProps, IDetailOKRState> {
    static contextType = StateContext;
    constructor(props: IDetailOKRProps) {
        super(props);
        this.state = { isDialogOpen: false }
    }

    public render(): JSX.Element {
        const stateContext = this.context as IOKRContext;
        return (
            <div className="okr-list-container">
                <Card>
                    <Splitter
                        fixedElement={SplitterElementPosition.Near}
                        fixedSize={60}
                        splitterDirection={1}
                        farElementClassName="kr-list"
                        onRenderNearElement={this._renderObjective}
                        onRenderFarElement={this._renderKRs}
                        disabled={true}
                    />
                </Card>
                {stateContext.state.editPanelExpandedKey === this.props.objective.id && <AddOrEditOKRPanel title={"Edit OKR"} objective={this.props.objective} />}
            </div>
        );
    }

    private _renderObjective = () => {
        const stateContext = this.context as IOKRContext;
        return (
            <div className="objective-title">
                <h3 className="objective-name">{this.props.objective.Name}</h3>
                <div className="objective-contex-menu"><MenuButton hideDropdownIcon={true} contextualMenuProps={{ menuProps: { id: "edit-okr", items: this.getButtons() } }} iconProps={{ iconName: "More" }} /></div>
                {this.state.isDialogOpen &&
                    <Dialog
                        titleProps={{ text: "Delete Objective" }}
                        footerButtonProps={[
                            {
                                text: "Cancel",
                                onClick: () => {
                                    this.setState({ isDialogOpen: false });
                                }
                            },
                            {
                                text: "OK", primary: true, onClick: () => {
                                    stateContext.actions.removeOKR({ id: this.props.objective.id });
                                    this.setState({ isDialogOpen: false });
                                }
                            }
                        ]}
                        onDismiss={() => {
                            this.setState({ isDialogOpen: false });
                        }}>
                        {"Are you sure to delete this objective?"}
                    </Dialog>}
            </div>
        );
    }

    private _renderKRs = () => {
        return (
            <>
                {this.props.objective.KRs && this.props.objective.KRs.map((kr, i) => {
                    return this._renderKR(kr, i);
                })}
            </>
        );
    }

    private _renderKR = (kr: KR, i: number) => {
        const stateContext = this.context as IOKRContext;
        return (<div className="kr" key={"kr" + i}>
            <table className="kr-table">
                <tbody>
                    <tr>
                        <td className="kr-status-column">
                            <MutableStatusDropDown value={kr.Status} onSelect={(newValue) => {
                                stateContext.actions.editKRStatus(produce(this.props.objective, draft => {
                                    var found = draft.KRs.filter((x) => x.Id === kr.Id)[0];
                                    found.Status = newValue;
                                }));
                            }} />
                        </td>
                        <td className="kr-content-column">{kr.Content}</td>
                        <td className="kr-score-column">
                            <MutableScore value={kr.Score} onSelect={(newValue) => {
                                stateContext.actions.editOKR(produce(this.props.objective, draft => {
                                    var found = draft.KRs.filter((x) => x.Id === kr.Id)[0];
                                    found.Score = newValue;
                                }));
                            }} />
                            <Icon iconName="Comment" onClick={() => {
                                stateContext.actions.editKRComment({ id: kr.Id });
                            }} tooltipProps={{ text: "Edit Note" }} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <KRComment kr={kr} isEditMode={stateContext.state.editCommentKey === kr.Id} onCancel={() => {
                stateContext.actions.editKRComment({ id: undefined });
            }}
                onSave={(newValue: string) => {
                    stateContext.actions.editOKR(produce(this.props.objective, draft => {
                        var found = draft.KRs.filter((x) => x.Id === kr.Id)[0];
                        found.Comment = newValue;
                    }));
                }} />
        </div>);
    }

    private getButtons(): IMenuItem[] {
        const stateContext = this.context as IOKRContext;
        return [
            {
                id: "edit-button",
                text: "Edit Content",
                iconProps: { iconName: "Edit" },
                onActivate: () => {
                    stateContext.actions.toggleEditPanel({ expandedKey: this.props.objective.id });
                }
            },
            {
                id: "delete-button",
                text: "Delete",
                iconProps: { iconName: "Delete" },
                onActivate: () => {
                    this.setState({ isDialogOpen: true });
                }
            }
        ];
    }
}