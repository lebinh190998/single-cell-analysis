import { useState } from "react";
import "./Table.css";

function Table({ data }) {
	return (
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
	);
}

export default Table;
