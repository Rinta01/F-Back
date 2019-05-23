const Apparel = require('../../models/Apparel');

module.exports = {
	findApparel: async ({ itemArticle }) => {
		const item = await Apparel.findOne({ article: itemArticle }, (err, res) => {
			if (err) {
				console.log(err);
			}
			else if (!res) {
				throw new Error('Not found!');
			}
		});
		return item;
	},
	allApparel: async () => {
		const apparel = await Apparel.find({});
		return apparel;
	},
	recommended: async ({ itemId }) => {
		const apparel = await Apparel.findById(itemId);
		const { category, color } = apparel;
		const recommendedItems = await Apparel.find({ category, color });
		// const recommendedApparel = recommendedItems.map(a => {
		// 	foundBrand = Brand.findById(a.brand);
		// 	// console.log(foundBrand);
		// 	return { ...a._doc, id: a._id, brand: foundBrand };
		// });
		console.log(recommendedItems);
		return recommendedItems;
	},
	addApparel: async ({ apparelInput }) => {
		try {
			const existingApparel = await Apparel.findOne({
				article: apparelInput.article,
			});
			if (existingApparel) {
				throw new Error('Item exists already.');
			}
			let processedMaterials = [];
			if (apparelInput.materials.length) {
				processedMaterials = apparelInput.materials.map(m => ({
					name: m.name,
					share: `${m.share}%`,
				}));
			}
			const item = new Apparel({
				...apparelInput,
				brand: { brandName: apparelInput.brand },
				materials: processedMaterials,
			});
			const savedItem = await item.save();
			return savedItem;
		} catch (err) {
			throw err;
		}
	},
};
