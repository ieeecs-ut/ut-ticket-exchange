/* MODULE – MAIN */
// main application logic

/* IMPORTS */
const fs = require("fs");
const path = require("path");
const utils = require("./utils");

/* INFRA */
var m = null;
var log = null;
var err = null;



/* MODULE */
/*
    TODO: declare application-related variables (ie. states, data fields)
*/
var init = _ => {
    /*
        TODO: initialize module variables and anything else needed by the application
    */
};
var main = _ => {
    /*
        TODO: perform necessary operations after all modules have been initialized
    */
};
var api = {
    /*
        TODO: create functions that allow other modules to interact with this one when necessary
        (functions should take simple parameters, execute the requested operations, handle errors, and provide result data)
    */
    example: (name, resolve) => {
        log(`received name ${name}`);
        resolve(`hello, ${name}!`);
    },
};



/* EXPORT */
module.exports = {
    id: null,
    init: id => {
        module.exports.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
        module.exports.api.exit = (e = 0) => {
            m.web.exit(_ => {
                log("exit");
                process.exit(e);
            });
        };
        init();
    },
    main: _ => {
        log("ready");
        main();
    },
    api: api
};
