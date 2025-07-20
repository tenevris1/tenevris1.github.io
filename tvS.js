function loadScript(url) {
  const script = document.createElement('script');
  script.src = url;
  script.onload = () => {
    console.log(`${url} loaded successfully!`);
  };
  script.onerror = () => {
    console.error(`Error loading ${url}`);
  };
  document.body.appendChild(script);
}

loadScript('https://cdn.jsdelivr.net/npm/p5@1.11.4/lib/p5.min.js');
loadScript('https://p5play.org/v3/planck.min.js')
loadScript('https://p5play.org/v3/p5play.js')
loadScript('https://cdn.jsdelivr.net/npm/p5@1.11.4/lib/addons/p5.sound.min.js')

moveMode = "vel" //"vel" or "pos". 'vel' is acceleration, 'pos' is just moving.
speedName = "spd" //name of the speed variable.

//don't edit anything below this text. It might break.
let all = new Array();
let menus = new Array();
let undef = undefined;


console.log("Welcome to tvS 0.3.5!")
function load_tvS() {
  init_Move();
  console.log("tvS: init_Move loaded");
  init_Sprites();
  console.log("tvS: init_Sprites loaded.");
  init_Misc();
  console.log("tvS: init_Misc loaded.");
  init_Menu();
  console.log("tvS: init_Menu loaded.");
  create_enviroment();
  console.log("tvS: enviroment made.");
  console.log("tvS: tvS fully initialized.");
}

function create_enviroment() {
  mouse = makeSprite(undef, mouseX, mouseY);
  if (mouseIsPressing) {
    mouse.pressing = function() {
      return true;
    }
  } else {
    mouse.pressing = function() {
      return false;
    }
  }
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
    if (img) {
      newSprite.img = img;
      newSprite.width = img.width;
      newSprite.height = img.height;
    } else {
      newSprite.width = 5;
      newSprite.height = 5;
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

function init_Menu() {
  createMenu = function() {
    newMenu = new Array();
    menus.push(newMenu)
    newMenu.vis = true;
    return newMenu
  }
  addButton = function(image, x, y, menu, code) {
    let button = makeSprite(image, x, y, menu)
    button.pCode = code;
    return button;
  }
  Array.prototype.hide = function() {
    this.vis = false;
  }
  Array.prototype.show = function() {
    this.vis = true;
  }
}


function preload() {
  
}

function setup() {
  load_tvS()
}

function draw() {
  mouse.x = mouseX;
  mouse.y = mouseY;
  if (mouseIsPressing) {
    mouse.pressing = function() {
      return true;
    }
  } else {
    mouse.pressing = function() {
      return false;
    }
  }
  for (var i = menus.length - 1; i >= 0; i--) {
    if (menus[i].vis == true) {
      menus[i].run(sprite => {
        sprite.visible = true;
        if (isPress('mouse') && sprite.hit(mouse)) {
          sprite.pCode();
        }
      });
    } else {
      menus[i].run(sprite => {
        sprite.visible = false;
      });
    }
  }
}


//end of tvS.js
