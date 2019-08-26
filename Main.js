var rowsNumber = 50;
var colsNumber = 200;

var playing_key = false;

var Grid = new Array(rowsNumber);
var NewGrid = new Array(rowsNumber);

var time;
var TimeOfReproduction = 100;

function InitializeGrids() {
    for (var row = 0; row < rowsNumber; row++) {
        Grid[row] = new Array(colsNumber);
        NewGrid[row] = new Array(colsNumber);
    }
}

function UpLoadGrids() {
    for (var row = 0; row < rowsNumber; row++){
        for (var col = 0; col < colsNumber; col++){
            Grid[row][col] = 0;
            NewGrid[row][col] = 0;
        }
    }
}

function copyAndResetGrid(){
    for (var row = 0; row < rowsNumber; row++) {
        for (var col = 0; col < colsNumber; col++) {
            Grid[row][col] = NewGrid[row][col];
            NewGrid[row][col] = 0;
        }
    }
}


function initialize() {
    CreateTable();
    InitializeGrids();
    UpLoadGrids();
    SetupButtons();
}

function CreateTable() {
    var gridContainer = document.getElementById('grid_сontainer');
    if (!gridContainer) {

        console.error("Div out of table!");
    }
    var table = document.createElement("table");

    for (var row = 0; row < rowsNumber; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < colsNumber; col++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", row + "_" + col);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler() {
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];

    var classes = this.getAttribute("class");
    if(classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        Grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        Grid[row][col] = 1;
    }

}

function ViewUpdate() {
    for (var row = 0; row < rowsNumber; row++){
        for (var col = 0; col < colsNumber; col++) {
            var cell = document.getElementById(row + "_" + col);
            if (!Grid[row][col]) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function SetupButtons() {
    var startButton = document.getElementById('startButton');
    startButton.onclick = startButtonHandler;
    var clearButton = document.getElementById('clearButton');
    clearButton.onclick = clearButtonHandler;
    var randomButton = document.getElementById("randomButton");
    randomButton.onclick = randomButtonHandler;
}

function randomButtonHandler() {
    if (playing_key) return;
    clearButtonHandler();
    for (var i = 0; i < rowsNumber; i++) {
        for (var j = 0; j < colsNumber; j++) {
            var isLive = Math.round(Math.random());
            if (isLive) {
                var cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                Grid[i][j] = 1;
            }
        }
    }
}


function clearButtonHandler() {
    console.log("Clear the game: stop playing_key, clear the Grid");

    playing_key = false;
    var startButton = document.getElementById('startButton');
    startButton.innerHTML = "Start";
    clearTimeout(time);

    var cellsList = document.getElementsByClassName("live");

    var cells = [];
    for (var celNumber = 0; celNumber < cellsList.length; celNumber++) {
        cells.push(cellsList[celNumber]);
    }


    for (var index = 0; index < cells.length; index++) {
        cells[index].setAttribute("class", "dead");
    }
    UpLoadGrids;
}


function startButtonHandler() {
    if (playing_key) {
        console.log("Pause the game");
        playing_key = false;
        this.innerHTML = "Continue";
        clearTimeout(time);
    } else {
        console.log("Continue the game");
        playing_key = true;
        this.innerHTML = "Pause";
        play();
    }
}


function play() {
    computeNextGen();

    if (playing_key) {
        time = setTimeout(play, TimeOfReproduction);
    }
}

function computeNextGen() {
    for (var i = 0; i < rowsNumber; i++) {
        for (var j = 0; j < colsNumber; j++) {
            applyRules(i, j);
        }
    }


    copyAndResetGrid();

    ViewUpdate();
}

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function applyRules(row, col) {
    var numNeighbors = countNeighbors(row, col);
    if (Grid[row][col] == 1) {
        if (numNeighbors < 2) {
            NewGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            NewGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            NewGrid[row][col] = 0;
        }
    } else if (!Grid[row][col]) {
        if (numNeighbors == 3) {
            NewGrid[row][col] = 1;
        }
    }
}

function countNeighbors(row, col) {
    var count = 0;
    if (row-1 >= 0) {
        if (Grid[row-1][col] == 1) count++;
    }
    if (row-1 >= 0 && col-1 >= 0) {
        if (Grid[row-1][col-1] == 1) count++;
    }
    if (row-1 >= 0 && col+1 < colsNumber) {
        if (Grid[row-1][col+1] == 1) count++;
    }
    if (col-1 >= 0) {
        if (Grid[row][col-1] == 1) count++;
    }
    if (col+1 < colsNumber) {
        if (Grid[row][col+1] == 1) count++;
    }
    if (row+1 < rowsNumber) {
        if (Grid[row+1][col] == 1) count++;
    }
    if (row+1 < rowsNumber && col-1 >= 0) {
        if (Grid[row+1][col-1] == 1) count++;
    }
    if (row+1 < rowsNumber && col+1 < colsNumber) {
        if (Grid[row+1][col+1] == 1) count++;
    }
    return count;
}

// Start everything
window.onload = initialize;