const POSTS_URL =
  "https://openapi.programming-hero.com/api/videos/category/1000";

function cardHTML(...arrData) {
  let data = {};
  for (let post of arrData) {
    data = post;
  }
  const [profile_name] = data.authors;
  console.log(data);
  return /*html */ `
    <div class="shadow p-5 rounded-xl relative">
          <figure class="w-full h-48">
            <img alt="Shoes" class="rounded-xl object-cover w-full h-full"  
              src=${data.thumbnail}                        />
          </figure>
          <!-- <span class="bg-slate-800 top-0 mt-44 right-0 mr-9 text-white pb-[3px] px-[7px] absolute rounded-lg">3hrs 56 min ago</span> -->
          <div class="flex items-center space-x-5 mt-5">
            <img src=${
              profile_name.profile_picture
            } class="rounded-full w-16 h-16 ml-3 " alt="" />
            <div class="space-y-2">
              <h2 class="card-title text-xl font-bold">${data.title}</h2>
              <div class="flex space-x-3">
                <span class="text-lg">${profile_name.profile_name}</span>
                ${
                  profile_name.verified
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

async function getAllData() {
  const res = await fetch(POSTS_URL);
  const posts = await res.json();
  let authors = {};
  for (let post of posts.data) {
    authors = post.authors[0];
    showAllItems(post, authors);
  }
}

async function showAllItems(data) {
  const cartSection = document.getElementById("cartSection");
  cartSection.innerHTML += cardHTML(data);
}
getAllData();
// showAllItems();
