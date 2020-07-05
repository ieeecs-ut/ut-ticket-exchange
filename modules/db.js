/* MODULE – DATABASE */
// database API wrapper

/* IMPORTS */
var m = null;
const mongodb = require('mongodb');

/* LOGS */
var log = null;
var err = null;

/* DATA */
/*
    TODO: declare database-related variables (ie. states, data fields)
*/

/* MODULE */
var db; db = {
    id: null,
    m_db: null,
    m_api: null,
    m_port: null,
    m_client: mongodb.MongoClient,
    oid: mongodb.ObjectId,
    init: id => {
        db.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
        db.m_db = global.mdb_db;
        db.m_port = global.mdb_port;
        db.m_client.connect("mongodb://localhost:" + db.m_port, { useUnifiedTopology: true }, (e, client) => {
            if (e) err("connection error", e);
            else {
                log("connected to", db.m_port);
                db.m_api = client.db(db.m_db);
            }
        });

        /*
            TODO: initialize module variables as well as mongodb database
        */

    },
    api: {
        /*
            TODO: create functions that take simple parameters, query the database, handle errors, and provide requested data
        */
        example: (table, resolve) => {
            log(`received table name ${table}`);
            db.m_api.collection(table).find({}, (error1, cursor1) => {
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
    }
};
// export module
module.exports = db;