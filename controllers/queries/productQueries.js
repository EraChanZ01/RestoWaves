const db = require('../../models/index')

module.exports.findProduct = async (params, ...arg) => {
    const product = await db.Product.findOne({
        where: params,
        include: arg
    })
    return product
}
module.exports.createProduct = async (params) => {
    const product = await db.Product.create(params)
    return product
}