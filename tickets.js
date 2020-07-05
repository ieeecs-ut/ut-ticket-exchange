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
// import application modules
const secrets = require("./modules/secrets");
const utils = require("./modules/utils");
const db = require("./modules/db");
const web = require("./modules/web");
const cli = require("./modules/cli");
const app = require("./modules/app");

/* ARGUMENTS */
// handle script arguments
const arguments = process.argv.slice(2);
const environment = process.argv.slice(2)[0] == "prod" ? "prod" : "dev";
const http_port = environment == "dev" ? 8000 : 80;

/* MAIN */
console.log("UT TICKET EXCHANGE");
db.init(); web.init(); cli.init();
app.init(); app.main();