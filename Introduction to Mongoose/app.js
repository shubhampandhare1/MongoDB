const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('656a0c81af29e441895dcdd6')
//         .then((user) => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch(err => console.log(err))
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); //onDelete:'CASCADE' will delete the prducts related to User if User is deleted
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem }); //'through' tells sequelize that 
// Product.belongsToMany(Cart, { through: CartItem }); //where these connections should be stored



mongoose.connect('mongodb+srv://shubham99sp:nmK4GmXNXdLyQJ7H@cluster0.ccyqktc.mongodb.net/shop')
    .then(() => {
        console.log('connected!')
        app.listen(3000)
    })
    .catch(err => {
        console.log('error at mongoose connect', err)
    })