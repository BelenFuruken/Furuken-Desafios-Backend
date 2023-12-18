const express = require('express')
const routerProducts = require('./Routers/products_router.js')
const routerCarts = require('./Routers/carts_router.js')

const PORT = 8080
const app = express()

app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)


const server = app.listen(PORT, ()=>{
    console.log(`Server funcionando, en el puerto ` + PORT)
})

