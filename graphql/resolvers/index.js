const authResolver = require('./auth');
const usersResolver = require('./users');
const apparelResolver = require('./apparel');

const rootResolver = {
	...authResolver,
	...usersResolver,
	...apparelResolver,
};

module.exports = rootResolver;
