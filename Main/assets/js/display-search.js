var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');


function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();
  var format = searchParamsArr[1].split('=').pop();
  
  searchApi(query, format);
}

getParams()

function searchApi(query, format) {
  var locQueryUrl = "https://www.loc.gov/search/?fo=json";
  if(format) {
    locQueryUrl = "https://www.loc.gov/" + format + "/?fo=json";
  }
  locQueryUrl= locQueryUrl + "&q=" + query;

  console.log(locQueryUrl);

  fetch(locQueryUrl)
    .then(function (response) {
      console.log(response.json);
      return response.json();
    })
    .then(function (data) {
      console.log(data.results);
      for (var i=0; i<data.results.length; i++) {
        var title = document.createElement('h3');
        title.textContent=data.results[i].title;
        resultContentEl.append(title);

        console.log(title);
      }
    });
}

document.location.href = locQueryUrl;


