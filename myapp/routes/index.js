var express = require('express');
var router = express.Router();
//var UsersModel=require('../schema/user');
var UsersModel1=require('../schema/schema');
/* GET home page. */

router.get('/',function(req, res, next) {
  res.render('index');
});

router.get('/home',function(req, res, next) {
  res.render('home');
});
//student routing
router.get('/student',function(req, res, next) {
  UsersModel1.find(function(err,user){
    if(err)
    console.log('error');
    else{
      console.log(user);
      res.render('student',{user:user})
    }
  });
});
router.post('/student_process', function(req, res, next) {
  console.log(req.body);
  var myfile = req.files.flname;
  var myfilename = myfile.name;
  console.log("File Name " + myfilename);

  myfile.mv("public/upload/"+myfilename, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      const mystudentdata={
      fname:req.body.fname,
      lname:req.body.lname,
      flname:myfilename
    }
    var data1=UsersModel1(mystudentdata);
  
    data1.save(function(err){
      if(err)
        console.log(err);
      else
        console.log("sucess");
        res.redirect('/student');
      });
      }
  });
  
});
//delete data from student table
router.get('/deletestudent/:id',function(req,res){
  UsersModel1.findByIdAndDelete(req.params.id,function(err,project){
    if(err)
    console.log("Error");
    else{
    console.log('Record deleted');
    res.redirect('/student');
    }
  })
});
//showsingal studentdata
router.get('/showstudent/:id',function(req,res){
  console.log(req.params.id);
  UsersModel1.findById(req.params.id,function(err,user){
    if(err)
    console.log("Error"+err);
    else{
    console.log(user);
      res.render('single-record',{  user  : user  });
  }
  })
});
//StudentEditdata
router.get('/edit/:id',function(req,res){
  console.log(req.params.id);
  UsersModel1.findById(req.params.id,function(err,user){
    if(err)
    console.log("Error in fetching data"+err);
    else{
      console.log(user);
      res.render('edit',{  user  : user  });
    }
  })
});
router.post('/edit/:id', function(req, res) {
  console.log("Edit Id"+req.params.id);
  var myfile = req.files.flname;
  var myfilename = myfile.name;
  console.log("File Name " + myfilename);

    myfile.mv("public/upload/"+myfilename,function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    else
    {
      const mystudentdata=
      {
        fname:req.body.fname,
        lname:req.body.lname,
        flname:myfilename
      }
      UsersModel1.findByIdAndUpdate(req.params.id , mystudentdata, function(err){
        if(err)
        {   
          console.log(err);
          res.redirect('/student');
        }
        else
        {
          console.log("sucess");
          res.redirect('/student');
        }
      })
    }
  })
});
module.exports = router;