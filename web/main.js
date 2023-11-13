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

let inList = [];
let outList = [];

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

const next = async () => {
    polList = await loadTextFile('pol.txt');
    deuList = await loadTextFile('deu.txt');
    deuNonList = await loadTextFile('deu_non.txt');

    outForm.value = "";
    correctText.textContent = "";
    i++;

    if (polList.length-1 >= i && deuList.length-1 >= i && deuNonList.length-1 >= i) {
        const thirdElement = polList[i];
        outputElement.textContent = thirdElement;
    } else {
        outputElement.textContent = 'Not enough elements in the arrays';
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
        correctText.textContent = "Prawidłowo";
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => next());
    }
    else {
        document.getElementById("correctText").style.color = "red";
        correctText.textContent = "Źle - " + deuList[i];
    }
}

displayButton.addEventListener('click', next);
