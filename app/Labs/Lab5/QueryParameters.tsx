"use client";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        className="form-control mb-2"
        id="wd-query-parameter-a"
      />
      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        className="form-control mb-2"
        id="wd-query-parameter-b"
      />
      <div className="btn-group mb-3">
        <a
          href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
          className="btn btn-primary"
          id="wd-query-parameter-add"
          target="_blank"
        >
          Add {a} + {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
          className="btn btn-danger"
          id="wd-query-parameter-subtract"
          target="_blank"
        >
          Subtract {a} - {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
          className="btn btn-success"
          id="wd-query-parameter-multiply"
          target="_blank"
        >
          Multiply {a} × {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
          className="btn btn-warning"
          id="wd-query-parameter-divide"
          target="_blank"
        >
          Divide {a} ÷ {b}
        </a>
      </div>
    </div>
  );
}