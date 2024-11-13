const user = require('./user');

const app = (app) => {
	app.use('/user', user);
}
module.exports = app;
