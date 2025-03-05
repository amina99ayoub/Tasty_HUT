
// Grab DOM elements
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const cardsSection = document.getElementById('cards');
const showAllBtn = document.getElementById('show-all-btn');
const modalTitle = document.querySelector('.meal-title');
const modalBody = document.querySelector('.modal-body');

// API Key for Spoonacular API
const apiKey = 'ebea73f719084927a1a9b0745bcb445f';  // Replace with your actual Spoonacular API key

// Function to fetch recipes based on search query
function fetchRecipes(query) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=6`;  // Limit to 6 results

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const recipes = data.results;
      displayRecipes(recipes);
    })
    .catch(error => console.error('Error fetching recipes:', error));
}

// Display the recipes dynamically on the page
function displayRecipes(recipes) {
  cardsSection.innerHTML = ''; // Clear previous results
  if (recipes.length === 0) {
    cardsSection.innerHTML = `<p>No recipes found. Try a different search.</p>`;
  } else {
    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-4', 'col-md-4');
      card.innerHTML = `
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <button class="btn btn-warning btn-details" data-id="${recipe.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</button>
        </div>
      `;
      cardsSection.appendChild(card);
    });

    // Add event listeners to View Details buttons
    const viewDetailsBtns = document.querySelectorAll('.btn-details');
    viewDetailsBtns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        const recipeId = event.target.getAttribute('data-id');
        fetchRecipeDetails(recipeId);
      });
    });
  }
}

// Fetch the detailed information for a recipe
function fetchRecipeDetails(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      modalTitle.textContent = data.title;
      modalBody.innerHTML = `
        <img src="${data.image}" class="img-fluid mb-3" alt="${data.title}">
        <p><strong>Preparation time:</strong> ${data.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> ${data.servings}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <p><strong>Instructions:</strong></p>
        <p>${data.instructions}</p>
      `;
    })
    .catch(error => console.error('Error fetching recipe details:', error));
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  } else {
    alert('Please enter a search query.');
  }
});

// Optional: Show all button (Can be used to display more results if desired)
showAllBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query); // Fetch more results if needed
  } else {
    alert('Please enter a search query.');
  }
});
