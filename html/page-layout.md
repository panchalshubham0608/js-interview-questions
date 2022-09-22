### Arrange header, main and footer on page
```html
<header>
</header>  
<main>
    <h1>This is a header</h1>
</main>
<footer>
</footer>
```

```css
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    display: flex;
    flex-direction: column;
}

header, footer {
    flex: none;
}

header {
    background-color: aliceblue;
    color: #fff;
    height: 100px;
    text-align: center;
    width: 100%;
}
footer {
    background-color: aliceblue;
    color: #fff;
    width: 100%;
    height: 100px;
    text-align: center;
}

main {
    flex: auto;
    background-color: antiquewhite;
}
```