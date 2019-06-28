import * as React from "react";
import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";

interface ISampleDataPageState {
    collection: string,
    content: any,
    addDisabled: boolean,
    existing: any[];
}

export class SampleDataPage extends React.Component<{}, ISampleDataPageState> {

    public constructor() {
        super();

        this.state = {
            collection: "",
            content: "",
            addDisabled: true,
            existing: undefined
        };
    }

    public async componentDidMount() {
        try {
            const dataService: ExtensionDataService = await VSS.getService<ExtensionDataService>(VSS.ServiceIds.ExtensionData);
            const documents = await dataService.getDocuments("objectives");

            this.setState({
                existing: documents
            });
        } catch (e) {
            alert("Failed to get existing data: " + e.message);
        }
    }

    public render() {
        return (<>
            <div>
                <label>Collection</label>
                <input onChange={this.collectionChange} />
            </div>
            <div>
                <label>Content</label>
                <input onChange={this.contentChange} />
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

    private contentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
            const document = await dataService.createDocument(this.state.collection, this.state.content);

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
}