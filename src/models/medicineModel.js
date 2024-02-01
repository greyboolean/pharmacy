const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	deletedAt: {
		type: Date,
		default: null,
	},
});

// // Get medicines that are not soft deleted
// medicineSchema.pre(/^find/, function (next) {
// 	this.find({ deletedAt: null });
// 	next();
// });

// Get medicines that are not soft deleted
medicineSchema.pre(/^find/, function (next) {
	if (!this.getOptions().includeSoftDeleted) {
		this.find({ deletedAt: null });
	}
	next();
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
