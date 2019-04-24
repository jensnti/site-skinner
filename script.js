let canvas = document.createElement('canvas');
canvas.setAttribute("id", "bg");
//canvas.setAttribute = "id:"
//let canvas = document.getElementById('bg');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

let start = null;

const Ball = function(x, y, r, c0, c1, blur) {
    const ball = {};
    ball.r = r ? r : random(40, 120);
    ball.x = x ? x : random(ball.r * 2, canvas.width - (ball.r * 2));
    ball.y = y ? y : random(ball.r * 2, canvas.height - (ball.r * 2));
    ball.r = r ? r : random(40, 120);
    ball.velX = random(-7, 7);
    ball.velY = random(-7, 7);
    ball.cStop0 = c0 ? c0 : [221, 8, 144, 1];
    ball.cStop1 = c1 ? c1 : [75, 0, 130, 1];
    ball.blur = blur ? blur : random(4, 10);
    ball.update = function() {
        if ((this.x + this.r) >= canvas.width) {
            this.velX = -(this.velX);
        }
        if ((this.x - this.r) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.r) >= canvas.height) {
            this.velY = -(this.velY);
        }
        if ((this.y - this.r) <= 0) {
            this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    };
    ball.draw = function() {
        this.gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.r, this.y + this.r);
        this.gradient.addColorStop(0, "rgba(" + this.cStop0 + ")");
        this.gradient.addColorStop(1, "rgba(" + this.cStop1 + ")");
        ctx.fillStyle = this.gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.filter = "blur(" + this.blur + "px)";
        ctx.fill();
    };
    return ball;
}

let balls = [];

function newBall(x, y, r, c0, c1, blur) {
    balls.push(Ball(x, y, r, c0, c1, blur));
}

let i = 0;

while (i < 10) {
    newBall(false, false, false, [221 + (i*4), 8 + (i*4), 144 + (i*4), 1], [75 - (i * 4), 0, 130 - (i * 4), 1]);
    i++;
}

function step(timestamp) {
    ctx.fillStyle = "#1c0030";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!start) start = timestamp;
    let progress = timestamp - start;
    ctx.filter = "none";
    ctx.font = '12px sans-serif';
    ctx.fillStyle = "#fff";
    ctx.fillText(Math.floor(progress), 4, 20);

    balls.forEach(element => {
        element.draw();
        element.update();
    });

    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function random(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

let body = document.getElementsByTagName('body')[0];

body.appendChild(canvas);
