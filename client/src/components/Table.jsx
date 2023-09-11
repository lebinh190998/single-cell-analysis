import { useState } from "react";
import "./Table.css";

function Table({ data, latent }) {
	const handleDownloadData = () => {
		// Set up data
		const tsvData = `type\tx\ty\n${data
			.map((row) => `${row.type}\t${row.x}\t${row.y}`)
			.join("\n")}`;

		const blob = new Blob([tsvData], { type: "text/tsv" });

		// Create download link and trigger download
		const a = document.createElement("a");
		a.href = window.URL.createObjectURL(blob);
		a.download = "data.tsv";
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();

		// Clean up
		document.body.removeChild(a);
	};

	const handleDownloadLatent = () => {
		// Set up data
		const tsvData = latent.map((row) => row.join("\t")).join("\n");

		const blob = new Blob([tsvData], { type: "text/tsv" });

		// Create download link and trigger download
		const a = document.createElement("a");
		a.href = window.URL.createObjectURL(blob);
		a.download = "latent.tsv";
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();

		// Clean up
		document.body.removeChild(a);
	};

	return (
		<div className="table-container">
			<div className="button-container">
				<button onClick={handleDownloadData}>
					<code>Download Data</code>
				</button>
				<button onClick={handleDownloadLatent}>
					<code>Download Latent</code>
				</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Gene X</th>
						<th>Gene Y</th>
					</tr>
				</thead>
				<tbody>
					{data.map((entry, index) => (
						<tr key={index}>
							<td>{`Type ${entry.type}`}</td>
							<td>{entry.x}</td>
							<td>{entry.y}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
