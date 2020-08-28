"use strict";

const { Router } = require("express");
const passport = require("passport");
const authenticationRouter = Router();

authenticationRouter.get("/sign-up", (req, res) => {
  res.render("authentication/sign-up");
});

authenticationRouter.post("/sign-up", (req, res, next) => {
  const { username, password } = req.body;
  passport.authenticate("sign-up", { username, password });
  res.redirect("/");
});

authenticationRouter.get("/sign-in", (req, res) => {
  res.render("authentication/sign-in");
});

authenticationRouter.post("/sign-in", (req, res, next) => {
  const { username, password } = req.body;
  passport.authenticate("sign-in", { username, password });
});

module.exports = authenticationRouter;
