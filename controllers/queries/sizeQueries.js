const db = require('../../models/index')

module.exports.findSize = async (name) => {
    const size = await db.Size.findOne({
        where: {
            name
        }
    })
    return size
}