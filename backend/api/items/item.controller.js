const ItemServices = require('./item.service');
const fs = require('fs');
const IMAGE_UPLOAD_PATH = require('../../lib/imageUploadPath');

// show all the listings
const getItems = (req, res) => {
  const filterBy = req.query;
  ItemServices.find(_buildCriteria(filterBy))
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// show all the listings sorted by date
const getItemsSortByDate = (req, res) => {
  ItemServices.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// show all the listings sorted by location
const getItemsSortByLocation = (req, res) => {
  ItemServices.find()
    .sort({ location: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// shows the item with the given id
const getItem = (req, res) => {
  const id = req.params.id;
  ItemServices.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// shows the items that are in the given category
const getItemsByCategory = (req, res) => {
  const category = req.params.category;
  ItemServices.find({ category: category })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// shows the items that are from the given userId
const getItemsByUserId = (req, res) => {
  const userId = req.params.userId;
  ItemServices.find({ userId: userId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// adding a listing
const addItem = (req, res) => {
  const listing = new ItemServices(JSON.parse(req.body.document));
  console.log('item: ', req.body.document);
  if (req.files) {
    const imageUploadFile = req.files.image;
    const newImageName = Date.now() + imageUploadFile.name;
    listing['image'] = newImageName;
    const uploadPath = require('path').resolve(
      `${IMAGE_UPLOAD_PATH}/${newImageName}`
    );
    imageUploadFile.mv(uploadPath, (err) => {
      console.log('error uploading image', err);
      // if (err) return res.status(500).send(err);
    });
  }
  listing
    .save() // saves the object in the database, async method
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addItemImage = (req, res) => {
  const listing = new ItemServices(req.body);
  const {
    files: { image },
  } = req;
  const newImageName = Date.now() + image.name;
  listing['image'] = newImageName;
  const uploadPath = require('path').resolve(
    `${IMAGE_UPLOAD_PATH}/${newImageName}`
  );
  image.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
  });
};
// delete a listing
const deleteItem = (req, res) => {
  const id = req.params.id;
  ItemServices.findById(id)
    .then((result) => {
      if (result.image) {
        const imagePath = require('path').resolve(
          `${IMAGE_UPLOAD_PATH}/${result.image}`
        );
        fs.unlink(imagePath, (err) => {
          if (err) return res.status(500).send(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  ItemServices.findByIdAndDelete(id)
    .then((result) => {
      // res.redirect('/'); // if "delete" from front is an ajax request need to us the line below instead
      res.json({ redirect: '/' }); // for redirecting from front
    })
    .catch((err) => {
      console.log(err);
    });
};

// updates the item with the given id, no functionality to update image yet
const updateItem = (req, res) => {
  const id = req.params.id;
  ItemServices.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

function _buildCriteria(filterBy) {
  let { txt, category, location, price, userId } = filterBy;
  let criteria = {};
  if (price) {
    filterBy.price = JSON.parse(filterBy.price);
  }
  if (txt) {
    const freeTxtFilterFields = ['title', 'description', 'category'];
    criteria = {
      ...criteria,
      $or: freeTxtFilterFields.map((f) => ({ [f]: { $regex: txt } })),
    };
  }
  if (category) {
    criteria.category = category;
  }
  if (location) {
    criteria.location = location;
  }
  if (userId) {
    criteria.userId = userId;
  }
  return criteria;
}
module.exports = {
  getItems,
  getItemsSortByDate,
  getItemsSortByLocation,
  getItem,
  getItemsByCategory,
  getItemsByUserId,
  addItem,
  addItemImage,
  deleteItem,
  updateItem,
};
