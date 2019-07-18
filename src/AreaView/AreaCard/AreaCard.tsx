import * as React from "react";
import { Area } from "../../Area/Area";
import { Card } from "azure-devops-ui/Card";
import { Splitter, SplitterElementPosition } from "azure-devops-ui/Splitter";
import { IPeoplePickerProvider } from "azure-devops-ui/IdentityPicker";
import { Objective } from "../../Objective/Objective";
import "../AreaView.scss";
import { AreaCardIdentity } from "./AreaCardIdentity";
import { AreaCardDetails } from "./Details/AreaCardDetails";
import { Button } from "azure-devops-ui/Button";

export interface IAreaCardProps {
    area: Area,
    objectives: Objective[],
    identityProvider: IPeoplePickerProvider,
}

export interface IAreaCardState {
    editMode: boolean;
}

export class AreaCard extends React.Component<IAreaCardProps, IAreaCardState> {
    public constructor(props) {
        super(props);

        this.state = {} as IAreaCardState;
    }

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
            {this.renderEditButtons()}
            <AreaCardDetails area={this.props.area} objectives={this.props.objectives} editMode={this.state.editMode} />
        </>
    };

    private editModeToggle = (): void => {
        this.setState({ editMode: !this.state.editMode });
    };

    private onRenderFarElement = (): JSX.Element => {
        return <AreaCardIdentity identityProvider={this.props.identityProvider} ownerId={this.props.area.OwnerId} editMode={this.state.editMode} />;
    };

    private renderEditButtons = (): JSX.Element => {
        let content = <Button
            onClick={this.editModeToggle}
            ariaLabel="Edit button"
            iconProps={{ iconName: "Edit" }}
        />;

        if (this.state.editMode) {
            content = <>
                <Button
                    onClick={this.save}
                    ariaLabel="Save button"
                    iconProps={{ iconName: "Save" }}
                />
                <Button
                    onClick={this.editModeToggle}
                    ariaLabel="Cancel button"
                    iconProps={{ iconName: "Cancel" }}
                />
            </>;
        }

        return content;
    }

    private save = (): void => {

        this.editModeToggle();
    }
}