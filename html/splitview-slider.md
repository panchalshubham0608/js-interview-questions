### Write an HTML template with splitview which supports horizontal and vertical scroll

```html
  <div id="container">
    <div class="top">
      <div class="left">Left</div>
      <div class="hresizer" id="hresizer" data-direction="horizontal"></div>
      <div class="right">Right</div>
    </div>
    <div class="vresizer" id="vresizer" data-direction="vertical"></div>
    <div class="bottom">Bottom</div>
  </div>
```

```css
* {
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: 0;
}

#container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.top {
    min-height: 200px;
}
.bottom {
    flex: 1;
}


.top {
    display: flex;
}

.bottom {
    border: 1px solid #ededed;
}

.hresizer {
    width: 2px;
    background-color: #ededed;
    cursor: col-resize;    
}
.vresizer {
    height: 2px;
    background-color: #ededed;
    cursor: row-resize;
}

.left, .right {
    border: 1px solid #ededed;
    border-collapse: collapse;
    padding: 10px;
}
.left {
    width: 30%;
}
.right {
    flex: 1;
}
```


```js

let x = 0;
let y = 0;
let leftWidth = 0;
let topHeight = 0;
let resizer = null;

function onMouseDown(event) {
    resizer = event.target;

    let direction = resizer.getAttribute('data-direction');
    x = event.clientX;
    y = event.clientY;

    if (direction === 'horizontal') {
        leftWidth = resizer.previousElementSibling.getBoundingClientRect().width;
    } else {
        topHeight = resizer.previousElementSibling.getBoundingClientRect().height;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(event) {

    let direction = resizer.getAttribute('data-direction');
    const dx = event.clientX - x;
    const dy = event.clientY - y;

    if (direction === 'horizontal') {
        let newLeftWidth = ((leftWidth + dx)*100) / resizer.parentNode.getBoundingClientRect().width;
        resizer.previousElementSibling.style.width = newLeftWidth + '%';
    } else {
        let newTopHeight = ((topHeight + dy)*100) / resizer.parentNode.getBoundingClientRect().height;
        resizer.previousElementSibling.style.height = newTopHeight + '%';
    }
}

function onMouseUp(event) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

document.getElementById('hresizer').addEventListener('mousedown', onMouseDown);
document.getElementById('vresizer').addEventListener('mousedown', onMouseDown);
```