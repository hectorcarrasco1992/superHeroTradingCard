const Pack =  require('../../cardCollection/models/Collection')

const getEveryPack = (req,res,next)=>{
    Pack.find({},(err,pack)=>{
      if(err) return next(err)
      console.log(Pack)
      res.locals.pack = pack
      next()
    })
  
  }

  module.exports= getEveryPack