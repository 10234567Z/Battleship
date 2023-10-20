/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/attack.js":
/*!***********************!*\
  !*** ./src/attack.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ attackOther)
/* harmony export */ });
/* harmony import */ var _updateUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateUI */ "./src/updateUI.js");

function attackOther(human, computer, cell) {
  var row = parseInt(cell.classList[1].slice(4, 5));
  var col = parseInt(cell.classList[1].slice(5));
  if (computer.board[row][col] == 0 || computer.board[row][col] == 1) {
    human.attack(row, col, computer);
    computer.aiAttack(human);
    if (document.querySelector(".humanB") !== null) {
      (0,_updateUI__WEBPACK_IMPORTED_MODULE_0__["default"])(human.board, computer.board);
    }
  }
}

/***/ }),

/***/ "./src/battleship.js":
/*!***************************!*\
  !*** ./src/battleship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(shipLength) {
  var ships = {
    length: shipLength,
    gotHit: 0,
    sunk: false,
    hit: function hit() {
      this.gotHit++;
    },
    isSunk: function isSunk() {
      this.length === this.gotHit ? this.sunk = true : this.sunk = false;
    }
  };
  return {
    ships: ships
  };
}

/***/ }),

/***/ "./src/gameStart.js":
/*!**************************!*\
  !*** ./src/gameStart.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ makeUI)
/* harmony export */ });
/* harmony import */ var postcss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! postcss */ "./node_modules/postcss/lib/postcss.mjs");
/* harmony import */ var _randomizeBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomizeBoard */ "./src/randomizeBoard.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
/* harmony import */ var _mainGame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mainGame */ "./src/mainGame.js");






var startScreen = "" + "  <div class=\"container\">" + "    <header class=\"fixedHead\">" + "      <h1>Battle Ship</h1>" + "      <p>Where the real one fights</p>" + "    </header>" + "        <div class=\"board\"></div>" + "    <main>" + "      <div class=\"control\">" + "      <div class=\"nameControl\">" + "        <p class=\"inputHead\">Type your Name</p> <br>" + "        <input type=\"text\" maxlength=\"12\" minlength=\"1\">" + "        <p class=\"error\"></p>" + "      </div>" + "      <div class=\"moves\">" + "           <p>Hold the ship from first tile and drag it (only for pc users)</p>" + "           <div class=\"ship s5\"  draggable=true ></div>" + "           <div class=\"ship s4\"  draggable=true ></div>" + "           <div class=\"ship s3\"  draggable=true ></div>" + "           <div class=\"ship s2\"  draggable=true ></div>" + "           <div class=\"ship s1\"  draggable=true ></div>" + "       </div>" + "           <h3>OR</h3>" + "       <div class=\"random\">Randomize</div>" + "       <div class=\"reset\">Reset</div>" + "      <div> " + "    </main>" + "    <footer><a href=\"https://github.com/10234567Z\"><strong>&copy; Fudo</strong></a></footer>" + "  </div>" + "";
function makeUI() {
  localStorage.clear();
  var startCoords = [];
  document.querySelector("body").innerHTML = startScreen;

  /** Make Grid */

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = document.createElement('div');
      cell.classList.add("cell", "c".concat(i).concat(j));
      cell.setAttribute("style", "background-color: white;");
      document.querySelector('.board').append(cell);
    }
  }

  /** Filling up moves inside block */
  for (var _i = 1; _i <= 5; _i++) {
    var currentShip = document.querySelector(".s".concat(_i));
    for (var _j = 1; _j <= _i; _j++) {
      var part = document.createElement("div");
      currentShip.append(part);
    }
  }

  /** Name Validation */
  document.querySelector('input').addEventListener('blur', function (e) {
    if (e.target.value.trim() === '') {
      document.querySelector('.error').innerHTML = "No empty names allowed!";
      document.querySelector('.error').style.boxShadow = "-1px 1px 15px 7px rgba(255,0,0,0.09)";
      e.target.style.borderColor = "red";
    } else {
      document.querySelector('.error').innerHTML = "";
      document.querySelector('.error').style.boxShadow = "none";
      e.target.style.borderColor = "black";
    }
  });

  /** Randomize placement */
  document.querySelector('.random').addEventListener('click', function (e) {
    if (document.querySelector('input').value.trim() !== '') {
      (0,_randomizeBoard__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelector('input').value.trim());
      localStorage.clear();
    } else {
      document.querySelector('.error').innerHTML = "No empty names allowed!";
      document.querySelector('.error').style.boxShadow = "-1px 1px 15px 7px rgba(255,0,0,0.09)";
      document.querySelector('input').style.borderColor = "red";
    }
  });

  /** Drag and drop placement */
  document.querySelectorAll('.ship').forEach(function (ship) {
    ship.addEventListener('dragstart', function (e) {
      localStorage.setItem("currentShip", JSON.stringify({
        "class": ship.classList[0],
        size: parseInt(ship.classList[1].replace("s", ''))
      }));
    });
  });
  document.querySelectorAll('.cell').forEach(function (cell) {
    cell.addEventListener('click', function (e) {
      if (startCoords.includes(cell.classList[1].replace("c", ''))) {
        var isSafe = false;
        var _currentShip;
        for (var _i2 = 1; _i2 <= 5; _i2++) {
          if (localStorage.getItem("ship".concat(_i2)) !== null && JSON.parse(localStorage.getItem("ship".concat(_i2))).coord == cell.classList[1].replace("c", '')) {
            _currentShip = _i2;
            break;
          }
        }
        if (JSON.parse(localStorage.getItem("ship".concat(_currentShip))).vertical === false) {
          for (var _i3 = 1; _i3 < _currentShip; _i3++) {
            if (document.querySelector(".c".concat(parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + _i3).concat(cell.classList[1].replace("c", '').slice(1))) !== null && document.querySelector(".c".concat(parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + _i3).concat(cell.classList[1].replace("c", '').slice(1))).style.backgroundColor === "white") {
              isSafe = true;
            } else {
              isSafe = false;
              break;
            }
          }
        } else {
          for (var _i4 = 1; _i4 < _currentShip; _i4++) {
            if (document.querySelector(".c".concat(cell.classList[1].replace("c", '').slice(0, 1)).concat(parseInt(cell.classList[1].replace("c", '').slice(1)) + _i4)) !== null && document.querySelector(".c".concat(cell.classList[1].replace("c", '').slice(0, 1)).concat(parseInt(cell.classList[1].replace("c", '').slice(1)) + _i4)).style.backgroundColor === "white") {
              isSafe = true;
            } else {
              isSafe = false;
            }
          }
        }
        if (isSafe) {
          for (var _i5 = 1; _i5 < _currentShip; _i5++) {
            {
              if (JSON.parse(localStorage.getItem("ship".concat(_currentShip))).vertical === false) {
                document.querySelector(".c".concat(cell.classList[1].replace("c", '').slice(0, 1)).concat(parseInt(cell.classList[1].replace("c", '').slice(1)) + _i5)).style.backgroundColor = 'white';
                document.querySelector(".c".concat(parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + _i5).concat(cell.classList[1].replace("c", '').slice(1))).style.backgroundColor = 'red';
                if (_i5 === _currentShip - 1) {
                  var data = JSON.parse(localStorage.getItem("ship".concat(_currentShip)));
                  data.vertical = true;
                  localStorage.setItem("ship".concat(_currentShip), JSON.stringify(data));
                }
                ;
              } else {
                document.querySelector(".c".concat(cell.classList[1].replace("c", '').slice(0, 1)).concat(parseInt(cell.classList[1].replace("c", '').slice(1)) + _i5)).style.backgroundColor = 'red';
                document.querySelector(".c".concat(parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + _i5).concat(cell.classList[1].replace("c", '').slice(1))).style.backgroundColor = 'white';
                if (_i5 === _currentShip - 1) {
                  var _data = JSON.parse(localStorage.getItem("ship".concat(_currentShip)));
                  _data.vertical = false;
                  localStorage.setItem("ship".concat(_currentShip), JSON.stringify(_data));
                }
                ;
              }
            }
          }
        }
      }
    });
    cell.addEventListener('dragover', function (e) {
      e.preventDefault(); // Allow drop
    });

    cell.addEventListener('dragenter', function (e) {
      var data = JSON.parse(localStorage.getItem("currentShip"));
      for (var _i6 = 0; _i6 < data.size; _i6++) {
        var cellIndex = cell.classList[1].replace("c", '').slice(1);
        var maxIndex = parseInt(cellIndex) + (data.size - 1);
        if (document.querySelector(".c".concat(cell.classList[1].slice(1, 2)).concat(maxIndex.toString())) !== null && cell.style.backgroundColor !== 'red') {
          cell.style.backgroundColor = 'gray';
        }
      }
    });
    cell.addEventListener('dragleave', function (e) {
      var data = JSON.parse(localStorage.getItem("currentShip"));
      for (var _i7 = 0; _i7 < data.size; _i7++) {
        var cellIndex = cell.classList[1].replace("c", '').slice(1);
        var maxIndex = parseInt(cellIndex) + (data.size - 1);
        if (document.querySelector(".c".concat(cell.classList[1].slice(1, 2)).concat(maxIndex.toString())) !== null && cell.style.backgroundColor !== 'red') {
          cell.style.backgroundColor = 'white';
        }
      }
    });
    cell.addEventListener('drop', function (e) {
      e.preventDefault();
      var data = JSON.parse(localStorage.getItem("currentShip"));
      var isDropped = false;
      var isSafe = false;
      var cellIndex = cell.classList[1].replace("c", '').slice(1);
      var maxIndex = parseInt(cellIndex) + (data.size - 1);
      if (data.size == 1) {
        isSafe = true;
      }
      for (var _i8 = 1; _i8 < data.size; _i8++) {
        if (document.querySelector(".c".concat(cell.classList[1].replace("c", '').slice(0, 1)).concat(parseInt(cell.classList[1].replace("c", '').slice(1)) + _i8)) !== null && data.size == 1 || document.querySelector(".c".concat(cell.classList[1].replace("c", '').slice(0, 1)).concat(parseInt(cell.classList[1].replace("c", '').slice(1)) + _i8)).style.backgroundColor === "white") {
          isSafe = true;
        } else {
          cell.style.backgroundColor = 'white';
          isSafe = false;
          break;
        }
      }
      for (var _i9 = 0; _i9 < data.size; _i9++) {
        if (document.querySelector(".c".concat(cell.classList[1].slice(1, 2)).concat(maxIndex.toString())) !== null && isSafe) {
          if (_i9 == 0) {
            startCoords.push(cell.classList[1].replace("c", ''));
            localStorage.setItem("ship".concat(data.size), JSON.stringify({
              coord: startCoords[startCoords.length - 1],
              vertical: false
            }));
          }
          var nextCellIndex = parseInt(cellIndex) + _i9;
          var cellToFill = document.querySelector(".c".concat(cell.classList[1].slice(1, 2)).concat(nextCellIndex.toString()));
          cellToFill.style.backgroundColor = 'red';
          isDropped = true;
        }
      }
      if (isDropped) {
        document.querySelector(".s".concat(data.size)).remove();
      }
      if (document.querySelector('.ship') === null) {
        document.querySelector('.moves').innerHTML = "\n                <div class=\"confirm\">Confirm</div>\n                ";
        document.querySelector('.confirm').addEventListener('click', function (e) {
          if (document.querySelector('input').value.trim() !== '') {
            var human = new _player__WEBPACK_IMPORTED_MODULE_3__["default"](document.querySelector('input').value.trim());
            for (var _i10 = 1; _i10 <= 5; _i10++) {
              var shipROWCOORD = parseInt(JSON.parse(localStorage.getItem("ship".concat(_i10))).coord.slice(0, 1));
              var shipCOLCOORD = parseInt(JSON.parse(localStorage.getItem("ship".concat(_i10))).coord.slice(1));
              var isVertical = JSON.parse(localStorage.getItem("ship".concat(_i10))).vertical;
              var selectedShip = new _battleship__WEBPACK_IMPORTED_MODULE_4__["default"](_i10);
              console.log(JSON.parse(localStorage.getItem("ship".concat(_i10))));
              human.boardShip(shipROWCOORD, shipCOLCOORD, selectedShip, isVertical);
            }
            var computer = new _player__WEBPACK_IMPORTED_MODULE_3__["default"]('Computer', true);
            computer.aiBoardShip();
            localStorage.clear();
            (0,_mainGame__WEBPACK_IMPORTED_MODULE_5__["default"])(human, computer);
          } else {
            document.querySelector('.error').innerHTML = "No empty names allowed!";
            document.querySelector('.error').style.boxShadow = "-1px 1px 15px 7px rgba(255,0,0,0.09)";
            document.querySelector('input').style.borderColor = "red";
          }
        });
      }
    });
  });
  document.querySelector('.reset').addEventListener('click', function () {
    localStorage.clear();
    makeUI();
  });
}
makeUI();

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _gameStart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameStart */ "./src/gameStart.js");

function GameBoard() {
  var board = new Array(10).fill(0).map(function () {
    return new Array(10).fill(0);
  });

  /** public function to return board */
  var getBoard = function getBoard() {
    return board;
  };
  var shipsBoarded = [];

  /** Place ship vertically on board , and call backtracking if ship already exists on the path */
  var verticalPlace = function verticalPlace(shipLength, row, col, ship) {
    var tempBackTrack;
    var ending = 0;
    var coords = [];
    for (var i = 0; i < shipLength; i++) {
      if (board[row + i][col] === 0) {
        board[row + i][col] = 1;
        ending++;
        coords.push([row + i, col]);
      } else {
        tempBackTrack = i - 1;
        backTrackVertical(tempBackTrack, row, col);
        break;
      }
    }
    if (ending === shipLength && coords.length === shipLength) {
      shipsBoarded.push({
        ship: ship.ships,
        coordinates: coords
      });
    }
  };

  /** Place ship horizontally on board , and call backtracking if ship already exists on the path */
  var horizontalPlace = function horizontalPlace(shipLength, row, col, ship) {
    var tempBackTrack;
    var ending = 0;
    var coords = [];
    for (var i = 0; i < shipLength; i++) {
      if (board[row][col + i] === 0) {
        board[row][col + i] = 1;
        ending++;
        coords.push([row, col + i]);
      } else {
        tempBackTrack = i - 1;
        backTrackHorizontal(tempBackTrack, row, col);
        break;
      }
    }
    if (ending === shipLength && coords.length === shipLength) {
      shipsBoarded.push({
        ship: ship.ships,
        coordinates: coords
      });
    }
  };

  /** Checks if the position is valid or not and then based on vertical parameter value , call the suitable function to place it */
  var PlaceShip = function PlaceShip(row, col, ship) {
    var vertical = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (board[row] !== undefined && board[row][col] !== undefined) {
      if (vertical && board[row + (ship.ships.length - 1)] !== undefined) {
        verticalPlace(ship.ships.length, row, col, ship);
      } else if (!vertical && board[row][col + (ship.ships.length - 1)] !== undefined) {
        horizontalPlace(ship.ships.length, row, col, ship);
      }
    }
  };

  /**
   * both of the backTrack down here , takes the index value from where afterward another ship was there then start backtracking
   * until index is 0 and board is reset to what its previous state was
   */
  var backTrackVertical = function backTrackVertical(index, row, col) {
    for (var i = index; i >= 0; i--) {
      board[row + i][col] = 0;
    }
  };
  var backTrackHorizontal = function backTrackHorizontal(index, row, col) {
    for (var i = index; i >= 0; i--) {
      board[row][col + i] = 0;
    }
  };
  var recieveAttack = function recieveAttack(row, col, enemyBoard) {
    /** Check if its a valid coordinate to hit and not being hit before */
    if (board[row] !== undefined && board[row][col] !== undefined && board[row][col] !== 'hit') {
      if (board[row][col] === 1) {
        board[row][col] = 'hit';
        var hitShip = shipsBoarded.filter(function (ship) {
          return ship.coordinates.some(function (coord) {
            return coord[0] === row && coord[1] === col;
          });
        });
        hitShip[0].ship.hit();
        hitShip[0].ship.isSunk();
        updateGame(hitShip[0].ship);
      } else if (board[row][col] === 0) {
        board[row][col] = 'miss';
      }
    }
    return endGame(enemyBoard);
  };

  /** Update the boarded ships */
  var updateGame = function updateGame(ship) {
    if (ship.sunk) {
      var index = shipsBoarded.findIndex(function (s) {
        return ship === s.ship;
      });
      shipsBoarded.splice(index, 1);
    }
  };

  /** End game if gameboard's all boarded ships are down */
  var endGame = function endGame(enemyBoard) {
    if (shipsBoarded.length === 0) {
      var name = "You";
      if (enemyBoard.name !== "Computer") {
        name = "Computer";
      }
      document.querySelector('.container').innerHTML = "\n            <h1 class=\"announcement\">".concat(name, " won against ").concat(enemyBoard.name, "</h1>\n            <div class=\"playAgain\">Play Again</div>\n            ");
      document.querySelector('.playAgain').addEventListener('click', function () {
        (0,_gameStart__WEBPACK_IMPORTED_MODULE_0__["default"])();
      });
    }
    return "Still ongoing";
  };
  return {
    PlaceShip: PlaceShip,
    getBoard: getBoard,
    recieveAttack: recieveAttack,
    shipsBoarded: shipsBoarded
  };
}

/***/ }),

/***/ "./src/mainGame.js":
/*!*************************!*\
  !*** ./src/mainGame.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameStart)
/* harmony export */ });
/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attack */ "./src/attack.js");

var startScreen = "" + "  <div class=\"container\">" + "    <header class=\"fixedHead\">" + "      <h1>Battle Ship</h1>" + "      <p>Where the real one fights</p>" + "    </header>" + "      <p>You</p>" + "      <div class=\"humanB board\"></div>" + "      <p>Opponent</p>" + "      <div class=\"AIB board\"></div>" + "    <footer><a href=\"https://github.com/10234567Z\"><strong>&copy; Fudo</strong></a></footer>" + "  </div>" + "";
function gameStart(human, computer) {
  document.querySelector("body").innerHTML = startScreen;

  /** Make Grid */
  var _loop = function _loop(i) {
    var _loop2 = function _loop2(_j) {
      document.querySelectorAll('.board').forEach(function (board) {
        var cell = document.createElement('div');
        cell.classList.add("cell", "cell".concat(i).concat(_j));
        cell.setAttribute("style", "background-color: white;");
        board.append(cell);
      });
    };
    for (var _j = 0; _j < 10; _j++) {
      _loop2(_j);
    }
  };
  for (var i = 0; i < 10; i++) {
    _loop(i);
  }
  var tempCoords = human.gameBoardFact.shipsBoarded.map(function (ship) {
    return ship.coordinates;
  });
  var shipCoords = [];
  for (var _i = 0; _i < tempCoords.length; _i++) {
    for (var j = 0; j <= _i; j++) {
      shipCoords.push(tempCoords[_i][j]);
    }
  }
  var humanB = document.querySelector(".humanB");
  for (var _i2 = 0; _i2 < 15; _i2++) {
    humanB.querySelector(".cell".concat(shipCoords[_i2][0]).concat(shipCoords[_i2][1])).style.backgroundColor = "red";
  }
  document.querySelector(".AIB").childNodes.forEach(function (cell) {
    cell.addEventListener('click', function (e) {
      (0,_attack__WEBPACK_IMPORTED_MODULE_0__["default"])(human, computer, cell);
    });
  });
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


function Player(playerName) {
  var isAI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var name = playerName;
  var gameBoardFact = new _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
  var board = gameBoardFact.getBoard();
  var boardShip = function boardShip(row, col, ship) {
    var vertical = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (gameBoardFact.shipsBoarded.length !== 5) {
      gameBoardFact.PlaceShip(row, col, ship, vertical);
    }
  };
  var aiBoardShip = function aiBoardShip() {
    if (isAI) {
      while (gameBoardFact.shipsBoarded.length < 5) {
        var ship = new _battleship__WEBPACK_IMPORTED_MODULE_0__["default"](gameBoardFact.shipsBoarded.length + 1);
        var vertical = Math.random() < 0.5;
        var isValidSpot = false;
        while (!isValidSpot) {
          var row = Math.floor(Math.random() * 10);
          var col = Math.floor(Math.random() * 10);
          if (board[row][col] === 0) {
            gameBoardFact.PlaceShip(row, col, ship, vertical);
            isValidSpot = true;
          }
        }
      }
    }
  };
  var aiAttack = function aiAttack(enemyBoard) {
    if (isAI) {
      if (enemyBoard.gameBoardFact.shipsBoarded.length <= 5 && enemyBoard.gameBoardFact.shipsBoarded.length > 0) {
        var eBoard = enemyBoard.gameBoardFact.getBoard();
        var isValidSpot = false;
        while (!isValidSpot) {
          var row = Math.floor(Math.random() * 10);
          var col = Math.floor(Math.random() * 10);
          if (eBoard[row][col] == 0 || eBoard[row][col] == 1) {
            isValidSpot = true;
            enemyBoard.gameBoardFact.recieveAttack(row, col, enemyBoard);
          }
        }
      }
    }
  };
  var random = function random() {
    while (gameBoardFact.shipsBoarded.length < 5) {
      var ship = new _battleship__WEBPACK_IMPORTED_MODULE_0__["default"](gameBoardFact.shipsBoarded.length + 1);
      var vertical = Math.random() < 0.5;
      var isValidSpot = false;
      while (!isValidSpot) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        if (board[row][col] === 0) {
          gameBoardFact.PlaceShip(row, col, ship, vertical);
          isValidSpot = true;
        }
      }
    }
  };
  var attack = function attack(row, col, enemyBoard) {
    if (enemyBoard.gameBoardFact.shipsBoarded.length <= 5 && enemyBoard.gameBoardFact.shipsBoarded.length > 0) {
      enemyBoard.gameBoardFact.recieveAttack(row, col, enemyBoard);
      return "All good on western front";
    } else {
      return "Place all the ships on your board before starting the attack";
    }
  };
  return {
    boardShip: boardShip,
    aiBoardShip: aiBoardShip,
    attack: attack,
    aiAttack: aiAttack,
    random: random,
    name: name,
    board: board,
    gameBoardFact: gameBoardFact
  };
}

/***/ }),

/***/ "./src/randomizeBoard.js":
/*!*******************************!*\
  !*** ./src/randomizeBoard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Randomize)
/* harmony export */ });
/* harmony import */ var _mainGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainGame */ "./src/mainGame.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");


function Randomize(name) {
  var human = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](name, false);
  human.random();
  var computer = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]('Computer', true);
  computer.aiBoardShip();
  (0,_mainGame__WEBPACK_IMPORTED_MODULE_0__["default"])(human, computer);
}

/***/ }),

/***/ "./src/updateUI.js":
/*!*************************!*\
  !*** ./src/updateUI.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateScreen)
/* harmony export */ });
function updateScreen(humanB, aiB) {
  var hUI = document.querySelector('.humanB');
  var aUI = document.querySelector('.AIB');
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (humanB[i][j] == "hit") {
        hUI.querySelector(".cell".concat(i).concat(j)).style.backgroundColor = "lightcoral";
      } else if (humanB[i][j] == 1) {
        hUI.querySelector(".cell".concat(i).concat(j)).style.backgroundColor = "red";
      } else if (humanB[i][j] == "miss") {
        hUI.querySelector(".cell".concat(i).concat(j)).style.backgroundColor = "rgba(0,0,0,0.2)";
      }
      if (aiB[i][j] == "hit") {
        aUI.querySelector(".cell".concat(i).concat(j)).style.backgroundColor = "lightcoral";
      } else if (aiB[i][j] == "miss") {
        aUI.querySelector(".cell".concat(i).concat(j)).style.backgroundColor = "rgba(0,0,0,0.2)";
      }
    }
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/styles.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/styles.css ***!
  \********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./Content/headerF.ttf */ "./src/Content/headerF.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./Content/PlaypenSans-ExtraLight.ttf */ "./src/Content/PlaypenSans-ExtraLight.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@tailwind base;
@tailwind components;
@tailwind utilities;


@font-face {
    font-family: "headerF";
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

@font-face {
    font-family: "normalF";
    src: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
}

@keyframes header {
    0% {
        transform: translateY(-290px);
        opacity: 0;
    }

    25% {
        transform: translateY(-217.5px);
        opacity: 0.25;
    }

    50% {
        transform: translateY(-145px);
        opacity: 0.5;
    }

    75% {
        transform: translateY(-70px);
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}


@keyframes grid {
    0% {
        transform: translateX(-50px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes main {
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    font-family: "normalF";
    font-size: 14px;
}

.container {
    overflow: scroll;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: fit-content(15%) fit-content(50%) fit-content(20%) auto;
    place-items: center;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: rgba(225, 43, 137, 0.21);
}

h1 {
    font-size: 40px;
    animation: header 800ms ease 0s 1 normal forwards;
}

h1>p {
    animation: header 800ms ease 0s 1 normal forwards;
}

header {
    animation: header 800ms ease 0s 1 normal forwards;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    border: 1px ridge black;
    border-top: none;
    border-radius: 8px;
    font-family: "normalF";
    background-color: rgba(92, 59, 197, 0.22);
    max-height: 290px;
    width: 100%;
}

main {
    animation: main 800ms ease 0s 1 normal forwards;
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.control{
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.board {
    width: 290px;
    height: 290px;
    display: grid;
    grid-template-columns: repeat(10, 29px);
    grid-template-rows: repeat(10, 29px);
    animation: grid 800ms ease 0s 1 normal forwards;
}

.cell {
    transition: all 0.2s linear;
    outline: 1px solid black;
}

.moves {
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    display: grid;
    grid-template-rows: repeat(auto-fill, fit-content(75px));
    gap: 5px;
    text-align: center;
    padding-top: 10px;
    border-top: 1px ridge black;
    padding: 5px;
}

.moves>div:not(.confirm) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 29px);
    gap: 0;
    z-index: 2;
    cursor: move;
    transition: all 0.4s linear;
    -webkit-user-drag: element;
    height: 29px;
    position: relative;
}

.s5 {
    width: 145px;
}

.s4 {
    width: 116px;
}

.s3 {
    width: 87px;
}

.s2 {
    width: 58px;
}

.s1 {
    width: 29px;
}


.moves>div>div {
    background-color: red;
    outline: 1px ridge black;
}


footer {
    text-align: center;
    animation: main 800ms ease 0s 1 normal forwards;
}

.random,
.reset {
    width: 100px;
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 16px;
    padding: 6px;
    border-radius: 10px;
    font-weight: normal;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    background-color: #000000;
    display: inline-block;
    transition: all 0.2s linear;
}

.random {
    margin-bottom: 10px;
}

.random:hover,
.reset:hover {
    background: #5D5D5D;
}

.random:active,
.reset:active {
    background: #373737;
}

input {
    outline: none !important;
    border-radius: 6px;
    padding: 5px;
    height: 40px;
    font-size: 25px;
    width: 290px;
}

.inputHead {
    margin: 10px;
}

.error {
    margin-top: 15px;
    border-radius: 6px;
    color: red;
    padding: 3px;
}

.humanB {
    margin-bottom: 15px;
}

.AIB>div {
    transition: all 0.15s linear;
}

.AIB>div:hover {
    background-color: rgba(0, 0, 0, 0.2)
}

.playAgain,
.confirm {
    color: rgb(255, 255, 255);
    font-size: 23px;
    line-height: 23px;
    padding: 15px;
    border-radius: 3px;
    font-weight: normal;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    background-image: linear-gradient(to right, rgb(164, 16, 16) 0%, rgb(203, 0, 0) 50%, rgb(117, 0, 0) 100%);
    box-shadow: rgba(0, 0, 0, 0.19) 5px 5px 15px 5px;
    border: 2px solid rgb(28, 110, 164);
    display: inline-block;
    text-align: center;
}

.playAgain:hover,
.confirm:hover {
    background: #A41010;
}

.playAgain:active,
.confirm:active {
    background: #750000;
}

.confirm {
    height: 50px;
    animation: grid 800ms ease 0s 1 normal forwards;

}

a {
    color: red;
    font-weight: bolder;
}

header+p,
.humanB+p {
    font-size: xx-large;
}

.announcement {
    grid-area: 2/1/3/3;
}

.playAgain {
    max-width: 200px;
    grid-area: 3/1/4/3;
    align-self: flex-start;
}

@media screen and (min-width:936px) {
    .container {
        grid-template-columns: 50% 50%;
        grid-template-rows: fit-content(290px) auto;
        place-items: center;
    }

    header {
        grid-area: 1/1/2/3;
    }

    .humanB {
        grid-area: 2/1/3/2;
        margin: 0;
    }

    .AIB {
        grid-area: 2/2/3/3;
    }

    header+p,
    .humanB+p {
        position: relative;
        font-size: xx-large;
        align-self: start;
        padding: 6px;
    }

    .humanB {
        justify-self: flex-end;
    }

    .AIB {
        justify-self: flex-start;
    }

    .humanB+p {
        justify-self: flex-start;
        margin-left: 45px;
    }

    header+p {
        justify-self: flex-end;
        margin-right: 45px;
    }
}

@media screen and (max-width: 530px) {
    .announcement {
        font-size: 20px;
    }
}`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n\n@font-face {\n    font-family: \"headerF\";\n    src: url(./Content/headerF.ttf);\n}\n\n@font-face {\n    font-family: \"normalF\";\n    src: url(./Content/PlaypenSans-ExtraLight.ttf);\n}\n\n@keyframes header {\n    0% {\n        transform: translateY(-290px);\n        opacity: 0;\n    }\n\n    25% {\n        transform: translateY(-217.5px);\n        opacity: 0.25;\n    }\n\n    50% {\n        transform: translateY(-145px);\n        opacity: 0.5;\n    }\n\n    75% {\n        transform: translateY(-70px);\n    }\n\n    100% {\n        transform: translateY(0);\n        opacity: 1;\n    }\n}\n\n\n@keyframes grid {\n    0% {\n        transform: translateX(-50px);\n        opacity: 0;\n    }\n\n    100% {\n        transform: translateX(0);\n        opacity: 1;\n    }\n}\n\n@keyframes main {\n    0% {\n        transform: translateY(-50px);\n        opacity: 0;\n    }\n\n    100% {\n        transform: translateY(0);\n        opacity: 1;\n    }\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    user-select: none;\n    font-family: \"normalF\";\n    font-size: 14px;\n}\n\n.container {\n    overflow: scroll;\n    height: 100vh;\n    width: 100vw;\n    display: grid;\n    grid-template-rows: fit-content(15%) fit-content(50%) fit-content(20%) auto;\n    place-items: center;\n    justify-content: center;\n    align-items: center;\n    gap: 20px;\n    background-color: rgba(225, 43, 137, 0.21);\n}\n\nh1 {\n    font-size: 40px;\n    animation: header 800ms ease 0s 1 normal forwards;\n}\n\nh1>p {\n    animation: header 800ms ease 0s 1 normal forwards;\n}\n\nheader {\n    animation: header 800ms ease 0s 1 normal forwards;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    justify-content: space-around;\n    align-items: center;\n    border: 1px ridge black;\n    border-top: none;\n    border-radius: 8px;\n    font-family: \"normalF\";\n    background-color: rgba(92, 59, 197, 0.22);\n    max-height: 290px;\n    width: 100%;\n}\n\nmain {\n    animation: main 800ms ease 0s 1 normal forwards;\n    justify-self: flex-start;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    justify-content: space-around;\n    align-items: center;\n}\n\n.control{\n    justify-self: flex-start;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    justify-content: space-around;\n    align-items: center;\n}\n\n.board {\n    width: 290px;\n    height: 290px;\n    display: grid;\n    grid-template-columns: repeat(10, 29px);\n    grid-template-rows: repeat(10, 29px);\n    animation: grid 800ms ease 0s 1 normal forwards;\n}\n\n.cell {\n    transition: all 0.2s linear;\n    outline: 1px solid black;\n}\n\n.moves {\n    margin: 0;\n    margin-top: 10px;\n    margin-bottom: 10px;\n    display: grid;\n    grid-template-rows: repeat(auto-fill, fit-content(75px));\n    gap: 5px;\n    text-align: center;\n    padding-top: 10px;\n    border-top: 1px ridge black;\n    padding: 5px;\n}\n\n.moves>div:not(.confirm) {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, 29px);\n    gap: 0;\n    z-index: 2;\n    cursor: move;\n    transition: all 0.4s linear;\n    -webkit-user-drag: element;\n    height: 29px;\n    position: relative;\n}\n\n.s5 {\n    width: 145px;\n}\n\n.s4 {\n    width: 116px;\n}\n\n.s3 {\n    width: 87px;\n}\n\n.s2 {\n    width: 58px;\n}\n\n.s1 {\n    width: 29px;\n}\n\n\n.moves>div>div {\n    background-color: red;\n    outline: 1px ridge black;\n}\n\n\nfooter {\n    text-align: center;\n    animation: main 800ms ease 0s 1 normal forwards;\n}\n\n.random,\n.reset {\n    width: 100px;\n    text-align: center;\n    color: rgb(255, 255, 255);\n    font-size: 16px;\n    line-height: 16px;\n    padding: 6px;\n    border-radius: 10px;\n    font-weight: normal;\n    text-decoration: none;\n    font-style: normal;\n    font-variant: normal;\n    text-transform: none;\n    background-color: #000000;\n    display: inline-block;\n    transition: all 0.2s linear;\n}\n\n.random {\n    margin-bottom: 10px;\n}\n\n.random:hover,\n.reset:hover {\n    background: #5D5D5D;\n}\n\n.random:active,\n.reset:active {\n    background: #373737;\n}\n\ninput {\n    outline: none !important;\n    border-radius: 6px;\n    padding: 5px;\n    height: 40px;\n    font-size: 25px;\n    width: 290px;\n}\n\n.inputHead {\n    margin: 10px;\n}\n\n.error {\n    margin-top: 15px;\n    border-radius: 6px;\n    color: red;\n    padding: 3px;\n}\n\n.humanB {\n    margin-bottom: 15px;\n}\n\n.AIB>div {\n    transition: all 0.15s linear;\n}\n\n.AIB>div:hover {\n    background-color: rgba(0, 0, 0, 0.2)\n}\n\n.playAgain,\n.confirm {\n    color: rgb(255, 255, 255);\n    font-size: 23px;\n    line-height: 23px;\n    padding: 15px;\n    border-radius: 3px;\n    font-weight: normal;\n    text-decoration: none;\n    font-style: normal;\n    font-variant: normal;\n    text-transform: none;\n    background-image: linear-gradient(to right, rgb(164, 16, 16) 0%, rgb(203, 0, 0) 50%, rgb(117, 0, 0) 100%);\n    box-shadow: rgba(0, 0, 0, 0.19) 5px 5px 15px 5px;\n    border: 2px solid rgb(28, 110, 164);\n    display: inline-block;\n    text-align: center;\n}\n\n.playAgain:hover,\n.confirm:hover {\n    background: #A41010;\n}\n\n.playAgain:active,\n.confirm:active {\n    background: #750000;\n}\n\n.confirm {\n    height: 50px;\n    animation: grid 800ms ease 0s 1 normal forwards;\n\n}\n\na {\n    color: red;\n    font-weight: bolder;\n}\n\nheader+p,\n.humanB+p {\n    font-size: xx-large;\n}\n\n.announcement {\n    grid-area: 2/1/3/3;\n}\n\n.playAgain {\n    max-width: 200px;\n    grid-area: 3/1/4/3;\n    align-self: flex-start;\n}\n\n@media screen and (min-width:936px) {\n    .container {\n        grid-template-columns: 50% 50%;\n        grid-template-rows: fit-content(290px) auto;\n        place-items: center;\n    }\n\n    header {\n        grid-area: 1/1/2/3;\n    }\n\n    .humanB {\n        grid-area: 2/1/3/2;\n        margin: 0;\n    }\n\n    .AIB {\n        grid-area: 2/2/3/3;\n    }\n\n    header+p,\n    .humanB+p {\n        position: relative;\n        font-size: xx-large;\n        align-self: start;\n        padding: 6px;\n    }\n\n    .humanB {\n        justify-self: flex-end;\n    }\n\n    .AIB {\n        justify-self: flex-start;\n    }\n\n    .humanB+p {\n        justify-self: flex-start;\n        margin-left: 45px;\n    }\n\n    header+p {\n        justify-self: flex-end;\n        margin-right: 45px;\n    }\n}\n\n@media screen and (max-width: 530px) {\n    .announcement {\n        font-size: 20px;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/picocolors/picocolors.browser.js":
/*!*******************************************************!*\
  !*** ./node_modules/picocolors/picocolors.browser.js ***!
  \*******************************************************/
/***/ ((module) => {

var x=String;
var create=function() {return {isColorSupported:false,reset:x,bold:x,dim:x,italic:x,underline:x,inverse:x,hidden:x,strikethrough:x,black:x,red:x,green:x,yellow:x,blue:x,magenta:x,cyan:x,white:x,gray:x,bgBlack:x,bgRed:x,bgGreen:x,bgYellow:x,bgBlue:x,bgMagenta:x,bgCyan:x,bgWhite:x}};
module.exports=create();
module.exports.createColors = create;


/***/ }),

/***/ "./node_modules/postcss/lib/at-rule.js":
/*!*********************************************!*\
  !*** ./node_modules/postcss/lib/at-rule.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Container = __webpack_require__(/*! ./container */ "./node_modules/postcss/lib/container.js")

class AtRule extends Container {
  constructor(defaults) {
    super(defaults)
    this.type = 'atrule'
  }

  append(...children) {
    if (!this.proxyOf.nodes) this.nodes = []
    return super.append(...children)
  }

  prepend(...children) {
    if (!this.proxyOf.nodes) this.nodes = []
    return super.prepend(...children)
  }
}

module.exports = AtRule
AtRule.default = AtRule

Container.registerAtRule(AtRule)


/***/ }),

/***/ "./node_modules/postcss/lib/comment.js":
/*!*********************************************!*\
  !*** ./node_modules/postcss/lib/comment.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Node = __webpack_require__(/*! ./node */ "./node_modules/postcss/lib/node.js")

class Comment extends Node {
  constructor(defaults) {
    super(defaults)
    this.type = 'comment'
  }
}

module.exports = Comment
Comment.default = Comment


/***/ }),

/***/ "./node_modules/postcss/lib/container.js":
/*!***********************************************!*\
  !*** ./node_modules/postcss/lib/container.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let { isClean, my } = __webpack_require__(/*! ./symbols */ "./node_modules/postcss/lib/symbols.js")
let Declaration = __webpack_require__(/*! ./declaration */ "./node_modules/postcss/lib/declaration.js")
let Comment = __webpack_require__(/*! ./comment */ "./node_modules/postcss/lib/comment.js")
let Node = __webpack_require__(/*! ./node */ "./node_modules/postcss/lib/node.js")

let parse, Rule, AtRule, Root

function cleanSource(nodes) {
  return nodes.map(i => {
    if (i.nodes) i.nodes = cleanSource(i.nodes)
    delete i.source
    return i
  })
}

function markDirtyUp(node) {
  node[isClean] = false
  if (node.proxyOf.nodes) {
    for (let i of node.proxyOf.nodes) {
      markDirtyUp(i)
    }
  }
}

class Container extends Node {
  append(...children) {
    for (let child of children) {
      let nodes = this.normalize(child, this.last)
      for (let node of nodes) this.proxyOf.nodes.push(node)
    }

    this.markDirty()

    return this
  }

  cleanRaws(keepBetween) {
    super.cleanRaws(keepBetween)
    if (this.nodes) {
      for (let node of this.nodes) node.cleanRaws(keepBetween)
    }
  }

  each(callback) {
    if (!this.proxyOf.nodes) return undefined
    let iterator = this.getIterator()

    let index, result
    while (this.indexes[iterator] < this.proxyOf.nodes.length) {
      index = this.indexes[iterator]
      result = callback(this.proxyOf.nodes[index], index)
      if (result === false) break

      this.indexes[iterator] += 1
    }

    delete this.indexes[iterator]
    return result
  }

  every(condition) {
    return this.nodes.every(condition)
  }

  getIterator() {
    if (!this.lastEach) this.lastEach = 0
    if (!this.indexes) this.indexes = {}

    this.lastEach += 1
    let iterator = this.lastEach
    this.indexes[iterator] = 0

    return iterator
  }

  getProxyProcessor() {
    return {
      get(node, prop) {
        if (prop === 'proxyOf') {
          return node
        } else if (!node[prop]) {
          return node[prop]
        } else if (
          prop === 'each' ||
          (typeof prop === 'string' && prop.startsWith('walk'))
        ) {
          return (...args) => {
            return node[prop](
              ...args.map(i => {
                if (typeof i === 'function') {
                  return (child, index) => i(child.toProxy(), index)
                } else {
                  return i
                }
              })
            )
          }
        } else if (prop === 'every' || prop === 'some') {
          return cb => {
            return node[prop]((child, ...other) =>
              cb(child.toProxy(), ...other)
            )
          }
        } else if (prop === 'root') {
          return () => node.root().toProxy()
        } else if (prop === 'nodes') {
          return node.nodes.map(i => i.toProxy())
        } else if (prop === 'first' || prop === 'last') {
          return node[prop].toProxy()
        } else {
          return node[prop]
        }
      },

      set(node, prop, value) {
        if (node[prop] === value) return true
        node[prop] = value
        if (prop === 'name' || prop === 'params' || prop === 'selector') {
          node.markDirty()
        }
        return true
      }
    }
  }

  index(child) {
    if (typeof child === 'number') return child
    if (child.proxyOf) child = child.proxyOf
    return this.proxyOf.nodes.indexOf(child)
  }

  insertAfter(exist, add) {
    let existIndex = this.index(exist)
    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse()
    existIndex = this.index(exist)
    for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node)

    let index
    for (let id in this.indexes) {
      index = this.indexes[id]
      if (existIndex < index) {
        this.indexes[id] = index + nodes.length
      }
    }

    this.markDirty()

    return this
  }

  insertBefore(exist, add) {
    let existIndex = this.index(exist)
    let type = existIndex === 0 ? 'prepend' : false
    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse()
    existIndex = this.index(exist)
    for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node)

    let index
    for (let id in this.indexes) {
      index = this.indexes[id]
      if (existIndex <= index) {
        this.indexes[id] = index + nodes.length
      }
    }

    this.markDirty()

    return this
  }

  normalize(nodes, sample) {
    if (typeof nodes === 'string') {
      nodes = cleanSource(parse(nodes).nodes)
    } else if (Array.isArray(nodes)) {
      nodes = nodes.slice(0)
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, 'ignore')
      }
    } else if (nodes.type === 'root' && this.type !== 'document') {
      nodes = nodes.nodes.slice(0)
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, 'ignore')
      }
    } else if (nodes.type) {
      nodes = [nodes]
    } else if (nodes.prop) {
      if (typeof nodes.value === 'undefined') {
        throw new Error('Value field is missed in node creation')
      } else if (typeof nodes.value !== 'string') {
        nodes.value = String(nodes.value)
      }
      nodes = [new Declaration(nodes)]
    } else if (nodes.selector) {
      nodes = [new Rule(nodes)]
    } else if (nodes.name) {
      nodes = [new AtRule(nodes)]
    } else if (nodes.text) {
      nodes = [new Comment(nodes)]
    } else {
      throw new Error('Unknown node type in node creation')
    }

    let processed = nodes.map(i => {
      /* c8 ignore next */
      if (!i[my]) Container.rebuild(i)
      i = i.proxyOf
      if (i.parent) i.parent.removeChild(i)
      if (i[isClean]) markDirtyUp(i)
      if (typeof i.raws.before === 'undefined') {
        if (sample && typeof sample.raws.before !== 'undefined') {
          i.raws.before = sample.raws.before.replace(/\S/g, '')
        }
      }
      i.parent = this.proxyOf
      return i
    })

    return processed
  }

  prepend(...children) {
    children = children.reverse()
    for (let child of children) {
      let nodes = this.normalize(child, this.first, 'prepend').reverse()
      for (let node of nodes) this.proxyOf.nodes.unshift(node)
      for (let id in this.indexes) {
        this.indexes[id] = this.indexes[id] + nodes.length
      }
    }

    this.markDirty()

    return this
  }

  push(child) {
    child.parent = this
    this.proxyOf.nodes.push(child)
    return this
  }

  removeAll() {
    for (let node of this.proxyOf.nodes) node.parent = undefined
    this.proxyOf.nodes = []

    this.markDirty()

    return this
  }

  removeChild(child) {
    child = this.index(child)
    this.proxyOf.nodes[child].parent = undefined
    this.proxyOf.nodes.splice(child, 1)

    let index
    for (let id in this.indexes) {
      index = this.indexes[id]
      if (index >= child) {
        this.indexes[id] = index - 1
      }
    }

    this.markDirty()

    return this
  }

  replaceValues(pattern, opts, callback) {
    if (!callback) {
      callback = opts
      opts = {}
    }

    this.walkDecls(decl => {
      if (opts.props && !opts.props.includes(decl.prop)) return
      if (opts.fast && !decl.value.includes(opts.fast)) return

      decl.value = decl.value.replace(pattern, callback)
    })

    this.markDirty()

    return this
  }

  some(condition) {
    return this.nodes.some(condition)
  }

  walk(callback) {
    return this.each((child, i) => {
      let result
      try {
        result = callback(child, i)
      } catch (e) {
        throw child.addToError(e)
      }
      if (result !== false && child.walk) {
        result = child.walk(callback)
      }

      return result
    })
  }

  walkAtRules(name, callback) {
    if (!callback) {
      callback = name
      return this.walk((child, i) => {
        if (child.type === 'atrule') {
          return callback(child, i)
        }
      })
    }
    if (name instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'atrule' && name.test(child.name)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'atrule' && child.name === name) {
        return callback(child, i)
      }
    })
  }

  walkComments(callback) {
    return this.walk((child, i) => {
      if (child.type === 'comment') {
        return callback(child, i)
      }
    })
  }

  walkDecls(prop, callback) {
    if (!callback) {
      callback = prop
      return this.walk((child, i) => {
        if (child.type === 'decl') {
          return callback(child, i)
        }
      })
    }
    if (prop instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'decl' && prop.test(child.prop)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'decl' && child.prop === prop) {
        return callback(child, i)
      }
    })
  }

  walkRules(selector, callback) {
    if (!callback) {
      callback = selector

      return this.walk((child, i) => {
        if (child.type === 'rule') {
          return callback(child, i)
        }
      })
    }
    if (selector instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'rule' && selector.test(child.selector)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'rule' && child.selector === selector) {
        return callback(child, i)
      }
    })
  }

  get first() {
    if (!this.proxyOf.nodes) return undefined
    return this.proxyOf.nodes[0]
  }

  get last() {
    if (!this.proxyOf.nodes) return undefined
    return this.proxyOf.nodes[this.proxyOf.nodes.length - 1]
  }
}

Container.registerParse = dependant => {
  parse = dependant
}

Container.registerRule = dependant => {
  Rule = dependant
}

Container.registerAtRule = dependant => {
  AtRule = dependant
}

Container.registerRoot = dependant => {
  Root = dependant
}

module.exports = Container
Container.default = Container

/* c8 ignore start */
Container.rebuild = node => {
  if (node.type === 'atrule') {
    Object.setPrototypeOf(node, AtRule.prototype)
  } else if (node.type === 'rule') {
    Object.setPrototypeOf(node, Rule.prototype)
  } else if (node.type === 'decl') {
    Object.setPrototypeOf(node, Declaration.prototype)
  } else if (node.type === 'comment') {
    Object.setPrototypeOf(node, Comment.prototype)
  } else if (node.type === 'root') {
    Object.setPrototypeOf(node, Root.prototype)
  }

  node[my] = true

  if (node.nodes) {
    node.nodes.forEach(child => {
      Container.rebuild(child)
    })
  }
}
/* c8 ignore stop */


/***/ }),

/***/ "./node_modules/postcss/lib/css-syntax-error.js":
/*!******************************************************!*\
  !*** ./node_modules/postcss/lib/css-syntax-error.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let pico = __webpack_require__(/*! picocolors */ "./node_modules/picocolors/picocolors.browser.js")

let terminalHighlight = __webpack_require__(/*! ./terminal-highlight */ "?5580")

class CssSyntaxError extends Error {
  constructor(message, line, column, source, file, plugin) {
    super(message)
    this.name = 'CssSyntaxError'
    this.reason = message

    if (file) {
      this.file = file
    }
    if (source) {
      this.source = source
    }
    if (plugin) {
      this.plugin = plugin
    }
    if (typeof line !== 'undefined' && typeof column !== 'undefined') {
      if (typeof line === 'number') {
        this.line = line
        this.column = column
      } else {
        this.line = line.line
        this.column = line.column
        this.endLine = column.line
        this.endColumn = column.column
      }
    }

    this.setMessage()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CssSyntaxError)
    }
  }

  setMessage() {
    this.message = this.plugin ? this.plugin + ': ' : ''
    this.message += this.file ? this.file : '<css input>'
    if (typeof this.line !== 'undefined') {
      this.message += ':' + this.line + ':' + this.column
    }
    this.message += ': ' + this.reason
  }

  showSourceCode(color) {
    if (!this.source) return ''

    let css = this.source
    if (color == null) color = pico.isColorSupported
    if (terminalHighlight) {
      if (color) css = terminalHighlight(css)
    }

    let lines = css.split(/\r?\n/)
    let start = Math.max(this.line - 3, 0)
    let end = Math.min(this.line + 2, lines.length)

    let maxWidth = String(end).length

    let mark, aside
    if (color) {
      let { bold, gray, red } = pico.createColors(true)
      mark = text => bold(red(text))
      aside = text => gray(text)
    } else {
      mark = aside = str => str
    }

    return lines
      .slice(start, end)
      .map((line, index) => {
        let number = start + 1 + index
        let gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | '
        if (number === this.line) {
          let spacing =
            aside(gutter.replace(/\d/g, ' ')) +
            line.slice(0, this.column - 1).replace(/[^\t]/g, ' ')
          return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^')
        }
        return ' ' + aside(gutter) + line
      })
      .join('\n')
  }

  toString() {
    let code = this.showSourceCode()
    if (code) {
      code = '\n\n' + code + '\n'
    }
    return this.name + ': ' + this.message + code
  }
}

module.exports = CssSyntaxError
CssSyntaxError.default = CssSyntaxError


/***/ }),

/***/ "./node_modules/postcss/lib/declaration.js":
/*!*************************************************!*\
  !*** ./node_modules/postcss/lib/declaration.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Node = __webpack_require__(/*! ./node */ "./node_modules/postcss/lib/node.js")

class Declaration extends Node {
  constructor(defaults) {
    if (
      defaults &&
      typeof defaults.value !== 'undefined' &&
      typeof defaults.value !== 'string'
    ) {
      defaults = { ...defaults, value: String(defaults.value) }
    }
    super(defaults)
    this.type = 'decl'
  }

  get variable() {
    return this.prop.startsWith('--') || this.prop[0] === '$'
  }
}

module.exports = Declaration
Declaration.default = Declaration


/***/ }),

/***/ "./node_modules/postcss/lib/document.js":
/*!**********************************************!*\
  !*** ./node_modules/postcss/lib/document.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Container = __webpack_require__(/*! ./container */ "./node_modules/postcss/lib/container.js")

let LazyResult, Processor

class Document extends Container {
  constructor(defaults) {
    // type needs to be passed to super, otherwise child roots won't be normalized correctly
    super({ type: 'document', ...defaults })

    if (!this.nodes) {
      this.nodes = []
    }
  }

  toResult(opts = {}) {
    let lazy = new LazyResult(new Processor(), this, opts)

    return lazy.stringify()
  }
}

Document.registerLazyResult = dependant => {
  LazyResult = dependant
}

Document.registerProcessor = dependant => {
  Processor = dependant
}

module.exports = Document
Document.default = Document


/***/ }),

/***/ "./node_modules/postcss/lib/fromJSON.js":
/*!**********************************************!*\
  !*** ./node_modules/postcss/lib/fromJSON.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Declaration = __webpack_require__(/*! ./declaration */ "./node_modules/postcss/lib/declaration.js")
let PreviousMap = __webpack_require__(/*! ./previous-map */ "./node_modules/postcss/lib/previous-map.js")
let Comment = __webpack_require__(/*! ./comment */ "./node_modules/postcss/lib/comment.js")
let AtRule = __webpack_require__(/*! ./at-rule */ "./node_modules/postcss/lib/at-rule.js")
let Input = __webpack_require__(/*! ./input */ "./node_modules/postcss/lib/input.js")
let Root = __webpack_require__(/*! ./root */ "./node_modules/postcss/lib/root.js")
let Rule = __webpack_require__(/*! ./rule */ "./node_modules/postcss/lib/rule.js")

function fromJSON(json, inputs) {
  if (Array.isArray(json)) return json.map(n => fromJSON(n))

  let { inputs: ownInputs, ...defaults } = json
  if (ownInputs) {
    inputs = []
    for (let input of ownInputs) {
      let inputHydrated = { ...input, __proto__: Input.prototype }
      if (inputHydrated.map) {
        inputHydrated.map = {
          ...inputHydrated.map,
          __proto__: PreviousMap.prototype
        }
      }
      inputs.push(inputHydrated)
    }
  }
  if (defaults.nodes) {
    defaults.nodes = json.nodes.map(n => fromJSON(n, inputs))
  }
  if (defaults.source) {
    let { inputId, ...source } = defaults.source
    defaults.source = source
    if (inputId != null) {
      defaults.source.input = inputs[inputId]
    }
  }
  if (defaults.type === 'root') {
    return new Root(defaults)
  } else if (defaults.type === 'decl') {
    return new Declaration(defaults)
  } else if (defaults.type === 'rule') {
    return new Rule(defaults)
  } else if (defaults.type === 'comment') {
    return new Comment(defaults)
  } else if (defaults.type === 'atrule') {
    return new AtRule(defaults)
  } else {
    throw new Error('Unknown node type: ' + json.type)
  }
}

module.exports = fromJSON
fromJSON.default = fromJSON


/***/ }),

/***/ "./node_modules/postcss/lib/input.js":
/*!*******************************************!*\
  !*** ./node_modules/postcss/lib/input.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let { SourceMapConsumer, SourceMapGenerator } = __webpack_require__(/*! source-map-js */ "?b8cb")
let { fileURLToPath, pathToFileURL } = __webpack_require__(/*! url */ "?c717")
let { isAbsolute, resolve } = __webpack_require__(/*! path */ "?6197")
let { nanoid } = __webpack_require__(/*! nanoid/non-secure */ "./node_modules/nanoid/non-secure/index.cjs")

let terminalHighlight = __webpack_require__(/*! ./terminal-highlight */ "?5580")
let CssSyntaxError = __webpack_require__(/*! ./css-syntax-error */ "./node_modules/postcss/lib/css-syntax-error.js")
let PreviousMap = __webpack_require__(/*! ./previous-map */ "./node_modules/postcss/lib/previous-map.js")

let fromOffsetCache = Symbol('fromOffsetCache')

let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator)
let pathAvailable = Boolean(resolve && isAbsolute)

class Input {
  constructor(css, opts = {}) {
    if (
      css === null ||
      typeof css === 'undefined' ||
      (typeof css === 'object' && !css.toString)
    ) {
      throw new Error(`PostCSS received ${css} instead of CSS string`)
    }

    this.css = css.toString()

    if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
      this.hasBOM = true
      this.css = this.css.slice(1)
    } else {
      this.hasBOM = false
    }

    if (opts.from) {
      if (
        !pathAvailable ||
        /^\w+:\/\//.test(opts.from) ||
        isAbsolute(opts.from)
      ) {
        this.file = opts.from
      } else {
        this.file = resolve(opts.from)
      }
    }

    if (pathAvailable && sourceMapAvailable) {
      let map = new PreviousMap(this.css, opts)
      if (map.text) {
        this.map = map
        let file = map.consumer().file
        if (!this.file && file) this.file = this.mapResolve(file)
      }
    }

    if (!this.file) {
      this.id = '<input css ' + nanoid(6) + '>'
    }
    if (this.map) this.map.file = this.from
  }

  error(message, line, column, opts = {}) {
    let result, endLine, endColumn

    if (line && typeof line === 'object') {
      let start = line
      let end = column
      if (typeof start.offset === 'number') {
        let pos = this.fromOffset(start.offset)
        line = pos.line
        column = pos.col
      } else {
        line = start.line
        column = start.column
      }
      if (typeof end.offset === 'number') {
        let pos = this.fromOffset(end.offset)
        endLine = pos.line
        endColumn = pos.col
      } else {
        endLine = end.line
        endColumn = end.column
      }
    } else if (!column) {
      let pos = this.fromOffset(line)
      line = pos.line
      column = pos.col
    }

    let origin = this.origin(line, column, endLine, endColumn)
    if (origin) {
      result = new CssSyntaxError(
        message,
        origin.endLine === undefined
          ? origin.line
          : { column: origin.column, line: origin.line },
        origin.endLine === undefined
          ? origin.column
          : { column: origin.endColumn, line: origin.endLine },
        origin.source,
        origin.file,
        opts.plugin
      )
    } else {
      result = new CssSyntaxError(
        message,
        endLine === undefined ? line : { column, line },
        endLine === undefined ? column : { column: endColumn, line: endLine },
        this.css,
        this.file,
        opts.plugin
      )
    }

    result.input = { column, endColumn, endLine, line, source: this.css }
    if (this.file) {
      if (pathToFileURL) {
        result.input.url = pathToFileURL(this.file).toString()
      }
      result.input.file = this.file
    }

    return result
  }

  fromOffset(offset) {
    let lastLine, lineToIndex
    if (!this[fromOffsetCache]) {
      let lines = this.css.split('\n')
      lineToIndex = new Array(lines.length)
      let prevIndex = 0

      for (let i = 0, l = lines.length; i < l; i++) {
        lineToIndex[i] = prevIndex
        prevIndex += lines[i].length + 1
      }

      this[fromOffsetCache] = lineToIndex
    } else {
      lineToIndex = this[fromOffsetCache]
    }
    lastLine = lineToIndex[lineToIndex.length - 1]

    let min = 0
    if (offset >= lastLine) {
      min = lineToIndex.length - 1
    } else {
      let max = lineToIndex.length - 2
      let mid
      while (min < max) {
        mid = min + ((max - min) >> 1)
        if (offset < lineToIndex[mid]) {
          max = mid - 1
        } else if (offset >= lineToIndex[mid + 1]) {
          min = mid + 1
        } else {
          min = mid
          break
        }
      }
    }
    return {
      col: offset - lineToIndex[min] + 1,
      line: min + 1
    }
  }

  mapResolve(file) {
    if (/^\w+:\/\//.test(file)) {
      return file
    }
    return resolve(this.map.consumer().sourceRoot || this.map.root || '.', file)
  }

  origin(line, column, endLine, endColumn) {
    if (!this.map) return false
    let consumer = this.map.consumer()

    let from = consumer.originalPositionFor({ column, line })
    if (!from.source) return false

    let to
    if (typeof endLine === 'number') {
      to = consumer.originalPositionFor({ column: endColumn, line: endLine })
    }

    let fromUrl

    if (isAbsolute(from.source)) {
      fromUrl = pathToFileURL(from.source)
    } else {
      fromUrl = new URL(
        from.source,
        this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
      )
    }

    let result = {
      column: from.column,
      endColumn: to && to.column,
      endLine: to && to.line,
      line: from.line,
      url: fromUrl.toString()
    }

    if (fromUrl.protocol === 'file:') {
      if (fileURLToPath) {
        result.file = fileURLToPath(fromUrl)
      } else {
        /* c8 ignore next 2 */
        throw new Error(`file: protocol is not available in this PostCSS build`)
      }
    }

    let source = consumer.sourceContentFor(from.source)
    if (source) result.source = source

    return result
  }

  toJSON() {
    let json = {}
    for (let name of ['hasBOM', 'css', 'file', 'id']) {
      if (this[name] != null) {
        json[name] = this[name]
      }
    }
    if (this.map) {
      json.map = { ...this.map }
      if (json.map.consumerCache) {
        json.map.consumerCache = undefined
      }
    }
    return json
  }

  get from() {
    return this.file || this.id
  }
}

module.exports = Input
Input.default = Input

if (terminalHighlight && terminalHighlight.registerInput) {
  terminalHighlight.registerInput(Input)
}


/***/ }),

/***/ "./node_modules/postcss/lib/lazy-result.js":
/*!*************************************************!*\
  !*** ./node_modules/postcss/lib/lazy-result.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let { isClean, my } = __webpack_require__(/*! ./symbols */ "./node_modules/postcss/lib/symbols.js")
let MapGenerator = __webpack_require__(/*! ./map-generator */ "./node_modules/postcss/lib/map-generator.js")
let stringify = __webpack_require__(/*! ./stringify */ "./node_modules/postcss/lib/stringify.js")
let Container = __webpack_require__(/*! ./container */ "./node_modules/postcss/lib/container.js")
let Document = __webpack_require__(/*! ./document */ "./node_modules/postcss/lib/document.js")
let warnOnce = __webpack_require__(/*! ./warn-once */ "./node_modules/postcss/lib/warn-once.js")
let Result = __webpack_require__(/*! ./result */ "./node_modules/postcss/lib/result.js")
let parse = __webpack_require__(/*! ./parse */ "./node_modules/postcss/lib/parse.js")
let Root = __webpack_require__(/*! ./root */ "./node_modules/postcss/lib/root.js")

const TYPE_TO_CLASS_NAME = {
  atrule: 'AtRule',
  comment: 'Comment',
  decl: 'Declaration',
  document: 'Document',
  root: 'Root',
  rule: 'Rule'
}

const PLUGIN_PROPS = {
  AtRule: true,
  AtRuleExit: true,
  Comment: true,
  CommentExit: true,
  Declaration: true,
  DeclarationExit: true,
  Document: true,
  DocumentExit: true,
  Once: true,
  OnceExit: true,
  postcssPlugin: true,
  prepare: true,
  Root: true,
  RootExit: true,
  Rule: true,
  RuleExit: true
}

const NOT_VISITORS = {
  Once: true,
  postcssPlugin: true,
  prepare: true
}

const CHILDREN = 0

function isPromise(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function'
}

function getEvents(node) {
  let key = false
  let type = TYPE_TO_CLASS_NAME[node.type]
  if (node.type === 'decl') {
    key = node.prop.toLowerCase()
  } else if (node.type === 'atrule') {
    key = node.name.toLowerCase()
  }

  if (key && node.append) {
    return [
      type,
      type + '-' + key,
      CHILDREN,
      type + 'Exit',
      type + 'Exit-' + key
    ]
  } else if (key) {
    return [type, type + '-' + key, type + 'Exit', type + 'Exit-' + key]
  } else if (node.append) {
    return [type, CHILDREN, type + 'Exit']
  } else {
    return [type, type + 'Exit']
  }
}

function toStack(node) {
  let events
  if (node.type === 'document') {
    events = ['Document', CHILDREN, 'DocumentExit']
  } else if (node.type === 'root') {
    events = ['Root', CHILDREN, 'RootExit']
  } else {
    events = getEvents(node)
  }

  return {
    eventIndex: 0,
    events,
    iterator: 0,
    node,
    visitorIndex: 0,
    visitors: []
  }
}

function cleanMarks(node) {
  node[isClean] = false
  if (node.nodes) node.nodes.forEach(i => cleanMarks(i))
  return node
}

let postcss = {}

class LazyResult {
  constructor(processor, css, opts) {
    this.stringified = false
    this.processed = false

    let root
    if (
      typeof css === 'object' &&
      css !== null &&
      (css.type === 'root' || css.type === 'document')
    ) {
      root = cleanMarks(css)
    } else if (css instanceof LazyResult || css instanceof Result) {
      root = cleanMarks(css.root)
      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {}
        if (!opts.map.inline) opts.map.inline = false
        opts.map.prev = css.map
      }
    } else {
      let parser = parse
      if (opts.syntax) parser = opts.syntax.parse
      if (opts.parser) parser = opts.parser
      if (parser.parse) parser = parser.parse

      try {
        root = parser(css, opts)
      } catch (error) {
        this.processed = true
        this.error = error
      }

      if (root && !root[my]) {
        /* c8 ignore next 2 */
        Container.rebuild(root)
      }
    }

    this.result = new Result(processor, root, opts)
    this.helpers = { ...postcss, postcss, result: this.result }
    this.plugins = this.processor.plugins.map(plugin => {
      if (typeof plugin === 'object' && plugin.prepare) {
        return { ...plugin, ...plugin.prepare(this.result) }
      } else {
        return plugin
      }
    })
  }

  async() {
    if (this.error) return Promise.reject(this.error)
    if (this.processed) return Promise.resolve(this.result)
    if (!this.processing) {
      this.processing = this.runAsync()
    }
    return this.processing
  }

  catch(onRejected) {
    return this.async().catch(onRejected)
  }

  finally(onFinally) {
    return this.async().then(onFinally, onFinally)
  }

  getAsyncError() {
    throw new Error('Use process(css).then(cb) to work with async plugins')
  }

  handleError(error, node) {
    let plugin = this.result.lastPlugin
    try {
      if (node) node.addToError(error)
      this.error = error
      if (error.name === 'CssSyntaxError' && !error.plugin) {
        error.plugin = plugin.postcssPlugin
        error.setMessage()
      } else if (plugin.postcssVersion) {
        if (true) {
          let pluginName = plugin.postcssPlugin
          let pluginVer = plugin.postcssVersion
          let runtimeVer = this.result.processor.version
          let a = pluginVer.split('.')
          let b = runtimeVer.split('.')

          if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
            // eslint-disable-next-line no-console
            console.error(
              'Unknown error from PostCSS plugin. Your current PostCSS ' +
                'version is ' +
                runtimeVer +
                ', but ' +
                pluginName +
                ' uses ' +
                pluginVer +
                '. Perhaps this is the source of the error below.'
            )
          }
        }
      }
    } catch (err) {
      /* c8 ignore next 3 */
      // eslint-disable-next-line no-console
      if (console && console.error) console.error(err)
    }
    return error
  }

  prepareVisitors() {
    this.listeners = {}
    let add = (plugin, type, cb) => {
      if (!this.listeners[type]) this.listeners[type] = []
      this.listeners[type].push([plugin, cb])
    }
    for (let plugin of this.plugins) {
      if (typeof plugin === 'object') {
        for (let event in plugin) {
          if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
            throw new Error(
              `Unknown event ${event} in ${plugin.postcssPlugin}. ` +
                `Try to update PostCSS (${this.processor.version} now).`
            )
          }
          if (!NOT_VISITORS[event]) {
            if (typeof plugin[event] === 'object') {
              for (let filter in plugin[event]) {
                if (filter === '*') {
                  add(plugin, event, plugin[event][filter])
                } else {
                  add(
                    plugin,
                    event + '-' + filter.toLowerCase(),
                    plugin[event][filter]
                  )
                }
              }
            } else if (typeof plugin[event] === 'function') {
              add(plugin, event, plugin[event])
            }
          }
        }
      }
    }
    this.hasListener = Object.keys(this.listeners).length > 0
  }

  async runAsync() {
    this.plugin = 0
    for (let i = 0; i < this.plugins.length; i++) {
      let plugin = this.plugins[i]
      let promise = this.runOnRoot(plugin)
      if (isPromise(promise)) {
        try {
          await promise
        } catch (error) {
          throw this.handleError(error)
        }
      }
    }

    this.prepareVisitors()
    if (this.hasListener) {
      let root = this.result.root
      while (!root[isClean]) {
        root[isClean] = true
        let stack = [toStack(root)]
        while (stack.length > 0) {
          let promise = this.visitTick(stack)
          if (isPromise(promise)) {
            try {
              await promise
            } catch (e) {
              let node = stack[stack.length - 1].node
              throw this.handleError(e, node)
            }
          }
        }
      }

      if (this.listeners.OnceExit) {
        for (let [plugin, visitor] of this.listeners.OnceExit) {
          this.result.lastPlugin = plugin
          try {
            if (root.type === 'document') {
              let roots = root.nodes.map(subRoot =>
                visitor(subRoot, this.helpers)
              )

              await Promise.all(roots)
            } else {
              await visitor(root, this.helpers)
            }
          } catch (e) {
            throw this.handleError(e)
          }
        }
      }
    }

    this.processed = true
    return this.stringify()
  }

  runOnRoot(plugin) {
    this.result.lastPlugin = plugin
    try {
      if (typeof plugin === 'object' && plugin.Once) {
        if (this.result.root.type === 'document') {
          let roots = this.result.root.nodes.map(root =>
            plugin.Once(root, this.helpers)
          )

          if (isPromise(roots[0])) {
            return Promise.all(roots)
          }

          return roots
        }

        return plugin.Once(this.result.root, this.helpers)
      } else if (typeof plugin === 'function') {
        return plugin(this.result.root, this.result)
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  stringify() {
    if (this.error) throw this.error
    if (this.stringified) return this.result
    this.stringified = true

    this.sync()

    let opts = this.result.opts
    let str = stringify
    if (opts.syntax) str = opts.syntax.stringify
    if (opts.stringifier) str = opts.stringifier
    if (str.stringify) str = str.stringify

    let map = new MapGenerator(str, this.result.root, this.result.opts)
    let data = map.generate()
    this.result.css = data[0]
    this.result.map = data[1]

    return this.result
  }

  sync() {
    if (this.error) throw this.error
    if (this.processed) return this.result
    this.processed = true

    if (this.processing) {
      throw this.getAsyncError()
    }

    for (let plugin of this.plugins) {
      let promise = this.runOnRoot(plugin)
      if (isPromise(promise)) {
        throw this.getAsyncError()
      }
    }

    this.prepareVisitors()
    if (this.hasListener) {
      let root = this.result.root
      while (!root[isClean]) {
        root[isClean] = true
        this.walkSync(root)
      }
      if (this.listeners.OnceExit) {
        if (root.type === 'document') {
          for (let subRoot of root.nodes) {
            this.visitSync(this.listeners.OnceExit, subRoot)
          }
        } else {
          this.visitSync(this.listeners.OnceExit, root)
        }
      }
    }

    return this.result
  }

  then(onFulfilled, onRejected) {
    if (true) {
      if (!('from' in this.opts)) {
        warnOnce(
          'Without `from` option PostCSS could generate wrong source map ' +
            'and will not find Browserslist config. Set it to CSS file path ' +
            'or to `undefined` to prevent this warning.'
        )
      }
    }
    return this.async().then(onFulfilled, onRejected)
  }

  toString() {
    return this.css
  }

  visitSync(visitors, node) {
    for (let [plugin, visitor] of visitors) {
      this.result.lastPlugin = plugin
      let promise
      try {
        promise = visitor(node, this.helpers)
      } catch (e) {
        throw this.handleError(e, node.proxyOf)
      }
      if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
        return true
      }
      if (isPromise(promise)) {
        throw this.getAsyncError()
      }
    }
  }

  visitTick(stack) {
    let visit = stack[stack.length - 1]
    let { node, visitors } = visit

    if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
      stack.pop()
      return
    }

    if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
      let [plugin, visitor] = visitors[visit.visitorIndex]
      visit.visitorIndex += 1
      if (visit.visitorIndex === visitors.length) {
        visit.visitors = []
        visit.visitorIndex = 0
      }
      this.result.lastPlugin = plugin
      try {
        return visitor(node.toProxy(), this.helpers)
      } catch (e) {
        throw this.handleError(e, node)
      }
    }

    if (visit.iterator !== 0) {
      let iterator = visit.iterator
      let child
      while ((child = node.nodes[node.indexes[iterator]])) {
        node.indexes[iterator] += 1
        if (!child[isClean]) {
          child[isClean] = true
          stack.push(toStack(child))
          return
        }
      }
      visit.iterator = 0
      delete node.indexes[iterator]
    }

    let events = visit.events
    while (visit.eventIndex < events.length) {
      let event = events[visit.eventIndex]
      visit.eventIndex += 1
      if (event === CHILDREN) {
        if (node.nodes && node.nodes.length) {
          node[isClean] = true
          visit.iterator = node.getIterator()
        }
        return
      } else if (this.listeners[event]) {
        visit.visitors = this.listeners[event]
        return
      }
    }
    stack.pop()
  }

  walkSync(node) {
    node[isClean] = true
    let events = getEvents(node)
    for (let event of events) {
      if (event === CHILDREN) {
        if (node.nodes) {
          node.each(child => {
            if (!child[isClean]) this.walkSync(child)
          })
        }
      } else {
        let visitors = this.listeners[event]
        if (visitors) {
          if (this.visitSync(visitors, node.toProxy())) return
        }
      }
    }
  }

  warnings() {
    return this.sync().warnings()
  }

  get content() {
    return this.stringify().content
  }

  get css() {
    return this.stringify().css
  }

  get map() {
    return this.stringify().map
  }

  get messages() {
    return this.sync().messages
  }

  get opts() {
    return this.result.opts
  }

  get processor() {
    return this.result.processor
  }

  get root() {
    return this.sync().root
  }

  get [Symbol.toStringTag]() {
    return 'LazyResult'
  }
}

LazyResult.registerPostcss = dependant => {
  postcss = dependant
}

module.exports = LazyResult
LazyResult.default = LazyResult

Root.registerLazyResult(LazyResult)
Document.registerLazyResult(LazyResult)


/***/ }),

/***/ "./node_modules/postcss/lib/list.js":
/*!******************************************!*\
  !*** ./node_modules/postcss/lib/list.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


let list = {
  comma(string) {
    return list.split(string, [','], true)
  },

  space(string) {
    let spaces = [' ', '\n', '\t']
    return list.split(string, spaces)
  },

  split(string, separators, last) {
    let array = []
    let current = ''
    let split = false

    let func = 0
    let inQuote = false
    let prevQuote = ''
    let escape = false

    for (let letter of string) {
      if (escape) {
        escape = false
      } else if (letter === '\\') {
        escape = true
      } else if (inQuote) {
        if (letter === prevQuote) {
          inQuote = false
        }
      } else if (letter === '"' || letter === "'") {
        inQuote = true
        prevQuote = letter
      } else if (letter === '(') {
        func += 1
      } else if (letter === ')') {
        if (func > 0) func -= 1
      } else if (func === 0) {
        if (separators.includes(letter)) split = true
      }

      if (split) {
        if (current !== '') array.push(current.trim())
        current = ''
        split = false
      } else {
        current += letter
      }
    }

    if (last || current !== '') array.push(current.trim())
    return array
  }
}

module.exports = list
list.default = list


/***/ }),

/***/ "./node_modules/postcss/lib/map-generator.js":
/*!***************************************************!*\
  !*** ./node_modules/postcss/lib/map-generator.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let { SourceMapConsumer, SourceMapGenerator } = __webpack_require__(/*! source-map-js */ "?b8cb")
let { dirname, relative, resolve, sep } = __webpack_require__(/*! path */ "?6197")
let { pathToFileURL } = __webpack_require__(/*! url */ "?c717")

let Input = __webpack_require__(/*! ./input */ "./node_modules/postcss/lib/input.js")

let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator)
let pathAvailable = Boolean(dirname && resolve && relative && sep)

class MapGenerator {
  constructor(stringify, root, opts, cssString) {
    this.stringify = stringify
    this.mapOpts = opts.map || {}
    this.root = root
    this.opts = opts
    this.css = cssString
    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute

    this.memoizedFileURLs = new Map()
    this.memoizedPaths = new Map()
    this.memoizedURLs = new Map()
  }

  addAnnotation() {
    let content

    if (this.isInline()) {
      content =
        'data:application/json;base64,' + this.toBase64(this.map.toString())
    } else if (typeof this.mapOpts.annotation === 'string') {
      content = this.mapOpts.annotation
    } else if (typeof this.mapOpts.annotation === 'function') {
      content = this.mapOpts.annotation(this.opts.to, this.root)
    } else {
      content = this.outputFile() + '.map'
    }
    let eol = '\n'
    if (this.css.includes('\r\n')) eol = '\r\n'

    this.css += eol + '/*# sourceMappingURL=' + content + ' */'
  }

  applyPrevMaps() {
    for (let prev of this.previous()) {
      let from = this.toUrl(this.path(prev.file))
      let root = prev.root || dirname(prev.file)
      let map

      if (this.mapOpts.sourcesContent === false) {
        map = new SourceMapConsumer(prev.text)
        if (map.sourcesContent) {
          map.sourcesContent = map.sourcesContent.map(() => null)
        }
      } else {
        map = prev.consumer()
      }

      this.map.applySourceMap(map, from, this.toUrl(this.path(root)))
    }
  }

  clearAnnotation() {
    if (this.mapOpts.annotation === false) return

    if (this.root) {
      let node
      for (let i = this.root.nodes.length - 1; i >= 0; i--) {
        node = this.root.nodes[i]
        if (node.type !== 'comment') continue
        if (node.text.indexOf('# sourceMappingURL=') === 0) {
          this.root.removeChild(i)
        }
      }
    } else if (this.css) {
      this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, '')
    }
  }

  generate() {
    this.clearAnnotation()
    if (pathAvailable && sourceMapAvailable && this.isMap()) {
      return this.generateMap()
    } else {
      let result = ''
      this.stringify(this.root, i => {
        result += i
      })
      return [result]
    }
  }

  generateMap() {
    if (this.root) {
      this.generateString()
    } else if (this.previous().length === 1) {
      let prev = this.previous()[0].consumer()
      prev.file = this.outputFile()
      this.map = SourceMapGenerator.fromSourceMap(prev)
    } else {
      this.map = new SourceMapGenerator({ file: this.outputFile() })
      this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from
          ? this.toUrl(this.path(this.opts.from))
          : '<no source>'
      })
    }

    if (this.isSourcesContent()) this.setSourcesContent()
    if (this.root && this.previous().length > 0) this.applyPrevMaps()
    if (this.isAnnotation()) this.addAnnotation()

    if (this.isInline()) {
      return [this.css]
    } else {
      return [this.css, this.map]
    }
  }

  generateString() {
    this.css = ''
    this.map = new SourceMapGenerator({ file: this.outputFile() })

    let line = 1
    let column = 1

    let noSource = '<no source>'
    let mapping = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ''
    }

    let lines, last
    this.stringify(this.root, (str, node, type) => {
      this.css += str

      if (node && type !== 'end') {
        mapping.generated.line = line
        mapping.generated.column = column - 1
        if (node.source && node.source.start) {
          mapping.source = this.sourcePath(node)
          mapping.original.line = node.source.start.line
          mapping.original.column = node.source.start.column - 1
          this.map.addMapping(mapping)
        } else {
          mapping.source = noSource
          mapping.original.line = 1
          mapping.original.column = 0
          this.map.addMapping(mapping)
        }
      }

      lines = str.match(/\n/g)
      if (lines) {
        line += lines.length
        last = str.lastIndexOf('\n')
        column = str.length - last
      } else {
        column += str.length
      }

      if (node && type !== 'start') {
        let p = node.parent || { raws: {} }
        let childless =
          node.type === 'decl' || (node.type === 'atrule' && !node.nodes)
        if (!childless || node !== p.last || p.raws.semicolon) {
          if (node.source && node.source.end) {
            mapping.source = this.sourcePath(node)
            mapping.original.line = node.source.end.line
            mapping.original.column = node.source.end.column - 1
            mapping.generated.line = line
            mapping.generated.column = column - 2
            this.map.addMapping(mapping)
          } else {
            mapping.source = noSource
            mapping.original.line = 1
            mapping.original.column = 0
            mapping.generated.line = line
            mapping.generated.column = column - 1
            this.map.addMapping(mapping)
          }
        }
      }
    })
  }

  isAnnotation() {
    if (this.isInline()) {
      return true
    }
    if (typeof this.mapOpts.annotation !== 'undefined') {
      return this.mapOpts.annotation
    }
    if (this.previous().length) {
      return this.previous().some(i => i.annotation)
    }
    return true
  }

  isInline() {
    if (typeof this.mapOpts.inline !== 'undefined') {
      return this.mapOpts.inline
    }

    let annotation = this.mapOpts.annotation
    if (typeof annotation !== 'undefined' && annotation !== true) {
      return false
    }

    if (this.previous().length) {
      return this.previous().some(i => i.inline)
    }
    return true
  }

  isMap() {
    if (typeof this.opts.map !== 'undefined') {
      return !!this.opts.map
    }
    return this.previous().length > 0
  }

  isSourcesContent() {
    if (typeof this.mapOpts.sourcesContent !== 'undefined') {
      return this.mapOpts.sourcesContent
    }
    if (this.previous().length) {
      return this.previous().some(i => i.withContent())
    }
    return true
  }

  outputFile() {
    if (this.opts.to) {
      return this.path(this.opts.to)
    } else if (this.opts.from) {
      return this.path(this.opts.from)
    } else {
      return 'to.css'
    }
  }

  path(file) {
    if (this.mapOpts.absolute) return file
    if (file.charCodeAt(0) === 60 /* `<` */) return file
    if (/^\w+:\/\//.test(file)) return file
    let cached = this.memoizedPaths.get(file)
    if (cached) return cached

    let from = this.opts.to ? dirname(this.opts.to) : '.'

    if (typeof this.mapOpts.annotation === 'string') {
      from = dirname(resolve(from, this.mapOpts.annotation))
    }

    let path = relative(from, file)
    this.memoizedPaths.set(file, path)

    return path
  }

  previous() {
    if (!this.previousMaps) {
      this.previousMaps = []
      if (this.root) {
        this.root.walk(node => {
          if (node.source && node.source.input.map) {
            let map = node.source.input.map
            if (!this.previousMaps.includes(map)) {
              this.previousMaps.push(map)
            }
          }
        })
      } else {
        let input = new Input(this.css, this.opts)
        if (input.map) this.previousMaps.push(input.map)
      }
    }

    return this.previousMaps
  }

  setSourcesContent() {
    let already = {}
    if (this.root) {
      this.root.walk(node => {
        if (node.source) {
          let from = node.source.input.from
          if (from && !already[from]) {
            already[from] = true
            let fromUrl = this.usesFileUrls
              ? this.toFileUrl(from)
              : this.toUrl(this.path(from))
            this.map.setSourceContent(fromUrl, node.source.input.css)
          }
        }
      })
    } else if (this.css) {
      let from = this.opts.from
        ? this.toUrl(this.path(this.opts.from))
        : '<no source>'
      this.map.setSourceContent(from, this.css)
    }
  }

  sourcePath(node) {
    if (this.mapOpts.from) {
      return this.toUrl(this.mapOpts.from)
    } else if (this.usesFileUrls) {
      return this.toFileUrl(node.source.input.from)
    } else {
      return this.toUrl(this.path(node.source.input.from))
    }
  }

  toBase64(str) {
    if (Buffer) {
      return Buffer.from(str).toString('base64')
    } else {
      return window.btoa(unescape(encodeURIComponent(str)))
    }
  }

  toFileUrl(path) {
    let cached = this.memoizedFileURLs.get(path)
    if (cached) return cached

    if (pathToFileURL) {
      let fileURL = pathToFileURL(path).toString()
      this.memoizedFileURLs.set(path, fileURL)

      return fileURL
    } else {
      throw new Error(
        '`map.absolute` option is not available in this PostCSS build'
      )
    }
  }

  toUrl(path) {
    let cached = this.memoizedURLs.get(path)
    if (cached) return cached

    if (sep === '\\') {
      path = path.replace(/\\/g, '/')
    }

    let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent)
    this.memoizedURLs.set(path, url)

    return url
  }
}

module.exports = MapGenerator


/***/ }),

/***/ "./node_modules/postcss/lib/no-work-result.js":
/*!****************************************************!*\
  !*** ./node_modules/postcss/lib/no-work-result.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let MapGenerator = __webpack_require__(/*! ./map-generator */ "./node_modules/postcss/lib/map-generator.js")
let stringify = __webpack_require__(/*! ./stringify */ "./node_modules/postcss/lib/stringify.js")
let warnOnce = __webpack_require__(/*! ./warn-once */ "./node_modules/postcss/lib/warn-once.js")
let parse = __webpack_require__(/*! ./parse */ "./node_modules/postcss/lib/parse.js")
const Result = __webpack_require__(/*! ./result */ "./node_modules/postcss/lib/result.js")

class NoWorkResult {
  constructor(processor, css, opts) {
    css = css.toString()
    this.stringified = false

    this._processor = processor
    this._css = css
    this._opts = opts
    this._map = undefined
    let root

    let str = stringify
    this.result = new Result(this._processor, root, this._opts)
    this.result.css = css

    let self = this
    Object.defineProperty(this.result, 'root', {
      get() {
        return self.root
      }
    })

    let map = new MapGenerator(str, root, this._opts, css)
    if (map.isMap()) {
      let [generatedCSS, generatedMap] = map.generate()
      if (generatedCSS) {
        this.result.css = generatedCSS
      }
      if (generatedMap) {
        this.result.map = generatedMap
      }
    }
  }

  async() {
    if (this.error) return Promise.reject(this.error)
    return Promise.resolve(this.result)
  }

  catch(onRejected) {
    return this.async().catch(onRejected)
  }

  finally(onFinally) {
    return this.async().then(onFinally, onFinally)
  }

  sync() {
    if (this.error) throw this.error
    return this.result
  }

  then(onFulfilled, onRejected) {
    if (true) {
      if (!('from' in this._opts)) {
        warnOnce(
          'Without `from` option PostCSS could generate wrong source map ' +
            'and will not find Browserslist config. Set it to CSS file path ' +
            'or to `undefined` to prevent this warning.'
        )
      }
    }

    return this.async().then(onFulfilled, onRejected)
  }

  toString() {
    return this._css
  }

  warnings() {
    return []
  }

  get content() {
    return this.result.css
  }

  get css() {
    return this.result.css
  }

  get map() {
    return this.result.map
  }

  get messages() {
    return []
  }

  get opts() {
    return this.result.opts
  }

  get processor() {
    return this.result.processor
  }

  get root() {
    if (this._root) {
      return this._root
    }

    let root
    let parser = parse

    try {
      root = parser(this._css, this._opts)
    } catch (error) {
      this.error = error
    }

    if (this.error) {
      throw this.error
    } else {
      this._root = root
      return root
    }
  }

  get [Symbol.toStringTag]() {
    return 'NoWorkResult'
  }
}

module.exports = NoWorkResult
NoWorkResult.default = NoWorkResult


/***/ }),

/***/ "./node_modules/postcss/lib/node.js":
/*!******************************************!*\
  !*** ./node_modules/postcss/lib/node.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let { isClean, my } = __webpack_require__(/*! ./symbols */ "./node_modules/postcss/lib/symbols.js")
let CssSyntaxError = __webpack_require__(/*! ./css-syntax-error */ "./node_modules/postcss/lib/css-syntax-error.js")
let Stringifier = __webpack_require__(/*! ./stringifier */ "./node_modules/postcss/lib/stringifier.js")
let stringify = __webpack_require__(/*! ./stringify */ "./node_modules/postcss/lib/stringify.js")

function cloneNode(obj, parent) {
  let cloned = new obj.constructor()

  for (let i in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, i)) {
      /* c8 ignore next 2 */
      continue
    }
    if (i === 'proxyCache') continue
    let value = obj[i]
    let type = typeof value

    if (i === 'parent' && type === 'object') {
      if (parent) cloned[i] = parent
    } else if (i === 'source') {
      cloned[i] = value
    } else if (Array.isArray(value)) {
      cloned[i] = value.map(j => cloneNode(j, cloned))
    } else {
      if (type === 'object' && value !== null) value = cloneNode(value)
      cloned[i] = value
    }
  }

  return cloned
}

class Node {
  constructor(defaults = {}) {
    this.raws = {}
    this[isClean] = false
    this[my] = true

    for (let name in defaults) {
      if (name === 'nodes') {
        this.nodes = []
        for (let node of defaults[name]) {
          if (typeof node.clone === 'function') {
            this.append(node.clone())
          } else {
            this.append(node)
          }
        }
      } else {
        this[name] = defaults[name]
      }
    }
  }

  addToError(error) {
    error.postcssNode = this
    if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
      let s = this.source
      error.stack = error.stack.replace(
        /\n\s{4}at /,
        `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
      )
    }
    return error
  }

  after(add) {
    this.parent.insertAfter(this, add)
    return this
  }

  assign(overrides = {}) {
    for (let name in overrides) {
      this[name] = overrides[name]
    }
    return this
  }

  before(add) {
    this.parent.insertBefore(this, add)
    return this
  }

  cleanRaws(keepBetween) {
    delete this.raws.before
    delete this.raws.after
    if (!keepBetween) delete this.raws.between
  }

  clone(overrides = {}) {
    let cloned = cloneNode(this)
    for (let name in overrides) {
      cloned[name] = overrides[name]
    }
    return cloned
  }

  cloneAfter(overrides = {}) {
    let cloned = this.clone(overrides)
    this.parent.insertAfter(this, cloned)
    return cloned
  }

  cloneBefore(overrides = {}) {
    let cloned = this.clone(overrides)
    this.parent.insertBefore(this, cloned)
    return cloned
  }

  error(message, opts = {}) {
    if (this.source) {
      let { end, start } = this.rangeBy(opts)
      return this.source.input.error(
        message,
        { column: start.column, line: start.line },
        { column: end.column, line: end.line },
        opts
      )
    }
    return new CssSyntaxError(message)
  }

  getProxyProcessor() {
    return {
      get(node, prop) {
        if (prop === 'proxyOf') {
          return node
        } else if (prop === 'root') {
          return () => node.root().toProxy()
        } else {
          return node[prop]
        }
      },

      set(node, prop, value) {
        if (node[prop] === value) return true
        node[prop] = value
        if (
          prop === 'prop' ||
          prop === 'value' ||
          prop === 'name' ||
          prop === 'params' ||
          prop === 'important' ||
          /* c8 ignore next */
          prop === 'text'
        ) {
          node.markDirty()
        }
        return true
      }
    }
  }

  markDirty() {
    if (this[isClean]) {
      this[isClean] = false
      let next = this
      while ((next = next.parent)) {
        next[isClean] = false
      }
    }
  }

  next() {
    if (!this.parent) return undefined
    let index = this.parent.index(this)
    return this.parent.nodes[index + 1]
  }

  positionBy(opts, stringRepresentation) {
    let pos = this.source.start
    if (opts.index) {
      pos = this.positionInside(opts.index, stringRepresentation)
    } else if (opts.word) {
      stringRepresentation = this.toString()
      let index = stringRepresentation.indexOf(opts.word)
      if (index !== -1) pos = this.positionInside(index, stringRepresentation)
    }
    return pos
  }

  positionInside(index, stringRepresentation) {
    let string = stringRepresentation || this.toString()
    let column = this.source.start.column
    let line = this.source.start.line

    for (let i = 0; i < index; i++) {
      if (string[i] === '\n') {
        column = 1
        line += 1
      } else {
        column += 1
      }
    }

    return { column, line }
  }

  prev() {
    if (!this.parent) return undefined
    let index = this.parent.index(this)
    return this.parent.nodes[index - 1]
  }

  rangeBy(opts) {
    let start = {
      column: this.source.start.column,
      line: this.source.start.line
    }
    let end = this.source.end
      ? {
        column: this.source.end.column + 1,
        line: this.source.end.line
      }
      : {
        column: start.column + 1,
        line: start.line
      }

    if (opts.word) {
      let stringRepresentation = this.toString()
      let index = stringRepresentation.indexOf(opts.word)
      if (index !== -1) {
        start = this.positionInside(index, stringRepresentation)
        end = this.positionInside(index + opts.word.length, stringRepresentation)
      }
    } else {
      if (opts.start) {
        start = {
          column: opts.start.column,
          line: opts.start.line
        }
      } else if (opts.index) {
        start = this.positionInside(opts.index)
      }

      if (opts.end) {
        end = {
          column: opts.end.column,
          line: opts.end.line
        }
      } else if (opts.endIndex) {
        end = this.positionInside(opts.endIndex)
      } else if (opts.index) {
        end = this.positionInside(opts.index + 1)
      }
    }

    if (
      end.line < start.line ||
      (end.line === start.line && end.column <= start.column)
    ) {
      end = { column: start.column + 1, line: start.line }
    }

    return { end, start }
  }

  raw(prop, defaultType) {
    let str = new Stringifier()
    return str.raw(this, prop, defaultType)
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this)
    }
    this.parent = undefined
    return this
  }

  replaceWith(...nodes) {
    if (this.parent) {
      let bookmark = this
      let foundSelf = false
      for (let node of nodes) {
        if (node === this) {
          foundSelf = true
        } else if (foundSelf) {
          this.parent.insertAfter(bookmark, node)
          bookmark = node
        } else {
          this.parent.insertBefore(bookmark, node)
        }
      }

      if (!foundSelf) {
        this.remove()
      }
    }

    return this
  }

  root() {
    let result = this
    while (result.parent && result.parent.type !== 'document') {
      result = result.parent
    }
    return result
  }

  toJSON(_, inputs) {
    let fixed = {}
    let emitInputs = inputs == null
    inputs = inputs || new Map()
    let inputsNextIndex = 0

    for (let name in this) {
      if (!Object.prototype.hasOwnProperty.call(this, name)) {
        /* c8 ignore next 2 */
        continue
      }
      if (name === 'parent' || name === 'proxyCache') continue
      let value = this[name]

      if (Array.isArray(value)) {
        fixed[name] = value.map(i => {
          if (typeof i === 'object' && i.toJSON) {
            return i.toJSON(null, inputs)
          } else {
            return i
          }
        })
      } else if (typeof value === 'object' && value.toJSON) {
        fixed[name] = value.toJSON(null, inputs)
      } else if (name === 'source') {
        let inputId = inputs.get(value.input)
        if (inputId == null) {
          inputId = inputsNextIndex
          inputs.set(value.input, inputsNextIndex)
          inputsNextIndex++
        }
        fixed[name] = {
          end: value.end,
          inputId,
          start: value.start
        }
      } else {
        fixed[name] = value
      }
    }

    if (emitInputs) {
      fixed.inputs = [...inputs.keys()].map(input => input.toJSON())
    }

    return fixed
  }

  toProxy() {
    if (!this.proxyCache) {
      this.proxyCache = new Proxy(this, this.getProxyProcessor())
    }
    return this.proxyCache
  }

  toString(stringifier = stringify) {
    if (stringifier.stringify) stringifier = stringifier.stringify
    let result = ''
    stringifier(this, i => {
      result += i
    })
    return result
  }

  warn(result, text, opts) {
    let data = { node: this }
    for (let i in opts) data[i] = opts[i]
    return result.warn(text, data)
  }

  get proxyOf() {
    return this
  }
}

module.exports = Node
Node.default = Node


/***/ }),

/***/ "./node_modules/postcss/lib/parse.js":
/*!*******************************************!*\
  !*** ./node_modules/postcss/lib/parse.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Container = __webpack_require__(/*! ./container */ "./node_modules/postcss/lib/container.js")
let Parser = __webpack_require__(/*! ./parser */ "./node_modules/postcss/lib/parser.js")
let Input = __webpack_require__(/*! ./input */ "./node_modules/postcss/lib/input.js")

function parse(css, opts) {
  let input = new Input(css, opts)
  let parser = new Parser(input)
  try {
    parser.parse()
  } catch (e) {
    if (true) {
      if (e.name === 'CssSyntaxError' && opts && opts.from) {
        if (/\.scss$/i.test(opts.from)) {
          e.message +=
            '\nYou tried to parse SCSS with ' +
            'the standard CSS parser; ' +
            'try again with the postcss-scss parser'
        } else if (/\.sass/i.test(opts.from)) {
          e.message +=
            '\nYou tried to parse Sass with ' +
            'the standard CSS parser; ' +
            'try again with the postcss-sass parser'
        } else if (/\.less$/i.test(opts.from)) {
          e.message +=
            '\nYou tried to parse Less with ' +
            'the standard CSS parser; ' +
            'try again with the postcss-less parser'
        }
      }
    }
    throw e
  }

  return parser.root
}

module.exports = parse
parse.default = parse

Container.registerParse(parse)


/***/ }),

/***/ "./node_modules/postcss/lib/parser.js":
/*!********************************************!*\
  !*** ./node_modules/postcss/lib/parser.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Declaration = __webpack_require__(/*! ./declaration */ "./node_modules/postcss/lib/declaration.js")
let tokenizer = __webpack_require__(/*! ./tokenize */ "./node_modules/postcss/lib/tokenize.js")
let Comment = __webpack_require__(/*! ./comment */ "./node_modules/postcss/lib/comment.js")
let AtRule = __webpack_require__(/*! ./at-rule */ "./node_modules/postcss/lib/at-rule.js")
let Root = __webpack_require__(/*! ./root */ "./node_modules/postcss/lib/root.js")
let Rule = __webpack_require__(/*! ./rule */ "./node_modules/postcss/lib/rule.js")

const SAFE_COMMENT_NEIGHBOR = {
  empty: true,
  space: true
}

function findLastWithPosition(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    let token = tokens[i]
    let pos = token[3] || token[2]
    if (pos) return pos
  }
}

class Parser {
  constructor(input) {
    this.input = input

    this.root = new Root()
    this.current = this.root
    this.spaces = ''
    this.semicolon = false
    this.customProperty = false

    this.createTokenizer()
    this.root.source = { input, start: { column: 1, line: 1, offset: 0 } }
  }

  atrule(token) {
    let node = new AtRule()
    node.name = token[1].slice(1)
    if (node.name === '') {
      this.unnamedAtrule(node, token)
    }
    this.init(node, token[2])

    let type
    let prev
    let shift
    let last = false
    let open = false
    let params = []
    let brackets = []

    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken()
      type = token[0]

      if (type === '(' || type === '[') {
        brackets.push(type === '(' ? ')' : ']')
      } else if (type === '{' && brackets.length > 0) {
        brackets.push('}')
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop()
      }

      if (brackets.length === 0) {
        if (type === ';') {
          node.source.end = this.getPosition(token[2])
          node.source.end.offset++
          this.semicolon = true
          break
        } else if (type === '{') {
          open = true
          break
        } else if (type === '}') {
          if (params.length > 0) {
            shift = params.length - 1
            prev = params[shift]
            while (prev && prev[0] === 'space') {
              prev = params[--shift]
            }
            if (prev) {
              node.source.end = this.getPosition(prev[3] || prev[2])
              node.source.end.offset++
            }
          }
          this.end(token)
          break
        } else {
          params.push(token)
        }
      } else {
        params.push(token)
      }

      if (this.tokenizer.endOfFile()) {
        last = true
        break
      }
    }

    node.raws.between = this.spacesAndCommentsFromEnd(params)
    if (params.length) {
      node.raws.afterName = this.spacesAndCommentsFromStart(params)
      this.raw(node, 'params', params)
      if (last) {
        token = params[params.length - 1]
        node.source.end = this.getPosition(token[3] || token[2])
        node.source.end.offset++
        this.spaces = node.raws.between
        node.raws.between = ''
      }
    } else {
      node.raws.afterName = ''
      node.params = ''
    }

    if (open) {
      node.nodes = []
      this.current = node
    }
  }

  checkMissedSemicolon(tokens) {
    let colon = this.colon(tokens)
    if (colon === false) return

    let founded = 0
    let token
    for (let j = colon - 1; j >= 0; j--) {
      token = tokens[j]
      if (token[0] !== 'space') {
        founded += 1
        if (founded === 2) break
      }
    }
    // If the token is a word, e.g. `!important`, `red` or any other valid property's value.
    // Then we need to return the colon after that word token. [3] is the "end" colon of that word.
    // And because we need it after that one we do +1 to get the next one.
    throw this.input.error(
      'Missed semicolon',
      token[0] === 'word' ? token[3] + 1 : token[2]
    )
  }

  colon(tokens) {
    let brackets = 0
    let token, type, prev
    for (let [i, element] of tokens.entries()) {
      token = element
      type = token[0]

      if (type === '(') {
        brackets += 1
      }
      if (type === ')') {
        brackets -= 1
      }
      if (brackets === 0 && type === ':') {
        if (!prev) {
          this.doubleColon(token)
        } else if (prev[0] === 'word' && prev[1] === 'progid') {
          continue
        } else {
          return i
        }
      }

      prev = token
    }
    return false
  }

  comment(token) {
    let node = new Comment()
    this.init(node, token[2])
    node.source.end = this.getPosition(token[3] || token[2])
    node.source.end.offset++

    let text = token[1].slice(2, -2)
    if (/^\s*$/.test(text)) {
      node.text = ''
      node.raws.left = text
      node.raws.right = ''
    } else {
      let match = text.match(/^(\s*)([^]*\S)(\s*)$/)
      node.text = match[2]
      node.raws.left = match[1]
      node.raws.right = match[3]
    }
  }

  createTokenizer() {
    this.tokenizer = tokenizer(this.input)
  }

  decl(tokens, customProperty) {
    let node = new Declaration()
    this.init(node, tokens[0][2])

    let last = tokens[tokens.length - 1]
    if (last[0] === ';') {
      this.semicolon = true
      tokens.pop()
    }

    node.source.end = this.getPosition(
      last[3] || last[2] || findLastWithPosition(tokens)
    )
    node.source.end.offset++

    while (tokens[0][0] !== 'word') {
      if (tokens.length === 1) this.unknownWord(tokens)
      node.raws.before += tokens.shift()[1]
    }
    node.source.start = this.getPosition(tokens[0][2])

    node.prop = ''
    while (tokens.length) {
      let type = tokens[0][0]
      if (type === ':' || type === 'space' || type === 'comment') {
        break
      }
      node.prop += tokens.shift()[1]
    }

    node.raws.between = ''

    let token
    while (tokens.length) {
      token = tokens.shift()

      if (token[0] === ':') {
        node.raws.between += token[1]
        break
      } else {
        if (token[0] === 'word' && /\w/.test(token[1])) {
          this.unknownWord([token])
        }
        node.raws.between += token[1]
      }
    }

    if (node.prop[0] === '_' || node.prop[0] === '*') {
      node.raws.before += node.prop[0]
      node.prop = node.prop.slice(1)
    }

    let firstSpaces = []
    let next
    while (tokens.length) {
      next = tokens[0][0]
      if (next !== 'space' && next !== 'comment') break
      firstSpaces.push(tokens.shift())
    }

    this.precheckMissedSemicolon(tokens)

    for (let i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i]
      if (token[1].toLowerCase() === '!important') {
        node.important = true
        let string = this.stringFrom(tokens, i)
        string = this.spacesFromEnd(tokens) + string
        if (string !== ' !important') node.raws.important = string
        break
      } else if (token[1].toLowerCase() === 'important') {
        let cache = tokens.slice(0)
        let str = ''
        for (let j = i; j > 0; j--) {
          let type = cache[j][0]
          if (str.trim().indexOf('!') === 0 && type !== 'space') {
            break
          }
          str = cache.pop()[1] + str
        }
        if (str.trim().indexOf('!') === 0) {
          node.important = true
          node.raws.important = str
          tokens = cache
        }
      }

      if (token[0] !== 'space' && token[0] !== 'comment') {
        break
      }
    }

    let hasWord = tokens.some(i => i[0] !== 'space' && i[0] !== 'comment')

    if (hasWord) {
      node.raws.between += firstSpaces.map(i => i[1]).join('')
      firstSpaces = []
    }
    this.raw(node, 'value', firstSpaces.concat(tokens), customProperty)

    if (node.value.includes(':') && !customProperty) {
      this.checkMissedSemicolon(tokens)
    }
  }

  doubleColon(token) {
    throw this.input.error(
      'Double colon',
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    )
  }

  emptyRule(token) {
    let node = new Rule()
    this.init(node, token[2])
    node.selector = ''
    node.raws.between = ''
    this.current = node
  }

  end(token) {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon
    }
    this.semicolon = false

    this.current.raws.after = (this.current.raws.after || '') + this.spaces
    this.spaces = ''

    if (this.current.parent) {
      this.current.source.end = this.getPosition(token[2])
      this.current.source.end.offset++
      this.current = this.current.parent
    } else {
      this.unexpectedClose(token)
    }
  }

  endFile() {
    if (this.current.parent) this.unclosedBlock()
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon
    }
    this.current.raws.after = (this.current.raws.after || '') + this.spaces
    this.root.source.end = this.getPosition(this.tokenizer.position())
  }

  freeSemicolon(token) {
    this.spaces += token[1]
    if (this.current.nodes) {
      let prev = this.current.nodes[this.current.nodes.length - 1]
      if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
        prev.raws.ownSemicolon = this.spaces
        this.spaces = ''
      }
    }
  }

  // Helpers

  getPosition(offset) {
    let pos = this.input.fromOffset(offset)
    return {
      column: pos.col,
      line: pos.line,
      offset
    }
  }

  init(node, offset) {
    this.current.push(node)
    node.source = {
      input: this.input,
      start: this.getPosition(offset)
    }
    node.raws.before = this.spaces
    this.spaces = ''
    if (node.type !== 'comment') this.semicolon = false
  }

  other(start) {
    let end = false
    let type = null
    let colon = false
    let bracket = null
    let brackets = []
    let customProperty = start[1].startsWith('--')

    let tokens = []
    let token = start
    while (token) {
      type = token[0]
      tokens.push(token)

      if (type === '(' || type === '[') {
        if (!bracket) bracket = token
        brackets.push(type === '(' ? ')' : ']')
      } else if (customProperty && colon && type === '{') {
        if (!bracket) bracket = token
        brackets.push('}')
      } else if (brackets.length === 0) {
        if (type === ';') {
          if (colon) {
            this.decl(tokens, customProperty)
            return
          } else {
            break
          }
        } else if (type === '{') {
          this.rule(tokens)
          return
        } else if (type === '}') {
          this.tokenizer.back(tokens.pop())
          end = true
          break
        } else if (type === ':') {
          colon = true
        }
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop()
        if (brackets.length === 0) bracket = null
      }

      token = this.tokenizer.nextToken()
    }

    if (this.tokenizer.endOfFile()) end = true
    if (brackets.length > 0) this.unclosedBracket(bracket)

    if (end && colon) {
      if (!customProperty) {
        while (tokens.length) {
          token = tokens[tokens.length - 1][0]
          if (token !== 'space' && token !== 'comment') break
          this.tokenizer.back(tokens.pop())
        }
      }
      this.decl(tokens, customProperty)
    } else {
      this.unknownWord(tokens)
    }
  }

  parse() {
    let token
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken()

      switch (token[0]) {
        case 'space':
          this.spaces += token[1]
          break

        case ';':
          this.freeSemicolon(token)
          break

        case '}':
          this.end(token)
          break

        case 'comment':
          this.comment(token)
          break

        case 'at-word':
          this.atrule(token)
          break

        case '{':
          this.emptyRule(token)
          break

        default:
          this.other(token)
          break
      }
    }
    this.endFile()
  }

  precheckMissedSemicolon(/* tokens */) {
    // Hook for Safe Parser
  }

  raw(node, prop, tokens, customProperty) {
    let token, type
    let length = tokens.length
    let value = ''
    let clean = true
    let next, prev

    for (let i = 0; i < length; i += 1) {
      token = tokens[i]
      type = token[0]
      if (type === 'space' && i === length - 1 && !customProperty) {
        clean = false
      } else if (type === 'comment') {
        prev = tokens[i - 1] ? tokens[i - 1][0] : 'empty'
        next = tokens[i + 1] ? tokens[i + 1][0] : 'empty'
        if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
          if (value.slice(-1) === ',') {
            clean = false
          } else {
            value += token[1]
          }
        } else {
          clean = false
        }
      } else {
        value += token[1]
      }
    }
    if (!clean) {
      let raw = tokens.reduce((all, i) => all + i[1], '')
      node.raws[prop] = { raw, value }
    }
    node[prop] = value
  }

  rule(tokens) {
    tokens.pop()

    let node = new Rule()
    this.init(node, tokens[0][2])

    node.raws.between = this.spacesAndCommentsFromEnd(tokens)
    this.raw(node, 'selector', tokens)
    this.current = node
  }

  spacesAndCommentsFromEnd(tokens) {
    let lastTokenType
    let spaces = ''
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0]
      if (lastTokenType !== 'space' && lastTokenType !== 'comment') break
      spaces = tokens.pop()[1] + spaces
    }
    return spaces
  }

  // Errors

  spacesAndCommentsFromStart(tokens) {
    let next
    let spaces = ''
    while (tokens.length) {
      next = tokens[0][0]
      if (next !== 'space' && next !== 'comment') break
      spaces += tokens.shift()[1]
    }
    return spaces
  }

  spacesFromEnd(tokens) {
    let lastTokenType
    let spaces = ''
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0]
      if (lastTokenType !== 'space') break
      spaces = tokens.pop()[1] + spaces
    }
    return spaces
  }

  stringFrom(tokens, from) {
    let result = ''
    for (let i = from; i < tokens.length; i++) {
      result += tokens[i][1]
    }
    tokens.splice(from, tokens.length - from)
    return result
  }

  unclosedBlock() {
    let pos = this.current.source.start
    throw this.input.error('Unclosed block', pos.line, pos.column)
  }

  unclosedBracket(bracket) {
    throw this.input.error(
      'Unclosed bracket',
      { offset: bracket[2] },
      { offset: bracket[2] + 1 }
    )
  }

  unexpectedClose(token) {
    throw this.input.error(
      'Unexpected }',
      { offset: token[2] },
      { offset: token[2] + 1 }
    )
  }

  unknownWord(tokens) {
    throw this.input.error(
      'Unknown word',
      { offset: tokens[0][2] },
      { offset: tokens[0][2] + tokens[0][1].length }
    )
  }

  unnamedAtrule(node, token) {
    throw this.input.error(
      'At-rule without name',
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    )
  }
}

module.exports = Parser


/***/ }),

/***/ "./node_modules/postcss/lib/postcss.js":
/*!*********************************************!*\
  !*** ./node_modules/postcss/lib/postcss.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let CssSyntaxError = __webpack_require__(/*! ./css-syntax-error */ "./node_modules/postcss/lib/css-syntax-error.js")
let Declaration = __webpack_require__(/*! ./declaration */ "./node_modules/postcss/lib/declaration.js")
let LazyResult = __webpack_require__(/*! ./lazy-result */ "./node_modules/postcss/lib/lazy-result.js")
let Container = __webpack_require__(/*! ./container */ "./node_modules/postcss/lib/container.js")
let Processor = __webpack_require__(/*! ./processor */ "./node_modules/postcss/lib/processor.js")
let stringify = __webpack_require__(/*! ./stringify */ "./node_modules/postcss/lib/stringify.js")
let fromJSON = __webpack_require__(/*! ./fromJSON */ "./node_modules/postcss/lib/fromJSON.js")
let Document = __webpack_require__(/*! ./document */ "./node_modules/postcss/lib/document.js")
let Warning = __webpack_require__(/*! ./warning */ "./node_modules/postcss/lib/warning.js")
let Comment = __webpack_require__(/*! ./comment */ "./node_modules/postcss/lib/comment.js")
let AtRule = __webpack_require__(/*! ./at-rule */ "./node_modules/postcss/lib/at-rule.js")
let Result = __webpack_require__(/*! ./result.js */ "./node_modules/postcss/lib/result.js")
let Input = __webpack_require__(/*! ./input */ "./node_modules/postcss/lib/input.js")
let parse = __webpack_require__(/*! ./parse */ "./node_modules/postcss/lib/parse.js")
let list = __webpack_require__(/*! ./list */ "./node_modules/postcss/lib/list.js")
let Rule = __webpack_require__(/*! ./rule */ "./node_modules/postcss/lib/rule.js")
let Root = __webpack_require__(/*! ./root */ "./node_modules/postcss/lib/root.js")
let Node = __webpack_require__(/*! ./node */ "./node_modules/postcss/lib/node.js")

function postcss(...plugins) {
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0]
  }
  return new Processor(plugins)
}

postcss.plugin = function plugin(name, initializer) {
  let warningPrinted = false
  function creator(...args) {
    // eslint-disable-next-line no-console
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true
      // eslint-disable-next-line no-console
      console.warn(
        name +
          ': postcss.plugin was deprecated. Migration guide:\n' +
          'https://evilmartians.com/chronicles/postcss-8-plugin-migration'
      )
      if (process.env.LANG && process.env.LANG.startsWith('cn')) {
        /* c8 ignore next 7 */
        // eslint-disable-next-line no-console
        console.warn(
          name +
            ': 里面 postcss.plugin 被弃用. 迁移指南:\n' +
            'https://www.w3ctech.com/topic/2226'
        )
      }
    }
    let transformer = initializer(...args)
    transformer.postcssPlugin = name
    transformer.postcssVersion = new Processor().version
    return transformer
  }

  let cache
  Object.defineProperty(creator, 'postcss', {
    get() {
      if (!cache) cache = creator()
      return cache
    }
  })

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts)
  }

  return creator
}

postcss.stringify = stringify
postcss.parse = parse
postcss.fromJSON = fromJSON
postcss.list = list

postcss.comment = defaults => new Comment(defaults)
postcss.atRule = defaults => new AtRule(defaults)
postcss.decl = defaults => new Declaration(defaults)
postcss.rule = defaults => new Rule(defaults)
postcss.root = defaults => new Root(defaults)
postcss.document = defaults => new Document(defaults)

postcss.CssSyntaxError = CssSyntaxError
postcss.Declaration = Declaration
postcss.Container = Container
postcss.Processor = Processor
postcss.Document = Document
postcss.Comment = Comment
postcss.Warning = Warning
postcss.AtRule = AtRule
postcss.Result = Result
postcss.Input = Input
postcss.Rule = Rule
postcss.Root = Root
postcss.Node = Node

LazyResult.registerPostcss(postcss)

module.exports = postcss
postcss.default = postcss


/***/ }),

/***/ "./node_modules/postcss/lib/previous-map.js":
/*!**************************************************!*\
  !*** ./node_modules/postcss/lib/previous-map.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let { SourceMapConsumer, SourceMapGenerator } = __webpack_require__(/*! source-map-js */ "?b8cb")
let { existsSync, readFileSync } = __webpack_require__(/*! fs */ "?03fb")
let { dirname, join } = __webpack_require__(/*! path */ "?6197")

function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, 'base64').toString()
  } else {
    /* c8 ignore next 2 */
    return window.atob(str)
  }
}

class PreviousMap {
  constructor(css, opts) {
    if (opts.map === false) return
    this.loadAnnotation(css)
    this.inline = this.startWith(this.annotation, 'data:')

    let prev = opts.map ? opts.map.prev : undefined
    let text = this.loadMap(opts.from, prev)
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from
    }
    if (this.mapFile) this.root = dirname(this.mapFile)
    if (text) this.text = text
  }

  consumer() {
    if (!this.consumerCache) {
      this.consumerCache = new SourceMapConsumer(this.text)
    }
    return this.consumerCache
  }

  decodeInline(text) {
    let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/
    let baseUri = /^data:application\/json;base64,/
    let charsetUri = /^data:application\/json;charset=utf-?8,/
    let uri = /^data:application\/json,/

    if (charsetUri.test(text) || uri.test(text)) {
      return decodeURIComponent(text.substr(RegExp.lastMatch.length))
    }

    if (baseCharsetUri.test(text) || baseUri.test(text)) {
      return fromBase64(text.substr(RegExp.lastMatch.length))
    }

    let encoding = text.match(/data:application\/json;([^,]+),/)[1]
    throw new Error('Unsupported source map encoding ' + encoding)
  }

  getAnnotationURL(sourceMapString) {
    return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, '').trim()
  }

  isMap(map) {
    if (typeof map !== 'object') return false
    return (
      typeof map.mappings === 'string' ||
      typeof map._mappings === 'string' ||
      Array.isArray(map.sections)
    )
  }

  loadAnnotation(css) {
    let comments = css.match(/\/\*\s*# sourceMappingURL=/gm)
    if (!comments) return

    // sourceMappingURLs from comments, strings, etc.
    let start = css.lastIndexOf(comments.pop())
    let end = css.indexOf('*/', start)

    if (start > -1 && end > -1) {
      // Locate the last sourceMappingURL to avoid pickin
      this.annotation = this.getAnnotationURL(css.substring(start, end))
    }
  }

  loadFile(path) {
    this.root = dirname(path)
    if (existsSync(path)) {
      this.mapFile = path
      return readFileSync(path, 'utf-8').toString().trim()
    }
  }

  loadMap(file, prev) {
    if (prev === false) return false

    if (prev) {
      if (typeof prev === 'string') {
        return prev
      } else if (typeof prev === 'function') {
        let prevPath = prev(file)
        if (prevPath) {
          let map = this.loadFile(prevPath)
          if (!map) {
            throw new Error(
              'Unable to load previous source map: ' + prevPath.toString()
            )
          }
          return map
        }
      } else if (prev instanceof SourceMapConsumer) {
        return SourceMapGenerator.fromSourceMap(prev).toString()
      } else if (prev instanceof SourceMapGenerator) {
        return prev.toString()
      } else if (this.isMap(prev)) {
        return JSON.stringify(prev)
      } else {
        throw new Error(
          'Unsupported previous source map format: ' + prev.toString()
        )
      }
    } else if (this.inline) {
      return this.decodeInline(this.annotation)
    } else if (this.annotation) {
      let map = this.annotation
      if (file) map = join(dirname(file), map)
      return this.loadFile(map)
    }
  }

  startWith(string, start) {
    if (!string) return false
    return string.substr(0, start.length) === start
  }

  withContent() {
    return !!(
      this.consumer().sourcesContent &&
      this.consumer().sourcesContent.length > 0
    )
  }
}

module.exports = PreviousMap
PreviousMap.default = PreviousMap


/***/ }),

/***/ "./node_modules/postcss/lib/processor.js":
/*!***********************************************!*\
  !*** ./node_modules/postcss/lib/processor.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let NoWorkResult = __webpack_require__(/*! ./no-work-result */ "./node_modules/postcss/lib/no-work-result.js")
let LazyResult = __webpack_require__(/*! ./lazy-result */ "./node_modules/postcss/lib/lazy-result.js")
let Document = __webpack_require__(/*! ./document */ "./node_modules/postcss/lib/document.js")
let Root = __webpack_require__(/*! ./root */ "./node_modules/postcss/lib/root.js")

class Processor {
  constructor(plugins = []) {
    this.version = '8.4.31'
    this.plugins = this.normalize(plugins)
  }

  normalize(plugins) {
    let normalized = []
    for (let i of plugins) {
      if (i.postcss === true) {
        i = i()
      } else if (i.postcss) {
        i = i.postcss
      }

      if (typeof i === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins)
      } else if (typeof i === 'object' && i.postcssPlugin) {
        normalized.push(i)
      } else if (typeof i === 'function') {
        normalized.push(i)
      } else if (typeof i === 'object' && (i.parse || i.stringify)) {
        if (true) {
          throw new Error(
            'PostCSS syntaxes cannot be used as plugins. Instead, please use ' +
              'one of the syntax/parser/stringifier options as outlined ' +
              'in your PostCSS runner documentation.'
          )
        }
      } else {
        throw new Error(i + ' is not a PostCSS plugin')
      }
    }
    return normalized
  }

  process(css, opts = {}) {
    if (
      this.plugins.length === 0 &&
      typeof opts.parser === 'undefined' &&
      typeof opts.stringifier === 'undefined' &&
      typeof opts.syntax === 'undefined'
    ) {
      return new NoWorkResult(this, css, opts)
    } else {
      return new LazyResult(this, css, opts)
    }
  }

  use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]))
    return this
  }
}

module.exports = Processor
Processor.default = Processor

Root.registerProcessor(Processor)
Document.registerProcessor(Processor)


/***/ }),

/***/ "./node_modules/postcss/lib/result.js":
/*!********************************************!*\
  !*** ./node_modules/postcss/lib/result.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Warning = __webpack_require__(/*! ./warning */ "./node_modules/postcss/lib/warning.js")

class Result {
  constructor(processor, root, opts) {
    this.processor = processor
    this.messages = []
    this.root = root
    this.opts = opts
    this.css = undefined
    this.map = undefined
  }

  toString() {
    return this.css
  }

  warn(text, opts = {}) {
    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin
      }
    }

    let warning = new Warning(text, opts)
    this.messages.push(warning)

    return warning
  }

  warnings() {
    return this.messages.filter(i => i.type === 'warning')
  }

  get content() {
    return this.css
  }
}

module.exports = Result
Result.default = Result


/***/ }),

/***/ "./node_modules/postcss/lib/root.js":
/*!******************************************!*\
  !*** ./node_modules/postcss/lib/root.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Container = __webpack_require__(/*! ./container */ "./node_modules/postcss/lib/container.js")

let LazyResult, Processor

class Root extends Container {
  constructor(defaults) {
    super(defaults)
    this.type = 'root'
    if (!this.nodes) this.nodes = []
  }

  normalize(child, sample, type) {
    let nodes = super.normalize(child)

    if (sample) {
      if (type === 'prepend') {
        if (this.nodes.length > 1) {
          sample.raws.before = this.nodes[1].raws.before
        } else {
          delete sample.raws.before
        }
      } else if (this.first !== sample) {
        for (let node of nodes) {
          node.raws.before = sample.raws.before
        }
      }
    }

    return nodes
  }

  removeChild(child, ignore) {
    let index = this.index(child)

    if (!ignore && index === 0 && this.nodes.length > 1) {
      this.nodes[1].raws.before = this.nodes[index].raws.before
    }

    return super.removeChild(child)
  }

  toResult(opts = {}) {
    let lazy = new LazyResult(new Processor(), this, opts)
    return lazy.stringify()
  }
}

Root.registerLazyResult = dependant => {
  LazyResult = dependant
}

Root.registerProcessor = dependant => {
  Processor = dependant
}

module.exports = Root
Root.default = Root

Container.registerRoot(Root)


/***/ }),

/***/ "./node_modules/postcss/lib/rule.js":
/*!******************************************!*\
  !*** ./node_modules/postcss/lib/rule.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Container = __webpack_require__(/*! ./container */ "./node_modules/postcss/lib/container.js")
let list = __webpack_require__(/*! ./list */ "./node_modules/postcss/lib/list.js")

class Rule extends Container {
  constructor(defaults) {
    super(defaults)
    this.type = 'rule'
    if (!this.nodes) this.nodes = []
  }

  get selectors() {
    return list.comma(this.selector)
  }

  set selectors(values) {
    let match = this.selector ? this.selector.match(/,\s*/) : null
    let sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen')
    this.selector = values.join(sep)
  }
}

module.exports = Rule
Rule.default = Rule

Container.registerRule(Rule)


/***/ }),

/***/ "./node_modules/postcss/lib/stringifier.js":
/*!*************************************************!*\
  !*** ./node_modules/postcss/lib/stringifier.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


const DEFAULT_RAW = {
  after: '\n',
  beforeClose: '\n',
  beforeComment: '\n',
  beforeDecl: '\n',
  beforeOpen: ' ',
  beforeRule: '\n',
  colon: ': ',
  commentLeft: ' ',
  commentRight: ' ',
  emptyBody: '',
  indent: '    ',
  semicolon: false
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

class Stringifier {
  constructor(builder) {
    this.builder = builder
  }

  atrule(node, semicolon) {
    let name = '@' + node.name
    let params = node.params ? this.rawValue(node, 'params') : ''

    if (typeof node.raws.afterName !== 'undefined') {
      name += node.raws.afterName
    } else if (params) {
      name += ' '
    }

    if (node.nodes) {
      this.block(node, name + params)
    } else {
      let end = (node.raws.between || '') + (semicolon ? ';' : '')
      this.builder(name + params + end, node)
    }
  }

  beforeAfter(node, detect) {
    let value
    if (node.type === 'decl') {
      value = this.raw(node, null, 'beforeDecl')
    } else if (node.type === 'comment') {
      value = this.raw(node, null, 'beforeComment')
    } else if (detect === 'before') {
      value = this.raw(node, null, 'beforeRule')
    } else {
      value = this.raw(node, null, 'beforeClose')
    }

    let buf = node.parent
    let depth = 0
    while (buf && buf.type !== 'root') {
      depth += 1
      buf = buf.parent
    }

    if (value.includes('\n')) {
      let indent = this.raw(node, null, 'indent')
      if (indent.length) {
        for (let step = 0; step < depth; step++) value += indent
      }
    }

    return value
  }

  block(node, start) {
    let between = this.raw(node, 'between', 'beforeOpen')
    this.builder(start + between + '{', node, 'start')

    let after
    if (node.nodes && node.nodes.length) {
      this.body(node)
      after = this.raw(node, 'after')
    } else {
      after = this.raw(node, 'after', 'emptyBody')
    }

    if (after) this.builder(after)
    this.builder('}', node, 'end')
  }

  body(node) {
    let last = node.nodes.length - 1
    while (last > 0) {
      if (node.nodes[last].type !== 'comment') break
      last -= 1
    }

    let semicolon = this.raw(node, 'semicolon')
    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i]
      let before = this.raw(child, 'before')
      if (before) this.builder(before)
      this.stringify(child, last !== i || semicolon)
    }
  }

  comment(node) {
    let left = this.raw(node, 'left', 'commentLeft')
    let right = this.raw(node, 'right', 'commentRight')
    this.builder('/*' + left + node.text + right + '*/', node)
  }

  decl(node, semicolon) {
    let between = this.raw(node, 'between', 'colon')
    let string = node.prop + between + this.rawValue(node, 'value')

    if (node.important) {
      string += node.raws.important || ' !important'
    }

    if (semicolon) string += ';'
    this.builder(string, node)
  }

  document(node) {
    this.body(node)
  }

  raw(node, own, detect) {
    let value
    if (!detect) detect = own

    // Already had
    if (own) {
      value = node.raws[own]
      if (typeof value !== 'undefined') return value
    }

    let parent = node.parent

    if (detect === 'before') {
      // Hack for first rule in CSS
      if (!parent || (parent.type === 'root' && parent.first === node)) {
        return ''
      }

      // `root` nodes in `document` should use only their own raws
      if (parent && parent.type === 'document') {
        return ''
      }
    }

    // Floating child without parent
    if (!parent) return DEFAULT_RAW[detect]

    // Detect style by other nodes
    let root = node.root()
    if (!root.rawCache) root.rawCache = {}
    if (typeof root.rawCache[detect] !== 'undefined') {
      return root.rawCache[detect]
    }

    if (detect === 'before' || detect === 'after') {
      return this.beforeAfter(node, detect)
    } else {
      let method = 'raw' + capitalize(detect)
      if (this[method]) {
        value = this[method](root, node)
      } else {
        root.walk(i => {
          value = i.raws[own]
          if (typeof value !== 'undefined') return false
        })
      }
    }

    if (typeof value === 'undefined') value = DEFAULT_RAW[detect]

    root.rawCache[detect] = value
    return value
  }

  rawBeforeClose(root) {
    let value
    root.walk(i => {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== 'undefined') {
          value = i.raws.after
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '')
          }
          return false
        }
      }
    })
    if (value) value = value.replace(/\S/g, '')
    return value
  }

  rawBeforeComment(root, node) {
    let value
    root.walkComments(i => {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before
        if (value.includes('\n')) {
          value = value.replace(/[^\n]+$/, '')
        }
        return false
      }
    })
    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeDecl')
    } else if (value) {
      value = value.replace(/\S/g, '')
    }
    return value
  }

  rawBeforeDecl(root, node) {
    let value
    root.walkDecls(i => {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before
        if (value.includes('\n')) {
          value = value.replace(/[^\n]+$/, '')
        }
        return false
      }
    })
    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeRule')
    } else if (value) {
      value = value.replace(/\S/g, '')
    }
    return value
  }

  rawBeforeOpen(root) {
    let value
    root.walk(i => {
      if (i.type !== 'decl') {
        value = i.raws.between
        if (typeof value !== 'undefined') return false
      }
    })
    return value
  }

  rawBeforeRule(root) {
    let value
    root.walk(i => {
      if (i.nodes && (i.parent !== root || root.first !== i)) {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '')
          }
          return false
        }
      }
    })
    if (value) value = value.replace(/\S/g, '')
    return value
  }

  rawColon(root) {
    let value
    root.walkDecls(i => {
      if (typeof i.raws.between !== 'undefined') {
        value = i.raws.between.replace(/[^\s:]/g, '')
        return false
      }
    })
    return value
  }

  rawEmptyBody(root) {
    let value
    root.walk(i => {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after
        if (typeof value !== 'undefined') return false
      }
    })
    return value
  }

  rawIndent(root) {
    if (root.raws.indent) return root.raws.indent
    let value
    root.walk(i => {
      let p = i.parent
      if (p && p !== root && p.parent && p.parent === root) {
        if (typeof i.raws.before !== 'undefined') {
          let parts = i.raws.before.split('\n')
          value = parts[parts.length - 1]
          value = value.replace(/\S/g, '')
          return false
        }
      }
    })
    return value
  }

  rawSemicolon(root) {
    let value
    root.walk(i => {
      if (i.nodes && i.nodes.length && i.last.type === 'decl') {
        value = i.raws.semicolon
        if (typeof value !== 'undefined') return false
      }
    })
    return value
  }

  rawValue(node, prop) {
    let value = node[prop]
    let raw = node.raws[prop]
    if (raw && raw.value === value) {
      return raw.raw
    }

    return value
  }

  root(node) {
    this.body(node)
    if (node.raws.after) this.builder(node.raws.after)
  }

  rule(node) {
    this.block(node, this.rawValue(node, 'selector'))
    if (node.raws.ownSemicolon) {
      this.builder(node.raws.ownSemicolon, node, 'end')
    }
  }

  stringify(node, semicolon) {
    /* c8 ignore start */
    if (!this[node.type]) {
      throw new Error(
        'Unknown AST node type ' +
          node.type +
          '. ' +
          'Maybe you need to change PostCSS stringifier.'
      )
    }
    /* c8 ignore stop */
    this[node.type](node, semicolon)
  }
}

module.exports = Stringifier
Stringifier.default = Stringifier


/***/ }),

/***/ "./node_modules/postcss/lib/stringify.js":
/*!***********************************************!*\
  !*** ./node_modules/postcss/lib/stringify.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


let Stringifier = __webpack_require__(/*! ./stringifier */ "./node_modules/postcss/lib/stringifier.js")

function stringify(node, builder) {
  let str = new Stringifier(builder)
  str.stringify(node)
}

module.exports = stringify
stringify.default = stringify


/***/ }),

/***/ "./node_modules/postcss/lib/symbols.js":
/*!*********************************************!*\
  !*** ./node_modules/postcss/lib/symbols.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


module.exports.isClean = Symbol('isClean')

module.exports.my = Symbol('my')


/***/ }),

/***/ "./node_modules/postcss/lib/tokenize.js":
/*!**********************************************!*\
  !*** ./node_modules/postcss/lib/tokenize.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


const SINGLE_QUOTE = "'".charCodeAt(0)
const DOUBLE_QUOTE = '"'.charCodeAt(0)
const BACKSLASH = '\\'.charCodeAt(0)
const SLASH = '/'.charCodeAt(0)
const NEWLINE = '\n'.charCodeAt(0)
const SPACE = ' '.charCodeAt(0)
const FEED = '\f'.charCodeAt(0)
const TAB = '\t'.charCodeAt(0)
const CR = '\r'.charCodeAt(0)
const OPEN_SQUARE = '['.charCodeAt(0)
const CLOSE_SQUARE = ']'.charCodeAt(0)
const OPEN_PARENTHESES = '('.charCodeAt(0)
const CLOSE_PARENTHESES = ')'.charCodeAt(0)
const OPEN_CURLY = '{'.charCodeAt(0)
const CLOSE_CURLY = '}'.charCodeAt(0)
const SEMICOLON = ';'.charCodeAt(0)
const ASTERISK = '*'.charCodeAt(0)
const COLON = ':'.charCodeAt(0)
const AT = '@'.charCodeAt(0)

const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g
const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g
const RE_BAD_BRACKET = /.[\r\n"'(/\\]/
const RE_HEX_ESCAPE = /[\da-f]/i

module.exports = function tokenizer(input, options = {}) {
  let css = input.css.valueOf()
  let ignore = options.ignoreErrors

  let code, next, quote, content, escape
  let escaped, escapePos, prev, n, currentToken

  let length = css.length
  let pos = 0
  let buffer = []
  let returned = []

  function position() {
    return pos
  }

  function unclosed(what) {
    throw input.error('Unclosed ' + what, pos)
  }

  function endOfFile() {
    return returned.length === 0 && pos >= length
  }

  function nextToken(opts) {
    if (returned.length) return returned.pop()
    if (pos >= length) return

    let ignoreUnclosed = opts ? opts.ignoreUnclosed : false

    code = css.charCodeAt(pos)

    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED: {
        next = pos
        do {
          next += 1
          code = css.charCodeAt(next)
        } while (
          code === SPACE ||
          code === NEWLINE ||
          code === TAB ||
          code === CR ||
          code === FEED
        )

        currentToken = ['space', css.slice(pos, next)]
        pos = next - 1
        break
      }

      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES: {
        let controlChar = String.fromCharCode(code)
        currentToken = [controlChar, controlChar, pos]
        break
      }

      case OPEN_PARENTHESES: {
        prev = buffer.length ? buffer.pop()[1] : ''
        n = css.charCodeAt(pos + 1)
        if (
          prev === 'url' &&
          n !== SINGLE_QUOTE &&
          n !== DOUBLE_QUOTE &&
          n !== SPACE &&
          n !== NEWLINE &&
          n !== TAB &&
          n !== FEED &&
          n !== CR
        ) {
          next = pos
          do {
            escaped = false
            next = css.indexOf(')', next + 1)
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos
                break
              } else {
                unclosed('bracket')
              }
            }
            escapePos = next
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1
              escaped = !escaped
            }
          } while (escaped)

          currentToken = ['brackets', css.slice(pos, next + 1), pos, next]

          pos = next
        } else {
          next = css.indexOf(')', pos + 1)
          content = css.slice(pos, next + 1)

          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            currentToken = ['(', '(', pos]
          } else {
            currentToken = ['brackets', content, pos, next]
            pos = next
          }
        }

        break
      }

      case SINGLE_QUOTE:
      case DOUBLE_QUOTE: {
        quote = code === SINGLE_QUOTE ? "'" : '"'
        next = pos
        do {
          escaped = false
          next = css.indexOf(quote, next + 1)
          if (next === -1) {
            if (ignore || ignoreUnclosed) {
              next = pos + 1
              break
            } else {
              unclosed('string')
            }
          }
          escapePos = next
          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1
            escaped = !escaped
          }
        } while (escaped)

        currentToken = ['string', css.slice(pos, next + 1), pos, next]
        pos = next
        break
      }

      case AT: {
        RE_AT_END.lastIndex = pos + 1
        RE_AT_END.test(css)
        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1
        } else {
          next = RE_AT_END.lastIndex - 2
        }

        currentToken = ['at-word', css.slice(pos, next + 1), pos, next]

        pos = next
        break
      }

      case BACKSLASH: {
        next = pos
        escape = true
        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1
          escape = !escape
        }
        code = css.charCodeAt(next + 1)
        if (
          escape &&
          code !== SLASH &&
          code !== SPACE &&
          code !== NEWLINE &&
          code !== TAB &&
          code !== CR &&
          code !== FEED
        ) {
          next += 1
          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
              next += 1
            }
            if (css.charCodeAt(next + 1) === SPACE) {
              next += 1
            }
          }
        }

        currentToken = ['word', css.slice(pos, next + 1), pos, next]

        pos = next
        break
      }

      default: {
        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
          next = css.indexOf('*/', pos + 2) + 1
          if (next === 0) {
            if (ignore || ignoreUnclosed) {
              next = css.length
            } else {
              unclosed('comment')
            }
          }

          currentToken = ['comment', css.slice(pos, next + 1), pos, next]
          pos = next
        } else {
          RE_WORD_END.lastIndex = pos + 1
          RE_WORD_END.test(css)
          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1
          } else {
            next = RE_WORD_END.lastIndex - 2
          }

          currentToken = ['word', css.slice(pos, next + 1), pos, next]
          buffer.push(currentToken)
          pos = next
        }

        break
      }
    }

    pos++
    return currentToken
  }

  function back(token) {
    returned.push(token)
  }

  return {
    back,
    endOfFile,
    nextToken,
    position
  }
}


/***/ }),

/***/ "./node_modules/postcss/lib/warn-once.js":
/*!***********************************************!*\
  !*** ./node_modules/postcss/lib/warn-once.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
/* eslint-disable no-console */


let printed = {}

module.exports = function warnOnce(message) {
  if (printed[message]) return
  printed[message] = true

  if (typeof console !== 'undefined' && console.warn) {
    console.warn(message)
  }
}


/***/ }),

/***/ "./node_modules/postcss/lib/warning.js":
/*!*********************************************!*\
  !*** ./node_modules/postcss/lib/warning.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


class Warning {
  constructor(text, opts = {}) {
    this.type = 'warning'
    this.text = text

    if (opts.node && opts.node.source) {
      let range = opts.node.rangeBy(opts)
      this.line = range.start.line
      this.column = range.start.column
      this.endLine = range.end.line
      this.endColumn = range.end.column
    }

    for (let opt in opts) this[opt] = opts[opt]
  }

  toString() {
    if (this.node) {
      return this.node.error(this.text, {
        index: this.index,
        plugin: this.plugin,
        word: this.word
      }).message
    }

    if (this.plugin) {
      return this.plugin + ': ' + this.text
    }

    return this.text
  }
}

module.exports = Warning
Warning.default = Warning


/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/Content/PlaypenSans-ExtraLight.ttf":
/*!************************************************!*\
  !*** ./src/Content/PlaypenSans-ExtraLight.ttf ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "93777ae17ce3e0be6d06.ttf";

/***/ }),

/***/ "./src/Content/headerF.ttf":
/*!*********************************!*\
  !*** ./src/Content/headerF.ttf ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d4f1fc985a08fa2040bc.ttf";

/***/ }),

/***/ "?5580":
/*!**************************************!*\
  !*** ./terminal-highlight (ignored) ***!
  \**************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?03fb":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6197":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?b8cb":
/*!*******************************!*\
  !*** source-map-js (ignored) ***!
  \*******************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?c717":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/nanoid/non-secure/index.cjs":
/*!**************************************************!*\
  !*** ./node_modules/nanoid/non-secure/index.cjs ***!
  \**************************************************/
/***/ ((module) => {

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = ''
    let i = size
    while (i--) {
      id += alphabet[(Math.random() * alphabet.length) | 0]
    }
    return id
  }
}
let nanoid = (size = 21) => {
  let id = ''
  let i = size
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
}
module.exports = { nanoid, customAlphabet }


/***/ }),

/***/ "./node_modules/postcss/lib/postcss.mjs":
/*!**********************************************!*\
  !*** ./node_modules/postcss/lib/postcss.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtRule: () => (/* binding */ AtRule),
/* harmony export */   Comment: () => (/* binding */ Comment),
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   CssSyntaxError: () => (/* binding */ CssSyntaxError),
/* harmony export */   Declaration: () => (/* binding */ Declaration),
/* harmony export */   Document: () => (/* binding */ Document),
/* harmony export */   Input: () => (/* binding */ Input),
/* harmony export */   Node: () => (/* binding */ Node),
/* harmony export */   Processor: () => (/* binding */ Processor),
/* harmony export */   Result: () => (/* binding */ Result),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   Rule: () => (/* binding */ Rule),
/* harmony export */   Warning: () => (/* binding */ Warning),
/* harmony export */   atRule: () => (/* binding */ atRule),
/* harmony export */   comment: () => (/* binding */ comment),
/* harmony export */   decl: () => (/* binding */ decl),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   document: () => (/* binding */ document),
/* harmony export */   fromJSON: () => (/* binding */ fromJSON),
/* harmony export */   list: () => (/* binding */ list),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   plugin: () => (/* binding */ plugin),
/* harmony export */   root: () => (/* binding */ root),
/* harmony export */   rule: () => (/* binding */ rule),
/* harmony export */   stringify: () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _postcss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./postcss.js */ "./node_modules/postcss/lib/postcss.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_postcss_js__WEBPACK_IMPORTED_MODULE_0__);

const stringify = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.stringify
const fromJSON = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.fromJSON
const plugin = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.plugin
const parse = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.parse
const list = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.list

const document = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.document
const comment = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.comment
const atRule = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.atRule
const rule = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.rule
const decl = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.decl
const root = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.root

const CssSyntaxError = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.CssSyntaxError
const Declaration = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Declaration
const Container = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Container
const Processor = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Processor
const Document = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Document
const Comment = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Comment
const Warning = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Warning
const AtRule = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.AtRule
const Result = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Result
const Input = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Input
const Rule = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Rule
const Root = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Root
const Node = _postcss_js__WEBPACK_IMPORTED_MODULE_0__.Node


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/gameStart.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLGVBQWUsbUNBQW1DO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxzRkFBc0YsWUFBWSxlQUFlLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLEtBQUssT0FBTyxLQUFLLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxNQUFNLEtBQUssS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxLQUFLLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxRQUFRLEtBQUssWUFBWSxhQUFhLE9BQU8sTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFL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Q2pDLFdBQVcsbUJBQU8sQ0FBQyxrREFBUTs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9B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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsWUFBWSxJQUFxQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixPQUFPLEtBQUsscUJBQXFCO0FBQ2hFLDBDQUEwQyx3QkFBd0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLGlCQUFpQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyaUJZOztBQUVaO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFF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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9DQUFvQyxRQUFRO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtCQUFrQjtBQUMxQixRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLCtCQUErQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hXWTs7QUFFWixrQkFBa0IsbUJBQU8sQ0FBQyxnRUFBZTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDVlk7O0FBRVosc0JBQXNCOztBQUV0QixpQkFBaUI7Ozs7Ozs7Ozs7OztBQ0pMOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLHNCQUFzQjtBQUN0QixvQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBLG9DQUFvQyxPQUFPO0FBQzNDLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7O0FBRUEsdURBQXVEO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6UUE7QUFDWTs7QUFFWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1pZOztBQUVaO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0EsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBK0k7QUFDL0k7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQywrSEFBTzs7OztBQUl5RjtBQUNqSCxPQUFPLGlFQUFlLCtIQUFPLElBQUksK0hBQU8sVUFBVSwrSEFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQmU7O0FBRWxDLGlFQUFlLHdDQUFPOztBQUVmLGtCQUFrQixrREFBaUI7QUFDbkMsaUJBQWlCLGlEQUFnQjtBQUNqQyxlQUFlLCtDQUFjO0FBQzdCLGNBQWMsOENBQWE7QUFDM0IsYUFBYSw2Q0FBWTs7QUFFekIsaUJBQWlCLGlEQUFnQjtBQUNqQyxnQkFBZ0IsZ0RBQWU7QUFDL0IsZUFBZSwrQ0FBYztBQUM3QixhQUFhLDZDQUFZO0FBQ3pCLGFBQWEsNkNBQVk7QUFDekIsYUFBYSw2Q0FBWTs7QUFFekIsdUJBQXVCLHVEQUFzQjtBQUM3QyxvQkFBb0Isb0RBQW1CO0FBQ3ZDLGtCQUFrQixrREFBaUI7QUFDbkMsa0JBQWtCLGtEQUFpQjtBQUNuQyxpQkFBaUIsaURBQWdCO0FBQ2pDLGdCQUFnQixnREFBZTtBQUMvQixnQkFBZ0IsZ0RBQWU7QUFDL0IsZUFBZSwrQ0FBYztBQUM3QixlQUFlLCtDQUFjO0FBQzdCLGNBQWMsOENBQWE7QUFDM0IsYUFBYSw2Q0FBWTtBQUN6QixhQUFhLDZDQUFZO0FBQ3pCLGFBQWEsNkNBQVk7Ozs7Ozs7VUM3QmhDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXR0YWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lU3RhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbkdhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmFuZG9taXplQm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwZGF0ZVVJLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGljb2NvbG9ycy9waWNvY29sb3JzLmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2F0LXJ1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvY3NzLXN5bnRheC1lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvZGVjbGFyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2RvY3VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9mcm9tSlNPTi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2xhenktcmVzdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9saXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9tYXAtZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9uby13b3JrLXJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3BhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcG9zdGNzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcHJldmlvdXMtbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9wcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3Jlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcnVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvc3RyaW5naWZpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvc3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvdG9rZW5pemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3dhcm4tb25jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzLmNzcz9hOGQwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL2lnbm9yZWR8L2hvbWUvZnVkby9yZXBvcy9CYXR0bGVzaGlwL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYnwuL3Rlcm1pbmFsLWhpZ2hsaWdodCIsIndlYnBhY2s6Ly8vaWdub3JlZHwvaG9tZS9mdWRvL3JlcG9zL0JhdHRsZXNoaXAvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGlifGZzIiwid2VicGFjazovLy9pZ25vcmVkfC9ob21lL2Z1ZG8vcmVwb3MvQmF0dGxlc2hpcC9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWJ8cGF0aCIsIndlYnBhY2s6Ly8vaWdub3JlZHwvaG9tZS9mdWRvL3JlcG9zL0JhdHRsZXNoaXAvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGlifHNvdXJjZS1tYXAtanMiLCJ3ZWJwYWNrOi8vL2lnbm9yZWR8L2hvbWUvZnVkby9yZXBvcy9CYXR0bGVzaGlwL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYnx1cmwiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9ub24tc2VjdXJlL2luZGV4LmNqcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcG9zdGNzcy5tanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVwZGF0ZVNjcmVlbiBmcm9tIFwiLi91cGRhdGVVSVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdHRhY2tPdGhlcihodW1hbiwgY29tcHV0ZXIsIGNlbGwpIHtcbiAgICBsZXQgcm93ID0gcGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0uc2xpY2UoNCwgNSkpO1xuICAgIGxldCBjb2wgPSBwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5zbGljZSg1KSlcbiAgICBpZiAoY29tcHV0ZXIuYm9hcmRbcm93XVtjb2xdID09IDAgfHwgY29tcHV0ZXIuYm9hcmRbcm93XVtjb2xdID09IDEpIHtcbiAgICAgICAgaHVtYW4uYXR0YWNrKHJvdywgY29sLCBjb21wdXRlcik7XG4gICAgICAgIGNvbXB1dGVyLmFpQXR0YWNrKGh1bWFuKTtcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtYW5CXCIpICE9PSBudWxsKSB7XG4gICAgICAgICAgICB1cGRhdGVTY3JlZW4oaHVtYW4uYm9hcmQsIGNvbXB1dGVyLmJvYXJkKVxuICAgICAgICB9XG4gICAgfVxufSIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChzaGlwTGVuZ3RoKSB7XG4gIGNvbnN0IHNoaXBzID0ge1xuICAgIGxlbmd0aDogc2hpcExlbmd0aCxcbiAgICBnb3RIaXQ6IDAsXG4gICAgc3VuazogZmFsc2UsXG5cbiAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZ290SGl0Kys7XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5sZW5ndGggPT09IHRoaXMuZ290SGl0ID8gdGhpcy5zdW5rID0gdHJ1ZSA6IHRoaXMuc3VuayA9IGZhbHNlXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4geyBzaGlwcyB9O1xufVxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdwb3N0Y3NzJztcbmltcG9ydCBSYW5kb21pemUgZnJvbSAnLi9yYW5kb21pemVCb2FyZCc7XG5pbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBTaGlwIGZyb20gJy4vYmF0dGxlc2hpcCc7XG5pbXBvcnQgZ2FtZVN0YXJ0IGZyb20gJy4vbWFpbkdhbWUnO1xuXG52YXIgc3RhcnRTY3JlZW4gPSBcIlwiICtcbiAgICBcIiAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIj5cIiArXG4gICAgXCIgICAgPGhlYWRlciBjbGFzcz1cXFwiZml4ZWRIZWFkXFxcIj5cIiArXG4gICAgXCIgICAgICA8aDE+QmF0dGxlIFNoaXA8L2gxPlwiICtcbiAgICBcIiAgICAgIDxwPldoZXJlIHRoZSByZWFsIG9uZSBmaWdodHM8L3A+XCIgK1xuICAgIFwiICAgIDwvaGVhZGVyPlwiICtcbiAgICBcIiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmRcXFwiPjwvZGl2PlwiICtcbiAgICBcIiAgICA8bWFpbj5cIiArXG4gICAgXCIgICAgICA8ZGl2IGNsYXNzPVxcXCJjb250cm9sXFxcIj5cIiArXG4gICAgXCIgICAgICA8ZGl2IGNsYXNzPVxcXCJuYW1lQ29udHJvbFxcXCI+XCIgK1xuICAgIFwiICAgICAgICA8cCBjbGFzcz1cXFwiaW5wdXRIZWFkXFxcIj5UeXBlIHlvdXIgTmFtZTwvcD4gPGJyPlwiICtcbiAgICBcIiAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG1heGxlbmd0aD1cXFwiMTJcXFwiIG1pbmxlbmd0aD1cXFwiMVxcXCI+XCIgK1xuICAgIFwiICAgICAgICA8cCBjbGFzcz1cXFwiZXJyb3JcXFwiPjwvcD5cIiArXG4gICAgXCIgICAgICA8L2Rpdj5cIiArXG4gICAgXCIgICAgICA8ZGl2IGNsYXNzPVxcXCJtb3Zlc1xcXCI+XCIgK1xuICAgIFwiICAgICAgICAgICA8cD5Ib2xkIHRoZSBzaGlwIGZyb20gZmlyc3QgdGlsZSBhbmQgZHJhZyBpdCAob25seSBmb3IgcGMgdXNlcnMpPC9wPlwiICtcbiAgICBcIiAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcCBzNVxcXCIgIGRyYWdnYWJsZT10cnVlID48L2Rpdj5cIiArXG4gICAgXCIgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXAgczRcXFwiICBkcmFnZ2FibGU9dHJ1ZSA+PC9kaXY+XCIgK1xuICAgIFwiICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwIHMzXFxcIiAgZHJhZ2dhYmxlPXRydWUgPjwvZGl2PlwiICtcbiAgICBcIiAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcCBzMlxcXCIgIGRyYWdnYWJsZT10cnVlID48L2Rpdj5cIiArXG4gICAgXCIgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXAgczFcXFwiICBkcmFnZ2FibGU9dHJ1ZSA+PC9kaXY+XCIgK1xuICAgIFwiICAgICAgIDwvZGl2PlwiICtcbiAgICBcIiAgICAgICAgICAgPGgzPk9SPC9oMz5cIiArXG4gICAgXCIgICAgICAgPGRpdiBjbGFzcz1cXFwicmFuZG9tXFxcIj5SYW5kb21pemU8L2Rpdj5cIiArXG4gICAgXCIgICAgICAgPGRpdiBjbGFzcz1cXFwicmVzZXRcXFwiPlJlc2V0PC9kaXY+XCIgK1xuICAgIFwiICAgICAgPGRpdj4gXCIgK1xuICAgIFwiICAgIDwvbWFpbj5cIiArXG4gICAgXCIgICAgPGZvb3Rlcj48YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vMTAyMzQ1NjdaXFxcIj48c3Ryb25nPiZjb3B5OyBGdWRvPC9zdHJvbmc+PC9hPjwvZm9vdGVyPlwiICtcbiAgICBcIiAgPC9kaXY+XCIgK1xuICAgIFwiXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVVJKCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpXG4gICAgbGV0IHN0YXJ0Q29vcmRzID0gW11cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5pbm5lckhUTUwgPSBzdGFydFNjcmVlbjtcblxuICAgIC8qKiBNYWtlIEdyaWQgKi9cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoYGNlbGxgLCBgYyR7aX0ke2p9YCk7XG4gICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQnKS5hcHBlbmQoY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRmlsbGluZyB1cCBtb3ZlcyBpbnNpZGUgYmxvY2sgKi9cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnMke2l9YCk7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IGk7IGorKykge1xuICAgICAgICAgICAgbGV0IHBhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAuYXBwZW5kKHBhcnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE5hbWUgVmFsaWRhdGlvbiAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuaW5uZXJIVE1MID0gXCJObyBlbXB0eSBuYW1lcyBhbGxvd2VkIVwiXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5zdHlsZS5ib3hTaGFkb3cgPSBcIi0xcHggMXB4IDE1cHggN3B4IHJnYmEoMjU1LDAsMCwwLjA5KVwiXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5ib3JkZXJDb2xvciA9IFwicmVkXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5zdHlsZS5ib3hTaGFkb3cgPSBcIm5vbmVcIlxuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSBcImJsYWNrXCJcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvKiogUmFuZG9taXplIHBsYWNlbWVudCAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb20nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZS50cmltKCkgIT09ICcnKSB7XG4gICAgICAgICAgICBSYW5kb21pemUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKClcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuaW5uZXJIVE1MID0gXCJObyBlbXB0eSBuYW1lcyBhbGxvd2VkIVwiXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5zdHlsZS5ib3hTaGFkb3cgPSBcIi0xcHggMXB4IDE1cHggN3B4IHJnYmEoMjU1LDAsMCwwLjA5KVwiXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnN0eWxlLmJvcmRlckNvbG9yPSBcInJlZFwiXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLyoqIERyYWcgYW5kIGRyb3AgcGxhY2VtZW50ICovXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZSA9PiB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRTaGlwXCIsIEpTT04uc3RyaW5naWZ5KHsgY2xhc3M6IHNoaXAuY2xhc3NMaXN0WzBdLCBzaXplOiBwYXJzZUludChzaGlwLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwic1wiLCAnJykpIH0pKVxuICAgICAgICB9KVxuICAgIH0pO1xuXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhcnRDb29yZHMuaW5jbHVkZXMoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpKSkge1xuICAgICAgICAgICAgICAgIGxldCBpc1NhZmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNoaXA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7aX1gKSAhPT0gbnVsbCAmJiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtpfWApKS5jb29yZCA9PSBjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2N1cnJlbnRTaGlwfWApKS52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjdXJyZW50U2hpcDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKSkgKyBpfSR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpfWApICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKSkgKyBpfSR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9PT0gXCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NhZmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTYWZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY3VycmVudFNoaXA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSl9JHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSkpICsgaX1gKSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSl9JHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSkpICsgaX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09IFwid2hpdGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FmZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NhZmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNTYWZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY3VycmVudFNoaXA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtjdXJyZW50U2hpcH1gKSkudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSl9JHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSkpICsgaX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSkpICsgaX0ke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gKGN1cnJlbnRTaGlwIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7Y3VycmVudFNoaXB9YCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52ZXJ0aWNhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgc2hpcCR7Y3VycmVudFNoaXB9YCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKX0ke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKSkgKyBpfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSkpICsgaX0ke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAoY3VycmVudFNoaXAgLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtjdXJyZW50U2hpcH1gKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZlcnRpY2FsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgc2hpcCR7Y3VycmVudFNoaXB9YCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gQWxsb3cgZHJvcFxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50U2hpcFwiKSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbEluZGV4ID0gY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heEluZGV4ID0gcGFyc2VJbnQoY2VsbEluZGV4KSArIChkYXRhLnNpemUgLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnNsaWNlKDEsIDIpfSR7bWF4SW5kZXgudG9TdHJpbmcoKX1gKSAhPT0gbnVsbCAmJiBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciAhPT0gJ3JlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JheSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRTaGlwXCIpKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4SW5kZXggPSBwYXJzZUludChjZWxsSW5kZXgpICsgKGRhdGEuc2l6ZSAtIDEpO1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0uc2xpY2UoMSwgMil9JHttYXhJbmRleC50b1N0cmluZygpfWApICE9PSBudWxsICYmIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yICE9PSAncmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRTaGlwXCIpKTtcbiAgICAgICAgICAgIGxldCBpc0Ryb3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBpc1NhZmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKTtcbiAgICAgICAgICAgIGNvbnN0IG1heEluZGV4ID0gcGFyc2VJbnQoY2VsbEluZGV4KSArIChkYXRhLnNpemUgLSAxKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnNpemUgPT0gMSkge1xuICAgICAgICAgICAgICAgIGlzU2FmZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGEuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSl9JHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSkpICsgaX1gKSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAmJiBkYXRhLnNpemUgPT0gMSB8fCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKX0ke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKSkgKyBpfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9PT0gXCJ3aGl0ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBpc1NhZmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgIGlzU2FmZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5zbGljZSgxLCAyKX0ke21heEluZGV4LnRvU3RyaW5nKCl9YCkgIT09IG51bGwgJiYgaXNTYWZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzLnB1c2goY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHNoaXAke2RhdGEuc2l6ZX1gLCBKU09OLnN0cmluZ2lmeSh7IGNvb3JkOiBzdGFydENvb3Jkc1tzdGFydENvb3Jkcy5sZW5ndGggLSAxXSwgdmVydGljYWw6IGZhbHNlIH0pKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDZWxsSW5kZXggPSBwYXJzZUludChjZWxsSW5kZXgpICsgaTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbFRvRmlsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5zbGljZSgxLCAyKX0ke25leHRDZWxsSW5kZXgudG9TdHJpbmcoKX1gKVxuICAgICAgICAgICAgICAgICAgICBjZWxsVG9GaWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgICAgICAgICBpc0Ryb3BwZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRHJvcHBlZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zJHtkYXRhLnNpemV9YCkucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcCcpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVzJykuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbmZpcm1cXFwiPkNvbmZpcm08L2Rpdj5cbiAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZS50cmltKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaHVtYW4gPSBuZXcgUGxheWVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaGlwUk9XQ09PUkQgPSBwYXJzZUludChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtpfWApKS5jb29yZC5zbGljZSgwLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNoaXBDT0xDT09SRCA9IHBhcnNlSW50KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2l9YCkpLmNvb3JkLnNsaWNlKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNWZXJ0aWNhbCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2l9YCkpLnZlcnRpY2FsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFNoaXAgPSBuZXcgU2hpcChpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtpfWApKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodW1hbi5ib2FyZFNoaXAoc2hpcFJPV0NPT1JELCBzaGlwQ09MQ09PUkQsIHNlbGVjdGVkU2hpcCwgaXNWZXJ0aWNhbClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoJ0NvbXB1dGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlci5haUJvYXJkU2hpcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lU3RhcnQoaHVtYW4gLCBjb21wdXRlcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuaW5uZXJIVE1MID0gXCJObyBlbXB0eSBuYW1lcyBhbGxvd2VkIVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5zdHlsZS5ib3hTaGFkb3cgPSBcIi0xcHggMXB4IDE1cHggN3B4IHJnYmEoMjU1LDAsMCwwLjA5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZWRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKClcbiAgICAgICAgbWFrZVVJKCk7XG4gICAgfSlcbn1cbm1ha2VVSSgpIiwiaW1wb3J0IG1ha2VVSSBmcm9tIFwiLi9nYW1lU3RhcnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZUJvYXJkKCkge1xuICAgIGxldCBib2FyZCA9IG5ldyBBcnJheSgxMCkuZmlsbCgwKS5tYXAoKCkgPT4gbmV3IEFycmF5KDEwKS5maWxsKDApKTtcblxuICAgIC8qKiBwdWJsaWMgZnVuY3Rpb24gdG8gcmV0dXJuIGJvYXJkICovXG4gICAgbGV0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgICBsZXQgc2hpcHNCb2FyZGVkID0gW107XG5cbiAgICAvKiogUGxhY2Ugc2hpcCB2ZXJ0aWNhbGx5IG9uIGJvYXJkICwgYW5kIGNhbGwgYmFja3RyYWNraW5nIGlmIHNoaXAgYWxyZWFkeSBleGlzdHMgb24gdGhlIHBhdGggKi9cbiAgICBsZXQgdmVydGljYWxQbGFjZSA9IChzaGlwTGVuZ3RoLCByb3csIGNvbCwgc2hpcCkgPT4ge1xuICAgICAgICBsZXQgdGVtcEJhY2tUcmFjaztcbiAgICAgICAgbGV0IGVuZGluZyA9IDA7XG4gICAgICAgIGxldCBjb29yZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3cgKyBpXVtjb2xdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IDE7XG4gICAgICAgICAgICAgICAgZW5kaW5nKytcbiAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbcm93ICsgaSwgY29sXSlcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcEJhY2tUcmFjayA9IGkgLSAxO1xuICAgICAgICAgICAgICAgIGJhY2tUcmFja1ZlcnRpY2FsKHRlbXBCYWNrVHJhY2ssIHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5kaW5nID09PSBzaGlwTGVuZ3RoICYmIGNvb3Jkcy5sZW5ndGggPT09IHNoaXBMZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXBzQm9hcmRlZC5wdXNoKHsgc2hpcDogc2hpcC5zaGlwcywgY29vcmRpbmF0ZXM6IGNvb3JkcyB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFBsYWNlIHNoaXAgaG9yaXpvbnRhbGx5IG9uIGJvYXJkICwgYW5kIGNhbGwgYmFja3RyYWNraW5nIGlmIHNoaXAgYWxyZWFkeSBleGlzdHMgb24gdGhlIHBhdGggKi9cbiAgICBsZXQgaG9yaXpvbnRhbFBsYWNlID0gKHNoaXBMZW5ndGgsIHJvdywgY29sLCBzaGlwKSA9PiB7XG4gICAgICAgIGxldCB0ZW1wQmFja1RyYWNrO1xuICAgICAgICBsZXQgZW5kaW5nID0gMDtcbiAgICAgICAgbGV0IGNvb3JkcyA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2wgKyBpXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSAxO1xuICAgICAgICAgICAgICAgIGVuZGluZysrXG4gICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW3JvdywgY29sICsgaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZW1wQmFja1RyYWNrID0gaSAtIDE7XG4gICAgICAgICAgICAgICAgYmFja1RyYWNrSG9yaXpvbnRhbCh0ZW1wQmFja1RyYWNrLCByb3csIGNvbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZGluZyA9PT0gc2hpcExlbmd0aCAmJiBjb29yZHMubGVuZ3RoID09PSBzaGlwTGVuZ3RoKSB7XG4gICAgICAgICAgICBzaGlwc0JvYXJkZWQucHVzaCh7IHNoaXA6IHNoaXAuc2hpcHMsIGNvb3JkaW5hdGVzOiBjb29yZHMgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVja3MgaWYgdGhlIHBvc2l0aW9uIGlzIHZhbGlkIG9yIG5vdCBhbmQgdGhlbiBiYXNlZCBvbiB2ZXJ0aWNhbCBwYXJhbWV0ZXIgdmFsdWUgLCBjYWxsIHRoZSBzdWl0YWJsZSBmdW5jdGlvbiB0byBwbGFjZSBpdCAqL1xuICAgIGxldCBQbGFjZVNoaXAgPSAocm93LCBjb2wsIHNoaXAsIHZlcnRpY2FsID0gdHJ1ZSkgPT4ge1xuICAgICAgICBpZiAoYm9hcmRbcm93XSAhPT0gdW5kZWZpbmVkICYmIGJvYXJkW3Jvd11bY29sXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodmVydGljYWwgJiYgYm9hcmRbcm93ICsgKHNoaXAuc2hpcHMubGVuZ3RoIC0gMSldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbFBsYWNlKHNoaXAuc2hpcHMubGVuZ3RoLCByb3csIGNvbCwgc2hpcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2ZXJ0aWNhbCAmJiBib2FyZFtyb3ddW2NvbCArIChzaGlwLnNoaXBzLmxlbmd0aCAtIDEpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbFBsYWNlKHNoaXAuc2hpcHMubGVuZ3RoLCByb3csIGNvbCwgc2hpcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJvdGggb2YgdGhlIGJhY2tUcmFjayBkb3duIGhlcmUgLCB0YWtlcyB0aGUgaW5kZXggdmFsdWUgZnJvbSB3aGVyZSBhZnRlcndhcmQgYW5vdGhlciBzaGlwIHdhcyB0aGVyZSB0aGVuIHN0YXJ0IGJhY2t0cmFja2luZ1xuICAgICAqIHVudGlsIGluZGV4IGlzIDAgYW5kIGJvYXJkIGlzIHJlc2V0IHRvIHdoYXQgaXRzIHByZXZpb3VzIHN0YXRlIHdhc1xuICAgICAqL1xuICAgIGxldCBiYWNrVHJhY2tWZXJ0aWNhbCA9IChpbmRleCwgcm93LCBjb2wpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYmFja1RyYWNrSG9yaXpvbnRhbCA9IChpbmRleCwgcm93LCBjb2wpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGxldCByZWNpZXZlQXR0YWNrID0gKHJvdywgY29sICwgZW5lbXlCb2FyZCkgPT4ge1xuXG4gICAgICAgIC8qKiBDaGVjayBpZiBpdHMgYSB2YWxpZCBjb29yZGluYXRlIHRvIGhpdCBhbmQgbm90IGJlaW5nIGhpdCBiZWZvcmUgKi9cbiAgICAgICAgaWYgKGJvYXJkW3Jvd10gIT09IHVuZGVmaW5lZCAmJiBib2FyZFtyb3ddW2NvbF0gIT09IHVuZGVmaW5lZCAmJiBib2FyZFtyb3ddW2NvbF0gIT09ICdoaXQnKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbcm93XVtjb2xdID0gJ2hpdCc7XG4gICAgICAgICAgICAgICAgbGV0IGhpdFNoaXAgPSBzaGlwc0JvYXJkZWQuZmlsdGVyKChzaGlwKSA9PiBzaGlwLmNvb3JkaW5hdGVzLnNvbWUoY29vcmQgPT4gY29vcmRbMF0gPT09IHJvdyAmJiBjb29yZFsxXSA9PT0gY29sKSk7XG4gICAgICAgICAgICAgICAgaGl0U2hpcFswXS5zaGlwLmhpdCgpO1xuICAgICAgICAgICAgICAgIGhpdFNoaXBbMF0uc2hpcC5pc1N1bmsoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVHYW1lKGhpdFNoaXBbMF0uc2hpcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBib2FyZFtyb3ddW2NvbF0gPSAnbWlzcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW5kR2FtZShlbmVteUJvYXJkKVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGUgdGhlIGJvYXJkZWQgc2hpcHMgKi9cbiAgICBsZXQgdXBkYXRlR2FtZSA9IChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLnN1bmspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHNoaXBzQm9hcmRlZC5maW5kSW5kZXgoKHMpID0+IHNoaXAgPT09IHMuc2hpcClcbiAgICAgICAgICAgIHNoaXBzQm9hcmRlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVuZCBnYW1lIGlmIGdhbWVib2FyZCdzIGFsbCBib2FyZGVkIHNoaXBzIGFyZSBkb3duICovXG4gICAgbGV0IGVuZEdhbWUgPSAoZW5lbXlCb2FyZCkgPT4ge1xuICAgICAgICBpZiAoc2hpcHNCb2FyZGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBcIllvdVwiXG4gICAgICAgICAgICBpZihlbmVteUJvYXJkLm5hbWUgIT09IFwiQ29tcHV0ZXJcIil7XG4gICAgICAgICAgICAgICAgbmFtZSA9IFwiQ29tcHV0ZXJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxoMSBjbGFzcz1cXFwiYW5ub3VuY2VtZW50XFxcIj4ke25hbWV9IHdvbiBhZ2FpbnN0ICR7ZW5lbXlCb2FyZC5uYW1lfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwbGF5QWdhaW5cXFwiPlBsYXkgQWdhaW48L2Rpdj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheUFnYWluJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snICwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1ha2VVSSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBcIlN0aWxsIG9uZ29pbmdcIlxuICAgIH1cbiAgICByZXR1cm4geyBQbGFjZVNoaXAsIGdldEJvYXJkLCByZWNpZXZlQXR0YWNrLCBzaGlwc0JvYXJkZWQgfVxufSIsImltcG9ydCBhdHRhY2tPdGhlciBmcm9tIFwiLi9hdHRhY2tcIjtcblxudmFyIHN0YXJ0U2NyZWVuID0gXCJcIiArXG4gICAgXCIgIDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XCIgK1xuICAgIFwiICAgIDxoZWFkZXIgY2xhc3M9XFxcImZpeGVkSGVhZFxcXCI+XCIgK1xuICAgIFwiICAgICAgPGgxPkJhdHRsZSBTaGlwPC9oMT5cIiArXG4gICAgXCIgICAgICA8cD5XaGVyZSB0aGUgcmVhbCBvbmUgZmlnaHRzPC9wPlwiICtcbiAgICBcIiAgICA8L2hlYWRlcj5cIiArXG4gICAgXCIgICAgICA8cD5Zb3U8L3A+XCIgK1xuICAgIFwiICAgICAgPGRpdiBjbGFzcz1cXFwiaHVtYW5CIGJvYXJkXFxcIj48L2Rpdj5cIiArXG4gICAgXCIgICAgICA8cD5PcHBvbmVudDwvcD5cIiArXG4gICAgXCIgICAgICA8ZGl2IGNsYXNzPVxcXCJBSUIgYm9hcmRcXFwiPjwvZGl2PlwiICtcbiAgICBcIiAgICA8Zm9vdGVyPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS8xMDIzNDU2N1pcXFwiPjxzdHJvbmc+JmNvcHk7IEZ1ZG88L3N0cm9uZz48L2E+PC9mb290ZXI+XCIgK1xuICAgIFwiICA8L2Rpdj5cIiArXG4gICAgXCJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZVN0YXJ0KGh1bWFuLCBjb21wdXRlcikge1xuICAgIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmlubmVySFRNTCA9IHN0YXJ0U2NyZWVuO1xuXG4gICAgLyoqIE1ha2UgR3JpZCAqL1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZCcpLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoYGNlbGxgLCBgY2VsbCR7aX0ke2p9YCk7XG4gICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiKVxuICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZChjZWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0ZW1wQ29vcmRzID0gaHVtYW4uZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubWFwKChzaGlwKSA9PiBzaGlwLmNvb3JkaW5hdGVzKTtcbiAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcENvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBpOyBqKyspIHtcbiAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaCh0ZW1wQ29vcmRzW2ldW2pdKVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBodW1hbkIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWFuQlwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgaHVtYW5CLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsJHtzaGlwQ29vcmRzW2ldWzBdfSR7c2hpcENvb3Jkc1tpXVsxXX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuQUlCXCIpLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyAsIGUgPT4ge1xuICAgICAgICAgICAgYXR0YWNrT3RoZXIoaHVtYW4gLCBjb21wdXRlciAsIGNlbGwpO1xuICAgICAgICB9KVxuICAgIH0pXG59IiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxheWVyKHBsYXllck5hbWUsIGlzQUkgPSB0cnVlKSB7XG4gICAgbGV0IG5hbWUgPSBwbGF5ZXJOYW1lO1xuICAgIGxldCBnYW1lQm9hcmRGYWN0ID0gbmV3IEdhbWVCb2FyZCgpO1xuICAgIGxldCBib2FyZCA9IGdhbWVCb2FyZEZhY3QuZ2V0Qm9hcmQoKTtcblxuICAgIGxldCBib2FyZFNoaXAgPSAocm93LCBjb2wsIHNoaXAsIHZlcnRpY2FsID0gdHJ1ZSkgPT4ge1xuICAgICAgICBpZiAoZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoICE9PSA1KSB7XG4gICAgICAgICAgICBnYW1lQm9hcmRGYWN0LlBsYWNlU2hpcChyb3csIGNvbCwgc2hpcCwgdmVydGljYWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFpQm9hcmRTaGlwID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNBSSkge1xuICAgICAgICAgICAgd2hpbGUgKGdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKGdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgICAgIGxldCB2ZXJ0aWNhbCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XG4gICAgICAgICAgICAgICAgbGV0IGlzVmFsaWRTcG90ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoIWlzVmFsaWRTcG90KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVCb2FyZEZhY3QuUGxhY2VTaGlwKHJvdywgY29sLCBzaGlwLCB2ZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkU3BvdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYWlBdHRhY2sgPSAoZW5lbXlCb2FyZCkgPT4ge1xuICAgICAgICBpZiAoaXNBSSkge1xuICAgICAgICAgICAgaWYgKGVuZW15Qm9hcmQuZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoIDw9IDUgJiYgZW5lbXlCb2FyZC5nYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGxldCBlQm9hcmQgPSBlbmVteUJvYXJkLmdhbWVCb2FyZEZhY3QuZ2V0Qm9hcmQoKTtcbiAgICAgICAgICAgICAgICBsZXQgaXNWYWxpZFNwb3QgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHdoaWxlICghaXNWYWxpZFNwb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICAgICAgICAgICAgICAgIGlmIChlQm9hcmRbcm93XVtjb2xdID09IDAgfHwgZUJvYXJkW3Jvd11bY29sXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkU3BvdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteUJvYXJkLmdhbWVCb2FyZEZhY3QucmVjaWV2ZUF0dGFjayhyb3csIGNvbCAsIGVuZW15Qm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJhbmRvbSA9ICgpID0+IHtcbiAgICAgICAgd2hpbGUgKGdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgIGxldCBzaGlwID0gbmV3IFNoaXAoZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICBsZXQgdmVydGljYWwgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xuICAgICAgICAgICAgbGV0IGlzVmFsaWRTcG90ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHdoaWxlICghaXNWYWxpZFNwb3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lQm9hcmRGYWN0LlBsYWNlU2hpcChyb3csIGNvbCwgc2hpcCwgdmVydGljYWwpO1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkU3BvdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGF0dGFjayA9IChyb3csIGNvbCwgZW5lbXlCb2FyZCkgPT4ge1xuICAgICAgICBpZiAoZW5lbXlCb2FyZC5nYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggPD0gNSAmJiBlbmVteUJvYXJkLmdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBlbmVteUJvYXJkLmdhbWVCb2FyZEZhY3QucmVjaWV2ZUF0dGFjayhyb3csIGNvbCAsIGVuZW15Qm9hcmQpO1xuICAgICAgICAgICAgcmV0dXJuIFwiQWxsIGdvb2Qgb24gd2VzdGVybiBmcm9udFwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJQbGFjZSBhbGwgdGhlIHNoaXBzIG9uIHlvdXIgYm9hcmQgYmVmb3JlIHN0YXJ0aW5nIHRoZSBhdHRhY2tcIlxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGJvYXJkU2hpcCwgYWlCb2FyZFNoaXAsIGF0dGFjaywgYWlBdHRhY2sscmFuZG9tLCBuYW1lLCBib2FyZCwgZ2FtZUJvYXJkRmFjdCB9XG59ICIsImltcG9ydCBnYW1lU3RhcnQgZnJvbSBcIi4vbWFpbkdhbWVcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJhbmRvbWl6ZShuYW1lKXtcbiAgICBsZXQgaHVtYW4gPSBuZXcgUGxheWVyKG5hbWUgLCBmYWxzZSk7XG4gICAgaHVtYW4ucmFuZG9tKCk7XG5cbiAgICBsZXQgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdDb21wdXRlcicgLCB0cnVlKTtcbiAgICBjb21wdXRlci5haUJvYXJkU2hpcCgpO1xuICAgIGdhbWVTdGFydChodW1hbiAsIGNvbXB1dGVyKVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZVNjcmVlbihodW1hbkIgLCBhaUIpe1xuICAgIGxldCBoVUkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtYW5CJyk7XG4gICAgbGV0IGFVSSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BSUInKVxuICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgMTA7IGkrKyl7XG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgICAgIGlmKGh1bWFuQltpXVtqXSA9PSBcImhpdFwiKXtcbiAgICAgICAgICAgICAgICBoVUkucXVlcnlTZWxlY3RvcihgLmNlbGwke2l9JHtqfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRjb3JhbFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGh1bWFuQltpXVtqXSA9PSAxKXtcbiAgICAgICAgICAgICAgICBoVUkucXVlcnlTZWxlY3RvcihgLmNlbGwke2l9JHtqfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoaHVtYW5CW2ldW2pdID09IFwibWlzc1wiKXtcbiAgICAgICAgICAgICAgICBoVUkucXVlcnlTZWxlY3RvcihgLmNlbGwke2l9JHtqfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWlCW2ldW2pdID09IFwiaGl0XCIpe1xuICAgICAgICAgICAgICAgIGFVSS5xdWVyeVNlbGVjdG9yKGAuY2VsbCR7aX0ke2p9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGNvcmFsXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYWlCW2ldW2pdID09IFwibWlzc1wiKXtcbiAgICAgICAgICAgICAgICBhVUkucXVlcnlTZWxlY3RvcihgLmNlbGwke2l9JHtqfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL0NvbnRlbnQvaGVhZGVyRi50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL0NvbnRlbnQvUGxheXBlblNhbnMtRXh0cmFMaWdodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAdGFpbHdpbmQgYmFzZTtcbkB0YWlsd2luZCBjb21wb25lbnRzO1xuQHRhaWx3aW5kIHV0aWxpdGllcztcblxuXG5AZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTogXCJoZWFkZXJGXCI7XG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG59XG5cbkBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIm5vcm1hbEZcIjtcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcbn1cblxuQGtleWZyYW1lcyBoZWFkZXIge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yOTBweCk7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuXG4gICAgMjUlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMTcuNXB4KTtcbiAgICAgICAgb3BhY2l0eTogMC4yNTtcbiAgICB9XG5cbiAgICA1MCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE0NXB4KTtcbiAgICAgICAgb3BhY2l0eTogMC41O1xuICAgIH1cblxuICAgIDc1JSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzBweCk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG59XG5cblxuQGtleWZyYW1lcyBncmlkIHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTBweCk7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG59XG5cbkBrZXlmcmFtZXMgbWFpbiB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwcHgpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxufVxuXG4qIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGZvbnQtZmFtaWx5OiBcIm5vcm1hbEZcIjtcbiAgICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5jb250YWluZXIge1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGZpdC1jb250ZW50KDE1JSkgZml0LWNvbnRlbnQoNTAlKSBmaXQtY29udGVudCgyMCUpIGF1dG87XG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIyNSwgNDMsIDEzNywgMC4yMSk7XG59XG5cbmgxIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgYW5pbWF0aW9uOiBoZWFkZXIgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcbn1cblxuaDE+cCB7XG4gICAgYW5pbWF0aW9uOiBoZWFkZXIgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcbn1cblxuaGVhZGVyIHtcbiAgICBhbmltYXRpb246IGhlYWRlciA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXI6IDFweCByaWRnZSBibGFjaztcbiAgICBib3JkZXItdG9wOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBmb250LWZhbWlseTogXCJub3JtYWxGXCI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg5MiwgNTksIDE5NywgMC4yMik7XG4gICAgbWF4LWhlaWdodDogMjkwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbm1haW4ge1xuICAgIGFuaW1hdGlvbjogbWFpbiA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5jb250cm9se1xuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ib2FyZCB7XG4gICAgd2lkdGg6IDI5MHB4O1xuICAgIGhlaWdodDogMjkwcHg7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjlweCk7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDI5cHgpO1xuICAgIGFuaW1hdGlvbjogZ3JpZCA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xufVxuXG4uY2VsbCB7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgbGluZWFyO1xuICAgIG91dGxpbmU6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLm1vdmVzIHtcbiAgICBtYXJnaW46IDA7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoYXV0by1maWxsLCBmaXQtY29udGVudCg3NXB4KSk7XG4gICAgZ2FwOiA1cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgIGJvcmRlci10b3A6IDFweCByaWRnZSBibGFjaztcbiAgICBwYWRkaW5nOiA1cHg7XG59XG5cbi5tb3Zlcz5kaXY6bm90KC5jb25maXJtKSB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgMjlweCk7XG4gICAgZ2FwOiAwO1xuICAgIHotaW5kZXg6IDI7XG4gICAgY3Vyc29yOiBtb3ZlO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjRzIGxpbmVhcjtcbiAgICAtd2Via2l0LXVzZXItZHJhZzogZWxlbWVudDtcbiAgICBoZWlnaHQ6IDI5cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uczUge1xuICAgIHdpZHRoOiAxNDVweDtcbn1cblxuLnM0IHtcbiAgICB3aWR0aDogMTE2cHg7XG59XG5cbi5zMyB7XG4gICAgd2lkdGg6IDg3cHg7XG59XG5cbi5zMiB7XG4gICAgd2lkdGg6IDU4cHg7XG59XG5cbi5zMSB7XG4gICAgd2lkdGg6IDI5cHg7XG59XG5cblxuLm1vdmVzPmRpdj5kaXYge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbiAgICBvdXRsaW5lOiAxcHggcmlkZ2UgYmxhY2s7XG59XG5cblxuZm9vdGVyIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYW5pbWF0aW9uOiBtYWluIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XG59XG5cbi5yYW5kb20sXG4ucmVzZXQge1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gICAgcGFkZGluZzogNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtdmFyaWFudDogbm9ybWFsO1xuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcbn1cblxuLnJhbmRvbSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnJhbmRvbTpob3Zlcixcbi5yZXNldDpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogIzVENUQ1RDtcbn1cblxuLnJhbmRvbTphY3RpdmUsXG4ucmVzZXQ6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAjMzczNzM3O1xufVxuXG5pbnB1dCB7XG4gICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgICB3aWR0aDogMjkwcHg7XG59XG5cbi5pbnB1dEhlYWQge1xuICAgIG1hcmdpbjogMTBweDtcbn1cblxuLmVycm9yIHtcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBjb2xvcjogcmVkO1xuICAgIHBhZGRpbmc6IDNweDtcbn1cblxuLmh1bWFuQiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuLkFJQj5kaXYge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cyBsaW5lYXI7XG59XG5cbi5BSUI+ZGl2OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMilcbn1cblxuLnBsYXlBZ2Fpbixcbi5jb25maXJtIHtcbiAgICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICBsaW5lLWhlaWdodDogMjNweDtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgZm9udC12YXJpYW50OiBub3JtYWw7XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2IoMTY0LCAxNiwgMTYpIDAlLCByZ2IoMjAzLCAwLCAwKSA1MCUsIHJnYigxMTcsIDAsIDApIDEwMCUpO1xuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xOSkgNXB4IDVweCAxNXB4IDVweDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMjgsIDExMCwgMTY0KTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucGxheUFnYWluOmhvdmVyLFxuLmNvbmZpcm06aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICNBNDEwMTA7XG59XG5cbi5wbGF5QWdhaW46YWN0aXZlLFxuLmNvbmZpcm06YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAjNzUwMDAwO1xufVxuXG4uY29uZmlybSB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIGFuaW1hdGlvbjogZ3JpZCA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xuXG59XG5cbmEge1xuICAgIGNvbG9yOiByZWQ7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuaGVhZGVyK3AsXG4uaHVtYW5CK3Age1xuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG59XG5cbi5hbm5vdW5jZW1lbnQge1xuICAgIGdyaWQtYXJlYTogMi8xLzMvMztcbn1cblxuLnBsYXlBZ2FpbiB7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICBncmlkLWFyZWE6IDMvMS80LzM7XG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo5MzZweCkge1xuICAgIC5jb250YWluZXIge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogZml0LWNvbnRlbnQoMjkwcHgpIGF1dG87XG4gICAgICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgaGVhZGVyIHtcbiAgICAgICAgZ3JpZC1hcmVhOiAxLzEvMi8zO1xuICAgIH1cblxuICAgIC5odW1hbkIge1xuICAgICAgICBncmlkLWFyZWE6IDIvMS8zLzI7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICAuQUlCIHtcbiAgICAgICAgZ3JpZC1hcmVhOiAyLzIvMy8zO1xuICAgIH1cblxuICAgIGhlYWRlcitwLFxuICAgIC5odW1hbkIrcCB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZm9udC1zaXplOiB4eC1sYXJnZTtcbiAgICAgICAgYWxpZ24tc2VsZjogc3RhcnQ7XG4gICAgICAgIHBhZGRpbmc6IDZweDtcbiAgICB9XG5cbiAgICAuaHVtYW5CIHtcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LWVuZDtcbiAgICB9XG5cbiAgICAuQUlCIHtcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xuICAgIH1cblxuICAgIC5odW1hbkIrcCB7XG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDQ1cHg7XG4gICAgfVxuXG4gICAgaGVhZGVyK3Age1xuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtZW5kO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDQ1cHg7XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MzBweCkge1xuICAgIC5hbm5vdW5jZW1lbnQge1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsY0FBYztBQUNkLG9CQUFvQjtBQUNwQixtQkFBbUI7OztBQUduQjtJQUNJLHNCQUFzQjtJQUN0Qiw0Q0FBK0I7QUFDbkM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsNENBQThDO0FBQ2xEOztBQUVBO0lBQ0k7UUFDSSw2QkFBNkI7UUFDN0IsVUFBVTtJQUNkOztJQUVBO1FBQ0ksK0JBQStCO1FBQy9CLGFBQWE7SUFDakI7O0lBRUE7UUFDSSw2QkFBNkI7UUFDN0IsWUFBWTtJQUNoQjs7SUFFQTtRQUNJLDRCQUE0QjtJQUNoQzs7SUFFQTtRQUNJLHdCQUF3QjtRQUN4QixVQUFVO0lBQ2Q7QUFDSjs7O0FBR0E7SUFDSTtRQUNJLDRCQUE0QjtRQUM1QixVQUFVO0lBQ2Q7O0lBRUE7UUFDSSx3QkFBd0I7UUFDeEIsVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLDRCQUE0QjtRQUM1QixVQUFVO0lBQ2Q7O0lBRUE7UUFDSSx3QkFBd0I7UUFDeEIsVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLFlBQVk7SUFDWixhQUFhO0lBQ2IsMkVBQTJFO0lBQzNFLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCwwQ0FBMEM7QUFDOUM7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsaURBQWlEO0FBQ3JEOztBQUVBO0lBQ0ksaURBQWlEO0FBQ3JE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O0FBQzFCOztBQUVBO0lBQ0k7UUFDSSw4QkFBOEI7UUFDOUIsMkNBQTJDO1FBQzNDLG1CQUFtQjtJQUN2Qjs7SUFFQTtRQUNJLGtCQUFrQjtJQUN0Qjs7SUFFQTtRQUNJLGtCQUFrQjtRQUNsQixTQUFTO0lBQ2I7O0lBRUE7UUFDSSxrQkFBa0I7SUFDdEI7O0lBRUE7O1FBRUksa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsWUFBWTtJQUNoQjs7SUFFQTtRQUNJLHNCQUFzQjtJQUMxQjs7SUFFQTtRQUNJLHdCQUF3QjtJQUM1Qjs7SUFFQTtRQUNJLHdCQUF3QjtRQUN4QixpQkFBaUI7SUFDckI7O0lBRUE7UUFDSSxzQkFBc0I7UUFDdEIsa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7SUFDbkI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAdGFpbHdpbmQgYmFzZTtcXG5AdGFpbHdpbmQgY29tcG9uZW50cztcXG5AdGFpbHdpbmQgdXRpbGl0aWVzO1xcblxcblxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogXFxcImhlYWRlckZcXFwiO1xcbiAgICBzcmM6IHVybCguL0NvbnRlbnQvaGVhZGVyRi50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJub3JtYWxGXFxcIjtcXG4gICAgc3JjOiB1cmwoLi9Db250ZW50L1BsYXlwZW5TYW5zLUV4dHJhTGlnaHQudHRmKTtcXG59XFxuXFxuQGtleWZyYW1lcyBoZWFkZXIge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTI5MHB4KTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG5cXG4gICAgMjUlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjE3LjVweCk7XFxuICAgICAgICBvcGFjaXR5OiAwLjI1O1xcbiAgICB9XFxuXFxuICAgIDUwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE0NXB4KTtcXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcXG4gICAgfVxcblxcbiAgICA3NSUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MHB4KTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG59XFxuXFxuXFxuQGtleWZyYW1lcyBncmlkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MHB4KTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgbWFpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTBweCk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbn1cXG5cXG4qIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJub3JtYWxGXFxcIjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGZpdC1jb250ZW50KDE1JSkgZml0LWNvbnRlbnQoNTAlKSBmaXQtY29udGVudCgyMCUpIGF1dG87XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjI1LCA0MywgMTM3LCAwLjIxKTtcXG59XFxuXFxuaDEge1xcbiAgICBmb250LXNpemU6IDQwcHg7XFxuICAgIGFuaW1hdGlvbjogaGVhZGVyIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XFxufVxcblxcbmgxPnAge1xcbiAgICBhbmltYXRpb246IGhlYWRlciA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgICBhbmltYXRpb246IGhlYWRlciA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXI6IDFweCByaWRnZSBibGFjaztcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBmb250LWZhbWlseTogXFxcIm5vcm1hbEZcXFwiO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDkyLCA1OSwgMTk3LCAwLjIyKTtcXG4gICAgbWF4LWhlaWdodDogMjkwcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG5tYWluIHtcXG4gICAgYW5pbWF0aW9uOiBtYWluIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XFxuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmNvbnRyb2x7XFxuICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkIHtcXG4gICAgd2lkdGg6IDI5MHB4O1xcbiAgICBoZWlnaHQ6IDI5MHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjlweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAyOXB4KTtcXG4gICAgYW5pbWF0aW9uOiBncmlkIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgbGluZWFyO1xcbiAgICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5tb3ZlcyB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoYXV0by1maWxsLCBmaXQtY29udGVudCg3NXB4KSk7XFxuICAgIGdhcDogNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggcmlkZ2UgYmxhY2s7XFxuICAgIHBhZGRpbmc6IDVweDtcXG59XFxuXFxuLm1vdmVzPmRpdjpub3QoLmNvbmZpcm0pIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIDI5cHgpO1xcbiAgICBnYXA6IDA7XFxuICAgIHotaW5kZXg6IDI7XFxuICAgIGN1cnNvcjogbW92ZTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNHMgbGluZWFyO1xcbiAgICAtd2Via2l0LXVzZXItZHJhZzogZWxlbWVudDtcXG4gICAgaGVpZ2h0OiAyOXB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5zNSB7XFxuICAgIHdpZHRoOiAxNDVweDtcXG59XFxuXFxuLnM0IHtcXG4gICAgd2lkdGg6IDExNnB4O1xcbn1cXG5cXG4uczMge1xcbiAgICB3aWR0aDogODdweDtcXG59XFxuXFxuLnMyIHtcXG4gICAgd2lkdGg6IDU4cHg7XFxufVxcblxcbi5zMSB7XFxuICAgIHdpZHRoOiAyOXB4O1xcbn1cXG5cXG5cXG4ubW92ZXM+ZGl2PmRpdiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gICAgb3V0bGluZTogMXB4IHJpZGdlIGJsYWNrO1xcbn1cXG5cXG5cXG5mb290ZXIge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbjogbWFpbiA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xcbn1cXG5cXG4ucmFuZG9tLFxcbi5yZXNldCB7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xcbiAgICBwYWRkaW5nOiA2cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgbGluZWFyO1xcbn1cXG5cXG4ucmFuZG9tIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuXFxuLnJhbmRvbTpob3ZlcixcXG4ucmVzZXQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjNUQ1RDVEO1xcbn1cXG5cXG4ucmFuZG9tOmFjdGl2ZSxcXG4ucmVzZXQ6YWN0aXZlIHtcXG4gICAgYmFja2dyb3VuZDogIzM3MzczNztcXG59XFxuXFxuaW5wdXQge1xcbiAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGZvbnQtc2l6ZTogMjVweDtcXG4gICAgd2lkdGg6IDI5MHB4O1xcbn1cXG5cXG4uaW5wdXRIZWFkIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG4uZXJyb3Ige1xcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGNvbG9yOiByZWQ7XFxuICAgIHBhZGRpbmc6IDNweDtcXG59XFxuXFxuLmh1bWFuQiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XFxufVxcblxcbi5BSUI+ZGl2IHtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGxpbmVhcjtcXG59XFxuXFxuLkFJQj5kaXY6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMilcXG59XFxuXFxuLnBsYXlBZ2FpbixcXG4uY29uZmlybSB7XFxuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICAgIGZvbnQtc2l6ZTogMjNweDtcXG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XFxuICAgIHBhZGRpbmc6IDE1cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtdmFyaWFudDogbm9ybWFsO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2IoMTY0LCAxNiwgMTYpIDAlLCByZ2IoMjAzLCAwLCAwKSA1MCUsIHJnYigxMTcsIDAsIDApIDEwMCUpO1xcbiAgICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTkpIDVweCA1cHggMTVweCA1cHg7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYigyOCwgMTEwLCAxNjQpO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnBsYXlBZ2Fpbjpob3ZlcixcXG4uY29uZmlybTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICNBNDEwMTA7XFxufVxcblxcbi5wbGF5QWdhaW46YWN0aXZlLFxcbi5jb25maXJtOmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQ6ICM3NTAwMDA7XFxufVxcblxcbi5jb25maXJtIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBhbmltYXRpb246IGdyaWQgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcXG5cXG59XFxuXFxuYSB7XFxuICAgIGNvbG9yOiByZWQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbmhlYWRlcitwLFxcbi5odW1hbkIrcCB7XFxuICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XFxufVxcblxcbi5hbm5vdW5jZW1lbnQge1xcbiAgICBncmlkLWFyZWE6IDIvMS8zLzM7XFxufVxcblxcbi5wbGF5QWdhaW4ge1xcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xcbiAgICBncmlkLWFyZWE6IDMvMS80LzM7XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6OTM2cHgpIHtcXG4gICAgLmNvbnRhaW5lciB7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGZpdC1jb250ZW50KDI5MHB4KSBhdXRvO1xcbiAgICAgICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICBoZWFkZXIge1xcbiAgICAgICAgZ3JpZC1hcmVhOiAxLzEvMi8zO1xcbiAgICB9XFxuXFxuICAgIC5odW1hbkIge1xcbiAgICAgICAgZ3JpZC1hcmVhOiAyLzEvMy8yO1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICB9XFxuXFxuICAgIC5BSUIge1xcbiAgICAgICAgZ3JpZC1hcmVhOiAyLzIvMy8zO1xcbiAgICB9XFxuXFxuICAgIGhlYWRlcitwLFxcbiAgICAuaHVtYW5CK3Age1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgZm9udC1zaXplOiB4eC1sYXJnZTtcXG4gICAgICAgIGFsaWduLXNlbGY6IHN0YXJ0O1xcbiAgICAgICAgcGFkZGluZzogNnB4O1xcbiAgICB9XFxuXFxuICAgIC5odW1hbkIge1xcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LWVuZDtcXG4gICAgfVxcblxcbiAgICAuQUlCIHtcXG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcXG4gICAgfVxcblxcbiAgICAuaHVtYW5CK3Age1xcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDQ1cHg7XFxuICAgIH1cXG5cXG4gICAgaGVhZGVyK3Age1xcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LWVuZDtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogNDVweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MzBweCkge1xcbiAgICAuYW5ub3VuY2VtZW50IHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJ2YXIgeD1TdHJpbmc7XG52YXIgY3JlYXRlPWZ1bmN0aW9uKCkge3JldHVybiB7aXNDb2xvclN1cHBvcnRlZDpmYWxzZSxyZXNldDp4LGJvbGQ6eCxkaW06eCxpdGFsaWM6eCx1bmRlcmxpbmU6eCxpbnZlcnNlOngsaGlkZGVuOngsc3RyaWtldGhyb3VnaDp4LGJsYWNrOngscmVkOngsZ3JlZW46eCx5ZWxsb3c6eCxibHVlOngsbWFnZW50YTp4LGN5YW46eCx3aGl0ZTp4LGdyYXk6eCxiZ0JsYWNrOngsYmdSZWQ6eCxiZ0dyZWVuOngsYmdZZWxsb3c6eCxiZ0JsdWU6eCxiZ01hZ2VudGE6eCxiZ0N5YW46eCxiZ1doaXRlOnh9fTtcbm1vZHVsZS5leHBvcnRzPWNyZWF0ZSgpO1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlQ29sb3JzID0gY3JlYXRlO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpXG5cbmNsYXNzIEF0UnVsZSBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ2F0cnVsZSdcbiAgfVxuXG4gIGFwcGVuZCguLi5jaGlsZHJlbikge1xuICAgIGlmICghdGhpcy5wcm94eU9mLm5vZGVzKSB0aGlzLm5vZGVzID0gW11cbiAgICByZXR1cm4gc3VwZXIuYXBwZW5kKC4uLmNoaWxkcmVuKVxuICB9XG5cbiAgcHJlcGVuZCguLi5jaGlsZHJlbikge1xuICAgIGlmICghdGhpcy5wcm94eU9mLm5vZGVzKSB0aGlzLm5vZGVzID0gW11cbiAgICByZXR1cm4gc3VwZXIucHJlcGVuZCguLi5jaGlsZHJlbilcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF0UnVsZVxuQXRSdWxlLmRlZmF1bHQgPSBBdFJ1bGVcblxuQ29udGFpbmVyLnJlZ2lzdGVyQXRSdWxlKEF0UnVsZSlcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpXG5cbmNsYXNzIENvbW1lbnQgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAnY29tbWVudCdcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnRcbkNvbW1lbnQuZGVmYXVsdCA9IENvbW1lbnRcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgeyBpc0NsZWFuLCBteSB9ID0gcmVxdWlyZSgnLi9zeW1ib2xzJylcbmxldCBEZWNsYXJhdGlvbiA9IHJlcXVpcmUoJy4vZGVjbGFyYXRpb24nKVxubGV0IENvbW1lbnQgPSByZXF1aXJlKCcuL2NvbW1lbnQnKVxubGV0IE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKVxuXG5sZXQgcGFyc2UsIFJ1bGUsIEF0UnVsZSwgUm9vdFxuXG5mdW5jdGlvbiBjbGVhblNvdXJjZShub2Rlcykge1xuICByZXR1cm4gbm9kZXMubWFwKGkgPT4ge1xuICAgIGlmIChpLm5vZGVzKSBpLm5vZGVzID0gY2xlYW5Tb3VyY2UoaS5ub2RlcylcbiAgICBkZWxldGUgaS5zb3VyY2VcbiAgICByZXR1cm4gaVxuICB9KVxufVxuXG5mdW5jdGlvbiBtYXJrRGlydHlVcChub2RlKSB7XG4gIG5vZGVbaXNDbGVhbl0gPSBmYWxzZVxuICBpZiAobm9kZS5wcm94eU9mLm5vZGVzKSB7XG4gICAgZm9yIChsZXQgaSBvZiBub2RlLnByb3h5T2Yubm9kZXMpIHtcbiAgICAgIG1hcmtEaXJ0eVVwKGkpXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIE5vZGUge1xuICBhcHBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoY2hpbGQsIHRoaXMubGFzdClcbiAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHRoaXMucHJveHlPZi5ub2Rlcy5wdXNoKG5vZGUpXG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRGlydHkoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNsZWFuUmF3cyhrZWVwQmV0d2Vlbikge1xuICAgIHN1cGVyLmNsZWFuUmF3cyhrZWVwQmV0d2VlbilcbiAgICBpZiAodGhpcy5ub2Rlcykge1xuICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLm5vZGVzKSBub2RlLmNsZWFuUmF3cyhrZWVwQmV0d2VlbilcbiAgICB9XG4gIH1cblxuICBlYWNoKGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0aGlzLnByb3h5T2Yubm9kZXMpIHJldHVybiB1bmRlZmluZWRcbiAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLmdldEl0ZXJhdG9yKClcblxuICAgIGxldCBpbmRleCwgcmVzdWx0XG4gICAgd2hpbGUgKHRoaXMuaW5kZXhlc1tpdGVyYXRvcl0gPCB0aGlzLnByb3h5T2Yubm9kZXMubGVuZ3RoKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpdGVyYXRvcl1cbiAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKHRoaXMucHJveHlPZi5ub2Rlc1tpbmRleF0sIGluZGV4KVxuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIGJyZWFrXG5cbiAgICAgIHRoaXMuaW5kZXhlc1tpdGVyYXRvcl0gKz0gMVxuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLmluZGV4ZXNbaXRlcmF0b3JdXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZXZlcnkoY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXMuZXZlcnkoY29uZGl0aW9uKVxuICB9XG5cbiAgZ2V0SXRlcmF0b3IoKSB7XG4gICAgaWYgKCF0aGlzLmxhc3RFYWNoKSB0aGlzLmxhc3RFYWNoID0gMFxuICAgIGlmICghdGhpcy5pbmRleGVzKSB0aGlzLmluZGV4ZXMgPSB7fVxuXG4gICAgdGhpcy5sYXN0RWFjaCArPSAxXG4gICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5sYXN0RWFjaFxuICAgIHRoaXMuaW5kZXhlc1tpdGVyYXRvcl0gPSAwXG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGdldFByb3h5UHJvY2Vzc29yKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXQobm9kZSwgcHJvcCkge1xuICAgICAgICBpZiAocHJvcCA9PT0gJ3Byb3h5T2YnKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSBlbHNlIGlmICghbm9kZVtwcm9wXSkge1xuICAgICAgICAgIHJldHVybiBub2RlW3Byb3BdXG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgcHJvcCA9PT0gJ2VhY2gnIHx8XG4gICAgICAgICAgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJyAmJiBwcm9wLnN0YXJ0c1dpdGgoJ3dhbGsnKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZVtwcm9wXShcbiAgICAgICAgICAgICAgLi4uYXJncy5tYXAoaSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGNoaWxkLCBpbmRleCkgPT4gaShjaGlsZC50b1Byb3h5KCksIGluZGV4KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gJ2V2ZXJ5JyB8fCBwcm9wID09PSAnc29tZScpIHtcbiAgICAgICAgICByZXR1cm4gY2IgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVbcHJvcF0oKGNoaWxkLCAuLi5vdGhlcikgPT5cbiAgICAgICAgICAgICAgY2IoY2hpbGQudG9Qcm94eSgpLCAuLi5vdGhlcilcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IG5vZGUucm9vdCgpLnRvUHJveHkoKVxuICAgICAgICB9IGVsc2UgaWYgKHByb3AgPT09ICdub2RlcycpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZS5ub2Rlcy5tYXAoaSA9PiBpLnRvUHJveHkoKSlcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSAnZmlyc3QnIHx8IHByb3AgPT09ICdsYXN0Jykge1xuICAgICAgICAgIHJldHVybiBub2RlW3Byb3BdLnRvUHJveHkoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBub2RlW3Byb3BdXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHNldChub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICBpZiAobm9kZVtwcm9wXSA9PT0gdmFsdWUpIHJldHVybiB0cnVlXG4gICAgICAgIG5vZGVbcHJvcF0gPSB2YWx1ZVxuICAgICAgICBpZiAocHJvcCA9PT0gJ25hbWUnIHx8IHByb3AgPT09ICdwYXJhbXMnIHx8IHByb3AgPT09ICdzZWxlY3RvcicpIHtcbiAgICAgICAgICBub2RlLm1hcmtEaXJ0eSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbmRleChjaGlsZCkge1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdudW1iZXInKSByZXR1cm4gY2hpbGRcbiAgICBpZiAoY2hpbGQucHJveHlPZikgY2hpbGQgPSBjaGlsZC5wcm94eU9mXG4gICAgcmV0dXJuIHRoaXMucHJveHlPZi5ub2Rlcy5pbmRleE9mKGNoaWxkKVxuICB9XG5cbiAgaW5zZXJ0QWZ0ZXIoZXhpc3QsIGFkZCkge1xuICAgIGxldCBleGlzdEluZGV4ID0gdGhpcy5pbmRleChleGlzdClcbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShhZGQsIHRoaXMucHJveHlPZi5ub2Rlc1tleGlzdEluZGV4XSkucmV2ZXJzZSgpXG4gICAgZXhpc3RJbmRleCA9IHRoaXMuaW5kZXgoZXhpc3QpXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2RlcykgdGhpcy5wcm94eU9mLm5vZGVzLnNwbGljZShleGlzdEluZGV4ICsgMSwgMCwgbm9kZSlcblxuICAgIGxldCBpbmRleFxuICAgIGZvciAobGV0IGlkIGluIHRoaXMuaW5kZXhlcykge1xuICAgICAgaW5kZXggPSB0aGlzLmluZGV4ZXNbaWRdXG4gICAgICBpZiAoZXhpc3RJbmRleCA8IGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleCArIG5vZGVzLmxlbmd0aFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFya0RpcnR5KClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbnNlcnRCZWZvcmUoZXhpc3QsIGFkZCkge1xuICAgIGxldCBleGlzdEluZGV4ID0gdGhpcy5pbmRleChleGlzdClcbiAgICBsZXQgdHlwZSA9IGV4aXN0SW5kZXggPT09IDAgPyAncHJlcGVuZCcgOiBmYWxzZVxuICAgIGxldCBub2RlcyA9IHRoaXMubm9ybWFsaXplKGFkZCwgdGhpcy5wcm94eU9mLm5vZGVzW2V4aXN0SW5kZXhdLCB0eXBlKS5yZXZlcnNlKClcbiAgICBleGlzdEluZGV4ID0gdGhpcy5pbmRleChleGlzdClcbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLnByb3h5T2Yubm9kZXMuc3BsaWNlKGV4aXN0SW5kZXgsIDAsIG5vZGUpXG5cbiAgICBsZXQgaW5kZXhcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2lkXVxuICAgICAgaWYgKGV4aXN0SW5kZXggPD0gaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4ICsgbm9kZXMubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRGlydHkoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIG5vcm1hbGl6ZShub2Rlcywgc2FtcGxlKSB7XG4gICAgaWYgKHR5cGVvZiBub2RlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5vZGVzID0gY2xlYW5Tb3VyY2UocGFyc2Uobm9kZXMpLm5vZGVzKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShub2RlcykpIHtcbiAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMClcbiAgICAgIGZvciAobGV0IGkgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKGkucGFyZW50KSBpLnBhcmVudC5yZW1vdmVDaGlsZChpLCAnaWdub3JlJylcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnR5cGUgPT09ICdyb290JyAmJiB0aGlzLnR5cGUgIT09ICdkb2N1bWVudCcpIHtcbiAgICAgIG5vZGVzID0gbm9kZXMubm9kZXMuc2xpY2UoMClcbiAgICAgIGZvciAobGV0IGkgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKGkucGFyZW50KSBpLnBhcmVudC5yZW1vdmVDaGlsZChpLCAnaWdub3JlJylcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnR5cGUpIHtcbiAgICAgIG5vZGVzID0gW25vZGVzXVxuICAgIH0gZWxzZSBpZiAobm9kZXMucHJvcCkge1xuICAgICAgaWYgKHR5cGVvZiBub2Rlcy52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBmaWVsZCBpcyBtaXNzZWQgaW4gbm9kZSBjcmVhdGlvbicpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBub2Rlcy52YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbm9kZXMudmFsdWUgPSBTdHJpbmcobm9kZXMudmFsdWUpXG4gICAgICB9XG4gICAgICBub2RlcyA9IFtuZXcgRGVjbGFyYXRpb24obm9kZXMpXVxuICAgIH0gZWxzZSBpZiAobm9kZXMuc2VsZWN0b3IpIHtcbiAgICAgIG5vZGVzID0gW25ldyBSdWxlKG5vZGVzKV1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLm5hbWUpIHtcbiAgICAgIG5vZGVzID0gW25ldyBBdFJ1bGUobm9kZXMpXVxuICAgIH0gZWxzZSBpZiAobm9kZXMudGV4dCkge1xuICAgICAgbm9kZXMgPSBbbmV3IENvbW1lbnQobm9kZXMpXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbm9kZSB0eXBlIGluIG5vZGUgY3JlYXRpb24nKVxuICAgIH1cblxuICAgIGxldCBwcm9jZXNzZWQgPSBub2Rlcy5tYXAoaSA9PiB7XG4gICAgICAvKiBjOCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKCFpW215XSkgQ29udGFpbmVyLnJlYnVpbGQoaSlcbiAgICAgIGkgPSBpLnByb3h5T2ZcbiAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSlcbiAgICAgIGlmIChpW2lzQ2xlYW5dKSBtYXJrRGlydHlVcChpKVxuICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaS5yYXdzLmJlZm9yZSA9IHNhbXBsZS5yYXdzLmJlZm9yZS5yZXBsYWNlKC9cXFMvZywgJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGkucGFyZW50ID0gdGhpcy5wcm94eU9mXG4gICAgICByZXR1cm4gaVxuICAgIH0pXG5cbiAgICByZXR1cm4gcHJvY2Vzc2VkXG4gIH1cblxuICBwcmVwZW5kKC4uLmNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5yZXZlcnNlKClcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoY2hpbGQsIHRoaXMuZmlyc3QsICdwcmVwZW5kJykucmV2ZXJzZSgpXG4gICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLnByb3h5T2Yubm9kZXMudW5zaGlmdChub2RlKVxuICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSB0aGlzLmluZGV4ZXNbaWRdICsgbm9kZXMubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRGlydHkoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHB1c2goY2hpbGQpIHtcbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzXG4gICAgdGhpcy5wcm94eU9mLm5vZGVzLnB1c2goY2hpbGQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZUFsbCgpIHtcbiAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMucHJveHlPZi5ub2Rlcykgbm9kZS5wYXJlbnQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnByb3h5T2Yubm9kZXMgPSBbXVxuXG4gICAgdGhpcy5tYXJrRGlydHkoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKGNoaWxkKSB7XG4gICAgY2hpbGQgPSB0aGlzLmluZGV4KGNoaWxkKVxuICAgIHRoaXMucHJveHlPZi5ub2Rlc1tjaGlsZF0ucGFyZW50ID0gdW5kZWZpbmVkXG4gICAgdGhpcy5wcm94eU9mLm5vZGVzLnNwbGljZShjaGlsZCwgMSlcblxuICAgIGxldCBpbmRleFxuICAgIGZvciAobGV0IGlkIGluIHRoaXMuaW5kZXhlcykge1xuICAgICAgaW5kZXggPSB0aGlzLmluZGV4ZXNbaWRdXG4gICAgICBpZiAoaW5kZXggPj0gY2hpbGQpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4IC0gMVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFya0RpcnR5KClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZXBsYWNlVmFsdWVzKHBhdHRlcm4sIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBvcHRzXG4gICAgICBvcHRzID0ge31cbiAgICB9XG5cbiAgICB0aGlzLndhbGtEZWNscyhkZWNsID0+IHtcbiAgICAgIGlmIChvcHRzLnByb3BzICYmICFvcHRzLnByb3BzLmluY2x1ZGVzKGRlY2wucHJvcCkpIHJldHVyblxuICAgICAgaWYgKG9wdHMuZmFzdCAmJiAhZGVjbC52YWx1ZS5pbmNsdWRlcyhvcHRzLmZhc3QpKSByZXR1cm5cblxuICAgICAgZGVjbC52YWx1ZSA9IGRlY2wudmFsdWUucmVwbGFjZShwYXR0ZXJuLCBjYWxsYmFjaylcbiAgICB9KVxuXG4gICAgdGhpcy5tYXJrRGlydHkoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNvbWUoY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXMuc29tZShjb25kaXRpb24pXG4gIH1cblxuICB3YWxrKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgIGxldCByZXN1bHRcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBjaGlsZC5hZGRUb0Vycm9yKGUpXG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSAmJiBjaGlsZC53YWxrKSB7XG4gICAgICAgIHJlc3VsdCA9IGNoaWxkLndhbGsoY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9KVxuICB9XG5cbiAgd2Fsa0F0UnVsZXMobmFtZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG5hbWVcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnYXRydWxlJykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKG5hbWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnYXRydWxlJyAmJiBuYW1lLnRlc3QoY2hpbGQubmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2F0cnVsZScgJiYgY2hpbGQubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHdhbGtDb21tZW50cyhjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd2Fsa0RlY2xzKHByb3AsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBwcm9wXG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAocHJvcCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdkZWNsJyAmJiBwcm9wLnRlc3QoY2hpbGQucHJvcCkpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2RlY2wnICYmIGNoaWxkLnByb3AgPT09IHByb3ApIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB3YWxrUnVsZXMoc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBzZWxlY3RvclxuXG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ3J1bGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAncnVsZScgJiYgc2VsZWN0b3IudGVzdChjaGlsZC5zZWxlY3RvcikpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ3J1bGUnICYmIGNoaWxkLnNlbGVjdG9yID09PSBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldCBmaXJzdCgpIHtcbiAgICBpZiAoIXRoaXMucHJveHlPZi5ub2RlcykgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLnByb3h5T2Yubm9kZXNbMF1cbiAgfVxuXG4gIGdldCBsYXN0KCkge1xuICAgIGlmICghdGhpcy5wcm94eU9mLm5vZGVzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMucHJveHlPZi5ub2Rlc1t0aGlzLnByb3h5T2Yubm9kZXMubGVuZ3RoIC0gMV1cbiAgfVxufVxuXG5Db250YWluZXIucmVnaXN0ZXJQYXJzZSA9IGRlcGVuZGFudCA9PiB7XG4gIHBhcnNlID0gZGVwZW5kYW50XG59XG5cbkNvbnRhaW5lci5yZWdpc3RlclJ1bGUgPSBkZXBlbmRhbnQgPT4ge1xuICBSdWxlID0gZGVwZW5kYW50XG59XG5cbkNvbnRhaW5lci5yZWdpc3RlckF0UnVsZSA9IGRlcGVuZGFudCA9PiB7XG4gIEF0UnVsZSA9IGRlcGVuZGFudFxufVxuXG5Db250YWluZXIucmVnaXN0ZXJSb290ID0gZGVwZW5kYW50ID0+IHtcbiAgUm9vdCA9IGRlcGVuZGFudFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lclxuQ29udGFpbmVyLmRlZmF1bHQgPSBDb250YWluZXJcblxuLyogYzggaWdub3JlIHN0YXJ0ICovXG5Db250YWluZXIucmVidWlsZCA9IG5vZGUgPT4ge1xuICBpZiAobm9kZS50eXBlID09PSAnYXRydWxlJykge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLCBBdFJ1bGUucHJvdG90eXBlKVxuICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ3J1bGUnKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUsIFJ1bGUucHJvdG90eXBlKVxuICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUsIERlY2xhcmF0aW9uLnByb3RvdHlwZSlcbiAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLCBDb21tZW50LnByb3RvdHlwZSlcbiAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdyb290Jykge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLCBSb290LnByb3RvdHlwZSlcbiAgfVxuXG4gIG5vZGVbbXldID0gdHJ1ZVxuXG4gIGlmIChub2RlLm5vZGVzKSB7XG4gICAgbm9kZS5ub2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIENvbnRhaW5lci5yZWJ1aWxkKGNoaWxkKVxuICAgIH0pXG4gIH1cbn1cbi8qIGM4IGlnbm9yZSBzdG9wICovXG4iLCIndXNlIHN0cmljdCdcblxubGV0IHBpY28gPSByZXF1aXJlKCdwaWNvY29sb3JzJylcblxubGV0IHRlcm1pbmFsSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi90ZXJtaW5hbC1oaWdobGlnaHQnKVxuXG5jbGFzcyBDc3NTeW50YXhFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSwgbGluZSwgY29sdW1uLCBzb3VyY2UsIGZpbGUsIHBsdWdpbikge1xuICAgIHN1cGVyKG1lc3NhZ2UpXG4gICAgdGhpcy5uYW1lID0gJ0Nzc1N5bnRheEVycm9yJ1xuICAgIHRoaXMucmVhc29uID0gbWVzc2FnZVxuXG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIHRoaXMuZmlsZSA9IGZpbGVcbiAgICB9XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgICB9XG4gICAgaWYgKHBsdWdpbikge1xuICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW5cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsaW5lICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29sdW1uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHR5cGVvZiBsaW5lID09PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lXG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lLmxpbmVcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBsaW5lLmNvbHVtblxuICAgICAgICB0aGlzLmVuZExpbmUgPSBjb2x1bW4ubGluZVxuICAgICAgICB0aGlzLmVuZENvbHVtbiA9IGNvbHVtbi5jb2x1bW5cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldE1lc3NhZ2UoKVxuXG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBDc3NTeW50YXhFcnJvcilcbiAgICB9XG4gIH1cblxuICBzZXRNZXNzYWdlKCkge1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMucGx1Z2luID8gdGhpcy5wbHVnaW4gKyAnOiAnIDogJydcbiAgICB0aGlzLm1lc3NhZ2UgKz0gdGhpcy5maWxlID8gdGhpcy5maWxlIDogJzxjc3MgaW5wdXQ+J1xuICAgIGlmICh0eXBlb2YgdGhpcy5saW5lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5tZXNzYWdlICs9ICc6JyArIHRoaXMubGluZSArICc6JyArIHRoaXMuY29sdW1uXG4gICAgfVxuICAgIHRoaXMubWVzc2FnZSArPSAnOiAnICsgdGhpcy5yZWFzb25cbiAgfVxuXG4gIHNob3dTb3VyY2VDb2RlKGNvbG9yKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZSkgcmV0dXJuICcnXG5cbiAgICBsZXQgY3NzID0gdGhpcy5zb3VyY2VcbiAgICBpZiAoY29sb3IgPT0gbnVsbCkgY29sb3IgPSBwaWNvLmlzQ29sb3JTdXBwb3J0ZWRcbiAgICBpZiAodGVybWluYWxIaWdobGlnaHQpIHtcbiAgICAgIGlmIChjb2xvcikgY3NzID0gdGVybWluYWxIaWdobGlnaHQoY3NzKVxuICAgIH1cblxuICAgIGxldCBsaW5lcyA9IGNzcy5zcGxpdCgvXFxyP1xcbi8pXG4gICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgodGhpcy5saW5lIC0gMywgMClcbiAgICBsZXQgZW5kID0gTWF0aC5taW4odGhpcy5saW5lICsgMiwgbGluZXMubGVuZ3RoKVxuXG4gICAgbGV0IG1heFdpZHRoID0gU3RyaW5nKGVuZCkubGVuZ3RoXG5cbiAgICBsZXQgbWFyaywgYXNpZGVcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgIGxldCB7IGJvbGQsIGdyYXksIHJlZCB9ID0gcGljby5jcmVhdGVDb2xvcnModHJ1ZSlcbiAgICAgIG1hcmsgPSB0ZXh0ID0+IGJvbGQocmVkKHRleHQpKVxuICAgICAgYXNpZGUgPSB0ZXh0ID0+IGdyYXkodGV4dClcbiAgICB9IGVsc2Uge1xuICAgICAgbWFyayA9IGFzaWRlID0gc3RyID0+IHN0clxuICAgIH1cblxuICAgIHJldHVybiBsaW5lc1xuICAgICAgLnNsaWNlKHN0YXJ0LCBlbmQpXG4gICAgICAubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgbnVtYmVyID0gc3RhcnQgKyAxICsgaW5kZXhcbiAgICAgICAgbGV0IGd1dHRlciA9ICcgJyArICgnICcgKyBudW1iZXIpLnNsaWNlKC1tYXhXaWR0aCkgKyAnIHwgJ1xuICAgICAgICBpZiAobnVtYmVyID09PSB0aGlzLmxpbmUpIHtcbiAgICAgICAgICBsZXQgc3BhY2luZyA9XG4gICAgICAgICAgICBhc2lkZShndXR0ZXIucmVwbGFjZSgvXFxkL2csICcgJykpICtcbiAgICAgICAgICAgIGxpbmUuc2xpY2UoMCwgdGhpcy5jb2x1bW4gLSAxKS5yZXBsYWNlKC9bXlxcdF0vZywgJyAnKVxuICAgICAgICAgIHJldHVybiBtYXJrKCc+JykgKyBhc2lkZShndXR0ZXIpICsgbGluZSArICdcXG4gJyArIHNwYWNpbmcgKyBtYXJrKCdeJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyAnICsgYXNpZGUoZ3V0dGVyKSArIGxpbmVcbiAgICAgIH0pXG4gICAgICAuam9pbignXFxuJylcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBjb2RlID0gdGhpcy5zaG93U291cmNlQ29kZSgpXG4gICAgaWYgKGNvZGUpIHtcbiAgICAgIGNvZGUgPSAnXFxuXFxuJyArIGNvZGUgKyAnXFxuJ1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJzogJyArIHRoaXMubWVzc2FnZSArIGNvZGVcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENzc1N5bnRheEVycm9yXG5Dc3NTeW50YXhFcnJvci5kZWZhdWx0ID0gQ3NzU3ludGF4RXJyb3JcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpXG5cbmNsYXNzIERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgaWYgKFxuICAgICAgZGVmYXVsdHMgJiZcbiAgICAgIHR5cGVvZiBkZWZhdWx0cy52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBkZWZhdWx0cy52YWx1ZSAhPT0gJ3N0cmluZydcbiAgICApIHtcbiAgICAgIGRlZmF1bHRzID0geyAuLi5kZWZhdWx0cywgdmFsdWU6IFN0cmluZyhkZWZhdWx0cy52YWx1ZSkgfVxuICAgIH1cbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAnZGVjbCdcbiAgfVxuXG4gIGdldCB2YXJpYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wLnN0YXJ0c1dpdGgoJy0tJykgfHwgdGhpcy5wcm9wWzBdID09PSAnJCdcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERlY2xhcmF0aW9uXG5EZWNsYXJhdGlvbi5kZWZhdWx0ID0gRGVjbGFyYXRpb25cbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXInKVxuXG5sZXQgTGF6eVJlc3VsdCwgUHJvY2Vzc29yXG5cbmNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICAvLyB0eXBlIG5lZWRzIHRvIGJlIHBhc3NlZCB0byBzdXBlciwgb3RoZXJ3aXNlIGNoaWxkIHJvb3RzIHdvbid0IGJlIG5vcm1hbGl6ZWQgY29ycmVjdGx5XG4gICAgc3VwZXIoeyB0eXBlOiAnZG9jdW1lbnQnLCAuLi5kZWZhdWx0cyB9KVxuXG4gICAgaWYgKCF0aGlzLm5vZGVzKSB7XG4gICAgICB0aGlzLm5vZGVzID0gW11cbiAgICB9XG4gIH1cblxuICB0b1Jlc3VsdChvcHRzID0ge30pIHtcbiAgICBsZXQgbGF6eSA9IG5ldyBMYXp5UmVzdWx0KG5ldyBQcm9jZXNzb3IoKSwgdGhpcywgb3B0cylcblxuICAgIHJldHVybiBsYXp5LnN0cmluZ2lmeSgpXG4gIH1cbn1cblxuRG9jdW1lbnQucmVnaXN0ZXJMYXp5UmVzdWx0ID0gZGVwZW5kYW50ID0+IHtcbiAgTGF6eVJlc3VsdCA9IGRlcGVuZGFudFxufVxuXG5Eb2N1bWVudC5yZWdpc3RlclByb2Nlc3NvciA9IGRlcGVuZGFudCA9PiB7XG4gIFByb2Nlc3NvciA9IGRlcGVuZGFudFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50XG5Eb2N1bWVudC5kZWZhdWx0ID0gRG9jdW1lbnRcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuL2RlY2xhcmF0aW9uJylcbmxldCBQcmV2aW91c01hcCA9IHJlcXVpcmUoJy4vcHJldmlvdXMtbWFwJylcbmxldCBDb21tZW50ID0gcmVxdWlyZSgnLi9jb21tZW50JylcbmxldCBBdFJ1bGUgPSByZXF1aXJlKCcuL2F0LXJ1bGUnKVxubGV0IElucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpXG5sZXQgUm9vdCA9IHJlcXVpcmUoJy4vcm9vdCcpXG5sZXQgUnVsZSA9IHJlcXVpcmUoJy4vcnVsZScpXG5cbmZ1bmN0aW9uIGZyb21KU09OKGpzb24sIGlucHV0cykge1xuICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkgcmV0dXJuIGpzb24ubWFwKG4gPT4gZnJvbUpTT04obikpXG5cbiAgbGV0IHsgaW5wdXRzOiBvd25JbnB1dHMsIC4uLmRlZmF1bHRzIH0gPSBqc29uXG4gIGlmIChvd25JbnB1dHMpIHtcbiAgICBpbnB1dHMgPSBbXVxuICAgIGZvciAobGV0IGlucHV0IG9mIG93bklucHV0cykge1xuICAgICAgbGV0IGlucHV0SHlkcmF0ZWQgPSB7IC4uLmlucHV0LCBfX3Byb3RvX186IElucHV0LnByb3RvdHlwZSB9XG4gICAgICBpZiAoaW5wdXRIeWRyYXRlZC5tYXApIHtcbiAgICAgICAgaW5wdXRIeWRyYXRlZC5tYXAgPSB7XG4gICAgICAgICAgLi4uaW5wdXRIeWRyYXRlZC5tYXAsXG4gICAgICAgICAgX19wcm90b19fOiBQcmV2aW91c01hcC5wcm90b3R5cGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaW5wdXRzLnB1c2goaW5wdXRIeWRyYXRlZClcbiAgICB9XG4gIH1cbiAgaWYgKGRlZmF1bHRzLm5vZGVzKSB7XG4gICAgZGVmYXVsdHMubm9kZXMgPSBqc29uLm5vZGVzLm1hcChuID0+IGZyb21KU09OKG4sIGlucHV0cykpXG4gIH1cbiAgaWYgKGRlZmF1bHRzLnNvdXJjZSkge1xuICAgIGxldCB7IGlucHV0SWQsIC4uLnNvdXJjZSB9ID0gZGVmYXVsdHMuc291cmNlXG4gICAgZGVmYXVsdHMuc291cmNlID0gc291cmNlXG4gICAgaWYgKGlucHV0SWQgIT0gbnVsbCkge1xuICAgICAgZGVmYXVsdHMuc291cmNlLmlucHV0ID0gaW5wdXRzW2lucHV0SWRdXG4gICAgfVxuICB9XG4gIGlmIChkZWZhdWx0cy50eXBlID09PSAncm9vdCcpIHtcbiAgICByZXR1cm4gbmV3IFJvb3QoZGVmYXVsdHMpXG4gIH0gZWxzZSBpZiAoZGVmYXVsdHMudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgcmV0dXJuIG5ldyBEZWNsYXJhdGlvbihkZWZhdWx0cylcbiAgfSBlbHNlIGlmIChkZWZhdWx0cy50eXBlID09PSAncnVsZScpIHtcbiAgICByZXR1cm4gbmV3IFJ1bGUoZGVmYXVsdHMpXG4gIH0gZWxzZSBpZiAoZGVmYXVsdHMudHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgcmV0dXJuIG5ldyBDb21tZW50KGRlZmF1bHRzKVxuICB9IGVsc2UgaWYgKGRlZmF1bHRzLnR5cGUgPT09ICdhdHJ1bGUnKSB7XG4gICAgcmV0dXJuIG5ldyBBdFJ1bGUoZGVmYXVsdHMpXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG5vZGUgdHlwZTogJyArIGpzb24udHlwZSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZyb21KU09OXG5mcm9tSlNPTi5kZWZhdWx0ID0gZnJvbUpTT05cbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgeyBTb3VyY2VNYXBDb25zdW1lciwgU291cmNlTWFwR2VuZXJhdG9yIH0gPSByZXF1aXJlKCdzb3VyY2UtbWFwLWpzJylcbmxldCB7IGZpbGVVUkxUb1BhdGgsIHBhdGhUb0ZpbGVVUkwgfSA9IHJlcXVpcmUoJ3VybCcpXG5sZXQgeyBpc0Fic29sdXRlLCByZXNvbHZlIH0gPSByZXF1aXJlKCdwYXRoJylcbmxldCB7IG5hbm9pZCB9ID0gcmVxdWlyZSgnbmFub2lkL25vbi1zZWN1cmUnKVxuXG5sZXQgdGVybWluYWxIaWdobGlnaHQgPSByZXF1aXJlKCcuL3Rlcm1pbmFsLWhpZ2hsaWdodCcpXG5sZXQgQ3NzU3ludGF4RXJyb3IgPSByZXF1aXJlKCcuL2Nzcy1zeW50YXgtZXJyb3InKVxubGV0IFByZXZpb3VzTWFwID0gcmVxdWlyZSgnLi9wcmV2aW91cy1tYXAnKVxuXG5sZXQgZnJvbU9mZnNldENhY2hlID0gU3ltYm9sKCdmcm9tT2Zmc2V0Q2FjaGUnKVxuXG5sZXQgc291cmNlTWFwQXZhaWxhYmxlID0gQm9vbGVhbihTb3VyY2VNYXBDb25zdW1lciAmJiBTb3VyY2VNYXBHZW5lcmF0b3IpXG5sZXQgcGF0aEF2YWlsYWJsZSA9IEJvb2xlYW4ocmVzb2x2ZSAmJiBpc0Fic29sdXRlKVxuXG5jbGFzcyBJbnB1dCB7XG4gIGNvbnN0cnVjdG9yKGNzcywgb3B0cyA9IHt9KSB7XG4gICAgaWYgKFxuICAgICAgY3NzID09PSBudWxsIHx8XG4gICAgICB0eXBlb2YgY3NzID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgKHR5cGVvZiBjc3MgPT09ICdvYmplY3QnICYmICFjc3MudG9TdHJpbmcpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvc3RDU1MgcmVjZWl2ZWQgJHtjc3N9IGluc3RlYWQgb2YgQ1NTIHN0cmluZ2ApXG4gICAgfVxuXG4gICAgdGhpcy5jc3MgPSBjc3MudG9TdHJpbmcoKVxuXG4gICAgaWYgKHRoaXMuY3NzWzBdID09PSAnXFx1RkVGRicgfHwgdGhpcy5jc3NbMF0gPT09ICdcXHVGRkZFJykge1xuICAgICAgdGhpcy5oYXNCT00gPSB0cnVlXG4gICAgICB0aGlzLmNzcyA9IHRoaXMuY3NzLnNsaWNlKDEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzQk9NID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAob3B0cy5mcm9tKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFwYXRoQXZhaWxhYmxlIHx8XG4gICAgICAgIC9eXFx3KzpcXC9cXC8vLnRlc3Qob3B0cy5mcm9tKSB8fFxuICAgICAgICBpc0Fic29sdXRlKG9wdHMuZnJvbSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmZpbGUgPSBvcHRzLmZyb21cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsZSA9IHJlc29sdmUob3B0cy5mcm9tKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwYXRoQXZhaWxhYmxlICYmIHNvdXJjZU1hcEF2YWlsYWJsZSkge1xuICAgICAgbGV0IG1hcCA9IG5ldyBQcmV2aW91c01hcCh0aGlzLmNzcywgb3B0cylcbiAgICAgIGlmIChtYXAudGV4dCkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcFxuICAgICAgICBsZXQgZmlsZSA9IG1hcC5jb25zdW1lcigpLmZpbGVcbiAgICAgICAgaWYgKCF0aGlzLmZpbGUgJiYgZmlsZSkgdGhpcy5maWxlID0gdGhpcy5tYXBSZXNvbHZlKGZpbGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmZpbGUpIHtcbiAgICAgIHRoaXMuaWQgPSAnPGlucHV0IGNzcyAnICsgbmFub2lkKDYpICsgJz4nXG4gICAgfVxuICAgIGlmICh0aGlzLm1hcCkgdGhpcy5tYXAuZmlsZSA9IHRoaXMuZnJvbVxuICB9XG5cbiAgZXJyb3IobWVzc2FnZSwgbGluZSwgY29sdW1uLCBvcHRzID0ge30pIHtcbiAgICBsZXQgcmVzdWx0LCBlbmRMaW5lLCBlbmRDb2x1bW5cblxuICAgIGlmIChsaW5lICYmIHR5cGVvZiBsaW5lID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IHN0YXJ0ID0gbGluZVxuICAgICAgbGV0IGVuZCA9IGNvbHVtblxuICAgICAgaWYgKHR5cGVvZiBzdGFydC5vZmZzZXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmZyb21PZmZzZXQoc3RhcnQub2Zmc2V0KVxuICAgICAgICBsaW5lID0gcG9zLmxpbmVcbiAgICAgICAgY29sdW1uID0gcG9zLmNvbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluZSA9IHN0YXJ0LmxpbmVcbiAgICAgICAgY29sdW1uID0gc3RhcnQuY29sdW1uXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGVuZC5vZmZzZXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmZyb21PZmZzZXQoZW5kLm9mZnNldClcbiAgICAgICAgZW5kTGluZSA9IHBvcy5saW5lXG4gICAgICAgIGVuZENvbHVtbiA9IHBvcy5jb2xcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZExpbmUgPSBlbmQubGluZVxuICAgICAgICBlbmRDb2x1bW4gPSBlbmQuY29sdW1uXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghY29sdW1uKSB7XG4gICAgICBsZXQgcG9zID0gdGhpcy5mcm9tT2Zmc2V0KGxpbmUpXG4gICAgICBsaW5lID0gcG9zLmxpbmVcbiAgICAgIGNvbHVtbiA9IHBvcy5jb2xcbiAgICB9XG5cbiAgICBsZXQgb3JpZ2luID0gdGhpcy5vcmlnaW4obGluZSwgY29sdW1uLCBlbmRMaW5lLCBlbmRDb2x1bW4pXG4gICAgaWYgKG9yaWdpbikge1xuICAgICAgcmVzdWx0ID0gbmV3IENzc1N5bnRheEVycm9yKFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBvcmlnaW4uZW5kTGluZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBvcmlnaW4ubGluZVxuICAgICAgICAgIDogeyBjb2x1bW46IG9yaWdpbi5jb2x1bW4sIGxpbmU6IG9yaWdpbi5saW5lIH0sXG4gICAgICAgIG9yaWdpbi5lbmRMaW5lID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IG9yaWdpbi5jb2x1bW5cbiAgICAgICAgICA6IHsgY29sdW1uOiBvcmlnaW4uZW5kQ29sdW1uLCBsaW5lOiBvcmlnaW4uZW5kTGluZSB9LFxuICAgICAgICBvcmlnaW4uc291cmNlLFxuICAgICAgICBvcmlnaW4uZmlsZSxcbiAgICAgICAgb3B0cy5wbHVnaW5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gbmV3IENzc1N5bnRheEVycm9yKFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBlbmRMaW5lID09PSB1bmRlZmluZWQgPyBsaW5lIDogeyBjb2x1bW4sIGxpbmUgfSxcbiAgICAgICAgZW5kTGluZSA9PT0gdW5kZWZpbmVkID8gY29sdW1uIDogeyBjb2x1bW46IGVuZENvbHVtbiwgbGluZTogZW5kTGluZSB9LFxuICAgICAgICB0aGlzLmNzcyxcbiAgICAgICAgdGhpcy5maWxlLFxuICAgICAgICBvcHRzLnBsdWdpblxuICAgICAgKVxuICAgIH1cblxuICAgIHJlc3VsdC5pbnB1dCA9IHsgY29sdW1uLCBlbmRDb2x1bW4sIGVuZExpbmUsIGxpbmUsIHNvdXJjZTogdGhpcy5jc3MgfVxuICAgIGlmICh0aGlzLmZpbGUpIHtcbiAgICAgIGlmIChwYXRoVG9GaWxlVVJMKSB7XG4gICAgICAgIHJlc3VsdC5pbnB1dC51cmwgPSBwYXRoVG9GaWxlVVJMKHRoaXMuZmlsZSkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgICAgcmVzdWx0LmlucHV0LmZpbGUgPSB0aGlzLmZpbGVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBmcm9tT2Zmc2V0KG9mZnNldCkge1xuICAgIGxldCBsYXN0TGluZSwgbGluZVRvSW5kZXhcbiAgICBpZiAoIXRoaXNbZnJvbU9mZnNldENhY2hlXSkge1xuICAgICAgbGV0IGxpbmVzID0gdGhpcy5jc3Muc3BsaXQoJ1xcbicpXG4gICAgICBsaW5lVG9JbmRleCA9IG5ldyBBcnJheShsaW5lcy5sZW5ndGgpXG4gICAgICBsZXQgcHJldkluZGV4ID0gMFxuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsaW5lVG9JbmRleFtpXSA9IHByZXZJbmRleFxuICAgICAgICBwcmV2SW5kZXggKz0gbGluZXNbaV0ubGVuZ3RoICsgMVxuICAgICAgfVxuXG4gICAgICB0aGlzW2Zyb21PZmZzZXRDYWNoZV0gPSBsaW5lVG9JbmRleFxuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lVG9JbmRleCA9IHRoaXNbZnJvbU9mZnNldENhY2hlXVxuICAgIH1cbiAgICBsYXN0TGluZSA9IGxpbmVUb0luZGV4W2xpbmVUb0luZGV4Lmxlbmd0aCAtIDFdXG5cbiAgICBsZXQgbWluID0gMFxuICAgIGlmIChvZmZzZXQgPj0gbGFzdExpbmUpIHtcbiAgICAgIG1pbiA9IGxpbmVUb0luZGV4Lmxlbmd0aCAtIDFcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1heCA9IGxpbmVUb0luZGV4Lmxlbmd0aCAtIDJcbiAgICAgIGxldCBtaWRcbiAgICAgIHdoaWxlIChtaW4gPCBtYXgpIHtcbiAgICAgICAgbWlkID0gbWluICsgKChtYXggLSBtaW4pID4+IDEpXG4gICAgICAgIGlmIChvZmZzZXQgPCBsaW5lVG9JbmRleFttaWRdKSB7XG4gICAgICAgICAgbWF4ID0gbWlkIC0gMVxuICAgICAgICB9IGVsc2UgaWYgKG9mZnNldCA+PSBsaW5lVG9JbmRleFttaWQgKyAxXSkge1xuICAgICAgICAgIG1pbiA9IG1pZCArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtaW4gPSBtaWRcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjb2w6IG9mZnNldCAtIGxpbmVUb0luZGV4W21pbl0gKyAxLFxuICAgICAgbGluZTogbWluICsgMVxuICAgIH1cbiAgfVxuXG4gIG1hcFJlc29sdmUoZmlsZSkge1xuICAgIGlmICgvXlxcdys6XFwvXFwvLy50ZXN0KGZpbGUpKSB7XG4gICAgICByZXR1cm4gZmlsZVxuICAgIH1cbiAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLm1hcC5jb25zdW1lcigpLnNvdXJjZVJvb3QgfHwgdGhpcy5tYXAucm9vdCB8fCAnLicsIGZpbGUpXG4gIH1cblxuICBvcmlnaW4obGluZSwgY29sdW1uLCBlbmRMaW5lLCBlbmRDb2x1bW4pIHtcbiAgICBpZiAoIXRoaXMubWFwKSByZXR1cm4gZmFsc2VcbiAgICBsZXQgY29uc3VtZXIgPSB0aGlzLm1hcC5jb25zdW1lcigpXG5cbiAgICBsZXQgZnJvbSA9IGNvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3IoeyBjb2x1bW4sIGxpbmUgfSlcbiAgICBpZiAoIWZyb20uc291cmNlKSByZXR1cm4gZmFsc2VcblxuICAgIGxldCB0b1xuICAgIGlmICh0eXBlb2YgZW5kTGluZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRvID0gY29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7IGNvbHVtbjogZW5kQ29sdW1uLCBsaW5lOiBlbmRMaW5lIH0pXG4gICAgfVxuXG4gICAgbGV0IGZyb21VcmxcblxuICAgIGlmIChpc0Fic29sdXRlKGZyb20uc291cmNlKSkge1xuICAgICAgZnJvbVVybCA9IHBhdGhUb0ZpbGVVUkwoZnJvbS5zb3VyY2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21VcmwgPSBuZXcgVVJMKFxuICAgICAgICBmcm9tLnNvdXJjZSxcbiAgICAgICAgdGhpcy5tYXAuY29uc3VtZXIoKS5zb3VyY2VSb290IHx8IHBhdGhUb0ZpbGVVUkwodGhpcy5tYXAubWFwRmlsZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgY29sdW1uOiBmcm9tLmNvbHVtbixcbiAgICAgIGVuZENvbHVtbjogdG8gJiYgdG8uY29sdW1uLFxuICAgICAgZW5kTGluZTogdG8gJiYgdG8ubGluZSxcbiAgICAgIGxpbmU6IGZyb20ubGluZSxcbiAgICAgIHVybDogZnJvbVVybC50b1N0cmluZygpXG4gICAgfVxuXG4gICAgaWYgKGZyb21VcmwucHJvdG9jb2wgPT09ICdmaWxlOicpIHtcbiAgICAgIGlmIChmaWxlVVJMVG9QYXRoKSB7XG4gICAgICAgIHJlc3VsdC5maWxlID0gZmlsZVVSTFRvUGF0aChmcm9tVXJsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogYzggaWdub3JlIG5leHQgMiAqL1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZpbGU6IHByb3RvY29sIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBQb3N0Q1NTIGJ1aWxkYClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc291cmNlID0gY29uc3VtZXIuc291cmNlQ29udGVudEZvcihmcm9tLnNvdXJjZSlcbiAgICBpZiAoc291cmNlKSByZXN1bHQuc291cmNlID0gc291cmNlXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgbGV0IGpzb24gPSB7fVxuICAgIGZvciAobGV0IG5hbWUgb2YgWydoYXNCT00nLCAnY3NzJywgJ2ZpbGUnLCAnaWQnXSkge1xuICAgICAgaWYgKHRoaXNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICBqc29uW25hbWVdID0gdGhpc1tuYW1lXVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgIGpzb24ubWFwID0geyAuLi50aGlzLm1hcCB9XG4gICAgICBpZiAoanNvbi5tYXAuY29uc3VtZXJDYWNoZSkge1xuICAgICAgICBqc29uLm1hcC5jb25zdW1lckNhY2hlID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBqc29uXG4gIH1cblxuICBnZXQgZnJvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlIHx8IHRoaXMuaWRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0XG5JbnB1dC5kZWZhdWx0ID0gSW5wdXRcblxuaWYgKHRlcm1pbmFsSGlnaGxpZ2h0ICYmIHRlcm1pbmFsSGlnaGxpZ2h0LnJlZ2lzdGVySW5wdXQpIHtcbiAgdGVybWluYWxIaWdobGlnaHQucmVnaXN0ZXJJbnB1dChJbnB1dClcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgeyBpc0NsZWFuLCBteSB9ID0gcmVxdWlyZSgnLi9zeW1ib2xzJylcbmxldCBNYXBHZW5lcmF0b3IgPSByZXF1aXJlKCcuL21hcC1nZW5lcmF0b3InKVxubGV0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5JylcbmxldCBDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpXG5sZXQgRG9jdW1lbnQgPSByZXF1aXJlKCcuL2RvY3VtZW50JylcbmxldCB3YXJuT25jZSA9IHJlcXVpcmUoJy4vd2Fybi1vbmNlJylcbmxldCBSZXN1bHQgPSByZXF1aXJlKCcuL3Jlc3VsdCcpXG5sZXQgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmxldCBSb290ID0gcmVxdWlyZSgnLi9yb290JylcblxuY29uc3QgVFlQRV9UT19DTEFTU19OQU1FID0ge1xuICBhdHJ1bGU6ICdBdFJ1bGUnLFxuICBjb21tZW50OiAnQ29tbWVudCcsXG4gIGRlY2w6ICdEZWNsYXJhdGlvbicsXG4gIGRvY3VtZW50OiAnRG9jdW1lbnQnLFxuICByb290OiAnUm9vdCcsXG4gIHJ1bGU6ICdSdWxlJ1xufVxuXG5jb25zdCBQTFVHSU5fUFJPUFMgPSB7XG4gIEF0UnVsZTogdHJ1ZSxcbiAgQXRSdWxlRXhpdDogdHJ1ZSxcbiAgQ29tbWVudDogdHJ1ZSxcbiAgQ29tbWVudEV4aXQ6IHRydWUsXG4gIERlY2xhcmF0aW9uOiB0cnVlLFxuICBEZWNsYXJhdGlvbkV4aXQ6IHRydWUsXG4gIERvY3VtZW50OiB0cnVlLFxuICBEb2N1bWVudEV4aXQ6IHRydWUsXG4gIE9uY2U6IHRydWUsXG4gIE9uY2VFeGl0OiB0cnVlLFxuICBwb3N0Y3NzUGx1Z2luOiB0cnVlLFxuICBwcmVwYXJlOiB0cnVlLFxuICBSb290OiB0cnVlLFxuICBSb290RXhpdDogdHJ1ZSxcbiAgUnVsZTogdHJ1ZSxcbiAgUnVsZUV4aXQ6IHRydWVcbn1cblxuY29uc3QgTk9UX1ZJU0lUT1JTID0ge1xuICBPbmNlOiB0cnVlLFxuICBwb3N0Y3NzUGx1Z2luOiB0cnVlLFxuICBwcmVwYXJlOiB0cnVlXG59XG5cbmNvbnN0IENISUxEUkVOID0gMFxuXG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbidcbn1cblxuZnVuY3Rpb24gZ2V0RXZlbnRzKG5vZGUpIHtcbiAgbGV0IGtleSA9IGZhbHNlXG4gIGxldCB0eXBlID0gVFlQRV9UT19DTEFTU19OQU1FW25vZGUudHlwZV1cbiAgaWYgKG5vZGUudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAga2V5ID0gbm9kZS5wcm9wLnRvTG93ZXJDYXNlKClcbiAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdhdHJ1bGUnKSB7XG4gICAga2V5ID0gbm9kZS5uYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGlmIChrZXkgJiYgbm9kZS5hcHBlbmQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgdHlwZSxcbiAgICAgIHR5cGUgKyAnLScgKyBrZXksXG4gICAgICBDSElMRFJFTixcbiAgICAgIHR5cGUgKyAnRXhpdCcsXG4gICAgICB0eXBlICsgJ0V4aXQtJyArIGtleVxuICAgIF1cbiAgfSBlbHNlIGlmIChrZXkpIHtcbiAgICByZXR1cm4gW3R5cGUsIHR5cGUgKyAnLScgKyBrZXksIHR5cGUgKyAnRXhpdCcsIHR5cGUgKyAnRXhpdC0nICsga2V5XVxuICB9IGVsc2UgaWYgKG5vZGUuYXBwZW5kKSB7XG4gICAgcmV0dXJuIFt0eXBlLCBDSElMRFJFTiwgdHlwZSArICdFeGl0J11cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3R5cGUsIHR5cGUgKyAnRXhpdCddXG4gIH1cbn1cblxuZnVuY3Rpb24gdG9TdGFjayhub2RlKSB7XG4gIGxldCBldmVudHNcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ2RvY3VtZW50Jykge1xuICAgIGV2ZW50cyA9IFsnRG9jdW1lbnQnLCBDSElMRFJFTiwgJ0RvY3VtZW50RXhpdCddXG4gIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAncm9vdCcpIHtcbiAgICBldmVudHMgPSBbJ1Jvb3QnLCBDSElMRFJFTiwgJ1Jvb3RFeGl0J11cbiAgfSBlbHNlIHtcbiAgICBldmVudHMgPSBnZXRFdmVudHMobm9kZSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXZlbnRJbmRleDogMCxcbiAgICBldmVudHMsXG4gICAgaXRlcmF0b3I6IDAsXG4gICAgbm9kZSxcbiAgICB2aXNpdG9ySW5kZXg6IDAsXG4gICAgdmlzaXRvcnM6IFtdXG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYW5NYXJrcyhub2RlKSB7XG4gIG5vZGVbaXNDbGVhbl0gPSBmYWxzZVxuICBpZiAobm9kZS5ub2Rlcykgbm9kZS5ub2Rlcy5mb3JFYWNoKGkgPT4gY2xlYW5NYXJrcyhpKSlcbiAgcmV0dXJuIG5vZGVcbn1cblxubGV0IHBvc3Rjc3MgPSB7fVxuXG5jbGFzcyBMYXp5UmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHJvY2Vzc29yLCBjc3MsIG9wdHMpIHtcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gZmFsc2VcbiAgICB0aGlzLnByb2Nlc3NlZCA9IGZhbHNlXG5cbiAgICBsZXQgcm9vdFxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBjc3MgPT09ICdvYmplY3QnICYmXG4gICAgICBjc3MgIT09IG51bGwgJiZcbiAgICAgIChjc3MudHlwZSA9PT0gJ3Jvb3QnIHx8IGNzcy50eXBlID09PSAnZG9jdW1lbnQnKVxuICAgICkge1xuICAgICAgcm9vdCA9IGNsZWFuTWFya3MoY3NzKVxuICAgIH0gZWxzZSBpZiAoY3NzIGluc3RhbmNlb2YgTGF6eVJlc3VsdCB8fCBjc3MgaW5zdGFuY2VvZiBSZXN1bHQpIHtcbiAgICAgIHJvb3QgPSBjbGVhbk1hcmtzKGNzcy5yb290KVxuICAgICAgaWYgKGNzcy5tYXApIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLm1hcCA9PT0gJ3VuZGVmaW5lZCcpIG9wdHMubWFwID0ge31cbiAgICAgICAgaWYgKCFvcHRzLm1hcC5pbmxpbmUpIG9wdHMubWFwLmlubGluZSA9IGZhbHNlXG4gICAgICAgIG9wdHMubWFwLnByZXYgPSBjc3MubWFwXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXJzZXIgPSBwYXJzZVxuICAgICAgaWYgKG9wdHMuc3ludGF4KSBwYXJzZXIgPSBvcHRzLnN5bnRheC5wYXJzZVxuICAgICAgaWYgKG9wdHMucGFyc2VyKSBwYXJzZXIgPSBvcHRzLnBhcnNlclxuICAgICAgaWYgKHBhcnNlci5wYXJzZSkgcGFyc2VyID0gcGFyc2VyLnBhcnNlXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJvb3QgPSBwYXJzZXIoY3NzLCBvcHRzKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICAgICAgfVxuXG4gICAgICBpZiAocm9vdCAmJiAhcm9vdFtteV0pIHtcbiAgICAgICAgLyogYzggaWdub3JlIG5leHQgMiAqL1xuICAgICAgICBDb250YWluZXIucmVidWlsZChyb290KVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVzdWx0ID0gbmV3IFJlc3VsdChwcm9jZXNzb3IsIHJvb3QsIG9wdHMpXG4gICAgdGhpcy5oZWxwZXJzID0geyAuLi5wb3N0Y3NzLCBwb3N0Y3NzLCByZXN1bHQ6IHRoaXMucmVzdWx0IH1cbiAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLnByb2Nlc3Nvci5wbHVnaW5zLm1hcChwbHVnaW4gPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdvYmplY3QnICYmIHBsdWdpbi5wcmVwYXJlKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnBsdWdpbiwgLi4ucGx1Z2luLnByZXBhcmUodGhpcy5yZXN1bHQpIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwbHVnaW5cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYXN5bmMoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHJldHVybiBQcm9taXNlLnJlamVjdCh0aGlzLmVycm9yKVxuICAgIGlmICh0aGlzLnByb2Nlc3NlZCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnJlc3VsdClcbiAgICBpZiAoIXRoaXMucHJvY2Vzc2luZykge1xuICAgICAgdGhpcy5wcm9jZXNzaW5nID0gdGhpcy5ydW5Bc3luYygpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2Nlc3NpbmdcbiAgfVxuXG4gIGNhdGNoKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5hc3luYygpLmNhdGNoKG9uUmVqZWN0ZWQpXG4gIH1cblxuICBmaW5hbGx5KG9uRmluYWxseSkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZpbmFsbHksIG9uRmluYWxseSlcbiAgfVxuXG4gIGdldEFzeW5jRXJyb3IoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVc2UgcHJvY2Vzcyhjc3MpLnRoZW4oY2IpIHRvIHdvcmsgd2l0aCBhc3luYyBwbHVnaW5zJylcbiAgfVxuXG4gIGhhbmRsZUVycm9yKGVycm9yLCBub2RlKSB7XG4gICAgbGV0IHBsdWdpbiA9IHRoaXMucmVzdWx0Lmxhc3RQbHVnaW5cbiAgICB0cnkge1xuICAgICAgaWYgKG5vZGUpIG5vZGUuYWRkVG9FcnJvcihlcnJvcilcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICAgICAgaWYgKGVycm9yLm5hbWUgPT09ICdDc3NTeW50YXhFcnJvcicgJiYgIWVycm9yLnBsdWdpbikge1xuICAgICAgICBlcnJvci5wbHVnaW4gPSBwbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgICBlcnJvci5zZXRNZXNzYWdlKClcbiAgICAgIH0gZWxzZSBpZiAocGx1Z2luLnBvc3Rjc3NWZXJzaW9uKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbGV0IHBsdWdpbk5hbWUgPSBwbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgICAgIGxldCBwbHVnaW5WZXIgPSBwbHVnaW4ucG9zdGNzc1ZlcnNpb25cbiAgICAgICAgICBsZXQgcnVudGltZVZlciA9IHRoaXMucmVzdWx0LnByb2Nlc3Nvci52ZXJzaW9uXG4gICAgICAgICAgbGV0IGEgPSBwbHVnaW5WZXIuc3BsaXQoJy4nKVxuICAgICAgICAgIGxldCBiID0gcnVudGltZVZlci5zcGxpdCgnLicpXG5cbiAgICAgICAgICBpZiAoYVswXSAhPT0gYlswXSB8fCBwYXJzZUludChhWzFdKSA+IHBhcnNlSW50KGJbMV0pKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgJ1Vua25vd24gZXJyb3IgZnJvbSBQb3N0Q1NTIHBsdWdpbi4gWW91ciBjdXJyZW50IFBvc3RDU1MgJyArXG4gICAgICAgICAgICAgICAgJ3ZlcnNpb24gaXMgJyArXG4gICAgICAgICAgICAgICAgcnVudGltZVZlciArXG4gICAgICAgICAgICAgICAgJywgYnV0ICcgK1xuICAgICAgICAgICAgICAgIHBsdWdpbk5hbWUgK1xuICAgICAgICAgICAgICAgICcgdXNlcyAnICtcbiAgICAgICAgICAgICAgICBwbHVnaW5WZXIgK1xuICAgICAgICAgICAgICAgICcuIFBlcmhhcHMgdGhpcyBpcyB0aGUgc291cmNlIG9mIHRoZSBlcnJvciBiZWxvdy4nXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvKiBjOCBpZ25vcmUgbmV4dCAzICovXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikgY29uc29sZS5lcnJvcihlcnIpXG4gICAgfVxuICAgIHJldHVybiBlcnJvclxuICB9XG5cbiAgcHJlcGFyZVZpc2l0b3JzKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge31cbiAgICBsZXQgYWRkID0gKHBsdWdpbiwgdHlwZSwgY2IpID0+IHtcbiAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbdHlwZV0pIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW11cbiAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2goW3BsdWdpbiwgY2JdKVxuICAgIH1cbiAgICBmb3IgKGxldCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gcGx1Z2luKSB7XG4gICAgICAgICAgaWYgKCFQTFVHSU5fUFJPUFNbZXZlbnRdICYmIC9eW0EtWl0vLnRlc3QoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBVbmtub3duIGV2ZW50ICR7ZXZlbnR9IGluICR7cGx1Z2luLnBvc3Rjc3NQbHVnaW59LiBgICtcbiAgICAgICAgICAgICAgICBgVHJ5IHRvIHVwZGF0ZSBQb3N0Q1NTICgke3RoaXMucHJvY2Vzc29yLnZlcnNpb259IG5vdykuYFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIU5PVF9WSVNJVE9SU1tldmVudF0pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGx1Z2luW2V2ZW50XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgZmlsdGVyIGluIHBsdWdpbltldmVudF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICAgIGFkZChwbHVnaW4sIGV2ZW50LCBwbHVnaW5bZXZlbnRdW2ZpbHRlcl0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGFkZChcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICBldmVudCArICctJyArIGZpbHRlci50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICBwbHVnaW5bZXZlbnRdW2ZpbHRlcl1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbltldmVudF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgYWRkKHBsdWdpbiwgZXZlbnQsIHBsdWdpbltldmVudF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaGFzTGlzdGVuZXIgPSBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykubGVuZ3RoID4gMFxuICB9XG5cbiAgYXN5bmMgcnVuQXN5bmMoKSB7XG4gICAgdGhpcy5wbHVnaW4gPSAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwbHVnaW4gPSB0aGlzLnBsdWdpbnNbaV1cbiAgICAgIGxldCBwcm9taXNlID0gdGhpcy5ydW5PblJvb3QocGx1Z2luKVxuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb21pc2VcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGVycm9yKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcmVwYXJlVmlzaXRvcnMoKVxuICAgIGlmICh0aGlzLmhhc0xpc3RlbmVyKSB7XG4gICAgICBsZXQgcm9vdCA9IHRoaXMucmVzdWx0LnJvb3RcbiAgICAgIHdoaWxlICghcm9vdFtpc0NsZWFuXSkge1xuICAgICAgICByb290W2lzQ2xlYW5dID0gdHJ1ZVxuICAgICAgICBsZXQgc3RhY2sgPSBbdG9TdGFjayhyb290KV1cbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMudmlzaXRUaWNrKHN0YWNrKVxuICAgICAgICAgIGlmIChpc1Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IHByb21pc2VcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgbGV0IG5vZGUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5ub2RlXG4gICAgICAgICAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZSwgbm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJzLk9uY2VFeGl0KSB7XG4gICAgICAgIGZvciAobGV0IFtwbHVnaW4sIHZpc2l0b3JdIG9mIHRoaXMubGlzdGVuZXJzLk9uY2VFeGl0KSB7XG4gICAgICAgICAgdGhpcy5yZXN1bHQubGFzdFBsdWdpbiA9IHBsdWdpblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAocm9vdC50eXBlID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgICAgICAgIGxldCByb290cyA9IHJvb3Qubm9kZXMubWFwKHN1YlJvb3QgPT5cbiAgICAgICAgICAgICAgICB2aXNpdG9yKHN1YlJvb3QsIHRoaXMuaGVscGVycylcbiAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJvb3RzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXdhaXQgdmlzaXRvcihyb290LCB0aGlzLmhlbHBlcnMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgdGhpcy5oYW5kbGVFcnJvcihlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc2VkID0gdHJ1ZVxuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpXG4gIH1cblxuICBydW5PblJvb3QocGx1Z2luKSB7XG4gICAgdGhpcy5yZXN1bHQubGFzdFBsdWdpbiA9IHBsdWdpblxuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ29iamVjdCcgJiYgcGx1Z2luLk9uY2UpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0LnJvb3QudHlwZSA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICAgIGxldCByb290cyA9IHRoaXMucmVzdWx0LnJvb3Qubm9kZXMubWFwKHJvb3QgPT5cbiAgICAgICAgICAgIHBsdWdpbi5PbmNlKHJvb3QsIHRoaXMuaGVscGVycylcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAoaXNQcm9taXNlKHJvb3RzWzBdKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHJvb3RzKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByb290c1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsdWdpbi5PbmNlKHRoaXMucmVzdWx0LnJvb3QsIHRoaXMuaGVscGVycylcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gcGx1Z2luKHRoaXMucmVzdWx0LnJvb3QsIHRoaXMucmVzdWx0KVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGVycm9yKVxuICAgIH1cbiAgfVxuXG4gIHN0cmluZ2lmeSgpIHtcbiAgICBpZiAodGhpcy5lcnJvcikgdGhyb3cgdGhpcy5lcnJvclxuICAgIGlmICh0aGlzLnN0cmluZ2lmaWVkKSByZXR1cm4gdGhpcy5yZXN1bHRcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gdHJ1ZVxuXG4gICAgdGhpcy5zeW5jKClcblxuICAgIGxldCBvcHRzID0gdGhpcy5yZXN1bHQub3B0c1xuICAgIGxldCBzdHIgPSBzdHJpbmdpZnlcbiAgICBpZiAob3B0cy5zeW50YXgpIHN0ciA9IG9wdHMuc3ludGF4LnN0cmluZ2lmeVxuICAgIGlmIChvcHRzLnN0cmluZ2lmaWVyKSBzdHIgPSBvcHRzLnN0cmluZ2lmaWVyXG4gICAgaWYgKHN0ci5zdHJpbmdpZnkpIHN0ciA9IHN0ci5zdHJpbmdpZnlcblxuICAgIGxldCBtYXAgPSBuZXcgTWFwR2VuZXJhdG9yKHN0ciwgdGhpcy5yZXN1bHQucm9vdCwgdGhpcy5yZXN1bHQub3B0cylcbiAgICBsZXQgZGF0YSA9IG1hcC5nZW5lcmF0ZSgpXG4gICAgdGhpcy5yZXN1bHQuY3NzID0gZGF0YVswXVxuICAgIHRoaXMucmVzdWx0Lm1hcCA9IGRhdGFbMV1cblxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG5cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5lcnJvcikgdGhyb3cgdGhpcy5lcnJvclxuICAgIGlmICh0aGlzLnByb2Nlc3NlZCkgcmV0dXJuIHRoaXMucmVzdWx0XG4gICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG5cbiAgICBpZiAodGhpcy5wcm9jZXNzaW5nKSB7XG4gICAgICB0aHJvdyB0aGlzLmdldEFzeW5jRXJyb3IoKVxuICAgIH1cblxuICAgIGZvciAobGV0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgIGxldCBwcm9taXNlID0gdGhpcy5ydW5PblJvb3QocGx1Z2luKVxuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICB0aHJvdyB0aGlzLmdldEFzeW5jRXJyb3IoKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJlcGFyZVZpc2l0b3JzKClcbiAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcikge1xuICAgICAgbGV0IHJvb3QgPSB0aGlzLnJlc3VsdC5yb290XG4gICAgICB3aGlsZSAoIXJvb3RbaXNDbGVhbl0pIHtcbiAgICAgICAgcm9vdFtpc0NsZWFuXSA9IHRydWVcbiAgICAgICAgdGhpcy53YWxrU3luYyhyb290KVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJzLk9uY2VFeGl0KSB7XG4gICAgICAgIGlmIChyb290LnR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBzdWJSb290IG9mIHJvb3Qubm9kZXMpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaXRTeW5jKHRoaXMubGlzdGVuZXJzLk9uY2VFeGl0LCBzdWJSb290KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpc2l0U3luYyh0aGlzLmxpc3RlbmVycy5PbmNlRXhpdCwgcm9vdClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG5cbiAgdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoISgnZnJvbScgaW4gdGhpcy5vcHRzKSkge1xuICAgICAgICB3YXJuT25jZShcbiAgICAgICAgICAnV2l0aG91dCBgZnJvbWAgb3B0aW9uIFBvc3RDU1MgY291bGQgZ2VuZXJhdGUgd3Jvbmcgc291cmNlIG1hcCAnICtcbiAgICAgICAgICAgICdhbmQgd2lsbCBub3QgZmluZCBCcm93c2Vyc2xpc3QgY29uZmlnLiBTZXQgaXQgdG8gQ1NTIGZpbGUgcGF0aCAnICtcbiAgICAgICAgICAgICdvciB0byBgdW5kZWZpbmVkYCB0byBwcmV2ZW50IHRoaXMgd2FybmluZy4nXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzXG4gIH1cblxuICB2aXNpdFN5bmModmlzaXRvcnMsIG5vZGUpIHtcbiAgICBmb3IgKGxldCBbcGx1Z2luLCB2aXNpdG9yXSBvZiB2aXNpdG9ycykge1xuICAgICAgdGhpcy5yZXN1bHQubGFzdFBsdWdpbiA9IHBsdWdpblxuICAgICAgbGV0IHByb21pc2VcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb21pc2UgPSB2aXNpdG9yKG5vZGUsIHRoaXMuaGVscGVycylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5oYW5kbGVFcnJvcihlLCBub2RlLnByb3h5T2YpXG4gICAgICB9XG4gICAgICBpZiAobm9kZS50eXBlICE9PSAncm9vdCcgJiYgbm9kZS50eXBlICE9PSAnZG9jdW1lbnQnICYmICFub2RlLnBhcmVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICB0aHJvdyB0aGlzLmdldEFzeW5jRXJyb3IoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZpc2l0VGljayhzdGFjaykge1xuICAgIGxldCB2aXNpdCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdXG4gICAgbGV0IHsgbm9kZSwgdmlzaXRvcnMgfSA9IHZpc2l0XG5cbiAgICBpZiAobm9kZS50eXBlICE9PSAncm9vdCcgJiYgbm9kZS50eXBlICE9PSAnZG9jdW1lbnQnICYmICFub2RlLnBhcmVudCkge1xuICAgICAgc3RhY2sucG9wKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh2aXNpdG9ycy5sZW5ndGggPiAwICYmIHZpc2l0LnZpc2l0b3JJbmRleCA8IHZpc2l0b3JzLmxlbmd0aCkge1xuICAgICAgbGV0IFtwbHVnaW4sIHZpc2l0b3JdID0gdmlzaXRvcnNbdmlzaXQudmlzaXRvckluZGV4XVxuICAgICAgdmlzaXQudmlzaXRvckluZGV4ICs9IDFcbiAgICAgIGlmICh2aXNpdC52aXNpdG9ySW5kZXggPT09IHZpc2l0b3JzLmxlbmd0aCkge1xuICAgICAgICB2aXNpdC52aXNpdG9ycyA9IFtdXG4gICAgICAgIHZpc2l0LnZpc2l0b3JJbmRleCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzdWx0Lmxhc3RQbHVnaW4gPSBwbHVnaW5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB2aXNpdG9yKG5vZGUudG9Qcm94eSgpLCB0aGlzLmhlbHBlcnMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZSwgbm9kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmlzaXQuaXRlcmF0b3IgIT09IDApIHtcbiAgICAgIGxldCBpdGVyYXRvciA9IHZpc2l0Lml0ZXJhdG9yXG4gICAgICBsZXQgY2hpbGRcbiAgICAgIHdoaWxlICgoY2hpbGQgPSBub2RlLm5vZGVzW25vZGUuaW5kZXhlc1tpdGVyYXRvcl1dKSkge1xuICAgICAgICBub2RlLmluZGV4ZXNbaXRlcmF0b3JdICs9IDFcbiAgICAgICAgaWYgKCFjaGlsZFtpc0NsZWFuXSkge1xuICAgICAgICAgIGNoaWxkW2lzQ2xlYW5dID0gdHJ1ZVxuICAgICAgICAgIHN0YWNrLnB1c2godG9TdGFjayhjaGlsZCkpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZpc2l0Lml0ZXJhdG9yID0gMFxuICAgICAgZGVsZXRlIG5vZGUuaW5kZXhlc1tpdGVyYXRvcl1cbiAgICB9XG5cbiAgICBsZXQgZXZlbnRzID0gdmlzaXQuZXZlbnRzXG4gICAgd2hpbGUgKHZpc2l0LmV2ZW50SW5kZXggPCBldmVudHMubGVuZ3RoKSB7XG4gICAgICBsZXQgZXZlbnQgPSBldmVudHNbdmlzaXQuZXZlbnRJbmRleF1cbiAgICAgIHZpc2l0LmV2ZW50SW5kZXggKz0gMVxuICAgICAgaWYgKGV2ZW50ID09PSBDSElMRFJFTikge1xuICAgICAgICBpZiAobm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgIG5vZGVbaXNDbGVhbl0gPSB0cnVlXG4gICAgICAgICAgdmlzaXQuaXRlcmF0b3IgPSBub2RlLmdldEl0ZXJhdG9yKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgIHZpc2l0LnZpc2l0b3JzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICBzdGFjay5wb3AoKVxuICB9XG5cbiAgd2Fsa1N5bmMobm9kZSkge1xuICAgIG5vZGVbaXNDbGVhbl0gPSB0cnVlXG4gICAgbGV0IGV2ZW50cyA9IGdldEV2ZW50cyhub2RlKVxuICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgaWYgKGV2ZW50ID09PSBDSElMRFJFTikge1xuICAgICAgICBpZiAobm9kZS5ub2Rlcykge1xuICAgICAgICAgIG5vZGUuZWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICBpZiAoIWNoaWxkW2lzQ2xlYW5dKSB0aGlzLndhbGtTeW5jKGNoaWxkKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB2aXNpdG9ycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XVxuICAgICAgICBpZiAodmlzaXRvcnMpIHtcbiAgICAgICAgICBpZiAodGhpcy52aXNpdFN5bmModmlzaXRvcnMsIG5vZGUudG9Qcm94eSgpKSkgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3YXJuaW5ncygpIHtcbiAgICByZXR1cm4gdGhpcy5zeW5jKCkud2FybmluZ3MoKVxuICB9XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkuY29udGVudFxuICB9XG5cbiAgZ2V0IGNzcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5jc3NcbiAgfVxuXG4gIGdldCBtYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkubWFwXG4gIH1cblxuICBnZXQgbWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3luYygpLm1lc3NhZ2VzXG4gIH1cblxuICBnZXQgb3B0cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQub3B0c1xuICB9XG5cbiAgZ2V0IHByb2Nlc3NvcigpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQucHJvY2Vzc29yXG4gIH1cblxuICBnZXQgcm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zeW5jKCkucm9vdFxuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnTGF6eVJlc3VsdCdcbiAgfVxufVxuXG5MYXp5UmVzdWx0LnJlZ2lzdGVyUG9zdGNzcyA9IGRlcGVuZGFudCA9PiB7XG4gIHBvc3Rjc3MgPSBkZXBlbmRhbnRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMYXp5UmVzdWx0XG5MYXp5UmVzdWx0LmRlZmF1bHQgPSBMYXp5UmVzdWx0XG5cblJvb3QucmVnaXN0ZXJMYXp5UmVzdWx0KExhenlSZXN1bHQpXG5Eb2N1bWVudC5yZWdpc3RlckxhenlSZXN1bHQoTGF6eVJlc3VsdClcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgbGlzdCA9IHtcbiAgY29tbWEoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBbJywnXSwgdHJ1ZSlcbiAgfSxcblxuICBzcGFjZShzdHJpbmcpIHtcbiAgICBsZXQgc3BhY2VzID0gWycgJywgJ1xcbicsICdcXHQnXVxuICAgIHJldHVybiBsaXN0LnNwbGl0KHN0cmluZywgc3BhY2VzKVxuICB9LFxuXG4gIHNwbGl0KHN0cmluZywgc2VwYXJhdG9ycywgbGFzdCkge1xuICAgIGxldCBhcnJheSA9IFtdXG4gICAgbGV0IGN1cnJlbnQgPSAnJ1xuICAgIGxldCBzcGxpdCA9IGZhbHNlXG5cbiAgICBsZXQgZnVuYyA9IDBcbiAgICBsZXQgaW5RdW90ZSA9IGZhbHNlXG4gICAgbGV0IHByZXZRdW90ZSA9ICcnXG4gICAgbGV0IGVzY2FwZSA9IGZhbHNlXG5cbiAgICBmb3IgKGxldCBsZXR0ZXIgb2Ygc3RyaW5nKSB7XG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIGVzY2FwZSA9IGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKGxldHRlciA9PT0gJ1xcXFwnKSB7XG4gICAgICAgIGVzY2FwZSA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAoaW5RdW90ZSkge1xuICAgICAgICBpZiAobGV0dGVyID09PSBwcmV2UXVvdGUpIHtcbiAgICAgICAgICBpblF1b3RlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICdcIicgfHwgbGV0dGVyID09PSBcIidcIikge1xuICAgICAgICBpblF1b3RlID0gdHJ1ZVxuICAgICAgICBwcmV2UXVvdGUgPSBsZXR0ZXJcbiAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnKCcpIHtcbiAgICAgICAgZnVuYyArPSAxXG4gICAgICB9IGVsc2UgaWYgKGxldHRlciA9PT0gJyknKSB7XG4gICAgICAgIGlmIChmdW5jID4gMCkgZnVuYyAtPSAxXG4gICAgICB9IGVsc2UgaWYgKGZ1bmMgPT09IDApIHtcbiAgICAgICAgaWYgKHNlcGFyYXRvcnMuaW5jbHVkZXMobGV0dGVyKSkgc3BsaXQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChzcGxpdCkge1xuICAgICAgICBpZiAoY3VycmVudCAhPT0gJycpIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpXG4gICAgICAgIGN1cnJlbnQgPSAnJ1xuICAgICAgICBzcGxpdCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50ICs9IGxldHRlclxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsYXN0IHx8IGN1cnJlbnQgIT09ICcnKSBhcnJheS5wdXNoKGN1cnJlbnQudHJpbSgpKVxuICAgIHJldHVybiBhcnJheVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdFxubGlzdC5kZWZhdWx0ID0gbGlzdFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCB7IFNvdXJjZU1hcENvbnN1bWVyLCBTb3VyY2VNYXBHZW5lcmF0b3IgfSA9IHJlcXVpcmUoJ3NvdXJjZS1tYXAtanMnKVxubGV0IHsgZGlybmFtZSwgcmVsYXRpdmUsIHJlc29sdmUsIHNlcCB9ID0gcmVxdWlyZSgncGF0aCcpXG5sZXQgeyBwYXRoVG9GaWxlVVJMIH0gPSByZXF1aXJlKCd1cmwnKVxuXG5sZXQgSW5wdXQgPSByZXF1aXJlKCcuL2lucHV0JylcblxubGV0IHNvdXJjZU1hcEF2YWlsYWJsZSA9IEJvb2xlYW4oU291cmNlTWFwQ29uc3VtZXIgJiYgU291cmNlTWFwR2VuZXJhdG9yKVxubGV0IHBhdGhBdmFpbGFibGUgPSBCb29sZWFuKGRpcm5hbWUgJiYgcmVzb2x2ZSAmJiByZWxhdGl2ZSAmJiBzZXApXG5cbmNsYXNzIE1hcEdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKHN0cmluZ2lmeSwgcm9vdCwgb3B0cywgY3NzU3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcbiAgICB0aGlzLm1hcE9wdHMgPSBvcHRzLm1hcCB8fCB7fVxuICAgIHRoaXMucm9vdCA9IHJvb3RcbiAgICB0aGlzLm9wdHMgPSBvcHRzXG4gICAgdGhpcy5jc3MgPSBjc3NTdHJpbmdcbiAgICB0aGlzLnVzZXNGaWxlVXJscyA9ICF0aGlzLm1hcE9wdHMuZnJvbSAmJiB0aGlzLm1hcE9wdHMuYWJzb2x1dGVcblxuICAgIHRoaXMubWVtb2l6ZWRGaWxlVVJMcyA9IG5ldyBNYXAoKVxuICAgIHRoaXMubWVtb2l6ZWRQYXRocyA9IG5ldyBNYXAoKVxuICAgIHRoaXMubWVtb2l6ZWRVUkxzID0gbmV3IE1hcCgpXG4gIH1cblxuICBhZGRBbm5vdGF0aW9uKCkge1xuICAgIGxldCBjb250ZW50XG5cbiAgICBpZiAodGhpcy5pc0lubGluZSgpKSB7XG4gICAgICBjb250ZW50ID1cbiAgICAgICAgJ2RhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIHRoaXMudG9CYXNlNjQodGhpcy5tYXAudG9TdHJpbmcoKSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb250ZW50ID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb24odGhpcy5vcHRzLnRvLCB0aGlzLnJvb3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnQgPSB0aGlzLm91dHB1dEZpbGUoKSArICcubWFwJ1xuICAgIH1cbiAgICBsZXQgZW9sID0gJ1xcbidcbiAgICBpZiAodGhpcy5jc3MuaW5jbHVkZXMoJ1xcclxcbicpKSBlb2wgPSAnXFxyXFxuJ1xuXG4gICAgdGhpcy5jc3MgKz0gZW9sICsgJy8qIyBzb3VyY2VNYXBwaW5nVVJMPScgKyBjb250ZW50ICsgJyAqLydcbiAgfVxuXG4gIGFwcGx5UHJldk1hcHMoKSB7XG4gICAgZm9yIChsZXQgcHJldiBvZiB0aGlzLnByZXZpb3VzKCkpIHtcbiAgICAgIGxldCBmcm9tID0gdGhpcy50b1VybCh0aGlzLnBhdGgocHJldi5maWxlKSlcbiAgICAgIGxldCByb290ID0gcHJldi5yb290IHx8IGRpcm5hbWUocHJldi5maWxlKVxuICAgICAgbGV0IG1hcFxuXG4gICAgICBpZiAodGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50ID09PSBmYWxzZSkge1xuICAgICAgICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIocHJldi50ZXh0KVxuICAgICAgICBpZiAobWFwLnNvdXJjZXNDb250ZW50KSB7XG4gICAgICAgICAgbWFwLnNvdXJjZXNDb250ZW50ID0gbWFwLnNvdXJjZXNDb250ZW50Lm1hcCgoKSA9PiBudWxsKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXAgPSBwcmV2LmNvbnN1bWVyKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5tYXAuYXBwbHlTb3VyY2VNYXAobWFwLCBmcm9tLCB0aGlzLnRvVXJsKHRoaXMucGF0aChyb290KSkpXG4gICAgfVxuICB9XG5cbiAgY2xlYXJBbm5vdGF0aW9uKCkge1xuICAgIGlmICh0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgbGV0IG5vZGVcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJvb3Qubm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgbm9kZSA9IHRoaXMucm9vdC5ub2Rlc1tpXVxuICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnY29tbWVudCcpIGNvbnRpbnVlXG4gICAgICAgIGlmIChub2RlLnRleHQuaW5kZXhPZignIyBzb3VyY2VNYXBwaW5nVVJMPScpID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5yb290LnJlbW92ZUNoaWxkKGkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3NzKSB7XG4gICAgICB0aGlzLmNzcyA9IHRoaXMuY3NzLnJlcGxhY2UoLyhcXG4pP1xcL1xcKiNbXFxTXFxzXSo/XFwqXFwvJC9nbSwgJycpXG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGUoKSB7XG4gICAgdGhpcy5jbGVhckFubm90YXRpb24oKVxuICAgIGlmIChwYXRoQXZhaWxhYmxlICYmIHNvdXJjZU1hcEF2YWlsYWJsZSAmJiB0aGlzLmlzTWFwKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWFwKClcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJlc3VsdCA9ICcnXG4gICAgICB0aGlzLnN0cmluZ2lmeSh0aGlzLnJvb3QsIGkgPT4ge1xuICAgICAgICByZXN1bHQgKz0gaVxuICAgICAgfSlcbiAgICAgIHJldHVybiBbcmVzdWx0XVxuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlTWFwKCkge1xuICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVTdHJpbmcoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGV0IHByZXYgPSB0aGlzLnByZXZpb3VzKClbMF0uY29uc3VtZXIoKVxuICAgICAgcHJldi5maWxlID0gdGhpcy5vdXRwdXRGaWxlKClcbiAgICAgIHRoaXMubWFwID0gU291cmNlTWFwR2VuZXJhdG9yLmZyb21Tb3VyY2VNYXAocHJldilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHsgZmlsZTogdGhpcy5vdXRwdXRGaWxlKCkgfSlcbiAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcoe1xuICAgICAgICBnZW5lcmF0ZWQ6IHsgY29sdW1uOiAwLCBsaW5lOiAxIH0sXG4gICAgICAgIG9yaWdpbmFsOiB7IGNvbHVtbjogMCwgbGluZTogMSB9LFxuICAgICAgICBzb3VyY2U6IHRoaXMub3B0cy5mcm9tXG4gICAgICAgICAgPyB0aGlzLnRvVXJsKHRoaXMucGF0aCh0aGlzLm9wdHMuZnJvbSkpXG4gICAgICAgICAgOiAnPG5vIHNvdXJjZT4nXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzU291cmNlc0NvbnRlbnQoKSkgdGhpcy5zZXRTb3VyY2VzQ29udGVudCgpXG4gICAgaWYgKHRoaXMucm9vdCAmJiB0aGlzLnByZXZpb3VzKCkubGVuZ3RoID4gMCkgdGhpcy5hcHBseVByZXZNYXBzKClcbiAgICBpZiAodGhpcy5pc0Fubm90YXRpb24oKSkgdGhpcy5hZGRBbm5vdGF0aW9uKClcblxuICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcbiAgICAgIHJldHVybiBbdGhpcy5jc3NdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbdGhpcy5jc3MsIHRoaXMubWFwXVxuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlU3RyaW5nKCkge1xuICAgIHRoaXMuY3NzID0gJydcbiAgICB0aGlzLm1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoeyBmaWxlOiB0aGlzLm91dHB1dEZpbGUoKSB9KVxuXG4gICAgbGV0IGxpbmUgPSAxXG4gICAgbGV0IGNvbHVtbiA9IDFcblxuICAgIGxldCBub1NvdXJjZSA9ICc8bm8gc291cmNlPidcbiAgICBsZXQgbWFwcGluZyA9IHtcbiAgICAgIGdlbmVyYXRlZDogeyBjb2x1bW46IDAsIGxpbmU6IDAgfSxcbiAgICAgIG9yaWdpbmFsOiB7IGNvbHVtbjogMCwgbGluZTogMCB9LFxuICAgICAgc291cmNlOiAnJ1xuICAgIH1cblxuICAgIGxldCBsaW5lcywgbGFzdFxuICAgIHRoaXMuc3RyaW5naWZ5KHRoaXMucm9vdCwgKHN0ciwgbm9kZSwgdHlwZSkgPT4ge1xuICAgICAgdGhpcy5jc3MgKz0gc3RyXG5cbiAgICAgIGlmIChub2RlICYmIHR5cGUgIT09ICdlbmQnKSB7XG4gICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmxpbmUgPSBsaW5lXG4gICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmNvbHVtbiA9IGNvbHVtbiAtIDFcbiAgICAgICAgaWYgKG5vZGUuc291cmNlICYmIG5vZGUuc291cmNlLnN0YXJ0KSB7XG4gICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSB0aGlzLnNvdXJjZVBhdGgobm9kZSlcbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmxpbmUgPSBub2RlLnNvdXJjZS5zdGFydC5saW5lXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5jb2x1bW4gPSBub2RlLnNvdXJjZS5zdGFydC5jb2x1bW4gLSAxXG4gICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyhtYXBwaW5nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gbm9Tb3VyY2VcbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmxpbmUgPSAxXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5jb2x1bW4gPSAwXG4gICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyhtYXBwaW5nKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpbmVzID0gc3RyLm1hdGNoKC9cXG4vZylcbiAgICAgIGlmIChsaW5lcykge1xuICAgICAgICBsaW5lICs9IGxpbmVzLmxlbmd0aFxuICAgICAgICBsYXN0ID0gc3RyLmxhc3RJbmRleE9mKCdcXG4nKVxuICAgICAgICBjb2x1bW4gPSBzdHIubGVuZ3RoIC0gbGFzdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uICs9IHN0ci5sZW5ndGhcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUgJiYgdHlwZSAhPT0gJ3N0YXJ0Jykge1xuICAgICAgICBsZXQgcCA9IG5vZGUucGFyZW50IHx8IHsgcmF3czoge30gfVxuICAgICAgICBsZXQgY2hpbGRsZXNzID1cbiAgICAgICAgICBub2RlLnR5cGUgPT09ICdkZWNsJyB8fCAobm9kZS50eXBlID09PSAnYXRydWxlJyAmJiAhbm9kZS5ub2RlcylcbiAgICAgICAgaWYgKCFjaGlsZGxlc3MgfHwgbm9kZSAhPT0gcC5sYXN0IHx8IHAucmF3cy5zZW1pY29sb24pIHtcbiAgICAgICAgICBpZiAobm9kZS5zb3VyY2UgJiYgbm9kZS5zb3VyY2UuZW5kKSB7XG4gICAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHRoaXMuc291cmNlUGF0aChub2RlKVxuICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gbm9kZS5zb3VyY2UuZW5kLmxpbmVcbiAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwuY29sdW1uID0gbm9kZS5zb3VyY2UuZW5kLmNvbHVtbiAtIDFcbiAgICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmxpbmUgPSBsaW5lXG4gICAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5jb2x1bW4gPSBjb2x1bW4gLSAyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKG1hcHBpbmcpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gbm9Tb3VyY2VcbiAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwubGluZSA9IDFcbiAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwuY29sdW1uID0gMFxuICAgICAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQubGluZSA9IGxpbmVcbiAgICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmNvbHVtbiA9IGNvbHVtbiAtIDFcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcobWFwcGluZylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaXNBbm5vdGF0aW9uKCkge1xuICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLmFubm90YXRpb25cbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkuc29tZShpID0+IGkuYW5ub3RhdGlvbilcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlzSW5saW5lKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmlubGluZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcE9wdHMuaW5saW5lXG4gICAgfVxuXG4gICAgbGV0IGFubm90YXRpb24gPSB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvblxuICAgIGlmICh0eXBlb2YgYW5ub3RhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgYW5ub3RhdGlvbiAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkuc29tZShpID0+IGkuaW5saW5lKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaXNNYXAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMubWFwICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICEhdGhpcy5vcHRzLm1hcFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcmV2aW91cygpLmxlbmd0aCA+IDBcbiAgfVxuXG4gIGlzU291cmNlc0NvbnRlbnQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuc291cmNlc0NvbnRlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50XG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmV2aW91cygpLnNvbWUoaSA9PiBpLndpdGhDb250ZW50KCkpXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBvdXRwdXRGaWxlKCkge1xuICAgIGlmICh0aGlzLm9wdHMudG8pIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGgodGhpcy5vcHRzLnRvKVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRzLmZyb20pIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGgodGhpcy5vcHRzLmZyb20pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAndG8uY3NzJ1xuICAgIH1cbiAgfVxuXG4gIHBhdGgoZmlsZSkge1xuICAgIGlmICh0aGlzLm1hcE9wdHMuYWJzb2x1dGUpIHJldHVybiBmaWxlXG4gICAgaWYgKGZpbGUuY2hhckNvZGVBdCgwKSA9PT0gNjAgLyogYDxgICovKSByZXR1cm4gZmlsZVxuICAgIGlmICgvXlxcdys6XFwvXFwvLy50ZXN0KGZpbGUpKSByZXR1cm4gZmlsZVxuICAgIGxldCBjYWNoZWQgPSB0aGlzLm1lbW9pemVkUGF0aHMuZ2V0KGZpbGUpXG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZFxuXG4gICAgbGV0IGZyb20gPSB0aGlzLm9wdHMudG8gPyBkaXJuYW1lKHRoaXMub3B0cy50bykgOiAnLidcblxuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBmcm9tID0gZGlybmFtZShyZXNvbHZlKGZyb20sIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uKSlcbiAgICB9XG5cbiAgICBsZXQgcGF0aCA9IHJlbGF0aXZlKGZyb20sIGZpbGUpXG4gICAgdGhpcy5tZW1vaXplZFBhdGhzLnNldChmaWxlLCBwYXRoKVxuXG4gICAgcmV0dXJuIHBhdGhcbiAgfVxuXG4gIHByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wcmV2aW91c01hcHMpIHtcbiAgICAgIHRoaXMucHJldmlvdXNNYXBzID0gW11cbiAgICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgICAgdGhpcy5yb290LndhbGsobm9kZSA9PiB7XG4gICAgICAgICAgaWYgKG5vZGUuc291cmNlICYmIG5vZGUuc291cmNlLmlucHV0Lm1hcCkge1xuICAgICAgICAgICAgbGV0IG1hcCA9IG5vZGUuc291cmNlLmlucHV0Lm1hcFxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZpb3VzTWFwcy5pbmNsdWRlcyhtYXApKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJldmlvdXNNYXBzLnB1c2gobWFwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpbnB1dCA9IG5ldyBJbnB1dCh0aGlzLmNzcywgdGhpcy5vcHRzKVxuICAgICAgICBpZiAoaW5wdXQubWFwKSB0aGlzLnByZXZpb3VzTWFwcy5wdXNoKGlucHV0Lm1hcClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcmV2aW91c01hcHNcbiAgfVxuXG4gIHNldFNvdXJjZXNDb250ZW50KCkge1xuICAgIGxldCBhbHJlYWR5ID0ge31cbiAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICB0aGlzLnJvb3Qud2Fsayhub2RlID0+IHtcbiAgICAgICAgaWYgKG5vZGUuc291cmNlKSB7XG4gICAgICAgICAgbGV0IGZyb20gPSBub2RlLnNvdXJjZS5pbnB1dC5mcm9tXG4gICAgICAgICAgaWYgKGZyb20gJiYgIWFscmVhZHlbZnJvbV0pIHtcbiAgICAgICAgICAgIGFscmVhZHlbZnJvbV0gPSB0cnVlXG4gICAgICAgICAgICBsZXQgZnJvbVVybCA9IHRoaXMudXNlc0ZpbGVVcmxzXG4gICAgICAgICAgICAgID8gdGhpcy50b0ZpbGVVcmwoZnJvbSlcbiAgICAgICAgICAgICAgOiB0aGlzLnRvVXJsKHRoaXMucGF0aChmcm9tKSlcbiAgICAgICAgICAgIHRoaXMubWFwLnNldFNvdXJjZUNvbnRlbnQoZnJvbVVybCwgbm9kZS5zb3VyY2UuaW5wdXQuY3NzKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3NzKSB7XG4gICAgICBsZXQgZnJvbSA9IHRoaXMub3B0cy5mcm9tXG4gICAgICAgID8gdGhpcy50b1VybCh0aGlzLnBhdGgodGhpcy5vcHRzLmZyb20pKVxuICAgICAgICA6ICc8bm8gc291cmNlPidcbiAgICAgIHRoaXMubWFwLnNldFNvdXJjZUNvbnRlbnQoZnJvbSwgdGhpcy5jc3MpXG4gICAgfVxuICB9XG5cbiAgc291cmNlUGF0aChub2RlKSB7XG4gICAgaWYgKHRoaXMubWFwT3B0cy5mcm9tKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1VybCh0aGlzLm1hcE9wdHMuZnJvbSlcbiAgICB9IGVsc2UgaWYgKHRoaXMudXNlc0ZpbGVVcmxzKSB7XG4gICAgICByZXR1cm4gdGhpcy50b0ZpbGVVcmwobm9kZS5zb3VyY2UuaW5wdXQuZnJvbSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudG9VcmwodGhpcy5wYXRoKG5vZGUuc291cmNlLmlucHV0LmZyb20pKVxuICAgIH1cbiAgfVxuXG4gIHRvQmFzZTY0KHN0cikge1xuICAgIGlmIChCdWZmZXIpIHtcbiAgICAgIHJldHVybiBCdWZmZXIuZnJvbShzdHIpLnRvU3RyaW5nKCdiYXNlNjQnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gd2luZG93LmJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKVxuICAgIH1cbiAgfVxuXG4gIHRvRmlsZVVybChwYXRoKSB7XG4gICAgbGV0IGNhY2hlZCA9IHRoaXMubWVtb2l6ZWRGaWxlVVJMcy5nZXQocGF0aClcbiAgICBpZiAoY2FjaGVkKSByZXR1cm4gY2FjaGVkXG5cbiAgICBpZiAocGF0aFRvRmlsZVVSTCkge1xuICAgICAgbGV0IGZpbGVVUkwgPSBwYXRoVG9GaWxlVVJMKHBhdGgpLnRvU3RyaW5nKClcbiAgICAgIHRoaXMubWVtb2l6ZWRGaWxlVVJMcy5zZXQocGF0aCwgZmlsZVVSTClcblxuICAgICAgcmV0dXJuIGZpbGVVUkxcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYG1hcC5hYnNvbHV0ZWAgb3B0aW9uIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBQb3N0Q1NTIGJ1aWxkJ1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHRvVXJsKHBhdGgpIHtcbiAgICBsZXQgY2FjaGVkID0gdGhpcy5tZW1vaXplZFVSTHMuZ2V0KHBhdGgpXG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZFxuXG4gICAgaWYgKHNlcCA9PT0gJ1xcXFwnKSB7XG4gICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXFxcL2csICcvJylcbiAgICB9XG5cbiAgICBsZXQgdXJsID0gZW5jb2RlVVJJKHBhdGgpLnJlcGxhY2UoL1sjP10vZywgZW5jb2RlVVJJQ29tcG9uZW50KVxuICAgIHRoaXMubWVtb2l6ZWRVUkxzLnNldChwYXRoLCB1cmwpXG5cbiAgICByZXR1cm4gdXJsXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXBHZW5lcmF0b3JcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgTWFwR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9tYXAtZ2VuZXJhdG9yJylcbmxldCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpXG5sZXQgd2Fybk9uY2UgPSByZXF1aXJlKCcuL3dhcm4tb25jZScpXG5sZXQgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IFJlc3VsdCA9IHJlcXVpcmUoJy4vcmVzdWx0JylcblxuY2xhc3MgTm9Xb3JrUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHJvY2Vzc29yLCBjc3MsIG9wdHMpIHtcbiAgICBjc3MgPSBjc3MudG9TdHJpbmcoKVxuICAgIHRoaXMuc3RyaW5naWZpZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5fcHJvY2Vzc29yID0gcHJvY2Vzc29yXG4gICAgdGhpcy5fY3NzID0gY3NzXG4gICAgdGhpcy5fb3B0cyA9IG9wdHNcbiAgICB0aGlzLl9tYXAgPSB1bmRlZmluZWRcbiAgICBsZXQgcm9vdFxuXG4gICAgbGV0IHN0ciA9IHN0cmluZ2lmeVxuICAgIHRoaXMucmVzdWx0ID0gbmV3IFJlc3VsdCh0aGlzLl9wcm9jZXNzb3IsIHJvb3QsIHRoaXMuX29wdHMpXG4gICAgdGhpcy5yZXN1bHQuY3NzID0gY3NzXG5cbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5yZXN1bHQsICdyb290Jywge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gc2VsZi5yb290XG4gICAgICB9XG4gICAgfSlcblxuICAgIGxldCBtYXAgPSBuZXcgTWFwR2VuZXJhdG9yKHN0ciwgcm9vdCwgdGhpcy5fb3B0cywgY3NzKVxuICAgIGlmIChtYXAuaXNNYXAoKSkge1xuICAgICAgbGV0IFtnZW5lcmF0ZWRDU1MsIGdlbmVyYXRlZE1hcF0gPSBtYXAuZ2VuZXJhdGUoKVxuICAgICAgaWYgKGdlbmVyYXRlZENTUykge1xuICAgICAgICB0aGlzLnJlc3VsdC5jc3MgPSBnZW5lcmF0ZWRDU1NcbiAgICAgIH1cbiAgICAgIGlmIChnZW5lcmF0ZWRNYXApIHtcbiAgICAgICAgdGhpcy5yZXN1bHQubWFwID0gZ2VuZXJhdGVkTWFwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHJldHVybiBQcm9taXNlLnJlamVjdCh0aGlzLmVycm9yKVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5yZXN1bHQpXG4gIH1cblxuICBjYXRjaChvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS5jYXRjaChvblJlamVjdGVkKVxuICB9XG5cbiAgZmluYWxseShvbkZpbmFsbHkpIHtcbiAgICByZXR1cm4gdGhpcy5hc3luYygpLnRoZW4ob25GaW5hbGx5LCBvbkZpbmFsbHkpXG4gIH1cblxuICBzeW5jKCkge1xuICAgIGlmICh0aGlzLmVycm9yKSB0aHJvdyB0aGlzLmVycm9yXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0XG4gIH1cblxuICB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICghKCdmcm9tJyBpbiB0aGlzLl9vcHRzKSkge1xuICAgICAgICB3YXJuT25jZShcbiAgICAgICAgICAnV2l0aG91dCBgZnJvbWAgb3B0aW9uIFBvc3RDU1MgY291bGQgZ2VuZXJhdGUgd3Jvbmcgc291cmNlIG1hcCAnICtcbiAgICAgICAgICAgICdhbmQgd2lsbCBub3QgZmluZCBCcm93c2Vyc2xpc3QgY29uZmlnLiBTZXQgaXQgdG8gQ1NTIGZpbGUgcGF0aCAnICtcbiAgICAgICAgICAgICdvciB0byBgdW5kZWZpbmVkYCB0byBwcmV2ZW50IHRoaXMgd2FybmluZy4nXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hc3luYygpLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY3NzXG4gIH1cblxuICB3YXJuaW5ncygpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGdldCBjb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5jc3NcbiAgfVxuXG4gIGdldCBjc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LmNzc1xuICB9XG5cbiAgZ2V0IG1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQubWFwXG4gIH1cblxuICBnZXQgbWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBnZXQgb3B0cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQub3B0c1xuICB9XG5cbiAgZ2V0IHByb2Nlc3NvcigpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQucHJvY2Vzc29yXG4gIH1cblxuICBnZXQgcm9vdCgpIHtcbiAgICBpZiAodGhpcy5fcm9vdCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RcbiAgICB9XG5cbiAgICBsZXQgcm9vdFxuICAgIGxldCBwYXJzZXIgPSBwYXJzZVxuXG4gICAgdHJ5IHtcbiAgICAgIHJvb3QgPSBwYXJzZXIodGhpcy5fY3NzLCB0aGlzLl9vcHRzKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmVycm9yID0gZXJyb3JcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lcnJvcikge1xuICAgICAgdGhyb3cgdGhpcy5lcnJvclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yb290ID0gcm9vdFxuICAgICAgcmV0dXJuIHJvb3RcbiAgICB9XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdOb1dvcmtSZXN1bHQnXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb1dvcmtSZXN1bHRcbk5vV29ya1Jlc3VsdC5kZWZhdWx0ID0gTm9Xb3JrUmVzdWx0XG4iLCIndXNlIHN0cmljdCdcblxubGV0IHsgaXNDbGVhbiwgbXkgfSA9IHJlcXVpcmUoJy4vc3ltYm9scycpXG5sZXQgQ3NzU3ludGF4RXJyb3IgPSByZXF1aXJlKCcuL2Nzcy1zeW50YXgtZXJyb3InKVxubGV0IFN0cmluZ2lmaWVyID0gcmVxdWlyZSgnLi9zdHJpbmdpZmllcicpXG5sZXQgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKVxuXG5mdW5jdGlvbiBjbG9uZU5vZGUob2JqLCBwYXJlbnQpIHtcbiAgbGV0IGNsb25lZCA9IG5ldyBvYmouY29uc3RydWN0b3IoKVxuXG4gIGZvciAobGV0IGkgaW4gb2JqKSB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkge1xuICAgICAgLyogYzggaWdub3JlIG5leHQgMiAqL1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYgKGkgPT09ICdwcm94eUNhY2hlJykgY29udGludWVcbiAgICBsZXQgdmFsdWUgPSBvYmpbaV1cbiAgICBsZXQgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuXG4gICAgaWYgKGkgPT09ICdwYXJlbnQnICYmIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocGFyZW50KSBjbG9uZWRbaV0gPSBwYXJlbnRcbiAgICB9IGVsc2UgaWYgKGkgPT09ICdzb3VyY2UnKSB7XG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGNsb25lZFtpXSA9IHZhbHVlLm1hcChqID0+IGNsb25lTm9kZShqLCBjbG9uZWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHZhbHVlID0gY2xvbmVOb2RlKHZhbHVlKVxuICAgICAgY2xvbmVkW2ldID0gdmFsdWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xvbmVkXG59XG5cbmNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cyA9IHt9KSB7XG4gICAgdGhpcy5yYXdzID0ge31cbiAgICB0aGlzW2lzQ2xlYW5dID0gZmFsc2VcbiAgICB0aGlzW215XSA9IHRydWVcblxuICAgIGZvciAobGV0IG5hbWUgaW4gZGVmYXVsdHMpIHtcbiAgICAgIGlmIChuYW1lID09PSAnbm9kZXMnKSB7XG4gICAgICAgIHRoaXMubm9kZXMgPSBbXVxuICAgICAgICBmb3IgKGxldCBub2RlIG9mIGRlZmF1bHRzW25hbWVdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZChub2RlLmNsb25lKCkpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKG5vZGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW25hbWVdID0gZGVmYXVsdHNbbmFtZV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRUb0Vycm9yKGVycm9yKSB7XG4gICAgZXJyb3IucG9zdGNzc05vZGUgPSB0aGlzXG4gICAgaWYgKGVycm9yLnN0YWNrICYmIHRoaXMuc291cmNlICYmIC9cXG5cXHN7NH1hdCAvLnRlc3QoZXJyb3Iuc3RhY2spKSB7XG4gICAgICBsZXQgcyA9IHRoaXMuc291cmNlXG4gICAgICBlcnJvci5zdGFjayA9IGVycm9yLnN0YWNrLnJlcGxhY2UoXG4gICAgICAgIC9cXG5cXHN7NH1hdCAvLFxuICAgICAgICBgJCYke3MuaW5wdXQuZnJvbX06JHtzLnN0YXJ0LmxpbmV9OiR7cy5zdGFydC5jb2x1bW59JCZgXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBlcnJvclxuICB9XG5cbiAgYWZ0ZXIoYWRkKSB7XG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgYWRkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhc3NpZ24ob3ZlcnJpZGVzID0ge30pIHtcbiAgICBmb3IgKGxldCBuYW1lIGluIG92ZXJyaWRlcykge1xuICAgICAgdGhpc1tuYW1lXSA9IG92ZXJyaWRlc1tuYW1lXVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYmVmb3JlKGFkZCkge1xuICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBhZGQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNsZWFuUmF3cyhrZWVwQmV0d2Vlbikge1xuICAgIGRlbGV0ZSB0aGlzLnJhd3MuYmVmb3JlXG4gICAgZGVsZXRlIHRoaXMucmF3cy5hZnRlclxuICAgIGlmICgha2VlcEJldHdlZW4pIGRlbGV0ZSB0aGlzLnJhd3MuYmV0d2VlblxuICB9XG5cbiAgY2xvbmUob3ZlcnJpZGVzID0ge30pIHtcbiAgICBsZXQgY2xvbmVkID0gY2xvbmVOb2RlKHRoaXMpXG4gICAgZm9yIChsZXQgbmFtZSBpbiBvdmVycmlkZXMpIHtcbiAgICAgIGNsb25lZFtuYW1lXSA9IG92ZXJyaWRlc1tuYW1lXVxuICAgIH1cbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICBjbG9uZUFmdGVyKG92ZXJyaWRlcyA9IHt9KSB7XG4gICAgbGV0IGNsb25lZCA9IHRoaXMuY2xvbmUob3ZlcnJpZGVzKVxuICAgIHRoaXMucGFyZW50Lmluc2VydEFmdGVyKHRoaXMsIGNsb25lZClcbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICBjbG9uZUJlZm9yZShvdmVycmlkZXMgPSB7fSkge1xuICAgIGxldCBjbG9uZWQgPSB0aGlzLmNsb25lKG92ZXJyaWRlcylcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgY2xvbmVkKVxuICAgIHJldHVybiBjbG9uZWRcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2UsIG9wdHMgPSB7fSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgbGV0IHsgZW5kLCBzdGFydCB9ID0gdGhpcy5yYW5nZUJ5KG9wdHMpXG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2UuaW5wdXQuZXJyb3IoXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIHsgY29sdW1uOiBzdGFydC5jb2x1bW4sIGxpbmU6IHN0YXJ0LmxpbmUgfSxcbiAgICAgICAgeyBjb2x1bW46IGVuZC5jb2x1bW4sIGxpbmU6IGVuZC5saW5lIH0sXG4gICAgICAgIG9wdHNcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDc3NTeW50YXhFcnJvcihtZXNzYWdlKVxuICB9XG5cbiAgZ2V0UHJveHlQcm9jZXNzb3IoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldChub2RlLCBwcm9wKSB7XG4gICAgICAgIGlmIChwcm9wID09PSAncHJveHlPZicpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9IGVsc2UgaWYgKHByb3AgPT09ICdyb290Jykge1xuICAgICAgICAgIHJldHVybiAoKSA9PiBub2RlLnJvb3QoKS50b1Byb3h5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVtwcm9wXVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzZXQobm9kZSwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG5vZGVbcHJvcF0gPT09IHZhbHVlKSByZXR1cm4gdHJ1ZVxuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWVcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3AgPT09ICdwcm9wJyB8fFxuICAgICAgICAgIHByb3AgPT09ICd2YWx1ZScgfHxcbiAgICAgICAgICBwcm9wID09PSAnbmFtZScgfHxcbiAgICAgICAgICBwcm9wID09PSAncGFyYW1zJyB8fFxuICAgICAgICAgIHByb3AgPT09ICdpbXBvcnRhbnQnIHx8XG4gICAgICAgICAgLyogYzggaWdub3JlIG5leHQgKi9cbiAgICAgICAgICBwcm9wID09PSAndGV4dCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgbm9kZS5tYXJrRGlydHkoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbWFya0RpcnR5KCkge1xuICAgIGlmICh0aGlzW2lzQ2xlYW5dKSB7XG4gICAgICB0aGlzW2lzQ2xlYW5dID0gZmFsc2VcbiAgICAgIGxldCBuZXh0ID0gdGhpc1xuICAgICAgd2hpbGUgKChuZXh0ID0gbmV4dC5wYXJlbnQpKSB7XG4gICAgICAgIG5leHRbaXNDbGVhbl0gPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGxldCBpbmRleCA9IHRoaXMucGFyZW50LmluZGV4KHRoaXMpXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lm5vZGVzW2luZGV4ICsgMV1cbiAgfVxuXG4gIHBvc2l0aW9uQnkob3B0cywgc3RyaW5nUmVwcmVzZW50YXRpb24pIHtcbiAgICBsZXQgcG9zID0gdGhpcy5zb3VyY2Uuc3RhcnRcbiAgICBpZiAob3B0cy5pbmRleCkge1xuICAgICAgcG9zID0gdGhpcy5wb3NpdGlvbkluc2lkZShvcHRzLmluZGV4LCBzdHJpbmdSZXByZXNlbnRhdGlvbilcbiAgICB9IGVsc2UgaWYgKG9wdHMud29yZCkge1xuICAgICAgc3RyaW5nUmVwcmVzZW50YXRpb24gPSB0aGlzLnRvU3RyaW5nKClcbiAgICAgIGxldCBpbmRleCA9IHN0cmluZ1JlcHJlc2VudGF0aW9uLmluZGV4T2Yob3B0cy53b3JkKVxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkgcG9zID0gdGhpcy5wb3NpdGlvbkluc2lkZShpbmRleCwgc3RyaW5nUmVwcmVzZW50YXRpb24pXG4gICAgfVxuICAgIHJldHVybiBwb3NcbiAgfVxuXG4gIHBvc2l0aW9uSW5zaWRlKGluZGV4LCBzdHJpbmdSZXByZXNlbnRhdGlvbikge1xuICAgIGxldCBzdHJpbmcgPSBzdHJpbmdSZXByZXNlbnRhdGlvbiB8fCB0aGlzLnRvU3RyaW5nKClcbiAgICBsZXQgY29sdW1uID0gdGhpcy5zb3VyY2Uuc3RhcnQuY29sdW1uXG4gICAgbGV0IGxpbmUgPSB0aGlzLnNvdXJjZS5zdGFydC5saW5lXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcbiAgICAgIGlmIChzdHJpbmdbaV0gPT09ICdcXG4nKSB7XG4gICAgICAgIGNvbHVtbiA9IDFcbiAgICAgICAgbGluZSArPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW4gKz0gMVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGNvbHVtbiwgbGluZSB9XG4gIH1cblxuICBwcmV2KCkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybiB1bmRlZmluZWRcbiAgICBsZXQgaW5kZXggPSB0aGlzLnBhcmVudC5pbmRleCh0aGlzKVxuICAgIHJldHVybiB0aGlzLnBhcmVudC5ub2Rlc1tpbmRleCAtIDFdXG4gIH1cblxuICByYW5nZUJ5KG9wdHMpIHtcbiAgICBsZXQgc3RhcnQgPSB7XG4gICAgICBjb2x1bW46IHRoaXMuc291cmNlLnN0YXJ0LmNvbHVtbixcbiAgICAgIGxpbmU6IHRoaXMuc291cmNlLnN0YXJ0LmxpbmVcbiAgICB9XG4gICAgbGV0IGVuZCA9IHRoaXMuc291cmNlLmVuZFxuICAgICAgPyB7XG4gICAgICAgIGNvbHVtbjogdGhpcy5zb3VyY2UuZW5kLmNvbHVtbiArIDEsXG4gICAgICAgIGxpbmU6IHRoaXMuc291cmNlLmVuZC5saW5lXG4gICAgICB9XG4gICAgICA6IHtcbiAgICAgICAgY29sdW1uOiBzdGFydC5jb2x1bW4gKyAxLFxuICAgICAgICBsaW5lOiBzdGFydC5saW5lXG4gICAgICB9XG5cbiAgICBpZiAob3B0cy53b3JkKSB7XG4gICAgICBsZXQgc3RyaW5nUmVwcmVzZW50YXRpb24gPSB0aGlzLnRvU3RyaW5nKClcbiAgICAgIGxldCBpbmRleCA9IHN0cmluZ1JlcHJlc2VudGF0aW9uLmluZGV4T2Yob3B0cy53b3JkKVxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBzdGFydCA9IHRoaXMucG9zaXRpb25JbnNpZGUoaW5kZXgsIHN0cmluZ1JlcHJlc2VudGF0aW9uKVxuICAgICAgICBlbmQgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKGluZGV4ICsgb3B0cy53b3JkLmxlbmd0aCwgc3RyaW5nUmVwcmVzZW50YXRpb24pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRzLnN0YXJ0KSB7XG4gICAgICAgIHN0YXJ0ID0ge1xuICAgICAgICAgIGNvbHVtbjogb3B0cy5zdGFydC5jb2x1bW4sXG4gICAgICAgICAgbGluZTogb3B0cy5zdGFydC5saW5lXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3B0cy5pbmRleCkge1xuICAgICAgICBzdGFydCA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5pbmRleClcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuZW5kKSB7XG4gICAgICAgIGVuZCA9IHtcbiAgICAgICAgICBjb2x1bW46IG9wdHMuZW5kLmNvbHVtbixcbiAgICAgICAgICBsaW5lOiBvcHRzLmVuZC5saW5lXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3B0cy5lbmRJbmRleCkge1xuICAgICAgICBlbmQgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKG9wdHMuZW5kSW5kZXgpXG4gICAgICB9IGVsc2UgaWYgKG9wdHMuaW5kZXgpIHtcbiAgICAgICAgZW5kID0gdGhpcy5wb3NpdGlvbkluc2lkZShvcHRzLmluZGV4ICsgMSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBlbmQubGluZSA8IHN0YXJ0LmxpbmUgfHxcbiAgICAgIChlbmQubGluZSA9PT0gc3RhcnQubGluZSAmJiBlbmQuY29sdW1uIDw9IHN0YXJ0LmNvbHVtbilcbiAgICApIHtcbiAgICAgIGVuZCA9IHsgY29sdW1uOiBzdGFydC5jb2x1bW4gKyAxLCBsaW5lOiBzdGFydC5saW5lIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBlbmQsIHN0YXJ0IH1cbiAgfVxuXG4gIHJhdyhwcm9wLCBkZWZhdWx0VHlwZSkge1xuICAgIGxldCBzdHIgPSBuZXcgU3RyaW5naWZpZXIoKVxuICAgIHJldHVybiBzdHIucmF3KHRoaXMsIHByb3AsIGRlZmF1bHRUeXBlKVxuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcylcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVwbGFjZVdpdGgoLi4ubm9kZXMpIHtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGxldCBib29rbWFyayA9IHRoaXNcbiAgICAgIGxldCBmb3VuZFNlbGYgPSBmYWxzZVxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAobm9kZSA9PT0gdGhpcykge1xuICAgICAgICAgIGZvdW5kU2VsZiA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChmb3VuZFNlbGYpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudC5pbnNlcnRBZnRlcihib29rbWFyaywgbm9kZSlcbiAgICAgICAgICBib29rbWFyayA9IG5vZGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUoYm9va21hcmssIG5vZGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFmb3VuZFNlbGYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByb290KCkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzXG4gICAgd2hpbGUgKHJlc3VsdC5wYXJlbnQgJiYgcmVzdWx0LnBhcmVudC50eXBlICE9PSAnZG9jdW1lbnQnKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucGFyZW50XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHRvSlNPTihfLCBpbnB1dHMpIHtcbiAgICBsZXQgZml4ZWQgPSB7fVxuICAgIGxldCBlbWl0SW5wdXRzID0gaW5wdXRzID09IG51bGxcbiAgICBpbnB1dHMgPSBpbnB1dHMgfHwgbmV3IE1hcCgpXG4gICAgbGV0IGlucHV0c05leHRJbmRleCA9IDBcblxuICAgIGZvciAobGV0IG5hbWUgaW4gdGhpcykge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcywgbmFtZSkpIHtcbiAgICAgICAgLyogYzggaWdub3JlIG5leHQgMiAqL1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgaWYgKG5hbWUgPT09ICdwYXJlbnQnIHx8IG5hbWUgPT09ICdwcm94eUNhY2hlJykgY29udGludWVcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXNbbmFtZV1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGZpeGVkW25hbWVdID0gdmFsdWUubWFwKGkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgaS50b0pTT04pIHtcbiAgICAgICAgICAgIHJldHVybiBpLnRvSlNPTihudWxsLCBpbnB1dHMpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnRvSlNPTikge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLnRvSlNPTihudWxsLCBpbnB1dHMpXG4gICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdzb3VyY2UnKSB7XG4gICAgICAgIGxldCBpbnB1dElkID0gaW5wdXRzLmdldCh2YWx1ZS5pbnB1dClcbiAgICAgICAgaWYgKGlucHV0SWQgPT0gbnVsbCkge1xuICAgICAgICAgIGlucHV0SWQgPSBpbnB1dHNOZXh0SW5kZXhcbiAgICAgICAgICBpbnB1dHMuc2V0KHZhbHVlLmlucHV0LCBpbnB1dHNOZXh0SW5kZXgpXG4gICAgICAgICAgaW5wdXRzTmV4dEluZGV4KytcbiAgICAgICAgfVxuICAgICAgICBmaXhlZFtuYW1lXSA9IHtcbiAgICAgICAgICBlbmQ6IHZhbHVlLmVuZCxcbiAgICAgICAgICBpbnB1dElkLFxuICAgICAgICAgIHN0YXJ0OiB2YWx1ZS5zdGFydFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVtaXRJbnB1dHMpIHtcbiAgICAgIGZpeGVkLmlucHV0cyA9IFsuLi5pbnB1dHMua2V5cygpXS5tYXAoaW5wdXQgPT4gaW5wdXQudG9KU09OKCkpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZpeGVkXG4gIH1cblxuICB0b1Byb3h5KCkge1xuICAgIGlmICghdGhpcy5wcm94eUNhY2hlKSB7XG4gICAgICB0aGlzLnByb3h5Q2FjaGUgPSBuZXcgUHJveHkodGhpcywgdGhpcy5nZXRQcm94eVByb2Nlc3NvcigpKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm94eUNhY2hlXG4gIH1cblxuICB0b1N0cmluZyhzdHJpbmdpZmllciA9IHN0cmluZ2lmeSkge1xuICAgIGlmIChzdHJpbmdpZmllci5zdHJpbmdpZnkpIHN0cmluZ2lmaWVyID0gc3RyaW5naWZpZXIuc3RyaW5naWZ5XG4gICAgbGV0IHJlc3VsdCA9ICcnXG4gICAgc3RyaW5naWZpZXIodGhpcywgaSA9PiB7XG4gICAgICByZXN1bHQgKz0gaVxuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgd2FybihyZXN1bHQsIHRleHQsIG9wdHMpIHtcbiAgICBsZXQgZGF0YSA9IHsgbm9kZTogdGhpcyB9XG4gICAgZm9yIChsZXQgaSBpbiBvcHRzKSBkYXRhW2ldID0gb3B0c1tpXVxuICAgIHJldHVybiByZXN1bHQud2Fybih0ZXh0LCBkYXRhKVxuICB9XG5cbiAgZ2V0IHByb3h5T2YoKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVcbk5vZGUuZGVmYXVsdCA9IE5vZGVcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXInKVxubGV0IFBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyJylcbmxldCBJbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQnKVxuXG5mdW5jdGlvbiBwYXJzZShjc3MsIG9wdHMpIHtcbiAgbGV0IGlucHV0ID0gbmV3IElucHV0KGNzcywgb3B0cylcbiAgbGV0IHBhcnNlciA9IG5ldyBQYXJzZXIoaW5wdXQpXG4gIHRyeSB7XG4gICAgcGFyc2VyLnBhcnNlKClcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoZS5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICYmIG9wdHMgJiYgb3B0cy5mcm9tKSB7XG4gICAgICAgIGlmICgvXFwuc2NzcyQvaS50ZXN0KG9wdHMuZnJvbSkpIHtcbiAgICAgICAgICBlLm1lc3NhZ2UgKz1cbiAgICAgICAgICAgICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU0NTUyB3aXRoICcgK1xuICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICd0cnkgYWdhaW4gd2l0aCB0aGUgcG9zdGNzcy1zY3NzIHBhcnNlcidcbiAgICAgICAgfSBlbHNlIGlmICgvXFwuc2Fzcy9pLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPVxuICAgICAgICAgICAgJ1xcbllvdSB0cmllZCB0byBwYXJzZSBTYXNzIHdpdGggJyArXG4gICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLXNhc3MgcGFyc2VyJ1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC5sZXNzJC9pLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPVxuICAgICAgICAgICAgJ1xcbllvdSB0cmllZCB0byBwYXJzZSBMZXNzIHdpdGggJyArXG4gICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLWxlc3MgcGFyc2VyJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IGVcbiAgfVxuXG4gIHJldHVybiBwYXJzZXIucm9vdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlXG5wYXJzZS5kZWZhdWx0ID0gcGFyc2VcblxuQ29udGFpbmVyLnJlZ2lzdGVyUGFyc2UocGFyc2UpXG4iLCIndXNlIHN0cmljdCdcblxubGV0IERlY2xhcmF0aW9uID0gcmVxdWlyZSgnLi9kZWNsYXJhdGlvbicpXG5sZXQgdG9rZW5pemVyID0gcmVxdWlyZSgnLi90b2tlbml6ZScpXG5sZXQgQ29tbWVudCA9IHJlcXVpcmUoJy4vY29tbWVudCcpXG5sZXQgQXRSdWxlID0gcmVxdWlyZSgnLi9hdC1ydWxlJylcbmxldCBSb290ID0gcmVxdWlyZSgnLi9yb290JylcbmxldCBSdWxlID0gcmVxdWlyZSgnLi9ydWxlJylcblxuY29uc3QgU0FGRV9DT01NRU5UX05FSUdIQk9SID0ge1xuICBlbXB0eTogdHJ1ZSxcbiAgc3BhY2U6IHRydWVcbn1cblxuZnVuY3Rpb24gZmluZExhc3RXaXRoUG9zaXRpb24odG9rZW5zKSB7XG4gIGZvciAobGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICBsZXQgcG9zID0gdG9rZW5bM10gfHwgdG9rZW5bMl1cbiAgICBpZiAocG9zKSByZXR1cm4gcG9zXG4gIH1cbn1cblxuY2xhc3MgUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoaW5wdXQpIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXRcblxuICAgIHRoaXMucm9vdCA9IG5ldyBSb290KClcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnJvb3RcbiAgICB0aGlzLnNwYWNlcyA9ICcnXG4gICAgdGhpcy5zZW1pY29sb24gPSBmYWxzZVxuICAgIHRoaXMuY3VzdG9tUHJvcGVydHkgPSBmYWxzZVxuXG4gICAgdGhpcy5jcmVhdGVUb2tlbml6ZXIoKVxuICAgIHRoaXMucm9vdC5zb3VyY2UgPSB7IGlucHV0LCBzdGFydDogeyBjb2x1bW46IDEsIGxpbmU6IDEsIG9mZnNldDogMCB9IH1cbiAgfVxuXG4gIGF0cnVsZSh0b2tlbikge1xuICAgIGxldCBub2RlID0gbmV3IEF0UnVsZSgpXG4gICAgbm9kZS5uYW1lID0gdG9rZW5bMV0uc2xpY2UoMSlcbiAgICBpZiAobm9kZS5uYW1lID09PSAnJykge1xuICAgICAgdGhpcy51bm5hbWVkQXRydWxlKG5vZGUsIHRva2VuKVxuICAgIH1cbiAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0pXG5cbiAgICBsZXQgdHlwZVxuICAgIGxldCBwcmV2XG4gICAgbGV0IHNoaWZ0XG4gICAgbGV0IGxhc3QgPSBmYWxzZVxuICAgIGxldCBvcGVuID0gZmFsc2VcbiAgICBsZXQgcGFyYW1zID0gW11cbiAgICBsZXQgYnJhY2tldHMgPSBbXVxuXG4gICAgd2hpbGUgKCF0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuaXplci5uZXh0VG9rZW4oKVxuICAgICAgdHlwZSA9IHRva2VuWzBdXG5cbiAgICAgIGlmICh0eXBlID09PSAnKCcgfHwgdHlwZSA9PT0gJ1snKSB7XG4gICAgICAgIGJyYWNrZXRzLnB1c2godHlwZSA9PT0gJygnID8gJyknIDogJ10nKVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAneycgJiYgYnJhY2tldHMubGVuZ3RoID4gMCkge1xuICAgICAgICBicmFja2V0cy5wdXNoKCd9JylcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gYnJhY2tldHNbYnJhY2tldHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgYnJhY2tldHMucG9wKClcbiAgICAgIH1cblxuICAgICAgaWYgKGJyYWNrZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJzsnKSB7XG4gICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbih0b2tlblsyXSlcbiAgICAgICAgICBub2RlLnNvdXJjZS5lbmQub2Zmc2V0KytcbiAgICAgICAgICB0aGlzLnNlbWljb2xvbiA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICAgIG9wZW4gPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnfScpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNoaWZ0ID0gcGFyYW1zLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIHByZXYgPSBwYXJhbXNbc2hpZnRdXG4gICAgICAgICAgICB3aGlsZSAocHJldiAmJiBwcmV2WzBdID09PSAnc3BhY2UnKSB7XG4gICAgICAgICAgICAgIHByZXYgPSBwYXJhbXNbLS1zaGlmdF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24ocHJldlszXSB8fCBwcmV2WzJdKVxuICAgICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQub2Zmc2V0KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5lbmQodG9rZW4pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJhbXMucHVzaCh0b2tlbilcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLnB1c2godG9rZW4pXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkge1xuICAgICAgICBsYXN0ID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21FbmQocGFyYW1zKVxuICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG4gICAgICBub2RlLnJhd3MuYWZ0ZXJOYW1lID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydChwYXJhbXMpXG4gICAgICB0aGlzLnJhdyhub2RlLCAncGFyYW1zJywgcGFyYW1zKVxuICAgICAgaWYgKGxhc3QpIHtcbiAgICAgICAgdG9rZW4gPSBwYXJhbXNbcGFyYW1zLmxlbmd0aCAtIDFdXG4gICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24odG9rZW5bM10gfHwgdG9rZW5bMl0pXG4gICAgICAgIG5vZGUuc291cmNlLmVuZC5vZmZzZXQrK1xuICAgICAgICB0aGlzLnNwYWNlcyA9IG5vZGUucmF3cy5iZXR3ZWVuXG4gICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gJydcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5yYXdzLmFmdGVyTmFtZSA9ICcnXG4gICAgICBub2RlLnBhcmFtcyA9ICcnXG4gICAgfVxuXG4gICAgaWYgKG9wZW4pIHtcbiAgICAgIG5vZGUubm9kZXMgPSBbXVxuICAgICAgdGhpcy5jdXJyZW50ID0gbm9kZVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2Vucykge1xuICAgIGxldCBjb2xvbiA9IHRoaXMuY29sb24odG9rZW5zKVxuICAgIGlmIChjb2xvbiA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgbGV0IGZvdW5kZWQgPSAwXG4gICAgbGV0IHRva2VuXG4gICAgZm9yIChsZXQgaiA9IGNvbG9uIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2pdXG4gICAgICBpZiAodG9rZW5bMF0gIT09ICdzcGFjZScpIHtcbiAgICAgICAgZm91bmRlZCArPSAxXG4gICAgICAgIGlmIChmb3VuZGVkID09PSAyKSBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB0aGUgdG9rZW4gaXMgYSB3b3JkLCBlLmcuIGAhaW1wb3J0YW50YCwgYHJlZGAgb3IgYW55IG90aGVyIHZhbGlkIHByb3BlcnR5J3MgdmFsdWUuXG4gICAgLy8gVGhlbiB3ZSBuZWVkIHRvIHJldHVybiB0aGUgY29sb24gYWZ0ZXIgdGhhdCB3b3JkIHRva2VuLiBbM10gaXMgdGhlIFwiZW5kXCIgY29sb24gb2YgdGhhdCB3b3JkLlxuICAgIC8vIEFuZCBiZWNhdXNlIHdlIG5lZWQgaXQgYWZ0ZXIgdGhhdCBvbmUgd2UgZG8gKzEgdG8gZ2V0IHRoZSBuZXh0IG9uZS5cbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgJ01pc3NlZCBzZW1pY29sb24nLFxuICAgICAgdG9rZW5bMF0gPT09ICd3b3JkJyA/IHRva2VuWzNdICsgMSA6IHRva2VuWzJdXG4gICAgKVxuICB9XG5cbiAgY29sb24odG9rZW5zKSB7XG4gICAgbGV0IGJyYWNrZXRzID0gMFxuICAgIGxldCB0b2tlbiwgdHlwZSwgcHJldlxuICAgIGZvciAobGV0IFtpLCBlbGVtZW50XSBvZiB0b2tlbnMuZW50cmllcygpKSB7XG4gICAgICB0b2tlbiA9IGVsZW1lbnRcbiAgICAgIHR5cGUgPSB0b2tlblswXVxuXG4gICAgICBpZiAodHlwZSA9PT0gJygnKSB7XG4gICAgICAgIGJyYWNrZXRzICs9IDFcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAnKScpIHtcbiAgICAgICAgYnJhY2tldHMgLT0gMVxuICAgICAgfVxuICAgICAgaWYgKGJyYWNrZXRzID09PSAwICYmIHR5cGUgPT09ICc6Jykge1xuICAgICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgICB0aGlzLmRvdWJsZUNvbG9uKHRva2VuKVxuICAgICAgICB9IGVsc2UgaWYgKHByZXZbMF0gPT09ICd3b3JkJyAmJiBwcmV2WzFdID09PSAncHJvZ2lkJykge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcmV2ID0gdG9rZW5cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb21tZW50KHRva2VuKSB7XG4gICAgbGV0IG5vZGUgPSBuZXcgQ29tbWVudCgpXG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdKVxuICAgIG5vZGUuc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24odG9rZW5bM10gfHwgdG9rZW5bMl0pXG4gICAgbm9kZS5zb3VyY2UuZW5kLm9mZnNldCsrXG5cbiAgICBsZXQgdGV4dCA9IHRva2VuWzFdLnNsaWNlKDIsIC0yKVxuICAgIGlmICgvXlxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICBub2RlLnRleHQgPSAnJ1xuICAgICAgbm9kZS5yYXdzLmxlZnQgPSB0ZXh0XG4gICAgICBub2RlLnJhd3MucmlnaHQgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eKFxccyopKFteXSpcXFMpKFxccyopJC8pXG4gICAgICBub2RlLnRleHQgPSBtYXRjaFsyXVxuICAgICAgbm9kZS5yYXdzLmxlZnQgPSBtYXRjaFsxXVxuICAgICAgbm9kZS5yYXdzLnJpZ2h0ID0gbWF0Y2hbM11cbiAgICB9XG4gIH1cblxuICBjcmVhdGVUb2tlbml6ZXIoKSB7XG4gICAgdGhpcy50b2tlbml6ZXIgPSB0b2tlbml6ZXIodGhpcy5pbnB1dClcbiAgfVxuXG4gIGRlY2wodG9rZW5zLCBjdXN0b21Qcm9wZXJ0eSkge1xuICAgIGxldCBub2RlID0gbmV3IERlY2xhcmF0aW9uKClcbiAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5zWzBdWzJdKVxuXG4gICAgbGV0IGxhc3QgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdXG4gICAgaWYgKGxhc3RbMF0gPT09ICc7Jykge1xuICAgICAgdGhpcy5zZW1pY29sb24gPSB0cnVlXG4gICAgICB0b2tlbnMucG9wKClcbiAgICB9XG5cbiAgICBub2RlLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKFxuICAgICAgbGFzdFszXSB8fCBsYXN0WzJdIHx8IGZpbmRMYXN0V2l0aFBvc2l0aW9uKHRva2VucylcbiAgICApXG4gICAgbm9kZS5zb3VyY2UuZW5kLm9mZnNldCsrXG5cbiAgICB3aGlsZSAodG9rZW5zWzBdWzBdICE9PSAnd29yZCcpIHtcbiAgICAgIGlmICh0b2tlbnMubGVuZ3RoID09PSAxKSB0aGlzLnVua25vd25Xb3JkKHRva2VucylcbiAgICAgIG5vZGUucmF3cy5iZWZvcmUgKz0gdG9rZW5zLnNoaWZ0KClbMV1cbiAgICB9XG4gICAgbm9kZS5zb3VyY2Uuc3RhcnQgPSB0aGlzLmdldFBvc2l0aW9uKHRva2Vuc1swXVsyXSlcblxuICAgIG5vZGUucHJvcCA9ICcnXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGxldCB0eXBlID0gdG9rZW5zWzBdWzBdXG4gICAgICBpZiAodHlwZSA9PT0gJzonIHx8IHR5cGUgPT09ICdzcGFjZScgfHwgdHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBub2RlLnByb3AgKz0gdG9rZW5zLnNoaWZ0KClbMV1cbiAgICB9XG5cbiAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnXG5cbiAgICBsZXQgdG9rZW5cbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKVxuXG4gICAgICBpZiAodG9rZW5bMF0gPT09ICc6Jykge1xuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAnd29yZCcgJiYgL1xcdy8udGVzdCh0b2tlblsxXSkpIHtcbiAgICAgICAgICB0aGlzLnVua25vd25Xb3JkKFt0b2tlbl0pXG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdG9rZW5bMV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9kZS5wcm9wWzBdID09PSAnXycgfHwgbm9kZS5wcm9wWzBdID09PSAnKicpIHtcbiAgICAgIG5vZGUucmF3cy5iZWZvcmUgKz0gbm9kZS5wcm9wWzBdXG4gICAgICBub2RlLnByb3AgPSBub2RlLnByb3Auc2xpY2UoMSlcbiAgICB9XG5cbiAgICBsZXQgZmlyc3RTcGFjZXMgPSBbXVxuICAgIGxldCBuZXh0XG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIG5leHQgPSB0b2tlbnNbMF1bMF1cbiAgICAgIGlmIChuZXh0ICE9PSAnc3BhY2UnICYmIG5leHQgIT09ICdjb21tZW50JykgYnJlYWtcbiAgICAgIGZpcnN0U3BhY2VzLnB1c2godG9rZW5zLnNoaWZ0KCkpXG4gICAgfVxuXG4gICAgdGhpcy5wcmVjaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpXG5cbiAgICBmb3IgKGxldCBpID0gdG9rZW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXVxuICAgICAgaWYgKHRva2VuWzFdLnRvTG93ZXJDYXNlKCkgPT09ICchaW1wb3J0YW50Jykge1xuICAgICAgICBub2RlLmltcG9ydGFudCA9IHRydWVcbiAgICAgICAgbGV0IHN0cmluZyA9IHRoaXMuc3RyaW5nRnJvbSh0b2tlbnMsIGkpXG4gICAgICAgIHN0cmluZyA9IHRoaXMuc3BhY2VzRnJvbUVuZCh0b2tlbnMpICsgc3RyaW5nXG4gICAgICAgIGlmIChzdHJpbmcgIT09ICcgIWltcG9ydGFudCcpIG5vZGUucmF3cy5pbXBvcnRhbnQgPSBzdHJpbmdcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW5bMV0udG9Mb3dlckNhc2UoKSA9PT0gJ2ltcG9ydGFudCcpIHtcbiAgICAgICAgbGV0IGNhY2hlID0gdG9rZW5zLnNsaWNlKDApXG4gICAgICAgIGxldCBzdHIgPSAnJ1xuICAgICAgICBmb3IgKGxldCBqID0gaTsgaiA+IDA7IGotLSkge1xuICAgICAgICAgIGxldCB0eXBlID0gY2FjaGVbal1bMF1cbiAgICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDAgJiYgdHlwZSAhPT0gJ3NwYWNlJykge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RyID0gY2FjaGUucG9wKClbMV0gKyBzdHJcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDApIHtcbiAgICAgICAgICBub2RlLmltcG9ydGFudCA9IHRydWVcbiAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyXG4gICAgICAgICAgdG9rZW5zID0gY2FjaGVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW5bMF0gIT09ICdzcGFjZScgJiYgdG9rZW5bMF0gIT09ICdjb21tZW50Jykge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBoYXNXb3JkID0gdG9rZW5zLnNvbWUoaSA9PiBpWzBdICE9PSAnc3BhY2UnICYmIGlbMF0gIT09ICdjb21tZW50JylcblxuICAgIGlmIChoYXNXb3JkKSB7XG4gICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSBmaXJzdFNwYWNlcy5tYXAoaSA9PiBpWzFdKS5qb2luKCcnKVxuICAgICAgZmlyc3RTcGFjZXMgPSBbXVxuICAgIH1cbiAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCBmaXJzdFNwYWNlcy5jb25jYXQodG9rZW5zKSwgY3VzdG9tUHJvcGVydHkpXG5cbiAgICBpZiAobm9kZS52YWx1ZS5pbmNsdWRlcygnOicpICYmICFjdXN0b21Qcm9wZXJ0eSkge1xuICAgICAgdGhpcy5jaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpXG4gICAgfVxuICB9XG5cbiAgZG91YmxlQ29sb24odG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgJ0RvdWJsZSBjb2xvbicsXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gfSxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlblsyXSArIHRva2VuWzFdLmxlbmd0aCB9XG4gICAgKVxuICB9XG5cbiAgZW1wdHlSdWxlKHRva2VuKSB7XG4gICAgbGV0IG5vZGUgPSBuZXcgUnVsZSgpXG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdKVxuICAgIG5vZGUuc2VsZWN0b3IgPSAnJ1xuICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gJydcbiAgICB0aGlzLmN1cnJlbnQgPSBub2RlXG4gIH1cblxuICBlbmQodG9rZW4pIHtcbiAgICBpZiAodGhpcy5jdXJyZW50Lm5vZGVzICYmIHRoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudC5yYXdzLnNlbWljb2xvbiA9IHRoaXMuc2VtaWNvbG9uXG4gICAgfVxuICAgIHRoaXMuc2VtaWNvbG9uID0gZmFsc2VcblxuICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzXG4gICAgdGhpcy5zcGFjZXMgPSAnJ1xuXG4gICAgaWYgKHRoaXMuY3VycmVudC5wYXJlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudC5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbih0b2tlblsyXSlcbiAgICAgIHRoaXMuY3VycmVudC5zb3VyY2UuZW5kLm9mZnNldCsrXG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnQucGFyZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5leHBlY3RlZENsb3NlKHRva2VuKVxuICAgIH1cbiAgfVxuXG4gIGVuZEZpbGUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudC5wYXJlbnQpIHRoaXMudW5jbG9zZWRCbG9jaygpXG4gICAgaWYgKHRoaXMuY3VycmVudC5ub2RlcyAmJiB0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnQucmF3cy5zZW1pY29sb24gPSB0aGlzLnNlbWljb2xvblxuICAgIH1cbiAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciA9ICh0aGlzLmN1cnJlbnQucmF3cy5hZnRlciB8fCAnJykgKyB0aGlzLnNwYWNlc1xuICAgIHRoaXMucm9vdC5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLnRva2VuaXplci5wb3NpdGlvbigpKVxuICB9XG5cbiAgZnJlZVNlbWljb2xvbih0b2tlbikge1xuICAgIHRoaXMuc3BhY2VzICs9IHRva2VuWzFdXG4gICAgaWYgKHRoaXMuY3VycmVudC5ub2Rlcykge1xuICAgICAgbGV0IHByZXYgPSB0aGlzLmN1cnJlbnQubm9kZXNbdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCAtIDFdXG4gICAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09ICdydWxlJyAmJiAhcHJldi5yYXdzLm93blNlbWljb2xvbikge1xuICAgICAgICBwcmV2LnJhd3Mub3duU2VtaWNvbG9uID0gdGhpcy5zcGFjZXNcbiAgICAgICAgdGhpcy5zcGFjZXMgPSAnJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEhlbHBlcnNcblxuICBnZXRQb3NpdGlvbihvZmZzZXQpIHtcbiAgICBsZXQgcG9zID0gdGhpcy5pbnB1dC5mcm9tT2Zmc2V0KG9mZnNldClcbiAgICByZXR1cm4ge1xuICAgICAgY29sdW1uOiBwb3MuY29sLFxuICAgICAgbGluZTogcG9zLmxpbmUsXG4gICAgICBvZmZzZXRcbiAgICB9XG4gIH1cblxuICBpbml0KG5vZGUsIG9mZnNldCkge1xuICAgIHRoaXMuY3VycmVudC5wdXNoKG5vZGUpXG4gICAgbm9kZS5zb3VyY2UgPSB7XG4gICAgICBpbnB1dDogdGhpcy5pbnB1dCxcbiAgICAgIHN0YXJ0OiB0aGlzLmdldFBvc2l0aW9uKG9mZnNldClcbiAgICB9XG4gICAgbm9kZS5yYXdzLmJlZm9yZSA9IHRoaXMuc3BhY2VzXG4gICAgdGhpcy5zcGFjZXMgPSAnJ1xuICAgIGlmIChub2RlLnR5cGUgIT09ICdjb21tZW50JykgdGhpcy5zZW1pY29sb24gPSBmYWxzZVxuICB9XG5cbiAgb3RoZXIoc3RhcnQpIHtcbiAgICBsZXQgZW5kID0gZmFsc2VcbiAgICBsZXQgdHlwZSA9IG51bGxcbiAgICBsZXQgY29sb24gPSBmYWxzZVxuICAgIGxldCBicmFja2V0ID0gbnVsbFxuICAgIGxldCBicmFja2V0cyA9IFtdXG4gICAgbGV0IGN1c3RvbVByb3BlcnR5ID0gc3RhcnRbMV0uc3RhcnRzV2l0aCgnLS0nKVxuXG4gICAgbGV0IHRva2VucyA9IFtdXG4gICAgbGV0IHRva2VuID0gc3RhcnRcbiAgICB3aGlsZSAodG9rZW4pIHtcbiAgICAgIHR5cGUgPSB0b2tlblswXVxuICAgICAgdG9rZW5zLnB1c2godG9rZW4pXG5cbiAgICAgIGlmICh0eXBlID09PSAnKCcgfHwgdHlwZSA9PT0gJ1snKSB7XG4gICAgICAgIGlmICghYnJhY2tldCkgYnJhY2tldCA9IHRva2VuXG4gICAgICAgIGJyYWNrZXRzLnB1c2godHlwZSA9PT0gJygnID8gJyknIDogJ10nKVxuICAgICAgfSBlbHNlIGlmIChjdXN0b21Qcm9wZXJ0eSAmJiBjb2xvbiAmJiB0eXBlID09PSAneycpIHtcbiAgICAgICAgaWYgKCFicmFja2V0KSBicmFja2V0ID0gdG9rZW5cbiAgICAgICAgYnJhY2tldHMucHVzaCgnfScpXG4gICAgICB9IGVsc2UgaWYgKGJyYWNrZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJzsnKSB7XG4gICAgICAgICAgaWYgKGNvbG9uKSB7XG4gICAgICAgICAgICB0aGlzLmRlY2wodG9rZW5zLCBjdXN0b21Qcm9wZXJ0eSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgICB0aGlzLnJ1bGUodG9rZW5zKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd9Jykge1xuICAgICAgICAgIHRoaXMudG9rZW5pemVyLmJhY2sodG9rZW5zLnBvcCgpKVxuICAgICAgICAgIGVuZCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICc6Jykge1xuICAgICAgICAgIGNvbG9uID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IGJyYWNrZXRzW2JyYWNrZXRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIGJyYWNrZXRzLnBvcCgpXG4gICAgICAgIGlmIChicmFja2V0cy5sZW5ndGggPT09IDApIGJyYWNrZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkpIGVuZCA9IHRydWVcbiAgICBpZiAoYnJhY2tldHMubGVuZ3RoID4gMCkgdGhpcy51bmNsb3NlZEJyYWNrZXQoYnJhY2tldClcblxuICAgIGlmIChlbmQgJiYgY29sb24pIHtcbiAgICAgIGlmICghY3VzdG9tUHJvcGVydHkpIHtcbiAgICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICB0b2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF1cbiAgICAgICAgICBpZiAodG9rZW4gIT09ICdzcGFjZScgJiYgdG9rZW4gIT09ICdjb21tZW50JykgYnJlYWtcbiAgICAgICAgICB0aGlzLnRva2VuaXplci5iYWNrKHRva2Vucy5wb3AoKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5kZWNsKHRva2VucywgY3VzdG9tUHJvcGVydHkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5rbm93bldvcmQodG9rZW5zKVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlKCkge1xuICAgIGxldCB0b2tlblxuICAgIHdoaWxlICghdGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkpIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKClcblxuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlICdzcGFjZSc6XG4gICAgICAgICAgdGhpcy5zcGFjZXMgKz0gdG9rZW5bMV1cbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJzsnOlxuICAgICAgICAgIHRoaXMuZnJlZVNlbWljb2xvbih0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ30nOlxuICAgICAgICAgIHRoaXMuZW5kKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnY29tbWVudCc6XG4gICAgICAgICAgdGhpcy5jb21tZW50KHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnYXQtd29yZCc6XG4gICAgICAgICAgdGhpcy5hdHJ1bGUodG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICd7JzpcbiAgICAgICAgICB0aGlzLmVtcHR5UnVsZSh0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5vdGhlcih0b2tlbilcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmVuZEZpbGUoKVxuICB9XG5cbiAgcHJlY2hlY2tNaXNzZWRTZW1pY29sb24oLyogdG9rZW5zICovKSB7XG4gICAgLy8gSG9vayBmb3IgU2FmZSBQYXJzZXJcbiAgfVxuXG4gIHJhdyhub2RlLCBwcm9wLCB0b2tlbnMsIGN1c3RvbVByb3BlcnR5KSB7XG4gICAgbGV0IHRva2VuLCB0eXBlXG4gICAgbGV0IGxlbmd0aCA9IHRva2Vucy5sZW5ndGhcbiAgICBsZXQgdmFsdWUgPSAnJ1xuICAgIGxldCBjbGVhbiA9IHRydWVcbiAgICBsZXQgbmV4dCwgcHJldlxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICAgIHR5cGUgPSB0b2tlblswXVxuICAgICAgaWYgKHR5cGUgPT09ICdzcGFjZScgJiYgaSA9PT0gbGVuZ3RoIC0gMSAmJiAhY3VzdG9tUHJvcGVydHkpIHtcbiAgICAgICAgY2xlYW4gPSBmYWxzZVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgICAgcHJldiA9IHRva2Vuc1tpIC0gMV0gPyB0b2tlbnNbaSAtIDFdWzBdIDogJ2VtcHR5J1xuICAgICAgICBuZXh0ID0gdG9rZW5zW2kgKyAxXSA/IHRva2Vuc1tpICsgMV1bMF0gOiAnZW1wdHknXG4gICAgICAgIGlmICghU0FGRV9DT01NRU5UX05FSUdIQk9SW3ByZXZdICYmICFTQUZFX0NPTU1FTlRfTkVJR0hCT1JbbmV4dF0pIHtcbiAgICAgICAgICBpZiAodmFsdWUuc2xpY2UoLTEpID09PSAnLCcpIHtcbiAgICAgICAgICAgIGNsZWFuID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgKz0gdG9rZW5bMV1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xlYW4gPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSArPSB0b2tlblsxXVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNsZWFuKSB7XG4gICAgICBsZXQgcmF3ID0gdG9rZW5zLnJlZHVjZSgoYWxsLCBpKSA9PiBhbGwgKyBpWzFdLCAnJylcbiAgICAgIG5vZGUucmF3c1twcm9wXSA9IHsgcmF3LCB2YWx1ZSB9XG4gICAgfVxuICAgIG5vZGVbcHJvcF0gPSB2YWx1ZVxuICB9XG5cbiAgcnVsZSh0b2tlbnMpIHtcbiAgICB0b2tlbnMucG9wKClcblxuICAgIGxldCBub2RlID0gbmV3IFJ1bGUoKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlbnNbMF1bMl0pXG5cbiAgICBub2RlLnJhd3MuYmV0d2VlbiA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHRva2VucylcbiAgICB0aGlzLnJhdyhub2RlLCAnc2VsZWN0b3InLCB0b2tlbnMpXG4gICAgdGhpcy5jdXJyZW50ID0gbm9kZVxuICB9XG5cbiAgc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHRva2Vucykge1xuICAgIGxldCBsYXN0VG9rZW5UeXBlXG4gICAgbGV0IHNwYWNlcyA9ICcnXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGxhc3RUb2tlblR5cGUgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdXG4gICAgICBpZiAobGFzdFRva2VuVHlwZSAhPT0gJ3NwYWNlJyAmJiBsYXN0VG9rZW5UeXBlICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICBzcGFjZXMgPSB0b2tlbnMucG9wKClbMV0gKyBzcGFjZXNcbiAgICB9XG4gICAgcmV0dXJuIHNwYWNlc1xuICB9XG5cbiAgLy8gRXJyb3JzXG5cbiAgc3BhY2VzQW5kQ29tbWVudHNGcm9tU3RhcnQodG9rZW5zKSB7XG4gICAgbGV0IG5leHRcbiAgICBsZXQgc3BhY2VzID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbmV4dCA9IHRva2Vuc1swXVswXVxuICAgICAgaWYgKG5leHQgIT09ICdzcGFjZScgJiYgbmV4dCAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgc3BhY2VzICs9IHRva2Vucy5zaGlmdCgpWzFdXG4gICAgfVxuICAgIHJldHVybiBzcGFjZXNcbiAgfVxuXG4gIHNwYWNlc0Zyb21FbmQodG9rZW5zKSB7XG4gICAgbGV0IGxhc3RUb2tlblR5cGVcbiAgICBsZXQgc3BhY2VzID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF1cbiAgICAgIGlmIChsYXN0VG9rZW5UeXBlICE9PSAnc3BhY2UnKSBicmVha1xuICAgICAgc3BhY2VzID0gdG9rZW5zLnBvcCgpWzFdICsgc3BhY2VzXG4gICAgfVxuICAgIHJldHVybiBzcGFjZXNcbiAgfVxuXG4gIHN0cmluZ0Zyb20odG9rZW5zLCBmcm9tKSB7XG4gICAgbGV0IHJlc3VsdCA9ICcnXG4gICAgZm9yIChsZXQgaSA9IGZyb207IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSB0b2tlbnNbaV1bMV1cbiAgICB9XG4gICAgdG9rZW5zLnNwbGljZShmcm9tLCB0b2tlbnMubGVuZ3RoIC0gZnJvbSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB1bmNsb3NlZEJsb2NrKCkge1xuICAgIGxldCBwb3MgPSB0aGlzLmN1cnJlbnQuc291cmNlLnN0YXJ0XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignVW5jbG9zZWQgYmxvY2snLCBwb3MubGluZSwgcG9zLmNvbHVtbilcbiAgfVxuXG4gIHVuY2xvc2VkQnJhY2tldChicmFja2V0KSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihcbiAgICAgICdVbmNsb3NlZCBicmFja2V0JyxcbiAgICAgIHsgb2Zmc2V0OiBicmFja2V0WzJdIH0sXG4gICAgICB7IG9mZnNldDogYnJhY2tldFsyXSArIDEgfVxuICAgIClcbiAgfVxuXG4gIHVuZXhwZWN0ZWRDbG9zZSh0b2tlbikge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICAnVW5leHBlY3RlZCB9JyxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlblsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdICsgMSB9XG4gICAgKVxuICB9XG5cbiAgdW5rbm93bldvcmQodG9rZW5zKSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihcbiAgICAgICdVbmtub3duIHdvcmQnLFxuICAgICAgeyBvZmZzZXQ6IHRva2Vuc1swXVsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IHRva2Vuc1swXVsyXSArIHRva2Vuc1swXVsxXS5sZW5ndGggfVxuICAgIClcbiAgfVxuXG4gIHVubmFtZWRBdHJ1bGUobm9kZSwgdG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgJ0F0LXJ1bGUgd2l0aG91dCBuYW1lJyxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlblsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdICsgdG9rZW5bMV0ubGVuZ3RoIH1cbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXJcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgQ3NzU3ludGF4RXJyb3IgPSByZXF1aXJlKCcuL2Nzcy1zeW50YXgtZXJyb3InKVxubGV0IERlY2xhcmF0aW9uID0gcmVxdWlyZSgnLi9kZWNsYXJhdGlvbicpXG5sZXQgTGF6eVJlc3VsdCA9IHJlcXVpcmUoJy4vbGF6eS1yZXN1bHQnKVxubGV0IENvbnRhaW5lciA9IHJlcXVpcmUoJy4vY29udGFpbmVyJylcbmxldCBQcm9jZXNzb3IgPSByZXF1aXJlKCcuL3Byb2Nlc3NvcicpXG5sZXQgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKVxubGV0IGZyb21KU09OID0gcmVxdWlyZSgnLi9mcm9tSlNPTicpXG5sZXQgRG9jdW1lbnQgPSByZXF1aXJlKCcuL2RvY3VtZW50JylcbmxldCBXYXJuaW5nID0gcmVxdWlyZSgnLi93YXJuaW5nJylcbmxldCBDb21tZW50ID0gcmVxdWlyZSgnLi9jb21tZW50JylcbmxldCBBdFJ1bGUgPSByZXF1aXJlKCcuL2F0LXJ1bGUnKVxubGV0IFJlc3VsdCA9IHJlcXVpcmUoJy4vcmVzdWx0LmpzJylcbmxldCBJbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQnKVxubGV0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5sZXQgbGlzdCA9IHJlcXVpcmUoJy4vbGlzdCcpXG5sZXQgUnVsZSA9IHJlcXVpcmUoJy4vcnVsZScpXG5sZXQgUm9vdCA9IHJlcXVpcmUoJy4vcm9vdCcpXG5sZXQgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpXG5cbmZ1bmN0aW9uIHBvc3Rjc3MoLi4ucGx1Z2lucykge1xuICBpZiAocGx1Z2lucy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShwbHVnaW5zWzBdKSkge1xuICAgIHBsdWdpbnMgPSBwbHVnaW5zWzBdXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9jZXNzb3IocGx1Z2lucylcbn1cblxucG9zdGNzcy5wbHVnaW4gPSBmdW5jdGlvbiBwbHVnaW4obmFtZSwgaW5pdGlhbGl6ZXIpIHtcbiAgbGV0IHdhcm5pbmdQcmludGVkID0gZmFsc2VcbiAgZnVuY3Rpb24gY3JlYXRvciguLi5hcmdzKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4gJiYgIXdhcm5pbmdQcmludGVkKSB7XG4gICAgICB3YXJuaW5nUHJpbnRlZCA9IHRydWVcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIG5hbWUgK1xuICAgICAgICAgICc6IHBvc3Rjc3MucGx1Z2luIHdhcyBkZXByZWNhdGVkLiBNaWdyYXRpb24gZ3VpZGU6XFxuJyArXG4gICAgICAgICAgJ2h0dHBzOi8vZXZpbG1hcnRpYW5zLmNvbS9jaHJvbmljbGVzL3Bvc3Rjc3MtOC1wbHVnaW4tbWlncmF0aW9uJ1xuICAgICAgKVxuICAgICAgaWYgKHByb2Nlc3MuZW52LkxBTkcgJiYgcHJvY2Vzcy5lbnYuTEFORy5zdGFydHNXaXRoKCdjbicpKSB7XG4gICAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDcgKi9cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgJzog6YeM6Z2iIHBvc3Rjc3MucGx1Z2luIOiiq+W8g+eUqC4g6L+B56e75oyH5Y2XOlxcbicgK1xuICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LnczY3RlY2guY29tL3RvcGljLzIyMjYnXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHRyYW5zZm9ybWVyID0gaW5pdGlhbGl6ZXIoLi4uYXJncylcbiAgICB0cmFuc2Zvcm1lci5wb3N0Y3NzUGx1Z2luID0gbmFtZVxuICAgIHRyYW5zZm9ybWVyLnBvc3Rjc3NWZXJzaW9uID0gbmV3IFByb2Nlc3NvcigpLnZlcnNpb25cbiAgICByZXR1cm4gdHJhbnNmb3JtZXJcbiAgfVxuXG4gIGxldCBjYWNoZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3Bvc3Rjc3MnLCB7XG4gICAgZ2V0KCkge1xuICAgICAgaWYgKCFjYWNoZSkgY2FjaGUgPSBjcmVhdG9yKClcbiAgICAgIHJldHVybiBjYWNoZVxuICAgIH1cbiAgfSlcblxuICBjcmVhdG9yLnByb2Nlc3MgPSBmdW5jdGlvbiAoY3NzLCBwcm9jZXNzT3B0cywgcGx1Z2luT3B0cykge1xuICAgIHJldHVybiBwb3N0Y3NzKFtjcmVhdG9yKHBsdWdpbk9wdHMpXSkucHJvY2Vzcyhjc3MsIHByb2Nlc3NPcHRzKVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0b3Jcbn1cblxucG9zdGNzcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcbnBvc3Rjc3MucGFyc2UgPSBwYXJzZVxucG9zdGNzcy5mcm9tSlNPTiA9IGZyb21KU09OXG5wb3N0Y3NzLmxpc3QgPSBsaXN0XG5cbnBvc3Rjc3MuY29tbWVudCA9IGRlZmF1bHRzID0+IG5ldyBDb21tZW50KGRlZmF1bHRzKVxucG9zdGNzcy5hdFJ1bGUgPSBkZWZhdWx0cyA9PiBuZXcgQXRSdWxlKGRlZmF1bHRzKVxucG9zdGNzcy5kZWNsID0gZGVmYXVsdHMgPT4gbmV3IERlY2xhcmF0aW9uKGRlZmF1bHRzKVxucG9zdGNzcy5ydWxlID0gZGVmYXVsdHMgPT4gbmV3IFJ1bGUoZGVmYXVsdHMpXG5wb3N0Y3NzLnJvb3QgPSBkZWZhdWx0cyA9PiBuZXcgUm9vdChkZWZhdWx0cylcbnBvc3Rjc3MuZG9jdW1lbnQgPSBkZWZhdWx0cyA9PiBuZXcgRG9jdW1lbnQoZGVmYXVsdHMpXG5cbnBvc3Rjc3MuQ3NzU3ludGF4RXJyb3IgPSBDc3NTeW50YXhFcnJvclxucG9zdGNzcy5EZWNsYXJhdGlvbiA9IERlY2xhcmF0aW9uXG5wb3N0Y3NzLkNvbnRhaW5lciA9IENvbnRhaW5lclxucG9zdGNzcy5Qcm9jZXNzb3IgPSBQcm9jZXNzb3JcbnBvc3Rjc3MuRG9jdW1lbnQgPSBEb2N1bWVudFxucG9zdGNzcy5Db21tZW50ID0gQ29tbWVudFxucG9zdGNzcy5XYXJuaW5nID0gV2FybmluZ1xucG9zdGNzcy5BdFJ1bGUgPSBBdFJ1bGVcbnBvc3Rjc3MuUmVzdWx0ID0gUmVzdWx0XG5wb3N0Y3NzLklucHV0ID0gSW5wdXRcbnBvc3Rjc3MuUnVsZSA9IFJ1bGVcbnBvc3Rjc3MuUm9vdCA9IFJvb3RcbnBvc3Rjc3MuTm9kZSA9IE5vZGVcblxuTGF6eVJlc3VsdC5yZWdpc3RlclBvc3Rjc3MocG9zdGNzcylcblxubW9kdWxlLmV4cG9ydHMgPSBwb3N0Y3NzXG5wb3N0Y3NzLmRlZmF1bHQgPSBwb3N0Y3NzXG4iLCIndXNlIHN0cmljdCdcblxubGV0IHsgU291cmNlTWFwQ29uc3VtZXIsIFNvdXJjZU1hcEdlbmVyYXRvciB9ID0gcmVxdWlyZSgnc291cmNlLW1hcC1qcycpXG5sZXQgeyBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMgfSA9IHJlcXVpcmUoJ2ZzJylcbmxldCB7IGRpcm5hbWUsIGpvaW4gfSA9IHJlcXVpcmUoJ3BhdGgnKVxuXG5mdW5jdGlvbiBmcm9tQmFzZTY0KHN0cikge1xuICBpZiAoQnVmZmVyKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0ciwgJ2Jhc2U2NCcpLnRvU3RyaW5nKClcbiAgfSBlbHNlIHtcbiAgICAvKiBjOCBpZ25vcmUgbmV4dCAyICovXG4gICAgcmV0dXJuIHdpbmRvdy5hdG9iKHN0cilcbiAgfVxufVxuXG5jbGFzcyBQcmV2aW91c01hcCB7XG4gIGNvbnN0cnVjdG9yKGNzcywgb3B0cykge1xuICAgIGlmIChvcHRzLm1hcCA9PT0gZmFsc2UpIHJldHVyblxuICAgIHRoaXMubG9hZEFubm90YXRpb24oY3NzKVxuICAgIHRoaXMuaW5saW5lID0gdGhpcy5zdGFydFdpdGgodGhpcy5hbm5vdGF0aW9uLCAnZGF0YTonKVxuXG4gICAgbGV0IHByZXYgPSBvcHRzLm1hcCA/IG9wdHMubWFwLnByZXYgOiB1bmRlZmluZWRcbiAgICBsZXQgdGV4dCA9IHRoaXMubG9hZE1hcChvcHRzLmZyb20sIHByZXYpXG4gICAgaWYgKCF0aGlzLm1hcEZpbGUgJiYgb3B0cy5mcm9tKSB7XG4gICAgICB0aGlzLm1hcEZpbGUgPSBvcHRzLmZyb21cbiAgICB9XG4gICAgaWYgKHRoaXMubWFwRmlsZSkgdGhpcy5yb290ID0gZGlybmFtZSh0aGlzLm1hcEZpbGUpXG4gICAgaWYgKHRleHQpIHRoaXMudGV4dCA9IHRleHRcbiAgfVxuXG4gIGNvbnN1bWVyKCkge1xuICAgIGlmICghdGhpcy5jb25zdW1lckNhY2hlKSB7XG4gICAgICB0aGlzLmNvbnN1bWVyQ2FjaGUgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodGhpcy50ZXh0KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25zdW1lckNhY2hlXG4gIH1cblxuICBkZWNvZGVJbmxpbmUodGV4dCkge1xuICAgIGxldCBiYXNlQ2hhcnNldFVyaSA9IC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb247Y2hhcnNldD11dGYtPzg7YmFzZTY0LC9cbiAgICBsZXQgYmFzZVVyaSA9IC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb247YmFzZTY0LC9cbiAgICBsZXQgY2hhcnNldFVyaSA9IC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb247Y2hhcnNldD11dGYtPzgsL1xuICAgIGxldCB1cmkgPSAvXmRhdGE6YXBwbGljYXRpb25cXC9qc29uLC9cblxuICAgIGlmIChjaGFyc2V0VXJpLnRlc3QodGV4dCkgfHwgdXJpLnRlc3QodGV4dCkpIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodGV4dC5zdWJzdHIoUmVnRXhwLmxhc3RNYXRjaC5sZW5ndGgpKVxuICAgIH1cblxuICAgIGlmIChiYXNlQ2hhcnNldFVyaS50ZXN0KHRleHQpIHx8IGJhc2VVcmkudGVzdCh0ZXh0KSkge1xuICAgICAgcmV0dXJuIGZyb21CYXNlNjQodGV4dC5zdWJzdHIoUmVnRXhwLmxhc3RNYXRjaC5sZW5ndGgpKVxuICAgIH1cblxuICAgIGxldCBlbmNvZGluZyA9IHRleHQubWF0Y2goL2RhdGE6YXBwbGljYXRpb25cXC9qc29uOyhbXixdKyksLylbMV1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHNvdXJjZSBtYXAgZW5jb2RpbmcgJyArIGVuY29kaW5nKVxuICB9XG5cbiAgZ2V0QW5ub3RhdGlvblVSTChzb3VyY2VNYXBTdHJpbmcpIHtcbiAgICByZXR1cm4gc291cmNlTWFwU3RyaW5nLnJlcGxhY2UoL15cXC9cXCpcXHMqIyBzb3VyY2VNYXBwaW5nVVJMPS8sICcnKS50cmltKClcbiAgfVxuXG4gIGlzTWFwKG1hcCkge1xuICAgIGlmICh0eXBlb2YgbWFwICE9PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBtYXAubWFwcGluZ3MgPT09ICdzdHJpbmcnIHx8XG4gICAgICB0eXBlb2YgbWFwLl9tYXBwaW5ncyA9PT0gJ3N0cmluZycgfHxcbiAgICAgIEFycmF5LmlzQXJyYXkobWFwLnNlY3Rpb25zKVxuICAgIClcbiAgfVxuXG4gIGxvYWRBbm5vdGF0aW9uKGNzcykge1xuICAgIGxldCBjb21tZW50cyA9IGNzcy5tYXRjaCgvXFwvXFwqXFxzKiMgc291cmNlTWFwcGluZ1VSTD0vZ20pXG4gICAgaWYgKCFjb21tZW50cykgcmV0dXJuXG5cbiAgICAvLyBzb3VyY2VNYXBwaW5nVVJMcyBmcm9tIGNvbW1lbnRzLCBzdHJpbmdzLCBldGMuXG4gICAgbGV0IHN0YXJ0ID0gY3NzLmxhc3RJbmRleE9mKGNvbW1lbnRzLnBvcCgpKVxuICAgIGxldCBlbmQgPSBjc3MuaW5kZXhPZignKi8nLCBzdGFydClcblxuICAgIGlmIChzdGFydCA+IC0xICYmIGVuZCA+IC0xKSB7XG4gICAgICAvLyBMb2NhdGUgdGhlIGxhc3Qgc291cmNlTWFwcGluZ1VSTCB0byBhdm9pZCBwaWNraW5cbiAgICAgIHRoaXMuYW5ub3RhdGlvbiA9IHRoaXMuZ2V0QW5ub3RhdGlvblVSTChjc3Muc3Vic3RyaW5nKHN0YXJ0LCBlbmQpKVxuICAgIH1cbiAgfVxuXG4gIGxvYWRGaWxlKHBhdGgpIHtcbiAgICB0aGlzLnJvb3QgPSBkaXJuYW1lKHBhdGgpXG4gICAgaWYgKGV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICAgIHRoaXMubWFwRmlsZSA9IHBhdGhcbiAgICAgIHJldHVybiByZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04JykudG9TdHJpbmcoKS50cmltKClcbiAgICB9XG4gIH1cblxuICBsb2FkTWFwKGZpbGUsIHByZXYpIHtcbiAgICBpZiAocHJldiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZVxuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJldiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbGV0IHByZXZQYXRoID0gcHJldihmaWxlKVxuICAgICAgICBpZiAocHJldlBhdGgpIHtcbiAgICAgICAgICBsZXQgbWFwID0gdGhpcy5sb2FkRmlsZShwcmV2UGF0aClcbiAgICAgICAgICBpZiAoIW1hcCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnVW5hYmxlIHRvIGxvYWQgcHJldmlvdXMgc291cmNlIG1hcDogJyArIHByZXZQYXRoLnRvU3RyaW5nKClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1hcFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByZXYgaW5zdGFuY2VvZiBTb3VyY2VNYXBDb25zdW1lcikge1xuICAgICAgICByZXR1cm4gU291cmNlTWFwR2VuZXJhdG9yLmZyb21Tb3VyY2VNYXAocHJldikudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmIChwcmV2IGluc3RhbmNlb2YgU291cmNlTWFwR2VuZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBwcmV2LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc01hcChwcmV2KSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocHJldilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgcHJldmlvdXMgc291cmNlIG1hcCBmb3JtYXQ6ICcgKyBwcmV2LnRvU3RyaW5nKClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pbmxpbmUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlY29kZUlubGluZSh0aGlzLmFubm90YXRpb24pXG4gICAgfSBlbHNlIGlmICh0aGlzLmFubm90YXRpb24pIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLmFubm90YXRpb25cbiAgICAgIGlmIChmaWxlKSBtYXAgPSBqb2luKGRpcm5hbWUoZmlsZSksIG1hcClcbiAgICAgIHJldHVybiB0aGlzLmxvYWRGaWxlKG1hcClcbiAgICB9XG4gIH1cblxuICBzdGFydFdpdGgoc3RyaW5nLCBzdGFydCkge1xuICAgIGlmICghc3RyaW5nKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cigwLCBzdGFydC5sZW5ndGgpID09PSBzdGFydFxuICB9XG5cbiAgd2l0aENvbnRlbnQoKSB7XG4gICAgcmV0dXJuICEhKFxuICAgICAgdGhpcy5jb25zdW1lcigpLnNvdXJjZXNDb250ZW50ICYmXG4gICAgICB0aGlzLmNvbnN1bWVyKCkuc291cmNlc0NvbnRlbnQubGVuZ3RoID4gMFxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByZXZpb3VzTWFwXG5QcmV2aW91c01hcC5kZWZhdWx0ID0gUHJldmlvdXNNYXBcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgTm9Xb3JrUmVzdWx0ID0gcmVxdWlyZSgnLi9uby13b3JrLXJlc3VsdCcpXG5sZXQgTGF6eVJlc3VsdCA9IHJlcXVpcmUoJy4vbGF6eS1yZXN1bHQnKVxubGV0IERvY3VtZW50ID0gcmVxdWlyZSgnLi9kb2N1bWVudCcpXG5sZXQgUm9vdCA9IHJlcXVpcmUoJy4vcm9vdCcpXG5cbmNsYXNzIFByb2Nlc3NvciB7XG4gIGNvbnN0cnVjdG9yKHBsdWdpbnMgPSBbXSkge1xuICAgIHRoaXMudmVyc2lvbiA9ICc4LjQuMzEnXG4gICAgdGhpcy5wbHVnaW5zID0gdGhpcy5ub3JtYWxpemUocGx1Z2lucylcbiAgfVxuXG4gIG5vcm1hbGl6ZShwbHVnaW5zKSB7XG4gICAgbGV0IG5vcm1hbGl6ZWQgPSBbXVxuICAgIGZvciAobGV0IGkgb2YgcGx1Z2lucykge1xuICAgICAgaWYgKGkucG9zdGNzcyA9PT0gdHJ1ZSkge1xuICAgICAgICBpID0gaSgpXG4gICAgICB9IGVsc2UgaWYgKGkucG9zdGNzcykge1xuICAgICAgICBpID0gaS5wb3N0Y3NzXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheShpLnBsdWdpbnMpKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQgPSBub3JtYWxpemVkLmNvbmNhdChpLnBsdWdpbnMpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpID09PSAnb2JqZWN0JyAmJiBpLnBvc3Rjc3NQbHVnaW4pIHtcbiAgICAgICAgbm9ybWFsaXplZC5wdXNoKGkpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQucHVzaChpKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgKGkucGFyc2UgfHwgaS5zdHJpbmdpZnkpKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ1Bvc3RDU1Mgc3ludGF4ZXMgY2Fubm90IGJlIHVzZWQgYXMgcGx1Z2lucy4gSW5zdGVhZCwgcGxlYXNlIHVzZSAnICtcbiAgICAgICAgICAgICAgJ29uZSBvZiB0aGUgc3ludGF4L3BhcnNlci9zdHJpbmdpZmllciBvcHRpb25zIGFzIG91dGxpbmVkICcgK1xuICAgICAgICAgICAgICAnaW4geW91ciBQb3N0Q1NTIHJ1bm5lciBkb2N1bWVudGF0aW9uLidcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihpICsgJyBpcyBub3QgYSBQb3N0Q1NTIHBsdWdpbicpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVkXG4gIH1cblxuICBwcm9jZXNzKGNzcywgb3B0cyA9IHt9KSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wbHVnaW5zLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgdHlwZW9mIG9wdHMucGFyc2VyID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIG9wdHMuc3RyaW5naWZpZXIgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2Ygb3B0cy5zeW50YXggPT09ICd1bmRlZmluZWQnXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmV3IE5vV29ya1Jlc3VsdCh0aGlzLCBjc3MsIG9wdHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTGF6eVJlc3VsdCh0aGlzLCBjc3MsIG9wdHMpXG4gICAgfVxuICB9XG5cbiAgdXNlKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucGx1Z2lucy5jb25jYXQodGhpcy5ub3JtYWxpemUoW3BsdWdpbl0pKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9jZXNzb3JcblByb2Nlc3Nvci5kZWZhdWx0ID0gUHJvY2Vzc29yXG5cblJvb3QucmVnaXN0ZXJQcm9jZXNzb3IoUHJvY2Vzc29yKVxuRG9jdW1lbnQucmVnaXN0ZXJQcm9jZXNzb3IoUHJvY2Vzc29yKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBXYXJuaW5nID0gcmVxdWlyZSgnLi93YXJuaW5nJylcblxuY2xhc3MgUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHJvY2Vzc29yLCByb290LCBvcHRzKSB7XG4gICAgdGhpcy5wcm9jZXNzb3IgPSBwcm9jZXNzb3JcbiAgICB0aGlzLm1lc3NhZ2VzID0gW11cbiAgICB0aGlzLnJvb3QgPSByb290XG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIHRoaXMuY3NzID0gdW5kZWZpbmVkXG4gICAgdGhpcy5tYXAgPSB1bmRlZmluZWRcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmNzc1xuICB9XG5cbiAgd2Fybih0ZXh0LCBvcHRzID0ge30pIHtcbiAgICBpZiAoIW9wdHMucGx1Z2luKSB7XG4gICAgICBpZiAodGhpcy5sYXN0UGx1Z2luICYmIHRoaXMubGFzdFBsdWdpbi5wb3N0Y3NzUGx1Z2luKSB7XG4gICAgICAgIG9wdHMucGx1Z2luID0gdGhpcy5sYXN0UGx1Z2luLnBvc3Rjc3NQbHVnaW5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgd2FybmluZyA9IG5ldyBXYXJuaW5nKHRleHQsIG9wdHMpXG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKHdhcm5pbmcpXG5cbiAgICByZXR1cm4gd2FybmluZ1xuICB9XG5cbiAgd2FybmluZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZXMuZmlsdGVyKGkgPT4gaS50eXBlID09PSAnd2FybmluZycpXG4gIH1cblxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5jc3NcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3VsdFxuUmVzdWx0LmRlZmF1bHQgPSBSZXN1bHRcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXInKVxuXG5sZXQgTGF6eVJlc3VsdCwgUHJvY2Vzc29yXG5cbmNsYXNzIFJvb3QgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgIHN1cGVyKGRlZmF1bHRzKVxuICAgIHRoaXMudHlwZSA9ICdyb290J1xuICAgIGlmICghdGhpcy5ub2RlcykgdGhpcy5ub2RlcyA9IFtdXG4gIH1cblxuICBub3JtYWxpemUoY2hpbGQsIHNhbXBsZSwgdHlwZSkge1xuICAgIGxldCBub2RlcyA9IHN1cGVyLm5vcm1hbGl6ZShjaGlsZClcblxuICAgIGlmIChzYW1wbGUpIHtcbiAgICAgIGlmICh0eXBlID09PSAncHJlcGVuZCcpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNhbXBsZS5yYXdzLmJlZm9yZSA9IHRoaXMubm9kZXNbMV0ucmF3cy5iZWZvcmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgc2FtcGxlLnJhd3MuYmVmb3JlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5maXJzdCAhPT0gc2FtcGxlKSB7XG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlID0gc2FtcGxlLnJhd3MuYmVmb3JlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXNcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKGNoaWxkLCBpZ25vcmUpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4KGNoaWxkKVxuXG4gICAgaWYgKCFpZ25vcmUgJiYgaW5kZXggPT09IDAgJiYgdGhpcy5ub2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLm5vZGVzWzFdLnJhd3MuYmVmb3JlID0gdGhpcy5ub2Rlc1tpbmRleF0ucmF3cy5iZWZvcmVcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gIH1cblxuICB0b1Jlc3VsdChvcHRzID0ge30pIHtcbiAgICBsZXQgbGF6eSA9IG5ldyBMYXp5UmVzdWx0KG5ldyBQcm9jZXNzb3IoKSwgdGhpcywgb3B0cylcbiAgICByZXR1cm4gbGF6eS5zdHJpbmdpZnkoKVxuICB9XG59XG5cblJvb3QucmVnaXN0ZXJMYXp5UmVzdWx0ID0gZGVwZW5kYW50ID0+IHtcbiAgTGF6eVJlc3VsdCA9IGRlcGVuZGFudFxufVxuXG5Sb290LnJlZ2lzdGVyUHJvY2Vzc29yID0gZGVwZW5kYW50ID0+IHtcbiAgUHJvY2Vzc29yID0gZGVwZW5kYW50XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdFxuUm9vdC5kZWZhdWx0ID0gUm9vdFxuXG5Db250YWluZXIucmVnaXN0ZXJSb290KFJvb3QpXG4iLCIndXNlIHN0cmljdCdcblxubGV0IENvbnRhaW5lciA9IHJlcXVpcmUoJy4vY29udGFpbmVyJylcbmxldCBsaXN0ID0gcmVxdWlyZSgnLi9saXN0JylcblxuY2xhc3MgUnVsZSBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ3J1bGUnXG4gICAgaWYgKCF0aGlzLm5vZGVzKSB0aGlzLm5vZGVzID0gW11cbiAgfVxuXG4gIGdldCBzZWxlY3RvcnMoKSB7XG4gICAgcmV0dXJuIGxpc3QuY29tbWEodGhpcy5zZWxlY3RvcilcbiAgfVxuXG4gIHNldCBzZWxlY3RvcnModmFsdWVzKSB7XG4gICAgbGV0IG1hdGNoID0gdGhpcy5zZWxlY3RvciA/IHRoaXMuc2VsZWN0b3IubWF0Y2goLyxcXHMqLykgOiBudWxsXG4gICAgbGV0IHNlcCA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnLCcgKyB0aGlzLnJhdygnYmV0d2VlbicsICdiZWZvcmVPcGVuJylcbiAgICB0aGlzLnNlbGVjdG9yID0gdmFsdWVzLmpvaW4oc2VwKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUnVsZVxuUnVsZS5kZWZhdWx0ID0gUnVsZVxuXG5Db250YWluZXIucmVnaXN0ZXJSdWxlKFJ1bGUpXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgREVGQVVMVF9SQVcgPSB7XG4gIGFmdGVyOiAnXFxuJyxcbiAgYmVmb3JlQ2xvc2U6ICdcXG4nLFxuICBiZWZvcmVDb21tZW50OiAnXFxuJyxcbiAgYmVmb3JlRGVjbDogJ1xcbicsXG4gIGJlZm9yZU9wZW46ICcgJyxcbiAgYmVmb3JlUnVsZTogJ1xcbicsXG4gIGNvbG9uOiAnOiAnLFxuICBjb21tZW50TGVmdDogJyAnLFxuICBjb21tZW50UmlnaHQ6ICcgJyxcbiAgZW1wdHlCb2R5OiAnJyxcbiAgaW5kZW50OiAnICAgICcsXG4gIHNlbWljb2xvbjogZmFsc2Vcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgcmV0dXJuIHN0clswXS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG59XG5cbmNsYXNzIFN0cmluZ2lmaWVyIHtcbiAgY29uc3RydWN0b3IoYnVpbGRlcikge1xuICAgIHRoaXMuYnVpbGRlciA9IGJ1aWxkZXJcbiAgfVxuXG4gIGF0cnVsZShub2RlLCBzZW1pY29sb24pIHtcbiAgICBsZXQgbmFtZSA9ICdAJyArIG5vZGUubmFtZVxuICAgIGxldCBwYXJhbXMgPSBub2RlLnBhcmFtcyA/IHRoaXMucmF3VmFsdWUobm9kZSwgJ3BhcmFtcycpIDogJydcblxuICAgIGlmICh0eXBlb2Ygbm9kZS5yYXdzLmFmdGVyTmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5hbWUgKz0gbm9kZS5yYXdzLmFmdGVyTmFtZVxuICAgIH0gZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBuYW1lICs9ICcgJ1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICB0aGlzLmJsb2NrKG5vZGUsIG5hbWUgKyBwYXJhbXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBlbmQgPSAobm9kZS5yYXdzLmJldHdlZW4gfHwgJycpICsgKHNlbWljb2xvbiA/ICc7JyA6ICcnKVxuICAgICAgdGhpcy5idWlsZGVyKG5hbWUgKyBwYXJhbXMgKyBlbmQsIG5vZGUpXG4gICAgfVxuICB9XG5cbiAgYmVmb3JlQWZ0ZXIobm9kZSwgZGV0ZWN0KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVEZWNsJylcbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVDb21tZW50JylcbiAgICB9IGVsc2UgaWYgKGRldGVjdCA9PT0gJ2JlZm9yZScpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZVJ1bGUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVDbG9zZScpXG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IG5vZGUucGFyZW50XG4gICAgbGV0IGRlcHRoID0gMFxuICAgIHdoaWxlIChidWYgJiYgYnVmLnR5cGUgIT09ICdyb290Jykge1xuICAgICAgZGVwdGggKz0gMVxuICAgICAgYnVmID0gYnVmLnBhcmVudFxuICAgIH1cblxuICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgIGxldCBpbmRlbnQgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnaW5kZW50JylcbiAgICAgIGlmIChpbmRlbnQubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgZGVwdGg7IHN0ZXArKykgdmFsdWUgKz0gaW5kZW50XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBibG9jayhub2RlLCBzdGFydCkge1xuICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnYmVmb3JlT3BlbicpXG4gICAgdGhpcy5idWlsZGVyKHN0YXJ0ICsgYmV0d2VlbiArICd7Jywgbm9kZSwgJ3N0YXJ0JylcblxuICAgIGxldCBhZnRlclxuICAgIGlmIChub2RlLm5vZGVzICYmIG5vZGUubm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmJvZHkobm9kZSlcbiAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJylcbiAgICB9IGVsc2Uge1xuICAgICAgYWZ0ZXIgPSB0aGlzLnJhdyhub2RlLCAnYWZ0ZXInLCAnZW1wdHlCb2R5JylcbiAgICB9XG5cbiAgICBpZiAoYWZ0ZXIpIHRoaXMuYnVpbGRlcihhZnRlcilcbiAgICB0aGlzLmJ1aWxkZXIoJ30nLCBub2RlLCAnZW5kJylcbiAgfVxuXG4gIGJvZHkobm9kZSkge1xuICAgIGxldCBsYXN0ID0gbm9kZS5ub2Rlcy5sZW5ndGggLSAxXG4gICAgd2hpbGUgKGxhc3QgPiAwKSB7XG4gICAgICBpZiAobm9kZS5ub2Rlc1tsYXN0XS50eXBlICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICBsYXN0IC09IDFcbiAgICB9XG5cbiAgICBsZXQgc2VtaWNvbG9uID0gdGhpcy5yYXcobm9kZSwgJ3NlbWljb2xvbicpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSBub2RlLm5vZGVzW2ldXG4gICAgICBsZXQgYmVmb3JlID0gdGhpcy5yYXcoY2hpbGQsICdiZWZvcmUnKVxuICAgICAgaWYgKGJlZm9yZSkgdGhpcy5idWlsZGVyKGJlZm9yZSlcbiAgICAgIHRoaXMuc3RyaW5naWZ5KGNoaWxkLCBsYXN0ICE9PSBpIHx8IHNlbWljb2xvbilcbiAgICB9XG4gIH1cblxuICBjb21tZW50KG5vZGUpIHtcbiAgICBsZXQgbGVmdCA9IHRoaXMucmF3KG5vZGUsICdsZWZ0JywgJ2NvbW1lbnRMZWZ0JylcbiAgICBsZXQgcmlnaHQgPSB0aGlzLnJhdyhub2RlLCAncmlnaHQnLCAnY29tbWVudFJpZ2h0JylcbiAgICB0aGlzLmJ1aWxkZXIoJy8qJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCArICcqLycsIG5vZGUpXG4gIH1cblxuICBkZWNsKG5vZGUsIHNlbWljb2xvbikge1xuICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnY29sb24nKVxuICAgIGxldCBzdHJpbmcgPSBub2RlLnByb3AgKyBiZXR3ZWVuICsgdGhpcy5yYXdWYWx1ZShub2RlLCAndmFsdWUnKVxuXG4gICAgaWYgKG5vZGUuaW1wb3J0YW50KSB7XG4gICAgICBzdHJpbmcgKz0gbm9kZS5yYXdzLmltcG9ydGFudCB8fCAnICFpbXBvcnRhbnQnXG4gICAgfVxuXG4gICAgaWYgKHNlbWljb2xvbikgc3RyaW5nICs9ICc7J1xuICAgIHRoaXMuYnVpbGRlcihzdHJpbmcsIG5vZGUpXG4gIH1cblxuICBkb2N1bWVudChub2RlKSB7XG4gICAgdGhpcy5ib2R5KG5vZGUpXG4gIH1cblxuICByYXcobm9kZSwgb3duLCBkZXRlY3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICBpZiAoIWRldGVjdCkgZGV0ZWN0ID0gb3duXG5cbiAgICAvLyBBbHJlYWR5IGhhZFxuICAgIGlmIChvd24pIHtcbiAgICAgIHZhbHVlID0gbm9kZS5yYXdzW293bl1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnRcblxuICAgIGlmIChkZXRlY3QgPT09ICdiZWZvcmUnKSB7XG4gICAgICAvLyBIYWNrIGZvciBmaXJzdCBydWxlIGluIENTU1xuICAgICAgaWYgKCFwYXJlbnQgfHwgKHBhcmVudC50eXBlID09PSAncm9vdCcgJiYgcGFyZW50LmZpcnN0ID09PSBub2RlKSkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cblxuICAgICAgLy8gYHJvb3RgIG5vZGVzIGluIGBkb2N1bWVudGAgc2hvdWxkIHVzZSBvbmx5IHRoZWlyIG93biByYXdzXG4gICAgICBpZiAocGFyZW50ICYmIHBhcmVudC50eXBlID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZsb2F0aW5nIGNoaWxkIHdpdGhvdXQgcGFyZW50XG4gICAgaWYgKCFwYXJlbnQpIHJldHVybiBERUZBVUxUX1JBV1tkZXRlY3RdXG5cbiAgICAvLyBEZXRlY3Qgc3R5bGUgYnkgb3RoZXIgbm9kZXNcbiAgICBsZXQgcm9vdCA9IG5vZGUucm9vdCgpXG4gICAgaWYgKCFyb290LnJhd0NhY2hlKSByb290LnJhd0NhY2hlID0ge31cbiAgICBpZiAodHlwZW9mIHJvb3QucmF3Q2FjaGVbZGV0ZWN0XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiByb290LnJhd0NhY2hlW2RldGVjdF1cbiAgICB9XG5cbiAgICBpZiAoZGV0ZWN0ID09PSAnYmVmb3JlJyB8fCBkZXRlY3QgPT09ICdhZnRlcicpIHtcbiAgICAgIHJldHVybiB0aGlzLmJlZm9yZUFmdGVyKG5vZGUsIGRldGVjdClcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1ldGhvZCA9ICdyYXcnICsgY2FwaXRhbGl6ZShkZXRlY3QpXG4gICAgICBpZiAodGhpc1ttZXRob2RdKSB7XG4gICAgICAgIHZhbHVlID0gdGhpc1ttZXRob2RdKHJvb3QsIG5vZGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290LndhbGsoaSA9PiB7XG4gICAgICAgICAgdmFsdWUgPSBpLnJhd3Nbb3duXVxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykgdmFsdWUgPSBERUZBVUxUX1JBV1tkZXRlY3RdXG5cbiAgICByb290LnJhd0NhY2hlW2RldGVjdF0gPSB2YWx1ZVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlQ2xvc2Uocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIGkubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5hZnRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5hZnRlclxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJylcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgJycpXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVDb21tZW50KHJvb3QsIG5vZGUpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGtDb21tZW50cyhpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlXG4gICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlRGVjbCcpXG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgJycpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlRGVjbChyb290LCBub2RlKSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrRGVjbHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZVxuICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZVJ1bGUnKVxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxTL2csICcnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZU9wZW4ocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLnR5cGUgIT09ICdkZWNsJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZXR3ZWVuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlUnVsZShyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgKGkucGFyZW50ICE9PSByb290IHx8IHJvb3QuZmlyc3QgIT09IGkpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZWZvcmVcbiAgICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAodmFsdWUpIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxTL2csICcnKVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3Q29sb24ocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2Fsa0RlY2xzKGkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmV0d2VlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmV0d2Vlbi5yZXBsYWNlKC9bXlxcczpdL2csICcnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3RW1wdHlCb2R5KHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5hZnRlclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0luZGVudChyb290KSB7XG4gICAgaWYgKHJvb3QucmF3cy5pbmRlbnQpIHJldHVybiByb290LnJhd3MuaW5kZW50XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgbGV0IHAgPSBpLnBhcmVudFxuICAgICAgaWYgKHAgJiYgcCAhPT0gcm9vdCAmJiBwLnBhcmVudCAmJiBwLnBhcmVudCA9PT0gcm9vdCkge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbGV0IHBhcnRzID0gaS5yYXdzLmJlZm9yZS5zcGxpdCgnXFxuJylcbiAgICAgICAgICB2YWx1ZSA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3U2VtaWNvbG9uKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCAmJiBpLmxhc3QudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLnNlbWljb2xvblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd1ZhbHVlKG5vZGUsIHByb3ApIHtcbiAgICBsZXQgdmFsdWUgPSBub2RlW3Byb3BdXG4gICAgbGV0IHJhdyA9IG5vZGUucmF3c1twcm9wXVxuICAgIGlmIChyYXcgJiYgcmF3LnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJhdy5yYXdcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJvb3Qobm9kZSkge1xuICAgIHRoaXMuYm9keShub2RlKVxuICAgIGlmIChub2RlLnJhd3MuYWZ0ZXIpIHRoaXMuYnVpbGRlcihub2RlLnJhd3MuYWZ0ZXIpXG4gIH1cblxuICBydWxlKG5vZGUpIHtcbiAgICB0aGlzLmJsb2NrKG5vZGUsIHRoaXMucmF3VmFsdWUobm9kZSwgJ3NlbGVjdG9yJykpXG4gICAgaWYgKG5vZGUucmF3cy5vd25TZW1pY29sb24pIHtcbiAgICAgIHRoaXMuYnVpbGRlcihub2RlLnJhd3Mub3duU2VtaWNvbG9uLCBub2RlLCAnZW5kJylcbiAgICB9XG4gIH1cblxuICBzdHJpbmdpZnkobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgaWYgKCF0aGlzW25vZGUudHlwZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1Vua25vd24gQVNUIG5vZGUgdHlwZSAnICtcbiAgICAgICAgICBub2RlLnR5cGUgK1xuICAgICAgICAgICcuICcgK1xuICAgICAgICAgICdNYXliZSB5b3UgbmVlZCB0byBjaGFuZ2UgUG9zdENTUyBzdHJpbmdpZmllci4nXG4gICAgICApXG4gICAgfVxuICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgdGhpc1tub2RlLnR5cGVdKG5vZGUsIHNlbWljb2xvbilcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZ2lmaWVyXG5TdHJpbmdpZmllci5kZWZhdWx0ID0gU3RyaW5naWZpZXJcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgU3RyaW5naWZpZXIgPSByZXF1aXJlKCcuL3N0cmluZ2lmaWVyJylcblxuZnVuY3Rpb24gc3RyaW5naWZ5KG5vZGUsIGJ1aWxkZXIpIHtcbiAgbGV0IHN0ciA9IG5ldyBTdHJpbmdpZmllcihidWlsZGVyKVxuICBzdHIuc3RyaW5naWZ5KG5vZGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5zdHJpbmdpZnkuZGVmYXVsdCA9IHN0cmluZ2lmeVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzLmlzQ2xlYW4gPSBTeW1ib2woJ2lzQ2xlYW4nKVxuXG5tb2R1bGUuZXhwb3J0cy5teSA9IFN5bWJvbCgnbXknKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNJTkdMRV9RVU9URSA9IFwiJ1wiLmNoYXJDb2RlQXQoMClcbmNvbnN0IERPVUJMRV9RVU9URSA9ICdcIicuY2hhckNvZGVBdCgwKVxuY29uc3QgQkFDS1NMQVNIID0gJ1xcXFwnLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNMQVNIID0gJy8nLmNoYXJDb2RlQXQoMClcbmNvbnN0IE5FV0xJTkUgPSAnXFxuJy5jaGFyQ29kZUF0KDApXG5jb25zdCBTUEFDRSA9ICcgJy5jaGFyQ29kZUF0KDApXG5jb25zdCBGRUVEID0gJ1xcZicuY2hhckNvZGVBdCgwKVxuY29uc3QgVEFCID0gJ1xcdCcuY2hhckNvZGVBdCgwKVxuY29uc3QgQ1IgPSAnXFxyJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX1NRVUFSRSA9ICdbJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9TUVVBUkUgPSAnXScuY2hhckNvZGVBdCgwKVxuY29uc3QgT1BFTl9QQVJFTlRIRVNFUyA9ICcoJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9QQVJFTlRIRVNFUyA9ICcpJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX0NVUkxZID0gJ3snLmNoYXJDb2RlQXQoMClcbmNvbnN0IENMT1NFX0NVUkxZID0gJ30nLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNFTUlDT0xPTiA9ICc7Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBU1RFUklTSyA9ICcqJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDT0xPTiA9ICc6Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBVCA9ICdAJy5jaGFyQ29kZUF0KDApXG5cbmNvbnN0IFJFX0FUX0VORCA9IC9bXFx0XFxuXFxmXFxyIFwiIycoKS87W1xcXFxcXF17fV0vZ1xuY29uc3QgUkVfV09SRF9FTkQgPSAvW1xcdFxcblxcZlxcciAhXCIjJygpOjtAW1xcXFxcXF17fV18XFwvKD89XFwqKS9nXG5jb25zdCBSRV9CQURfQlJBQ0tFVCA9IC8uW1xcclxcblwiJygvXFxcXF0vXG5jb25zdCBSRV9IRVhfRVNDQVBFID0gL1tcXGRhLWZdL2lcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b2tlbml6ZXIoaW5wdXQsIG9wdGlvbnMgPSB7fSkge1xuICBsZXQgY3NzID0gaW5wdXQuY3NzLnZhbHVlT2YoKVxuICBsZXQgaWdub3JlID0gb3B0aW9ucy5pZ25vcmVFcnJvcnNcblxuICBsZXQgY29kZSwgbmV4dCwgcXVvdGUsIGNvbnRlbnQsIGVzY2FwZVxuICBsZXQgZXNjYXBlZCwgZXNjYXBlUG9zLCBwcmV2LCBuLCBjdXJyZW50VG9rZW5cblxuICBsZXQgbGVuZ3RoID0gY3NzLmxlbmd0aFxuICBsZXQgcG9zID0gMFxuICBsZXQgYnVmZmVyID0gW11cbiAgbGV0IHJldHVybmVkID0gW11cblxuICBmdW5jdGlvbiBwb3NpdGlvbigpIHtcbiAgICByZXR1cm4gcG9zXG4gIH1cblxuICBmdW5jdGlvbiB1bmNsb3NlZCh3aGF0KSB7XG4gICAgdGhyb3cgaW5wdXQuZXJyb3IoJ1VuY2xvc2VkICcgKyB3aGF0LCBwb3MpXG4gIH1cblxuICBmdW5jdGlvbiBlbmRPZkZpbGUoKSB7XG4gICAgcmV0dXJuIHJldHVybmVkLmxlbmd0aCA9PT0gMCAmJiBwb3MgPj0gbGVuZ3RoXG4gIH1cblxuICBmdW5jdGlvbiBuZXh0VG9rZW4ob3B0cykge1xuICAgIGlmIChyZXR1cm5lZC5sZW5ndGgpIHJldHVybiByZXR1cm5lZC5wb3AoKVxuICAgIGlmIChwb3MgPj0gbGVuZ3RoKSByZXR1cm5cblxuICAgIGxldCBpZ25vcmVVbmNsb3NlZCA9IG9wdHMgPyBvcHRzLmlnbm9yZVVuY2xvc2VkIDogZmFsc2VcblxuICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChwb3MpXG5cbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgTkVXTElORTpcbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICBjYXNlIFRBQjpcbiAgICAgIGNhc2UgQ1I6XG4gICAgICBjYXNlIEZFRUQ6IHtcbiAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICBkbyB7XG4gICAgICAgICAgbmV4dCArPSAxXG4gICAgICAgICAgY29kZSA9IGNzcy5jaGFyQ29kZUF0KG5leHQpXG4gICAgICAgIH0gd2hpbGUgKFxuICAgICAgICAgIGNvZGUgPT09IFNQQUNFIHx8XG4gICAgICAgICAgY29kZSA9PT0gTkVXTElORSB8fFxuICAgICAgICAgIGNvZGUgPT09IFRBQiB8fFxuICAgICAgICAgIGNvZGUgPT09IENSIHx8XG4gICAgICAgICAgY29kZSA9PT0gRkVFRFxuICAgICAgICApXG5cbiAgICAgICAgY3VycmVudFRva2VuID0gWydzcGFjZScsIGNzcy5zbGljZShwb3MsIG5leHQpXVxuICAgICAgICBwb3MgPSBuZXh0IC0gMVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIE9QRU5fU1FVQVJFOlxuICAgICAgY2FzZSBDTE9TRV9TUVVBUkU6XG4gICAgICBjYXNlIE9QRU5fQ1VSTFk6XG4gICAgICBjYXNlIENMT1NFX0NVUkxZOlxuICAgICAgY2FzZSBDT0xPTjpcbiAgICAgIGNhc2UgU0VNSUNPTE9OOlxuICAgICAgY2FzZSBDTE9TRV9QQVJFTlRIRVNFUzoge1xuICAgICAgICBsZXQgY29udHJvbENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFtjb250cm9sQ2hhciwgY29udHJvbENoYXIsIHBvc11cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBPUEVOX1BBUkVOVEhFU0VTOiB7XG4gICAgICAgIHByZXYgPSBidWZmZXIubGVuZ3RoID8gYnVmZmVyLnBvcCgpWzFdIDogJydcbiAgICAgICAgbiA9IGNzcy5jaGFyQ29kZUF0KHBvcyArIDEpXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcmV2ID09PSAndXJsJyAmJlxuICAgICAgICAgIG4gIT09IFNJTkdMRV9RVU9URSAmJlxuICAgICAgICAgIG4gIT09IERPVUJMRV9RVU9URSAmJlxuICAgICAgICAgIG4gIT09IFNQQUNFICYmXG4gICAgICAgICAgbiAhPT0gTkVXTElORSAmJlxuICAgICAgICAgIG4gIT09IFRBQiAmJlxuICAgICAgICAgIG4gIT09IEZFRUQgJiZcbiAgICAgICAgICBuICE9PSBDUlxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoJyknLCBuZXh0ICsgMSlcbiAgICAgICAgICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5jbG9zZWQoJ2JyYWNrZXQnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0XG4gICAgICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgICAgICBlc2NhcGVQb3MgLT0gMVxuICAgICAgICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChlc2NhcGVkKVxuXG4gICAgICAgICAgY3VycmVudFRva2VuID0gWydicmFja2V0cycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XVxuXG4gICAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQgPSBjc3MuaW5kZXhPZignKScsIHBvcyArIDEpXG4gICAgICAgICAgY29udGVudCA9IGNzcy5zbGljZShwb3MsIG5leHQgKyAxKVxuXG4gICAgICAgICAgaWYgKG5leHQgPT09IC0xIHx8IFJFX0JBRF9CUkFDS0VULnRlc3QoY29udGVudCkpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnKCcsICcoJywgcG9zXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ2JyYWNrZXRzJywgY29udGVudCwgcG9zLCBuZXh0XVxuICAgICAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgU0lOR0xFX1FVT1RFOlxuICAgICAgY2FzZSBET1VCTEVfUVVPVEU6IHtcbiAgICAgICAgcXVvdGUgPSBjb2RlID09PSBTSU5HTEVfUVVPVEUgPyBcIidcIiA6ICdcIidcbiAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICBkbyB7XG4gICAgICAgICAgZXNjYXBlZCA9IGZhbHNlXG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKHF1b3RlLCBuZXh0ICsgMSlcbiAgICAgICAgICBpZiAobmV4dCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmUgfHwgaWdub3JlVW5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgbmV4dCA9IHBvcyArIDFcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVuY2xvc2VkKCdzdHJpbmcnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0XG4gICAgICAgICAgd2hpbGUgKGNzcy5jaGFyQ29kZUF0KGVzY2FwZVBvcyAtIDEpID09PSBCQUNLU0xBU0gpIHtcbiAgICAgICAgICAgIGVzY2FwZVBvcyAtPSAxXG4gICAgICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGVzY2FwZWQpXG5cbiAgICAgICAgY3VycmVudFRva2VuID0gWydzdHJpbmcnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF1cbiAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIEFUOiB7XG4gICAgICAgIFJFX0FUX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxXG4gICAgICAgIFJFX0FUX0VORC50ZXN0KGNzcylcbiAgICAgICAgaWYgKFJFX0FUX0VORC5sYXN0SW5kZXggPT09IDApIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmxlbmd0aCAtIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gUkVfQVRfRU5ELmxhc3RJbmRleCAtIDJcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYXQtd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XVxuXG4gICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBCQUNLU0xBU0g6IHtcbiAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICBlc2NhcGUgPSB0cnVlXG4gICAgICAgIHdoaWxlIChjc3MuY2hhckNvZGVBdChuZXh0ICsgMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIGVzY2FwZSA9ICFlc2NhcGVcbiAgICAgICAgfVxuICAgICAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpXG4gICAgICAgIGlmIChcbiAgICAgICAgICBlc2NhcGUgJiZcbiAgICAgICAgICBjb2RlICE9PSBTTEFTSCAmJlxuICAgICAgICAgIGNvZGUgIT09IFNQQUNFICYmXG4gICAgICAgICAgY29kZSAhPT0gTkVXTElORSAmJlxuICAgICAgICAgIGNvZGUgIT09IFRBQiAmJlxuICAgICAgICAgIGNvZGUgIT09IENSICYmXG4gICAgICAgICAgY29kZSAhPT0gRkVFRFxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICBpZiAoUkVfSEVYX0VTQ0FQRS50ZXN0KGNzcy5jaGFyQXQobmV4dCkpKSB7XG4gICAgICAgICAgICB3aGlsZSAoUkVfSEVYX0VTQ0FQRS50ZXN0KGNzcy5jaGFyQXQobmV4dCArIDEpKSkge1xuICAgICAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjc3MuY2hhckNvZGVBdChuZXh0ICsgMSkgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XVxuXG4gICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAoY29kZSA9PT0gU0xBU0ggJiYgY3NzLmNoYXJDb2RlQXQocG9zICsgMSkgPT09IEFTVEVSSVNLKSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcqLycsIHBvcyArIDIpICsgMVxuICAgICAgICAgIGlmIChuZXh0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIG5leHQgPSBjc3MubGVuZ3RoXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1bmNsb3NlZCgnY29tbWVudCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VycmVudFRva2VuID0gWydjb21tZW50JywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdXG4gICAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFJFX1dPUkRfRU5ELmxhc3RJbmRleCA9IHBvcyArIDFcbiAgICAgICAgICBSRV9XT1JEX0VORC50ZXN0KGNzcylcbiAgICAgICAgICBpZiAoUkVfV09SRF9FTkQubGFzdEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBuZXh0ID0gY3NzLmxlbmd0aCAtIDFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dCA9IFJFX1dPUkRfRU5ELmxhc3RJbmRleCAtIDJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3dvcmQnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF1cbiAgICAgICAgICBidWZmZXIucHVzaChjdXJyZW50VG9rZW4pXG4gICAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwb3MrK1xuICAgIHJldHVybiBjdXJyZW50VG9rZW5cbiAgfVxuXG4gIGZ1bmN0aW9uIGJhY2sodG9rZW4pIHtcbiAgICByZXR1cm5lZC5wdXNoKHRva2VuKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBiYWNrLFxuICAgIGVuZE9mRmlsZSxcbiAgICBuZXh0VG9rZW4sXG4gICAgcG9zaXRpb25cbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuJ3VzZSBzdHJpY3QnXG5cbmxldCBwcmludGVkID0ge31cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3YXJuT25jZShtZXNzYWdlKSB7XG4gIGlmIChwcmludGVkW21lc3NhZ2VdKSByZXR1cm5cbiAgcHJpbnRlZFttZXNzYWdlXSA9IHRydWVcblxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUud2Fybikge1xuICAgIGNvbnNvbGUud2FybihtZXNzYWdlKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgV2FybmluZyB7XG4gIGNvbnN0cnVjdG9yKHRleHQsIG9wdHMgPSB7fSkge1xuICAgIHRoaXMudHlwZSA9ICd3YXJuaW5nJ1xuICAgIHRoaXMudGV4dCA9IHRleHRcblxuICAgIGlmIChvcHRzLm5vZGUgJiYgb3B0cy5ub2RlLnNvdXJjZSkge1xuICAgICAgbGV0IHJhbmdlID0gb3B0cy5ub2RlLnJhbmdlQnkob3B0cylcbiAgICAgIHRoaXMubGluZSA9IHJhbmdlLnN0YXJ0LmxpbmVcbiAgICAgIHRoaXMuY29sdW1uID0gcmFuZ2Uuc3RhcnQuY29sdW1uXG4gICAgICB0aGlzLmVuZExpbmUgPSByYW5nZS5lbmQubGluZVxuICAgICAgdGhpcy5lbmRDb2x1bW4gPSByYW5nZS5lbmQuY29sdW1uXG4gICAgfVxuXG4gICAgZm9yIChsZXQgb3B0IGluIG9wdHMpIHRoaXNbb3B0XSA9IG9wdHNbb3B0XVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5lcnJvcih0aGlzLnRleHQsIHtcbiAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgIHBsdWdpbjogdGhpcy5wbHVnaW4sXG4gICAgICAgIHdvcmQ6IHRoaXMud29yZFxuICAgICAgfSkubWVzc2FnZVxuICAgIH1cblxuICAgIGlmICh0aGlzLnBsdWdpbikge1xuICAgICAgcmV0dXJuIHRoaXMucGx1Z2luICsgJzogJyArIHRoaXMudGV4dFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRleHRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhcm5pbmdcbldhcm5pbmcuZGVmYXVsdCA9IFdhcm5pbmdcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsImxldCB1cmxBbHBoYWJldCA9XG4gICd1c2VhbmRvbS0yNlQxOTgzNDBQWDc1cHhKQUNLVkVSWU1JTkRCVVNIV09MRl9HUVpiZmdoamtscXZ3eXpyaWN0J1xubGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBkZWZhdWx0U2l6ZSA9IDIxKSA9PiB7XG4gIHJldHVybiAoc2l6ZSA9IGRlZmF1bHRTaXplKSA9PiB7XG4gICAgbGV0IGlkID0gJydcbiAgICBsZXQgaSA9IHNpemVcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZCArPSBhbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0Lmxlbmd0aCkgfCAwXVxuICAgIH1cbiAgICByZXR1cm4gaWRcbiAgfVxufVxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGkgPSBzaXplXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZCArPSB1cmxBbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIDY0KSB8IDBdXG4gIH1cbiAgcmV0dXJuIGlkXG59XG5tb2R1bGUuZXhwb3J0cyA9IHsgbmFub2lkLCBjdXN0b21BbHBoYWJldCB9XG4iLCJpbXBvcnQgcG9zdGNzcyBmcm9tICcuL3Bvc3Rjc3MuanMnXG5cbmV4cG9ydCBkZWZhdWx0IHBvc3Rjc3NcblxuZXhwb3J0IGNvbnN0IHN0cmluZ2lmeSA9IHBvc3Rjc3Muc3RyaW5naWZ5XG5leHBvcnQgY29uc3QgZnJvbUpTT04gPSBwb3N0Y3NzLmZyb21KU09OXG5leHBvcnQgY29uc3QgcGx1Z2luID0gcG9zdGNzcy5wbHVnaW5cbmV4cG9ydCBjb25zdCBwYXJzZSA9IHBvc3Rjc3MucGFyc2VcbmV4cG9ydCBjb25zdCBsaXN0ID0gcG9zdGNzcy5saXN0XG5cbmV4cG9ydCBjb25zdCBkb2N1bWVudCA9IHBvc3Rjc3MuZG9jdW1lbnRcbmV4cG9ydCBjb25zdCBjb21tZW50ID0gcG9zdGNzcy5jb21tZW50XG5leHBvcnQgY29uc3QgYXRSdWxlID0gcG9zdGNzcy5hdFJ1bGVcbmV4cG9ydCBjb25zdCBydWxlID0gcG9zdGNzcy5ydWxlXG5leHBvcnQgY29uc3QgZGVjbCA9IHBvc3Rjc3MuZGVjbFxuZXhwb3J0IGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnJvb3RcblxuZXhwb3J0IGNvbnN0IENzc1N5bnRheEVycm9yID0gcG9zdGNzcy5Dc3NTeW50YXhFcnJvclxuZXhwb3J0IGNvbnN0IERlY2xhcmF0aW9uID0gcG9zdGNzcy5EZWNsYXJhdGlvblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IHBvc3Rjc3MuQ29udGFpbmVyXG5leHBvcnQgY29uc3QgUHJvY2Vzc29yID0gcG9zdGNzcy5Qcm9jZXNzb3JcbmV4cG9ydCBjb25zdCBEb2N1bWVudCA9IHBvc3Rjc3MuRG9jdW1lbnRcbmV4cG9ydCBjb25zdCBDb21tZW50ID0gcG9zdGNzcy5Db21tZW50XG5leHBvcnQgY29uc3QgV2FybmluZyA9IHBvc3Rjc3MuV2FybmluZ1xuZXhwb3J0IGNvbnN0IEF0UnVsZSA9IHBvc3Rjc3MuQXRSdWxlXG5leHBvcnQgY29uc3QgUmVzdWx0ID0gcG9zdGNzcy5SZXN1bHRcbmV4cG9ydCBjb25zdCBJbnB1dCA9IHBvc3Rjc3MuSW5wdXRcbmV4cG9ydCBjb25zdCBSdWxlID0gcG9zdGNzcy5SdWxlXG5leHBvcnQgY29uc3QgUm9vdCA9IHBvc3Rjc3MuUm9vdFxuZXhwb3J0IGNvbnN0IE5vZGUgPSBwb3N0Y3NzLk5vZGVcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZ2FtZVN0YXJ0LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbInVwZGF0ZVNjcmVlbiIsImF0dGFja090aGVyIiwiaHVtYW4iLCJjb21wdXRlciIsImNlbGwiLCJyb3ciLCJwYXJzZUludCIsImNsYXNzTGlzdCIsInNsaWNlIiwiY29sIiwiYm9hcmQiLCJhdHRhY2siLCJhaUF0dGFjayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIlNoaXAiLCJzaGlwTGVuZ3RoIiwic2hpcHMiLCJsZW5ndGgiLCJnb3RIaXQiLCJzdW5rIiwiaGl0IiwiaXNTdW5rIiwicGFyc2UiLCJSYW5kb21pemUiLCJQbGF5ZXIiLCJnYW1lU3RhcnQiLCJzdGFydFNjcmVlbiIsIm1ha2VVSSIsImxvY2FsU3RvcmFnZSIsImNsZWFyIiwic3RhcnRDb29yZHMiLCJpbm5lckhUTUwiLCJpIiwiaiIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJjb25jYXQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJjdXJyZW50U2hpcCIsInBhcnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInZhbHVlIiwidHJpbSIsInN0eWxlIiwiYm94U2hhZG93IiwiYm9yZGVyQ29sb3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNoaXAiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInNpemUiLCJyZXBsYWNlIiwiaW5jbHVkZXMiLCJpc1NhZmUiLCJnZXRJdGVtIiwiY29vcmQiLCJ2ZXJ0aWNhbCIsImJhY2tncm91bmRDb2xvciIsImRhdGEiLCJwcmV2ZW50RGVmYXVsdCIsImNlbGxJbmRleCIsIm1heEluZGV4IiwidG9TdHJpbmciLCJpc0Ryb3BwZWQiLCJwdXNoIiwibmV4dENlbGxJbmRleCIsImNlbGxUb0ZpbGwiLCJyZW1vdmUiLCJzaGlwUk9XQ09PUkQiLCJzaGlwQ09MQ09PUkQiLCJpc1ZlcnRpY2FsIiwic2VsZWN0ZWRTaGlwIiwiY29uc29sZSIsImxvZyIsImJvYXJkU2hpcCIsImFpQm9hcmRTaGlwIiwiR2FtZUJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwiZ2V0Qm9hcmQiLCJzaGlwc0JvYXJkZWQiLCJ2ZXJ0aWNhbFBsYWNlIiwidGVtcEJhY2tUcmFjayIsImVuZGluZyIsImNvb3JkcyIsImJhY2tUcmFja1ZlcnRpY2FsIiwiY29vcmRpbmF0ZXMiLCJob3Jpem9udGFsUGxhY2UiLCJiYWNrVHJhY2tIb3Jpem9udGFsIiwiUGxhY2VTaGlwIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiaW5kZXgiLCJyZWNpZXZlQXR0YWNrIiwiZW5lbXlCb2FyZCIsImhpdFNoaXAiLCJmaWx0ZXIiLCJzb21lIiwidXBkYXRlR2FtZSIsImVuZEdhbWUiLCJmaW5kSW5kZXgiLCJzIiwic3BsaWNlIiwibmFtZSIsIl9sb29wIiwiX2xvb3AyIiwiX2oiLCJ0ZW1wQ29vcmRzIiwiZ2FtZUJvYXJkRmFjdCIsInNoaXBDb29yZHMiLCJodW1hbkIiLCJjaGlsZE5vZGVzIiwicGxheWVyTmFtZSIsImlzQUkiLCJNYXRoIiwicmFuZG9tIiwiaXNWYWxpZFNwb3QiLCJmbG9vciIsImVCb2FyZCIsImFpQiIsImhVSSIsImFVSSJdLCJzb3VyY2VSb290IjoiIn0=