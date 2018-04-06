const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

//buildDOMStringPlayerProfile() will create the dynamic HTML for profiles.
//This will be called twice, using a for or .forEach loop (once for each player)

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