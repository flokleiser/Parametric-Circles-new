//variables

let x, y;
let rotationStep;
let clockwiseRotation = true;
let speedX = 0.75; //for bouncy line
let speedY = -2;
// let speedX = 1;
// let speedY = -2; //for tping line


let amplitude; //good values = 60, 90, 120
let frequency = 0.05; //good values= 0.06, 0.006
let angleX = 0;
let angleY = 0;
let targetX, targetY;
let radius = 10; 
let angle = 0;
let aMove = 0;
let xMove = 0;
let yMove = 0;
let direction = 1;
let angleDirection = 1;
let stepSize = 10;
let spacing = 20;

let lastSwitchTime = 0;
let switchInterval = 2500;

let redVal, greenVal, blueVal;
let alphaVal = 70;                  
let redVal2, greenVal2, blueVal2;
let angleRotate = 0;

let drawing = false;
let weirdRotate = false;
let centerX, centerY;
let teleportCount = 0;
let targetPoints = [];
let targetPoints2 = [];
let currentTargetIndex = 0;
let currentTargetIndex2 = 0;
let easing = 0.068;

let sel; //drop down menu

let selectedCenterPoint = 0;
let newCenterPoint1 = false;
let newCenterPoint2 = false;
let newCenterPoint3 = false;
let newCenterPoint4 = false;
let newCenterPoint5 = false;
let newCenterPoint6 = false;
let newCenterPoint7 = false;
let newCenterPoint8 = false;

function setup() {
  resetCanvas();
  pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  background(50);

  centerX = width / 2;
  centerY = height / 2;

  rotationStep = PI;

  //buttons
  resetButton = createButton('RESET');
  resetButton.position(10,10);
  resetButton.mousePressed(resetCanvas);

  sel = createSelect();
  sel.position(80,10);
  sel.option('CONTROLS');
  sel.option('space = Draw', 1);
  sel.option('Enter = Save');
  sel.option('q = Change Angle');
  sel.option('w = Follow Mouse');
  sel.option('e = Color Changer');
  sel.option('r = Rotate');
  sel.option('d = Cont. Rotation');
  sel.option('l,k = Modifiers 1/2');
  sel.option('y = Add. Line 1');
  sel.option('x = Add. Line 2');
  sel.option('c = Add. Line 3');
  sel.option('v = Add. Line 4');
  sel.option('b = Add. Line 5');
  sel.option('n = Add. Line 6');
  sel.option('m = Add. Line 7');
  sel.option('s = - or | Line');
  sel.option('f = Wide Rotate');
  sel.option('t = Automatic Color');
  sel.option('1-8 = Drawings');
  sel.option('§ = Reset Canvas');
  sel.option('↑/↓ = toggleR+/-')
  sel.option('g = Half-Rotate');
  sel.option('h = Half-Rotate 2');

  sel.disable('CONTROLS');
  sel.selected('CONTROLS');
  
  //targetpoints
  targetPoints.push({ x: width/3, y: height/4 });
  targetPoints.push({ x: width/3, y: height/2 });
  targetPoints.push({ x: ((width/3)*2), y: (height/2) });
  targetPoints.push({ x: ((width/3)*2), y: ((height/4)*3) });
  targetPoints.push({ x: width/4, y: height/3 });
  targetPoints.push({ x: ((width/4)*3), y: (height/3)*2 });
  targetPoints.push({ x: width/2, y: height/2 });
  
  targetPoints2.push({ x: width/2, y: height/2});
  targetPoints2.push({ x: width/2-400, y: height/2 });
  targetPoints2.push({ x: width/2, y: height/2});
  targetPoints2.push({ x: width/2-200, y: height/2+200});
  targetPoints2.push({ x: width/2, y: height/2});
  targetPoints2.push({ x: width/2+200, y: height/2+200});
  targetPoints2.push({ x: width/2, y: height/2});
  targetPoints2.push({ x: width/2+400, y: height/2});
  targetPoints2.push({ x: width/2, y: height/2});
  targetPoints2.push({ x: width/2+200, y: height/2-200});
  targetPoints2.push({ x: width/2, y: height/2});
  targetPoints2.push({ x: width/2-200, y: height/2-200});
  targetPoints2.push({ x: width/2, y: height/2});
}

function draw() {
  if (drawing) {
    parametricLines();
  }
}

function parametricLines() {

  if (followMouse) {
    centerX = mouseX;
    centerY = mouseY;
  }
  if (!newCenterPoint7) {
    if (modifier2) {
    randomSwitch();
    }
  }

  //color logic
  if (colorChanger) {
    redVal = map(mouseY, 0, height, 0, 255);  
    greenVal = map(mouseX, 0, width, 0, 255);
    blueVal = 200;

    redVal2 = map(mouseY, 0, height, 0, 255);  
    greenVal2 = map(mouseX, 0, width, 0, 255);
    blueVal2 = 200;
  }
  else if (autoColor) {

    //gradient purple
    redVal = map(centerX, 0, height, 75, 200); 
    greenVal = map(centerY, 0, width, 75, 100);
    blueVal = 200;

    redVal2 = map(centerX, 0, height, 75, 200); 
    greenVal2 = map(centerY, 0, width, 75, 200);
    blueVal2 = 200;

    //nicer colorscheme
    // redVal = map(centerX, 0, height, 50, 255); 
    // greenVal = map(centerY, 0, width, 0, 200);
    // blueVal = 200;
    
    // redVal2 = map(centerX, 0, height, 50, 255);  
    // greenVal2 = map(centerY, 0, width, 0, 255);
    // blueVal2 = 200;
    
  //regular color
    // redVal = map(centerY, 0, height, 0, 255); 
    // greenVal = map(centerX, 0, width, 0, 255);
    // blueVal = 200;
    
    // redVal2 = map(centerY, 0, height, 0, 255); 
    // greenVal2 = map(centerX, 0, width, 0, 255);
    // blueVal2 = 200;
  }
  else {
    redVal = 255;
    greenVal = 255;
    blueVal = 255;

    redVal2 = 255;
    greenVal2 = 255;
    blueVal2 = 255;
  }

  //centerPoint logic  

    if (newCenterPoint1) {
      selectedCenterPoint = 1;
      followMouse = false;

      centerX = width/2 + 300 * cos(angleX * (PI/2*frequency));    
      centerY = height/2 + 200 * sin(angleY * (PI*frequency));     

      angleX += 0.1;
      angleY += 0.1;
    }
    if (newCenterPoint2) {
      selectedCenterPoint = 2;
      followMouse = false;
      
      //Lissajous  
      centerX = width/2 + 200 * sin(angleX);
      centerY = height/2 + 150 * sin(angleY);
      angleX += 0.02;
      angleY += 0.03; 
      if (toggleRotate) {
        if (angleX >= PI*4 && angleY >= PI*6) {
          drawing = !drawing;
          angleX = 0;
          angleY = 0;
        }
      }
    }
    if (newCenterPoint3) {
      selectedCenterPoint = 3;
      followMouse = false;
      //circle-ish
      amplitude = 150;
      centerX = width/2 + sin(angle) * amplitude;
      centerY = height/2 + cos(angle) * amplitude;
      angle += 0.01* PI;
      
      let numPoints = 12;
      let angleIncrement = TWO_PI / numPoints;
      angle += 0.01 * angleIncrement;
    }
    if (newCenterPoint4) {
    //some lines v2
    selectedCenterPoint = 4;
    isRotating = !isRotating;
    followMouse = false;
    
    let w = width/2; 
    let h = height/2;
    let spacing = 100;

    createMaze(centerX, centerY, w, h);

    function createMaze(x, y, w, h) {
      if (w < spacing || h < spacing) {
      return;
      }

      line(x, y - h/2, x, y + h / 2);
  
      createMaze(x - w / 4, y, w / 2, h);
      createMaze(x + w / 4, y, w / 2, h);
      }
    }
    if (newCenterPoint5) {
      selectedCenterPoint = 5;
      followMouse = false;
      // isRotating = !isRotating;
    
      if(modifier1) {
        centerX = width/2 + xMove;
        centerY = height/2;

      angleRotate += -PI;
      rotate(-angleRotate);
      }

    else {
      yMove = tan(xMove * 0.01)*150;
      centerX = width/2 + xMove; 
      centerY = height/2 + yMove;
      let moveAmount = 400;

      if (xMove >= -moveAmount && xMove <=moveAmount) {
        xMove +=  (PI) * direction;
      }
      if (xMove >= moveAmount || xMove <= -moveAmount) {
        direction *= -1;
      }
      xMove = constrain(xMove,-moveAmount,moveAmount);
    }
    }
    if (newCenterPoint6) {
      selectedCenterPoint = 6;
      followMouse = false;
      isRotating = !isRotating;
      newLine4 = !newLine4;
      // verticalLine = false;
      if (!modifier1) {
        if (teleportCount < 2) {
        centerX = targetPoints[currentTargetIndex].x;
        centerY = targetPoints[currentTargetIndex].y;
        currentTargetIndex++;
    
          if (currentTargetIndex >= targetPoints.length) {
          currentTargetIndex = 0;
          teleportCount = 0;
          teleportCount++;
          }
        }
      }
      if (modifier1) {
        if (teleportCount < 2) {
          centerX = targetPoints2[currentTargetIndex2].x;
          centerY = targetPoints2[currentTargetIndex2].y;
          currentTargetIndex2++;
      
            if (currentTargetIndex2 >= targetPoints2.length) {
            currentTargetIndex2 = 0;
            teleportCount = 0;
            teleportCount++;
            }
          }
      }
    }
    if (newCenterPoint7) {
      selectedCenterPoint = 7;
      isRotating = !isRotating;

      if (!modifier1 && !modifier3) {
        centerX += speedX;
        centerY += speedY;
        
        if (!verticalLine) {
          if (!newLine5) {
            if (centerY > height -25|| centerY < 25) {
            speedY *= -1;
            }
            if (centerX > width - 175 || centerX < 175) {
              speedX *= -1;
            }
          }  
          else if (newLine5) {
            if (centerY > height -105|| centerY < 105) {
              speedY *= -1;
              }
              if (centerX > width - 175 || centerX < 175) {
                speedX *= -1;
              }
            }
          }
      
          else if (verticalLine) {
          if (centerY > height -175|| centerY < 175) {
            speedY *= -1;
            }
          if (centerX > width - 25 || centerX < 25) {
              speedX *= -1;
          }
        } 
        
        if (modifier2) {
          if (centerX > 175 && centerX < width - 175 && centerY > 175 && centerY < height - 175) {
            //'b' automatic, 's' automatic, 't' automatic.
            randomSwitch();
          }
        }
    }

    //modifier3 = tping out frame, needed changes: more margin top/bottom, downwards also working
      if (modifier1) {
      centerX += speedX;
      centerY += speedY;
      if(centerX > width && verticalLine) {
        centerX = 0;
      }
      if(centerX > width+150 && !verticalLine) {
        centerX = -150;
      }
      if(centerY < 0 && !verticalLine) {
          centerY = height;
        }
      if(centerY < -150 && verticalLine) {
          centerY = height + 150;
      }

      if (modifier2) {
        randomSwitch();
      }
      }   
      
      //modifier3 = tping in frame, needed changes: more margin top/bottom, downwards also working
      if (modifier3 && !modifier1) {
        centerX += speedX;
        centerY += speedY;
        if(centerX > width - 75 && verticalLine) {
          centerX = 75;
        }
        if(centerX > width - 225 && !verticalLine /* && centerY < 75 */ ) {
          centerX = 255;
        }
        if(centerY < 225 && verticalLine) {
            centerY = height - 225;
        }
        if(centerY < 75 && !verticalLine) {
            centerY = height - 75;
        }

        if (modifier2) {
          randomSwitch();
        }
      }
    }
    if (newCenterPoint8) {
      if (!modifier1 && !modifier3) {
      centerX = lerp(centerX, targetPoints2[currentTargetIndex2].x, easing);
      centerY = lerp(centerY, targetPoints2[currentTargetIndex2].y, easing);
    
      let d = dist(centerX, centerY, targetPoints2[currentTargetIndex2].x, targetPoints2[currentTargetIndex2].y);
      
        if (d < 1) {
          currentTargetIndex2 = (currentTargetIndex2 + 1) % targetPoints2.length;
        }
      }
    if(modifier1 && !modifier3) {
      centerX = lerp(centerX, targetPoints[currentTargetIndex].x, easing);
      centerY = lerp(centerY, targetPoints[currentTargetIndex].y, easing);
     
      let d = dist(centerX, centerY, targetPoints[currentTargetIndex].x, targetPoints[currentTargetIndex].y);
        if (d < 1) {
          currentTargetIndex = (currentTargetIndex + 1) % targetPoints.length;
        }
      }
    }
    
  if (keyCode === SHIFT) {
    centerX = width/2;
    centerY = height/2;
    followMouse = !followMouse;
    console.log('center reset');
  }
    
  translate(centerX, centerY);  

  //rotating logic
  if (isRotating) {
 
    rotate(angleRotate);
    angleRotate += 0.1 * PI/8;
  
      if (toggleRotate) {
        if (angleRotate > rotationStep) {
            angleRotate = 0;
            drawing = !drawing;          
        }
        if (changeAngle) {
          
        }
      }
  }
  else {
      angleRotate = 0;
      rotate(angleRotate);
  } 
  if (changeAngle) { 
    angleRotate += -0.2 * PI/8;
    if (toggleRotate) {
      if (angleRotate <= -rotationStep) {
      angleRotate = 0;
      drawing = !drawing;       
      }
    }
  }
  if (halfRotate1) {
    if (clockwiseRotation == true) {
        if (angleRotate >= rotationStep && changeAngle == false) {
            changeAngle = true;
        }
        if (angleRotate <= 0) {
            changeAngle = !changeAngle;
        }
    } 
    else {
        if (angleRotate <= -rotationStep && changeAngle == true) {
            changeAngle = false;
        }
        if (angleRotate >= 0) {
            changeAngle = true;
        }
    }
  }
  if (halfRotate2) {
    if (angleRotate < -rotationStep) {
      changeAngle = !changeAngle;
      angleRotate = 0;
    } 
    if (!changeAngle && angleRotate > rotationStep) {
      changeAngle = !changeAngle;
      angleRotate = 0;
    }
  }

  //new lines
  if (newLine1) {
    //long thin
    stroke(redVal, greenVal, blueVal, 5);   
    strokeWeight(10)
    line(0,300,-300,200);
  }
  if (newLine2) {
    stroke(redVal, greenVal, blueVal, alphaVal);   
    strokeWeight(3);
    line(40,0,-40,0);
    // line(40,40,-40,-40);
  }
  if (newLine3) {
    // fill(50);
    stroke(redVal, greenVal, blueVal, 70);   
    strokeWeight(1);
    line(-200,0,-300,0);

    stroke(redVal, greenVal, blueVal, 70);   
    strokeWeight(1);
    line(200,0,300,0);
  }
  if (newLine4) {
    strokeWeight(2);
    stroke(redVal, greenVal, blueVal, alphaVal); 
    line(150,0,-150,0);
  }
  if (newLine5) {
    stroke(redVal2, greenVal2, blueVal2, 200);   
    strokeWeight(3);
    
    // line(80,0,-80,0);
    line(0,80,0,-80);
  }
  if (newLine6) {
    stroke(50);
    strokeWeight(6);
    line(0,20,0,-20);
    
    // ellipse(0,0,50,50);
    // square(-25,-25,50);
    // fill(50);

    // line(15,15,-15,-15);
    // line(15,-15,-15,15);
    line(20,0,-20,0);
  }

  if (weirdRotate) {
    translate((width/2)/2, (height/2)/2); //--> weird shape
    strokeWeight(2);
    stroke(redVal, greenVal, blueVal, alphaVal); 
    line(150,0,-150,0);
  }
  if (verticalLine) { 
    strokeWeight(2);
    stroke(redVal, greenVal, blueVal, alphaVal); 
    line(0,150,0,-150);
  }
  
  //standart line drawing
  else {
    if(!newStandartLine){
      strokeWeight(2);
      stroke(redVal, greenVal, blueVal, alphaVal); 
      line(150,0,-150,0);
    }
    if(newStandartLine) {
      strokeWeight(2);
      stroke(redVal,greenVal,blueVal,alphaVal);
      line(0,0,width,-height);
    }
  }
}

function toggleRotationStep(increase) {
  if (increase) {
    rotationStep *= 2;
  }
  else {
    rotationStep /= 2;
  }
}

function randomSwitch() {
  if (millis() - lastSwitchTime >= switchInterval) {
    if (random(2) > 1) {
      verticalLine = !verticalLine;
      newLine6 = !newLine6;
    }
    else {
      newLine5 = !newLine5;
    }
  lastSwitchTime = millis();
  }
}

function keyPressed() {
    if (keyCode === 13) {
      let filename = 'canvas newCenterPoint' + selectedCenterPoint + ' nr ' + frameCount + '.jpg';
        saveCanvas(filename, 'jpg');
      }
    else if (key === ' ') {
        drawing = !drawing;
        console.log('Drawing: ', drawing);
      }
    else if (key === 'p') {
      drawing2 = !drawing2;
      console.log('Drawing2: ',drawing2);
    }
    else if (key === 'w') {
      followMouse = !followMouse;
      console.log('Following Mouse: ', followMouse);
      }
    else if (key === 'q') {
      changeAngle = !changeAngle;
      if (halfRotate1 || halfRotate2) { 
        clockwiseRotation = !clockwiseRotation;
      }
      console.log('Changed Angle: ',changeAngle);
    }
    else if (key === 'd') {
      toggleRotate = !toggleRotate;
      console.log('Continuous Rotation: ',!toggleRotate);
    }
    else if (key === 'y') {
      newLine1 = !newLine1;
      console.log('New Line 1: ', newLine1);
    }
    else if (key === 'e') {
      colorChanger = !colorChanger;
      console.log('Colorchanger: ', colorChanger);
    }
    else if (key === 'r') {
      isRotating = !isRotating;
      console.log('Rotating: ', isRotating);
    }
    else if (key === 's') {
      verticalLine = !verticalLine;
      console.log('Vertical Line: ', verticalLine);
    }
    else if(key === 'x') {
      newLine2 = !newLine2;
      console.log('New Line 2: ', newLine2);
    }
    else if (key === 'c') {
      newLine3 = !newLine3;
      console.log('New Line 3: ', newLine3);
    }
    else if (key === 'f') {
      weirdRotate = !weirdRotate;
      console.log('Wide Rotate: ', weirdRotate);
    }
    else if (key === 't') {
      autoColor = !autoColor;
      console.log('Automatic Color: ', autoColor);
    }
    else if (key === 'v') {
      newLine4 = !newLine4;
      console.log('New Line 4: ', newLine4);
    }
    else if (key === 'g') {
      halfRotate1 = !halfRotate1;
      console.log('HalfRotate 1: ', halfRotate1);
    }
    else if (key === 'h') {
      halfRotate2 = !halfRotate2;
      console.log('HalfRotate 2: ', halfRotate2);
    }
    else if (key === 'b') {
      newLine5 = !newLine5;
      console.log('New Line 5: ',newLine5);
    }
    else if (key === 'n') {
      newLine6 = !newLine6;
      console.log('New Line 6: ', newLine6);
    }
    else if (key === 'm') {
      newStandartLine = !newStandartLine;
      console.log('New Line 7: ',newStandartLine);
    }
    else if (key === 'j') {
      modifier3 = !modifier3;
      console.log('Modifier3: ',modifier3);
    }
    else if (key === 'l') {
      modifier1 = !modifier1;
      console.log('Modifier 1: ',modifier1);
    }
    else if (key === 'k') {
      modifier2 = !modifier2;
      console.log('Modifier 2: ',modifier2);
    }
    else if (key === '1') {
      newCenterPoint1 = !newCenterPoint1;
      console.log('X,Y (1) automatic: ', newCenterPoint1);
    }
    else if (key === '2') {
      newCenterPoint2 = !newCenterPoint2;
      console.log('X,Y (2) automatic: ', newCenterPoint2);
    }
    else if (key === '3') {
      newCenterPoint3 = !newCenterPoint3;
      console.log('X,Y (3) automatic: ', newCenterPoint3);
    }
    else if (key === '4') {
      newCenterPoint4 = !newCenterPoint4;
      console.log('X,Y (4) automatic: ', newCenterPoint4);
    }
    else if (key === '5') {
      newCenterPoint5 = !newCenterPoint5;
      console.log('X,Y (5) automatic: ', newCenterPoint5);
    }
    else if (key === '6') {
      newCenterPoint6 = !newCenterPoint6;
      console.log('X,Y (6) automatic: ', newCenterPoint6);
    }
    else if (key === '7') {
      newCenterPoint7 = !newCenterPoint7;
      console.log('X,Y (7) automatic: ', newCenterPoint7);
    }
    else if(key === '8') {
      newCenterPoint8 = !newCenterPoint8;
      console.log('X,Y (8) automatic: ', newCenterPoint8);

    }
    else if (key === '§') {
      resetCanvas();
    }
    else if (keyCode === DOWN_ARROW) {
      toggleRotationStep(false);
      console.log("RotateAngle (toggleRotate) decreased");
    }
    else if (keyCode === UP_ARROW) {
      toggleRotationStep(true);
      console.log("RotateAngle (toggleRotate) increased");
    }
}

function resetCanvas() {
  console.log('Reset');
  clear();
    background(50);
    drawing = false;
    centerX = width / 2;
    centerY = height / 2;
    angleRotate = 0;
    followMouse = false;
    toggleRotate = false;
    modifier1 = false;
    modifier2 = false;
    modifier3 = false;
    newLine1 = false;
    newLine2 = false;
    newLine3 = false;
    newLine4 = false;
    newLine5 = false;
    newLine6 = false;
    newStandartLine = false;
    changeAngle = false;
    colorChanger = false;
    isRotating = true;
    verticalLine = true;
    autoColor = false;
    halfRotate1 = false;
    halfRotate2 = false;
    newCenterPoint1 = false;
    newCenterPoint2 = false;
    newCenterPoint3 = false;
    newCenterPoint4 = false;
    newCenterPoint5 = false;
    newCenterPoint6 = false;
    newCenterPoint7 = false;
    newCenterPoint8 = false;
}