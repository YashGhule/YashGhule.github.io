let img;
let Song;

function preload() {
  soundFormats('mp3', 'ogg');
  Song = loadSound('MJ.mp3'); //song
  img = loadImage('MJ.gif'); //gif 
}

function setup() {
  img.resize(0, 700);
  img.loadPixels();

  let cnv = createCanvas(img.width, img.height);
  cnv.mousePressed(canvasPressed); //song controls when canvas is pressed

  noStroke();
  fill(0);
}

//song played and stopped on clicking canvas 
function canvasPressed() {
  if (Song.isPlaying()) {
    // .isPlaying() returns a boolean
    Song.stop();
  } else {
    Song.play();
  }
}

function draw() {
  // let frame = floor(frameCount * 60);
  image(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

  background(255);

  img.loadPixels();
  const stepSize = constrain(2, 5, 20); //pixel size

  //set brighteness filter from underlying gif
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - img.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}