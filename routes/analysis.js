// routes/analysis.js
/**
 * @swagger
 * /analysis:
 *   get:
 *     summary: Get single-cell data
 *     responses:
 *       200:
 *         description: Single-cell data
 */
const express = require("express");
const router = express.Router();
const RScriptRunner = require("../models/RScriptRunner");

router.get("/", (req, res) => {
	try {
		// Usage:
		const rScriptPath = "goolam.R";
		const rRunner = new RScriptRunner(rScriptPath);

		const dataToR = {
			name: "Le Binh",
			description: "This is a test data object",
		};

		rRunner.sendData(dataToR);

		rRunner.run().then(() => {
			// Access the parsed data
			console.log("Parsed Data:", rRunner.parsedData);
			res.send(rRunner.parsedData);
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error executing R code");
	}
});

module.exports = router;
