const express = require('express')
const { grantUpload } = require('../middleware/upload')
const { createLead } = require('../controllers/grantController')

const router = express.Router()

// Public, multipart/form-data.
router.post('/', grantUpload, createLead)

module.exports = router
