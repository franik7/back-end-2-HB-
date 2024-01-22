const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const houses = require('./db.json')
let globalID = 4

app.get(`/api/houses`, (req, res) => {
    res.status(200).send(houses)
})

app.delete(`/api/houses/:id`, (req, res) => {
    let index = houses.findIndex(elem => elem.id === +req.params.id)
    houses.splice(index, 1)
    res.status(200).send(houses)
})


app.post(`/api/houses`, (req, res) => {
    let { address, price, imageURL } = req.body
    let newHouse = {
        id: globalID,
        address,
        price,
        imageURL,
    }   
    houses.push(newHouse)
    res.status(200).send(houses)
    globalID++
})



app.put(`/api/houses/:id`, (req, res) => {
    let { id } = req.params
    let { type } = req.body
    let index = houses.findIndex(elem => +elem.id === +id)

    if (houses[index].price <= 10000 && type === 'minus') {
        houses[index].price = 0
        res.status(200).send(houses)
    } else if (type === 'plus') {
        houses[index].price += 10000
        res.status(200).send(houses)
    } else if (type === 'minus') {
        houses[index].price -= 10000
        res.status(200).send(houses)
    } else {
        res.sendStatus(400)
    }
})

app.listen(4004, () => console.log(`running on 4004`))