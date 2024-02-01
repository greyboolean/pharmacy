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
	.patch(userController.updateUser);
// .delete(userController.deleteUser);

// Defie routes for soft and hard user delete
router.route("/:id/soft").delete(userController.deleteUserSoft);
router.route("/:id/hard").delete(userController.deleteUserHard);

module.exports = router;
