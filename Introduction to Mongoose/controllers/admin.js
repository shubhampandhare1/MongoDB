const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({ title: title, price: price, description: description, imageUrl: imageUrl });
  product.save()
    .then((result) => {
      console.log('Created Product');
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err);
    })
  // req.user
  //   .createProduct({            //as we setup the belonggsTo association sequelize adds special methods
  //     title: title,             //like createProduct()
  //     description: description,
  //     price: price,
  //     imageUrl: imageUrl,
  //   })
  // Product.create({
  //   title: title,
  //   description: description,
  //   price: price,
  //   imageUrl: imageUrl,
  //   // userId: req.user.id //was added as database field bcoz we have a relation setup
  // })

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;  // return true OR false;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  //to edit product for particular user
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;  //if editing productId will accessed using edit-product.ejs
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;

      return product.save()
    })
    .then(product => {
      console.log('Updated Product', product)
      res.redirect('/products');
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  //to get products for current logged in user
  Product.find()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));

};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log('Product Deleted Successfully');
      res.redirect('/products');
    })
    .catch(err => console.log(err))
}