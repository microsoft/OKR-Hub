import * as React from "react";
import { Area } from "../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { Splitter, SplitterElementPosition } from "azure-devops-ui/Splitter";
import { IdentityPickerDropdown, IPeoplePickerProvider, IIdentity } from "azure-devops-ui/IdentityPicker";
import { Objective } from "../Objective/Objective";
import "./AreaView.scss";

export interface IAreaCardProps {
    area: Area,
    objectives: Objective[],
    identityProvider: IPeoplePickerProvider
}

export class AreaCard extends React.Component<IAreaCardProps> {
    public render(): JSX.Element {
        return <Card className="okrhub area-card">
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
        return <>
            <h3 className="area-name">{this.props.area.Name}</h3>
            <p className="area-description">{this.props.area.Description}</p>
            <h4>{`${this.props.objectives.length} objectives`}</h4>
            {this.renderProgress()}
        </>;
    };

    private renderProgress = (): JSX.Element => {
        return <div>
            {this.props.objectives.map(objective => {
                return <div>Objective</div>;
            })}
        </div>;
    }

    private onRenderFarElement = (): JSX.Element => {
        return <IdentityPickerDropdown className="area-identity"
            onChange={this.onChange}
            pickerProvider={this.props.identityProvider}
            value={this.props.identityProvider.getEntityFromUniqueAttribute(this.props.area.OwnerId) as IIdentity}
        />;
    };

    private onChange = (identity?: IIdentity) => {

    };
}