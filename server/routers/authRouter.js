const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.route("/login").get((req,res)=>res.send("hi")).post(
    (req,res,next) => {
        const username = req.username;
        const user = {
            username
        }
        const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({access_token});
    }
);

module.exports = router;