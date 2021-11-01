/* UT TICKET EXCHANGE */

/* IMPORTS */
// import built-in & npm modules
const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");
const mongodb = require('mongodb');
const readline = require("readline");
const body_parser = require("body-parser");

/* ENVIRONMENT */
// set up environment
global.args = process.argv.slice(2);
global.env = process.argv.slice(2)[0] == "--production" ? "prod" : "dev";
global.config = JSON.parse(fs.readFileSync('./config.json', { encoding: 'utf8', flag: 'r' }));
global.http_port = global.env == "dev" ? 8000 : global.config.http_port;
global.mdb_port = global.env == "dev" ? 27017 : global.config.mdb_port;
global.mdb_db = global.config.mdb_db;

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
modules.utils.delay(modules.main.main, 500);