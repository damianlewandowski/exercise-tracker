const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Load environment variables from .env.
// On production you want to specify those variables by hand.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Add routes
require("./routes")(app);

// Production
// Serve bundle created by react-scripts build
if (process.env.NODE_ENV === "production") {
  // Look for static files in "client/build" folder
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) =>
    res.sendfile(path.join(__dirname, "client/build/index.html"))
  );
}

app.listen(PORT, () => `Server running on port ${PORT}`);
