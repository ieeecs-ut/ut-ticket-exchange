/* UT TICKET EXCHANGE */
// exchange client

var ex = null;

ex = {

    /* client fields */
    api_url: `${window.location.protocol}//${window.location.hostname}:${window.location.port === '4200' ? '8000' : window.location.port}/api`, // `${window.location.protocol}//${window.location.host}/api`,
    api_cookie_exp: '__indefinite__',
    ngroot: "exchange-ng-root",
    ui: Block('div', 'exchange'),
    log: utils.logger('exchange'),
    err: utils.logger('exchange', true),

    /* client methods */
    load_view: (next) => {
        var block_view_root = document.getElementById(ex.ngroot);
        if (block_view_root) {
            ex.ui.fill(block_view_root);
            utils.delay(_ => {
                ex.ui.on('show');
            }, 100);
        }
        Block.queries();
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
                        setTimeout(ex.api.cookie_login, 100);
                        if (next) next();
                    });
                }, 'exchange', 'jQuery');
            }, 'lib/block-3.2.0', 'jQuery');
        }, ex.api.blockViewLoadDelay);
    },

    /* client api */
    api: {
        blockViewLoadDelay: 650,
        initialize: next => {
            ex.init(_ => {
                utils.delay(_ => {
                    if (next) next();
                }, 10);
            });
        },
        reload_view: next => {
            ex.load_view(next);
        },
        hide_view: next => {
            ex.ui.on('hide');
            if (next) next();
        },
        login: (token, redirect = true) => {
            utils.delete_cookie('token');
            utils.cookie('token', token, ex.api_cookie_exp);
            if (redirect) {
                utils.delay(_ => {
                    window.location = `${window.location.protocol}//${window.location.host}/exchange`;
                }, 100);
            }
        },
        cookie_login: _ => {
            ex.log("resuming session");
            return;
        },
        logout: (redirect = true) => {
            utils.delete_cookie('token');
            if (redirect) window.location = `${window.location.protocol}//${window.location.host}/`;
        },
        get_token: _ => {
            var cookie = utils.cookie('token');
            if (cookie) return cookie;
            return null;
        },
        sign_in: (email_address, password, next) => {
            utils.sha256(password, (hashed_password) => {
                $.ajax({
                    url: `${ex.api_url}/sign_in`,
                    method: 'post',
                    data: {
                        email_address: email_address,
                        password: hashed_password
                    },
                    success: (result, status, xhr) => {
                        ex.log(result);
                        next(result.token, null);
                    },
                    error: (xhr, status, error) => {
                        var errorData = {
                            error: error,
                            message: null
                        };
                        if (xhr.responseJSON && xhr.responseJSON.hasOwnProperty('message') && (`${xhr.responseJSON.message}`).trim().length > 0) {
                            errorData.message = (`${xhr.responseJSON.message}`).trim();
                            ex.err(errorData.message);
                        }
                        ex.err(error);
                        next(null, errorData);
                    }
                });
            });
        },
        sign_up: (email_address, new_password, next) => {
            utils.sha256(new_password, (hashed_password) => {
                $.ajax({
                    url: `${ex.api_url}/sign_up`,
                    method: 'post',
                    data: {
                        email_address: email_address,
                        new_password: hashed_password
                    },
                    success: (result, status, xhr) => {
                        ex.log(result);
                        next(result.token, null);
                    },
                    error: (xhr, status, error) => {
                        var errorData = {
                            error: error,
                            message: null
                        };
                        if (xhr.responseJSON && xhr.responseJSON.hasOwnProperty('message') && (`${xhr.responseJSON.message}`).trim().length > 0) {
                            errorData.message = (`${xhr.responseJSON.message}`).trim();
                            ex.err(errorData.message);
                        }
                        ex.err(error);
                        next(null, errorData);
                    }
                });
            });
        },
        authenticate: (resolve, alt = true) => {
            var token = ex.api.get_token();
            if (!token || token.trim().length <= 0)
                return resolve(null, { message: "Invalid token" });
            var body = {};
            var headers = {};
            if (alt === false) headers = { "Authorization": `Bearer ${token}` };
            else body = { 'auth': `${token}` };
            $.ajax({
                url: `${ex.api_url}/auth${alt === true ? '_alt' : ''}`,
                method: 'post',
                headers: headers,
                data: body,
                success: (response, status, xhr) => {
                    if (!response || !response.hasOwnProperty('email')) {
                        ex.err(response);
                        return resolve(null, { message: "Email missing in response" });
                    }
                    return resolve({
                        email: response.email,
                        token: token
                    }, null);
                },
                error: (xhr, status, error) => {
                    var errorData = {
                        error: error,
                        message: null
                    };
                    if (xhr.responseJSON && xhr.responseJSON.hasOwnProperty('message') && (`${xhr.responseJSON.message}`).trim().length > 0) {
                        errorData.message = (`${xhr.responseJSON.message}`).trim();
                        ex.err(errorData.message);
                    }
                    ex.err(error);
                    resolve(null, errorData);
                }
            });
        },
    }

};

// export client api
window.exc = ex.api;