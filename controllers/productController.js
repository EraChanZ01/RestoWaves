const db = require('../models/index')

module.exports.getAllProduct = async (req, res, next) => {
    try {
        const { ...filter } = req.query
        const products = await db.Product.findAll({
            where: filter,
            include: [
                {
                    model: db.Size,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                }
            ]
        })
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send('Server Error')
    }
}

module.exports.getById = async (req, res, next) => {
    try {
        const { productId } = req.params
        const product = await db.Product.findOne({
            where: {
                id: productId
            },
            include: [
                {
                    model: db.Size
                }
            ]
        })
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send('Server Error')
    }
}

module.exports.updateName = async (req, res, next) => {
    try {
        console.log(req.body)
        const { id, name } = req.body
        const productUpdated = await db.Product.update({ name }, {
            where: {
                id
            }
        })
        res.status(200).send(productUpdated)
    } catch (err) {
        res.status(500).send('Server Error')
    }
}