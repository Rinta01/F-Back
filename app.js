const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const isAuth = require('./middleware/is-auth');
const rootValue = require('./graphql/resolvers');
const session = require('express-session');
const { CORS, optionsHandler } = require('./middleware/cors');
const { atlasUri } = require('./config/mongo_config');
const errorHandler = require('errorhandler');

const PORT = process.env.PORT || 4000;
const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(CORS, optionsHandler);
app.use(isAuth);
app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));
app.get('/test', function (req, res) {
	res.redirect('/graphql');
});

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'f-auth', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
	app.use(errorHandler());
}

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;
mongoose.connection.once('open', () => {
	console.log('Successfully connected to MongoDB!');
});
mongoose
	.connect(atlasUri, { useNewUrlParser: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Now listening on port ${PORT}`);
		});
	})
	.catch(err => {
		console.log(err);
	});
