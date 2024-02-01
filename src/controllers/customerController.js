const Customer = require("../models/customerModel");

// Controller functions for customer routes
const customerController = {
	// GET all customers
	getAllCustomers: async (req, res) => {
		try {
			const customers = await Customer.find();
			res.status(200).json({
				success: true,
				data: customers,
				message: "All customers fetched successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// CREATE a new customer
	createCustomer: async (req, res) => {
		try {
			const newCustomer = await Customer.create(req.body);
			res.status(201).json({
				success: true,
				data: newCustomer,
				message: "Customer created successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// GET a single customer by ID
	getCustomerById: async (req, res) => {
		try {
			const customer = await Customer.findById(req.params.id);
			if (!customer) {
				return res.status(404).json({
					success: false,
					message: "Customer not found",
				});
			}
			res.status(200).json({
        success: true,
        data: customer,
        message: "Customer fetched successfully"
      });
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// UPDATE an existing customer
	updateCustomer: async (req, res) => {
		try {
			const updatedCustomer = await Customer.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
			if (!updatedCustomer) {
				return res.status(404).json({
					success: false,
					message: "Customer not found",
				});
			}
			res.status(200).json({
				success: true,
				data: updatedCustomer,
				message: "Customer updated successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// DELETE an customer
	deleteCustomer: async (req, res) => {
		try {
			const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
			if (!deletedCustomer) {
				return res.status(404).json({
					success: false,
					message: "Customer not found",
				});
			}
			res.status(200).json({
				success: true,
				message: "Customer deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},
};

module.exports = customerController;
