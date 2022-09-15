# useState hook
Returns a stateful value, and a function to update it.
```javascript
const [state, setState] = useState(initialValue)
```

### Interesting facts about useState hook
- React guarantees that setState function identity is stable and won’t change on re-renders and therefore we can safely omit it in the useEffect and useCallback dependency list
- If your update function returns the exact same value as the current state, the subsequent rerender will be skipped completely (referential equality using Object.is( ))
```javascript
const [state, setState] = useState(0);
setState(0); // does not trigger re-render

const [state, setState] = useState({});
setState({}); // triggers re-render (reference has changed)
```
- useState does not automatically merge update objects
```javascript
const [state, setState] = useState({x: 1})
console.log(state) // {x: 1}
setState({y: 2})
console.log(state) // {y: 2} 
```
- You can pass a callback to useState for lazy initialization which will be called on initial render only (if you directly call the expensive function in useState it will be called on every re-render)
```javascript
// Bad: expensiveFunction will be called on every re-render even when its value is disregarded
// const [state, setState] = useState(expensiveFunction())

// Good: expensiveFunction will be called on only initial render when you pass it as a callback (lazy initialization)
const [state, setState] = useState(expensiveFunction)
```
- React may group several state updates into a single re-render to improve performance.
```javascript
// all state updates are batched together
// and therefore triggers only one re-render
const handleOnClick = () => {
    setState1(oldState => oldState + 1);
    setState2(oldState => oldState + 1);
    setState3(oldState => oldState + 1);
    setState4(oldState => oldState + 1);
    setState5(oldState => oldState + 1);
};
```
