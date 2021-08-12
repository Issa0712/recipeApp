import { v4 as uuidv4 } from 'uuid';
import {recipes} from './app'


//retreive saved recipes
const getSavedData = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
         return recipesJSON  ?  JSON.parse(recipesJSON) : [] 
    } catch(e) {
      return []
    }}

//save recipes to local storage
const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
 }

 //remove recipes from the recipes array

const removeRecipe =  (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
    recipes.splice(recipeIndex, 1)
    console.log(recipes)
    saveRecipes(recipes)   
}

//add ingredients to ingredients array 

const addIngredient = (e, recipeIngredients) => {
    let id = uuidv4()
    recipeIngredients.push({
        id: id,
        Text:e.target.elements[0].value, 
        completed: false
    })
}

//render ingredients array onto the DOM


const renderIngredients = (ingredients) => {
    //Select the ingredients section
    const ingredientSection = document.querySelector('#ingredient-List')
    //Clear Ingredients Section
    ingredientSection.textContent = ' '
    
    
    ingredients.forEach( (element) => {
        //create the ingredient element
        const ingredientItem = document.createElement('p')
        //add checkbox to item
        const checkBox = document.createElement('input')
        checkBox.setAttribute('type','checkbox')
        checkBox.checked = element.completed
        checkBox.classList.add('checkbox') 
        //check for checkbox changes and update ingredient status
        checkBox.addEventListener('change', (e) => {
            element.completed = e.target.checked
            saveRecipes(recipes)
        })

        ingredientItem.appendChild(checkBox)
        //add element title to item
        let itemName = document.createElement('span')
        if (element.Text.length === 0){
            itemName.textContent = 'Unnamed Ingredient'
        } else {
            itemName.textContent = element.Text
        }
        itemName.classList.add('text-element')
        ingredientItem.appendChild(itemName)
        //addremove button to item
        const removeButton = document.createElement('button')
        removeButton.innerHTML = 'X'
        removeButton.classList.add('remove-element')

        removeButton.addEventListener('click', function(){
            deleteIngredient(ingredients, element)
            renderIngredients(ingredients)
        })
        ingredientItem.appendChild(removeButton)
        //return item as ingredient element
        ingredientSection.appendChild(ingredientItem)
    })
}

const deleteIngredient = (ingredients, element) => {
    const ingredientIndex = ingredients.findIndex( (ingredient) => ingredient.id === element.id )
    ingredients.splice(ingredientIndex, 1)
}



const filterRecipes = (recipes, filter) => {
   /// recipes = new Array
   return recipes.filter((recipe) => recipe.title.toLowerCase().includes(filter))
   

}



const renderFilteredRecipes = (filteredRecipes) => {
    let recipeDIV = document.querySelector('#recipe-card')
    recipeDIV.textContent = ''
    filteredRecipes.forEach(recipeCard)
}


const calculateCompletionStatus = (recipe) => {
    let count = 0
    //count number of items in ingredient list
    let numberOfIngredients = recipe.ingredients.length
    console.log(numberOfIngredients)
    //count number of ingredients checked-off
    recipe.ingredients.forEach( (ingredient) =>{
        if (ingredient.completed === true){
            count++
        }
    })
    
    if (count === 0){
        return 'You have<span> none </span>of the ingredients'
    } else if (count === numberOfIngredients){
        return 'You have<span> all </span>the ingredients'
    } else {
        return 'You have<span> some </span>of the ingredients'
    }
}

const loadMainPage = () => {
    //Retrieve all recipes from local storage
    const recipesFromStorage = getSavedData();

    //Display each recipe in local storage
    if (recipesFromStorage.length === 0){
        let recipesDIV = document.querySelector('#recipe-card')
        let titleParagraph = document.createElement('h2')
        titleParagraph.innerHTML = 'You currently have 0 recipes stored in your Recipe App!'
        recipesDIV.appendChild(titleParagraph)
    } else{
         recipesFromStorage.forEach(recipeCard)
         }}

const renderRecipe = (recipe) => {

    const recipeTitle = document.querySelector('#recipeTitle')
    const recipeInstruction = document.querySelector('#recipeInstruction')
    const cookingTime = document.querySelector('#cooking_time')
    const serves = document.querySelector('#serves')

    // recipe.id = window.location.hash.substr(1)

    recipeTitle.value = recipe.title
    recipeInstruction.value = recipe.instruction
    cookingTime.value = recipe.cookingTime
    serves.value = recipe.serves

    renderIngredients(recipe.ingredients)
}

const recipeCard = (recipe) => {
    //main div on homepage
    let recipeDiv = document.querySelector('#recipe-card')

    //main card is a link
    const a = document.createElement('a')
    a.setAttribute('href', `edit.html#${recipe.id}`)
    a.classList.add('item')

    //card Title
    let cardTitle = document.createElement('h4')
    cardTitle.textContent = recipe.title

    //cooking time

    let cardCookingTime = document.createElement('p')
    if(recipe.cookingTime === '') {
        cardCookingTime.textContent = '0 mins'
    } else {
        cardCookingTime.textContent = recipe.cookingTime

    }
    // serves

    let serves = document.createElement('p')
    let spanClock = document.createElement('span')
    let spanServing = document.createElement('span')
    let iconClock = document.createElement('i')
    let iconServe = document.createElement('i')
    iconClock.classList.add('fa')
    iconClock.classList.add('fa-clock-o')
    iconServe.classList.add('fa')
    iconServe.classList.add('fa-cutlery')
    spanClock.appendChild(iconClock)
    spanServing.appendChild(iconServe)
    serves.appendChild(spanClock)
    serves.textContent = recipe.serves + (serves === 1 ? ' person' : ' people')

    //card summary
    let cardSummary = document.createElement('h5')
    let summary = calculateCompletionStatus(recipe)
    cardSummary.innerHTML = summary

    a.appendChild(cardTitle)
    a.appendChild(cardSummary)
    a.appendChild(spanClock)
    a.appendChild(cardCookingTime)
    a.appendChild(spanServing)
    a.appendChild(serves)
   
    recipeDiv.appendChild(a)
    
}




export {getSavedData, filterRecipes, renderFilteredRecipes, saveRecipes, renderRecipe, removeRecipe, addIngredient, loadMainPage, renderIngredients}





