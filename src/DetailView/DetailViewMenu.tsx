import { IObservableValue, ObservableValue } from "azure-devops-ui/Core/Observable";
import { List, ListItem, ListSelection, IListItemDetails } from "azure-devops-ui/List";
import { DetailsPanel, MasterPanel, MasterPanelHeader } from "azure-devops-ui/MasterDetails";
import {
    BaseMasterDetailsContext,
    IMasterDetailsContext,
    IMasterDetailsContextLayer,
    MasterDetailsContext,
    bindSelectionToObservable
} from "azure-devops-ui/MasterDetailsContext";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import * as React from 'react';
import "./DetailViewMenu.scss";
import { DetailView } from "./DetailView";
import { Circle } from 'react-circle';
import { StateProvider } from '../StateProvider';
import { detailViewReducer } from "./DetailViewReducer";

const areas = ["Boards", "Repos", "Pipelines"];

const renderInitialRow = (
    index: number,
    item: string,
    details: IListItemDetails<string>,
): JSX.Element => {
    return (
        <ListItem
            key={"list-item" + index}
            index={index}
            details={details}
        >
            <div className="master-row-content">
                <div className="area-description">
                    <div className="area-name title">{item}</div>
                    <div className="area-objectives-count">5 objectives</div>
                </div>
                <Circle
                    progress={(index + 10) * 15} /*"Random" numbers for now */
                    showPercentage={false}
                    size={"35"}
                    lineWidth={"70"}
                    progressColor={"rgb(0, 200, 100)"} />
            </div>
        </ListItem>
    );
};

const detailViewMenuPayload: IMasterDetailsContextLayer<string, undefined> = {
    key: "detail-view",
    masterPanelContent: {
        renderContent: (parentItem, initialSelectedMasterItem) => (
            <MasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} />
        ),
        renderHeader: () => <MasterPanelHeader title={"Azure Devops"} />,
        onBackButtonClick: () => {
            alert("Return to previous page");
            return false;
        }
    },
    detailsContent: {
        renderContent: item => <DetailView area={item} />
    },
    selectedMasterItem: new ObservableValue<string>(areas[0]),
};

const MasterPanelContent: React.FunctionComponent<{
    initialSelectedMasterItem: IObservableValue<string>;
}> = props => {
    const initialItemProvider = new ArrayItemProvider(areas);
    const initialSelection = new ListSelection({ selectOnFocus: false });

    React.useEffect(() => {
        bindSelectionToObservable(
            initialSelection,
            initialItemProvider,
            props.initialSelectedMasterItem
        );
    });

    return (
        <List
            itemProvider={initialItemProvider}
            selection={initialSelection}
            renderRow={renderInitialRow}
        />
    );
};

const masterDetailsContext: IMasterDetailsContext = new BaseMasterDetailsContext(
    detailViewMenuPayload,
    () => { }
);

export const DetailViewMenu: React.SFC<{}> = props => {
    const initialState = {
        area: "Boards",
        timeFrame: "q2",
        addPanelExpanded: false,
        objectives: [],
        pendingObjective: {}
    };

    return (
        <StateProvider initialState={initialState} reducer={detailViewReducer}>
            <MasterDetailsContext.Provider value={masterDetailsContext}>
                <div className="flex-row">
                    <MasterPanel />
                    <DetailsPanel />
                </div>
            </MasterDetailsContext.Provider>
        </StateProvider>
    );
};
