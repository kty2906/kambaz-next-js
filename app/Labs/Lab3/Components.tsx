
import { ReactNode } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import MathUtils, { add, subtract, multiply as multiplyFn, divide } from "./Math";
import * as Matematica from "./Math";
import "./Classes.css";



export function VariablesAndConstants() {
  const functionScoped = 2;
  const blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  
  return (
    <div id="wd-variables-and-constants">
      <h4>Variables and Constants</h4>
      functionScoped = {functionScoped}<br/>
      blockScoped = {blockScoped}<br/>
      constant1 = {constant1}<hr/>
    </div>
  );
}

export function VariableTypes() {
  const numberVariable = 123;
  const floatingPointNumber = 234.345;
  const stringVariable = 'Hello World!';
  const booleanVariable = true;
  const isNumber = typeof numberVariable;
  const isString = typeof stringVariable;
  const isBoolean = typeof booleanVariable;
  
  return (
    <div id="wd-variable-types">
      <h4>Variables Types</h4>
      numberVariable = {numberVariable}<br/>
      floatingPointNumber = {floatingPointNumber}<br/>
      stringVariable = {stringVariable}<br/>
      booleanVariable = {booleanVariable + ""}<br/>
      isNumber = {isNumber}<br/>
      isString = {isString}<br/>
      isBoolean = {isBoolean}<hr/>
    </div>
  );
}

export function BooleanVariables() {
  const numberVariable = 123;
  const floatingPointNumber: number = 234.345;
  const true1 = true;
  const false1 = false;
  const false2 = true1 && false1;
  const true2 = true1 || false1;
  const true3 = !false2;
  const true4 = numberVariable === 123;
  const true5 = floatingPointNumber !== 321.432;
  const false3 = numberVariable < 100;
  
  return (
    <div id="wd-boolean-variables">
      <h4>Boolean Variables</h4>
      true1 = {true1 + ""} <br />
      false1 = {false1 + ""} <br />
      false2 = {false2 + ""} <br />
      true2 = {true2 + ""} <br />
      true3 = {true3 + ""} <br />
      true4 = {true4 + ""} <br />
      true5 = {true5 + ""} <br />
      false3 = {false3 + ""} <hr />
    </div>
  );
}

// ============ CONDITIONALS ============

export function IfElse() {
  let true1 = true;
  let false1 = false;
  
  return (
    <div id="wd-if-else">
      <h4>If Else</h4>
      {true1 && <p>true1</p>}
      {!false1 ? <p>!false1</p> : <p>false1</p>} <hr/>
    </div>
  );
}

export function TernaryOperator() {
  let loggedIn = true;
  
  return (
    <div id="wd-ternary-operator">
      <h4>Logged In</h4>
      {loggedIn ? <p>Welcome</p> : <p>Please login</p>} <hr/>
    </div>
  );
}

export function ConditionalOutputIfElse() {
  const loggedIn = true;
  
  if (loggedIn) {
    return <h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>;
  } else {
    return <h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>;
  }
}

export function ConditionalOutputInline() {
  const loggedIn = false;
  
  return (
    <div id="wd-conditional-output-inline">
      {loggedIn && <h2>Welcome Inline</h2>}
      {!loggedIn && <h2>Please login Inline</h2>}
    </div>
  );
}

// ============ FUNCTIONS ============

function legacyAdd(a: number, b: number) {
  return a + b;
}

export function LegacyFunctions() {
  const twoPlusFour = legacyAdd(2, 4);
  console.log(twoPlusFour);
  
  return (
    <div id="wd-legacy-functions">
      <h4>Functions</h4>
      <h5>Legacy ES5 functions</h5>
      twoPlusFour = {twoPlusFour} <br />
      add(2, 4) = {legacyAdd(2, 4)} <hr />
    </div>
  );
}

const arrowSubtract = (a: number, b: number) => {
  return a - b;
};

export function ArrowFunctions() {
  const threeMinusOne = arrowSubtract(3, 1);
  console.log(threeMinusOne);
  
  return (
    <div id="wd-arrow-functions">
      <h4>New ES6 arrow functions</h4>
      threeMinusOne = {threeMinusOne} <br />
      subtract(3, 1) = {arrowSubtract(3, 1)} <hr />
    </div>
  );
}

const multiply = (a: number, b: number): number => a * b;

export function ImpliedReturn() {
  const fourTimesFive = multiply(4, 5);
  console.log(fourTimesFive);

  return (
    <div id="wd-implied-return">
      <h4>Implied return</h4>
      fourTimesFive = {fourTimesFive} <br />
      multiply(4, 5) = {multiply(4, 5)}
      <hr />
    </div>
  );
}


export function TemplateLiterals() {
  const five = 2 + 3;
  const result1 = "2 + 3 = " + five;
  const result2 = `2 + 3 = ${2 + 3}`;
  const username = "alice";
  const greeting1 = `Welcome home ${username}`;
  const loggedIn = false;
  const greeting2 = `Logged in: ${loggedIn ? "Yes" : "No"}`;
  
  return (
    <div id="wd-template-literals">
      <h4>Template Literals</h4>
      result1 = {result1} <br />
      result2 = {result2} <br />
      greeting1 = {greeting1} <br />
      greeting2 = {greeting2} <hr />
    </div>
  );
}



export function SimpleArrays() {
  const functionScoped = 2;
  const blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];
  const htmlArray1 = [<li key="1">Buy milk</li>, <li key="2">Feed the pets</li>];
  const variableArray1 = [
    functionScoped,
    blockScoped,
    constant1,
    numberArray1,
    stringArray1
  ];
  
  return (
    <div id="wd-simple-arrays">
      <h4>Simple Arrays</h4>
      numberArray1 = {numberArray1} <br />
      stringArray1 = {stringArray1} <br />
      variableArray1 = {variableArray1} <br />
      Todo list:
      <ol>{htmlArray1}</ol>
      <hr />
    </div>
  );
}

export function ArrayIndexAndLength() {
  let numberArray1 = [1, 2, 3, 4, 5];
  const length1 = numberArray1.length;
  const index1 = numberArray1.indexOf(3);
  
  return (
    <div id="wd-array-index-and-length">
      <h4>Array index and length</h4>
      length1 = {length1} <br />
      index1 = {index1} <hr />
    </div>
  );
}

export function AddingAndRemovingToFromArrays() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];
  const todoArray = [<li key="1">Buy milk</li>, <li key="2">Feed the pets</li>];
  
  numberArray1.push(6);
  stringArray1.push("string3");
  todoArray.push(<li key="3">Walk the dogs</li>);
  
  numberArray1.splice(2, 1);
  stringArray1.splice(1, 1);
  
  return (
    <div id="wd-adding-removing-from-arrays">
      <h4>Add/remove to/from arrays</h4>
      numberArray1 = {numberArray1} <br />
      stringArray1 = {stringArray1} <br />
      Todo list:
      <ol>{todoArray}</ol><hr />
    </div>
  );
}

export function ForLoops() {
  const stringArray1 = ["string1", "string3"];
  const stringArray2 = [];
  
  for (let i = 0; i < stringArray1.length; i++) {
    const string1 = stringArray1[i];
    stringArray2.push(string1.toUpperCase());
  }
  
  return (
    <div id="wd-for-loops">
      <h4>Looping through arrays</h4>
      stringArray2 = {stringArray2} <hr />
    </div>
  );
}

export function MapFunction() {
  let numberArray1 = [1, 2, 3, 4, 5, 6];
  const square = (a: number) => a * a;
  const todos = ["Buy milk", "Feed the pets"];
  const squares = numberArray1.map(square);
  const cubes = numberArray1.map((a) => a * a * a);
  
  return (
    <div id="wd-map-function">
      <h4>Map Function</h4>
      squares = {squares} <br />
      cubes = {cubes} <br />
      Todos:
      <ol>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ol> <hr/>
    </div>
  );
}

export function FindFunction() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2", "string3"];
  const four = numberArray1.find((a) => a === 4);
  const string3 = stringArray1.find((a) => a === "string3");
  
  return (
    <div id="wd-find-function">
      <h4>Find Function</h4>
      four = {four} <br />
      string3 = {string3} <hr />
    </div>
  );
}

export function FindIndex() {
  const numberArray1 = [1, 2, 4, 5, 6];
  const stringArray1 = ['string1', 'string3'];
  const fourIndex = numberArray1.findIndex(a => a === 4);
  const string3Index = stringArray1.findIndex(a => a === 'string3');
  
  return (
    <div id="wd-find-index">
      <h4>FindIndex function</h4>
      fourIndex = {fourIndex} <br />
      string3Index = {string3Index} <hr />
    </div>
  );
}

export function FilterFunction() {
  const numberArray1 = [1, 2, 4, 5, 6];
  const numbersGreaterThan2 = numberArray1.filter((a) => a > 2);
  const evenNumbers = numberArray1.filter((a) => a % 2 === 0);
  const oddNumbers = numberArray1.filter((a) => a % 2 !== 0);
  
  return (
    <div id="wd-filter-function">
      <h4>Filter Function</h4>
      numbersGreaterThan2 = {numbersGreaterThan2} <br />
      evenNumbers = {evenNumbers} <br />
      oddNumbers = {oddNumbers} <hr />
    </div>
  );
}

// ============ JSON ============

export function JsonStringify() {
  const squares = [1, 4, 16, 25, 36];
  
  return (
    <div className="wd-json-stringify">
      <h3>JSON Stringify</h3>
      squares = {JSON.stringify(squares)}
      <hr />
    </div>
  );
}

export function House() {
  const house = {
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2000,
    address: {
      street: "Via Roma",
      city: "Roma",
      state: "RM",
      zip: "00100",
      country: "Italy",
    },
    owners: ["Alice", "Bob"],
  };
  
  console.log(house);
  
  return (
    <div id="wd-house">
      <h4>House</h4>
      <h5>bedrooms</h5> {house.bedrooms}
      <h5>bathrooms</h5> {house.bathrooms}
      <h5>Data</h5>
      <pre>{JSON.stringify(house, null, 2)}</pre>
      <hr />
    </div>
  );
}

// ============ SPREAD & DESTRUCTURING ============

export function Spreading() {
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5, 6];
  const obj1 = { a: 1, b: 2, c: 3 };
  const obj2 = { ...obj1, d: 4, e: 5, f: 6 };
  const obj3 = { ...obj1, b: 4 };
  
  return (
    <div id="wd-spreading">
      <h2>Spread Operator</h2>
      <h3>Array Spread</h3>
      arr1 = {JSON.stringify(arr1)} <br />
      arr2 = {JSON.stringify(arr2)} <br />
      <h3>Object Spread</h3>
      {JSON.stringify(obj1)} <br />
      {JSON.stringify(obj2)} <br />
      {JSON.stringify(obj3)} <br /> <hr />
    </div>
  );
}

export function Destructing() {
  const person = { name: "John", age: 25 };
  const { name, age } = person;
  const numbers = ["one", "two", "three"];
  const [first, second, third] = numbers;
  
  return (
    <div id="wd-destructing">
      <h2>Destructing</h2>
  
      <h3>Object Destructing</h3>
      const &#123; name, age &#125; = &#123; name: &quot;John&quot;, age: 25 &#125;
      <br />
      <br />
      name = {name}
      <br />
      age = {age}
  
      <h3>Array Destructing</h3>
      const [first, second, third] = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;]
      <br />
      <br />
      first = {first}
      <br />
      second = {second}
      <br />
      third = {third}
      <hr />
    </div>
  );
}
export function FunctionDestructing() {
  const add = (a: number, b: number) => a + b;
  const sum = add(1, 2);
  const subtract = ({ a, b }: { a: number; b: number }) => a - b;
  const difference = subtract({ a: 4, b: 2 });
  
  return (
    <div id="wd-function-destructing">
      <h2>Function Destructing</h2>
      const add = (a, b) =&gt; a + b;<br />
      const sum = add(1, 2);<br />
      const subtract = (&#123; a, b &#125;) =&gt; a - b;<br />
      const difference = subtract(&#123; a: 4, b: 2 &#125;);<br/>
      sum = {sum}<br />
      difference = {difference} <hr />
    </div>
  );
}

export function DestructingImports() {
    return (
      <div id="wd-destructuring-imports">
        <h2>Destructuring Imports</h2>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>MathUtils</th>
              <th>Matematica</th>
              <th>Functions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MathUtils.add(2, 3) = {MathUtils.add(2, 3)}</td>
              <td>Matematica.add(2, 3) = {Matematica.add(2, 3)}</td>
              <td>add(2, 3) = {add(2, 3)}</td>
            </tr>
            <tr>
              <td>MathUtils.subtract(5, 1) = {MathUtils.subtract(5, 1)}</td>
              <td>Matematica.subtract(5, 1) = {Matematica.subtract(5, 1)}</td>
              <td>subtract(5, 1) = {subtract(5, 1)}</td>
            </tr>
            <tr>
              <td>MathUtils.multiply(3, 4) = {MathUtils.multiply(3, 4)}</td>
              <td>Matematica.multiply(3, 4) = {Matematica.multiply(3, 4)}</td>
              <td>multiply(3, 4) = {multiply(3, 4)}</td>
            </tr>
            <tr>
              <td>MathUtils.divide(8, 2) = {MathUtils.divide(8, 2)}</td>
              <td>Matematica.divide(8, 2) = {Matematica.divide(8, 2)}</td>
              <td>divide(8, 2) = {divide(8, 2)}</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
    );
  }

// ============ STYLING ============

export function Classes() {
  const color = 'blue';
  const dangerous = true;
  
  return (
    <div id="wd-classes">
      <h2>Classes</h2>
      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>
      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background
      </div>
      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background
      </div>
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>
      <div className={`${dangerous ? 'wd-bg-red' : 'wd-bg-green'} wd-fg-black wd-padding-10px`}>
        Dangerous background
      </div>
      <hr/>
    </div>
  );
}

export function Styles() {
  const colorBlack = { color: "black" };
  const padding10px = { padding: "10px" };
  const bgBlue = {
    backgroundColor: "lightblue",
    color: "black",
    ...padding10px
  };
  const bgRed = {
    backgroundColor: "lightcoral",
    ...colorBlack,
    ...padding10px
  };
  
  return (
    <div id="wd-styles">
      <h2>Styles</h2>
      <div style={{backgroundColor: "lightyellow", color: "black", padding: "10px"}}>
        Yellow background
      </div>
      <div style={bgRed}>Red background</div>
      <div style={bgBlue}>Blue background</div>
      <hr />
    </div>
  );
}

// ============ PARAMETERIZATION ============

export function Add({ a, b }: { a: number; b: number }) {
  return (
    <div id="wd-add">
      <h4>Add</h4>
      a = {a}<br />
      b = {b}<br />
      a + b = {a + b} <hr />
    </div>
  );
}

export function Square({ children }: { children: ReactNode }) {
  const num = Number(children);
  return <span id="wd-square">{num * num}</span>;
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span id="wd-highlight" style={{ backgroundColor: "yellow", color: "red" }}>
      {children}
    </span>
  );
}

export function PathParameters() {
  return (
    <div id="wd-path-parameters">
      <h2>Path Parameters</h2>
      <Link href="/Labs/Lab3/add/1/2">1 + 2</Link> <br />
      <Link href="/Labs/Lab3/add/3/4">3 + 4</Link>
    </div>
  );
}