// # MongoDB Database Configuration

// ##### [Back to Table of Contents](./tableofcontents.html)
var mongoose = require('mongoose');

// Currently configured for deployment. Change to this for development:
// mongoose.connect('mongodb://127.0.0.1');
// mongoose.connect(process.env.MONGOLAB_URI);
var db_URL = 'mongodb://127.0.0.1/whiteboard' || 'mongodb://devslate:devslate@ds057954.mongolab.com:57954/devslate';
mongoose.connect(db_URL);
// mongoose.connect('mongodb://devslate:devslate@ds057954.mongolab.com:57954/devslate');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(cb) {
  console.log('connected to db');
});

// Required by [Mongoose Board Model](../documentation/board.html)
module.exports = db;
