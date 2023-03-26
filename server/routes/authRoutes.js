const express = require("express");

const passport = require("passport");

const router = express.Router();

router.get(
  "/google/callback",

  passport.authenticate("google"),
  (req, res) => {
    res.send("OK");
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/api/me", (req, res) => {
  res.send(req.user);
});

router.get("/api/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.send(req.user);
});

module.exports = router;
