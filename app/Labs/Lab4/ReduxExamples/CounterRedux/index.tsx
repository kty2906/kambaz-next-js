"use client"
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import { Button } from "react-bootstrap";

export default function CounterRedux() {
  const { count } = useSelector((state: any) => state.counterReducer);
  const dispatch = useDispatch();
  
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <Button 
        onClick={() => dispatch(increment())}
        className="btn btn-success me-2"
        id="wd-counter-redux-increment-click"
      >
        Increment
      </Button>
      <Button 
        onClick={() => dispatch(decrement())}
        className="btn btn-danger"
        id="wd-counter-redux-decrement-click"
      >
        Decrement
      </Button>
      <hr/>
    </div>
  );
}