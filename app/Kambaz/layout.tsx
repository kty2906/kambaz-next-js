"use client"
import { ReactNode } from "react";
import KambazNavigation from "./Components/Navigation";
import { Provider } from "react-redux";
import store from "./store";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";

export default function KambazLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <Provider store={store}>
      <div id="wd-kambaz">
        <div className="d-flex">
          <div>
            <KambazNavigation />
          </div>
          <div className="wd-main-content-offset p-3 flex-fill">
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
}
