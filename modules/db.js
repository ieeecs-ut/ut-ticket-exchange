/* MODULE – DATABASE */
// database API wrapper

/* IMPORTS */
var m = null;
const mongodb = require('mongodb');

/* LOGS */
var log = null;
var err = null;

/* DATA */
var port = null;

/* MODULE */
var db; db = {
    id: null,
    m_api: null,
    client: mongodb.MongoClient,
    oid: mongodb.ObjectId,
    init: id => {
        db.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
        port = global.mdb_port;
        db.client.connect("mongodb://localhost:" + port, { useUnifiedTopology: true }, (e, client) => {
            if (e) err("connection error", e);
            else {
                log("connected to", port);
                db.api = client.db('nestor');
            }
        });
    },
    api: {

    }
};
// export module
module.exports = db;