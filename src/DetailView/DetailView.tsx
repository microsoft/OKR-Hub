import * as React from "react";
import { DetailOKRList } from "./DetailOKRList";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Observer } from "azure-devops-ui/Observer";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import AddOrEditOKRPanel from "../OKRPanel/AddOrEditOKRPanel";
import { DetailOKRHeader } from "./DetailOKRHeader";
import { StateContext, IOKRContext } from '../StateMangement/StateProvider';
import { Area } from "../Area/Area";

import "./DetailView.scss";

export interface IDetailViewProps {
    selectedArea: Area;
}

export class DetailView extends React.Component<IDetailViewProps, {}> {
    private selectedTabId: ObservableValue<string>;
    static contextType = StateContext;
    
    constructor(props: IDetailViewProps) {
        super(props);
        this.selectedTabId = new ObservableValue("current");
    }

    public render() {
        const { selectedArea } = this.props;
        const stateContext = this.context as IOKRContext;
        var area = selectedArea || (stateContext.state.areas && stateContext.state.areas[0]) ||{AreaId: "test"} as Area; // TODO: remove this fallback logic once we fix the routing.
        return (
            <div className="detail-view-container">
                <DetailOKRHeader selectedArea={area}/>
                {stateContext.state.addPanelExpanded && <AddOrEditOKRPanel title={"Add OKR"}/>}
                <TabBar
                    onSelectedTabChanged={this.onSelectedTabChanged}
                    selectedTabId={this.selectedTabId}
                    tabSize={TabSize.Tall}
                >
                    <Tab name="Current Quarter" id="current" />
                </TabBar>
                <Observer selectedTabId={this.selectedTabId}>
                    {(props: { selectedTabId: string }) => {
                        return (<>
                              <div className="detail-view">
                                 <DetailOKRList area={area} selectedTabId={props.selectedTabId}/>
                                </div>
                            </>);
                    }}
                </Observer>
            </div>
        );
    }

    private onSelectedTabChanged = (newTabId: string) => {
        this.selectedTabId.value = newTabId;
    };
}