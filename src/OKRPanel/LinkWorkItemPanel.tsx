import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { StateContext, IOKRContext } from '../StateMangement/StateProvider';
import { Objective } from "../Objective/Objective";
import { LinkWorkItemForm } from "./LinkWorkItemForm";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { WorkItem } from "azure-devops-extension-api/WorkItemTracking";
import { AddWorkItemDialog } from "./AddWorkItemDialog";

interface ILinkWorkItemPanelProps {
    title: string;
    objective: Objective;
}
interface ILinkWorkItemPanelState {
    isAddDialogOpen: boolean;
}

export interface IWorkItemTableItem {
    id: number;
    title: string;
    state: string;
}

export class LinkWorkItemPanel extends React.Component<ILinkWorkItemPanelProps, ILinkWorkItemPanelState> {
    static contextType = StateContext;
    constructor(props, state) {
        super(props, state);
        this.state = {isAddDialogOpen: false};
    }

    public componentDidMount() {
        const stateContext = this.context as IOKRContext;
        const idsToFetch = this.getIdsToFetch(this.props.objective.WorkItems, stateContext.state.workItemsMap);
        if (idsToFetch.length > 0) {
            stateContext.actions.getWorkItems(idsToFetch);
        }
    }

    public render(): JSX.Element {
        const { title, objective } = this.props;
        const stateContext = this.context as IOKRContext;
        return (<div>
            <Panel
                showSeparator
                onDismiss={() => stateContext.actions.cancelCreationOrEdit({})}
                titleProps={{ text: title }}>
                <LinkWorkItemForm
                    tableItems={this.getTableItems(stateContext.state.workItemsMap, objective.WorkItems)}
                    onAdd={() => { 
                        this.setState({isAddDialogOpen: true});
                    }}
                    isZeroDay={!objective.WorkItems || objective.WorkItems.length === 0}
                    onDelete={(id: number) => {
                        stateContext.actions.deleteWorkItems({
                            id: id,
                            objectiveId: objective.id
                        });
                    }}
                    onActivate={(id: number) => {
                        stateContext.actions.openWorkItem(id);
                    }}
                />
            </Panel>
            <AddWorkItemDialog isDialogOpen={this.state.isAddDialogOpen} onAdd={(ids: string[])=> {
                this.setState({isAddDialogOpen: false});
                stateContext.actions.addWorkItems({
                    ids: ids,
                    objectiveId: objective.id
                });
            }} onCancel={()=> {
                this.setState({isAddDialogOpen: false});
            }}/>
        </div>);
    }

    private getTableItems = (workItemsMap: { [key: number]: WorkItem }, ids: number[]) => {
        if (workItemsMap === undefined || !ids || ids.length == 0) {
            return new ArrayItemProvider<IWorkItemTableItem>([]);
        }
        var workItems = [];
        ids.forEach((id: number) => {
            if (workItemsMap[id] != null) {
                workItems.push(workItemsMap[id]);
            }
        })
        return this.constructTableItems(workItems);
    }

    private getIdsToFetch(ids: number[], workItemsMap: { [key: number]: WorkItem }): number[] {
        if (workItemsMap === undefined) {
            return ids || [];
        }
        if (!ids || ids.length == 0) {
            return [];
        }
        return ids.filter((id: number) => {
            return workItemsMap[id] == null;
        });
    }

    private constructTableItems = (workItems: WorkItem[]) => {
        return new ArrayItemProvider<IWorkItemTableItem>(workItems.map((workItem: WorkItem) => {
            return {
                id: workItem.id,
                title: workItem.fields["System.Title"],
                state: workItem.fields["System.State"]
            };
        }));
    }
}
