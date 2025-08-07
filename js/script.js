console.log("conneted js");

// time utility function=============================================
const getTimeString = (time) => {
  // console.log(time);
  let hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  let minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return ` ${hour} hour ${minute} minute ${remainingSecond} second ago`;
};
// console.log(getTimeString(4000));

// removeActiveClass() utility function=================================
const removeActiveClass = () => {
  const btns = document.getElementsByClassName("category-btn");
  // console.log(btns);
  for (let btn of btns) {
    // console.log(btn);
    btn.classList.remove("active");
  }
};

// load categories btn data from api===================================
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// load card from api======================================
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// load videos by category id from api==================================
const loadVideosByCategoryId = (catId) => {
  // alert(catId);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${catId}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${catId}`);
      activeBtn.classList.add("active");
      // console.log(activeBtn);
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// load video details button from api
const loadModalDetails = async (videoId) => {
  // console.log(videoId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await res.json();
  displayModalDetails(data.video);
};

// show data in the ui===============================
// create dynamic button========================================
// append button in the category container================================
const displayCategories = (paramCategory) => {
  //   console.log(paramCategory);
  const categoryContainer = document.getElementById("category-container");
  //   console.log(categoryContainer);
  paramCategory.forEach((item) => {
    // console.log(item);

    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
    <button id = "btn-${item.category_id}"
            onclick = "loadVideosByCategoryId(${item.category_id})"
            class = "btn category-btn" 
            >
                    ${item.category}
    </button>
    `;
    categoryContainer.append(buttonDiv);

    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = item.category;
    // categoryContainer.append();
  });
};

// show videos in the ui==================================
// create dynamic card====================================
// append card in the card container======================
const displayVideos = (paramVideo) => {
  //   console.log(paramVideo);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  cardContainer.classList.add("grid");
  //   console.log(cardContainer);
  if (paramVideo.length === 0) {
    cardContainer.classList.remove("grid");
    cardContainer.innerHTML = `
        <div class="flex justify-center items-center">
            <img class="" src="../assets/Icon.png">
        </div>
        <h3 class = "font-bold text-3xl text-center mt-5">
            Oops!! Sorry, There is no content here
        </h3>
    `;
  } else {
    cardContainer.classList.add("grid");
  }

  paramVideo.forEach((item) => {
    // console.log(item);
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <div class = "card bg-base-100">
        <figure class = "h-48 relative">
              <img
                  src = ${item.thumbnail}
                  class = "h-full w-full object-cover"
              />
              ${
                item.others.posted_date?.length === 0
                  ? ""
                  : `<span class = "absolute bg-black text-white text-xs right-2 bottom-2 rounded p-1">
                          ${getTimeString(item.others.posted_date)}
                    </span> `
              }

        </figure>

        <div class = "flex gap-5 mt-5">
            <div class = "">
                <img
                    src=${item.authors[0].profile_picture}
                    class="w-10 h-10 rounded-full object-cover"
                >
            </div>

            <div>
                <h2 class = "font-bold text-base">${item.title}</h2>
                <div class = "flex gap-2 items-center">
                    <h4 class = "font-normal text-sm text-gray-400">
                        ${item.authors[0].profile_name}
                    </h4>
                    ${
                      item.authors[0].verified === true
                        ? "<img src= 'https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000' class= 'w-4 h-4' >"
                        : ""
                    }
                </div>
                <p class = "text-sm font-normal text-gray-400">
                    ${item.others.views}
                </p>
            </div>
        </div>

        <button onclick = "loadModalDetails('${item.video_id}')" 
                class = "btn btn-success"
                >
                      Details
        </button>

    </div>
    `;
    cardContainer.append(cardDiv);
  });
};

// show modal details in the ui========================
// create modal from daisy ui=============================
// update dynamic modal content for every card==================
const displayModalDetails = (modalData) => {
  // console.log(modalData);
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
              <img class = "h-48 w-full object-cover" 
                    src = "${modalData.thumbnail}" 
              />
              <h1 class = "my-3 text-2xl font-bold">${modalData.title}</h1>
              <p>${modalData.description.slice(0, 200)}</p>
  `;
  document.getElementById("custom_Modal").showModal();
};

// search functionality implementation==========================
document
  .getElementById("search-input")
  .addEventListener("keyup", function (event) {
    // console.log(event.target.value);
    loadVideos(event.target.value);
  });

//load function invocation
loadCategories();
loadVideos();
loadVideosByCategoryId();
