const { spawn } = require("child_process");

class RScriptRunner {
	constructor(scriptPath) {
		this.scriptPath = scriptPath;
		this.dataToSend = [];
	}

	sendData(data) {
		this.dataToSend.push(data);
	}

	async run() {
		return new Promise(async (resolve, reject) => {
			const process = spawn("Rscript", [this.scriptPath]);
			let parsedData = {};

			for (const data of this.dataToSend) {
				process.stdin.write(JSON.stringify(data) + "\n");
			}
			process.stdin.end();

			process.stdout.on("data", (data) => {
				const receivedData = data.toString().trim();
				const chunks = receivedData.split("\n");
				const validChunks = chunks.filter((chunk) => chunk.includes(":"));

				for (const chunk of validChunks) {
					const [label, jsonChunk] = chunk.split(":");
					try {
						parsedData[label] = JSON.parse(jsonChunk);
					} catch (error) {
						console.error(`Error parsing ${label} JSON:`, error);
					}
				}
			});

			process.stderr.on("data", (data) => {
				console.error(`R Error: ${data}`);
			});

			process.on("close", (code) => {
				if (code !== 0) {
					console.error(`R process exited with code ${code}`);
					reject(`R process exited with code ${code}`);
				}else{
					resolve(parsedData)
				}
			});
		});
	}
}

module.exports = RScriptRunner;
