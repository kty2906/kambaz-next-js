"use client";

import CS1234Modules from "../Modules/page";
import CS1234Status from "./Status";

const CS1234Home = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <CS1234Modules />
      </div>
      <CS1234Status />
    </div>
  );
};

export default CS1234Home;
