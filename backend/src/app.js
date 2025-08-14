const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const { appRoutes } = require("./routes/appRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: "this is home route" })
});
router.get("/test", (req, res) => {
  res.status(200).json({ message: "this is test route" });
});


app.use(router);

appRoutes(app);

app.use(globalErrorHandler);
module.exports = app;
