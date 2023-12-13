const express = require('express')
/*const ProductManagger = require('./src/creadorProductos.js')*/
const routerProducts = require('./Routers/products_router.js')
const routerCarts = require('./Routers/carts_router.js')

/*
let producto1 = new ProductManagger("./src/productos.txt")
producto1.addProduct("arroz", "blanco", 111, "nada", 100, 5)
producto1.addProduct("fideos", "cinta", 222, "nada", 123, 1)
producto1.addProduct("sss", "blanco", 333, "nada", 150, 6)
producto1.addProduct("az", "blanco", 444, "nada", 320, 7)
producto1.deleteProduct(3)*/
const PORT = 8080
const app = express()

app.use("/api/products", routerProducts)
app.use("/carts", routerCarts)


const server = app.listen(PORT, ()=>{
    console.log(`Server funcionando, en el puerto ` + PORT)
})

