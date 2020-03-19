const fetch = require('node-fetch')
const async = require('async')
const

const fetch = require('node-fetch')
let key = process.env.API_KEY
let name =  req.params.body
let url = `https://superheroapi.com/api/${key}/search/`




let superHero= (req,res,next)=>{
let key = process.env.API_KEY
let name =  'Thor'
let url = `https://superheroapi.com/api/${key}/search/`


fetch(url+name).then(data=>{
        return data.json()
    }).then(({name,work,powerstats})=>{
        console.log(name,work,powerstats)
    }).catch(err=>console.log('error'))
}



module.exports = {
    addCard:(req,res,next)=>{
        async.waterfall([
            (callback)=>{
                Category.findOne({name:req.params.name},(err,category)=>{
                    if(err) return next(err)
                    console.log('Waterfall category...',category)
                    callback(null,category)
                })
            },
    
            (category,callback)=>{
                for(let i = 0;i<24;i++){
                    const product = new Product()
                    product.Collection = collection._id
                    product.name = faker.commerce.productName()
                    product.price = faker.commerce.price()
                    product.image = `/images/products2/${i}.jpg`
                    product.description= faker.lorem.paragraph()
                    product.save()
                }
            },
    
        ])
    req.flash('message','Category Created')
    return res.redirect('/api/admin/add-category')
    },
}