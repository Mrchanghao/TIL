"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginRoute_1 = require("./route/loginRoute");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ keys: ['lee'] }));
app.use(loginRoute_1.router);
app.get('/', function (req, res) {
    res.send("\n    <div>\n      <h1>Hi it's Start</h1>\n    </div>\n  ");
});
app.listen(3000, function () { return console.log('listening on 3000'); });
