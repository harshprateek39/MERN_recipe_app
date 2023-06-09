import axios from 'axios';
import React from 'react'
import { useState ,useEffect } from 'react'
import { useGetUserID } from "../hooks/useGetuserID";
import {useCookies} from "react-cookie";
const SavedRecipe = () => {
  const [cookies, setCookies] =useCookies(["access"])
  const [savedRecipe,setsavedRecipe]=useState([]);
  
  const userID=useGetUserID();
  useEffect(()=>{

const fetchSavedRecipe=async()=>{
  
  try { 
    const response = await axios.get(`https://mern-recipe-backend-fz6l.vercel.app/recipes/savedRecipe/${userID}`);
   setsavedRecipe(response.data);
   console.log(response.data.savedRecipe);
   console.log(savedRecipe.length==0);
  } catch (error) {
    console.log("error");
  }
}
if(cookies.access){
fetchSavedRecipe();}

  },[]);
  return (
    <div className='home'>
      {cookies.access?<h1>Saved Recipes</h1>:<h1>Login to View</h1>}
      {(savedRecipe.length==0)?<h1>Ahhh.. Add something to your List</h1>:<></>}
      <div className='card-container'>
        {savedRecipe.map((recipe) => (
            
            <div key={recipe._id} className='main-card' ><div>
              <h2>{recipe.name}</h2>
              <hr/>
               
            </div> 
            <div className="instructions">
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name}  />
            <div className='card-footer'>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            
                
            </div>
            </div>
          
        ))}</div>
      
    </div>
  )
}

export default SavedRecipe;