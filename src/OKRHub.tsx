import * as React from "react";
import * as ReactDOM from "react-dom";
import { OKRMain } from "./OKRMain";

export function initialize(): void {
    ReactDOM.render(<OKRMain />, document.getElementById("root"));
}