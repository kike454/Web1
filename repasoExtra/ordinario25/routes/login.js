var express = require('express');
var router = express.Router();

const database  = require('../database');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' , user : req.session.uname});
});


router.post('/',  async function(req, res){
  /*
    console.log(req.session);
    console.log("klklk", req.session.uname);
    console.log(database.users.data);

    console.log(req.body);
    console.log(req.body.uname);
    */
    const name = req.body.uname;
    const pass = req.body.psw;

    const isValid = await database.users.isLoginRight(name, pass);
    
    //console.log(isValid);

    if(isValid){
      /** 
      console.log("se mete")
     
      console.log(req.session.user);
      */
      req.session.user = req.body.uname;
      res.redirect('restricted');
    }else{
      res.render('login');
    }

   
});

module.exports = router;