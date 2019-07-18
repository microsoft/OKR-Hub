import * as React from "react";
import { DetailOKRList } from "./DetailOKRList";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Observer } from "azure-devops-ui/Observer";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import AddOKRPanel from "../AddPanel/AddOKRPanel";
import { DetailOKRHeader } from "./DetailOKRHeader";
import { StateContext } from '../StateProvider';
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
        this.selectedTabId = new ObservableValue("q2");
    }

    public render() {
        const { selectedArea } = this.props;
        const [{ areas }, dispatch] = this.context;
        return (
            <div className="detail-view-container">
                <DetailOKRHeader />
                <AddOKRPanel/>
                <TabBar
                    onSelectedTabChanged={this.onSelectedTabChanged}
                    selectedTabId={this.selectedTabId}
                    tabSize={TabSize.Tall}
                >
                    <Tab name="Q2" id="q2" />
                    <Tab name="Future" id="future" />
                </TabBar>
                <Observer selectedTabId={this.selectedTabId}>
                    {(props: { selectedTabId: string }) => {
                        return (<>
                              <div className="detail-view">
                                 <DetailOKRList area={selectedArea || (areas && areas[0]) ||{AreaId: "test"} as Area} selectedTabId={props.selectedTabId}/>
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