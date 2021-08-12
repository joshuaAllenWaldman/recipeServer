const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  notes: {
    type: String
  },
  tags: {
    type: [String]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;