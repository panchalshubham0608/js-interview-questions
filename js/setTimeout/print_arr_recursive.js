// Recursive function to print an array
// Bad function: will cause stack overflow for large arrays
function printArr(arr, startIndex) {
    if (startIndex >= arr.length)   return;
    console.log(arr[startIndex]);
    printArr(arr, startIndex + 1);
 }
  
 // Good function: will not cause stack overflow for large arrays
 // Instead of directly calling itself and pusing it to the call stack,
 // we will push the recursive call to the event loop (callback queue) using setTimeout,
 // so that the call stack can be cleared before the recursive call is executed
 // The event loop will execute the recursive call after the call stack is cleared
 function printArrOptimized(arr, startIndex) {
    if (startIndex >= arr.length)   return;
    console.log(arr[startIndex]);
    setTimeout(() => {
        printArrOptimized(arr, startIndex + 1);
    }, 0);
 }
  
 let arr = new Array(50000);
 arr.fill(0);
 // printArr(arr, 0); // will cause stack overflow
 printArrOptimized(arr, 0); // will not cause stack overflow
 