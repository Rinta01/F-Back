const cors = require('cors');

const corsOptions = {
	origin: true,
	allowedHeaders: 'Content-Type, Authorization',
	methods: 'GET,POST,OPTIONS',
	preflightContinue: true,
};

const CORS = cors(corsOptions);
const optionsHandler = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
};

module.exports = { CORS, optionsHandler };
