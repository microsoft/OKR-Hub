import * as React from "react";
import { Area } from "../../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { Splitter, SplitterElementPosition } from "azure-devops-ui/Splitter";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { Objective } from "../../Objective/Objective";
import "../AreaView.scss";
import { AreaCardIdentity } from "./AreaCardIdentity";
import { AreaCardDetails } from "./AreaCardDetails";

export interface IAreaCardProps {
    area: Area,
    objectives: Objective[],
    identityProvider: IPeoplePickerProvider,
}

export class AreaCard extends React.Component<IAreaCardProps> {
    public render(): JSX.Element {
        return <Card className="area-card">
            <Splitter
                fixedElement={SplitterElementPosition.Far}
                fixedSize={64}
                splitterDirection={1}
                onRenderNearElement={this.onRenderNearElement}
                onRenderFarElement={this.onRenderFarElement}
                nearElementClassName="area-details"
            />
        </Card>;
    }

    private onRenderNearElement = (): JSX.Element => {
        return <AreaCardDetails name={this.props.area.Name} description={this.props.area.Description} objectives={this.props.objectives} />;
    };

    private onRenderFarElement = (): JSX.Element => {
        return <AreaCardIdentity identityProvider={this.props.identityProvider} ownerId={this.props.area.OwnerId} />
    };
}