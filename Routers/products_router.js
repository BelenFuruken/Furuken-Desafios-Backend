const Router = require('express')
const fs = require('fs')
const path = require('path')
const router = Router()

let ruta = path.join(__dirname, ".." ,"todoLosProductos.txt")
console.log(ruta)

function getProducts(){
    if(fs.existsSync(ruta)){
        return JSON.parse(fs.readFileSync(ruta, "utf-8"))
    }else{
        return []
    }
}

function addProducts(productosParaAgregar){
    console.log(productosParaAgregar)
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
    let {nombre, apellido} = req.body
    const nuevoUsuario = {
        nombre, apellido, desc: "hola"
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


module.exports = router