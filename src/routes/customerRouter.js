const express = require("express");
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Define routes for the root path '/'
router
	.route("/")
	.get(customerController.getAllCustomers)
	.post(
		authController.restrictTo("owner"),
		customerController.createCustomer
	);

// Define routes for the path with Customer ID '/:id'
router
	.route("/:id")
	.get(customerController.getCustomerById)
	.patch(
		authController.restrictTo("owner", "manager", "cashier"),
		customerController.updateCustomer
	);
// .delete(customerController.deleteCustomer);

// Defie routes for soft and hard customer delete
router
	.route("/:id/soft")
	.delete(
		authController.restrictTo("owner", "manager"),
		customerController.deleteCustomerSoft
	);
router
	.route("/:id/hard")
	.delete(
		authController.restrictTo("owner"),
		customerController.deleteCustomerHard
	);

module.exports = router;
