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
/*
    TODO: declare web-server-related variables (ie. states, data fields)
*/

/* MODULE */
var web; web = {
    http: null,
    express: null,
    http_port: null,
    init: id => {
        web.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
        http_port = global.http_port;
        web.express = express();
        web.http = http.Server(web.express);
        web.express.use(body_parser.json());
        web.express.use(body_parser.urlencoded({ extended: true }));
        web.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        web.express.use(express.static("html"));
        web.express.get("/", (req, res) => {
            res.sendFile(__dirname + "/html/index.html");
        });

        /*
            TODO: initialize module variables as well as express web server
        */
        web.express.get("/example1", (req, res) => {
            res.send("get requests work");
        });
        web.express.post("/", (req, res) => {
            if (req.body.hasOwnProperty('name') && req.body.name && req.body.name.trim() != "") {
                m.db.example(req.body.name.trim(), result => {
                    res.send(result);
                });
            }
        });

        // open server
        web.express.listen(http_port, _ => {
            log("listening on", http_port);
        });
    },
    api: {
        /*
            TODO: create functions that take simple parameters, execute the requested web operations/interactions, handle errors, and provide result data
        */
    }
};
// export module
module.exports = web;

