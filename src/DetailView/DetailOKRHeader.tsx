import * as React from "react";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { useStateValue } from '../StateProvider';

export interface IDetailOKRHeaderProps {
    title: String;
}

export const DetailOKRHeader: React.SFC<{}> = props => {

    const [{ selectedArea }, dispatch ] = useStateValue();

        
    const commandBarItems: IHeaderCommandBarItem[] = [
        {
            important: true,
            id: "create-okr",
            text: "New OKR", // TODO: Resource file for localization
            onActivate: () => {
                dispatch({
                    type: 'togglePanel',
                    expanded: true
                  });
            },
            iconProps: {
                iconName: "Add"
            }
        }
    ];

    return (
            <div>
                <Header
                    className={"detail-okr-header"}
                    title={selectedArea.Name}
                    commandBarItems={[...commandBarItems]}
                    titleSize={TitleSize.Medium}
                />
            </div>
    );
}