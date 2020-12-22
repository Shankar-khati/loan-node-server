require('dotenv').config(); //instatiate environment variables
const mongoose = require('mongoose');
let CONFIG = {} //Make this global to use all over the application

CONFIG.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
CONFIG.app = process.env.APP || 'development';
CONFIG.port = process.env.PORT || '8080';
CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
//CONFIG.db_host = process.env.DB_HOST || '23.239.215.73';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';
CONFIG.db_name = process.env.DB_NAME || 'nriloan';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'db-password';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '720h';
var MongoClient = require('mongodb').MongoClient;
//const mongo_location = 'mongodb://gdriver:gdriver1@ds018238.mlab.com:18238/nriloan';
//mongodb://localhost:27017/nriloan
const mongo_location = 'mongodb://localhost:27017/nriloan';

MongoClient.connect(mongo_location, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err, db) {
    // Create a collection we want to drop later
    // console.log( db,err)
    dbs = db.db('nriloan');
    CONFIG.dbs = process.env.db || dbs;
});
mongoose.set("useCreateIndex", true);

module.exports = CONFIG;