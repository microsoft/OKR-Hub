import * as React from "react";
import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";
import { OKRDataService } from "./Data/OKRDataService";
import { AreaService } from "./Area/AreaService";
import { ObjectiveService } from "./Objective/ObjectiveService";

interface ISampleDataPageState {
    collection: string;
    content: any;
    addDisabled: boolean;
    existing: any[];
    deleteChecked: boolean;
}

export class SampleDataPage extends React.Component<{}, ISampleDataPageState> {

    public constructor(props, state: ISampleDataPageState) {
        super(props, state);

        this.state = {
            collection: "",
            content: "",
            addDisabled: true,
            existing: undefined,
            deleteChecked: false,
        };
    }

    public async componentDidMount() {
        try {
            const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
            const projectKey = OKRDataService.getProjectKey("areas");
            let documents = [];
            
            try {
                documents = await dataService.getDocuments(projectKey);
            } catch (_) {
            }

            this.setState({
                existing: documents
            });
        } catch (e) {
            alert("Failed to get existing data: " + e.message);
        }
    }

    public render() {
        return (<>
            {this.renderDelete()}
            <div>
                <label>Collection</label>
                <input onChange={this.collectionChange} />
            </div>
            <div>
                <label>Content</label>
                <textarea onChange={this.contentChange} />
            </div>
            <button onClick={this.addClick} disabled={this.state.addDisabled}>Add</button>
            <div>
                {this.renderData()}
            </div>
        </>);
    }

    private collectionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            collection: event.target.value
        });
        this.updateButton();
    };

    private contentChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let newContent = "";
        try {
            newContent = JSON.parse(event.target.value);
        } catch {
        }

        this.setState({
            content: newContent
        },
            this.updateButton);
    };

    private updateButton = (): void => {
        const disabled = !(this.state.collection && this.state.content);
        this.setState({
            addDisabled: disabled
        });
    };

    private addClick = async (): Promise<void> => {
        try {
            const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
            const projectKey = OKRDataService.getProjectKey(this.state.collection);
            const document = await dataService.createDocument(projectKey, this.state.content);

            if (document && document.id) {
                alert("Yay");
            } else {
                alert("hmm");
            }
        } catch (e) {
            alert("Failed to get service: " + e.message);
        }
    };

    private renderData = (): JSX.Element => {
        if (this.state.existing) {
            return <pre>{JSON.stringify(this.state.existing, null, 4)}</pre>;
        }
        else {
            return <div>Loading...</div>;
        }
    };

    private renderDelete = (): JSX.Element => {
        if (this.state.deleteChecked) {
            return <>
                <button onClick={this.deleteAllAreas}>Delete All Areas</button>
                <button onClick={this.deleteAllObjectives}>Delete All Objectives</button>
            </>;
        } else {
            return <label>Delete <input type="checkbox" onChange={this.deleteAllChange} /></label>;
        }
    }

    private deleteAllAreas = async (): Promise<void> => {
        if (confirm("Are you sure you wish to delete all areas?")) {
            await AreaService.instance.deleteAll();
            alert("All areas deleted.");
        }
    }

    private deleteAllObjectives = async (): Promise<void> => {
        if (confirm("Are you sure you wish to delete all objectives?")) {
            await ObjectiveService.instance.deleteAll();
            alert("All objectives deleted.");
        }
    }

    private deleteAllChange = (): void => {
        this.setState({ deleteChecked: true });
    }
}