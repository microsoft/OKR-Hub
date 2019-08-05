import * as React from "react";
import {render} from 'react-dom';
import { Objective } from "../Objective/Objective";
import "./DetailOKR.scss";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { Dialog } from "azure-devops-ui/Dialog";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';


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

        const dialog = stateContext.state.settingsExpanded ?
            <Dialog
                titleProps={{ text: "Quarters" }}
                
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
                    <SortableComponent />
            </Dialog> :
            null;

        return dialog;
    }
}


const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends React.Component<{}, {items}> {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

