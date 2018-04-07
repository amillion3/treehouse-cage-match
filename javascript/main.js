const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};
//---------------------DOM String Builders ---------------------//
const buildDOMStringPlayerProfile = (inputArray) => {
  let output = "";
  for (let i = 0; i < inputArray.length; i++) {
    output += `
            <div id="${inputArray[i].name}">
              <h2>${inputArray[i].name}</h2>
              <img src="${inputArray[i].gravatar_url}">
              <h3 id="">${inputArray[i].points.total}</h3>
            </div>`;
            //might need to refactor this, depending on how bootstrap goes
  }
  printToDom(output, "player-profiles");
};
//-----------------end DOM String Builders ---------------------//

//-------------------XHR Calls and stuff -----------------------//
//make genericXHRCall for player1 vs player2 profiles
function parseUserProfile() {
  const dataJSON = JSON.parse(this.responseText);
  console.log(dataJSON);
  //call buildDomString for player profiles
}
//make genericXHRCall for WINNER profile
function parseWinnerProfile() {
  const dataJSON = JSON.parse(this.responseText);
  console.log(dataJSON);
  //call buildDomString for WINNER (populate 'winner-box' & display badges)
}
function XHRFailure() {
  console.log("Something is not quite right.");
}
//will only return a single player at a time!
const genericXHRCall = (username, someRandoFunction) => {
  console.log(username);
  const data = new XMLHttpRequest();
  data.addEventListener('load', someRandoFunction);
  data.addEventListener('error', XHRFailure);
  data.open("GET", `https://teamtreehouse.com/${username}.json`);
  data.send();
  console.log(this.responseText);
};
//---------------end XHR Calls and stuff -----------------------//

//make sure input boxes are not empty
const validateUserInputData = (inputPlayer1, inputPlayer2) => {
  if (inputPlayer1.length < 1 || inputPlayer2.length < 1) {
    alert('Both input boxes need to be populated');
  } else {
    console.log('validate okay');
    //make xhr calls
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