"use strict";

afterTimeout(1101).then(() => console.log("it's lunch time!!!"));

function afterTimeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
