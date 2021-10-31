/* DASHBOARD */
// web client

var app = {
    ui: {
        block: Block('div', 'app'),
        colors: {
            primary: "rgba(67, 133, 243, 0.99)", // rgba(219, 43, 58, 0.85)
            background: "#f1f1f1"
        },
        init: (callback) => {
            app.ui.block.fill(document.body);
            Block.queries();
            setTimeout(_ => {
                app.ui.block.css('opacity', '1');
            }, 100);
            setTimeout(_ => {
                Block.queries();
                setTimeout(_ => {
                    Block.queries();
                }, 200);
            }, 50);
            callback();
        },
    },
    ws: {
        id: 0,
        socket: null,
        url:
            (location.protocol === 'https:'
                ? 'wss://'
                : 'ws://') +
            document.domain +
            (document.domain == 'localhost' ? ':8080' : ((location.protocol === 'https:' ? ':443' : ':80') + '/socket')),
        encode_msg: (e, d) => {
            return JSON.stringify({
                event: e,
                data: d
            });
        },
        decode_msg: (m) => {
            try {
                m = JSON.parse(m);
            } catch (e) {
                console.log('[ws] invalid json ', e);
                m = null;
            }
            return m;
        },
        connect: callback => {
            var socket = new WebSocket(app.ws.url);
            socket.addEventListener('open', e => {
                console.log('[ws] socket connected');
                callback();
            });
            socket.addEventListener('error', e => {
                console.log('[ws] socket error ', e.data);
            });
            socket.addEventListener('message', e => {
                var d = app.ws.decode_msg(e.data);
                if (d != null) {
                    console.log('[ws] socket received:', d.event, d.data);
                    var data = {};
                    data[d.event] = d.data;
                    app.ui.block.data(data);
                } else {
                    console.log('[ws] socket received:', 'invalid message', e.data);
                }
            });
            socket.addEventListener('close', e => {
                console.log('[ws] socket disconnected');
                // alert('disconnected from server');
            });
            window.addEventListener('beforeunload', e => {
                // socket.close(1001);
            });
            app.ws.socket = socket;
        },
        send: (event, data) => {
            console.log('[ws] sending:', event, data);
            app.ws.socket.send(app.ws.encode_msg(event, data));
        },
        api: {
            cookie_login_flag: false,
            cookie_login: _ => {
                app.ws.api.cookie_login_flag = true;
                var hash_cookie = util.cookie('password');
                if (hash_cookie != null && (`${hash_cookie}`).trim() != "") {
                    hash_cookie = (`${hash_cookie}`).trim();
                    app.ws.send('auth', {
                        password: hash_cookie
                    });
                }
            },
            login: password => {
                util.sha256(`${password}`, hash => {
                    app.ws.send('auth', {
                        password: `${hash}`
                    });
                    util.cookie('password', `${hash}`, '__indefinite__');
                });
            },
            logout: _ => {
                util.delete_cookie('password');
                window.location.reload();
            }
        }
    },
    main: {
        init: _ => {
            console.clear();
            console.log('[main] loading...');
            setTimeout(_ => {
                app.ui.block.load(_ => {
                    app.ui.block.load(_ => {
                        console.log('[main] blocks loaded');
                        console.log('[main] socket connecting');
                        app.ws.connect(_ => {
                            app.ui.init(_ => {
                                console.log('[main] ready');
                                setTimeout(app.ws.api.cookie_login, 100);
                            });
                        });
                    }, 'app', 'jQuery');
                }, 'blocks', 'jQuery');
            }, 300);
        }
    }
};

$(document).ready(app.main.init);