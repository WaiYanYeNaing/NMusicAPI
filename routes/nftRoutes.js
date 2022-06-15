const express = require('express')
const router = express.Router()
const {
  getNFTs,
  setNFTs,
  updateNFTs,
  deleteNFTs,
} = require('../controllers/nftController')

router.route('/').get(getNFTs).post(setNFTs)
router.route('/:id').put(updateNFTs).delete(deleteNFTs)

module.exports = router
