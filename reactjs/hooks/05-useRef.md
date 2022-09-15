# useRef hook
`useRef` hook lets us create mutable variables inside functional components similar to instance variables in class based components. As we know modifying instance variable of a class-based component does not cause re-render, similarly modifying mutable variables created with useRef inside functional component does not cause re-render.

### Refs can be used to access DOM nodes
```javascript
import React, { useRef, useState } from 'react';

function App(){

  // Access DOM nodes using ref
  const textInputRef = useRef();
  const focusInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }

  return (
    <div>
      <input type="text" ref={textInputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}

export default App;
```

### Refs can be used to create mutable local variable which preserve value between re-render and does not-cause re-render
```javascript
import React, { useRef, useState } from 'react';

function App(){
  
  // used to trigger re-render
  const [count, setCount] = useState(100);

  // `intervalRef` is a mutable variable for this functional component
  // we can change `intervalRef.current` and that will not cause re-render
  // instead if this was a state variable then setIntervalId(...)
  // would have cause a re-render
  const intervalRef = useRef();

  const startCountDown = () => {
    let interval = setInterval(()=>{
      setCount(count => count - 1);
    }, 1000);

    // variable is mutable and this will not cause re-render
    intervalRef.current = interval;
  };

  const stopCountDown = () => {
    // variable can preserve value between re-renders
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div>
      <h1>CountDown: {count}</h1>
      <button onClick={startCountDown}>Start</button>
      <button onClick={stopCountDown}>Stop</button>
    </div>
  )
}

export default App;
```

### Interesting facts about `useRef` hook
- The mutable variables created with `useRef` inside a functional component persist for full lifetime of the component.
- The mutable variables does not cause re-render when modified.
- Avoid setting refs during re-rendering; modify refs in event handlers and effects.
- If you create a ref using `createRef` in a functional component, React will create a new instance of the ref on every re-render instead of keeping it between renders.