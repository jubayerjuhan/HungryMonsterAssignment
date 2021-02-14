//Submitted By Jubayer Hossain Juhan

//Api Fetching
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then(res => res.json())
    .then(data => {
        data.meals;
    })


//Search Button element
const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {
    const inputMeal = document.getElementById('meal').value;
    getData(inputMeal);
    document.getElementById('meal').value = ""
})

//fetching api with dish name got from the search bar
const getData = strMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => searchDisplayMeal(data.meals))
    .catch(function(){
        console.log("not found");
    })
}
const searchDisplayMeal = meals =>{
    meals.forEach(meal => {
        const mealsDiv = document.getElementById('mealDetails');
        const mealDiv = document.createElement('div');
        mealDiv.className = "meal"
        const mealInfo =`
            <div onClick="displayMealDetails('${meal.idMeal}')">
            <img src="${meal.strMealThumb}">
            <h2 class="mealTitle">${meal.strMeal}</h2>
            </div>
        `
        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);
    });
}

//displaying dishes
const displayMealDetails = idMeal =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => renderMealDetailsInfo(data.meals[0]))
}
const renderMealDetailsInfo = meal =>{
    const ingredients = [];
    for(let i=1; i<=20; i++) {
        if(meal[`strIngredient${i}`]) {
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
          // Stop if no more ingredients
          break;
        }
      }

      //Showing The Meal Ingridients. That will appear on top when you will click on a meal name
    const mealInfo = document.getElementById('mealDetailsInfo');
    mealInfo.innerHTML =`
      <div class="singleMealInfo">
        <div class="thumbnail">
             <img src="${meal.strMealThumb}" >
             <p><strong>Instructions: </strong> ${meal.strInstructions}</p>
        </div>
        <p><strong>Meal Name:</strong> ${meal.strMeal}</p>
        <p><strong>Area: </strong> ${meal.strArea}</p>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h4>Ingredients:</h4>
        <ul class="ingredients">
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
    ` 
}
