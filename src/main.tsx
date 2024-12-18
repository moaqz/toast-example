import "./styles/reset.css";
import "./styles/main.css";

import { render } from "preact";
import { App } from "./app.tsx";

render(<App />, document.querySelector("#app")!);
