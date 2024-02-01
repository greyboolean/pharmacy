const User = require("../models/userModel");

// Controller functions for user routes
const userController = {
	// GET all users
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find();
			res.status(200).json({
				success: true,
				data: users,
				message: "All users fetched successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// CREATE a new user
	createUser: async (req, res) => {
		try {
			const newUser = await User.create(req.body);
			res.status(201).json({
				success: true,
				data: newUser,
				message: "User created successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// GET a single user by ID
	getUserById: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			res.status(200).json({
        success: true,
        data: user,
        message: "User fetched successfully"
      });
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// UPDATE an existing user
	updateUser: async (req, res) => {
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
			if (!updatedUser) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			res.status(200).json({
				success: true,
				data: updatedUser,
				message: "User updated successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// DELETE an user
	deleteUser: async (req, res) => {
		try {
			const deletedUser = await User.findByIdAndDelete(req.params.id);
			if (!deletedUser) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},
};

module.exports = userController;
