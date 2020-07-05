/* MODULE – CLI */
// command line interface

/* IMPORTS */
var m = null;

/* LOGS */
var log = null;
var err = null;

/* DATA */
/*
    TODO: declare CLI-related variables (ie. states, data fields)
*/

/* MODULE */
var cli; cli = {
    id: null,
    init: id => {
        cli.id = id;
        m = global.m;
        log = m.utils.logger(id, false);
        err = m.utils.logger(id, true);
        log("initializing");

        m.utils.input.on('line', (line) => {
            line = line.trim();
            if (line != '') {
                line = line.split(' ');
                if (line[0] == "testing") {
                    console.log("123");
                    if (line.length == 2) {
                        m.app.example(line[1], result => {
                            log(result);
                        });
                    }
                } else if (line[0] == "db") {
                    if (line.length > 1 && line[1] == "read") {
                        if (line.length > 2) {
                            m.db.example(line[2], result => {
                                log(result);
                            });
                        }
                    }
                }
            }
        });

        /*
            TODO: initialize module variables as well as command-line input events
        */
    },
    api: {
        /*
            TODO: create functions that take simple parameters, execute requested command-line operations/interactions, handle errors, and provide result data
        */
    }
};
// export module
module.exports = cli;