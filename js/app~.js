var url = 'https://rickandmortyapi.com/api/character/?page=1';

function fetch_normal(url) {

  fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        LoadNormal(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function fetch_next(url) {

  fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        LoadNext(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function fetch_prev(url) {

  fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        LoadPrev(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function makeCards(charactersArray) {

  const cardContainer = document.querySelector('#card-container .flex-row');

  cardContainer.innerHTML = '';

  charactersArray.forEach(character => {
    
    cardContainer.innerHTML = cardContainer.innerHTML + 
    `<div class="flex-col">
      <div class="card-inside-1">
        <img class="my-img" src= ${character.image}></img>
      </div>
      <div class="card-inside-2">
        <h2 class="my-title">  ${character.name} </h2>
        <span>${character.status} - ${character.species}</span>
      </div>
    </div>`

  });

}


window.onload = function() {
  console.log('On load...');
  console.log(url);

  fetch_normal(url);
  document.getElementById("buttonNext").addEventListener("click", function(){fetch_next(url)}, false);
  document.getElementById("buttonPrev").addEventListener("click", function(){fetch_prev(url)}, false);
};

function LoadNormal(data) {
  console.log('Load Normal...');
  
  results = data.results;
  
  makeCards(results);

}

function LoadNext(data) {
  console.log('Load Next...');
  

  url = data.info.next;
  results = data.results;

  console.log(url);
  console.log(results);
  
  makeCards(results);


}

function LoadPrev(data) {
  console.log('Load Prev...');

  url = data.info.prev;
  results = data.results;
  
  console.log(url);
  console.log(results);

  makeCards(results);

  
}


// console.log(data.results);
// console.log(data.info);
// console.log(data);