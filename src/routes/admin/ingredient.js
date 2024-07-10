const express = require('express')
const router = express.Router()
const validateIngredient = require('../../util/validateIngredient')
const ingredientController = require('../../app/controllers/admin/IngredientController')
const requireAdmin = require('../../util/requireAdmin')

router.get('/:id/edit',requireAdmin,ingredientController.edit)
router.post('/stored',validateIngredient,requireAdmin,ingredientController.stored)
router.post('/:id',requireAdmin,ingredientController.update)
router.get('/create',requireAdmin,ingredientController.create)
router.post('/:id/delete',requireAdmin,ingredientController.destroy)
router.get('/',requireAdmin,ingredientController.index)

module.exports = router