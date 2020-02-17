/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

import React, {
} from "react"
import ReactDOM from "react-dom"
import UseSaga from "./src/UseSaga"
import UseGlobalSaga from "./src/UseGlobalSaga"


const rootElement = document.getElementById("root")

ReactDOM.createRoot(rootElement).render(
  <div>
    <div>
      <UseSaga />
    </div>
    <div>
      <UseGlobalSaga />
    </div>
  </div>
)