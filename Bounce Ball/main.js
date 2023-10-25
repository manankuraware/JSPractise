// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// This script gets a reference to the < canvas > element, then calls the getContext() method on it to give us 
// a context on which we can start to draw.The resulting constant(ctx) is the object that directly represents the 
// drawing area of the canvas and allows us to draw 2D shapes on it.

// Next, we set constants called width and height, and the width and height of the canvas element(represented 
// by the canvas.width and canvas.height properties) to equal the width and height of the browser viewport(the 
// area which the webpage appears on — this can be gotten from the Window.innerWidth and Window.innerHeight properties).
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
// The random() function takes two numbers as arguments, and returns a random number in the range between the two. The randomRGB() function generates a random color represented as an rgb() string.

// Modeling a ball in our program
// Our program will feature lots of balls bouncing around the screen. Since these balls will all behave in the 
// same way, it makes sense to represent them with an object. Let's start by adding the following class definition 
// to the bottom of our code.
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}
const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );

    balls.push(ball);
}
function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();
// So far this class only contains a constructor, in which we can initialize the properties each ball needs in order to function in our program:

// x and y coordinates — the horizontal and vertical coordinates where the ball starts on the screen. This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right-hand corner).
// horizontal and vertical velocity (velX and velY) — each ball is given a horizontal and vertical velocity; in real terms these values are regularly added to the x/y coordinate values when we animate the balls, to move them by this much on each frame.
// color — each ball gets a color.
// size — each ball gets a size — this is its radius, in pixels.

// First, we use beginPath() to state that we want to draw a shape on the paper.
// Next, we use fillStyle to define what color we want the shape to be — we set it to our ball's color property.
// Next, we use the arc() method to trace an arc shape on the paper. Its parameters are:
// The x and y position of the arc's center — we are specifying the ball's x and y properties.
// The radius of the arc — in this case, the ball's size property.
// The last two parameters specify the start and end number of degrees around the circle that the arc is drawn between. Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians). That gives us a complete circle. If you had specified only 1 * PI, you'd get a semi-circle (180 degrees).
// Last of all, we use the fill() method, which basically states "finish drawing the path we started with beginPath(), and fill the area it takes up with the color we specified earlier in fillStyle."

// The first four parts of the function check whether the ball has reached the edge of the canvas. If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction. So for example, if the ball was traveling upwards (negative velY), then the vertical velocity is changed so that it starts to travel downwards instead (positive velY).

// In the four cases, we are checking to see:

// Runs the function again using the requestAnimationFrame() method — when this method is repeatedly run and passed the same function name, it runs that function a set number of times per second to create a smooth animation. This is generally done recursively — which means that the function is calling itself every time it runs, so it runs over and over again.
