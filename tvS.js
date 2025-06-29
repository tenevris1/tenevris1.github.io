// tvS.js file
//WARNING! tvS requires p5.js, p5.play, p5.sound, and planck.js to work. If you don't have them, tvS will not work.
//feel free to edit any settings below!

moveMode = "vel" //"vel" or "pos". 'vel' is acceleration, 'pos' is just moving.
speedName = "Speed" //name of the speed variable.
screenSize = [800, 600]
//don't edit anything below this text. It might break.

let all = new Array();

console.log("If you haven't already, call init_tvS() in your code.");
console.log("This is tvS 0.3.3");
function init_tvS(is) {
  if (!is) {
    console.info("Welcome to tvS! Expand the console to have a full introduction.");
    console.info("You can put 'init_tvS(true)' to skip this message, and initialize tvS.");
    console.info("tvS is a library that makes p5.js easier for beginners, and reduces work, even for advanced coders.");
    console.info("tvS, or tenevrisScript, is a JavaScript library made by Tenevris.");
    console.info("Check out the documentation at https://github.com/tenevris1/tenevris1.github.io/wiki! Sorry the link is long, but I'm poor, and can't afford a custom domain.");
    if (typeof Sprite == 'undefined' || typeof createCanvas == 'undefined' || typeof p5.SoundFile == 'undefined' || typeof loadSound == 'undefined') {
    if (typeof Sprite == 'undefined') {
      console.warn("p5.play.js not loaded. Please include: <script src=\"https://p5play.org/v3/p5play.js\"></script>");
    }
    if (typeof createCanvas == 'undefined') {
      console.warn("p5.js not loaded. Please include: <script src=\"https://cdn.jsdelivr.net/npm/p5@1.11.4/lib/p5.js\"></script>");
    }
    if (typeof p5.SoundFile == 'undefined' && typeof loadSound == 'undefined') {
      console.warn("p5.sound.min.js not loaded. Please include: <script src=\"https://cdn.jsdelivr.net/npm/p5@1.11.4/lib/addons/p5.sound.min.js\"></script>");
    }
    if (typeof planck == 'undefined') {
      console.warn("planck.min.js not loaded. Please include: <script src=\"https://p5play.org/v3/planck.min.js\"></script>");
    }
      console.warn("Alternatively, if you have those, you must put init_tvS() in the setup function. I have no idea why this is needed, but it is.");
    } else {
      console.log("tvS can do many things, such as:");
      console.log("Make sprites easily, with makeSprite(),");
      console.log("Move sprites easily, with moveUp(), moveDown(), moveLeft(), moveRight(), and move(),");
      console.log("Play music and sounds easily, with play(),");
      console.log("And even run scripts for almost anything, with run()!");
      console.log();
    }
  } else {
    load_tvS();
  }
}

function load_tvS() {
  create_enviroment();
  console.log("tvS: enviroment made.");
  init_Move();
  console.log("tvS: init_Move loaded");
  init_Sprites();
  console.log("tvS: init_Sprites loaded.");
  init_Misc();
  console.log("tvS: init_Misc loaded.");
  console.log("tvS: tvS fully initialized.");
}

function create_enviroment() {
  createCanvas(screenSize[0], screenSize[1]);
}

function init_Move() {
  Sprite.prototype.moveUp = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.velocity.y -= this[speedName];
      } else if (moveMode == "pos") {
        this.y -= this[speedName];
      }
    }
  };
  Sprite.prototype.moveDown = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.velocity.y += this[speedName];
      } else if (moveMode == "pos") {
        this.y += this[speedName];
      }
    }
  };
  Sprite.prototype.moveLeft = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.velocity.x -= this[speedName];
      } else if (moveMode == "pos") {
        this.x -= this[speedName];
      }
    }
  };
  Sprite.prototype.moveRight = function(key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        this.velocity.x += this[speedName];
      } else if (moveMode == "pos") {
        this.x += this[speedName];
      }
    }
  };
  Sprite.prototype.move = function(type, key) {
    if (isPress(key) || key == undefined) {
      if (moveMode == "vel") {
        if (type == "up" || type == "Up") { this.velocity.y -= this[speedName]; }
        if (type == "down" || type == "Down") { this.velocity.y += this[speedName]; }
        if (type == "left" || type == "Left") { this.velocity.x -= this[speedName]; }
        if (type == "right" || type == "Right") { this.velocity.x += this[speedName]; }
      } else if (moveMode == "pos") {
        if (type == "up" || type == "Up") { this.y -= this[speedName]; }
        if (type == "down" || type == "Down") { this.y += this[speedName]; }
        if (type == "left" || type == "Left") { this.x -= this[speedName]; }
        if (type == "right" || type == "Right") { this.x += this[speedName]; }
      }
    }
  }
  Sprite.prototype.pointTo = function(x, y, push) {
    let dx = x - this.x;
    let dy = y - this.y;
    let angleRad = Math.atan2(dy, dx);
    let angleDeg = angleRad * (180 / Math.PI);
    this.rotation = angleDeg;
    if (push != undefined) {
      if (moveMode == "vel") {
        this.velocity.x += Math.cos(angleRad) * push;
        this.velocity.y += Math.sin(angleRad) * push;
      } else {
        this.x += Math.cos(angleRad) * push;
        this.y += Math.sin(angleRad) * push;
      }
    }
  }
  Sprite.prototype.push = function(push) {
    let angleRad = this.rotation * (Math.PI / 180);
    if (moveMode == "vel") {
      this.velocity.x += Math.cos(angleRad) * push;
      this.velocity.y += Math.sin(angleRad) * push;
    } else {
      this.x += Math.cos(angleRad) * push;
      this.y += Math.sin(angleRad) * push;
    }
  }
}

function init_Sprites() {
  makeSprite = function(img, x, y, group) {
    let newSprite = new Sprite();
    newSprite.scale = 1;
    newSprite.vel.y = 0;
    newSprite.vel.x = 0;
    newSprite.x = x;
    newSprite.y = y;
    newSprite.rotation = 0;
    newSprite.groups = new Array();
    if (group != undefined) {
      group.push(newSprite);
      newSprite.groups.push(group);
    }
    all.push(newSprite);
    newSprite.groups.push(all);
    newSprite.physics = "dynamic";
    newSprite.collider = "none";
    newSprite.mass = 1;
    newSprite.img = img;
    if (img) {
      newSprite.width = img.width;
      newSprite.height = img.height;
    }
    return (newSprite);
  }
  Array.prototype.run = function(code) {
    for (var i = this.length - 1; i >= 0; i--) {
      let sprite = this[i];
      code(sprite)
    }
  }
  Sprite.prototype.run = function(code) {
    code(this)
  }
  distance = function(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }
  Sprite.prototype.hit = function(item) {
    if (Array.isArray(item)) {
      for (var i = item.length - 1; i >= 0; i--) {
        let d = distance(this.x, this.y, item[i].x, item[i].y);
        let thisRadius = this.width * this.scale;
        let otherRadius = item[i].width * item[i].scale;
        if (d < (thisRadius + otherRadius)) {
          return true;
        }
      }
    } else {
      let d = distance(this.x, this.y, item.x, item.y);
      let thisRadius = this.width * this.scale;
      let otherRadius = item.width * item.scale;
      if (d < (thisRadius + otherRadius)) {
        return true;
      }
    }
  }
  Sprite.prototype.healthbar = function(x, y, width, height, shaded) {
    let health = this.health;
    let maxHealth = this.maxHealth;
    let filled = health / maxHealth;
    let healthBarWidth = width * filled;
    fill(255, 255, 255)
    rect(x, y, width, height)
    fill(255, 0, 0)
    noStroke()
    if (shaded) {
      rect(x, y, healthBarWidth, height)
      fill(225, 0, 0)
      rect(x, y + (height * 0.4), healthBarWidth, height * 0.6)
    } else {
      rect(x, y, healthBarWidth, height)
    }
    noFill()
    stroke(0, 0, 0)
    strokeWeight(3)
    rect(x, y, width, height)
    strokeWeight(1)
  }
  Sprite.prototype.kill = function() {
    if (this.groups && Array.isArray(this.groups)) {
      for (let i = this.groups.length - 1; i >= 0; i--) {
        let group = this.groups[i];
        if (group && Array.isArray(group)) {
          const index = group.indexOf(this);
          if (index > -1) {
            group.splice(index, 1);
          }
        }
      }
    }
    this.x = -99;
    this.y = -99;
    this.vel.x = 0;
    this.vel.y = 0;
    this.visible = false;
  }
};

function init_Misc() {
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
  play = function(noise, loop) {
    if (loop) {
      noise.loop();
    } else {
      noise.play();
    }
  }
};

function preload() {
}

function setup() {
}

function draw() {
}

//end of tvS.js
