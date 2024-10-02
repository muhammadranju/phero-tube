const POSTS_URL = "https://openapi.programming-hero.com/api/videos/category";
const id = (id) => document.getElementById(id);

const cartSection = id("cartSection");
const cameraSection = id("cameraSection");
const searchInput = id("searchInput");
const singleSection = id("singleSection");

const allBtn = id("allBtn");
const musicBtn = id("musicBtn");
const comedyBtn = id("comedyBtn");
const drawingBtn = id("drawingBtn");
const searchBtn = id("searchBtn");
const postDetailsBtn = id("postDetailsBtn");
const sortByBtn = id("sortByBtn");
const modalData = id("modalData");

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

function showAllItems(data) {
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
            <img alt="Shoes" class="rounded-xl object-cover w-full h-full "  
              src=${data.thumbnail}                        />
          </figure>
          <!-- <span class="bg-slate-800 top-0 mt-44 right-0 mr-9 text-white pb-[3px] px-[7px] absolute rounded-lg">3hrs 56 min ago</span> -->
          <div class="flex items-center space-x-5 mt-5">
            <img src=${
              author.profile_picture
            } class="rounded-full w-16 h-16 ml-3  object-cover" alt="" />
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
            <button class="btn"
            onclick="postDetails('${data.title}')"
            >View Details</button>
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

async function postDetails(slug) {
  my_modal_5.showModal();
  const res = await fetch(`${POSTS_URL}/1000`);
  const data = await res.json();
  const foundPost = data.data.find((post) => post.title.includes(slug));
  const authors = foundPost.authors[0];
  modalData.innerHTML = /*html*/ `
  <figure class="w-full lg:h-96 h-80">
              <img
                src=${foundPost.thumbnail}
                alt="Shoes"
                class="object-cover w-full h-full rounded-xl"
              />
            </figure>
            <div class="card-body text-center">
              <h2 class="text-3xl font-bold text-red-500">${
                foundPost.title
              }</h2>
            </div>
            <div
              class="flex lg:flex-row flex-col justify-center lg:gap-96 items-center"
            >
              <img src="${
                authors.profile_picture
              }" class="w-28 h-28 object-cover rounded-full" alt="" />
              <div class="flex flex-col space-y-4">
                <div class="flex justify-center  items-center gap-2">
                <span class="text-lg font-semibold">${
                  authors.profile_name
                } </span>
                ${
                  authors.verified
                    ? ' <img src="./image/icon.png" class="w-6 h-6" />'
                    : ""
                }
                </div>
                <span>${foundPost.others.views} views </span>
              </div>
            </div>
  `;
  console.log(authors);
  console.log(foundPost);
}
