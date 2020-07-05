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
// module data

/* MODULE */
var app; app = {
    id: null,
    init: id => {
        app.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
    },
    main: _ => {
        log("ready");
    },
    api: {

    }
};
// export module
module.exports = app;