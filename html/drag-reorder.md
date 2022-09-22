### Write an HTML component where you can drag and re-order list items

```html
  <div class="container">
    <div class="list-container">
      <div class="list-item" data-index="1">
        <div class="list-item-content" >Item 1</div>
      </div>
      <div class="list-item" data-index="2">
        <div class="list-item-content" >Item 2</div>
      </div>
      <div class="list-item" data-index="3">
        <div class="list-item-content" >Item 3</div>
      </div>
      <div class="list-item" data-index="4">
        <div class="list-item-content" >Item 4</div>
      </div>
    </div>
  </div>
```

```css
.reorder-list {
    padding: 10px;
}

.list-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    background-color: white;
}
```


```js
let listContainer = document.querySelector('.list-container');
let listItems = Array.from(document.querySelectorAll('.list-item'));

let elementDragged = null;
let elementDraggedOver = null;

function onDragStart(event) {
    elementDragged = event.target;
}

function onDragOver(event) {
    // event.preventDefault();
    // elementDraggedOver = event.target;

    // let indexDragged = listItems.indexOf(elementDragged);
    // let indexDraggedOver = listItems.indexOf(elementDraggedOver);

    // if (indexDragged > indexDraggedOver) {
    //     if (elementDraggedOver.parentNode === elementDragged.parentNode) {
    //         listContainer.insertBefore(elementDragged, elementDraggedOver);        
    //     }
    // } else {
    //     if (elementDraggedOver.parentNode === elementDragged.parentNode) {
    //         listContainer.insertBefore(elementDragged, elementDraggedOver.nextElementSibling);
    //     }
    // }

    // listItems = Array.from(document.querySelectorAll('.list-item'));

    // Optimized
    event.preventDefault();
    elementDraggedOver = event.target;

    let indexDragged = elementDragged.getAttribute('data-index');
    let indexDraggedOver = elementDraggedOver.getAttribute('data-index');

    if (indexDragged && indexDraggedOver) {
        if (indexDragged > indexDraggedOver) {
            if (elementDraggedOver.parentNode === elementDragged.parentNode) {
                listContainer.insertBefore(elementDragged, elementDraggedOver);
            }
        } else {
            if (elementDraggedOver.parentNode === elementDragged.parentNode) {
                listContainer.insertBefore(elementDragged, elementDraggedOver.nextElementSibling);
            }
        }
    
        elementDragged.setAttribute('data-index', indexDraggedOver);
        elementDraggedOver.setAttribute('data-index', indexDragged);    
    }
}

function onDragRelease(event) {
    elementDragged = null;
    elementDraggedOver = null;
}

// Add event listeners to each list item
listItems.forEach((item) => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragover', onDragOver);
    item.addEventListener('dragend', onDragRelease);
    item.setAttribute('draggable', true);
});
```