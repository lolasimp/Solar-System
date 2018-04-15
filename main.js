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
}




    const bigPlanets = (planets) => {
        let bigString="";
            bigString += `<div class="bigPlanet">`;
            bigString += `<button class="x">X</button>`;
            bigString += `<h2 class="planetNames">${planets.name} </h2>`; 
            bigString += `<img src="${planets.imageUrl}">`;
            bigString += `<h3>${planets.description} </h3>`;
            bigString += `<p>${planets.isGasPlanet} <p>`;
            bigString += `<p>${planets.numberOfMoons}<p>`;
            bigString += `<p${planets.nameOfLargestMoon}<p>`;
            bigString += `</div>`;
            printToDom(bigString, 'milky-way');
    };
    

    

    const getBigCard = (e) => {
        let newRequest = new XMLHttpRequest();
        newRequest.addEventListener('load', onLoad);
        newRequest.addEventListener('error', executeFileError);
        newRequest.open("GET", "planets.json");
        newRequest.send();

        function onLoad() {
            const data = JSON.parse(this.responseText);
            console.log('This is data', data);
            for(let m = 0; m < data.planets.length; m++){
                if( data.planets[m].name === e.target.previousSibling.innerHTML){
                    bigPlanets(data.planets[m]);
                } 
                // console.log(data.planets[m].name);
            }
            // console.log('event', e.target.previousSibling.innerHTML);
            // bigPlanets(data.planets); 
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
    
 
}

function executeFileError() {
    console.log("That planet does NOT exist!!");
}


const startApplication =() => {
    startApplication2(executeFileOnLoad)
    // let myRequest = new XMLHttpRequest();
    // myRequest.addEventListener("load", executeFileOnLoad);
    // myRequest.addEventListener("error", executeFileError);
    // myRequest.open("GET", "planets.json");
    // myRequest.send();
}

startApplication ();
