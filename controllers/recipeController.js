const db = require('../models')


const index = (req, res) => {
  if(!req.user){
    console.log('recipe index: hitting no user')
    res.status(400);
    res.send('Not Logged In')

  }

  if(req.user){
    db.Recipe.find({user: req.user.id}, (err, allRecipes) => {
      if(err) return console.log(err);
      res.json(allRecipes)
    })
    
  }
}

const show = (req, res) => {
  if(!req.user){
    res.status(400);
    res.send('Not Logged In')
  }

  if(req.user){
    db.Recipe.findOne({
      $and: [
        {user: req.user.id},
        {_id: req.params.id}
      ]
    }, (err, foundRecipe) => {
      if(err) return console.log(err);
      res.json(foundRecipe)
    })
    
  }
}

const create = (req, res) => {
  if(!req.user){
    res.status(400);
    res.send('Not Logged In')
  } 
  if(req.user){
    const recipeObj = {
      name: req.body.name,
      url: req.body.url,
      notes: req.body.notes,
      user: req.user.id,
      tags: req.user.tags
    }
    db.Recipe.create(recipeObj, (err, newRecipe) => {
      if(err) return console.log(err)
      res.json(newRecipe)
    })
  }
}

const update = (req, res) => {
  if(!req.user){
    res.status(400);
    res.send('Not Logged In')
  } 
  db.Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedRecipe) => {
      if(err) return console.log(err)
      res.json(updatedRecipe)
    }
  )
}

const destroy = (req, res) => {
  if(!req.user){
    res.status(400);
    res.send('Not Logged In')
  } 

  db.Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
    if(err) return console.log(err)
    console.log('deleted!')
    res.status(200)
    res.send('Deleted.')
  })
}


module.exports = {
  index,
  show,
  create, 
  update,
  destroy
}