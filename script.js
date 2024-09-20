const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetails = document.querySelector(".recipeDetails");
const recipeContentDetails = document.querySelector(".recipeContentDetails");
const recipeCloseBtn = document.querySelector(".recipeCloseBtn");

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = 'Fetching Recipe....';
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    // Clear previous results
    recipeContainer.innerHTML = '';

    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h3>${meal.strMeal}</h3>
                <h6>${meal.strArea}</h6>
                <h6>${meal.strCategory}</h6>
            `;

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Add Event Listener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        console.log("No meals found");
    }
}

const openRecipePopup = (meal) => {
    recipeContentDetails.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
        <h6>${meal.strArea}</h6>
        <h6>${meal.strCategory}</h6>
    `;
    recipeDetails.style.display = 'block'; // Show the popup
}

// Add event listener to close button
recipeCloseBtn.addEventListener('click', () => {
    recipeDetails.style.display = 'none'; // Hide the popup
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput) {
        fetchRecipes(searchInput);
    } else {
        console.log("Please enter a search term.");
    }
});
