const Router = require('express')
const router = Router()
const fs = require('fs')
const path = require('path')

let rutaCart = path.join(__dirname, ".." ,"carritos.json")
let rutaProducts = path.join(__dirname, "..", "todosLosProductos.txt")

function getCarts(){
    if(fs.existsSync(rutaCart)){
        return JSON.parse(fs.readFileSync(rutaCart, "utf-8"))
    }else{
        return []
    }
}

function createCarts(carritoParaAgregar){
    fs.writeFileSync(rutaCart, JSON.stringify(carritoParaAgregar, null, "\t"))
}

function getProducts(){
    if(fs.existsSync(rutaProducts)){
        return JSON.parse(fs.readFileSync(rutaProducts, "utf-8"))
    }else{
        return []
    }
}

router.post("/", (req, res)=>{
    let carritos = getCarts().carritos
    let id = 1
    if (carritos.length>0){
        id = carritos.length + 1
    }
    let carrito = {
        id, productos: []
    }
    carritos.push(carrito)
    const json = {
        carritos
    }
    createCarts(json)
    res.setHeader('Content-Type','application/json')
    res.status(200).json({exitoso: "Carrito creado correctamente"})
})

router.get("/:cid", (req, res)=>{
    let carritoId = req.params
    let carrito = getCarts()
    let productosCarrito = carrito.find(p=>p.id === carritoId)
    res.send(productosCarrito)
})

router.post("/:cid/product/:pid", (req, res)=>{
    let idCarrito = req.params.cid
    let idProducts = req.params.pid
    let cantidadP = 1
    let carrito = getCarts()
    let carritoActualizado = {
        idCarrito, idProducts, cantidadP
    }
    let carritoIndex = carrito.findIndex(p=>p.id === idCarrito)
    carrito[carritoIndex] = carritoActualizado 
    createCarts(carrito)
    res.setHeader('Content-Type','application/json')
    res.status(200).json({exitoso: "Carrito completado correctamente"})
})

module.exports = router