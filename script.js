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
function text(text, x, y, fontSize, font, link) {
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
    if (link) {
        ctx.fillStyle = "blue";
    }
    else {
        ctx.fillStyle = "black";
    }
    ctx.fillText(TXT, X, Y);
    if (link) {
        var textMetrics = ctx.measureText(TXT);
        var temp = {
            x: X,
            y: Y - textMetrics.actualBoundingBoxAscent,
            w: textMetrics.width,
            h: textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent,
            link: text,
        };
        clickables.push(temp);
    }
}
Z.addEventListener('click', function (event) {
    var rect = Z.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    var clicked = hovering(mouseX, mouseY, clickables);
    if (clicked != null) {
        window.open(clicked.link, '_self');
    }
});
text('Eternity Remastered', 10, 50, '26px', "Fira Sans", false);
text('https://discord.gg/TJyxhNZHND', 10, 100, null, null, true);
