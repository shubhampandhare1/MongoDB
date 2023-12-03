const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;
// class Product {
//   constructor(title, imageUrl, price, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       //update the product
//       dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
//     } else {
//       dbOp = db.collection('products').insertOne(this)
//     }
//     return dbOp
//       .then(res => {
//         console.log('product created');
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(product => {
//         let deletedProduct = product;
//         return db.collection('users').updateMany({ 'cart.items.productId': new ObjectId(prodId) },
//           { $pull: { 'cart.items': { productId: new ObjectId(prodId) } } })
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }


// module.exports = Product;