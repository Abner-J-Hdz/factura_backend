const express = require("express");
const router = express.Router();

//const UserController = require("../controllers/articulo.controller");

router.post('/', (req, res) => {
    res.json({ message: "All ok"});
});

module.exports = router