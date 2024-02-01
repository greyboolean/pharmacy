const Medicine = require("../models/medicineModel");

// Controller functions for medicine routes
const medicineController = {
	// GET all medicines
	getAllMedicines: async (req, res) => {
		try {
			const medicines = await Medicine.find();
			res.status(200).json({
				success: true,
				data: medicines,
				message: "All medicines fetched successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// CREATE a new medicine
	createMedicine: async (req, res) => {
		try {
			const newMedicine = await Medicine.create(req.body);
			res.status(201).json({
				success: true,
				data: newMedicine,
				message: "Medicine created successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// GET a single medicine by ID
	getMedicineById: async (req, res) => {
		try {
			const medicine = await Medicine.findById(req.params.id);
			if (!medicine) {
				return res.status(404).json({
					success: false,
					message: "Medicine not found",
				});
			}
			res.status(200).json({
        success: true,
        data: medicine,
        message: "Medicine fetched successfully"
      });
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// UPDATE an existing medicine
	updateMedicine: async (req, res) => {
		try {
			const updatedMedicine = await Medicine.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
			if (!updatedMedicine) {
				return res.status(404).json({
					success: false,
					message: "Medicine not found",
				});
			}
			res.status(200).json({
				success: true,
				data: updatedMedicine,
				message: "Medicine updated successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// DELETE an medicine
	deleteMedicine: async (req, res) => {
		try {
			const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
			if (!deletedMedicine) {
				return res.status(404).json({
					success: false,
					message: "Medicine not found",
				});
			}
			res.status(200).json({
				success: true,
				message: "Medicine deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},
};

module.exports = medicineController;
