"use client";

import CS2001Modules from "../Modules/page";
import CS2001Status from "./Status";

const CS1234Home = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <CS2001Modules />
      </div>
      <CS2001Status />
    </div>
  );
};

export default CS1234Home;
