const db = require('../models/index')
const CONSTANTS = require('../CONSTANTS')
const { findProduct, createProduct } = require('../controllers/queries/productQueries')
const { findSize } = require('../controllers/queries/sizeQueries')


const findParamsFromList = (list) => {
    const indexStore = {
        [CONSTANTS.NAME]: null,
        [CONSTANTS.PRICE]: null,
        [CONSTANTS.CODE]: null,
        [CONSTANTS.SIZE]: null,
    }

    list.values.forEach((value, index) => {
        const nameValue = value[0].trim()
        if (indexStore.hasOwnProperty(nameValue)) indexStore[nameValue] = index
    })
    return indexStore
}

const fillingProductData = async (list, indexStore, i) => {
    const product = { [CONSTANTS.MODEL]: list.range.split('!')[0].replace(/'/g, '') };
    for (const key in indexStore) {
        if (key !== CONSTANTS.SIZE) {
            product[key] = list.values[indexStore[key]][i + 1].trim()
        } else {
            product[key] = {}
            for (let j = indexStore[key] + 1; j < list.values.length; j++) {
                if (list.values[j][i + 1]?.trim() === '+') product[key][list.values[j][0]] = await findSize(list.values[j][0])
            }
        }
    }
    return product
}


module.exports.evalDate = async (data, mode) => {
    try {
        for (let list of data) {       // перебираем массив листов которые были в таблице
            const indexStore = findParamsFromList(list) //находим нужные параметры и записуем их расположение в объект
            const productCount = list.values[indexStore[CONSTANTS.NAME]].length - 1;     // Указываем количество продуктов 

            for (let i = 0; i < productCount; i++) {                                                // перебераем каждый продукт 
                const product = await fillingProductData(list, indexStore, i) // создания объекта с данными о товаре

                let productFromDb
                if (mode === CONSTANTS.CHECK) {
                    productFromDb = await findProduct({
                        name: product[CONSTANTS.NAME],
                        model: product[CONSTANTS.MODEL],
                        price: product[CONSTANTS.PRICE],
                        code: product[CONSTANTS.CODE]
                    }, {
                        model: db.Size,
                    })
                } else {
                    productFromDb = null
                }

                if (productFromDb) {
                    const productHasSizes = {}              // создаем объект и заполняем его имеющими у него размерами
                    for (let value of productFromDb.Sizes) {
                        productHasSizes[value.name] = true
                    }
                    for (let size in product[CONSTANTS.SIZE]) {             //проверяем появились ли новые размеры продукта
                        if (!productHasSizes.hasOwnProperty(size)) {
                            productFromDb.addSize(product[CONSTANTS.SIZE][size])
                            delete productHasSizes[size]
                        } else delete productHasSizes[size]
                    }
                    const key = Object.keys(productHasSizes)
                    if (key.lenght !== 0) {                         // удаляем размеры которых уже нету
                        for (let params in productHasSizes) {
                            const size = await findSize(params)
                            productFromDb.removeSize(size)
                        }
                    }
                } else {
                    const productCreated = await createProduct({
                        name: product[CONSTANTS.NAME],
                        model: product[CONSTANTS.MODEL],
                        price: product[CONSTANTS.PRICE],
                        code: product[CONSTANTS.CODE]
                    })
                    for (let size in product[CONSTANTS.SIZE]) {
                        productCreated.addSize(product[CONSTANTS.SIZE][size])
                    }
                }

            }
        }
    } catch (err) {
        console.log(err)
    }
}
