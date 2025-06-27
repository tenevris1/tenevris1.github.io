// tvS.js file
//WARNING! tvS requires p5.js, p5.play, p5.sound, and planck.js to work. If you don't have them, tvS will not work.
//feel free to edit any settings below!

moveMode = "vel" //"vel" or "pos". 'vel' is acceleration, 'pos' is just moving.
speedName = "Speed" //name of the speed variable.

//don't edit anything below this text. It might break.

console.log("If you haven't already, call init_tvS() in your code.");
function init_tvS(is) {
  if (!is) {
    console.info("Welcome to tvS! Expand the console to have a full introduction.");
    console.info("You can put 'init_tvS(true)' to skip this message, and initialize tvS.");
    console.info("tvS is a library that makes p5.js easier for beginners, and reduces work, even for advanced coders.");
    console.info("tvS, or tenevrisScript, is a JavaScript library made by Tenevris.");
    console.info("Check out the documentation at https://tenevris/tvS.com!");
    if (typeof Sprite == 'undefined')  {
      console.warn("You must run the following scripts in your html file to use tvS:")
    console.info('<script src="https://cdn.jsdelivr.net/npm/p5@1.11.4/lib/p5.js"></script>');
    console.info('<script src="https://cdn.jsdelivr.net/npm/p5@1.11.4/lib/addons/p5.sound.min.js"></script>');
    console.info('<script src="https://p5play.org/v3/planck.min.js"></script>');
    console.info('<script src="https://p5play.org/v3/p5play.js"></script>');
    console.warn("Alternatively, if you have those, you must put init_tvs() in the setup function. I have no idea why this is needed, but it is.");
    } else {
      console.log("tvS can do many things, such as:");
      console.log("Make sprites easily, with makeSprite(),");
      console.log("Move sprites easily, with moveUp(), moveDown(), moveLeft(), moveRight(), and move(),");
      console.log("Play music and sounds easily, with music() and sound(),");
      console.log("And even run scripts for almost anything, with run()!");
    }
    console.log();
  } else {
    load_tvS();
  } 
}

function load_tvS() {
  init_Move();
  console.log("tvS: init_Move loaded");
  init_Sprites();
  console.log("tvS: init_Sprites loaded.");
  init_buttons();
  console.log("tvS: init_buttons loaded.");
  init_sound();
  console.log("tvS: init_sound loaded.");
  console.log("tvS: tvS fully initialized.");
}

function init_Move() {
  Sprite.prototype.moveUp = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.vel.y -= this[speedName];
      } else if (moveMode == "pos") {
        this.y -= this[speedName];
      }
    }
  };
  Sprite.prototype.moveDown = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.vel.y += this[speedName];
      } else if (moveMode == "pos") {
        this.y += this[speedName];
      }
    }
  };
  Sprite.prototype.moveLeft = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.vel.x -= this[speedName];
      } else if (moveMode == "pos") {
        this.x -= this[speedName];
      }
    }
  };
  Sprite.prototype.moveRight = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.vel.x += this[speedName];
      } else if (moveMode == "pos") {
        this.x += this[speedName];
      }
    }
  };
  Sprite.prototype.move = function(type, key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        if (type == "up" || type == "Up") {this.vel.y -= this[speedName];}
        if (type == "down" || type == "Down") {this.vel.y += this[speedName];}
        if (type == "left" || type == "Left") {this.vel.x -= this[speedName];}
        if (type == "right" || type == "Right") {this.vel.x += this[speedName];}
      } else if (moveMode == "pos") {
        if (type == "up" || type == "Up") {this.y -= this[speedName];}
        if (type == "down" || type == "Down") {this.y += this[speedName];}
        if (type == "left" || type == "Left") {this.x -= this[speedName];}
        if (type == "right" || type == "Right") {this.x += this[speedName];}
      }
    }
  }
  Sprite.prototype.pointTo = function(x, y, push) {
    let dx = x - this.x;
    let dy = y - this.y;
    let angleRad = Math.atan2(dy, dx);
    let angleDeg = angleRad * (180 / Math.PI);
    this.rotation = angleDeg;
    this.vel.x += Math.cos(angleRad) * push;
    this.vel.y += Math.sin(angleRad) * push;
  }
  Sprite.prototype.push = function(push) {
    let angleRad = this.rotation * (Math.PI / 180);
    this.vel.x += Math.cos(angleRad) * push;
    this.vel.y += Math.sin(angleRad) * push;
  }
}

function init_Sprites() {
  makeSprite = function(name, img, x, y, collide, group) {
    let newSprite = new Sprite();
    newSprite.scale = 1;
    newSprite.vel.y = 0;
    newSprite.vel.x = 0;
    newSprite.x = x;
    newSprite.y = y;
    if (group != undefined) {
      group.push(newSprite);
    }
    if (collide == true) {
      newSprite.physics = 'dynamic';
    } else {
      newSprite.physics = 'kinematic';
      newSprite.collider = 'none';
    }
    newSprite.mass = 1;
    newSprite.img = img;
    return(newSprite);
  }
  Array.prototype.run = function(code) {
    for (i = this.length - 1; i >= 0; i--) {
      let sprite = this[i];
      code(sprite);
      if (code(sprite) == 'remove') {
        sprite.remove();
        this.splice(i, 1);
      }
    }
  }
  Sprite.prototype.run = function(code) {
    code(this);
  }
  distance = function(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }
}

function init_buttons() {
  isPress = function(key) {
    if (key == "Mouse") {
      if (mouse.pressing()) {
        return true;
      } else {
        return false;
      }
    } else {
      if (kb.pressing(key)) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function init_sound() {
  music = function(noise, loop) {
    if (loop) {
      noise.loop();
    } else {
      noise.play();
    }
  }
  sound = function(noise) {
    noise.play();
  }
}
