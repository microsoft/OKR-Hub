import { IObservableValue, ObservableValue } from "azure-devops-ui/Core/Observable";
import { List, ListItem, ListSelection, IListItemDetails, IListRow } from "azure-devops-ui/List";
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
import { useStateValue } from '../StateMangement/StateProvider';
import { Area } from "../Area/Area";

const renderInitialRow = (
    index: number,
    item: Area,
    details: IListItemDetails<Area>,
): JSX.Element => {
    return (        
        <ListItem
            key={"list-item" + index}
            index={index}
            details={details}
        >
            <div className="master-row-content">
                <div className="area-description">
                    <div className="area-name title">{item.Name}</div>
                    <div className="area-objectives-count">5 objectives</div>
                </div>
                <Circle
                    progress={(index + 10) * 15} /*"Random" numbers for now */
                    showPercentage={false}
                    size={"40"}
                    lineWidth={"60"}
                    progressColor={"rgb(0, 200, 100)"} />
            </div>
        </ListItem>
    );
};

function createDetailsViewPayload(): IMasterDetailsContextLayer<Area, undefined> {
    const [{selectedArea}, actions] = useStateValue();
    return {
        key: "detail-view",
        masterPanelContent: {
            renderContent: (parentItem, initialSelectedMasterItem) => (
                <MasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} />
            ),
            renderHeader: () => <MasterPanelHeader title={"Azure Devops"} />,
            onBackButtonClick: () => {
                actions.navigatePage({
                    pageLocation: "AreaView"
                });
                return false;
            }
        },
        detailsContent: {
            renderContent: item => <DetailView selectedArea={item} />
        },
        selectedMasterItem: new ObservableValue<Area>(selectedArea),
    };
}

const MasterPanelContent: React.FunctionComponent<{
    initialSelectedMasterItem: IObservableValue<Area>;
}> = props => {
    const [{ areas }, actions] = useStateValue();

    const initialItemProvider = new ArrayItemProvider(areas as Area[]);
    const initialSelection = new ListSelection({ selectOnFocus: false });

    // This is how the observable interacts with our selected item     
    React.useEffect(() => {
        if (areas.length === 0) { // this condition should be changed to deal with zero data experience.
            actions.getAreas();
        }
        bindSelectionToObservable(
            initialSelection,
            initialItemProvider,
            props.initialSelectedMasterItem
        );
    });

    
    const onListClick = (event: React.SyntheticEvent, listRow: IListRow<Area>) => {
        actions.updateArea({
            selectedArea: listRow.data
        });
    };

    return (
        <List
            itemProvider={initialItemProvider}
            selection={initialSelection}
            renderRow={renderInitialRow}
            onSelect={onListClick}
        />
    );
};


export const DetailViewMenu: React.FunctionComponent<{}> = props => {    
    const detailViewMenuPayload = createDetailsViewPayload();

    const masterDetailsContext: IMasterDetailsContext = new BaseMasterDetailsContext(
        detailViewMenuPayload,
        () => { }
    );

    return (
        <MasterDetailsContext.Provider value={masterDetailsContext}>
            <div className="flex-row">
                <MasterPanel />
                <DetailsPanel />
            </div>
        </MasterDetailsContext.Provider>
    );
};
