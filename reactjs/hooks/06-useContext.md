# Context
Context provides a way to pass data through the component tree without having to pass props down manually at every level.  
Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

```javascript
// Create a global context
MyContext = React.createContext(defaultValue)

// Child under <MyContext.Provider> can use the context with `useContext`
const value = useContext(MyContext);
```

```javascript
// imports
import React, { useContext, useState } from 'react';

// the context of the application
const ThemeContext = React.createContext(null);


// With useContext( ) we got the values
// from App instead of receiving it with props via intermediate component
function ThemedButton(props) {
  let globalValue = useContext(ThemeContext);
  let btnStyle = {
    backgroundColor: globalValue.isDarkTheme ? 'white' : 'black',
    color: globalValue.isDarkTheme ? 'black' : 'white'
  }
  return (
    <button style={btnStyle}>{props.text}</button>
  )
}

function ThemedToolbar() {
  return (
    <div>
      <ThemedButton text="Button1" />
      <ThemedButton text="Button2" />
    </div>
  )
}


function App() {  

  // the global variables for the application
  const [globalValue, setGlobalValue] = useState({
    isDarkTheme: true,
  });

  return (
    <div>
      <ThemeContext.Provider value={globalValue}>
        <ThemedToolbar />
        <ThemedToolbar />
        <button onClick={() => setGlobalValue(oldValue => {
          return {
            ...oldValue,
            isDarkTheme: !oldValue.isDarkTheme
          }
        })}>Change Theme</button>
      </ThemeContext.Provider>
    </div>
  )
}


export default App;
```

### Things to note
- The current context value is determined by the value prop of the nearest `<MyContext.Provider>` above the calling component in the tree.
- A component calling `useContext` will always re-render when the context value changes.
- If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context (instead of passing props through tree pass the child itself which needs the props)
```javascript
// An example which shows the props being passed via tree
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... which renders ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... which renders ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>



// An example which fixes the issue using composition
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Now, we have:
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```