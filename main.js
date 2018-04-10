const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}


const smallPlanets = (planets, index) => {
    let domString="";
        domString += `<div class="cards" id=${index}>`;
        domString += `<h2 class="planetNames"> ${planets.name} </h2>`; 
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
        card[i].addEventListener('click', ((e) => {
            console.log('click event', e);
            startApplication2();
        }))
    }
}

// const clickPlanets = () => {
//     console.log('Look at this',);
//     const card = document.getElementsByClassName('cards');
//     const allArray = Array.from(card);
//     console.log('Try Again', card);
//     allArray.forEach(cards => {
//         cards.addEventListener("click", (e) => {
//             console.log('click event', e);
//             let position = e.target;
//             while(position.className != 'cards'){
//              }
//             console.log(planetsArray);
//             startApplication2(planetsArray);
//         });
//     });
// };



    const bigPlanets = (planets) => {
        let bigString="";
            bigString += `<div class="bigPlanet">`;
            bigString += `<button class="x">X</button>`;
            bigString += `<h2 class="planetNames"> ${planets.name} </h2>`; 
            bigString += `<img src="${planets.imageUrl}">`;
            bigString += `<h3>${planets.description} </h3>`;
            bigString += `<p>${planets.isGasPlanet} <p>`;
            bigString += `<p>${planets.numberOfMoons}<p>`;
            bigString += `<p${planets.nameOfLargestMoon}<p>`;
            bigString += `</div>`;
            printToDom(bigString, 'milky-way');
    };
    

    function onLoad() {
        const data = JSON.parse(this.responseText);
        console.log('This is data', data);
        bigPlanets(data.planets); 
    }

const startApplication2 =() => {
    let secRequest = new XMLHttpRequest();
    secRequest.addEventListener("load", onLoad);
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
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeFileOnLoad);
    myRequest.addEventListener("error", executeFileError);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApplication ();
