import * as React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { SampleDataPage } from "./SampleDataPage";
import { DetailViewMenu } from "./DetailView/DetailViewMenu";
import { AreaView } from "./AreaView/AreaView";

export class OKRMain extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <>
                <Router>
                    <nav><ul>
                        <li><Link to="/AreaView">AreaView</Link></li>
                        <li><Link to="/Data">Data</Link></li>
                        <li><Link to="/DetailView">DetailView</Link></li>
                    </ul></nav>
                    
                    <Route path="/Data" component={SampleDataPage} />
                    <Route path="/AreaView" component={AreaView} />
                    <Route path="/DetailView" component={DetailViewMenu} />
                    {/* We can't use an empty route due to the nature of hub extensions, so we'll redirect. */}
                    <Redirect from="/" to="/DetailView" />
                </Router>
            </>
        );
    }
}
