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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [customWidth, setCustomWidth] = useState(600);
	const [customHeight, setCustomHeight] = useState(400);

	const typeColors = {
		1: "#FF5733",
		2: "#33FF57",
		3: "#5733FF",
	};

	const handleConfirmDownload = () => {
		const chartElement = chartRef.current;

		html2canvas(chartElement, { width: customWidth, height: customHeight }).then(
			(canvas) => {
				const chartImage = canvas.toDataURL("image/png");

				const downloadLink = document.createElement("a");
				downloadLink.href = chartImage;
				downloadLink.download = "chart.png";
				downloadLink.click();
			}
		);
	};

	const handleDownloadClick = () => {
		setIsModalOpen(true);
	};

	const handleCancelDownload = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="chart-container">
			<div className="button-container">
				<button onClick={handleDownloadClick}>
					<code>Download Chart</code>
				</button>
			</div>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
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
				<button onClick={handleConfirmDownload}>Confirm</button>
				<button onClick={handleCancelDownload}>Cancel</button>
			</Modal>
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
		</div>
	);
}

export default Chart;
