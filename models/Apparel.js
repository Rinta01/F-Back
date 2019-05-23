const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApparelSchema = new Schema({
	article: {
		type: String,
		required: [ true, 'An item must have an article' ],
		unique: true,
	},
	brand: {
		type: String,
		required: [ true, 'An item must belong to a brand' ],
	},
	name: {
		type: String,
	},
	//Unisex!!!
	sex: {
		type: String,
		required: [ true, 'An item must be for men/women or unisex' ],
		validate: {
			validator: function (val) {
				return /Male|Female|Unisex/i.test(val);
			},
			message: props => `${props.value} is not a valid property for this item!`,
		},
	},
	category: {
		type: String,
		required: [ true, 'An item must have a category' ],
	},
	//the most prevailed material
	materials: [
		{
			name: {
				type: String,
				required: [ true, 'Material name is required' ],
			},
			share: {
				type: String,
				required: [ true, 'Material share is required' ],
			},
		},
	],
	color: {
		type: String,
		required: [ true, 'An item must have a primary color' ],
	},
	price: {
		type: Number,
		required: [ true, 'An item must have a price' ],
	},
	image: {
		type: String,
		default: 'https://via.placeholder.com/150?text=Missing+item',
	},
	source: {
		type: String,
		required: [ true, 'An item must have a source url' ],
	},
});

const Apparel = mongoose.model('Apparel', ApparelSchema);

module.exports = Apparel;
