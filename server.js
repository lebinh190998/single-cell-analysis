const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const swaggerDocument = require("./swagger.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/analysis", require("./routes/analysis"));

// Define your API routes
app.get("/", (req, res) => {
	res.send("Welcome to your API!");
});

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
