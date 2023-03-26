const express = require("express");

const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",

  passport.authenticate("google"),
  (req, res) => {
    res.send("OK");
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",

  passport.authenticate("facebook"),
  (req, res) => {
    res.send("OK");
  }
);

router.get("/api/me", (req, res) => {
  console.log(req.session);
  res.send(req.session);
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
