import { useState, useRef } from "react";
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
import html2canvas from "html2canvas";
import Modal from "react-modal";

function Chart({ data }) {
	const chartRef = useRef(null);
	const [dataType, setDataType] = useState("default");

	const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
	const [isDataModalOpen, setIsDataModalOpen] = useState(false);

	const [customWidth, setCustomWidth] = useState(600);
	const [customHeight, setCustomHeight] = useState(400);

	const typeColors = {
		1: "#FF5733",
		2: "#33FF57",
		3: "#5733FF",
	};

	const handleUploadData = () => {
		alert("Upload Data");

		setIsDataModalOpen(false);
	};

	const handleDownloadChart = () => {
		const chartElement = chartRef.current;

		html2canvas(chartElement, { width: customWidth, height: customHeight }).then(
			(canvas) => {
				const chartImage = canvas.toDataURL("image/png");

				const downloadLink = document.createElement("a");
				downloadLink.href = chartImage;
				downloadLink.download = "chart.png";
				downloadLink.click();

				// Clean up
				document.body.removeChild(downloadLink);
			}
		);

		setIsDownloadModalOpen(false);
	};

	const handleSelectData = (e) => {
		const dataType = e.target.value;

		setDataType(dataType);

		if (dataType === "custom") {
			setIsDataModalOpen(true);
		}
	};

	return (
		<div className="chart-container">
			<div className="button-container">
				<select value={dataType} onChange={handleSelectData}>
					<option value="default">Default</option>
					<option value="custom">Custom Data</option>
				</select>
				<button onClick={() => setIsDownloadModalOpen(true)}>
					<code>Download Chart</code>
				</button>
			</div>
			<div ref={chartRef}>
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
			<Modal
				isOpen={isDownloadModalOpen}
				onRequestClose={() => setIsDownloadModalOpen(false)}
				contentLabel="Custom Chart Dimensions"
				className="custom-modal"
				overlayClassName="custom-modal-overlay"
			>
				<div>
					<label htmlFor="width">Width:</label>
					<input
						type="number"
						id="width"
						value={customWidth}
						onChange={(e) => setCustomWidth(Number(e.target.value))}
					/>
				</div>
				<div>
					<label htmlFor="height">Height:</label>
					<input
						type="number"
						id="height"
						value={customHeight}
						onChange={(e) => setCustomHeight(Number(e.target.value))}
					/>
				</div>
				<button onClick={handleDownloadChart}>Confirm</button>
				<button onClick={() => setIsDownloadModalOpen(false)}>Cancel</button>
			</Modal>
			<Modal
				isOpen={isDataModalOpen}
				onRequestClose={() => setIsDataModalOpen(false)}
				contentLabel="Custom Data"
				className="custom-modal"
				overlayClassName="custom-modal-overlay"
			>
				<div>
					<label htmlFor="width">Upload File:</label>
					<input
						type="number"
						id="width"
						value={customWidth}
						onChange={(e) => setCustomWidth(Number(e.target.value))}
					/>
				</div>
				<button onClick={handleUploadData}>Confirm</button>
				<button onClick={() => setIsDataModalOpen(false)}>Cancel</button>
			</Modal>
		</div>
	);
}

export default Chart;
