import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import ShortSidebar from "./components/sidebar/ShortSidebar";
import "./components/styles.css";
import CreateAccount from "./pages/CreateAccount";
=======
import App from "./App";
import reportWebVitals from "./reportWebVitals";
>>>>>>> BE/gawon

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <div className="BackgroundColor">
      <div className="BackgroundBox">
        <ShortSidebar/>
        <CreateAccount/>
      </div>
    </div>
=======
    <App />
>>>>>>> BE/gawon
  </React.StrictMode>
);
