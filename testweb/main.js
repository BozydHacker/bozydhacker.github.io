// function gettext(){
//     fetch('in.txt')
//     .then(response => response.text())
//     .then(text => console.log(text))
// }

// let i = -1;

// function gettext() {
//     fetch('in.txt')
//     .then(response => response.text())
//     .then(data => {
//       const inLines = data.split('\n');
//       const inList = inLines.map(line => line.replace('\r', '').trim()).filter(line => line !== '');
//     });
//     fetch('out.txt')
//     .then(response => response.text())
//     .then(data => {
//       const outLines = data.split('\n');
//       const outList = outLines.map(line => line.replace('\r', '').trim()).filter(line => line !== '');
//     });
// }

// function check() {
//     let outForm = document.getElementById("outText").innerHTML.value;
//     if (outForm == data.outList[i]) {
//         document.getElementById("correctText").style.color = green;
//         correctText.innerHTML = "Prawidłowo";
//     }
//     else {
//         document.getElementById("correctText").style.color = red;
//         correctText.innerHTML = "Źle";
//     }
// }

// function next() {
//     i++;
//     let inForm = document.getElementById("inText");
//     inForm.innerHTML = data.inList[i];
// }

let i = -1;

let polList = [];
let deuList = [];
let deuNonList = [];

let answerList = []
let wrongList = [];

const displayButton = document.getElementById('btn');
const outputElement = document.getElementById('displayText');
const outForm = document.getElementById("inputTranslated");

const loadTextFile = async (file) => {
  try {
    const response = await fetch(file);
    const data = await response.text();
    const lines = data.split('\n');
    const arrayList = lines.map((line) => line.replace('\r', '').trim()).filter((line) => line !== '');
    return arrayList;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const load = async () => {
    polList = await loadTextFile('pol.txt');
    deuList = await loadTextFile('deu.txt');
    deuNonList = await loadTextFile('deu_non.txt');

    if (document.getElementById("random").checked){
        let random = .5 - Math.random();
        polList.sort( () => random);
        deuList.sort( () => random);
        deuNonList.sort( () => random);
    }

    next();
} 

const back = async () => {
    if (i > 0)
        i--;
    if (i >= answerList.length || answerList[i] == undefined)
        outForm.value = "";
    else
        outForm.value = answerList[i];
    correctText.textContent = "";
    outputElement.textContent = polList[i];
};

const next = async () => {
    if (i >= answerList.length)
        answerList.push("");
    answerList[i] = outForm.value;

    outForm.value = "";
    correctText.textContent = "";
    i++;

    if (polList.length-1 >= i && deuList.length-1 >= i && deuNonList.length-1 >= i) {
        outputElement.textContent = polList[i];
    }
    else {
        let wrongText = document.getElementById('wrongText');
        wrongText.innerHTML = "";
        outputElement.textContent = polList[i];
        i = -1;
        for (let j = wrongList.length-1; j > -1; j--) {
            if (`${wrongList[j]}`.slice(-5, -1) == `${wrongList[j+1]}`.slice(-5, -1))
                return;
            if (wrongList.length < 1)
                return;
            if (wrongText.innerHTML == "")
                wrongText.innerHTML += wrongList[j]
            else
                wrongText.innerHTML += "<br>" + wrongList[j];
        }
    }
};

function enterCheck(ele) {
    if (event.key === 'Enter') {
        check();
    }

    if (event.code === 'ShiftRight') {
        next();
    }
}

function check() {
    let typeForm = document.getElementById("inputTranslated").value;

    if (typeForm == deuList[i] || typeForm == deuNonList[i]) {
        document.getElementById("correctText").style.color = "green";
        correctText.textContent = "Prawidłowo - " + deuList[i];
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => next());
    }
    else {
        document.getElementById("correctText").style.color = "red";
        correctText.textContent = "Źle - " + deuList[i];
        wrongList.push(polList[i] + " - " + typeForm + " (" + deuList[i] + ") ");
    }
}

displayButton.addEventListener('click', next);
