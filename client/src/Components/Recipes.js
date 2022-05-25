import '../App.css';
import React, { useState } from 'react';
//import {state} from "react";
import Axios from 'axios';

// class Recipes extends Component{
    
    // constructor(props){
    //     super(props);
    //     this.state={
    //         recipeList: []
    //     };
    // }
function Recipes(){

    const [recipeList, setRecipes] = useState([]);
    const [reviewList, setReviews] = useState([]);


    const getRecipes = () => {
        Axios
        .get('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/recipes')
        .then((response)=>{
          console.log(response.data);
          setRecipes(response.data);
        });
    }

    const getReviews = () => {
        Axios
        .get('http://ec2-54-159-199-112.compute-1.amazonaws.com:9000/reviews')
        .then((response)=>{
            console.log(response.data);
            setReviews(response.data);
        });
    }
    
        return(
        <div className='containerDiv'>
            <div className="Recipes">
                <button onClick={getRecipes}>get recipes</button>
                {recipeList.map((val,key)=>{
                    return( 
                    <div className="recipe" key={val.rTitle}> 
                        <h3>Title: {val.rTitle}</h3>
                        <h3>Description: {val.rDescription}</h3>
                        <h3>Estimated Prep Time: {val.rTime} hrs</h3>
                        <h3>By: {val.username} </h3>
                        
                    </div>
                    )
                })}
            </div>
            <div className="Reviews">
                <button onClick={getReviews}>get reviews</button>
                {reviewList.map((val,key)=>{
                    return( 
                    <div className="recipe" key={val.revTitle}> 
                        <h3>Title of Recipe: {val.revTitle}</h3>
                        <h3>Rating: {val.revRating}</h3>
                        <h3>Review Comment: {val.revComment}</h3>
                        <h3>By: {val.username} </h3>
                        
                    </div>
                    )
                })}
            </div>
        </div>

            
            
        );
    
}
export default Recipes