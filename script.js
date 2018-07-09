let input = document.getElementById("inputText");
let buttonClose = document.getElementById("buttonClose");
let iconsEdit = document.getElementById("iconsEdit");
let iconsHide = document.getElementById("iconsHide");
let toggle = false;
let note = document.getElementById("noteInput");
let colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#FFFFFF', '#991AFF', '#E666FF', '#A223EE',];
let colorDiv = document.getElementById("colorDiv");
let colorUl = document.getElementById("colorUl").querySelectorAll(".dot");
let li = document.querySelectorAll("ul .dot");
let ulChildren = document.querySelector("#colorUl").children;
let colorPalette = document.getElementById("colorPalette");

const mainNoteTitleElement = document.getElementById('title');
const mainNoteTextElement = document.getElementById('noteInput');
const mainNoteInputFileElement = document.getElementById("imgFile");

let container = document.getElementById("container");
let template = document.querySelector("#myTemplate");
let newTitle = template.content.querySelector("h4");
let newNoteText = template.content.querySelector("p");
let contentDiv = template.content.querySelector("div");
let button = template.content.querySelector("button");
let img = template.content.querySelector("img");

let selectedColor = null;
let selectedImageSrc = null;
let state = getStoredState() || [];


window.addEventListener('unload', () => {
    storeToLocalStorage(state)
});

function storeToLocalStorage(state) {
    localStorage.setItem("state", JSON.stringify(state));
}

function getStoredState() {
    return JSON.parse(localStorage.getItem("state"));
}

function displayColorPalette() {
    colorDiv.style.display = "block";
    for (let i = 0; i < colors.length; i++) {
        colorUl[i].style.backgroundColor = colors[i];
    }
}


function hideColors() {
    colorDiv.style.display = "none";
}

Array.prototype.forEach.call(li, function (item) {
    item.addEventListener("click", function () {
        const arr = Array.from(ulChildren);
        for (let i = 0; i < colors.length; i++) {
            if (arr.indexOf(item) === i) {
                input.style.backgroundColor = colors[i];
                mainNoteTitleElement.style.backgroundColor = colors[i];
                note.style.backgroundColor = colors[i];
                selectedColor = colors[i];
            }
        }
    })
})


input.onmouseenter = function () {
    document.onclick = function () {
        if (toggle) {
            return;
        }
        showDisplay();
    }
}


input.onmouseleave = function () {
    document.onclick = function () {
        hideDisplay();
        toggle = false;
        input.style.backgroundColor = "#FFFFFF";
        mainNoteTitleElement.style.backgroundColor = "#FFFFFF";
        note.style.backgroundColor = "#FFFFFF";

        if (note.value !== "") {
            storeNewNote();
            clearMainNote();
            rerender();
        }
    }
}

buttonClose.addEventListener("click", function () {
    hideDisplay();
})

function showDisplay() {
    mainNoteTitleElement.style.display = "block";
    iconsEdit.style.display = "block";
    buttonClose.style.display = "block";
    iconsHide.style.display = "none";
    input.style.height = 'auto';
    toggle = true;
    mainNoteInputFileElement.onchange = changeSrc;
}

function hideDisplay() {
    mainNoteTitleElement.style.display = "none";
    iconsEdit.style.display = "none";
    buttonClose.style.display = "none";
    iconsHide.style.display = "block";
    input.style.height = "60px";
}


function storeNewNote() {
    const newNote = {
        id: guid(),
        title: mainNoteTitleElement.value,
        text: mainNoteTextElement.value,
        color: selectedColor,
        imageSrc: selectedImageSrc
    };

    storeNote(newNote);
}

function render() {
    debugger;
    state.map(note => {
        injectIntoDom(note);
    })

    selectedImageSrc = "";
}

render();

function rerender() {
    clearDom();
    render();
}

function clearDom() {
    container.innerHTML = '';
}

function injectIntoDom(note) {
    newNoteText.innerHTML = note.text;
    newTitle.innerHTML = note.title;
    contentDiv.id = note.id;
    contentDiv.style.backgroundColor = note.color;
    button.id = 'btn__' + note.id;
    img.src = note.imageSrc;
    let clone = document.importNode(template.content, true);
    container.appendChild(clone);

    const cross = document.querySelector('#btn__' + note.id);
    cross.addEventListener("click", deleteNote.bind(null, note));
}

function changeSrc() {
    var reader = new FileReader();
    reader.readAsDataURL(mainNoteInputFileElement.files[0]);
    reader.onloadend = function (event) {
        selectedImageSrc = event.target.result;
    }
}


function clearMainNote() {
    note.value = "";
    mainNoteTitleElement.value = "";
}


function deleteNote(note) {
    for (let i = 0; i < state.length; i++) {
        if (state[i] == note) {
            state.splice(i, 1);
        }
    };
    rerender();
}


function storeNote(note) {
    state.push(note);
}


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}





// function createContent() {
//     let template = document.querySelector("#myTemplate");
//     let newTitle = template.content.querySelector("h4");
//     let newNoteText = template.content.querySelector("p");
//     let contentDiv = template.content.querySelector("div");
//     let img = template.content.querySelector("img");
//     let input = document.getElementById("imgFile");
//     let button = template.content.querySelector("button");
//     newNoteText.innerHTML = note.value;
//     newTitle.innerHTML = title.value;
//     const uId = guid();
//     contentDiv.id = uId;
//     contentDiv.style.backgroundColor = selectedColor;
//     button.id = 'btn__' + uId;


//     if (input.value !== "") {
//         var reader = new FileReader();
//         reader.readAsDataURL(input.files[0]);
//         reader.onloadend = function (event) {
//             img.src = event.target.result
//             input.value = "";
//             let clone = document.importNode(template.content, true);
//             document.body.appendChild(clone);
//         }
//     } else {
//         let clone = document.importNode(template.content, true);
//         document.body.appendChild(clone);

//     }

//     const newNote = {
//         id: uId,
//         title: title.value,
//         text: note.value,
//         color: selectedColor
//     }

//     const cross = document.querySelector('#btn__' + uId);

//     storeNote(newNote);
//     cross.addEventListener("click", deleteNote.bind(null, newNote));
//     console.log(cross);
//     clearMainNote();
//     img.value = "";
// }















