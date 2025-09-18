"use client";

import CS4003Modules from "../Modules/page";
import CS4003Status from "./Status";

const CS4003Home = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <CS4003Modules />
      </div>
      <CS4003Status />
    </div>
  );
};

export default CS4003Home;
