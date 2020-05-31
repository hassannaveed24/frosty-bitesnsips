const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User,validate} = require('../models/user');
const express = require('express');
const router = express.Router();


router.post("/", async (req, res) => {
    let doc = await User.findOne({ email: req.body.email });
    
    const match = bcrypt.compareSync(req.body.password, doc.password);
    if(match){
        const payload = { _id: doc._id, name: doc.name, email: doc.email };
        const key = config.get('jwtPrivateKey');

        let token = jwt.sign(payload, key);
        res.json({ result: "success", name: doc.name, token, message: "Login successfully" });

    }else{
        res.json({ result: "error", message: "Invalid email or password" });
    }
  });

module.exports = router;
