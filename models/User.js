const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: [ true, 'User must have a first name.' ],
	},
	last_name: {
		type: String,
	},
	country: {
		default: 'Russia',
		type: String,
	},
	tel: {
		type: String,
		required: [ true, 'User must have a phone number.' ],
		unique: true,
		trim: true,
		index: true,
		sparse: true,
	},
	email: {
		type: String,
		trim: true,
		index: true,
		unique: true,
		sparse: true,
	},
	password: {
		type: String,
		required: [ true, 'User must have a password.' ],
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
	sex: {
		type: String,
		required: [ true, 'User must have a gender' ],
		validate: {
			validator: function (val) {
				return /Male|Female/i.test(val);
			},
			message: props => `${props.value} is not a valid gender!`,
		},
	},
	age: {
		type: Number,
	},
	wealth: {
		type: String,
		default: 'Average',
	},
	size: {
		type: String,
	},
	favBrands: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Brand',
		},
	],
	wishList: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Apparel',
		},
	],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
