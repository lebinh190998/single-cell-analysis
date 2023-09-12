import { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart";
import Table from "./components/Table";
import { sendRequest } from "./utils";
import LoadingIcon from "./components/LoadingIcon";
import Modal from "react-modal";

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
	const [dataType, setDataType] = useState("default");
	const [isDataModalOpen, setIsDataModalOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);

	const getData = async () => {
		setIsLoading(true);

		let jsonRes = {
			data: [],
			latent: [],
		};

		if (dataType === "default") {
			// const jsonRes = await sendRequest({
			// 	url: `${URL}/analysis/default`,
			// 	method: "GET",
			// 	headers: new Headers(),
			// 	isJson: true,
			// });
			console.log("load default");
		} else {
			if (selectedFile) {
				const formData = new FormData();
				formData.append("file", selectedFile);

				jsonRes = await sendRequest({
					url: `${URL}/analysis/custom-data`,
					method: "POST",
					headers: new Headers(),
					body: formData,
					isJson: true,
				});
			}
		}

		setData(jsonRes.data);
		setLatent(jsonRes.latent);

		setIsLoading(false);
	};

	const handleSelectData = (e) => {
		const dataType = e.target.value;

		if (dataType === "default") {
			setDataType(dataType);
		} else {
			setIsDataModalOpen(true);
		}
	};

	const handleUploadData = () => {
		setDataType("custom");
		setIsDataModalOpen(false);
	};

	useEffect(() => {
		getData();
	}, [dataType]);

	return (
		<div className="App">
			<h1>Genome Single Cell Data Visualization</h1>
			<div className="select-dataset">
				<h3>Select dataset: </h3>
				<select value={dataType} onChange={handleSelectData}>
					<option value="default">Default</option>
					<option value="custom">Custom Data</option>
				</select>
			</div>
			<Chart data={data} />
			<Table data={data} latent={latent} />
			<Modal
				isOpen={isDataModalOpen}
				onRequestClose={() => setIsDataModalOpen(false)}
				contentLabel="Custom Data"
				className="custom-modal"
				overlayClassName="custom-modal-overlay"
			>
				<div>
					<label htmlFor="width">Upload File:</label>
					<input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
				</div>
				<button onClick={handleUploadData}>Confirm</button>
				<button onClick={() => setIsDataModalOpen(false)}>Cancel</button>
			</Modal>
			{isLoading ? <LoadingIcon /> : null}
		</div>
	);
}

export default App;
