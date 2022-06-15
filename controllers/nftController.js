const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')

const NFT = require('../models/nftModel')

// @desc    Get nfts
// @route   GET /api/nfts
// @access Private
const getNFTs = asyncHandler(async (req, res) => {
  const nfts = await NFT.find()

  res.status(200).json(nfts)
})

// @desc    Add nfts
// @route   POST /api/nfts
// @access Private
const setNFTs = asyncHandler(async (req, res) => {
  console.log(req.file)
  if (!req.body.name || !req.file.filename) {
    res.status(400)
    throw new Error('Please add a name and image field')
  }

  const nft = await NFT.create({
    name: req.body.name,
    image: fs.readFileSync(
      path.join(__dirname + '../../../uploads/' + req.file.filename)
    ),
  })

  res.status(200).json(nft)
})

// @desc    Update nfts
// @route   PUT /api/nfts/:id
// @access Private
const updateNFTs = asyncHandler(async (req, res) => {
  const nft = await NFT.findById(req.params.id)

  if (!nft) {
    res.status(400)
    throw new Error('NFT not found')
  }

  const updateNFT = await NFT.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updateNFT)
})

// @desc    Delete nfts
// @route   DELETE /api/nfts/:id
// @access Private
const deleteNFTs = asyncHandler(async (req, res) => {
  const nft = await NFT.findById(req.params.id)

  if (!nft) {
    res.status(400)
    throw new Error('NFT not found')
  }

  await nft.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = { getNFTs, setNFTs, updateNFTs, deleteNFTs }
