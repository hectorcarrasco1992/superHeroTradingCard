const async = require('async')
const faker = require('faker')
const fetch = require('node-fetch')
const Card = require('../Cards/models/Card')
const Pack = require('../../cardCollection/models/Collection')

const url = `http://superheroapi.com/api/`


function hero(id){

    fetch(`${url}${process.env.API_KEY}/${id}`).then((data)=>{
        return data.json()
    }).then((data)=>{
        console.log(data)
        return data
    }).catch(err =>console.log(err))
} 


module.exports = {
    addCard:(req,res,next)=>{

       

        
        const id = (req.query.charId)
        async.waterfall([
            (callback)=>{
                Pack.findOne({name:req.params.name},(err,pack)=>{
                    if(err) return next(err)
                    console.log('Waterfall collection...',pack)
                    callback(null,pack)
                })
            },
    
            (pack,callback)=>{
                  fetch(`${url}${process.env.API_KEY}/${id}`).then((data)=>{
             return data.json()
          }).then((data)=>{
             console.log(data)
             const newCard = new Card()
              newCard.pack = pack._id
             newCard.name = data.name
             newCard.image = data.image.url
        
             newCard.powerStats = data.powerstats
             newCard.save()

             return res.redirect(`/api/admin/add-card/:name`)
          })},
            ])
        // const id = req.query.charId
        //  fetch(`${url}${process.env.API_KEY}/${id}`).then((data)=>{
        //     return data.json()
        //  }).then((data)=>{
        //     console.log(data)
        //     const newCard = new Card()
            
        //     newCard.name = data.name
        //     newCard.image = data.image.url
        //     newCard.powerStats = data.powerstats
        //     newCard.save()

        //     console.log(newCard)
        
        
    
        //     return res.redirect('/api/admin/add-card')
        // }).catch(err=>console.log(err))
    },
        
    

    addCardRender:(req,res)=>{
        return res.render('admin/addHero')
    },

    getAllCards:(req,res,next)=>{
        Card.find({pack:req.params.id})
        // references the key in the model Product
        .populate('Pack')
        // executes and gives back the array
        .exec((err,cards)=>{
            if(err) return next(err)
            //return res.json({products})
            return res.render('main/pack',{cards})
        })
    },

}