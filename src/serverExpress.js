const express = require('express')
const PORT = 3000
const app = express()

app.get('/products',(req,res)=>{
    
})

const server = app.listen(PORT, ()=>{
    console.log("server funcionando")
})