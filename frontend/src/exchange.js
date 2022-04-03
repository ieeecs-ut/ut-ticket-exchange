/* UT TICKET EXCHANGE */
// exchange client

var ex = null;

ex = {

    /* client fields */
    api_url: `${window.location.protocol}//${window.location.hostname}:${window.location.port === '4200' ? '8000' : window.location.port}/api`, // `${window.location.protocol}//${window.location.host}/api`,
    landing_url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`,
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

    // ui modal
    ui_modal: {
        generic_confirm: (title, message, callback) => {
            bootbox.confirm({
                centerVertical: true,
                title: `<span class="modal_title">${title}</span>`,
                message: (`${message}`),
                callback: callback
            })
        },
        new_event: _ => {
            bootbox.confirm({
                centerVertical: true,
                title: '<span class="modal_title">List A New Event</span>',
                message: `<div id='new_event_display_modal'>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Sport:</span>&nbsp;` +
                    `<input placeholder="Tennis" class="modal_text_input" id="ne_modal_sport_input" type='text' name='ne_modal_sport'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Gender:</span>&nbsp;` +
                    `<input placeholder="Womens" class="modal_text_input" id="ne_modal_gender_input" type='text' name='ne_modal_gender'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Playing:</span>&nbsp;` +
                    `<input placeholder="UT Austin vs Texas A&M" class="modal_text_input" id="ne_modal_playing_input" type='text' name='ne_modal_playing'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Name:</span>&nbsp;` +
                    `<input placeholder="All-American Championships" class="modal_text_input" id="ne_modal_name_input" type='text' name='ne_modal_name'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Venue:</span>&nbsp;` +
                    `<input placeholder="Memorial Stadium" class="modal_text_input" id="ne_modal_venue_input" type='text' name='ne_modal_venue'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">City:</span>&nbsp;` +
                    `<input placeholder="Berkeley" class="modal_text_input" id="ne_modal_city_input" type='text' name='ne_modal_city'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">State:</span>&nbsp;` +
                    `<input placeholder="CA" class="modal_text_input" id="ne_modal_state_input" type='text' name='ne_modal_state'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Date:</span>&nbsp;` +
                    `<input value="${utils.ts_to_string(Date.now())}" class="modal_text_input" id="ne_modal_date_input" type='date' name='ne_modal_date'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Time:</span>&nbsp;` +
                    `<input class="modal_text_input" value="${utils.lpad((new Date()).getHours(), 2, '0')}:00" id="ne_modal_time_input" type='time' name='ne_modal_time'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Time Zone:</span>&nbsp;` +
                    `<input placeholder="CST" value="${utils.get_current_timezone()}" class="modal_text_input" id="ne_modal_timezone_input" type='text' name='ne_modal_timezone'/></div>` +
                    `<div style="margin: 3px 0;"><span class="modal_text_input_label">Comments:</span>&nbsp;` +
                    `<input placeholder="Lorem ipsum dolor sit amet..." class="modal_text_input" id="ne_modal_comments_input" type='text' name='ne_modal_comments'/></div>` +
                    `<div style="height: 8px"></div></div>`,
                callback: (result) => {
                    if (result) {
                        var sport = (`${$('#new_event_display_modal #ne_modal_sport_input')[0].value}`).trim();
                        var playing = (`${$('#new_event_display_modal #ne_modal_playing_input')[0].value}`).trim();
                        var gender = (`${$('#new_event_display_modal #ne_modal_gender_input')[0].value}`).trim();
                        var name = (`${$('#new_event_display_modal #ne_modal_name_input')[0].value}`).trim();
                        var city = (`${$('#new_event_display_modal #ne_modal_city_input')[0].value}`).trim();
                        var state = (`${$('#new_event_display_modal #ne_modal_state_input')[0].value}`).trim();
                        var venue = (`${$('#new_event_display_modal #ne_modal_venue_input')[0].value}`).trim();
                        var date = (`${$('#new_event_display_modal #ne_modal_date_input')[0].value}`).trim();
                        var time = (`${$('#new_event_display_modal #ne_modal_time_input')[0].value}`).trim();
                        var timezone = (`${$('#new_event_display_modal #ne_modal_timezone_input')[0].value}`).trim();
                        var comments = (`${$('#new_event_display_modal #ne_modal_comments_input')[0].value}`).trim();
                        if (sport == "" || playing == "" || name == "" || city == "" ||
                            state == "" || venue == "" || date == "" || time == "" || timezone == "")
                            return false;
                        // console.log(sport, playing, gender, name, city, state, venue, date, time, timezone, comments);
                        ex.api.new_event(sport, playing, gender, name, city, state, venue, date, time, timezone, comments);
                    }
                    return true;
                }
            });
        },
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
        get_api_url: _ => ex.api_url,
        get_landing_url: _ => ex.landing_url,
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
            else body = { _auth: `${token}` };
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
        new_event: (sport, playing, gender, name, city, state, venue, date, time, timezone, comments, resolve = null) => {
            if (!resolve) resolve = _ => { };
            var token = ex.api.get_token();
            if (!token || token.trim().length <= 0)
                return resolve(null, { message: "Invalid token" });
            var body = {
                _auth: `${token}`,
                sport: sport,
                playing: playing,
                gender: gender,
                name: name,
                city: city,
                state: state,
                venue: venue,
                date: date,
                time: time,
                timezone: timezone,
                comments, comments,
            };
            $.ajax({
                url: `${ex.api_url}/event/create`,
                method: 'post',
                headers: {},
                data: body,
                success: (response, status, xhr) => {
                    if (!response /*|| !response.hasOwnProperty('email')*/) {
                        ex.err(response);
                        return resolve(null, { message: "Invalid response" });
                    }
                    return resolve(response, null);
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
        get_events: (date, resolve = null) => {
            if (!resolve) resolve = _ => { };
            var token = ex.api.get_token();
            if (!token || token.trim().length <= 0)
                return resolve(null, { message: "Invalid token" });
            var body = {
                _auth: `${token}`,
                date: date,
            };
            $.ajax({
                url: `${ex.api_url}/event`,
                method: 'post',
                headers: {},
                data: body,
                success: (response, status, xhr) => {
                    if (!response /*|| !response.hasOwnProperty('email')*/) {
                        ex.err(response);
                        return resolve(null, { message: "Invalid response" });
                    }
                    return resolve(response, null);
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
        }
    }

};

// export client api
window.exc = ex.api;