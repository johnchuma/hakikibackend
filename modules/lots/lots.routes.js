const {router, Router} = require('express')
const { getLots, addLot, deleteLot } = require('./lots.controllers')
const { validateJWT } = require('../../utils/validateJWT')

const app = Router()
app.get('/',validateJWT, getLots)
app.post('/',validateJWT,addLot)
app.delete('/',validateJWT,deleteLot)