import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/import.scss";
import { FileProvider } from "./context/FileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FileProvider>
      <App />
    </FileProvider>
  </React.StrictMode>
);
