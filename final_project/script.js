// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, frameCount, clear, key, storeItem, getItem, textAlign,
          createImg, textFont, CENTER, square, circle, triangle, arc, rectMode, quad, PI, QUARTER_PI, CHORD*/

let backgroundColor, levelTime, gameIsOver, score, time, card, levelStarted;
let brandeis, rice, gsu, uchicago, uwashington, northwestern, mit, waterloo, whitworth, ucla
let deckLevelOne, deckLevelTwo, deckLevelThree, allDecks, startTime, countDown
let turnedCards = [];
let canvasWidth, canvasHeight

//set up for the game
function setup() {
  // Canvas, color, and basic variable settings
  canvasWidth = 900
  canvasHeight = 800
  createCanvas(canvasWidth, canvasHeight);
  backgroundColor = color(173, 216, 230);
  gameIsOver = false;
  score = 0;
  time = 0;
  startTime = false
  countDown = 5
  allDecks = []
  levelStarted = false

  
  //deck ONE
  let possibleColors = ["red", "black", "grey", "purple", "orange", "blue"]
  possibleColors = shuffle(possibleColors)
  
  let possiblePositionsL1 = []
  possiblePositionsL1[0] = [130, 260, 390, 520, 650, 780]
  possiblePositionsL1[1] = [300, 600]
  
  possiblePositionsL1[0] = shuffle(possiblePositionsL1[0])
  possiblePositionsL1[1] = shuffle(possiblePositionsL1[1])
  
  //empty deck to host all cards for LEVEL ONE
  deckLevelOne = []
  for(let j = 0; j < 2; j++) {
    possiblePositionsL1[0] = shuffle(possiblePositionsL1[0])
    for(let i = 0; i < possibleColors.length; i++) {
      let cardL1 = new Card(possiblePositionsL1[0][i], possiblePositionsL1[1][j], "color", possibleColors[i], color(255, 242, 188), "b")
      deckLevelOne.push(cardL1)
    }
  }
  
  deckLevelOne = shuffle(deckLevelOne)
  allDecks[0] = []
  for(let k = 0; k < deckLevelOne.length; k++) {
    allDecks[0][k] = deckLevelOne[k]
  }
  
  
  //deck TWO
  let possibleShapes = ["sqr", "circle", "ellipse", "semiC", "quad", "tri2", "tri1"]
  possibleShapes = shuffle(possibleShapes)
  
  let possiblePositionsL2 = []
  possiblePositionsL2[0] = [114, 228, 342, 456, 570, 684, 798]
  possiblePositionsL2[1] = [300, 600]
  
  possiblePositionsL2[0] = shuffle(possiblePositionsL2[0])
  possiblePositionsL2[1] = shuffle(possiblePositionsL2[1])
  
  //empty deck to host all cards for LEVEL TWO
  deckLevelTwo = []
  for(let j = 0; j < 2; j++) {
    possiblePositionsL2[0] = shuffle(possiblePositionsL2[0])
    for(let i = 0; i < possibleShapes.length; i++) {
      let cardL2 = new Card(possiblePositionsL2[0][i], possiblePositionsL2[1][j], "shape", possibleShapes[i], color(255, 242, 188), "b")
      deckLevelTwo.push(cardL2)
    }
  }
  
  deckLevelTwo = shuffle(deckLevelTwo)
  allDecks[1] = []
  for(let k = 0; k < deckLevelTwo.length; k++) {
    allDecks[1][k] = deckLevelTwo[k]
  }
  
  //deck THREE
  let possibleMascots = ["brandeis", "northwestern", "uchicago", "ucla", "gsu", "mit", "whitworth", "uwashington", "rice", "waterloo"]
  possibleMascots = shuffle(possibleMascots)
  
  let possiblePositionsL3 = []
  possiblePositionsL3[0] = [170, 310, 450, 590, 730]
  possiblePositionsL3[1] = [180, 360, 540, 720]
  
  possiblePositionsL3[0] = shuffle(possiblePositionsL3[0])
  possiblePositionsL3[1] = shuffle(possiblePositionsL3[1])
  
  //empty deck to host all cards for LEVEL THREE
  deckLevelThree = []
  for(let j = 0; j < 3; j+=2) {
    possiblePositionsL3[0] = shuffle(possiblePositionsL3[0])
    for(let i = 0; i < possibleMascots.length/2; i++) {
      let cardL3 = new Card(possiblePositionsL3[0][i], possiblePositionsL3[1][j], "mascot", possibleMascots[i], color(255, 242, 188), "b")
      deckLevelThree.push(cardL3)
    }
    let ind = 0;
    for(let n = possibleMascots.length/2; n < possibleMascots.length; n++) {
      let cardL3 = new Card(possiblePositionsL3[0][ind], possiblePositionsL3[1][j+1], "mascot", possibleMascots[n], color(255, 242, 188), "b")
      deckLevelThree.push(cardL3)
      ind++;
    }
  }
  deckLevelThree = shuffle(deckLevelThree)
  allDecks[2] = []
  for (let k = 0; k < deckLevelThree.length; k++) {
    allDecks[2][k] = deckLevelThree[k]
  }
}

//checks to match each card if the value is the same, otherwise flip them
function matchCard() {
  if (turnedCards.length === 2) {
    if(turnedCards[0].value === turnedCards[1].value) {
      score++
      turnedCards[0].matchedStatus = true
      turnedCards[1].matchedStatus = true
      turnedCards = []
    }
    else {
      setTimeout(() => {
        turnedCards[0].click();
        turnedCards[1].click();
        turnedCards = []
      }, 350);
    }
  }
}

//main draw function
function draw() {
  background(backgroundColor);
  noStroke()
  fill(255, 255, 255);
  textSize(60);
  textStyle(BOLD)
  textFont('Baloo');
  text('Memory Card Game', canvasWidth/5, 60);
  textSize(24);
  levels();
  
  //show cards, countdown, and score for level one
  if(keyCode === 65) {
    for (let card of allDecks[0]) {
      card.display()    
    }
    fill(255, 255, 255);
    noStroke()
    text(`Countdown: ${time}`, canvasWidth/4, 140);
    text(`Score: ${score}`, canvasWidth/4*2 + 80, 140);
    handleTime();
  }
  //show cards, countdown, and score for level two
  else if (keyCode === 66) {
    for (let card of allDecks[1]) {
      card.display()    
    }
    fill(255, 255, 255);
    noStroke()
    text(`Countdown: ${time}`, canvasWidth/4, 140)
    text(`Score: ${score}`, canvasWidth/4*2 + 80, 140);
    handleTime();
  }
  //show cards, countdown, and score for level three
  else if (keyCode === 67) {
    for (let card of allDecks[2]) {
      card.display()    
    }
    fill(255, 255, 255);
    noStroke()
    text(`Countdown: ${time}`, canvasWidth/4, 100)
    text(`Score: ${score}`, canvasWidth/4*2 + 80, 100);
    handleTime();
  }
}

//function checking mouse is pressed 
function mousePressed() {
  if(keyCode === 65 && levelStarted === true) {
    for (let card of allDecks[0]) {
      if(card.checkClicked()) {
        turnedCards.push(card)        
      }
    } 
    matchCard()
  }
  else if (keyCode === 66 && levelStarted === true) {
    for (let card of allDecks[1]) {
      if(card.checkClicked()) {
        turnedCards.push(card)        
      }
    }
    matchCard()
  }
  else if (keyCode === 67 && levelStarted === true) {
    for (let card of allDecks[2]) {
      if(card.checkClicked()) {
        turnedCards.push(card)        
      }
    }
    matchCard()
  }
}

function levels() {
  noStroke()
  fill(255, 255, 255);
  textSize(32);
  textFont('Baloo');
  
  if(!(keyCode === 65) && !(keyCode === 66) && !(keyCode === 67)) {
    textSize(40);
    text('Welcome, Choose a level:', canvasWidth/4, 140);
    //put text
    rectMode(CENTER)
    let level1 = new Rectangle(canvasWidth/3 - 130, canvasHeight/2, 230, 250, color(0, 0, 139))
    level1.showFront()
    fill("white")
    textSize(40)
    text('Type', level1.x/2 + 40, level1.h+66)
    textSize(170)
    text('A', level1.x/2 + 20, level1.h+205)
    textSize(25)
    text('For Level 1', level1.x/2 + 20, level1.h+250)
    
    
    let level2 = new Rectangle(width/3 * 1.55, height/2, 230, 250, color(0,0,139))
    level2.showFront()
    fill("white")
    textSize(40)
    text('Type', level2.x/2 + 190, level2.h+66)
    textSize(170)
    text('B', level2.x/2 + 175, level2.h+205)
    textSize(25)
    text('For Level 2', level2.x/2 + 173, level2.h+250)
    
    
    let level3 = new Rectangle(width/3 * 2.5, height/2, 230, 250, color(0,0,139))
    level3.showFront()
    fill("white")
    textSize(40)
    text('Type', level3.x/2 + 330, level2.h+66)
    textSize(170)
    text('C', level3.x/2 + 310, level2.h+205)
    textSize(25)
    text('For Level 3', level3.x/2 + 315, level2.h+250)
    // textSize(50)
    // text('Press A', width/7.5, height/3+50)
    // text('For Level 1, Press A', width/15, height/3);
    // text('For Level 2, Press B', width/15, height/3 + 40);
    // text('For Level 3, Press C', width/15, height/3 + 80); 
  }
  else {
    
  }
}

//function for setting up each level when appropriate key is pressed
function keyPressed() {
  if (keyCode == 65) {
    console.log("key a was pressed");
    time = 900;
    score = 0
    setTimeout(() => {
      levelStarted = true;
      startTime = true;}, 3300)

  } else if (keyCode == 66) {
    console.log("key b was pressed");
    time = 750;
    score = 0
    setTimeout(() => {
      levelStarted = true;
      startTime = true;}, 3300)
  } else if (keyCode == 67) {
    console.log("key c was pressed");
    time = 1500;
    score = 0
    setTimeout(() => {
      levelStarted = true;
      startTime = true;}, 3300)
  }
}

//function for decrementing time
function handleTime() {
  if (time > 0 && startTime) {
    time -= 1;
    for(let card of allDecks[0]) {
      card.displayC = true
    }
    for(let card of allDecks[1]) {
      card.displayC = true
    }
    for(let card of allDecks[2]) {
      card.displayC = true
    }
  } else if (startTime === true){
    gameIsOver = true;
    rectMode(CENTER)
    let gameO = new Rectangle(canvasWidth/2, canvasHeight/2, 530, 250, color(0, 0, 139))
    gameO.showFront()
    textAlign(CENTER)
    fill("white")
    textSize(38);
    text("Time's Up!", gameO.x, gameO.y - 50);
    textSize(32);
    text("Press the spacebar to play again.", gameO.x, gameO.y)
    textSize(38)
    text(`Final Score: ${score}`, gameO.x, gameO.y + 50)
    textAlign(LEFT)
    rectMode(CORNER)
    for(let card of allDecks[0]) {
      card.displayC = false
    }
    for(let card of allDecks[1]) {
      card.displayC = false
    }
    for(let card of allDecks[2]) {
      card.displayC = false
    }
  }
}
  
//Rectangle class used to create the card
class Rectangle {
  constructor(x, y, w, h, color) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
  }
  
  showFront() {
    fill(this.color)
    rect(this.x, this.y, this.w, this.h)
  }
  showBack() {
    stroke(255, 242, 188)
    strokeWeight(3)
    fill(255, 214, 188)
    rect(this.x, this.y, this.w, this.h)
  }
}

//preloading the mascot images
function preload() {
  //mascots:
    brandeis = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fbrandeis.png?v=1627996888664', 'brandies mascot')  
    northwestern = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fnorthwestern.png?v=1627996902643', 'northwestern mascot')
    gsu = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fgsu.png?v=1627996893472', 'gsu mascot')
    uchicago = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fuchicago.png?v=1627998039954', 'uchicago mascot')
    mit = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fmit.png?v=1627996897821', 'mit mascot')
    rice = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2FRice.png?v=1627996906853', 'rice mascot')
    ucla = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fucla.png?v=1627996917333', 'ucla mascot')
    uwashington = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fuwashington.png?v=1627996922444', 'uwashington mascot')
    waterloo = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fwaterloo.png?v=1627996927019', 'waterloo mascot')
    whitworth = loadImage('https://cdn.glitch.com/e0c2b77f-1b0c-4ce4-aa63-c6a2edbca572%2Fwhitworth.png?v=1627996931057', 'whitworth mascot')
}

//Card class with all the features for each card
class Card {
  constructor(x, y, type, value, color, show) {
    this.x = x
    this.y = y
    this.type = type
    this.value = value
    this.color = color
    this.matchedStatus = false
    rectMode(CENTER)
    this.show = show
    this.rect = new Rectangle(x, y, 90, 120, this.color)
    this.displayC = true
  }
  
  //to show the card
  display() {
    
    //the back of the card
    if (this.show === "b" && this.displayC === true) {
      this.rect.showBack()
      this.showingF = false
      this.showingB = true
      return true
    }
    
    //the front of the card
    else if (this.show === "f" & this.displayC === true) {
      stroke(255, 214, 188)
      strokeWeight(3)
      this.showingF = true
      this.showingB = false
      this.rect.showFront()
      
      // for level 1 cards
      if(this.type === "color") {
        noStroke()
        this.colorRect = new Rectangle(this.rect.x, this.rect.y, 55, 65, this.value)
        this.colorRect.showFront()
      }
      
      //for level 2 cards
      else if (this.type === "shape") {
        if(this.value === "sqr") {
          noStroke()
          fill(2) 
          this.square = square(this.rect.x+(this.rect.w/150), this.rect.y + (this.rect.h/150), 40)
        }
        else if (this.value === "circle") {
          noStroke()
          fill(2) 
          this.circle = circle(this.rect.x+(this.rect.w/150), this.rect.y + (this.rect.h/150), 50)
        }
        else if (this.value === "ellipse") {
          noStroke()
          fill(2) 
          this.ellipse = ellipse(this.rect.x+(this.rect.w/150), this.rect.y + (this.rect.h/150), 45, 70)
        }
        else if (this.value === "tri1") {
          noStroke()
          fill(2) 
          this.tri1 = triangle(this.rect.x, this.y - 30,
                               this.rect.x + (this.rect.w/3), this.rect.y + (this.rect.h/3),
                               this.rect.x - (this.rect.w/3), this.rect.y + (this.rect.h/3),)
        }
        else if (this.value === "tri2") {
          noStroke()
          fill(2) 
          this.tri1 = triangle(this.rect.x + (this.rect.w/3), this.y - 30,
                               this.rect.x + (this.rect.w/3), this.rect.y + (this.rect.h/3),
                               this.rect.x - (this.rect.w/3), this.rect.y + (this.rect.h/3),)
        }
        //I have no more patience to make this a real semi circle, so it shall be this LOL
        else if (this.value === "semiC") {
          noStroke()
          fill(2) 
          this.semiC = arc(this.rect.x+(this.rect.w/150), this.rect.y + (this.rect.h/150), 60, 60, 0, PI + QUARTER_PI, CHORD);
        }
        else if (this.value === "quad") {
          noStroke()
          fill(2) 
          this.quad = quad(this.rect.x, this.rect.y + (this.rect.h/150) + 30, this.rect.x+(this.rect.w/3), this.rect.y + (this.rect.h/150) + 30, this.rect.x, this.rect.y - 30, this.rect.x-(this.rect.w/3), this.rect.y - 30);
        }
      } 
      
      //for level 3 cards
      else if (this.type === "mascot") {
        if(this.value === "brandeis") {
          image(brandeis, this.rect.x-40, this.rect.y - 45); 
        }
        else if (this.value === "northwestern") {
          image(northwestern, this.rect.x-33, this.rect.y - 45)
        }
        else if (this.value === "gsu") {
          image(gsu, this.rect.x-40, this.rect.y - 45)
        }
        else if (this.value === "uchicago") {
          image(uchicago, this.rect.x-40, this.rect.y - 45)
        }
        else if (this.value === "mit") {
          image(mit, this.rect.x-40, this.rect.y - 45)
        }
        else if (this.value === "rice") {
          image(rice, this.rect.x-40, this.rect.y - 45)
        }
        else if (this.value === "ucla") {
          image(ucla, this.rect.x-40, this.rect.y - 45)
        }
        else if (this.value === "uwashington") {
          image(uwashington, this.rect.x-40, this.rect.y - 45)
        }
        else if (this.value === "waterloo") {
          image(waterloo, this.rect.x-40, this.rect.y - 45)
        }
        else if (this.value === "whitworth") {
          image(whitworth, this.rect.x-40, this.rect.y - 45)
        }
      }
      }    
  }
  
  //check if the user clicked within the boundaries of the card
  checkClicked() {
    //x position of left side, x position of right side, y position of top, and y position of bottom
    let sXL = this.rect.x - this.rect.w/2
    let sXR = this.rect.x + this.rect.w - 30
    let yT = this.rect.y - this.rect.h/2
    let yB = this.rect.y + this.rect.h - 30
    
    //if the mouse click is within the boundaries and the card has not been previously matched
    if (mouseX > sXL && mouseX < sXR && (mouseY > yT && mouseY < yB) && mouseIsPressed && this.matchedStatus === false) {
      this.click();
      return true;
    }
    return false
    
  }
  
  //actually flip the cards
  click() {
    //if it's showing the back, flip to the front
    if(this.show === "b") {
      this.show = "f"
      this.display()
    }
    //else show the back
    else {
      this.show = "b"
      this.display()
    }
  }
}

//gameover page
function gameOverPage(){
 if (startTime == true) {
   text(`Press the space bar to play again`, 450, 250);
 };
}
