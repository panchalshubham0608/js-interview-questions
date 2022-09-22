### Write HTML code for creating a drop file component


```html
  <div 
    ondrop="handleOnDrop(event)" 
    ondragenter="handleOnDragEnter(event)"
    ondragleave="handleOnDragLeave(event)"
    ondragover="handleOnDragOver(event)"
    class="drop-container">
    <div id="feedback">Drop your file here</div>
  </div>
  <hr/>
  <div class="text-center">
    <input 
      onchange="handleOnChange(event)"
      type="file" id="fileInput"/>
  </div>

  <textarea id="fileContentViewer" readonly>Select a file to preview</textarea>
```


```css
* {
    box-sizing: border-box !important;
}

.drop-container {
    height: 100px;
    padding: 10px;
    border: 1px solid black;
    background-color: #ededed;
    margin: 20px;
    text-align: center;
}

.text-center {
    text-align: center;
}

#fileContentViewer{
    width: 100%;
    height: 200px;
    margin-top: 20px;
    resize: none;
}
```


```js
    let fileInput = document.getElementById('fileInput');
    let previewInput = document.getElementById('fileContentViewer');
    function handleOnDrop(event) {
      event.preventDefault();
      fileInput.files = event.dataTransfer.files;
      previewFile(fileInput.files[0]);
    }
    function handleOnDragEnter(event) {
      event.preventDefault();
    }
    function handleOnDragLeave(event) {
      event.preventDefault();
    }
    function handleOnDragOver(event) {
      event.preventDefault();
    }

    function previewFile(file) {
      let reader = new FileReader();
      reader.onload = function(event) {
        previewInput.value = event.target.result;        
      }
      reader.onerror = function(event) {
        console.log('error occurred while reading file');
      }
      reader.readAsText(file);
    }

    function handleOnChange(event) {
      console.log('changed');
      previewFile(event.target.files[0]);
    }
```