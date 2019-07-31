import * as React from "react";
import { Area } from "../../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { Splitter, SplitterElementPosition } from "azure-devops-ui/Splitter";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { Objective } from "../../Objective/Objective";
import "../AreaView.scss";
import { AreaCardIdentity } from "./AreaCardIdentity";
import { AreaCardDetails } from "./Details/AreaCardDetails";
import { Dialog } from "azure-devops-ui/Dialog";

export interface IAreaCardProps {
    area: Area;
    objectives: Objective[];
    identityProvider: IPeoplePickerProvider;
    removeAreaCallback: (id: string, areaId: string) => void;
}

export const AreaCard: React.FunctionComponent<IAreaCardProps> = props => {
    const { area, identityProvider, removeAreaCallback } = props;
    const [{ editMode, isDialogOpen }, localDispatcher] = React.useState({ editMode: false, isDialogOpen: false });

    const toggleEditMode = () => {
        localDispatcher({ editMode: !editMode, isDialogOpen: isDialogOpen });
    };

    const setDialogState = (dialogStatus: boolean) => {
        localDispatcher({ editMode: editMode, isDialogOpen: dialogStatus });
    };

    const onRenderFarElement = (identityProvider: IPeoplePickerProvider, ownerId: string, editMode: boolean) => {
        return <AreaCardIdentity identityProvider={identityProvider} ownerId={ownerId} editMode={editMode} />;
    };

    const onRenderNearElement = (area, editMode: boolean, toggleEditMode: () => void) => {
        return <AreaCardDetails area={area} editMode={editMode} toggleEditMode={toggleEditMode} setDialogState={setDialogState} />;
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
        {isDialogOpen &&
            <Dialog
                titleProps={{ text: "Delete Area" }}
                footerButtonProps={[
                    {
                        text: "Cancel",
                        onClick: () => {
                            setDialogState(false);
                        }
                    },
                    {
                        text: "OK", primary: true, onClick: () => {
                            removeAreaCallback(area.id, area.AreaId);
                            setDialogState(false);
                        }
                    }
                ]}
                onDismiss={() => {
                    setDialogState(false);
                }}>
                {"Are you sure to delete this area?"}
            </Dialog>}
    </Card>
}



