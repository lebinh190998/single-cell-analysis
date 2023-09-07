const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;

const swaggerSpec = swaggerJsdoc({
	swaggerDefinition: {
		info: {
			title: "Your API Documentation",
			version: "1.0.0",
			description: "Documentation for your RESTful API",
		},
		basePath: "/",
	},
	apis: ["./routes/*.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/analysis", require("./routes/analysis"));

// Define your API routes
app.get("/", (req, res) => {
	res.send("Welcome to your API!");
});

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
