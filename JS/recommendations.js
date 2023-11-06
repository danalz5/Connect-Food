
import foods from './../siteData/recommendations.json' assert {type: 'json'};

console.log(foods);

const recList = document.getElementById('recList');

const para = document.createElement("p");
const node = document.createTextNode("This is new.");
para.appendChild(node);

recList.appendChild(para);
