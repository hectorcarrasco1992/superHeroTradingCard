const express = require('express')
const router = express.Router()
const {addCard,addCardRender,getAllCards}= require('../admin/CardController/cardController')
const {getAllPack,createPack} = require('../cardCollection/cardCollectionController/cardCollectionController')
const collectionValidation = require('../validation/collectionValidation')

router.get('/add-hero-card',addCard)
router.get('/add-card',addCardRender)
router.get('/add-pack',getAllPack)
router.post('/create-pack',collectionValidation,createPack)
module.exports = router