const express = require('express')
const router = express.Router()

const CofController = require('../controllers/CofController')

router.get('/', CofController.mainPage)
/* router.get('/conversor', CrfController.conversor)
router.post('/conversor', CrfController.convertSheet)
router.get('/powerBI', CrfController.powerBI)
router.get('/modelos', CrfController.docTemplate)
router.get('/controle_processos', CrfController.processControl) */

module.exports = router
