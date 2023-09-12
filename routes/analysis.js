const express = require("express");
const multer = require("multer");
const RScriptRunner = require("../models/RScriptRunner");
const utils = require("../utils");

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

router.get("/default", async (req, res) => {
	try {
		// Usage:
		const rScriptPath = "rscripts/goolam.R";
		const rRunner = new RScriptRunner(rScriptPath);

		const parsedData = await rRunner.run();

		res.status(200).send({
			data: utils.mergePredClusterData(parsedData.pred, parsedData.cluster),
			latent: parsedData.latent ?? [],
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error executing R code");
	}
});

router.post("/custom-data", upload.single("file"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send("No file uploaded.");
		}
		const rScriptPath = "rscripts/custom.R";
		const rRunner = new RScriptRunner(rScriptPath);

		rRunner.sendData(req.file.path);

		const parsedData = await rRunner.run();

		res.status(200).send({
			data: utils.mergePredClusterData(parsedData.pred, parsedData.cluster),
			latent: parsedData.latent ?? [],
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error executing R code");
	}
});

module.exports = router;
