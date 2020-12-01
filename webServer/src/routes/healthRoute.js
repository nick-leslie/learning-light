const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).send("the server is healthy")
})

module.exports = router;