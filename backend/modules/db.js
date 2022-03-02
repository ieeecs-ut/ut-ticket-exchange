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
// declare database-related variables (ie. states, data fields)
var mongo_port = null;
var mongo_dbname = null;
var mongo_client = null;
var mongo_api = null;
var mongo_oid = mongodb.ObjectId;
var init = _ => {
    // initialize module variables as well as mongodb database

};
var api = {
    // create functions that allow other modules to interact with this one when necessary
    // (functions should take simple parameters, query the database, handle errors, and provide requested data)
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
    },
    // user
    create_user: (email, new_password, resolve) => {
        var ts_now = (new Date()).getTime();
        mongo_api.collection('user').insertOne({
            email: email,
            password: new_password,
            ts_updated: ts_now,
            ts_created: ts_now,
        }, (error1, result1) => {
            if (error1) {
                err(`error creating user with email ${email}`, error1.message ? error1.message : error1);
                resolve(false, error1);
            } else {
                resolve(true, result1.insertedId);
            }
        });
    },
    get_user: (id, resolve) => {
        mongo_api.collection('user').findOne({ '_id': mongo_oid(id) }, (e, result1) => {
            if (e) {
                err(`error finding user ${id}`, e.message ? e.message : e);
                resolve(false, e);
            } else {
                if (result1) resolve(true, result1);
                else resolve(null, result1);
            }
        });
    },
    update_user: (id, update, resolve) => {
        var ts_now = (new Date()).getTime();
        mongo_api.collection('user').findOne({ _id: mongo_oid(id) }, (e, result1) => {
            if (e) {
                err(`error finding user ${id}`, e.message ? e.message : e);
                resolve(false, e);
            } else {
                if (!result1) resolve(null, result1);
                else {
                    if (!update.hasOwnProperty('ts_updated'))
                        update.ts_updated = ts_now;
                    mongo_api.collection('user').updateOne({ _id: mongo_oid(id) }, {
                        $set: update
                    }, (e2, result2) => {
                        if (e2) {
                            err(`error updating user ${id}`, e2.message ? e2.message : e2);
                            resolve(false, e2);
                        } else {
                            mongo_api.collection('user').findOne({ _id: mongo_oid(id) }, (e3, result3) => {
                                if (e3) {
                                    err(`error finding user ${id} after update`, e3.message ? e3.message : e3);
                                    resolve(false, e3);
                                } else {
                                    if (!result3) resolve(null, result3);
                                    else resolve(true, result3);
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    delete_user: (id, resolve) => {
        mongo_api.collection('user').deleteOne({ _id: mongo_oid(id) }, (e, coll1) => {
            if (e) {
                err(`error finding user ${id}`, e.message ? e.message : e);
                resolve(false, e);
            } else {
                if (!coll1 || coll1.result.n != 1)
                    resolve(null, coll1);
                else resolve(true, coll1);
            }
        });
    },
    user_exists: (email = '', id = '', resolve) => {
        var _find = {};
        if (email != '' && email != null) _find['email'] = email;
        if (id != '' && id != null) _find['_id'] = mongo_oid(id);
        mongo_api.collection('user').find(_find, (error1, cursor1) => {
            if (error1) {
                err(`error finding user with id/email ${id}/${email}`, error1.message ? error1.message : error1);
                resolve(null);
            } else {
                cursor1.count().then(c => {
                    if (c <= 0)
                        resolve(false);
                    else resolve(true);
                });
            }
        });
    },
    validate_login: (email, password, resolve) => {
        mongo_api.collection('user').find({
            email: email,
            password: password
        }, (error1, cursor1) => {
            if (error1) {
                err(`error validating login for user with email ${email}`, error1.message ? error1.message : error1);
                resolve(null);
            } else {
                cursor1.count().then(c => {
                    if (c <= 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            }
        });
    },

    // buy_order
    create_buy_order: (event_id, sell_order_id, ts_click, comments, resolve) => {
        var ts_now = (new Date()).getTime();
        mongo_api.collection('buy_order').insertOne({
            event: event_id,
            sell_order: sell_order_id,
            comments: comments,
            ts_click: ts_click,
            ts_updated: ts_now,
            ts_created: ts_now,
        }, (error1, result1) => {
            if (error1) {
                err(`error creating event with event/sport/date ${event_id}/${sport}/${date}`, error1.message ? error1.message : error1);
                resolve(false, error1);
            } else {
                resolve(true, result1.insertedId);
            }
        });
    },

    // sell_order
    create_sell_order: (event_id, price, seats, comments, resolve) => {
        var ts_now = (new Date()).getTime();
        mongo_api.collection('sell_order').insertOne({
            event: event_id,
            price: price,
            seats: seats,
            comments: comments,
            ts_updated: ts_now,
            ts_created: ts_now,
        }, (error1, result1) => {
            if (error1) {
                err(`error creating event with event/sport/date ${event_id}/${sport}/${date}`, error1.message ? error1.message : error1);
                resolve(false, error1);
            } else {
                resolve(true, result1.insertedId);
            }
        });
    },

    // event
    create_event: (sport, playing, name, date, time, city, venue, gender, resolve) => {
        var ts_now = (new Date()).getTime();
        mongo_api.collection('event').insertOne({
            sport: sport,
            playing: playing,
            name: name,
            date: date,
            time: time,
            location: {
                city: city,
                venue: venue,
            },
            gender: gender,
            ts_updated: ts_now,
            ts_created: ts_now,
        }, (error1, result1) => {
            if (error1) {
                err(`error creating event with sport/date ${sport}/${date}`, error1.message ? error1.message : error1);
                resolve(false, error1);
            } else {
                resolve(true, result1.insertedId);
            }
        });
    },
    get_event: (id, resolve) => {
        mongo_api.collection('event').findOne({ '_id': mongo_oid(id) }, (e, result1) => {
            if (e) {
                err(`error finding event ${id}`, e.message ? e.message : e);
                resolve(false, e);
            } else {
                if (result1) resolve(true, result1);
                else resolve(null, result1);
            }
        });
    },
    update_event: (id, update, resolve) => {
        var ts_now = (new Date()).getTime();
        mongo_api.collection('event').findOne({ _id: mongo_oid(id) }, (e, result1) => {
            if (e) {
                err(`error finding event ${id}`, e.message ? e.message : e);
                resolve(false, e);
            } else {
                if (!result1) resolve(null, result1);
                else {
                    if (!update.hasOwnProperty('ts_updated'))
                        update.ts_updated = ts_now;
                    mongo_api.collection('event').updateOne({ _id: mongo_oid(id) }, {
                        $set: update
                    }, (e2, result2) => {
                        if (e2) {
                            err(`error updating event ${id}`, e2.message ? e2.message : e2);
                            resolve(false, e2);
                        } else {
                            mongo_api.collection('event').findOne({ _id: mongo_oid(id) }, (e3, result3) => {
                                if (e3) {
                                    err(`error finding event ${id} after update`, e3.message ? e3.message : e3);
                                    resolve(false, e3);
                                } else {
                                    if (!result3) resolve(null, result3);
                                    else resolve(true, result3);
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    delete_event: (id, resolve) => {
        mongo_api.collection('event').deleteOne({ _id: mongo_oid(id) }, (e, coll1) => {
            if (e) {
                err(`error finding event ${id}`, e.message ? e.message : e);
                resolve(false, e);
            } else {
                if (!coll1 || coll1.result.n != 1)
                    resolve(null, coll1);
                else resolve(true, coll1);
            }
        });
    },
    event_exists: (id = '', resolve) => {
        var _find = {};
        if (id != '') _find['_id'] = mongo_oid(id);
        mongo_api.collection('event').find(_find, (error1, cursor1) => {
            if (error1) {
                err(`error finding event with id ${id}`, error1.message ? error1.message : error1);
                resolve(null);
            } else {
                cursor1.count().then(c => {
                    if (c <= 0)
                        resolve(false);
                    else resolve(true);
                });
            }
        });
    },

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