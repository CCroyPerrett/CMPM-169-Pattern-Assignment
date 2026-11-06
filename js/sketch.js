let incriment = 0.02;
let patternscrollx = 0; patternscrolly = 0;
let patternscrollxspeed = 0.04; let patternscrollyspeed = 0.04;
let pause = false;
let drawperlin = true; let drawvoroni = true;

let points = [];
let numPoints = 25;

function setup() {
  createCanvas(400, 400);
  const perlintoggle = document.getElementById("perlintoggle"); perlintoggle.checked = true;
  const voronitoggle = document.getElementById("voronitoggle"); voronitoggle.checked = true;

  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: random(width),
      y: random(height),
      color: color(random(50, 255), random(50, 255), random(50, 255))
    });
  }
}

function draw() {
  loadPixels();
  drawperlin = document.getElementById("perlintoggle").checked;
  drawvoroni = document.getElementById("voronitoggle").checked;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let pixdefault = [0,0,0,255];
        if(drawperlin){
          let noiseVal = noise(x * incriment+patternscrollx, y * incriment+patternscrolly);
          let bright = map(noiseVal, 0, 1, 0, 255);
        
          pixdefault[0] += bright; 
          pixdefault[1] += bright; 
          pixdefault[2] += bright; 
          pixdefault[3] += 255;   
        }
        if(drawvoroni){
          let closestDist = Infinity;
          let closestIndex = 0;

          for (let i = 0; i < points.length; i++) {
            let dx = x - points[i].x;
            let dy = y - points[i].y;
            let d = dx * dx + dy * dy;

           if (d < closestDist) {
              closestDist = d;
             closestIndex = i;
           }
          }
          let i = (x + y * width) * 4;
          let c = points[closestIndex].color;

          pixdefault[0] += red(c)/2;
          pixdefault[1] += green(c)/2;
          pixdefault[2] += blue(c)/2;
          pixdefault[3] += 100; 
        }

        let i = (x + y * width) * 4;
        pixels[i]     = pixdefault[0]; // red
        pixels[i + 1] = pixdefault[1]; // green
        pixels[i + 2] = pixdefault[2]; // blue
        pixels[i + 3] = pixdefault[3];   
      }
    }


  for (let i = 0; i < points.length; i++) {
    if(pause == false){
    points[i].x += patternscrollxspeed*20;
    points[i].y += patternscrollyspeed*20;
    }
    if (points[i].x > width) {
      points[i].x = 0;
      points[i].y = random(height); 
    }
    if (points[i].y > height) {
      points[i].y = 0;
      points[i].x = random(height); 
    }
    if (points[i].x < 0) {
      points[i].x = width;
      points[i].y = random(height); 
    }
    if (points[i].y < 0) {
      points[i].y = height;
      points[i].x = random(height); 
    }
  }

  
  if(pause == false){
    patternscrollx -= patternscrollxspeed;
    patternscrolly -= patternscrollyspeed;
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



