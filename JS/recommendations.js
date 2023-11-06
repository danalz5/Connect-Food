
// import foods from './../siteData/recommendations.json' assert {type: 'json'};

// console.log(foods);

const recList = document.getElementById('recList');

// const para = document.createElement("h2");
// const node = document.createTextNode("" + foods['Chicken 65']);
// para.appendChild(node);

// recList.appendChild(para);

fetch('../siteData/recommendations.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    for (const key in data) {
        // For each object in JSON, make a section in the page

      if (data.hasOwnProperty(key)) {
        const value = data[key];
        console.log(`Key: ${key}, Value:`, value);

        // div to hold all the text
        const newDiv = document.createElement("div");

        // Name of the food
        const para = document.createElement("h2");
        const node = document.createTextNode(`${key}`);
        para.appendChild(node);
        newDiv.appendChild(para);

        for (const prop in value) {
            if (value.hasOwnProperty(prop)) {
                const desc = document.createElement("p");
                const detail = document.createTextNode(`${prop}: ${value[prop]}`);
                desc.appendChild(detail);
                newDiv.appendChild(desc);
            }
        }

        recList.appendChild(newDiv);
      }
    }
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON data:', error);
  });
