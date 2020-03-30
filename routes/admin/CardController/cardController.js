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
    addCard:(req,res)=>{

       

        
        const id = (req.body.charId)
        async.waterfall([
            (callback)=>{
                Pack.findOne({name:req.body.packName},(err,pack)=>{
                    console.log('pack')
                    if(err) return next(err)
                    console.log('Waterfall collection...',pack)
                    callback(null,pack)
                })
            },
            
            (pack,callback)=>{
                console.log('hey')
                  fetch(`${url}${process.env.API_KEY}/${id}`).then((data)=>{
             return data.json()
          }).then((data)=>{
              
             console.log('hero data:',data)
             const newCard = new Card()
             newCard.pack = pack._id
             newCard.owner = req.user._id
             newCard.name = data.name
             newCard.image = data.image.url
        
             newCard.powerStats = data.powerstats
             newCard.save()

             return res.render(`admin/addHero`,{packName:pack.name})
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
        return res.render('admin/addHero',{name:req.params.name})
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