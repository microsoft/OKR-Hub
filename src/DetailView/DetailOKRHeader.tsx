import * as React from "react";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { useStateValue } from '../StateMangement/StateProvider';
import { Area } from "../Area/Area";
import { TimeFrameSettings } from "../TimeFrameSettings/TimeFrameSettings";

export interface IDetailOKRHeaderProps {
    selectedArea: Area;
}

export const DetailOKRHeader: React.SFC<IDetailOKRHeaderProps> = (props: IDetailOKRHeaderProps) => {

    const stateContext = useStateValue();


    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            important: true,
            id: "create-okr",
            text: "New OKR", 
            onActivate: () => {
                stateContext.actions.toggleAddPanel({ expanded: true });
            },
            iconProps: {
                iconName: "Add"
            }
        },
        {
            important: true,
            id: "settings",
            onActivate: () => {
                stateContext.actions.toggleSettings({ expanded: true });
            },
            iconProps: {
                iconName: "Settings"
            }
        }
    ];

    return (
        <div>
            <Header
                className={"detail-okr-header"}
                title={props.selectedArea.Name}
                commandBarItems={[...commandBarItems]}
                titleSize={TitleSize.Medium}
            />
            {stateContext.state.settingsExpanded && <TimeFrameSettings timeFrames={stateContext.state.timeFrames} />}
        </div>
    );
}