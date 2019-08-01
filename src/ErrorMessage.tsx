import * as React from "react";
import { MessageCard, MessageCardSeverity } from "azure-devops-ui/MessageCard";

export interface ErrorMessageProps {
    error?: Error;
    onDismiss?: () => void;
}

export class ErrorMessage extends React.Component<ErrorMessageProps, {}> {

    private static etagErrorMessage = "Operation failed. Another user has updated this resource before you. Please refresh the page and try again."; 

    public render(): JSX.Element {
        const { error } = this.props;
        
        if (error) {

            // If there is an etag error (a user is trying to update stale data), show a more descriptive message
            let message = this.checkIfErrorIsETag(error) ? ErrorMessage.etagErrorMessage : error.message;
            return (
                <MessageCard
                    className="okr-error-message"
                    onDismiss={this.props.onDismiss}
                    severity={MessageCardSeverity.Error}
                >
                    {message}
                </MessageCard>
            );
        }
        else {
            return null;
        }
    }

    private checkIfErrorIsETag(error: any): boolean {
        return error && error.serverError && error.serverError.typeKey === "InvalidDocumentVersionException"; 
    }
}