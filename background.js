"use strict";

//Diameter of one particle
let particleSize = 4;
//Total particles
let particleSum = 400;
//Distance the line gets drawn
let lineMaxDist = 40;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  stroke(255, 255, 255);
  fill(255, 255, 255);

  //Fills the array "particles" with particles
  for (let i = 0; i < particleSum; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 0, 0);
  //Move and display particles
  particles.forEach(particle => {
    particle.move();
    particle.connect();
    particle.repel();
    particle.display();
  });

  //galaxy
  var galaxy = {
    locationX: random(width),
    locationY: random(height),
    size: random(1, 3)
  };
  ellipse(mouseX, mouseY, galaxy.size, galaxy.size);
  ellipse(galaxy.locationX, galaxy.locationY, galaxy.size, galaxy.size);
}

class Particle {
  constructor() {
    this.pos = createVector(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height)
    );
    this.direction = createVector(Math.random() * 0.7, Math.random() * 0.7);
  }

  
  move() {
    this.pos = this.pos.add(this.direction);

    if (this.pos.x <= 0) this.direction.x *= -1;
    if (this.pos.x > width) this.direction.x *= -1;
    if (this.pos.y <= 0) this.direction.y *= -1;
    if (this.pos.y > height) this.direction.y *= -1;
  }

  
  repel() {
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    let mouse = createVector(mouseX, mouseY);
    let difference = p5.Vector.sub(mouse, this.pos);
    difference.setMag(1);


    if (distance < 100) {
      this.pos.sub(difference);
    }
  }

 
  connect() {
    particles.forEach(particle => {
      let distance = dist(
        this.pos.x,
        this.pos.y,
        particle.pos.x,
        particle.pos.y
      );
      if (distance < lineMaxDist) {
        stroke(color(255, 255, 255, map(distance, 0, lineMaxDist, 255, 0)));
        strokeWeight(map(distance, 0, lineMaxDist, 2, 0));
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }

  display() {
    noStroke();
    ellipse(this.pos.x, this.pos.y, particleSize);
  }
}