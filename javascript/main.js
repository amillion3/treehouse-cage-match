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

//pass this function into genericXHRCall
function parseUserProfile() {  //Regular profiles
  const dataJSON = JSON.parse(this.responseText);
  console.log(dataJSON);
  //call buildDomString for player profiles
};
//pass this function into genericXHRCall
const parseWinnerProfile = () => {  //WINNER PROFILE
  const dataJSON = JSON.parse(this.responseText);
  //call buildDomString for WINNER (populate 'winner-box' & display badges)
};

//-------------------XHR Calls and stuff -----------------------//
//will only return a single player at a time!
function XHRFailure() {
  console.log("Something is not quite right.");
}
const genericXHRCall = (username, someRandoFunction) => {
  const data = new XMLHttpRequest();
  data.addEventListener('load', someRandoFunction);
  data.addEventListener('error', XHRFailure);
  data.open("GET", "https://teamtreehouse.com/johnachor.json");
  data.send();
};
//---------------end XHR Calls and stuff -----------------------//
//for testing only
genericXHRCall("andymillion", parseUserProfile);