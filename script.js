
let input = document.getElementById("inputText");
let buttonClose = document.getElementById("buttonClose");
let iconsEdit = document.getElementById("iconsEdit");
let iconsHide = document.getElementById("iconsHide");
let toggle = false;
let note = document.getElementById("noteInput");
let colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#66664D', '#991AFF', '#E666FF', '#A223EE',];
let colorDiv = document.getElementById("colorDiv");
let colorUl = document.getElementById("colorUl").querySelectorAll(".dot");
let li = document.querySelectorAll("ul .dot");
let ulChildren = document.querySelector("#colorUl").children;

let state = [];
let colorsNote = []

function displayColors() {
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
        console.log(arr.indexOf(item));
        for (let i = 0; i < colors.length; i++) {
            if (arr.indexOf(item) === i) {
                input.style.backgroundColor = colors[i];
                title.style.backgroundColor = colors[i];
                note.style.backgroundColor = colors[i];
            }
        }
    })
})


input.onmouseenter = function () {
    document.onclick = function () {
        if (toggle) {
            return;
        }
        title.style.display = "block";
        iconsEdit.style.display = "block";
        buttonClose.style.display = "block";
        iconsHide.style.display = "none";
        input.style.height = 'auto';
        toggle = true;
    }
}

function createContent() {
    let template = document.querySelector("#myTemplate");
    let newTitle = template.content.querySelector("h4");
    let newNoteText = template.content.querySelector("p");
    let contentDiv = template.content.querySelector("div");
    let ul = template.content.querySelector("ul").querySelectorAll(".dot");
    newNoteText.innerHTML = note.value;
    newTitle.innerHTML = title.value;
    const uId = guid();
    contentDiv.id = uId;
    
    let nodesArray = Array.prototype.slice.call(ul)


    let clone = document.importNode(template.content, true);
    document.body.appendChild(clone);

    const newNote = {
         id: uId,
         title: note.value,
         text: title.value,
         color: colors
    }

    contentDiv.style.backgroundColor = newNote.color;
    storeNote(newNote);
    switchColors(newNote.color)
    console.log(colorsNote)
    console.log(state)
    console.log(nodesArray)
    console.log(contentDiv)
    note.value = "";
    title.value = "";

}

function switchColors(color) {
    colorsNote.push(color);
}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function storeNote(note) {
    state.push(note);
}

input.onmouseleave = function () {
    document.onclick = function () {
        title.style.display = "none";
        iconsEdit.style.display = "none";
        buttonClose.style.display = "none";
        iconsHide.style.display = "block";
        input.style.height = "60px";
        toggle = false;

        if (note.value !== "") {
            createContent();
            // div.onmouseover = function() {
            //     icons.style.display = "block";
            //     div.appendChild(icons);
                
            // }

            // div.onmouseout = function() {
            //     icons.style.display = "none";  
            // }
        }
    }
}

buttonClose.addEventListener("click", function () {
    title.style.display = "none";
    iconsEdit.style.display = "none";
    buttonClose.style.display = "none";
    iconsHide.style.display = "block";
    input.style.height = "60px";
})












