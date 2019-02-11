var express = require('express');
var router = express.Router();
var UsersModel=require('../schema/user');

//Employee Routing
router.get('/Register',function(req, res, next) {
    UsersModel.find(function(err , user){
      if(err)
      console.log("Error");
      else{
        console.log(user);
        res.render('regi',{ user  : user });  
      }
      })
  });
  //Registration processing
  router.post('/Register-process',function(req, res, next) {
    console.log(req.body);
    var myfile=req.files.user_file;
    var myfilename=myfile.name;
    console.log("File Name " + myfilename);

  myfile.mv("public/upload/"+myfilename, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    else{
    //Array of Data
    const mybodydata = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_mobile: req.body.user_mobile,
        user_file:myfilename
      }
      var data = UsersModel(mybodydata);
      data.save(function(err) {
        if (err)
            res.render('regi');
       else  
          res.redirect('/Register');
      })
    }
  });
});
  //delete data from employee table
  router.get('/delete/:id',function(req,res){
    UsersModel.findByIdAndDelete(req.params.id,function(err,project){
      if(err)
      console.log("Error");
      else{
      console.log('Record deleted');
      res.redirect('/Register');
      }
    })
  });  
  //showsingal Employee data
  router.get('/show/:id',function(req,res){
    console.log(req.params.id);
    UsersModel.findById(req.params.id,function(err,user){
      if(err)
      console.log("Error"+err);
      else{
      console.log(user);
        res.render('Esingle-record',{  user  : user  });
    }
    })
  });
  //EmployeeEditdata
  router.get('/redit/:id',function(req,res){
    console.log(req.params.id);
    UsersModel.findById(req.params.id,function(err,user){
      if(err)
      console.log("Error in fetching data"+err);
      else{
        console.log(user);
        res.render('Eedit',{  user  : user  });
      }
    })
  });
  //post method Edit for Registration 
  router.post('/redit/:id', function(req, res) {
    var myfile=req.files.user_file;
    var myfilename=myfile.name;
    console.log("Edit Id"+req.params.id);
    myfile.mv("public/upload/"+myfilename,function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      else
      {
      const mybodydata = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_mobile: req.body.user_mobile,
      user_file:myfilename
    }
    UsersModel.findByIdAndUpdate(req.params.id , mybodydata, function(err){
      if(err)
      {  
      console.log(err);
        res.redirect('/Register');
      }
        else{
        console.log("sucess");
        res.redirect('/Register');
      }
      })
   } 
});
  });  
  module.exports = router;