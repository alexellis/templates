// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const getStdin = require('get-stdin');
const handler = require('./function/handler');

const isArray = (a) => {
    return (!!a) && (a.constructor === Array);
};

const isObject = (a) => {
    return (!!a) && (a.constructor === Object);
};

// main executes a Serverless request. The result is always written
// to stderr or stdout. To indicate a non-200 (i.e. 500) status then
// call `process.exit()` with a non-zero code. To indicate a 200 code
// then allow the program to exit normally or call `process.exit(0)`.
async function main() {
    let stdInput;
    try {
        stdInput = await getStdin()
    } catch (e) {
        console.error(e, e.Stack);
        return process.exit(1);
    }

    try {
        const res = await handler(stdInput);
        if(res) {
            const stringify = isArray(res) || isObject(res);

            if(stringify) {
                process.stdout.write(`${JSON.stringify(res)}\n`);
            } else {
                process.stdout.write(res);
            }
        }
    } catch(e) {
        console.error(e, e.Stack);
        return process.exit(1);
    }
}

main();
