const express = require('express')
const productController = require('../controllers/productController')

const productRouter = express.Router()

productRouter.post('/', productController.updateName)
productRouter.get('/', productController.getAllProduct)
productRouter.get('/:productId', productController.getById)

module.exports = productRouter