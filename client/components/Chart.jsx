import { useState } from "react";
import "./Chart.css";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
	Tooltip,
} from "recharts";

function Chart({ data }) {
	const typeColors = {
		1: "#FF5733",
		2: "#33FF57",
		3: "#5733FF",
	};

	return (
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
						fill={typeColors[entry.type]}
					/>
				))}
			</ScatterChart>
		</div>
	);
}

export default Chart;
