### What are the possible ways to center a div horizontally and vertically?  



### Solution 1
Use the position property

```html
<div id="#myDiv"></div>
```

```css
#myDiv {
    background-color: red;
    width: 200px;
    height: 200px;   
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
}
```


### Solution 2
Without using the position property
```html
<div id="wrapper">
    <div id="main">
        <div id="myDiv"></div>
    </div>
</div>
```

```css
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

#wrapper {
    width: 100%;
    height: 100%;
    display: table;
}

#main {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

#myDiv {
    background-color: red;
    width: 100px;
    height: 100px;
    margin: auto;
}
```