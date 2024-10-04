let Board = document.querySelector("#board");
let Blue = document.querySelector("#blue");
let Red = document.querySelector("#red");
let DiceBtn = document.querySelector("#diceBtn");
let Dice = document.querySelector("#dice");
let Tog = document.querySelector("#tog");
const diceAudio = new Audio("./Assets/rollingAudio.wav");
const LadderAudio = new Audio("./Assets/ladders.wav");
const snakeAudio = new Audio("./Assets/Snake.wav");

const PlayerPosition = {
  red: 0,
  blue: 0,
  yellow: 0,
  green: 0,
};

function makeDiv() {
  let createBox = "";
  for (let i = 9; i >= 0; i--) {
    let start = i * 10 + 1;
    let end = (i + 1) * 10;
    if (i % 2 === 0) {
      for (let col = start; col <= end; col++) {
        createBox += ` <div id=${col} class="box items-center justify-center font-bold  text-xl flex   flex-wrap text-black h-full w-full relative "> </div> `;
      }
    } else {
      for (let col = end; col >= start; col--) {
        createBox += ` <div id=${col} class="box items-center justify-center font-bold  text-xl relative flex   text-black  flex-wrap h-full w-full "> </div> `;
      }
    }

    // for (let i = 100; i >= 91; i--) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 81; i <= 90; i++) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 80; i >= 71; i--) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 61; i <= 70; i++) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 60; i >= 51; i--) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 41; i <= 50; i++) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 40; i >= 31; i--) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 21; i <= 30; i++) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 20; i >= 11; i--) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    // for (let i = 1; i <= 10; i++) {
    //   createBox += ` <div id=${i} class="box items-center justify-center font-bold  text-xl flex    border-2 border-black text-white h-full w-full "> </div> `;
    // }
    Board.innerHTML = createBox;
  }
}

function rollerNMove(player) {
//! Generate number and change Dice Image  =====================>
  let random = Math.floor(Math.random() * 6 + 1);
  let imgDice = document.querySelector("#diceNum");
  let img;
  // console.log("random :->", random);
  switch (random) {
    case 1:
      imgDice.innerHTML = `<img src="./Assets/1.jpg" alt="1" id="dicNum" class="w-20 h-20 "> `;
      diceAudio.play();
      break;

    case 2:
      imgDice.innerHTML = `<img src="./Assets/2.jpg" alt="2" id="dicNum" class="w-20 h-20 "> `;
      diceAudio.play();
      break;

    case 3:
      imgDice.innerHTML = `<img src="./Assets/3.jpg" alt="3" id="dicNum" class="w-20 h-20 "> `;
      diceAudio.play();
      break;

    case 4:
      imgDice.innerHTML = `<img src="./Assets/4.jpg" alt="4" id="dicNum" class="w-20 h-20 "> `;
      diceAudio.play();
      break;

    case 5:
      imgDice.innerHTML = `<img src="./Assets/5.jpg" alt="5" id="dicNum" class="w-20 h-20 "> `;
      diceAudio.play();
      break;

    case 6:
      imgDice.innerHTML = `<img src="./Assets/6.jpg" alt="6" id="dicNum" class="w-20 h-20 "> `;
      diceAudio.play();
      break;
  }
  //! ==================================== END =========>
 
    // console.log("player :->", player);
  let currPosition = PlayerPosition[player];
  // console.log("CurrPosition :->", currPosition);
  let newPosition = currPosition + random;
  // console.log("newPosition :->", newPosition);
  if (newPosition <= 100) {
    PlayerPosition[player] = newPosition;
    PlayerPosition[player] = checkSnakeLadders(PlayerPosition[player]);
    movePlayer(player, PlayerPosition[player]);
  }
}

function movePlayer(Player, Position) {
  let playerDiv = document.querySelectorAll(`.player.${Player} `);
  // console.log("player Move player :->", Player);
  // console.log("player Move playerDiv :->", playerDiv);
  // console.log("Position", Position);
  playerDiv.forEach((playerDiv) => {
    // console.log("playerDiv :->", playerDiv);
    playerDiv.remove();
  });
  const box = document.getElementById(Position);
  // console.log("box:->", box);
  if (box) {
    const playerDiv = document.createElement("div");
    playerDiv.className = `player absolute   ${Player}  bg-${Player}-600 border-white border-4  rounded-full py-1 px-3  ${Player === "blue" ? "left-4" :" " }  ${Player === "red" ? "right-3" :" " } ${Player === "green" ? "bottom-3" :" " }`;
    let P = Player.charAt(0).toUpperCase();
    // console.log("p :->", P);
    playerDiv.textContent = `${P}`;
    box.appendChild(playerDiv);
  }
}

function checkSnakeLadders(Position) {
  const snakes = {
    99: 63,
    97: 87,
    92: 25,
    90: 48,
    85: 59,
    83: 45,
    75: 28,
    60: 23,
    56: 1,
    54: 36,
    51: 6,
    39: 5,
    26: 10,
    18: 1,
    8: 4,
  };
  const Ladders = {
    3: 20,
    6: 14,
    11: 28,
    15: 34,
    17: 74,
    22: 37,
    38: 59,
    49: 67,
    57: 76,
    61: 78,
    73: 86,
    81: 98,
    88: 91,
  };

  if (snakes[Position]) return snakes[Position];
  if (Ladders[Position]) return Ladders[Position];
  return Position;
}

DiceBtn.addEventListener("click", function () {
  const player = ["red ", "blue ", "green", "yellow"];
  const currPlayerIdx = player.indexOf(Tog.textContent);
  // console.log('currPlayerIdx:-> ', currPlayerIdx)
  const nextPlayerIDx = (currPlayerIdx + 1) % player.length;
  const nextPlayer = player[nextPlayerIDx];
  Tog.textContent = nextPlayer;
  rollerNMove(nextPlayer);
});

makeDiv();
