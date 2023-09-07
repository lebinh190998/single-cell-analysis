const { spawn } = require("child_process");

class RScriptRunner {
	constructor(scriptPath) {
		this.scriptPath = scriptPath;
		this.dataToSend = [];
		this.parsedData = {};
		this.process = null;
	}

	sendData(data) {
		this.dataToSend.push(data);
	}

	async run() {
		this.process = spawn("Rscript", [this.scriptPath]);

		for (const data of this.dataToSend) {
			this.process.stdin.write(JSON.stringify(data) + "\n");
		}
		this.process.stdin.end();

		await new Promise((resolve) => {
			this.process.stdout.on("data", (data) => {
				const receivedData = data.toString().trim();
				const chunks = receivedData.split("\n");
				const validChunks = chunks.filter((chunk) => chunk.includes(":"));

				for (const chunk of validChunks) {
					const [label, jsonChunk] = chunk.split(":");
					this.handleJSONData(label, jsonChunk);
				}
			});

			this.process.stderr.on("data", (data) => {
				console.error(`R Error: ${data}`);
			});

			this.process.on("close", (code) => {
				if (code !== 0) {
					console.error(`R process exited with code ${code}`);
				}
				resolve();
			});
		});
	}

	handleJSONData(label, jsonChunk) {
		try {
			this.parsedData[label] = JSON.parse(jsonChunk);
		} catch (error) {
			console.error(`Error parsing ${label} JSON:`, error);
		}
	}
}

module.exports = RScriptRunner;
