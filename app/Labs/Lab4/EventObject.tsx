"use client"
import { useState } from "react";

export default function EventObject() {
  const [event, setEvent] = useState<React.MouseEvent | null>(null);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventCopy: any = { ...e };
    eventCopy.target = e.currentTarget.outerHTML;
    delete eventCopy.view;
    setEvent(eventCopy);
  };
  
  return (
    <div>
      <h2>Event Object</h2>
      <button 
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr/>
    </div>
  );
}