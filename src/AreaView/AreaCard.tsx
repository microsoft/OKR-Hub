import * as React from "react";
import { Area } from "../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { Circle } from "react-circle";
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
        return <>
            <h3 className="area-name">{this.props.area.Name}</h3>
            <p className="area-description">{this.props.area.Description}</p>
            <h4>{`${this.props.objectives.length} objectives`}</h4>
            {this.renderProgress()}
        </>;
    };

    private renderProgress = (): JSX.Element => {
        return <div className="area-progress">
            {this.props.objectives.map(objective => {
                return <span className="area-circle">
                    <Circle
                        progress={objective.Progress * 100}
                        showPercentage={false}
                        size={"35"}
                        lineWidth={"70"}
                        progressColor={"rgb(0, 200, 100)"}
                    />
                </span>
            })}
        </div>;
    }

    private onRenderFarElement = (): JSX.Element => {
        return <div className="area-identity">
            <IdentityPickerDropdown
                onChange={this.onChange}
                pickerProvider={this.props.identityProvider}
                value={this.props.identityProvider.getEntityFromUniqueAttribute(this.props.area.OwnerId) as IIdentity}
            />
        </div>;
    };

    private onChange = (identity?: IIdentity) => {

    };
}