const mongoose = require('mongoose')
const Lead = require('../models/Lead')
const { asyncHandler } = require('../utils/asyncHandler')

// GET /api/leads — leadlar ro'yxati (himoyalangan), eng yangisi birinchi, pagination bilan.
const listLeads = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20))
  const skip = (page - 1) * limit

  const filter = {}
  if (req.query.status) filter.status = req.query.status

  const [items, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Lead.countDocuments(filter),
  ])

  res.json({ items, total, page, limit })
})

// GET /api/leads/:id — bitta lead (himoyalangan).
const getLead = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: 'Ariza topilmadi.' })
  }
  const lead = await Lead.findById(req.params.id).lean()
  if (!lead) {
    return res.status(404).json({ message: 'Ariza topilmadi.' })
  }
  res.json(lead)
})

module.exports = { listLeads, getLead }
