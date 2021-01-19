"use strict";

function memoize(fn) {
    var cache = {};
    return function () {
        var key = JSON.stringify(arguments);
        if (cache[key]) {
            console.log("cache used");
            return cache[key];
        } else {
            var value = fn.apply(this, arguments);
            cache[key] = value;
            console.log("cache not used");
            return value;
        }
    };
}

var fibonacciMemoized = memoize(function (n) {
    //1,1,2,3,5,8,13,21,34
    if (i <= 2) return 1;

    var fib = [0, 1, 1];
    for (var i = 3; i <= n; i++) {
        fib[i] = fibonacciMemoized(i - 2) + fibonacciMemoized(i - 1);
    }

    return fib[n];
});

console.log(fibonacciMemoized(7));

console.log(fibonacciMemoized(9));
