module.exports = function (app) {
  //this delete the data in the server and makes new?
  app.dataSources.mongoLab.automigrate('Log', function (err) {
    if (err) throw err;

    app.models.Log.create([
      {
        "date": new Date(),
        "type": "commit to github",
        "value": 2
      }
    ], function (err, logs) {
      if (err) throw err;

      console.log('Models created: \n', logs);
      });
    });
  };

//var async = require('async');
//
////what requires and calls this module?
//module.exports = function(app) {
//  //data sources
//  var mongoDs = app.dataSources.mongoLab;
//
//  //create all models
//  async.parallel({
//    reviewers: async.apply(createReviewers),
//    coffeeShops: async.apply(createCoffeeShops),
//  }, function(err, results) {
//    if (err) throw err;
//    createReviews(results.reviewers, results.coffeeShops, function(err) {
//      console.log('> models created sucessfully');
//    });
//  });
//
//  //create reviewers
//  function createReviewers(cb) {
//    mongoDs.automigrate('Reviewer', function(err) {
//      if (err) return cb(err);
//      var Reviewer = app.models.Reviewer;
//      Reviewer.create([
//        {email: 'foo@bar.com', password: 'foobar'},
//        {email: 'john@doe.com', password: 'johndoe'},
//        {email: 'jane@doe.com', password: 'janedoe'}
//      ], cb);
//    });
//  }
//  //create coffee shops
//  function createCoffeeShops(cb) {
//    mysqlDs.automigrate('CoffeeShop', function(err) {
//      if (err) return cb(err);
//      var CoffeeShop = app.models.CoffeeShop;
//      CoffeeShop.create([
//        {name: 'Bel Cafe', city: 'Vancouver'},
//        {name: 'Three Bees Coffee House', city: 'San Mateo'},
//        {name: 'Caffe Artigiano', city: 'Vancouver'},
//      ], cb);
//    });
//  }
//  //create reviews
//  function createReviews(reviewers, coffeeShops, cb) {
//    mongoDs.automigrate('Review', function(err) {
//      if (err) return cb(err);
//      var Review = app.models.Review;
//      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
//      Review.create([
//        {
//          date: Date.now() - (DAY_IN_MILLISECONDS * 4),
//          rating: 5,
//          comments: 'A very good coffee shop.',
//          publisherId: reviewers[0].id,
//          coffeeShopId: coffeeShops[0].id,
//        },
//        {
//          date: Date.now() - (DAY_IN_MILLISECONDS * 3),
//          rating: 5,
//          comments: 'Quite pleasant.',
//          publisherId: reviewers[1].id,
//          coffeeShopId: coffeeShops[0].id,
//        },
//        {
//          date: Date.now() - (DAY_IN_MILLISECONDS * 2),
//          rating: 4,
//          comments: 'It was ok.',
//          publisherId: reviewers[1].id,
//          coffeeShopId: coffeeShops[1].id,
//        },
//        {
//          date: Date.now() - (DAY_IN_MILLISECONDS),
//          rating: 4,
//          comments: 'I go here everyday.',
//          publisherId: reviewers[2].id,
//          coffeeShopId: reviewers[2].id,
//        }
//      ], cb);
//    });
//  }
//};
