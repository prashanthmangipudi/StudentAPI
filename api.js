var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var StudentModel = require('./studentschema');

// Connecting to database
var query = "mongodb+srv://ganesha:ananyam2010@cluster0.qi9hz.mongodb.net/GraphQLDB?retryWrites=true&w=majority"

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
	if (error) {
		console.log("Error!" + error);
	}
});

module.exports = router;

router.get('/save', function(req, res) {
    var newStudent = new StudentModel({StudentId:101, 
        Name:"Shiva", Roll:2, Birthday:'2001-01-01'});

    newStudent.save(function(err, data) {
        if(err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});

router.post('/save', function(req, res) {
    var newStudent = new StudentModel();
       newStudent.StudentId = req.body.StudentId;
       newStudent.Name = req.body.Name;
       newStudent.Roll = req.body.Roll;
       newStudent.Birthday = req.body.Birthday;
       
       newStudent.save(function(err, data){
           if(err){
               console.log(error);
           }
           else{
               res.send("Data inserted");
           }
       });
});

router.get('/findall', function(req, res) {
    console.log("I am in findall")
    StudentModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
 });


 router.get('/findfirst', function(req, res) {
    StudentModel.findOne({StudentId:{$gt:185}}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

router.get('/delete', function(req, res) {
    StudentModel.remove({StudentId:188}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

router.post('/update', function(req, res) {
    StudentModel.findByIdAndUpdate(req.body.id, 
    {Name:req.body.Name}, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data updated!");
        }
    });  
});