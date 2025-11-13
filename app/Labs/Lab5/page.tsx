"use client";
import React from "react";
import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import HttpClient from "./HttpClient";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5" className="container-fluid">
      <h2>Lab 5</h2>
      
      <div className="list-group mb-3">
        <a
          href={`${HTTP_SERVER}/lab5/welcome`}
          className="list-group-item list-group-item-action"
          id="wd-lab5-welcome"
        >
          Welcome
        </a>
      </div>

      <hr />
      <EnvironmentVariables />
      <hr />
      <PathParameters />
      <hr />
      <QueryParameters />
      <hr />
      <WorkingWithObjects />
      <hr />
      <WorkingWithObjectsAsynchronously />
      <hr />
      <WorkingWithArrays />
      <hr />
      <WorkingWithArraysAsynchronously />
      <hr />
      <HttpClient />
    </div>
  );
}