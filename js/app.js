const characterContainer = document.getElementById('card-container');
const modalCharacter = document.getElementById('modal-character');


function makeCards(charactersArray) {

  const cardContainer = document.querySelector('#card-container .flex-row');

  cardContainer.innerHTML = '';

  charactersArray.forEach(character => {
    
    //check status
    if (character.status === 'Alive' ) {
      tempStatus = "alive";
    } else if (character.status === 'Dead') {
      tempStatus = "dead";
    } else {
      tempStatus = "unknown";
    }

    cardContainer.innerHTML = cardContainer.innerHTML + 
    `<div class = 'character' data-characterID = '${character.id}'>
      <div class="flex-col">
        <div class="card-inside-1">
          <img class="my-img" src= ${character.image}></img>
        </div>
        <div class="card-inside-2">
          <h2 class="my-title">  ${character.name} </h2>
          <span class="my-status ${tempStatus} ">${character.status}</span> <span>-</span> <span>${character.species}</span>
        </div>
      </div>
     </div>`

  });

}

// Get character by id (const named arrow function)
const getCharacterById = character => {
  fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then(res => res.json())
      .then(data => {
          addCharacterToModalDOM(data);
      });
}

// Adding characters to DOM (const named arrow function)
const addCharacterToModalDOM = character => {
  
  //check status
  if (character.status === 'Alive' ) {
    tempStatus = "alive";
  } else if (character.status === 'Dead') {
    tempStatus = "dead";
  } else {
    tempStatus = "unknown";
  }

  document.getElementById('modal-character').innerHTML = `
  
      <div class = 'modal open-modal' id = 'modal'>
        <div class = 'modal-first'>
              <img class="my-img-modal" src = '${character.image}' /></img>
              <h1>${character.name}</h1>
              <span class="my-status ${tempStatus} ">${character.status}</span> <span>-</span> <span>${character.species}</span>
        </div>
        <div class = 'modal-second'> 
              <p>Gender: ${character.gender}</p>
              <p>Last seen location: ${character.location.name}</p>
              <p>Number of episodes appeared: ${character.episode.length}</p>
        </div> 
      </div>

  `;
}

window.onload = function() {
  // API URL, NEXT AND PREV FROM CURRENT PAGE
  var api_chars = 'https://rickandmortyapi.com/api/character/';
  var next = '';
  var prev = '';


  // load the first data
  fetch(api_chars)
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
        makeCards(data.results);
        if(data.info.next){
          next = data.info.next;
        }if(data.info.prev){
          prev = data.info.prev;
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  // NEXT button event listener
  document.getElementById("buttonNext").addEventListener("click", function(){
    // if variable next is not empty, null etc
    if(next){
      fetch(next)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            
            //Add the data to the UI
            makeCards(data.results);
            //Get the new Next and Prev and store in globals
            if(data.info.next){
              next = data.info.next;
            }if(data.info.prev){
              prev = data.info.prev;
            }
            return;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }}, false);

  // Prev button event listener  
  document.getElementById("buttonPrev").addEventListener("click", function(){

    // if variable prev is not empty, null etc
    if(prev){
      fetch(prev)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {

            //Add the data to the UI
            makeCards(data.results);

            //Get the new Next and Prev and store in globals
            if(data.info.next){
              next = data.info.next;
            }if(data.info.prev){
              prev = data.info.prev;
            }
            return;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }}, false);

  characterContainer.addEventListener('click', e => {// Show single character
    console.log("click");
    const characterInfo = e.path.find(item => {
        if (item.classList) {
          console.log(item.classList.contains('character'));
            return item.classList.contains('character');
        }
        
    });
  
    if (characterInfo) {
        const characterId = characterInfo.getAttribute('data-characterid');
        getCharacterById(characterId);
    }
    
  })


};


document.body.addEventListener('click', e => {
  console.log('click for modal');

  element = document.getElementById('modal-character').getElementsByClassName("open-modal")[0];

  if (element.length !== null) {
      element.classList.add("modal-close");
  }
});

