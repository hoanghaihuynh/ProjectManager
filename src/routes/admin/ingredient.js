const express = require('express')
const router = express.Router()
const validateIngredient = require('../../util/validateIngredient')
const ingredientController = require('../../app/controllers/admin/IngredientController')
const authToken = require('../../util/authenticateToken')
const requireAdmin = require('../../util/requireAdmin')

router.get('/:id/edit',authToken,requireAdmin,ingredientController.edit)
router.post('/stored',authToken,requireAdmin,validateIngredient,authToken,requireAdmin,ingredientController.stored)
router.post('/:id',authToken,requireAdmin,ingredientController.update)
router.get('/create',authToken,requireAdmin,ingredientController.create)
router.post('/:id/delete',authToken,requireAdmin,ingredientController.destroy)
router.get('/',authToken,requireAdmin,ingredientController.index)

module.exports = router