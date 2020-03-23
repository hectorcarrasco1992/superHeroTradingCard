const async = require('async')
const faker = require('faker')
const fetch = require('node-fetch')
const Card = require('../Cards/models/Card')
const Collection = require('../../cardCollection/models/Collection')

const url = `http://superheroapi.com/api/`


function hero(id){

    fetch(`${url}${process.env.API_KEY}/${id}`).then((data)=>{
        return data.json()
    }).then((data)=>{
        console.log(data)
        return data
    })
} 


module.exports = {
    addCard:(req,res,next)=>{
        // const data = hero(req.query.charId)
        const id = req.query.charId
        fetch(`${url}${process.env.API_KEY}/${id}`).then((data)=>{
            return data.json()
        }).then((data)=>{
            console.log(data)
            const newCard = new Card()

        newCard.name = data.name
        newCard.image = data.image.url
        
        newCard.powerStats = data.powerstats
        newCard.save()

        return res.redirect('/api/admin/add-card')
        })
        

        // const newCard = new Card()

        // newCard.name = data.name
        // newCard.image = data.image.url
        // newCard.description = [data.publisher,data.alignment]
        // newCard.powerStats = data.powerstats
        // newCard.save()

        // return res.redirect('/api/admin/add-card')
        
    
    },

    addCardRender:(req,res)=>{
        return res.render('admin/addHero')
    }

}