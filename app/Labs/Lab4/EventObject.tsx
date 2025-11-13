"use client"
import { useState } from "react";

interface SerializedEvent {
  target?: string;
  type?: string;
  timeStamp?: number;
  [key: string]: string | number | undefined;
}

export default function EventObject() {
  const [event, setEvent] = useState<SerializedEvent | null>(null);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const serializedEvent: SerializedEvent = {
      type: e.type,
      timeStamp: e.timeStamp,
      target: e.currentTarget.outerHTML,
    };
    setEvent(serializedEvent);
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