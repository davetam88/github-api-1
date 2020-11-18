'use strict';
const searchURL = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI';

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  for (let idx = 0; idx < responseJson.length; idx++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[idx].html_url}">${responseJson[idx].name}</a></h3>
      </li>`
    )};

  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(RepoID) {

  let url = "https://api.github.com/users/" + RepoID + "/repos";
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
	  let errmsg = `${response.status} : ${response.statusText}`;
      throw new Error(errmsg);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const RepoID = $('#js-repo-id').val();
    getRepos(RepoID);
  });
}

$(watchForm);



