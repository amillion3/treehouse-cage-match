const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};
//---------------------DOM String Builders ---------------------//
const buildDOMStringPlayerProfile = (inputObject) => {
  //console.log('buildDOMstringplayerprofile', inputObject);
  let divId = "player1";
  if (document.getElementById("player1").childElementCount >= 1) {
    divId = "player2";
  }
  let output = `
              <h2>${inputObject.name}</h2>
              <img src="${inputObject.gravatar_url}" alt="${divId} Profile Photo">
              <h4>${inputObject.points.total}</h4>`;
  printToDom(output, divId);
};
const buildDOMStringWinnerProfile = (inputObject) => {
  //do stuff
};
//-----------------end DOM String Builders ---------------------//

//-------------------XHR Calls and stuff -----------------------//
//make genericXHRCall for player1 vs player2 profiles
function parseUserProfile() {
  const dataJSON = JSON.parse(this.responseText);
  //console.log(dataJSON);
  buildDOMStringPlayerProfile(dataJSON);
  //call buildDomString for player profiles
}
//make genericXHRCall for player1, player2 scores only
function user1Score() {
  const dataJSON = JSON.parse(this.responseText);
  player1Score = dataJSON.points.total;
  const player2 = document.getElementById("player2-input").value;
  const player2Score = genericXHRCall(player2, user2Score);
  console.log(player1Score, "---", player2Score);
  debugger;
}
//make genericXHRCall for player1, player2 scores only
function user2Score() {
  const dataJSON = JSON.parse(this.responseText);
  return dataJSON.points.total;
}
//make genericXHRCall for WINNER profile
function parseWinnerProfile() {
  const dataJSON = JSON.parse(this.responseText);
  buildDOMStringWinnerProfile(dataJSON);
  //call buildDomString for WINNER (populate 'winner-box' & display badges)
}
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
//---------------end XHR Calls and stuff -----------------------//

const compareUserPoints = () => {
  console.log('compare user points this ran');
  const player1 = document.getElementById("player1-input").value;
  console.log('player names',player1, player2);
  genericXHRCall(player1, user1Score);



  // if (player1Score > player1Score) {
  //   console.log('player 1 won');
  // } else if (player1Score < player1Score) {
  //   console.log('player 2 won');
  // }
  // if ( (genericXHRCall(player1, userScore)) < (genericXHRCall(player2, userScore)) ) {
  //   console.log('player 2 wins');
  //   //genericXHRCall(p2, parseWinnerProfile);
  // } else if ( (genericXHRCall(player1, userScore)) > (genericXHRCall(player2, userScore)) ) {
  //   console.log('player 1 wins');
  //   //genericXHRCall(p1, parseWinnerProfile);
  // } else {
  //   //its a tie...
  // }
};

const getDataFromTreehouse = (p1, p2) => {
  genericXHRCall(p1, parseUserProfile);
  genericXHRCall(p2, parseUserProfile);
  compareUserPoints();
};

//make sure input boxes are not empty
const validateUserInputData = (inputPlayer1, inputPlayer2) => {
  if (inputPlayer1.length < 1 || inputPlayer2.length < 1) {
    alert('Both input boxes need to be populated');
  } else {
    getDataFromTreehouse(inputPlayer1, inputPlayer2);
  }
};
const gatherUserInputData = (e) => {
  const player1 = document.getElementById("player1-input").value;
  const player2 = document.getElementById("player2-input").value;
  validateUserInputData(player1, player2);

  //do stuff
};

const createEventListenerStartButton = () => {
  buttonFight = document.getElementById("button-fight");
  buttonFight.addEventListener('click', gatherUserInputData);
};

const startUpApplication = () => {
  createEventListenerStartButton();
};
startUpApplication();

//for testing only
//genericXHRCall("andymillion", parseUserProfile);
//genericXHRCall("andymillion", parseWinnerProfile);