import * as React from "react";
import { SampleDataPage } from "./SampleDataPage";
import { DetailViewMenu } from "./DetailView/DetailViewMenu";
import { AreaView } from "./AreaView/AreaView";
import * as SDK from "azure-devops-extension-sdk";
import { StateProvider, useStateValue } from './StateProvider';
import { detailViewReducer } from "./DetailView/DetailViewReducer";
import { Button } from "azure-devops-ui/Button";
import * as Actions from "./DetailView/DetailViewActions";
import { NavigationConstants } from "./OKRConstants";

export class OKRMain extends React.Component<{}, {}> {
    public componentDidMount() {
        SDK.init();
    }

    public render(): JSX.Element {
        const initialState = {
            pageLocation: NavigationConstants.AreaView,
            selectedArea: "",
            timeFrame: "q2",
            addPanelExpanded: false,
            objectives: [],
            areas: [],
        };

        return (
            <StateProvider initialState={initialState} reducer={detailViewReducer}>
                <div className="okrhub">
                    <OKRPage />
                </div>
            </StateProvider>
        );
    }
}

const OKRPage: React.SFC<{}> = props => {
    const [{ pageLocation }, dispatch] = useStateValue();

    let okrPage;

    switch (pageLocation) {
        case NavigationConstants.AreaView:
            okrPage = <AreaView />;
            break;
        case NavigationConstants.DetailView:
            okrPage = <DetailViewMenu />;
            break;
        case NavigationConstants.Data:
            okrPage = <SampleDataPage />;
            break;
    }

    return (
        <div>
            <Button text={"Home"} onClick={() => {
                dispatch({
                    type: Actions.navigatePage,
                    pageLocation: NavigationConstants.AreaView
                })
            }} />

            <Button text={"Objectives View"} onClick={() => {
                dispatch({
                    type: Actions.navigatePage,
                    pageLocation: NavigationConstants.DetailView
                })
            }} />

            <Button text={"Data"} onClick={() => {
                dispatch({
                    type: Actions.navigatePage,
                    pageLocation: NavigationConstants.Data
                })
            }} />
            {okrPage}
        </div>);
};