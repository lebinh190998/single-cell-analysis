export const sendRequest = async ({
	url,
	method = "GET",
	headers,
	body,
	isJson = false,
	isBlob = false,
}) => {
	const response = await fetch(url, { method, headers, body });
	let responseData;
	if (isJson) {
		responseData = await response.json();
	} else if (isBlob) {
		responseData = await response.blob();
	} else {
		responseData = await response.text();
	}
	return responseData;
};
