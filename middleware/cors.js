const cors = require('cors');

const whitelist = [ 'http://localhost:3000', 'https://f-look.herokuapp.com' ];

const corsOptions = {
	origin: (origin, callback) => {
		if (!whitelist.includes(origin)) {
			callback(null, true);
		}
		else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	allowedHeaders: 'Content-Type, Authorization',
	methods: 'GET,POST,OPTIONS',
	preflightContinue: true,
	credentials: true,
};

const CORS = cors(corsOptions);
const optionsHandler = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
};

module.exports = { CORS, optionsHandler };
