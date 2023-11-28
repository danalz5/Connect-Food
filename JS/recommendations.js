const recList = document.getElementById('recList');

var divList = [];

fetch('../siteData/recommendations.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    for (const key in data) {
        // For each object in JSON, make a section in the page

      if (data.hasOwnProperty(key)) {
        const value = data[key];
        console.log(`Key: ${key}, Value:`, value);

        // div to hold all the text
        const foodSection = document.createElement("div");
        foodSection.id = "food";
        //foodSection.style.display = "inline-block";

        const newDiv = document.createElement("div");
        newDiv.style.display = "inline-block";

        const title = document.createElement("div");
        title.id = "title"

        const reviewDiv = document.createElement("div");
        reviewDiv.style.display = "inline-block";
        const desc = document.createElement("h2");
        const detail = document.createTextNode("Reviews:");
        desc.appendChild(detail);
        reviewDiv.appendChild(desc);

        // Name of the food
        const para = document.createElement("h2");
        const node = document.createTextNode(`${key}`);
        para.appendChild(node);

        for (const prop in value) {
            if (value.hasOwnProperty(prop)) {
                if(prop == "Image") {
                    const imgElement = document.createElement('img');
                    imgElement.src = `${value[prop]}`

                    imgElement.alt = 'Food Picture'; 
                    imgElement.width = 200; 
                    imgElement.height = 150;

                    title.appendChild(imgElement);
                    title.appendChild(para);
                    newDiv.insertBefore(title, newDiv.firstChild);
                }
                else if(prop.startsWith("Review")) {
                    const desc = document.createElement("p");
                    const detail = document.createTextNode(`${value[prop]}`);
                    desc.appendChild(detail);
                    reviewDiv.appendChild(desc);
                }
                else {
                    const desc = document.createElement("p");
                    const detail = document.createTextNode(`${prop}: ${value[prop]}`);
                    desc.appendChild(detail);
                    newDiv.appendChild(desc);
                }
            }
        }

        const input = document.createElement('input');
        input.placeholder = "Write your review here..."
        input.type = 'text'

        const submit = document.createElement('input');
        submit.type = 'submit';
        reviewDiv.appendChild(input);
        reviewDiv.appendChild(submit);

        submit.addEventListener('click', function() {
            if(input.value.length > 0) {
                const desc = document.createElement("p");
                const detail = document.createTextNode(`You said: ${input.value}`);
                desc.appendChild(detail);
                reviewDiv.appendChild(desc);

                input.style.display = "none";
                submit.style.display = "none";
            }
          });

        foodSection.appendChild(newDiv);
        foodSection.appendChild(reviewDiv);
        divList.push(foodSection);
        recList.appendChild(foodSection);
      }
    }

    loadStorage();
    filterFood();
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON data:', error);
  });

  function loadStorage() {
    var storedList = JSON.parse(localStorage.getItem('recommendation'));
    console.log(storedList);

    if(storedList != null) {
      storedList.forEach(function(foodDetails) {
        const newDiv = document.createElement("div");

        const para = document.createElement("h2");
        const node = document.createTextNode(`${foodDetails[0]}`);
        para.appendChild(node);
        newDiv.appendChild(para);

        const para2 = document.createElement("p");
        const node2 = document.createTextNode(`Restaurant: ${foodDetails[1]}`);
        para2.appendChild(node2);
        newDiv.appendChild(para2);

        const para3 = document.createElement("p");
        const node3 = document.createTextNode(`Your Review: ${foodDetails[2]}`);
        para3.appendChild(node3);
        newDiv.appendChild(para3);

        newDiv.id = "food";
        recList.appendChild(newDiv);
      })
    }
  }

  function filterFood() {
    var mild = localStorage.getItem('mild');
    console.log(mild);
    var moderate = localStorage.getItem('moderate');
    console.log(moderate);
    var spicy = localStorage.getItem('spicy');
    console.log(spicy);

    var sLevel = "Z";
    if(mild == "true") {
      sLevel = "Mild"
    }
    else if(moderate == "true") {
      sLevel = "Moderate"
    }
    else if(spicy == "true") {
      sLevel = "Spicy"
    }
    console.log(sLevel);

    var cheap = localStorage.getItem('cheap');
    var affordable = localStorage.getItem('affordable');
    var expensive = localStorage.getItem('expensive');

    var pLevel = 9999;
    if(cheap == "true") {
      pLevel = 10
    }
    else if(affordable == "true") {
      pLevel = 20
    }
    else if(expensive == "true") {
      pLevel = 9999
    }
    console.log(pLevel);

    var vegetarian = localStorage.getItem('vegetarian');
    var vegan = localStorage.getItem('vegan');
    var glutenFree = localStorage.getItem('gluten-free');

    divList.forEach(function(foodItem) {
      var foodText = foodItem.querySelectorAll('p');
      foodText.forEach(function(text) {
        if(text.textContent.startsWith("Spice Level:")) {
          var content = text.textContent.split(':')
          var level = content[1].trim();
          if(sLevel < level) {
            foodItem.style.display = 'None';
          }
        }
        else if(text.textContent.startsWith("Price:")) {
          var content = text.textContent.split(':')
          var level = content[1].trim().substring(1);
          if(pLevel < parseInt(level, 10)) {
            foodItem.style.display = 'None';
          }
        }
        else if(text.textContent.startsWith("Dietary:")) {
          var content = text.textContent.split(':')
          var pref = content[1].trim();
          //console.log(pref);

          if(pref == "Gluten-Free" && glutenFree == "true") {

          }
          else if(pref == "Vegetarian" && vegetarian == "true") {

          }
          else if(pref == "Vegan" && vegan == "true") {

          }
          else if(vegan == "false" && vegetarian == "false" && glutenFree == "false") {

          }
          else if(vegan == null && vegetarian == null && glutenFree == null) {

          }
          else {
            foodItem.style.display = 'None';
          }
        }
      })
    });
  };


