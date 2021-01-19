"use strict";

var cliks = 0;

var buttonCountPlus = document.getElementById("buttonCountPlus");
var buttonCountMinus = document.getElementById("buttonCountMinus");
var countResult = document.getElementById("countResult");
var buttonReset = document.getElementById("buttonReset");

buttonReset.onclick = function () {
    cliks = 0;
    countResult.innerHTML = cliks;
};

buttonCountPlus.onclick = function () {
    cliks++;
    countResult.innerHTML = cliks;
};

buttonCountMinus.onclick = function () {
    cliks--;
    countResult.innerHTML = cliks;
};
