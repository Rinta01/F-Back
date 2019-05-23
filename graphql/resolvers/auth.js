const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = {
	login: async ({ tel, password }, req, res) => {
		console.log('LOGGING IN');
		const user = await User.findOne({ tel });
		if (!user) {
			throw new Error('User does not exist!');
		}
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			throw new Error('Password is incorrect!');
		}
		const token = jwt.sign(
			{
				userId: user.id,
				tel: user.tel,
				email: user.email,
			},
			'welcomefellowmemer',
			{
				expiresIn: '1h',
			},
		);
		return {
			userId: user.id,
			token: token,
			tokenExpiration: 1,
		};
	},
};
