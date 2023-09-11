import { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart";
import Table from "./components/Table";
import { sendRequest } from "./utils";

const mockData = [
	{ type: 1, x: 0.5, y: 3 },
	{ type: 1, x: 1, y: 1 },
	{ type: 2, x: 1.0, y: 2 },
	{ type: 3, x: 1.5, y: 1 },
];

const URL = "http://localhost:9000";

function App() {
	const [data, setData] = useState([]);

	const getData = async () => {
		const jsonRes = await sendRequest({
			url: `${URL}/analysis/default`,
			method: "GET",
			headers: new Headers(),
			isJson: true,
		});
		console.log(jsonRes);
		setData(jsonRes.data);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			<h1>Genome Single Cell Data Visualization</h1>
			<Chart data={data} />
			<Table data={data} />
		</div>
	);
}

export default App;
