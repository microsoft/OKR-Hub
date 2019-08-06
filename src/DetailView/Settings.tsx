import * as React from "react";
import { render } from 'react-dom';
import "./DetailOKR.scss";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Panel } from "azure-devops-ui/Panel";
import * as arrayMove from "array-move";
import { Checkbox } from "azure-devops-ui/Checkbox";


export class TimeFrameSettings extends React.Component<{}, {}> {
  static contextType = StateContext;

  public render(): JSX.Element {
    const stateContext = this.context as IOKRContext;

    const dialog = stateContext.state.settingsExpanded ?
      <Panel
        titleProps={{ text: "Time Periods" }}
        footerButtonProps={[
          {
            text: "Cancel",
            onClick: () => {
              stateContext.actions.toggleSettings({ expanded: false });
            }
          }
        ]}
        onDismiss={() => {
          stateContext.actions.toggleSettings({ expanded: false });
        }}>
        <div>Drag time frames up and down to reorder.</div>
        <SortableComponent />
      </Panel> :
      null;

    return dialog;
  }
}


const SortableItem = SortableElement(({ value }) =>
  <div>
    <div className={"time-frame-box"}>{value}</div>
    <Checkbox> </Checkbox>
  </div>
);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends React.Component<{}, { items }> {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {

    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

