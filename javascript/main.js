const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const comparePlayerScores = (playersArray) => {
  p1Score = playersArray[0].points.total;
  p2Score = playersArray[1].points.total;
  if (p1Score < p2Score) {
    //console.log('player 2 wins');
    buildDOMStringWinnerProfile(playersArray[1]);
  } else if (p1Score > p2Score) {
    //console.log('player 1 wins');
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
  //compare user scores
  comparePlayerScores(playersArray);
};
const buildDOMStringWinnerProfile = (winner) => {

};

//-----------------end DOM String Builders ---------------------//

//-------------------XHR Calls and stuff -----------------------//

function XHRFailure() {
  console.log("Something is not quite right.");
}
//will only return a single player at a time!
const genericXHRCall = (username, someRandoFunction) => {
  //console.log(username);
  const data = new XMLHttpRequest();
  data.addEventListener('load', someRandoFunction);
  data.addEventListener('error', XHRFailure);
  data.open("GET", `https://teamtreehouse.com/${username}.json`);
  data.send();
  //console.log(this.responseText);
};

const semiMegaPush = (p1,p2) => {
  let newPlayerArray = [];
  newPlayerArray.push(p1,p2);
  return newPlayerArray;
};

const playerXHRCall = (player1objectInput) => {
  player2 = document.getElementById("player2-input").value;
  const data = new XMLHttpRequest();
  data.addEventListener('load', prePush);
  data.addEventListener('error', XHRFailure);
  data.open("GET", `https://teamtreehouse.com/${player2}.json`);
  data.send();

  function prePush() {
    const player2obj = JSON.parse(this.responseText);
    const combinedPlayers = semiMegaPush(player1objectInput,player2obj);
    console.log("hope this works",combinedPlayers);
    buildDOMStringPlayerProfile(combinedPlayers);
  }
};
//---------------end XHR Calls and stuff -----------------------//

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

//for testing only
//genericXHRCall("andymillion", parseUserProfile);
//genericXHRCall("andymillion", parseWinnerProfile);