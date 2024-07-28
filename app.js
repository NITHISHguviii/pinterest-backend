const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const AdminRoutes = require("./Routes/admin");
const ClientRoutes = require("./Routes/client");
const Image = require("./Routes/image");
require("dotenv").config();
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // Enable pre-flight requests for all routes
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(AdminRoutes);
app.use(ClientRoutes);
app.use(Image);
app.listen(4000, () => {
  console.log("Server started 4000");
});
