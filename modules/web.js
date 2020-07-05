/* MODULE – WEB SERVER */
// http web server

/* IMPORTS */
const http = require("http");
const express = require("express");
const body_parser = require("body-parser");
const utils = require("./utils");

/* MODULE */
var web; web = {
    http: null,
    express: null,
    init: _ => {
        console.log("initializing web server");
        console.log(web);
    }
};
module.exports = web;