import * as React from "react";
import "./TimeFrameSettings.scss";
import { StateContext, IOKRContext } from "../StateMangement/StateProvider";
import { Panel } from "azure-devops-ui/Panel";
import { TimeFrame } from "../TimeFrame/TimeFrame";
import { EditTimeFramesForm } from "./EditTimeFrameForm";
import { ContentSize } from "azure-devops-ui/Callout";

export interface ITimeFrameSettingsProps {
  timeFrames: TimeFrame[];
}

export class TimeFrameSettings extends React.Component<ITimeFrameSettingsProps, {}> {
  static contextType = StateContext;

  public render(): JSX.Element {
    const stateContext = this.context as IOKRContext;

    return (
      <Panel
        size={ContentSize.Large}
        titleProps={{ text: "Time Periods" }}
        footerButtonProps={[
          {
            text: "Close",
            onClick: () => {
              stateContext.actions.toggleSettings({ expanded: false });
            }
          }
        ]}
        onDismiss={() => {
          stateContext.actions.toggleSettings({ expanded: false });
        }}>
        <div className={"time-frame-settings"}>
          <div className={"time-frame-settings-header"}>
            <div className={"time-frame-settings-header-title"}>{"Name"} </div>
            <div className={"time-frame-settings-header-current"}>{"Current Time Frame"}</div>
          </div>
          <EditTimeFramesForm items={this.props.timeFrames} updateTimeFrame={(updatedItem) => { stateContext.actions.editTimeFrame(updatedItem); }} />
        </div>
      </Panel>
    )
  }
}


//<SortableComponent items={this.state.timeFrames} updateItemsCallback={this.updateTimeFrame} updateSingleItemCallback={this.updateSingleTimeFrame} />

/*
interface ISortableProps {
  timeFrame: TimeFrame;
  updateTimeFrame: (updatedItem: TimeFrame) => void
}

const SortableItem = SortableElement<ISortableProps>((props: ISortableProps) =>
  <div className={"time-frame-box"}>
    <Icon iconName={"VerticalMore"} />
    <MutableField value={props.timeFrame.name} onChange={(newValue) => {
      const newItem = {
        ...props.timeFrame,
        name: newValue,
      }
      props.updateTimeFrame(newItem);
    }} />
    <div>{"Is Current?"}<Checkbox checked={props.timeFrame.isCurrent}
      onChange={(event, newValue) => {
        const newItem = {
          ...props.timeFrame,
          isCurrent: newValue,
        }
        props.updateTimeFrame(newItem);

      }} /></div>
  </div>
);

class ISortableComponentProps {
  items: TimeFrame[];
  updateItemsCallback: (timeFrames: TimeFrame[]) => void;
  updateSingleItemCallback: (timeFrame: TimeFrame) => void;
}

class SortableComponent extends React.Component<ISortableComponentProps, {}> {

  public render() {
    const onSortEnd = ({ oldIndex, newIndex }) => {
      const updateItems = arrayMove(this.props.items, oldIndex, newIndex);
      this.props.updateItemsCallback(updateItems);
    };

    return <SortableList items={this.props.items} onSortEnd={onSortEnd} updateSingleItemCallback={this.props.updateSingleItemCallback} />;
  }
}

class ISortableListProps {
  items: TimeFrame[];
  updateSingleItemCallback: (timeFrame: TimeFrame) => void;
}

const SortableList = SortableContainer<ISortableListProps>((props: ISortableListProps) => {
  return (
    <div>
      {props.items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} timeFrame={value} updateTimeFrame={props.updateSingleItemCallback} />
      ))}
    </div>
  );
});
*/
