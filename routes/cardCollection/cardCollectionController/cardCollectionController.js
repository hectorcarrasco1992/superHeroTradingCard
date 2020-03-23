const fetch = require('node-fetch')
const async = require('async')


const fetch = require('node-fetch')
let key = process.env.API_KEY
let name =  req.params.body
let url = `https://superheroapi.com/api/${key}/search/`




let superHero= (req,res,next)=>{
let key = process.env.API_KEY
let name =  req.query
let url = `https://superheroapi.com/api/${key}/search/`


fetch(url+name).then(data=>{
        return data.json()
    }).then((data)=>{
        console.log(data)
    }).then((data)=>{
        res.render('main/')
    })
}