

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

    next();
} 

const next = async () => {

    outForm.value = "";
    correctText.textContent = "";

    i = Math.floor(Math.random() * polList.length)

    outputElement.textContent = polList[i];
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
        if (wrongText.innerHTML == "")
            wrongText.innerHTML += polList[i] + " - " + typeForm + " (" + deuList[i] + ") "
        else
            wrongText.innerHTML += "<br>" + polList[i] + " - " + typeForm + " (" + deuList[i] + ") ";
    }
}

displayButton.addEventListener('click', next);
