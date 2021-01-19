"use strict";

getPostsForUser = async () => 77;

async function withMemo(fun) {
    let cache = {};

    return async function () {
        let args = JSON.stringify(arguments);
        cache[args] = cache[args] || fun.apply(this, arguments);
        return cache[args];
    };
}

const getPostsForUser_memo = getPostsForUser(getCovidState);

const data1 = getPostsForUser_memo(); // запрос уходит на бэкенд
const data2 = getPostsForUser_memo(); // результат возвращается моментально из кэша
