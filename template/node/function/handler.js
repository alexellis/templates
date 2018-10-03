"use strict"

// Handler: handles a Serverless OpenFaaS request and must implement
// the `async` keyword.
//
// context: contains the raw input
// return: result of function
//
// Use `throw new Error()` for error handling
module.exports = async function Handler(context) {
    if (!context) throw new Error(`You must provide a value.`);

    return {"status": "ok"}
}
