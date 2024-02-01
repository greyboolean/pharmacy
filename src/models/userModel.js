const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	role: {
		type: String,
		enum: ["owner", "manager", "cashier"],
		default: "user",
	},
	deletedAt: {
		type: Date,
		default: null,
	},
});

// Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
