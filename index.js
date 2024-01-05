const http = require('http')
const express = require('express')
const router = require('./routers/router')
const { evalDate } = require('./utils/createDate')
const config = require('./config')
const CONSTANTS = require('./CONSTANTS')

const app = express()

app.use(express.json())
app.use(router)


const server = http.createServer(app)

async function tableQuery(fn, mode) {
    const table = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.TABLE_ID}?key=${config.GOOGLE_KEY}`)
    const tableData = await table.json()
    const lists = await Promise.all(
        tableData.sheets.map(async (list) => {
            const listFound = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.TABLE_ID}/values/${list.properties.title}?key=${config.GOOGLE_KEY}`)
            return await listFound.json()
        })
    )
    fn(lists, mode)
}

tableQuery(evalDate, CONSTANTS.CREATE)


setInterval(() => tableQuery(evalDate, CONSTANTS.CHECK), 60 * 60 * 1000)   //60 * 60 * 1000 = 1 часу
server.listen(3000, () => {
    console.log('server start')
})