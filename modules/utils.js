/* MODULE – UTILITIES */
// general-purpose utility functions

/* IMPORTS */
const _util = require("util");

/* INFRA */
var m = null;
var log = null;
var err = null;



/* MODULE */
var api = {
    /*
        TODO: create convenient utility functions that encapsulate & parameterize commonly used/repeated code blocks
    */
};



/* EXPORTS */
module.exports = {
    id: null,
    init: id => {
        module.exports.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
    },
    _enable_api: _ => {
        var utils = module.exports;
        var excluded = ["id", "api", "init", "_enable_api"];
        for (var u in utils) {
            if (utils.hasOwnProperty(u) && !excluded.includes(u))
                utils.api[u] = utils[u];
        }
        for (var u in api) {
            if (api.hasOwnProperty(u))
                utils.api[u] = api[u];
        }
    },
    // returns a message/error logger
    logger: (id, as_error) => {
        var e = as_error ? true : false;
        var logger_obj = (...args) => {
            var msg = "";
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (typeof arg === 'object' && arg !== null)
                    arg = _util.inspect(arg, {
                        showHidden: false, depth: logger_obj.depth, colors: true, compact: false
                    });
                msg += `${arg}${i < args.length - 1 ? ' ' : ''}`;
            }
            if (e) {
                msg = `* [${id}] ERROR: ${msg}`;
                console.error(msg);
            } else {
                msg = `[${id}] ${msg}`;
                console.log(msg);
            }
        };
        logger_obj.depth = null;
        return logger_obj;
    },
    // non-blocking delayed callback
    delay: (callback, timeout) => {
        setTimeout(_ => {
            process.nextTick(callback);
        }, timeout);
    },
    api: {}
};