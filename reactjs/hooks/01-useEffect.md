# useEffect hook
useEffect hook is for side-effects (calculations that do not target output value for example update title of document)
```javascript
useEffect(callback, [dependencies]);
```

```javascript
// This is a side-effect (calculations that do not target output)
// and it should only be done when title changes
// document.title = title;

useEffect(()=>{
    document.title = title;
}, [title]);
```

#### A practical example of useEffect
```javascript
import React, { useEffect, useState } from 'react';

function App(){

  const [pageNumber, setPageNumber] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState([]);

  // we should fetch the data only when pageNumber changes
  useEffect(()=>{
    (async function(){
      let resp = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      let jsonResp = await resp.json();
      let limit = 10;
      let start = (pageNumber - 1) * limit;
      let slice = jsonResp.slice(start, start + limit);
      setData(slice);
    })();
  }, [pageNumber]);

  return (
    <div>
      <label>PageNumber: </label>
      <input type="number" value={userInput} onChange={event => setUserInput(event.target.value)} />
      <button onClick={event => setPageNumber(parseInt(userInput))}>Apply</button>

      <hr/>
      <h1>Records on Page {pageNumber}:</h1>
      {data.map(d => <p key={d.id}>{JSON.stringify(d)}</p>)}
      <p>Total {data.length} record(s)</p>
    </div>
  )
}

export default App;
```

### Interesting facts about useEffect hook
- If no dependency is provided then side-effect function runs on every re-render
```javascript
// Runs on every re-render
useEffect(function(){...});
```
- If an empty array is provided as dependency then side-effect function runs _once_ on the initial render
```javascript
// Run only during initial render
useEffect(function(){...}, [])
```
- If dependencies are provided then the side-effect function runs when one or more dependencies changes (referential equality based on Object.is( ))
```javascript
// In this case the side-effect function does not run because state does not change
const [state, setState] = useState(0);
useEffect(function(){...}, [state])
setState(state);

// In this case the side-effect function runs because the reference has changed even though the value is same
const [state, setState] = useState({});
useEffect(function(){...}, [state])
setState({});
```
- `useEffect(..., [])` is equivalent to `componentDidMount`
- `useEffect(..., [props, state])` is equivalent to `componentDidUpdate`
- Using the dependencies argument you can control when to invoke the side-effect; indenpendently from the rendering cycles of the component and that's the essence of useEffect hook.
- Side-effect function in useEffect can return a cleanup function which is used to cleanup the previous effect before executing the next effect and after the unmounting of the component. Example close socket, clear timer, etc.
```javascript
useEffect(()=>{
    // side-effect
    let timeout = setTimeout(() => {
        console.log(message);
    }, 1000);

    // cleanup function
    return () => {
        clearTimeout(timeout);
    }
}, [message]);
```