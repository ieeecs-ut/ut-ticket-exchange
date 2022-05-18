/* MODULE – WEB SERVER */
// http web server

// TODO: prevent multiple active buy orders from one user on the same event
// TODO: add orders section to sell panel to view current sell orders (show it first then swap it with the form from figma on a button click? or find a way to show both)

/* IMPORTS */
const http = require("http");
const express = require("express");
const jwt = require("jsonwebtoken");
const express_jwt = require('express-jwt');

/* INFRA */
var m = null;
var log = null;
var err = null;



/* MODULE */
// declare web-server-related variables (ie. states, data fields)
var http_server = null;
var express_api = null;
var http_port = null;
var init = _ => {

    // initialize module variables as well as express web server
    express_api.get("/example1", (req, res) => {
        res.send("get requests work");
    });

    /* auth */
    express_api.post("/api/sign_in", (req, res) => {
        if (!req.body.hasOwnProperty('email_address') || !req.body.hasOwnProperty('password'))
            return return_error(req, res, 400, "Missing email or password");
        if (!req.body.email_address || (`${req.body.email_address}`).trim().length < ("_@utexas.edu").length)
            return return_error(req, res, 400, "Invalid email address");
        if (!req.body.password || (`${req.body.password}`).trim().length <= 0)
            return return_error(req, res, 400, "Invalid password");

        m.db.user_exists(req.body.email_address, null, (result) => {
            if (result === null) return return_error(req, res, 500, "Database error");
            if (result == false) return return_error(req, res, 400, "User not found");
            m.db.validate_login(req.body.email_address, req.body.password, (result) => {
                if (result === null) return return_error(req, res, 500, "Database error");
                if (result == false) return return_error(req, res, 401, "Incorrect password");
                var token = generate_token(req.body.email_address);
                return return_data(req, res, {
                    token: token
                });
            });
        });
    });
    express_api.post("/api/sign_up", (req, res) => {
        if (!req.body.hasOwnProperty('email_address') || !req.body.hasOwnProperty('new_password'))
            return return_error(req, res, 400, "Missing email or new password");
        if (!req.body.email_address || (`${req.body.email_address}`).trim().length < ("_@utexas.edu").length)
            return return_error(req, res, 400, "Invalid email address");
        if (!req.body.new_password || (`${req.body.new_password}`).trim().length <= 0)
            return return_error(req, res, 400, "Invalid new password");

        m.db.user_exists(req.body.email_address, null, (result) => {
            if (result === null) return return_error(req, res, 500, "Database error");
            if (result == true) return return_error(req, res, 400, "E-mail already taken");
            m.db.create_user(req.body.email_address, req.body.new_password, (status, result) => {
                if (status === null || result === null) return return_error(req, res, 500, "Database error");
                if (status == false || result === false) return return_error(req, res, 500, "Failed to create user");
                var token = generate_token(req.body.email_address);
                return return_data(req, res, {
                    token: token
                });
            });
        });
    });
    express_api.post("/api/auth", express_jwt({ secret: m.secrets.jwt_key, algorithms: ['HS256'] }), (req, res) => {
        m.db.user_exists(req.user.email, null, (result) => {
            if (result === null) return return_error(req, res, 500, "Database error");
            if (result == false) return return_error(req, res, 400, "User not found");
            return return_data(req, res, {
                email: req.user.email
            });
        });
    });
    express_api.post("/api/auth_alt", (req, res) => {
        // authenticate token
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.user_exists(req.user.email, null, (result) => {
            if (result === null) return return_error(req, res, 500, "Database error");
            if (result == false) return return_error(req, res, 400, "User not found");
            return return_data(req, res, {
                email: req.user.email
            });
        });
    });

    /* event */
    express_api.post("/api/event/create", (req, res) => {
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success, result) => {
            if (success === null) return return_error(req, res, 500, "Database error");
            if (success == false) return return_error(req, res, 400, "User not found");
            var r = req.body;
            if (r.sport == "" || r.playing == "" || r.name == "" || r.city == "" ||
                r.state == "" || r.venue == "" || r.date == "" || r.time == "" || r.timezone == "")
                return return_error(req, res, 400, "Invalid form input");
            m.db.create_event(result._id, r.sport, r.playing, r.name, r.date, r.time, r.timezone, r.city, r.state, r.venue, r.gender, r.comments, (success2, result2) => {
                if (success2 === null || success2 == false) return return_error(req, res, 500, "Database error");
                return return_data(req, res, { id: result2 });
            });
        });
    });
    express_api.post("/api/event", (req, res) => {
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success1, result1) => {
            if (success1 === null) return return_error(req, res, 500, "Database error");
            if (success1 == false) return return_error(req, res, 400, "User not found");
            var date = req.body.date ? req.body.date.trim() : 'all';
            m.db.get_events(date === 'all' ? null : date, (success2, result2) => {
                if (success2 === null || success2 == false) return return_error(req, res, 500, "Database error");
                var event_ids = [];
                for (var e in result2) event_ids.push(result2[e]._id);
                m.db.get_sell_orders_for_events(event_ids, (success3, result3) => {
                    if (success3 === null || success3 == false) return return_error(req, res, 500, "Database error");
                    // find sell order with lowest selling price for event
                    for (var e in result2) {
                        var sell_order = null;
                        var seats = null;
                        var lowest_price = Number.MAX_SAFE_INTEGER;
                        for (var s in result3) {
                            if (result3[s].event.toString() === result2[e]._id.toString()) {
                                if (!result3[s].locked) {
                                    var price = parseFloat(result3[s].price) || 0;
                                    if (price > 0 && price <= lowest_price) {
                                        lowest_price = price;
                                        seats = result3[s].seats;
                                        sell_order = result3[s]._id.toString();
                                    }
                                }
                            }
                        }
                        result2[e].ticket = {
                            sell_order: sell_order,
                            price: sell_order == null ? 0 : lowest_price,
                            seats: seats,
                        };
                    }
                    return return_data(req, res, { events: result2 });
                });
            });
        });
    });

    /* sell_order */
    express_api.post("/api/sell_order/create", (req, res) => {
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success, result) => {
            if (success === null) return return_error(req, res, 500, "Database error");
            if (success == false) return return_error(req, res, 400, "User not found");
            var r = req.body;
            if (r.seats == "" || r.price == "" || r.event_id == "")
                return return_error(req, res, 400, "Invalid form input");
            m.db.create_sell_order(result._id, r.event_id, r.price, r.seats, r.comments, req.user.email, (success2, result2) => {
                if (success2 === null || success2 == false) return return_error(req, res, 500, "Database error");
                return return_data(req, res, { id: result2 });
            });
        });
    });
    express_api.post("/api/sell_order", (req, res) => {
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success1, result1) => {
            if (success1 === null) return return_error(req, res, 500, "Database error");
            if (success1 == false) return return_error(req, res, 400, "User not found");
            m.db.get_sell_orders_for_user_with_event(result1._id.toString(), (success2, result2) => {
                if (success2 === null) return return_error(req, res, 500, "Database error");
                if (success2 == false) return return_error(req, res, 400, "Sell orders not found");
                for (var s in result2) {
                    result2[s].event_obj.ticket = {
                        price: parseInt(result2[s].price),
                        seats: result2[s].seats,
                        sell_order: result2[s]._id.toString()
                    };
                }
                return return_data(req, res, { orders: result2 });
            });
        });
    });
    express_api.post("/api/sell_order/cancel", (req, res) => {
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success1, result1) => {
            if (success1 === null) return return_error(req, res, 500, "Database error");
            if (success1 == false) return return_error(req, res, 400, "User not found");
            var buy_order_id = req.body.buy_order_id;
            m.db.get_buy_order(buy_order_id, (success2, result2) => {
                if (success2 === null) return return_error(req, res, 500, "Database error");
                if (success2 == false) return return_error(req, res, 400, "Buy order not found");
                var sell_order_id = result2.sell_order_match.toString();
                m.db.update_sell_order(sell_order_id, {
                    locked: false,
                    buy_order_match: null,
                    buy_order_match_email: null,
                    ts_locked: 0,
                }, (success3, result3) => {
                    if (success3 === null) return return_error(req, res, 500, "Database error");
                    if (success3 == false) return return_error(req, res, 400, "Sell order not found");
                    m.db.delete_buy_order(buy_order_id, (success4, result4) => {
                        if (success4 === null) return return_error(req, res, 500, "Database error");
                        if (success4 == false) return return_error(req, res, 400, "Buy order not found");
                        return return_data(req, res, {});
                    });
                });
            });
        });
    });

    /* buy_order */
    express_api.post("/api/buy_order/create", (req, res) => {
        var ts_now = Date.now();
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success, result) => {
            if (success === null) return return_error(req, res, 500, "Database error");
            if (success == false) return return_error(req, res, 400, "User not found");
            var r = req.body;
            if (r.event_id == "" || r.ts_click == "" || r.sell_order_id == "")
                return return_error(req, res, 400, "Invalid form input");
            m.db.get_sell_orders_for_events([r.event_id], (success3, result3) => {
                if (success3 === null || success3 == false) return return_error(req, res, 500, "Database error");
                // ALGORITHM: find sell order with lowest selling price for event
                var sell_order_s = '';
                var sell_order_id = null;
                var lowest_price = Number.MAX_SAFE_INTEGER;
                for (var s in result3) {
                    if (result3[s].event.toString() === r.event_id) {
                        if (!result3[s].locked) {
                            var price = parseFloat(result3[s].price) || 0;
                            if (price > 0 && price <= lowest_price) {
                                lowest_price = price;
                                sell_order_id = result3[s]._id.toString();
                                sell_order_s = s;
                            }
                        }
                    }
                }
                if (sell_order_id === null || sell_order_id === undefined || !sell_order_id)
                    return return_error(req, res, 400, "No tickets for sale on this event");
                if (sell_order_id.toString().trim() != r.sell_order_id.toString().trim())
                    return return_error(req, res, 400, "Last available price changed (please refresh events)");
                if (result3[sell_order_s].locked == true)
                    return return_error(req, res, 400, "Ticket availability changed (please refresh events)");
                m.db.create_buy_order(result._id, r.event_id, r.ts_click, r.comments, req.user.email.trim(), (success2, result2) => {
                    if (success2 === null || success2 == false) return return_error(req, res, 500, "Database error");
                    m.db.update_sell_order(m.db.mongo_oid(sell_order_id.toString()), {
                        locked: true,
                        buy_order_match: result2.toString().trim(),
                        buy_order_match_email: req.user.email.trim(),
                        ts_locked: ts_now,
                    }, (success4, result4) => {
                        if (success4 === null || result4 == false) return return_error(req, res, 500, "Database error");
                        m.db.update_buy_order(m.db.mongo_oid(result2.toString()), {
                            sell_order_match: m.db.mongo_oid(sell_order_id.toString()),
                            sell_order_match_email: result4['email'],
                            match_status: m.db.buy_order_match_status.loc,
                        }, (success5, result5) => {
                            if (success5 === null || result5 == false) return return_error(req, res, 500, "Database error");
                            return return_data(req, res, { id: result2 });
                        });
                    });
                });
            });
        });
    });
    express_api.post("/api/buy_order", (req, res) => {
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success1, result1) => {
            if (success1 === null) return return_error(req, res, 500, "Database error");
            if (success1 == false) return return_error(req, res, 400, "User not found");
            m.db.get_buy_orders(result1._id.toString(), (success2, result2) => {
                if (success2 === null) return return_error(req, res, 500, "Database error");
                if (success2 == false) return return_error(req, res, 400, "Buy orders not found");
                var sell_order_ids = [];
                for (var b in result2)
                    sell_order_ids.push((result2[b].sell_order_match.toString()));
                m.db.get_sell_orders(sell_order_ids, (success3, result3) => {
                    if (success3 === null) return return_error(req, res, 500, "Database error");
                    if (success3 == false) return return_error(req, res, 400, "Sell orders not found");
                    for (var b in result2) {
                        for (var s in result3) {
                            if (result3[s]._id.toString() == result2[b].sell_order_match.toString()) {
                                result2[b].event_obj.ticket = {
                                    price: parseInt(result3[s].price),
                                    seats: result3[s].seats,
                                    sell_order: result3[s]._id.toString(),
                                };
                            }
                        }
                    }
                    return return_data(req, res, { orders: result2 });
                });
            });
        });
    });
    express_api.post("/api/buy_order/cancel", (req, res) => {
        req.user = web_verify_token(req.body._auth);
        if (req.user == null) return return_error(req, res, 401, "Unauthorized");
        m.db.get_user_by_email(req.user.email, (success1, result1) => {
            if (success1 === null) return return_error(req, res, 500, "Database error");
            if (success1 == false) return return_error(req, res, 400, "User not found");
            var buy_order_id = req.body.buy_order_id;
            m.db.get_buy_order(buy_order_id, (success2, result2) => {
                if (success2 === null) return return_error(req, res, 500, "Database error");
                if (success2 == false) return return_error(req, res, 400, "Buy order not found");
                var sell_order_id = result2.sell_order_match.toString();
                m.db.update_sell_order(sell_order_id, {
                    locked: false,
                    buy_order_match: null,
                    buy_order_match_email: null,
                    ts_locked: 0,
                }, (success3, result3) => {
                    if (success3 === null) return return_error(req, res, 500, "Database error");
                    if (success3 == false) return return_error(req, res, 400, "Sell order not found");
                    m.db.delete_buy_order(buy_order_id, (success4, result4) => {
                        if (success4 === null) return return_error(req, res, 500, "Database error");
                        if (success4 == false) return return_error(req, res, 400, "Buy order not found");
                        return return_data(req, res, {});
                    });
                });
            });
        });
    });
};
var cors_handler = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
var return_error = (req, res, code, msg) => {
    res.status(code);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({
        status: code,
        message: msg
    }, null, 2));
    return null;
};
var return_data = (req, res, data) => {
    res.status(200);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(data, null, 2));
    return null;
};
var generate_token = (email) => {
    return jwt.sign({ email: (`${email}`).trim() }, m.secrets.jwt_key, { algorithm: 'HS256' });
};
var web_verify_token = (token) => {
    var result = null;
    try {
        result = jwt.verify(token, m.secrets.jwt_key);
    } catch (e) {
        log(`error verifying token "${token}":`, (e.message ? e.message : e));
        result = null;
    }
    return result;
};
var api = {
    // create functions that allow other modules to interact with this one when necessary
    // (functions should take simple parameters, execute the requested web operations/interactions, handle errors, and provide result data)

};



/* EXPORT */
module.exports = {
    init: id => {
        module.exports.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
        http_port = global.http_port;
        express_api = express();
        http_server = http.Server(express_api);
        express_api.use(express.json());
        express_api.use(express.urlencoded({ extended: true }));
        express_api.use(cors_handler);
        // express_api.use(express.static("html"));
        express_api.get("/", (req, res) => {
            res.sendFile(global.root_path + "/demo.html");
        });
        module.exports.api.exit = resolve => {
            log("exit");
            http_server.close(resolve);
        };
        init();
        // open server
        express_api.listen(http_port, _ => {
            log("listening on", http_port);
        });
    },
    api: api
};

