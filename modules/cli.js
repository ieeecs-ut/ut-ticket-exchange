/* MODULE – CLI */
// command line interface

/* IMPORTS */
var m = null;

/* LOGS */
var log = null;
var err = null;

/* DATA */
// module data

/* MODULE */
var cli; cli = {
    id: null,
    init: id => {
        cli.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");
    },
    api: {

    }
};
// export module
module.exports = cli;