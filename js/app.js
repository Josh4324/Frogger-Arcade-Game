// get the element with modal class and store it in a variable modal
var modal = document.getElementsByClassName('modal')[0];
// get the element with none class and store it in a variable none
var none = document.getElementsByClassName('none')[0];
// get the element with button class and store it in a variable button
var button = document.getElementsByClassName('button')[0];
// get the element with modal-overlay class and store it in a variable overlay
var overlay = document.querySelector('.modal-overlay');
// get the element with modal2 class and store it in a variable modal2
var modal2 = document.getElementsByClassName('modal2')[0];
// get the element with modal3 class and store it in a variable modal3
var modal3 = document.getElementsByClassName('modal3')[0];
// get the element with restart class and store it in a variable restart
var restart = document.getElementsByClassName('restart')[0];
// get the element with button2 class and store it in a variable button2
var button2 = document.getElementsByClassName('button2')[0];
// get the element with button3 class and store it in a variable button3
var button3 = document.getElementsByClassName('button3')[0];
// get the element with tagName ul and store it in a variable a
let a = document.getElementsByTagName('ul');
// get the element with tagName li and store it in a variable b
let b = document.getElementsByTagName('li');
let mySound = new sound("/Frogger-Arcade-Game/music/col.mp3")
let mySound2 = new sound("Frogger-Arcade-Game/music/game_b.mp3")

//this function adds the remove-modal class
//removes the none class and the modal-overlay class
function modals(){
  modal.classList.add("remove-modal");
  none.classList.remove("none");
  overlay.classList.remove("modal-overlay")
  mySound2.play()
};

//this function removes the show-modal class and the none class
//it also loads the Restart function
function remove1(){
  modal2.classList.remove("show-modal");
  none.classList.remove("none");
  Restart();
};

//this function removes the show-modal2 class and the none class
//it also loads the Restart function
function remove2(){
  modal3.classList.remove("show-modal2");
  none.classList.remove("none");
  Restart();
}

//this function resets the game, it sets the player live to 3
//it sets the player level to 1
//it resets the allheart Array
//it resets all the enemies speed to their initial speed
function Restart(){
  player.live = 3;
  player.level = 1;
  allheart = [heart1,heart2,heart3]
  document.getElementsByClassName('level')[0].textContent = player.level;
  a[0].innerHTML = ''
  a[0].innerHTML = a[0].innerHTML + '<li><img class="lives" src="images/Heart.png" alt=""></li> <li><img class="lives" src="images/Heart.png" alt=""></li> <li><img class="lives" src="images/Heart.png" alt=""></li> ';
  Enemy1.speed = 100;
  Enemy2.speed = 150;
  Enemy3.speed = 100;
  Enemy4.speed = 200;
  Enemy5.speed = 250;
  Enemy6.speed = 100;
  Enemy7.speed = 300;
  Enemy8.speed = 400;
  Enemy9.speed = 300;
};



//Event Listeners

//this event listener listens for click to start the game
button.addEventListener("click",modals);
//this event listener listens for click to start the game
overlay.addEventListener("click",modals);
//this event listener listens for click to restart the game
button2.addEventListener("click",remove1);
//this event listener listens for click to restart the game
restart.addEventListener("click",Restart);
//this event listener listens for click to restart the game
button3.addEventListener("click",remove2);

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //the x location of the enemy
    this.x = x;
    //the y location of the enemy
    this.y = y;
    //the speed of the enemy
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + (dt * this.speed)
  if (this.x > 600){
    this.x = -500;
  }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){
  //the image of the player
  this.hero = 'images/char-boy.png';
  //the x location of the player
  this.x = 200;
  //the y location of the player
  this.y = 380;
  //the no of lives of the player
  this.live = 3;
  //the game level
  this.level = 1;
}
// a render() method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.hero), this.x, this.y);
 
};

// an update method
Player.prototype.update = function(dt){
  //updates the lives of the player
  for (let i = 0; i < allheart.length; i++){
    if ((this.y === allheart[i].y) && (this.x >= allheart[i].x - 50 && this.x <= allheart[i].x + 74)){
      allheart.splice(i,1);
      this.live = this.live + 1;
      a[0].innerHTML = a[0].innerHTML + '<li><img class="lives" src="images/Heart.png" alt=""></li>';
    }
  }

  //updates the lives of the player
  for (let i = 0; i < allEnemies.length; i++){
    if ((player.y === allEnemies[i].y) && (player.x >= allEnemies[i].x - 50 && player.x <= allEnemies[i].x + 74)){
      this.live = this.live - 1;
      a[0].removeChild(b[0]);
    }
  }

  //Ends the game - the player loses the game
  if (this.live === 0){
    modal3.classList.add("show-modal2");
    none.classList.add("none");
  }

  //updates the player level
  if (this.y === -20){
    this.level = this.level + 1;
    alert(`Welcome to Level ${this.level}`)
    document.getElementsByClassName('level')[0].textContent = this.level;
    for (var i = 0; i < allEnemies.length; i++){
      allEnemies[i].speed = allEnemies[i].speed + 100;
    }
  };

  //Ends the game - the player won the game
  if (this.level === 6){
    none.classList.add("none");
    modal2.classList.add("show-modal");
    
  };

};

// a handleInput() method.
Player.prototype.handleInput = function(direc){
  if (direc === "left" && this.x > 0){
    this.x = this.x - 100;
  }
  if (direc === "right" && this.x < 400){
    this.x = this.x + 100;
  }
  if (direc === "up" && this.y > -20){
    this.y = this.y - 80;
  }
  if (direc === "down" && this.y < 380){
    this.y = this.y + 80;
  }
}

//Heart Class
var Heart = function(heart,x,y,speed){
  // the image of the heart
  this.heart = heart;
  // the x location of the heart
  this.x = x;
  // the y location of the heart
  this.y = y;
  // the speed of the heart
  this.speed = speed;
};

// Heart render method
Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.heart), this.x, this.y);
};

// Heart update method
Heart.prototype.update = function(dt) {
  this.x = this.x + (dt * this.speed)
  if (this.x > 10000){
    this.x = -20,000;
  }
};


// Now instantiate your objects.
var Enemy1,Enemy2,Enemy3,Enemy4,Enemy5,Enemy6,Enemy7,Enemy8,Enemy9;
Enemy1 = new Enemy(0,60,100);
Enemy2 = new Enemy(-100,220,150);
Enemy3 = new Enemy(-150,140,100);
Enemy4 = new Enemy(-300,60,200);
Enemy5 = new Enemy(-350,220,250);
Enemy6 = new Enemy(-400,140,100);
Enemy7 = new Enemy(-600,60,300);
Enemy8 = new Enemy(-650,220,400);
Enemy9 = new Enemy(-700,140,300);

//Gem objects
heart1 = new Heart('images/Heart.png',-10000,60,100);
heart2 = new Heart('images/Heart.png',-5000,220,250);
heart3 = new Heart('images/Heart.png',-20000,140,400);


// Place all enemy objects in an array called allEnemies
var allEnemies = [Enemy1,Enemy2,Enemy3,Enemy4,Enemy5,Enemy6,Enemy7,Enemy8,Enemy9];
//place gem
var allheart = [heart1,heart2,heart3]
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//this function checks for collision between the player and the enemies
var checkCollisions = function(){
  for (let i = 0; i < allEnemies.length; i++){
    if ((player.y === allEnemies[i].y) && (player.x >= allEnemies[i].x - 50 && player.x <= allEnemies[i].x + 74)){
      player.x = 200;
      player.y = 380;
      mySound.play()
    }
  }
};

//this function checks if the player has concluded the level
var win_c = function(){
  if (player.y === -20){
    player.x = 200;
    player.y = 380;
  }
};

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


