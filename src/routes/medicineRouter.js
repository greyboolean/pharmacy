const express = require("express");
const medicineController = require("../controllers/medicineController");

const router = express.Router();

// Define routes for the root path '/'
router
	.route("/")
	.get(medicineController.getAllMedicines)
	.post(medicineController.createMedicine);

// Define routes for the path with Medicine ID '/:id'
router
	.route("/:id")
	.get(medicineController.getMedicineById)
	.patch(medicineController.updateMedicine)
	.delete(medicineController.deleteMedicine);

module.exports = router;
