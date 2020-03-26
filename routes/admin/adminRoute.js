const express = require('express')
const router = express.Router()
const {addCard,addCardRender,getAllCards}= require('../admin/CardController/cardController')
const {getAllPack,createPack} = require('../cardCollection/cardCollectionController/cardCollectionController')
const collectionValidation = require('../validation/collectionValidation')

router.post('/add-hero-card/',addCard)

router.get('/add-card/:name',addCardRender)
router.get('/add-pack',getAllPack)
router.post('/create-pack',collectionValidation,createPack)
module.exports = router