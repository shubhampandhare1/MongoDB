const Product = require('../models/product');
// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err)
    });
};

//to get product id to show details page when click on details button
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail',
        {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
    .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId    //retrieve product id from incoming request on Add to cart
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product)
    })
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => {
      console.log('postCart', err)
    })
}

exports.postCartDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId)
    .then((result) => {
      console.log(result)
      res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
  req.user
    .addToOrders()
    .then(order => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
