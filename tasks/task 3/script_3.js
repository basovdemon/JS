"use strict";

let getPostsForUser = async function getData(country) {
    let response = await fetch("https://api.covid19api.com/country/" + country);
    return await response.json();
};

function withMemo(bar) {
    let funcCache = {};

    return async function () {
        let funcArgs = JSON.stringify(arguments);
        funcCache[funcArgs] = funcCache[funcArgs] || bar.apply(this, arguments);
        return funcCache[funcArgs];
    };
}

async function f() {
    const getPostsForUser_memo = withMemo(getPostsForUser);

    let data1 = await getPostsForUser_memo("belarus"); // запрос уходит на бэкенд
    let data2 = await getPostsForUser_memo("belarus"); // результат возвращается моментально из кэша

    console.log(data1);
    console.log(data2);
}

f();
