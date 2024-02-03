const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../src/models/userModel");
const Medicine = require("../src/models/medicineModel");
const Customer = require("../src/models/customerModel");
require("dotenv").config();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

const generateUsers = async (num) => {
	for (let i = 0; i < num; i++) {
		const user = new User({
			name: faker.person.fullName(),
			username: faker.internet.userName(),
			// password: faker.internet.password(),
			password: "pass1234",
			role: faker.helpers.arrayElement(["owner", "manager", "cashier"]),
		});
		await user.save();
	}
};

const generateMedicines = async (num) => {
	for (let i = 0; i < num; i++) {
		const medicine = new Medicine({
			name: faker.commerce.productName(),
			description: faker.lorem.sentence(),
			quantity: parseInt(faker.string.numeric()),
		});
		await medicine.save();
	}
};

const generateCustomers = async (num) => {
	for (let i = 0; i < num; i++) {
		const customer = new Customer({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.streetAddress(),
			phoneNumber: faker.phone.number(),
		});
		await customer.save();
	}
};

// Generate data
const generateData = async (num) => {
	await Promise.all([
		generateUsers(num),
		generateMedicines(num),
		generateCustomers(num),
	]);
	console.log("Data generation completed.");
	try {
		await mongoose.connection.close();
		console.log("Disconnected from MongoDB");
	} catch (error) {
		console.error("Error disconnecting from MongoDB:", error);
	}
};

// Delete data
const deleteData = async () => {
	console.log("Deleting data...");
	await Promise.all([
		User.deleteMany({}),
		Medicine.deleteMany({}),
		Customer.deleteMany({}),
	]);
	console.log("Data deleted.");
	try {
		await mongoose.connection.close();
		console.log("Disconnected from MongoDB");
	} catch (error) {
		console.error("Error disconnecting from MongoDB:", error);
	}
};

// Check command line arguments
const command = process.argv[2];
const num = process.argv[3] || 5;

if (command === "generate") {
	generateData(num);
} else if (command === "delete") {
	deleteData();
} else {
	console.log('Invalid command. Use "generate" or "delete".');
}
