const express = require('express')
const PORT = 3000
const app = express()
const server = app.listen(PORT, ()=>{
    console.log("server funcionando")
})