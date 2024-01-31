const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Define routes for the root path '/'
router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);

// Define routes for the path with User ID '/:id'
router
	.route("/:id")
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
