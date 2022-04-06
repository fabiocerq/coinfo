const express = require('express')
const router = express.Router()

const CpmController = require('../controllers/CpmController')

router.get('/', CpmController.mainPage)
/* router.get('/conversor', CrfController.conversor)
router.post('/conversor', CrfController.convertSheet)
router.get('/powerBI', CrfController.powerBI)
router.get('/modelos', CrfController.docTemplate)
router.get('/controle_processos', CrfController.processControl) */

module.exports = router
