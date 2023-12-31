const fs = require('fs')

class ProductManagger{
    constructor(ruta){
        this.path = ruta
    }
    
    getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(fs.readFileSync(this.path, "utf-8"))
        }else{
            return []
        }
    }

    addProduct(nombre, descripcion, precio, img, codigo, cantidad){
        let id = 1
        let PRODUCTOS = this.getProducts()
        if(PRODUCTOS.length>0){
            id = PRODUCTOS[PRODUCTOS.length-1].id + 1
        }
             
        let existe = PRODUCTOS.find((e)=>e.code === codigo)
        if(existe){
            console.log(`El producto ${codigo} ya existe`)
            return
        }else{
            if(nombre == "" || descripcion == "" || precio == "" || img == "" || codigo == "" || cantidad == ""){
                console.log("Se deben ingresar todos los campos para poder cargar el producto")
                return
            }else{
                PRODUCTOS.push({
                id:  id,
                title: nombre,
                description: descripcion,
                price: precio, 
                thumbnail: img,
                code: codigo,
                stock: cantidad
                })

                let guardado = fs.writeFileSync(this.path, JSON.stringify(PRODUCTOS, null, "\t"))
                console.log(guardado)
            }
        }
    }
    

    getProductById(encontarId){
        let lectura = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        let encontrado = lectura.filter((e)=>e.id === encontarId)
        if (encontrado.length>0){
            console.log(encontrado[0])
        }else{
            console.log("not found")
        }
    }

    deleteProduct(id){
        let PRODUCTOS = this.getProducts()
        let lista_p_actualizados = PRODUCTOS.filter(p=>p.id !== id)
        /*let indiceEncontrado = PRODUCTOS.findIndex(p=>p.id === id)
        if (indiceEncontrado === -1){
            console.log(`El producto con id: ${indiceEncontrado} no existe`)
            return
        }
        PRODUCTOS.splice(indiceEncontrado, 1) */
        fs.writeFileSync(this.path, JSON.stringify(lista_p_actualizados, null, "\t"))
    }

    updateProduct(id, campo, actualizacion){
        let PRODUCTOS = this.getProducts()
        let indiceEncontrado = PRODUCTOS.findIndex(p=>p.id === id)
        if (indiceEncontrado === -1){
            console.log(`El producto con id: ${indiceEncontrado} no existe`)
            return
        }
        PRODUCTOS[indiceEncontrado].campo = actualizacion
        fs.writeFileSync(this.path, JSON.stringify(PRODUCTOS, null, "\t"))

    }
}

let producto1 = new ProductManagger("./productos.txt")
producto1.addProduct("arroz", "blanco", 111, "nada", 100, 5)
producto1.addProduct("fideos", "cinta", 222, "nada", 123, 1)
producto1.addProduct("sss", "blanco", 333, "nada", 150, 6)
producto1.addProduct("az", "blanco", 444, "nada", 320, 7)
let todos = producto1.getProducts()
console.log(todos)
//producto1.getProductById(2)
//producto1.getProductById(1)
//producto1.getProductById(3)
//producto1.deleteProduct(1)

module.exports = ProductManagger