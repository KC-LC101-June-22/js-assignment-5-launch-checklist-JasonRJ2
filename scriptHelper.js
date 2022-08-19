// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.querySelector("div[id=missionTarget]"); 
   let destination = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star} </li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
   missionTarget.innerHTML = destination;
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   }
   if (isNaN(testInput)) {
    return "Not a Number";
   } else {
    return "Is a Number";
   }
};

function changeLaunchStatus(document, ready) {
    let launchStatus = document.querySelector("h2[id=launchStatus");
    if(ready)
    {
        launchStatus.textContent = "Shuttle is Ready for Launch";
        launchStatus.style.color = "rgb(65, 159, 106)";
    } else {
        launchStatus.textContent = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "rgb(199, 37, 78)";
    }
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
   let errorMessage = "All fields are required!";
   let isError = false;
   let isLaunchReady = true;

   if(validateInput(pilot) != "Not a Number") {
    isError = true;
   } else {
    let pilotStatus = document.querySelector("li[id=pilotStatus]");
    pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
   }

   if(validateInput(copilot) != "Not a Number") {
    isError = true;
   } else {
    let copilotStatus = document.querySelector("li[id=copilotStatus]");
    copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;
   }

   let fuelStatus = document.querySelector("li[id=fuelStatus]");
   if(validateInput(fuelLevel) != "Is a Number") {
    isError = true;
   } else if(fuelLevel < 10000) {
    fuelStatus.textContent = "Fuel level too low for launch";
    isLaunchReady = false;
   } else {
    fuelStatus.textContent = "Fuel level high enough for launch";
   }

   let cargoStatus = document.querySelector("li[id=cargoStatus");
   if(validateInput(cargoMass) != "Is a Number") {
    isError = true;
   } else if(cargoMass > 10000) {
    cargoStatus.textContent = "Cargo mass too heavy for launch";
    isLaunchReady = false;
   } else {
    cargoStatus.textContent = "Cargo mass low enough for launch";
   }

   if(isError) {
    alert(errorMessage);
   } else {
    changeLaunchStatus(document, isLaunchReady);
   }

   if(!isError) {
   list.style.visibility = "visible";
   } else {
   list.style.visibility = "hidden";
   }
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json() });
        

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * (planets.length - 0) + 0);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
