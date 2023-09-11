const express = require("express");
const router = express.Router();
const RScriptRunner = require("../models/RScriptRunner");

router.get("/default", async (req, res) => {
	try {
		// Usage:
		const rScriptPath = "rscripts/goolam.R";
		const rRunner = new RScriptRunner(rScriptPath);

		const parsedData = await rRunner.run();
		console.log("cluster length:", parsedData.cluster.length);
		console.log("pred length:", parsedData.pred.length);
		const formatedData = parsedData.pred.map((cordinate, index) => {
			return {
				type: parsedData.cluster[index],
				x: cordinate[0],
				y: cordinate[1],
			};
		});

		res.send({ data: formatedData });
	} catch (error) {
		console.error(error);
		res.status(500).send("Error executing R code");
	}
});

router.post("/custom-data", async (req, res) => {
	try {
		// Usage:
		const rScriptPath = "customData.R";
		const rRunner = new RScriptRunner(rScriptPath);

		rRunner.sendData(req.body);

		const parsedData = await rRunner.run();
		console.log("Parsed Data:", parsedData);
		res.send(parsedData);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error executing R code");
	}
});

module.exports = router;
