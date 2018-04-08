const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const comparePlayerScores = (playersArray) => {
  p1Score = playersArray[0].points.total;
  p2Score = playersArray[1].points.total;
  if (p1Score < p2Score) {
    buildDOMStringWinnerProfile(playersArray[1]);
  } else if (p1Score > p2Score) {
    buildDOMStringWinnerProfile(playersArray[0]);
  } else {
    alert("It's a tie.");
  }
};
//---------------------DOM String Builders ---------------------//
const buildDOMStringPlayerProfile = (playersArray) => {
  let output = "";
  for (let i = 0; i < playersArray.length; i++) {
    output = `
              <h2>${playersArray[i].name}</h2>
              <img src="${playersArray[i].gravatar_url}">
              <h4>${playersArray[i].points.total}</h4>`;
    printToDom(output, `player${i+1}`);
  }
  comparePlayerScores(playersArray);
};
const buildDOMStringWinnerProfile = (winner) => {
  let winnerName = `<h1 class="text-center winner">${winner.name} wins!</h1>`;
  printToDom(winnerName, "winner-div");
  let badges = "";
  for (let i = 0; i < winner.badges.length; i++) {
    badges += `
              <div class="col-lg-3 text-center">
                <h4 class="badge-name">${winner.badges[i].name}</h4>
                <img class="badge-img" src="${winner.badges[i].icon_url}">
              </div>
              `;
  }
  printToDom(badges, "winner-badges");
};
function XHRFailure() {
  console.log("Something is not quite right.");
}
//will only return a single player at a time!
const genericXHRCall = (username, someRandoFunction) => {
  const data = new XMLHttpRequest();
  data.addEventListener('load', someRandoFunction);
  data.addEventListener('error', XHRFailure);
  data.open("GET", `https://teamtreehouse.com/${username}.json`);
  data.send();
};
const semiMegaPush = (p1,p2) => {
  let newPlayerArray = [];
  newPlayerArray.push(p1,p2);
  return newPlayerArray;
};
const playerXHRCall = (player1objectInput) => {
  const player2 = document.getElementById("player2-input").value;
  const data = new XMLHttpRequest();
  data.addEventListener('load', prePush);
  data.addEventListener('error', XHRFailure);
  data.open("GET", `https://teamtreehouse.com/${player2}.json`);
  data.send();

  function prePush() {
    const player2obj = JSON.parse(this.responseText);
    const combinedPlayers = semiMegaPush(player1objectInput,player2obj);
    buildDOMStringPlayerProfile(combinedPlayers);
  }
};
function player1XHRSuccess() {
  const player1Obj = JSON.parse(this.responseText);
  playerXHRCall(player1Obj);
}
const getPlayer1Data = () => {
  player1 = document.getElementById("player1-input").value;
  genericXHRCall(player1, player1XHRSuccess);
};
const createEventListenerStartButton = () => {
  buttonFight = document.getElementById("button-fight");
  buttonFight.addEventListener('click', getPlayer1Data);
};

const startUpApplication = () => {
  createEventListenerStartButton();
};
startUpApplication();