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
        launchStatus.innerText = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    } else {
        launchStatus.innerText = "Shuttle Not Ready For Launch!";
        launchStatus.style.color = "red";
    }
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
   let errorMessage = "All feilds are required!";
   let isError = false;
   let isLaunchReady = true;

   if(validateInput(pilot) != "Not a Number") {
    isError = true;
   } else {
    let pilotStatus = document.querySelector("li[id=pilotStatus]");
    pilotStatus.innerText = `Pilot ${pilot} is ready for launch`;
   }

   if(validateInput(copilot) != "Not a Number") {
    isError = true;
   } else {
    let copilotStatus = document.querySelector("li[id=copilotStatus]");
    copilotStatus.innerText = `Co-pilot ${copilot} is ready for launch`;
   }

   let fuelStatus = document.querySelector("li[id=fuelStatus]");
   if(validateInput(fuelLevel) != "Is a Number") {
    isError = true;
   } else if(fuelLevel < 10000) {
    fuelStatus.innerText = "Fuel level is too low for launch";
    isLaunchReady = false;
   }

   let cargoStatus = document.querySelector("li[id=cargoStatus");
   if(validateInput(cargoMass) != "Is a Number") {
    isError = true;
   } else if(cargoMass > 10000) {
    cargoStatus.innerText = "Cargo mass too much for launch";
    isLaunchReady = false;
   }

   if(isError) {
    alert(errorMessage);
   } else {
    changeLaunchStatus(document, isLaunchReady);
   }

   if(!isLaunchReady && !isError) {
   document.getElementById("faultyItems").style.visibility = "visible";
   } else {
   document.getElementById("faultyItems").style.visibility = "hidden";
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
    console.log(planets);
    console.log(index);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
