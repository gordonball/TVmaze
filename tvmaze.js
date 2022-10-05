"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const TVMAZE_URL = "http://api.tvmaze.com";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

//TODO: move response inside function
//TODO: return promise of array with better variable name
let response
async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  response = await axios.get(`${TVMAZE_URL}/search/shows`, { params: { q: term } });
  return response.data;
}

function processShowData(response) {
  let shows = [];
  for (let showdata of response.data) {
    if
  }
}


/** Given list of shows, create markup for each and add to DOM */

function populateShows(shows) {

  $showsList.empty();
  console.log(shows);

  for (let show of shows) {
    // const showImage = show.show.image.medium;
    let showImage = show.show.image === null ? "https://tinyurl.com/tv-missing." : show.show.image.medium;
    const $show = $(
        `<div data-show-id="${show.show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${showImage}"
              alt="${show.show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.show.name}</h5>
             <div><small>${show.show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);



    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
