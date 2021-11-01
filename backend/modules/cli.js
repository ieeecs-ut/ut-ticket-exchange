/* MODULE – CLI */
// command line interface

/* IMPORTS */
const _util = require("util");
const readline = require("readline");

/* INFRA */
var m = null;
var log = null;
var err = null;



/* MODULE */
// declare CLI-related variables (ie. states, data fields)
var input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var init = _ => {
    // initialize module variables as well as command-line input events
    input.on('line', (line) => {
        var line_text = '';
        line = line.trim();
        if (line != '') {
            line_text = line;
            line = line.split(' ');
            if (line[0] == "testing") {
                console.log("123");
                if (line.length == 2) {
                    m.main.example(line[1], result => {
                        log(result);
                    });
                }
            } else if (line[0] == "db") {
                if (line.length > 1 && line[1] == "table") {
                    if (line.length > 2) {
                        m.db.example(line[2], result => {
                            log(result);
                        });
                    }
                }
            } else if (line[0] == "modules") {
                var output = _util.inspect(m, {
                    showHidden: false, depth: 2, colors: true, compact: false
                });
                log(`modules\n${output}`);
            } else if (line[0] == "code") {
                if (line.length > 1 && line[1] != "") {
                    line_text = line_text.substring(4);
                    var ret = eval(line_text);
                    if (ret !== undefined) log(ret);
                }
            } else if (line[0] == "clear") {
                console.clear();
            } else if (line[0] == "exit" || line[0] == "quit") {
                m.main.exit();
            }
        }
    });
};
var api = {
    // create functions that allow other modules to interact with this one when necessary
    // (functions should take simple parameters, execute requested command-line operations/interactions, handle errors, and provide result data)
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
        init();
    },
    api: api
};