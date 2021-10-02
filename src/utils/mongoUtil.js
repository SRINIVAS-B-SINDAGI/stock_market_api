const { dbName, dbConnectionUrl } = require("../config/env.dev");
const MongoClient = require("mongodb").MongoClient;

var _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(
      dbConnectionUrl,
      { useNewUrlParser: true },
      function (err, client) {
        _db = client.db(dbName);
        return callback(err);
      }
    );
  },

  getDb: function () {
    return _db;
  },
};
