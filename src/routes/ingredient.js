const express = require('express')
const router = express.Router()

const ingredientController = require('../app/controllers/IngredientController')


router.get('/:id/edit',ingredientController.edit)
router.put('/:id',ingredientController.update)
router.post('/stored',ingredientController.stored)
router.get('/create',ingredientController.create)
router.delete('/:id',ingredientController.destroy)
router.get('/',ingredientController.index)

module.exports = router