import React from "react";
import ReactDOM from "react-dom/client";
import ShortSidebar from "./components/sidebar/ShortSidebar";
import "./components/styles.css";
import CreateAccount from "./pages/CreateAccount";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="BackgroundColor">
      <div className="BackgroundBox">
        <ShortSidebar/>
        <CreateAccount/>
      </div>
    </div>
  </React.StrictMode>
);
