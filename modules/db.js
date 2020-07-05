/* MODULE – DATABASE */
// database API wrapper

/* IMPORTS */
var m = null;
const mongodb = require('mongodb');

/* INFRA */
var m = null;
var log = null;
var err = null;



/* MODULE */
/*
    TODO: declare database-related variables (ie. states, data fields)
*/
var mongo_port = null;
var mongo_dbname = null;
var mongo_client = null;
var mongo_api = null;
var init = _ => {
    /*
        TODO: initialize module variables as well as mongodb database
    */

};
var api = {
    /*
        TODO: create functions that allow other modules to interact with this one when necessary
        (functions should take simple parameters, query the database, handle errors, and provide requested data)
    */
    example: (table, resolve) => {
        log(`received table name ${table}`);
        mongo_api.collection(table).find({}, (error1, cursor1) => {
            if (error1) {
                err(`error retrieving table ${table}`, error1.message ? error1.message : error1);
                resolve(null);
            } else {
                cursor1.count().then(c => {
                    if (c <= 0) {
                        err(`error retrieving table ${table} – not found`);
                        resolve(null);
                    } else {
                        cursor1.toArray().then(resolve);
                    }
                });
            }
        });
    }
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
        mongo_port = global.mdb_port;
        mongo_dbname = global.mdb_db;
        mongo_client = mongodb.MongoClient;
        mongo_client.connect("mongodb://localhost:" + mongo_port, { useUnifiedTopology: true }, (e, client) => {
            if (e) err("connection error", e);
            else {
                log("connected to", mongo_port);
                mongo_api = client.db(mongo_dbname);
            }
        });
        init();
    },
    api: api
};