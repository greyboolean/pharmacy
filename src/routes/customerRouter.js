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
	.patch(customerController.updateCustomer);
// .delete(customerController.deleteCustomer);

// Defie routes for soft and hard customer delete
router.route("/:id/soft").delete(customerController.deleteCustomerSoft);
router.route("/:id/hard").delete(customerController.deleteCustomerHard);

module.exports = router;
