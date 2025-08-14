const express = require("express");

const adminRoutes = require("./admin.routes");
const userRoutes = require("./user.routes");
const webRoutes = require("./web.routes");

exports.appRoutes = (app) => {
  app.use("/public", express.static("public"));
  app.use("/api/admin", adminRoutes);
  app.use("/api/user", userRoutes)
  app.use("/api/web", webRoutes)
};
