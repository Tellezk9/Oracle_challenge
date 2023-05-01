const encryptButton = document.getElementById("encrypt");
const decryptButton = document.getElementById("decrypt");
const deleteButton = document.getElementById("buttonClear");
const textToProcess = document.getElementById("textToProcess");
const listEmpty = document.getElementById("listEmpty");
const labelError = document.getElementById("labelError");
const cards = document.getElementById("cards");
let hasData = true;
let isDataValid = false;
let dataCards = [];

encryptButton.addEventListener('click', function(event) {
    isDataValid = validateData(textToProcess.value);
    if (isDataValid) {
        message("");
        encryptData(textToProcess.value, dataCards)
            // setDataInArray(textToProcess.value, dataCards);
        changeStyle(true, listEmpty);
        printData(dataCards, cards);
        cleanInput();
    }

})

decryptButton.addEventListener('click', function(event) {
    // changeStyle(false, listEmpty);
    isDataValid = validateData(textToProcess.value);
    if (isDataValid) {
        message("");
        decryptData(textToProcess.value, dataCards);
        changeStyle(true, listEmpty);
        printData(dataCards, cards);
        cleanInput();
    }
})

deleteButton.addEventListener('click', function(event) {
    changeStyle(false, listEmpty);
    dataCards = [];
    // isDataValid = validateData(textToProcess.value);
    // if (isDataValid) {
    //     message("");
    //     decryptData(textToProcess.value, dataCards);
    //     changeStyle(true, listEmpty);
    //     printData(dataCards, cards);
    //     cleanInput();
    // }
})


function changeStyle(hasData, listEmpty) {
    if (hasData) {
        listEmpty.style.display = "none";
        return true;
    }
    listEmpty.style.display = "flex";
}

function validateData(string) {
    let result = true;
    if (string == "") {
        message("El campo no puede estar vacio")
        return false;
    }
    if (string.charCodeAt(0) == 32) {
        message("El campo no puede estar vacio")
        return false;
    }
    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) == 32) {
            continue;
        }
        if (string.charAt(i) < 61 || string.charAt(i) > 122) {
            message("Solo puede ingresar letras minúsculas y sin acentos")
            result = false;
            break;
        }
    }
    return result;
}

function message(message) {
    labelError.innerHTML = message;
}

function cleanInput() {
    textToProcess.value = "";
}

function encryptData(data, dataCards) {
    let result = "";
    for (let i = 0; i < data.length; i++) {
        switch (data[i]) {
            case "a":
                result += "ai";
                break;
            case "e":
                result += "enter";
                break;
            case "i":
                result += "imes";
                break;
            case "o":
                result += "ober";
                break;
            case "u":
                result += "ufat";
                break;
            default:
                result += data[i];
                break;
        }
    }
    setDataInArray(result, dataCards)
}

function decryptData(data, dataCards) {
    let encrypCodes = ["ai", "enter", "imes", "ober", "ufat"];
    "falecedidas por anfrantir asta dasifeo y hibarlo concluedo con axeto"
    let decryptCodes = ["a", "e", "i", "o", "u"];
    let result = data;

    for (let i = 0; i < encrypCodes.length; i++) {
        result = result.replaceAll(encrypCodes[i], decryptCodes[i]);
    }
    setDataInArray(result, dataCards);
}

function setDataInArray(data, dataCards) {
    dataCards.push(data);
}

function printData(dataCards, cards) {
    let cardsToPrint = "";
    for (let i = 0; i < dataCards.length; i++) {
        cardsToPrint += '<div class="card" id="card' + i + '" onclick="copyText(' + i + ')">';
        cardsToPrint += '<input type="hidden" value="' + dataCards[i] + '" id="idCard' + i + '">';
        cardsToPrint += '<label class="labelCard" id="labelCard' + i + '">' + dataCards[i] + '</label>';
        cardsToPrint += '</div>';
    }
    cards.innerHTML = cardsToPrint;
}

function copyText(data) {
    let card = document.getElementById("card" + data);
    let input = document.getElementById("idCard" + data).value;
    let label = document.getElementById("labelCard" + data);
    navigator.clipboard.writeText(input)
    textToProcess.value = input;
}