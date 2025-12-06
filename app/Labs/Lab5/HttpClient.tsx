"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
  const [errorOnClick, setErrorOnClick] = useState("");
  const [errorOnLoad, setErrorOnLoad] = useState("");

  const fetchWelcomeOnClick = async () => {
    try {
      setErrorOnClick("");
      const message = await client.fetchWelcomeMessage();
      setWelcomeOnClick(message);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setErrorOnClick(`Error: ${errorMessage}`);
      console.error("Error fetching welcome:", error);
    }
  };

  const fetchWelcomeOnLoad = async () => {
    try {
      setErrorOnLoad("");
      const welcome = await client.fetchWelcomeMessage();
      setWelcomeOnLoad(welcome);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setErrorOnLoad(`Error: ${errorMessage}`);
      console.error("Error fetching welcome on load:", error);
    }
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3>
      <p className="text-muted">
        Server URL: {process.env.NEXT_PUBLIC_HTTP_SERVER || "Not configured"}
      </p>
      
      <h4>Requesting on Click</h4>
      <button
        onClick={fetchWelcomeOnClick}
        className="btn btn-primary mb-2"
        id="wd-fetch-welcome-click"
      >
        Fetch Welcome
      </button>
      <br />
      {errorOnClick && (
        <div className="alert alert-danger" role="alert">
          {errorOnClick}
        </div>
      )}
      Response from server: <b id="wd-welcome-click">{welcomeOnClick || "No response"}</b>
      <hr />

      <h4>Requesting on Load</h4>
      {errorOnLoad && (
        <div className="alert alert-danger" role="alert">
          {errorOnLoad}
        </div>
      )}
      Response from server: <b id="wd-welcome-load">{welcomeOnLoad || "No response"}</b>
    </div>
  );
}
