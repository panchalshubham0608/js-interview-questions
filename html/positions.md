## What is position property in CSS?
The position property is used to specify the position of HTML elements on the webpage.  
There are five different possible values that the position property can take:  
1. `position: static` - (default) statically posistioned element is not positioned in any special way and remains unaffected of top, left, bottom and right properties.  
2. `position: relative` - positioned relative to its normal position. Setting top, left, bottom or right will cause the element to shift from its normal position.  
3. `position: absolute` - positioned relative to the `nearest positioned ancestor` or body if no such ancestor exist.  
4. `position: fixed` - positioned relative to the viewport and always stays at the same place; even if the page is scrolled.  
5. `position: sticky` - positioned based on user's scroll position. It is positioned `relative` until offset position is met and then positioned `fixed`  



### Example
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
    <div class="static-div"></div>
  </div>

  <div class="wrapper">
    <div class="relative-div"></div>
  </div>

  <div class="wrapper">
    <div class="absolute-div"></div>
  </div>

  <div class="big-wrapper">
    <div class="wrapper">
      <div class="absolute-div"></div>
    </div>  
  </div>

  <div class="wrapper">
    <div class="fixed-div"></div>
  </div>

  <div class="sticky-div"></div>
  
</body>
</html>
```

```css
html, body {
    height: 200%;
}
.wrapper {
    border: 1px solid black;
    width: 100px;
    height: 100px;
  }

.static-div {
    width: 50px;
    height: 50px;
    background-color: red;

    /* static: (default) - not affected by the top, bottom, left, and right properties. */
    position: static;
    bottom: 10px;
    right: 10px;
}

.relative-div {
    width: 50px;
    height: 50px;
    background-color: green;

    /* relative: relative to its normal position. */
    position: relative;
    bottom: 10px;
    right: 10px;
}

.big-wrapper {
    border: 1px solid yellow;
    width: 200px;
    height: 200px;
    position: relative;
}

.absolute-div {
    width: 50px;
    height: 50px;
    background-color: blue;

    /* absolute: relative to the nearest positioned ancestor (instead of positioned relative to the viewport, like fixed). */
    /* if an absolute positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling */
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.fixed-div {
    width: 50px;
    height: 50px;
    background-color: yellow;

    /* fixed: positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. */
    position: fixed;
    bottom: 10px;
    left: 10px;
}

.sticky-div {
    width: 50px;
    height: 50px;
    background-color: purple;

    /* sticky: positioned based on the user's scroll position. */
    /* toggles between relative and fixed, depending on the scroll position */
    position: sticky;
    top: 10px;
}

```