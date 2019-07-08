import * as React from "react";
import { DetailOKRList } from "./DetailOKRList";
import { Summary } from "./Summary";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Observer } from "azure-devops-ui/Observer";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import "./DetailView.scss";

export interface IDetailViewProps {
    area: string;
}

export class DetailView extends React.Component<IDetailViewProps, {}> {
    private selectedTabId: ObservableValue<string>;

    constructor(props: IDetailViewProps) {
        super(props);
        this.selectedTabId = new ObservableValue("q2");
    }

    public render() {
        return (
            <div className="flex-column">
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
                                 <DetailOKRList area={this.props.area} selectedTabId={props.selectedTabId}/>
                                 <Summary />
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