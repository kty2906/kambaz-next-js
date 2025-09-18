"use client";

import CS3002Modules from "../Modules/page";
import CS3002Status from "./Status";

const CS3002Home = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <CS3002Modules />
      </div>
      <CS3002Status />
    </div>
  );
};

export default CS3002Home;
