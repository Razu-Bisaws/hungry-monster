const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const inputField = document.getElementById("search-field");
const searchButton = document.getElementById("search-btn");
const displayArea = document.getElementById("display");
const detailsArea = document.getElementById("details-area");

//search button function
searchButton.addEventListener("click", () => {
    searchFoodByName(inputField.value);
})

//search foodName fuction
const searchFoodByName = keyword => {
    if (keyword != "") {
        showLoader(displayArea, true);
        let url = `${baseUrl}search.php?s=${keyword}`;
        fetch(encodeURI(url))
            .then(data => data.json())
            .then(data => {
                showLoader(displayArea, false);
                displayFood(data);
            });
    }
}

// display food data function
const displayFood = data => {
    if (data.meals == null) {
        showNotFoundMessage();
    } else {
        displayArea.innerHTML = createFoodCard(data)
    }
}

// show not found message function
const showNotFoundMessage = () => {
    displayArea.innerHTML = `<h1>Not meal found</h1><br>
    <span class="material-icons" style="font-size:30px;padding: 20px 10px">
    sentiment_very_dissatisfied
    </span>`;
}

// create food card function
const createFoodCard = data => {
    let meals = data.meals;
    let elementString = "";
    meals.forEach(data => {
        elementString += `<div class="food-item" onclick="showFoodDetails(${data.idMeal})">
                <div class="thumbnail">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
    });
    return elementString;
}

//show food details function
const showFoodDetails = id => {
    let url = `${baseUrl}lookup.php?i=${id}`;
    fetch(encodeURI(url))
        .then(data => data.json())
        .then(data => {
            let item = data.meals[0];
            let ingredients = "";
            let measurement = "";
            // akane index and ingredients fixed korar jonno for loop use kora hoyace//forEach use korle all ingredients list show kore..
            for (let i = 1; i <= 3; i++) {
                ingredients += `<li><i class="material-icons">check_box</i> ${item["strIngredient" + i]}</li>`;
                measurement += `<li><i class="material-icons">check_box</i> ${item["strMeasure"+i]}</li>`;
            }
            detailsArea.innerHTML = `<section id="modal">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="food-details">
                    <button id="modal-btn" onclick="hideFoodDetails()">X</button>
                    <img src="${item.strMealThumb}" />
                    <div class="details">
                      <h1>${item.strMeal}</h1>
                      <h4>Ingredients</h4>
                      <ul>${ingredients+measurement}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>`;
        });
}

// hidden food details
const hideFoodDetails = () => {
    detailsArea.innerHTML = "";
}

//show loder
const showLoader = (parent, argument) => {
    argument ? parent.innerHTML = `<div class="loader"></div>` : "";
}
