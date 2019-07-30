import * as React from "react";
import { Area } from "../../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { Splitter, SplitterElementPosition } from "azure-devops-ui/Splitter";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { Objective } from "../../Objective/Objective";
import "../AreaView.scss";
import { AreaCardIdentity } from "./AreaCardIdentity";
import { AreaCardDetails } from "./Details/AreaCardDetails";
import { AreaCardProvider } from "./Provider/AreaCardProvider";
import { areaCardReducer } from "./Provider/AreaCardReducer";

export interface IAreaCardProps {
    area: Area;
    objectives: Objective[];
    identityProvider: IPeoplePickerProvider;
    navigateCallback: (area: Area) => void;
    updateAreaCallback: (area: Area) => void;
}

export const AreaCard: React.FunctionComponent<IAreaCardProps> = props => {
    const { area } = props;

    const initialState = {
        area,
        objectives: props.objectives,
        editMode: false,
    };

    return <AreaCardProvider initialState={initialState} reducer={areaCardReducer}>
        <Card className="area-card">
            <Splitter
                fixedElement={SplitterElementPosition.Far}
                fixedSize={64}
                splitterDirection={1}
                onRenderNearElement={onRenderNearElement}
                onRenderFarElement={() => onRenderFarElement(props.identityProvider, area.OwnerId)}
                nearElementClassName="area-details"
                disabled={true}
            />
        </Card>
    </AreaCardProvider>;
}

function onRenderNearElement(): JSX.Element {
    return <AreaCardDetails />;
};

function onRenderFarElement(identityProvider: IPeoplePickerProvider, ownerId: string): JSX.Element {
    return <AreaCardIdentity identityProvider={identityProvider} ownerId={ownerId} />;
};