import * as React from "react";
import { Area } from "../../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { Splitter, SplitterElementPosition } from "azure-devops-ui/Splitter";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { Objective } from "../../Objective/Objective";
import "../AreaView.scss";
import { AreaCardIdentity } from "./AreaCardIdentity";
import { AreaCardDetails } from "./Details/AreaCardDetails";

export interface IAreaCardProps {
    area: Area;
    objectives: Objective[];
    identityProvider: IPeoplePickerProvider;
    navigateCallback: (area: Area) => void;
    updateAreaCallback: (area: Area) => void;
    removeAreaCallback: (id: string, areaId: string) => void;
}

export const AreaCard: React.FunctionComponent<IAreaCardProps> = props => {
    const { area, identityProvider } = props;
    const [{ editMode }, localDispatcher] = React.useState({ editMode: false });
    
    const toggleEditMode = () => {
		localDispatcher({ editMode: !editMode });
	};

    return <Card className="area-card">
            <Splitter
                fixedElement={SplitterElementPosition.Far}
                fixedSize={64}
                splitterDirection={1}
                onRenderNearElement={() => onRenderNearElement(area, editMode, toggleEditMode)}
                onRenderFarElement={() => onRenderFarElement(identityProvider, area.OwnerId, editMode)}
                nearElementClassName="area-details"
                disabled={true}
            />
        </Card>
}

function onRenderNearElement(area, editMode: boolean, toggleEditMode: () => void): JSX.Element {
    return <AreaCardDetails area={area} editMode={editMode} toggleEditMode={toggleEditMode} />;
};

function onRenderFarElement(identityProvider: IPeoplePickerProvider, ownerId: string, editMode: boolean): JSX.Element {
    return <AreaCardIdentity identityProvider={identityProvider} ownerId={ownerId} editMode={editMode} />;
};