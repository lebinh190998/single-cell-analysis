import React, { memo } from "react";
import "./LoadingIcon.css";
import spinner from "../assets/spinner.svg";

const LoadingIcon = () => {
	return (
		<div className="loading-container">
			<div className="loading-icon">
				<img className="icon-image" draggable={false} src={spinner} />
			</div>
			<h3>Loading...</h3>
		</div>
	);
};

export default memo(LoadingIcon);
