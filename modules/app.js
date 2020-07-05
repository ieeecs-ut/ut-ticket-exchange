/* MODULE – APPLICATION */
// main application logic

/* IMPORTS */
var m = null;
const fs = require("fs");
const path = require("path");
const utils = require("./utils");

/* LOGS */
var log = null;
var err = null;

/* DATA */
/*
    TODO: declare application-related variables (ie. states, data fields)
*/

/* MODULE */
var app; app = {
    id: null,
    init: id => {
        app.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");

        /*
            TODO: initialize module variables and anything else needed by the application
        */

    },
    main: _ => {
        log("ready");
    },
    api: {
        /*
            TODO: create functions that take simple parameters, execute the requested operations, handle errors, and provide result data
        */
        example: (name, resolve) => {
            log(`received name ${name}`);
            resolve(`hello, ${name}!`);
        }
    }
};
// export module
module.exports = app;