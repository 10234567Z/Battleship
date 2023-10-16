import './styles.css';

var startScreen = "" + 
"  <div class=\"container\">" + 
"    <header class=\"fixedHead\">" + 
"      <h1>Battle Ship</h1>" + 
"      <p>Where the real one fights</p>" + 
"    </header>" + 
"    <main>" + 
"      <div class=\"board\"></div>" + 
"      <div class=\"moves\">" +
"           <p>Place the following tiles in the board</p>" +
"           <div class=\"ship5\"  draggable=true ></div>" +
"           <div class=\"ship4\"  draggable=true ></div>" +
"           <div class=\"ship3\"  draggable=true ></div>" +
"           <div class=\"ship2\"  draggable=true ></div>" +
"           <div class=\"ship1\"  draggable=true ></div>" +
"           <h3>OR</h3>" +
"           <div class=\"random\">Randomize</div>" +
"       </div>" + 
"    </main>" + 
"    <footer>&copy; Fudo</footer>" + 
"  </div>" + 
"";

document.querySelector("body").innerHTML = startScreen;

/** Make Grid */

for(let i = 0; i < 10; i++){
    for(let j = 0; j< 10; j++ ){
        let cell = document.createElement('div');
        cell.classList.add(`cell` , `${i}${j}`);
        document.querySelector('.board').append(cell);
    }
}

/** Filling up moves inside block */
for(let i = 1; i <= 5; i++ ){
    let currentShip = document.querySelector(`.ship${i}`);
    for(let j = 1; j <= i; j++){
        let part = document.createElement("div");
        currentShip.append(part);
    }
}