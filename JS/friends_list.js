const friendsList = document.getElementById('friendsList');

fetch('../siteData/friends_list.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    for (const key in data) {
        // For each object in JSON, make a section in the page

      if (data.hasOwnProperty(key)) {
        const value = data[key];
        console.log(`Key: ${key}, Value:`, value);

        // div to hold all the text
        const friendSection = document.createElement("div");
        friendSection.id = "friend"
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
        recList.appendChild(foodSection);
      }
    }
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON data:', error);
  });
