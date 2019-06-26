import * as React from "react";
import { ExtensionDataService } from "VSS/SDK/Services/ExtensionData";

interface ISampleDataPageState {
    collection: string,
    content: any,
    addDisabled: boolean
}

export class SampleDataPage extends React.Component<{}, ISampleDataPageState> {

    public constructor() {
        super();

        this.state = {
            collection: "",
            content: "",
            addDisabled: true
        };
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
}