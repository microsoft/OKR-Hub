import * as React from "react";
import { MessageCard, MessageCardSeverity } from "azure-devops-ui/MessageCard";

export interface ErrorMessageProps {
    error?: Error;
    onDismiss?: () => void; 
}

export class ErrorMessage extends React.Component<ErrorMessageProps, {}> {
    public render(): JSX.Element {

        if (this.props.error && this.props.error.message !== "") {
            return (
                <MessageCard
                    className="okr-error-message"
                    onDismiss={this.props.onDismiss}
                    severity={MessageCardSeverity.Error}
                >
                    {this.props.error.message}
                </MessageCard>
            );
        }
        else {
            return null;
        }
    }
}