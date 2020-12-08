module.exports = {
    createProduct: (req,res) => {
        const db = req.app.get('db')
        const {name, description, price, image_url} = req.body

        db.create_product([name, description, price, image_url]).then(product => {
            res.status(200).send(product)
        }).catch(err => {
            res.status(400).send(err)
        })
    },
    getAllProducts: (req,res) => {
        const db = req.app.get('db')

        db.read_products().then(product => {
            res.status(200).send(product)
        }).catch(err => {
            res.status(400).send(err)
        })
    },
    getOneProduct: (req,res) => {
        const db = req.app.get('db')
        const {product_id} = req.params

        db.read_product([product_id]).then(product => {
            res.status(200).send(product)
        }).catch(err => {
            res.status(400).send(err)
        })
    },
    updateProduct: (req,res) => {
        const db = req.app.get('db')
        const {product_id} = req.params
        const {desc} = req.query
        console.log(req.body, req.params)
        db.update_product([desc, +product_id]).then(product => {
            res.status(200).send(product)
        }).catch(err => {
            res.status(400).send(err)
        })
    },
    deleteProduct: (req,res) => {
        const db = req.app.get('db')
        const {product_id} = req.params

        db.delete_product([product_id]).then(() => {
            res.sendStatus(200)
        }).catch(err => {
            res.status(400).send(err)
        })
    }
}