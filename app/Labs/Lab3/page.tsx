// app/Labs/Lab3/page.tsx
import {
    VariablesAndConstants,
    VariableTypes,
    BooleanVariables,
    IfElse,
    TernaryOperator,
    ConditionalOutputIfElse,
    ConditionalOutputInline,
    LegacyFunctions,
    ArrowFunctions,
    ImpliedReturn,
    TemplateLiterals,
    SimpleArrays,
    ArrayIndexAndLength,
    AddingAndRemovingToFromArrays,
    ForLoops,
    MapFunction,
    FindFunction,
    FindIndex,
    FilterFunction,
    JsonStringify,
    House,
    Spreading,
    Destructing,
    FunctionDestructing,
    DestructingImports,
    Classes,
    Styles,
    Add,
    Square,
    Highlight,
    PathParameters,
  } from "./Components";
  import TodoList from "./todos/TodoList";
  
  export default function Lab3() {
    console.log('Hello World!');
    
    return (
      <div id="wd-lab3" className="container">
        <h3>Lab 3</h3>
        
        <VariablesAndConstants />
        <VariableTypes />
        <BooleanVariables />
        <IfElse />
        <TernaryOperator />
        <ConditionalOutputIfElse />
        <ConditionalOutputInline />
        <LegacyFunctions />
        <ArrowFunctions />
        <ImpliedReturn />
        <TemplateLiterals />
        <SimpleArrays />
        <ArrayIndexAndLength />
        <AddingAndRemovingToFromArrays />
        <ForLoops />
        <MapFunction />
        <FindFunction />
        <FindIndex />
        <FilterFunction />
        <JsonStringify />
        <House />
        <TodoList />
        <Spreading />
        <Destructing />
        <FunctionDestructing />
        <DestructingImports />
        <Classes />
        <Styles />
        
        <Add a={3} b={4} />
        
        <h4>Square of 4</h4>
        <Square>4</Square>
        <hr />
        
        <Highlight>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Suscipitratione eaque illo minus cum, saepe totam vel nihil 
          repellat nemo explicabo excepturi consectetur.
        </Highlight>
        
        <PathParameters />
      </div>
    );
  }