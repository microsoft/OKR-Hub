import * as React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { ObjectivePage } from "./Objective/ObjectivePage";
import { SampleDataPage } from "./SampleDataPage";

export class OKRMain extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <>
                <Router>
                    <nav><ul>
                        <li><Link to="/Objectives">Objectives</Link></li>
                        <li><Link to="/Data">Data</Link></li>
                    </ul></nav>
                    
                    <Route path="/Objectives" exact component={ObjectivePage} />
                    <Route path="/Data" component={SampleDataPage} />

                    {/* We can't use an empty route due to the nature of hub extensions, so we'll redirect. */}
                    <Redirect from="/" to="/Objectives" />
                </Router>
            </>
        );
    }
}
