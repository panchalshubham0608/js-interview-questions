## What is the use of useCallback hook in React?
Short Answer:
It’s used to create memoized callbacks which change only when one of the dependencies changes. This is useful to prevent a child component from unnecessary re-rendering based on `referential equality`.

Long Answer:
When a component re-renders, every function inside of the component is recreated and therefore these function’s reference changes. And now if they are passed to the child component as props, the child component will re-render because its props have changed.
With useCallback we get a memoized instance of the callback that only changes when one of the dependencies has changed. This means that instead of re-creating the function on every re-render we can use the same function object.

```javascript
// imports
import React, { useCallback, useState } from "react";

// A simple child component for demonstration purposes
const Child = React.memo((props) => {
  console.log('Child component is rendering');
  return (
    <div>
      <button onClick={props.greet}>Greet me!</button>
    </div>
  );
})


// The parent component
function App() {

  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  // when the button is clicked we increment the counter
  const onClick = () => {
    setCount(count => count + 1);
  };

  // This function is re-created on every render
  // and therefore reference of this function is different every time
  // now when we pass this function to Child component
  // it will be treated as a new prop and Child component will be re-rendered
  //  const greet = () => {
  //    alert('Hello, world!');
  //  };

  // The same function is re-used every time and hence
  // the props for Child component never changes
  // and so it will not be re-rendered while parent component re-renders
  const greet = useCallback(()=>{
    alert('Hello, world!');
  }, []);

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={onClick}>Increment</button>
      <Child greet={greet} />
    </div>
  );

};

export default App;
```
