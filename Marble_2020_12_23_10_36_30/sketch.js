let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  //particle plotting
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
    particles[i].limit();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    //ellipse position
    this.size = random(0.5, 0.5);
    //ellipse size
    this.vel = createVector(0, 0);
    //velocity
    this.mov = createVector(random(0, 50), random(0, 50));
    //move
    this.colour = random(0, 255);

    this.update = function() {
      this.n = createVector(noise(this.mov.x), noise(this.mov.y));
      //noise
      this.mappednoise = createVector(map(this.n.x, 0, 1, -3, 3), map(this.n.y, 0, 1, -3, 3));
      //mapped noise
      this.acc = createVector(this.mappednoise.x, this.mappednoise.y);
      //acceleration
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.mov.add(random(0, 0.05), random(0, 0.05));
      this.vel.set(0, 0)
      this.colour += 0.01
      if (this.colour > 255) {
        this.colour = 0
      }
    }

    this.display = function() {
      noStroke();
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.size);
    }

    this.limit = function() {
      if (this.pos.x > width) {
        this.pos.x = 0;
      }
      if (this.pos.x < 0) {
        this.pos.x = width;
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
      }
    }
  }
}