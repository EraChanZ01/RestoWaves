const express = require('express')
const productRouter = require('./productRouter')

const router = express.Router()


router.use("/product", productRouter)

module.exports = router