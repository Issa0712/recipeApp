import {getSavedData, saveRecipes, renderRecipe, removeRecipe, addIngredient, renderIngredients} from './recipes-functions'
import { v4 as uuidv4 } from 'uuid';


let recipes = getSavedData()
console.log(recipes)


let recipeTitle = document.querySelector('#recipeTitle')
let recipeInstruction = document.querySelector('#recipeInstruction')
let ingredientInput = document.querySelector('#ingredientInput')
let cookingTime = document.querySelector('#cooking_time')
let serves = document.querySelector('#serves')
const recipeId = location.hash.substring(1)
let recipe = recipes.find((recipe) => recipe.id === recipeId)


 renderRecipe(recipe)


 recipeTitle.addEventListener('input', ((e) => {
    recipe.title = e.target.value
    recipeTitle.value = recipe.title
    saveRecipes(recipe)
    }))

recipeInstruction.addEventListener('input', ((e) => {
    recipe.instruction = e.target.value
    saveRecipes(recipe)
  }))

cookingTime.addEventListener('input', ((e) => {
    recipe.cookingTime = e.target.value
    cookingTime.value = recipe.cookingTime
    saveRecipes(recipe)
}))

serves.addEventListener('input', ((e) => {
    recipe.serves = e.target.value
    saveRecipes(recipe)
}))


document.querySelector('#update-recipe').addEventListener('click', () => {
 
    recipe.id = window.location.hash.substr(1)
    recipeTitle.value = recipe.title
    recipeInstruction.value = recipe.instruction
    cookingTime.value = recipe.cookingTime
    serves.value = recipe.serves

    //store allRecipes into local storage
    saveRecipes(recipes)
    //Redirect to home page
    window.location.assign('./index.html')
})



const deleteBtn = document.querySelector('#delete')
deleteBtn.addEventListener('click', (() => {
    removeRecipe(recipe.id)
    console.log(recipes)
    location.assign('index.html')
 
}))

const form = document.querySelector('#ingredients-form')
form.addEventListener('submit',function(e) {
    e.preventDefault()
    addIngredient(e, recipe.ingredients)
    e.target.elements[0].value = ''
    renderIngredients(recipe.ingredients)
    saveRecipes(recipes)
})



window.addEventListener('storage', (e)=> {
    if(e.key === 'recipes') {
      recipes = JSON.parse(e.newValue)
      recipe = recipes.find(function(recipe) {
       return recipe.id === recipeId
   })
   
   if (recipe === undefined) {
       location.assign('index.html')
   }
 
   recipeTitle.value = recipe.title
   recipeInstruction.value = recipe.instruction
   cookingTime.value = recipe.cookingTime
   serves.value = recipe.serves
  
 
    }
   })


  
