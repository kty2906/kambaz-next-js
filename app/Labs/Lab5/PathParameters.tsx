"use client";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-path-parameters">
      <h3>Path Parameters</h3>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        className="form-control mb-2"
        id="wd-path-parameter-a"
      />
      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        className="form-control mb-2"
        id="wd-path-parameter-b"
      />
      <div className="btn-group mb-3">
        <a
          href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
          className="btn btn-primary"
          id="wd-path-parameter-add"
          target="_blank"
        >
          Add {a} + {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
          className="btn btn-danger"
          id="wd-path-parameter-subtract"
          target="_blank"
        >
          Subtract {a} - {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}
          className="btn btn-success"
          id="wd-path-parameter-multiply"
          target="_blank"
        >
          Multiply {a} × {b}
        </a>
        <a
          href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}
          className="btn btn-warning"
          id="wd-path-parameter-divide"
          target="_blank"
        >
          Divide {a} ÷ {b}
        </a>
      </div>
    </div>
  );
}