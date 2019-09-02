let rowsNumber = 50;
let colsNumber = 200;

var playing_key = false;

var Grid;
var NewGrid;

Grid = new Array(rowsNumber);
NewGrid = new Array(rowsNumber);

var time;
var TimeOfReproduction = 100;



function InitializeGrids() {
    var row = 0;
    while (row < rowsNumber){
        Grid[row] = new Array(colsNumber);
        NewGrid[row] = new Array(colsNumber);
        row++;
    }
}

function UpLoadGrids() {
    var row = 0;
    var col = 0;
    while (row < rowsNumber){
       while (col < colsNumber){
           Grid[row][col] = 0;
           NewGrid[row][col] = 0;
           col++;
       }
        row++;
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
function clearHtml(){
    document.getElementById("grid_сontainer").innerHTML = '';
}

// Start everything
window.onload = initialize();
document.getElementById("rowInput").addEventListener('input', function () {
    if(this.value > 250){
        rowsNumber = 250;
    }else if(this.value < 0){
        rowsNumber = 0;
    }else{
        rowsNumber = this.value;
    }
    Grid = new Array(rowsNumber);
    NewGrid = new Array(rowsNumber);
    clearHtml();
    initialize();
});
document.getElementById("columnInput").addEventListener('input', function () {
    if(this.value > 250){
        colsNumber = 250;
    }else if(this.value < 0){
        colsNumber = 0;
    }else{
        colsNumber = this.value;
    }
    Grid = new Array(rowsNumber);
    NewGrid = new Array(rowsNumber);
    clearHtml();
    initialize();
});