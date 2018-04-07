const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML += domString;
}

const domString = (theArray) => {
    theArray.forEach((planets) => {
        let domString = '';
        domString += `<h1> ${planets.name} </h1>`
        printToDom(domString, "milky-way")
    })
};

const buildSolarSystem = (planetsArray) => {
    let domString= '';
    planetsArray.forEach((planets) => {
        domString += `<div class="cards">`
        domString += `<h2 class="planetNames"> ${planets.name} </h2>`; 
        domString += `<img class="hidden" src="${planets.imageUrl}">`;
        domString += `</div>`;
    
    })
    printToDom(domString, 'milky-container');
}

//    find image and h2
//    add remove

// const hoverPlanetsArray = (hoverPlanets);
// hoverPlanetsArray.forEach(e => {
//     e.addEventListener('mouseenter', imageAppears);
//     e.addEventListener('mouseleave', hideImage);
// })

// const hoverPlanets = (event) => {
//     const addHover = document.getElementsByClassName('cards');
  
//     for (let i=0; i < addHover.length; i++) {
//         // console.log(addHover[i]);
//         addHover[i].addEventListener("mouseenter", imageAppears);
//         addHover[i].addEventListener("mouseleave", hideImage);
//     }
// };

const hoverEventListener = () => {
    const planetName = document.getElementsByClassName('cards');
    for (let i=0; i<planetName.length; i++) {
        planetName[i].addEventListener('mouseenter', imageAppears);
    }
}

const hideEventListener = () => {
    const planetName = document.getElementsByClassName('cards');
    for (let q=0; q<planetName.length; q++) {
        planetName[q].addEventListener('mouseleave', hideImage);
    }
}
// const showEventListeners = () => {
//     const planetPic = document.getElementsByClassName('cards');
//     for (let m=0; m<planetPic.length; m++) {
//         planetPic[m].addEventListener('mouseout', (e) => {
//             if(e.tareget.className === 'planetPic'){
//                 imageAppears(e);
//             }
//         });
//     };
// };

imageAppears = (e) => {
    e.target.parentNode.children[0].classList.add('hidden');
    e.target.parentNode.children[1].classList.remove('hidden');
}

hideImage = (e) => {
    e.target.parentNode.children[0].classList.remove('hidden');
    e.target.parentNode.children[1].classList.add('hidden');
}



// const clickPlanet = () => {
// console.log("clickPlanets", e.target);
// let m = e.target;
// let child = m.firstElementChild;
// let childName = child.innerHTML;
// console.log('Look', childName);
// }

// const buildPlanet = (planets) => {
// let domString = '';
//     domString += `<div class="single-planet">`;
//     domString += `<h2 class="planetName> ${planets.name} </h2>`; 
//     domString += `<img src="${planets.imageUrl}">`;
//     domString += `<p>${planets.descriptions} </p>`;
//     domString += `<p>${planets.isGasPlanet} <p>`;
//     domString += `<p>${planets.numberOfMoons}<p>`;
//     domString += `<p${planets.nameOfLargestMoon}<p>`;
//     domString += `</div>`;
//     });
//     printToDom(domString, 'milky-way');
// }

// const startApplication2 =() => {
//     let Request = new XMLHttpRequest();
//     Request.addEventListener("load", executeFileOnLoad);
//     Request.addEventListener("error", executeFileError);
//     Request.open("GET", "planets.json");
//     Request.send();
// }

function executeFileOnLoad () {
    const data = JSON.parse(this.responseText);
    buildSolarSystem (data.planets);
    hoverEventListener();
    hideEventListener();
}


function executeFileError() {
    console.log("That planet does NOT exist!!");
}


const startApplication =() => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeFileOnLoad);
    myRequest.addEventListener("error", executeFileError);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApplication ();