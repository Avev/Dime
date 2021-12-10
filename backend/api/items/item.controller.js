const ItemServices = require('./item.service');
const fs = require('fs');

// show all the listings
const getItems = (req, res) => {
  ItemServices.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
}

// shows the item with the given id
const getItem = (req, res) => {
  const id = req.params.id;
  ItemServices.findById(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
}

// shows the items that are in the given category
const getItemsByCategory = (req, res) => {
  const category = req.params.category;
  ItemServices.find({category: category})
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
}

// adding a listing
const addItem = (req, res) => {
  const listing = new ItemServices(req.body);
  if(req.files) {
      const imageUploadFile = req.files.image;
      const newImageName = Date.now() + imageUploadFile.name;
      listing["image"] = newImageName;
      const uploadPath = require('path').resolve('./') + '/frontend/public/images/' + newImageName;
      imageUploadFile.mv(uploadPath, err => {
          if(err) return res.status(500).send(err);
      });
  }
  listing.save() // saves the object in the database, async method
      .then((result) => {
        res.redirect('/'); // redirects to the home page
      })
      .catch((err) => {
        console.log(err);
      })
}

// delete a listing
const deleteItem = (req, res) => {
    const id = req.params.id;
    ItemServices.findById(id)
        .then(result => {
            if (result.image) {
                const imagePath = require('path').resolve('./') + '/frontend/public/images/' + result.image;
                fs.unlink(imagePath, err => {
                    if (err) return res.status(500).send(err);
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    ItemServices.findByIdAndDelete(id)
        .then(result => {
            // res.redirect('/'); // if "delete" from front is an ajax request need to us the line below instead
            res.json({redirect: '/'}); // for redirecting from front
        })
        .catch(err => {
            console.log(err);
        })
}

// updates the item with the given id, no functionality to update image yet
const updateItem = (req, res) => {
    const id = req.params.id;
    ItemServices.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
  getItems: getItems,
  getItem: getItem,
  getItemsByCategory: getItemsByCategory,
  addItem: addItem,
  deleteItem: deleteItem,
  updateItem: updateItem}
