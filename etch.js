function setupGrid(n = 16, size = 600) {    
    // grid div
    let div = document.body.querySelector("div#wrapper");
    if (!div) {
        // outter div
        outDiv = document.createElement("div");
        outDiv.id = "etch";
        document.body.appendChild(outDiv);
        h1 = document.createElement("h1");
        h1.innerText = "Etch-a-Sketch";
        h1.classList.add("text-center");
        outDiv.appendChild(h1);
        div = document.createElement("div");
        div.id = "wrapper";
        div.style.display = "grid";
        outDiv.appendChild(div);              
    }
    // setup 16 : 9 grid
    div.style.width = Math.floor(size * 16 / 9) + "px";
    div.style.height = size + "px";    
    div.style.gridAutoRows = size / n + "px";
    div.style.gridAutoColumns = div.style.width / (n * 16 / 9);
    // fill the grid
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= (n * 16 / 9); j++) {
            let g = document.createElement("div");
            g.style.gridColumn = j;
            g.style.gridRow = i;
            div.appendChild(g);
        }
    }    
}

function generateRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return [r, g, b];
}

function changeColor(event, red, green, blue) {
    if (red == undefined) event.target.style.backgroundColor = `rgb(${rc[0]}, ${rc[1]}, ${rc[2]})`;
    else event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function colorOnMouseover() {
    removeMouseoverEvents();
    rc = generateRandomColor();
    Array.from(document.body.querySelector("div#wrapper").childNodes)
    .forEach((g) => g.addEventListener("mouseover", changeColor));
}

function removeMouseoverEvents() {
    // remove current mouseover
    Array.from(document.body.querySelector("div#wrapper").childNodes)
    .forEach((g) => g.removeEventListener("mouseover", changeColor));
    Array.from(document.body.querySelector("div#wrapper").childNodes)
    .forEach((g) => g.removeEventListener("mouseover", randomColor));
    Array.from(document.body.querySelector("div#wrapper").childNodes)
    .forEach((g) => g.removeEventListener("mouseover", darkenColor));
}

function randomColorOnMouseover() {
    removeMouseoverEvents();
    rc = generateRandomColor();
    Array.from(document.body.querySelector("div#wrapper").childNodes)
    .forEach((g) => g.addEventListener("mouseover", randomColor));
}

function randomColor(e) {    
    changeColor(event, rc[0], rc[1], rc[2]);
}

function darkenColorOnMouseover() {
    removeMouseoverEvents();
    // darken current square
    Array.from(document.body.querySelector("div#wrapper").childNodes)
    .forEach((g) => g.addEventListener("mouseover", darkenColor));
}

function darkenColor(e) {
    let rgb;
    if (e.target.style.backgroundColor == "") rgb = [255, 255, 255];
    else rgb = e.target.style.backgroundColor.slice(4, -1).split(", ");
    changeColor(e, Math.max(0, rgb[0] - 25), Math.max(0, rgb[1] - 25), Math.max(0, rgb[2] - 25));
}

function resetGrid() {
    let grid = document.body.querySelector("div#wrapper");
    while (grid.firstChild) grid.removeChild(grid.firstChild);
}

// setup grid
let outDiv;
setupGrid();

// hold random color
let rc;

// setup hover event
colorOnMouseover();

// buttons div
let buttonsDiv = document.createElement("div");
buttonsDiv.id = "buttons"
outDiv.appendChild(buttonsDiv);

// reset button
let resetButton = document.createElement("button");
resetButton.innerText = "RESET";
buttonsDiv.appendChild(resetButton);
resetButton.addEventListener("click", (e) => {
    resetGrid();
    setupGrid();
    colorOnMouseover();
});

// new grid button
let newButton = document.createElement("button");
newButton.innerHTML = "NEW GRID";
buttonsDiv.appendChild(newButton);
newButton.addEventListener("click", (e) => {
    resetGrid();
    let n = Number(prompt("Enter the size of new grid: ", "16"));
    if (n && typeof n == "number") setupGrid(n, 600);
    else setupGrid();
    colorOnMouseover();
});

// random color button
let randomButton = document.createElement("button");
randomButton.innerText = "NEW COLOR";
buttonsDiv.appendChild(randomButton);
randomButton.addEventListener("click", colorOnMouseover);

// darken color button
let darkenButton = document.createElement("button");
darkenButton.innerText = "DARKEN COLOR";
buttonsDiv.appendChild(darkenButton);
darkenButton.addEventListener("click", darkenColorOnMouseover);

Array.from(document.body.querySelectorAll("button")).forEach((btn) => {
    btn.classList.add("btn-circle");
})