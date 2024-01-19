// import packages
const express = require("express");
const cors = require("cors");

const housesDB = require('./db.json')
const ctrl = require('./controller')

const app = express()


app.use(express.json())
app.use(cors())

// has to match to the route in script.js
app.get("/getHouses", ctrl.getHouses);
app.post('/createHouse', ctrl.createHouse)
app.put('/updateHouse/:name', ctrl.updateHouse)
app.delete('/deleteHouse/:username', ctrl.deleteHouse)


app.listen(4004, () => console.log("Listening on port 4004"));