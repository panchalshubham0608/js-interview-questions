### In how many ways you can display HTML elements?  
The following are the common ways to display HTML elements:  
- `display: inline` - inline elements does not start in newline and only take as much space as required and are not affected by height or width properties
- `display: inline-block` - same as inline except that they are affected by the height and width properties
- `display: block` - block elements start in newline and take as much space as possible and are affected by width and height property
- `display: none` - none elements are not displayed and they do not take space
- `visibility: hidden` - hidden elements are not displayed but they take space
- `display: flex` - flex elements are displayed in a flexbox with block wrapper
- `display: inline-flex` - inline-flex elements are displayed in a flexbox with inline wrapper  


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="wrapper">
    <div class="d-inline border">This is a display:inline element</div>
    <div class="d-inline border">This is a display:inline element</div>
  </div>
  <div class="wrapper">
    <div class="d-inline-block border">This is a display:inline-block element</div>
    <div class="d-inline-block border">This is a display:inline-block element</div>
  </div>

  <div class="wrapper">
    <div class="d-block border">This is a display:block element</div>
    <div class="d-block border">This is a display:block element</div>
  </div>

  <div class="wrapper">
    <div class="d-none border">This is a display:none element</div>
    <div class="d-none border">This is a display:none element</div>
  </div>

  <div class="wrapper">
    <div class="visibility-hidden border">This is a visibility-hidden element</div>
    <div class="visibility-hidden border">This is a visibility-hidden element</div>
  </div>

  <div class="wrapper">
    <div class="d-flex border">
      <div class="border w-200">Item1</div>
      <div class="border w-200">Item2</div>
      <div class="border w-200">Item3</div>
      <div class="border w-200">Item4</div>
      <div class="border w-200">Item5</div>
      <div class="border w-200">Item6</div>
    </div>
    <div class="d-flex border">This is a display: flex element</div>
  </div>  

  <div class="wrapper">
    <div class="d-flex-inline border">
      <div class="border w-200">Item1</div>
      <div class="border w-200">Item2</div>
    </div>
  </div>

  <div class="wrapper">
    <div class="d-grid border">
      <div class="border w-200">Item1</div>
      <div class="border w-200">Item2</div>
      <div class="border w-200">Item3</div>
      <div class="border w-200">Item4</div>
      <div class="border w-200">Item5</div>
    </div>
  </div>

</body>
</html>
```

```css
.wrapper {
    border: 1px solid black;
    padding: 10px;
    margin: 10px auto;
}

.border {
    border: 1px solid green;
}

.w-200 {
    width: 200px;
}

.d-inline{
    /* inline elements does not start in newline and only take as much space as required */
    display: inline;
    /* the height and width properties do not affect inline */
    width: 200px;
    height: 50px;
}

.d-inline-block {
    /* inline-block elements also does not start in newline and only take as much space as required */
    display: inline-block;
    /* the height and width properties do affect inline-block */
    width: 200px;
    height: 50px;
}

.d-block {
    /* block elements start in newline and take as much space as possible */
    display: block;
    /* the height and width properties do affect block */
    height: 50px;
}

.d-none {
    /* none elements are not displayed and they do not take space */
    display: none;    
}

.visibility-hidden {
    /* hidden elements are not displayed but they take space */
    visibility: hidden;
}

.d-flex {
    /* flex elements are displayed in a flexbox with block wrapper */
    display: flex;
}

.d-flex-inline {
    /* inline-flex elements are displayed in a flexbox with inline wrapper */
    display: inline-flex;
    flex-wrap: wrap;
}

.d-grid {
    /* grid elements are displayed in a grid with block wrapper */
    display: grid;

    /* grid-template-columns: 1fr 1fr 1fr; */
    /* grid-template-rows: 1fr 1fr 1fr; */
    /* grid-template-areas: "header header header" "main main main" "footer footer footer"; */

    grid-template-columns: 1fr 1fr 1fr;
}
```