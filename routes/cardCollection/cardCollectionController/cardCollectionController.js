const {validationResult}=require('express-validator')
const Pack = require('../models/Collection')

module.exports = {
    getAllPack:(req,res,next)=>{
        //return res.json({categories})
         return res.render('admin/addCollection')
         
     },

     createPack:(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('error','Pack name can not be empty')
            //return res.status(422).json({errors:errors.array()})
            return res.redirect(`/api/admin/create-pack`)
        }
        const pack = new Pack()
        pack.name = req.body.name
        pack.save()
        .then(collection=>{
            console.log(pack)
            //req.flash('errors',"Category already exists")
            //return res.json({category})
            req.flash('message','Pack created')
            return res.redirect(`/api/admin/add-pack/${pack.name}`)
        }).catch(err=>{
            if(err.code === 11000){
                req.flash('error','Collection already exists')
                //return res.json({message:'Exists'})
                    return res.redirect('/api/admin/create-pack')
            }else{
                next(err)
            }
        })
    
    
    },

    
}