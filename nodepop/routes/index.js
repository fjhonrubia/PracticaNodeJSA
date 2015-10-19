var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(500).json({
    ok:false,
    error: {
      code: 500,
      msg: 'ERROR: Page not found',
    }
  });
});

module.exports = router;
