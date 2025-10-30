"use client"
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import { Provider } from "react-redux";
import store from "./store";
import ReduxExamples from "./ReduxExamples/page";
import { Container } from "react-bootstrap";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  
  return (
    <Provider store={store}>
      <Container>
        <h1>Lab 4 - State Management</h1>
        
        {/* User Events */}
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <EventObject />
        
        {/* Component State */}
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        
        {/* Redux Examples */}
        <ReduxExamples />
      </Container>
    </Provider>
  );
}
