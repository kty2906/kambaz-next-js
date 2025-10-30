"use client"
import { Button } from "react-bootstrap";

export default function ChildStateComponent({
  counter,
  setCounter
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <h3>Child Counter: {counter}</h3>
      <Button 
        onClick={() => setCounter(counter + 1)} 
        className="btn btn-success me-2"
        id="wd-increment-child-state-click"
      >
        Increment
      </Button>
      <Button 
        onClick={() => setCounter(counter - 1)} 
        className="btn btn-danger"
        id="wd-decrement-child-state-click"
      >
        Decrement
      </Button>
    </div>
  );
}
