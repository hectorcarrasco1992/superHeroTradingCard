const express = require('express')
const router = express.Router()
const {addCard,addCardRender}= require('../admin/CardController/cardController')

router.get('/add-hero-card',addCard)
router.get('/add-card',addCardRender)
module.exports = router