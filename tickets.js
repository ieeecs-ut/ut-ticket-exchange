/* UT TICKET EXCHANGE */
// n.b. this code is just a skeleton

/* IMPORTS */
// import built-in & npm modules
const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");
const mongodb = require('mongodb');
const readline = require("readline");
const body_parser = require("body-parser");

/* ARGUMENTS */
// handle script arguments
global.args = process.argv.slice(2);
global.env = process.argv.slice(2)[0] == "prod" ? "prod" : "dev";
global.http_port = global.env == "dev" ? 8000 : 80;
global.mdb_port = global.env == "dev" ? 27017 : 3000;

/* MODULES */
// import application modules
global.m = {};
const modules = {};
fs.readdirSync(path.join(__dirname, "modules")).forEach(module_id => {
    if (module_id[0] != '.' && module_id[0] != '_') {
        module_id = module_id.slice(0, module_id.length - 3);
        modules[module_id] = require(`./modules/${module_id}.js`);
        if (modules[module_id].hasOwnProperty('api') && modules[module_id].api &&
            typeof modules[module_id].api === 'object' && modules[module_id].api !== null) {
            if (module_id == "utils") modules[module_id]._enable_api();
            global.m[module_id] = modules[module_id].api;
        }
    }
});


/* MAIN */
console.log("UT TICKET EXCHANGE");
modules.utils.init("utils");
for (var module_id in modules) {
    if (modules[module_id].hasOwnProperty('init') && modules[module_id].init &&
        typeof modules[module_id].init === 'function' && module_id != "utils")
        modules[module_id].init(module_id);
}
modules.utils.delay(modules.app.main, 500);