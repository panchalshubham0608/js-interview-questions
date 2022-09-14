// Expensive function for large values of `n`
function fib(n) {
    if (n == 1) return 0;
    if (n == 2) return 1;
    else        return fib(n - 1) + fib(n - 2);
 }
  
 // Memoization using javascript closure!
 function memoizedFib(n){   
    var results = {};
    results[1] = 0;
    results[2] = 1;
    function fib(x) {
        if (x in results) {
            return results[x];
        } else {
            results[x] = fib(x - 1) + fib(x - 2);
            return results[x];
        }
    }
    return fib(n);
 }
  
 // console.log(fib(50)); // BAD (slow)
 console.log(memoizedFib(50)); // GOOD (fast)