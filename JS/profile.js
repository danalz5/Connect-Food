window.onload = function () {
    loadSavedContent();
};

function disableEditing (editButton) {
    editButton.textContent = "Edit";
    var bio = document.getElementById('bioText');
    var username = document.getElementById('username');
    bio.setAttribute('contenteditable', false);
    username.setAttribute('contenteditable', false);
    saveContent();
}

function enableEditing (editButton) {
    editButton.textContent = 'Save';
    var bio = document.getElementById('bioText');
    var username = document.getElementById('username');
    bio.setAttribute('contenteditable', true);
    username.setAttribute('contenteditable', true);
}

function editButtonAction () {
    var editButton = document.getElementById('editButton');
    if (editButton.textContent == 'Edit') {
        enableEditing(editButton);
    } else {
        disableEditing(editButton);
    }
}

function saveContent() {
    var bio = document.getElementById('bioText').innerText;
    var username = document.getElementById('username').innerText;

    // Save content to localStorage
    localStorage.setItem('bioText', bio);
    localStorage.setItem('username', username);
}

function loadSavedContent() {
    var bio = localStorage.getItem('bioText');
    var username = localStorage.getItem('username');

    // Load content from localStorage and set it to the elements
    if (bio) {
        document.getElementById('bioText').innerText = bio;
    }
    if (username) {
        document.getElementById('username').innerText = username;
    }

    var recDropdown = document.getElementById('rec-dropdown-content');
    if(localStorage.getItem('recommendation') != null){
        var recs = JSON.parse(localStorage.getItem('recommendation'));
        recs.forEach((rec) => {
            var recLabel = document.createElement('label');
            var recName = rec[0];
            var recRest = rec[1];
            recLabel.innerText = recName + ' from ' + recRest;
            recDropdown.appendChild(recLabel);
        });
    }

    var recipeDropdown = document.getElementById('recipe-dropdown-content');
    var likedRecipes = JSON.parse(localStorage.getItem('liked'));
    likedRecipes.forEach((recipe) => {
        var rName = document.createElement('label');
        rName.innerText = recipe;
        recipeDropdown.appendChild(rName);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var imageContainer = document.getElementById('dietaryP');

    var checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        // Load the state from localStorage
        var savedState = localStorage.getItem(checkbox.id);
        if (savedState) {
            checkbox.checked = JSON.parse(savedState);
            updateRestrictions(checkbox.id, checkbox.checked);
        }

        checkbox.addEventListener('change', function () {
            var checkboxId = this.id;

            // Save the state to localStorage
            localStorage.setItem(checkboxId, JSON.stringify(this.checked));

            console.log('Item ' + (this.checked ? 'checked' : 'unchecked') + ':', checkboxId);

            updateRestrictions(checkboxId, this.checked);
        });
    });

    var radios = document.querySelectorAll('.dropdown-content input[type="radio"]');

    radios.forEach(function (radio) {
        // Load the state from localStorage
        var savedState = localStorage.getItem(radio.id);
        if (savedState) {
            radio.checked = JSON.parse(savedState);
            if(radio.id == 'cheap' || radio.id == 'affordable' || radio.id == 'expensive'){
                updatePrice(radio.id, radio.checked);
            } else {
                updateSpice(radio.id, radio.checked);
            }
        }

        radio.addEventListener('change', function () {
            var radioId = this.id;

            // Save the state to localStorage
            console.log('Item ' + (this.checked ? 'checked' : 'unchecked') + ':', radioId);
            if(radio.id == 'cheap' || radio.id == 'affordable' || radio.id == 'expensive'){
                updatePrice(radio.id, radio.checked);
            } else {
                updateSpice(radio.id, radio.checked);
            }
        });
    });



    function addRestriction(imageId) {
        // Assuming you have images with filenames corresponding to checkbox ids
        var imageFilename = 'Images/' + imageId + '.png';

        // Create an image element
        var imageElement = document.createElement('img');
        imageElement.src = imageFilename;
        imageElement.alt = imageId;
        imageElement.id = 'dietaryImg'

        // Append the image to the container
        imageContainer.appendChild(imageElement);
    }

    function removeRestriction(imageId) {
        // Remove the image with the corresponding id from the container
        var imageToRemove = document.querySelector('#dietaryP img[alt="' + imageId + '"]');
        if (imageToRemove) {
            imageContainer.removeChild(imageToRemove);
        }
    }

    function updateRestrictions(imageId, isChecked) {
        if (isChecked) {
            addRestriction(imageId);
        } else {
            removeRestriction(imageId);
        }
    }

    function updateSpice (spiceId, isChecked) {
        if(isChecked) {
            var spiceContainer = document.getElementById('spiceP');
            var child = spiceContainer.lastElementChild;  
            while (child) { 
                spiceContainer.removeChild(child); 
                child = spiceContainer.lastElementChild; 
            }
            var imageElement1 = document.createElement('img');
            imageElement1.src = 'Images/chile.png';
            imageElement1.alt = 'chile';
            imageElement1.id = 'spiceImg';
            var imageElement2 = document.createElement('img');
            imageElement2.src = 'Images/chile.png';
            imageElement2.alt = 'chile';
            imageElement2.id = 'spiceImg';
            var imageElement3 = document.createElement('img');
            imageElement3.src = 'Images/chile.png';
            imageElement3.alt = 'chile';
            imageElement3.id = 'spiceImg';
            if(spiceId == 'mild') {
                localStorage.setItem('mild', 'true');
                localStorage.setItem('moderate', 'false');
                localStorage.setItem('spicy', 'false');
                spiceContainer.appendChild(imageElement1);
            } else if (spiceId == 'moderate') {
                localStorage.setItem('mild', 'false');
                localStorage.setItem('moderate', 'true');
                localStorage.setItem('spicy', 'false');
                spiceContainer.appendChild(imageElement1);
                spiceContainer.appendChild(imageElement2);
            } else {
                localStorage.setItem('mild', 'false');
                localStorage.setItem('moderate', 'false');
                localStorage.setItem('spicy', 'true');
                spiceContainer.appendChild(imageElement1);
                spiceContainer.appendChild(imageElement2);
                spiceContainer.appendChild(imageElement3);
            }
        }
    }

    function updatePrice (priceId, isChecked) {
        if(isChecked) {
            var priceContainer = document.getElementById('priceP');
            var child = priceContainer.lastElementChild;  
            while (child) { 
                priceContainer.removeChild(child); 
                child = priceContainer.lastElementChild; 
            }
            var imageElement1 = document.createElement('img');
            imageElement1.src = 'Images/dollar.png';
            imageElement1.alt = 'dollar';
            imageElement1.id = 'dollarImg';
            var imageElement2 = document.createElement('img');
            imageElement2.src = 'Images/dollar.png';
            imageElement2.alt = 'dollar';
            imageElement2.id = 'dollarImg';
            var imageElement3 = document.createElement('img');
            imageElement3.src = 'Images/dollar.png';
            imageElement3.alt = 'dollar';
            imageElement3.id = 'dollarImg';;
            if(priceId == 'cheap') {
                localStorage.setItem('cheap', 'true');
                localStorage.setItem('affordable', 'false');
                localStorage.setItem('expensive', 'false');
                priceContainer.appendChild(imageElement1);
            } else if (priceId == 'affordable') {
                localStorage.setItem('cheap', 'false');
                localStorage.setItem('affordable', 'true');
                localStorage.setItem('expensive', 'false');
                priceContainer.appendChild(imageElement1);
                priceContainer.appendChild(imageElement2);
            } else {
                localStorage.setItem('cheap', 'false');
                localStorage.setItem('affordable', 'false');
                localStorage.setItem('expensive', 'true');
                priceContainer.appendChild(imageElement1);
                priceContainer.appendChild(imageElement2);
                priceContainer.appendChild(imageElement3);
            }
        }
    }
});