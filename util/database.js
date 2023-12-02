const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://shubham99sp:WfrfTIPTnvgOTD06@cluster0.ccyqktc.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected!!')
            db = client.db();
            callback()
        })
        .catch(err => {
            console.log('error at mongoclient connect', err)
        })
}

const getDb = () => {
    if(db){
        return db;
    }
    throw 'No Database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;