const {check}= require('express-validator')
const collectionValidation=[
    check('name','Collection name can not be empty ').not().isEmpty()
]


module.exports= collectionValidation