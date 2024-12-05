const user = require('./user');
const login = require('./login');
const verify = require('../controller/verify')
const app = (app) => {
	app.use('/login', login);
	app.use('*', verify.VerifyToken);
	app.use('/user', user);
}
module.exports = app;
