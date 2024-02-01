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
			const { name, username, password, role } = req.body;

			// Validate request body
			if (!name || !username || !password || !role) {
				return res.status(400).json({
					success: false,
					message: "Name, username, password, and role are required",
				});
			}

			// Check if user already exists
			const existingUser = await User.findOne({ username });
			if (existingUser) {
				return res.status(409).json({
					success: false,
					message: "Username already exists",
				});
			}

			const newUser = await User.create(req.body);
			newUser.password = undefined;
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
				message: "User fetched successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// // UPDATE an existing user
	// updateUser: async (req, res) => {
	// 	try {
	// 		const updatedUser = await User.findByIdAndUpdate(
	// 			req.params.id,
	// 			req.body,
	// 			{ new: true }
	// 		);
	// 		if (!updatedUser) {
	// 			return res.status(404).json({
	// 				success: false,
	// 				message: "User not found",
	// 			});
	// 		}
	// 		res.status(200).json({
	// 			success: true,
	// 			data: updatedUser,
	// 			message: "User updated successfully",
	// 		});
	// 	} catch (error) {
	// 		res.status(500).json({
	// 			success: false,
	// 			message: error.message,
	// 		});
	// 	}
	// },

	// With password modification
	// UPDATE an existing user
	updateUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id).select("+password");
			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			// Update the fields
			Object.assign(user, req.body);

			const updatedUser = await user.save();
			updatedUser.password = undefined;
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

	// // DELETE a user
	// deleteUser: async (req, res) => {
	// 	try {
	// 		const deletedUser = await User.findByIdAndDelete(req.params.id);
	// 		if (!deletedUser) {
	// 			return res.status(404).json({
	// 				success: false,
	// 				message: "User not found",
	// 			});
	// 		}
	// 		res.status(200).json({
	// 			success: true,
	// 			message: "User deleted successfully",
	// 		});
	// 	} catch (error) {
	// 		res.status(500).json({
	// 			success: false,
	// 			message: error.message,
	// 		});
	// 	}
	// },

	// Soft DELETE a user
	deleteUserSoft: async (req, res) => {
		try {
			const deletedUser = await User.findOne({
				_id: req.params.id,
				deletedAt: null,
			});
			if (!deletedUser) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			deletedUser.deletedAt = new Date();
			await deletedUser.save();
			res.status(200).json({
				success: true,
				message: "User soft deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// Hard DELETE a user
	deleteUserHard: async (req, res) => {
		try {
			const deletedUser = await User.findByIdAndDelete(
				{ _id: req.params.id },
				{ includeSoftDeleted: true }
			);
			if (!deletedUser) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			res.status(200).json({
				success: true,
				message: "User hard deleted successfully",
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
