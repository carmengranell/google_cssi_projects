// function levelOne() {
//   console.log("inside level One")
//   let possibleColors = ["red", "black", "grey", "purple", "orange", "blue"]
//   possibleColors = shuffle(possibleColors)
  
//   //empty deck to host all cards for this level
//   deckLevelOne = []
//   for(let i = 0; i < possibleColors.length; i++) {
//     for(let j = 0; j < 2; j++) {
//       //need to find a way to randomize the x and y positions without any cards overlapping
//       let cardL1 = new Card(300, 300, "color", possibleColors[i], color(255, 242, 188), "b")
//       deckLevelOne.push(cardL1)
//     }
//   }
  
//   //for every card in the deck, 
//   //set it equal to the global card variable so it shows and can be flipped
//   //there's a problem with this because 
//   //it's setting only one card equal to the global, 
//   //but we need to be able to see all the cards and flip each one
//   //same issue with level Two and Three
//   for(let colorCard of deckLevelOne) {
//     card = colorCard
//     console.log(card)
//   }
//   console.log("One: " + deckLevelOne.length)
// }

// function levelTwo() {
//   //sqr, circle, ellipse, semiC, quad, tri1, tri2, 
//   let possibleShapes = ["sqr", "circle", "ellipse", "semiC", "quad", "tri2", "tri1"]
//   // possibleShapes = shuffle(possibleShapes)
//   console.log(possibleShapes.length)
  
//   //empty deck to host all cards for this level
//   deckLevelTwo = []
//   for(let i = 0; i < possibleShapes.length; i++) {
//     for(let j = 0; j < 2; j++) {
//       //need to find a way to randomize the x and y positions without any cards overlapping
//       let cardL2 = new Card(300, 300, "shape", possibleShapes[i], color(255, 242, 188), "b")
//       deckLevelTwo.push(cardL2)
//     }
//   }
//   //for every card in the deck, set it equal to the global card variable so it shows and can be flipped
//   for(let shapeCard of deckLevelTwo) {
//     card = shapeCard
//     console.log(card)
//   }
//   console.log("Two: " + deckLevelTwo.length)
// }

// function levelThree() {
//   //brandeis, northwestern, uchicago, ucla, mit, whitworth, uwashington, gsu, rice, waterloo
//   let possibleMascots = ["brandeis", "northwestern", "uchicago", "ucla", "gsu", "mit", "whitworth", "uwashington", "rice", "waterloo"]
//   possibleMascots = shuffle(possibleMascots)
  
//   //empty deck to host all cards for this level
//   deckLevelThree = []
//   for(let i = 0; i < possibleMascots.length; i++) {
//     for(let j = 0; j < 2; j++) {
//       //need to find a way to randomize the x and y positions without any cards overlapping
//       let cardL3 = new Card(300, 300, "mascot", possibleMascots[i], color(255, 242, 188), "b")
//       deckLevelThree.push(cardL3)
//     }
//   }
//   //for every card in the deck, set it equal to the global card variable so it shows and can be flipped
//   for(let mascotCard of deckLevelThree) {
//     card = mascotCard
//     console.log(card)
//   }
//   console.log("Three: " + deckLevelThree.length)
// }
