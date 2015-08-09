module.exports = function(app){
  var router = app.loopback.Router();
  router.get('/', function(req, res){
    res.redirect('dist/index.html')
  });
  app.use(router);
}
