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

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
