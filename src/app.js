import { filterRecipes, renderFilteredRecipes, loadMainPage, saveRecipes} from './recipes-functions'
import { v4 as uuidv4 } from 'uuid';


const getSavedData = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
         return recipesJSON  ?  JSON.parse(recipesJSON) : [] 
    } catch(e) {
      return []
    } 

}

let recipes = getSavedData()
let id = uuidv4()
let filter = ''
let searchInput = document.querySelector('.flex #search-recipe')
let filteredRecipes = ''


if( loadMainPage ){
    loadMainPage()

}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        filter = searchInput.value.toLowerCase()
        filteredRecipes = filterRecipes(recipes, filter)
        renderFilteredRecipes(filteredRecipes)
    })}

const addRecipe = document.querySelector('.container .flex #add-recipe')
if (addRecipe) {

    addRecipe.addEventListener('click', (e) => {
        recipes.push({
            id: id,
            title: '',
            instruction: '',
            cookingTime: '',
            serves: '',
            ingredients: []
      })
        location.assign(`../edit.html#${id}`)   //for github add recipeApp before the edit 
        saveRecipes(recipes)
        console.log(recipes)
 })
}


export {recipes}