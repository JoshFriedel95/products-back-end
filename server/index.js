const massive = require('massive')
require('dotenv').config()
const express = require('express')
const app = express()
const productCtrl = require('./productControllers')
const {SERVER_PORT, CONNECTION_STRING} = process.env
app.use(express.json())

app.get('/api/products', productCtrl.getAllProducts)
app.get('/api/products/:product_id', productCtrl.getOneProduct)
app.post('/api/products', productCtrl.createProduct)
app.put('/api/products/:product_id', productCtrl.updateProduct)
app.delete('/api/products/:product_id', productCtrl.deleteProduct)


massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    },
}).then(dbInstance => {
    console.log('DB Ready')
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}).catch(err => console.log(err))