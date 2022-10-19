let search = document.getElementById('search-bar');
let form = document.getElementById('forms');

let superHeroContainer = document.getElementById('superhero-list');




const targetUrl = 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=cd08f87bb180856f35c66d2cded450e3&hash=5f42053fffec70fc39f484e2b7171642';

const searchUrl2 = 'http://gateway.marvel.com/v1/public/characters?name=&ts=1&apikey=cd08f87bb180856f35c66d2cded450e3&hash=5f42053fffec70fc39f484e2b7171642';

const searchURL = 'https://gateway.marvel.com/v1/public/characters?name=';

const restURL = '&ts=1&apikey=cd08f87bb180856f35c66d2cded450e3&hash=5f42053fffec70fc39f484e2b7171642';







// javascript code for home page


// accessing different elements using class
const superHeroSection = document.querySelector('.superhero-main');
const superHeroFav = document.querySelector('.superhero-favorites');


//function to display characets on page load
getCharacters(targetUrl);

//get Character - fetching characters from marvel api
function getCharacters(url) {
  fetch(url).then(res => res.json()).then(data => {
    //console.log(data.data.results);
    showCharacters(data.data.results);

  });
}



// function to show superheroes on home page
if (superHeroSection) {
  function showCharacters(data) {

    superHeroSection.innerHTML = '';
    //fetching liked superheroes from local storage
    let likedSuperHero = getSuperHeroList();
    const persistSuperheroLikes = likedSuperHero.map(t => t.id);

    //function to show likes being persisted in the frontend
    function likeCheck(id) {

      for (var i = 0; i < persistSuperheroLikes.length; i++) {
        if (id == persistSuperheroLikes[i]) {
          return 'fa-solid';
        }
      }
      return 'fa-regular';
    }


    data.forEach(characters => {

      const characterInfo = document.createElement('div');

      characterInfo.classList.add('superhero-character');

      //grabbing the id and sending it over as query parameter when navigated to single page
      characterInfo.innerHTML = ` <a href = "singlepage.html?id=${characters.id}" class = "single-page" id = "${characters.id}">
      <img src="${characters.thumbnail.path + '.' + characters.thumbnail.extension}" alt="" class="superhero-img"></a>
    
      <div class="superhero-content">
        
          <h2 class="superhero-name">${characters.name}</h2>
          <i id="like" class="${likeCheck(characters.id)} fa-heart"></i>
        
      </div>
      `
      superHeroSection.appendChild(characterInfo);

    });
  }
}


//search characters
document.addEventListener('submit', (e) => {
  const searchInput = search.value;
  console.log(searchInput);
  if (searchInput) {

    getCharacters(searchURL + searchInput + restURL);
    setTimeout(listenForLikes, 1000);

  }
  e.preventDefault();
});


//get favorite data
const getFaveData = (elem) => {

  const parent = elem.parentElement.parentElement;

  const id = parent.querySelector('.single-page').id;
  const name = parent.querySelector('.superhero-name').textContent;
  const img = parent.querySelector('.superhero-img').src;
  const singlePageLink = parent.querySelector('.single-page').href;

  const superHeroCard = {
    id: id,
    superheroName: name,
    superHeroImg: img,
    singlePageLink: singlePageLink

  }
  //console.log(superHeroCard);
  storeInLocalStorage(superHeroCard);
}


//remove fav data
const removeFavData = (elem) => {
  const parent = elem.parentElement.parentElement;
  const id = parent.querySelector('.single-page').id;
  removeFromLocalStorage(id);
}

//listenForLikes();
setTimeout(listenForLikes, 3000);

//function for wishlsiting a card 
function listenForLikes() {
  const likes = document.querySelectorAll('#like');
  likes.forEach(like => {
    like.addEventListener('click', (event) => {
      like.classList.toggle('fa-solid')
      like.classList.toggle('fa-regular');
      if (event.target.classList.contains('fa-solid')) {
        console.log('favortite added');
        //gathering fav data to add in local storage
        getFaveData(event.target);

      } else {
        console.log('removing favorite');
        //gathering remove fav data to remove from local storage
        removeFavData(event.target);
        //like = 'fa-regular'
      }
    })
  })
}





//store in local storage
function storeInLocalStorage(superHeroCard) {
  let tasks = getSuperHeroList();
  if (!tasks.includes(superHeroCard)) {

    tasks.push(superHeroCard);

    localStorage.setItem('tasks', JSON.stringify(tasks));

  }

}

//remove from local storage
function removeFromLocalStorage(superHeroCardRemove) {
  let tasks = getSuperHeroList();
  tasks.forEach(function (task, index) {
    if (superHeroCardRemove === task.id) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getSuperHeroList() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}







// javascript code for single page that will be showing details of a particular superhero


//fetching the base url and getting the id from the base url
var baseUrl = (window.location).href;
var characterId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
// console.log(koopId);

//passing the id in API call
var singleCharacterURL = 'https://gateway.marvel.com:443/v1/public/characters/' + characterId + '?ts=1&apikey=cd08f87bb180856f35c66d2cded450e3&hash=5f42053fffec70fc39f484e2b7171642';


//function to display single character when clicked on the character in homepage
getSingleCharater(singleCharacterURL);

//get Character - fetching single character by id from marvel api
function getSingleCharater(url) {
  fetch(url).then(res => res.json()).then(data => {
    console.log(data.data.results);
    showSingleCharacters(data.data.results);

  });
}


const singleCharacter = document.querySelector('.superhero-details-section');


//using the fetched data from marvel api, displaying it on the single character page
function showSingleCharacters(data) {
  singleCharacter.innerHTML = '';
  data.forEach(character => {
    const superheroDetails = document.createElement('div');
    superheroDetails.classList.add('superhero-details');
    superheroDetails.innerHTML = `
      <img src="${character.thumbnail.path + '.' + character.thumbnail.extension}" alt="" class="superhero-details-img">
      <div class="superhero-details-info">
        <h2 class="superhero-details-info-name">${character.name}</h2>
        <p class="superhero-details-info-para">${character.description}</p>
      </div>
    `
    singleCharacter.appendChild(superheroDetails);
  });
}


function showEvents() {
  var events = document.querySelector(".events-details");
  if (events.style.display === "none") {
    events.style.display = "flex";
  } else {
    events.style.display = "none";
  }

}