/* MODULE – WEB SERVER */
// http web server

/* IMPORTS */
var m = null;
const http = require("http");
const express = require("express");
const body_parser = require("body-parser");

/* LOGS */
var log = null;
var err = null;

/* DATA */
// module data

/* MODULE */
var web; web = {
    http: null,
    express: null,
    init: id => {
        web.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
    },
    api: {

    }
};
// export module
module.exports = web;