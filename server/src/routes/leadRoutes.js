const express = require('express')
const { requireAuth } = require('../middleware/auth')
const { listLeads, getLead } = require('../controllers/leadController')

const router = express.Router()

// Barcha lead endpointlari himoyalangan.
router.use(requireAuth)
router.get('/', listLeads)
router.get('/:id', getLead)

module.exports = router
