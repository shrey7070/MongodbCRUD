var mongoose=require('mongoose');
var Schema1=mongoose.Schema;

var myuser1=new Schema1({
    fname:String,
    lname:String,
    flname:String  
    });
    
module.exports=mongoose.model('student123',myuser1);