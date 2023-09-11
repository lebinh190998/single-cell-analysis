const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const swaggerDocument = require("./swagger.json");

const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
};

app.use(cors(corsOptions));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/analysis", require("./routes/analysis"));

// Define your API routes
app.get("/", (req, res) => {
	res.send("Welcome to your API!");
});

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
