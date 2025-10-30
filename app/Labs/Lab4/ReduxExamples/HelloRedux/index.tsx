"use client"
import { useSelector } from "react-redux";
import { Lab4State } from "../../store/types";

export default function HelloRedux() {
  const { message } = useSelector((state: Lab4State) => state.helloReducer);
  
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
    </div>
  );
}