/* UT TICKET EXCHANGE */
// client utilities

window.utils = {
    mobile: _ => {
        return jQuery.browser.mobile;
    },
    is: { // match types
        null: function (v) { return (v == null); },
        eqnull: function (v) { return (v === null); },
        undef: function (v) { return (v == undefined); },
        set: function (v) { return (v != undefined && v !== null); },
        unset: function (v) { return (v == undefined || v === null); },
        str: function (v) { return (v !== null && v != undefined && (typeof v == 'string' || v instanceof String)); },
        func: function (v) { return (v !== null && v != undefined && (typeof v == 'function' || v instanceof Function)); },
        node: function (v) { return (v !== null && v != undefined && (typeof v == 'object' || v instanceof Object) && v instanceof Node); },
        elem: function (v) { return (v !== null && v != undefined && (typeof v == 'object' || v instanceof Object) && v instanceof Node && v instanceof Element); },
        arr: function (v) { return (v !== null && v != undefined && (typeof v == 'array' || v instanceof Array)); },
        obj: function (v) { return (v !== null && v != undefined && (typeof v == 'object' || v instanceof Object)); },
        int: function (v) { return (v !== null && v != undefined && (v === parseInt(v, 10) && !isNaN(v))); },
        type: function (v, t) { return (typeof v == t); }
    },
    cookie: (id, val, date) => {
        if (util.is.unset(val))
            document.cookie.split('; ').forEach(cookie => {
                if (cookie.substring(0, id.length) == id)
                    val = cookie.substring(id.length + 1);
            });
        else {
            if (date == '__indefinite__')
                date = 'Fri, 31 Dec 9999 23:59:59 GMT';
            document.cookie =
                id +
                '=' +
                val +
                (util.is.set(date) ? '; expires=' + date : '');
        }
        return util.is.unset(val) ? null : val;
    },
    delete_cookie: id => {
        util.cookie(id, '', 'Thu, 01 Jan 1970 00:00:00 GMT');
    },
    sha256: (str, callback) => {
        if (callback) callback(window.sha256(str));
    },
    sha256_secure: (str, callback) => { // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
        const msgUint8 = new TextEncoder("utf-8").encode(str);
        const hashBuffer_promise = crypto.subtle.digest('SHA-256', msgUint8);
        hashBuffer_promise.then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            if (callback) callback(hashHex);
        });
    },
    lpad: (s, width, char) => {
        return (s.length >= width) ? (s) : ((new Array(width).join(char) + s).slice(-width));
    },
    capitalize: word => {
        return (word.charAt(0).toUpperCase()) + (word.slice(1));
    },
    duration_desc: last_timestamp => {
        if (last_timestamp < 0) return "";
        var deltaSec = parseInt(Date.now() / 1000) - parseInt(last_timestamp / 1000);
        if (deltaSec < 0) {
            deltaSec = 0;
        }
        var outputString = "";
        if (deltaSec < 5) {
            outputString += "now";
        } else if (deltaSec < 60) {
            outputString += "" + parseInt(Math.floor(parseFloat(deltaSec) / 5.0) * 5.0) + " seconds ago";
        } else if (deltaSec < 3600) {
            var mins = parseInt(deltaSec / 60);
            if (mins == 1) {
                outputString += "" + mins + " minute ago";
            } else {
                outputString += "" + mins + " minutes ago";
            }
        } else {
            var hrs = parseInt(deltaSec / 3600);
            if (hrs == 1) {
                outputString += "" + hrs + " hour ago";
            } else {
                outputString += "" + hrs + " hours ago";
            }
        }
        return outputString;
    },
    // generate random integer (max&min-inclusive)
    rand_int_inclusive: (low, high) => {
        // both inclusive
        return (Math.floor(Math.random() * (high - low + 1)) + low);
    },
    // generate random integer (max-exclusive & min-inclusive)
    rand_int: (min, max) => {
        // min inclusive, max exclusive
        return Math.floor(Math.random() * (max - min) + min);
    },
    delay: (callback, timeout) => {
        setTimeout(_ => { callback(); }, timeout);
    },
    logger: (module, err = false) => {
        return (...args) => {
            args = Array.prototype.slice.call(args);
            args.unshift(`[${module}]`);
            target = err ? console.error : console.log;
            target.apply(null, args);
        };
    },
    is_alphanum_str: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    is_alphanum: (str) => { // check if alphanumeric
        for (var i = 0; i < str.length; i++) {
            if (!util.is_alphanum_str.includes(str[i]))
                return false;
        }
        return true;
    },
    node: (tag) => { // create element
        return document.createElement(tag);
    },
    inArr: (element, array) => { // search array
        return array.indexOf(element) > -1;
    },
    set: (object, path, value) => { // recursively set field within object
        // nb. path should be an array
        // ie. dont pass path="a/b/c", rather pass path=["a","b","c"]
        if (path.length == 1) {
            object[path[0]] = value;
            return object;
        } else if (path.length > 1)
            return util.set(object[path[0]], path.slice(1), value);
    },
    get: (object, path) => { // recursively get field from within object
        // nb. see note in above function "set" for path format
        if (path.length == 1)
            return object[path[0]]
        else if (path.length > 1)
            return util.get(object[path[0]], path.slice(1));
    }
};