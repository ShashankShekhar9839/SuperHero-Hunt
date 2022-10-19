//superhero fav section to display fav superhero
const superHeroFav = document.querySelector('.superhero-favorites');

//add event listener for DOM content loading to fetch tasks from local storage
document.addEventListener('DOMContentLoaded', getTasks);

//get tasks from local storage
function getTasks(){
  
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((i) => {
    
    const characterFav = document.createElement('div');
      
    characterFav.classList.add('superhero-character');
    //grabbing the id and sending it over as query parameter when navigated to single page
    characterFav.innerHTML = ` <a href = "${i.singlePageLink}" class = "single-page" id = "${i.id}">
    <img src="${i.superHeroImg}" alt="" class="superhero-img"></a>
      
      <div class="superhero-content">
          
        <h2 class="superhero-name">${i.superheroName}</h2>
        <i id="like" class="fa-solid fa-heart"></i>
          
      </div>
      `
      superHeroFav.appendChild(characterFav);

  });
  
}

//remove favorite
window.onload=function(){
  var cards = document.querySelectorAll('#like');
  cards.forEach(card =>{
    card.addEventListener('click',function(){
      const idToRemove = card.parentElement.parentElement.querySelector('.single-page').id;;
      console.log(idToRemove);
      if(window.confirm('Are you sure you want to remove ' + card.parentElement.querySelector('.superhero-name').textContent + ' as favorite')){
        card.parentElement.parentElement.remove();
        removeFromLocalStorage(idToRemove);
      }
      
    })
  })
  
}

//remove from local storage
function removeFromLocalStorage(superHeroCardRemove){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task,index){
    if(superHeroCardRemove === task.id){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}