import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { AuthProvider } from "oidc-react"

import App from "./App"
import store from "@/store"
import { oidcConfig } from "@/config"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </AuthProvider>
    </React.StrictMode>,
)
