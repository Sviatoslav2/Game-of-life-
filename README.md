# Game-of-life-
Реалізація Game-of-life на чистому js та HTML
Main.js - головний код
index HTML
styleLifeGame.css
Перший етап
InitializeGrids() --> ініціалізує порожні списки Grid(дошки), та наступної дошки NewGrid.
UpLoadGrids() --> присвоює значення 0 клітинкам.
copyAndResetGrid() --> копіює значення градки та перезавантажує(встановлює в 0) нову градку.
CreateTable()  --> створює поле, створюючи елементи з індексом "tr".
cellClickHandler() --> встановлює 0 або 1 в клітинку.
ViewUpdate() --> змінює вигляд.
SetupButtons() --> встановлює значення кнопок, для пізнішої обробки.
randomButtonHandler(), clearButtonHandler(), startButtonHandler() обробка відповідних батонів.
countNeighbors(row, col) -->  перелічинння сусідів.
applyRules(row, col) --> логіка будь якої (row, col) клітинки.
computeNextGen() --> логіка кожного наступного  ходу(для кожної клітинки applyRules(row, col)).
Другий етап
Реалізація вище перечислених функцій, робоча версія гри.
Третій етап.
Реалізувати зміну поля гравцем
Зміну поля реалізовано

document.getElementById("columnInput").addEventListener('input', function ()...
document.getElementById("rowInput").addEventListener('input', function ()
