
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const Params = new URLSearchParams(search);
  return Params.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const data = await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
    let out= await data.json();
    //console.log(out);
    return await out;
   }
   catch(err){
    return null;
   }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i=0;i<adventures.length;i++)
  {
    let ele=document.createElement("div");
    ele.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-3");

    let link=document.createElement("a");
    link.setAttribute("id",`${adventures[i].id}`);
    link.href = `detail/?adventure=${adventures[i].id}`;

    let div_1 =document.createElement("div");
    div_1.setAttribute("class","activity-card");

    let image = document.createElement("img");
    image.src = adventures[i].image;
    image.setAttribute("class","activity-card img");

    let div_2 = document.createElement("div");
    let category = document.createElement("div");
    category.setAttribute("class","category-banner");
    category.innerText=adventures[i].category;
    div_2.setAttribute("class","card-body col-md-12 mt-2");

    let div_3 = document.createElement("div");
    div_3.setAttribute("class", "d-flex justify-content-between");

    let para1 = document.createElement("h6");
    para1.innerText = adventures[i].name;

    let para2 = document.createElement("h6");
    para2.innerText = "₹"+adventures[i].costPerHead;

    let div_4 = document.createElement("div");
    div_4.setAttribute("class","d-flex justify-content-between");

    let para3 = document.createElement("h6");
    para3.innerText = "Duration";

    let para4 = document.createElement("h6");
    para4.innerText = adventures[i].duration + " hours";

    div_4.append(para3);
    div_4.append(para4);

    div_3.append(para1);
    div_3.append(para2);

    div_2.append(div_3);
    div_2.append(div_4);

    
    div_1.append(image);
    div_1.append(div_2);

    link.append(div_1);

    ele.append(link);
    div_1.append(category);
    document.getElementById("data").append(ele);


  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let fl = list.filter(function(e){
    return(e.duration >= low && e.duration <= high);
  })

  // console.log(fl);
  return fl;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let fl = [];
  // console.log(list);

  list.filter(function(e){
    if(categoryList.includes(e.category))
      fl.push(e);
  });

  return fl;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  let fl=[];
  let arr = filters["duration"].split("-");

  if(filters["category"].length > 0 && filters["duration"].length>0)
  {
    fl = filterByCategory(list,filters.category);
    fl = filterByDuration(fl,parseInt(arr[0]),parseInt(arr[1]));
  }else if(filters["category"].length > 0)
  {
    fl = filterByCategory(list,filters.category);
  }else if(filters["duration"].length>0)
  {
    fl = filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]));
  }else
  {
    return list;
  }


  // Place holder for functionality to work in the Stubs
  return fl;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(window.localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categorylist = filters["category"];
  let list1 = [];

  for(let i=0;i<categorylist.length;i++)
  {
    list1.push(categorylist[i]);
  }

  // console.log(list1);

  for(let i=0;i<list1.length;i++)
  {
    // console.log(list1[i]);

    let div = document.createElement("div");
    div.setAttribute("class","category-filter");
    div.innerText = list1[i];

    document.getElementById("category-list").append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};



























