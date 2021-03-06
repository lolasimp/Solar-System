const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}


const smallPlanets = (planets, index) => {
    let domString="";
        domString += `<div class="cards" id=${index}>`;
        domString += `<h2 class="planetNames">${planets.name}</h2>`; 
        domString += `<img class="hidden" src="${planets.imageUrl}">`;
        domString += `</div>`;
    return domString;
};

const buildSolarSystem = (planetsArray) => {
    let domString= '';
    planetsArray.forEach((planets) => {
    domString += smallPlanets(planets);
    
    })
    printToDom(domString, 'milky-way');
    getX();
};


//    find image and h2
//    add remove

const imageAppears = (e) => {
    let div = e.target;
    while(div.className !== 'cards'){
        div = div.parentNode;
    }
    div.children[0].className = 'hidden';
    div.children[1].className ='';
};

const hideImage = (e) => {
    let div = e.target;
    while(div.className !== 'cards'){
        div = div.parentNode;
    }
    div.children[0].className = '';
    div.children[1].className ='hidden';
};

const hoverPlanets = () => {
    const addHover = document.getElementsByClassName('cards');
  
    for (let i=0; i < addHover.length; i++) {
        addHover[i].addEventListener("mouseover", imageAppears);
        addHover[i].addEventListener("mouseleave", hideImage);
    }
};


const clickPlanets = () => {
    const card = document.getElementsByClassName('cards');
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', getBigCard);
    }
};

const getX = () => {
    const reset = document.getElementsByClassName('x');
    for (let q = 0; q < reset.length; q++) {
        reset[q].addEventListener('click', reload);
    }
};

const searchPlanets = (planetsArray) => {
    const wordsEntered = document.getElementById('input-word');
        wordsEntered.addEventListener('keypress', (e) => {
            // console.log('this', e);
        if(e.key === 'Enter'){
            let text = wordsEntered.value;
            let results = planetsArray.filter((coolPlanet) => {
                return coolPlanet.name.indexOf(text) >-1;
            })
            return smallPlanets(results);
        }
    })
};

 const bigPlanets = (planets) => {
    let bigString="";
            bigString += `<div class="bigPlanet">`;
            bigString += `<button btn-lg class="x">X</button>`;
            bigString += `<h2 class="planetNames">${planets.name} </h2>`; 
            bigString += `<img src="${planets.imageUrl}">`;
            bigString += `<h3>${planets.description} </h3>`;
            bigString += `<p>${planets.isGasPlanet} <p>`;
            bigString += `<p>${planets.numberOfMoons} Moons<p>`;
            bigString += `<p>Largest Moon: ${planets.nameOfLargestMoon}<p>`;
            bigString += `</div>`;
            printToDom(bigString, 'milky-way');
            getX();
};
    
const getBigCard = (e) => {
    let newRequest = new XMLHttpRequest();
        newRequest.addEventListener('load', onLoad);
        newRequest.addEventListener('error', executeFileError);
        newRequest.open("GET", "planets.json");
        newRequest.send();

    function onLoad() {
        const data = JSON.parse(this.responseText);
        // console.log('This is data', data);
            for(let m = 0; m < data.planets.length; m++){
                if( data.planets[m].name === e.target.previousSibling.innerHTML){
                    bigPlanets(data.planets[m]);
                } 
                // console.log(data.planets[m].name);
            } 
    }
}
    // target particular planet in data to show on page alone
        

const startApplication2 =(successFunction) => {
    let secRequest = new XMLHttpRequest();
    secRequest.addEventListener("load", successFunction);
    secRequest.addEventListener("error", executeFileError);
    secRequest.open("GET", "planets.json");
    secRequest.send();
}

function executeFileOnLoad () {
    const data = JSON.parse(this.responseText);
    buildSolarSystem (data.planets);
    hoverPlanets();
    clickPlanets();
    searchPlanets(data.planets);
}

function executeFileError() {
    console.log("That planet does NOT exist!!");
}

const reload = () => {
    startApplication();
}

const startApplication =() => {
    startApplication2(executeFileOnLoad)
}

startApplication ();
