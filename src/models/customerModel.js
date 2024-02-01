const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	deletedAt: {
		type: Date,
		default: null,
	},
});

// // Get customers that are not soft deleted
// customerSchema.pre(/^find/, function (next) {
// 	this.find({ deletedAt: null });
// 	next();
// });

// Get customers that are not soft deleted
customerSchema.pre(/^find/, function (next) {
	if (!this.getOptions().includeSoftDeleted) {
		this.find({ deletedAt: null });
	}
	next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
