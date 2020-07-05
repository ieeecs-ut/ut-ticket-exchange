/* MODULE – UTILITIES */
// general-purpose utility functions

/* IMPORTS */
var m = null;
const readline = require("readline");

/* LOGS */
var log = null;
var err = null;

/* MODULE */
var utils; utils = {
    init: id => {
        utils.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
    },
    _enable_api: _ => {
        for (var u in utils) {
            if (utils.hasOwnProperty(u) && u != "init")
                utils.api[u] = utils[u];
        }
    },
    // returns a message/error logger
    logger: (id, as_error) => {
        var e = as_error ? true : false;
        return (...args) => {
            var msg = "";
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (typeof arg === 'object' && arg !== null)
                    arg = _util.inspect(arg, {
                        showHidden: false, depth: null, colors: true
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
        }
    },
    // CLI interaction tool
    input: readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    // non-blocking delayed callback
    delay: (callback, timeout) => {
        setTimeout(_ => {
            process.nextTick(callback);
        }, timeout);
    },
    api: {}
};
// export module
module.exports = utils;