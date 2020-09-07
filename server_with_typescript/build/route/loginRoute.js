"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.redirect('/');
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (_, res) {
    // res.send('hi login route');
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>EMAIL</label>\n        <input name=\"email\" />\n      </div>\n      <div>\n      <label>password</label>\n      <input name=\"password\" type=\"password\" />\n    </div>\n    <button>submit</button>\n    </form>\n  ");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'lee@gmail.com' && password === '123') {
        // redirect to root route
        req.session = { loggedIn: true };
        res.redirect('/');
        //상태 저장
    }
    else {
        res.send('invalid email or password');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div><h1>Loged In</h1></div>\n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div><h1>Not login</h1></div>\n        <a href=\"/login\">Login</a>\n      </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send("\n    <div>welcome to Protected Route</div>\n  ");
});
