const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const Connection = require("mysql/lib/Connection");

app.use(cors());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());


const db = mysql.createConnection({
    user: 'remote',
    port: '3306',
    host: '54.159.199.112',
    password: 'password',
    database: 'recipesystem',
});


db.connect(function(err){
    if (err){
        console.log(err.code);
        console.log(err.fatal);
    }
    else{
        console.log("connected to mysql");
    }
    
})

app.post('/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    var work = false;

    // if(db.connect()){
    //     console.log(db.connect());
    // }
    //  
    db.query('SELECT * from users WHERE username = ?', [username], function(error, results){
        if(error) throw error;

        if(results.length >0){
            console.log("we are here");
            res.send(work);
        }
        else{
            db.query('INSERT INTO users (username, password) VALUES (?,?)', [username, password], (err,result) =>{
                if(err){
                    console.log(err);
                    // console.log("im here");
                }
                else{
                    // console.log("here");
                    work = true;
                    res.send(work);
                }
            });
        }
    });
    //console.log("im over here");

});

app.post('/login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    // if(db.connect()){
    //     console.log(db.connect());
    // }
    //  

    db.query('SELECT * from users WHERE username = ? and password = ?', [username, password], function(error,results){
        if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				//response.redirect('/home');
                response.send(results);
			} else {
				response.send(results);
			}			
			response.end();
		});
});

app.post('/createRecipe', (request, response) => {
    const username = request.body.username;
    const title = request.body.title;
    const description = request.body.description;
    const time = request.body.time;
    const userID = request.body.userID;

        db.query('SELECT rDescription, rTitle, rTime, username FROM recipes, users WHERE users.userID = recipes.userID and rTitle = ?',[title], function(error, results){
            if(error) throw error;
    
            if(results.length > 0){
                console.log("we are here");
                response.send(false);
            }
            else{
                    db.query('INSERT into recipes (userID, rTitle, rDescription, rTime) VALUES (?,?,?,?)', [userID, title, description, time], (error,results) =>{
                        if (error) throw error;
                        else{
                            response.send(results);
                        }
                    });
            }
         });
});

app.post('/deleteRecipe', (request, response) => {
    const title = request.body.title;
    const userID = request.body.userID;

        db.query('SELECT * FROM recipes WHERE userID = ? and rTitle = ?',[userID, title], function(error, results){
            if(error) throw error;
    
            if(results.length > 0){
                db.query('DELETE from recipes WHERE userID = ? AND rtitle = ?', [userID,title], (error,results) =>{
                    if (error) throw error;
                    else{
                        // console.log("here");
                        response.send(true);
                    }
                });
            }
            else{
                response.send(false);
            }
         });
});

app.post('/editRecipe', (request, response) => {
    const title = request.body.title;
    const userID = request.body.userID;
    const ntitle = request.body.ntitle;
    const ndescription = request.body.ndescription;
    const ntime = request.body.ntime;

        db.query('SELECT * FROM recipes WHERE userID = ? and rTitle = ?',[userID, title], function(error, results){
            if(error) throw error;
    
            if(results.length > 0){
                db.query('UPDATE recipes SET rTitle = ?, rDescription = ?, rTime = ? WHERE userID = ? AND rtitle = ?', [ntitle, ndescription, ntime, userID, title], (error,results) =>{
                    if (error) throw error;
                    else{
                        // console.log("here");
                        response.send(true);
                    }
                });
            }
            else{
                response.send(false);
            }
         });
});


app.post('/createReview', (request, response) => {
    const username = request.body.username;
    const revTitle = request.body.revTitle;
    const revComment = request.body.revComment;
    const revRating = request.body.revRating;
    const userID = request.body.userID;
    //console.log(users.userID);
        db.query('SELECT * from recipes WHERE rTitle = ?',[revTitle], function(error, results){
            if(error) throw error;
    
            if(results.length = 0){
                console.log("we are here");
                response.send(false);
            }
            else{
                    db.query('INSERT into reviews (userID, revTitle, revComment, revRating) VALUES (?,?,?,?)', [userID, revTitle, revComment, revRating], (error,results) =>{
                        if (error) throw error;
                        else{
                            response.send(results);
                        }
                    });
            }
         });
});

app.post('/deleteReview', (request, response) => {
    const revTitle = request.body.revTitle;
    const userID = request.body.userID;

        db.query('SELECT * FROM reviews WHERE userID = ? and revTitle = ?',[userID, revTitle], function(error, results){
            if(error) throw error;
    
            if(results.length > 0){
                db.query('DELETE from reviews WHERE userID = ? AND revTitle = ?', [userID,revTitle], (error,results) =>{
                    if (error) throw error;
                    else{
                        // console.log("here");
                        response.send(true);
                    }
                });
            }
            else{
                response.send(false);
            }
         });
});

app.post('/editReview', (request, response) => {
    const revTitle = request.body.revTitle;
    const userID = request.body.userID;
    const nRComment = request.body.nRComment;
    const nRRating = request.body.nRRating;

        db.query('SELECT * FROM reviews WHERE userID = ? and revTitle = ?',[userID, revTitle], function(error, results){
            if(error) throw error;
    
            if(results.length > 0){
                db.query('UPDATE reviews SET revComment = ?, revRating = ? WHERE userID = ? AND revTitle = ?', [nRComment, nRRating, userID, revTitle], (error,results) =>{
                    if (error) throw error;
                    else{
                        // console.log("here");
                        response.send(true);
                    }
                });
            }
            else{
                response.send(false);
            }
         });
});

app.get('/recipes', (request, response) => {
    db.query('SELECT rDescription, rTitle, rTime, username FROM recipes, users WHERE users.userID = recipes.userID', (error, results) => {
        if (error) throw error;
        else{
            response.send(results);
        }
    });
});

app.get('/reviews', (request, response) => {
    db.query('SELECT revTitle, revRating, revComment, username FROM users, reviews, recipes WHERE users.userID = reviews.userID and reviews.revTitle = recipes.rTitle', (error, results) => {
        if (error) throw error;
        else{
            response.send(results);
        }
    });
});

// app.post('/home', (req, res) => {
    

// });


app.listen(9000, () =>{
    console.log("server is running on port 9000");
});
