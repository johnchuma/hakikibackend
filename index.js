//Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sendMessage } = require("./utils/send_sms");
const { successResponse, errorResponse } = require("./utils/responses");
const addPrefixToPhoneNumber = require("./utils/add_number_prefix");
const UserRoutes = require("./modules/users/users.routes");
const ProductRoutes = require("./modules/products/products.routes");
const LotsRoutes = require("./modules/lots/lots.routes");
const BatchesRoutes = require("./modules/batches/batches.routes");
const DistributerProductRoutes = require("./modules/distributerProducts/distributerProducts.routes");
const FarmerProductRoutes = require("./modules/farmerProducts/farmerProducts.routes");
const QRCode = require("qrcode");
//Initiate express
const app = express();

//Middlewares
app.use("/files", express.static("files"));
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "/" }));

//Routes
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/lots", LotsRoutes);
app.use("/batches", BatchesRoutes);
app.use("/farmerProducts", FarmerProductRoutes);
app.use("/distributerProducts", DistributerProductRoutes);
app.get("/", async (req, res) => {
  try {
    const code = await QRCode.toDataURL(
      "adfjla-andflad-adnfladf-adfnjadf-andlfa"
    );
    successResponse(res, code);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
});
//Spin server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
