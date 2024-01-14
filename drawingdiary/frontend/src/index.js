import React from "react";
import ReactDOM from "react-dom/client";
import "./components/styles.css";
import CreateAccount from "./pages/CreateAccount";
import SideBar from "./components/sidebar/SideBar";
import ShortSidebar from "./components/sidebar/ShortSidebar";

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
