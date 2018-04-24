function setupCSSGrid(n = 16, size = 1000) {
    // outer div
    let div = document.body.querySelector("div#wrapper");
    if (!div) {
        div = document.createElement("div");
        div.id = "wrapper";
        div.style.display = "grid";        
        div.style.border = "1px solid black";
        document.body.appendChild(div);
    }
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.gridAutoRows = size / n + "px";
    div.style.gridAutoColumns = size / n + "px";

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            // fill the line
            let g = document.createElement("div");
            g.style.gridColumn = j;
            g.style.gridRow = i;
            g.style.border = "1px solid black";
            div.appendChild(g);
        }
    }    
}

function changeColor(e, r, g, b, a) {
    e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function hover() {
    Array.from(document.body.querySelector("div#wrapper").childNodes)
    .forEach((g) => g.addEventListener("mouseover", (e) => {
        changeColor(e, 100, 0, 0, 1);
    }));
}

function reset() {
    let grid = document.body.querySelector("div#wrapper");
    while (grid.firstChild) grid.removeChild(grid.firstChild);
}

// reset button
let resetButton = document.createElement("button");
resetButton.innerText = "RESET";
document.body.appendChild(resetButton);
resetButton.addEventListener("click", (e) => {
    reset();
    setupCSSGrid();
    hover();
});

// new grid button
let newButton = document.createElement("button");
newButton.innerHTML = "NEW GRID";
document.body.appendChild(newButton);
newButton.addEventListener("click", (e) => {
    reset();
    let size = Number(prompt("Enter the size of new grid: ", "16"));
    if (size && typeof size == "number") setupCSSGrid(size, 1000);
    else setupCSSGrid();
    hover();
});

// random color


// setup grid
setupCSSGrid(16, 1000);

// setup hover event
hover();
