import React from "react";
import ReactDOM from "react-dom/client";
import "boxicons/css/boxicons.css";
import "./assets/tailwind.css";
import "./i18n";
import { App } from "./Components/App"

const element = document.getElementById("root");
ReactDOM.createRoot(element).render(
    <React.StrictMode>
        <App />
    </React.StrictMode >
);

