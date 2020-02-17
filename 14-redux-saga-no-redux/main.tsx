/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

import React, {
} from "react"
import ReactDOM from "react-dom"
import App from "./src/App"


const rootElement = document.getElementById("root")

ReactDOM.createRoot(rootElement).render(<App />)