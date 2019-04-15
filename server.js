const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

//
// Production
//
if (process.env.NODE_ENV === "production") {
  // Look for static files in "client/build" folder
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) =>
    res.sendfile(path.join(__dirname, "client/build/index.html"))
  );
}

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" }
  ];

  res.json(customers);
});

app.listen(PORT, () => `Server running on port ${PORT}`);
