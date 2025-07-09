console.log("conneted js");

// load data from api
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// show data in the ui
// create dynamic button
const displayCategories = (paramCategory) => {
  //   console.log(paramCategory);
  const categoryContainer = document.getElementById("category-container");
  //   console.log(categoryContainer);
  paramCategory.forEach((item) => {
    console.log(item);

    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoryContainer.append(button);
  });
};

// function invocation
loadCategories();
