const async = require('async')
const faker = require('faker')
const fetch = require('node-fetch')
const Card = require('../Cards/models/Card')
const Collection = require('../../cardCollection/models/Collection')

module.exports = {
    addProducts:(req,res,next)=>{
        const url = `https://superheroapi.com/api/${[process.env.API_KEY]}/`
        let id = req.params.body
    req.flash('message','Category Created')
    return res.redirect('/api/admin/add-card')
    },

}