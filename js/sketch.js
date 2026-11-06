let incriment = 0.02;
let patternscrollx = 0; patternscrolly = 0;
let patternscrollxspeed = 0.04; let patternscrollyspeed = 0.04;
let pause = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  loadPixels();
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let noiseVal = noise(x * incriment+patternscrollx, y * incriment+patternscrolly);
      let bright = map(noiseVal, 0, 1, 0, 255);
      
      let index = (x + y * width) * 4;
      pixels[index]     = bright; // red
      pixels[index + 1] = bright; // green
      pixels[index + 2] = bright; // blue
      pixels[index + 3] = 255;    
    }
  }
  
  if(pause == false){
    patternscrollx += patternscrollxspeed;
    patternscrolly += patternscrollyspeed;
  }
  updatePixels();
}

function pauseresume(){
  pause = !pause;
}

function leftright(){
  patternscrollxspeed *= -1;
}

function updown(){
  patternscrollyspeed *= -1;
}

function scrollspeed(){
  let speedslider = document.getElementById("speedslider");
  if(patternscrollxspeed < 0){
    patternscrollxspeed = -0.04 * speedslider.value;
  }
  else{
    patternscrollxspeed = 0.04 * speedslider.value;
  }

  if(patternscrollyspeed < 0){
    patternscrollyspeed = -0.04 * speedslider.value;
  }
  else{
    patternscrollyspeed = 0.04 * speedslider.value;
  }
}


