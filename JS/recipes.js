var list = JSON.parse(localStorage.getItem('liked')) || []; // Initialize the list from local storage or as an empty array

document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with class 'heart-btn' (heart buttons)
    var heartButtons = document.querySelectorAll('.heart-btn');

    // Initialize button states based on local storage
    heartButtons.forEach(function (btn) {
        var recipeName = btn.closest('.recipe-card').querySelector('h3').textContent;
        if (list.includes(recipeName)) {
            btn.classList.add('clicked');
            btn.textContent = '♥'; // Filled heart
        }
    });

    // Add a click event listener to each heart button
    heartButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Toggle the 'clicked' class to change the heart icon
            btn.classList.toggle('clicked');
            var recipeName = btn.closest('.recipe-card').querySelector('h3').textContent;

            if (btn.classList.contains('clicked')) {
                btn.textContent = '♥'; // Filled heart
                if (!list.includes(recipeName)) {
                    list.push(recipeName);
                }
            } else {
                btn.textContent = '♡'; // Hollow heart
                var index = list.indexOf(recipeName);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
            localStorage.setItem('liked', JSON.stringify(list));
        });
    });

    // Select filter elements (checkboxes and radio buttons)
    const vegetarianCheckbox = document.getElementById('vegetarian');
    const veganCheckbox = document.getElementById('vegan');
    const glutenFreeCheckbox = document.getElementById('gluten-free');
    const mildRadio = document.getElementById('mild');
    const moderateRadio = document.getElementById('moderate');
    const spicyRadio = document.getElementById('spicy');
    const cheapRadio = document.getElementById('cheap');
    const affordableRadio = document.getElementById('affordable');
    const expensiveRadio = document.getElementById('expensive');

    // Select recipe containers
    const hardcodedRecipesContainer = document.querySelector('.hardcoded-recipe-cards');
    const dynamicRecipesContainer = document.querySelector('#dynamic-recipe-container');
    let recipesData = {};

    // Fetch recipe data from a JSON file
    fetch('siteData/recipes.json')
        .then((response) => response.json())
        .then((data) => {
            recipesData = data;

            // Add change event listeners to filter elements
            [vegetarianCheckbox, veganCheckbox, glutenFreeCheckbox, mildRadio, moderateRadio, spicyRadio, cheapRadio, affordableRadio, expensiveRadio].forEach(element => {
                element.addEventListener('change', () => {
                    if (isAnyFilterSelected()) {
                        filterRecipes(recipesData);
                        hardcodedRecipesContainer.style.display = 'none'; // Hide hardcoded recipes
                    } else {
                        dynamicRecipesContainer.innerHTML = '';
                        hardcodedRecipesContainer.style.display = 'block'; // Show hardcoded recipes
                    }
                });
            });
        })
        .catch((error) => {
            console.error('Error fetching recipe data:', error);
        });

    // Function to check if any filter is selected
    function isAnyFilterSelected() {
        return vegetarianCheckbox.checked || veganCheckbox.checked || glutenFreeCheckbox.checked ||
            mildRadio.checked || moderateRadio.checked || spicyRadio.checked ||
            cheapRadio.checked || affordableRadio.checked || expensiveRadio.checked;
    }

    // Function to filter recipes based on selected filters
    function filterRecipes(recipesData) {
        dynamicRecipesContainer.innerHTML = '';

        for (const recipeName in recipesData) {
            const recipe = recipesData[recipeName];
            if (matchesFilters(recipe)) {
                const recipeCard = createRecipeCard(recipeName, recipe);
                dynamicRecipesContainer.appendChild(recipeCard);
            }
        }
    }

    // Function to check if a recipe matches the selected filters
    function matchesFilters(recipe) {
        const dietaryMatch = (!vegetarianCheckbox.checked || recipe['Dietary Restriction'].includes('Vegetarian')) &&
            (!veganCheckbox.checked || recipe['Dietary Restriction'].includes('Vegan')) &&
            (!glutenFreeCheckbox.checked || recipe['Dietary Restriction'].includes('Gluten-Free'));

        const spiceLevel = recipe['Spice Level'] || "";
        const spiceMatch = (!mildRadio.checked || spiceLevel === 'Mild') &&
            (!moderateRadio.checked || spiceLevel === 'Moderate') &&
            (!spicyRadio.checked || spiceLevel === 'Spicy');

        const priceRange = recipe['Price Range'] || "";
        const priceMatch = (!cheapRadio.checked || priceRange === 'cheap') &&
            (!affordableRadio.checked || priceRange === 'affordable') &&
            (!expensiveRadio.checked || priceRange === 'expensive');

        return dietaryMatch && spiceMatch && priceMatch;
    }

    // Function to create a recipe card HTML element
    function createRecipeCard(recipeName, recipeData) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        card.innerHTML = `
            <button class="heart-btn">♡</button>
            <img src="Images/${recipeName.toLowerCase().replace(/ /g, '_')}.jpg" alt="${recipeName}">
            <div class="recipe-details">
              <h3>${recipeName}</h3>
              <p>${recipeData['Description']}</p>
              <p>${recipeData['Nutrition']}</p>
              <button class="recipe-view-btn" type="button" data-recipe="${recipeName}">View Recipe</button>
            </div>
        `;

        return card;
    }
});
