const express = require("express");
const medicineController = require("../controllers/medicineController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Define routes for the root path '/'
router
	.route("/")
	.get(medicineController.getAllMedicines)
	.post(
		authController.restrictTo("owner"),
		medicineController.createMedicine
	);

// Define routes for the path with Medicine ID '/:id'
router
	.route("/:id")
	.get(medicineController.getMedicineById)
	.patch(
		authController.restrictTo("owner", "manager", "cashier"),
		medicineController.updateMedicine
	);
// .delete(medicineController.deleteMedicine);

// Defie routes for soft and hard medicine delete
router
	.route("/:id/soft")
	.delete(
		authController.restrictTo("owner", "manager"),
		medicineController.deleteMedicineSoft
	);
router
	.route("/:id/hard")
	.delete(
		authController.restrictTo("owner"),
		medicineController.deleteMedicineHard
	);

module.exports = router;
