import { useState } from "react";
import "./App.css";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
	Tooltip,
} from "recharts";

function App() {
	const data = [
		{ type: 1, x: 0.5, y: 3 },
		{ type: 2, x: 1.0, y: 2 },
		{ type: 3, x: 1.5, y: 1 },
	];

	const typeColors = {
		1: "#FF5733",
		2: "#33FF57",
		3: "#5733FF",
	};

	return (
		<div className="App">
			<h1>Genome Single Cell Data Visualization</h1>
			<div className="chart-container">
				<ScatterChart width={600} height={400}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" dataKey="x" name="Gene 1" />
					<YAxis type="number" dataKey="y" name="Gene 2" />
					<Tooltip />
					<Legend />
					{data.map((entry, index) => (
						<Scatter
							key={index}
							name={`Type ${entry.type}`}
							data={[entry]}
							fill={typeColors[entry.type]} // Set the fill color based on type
						/>
					))}
				</ScatterChart>
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>Type</th>
							<th>Gene 1</th>
							<th>Gene 2</th>
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
		</div>
	);
}

export default App;
