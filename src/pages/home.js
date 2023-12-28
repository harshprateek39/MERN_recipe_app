import axios from 'axios';
import React from 'react';
import {useCookies} from "react-cookie";
import { useState ,useEffect } from 'react'
import { useGetUserID } from "../hooks/useGetuserID";
import loading from '../components/loading.gif'
const Home = () => {
  const [recipe,setRecipe]=useState([]);
  const [savedRecipe,setsavedRecipe]=useState([]);
  const [cookies, setCookies] =useCookies(["access"])
  const userID=useGetUserID();
  useEffect(()=>{
const fetchRecipe =async()=>{
  try {
    const response = await axios.get("https://mern-recipe-backend-fz6l.vercel.app/recipes");
     setRecipe(response.data);
    console.log(recipe +"aa");
    
  } catch (error) { 
    console.log(error); 
  }
} 
const fetchSavedRecipe=async()=>{
  
  try { 
    const response = await axios.get(`https://mern-recipe-backend-fz6l.vercel.app/recipes/savedRecipe/ids/${userID}`);
   setsavedRecipe(response.data.savedRecipe);
   
  } catch (error) {
    console.log("error");
  }
}
fetchRecipe();
if(cookies.access){
fetchSavedRecipe();}

  },[]);

  const saveRecipe=async(recipeID)=>{
    
    
    try {
      const response = await axios.put("https://mern-recipe-backend-fz6l.vercel.app/recipes",{recipeID,userID},
      {headers:{authorization:cookies.access}});
      setsavedRecipe(response.data.savedRecipe);
      
    } catch (error) {
      console.log(error);
    }
  };
 const isRecipeSaved=(id)=>{
  console.log(savedRecipe.includes(id));
   return savedRecipe.includes(id);
 }
  return (
    <div className='home'>
      <h1>Recipes</h1>
      <div className='card-container'>
        {recipe.length!=0?recipe.map((recipe) => (
            
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
            {cookies.access?<button  className='saveButton'
                onClick={() => {saveRecipe(recipe._id) ; isRecipeSaved(recipe._id) }  }
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>:<></> }
            </div>
            </div>
          
        )):<div style={{ width:"100vw" ,display:"flex" , justifyContent:"center" ,alignItems:"center" }} ><img style={{ width:"200px"}} src={loading}></img></div>
        }</div>
      
    </div>
  )
}

export default Home