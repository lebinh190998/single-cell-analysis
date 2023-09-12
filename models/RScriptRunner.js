const { spawn } = require("child_process");

class RScriptRunner {
	constructor(scriptPath) {
		this.scriptPath = scriptPath;
		this.customFilePath = null;
	}

	sendData(filePath) {
		this.customFilePath = filePath;
	}

	async run() {
		return new Promise(async (resolve, reject) => {
			const process = spawn("Rscript", [this.scriptPath]);
			let accumulatedData = "";

			if (this.customFilePath) {
				process.stdin.write(this.customFilePath + "\n");
			}
			process.stdin.end();

			process.stdout.on("data", (data) => {
				accumulatedData += data.toString();
			});

			process.stderr.on("data", (data) => {
				console.error(`R Error: ${data}`);
			});

			process.on("close", (code) => {
				if (code !== 0) {
					console.error(`R process exited with code ${code}`);
					reject(`R process exited with code ${code}`);
				} else {
					const receivedData = accumulatedData.trim();
					const chunks = receivedData.split("\n");
					const validChunks = chunks.filter((chunk) => chunk.includes(":"));

					let parsedData = {};

					for (const chunk of validChunks) {
						const [label, jsonChunk] = chunk.split(":");
						try {
							parsedData[label] = JSON.parse(jsonChunk);
						} catch (error) {
							console.error(`Error parsing ${label} JSON:`, error);
							parsedData[label] = jsonChunk;
						}
					}
					resolve(parsedData);
				}
			});
		});
	}
}

module.exports = RScriptRunner;
