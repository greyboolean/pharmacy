const express = require("express");
const customerController = require("../controllers/customerController");

const router = express.Router();

// Define routes for the root path '/'
router
	.route("/")
	.get(customerController.getAllCustomers)
	.post(customerController.createCustomer);

// Define routes for the path with Customer ID '/:id'
router
	.route("/:id")
	.get(customerController.getCustomerById)
	.patch(customerController.updateCustomer)
	.delete(customerController.deleteCustomer);

module.exports = router;
