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
             newCard.biography = data.biography
             newCard.publisher = data.publisher
             newCard.firstAppearance= data.firstappearance
        
             newCard.powerStats = data.powerstats
             newCard.save()

             return res.render(`admin/addHero`,{packName:pack.name,data})
          })},
            ])
        
    },
        
    

    addCardRender:(req,res)=>{
        if(req.isAuthenticated()){

            return res.render('admin/addHero',{name:req.params.name})
        }else res.redirect('/')
    },

    getAllCards:(req,res,next)=>{
        

        Card.find({name:req.params.name})
        // references the key in the model Card
        .then((cards)=>{
            console.log(cards)
            
            res.render('main/pack',{cards})
        }).catch(err => console.log(err))
        // executes and gives back the array
        
        
    },

    deleteHero: (req,res,next)=>{
        Card.findOneAndDelete({name:req.body.name})
        .then(cards =>{
            return res.render('main/delete',{message:req.flash('deleted')})
            
           }).catch(err=>console.log(err))
        
    },

    renderDelete:(req,res)=>{
        if(req.isAuthenticated()){
            return res.render('main/delete',{message:req.flash('Deleted')})
        }else{
            return res.redirect('/')
        }
    }

}