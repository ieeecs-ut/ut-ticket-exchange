/* UT TICKET EXCHANGE */
// exchange client

var ex = null;

ex = {

    /* client fields */
    ngroot: "exchange-ng-root",
    ui: Block('div', 'exchange'),
    log: utils.logger('exchange'),
    err: utils.logger('exchange', true),

    /* client methods */
    load_view: (next) => {
        document.getElementById(ex.ngroot).appendChild(ex.ui.node());  // ex.ui.fill(ex.ngroot_node);
        Block.queries();
        utils.delay(_ => {
            ex.ui.css('opacity', '1');
        }, 100);
        utils.delay(_ => {
            Block.queries();
            utils.delay(_ => {
                Block.queries();
            }, 200);
        }, 50);
        if (next) next();
    },
    // init client
    init: next => {
        ex.log('loading...');
        utils.delay(_ => {
            ex.ui.load(_ => {
                ex.ui.load(_ => {
                    ex.log('ui blocks loaded');
                    ex.load_view(_ => {
                        ex.log('ready');
                        // setTimeout(ex.api.cookie_login, 100);
                        if (next) next();
                    });
                }, 'exchange', 'jQuery');
            }, 'lib/block-3.2.0', 'jQuery');
        }, 100);
    },

    /* client api */
    api: {
        initialize: next => {
            ex.init(_ => {
                utils.delay(_ => {
                    if (next) next();
                }, 100);
            });
        },
        reload_view: next => {
            ex.load_view(next);
        },

        cookie_login: _ => {
            ex.log("resuming session");
            return;
        }
    }

};

// export client api
window.exc = ex.api;