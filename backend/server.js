const fs = require('fs')
const cors = require('cors')
const express = require('express')
const app = express()

const data = fs.readFileSync('data.json')
const items = JSON.parse(data)

app.use(cors({
    origin: '*'
}));

app.get("/", (req,res)=>{
    res.send(items.feeds)
})

const server = app.listen('3001',()=> {
    console.log("listening on port:", server.address().port)
})




