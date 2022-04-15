var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/users', function(req, res) {
  request('https://jsonplaceholder.typicode.com/users', function(error, response, body) {
      res.json(body)
  });
});

function doCall(urlToCall, callback) {
                            
    const options = {
      url: 'https://tableau.schneider-electric.com/api/3.4/auth/signin',
      json: true,
      body: {
        "credentials": {
            "name": "APA\\sesa592025",
            "password": "Oneplussix@1995",
            "site": {
                "contentUrl": "ETOSmartfactoryBI"
            }
        }
    }
  };
  
  request.post(options, (err, resp, body) => {
      if (err) {
          return console.log(err);
      }
      return callback(body.credentials.token);
    });
}



router.get('/getsite', function(req, res) {
  var urlToCall = "http://myUrlToCall";
  doCall(urlToCall, function(response2){
    // Here you have access to your variable
    console.log(response2);
    request({
      url: "https://tableau.schneider-electric.com/api/3.4/sites",
      method: "GET",
      json: true,   // <--Very important!!!
      headers: {
        "X-Tableau-Auth": response2,  // <--Very important!!!
        }
      }, function (error, response, body2){
            console.log(response);
            res.json(body2);
    });
  })
    
});


router.post('/adduser', function(req, res) {
  
  var urlToCall = "http://myUrlToCall";
  doCall(urlToCall, function(response2){
    // Here you have access to your variable
    console.log(response2);
    request({
      url: "https://tableau.schneider-electric.com/api/3.4/sites/29ea5871-2954-4f12-abd2-4540f391ff6e/users",
      method: "POST",
      json: true,   // <--Very important!!!
      headers: {
        "X-Tableau-Auth": response2,  // <--Very important!!!
        },
      body: req.body
      }, function (error, response, body2){
            console.log(response);
            res.json(body2);
    });
  })
    
});

router.get('/getuserId/:filter', function(req, res) {
  var urlToCall = "http://myUrlToCall";
  doCall(urlToCall, function(response2){
    // Here you have access to your variable
    console.log(response2);
    request({
      url: "https://tableau.schneider-electric.com/api/3.4/sites/29ea5871-2954-4f12-abd2-4540f391ff6e/users?"+req.params.filter,
      method: "GET",
      json: true,   // <--Very important!!!
      headers: {
        "X-Tableau-Auth": response2,  // <--Very important!!!
        }
      }, function (error, response, body2){
            console.log(response);
            res.json(body2);
    });
  })
    
});


router.post('/addusertogroup', function(req, res) {
  
  var urlToCall = "http://myUrlToCall";
  doCall(urlToCall, function(response2){
    // Here you have access to your variable
    console.log(response2);
    request({
      url: "https://tableau.schneider-electric.com/api/3.4/sites/29ea5871-2954-4f12-abd2-4540f391ff6e/groups/124bad36-2a2e-442a-80dd-6ed6a9b0429e/users",
      method: "POST",
      json: true,   // <--Very important!!!
      headers: {
        "X-Tableau-Auth": response2,  // <--Very important!!!
        },
      body: req.body
      }, function (error, response, body2){
            console.log(response);
            res.json(body2);
    });
  })
    
});


module.exports = router;
