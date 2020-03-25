var express = require('express');
var router = express.Router();
const Card = require('../routes/admin/Cards/models/Card')


function paginate(req,res,next){
  const perPage = 6
  const page =req.params.pageNumber

  Card.find()
  .skip(perPage * (page-1))
  .limit(perPage)
  .populate('Pack')
  .exec((err,cards)=>{
    if(err) next(err)
    Card.countDocuments()
    .exec((err,count)=>{
      if(err) next(err)
      res.render('main/home-products',{
        cards,
        pages:Math.ceil(count/perPage),
        page:Number(page)
      })

  })
    
     
})}
/* GET home page. */
router.get('/', (req, res, next) => {
  if(req.isAuthenticated()){
    paginate(req,res,next)
  }else{
    return res.render('main/home');

  }
});

router.get('/page/:pageNumber',(req,res,next)=>{
  paginate(req,res,next)
})

module.exports = router;
