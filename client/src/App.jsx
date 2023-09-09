import { useState } from "react";
import "./App.css";
import Chart from "../components/Chart";
import Table from "../components/Table";

function App() {
	const data = [
		{ type: 1, x: 0.5, y: 3 },
		{ type: 2, x: 1.0, y: 2 },
		{ type: 3, x: 1.5, y: 1 },
	];

	return (
		<div className="App">
			<h1>Genome Single Cell Data Visualization</h1>
			<Chart data={data} />
			<Table data={data} />
		</div>
	);
}

export default App;
