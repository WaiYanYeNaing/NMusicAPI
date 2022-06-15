const mongoose = require('mongoose')

const nftSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please add a name'],
    },
    image: {
      type: String,
      require: [true, 'Please add an image'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('NFT', nftSchema)
