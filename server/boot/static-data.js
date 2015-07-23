module.exports = function (app) {

  //automigrate renews schema objects, autoupdate keeps it
  app.dataSources.mongoLab.autoupdate('Log', function (err) {
    if (err) throw err;

    var Log = app.models.Log;

    Log.create([
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
