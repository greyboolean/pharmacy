const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Load environment variables from .env file
require("dotenv").config();
const userRouter = require("./src/routes/userRouter");
const medicineRouter = require("./src/routes/medicineRouter");
const customerRouter = require("./src/routes/customerRouter");

const app = express();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/customers", customerRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
