# useMemo hook
Short Answer:
It’s used to create memoized value from expensive calculations which is recalculated only when one of the dependencies changes. This is useful to prevent expensive calculations on every re-render.

Long Answer:
Suppose we have an expensive calculation function which is invoked to display the result of some calculation. Now this expensive calculation function is invoked on every re-render which degrades the performance. With the help of useMemo hook we can memoize the result of this calculation and control the expensive calculation function such that it's invoked only when one of its dependencies changes.

```javascript
import React, { useMemo, useState } from 'react';

function App(){

  // used to trigger parent-component re-rendering
  const [count, setCount] = useState(0);
  // used to do expensive operation when changes
  const [value, setValue] = useState(0);


  // performs some expensive calculations
  const expensiveCalculation = (input) => {
    // assume here we have some expensive operation
    console.log('doing expensive calculation...');
    return input * 10;
  }

  // in this scenario we see that expensiveCalculation
  // is naively invoked on every re-render
  // which will cause expensive calculations to run on every re-render
  // const result = expensiveCalculation(value);

  // in this scenario we have memoized the value on initial render
  // and now the expensive calculation will be performed only 
  // when the dependency changes
  const result = useMemo(() => {
    return expensiveCalculation(value);
  }, [value]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={event => setCount(count => count + 1)}>Increment</button>
      <hr />
      <label>Change value for expensive operation</label>
      <input type="number" value={value} onChange={event => setValue(event.target.value)} />
      <hr/>
      <p>Result of expensive operation: {result}</p>
    </div>
  )
}

export default App;
```