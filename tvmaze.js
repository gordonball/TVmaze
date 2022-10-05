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



async function getShowsByTerm(term) {
  let response = await axios.get(`${TVMAZE_URL}/search/shows`, { params: { q: term } });
  return processShowData(response);
}

/**Takes a nested data object from TVMAZE axios.get() promise, creates an array of objects containing: 
 * id, Name, Summary, and Image of the shows */
function processShowData(response) {
  // how to do as .map()
  // return response.data.map(function(data){
  //   return {id:data.show.id, summary:data.show.summary//etc...}
  // }
  let shows = [];
  for (let showdata of response.data) {
    //debugger;
    //Is there a good destructure format here?
    let showId = showdata.show.id; //const id did not work, referenced into season?
    const name = showdata.show.name;
    const summary = showdata.show.summary === null 
      ? "" 
      : showdata.show.summary;

    const image = showdata.show.image === null
      ? "https://tinyurl.com/tv-missing"
      : showdata.show.image.medium;

    shows.push({ showId, name, summary, image });
  }
  return shows;
}


/** Given list of shows, create markup for each and add to DOM */

function populateShows(shows) {

  $showsList.empty();
  //console.log(shows);

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              alt="${show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);



    $showsList.append($show);
  }
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

async function getEpisodesOfShow(showId) {
  let response = await axios.get(`${TVMAZE_URL}/shows/${showId}/episodes`);
  return processSeasonData(response);
}


function processSeasonData(response) {
  return response.data.map(function(data){
    return {id:data.id, name:data.name, season:data.season, number: data.number};
  });
}

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
