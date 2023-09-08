const express = require("express");
const router = express.Router();
const RScriptRunner = require("../models/RScriptRunner");

router.get("/default", (req, res) => {
	try {
		// Usage:
		const rScriptPath = "rscripts/goolam.R";
		const rRunner = new RScriptRunner(rScriptPath);

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

router.post("/custom-data", (req, res) => {
	try {
		// Usage:
		const rScriptPath = "customData.R";
		const rRunner = new RScriptRunner(rScriptPath);

		rRunner.sendData(req.body);

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
