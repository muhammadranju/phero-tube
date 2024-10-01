const POSTS_URL = "https://openapi.programming-hero.com/api/videos/category";

const cartSection = document.getElementById("cartSection");
const cameraSection = document.getElementById("cameraSection");
const searchInput = document.getElementById("searchInput");
const singleSection = document.getElementById("singleSection");

const allBtn = document.getElementById("allBtn");
const musicBtn = document.getElementById("musicBtn");
const comedyBtn = document.getElementById("comedyBtn");
const drawingBtn = document.getElementById("drawingBtn");
const searchBtn = document.getElementById("searchBtn");

const categoryButtons = [allBtn, musicBtn, comedyBtn, drawingBtn];

function cardHTML(...arrData) {
  let data = {};
  for (let post of arrData) {
    data = post;
  }
  const [profile_name] = data.authors;
  return showHTML(data, profile_name);
}

async function getAllData(category) {
  cartSection.innerHTML = "";
  cameraSection.classList.add("hidden");
  singleSection.classList.add("hidden");
  const res = await fetch(`${POSTS_URL}/${category}`);
  const posts = await res.json();
  let authors = {};
  let allPost = [];
  for (let post of posts.data) {
    authors = post.authors[0];
    showAllItems(post, authors);
    allPost.push(post);
  }

  return allPost;
}

async function showAllItems(data) {
  cartSection.innerHTML += cardHTML(data);
}

function toggleActiveButton(selectedButton) {
  categoryButtons.forEach((btn) => {
    btn.classList.remove("bg-red-500", "text-white");
    btn.classList.add("btn-active");
  });

  selectedButton.classList.remove("btn-active", "text-white");
  selectedButton.classList.add("bg-red-500", "text-white");
}

searchBtn.addEventListener("click", async () => {
  let authorName = [];
  if (searchInput.value !== "") {
    const data = await getAllData("1000");
    cartSection.innerHTML = "";
    cameraSection.classList.add("hidden");
    singleSection.classList.remove("hidden");
    const foundPost = data.find((post) =>
      post.title.includes(searchInput.value)
    );
    if (foundPost) {
      authorName = foundPost.authors[0];
      singleSection.innerHTML = showHTML(foundPost, authorName);
    } else {
      cameraSection.innerHTML = showError("Oops!! Sorry, content not found");
      cameraSection.classList.remove("hidden");
      singleSection.innerHTML = "";
    }
  }

  searchInput.value = "";
});

allBtn.addEventListener("click", () => {
  toggleActiveButton(allBtn);
  getAllData("1000"); // Load all posts
});
musicBtn.addEventListener("click", () => {
  toggleActiveButton(musicBtn);
  getAllData("1001"); // Load music category posts
});
comedyBtn.addEventListener("click", () => {
  toggleActiveButton(comedyBtn);
  getAllData("1003"); // Load comedy category posts
});

drawingBtn.addEventListener("click", () => {
  cartSection.innerHTML = "";
  singleSection.innerHTML = "";
  cameraSection.innerHTML = showError("Oops!! Sorry, There is no content here");
  cameraSection.classList.remove("hidden");
  toggleActiveButton(drawingBtn);
});

getAllData("1000");

function showHTML(data, author) {
  return /*html */ `
    <div class="shadow p-5 rounded-xl relative">
          <figure class="w-full h-48">
            <img alt="Shoes" class="rounded-xl object-cover w-full h-full"  
              src=${data.thumbnail}                        />
          </figure>
          <!-- <span class="bg-slate-800 top-0 mt-44 right-0 mr-9 text-white pb-[3px] px-[7px] absolute rounded-lg">3hrs 56 min ago</span> -->
          <div class="flex items-center space-x-5 mt-5">
            <img src=${
              author.profile_picture
            } class="rounded-full w-16 h-16 ml-3 " alt="" />
            <div class="space-y-2">
              <h2 class="card-title text-xl font-bold">${data.title}</h2>
              <div class="flex space-x-3">
                <span class="text-lg">${author.profile_name}</span>
                ${
                  author.verified
                    ? ' <img src="./image/icon.png" class="w-6 h-6" />'
                    : ""
                }
               
              </div>
              <span class="text-lg">${data.others.views} views</span>
            </div>
          </div>
          <div class="flex justify-center mt-2">
            <button class="btn">View Details</button>
          </div>
    </div>`;
}
function showError(title) {
  return /*html*/ `
    <div class="flex justify-center items-center flex-col">
          <img src="./image/camera.png" class="w-44" alt="" />
          <h2 class="lg:text-3xl text-2xl w-72 lg:w-full mt-3 text-center font-bold">
           ${title}
          </h2>
    </div>
    `;
}
