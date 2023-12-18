const Router = require('express')
const fs = require('fs')
const path = require('path')
const router = Router()

let ruta = path.join(__dirname, ".." ,"todosLosProductos.txt")

function getProducts(){
    if(fs.existsSync(ruta)){
        return JSON.parse(fs.readFileSync(ruta, "utf-8"))
    }else{
        return []
    }
}

function addProducts(productosParaAgregar){
    /*let productosExistentes = getProducts()
    productosExistentes.push(productosParaAgregar)*/
    fs.writeFileSync(ruta, JSON.stringify(productosParaAgregar, null, "\t"))
}

router.get('/',(req,res)=>{ // '/api/products'
    let todosLosProductos = getProducts()
    if(req.query.limit){
        todosLosProductos = todosLosProductos.splice(0,req.query.limit)
        res.setHeader('content-type','application/json')
        res.json({todosLosProductos})
    }else{
        res.setHeader('content-type','application/json')
        res.json({todosLosProductos})
    }
})

router.post('/', (req, res) =>{
    let Cpermitidos = ["id", "title", "description", "code", "price", "status", "stock", "category"]
    let Cingresador = Object.keys(req.body)
    let aceptado = Cingresador.every(p=>Cpermitidos.includes(p)) // tiene que dar todo true
    if (!aceptado){
        res.setHeader('Content-Type','application/json')
        return res.status(400).json({error: "Propiedades invaliidas"})
    }
    let todosLosProductos = getProducts()
    let id = 1
    if (todosLosProductos.length>0){
        id = todosLosProductos[todosLosProductos.length -1]+1
    }
    let {title, description, code, price, status, stock, category, thumbnails}= req.body
    let nuevoUsuario = {
        id, title, description, code, price, status: true, stock, category, thumbnails
    }
    addProducts(nuevoUsuario)
    
})

router.get('/:pid', (req,res)=>{ // '/api/products/:pid'
    let pid = parseInt(req.params.pid)
    let todosLosProductos = getProducts()
    let existe = todosLosProductos.findIndex(p=>p.id === pid)
    if(existe==-1){
        return res.send("No existe ese producto")
    }else{
        res.send(todosLosProductos[existe])
    }
})

router.post("/:pid", (req, res)=>{
    let pid = parseInt(req.params.pid)
    let todosLosProductos = getProducts()
    let existe = todosLosProductos.findIndex(p=>p.id === pid)
    if (!existe){
        res.setHeader('Content-Type','application/json')
        return res.status(400).json({error: "No existe el producto"})
    }
    let Cpermitidos = ["id", "title", "description", "code", "price", "status", "stock", "category"]
    let Cingresador = Object.keys(req.body)
    let aceptado = Cingresador.every(p=>Cpermitidos.includes(p)) // tiene que dar todo true
    if (!aceptado){
        res.setHeader('Content-Type','application/json')
        return res.status(400).json({error: "Propiedades invaliidas"})
    }
    let prodActualizado ={
        ...todosLosProductos[existe],
        ...req.body,
        pid
    }
    todosLosProductos[existe]=prodActualizado
    addProducts(todosLosProductos)
    res.setHeader('Content-Type','application/json')
    res.status(200).json({exitoso: "Producto modificado correctamente"})
})

router.delete("/:pid", (req, res)=>{
    let pid = parseInt(req.params.pid)
    let todosLosProductos = getProducts()
    let existe = todosLosProductos.findIndex(p=>p.id === pid)
    if (existe===-1){
        res.setHeader('Content-Type','application/json')
        return res.status(400).json({error: "No existe el producto"})
    }
    todosLosProductos.splice(existe, 1)
    addProducts(todosLosProductos)
    res.setHeader('Content-Type','application/json')
    res.status(200).json({exitoso: "Producto eliminado correctamente"})
})

module.exports = router