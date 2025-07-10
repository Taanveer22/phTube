console.log("conneted js");
// time utility function
const getTimeString = (time) => {
  console.log(time);
  let day = parseInt(time / 86400);
  let hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  let minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;

  return ` ${day} day ${hour} hour ${minute} minute ${remainingSecond} second ago`;
};
// console.log(getTimeString(4000));

// dynamic navbar start here ---------------------------------------
// load data from api
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// show data in the ui
// create dynamic button
// append button in the category container
const displayCategories = (paramCategory) => {
  //   console.log(paramCategory);
  const categoryContainer = document.getElementById("category-container");
  //   console.log(categoryContainer);
  paramCategory.forEach((item) => {
    // console.log(item);

    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoryContainer.append(button);
  });
};

// dynamic main section start here -----------------------
// load videos from api
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// show videos in the ui
// create dynamic card
// append card in the card container
const displayVideos = (paramVideo) => {
  //   console.log(paramVideo);
  const cardContainer = document.getElementById("card-container");
  //   console.log(cardContainer);
  paramVideo.forEach((item) => {
    console.log(item);

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
                  : `<span class = "absolute bg-black text-white right-2 bottom-2 rounded p-1">
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

    </div>
    `;
    cardContainer.append(cardDiv);
  });
};

//load function invocation
loadCategories();
loadVideos();
