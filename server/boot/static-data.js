module.exports = function (app) {

  //automigrate renews schema objects, autoupdate keeps it
  app.dataSources.mongoLab.automigrate('Log', function (err) {
    if (err) throw err;

    var Log = app.models.Log;

    Log.create([
      {
        "date": new Date(),
        "unit": "time(s)",
        "value": 2
      }
    ], function (err, logs) {
      if (err) throw err;

      console.log('Models created: \n', logs);
    });
  });
};
