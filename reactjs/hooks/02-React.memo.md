## What is React.memo used for in React?

React.memo is a high order component which takes a functional component and returns a memoized (optimized) component. This is useful to prevent a component from re-rendering when its props are not changed.

```javascript
// imports
import React, {useState} from "react";
 
// A simple child component for demonstration purposes
// React.memo prevents child component from re-rendering
// when parent component re-render given that the props are unchanged
const Child = React.memo((props) => {
 console.log('Child component is rendering');
 return (
     <div>
         <h1>Hello, {props.name}</h1>
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
 
 return (
   <div className="App">
     <h1>Count: {count}</h1>
     <button onClick={onClick}>Increment</button>
 
     {/* props for Child component never changes */}
     <Child name="username" />
   </div>
 );
 
};
 
export default App;

```
