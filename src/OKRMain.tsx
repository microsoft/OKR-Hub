import * as React from "react";
import { SampleDataPage } from "./SampleDataPage";
import { DetailViewMenu } from "./DetailView/DetailViewMenu";
import { AreaView } from "./AreaView/AreaView";
import { StateProvider, useStateValue, StateContext } from './StateProvider';
import { detailViewReducer } from "./DetailView/DetailViewReducer";
import { Button } from "azure-devops-ui/Button";
import * as Actions from "./DetailView/DetailViewActions";
import { NavigationConstants } from "./OKRConstants";

export class OKRMain extends React.Component<{}, {}> {
    public render(): JSX.Element {
        const initialState = {
            pageLocation: "AreaView",
            area: "",
            timeFrame: "q2",
            objectives: []
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