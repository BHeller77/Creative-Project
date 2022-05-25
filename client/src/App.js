import './App.css';
import {useState} from "react";
import Axios from 'axios';
// import { Routes, Route, Link} from "react-router-dom";

import Recipes from './Components/Recipes';

// import ShowRecipes from "./Components/ShowRecipes";

var loggedIn = false;
var currID=0;
var currUsername="";

function App() {
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [recipeTitle, setTitle] = useState("");

  // recipes
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [ntitle, setNTitle] = useState("");
  const [ndescription, setNDescription] = useState("");
  const [ntime, setNTime] = useState("");


  // reviews
  const [revTitle, setrevTitle] = useState("");
  const [revRating, setrevRating] = useState("");
  const [revComment, setrevComment] = useState("");
  const [nRRating, setNRRating] = useState("");
  const [nRComment, setNRComment] = useState("");

  const addUser = () => {
    console.log(username);
    if(loggedIn === false){
      Axios
      .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/create', {username: username, password: password })
      // .then(()=> {
      //   console.log("added user");
      //   alert("added user: " + username);
      // })
      .then(resp => {
        console.log(resp.data);

        if(resp.data === true){
          alert("added user: " + username);
        }
        else{
          alert("user already exists");
        }
      })
      .catch(err => {
        // Handle Error Here
        console.error(err);
      });
    }
    else{
      alert("you are already logged in.");
    }
  };

  const login = () => {
    // console.log(recipeTitle);
    if(loggedIn === false){
      Axios
      .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/login', {username: username, password: password })
      .then(resp => {
        var check = JSON.parse(JSON.stringify(resp.data));
        
        //console.log(JSON.parse(JSON.stringify(resp)));
        if(check.length>0){
          currID = JSON.parse(JSON.stringify(resp.data[0].userID));
          alert(username + " is logged in");
          loggedIn = true;
          currUsername = username;
          console.log(loggedIn);
          
        }
        else{
          alert("you were not logged in :(");
        }
        //alert("logged in");
      })
      .catch(err => {
        // Handle Error Here
        console.error(err);
      });
    }
    else{
      alert("you are already logged in.");
    }
  };

  const logout = () => {
    // console.log(recipeTitle);
    loggedIn = false;
    alert("you have been logged out");
    console.log(loggedIn);
  };

  const createRecipe = () => {
    if(loggedIn === true){
    Axios
    .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/createRecipe', {title: title, description: description, time: time, username: currUsername, userID: currID })
    .then(resp => {
      alert("Recipe " + title + " has been created");
    })
    .catch(err => {
      // Handle Error Here
      console.error(err);
    });
    }
    else {
      alert("You are not logged in.")
    }
  };

  const deleteRecipe = () => {
    if(loggedIn === true){
    Axios
    .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/deleteRecipe', {title: title, userID: currID })
    .then(resp => {
      if (resp.data === true) {
        alert("Recipe " + title + " has been deleted.");
      }
      else {
        alert("Recipe " + title + " does not exist or is owned by another user.");
      }
    })
    .catch(err => {
      // Handle Error Here
      console.error(err);
    });
    }
    else {
      alert("You are not logged in.")
    }
  };

  const editRecipe = () => {
    if(loggedIn === true){
    Axios
    .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/editRecipe', {ntitle: ntitle, title: title, ndescription: ndescription, ntime: ntime, userID: currID })
    .then(resp => {
      if (resp.data === true) {
        alert("Recipe " + ntitle + " has been changed.");
      }
      else {
        alert("Recipe " + title + " does not exist or is owned by another user.");
      }
    })
    .catch(err => {
      // Handle Error Here
      console.error(err);
    });
    }
    else {
      alert("You are not logged in.");
    }
  };
  
  const createReview = () => {
    if(loggedIn === true){
    Axios
    .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/createReview', {revTitle: revTitle, revComment: revComment, revRating: revRating, userID: currID })
    .then(resp => {
      alert("Review " + revTitle + " has been created");
    })
    .catch(err => {
      // Handle Error Here
      console.error(err);
    });
    }
    else {
      alert("Review was not created...");
    }
  };

  const deleteReview = () => {
    if(loggedIn === true){
    Axios
    .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/deleteReview', {revTitle: revTitle, userID: currID })
    .then(resp => {
      if (resp.data === true) {
        alert("Review on:  " + revTitle + " has been deleted.");
      }
      else {
        alert("Review on: " + revTitle + " does not exist or is owned by another user.");
      }
    })
    .catch(err => {
      // Handle Error Here
      console.error(err);
    });
    }
    else {
      alert("You are not logged in.")
    }
  };

  const editReview = () => {
    if(loggedIn === true){
    Axios
    .post('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/editReview', {revTitle: revTitle, nRRating: nRRating, nRComment: nRComment, userID: currID })
    .then(resp => {
      if (resp.data === true) {
        alert("Review on: " + revTitle + " has been changed.");
      }
      else {
        alert("Review on: " + revTitle + " does not exist or is owned by another user.");
      }
    })
    .catch(err => {
      // Handle Error Here
      console.error(err);
    });
    }
    else {
      alert("You are not logged in.")
    }
  };


  return (
    <div className="App">
            {/* <Routes>
              {
                <Route path="/showrecipes" element={<ShowRecipes />} />
              }
            </Routes>
            <Link to="/showrecipes">Show recipes</Link> */}

      {/* Create Recipe Section */}
      <center>
      <div className='requestInfo'>
        <label>Username: </label>
        <input type="text" onChange={(event) => {
          setUsername(event.target.value);
          }}
        />
        <label>Password: </label>
        <input type="text" onChange={(event) => {
          setPassword(event.target.value);
          }}
        />
        {/* <label>Recipe Title:</label>
        <input type="text" onChange={(event) => {
          setTitle(event.target.value);
          }}
        /> */}
        <button onClick={addUser}>Create Account</button>
        <button onClick={login}>Login</button>
        <button id="logout" onClick={logout} >Logout</button>
      </div>
      <br></br>
      </center>
      <center>
      <div className="row">
        <div className="column">
          <label>Title: </label>
          <input type="text" onChange={(event) => {
            setTitle(event.target.value);
            }}
          /><br></br>
          <label>Description: </label>
          <input type="text" onChange={(event) => {
            setDescription(event.target.value);
            }}
          /><br></br>
          <label>Time: </label>
          <input type="text" onChange={(event) => {
            setTime(event.target.value);
            }}
          /><br></br>
          <button onClick={createRecipe}>Create Recipe</button>
          </div>
          
        <div className="column">
          <label>Old Title: </label>
          <input type="text" onChange={(event) => {
            setTitle(event.target.value);
            }}
          /><br></br>
          <label>New Title: </label>
          <input type="text" onChange={(event) => {
            setNTitle(event.target.value);
            }}
          /><br></br>
          <label>New Description: </label>
          <input type="text" onChange={(event) => {
            setNDescription(event.target.value);
            }}
          /><br></br>
          <label>New Time: </label>
          <input type="text" onChange={(event) => {
            setNTime(event.target.value);
            }}
          /><br></br>
          <button onClick={editRecipe}>Edit Recipe</button>
        </div>
        <div className="column" >
          <label>Title: </label>
          <input type="text" onChange={(event) => {
            setTitle(event.target.value);
            }}
          /><br></br>
          <button onClick={deleteRecipe}>Delete Recipe</button>
          {/* <Link to="/showrecipes">Show Recipes</Link> */}
        
        </div>
          
      

      

      
      

      {/* REVIEW SECTION */}
      <div className="column">
          <label>Title: </label>
          <input type="text" onChange={(event) => {
            setrevTitle(event.target.value);
            }}
          /><br></br>
          <label>Rating: </label>
          <input type="integer" onChange={(event) => {
            setrevRating(event.target.value);
            }}
          /><br></br>
          <label>Comment: </label>
          <input type="text" onChange={(event) => {
            setrevComment(event.target.value);
            }}
          /><br></br>
          <button onClick={createReview}>Create Review</button>
          </div>
          
        <div className="column">
          <label>Old Title: </label>
          <input type="text" onChange={(event) => {
            setrevTitle(event.target.value);
            }}
          /><br></br>
          <label>New Rating: </label>
          <input type="integer" onChange={(event) => {
            setNRRating(event.target.value);
            }}
          /><br></br>
          <label>New Comment: </label>
          <input type="text" onChange={(event) => {
            setNRComment(event.target.value);
            }}
          /><br></br>
          <button onClick={editReview}>Edit Review</button>
        </div>
        <div className="column" >
          <label>Title: </label>
          <input type="text" onChange={(event) => {
            setrevTitle(event.target.value);
            }}
          /><br></br>
          <button onClick={deleteReview}>Delete Review</button>
          {/* <Link to="/showrecipes">Show Recipes</Link> */}
        
        </div>

      </div>
      </center>
      
      <Recipes />
    </div>
  );
}

export default App;
