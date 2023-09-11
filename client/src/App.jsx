import { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart";
import Table from "./components/Table";
import { sendRequest } from "./utils";
import LoadingIcon from "./components/LoadingIcon";

const mockData = [
	{ type: 1, x: 0.5, y: 3 },
	{ type: 1, x: 1, y: 1 },
	{ type: 2, x: 1.0, y: 2 },
	{ type: 3, x: 1.5, y: 1 },
];

const URL = "http://localhost:9000";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [latent, setLatent] = useState([]);

	const getData = async () => {
		setIsLoading(true);

		const jsonRes = await sendRequest({
			url: `${URL}/analysis/default`,
			method: "GET",
			headers: new Headers(),
			isJson: true,
		});
		setData(jsonRes.data);
		setLatent(jsonRes.latent);

		setIsLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			<h1>Genome Single Cell Data Visualization</h1>
			<Chart data={data} />
			<Table data={data} latent={latent} />
			{isLoading ? <LoadingIcon /> : null}
		</div>
	);
}

export default App;
