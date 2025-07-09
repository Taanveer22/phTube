console.log("conneted js");

// load data from api
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// show data in the ui
function displayCategories(paramCategory) {
  console.log(paramCategory);
}

// function invocation
loadCategories();
