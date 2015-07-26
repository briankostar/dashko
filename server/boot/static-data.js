//module.exports = function (app) {
//
//  //automigrate renews schema objects, autoupdate keeps it
//  app.dataSources.mongoLab.automigrate('Log', function (err) {
//    if (err) throw err;
//
//    var Log = app.models.Log;
//
//    Log.create([
//      {
//        "date": new Date(),
//        "unit": "time(s)",
//        "value": 2
//      }
//    ], function (err, logs) {
//      if (err) throw err;
//
//      console.log('Log created: \n', logs);
//    });
//
//  });
//};

var async = require('async');

module.exports = function(app) {
  //data sources
  var mongoLab = app.dataSources.mongoLab;

  //create all models
  async.parallel({
    logs: async.apply(createLogs),
    groups: async.apply(createGroups)
  }, function(err, results) {
    if (err) throw err;
    //createReviews(results.reviewers, results.coffeeShops, function(err) {
      console.log('> models created sucessfully');
    //});
  });

  //create reviewers
  function createLogs(cb) {
    mongoLab.automigrate('Log', function(err) {
      if (err) return cb(err);
      var Log = app.models.Log;
      Log.create([
        {
          "date": new Date(),
          "unit": "time(s)",
          "value": 2
        }
      ], cb);
    });
  }
  //create coffee shops
  function createGroups(cb) {
    mongoLab.automigrate('Group', function(err) {
      if (err) return cb(err);
      var Group = app.models.Group;
      Group.create([
        {
          "name": "exercise",
          "description": "Daily exercise in minutes"
        }
      ], cb);
    });
  }
};
