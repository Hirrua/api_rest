"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _errormiddlewarejs = require('./middlewares/error.middleware.js'); var _errormiddlewarejs2 = _interopRequireDefault(_errormiddlewarejs);
var _routesjs = require('./routes/routes.js'); var _routesjs2 = _interopRequireDefault(_routesjs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

_dotenv2.default.config()

const app = _express2.default.call(void 0, )
const port = process.env.PORT

app.use(_express2.default.urlencoded({ extended: true }))
app.use(_express2.default.json())
app.use(_express2.default.static(_path2.default.resolve(__dirname, "uploads")))

app.use(_errormiddlewarejs2.default)
app.use(_routesjs2.default)

app.listen(port)