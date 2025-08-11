let COLOR = "black";
let frame = 0;
var Z = document.createElement("canvas");
Z.width = window.innerWidth;
Z.height = window.innerHeight;
Z.style.position = "fixed";
Z.style.top = "0";
Z.style.left = "0";
Z.style.zIndex = "9999";
document.body.appendChild(Z);
var ctx = Z.getContext("2d");
function hovering(x, y, group) {
  for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
    var guh = group_1[_i];
    if (x >= guh.x && x <= guh.x + guh.w && y >= guh.y && y <= guh.y + guh.h) {
      return guh;
    }
  }
  return null;
}
var clickables = [];
var lastFontSize;
var lastFont;
function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = COLOR;
  ctx.fill();
}
function text(text, x, y, fontSize, font, link, link2) {
  var TXT = text;
  var X = x;
  var Y = y;
  if (font == null) {
    font = lastFont;
  }
  if (fontSize == null) {
    fontSize = lastFontSize;
  }
  var FONT = "".concat(fontSize, " ").concat(font);
  lastFontSize = fontSize;
  lastFont = font;
  ctx.font = FONT;
  let textMetrics = ctx.measureText(TXT);
  if (link) {
    ctx.fillStyle = "blue";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fillText(TXT, X - textMetrics.width / 2, Y);
  if (link && link2 == true) {
    var temp = {
      x: X,
      y: Y - textMetrics.actualBoundingBoxAscent,
      w: textMetrics.width,
      h:
        textMetrics.actualBoundingBoxAscent +
        textMetrics.actualBoundingBoxDescent,
      link: text,
    };
    clickables.push(temp);
  }
}
Z.addEventListener("click", function (event) {
  var rect = Z.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  var clicked = hovering(mouseX, mouseY, clickables);
  if (clicked != null) {
    window.open(clicked.link, "_self");
  }
});
text("Eternity Refreshed", Z.width / 2, 50, "26px", "Fira Sans", false, false);
text("https://discord.gg/TJyxhNZHND", Z.width / 2, 100, null, null, true, true);

let list = [];

function createBars(total) {
  for (let i = 0; i < total; i++) {
    let X = i * (Z.width / total);
    let Y = Z.height + 40;
    let W = Z.width / total;
    let H = -(Z.height / 1.3 - Math.random() * (Z.height / 10));
    CSB(
      Math.random() * 10 + 70,
      Math.random() * 10 + 90,
      Math.random() * 25 + 50
    );
    list.push({
      x: X,
      y: Y,
      w: W,
      h: H,
      c: COLOR,
      spd: Math.random() * 40,
      fp: Math.random() * 0.1,
      f: 0,
    });
  }
}

function draw() {
  CSB(74, 100, 15);
  rect(0, 0, Z.width, Z.height);
  text(
    "Eternity Remastered",
    Z.width / 2,
    50,
    "26px",
    "Fira Sans",
    false,
    false
  );
  text(
    "https://discord.gg/TJyxhNZHND",
    Z.width / 2,
    100,
    null,
    null,
    true,
    false
  );
  for (let i of list) {
    i.f += i.fp;
    COLOR = i.c;
    let y = i.y - Math.cos(i.f) * i.spd;
    rect(i.x, y, i.w, i.h);
  }
  setTimeout(draw, 10);
}

function HSL(H, S, L) {
  COLOR = `hsl(${H} ${S}% ${L}%)`;
}

function CSB(C, S, B) {
  let H = C * 3.6;
  let L = B / 2;
  HSL(H, S, L);
}

createBars(Math.floor(Z.width / 30));
draw(list);
