//#region variables

let x, y;
let rotationStep;

let amplitude = 120; //good values = 60, 90
let frequency = 0.05; //good values= 0.06, 0.006
let angleX = 0;
let angleY = 0;
let angle = 0;
let radius = 10; 
let aMove = 0;
let xMove = 0;
let yMove = 0;
let direction = 1;
let angleDirection = 1;

let redVal, greenVal, blueVal;
let alphaVal = 70;                  
let angleRotate = 0;

// let angleRotate2 = 0;

let drawing = false;
let weirdRotate = false;
let centerX, centerY;
let teleportCount = 0;
let targetPoints = [];
let currentTargetIndex = 0;

let sel; //drop down menu

let selectedCenterPoint = 0;
let newCenterPoint1 = false;
let newCenterPoint2 = false;
let newCenterPoint3 = false;
let newCenterPoint4 = false;
let newCenterPoint5 = false;
let newCenterPoint6 = false;
let newCenterPoint7 = false;
//#endregion

function setup() {
  resetCanvas()
  pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  background(50);
  // drawGrid();

  centerX = width / 2;
  centerY = height / 2;

  //#region buttons

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
  sel.option('a = Add. Line 1');
  sel.option('y = Add. Line 2');
  sel.option('x = Add. Line 3');
  sel.option('c = Add. Line 4');
  sel.option('s = - or | Line');
  sel.option('f = Wide Rotate');
  sel.option('t = Automatic Color');
  sel.option('1-7 = Drawings');
  sel.option('§ = Reset Canvas');
  sel.option('↑/↓ = toggleR+/-')
  sel.option('g = Half-Rotate');
  sel.option('h = Half-Rotate 2');

  sel.disable('CONTROLS');
  sel.selected('CONTROLS');
  //#endregion

  rotationStep = PI;
  
  //centerpoint 6 points
  targetPoints.push({ x: width/3, y: height/4 });
  targetPoints.push({ x: width/3, y: height/2 });
  targetPoints.push({ x: ((width/3)*2), y: (height/2) });
  targetPoints.push({ x: ((width/3)*2), y: ((height/4)*3) });
  targetPoints.push({ x: width/4, y: height/3 });
  targetPoints.push({ x: ((width/4)*3), y: (height/3)*2 });
  targetPoints.push({ x: width/2, y: height/2 });
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

  //color logic
  if (colorChanger) {
    redVal = map(mouseY, 0, height, 0, 255);  
    greenVal = map(mouseX, 0, width, 0, 255);
    blueVal = 200;
  }
  else if (autoColor) {
    redVal = map(centerX, 0, height, 0, 255);    
    greenVal = map(centerY, 0, width, 0, 255);
    blueVal = 200;
  }
  else {
    redVal = 255;
    greenVal = 255;
    blueVal = 255;
  }

  //CenterPoint logic
  //make newcenterpoint1 inverse
  //or make newcenterpoint for title graphics in middle
    if (newCenterPoint1) {
      selectedCenterPoint = 1;
      followMouse = false;
      
      //random scribbles
      centerX = width/2 + 300 * cos(angleX * (PI/2*frequency));
      centerY = height/2 + 200 * sin(angleY * (TWO_PI*frequency));      
      
      //cylinder
      // centerX = width/2 + 300 * sin(angleX * PI * frequency);
      // centerY = height/2 + 200 * cos(angleY *PI/2 *0.1);

      //rectangle
      // centerX = width/2 + 200 * sin(angleX);
      // centerY = height/2 +100 * cos(angleY);

      //nice shape (tan)
      // centerX = width/2 + 200 * tan(angleX * frequency);
      // centerY = height/2 + 300 * sin(-angleY * 0.1);

      angleX += 0.1 * PI/2;
      angleY += 0.1 * PI/4;
    }

    if (newCenterPoint2) {
      selectedCenterPoint = 2;
      followMouse = false;
      //Lissajous  
      centerX = width/2 + 200 * sin(angleX);
      centerY = height/2 + 150 * sin(angleY);
      angleX += 0.02;
      angleY += 0.03;  
    }

    if (newCenterPoint3) {
      selectedCenterPoint = 3;
      followMouse = false;
      //circle-ish
      centerX = width/2 + sin(angle) * amplitude;
      centerY = height/2 + cos(angle) * amplitude;
      angle += 0.01* PI;
    }

    if (newCenterPoint4) { 
      selectedCenterPoint = 4;
      followMouse = false;
      //kinda shit  
      let R = 50; 
      let r = 100; 
      let d = 50; 
      centerX = width / 2 +PI*( (R - r) * cos(angle) + d * cos((R - r) * angle / r));
      centerY = height / 2 + 2*((R - r) * sin(angle) - d * sin((R - r) * angle / r));
      angle += 0.1;


      //cylinder
      centerX = width/2 + 300 * sin(angleX * PI * frequency);
      centerY = height/2 + 200 * cos(angleY *PI/2 *0.1);

      angleX += 0.1 * PI/4;
      angleY += 0.1 * PI/4;
    }
    
    if (newCenterPoint5) {
      selectedCenterPoint = 5;
      followMouse = false;
    
      centerX = width/2 + xMove;
      centerY = height/2;
      let moveAmount = 750;

      // good xMoves = 10, 11, 11.5, TWO_PI, PI
      // good moveAmounts = 500, 1000;

    if (xMove >= -moveAmount && xMove <=moveAmount) {
      xMove +=  (PI*8) * direction; //works
    }
    if (xMove >= moveAmount || xMove <= -moveAmount) {
      direction *= -1;
    }
    xMove = constrain(xMove,-moveAmount,moveAmount);
    }

    if (newCenterPoint6) {
      selectedCenterPoint = 6;
      followMouse = false;
      isRotating = !isRotating;
      newLine4 = !newLine4;
      // verticalLine = false;

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
   
    if (newCenterPoint7) {
      selectedCenterPoint = 7;
     console.log('hi');
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
      }
  }
  else {
      angleRotate = 0;
      rotate(angleRotate);
  } 
  if (changeAngle) { 
    // angleRotate += -0.5 * PI/8;
    angleRotate += -0.2 * PI/8;
    if (toggleRotate) {
      if (angleRotate < -rotationStep) {
      angleRotate = 0;
      drawing = !drawing;       
      }
    }
  }
  if (halfRotate1) {
      if (angleRotate >= rotationStep) {
      changeAngle = !changeAngle;
    } 
    if (changeAngle && angleRotate <= 0) {
      changeAngle = !changeAngle;
    }
  }
  if (halfRotate2) {
    if (angleRotate >= rotationStep) {
      changeAngle = !changeAngle;
      angleRotate = 0;
    } 
    if (changeAngle && angleRotate < -rotationStep) {
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
  
  //standart line
  else {
    strokeWeight(2);
    stroke(redVal, greenVal, blueVal, alphaVal); 
    line(150,0,-150,0);
  }
}

// function parametricGrid() {
 
//   for (let i = 0; i < targetPoints.length - 1; i++) {
//       let point1 = targetPoints[i];
//       let point2 = targetPoints[i + 1];
//       line(point1.x, point1.y, point2.x, point2.y);
//     }
    
//     let firstPoint1 = targetPoints[0];
//     let lastPoint1 = targetPoints[targetPoints.length - 1];
//     line(lastPoint1.x, lastPoint1.y, firstPoint1.x, firstPoint1.y); 

//     let rotatedPoints = [];
//     for (let i = 0; i < targetPoints.length; i++) {
//       let x = targetPoints[i].x;
//       let y = targetPoints[i].y;
    
//       let rotatedX = centerX + (x - centerX) * cos(TWO_PI) - (y - centerY) * sin(PI);
//       let rotatedY = centerY + (x - centerX) * sin(TWO_PI) + (y - centerY) * cos(PI);
      
//       rotatedPoints.push({ x: rotatedX, y: rotatedY });
//     }
    
//     for (let i = 0; i < rotatedPoints.length - 1; i++) {
//       let point1 = rotatedPoints[i];
//       let point2 = rotatedPoints[i + 1];
//       line(point1.x, point1.y, point2.x, point2.y);
//     }
    
//     let firstPoint = rotatedPoints[0];
//     let lastPoint = rotatedPoints[rotatedPoints.length - 1];
//     line(lastPoint.x, lastPoint.y, firstPoint.x, firstPoint.y);

// }

function toggleRotationStep(increase) {
  if (increase) {
    rotationStep *= 2;
  }
  else {
    rotationStep /= 2;
  }
}

function keyPressed() {
    if (keyCode === 13) {
      let filename = 'canvas newCenterPoint' + selectedCenterPoint + ' nr ' + frameCount + '.pdf';
        saveCanvas(filename, 'pdf');
      }
    else if (key === ' ') {
        drawing = !drawing;
        console.log('Drawing: ', drawing);
      }
    else if (key === 'w') {
      followMouse = !followMouse;
      console.log('Following Mouse: ', followMouse);
      }
    else if (key === 'q') {
      changeAngle = !changeAngle;
      console.log('Changed Angle: ',changeAngle);
    }
    else if (key === 'd') {
      toggleRotate = !toggleRotate;
      console.log('Continuous Rotation: ',!toggleRotate);
    }
    else if (key === 'a') {
      newLine1 = !newLine1;
      console.log('New L ine 1: ', newLine1);
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
    else if(key === 'y') {
      newLine2 = !newLine2;
      console.log('New Line 2: ', newLine2);
    }
    else if (key === 'x') {
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
    else if (key === 'c') {
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
    // drawGrid();
    drawing = false;
    centerX = width / 2;
    centerY = height / 2;
    angleRotate = 0;
    followMouse = false;
    toggleRotate = false;
    newLine1 = false;
    newLine2 = false;
    newLine3 = false;
    newLine4 = false;
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
    newCenterpoint6 = false;
    newCenterpoint7 = false;
}

// function drawGrid() {
//   // stroke(255, 255, 255, 10);
//   //   fill(120);
// 	// for (var x=-2*width; x < 2*width; x+=50) {
// 	// 	line(x, -2*height, x, 2*height);
// 	// }
// 	// for (var y=-2*height; y < 2*height; y+=50) {
// 	// 	line(-2*width, y, 2*width, y);
// 	// }
  
//   stroke(255, 255, 255, 10);
//   noFill()
 
//   var gridSize = 50;
//   // var numColumns = width / gridSize;
//   // var numRows = height / gridSize;
//   // var xOffset = (width - numColumns * gridSize) / 2;
//   // var yOffset = (height - numRows * gridSize) / 2;
//   // for (var i = 0; i < numColumns; i++) {
//   //   for (var j = 0; j < numRows; j++) {
//   //     var x = i * gridSize + xOffset;
//   //     var y = j * gridSize + yOffset;
//   //     rect(x, y, gridSize, gridSize);
//   //   }
//   // }
//   var gridCenterX = width/2;
//   var gridCenterY = height/2;
//   var lineX = centerX;
//   var lineY1 = map(150, -150, 150, gridCenterY, -gridCenterY);

//   var xOffsetGrid = gridCenterX - lineX;
//   var yOffsetGrid = gridCenterY - lineY1;

//   for (var x = -gridCenterX; x < gridCenterX; x += gridSize) {
//     for (var y = -gridCenterY; y < gridCenterY; y += gridSize) {
//       rect(x+xOffsetGrid, y+yOffsetGrid, gridSize, gridSize);
//     }
//   }
// } 



//NEWLINE7
     //#region 
    
      // //v1
    // centerX = width/2 + 300 * tan(angleX * frequency);
    // centerY = height/2 + 350 * cos(-angleY * 0.1);
    // angleX += 0.1 * PI/2;
    // angleY += 0.1 * PI/4;
    
    // //random scribbles
    // const topThird = (height/3);
    // centerX = random(width);
    // centerY = random(topThird, height);
    //#endregion
     
    // //nice bouncing line

    // else if (autoColor) {
    //   redVal = map(centerX, 0, height, 0, 255);     //swap centerY and X
    //   greenVal = map(centerY, 0, width/1.5, 0, 255);
    //   blueVal = 250;
  
    //   // redVal = map(centerX, 0, height, 0, 255);     //swap centerY and X
    //   // greenVal = map(centerY, 0, width, 0, 255);
    //   // blueVal = 200;
      
    //   //Purple
    //   // redVal = map(centerX, 0, width, 150, 255);
    //   // blueVal = map(centerY,0,height,150,255);
    //   // greenVal = 0;
  
    //   //#region line5 color
    //   // redVal2 = map(centerX, 0, width, 150, 255);
    //   // blueVal2 = map(centerY,0,height,150,255);
    //   // greenVal2 = 0;
    //   redVal2 = map(centerY, 0, height, 0, 255);  
    //   greenVal2 = map(centerX, 0, width/2, 0, 255);
    //   blueVal2 = 250;
      
    //   // redVal2 = map(centerY, 0, height, 0, 255);  
    //   // greenVal2 = map(centerX, 0, width, 0, 255);
    //   // blueVal2 = 200;
    //   //#endregion
    // }

    if (newCenterPoint1) {
      selectedCenterPoint = 1;
      followMouse = false;
      
      //working loop= angle no*PI, angleY PI, angleX Pi/2
      //working noloop = anglex * PI/2
      centerX = width/2 + 300 * cos(angleX * (PI/2*frequency));     //PI, PI/2
      centerY = height/2 + 200 * sin(angleY * (PI*frequency));      //TWO_PI, PI

      // angleX += 0.1 * PI/2;
      // angleY += 0.1* PI/2;
      angleX += 0.1;
      angleY += 0.1;
    }

    redVal = map(centerX, 0, height, 50, 255); 
    greenVal = map(centerY, 0, width, 0, 200);
    blueVal = 200;
    
    redVal2 = map(centerX, 0, height, 50, 255);  
    greenVal2 = map(centerY, 0, width, 0, 255);
    blueVal2 = 200;