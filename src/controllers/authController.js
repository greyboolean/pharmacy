const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (user) => {
	// Generate jwt token
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	// Define options for cookie
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	// Return token and options
	return { token, options };
};

const authController = {
	// // Signup
	// signup: async (req, res) => {
	// 	try {
	// 		// Get user input
	// 		const { name, username, password } = req.body;
	// 		if (!name || !username || !password) {
	// 			return res.status(400).json({
	// 				success: false,
	// 				message: "Name, username, and password are required",
	// 			});
	// 		}

	// 		// Check if user already exists
	// 		const existingUser = await User.findOne({ username });
	// 		if (existingUser) {
	// 			return res.status(409).json({
	// 				success: false,
	// 				message: "Username already exists",
	// 			});
	// 		}

	// 		// Save user to database
	// 		const newUser = User.create(req.body);

	// 		// Remove password from output
	// 		newUser.password = undefined;

	// 		// Generate JWT token
	// 		const token = generateToken(newUser);

	// 		// Return the token
	// 		res.status(201).json({
	// 			success: true,
	// 			token,
	// 			data: newUser,
	// 			message: "User created successfully",
	// 		});
	// 	} catch (error) {
	// 		res.status(500).json({
	// 			success: false,
	// 			message: error.message,
	// 		});
	// 	}
	// },

	// Login
	login: async (req, res) => {
		try {
			// Get user input
			const { username, password } = req.body;
			if (!username || !password) {
				return res.status(400).json({
					success: false,
					message: "Username and password are required",
				});
			}

			// Find the user in the database
			const user = await User.findOne({ username }).select("+password");

			// Compare passwords
			const isPasswordValid = await bcrypt.compare(
				password,
				user.password
			);

			if (!user || !isPasswordValid) {
				return res.status(401).json({
					success: false,
					message: "Invalid username or password",
				});
			}

			// Remove password from output
			user.password = undefined;

			// Generate JWT token
			const { token, options } = generateToken(user);

			// Set cookie
			res.cookie("jwt", token, options);

			// Return the token
			res.status(200).json({
				success: true,
				token,
				data: user,
				message: "User logged in successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// Logout
	logout: (req, res) => {
		// Remove cookie
		res.cookie("jwt", "", { maxAge: 1, httpOnly: true });

		// Return success message
		res.status(200).json({
			success: true,
			message: "User logged out successfully",
		});
	},
};

module.exports = authController;
