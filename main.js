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
      if (vertical && board[row + ship.ships.length] !== undefined) {
        verticalPlace(ship.ships.length, row, col, ship);
      } else if (!vertical && board[row][col + ship.ships.length] !== undefined) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sc0ZBQXNGLFlBQVksZUFBZSxNQUFNLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxLQUFLLE9BQU8sS0FBSyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLEtBQUssTUFBTSxLQUFLLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsUUFBUSxLQUFLLFlBQVksYUFBYSxPQUFPLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxNQUFNLFlBQVksT0FBTyxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLE1BQU0sTUFBTSxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLE1BQU0sWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUss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O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RiWTs7QUFFWixXQUFXLG1CQUFPLENBQUMsbUVBQVk7O0FBRS9CLHdCQUF3QixtQkFBTyxDQUFDLG1DQUFzQjs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLGtCQUFrQjtBQUM5QjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuR1k7O0FBRVosV0FBVyxtQkFBTyxDQUFDLGtEQUFROztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2Qlk7O0FBRVosZ0JBQWdCLG1CQUFPLENBQUMsNERBQWE7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0JBQStCOztBQUUzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDaENZOztBQUVaLGtCQUFrQixtQkFBTyxDQUFDLGdFQUFlO0FBQ3pDLGtCQUFrQixtQkFBTyxDQUFDLGtFQUFnQjtBQUMxQyxjQUFjLG1CQUFPLENBQUMsd0RBQVc7QUFDakMsYUFBYSxtQkFBTyxDQUFDLHdEQUFXO0FBQ2hDLFlBQVksbUJBQU8sQ0FBQyxvREFBUztBQUM3QixXQUFXLG1CQUFPLENBQUMsa0RBQVE7QUFDM0IsV0FBVyxtQkFBTyxDQUFDLGtEQUFROztBQUUzQjtBQUNBOztBQUVBLFFBQVEsaUNBQWlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUscUJBQXFCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyRFk7O0FBRVosTUFBTSx3Q0FBd0MsRUFBRSxtQkFBTyxDQUFDLDRCQUFlO0FBQ3ZFLE1BQU0sK0JBQStCLEVBQUUsbUJBQU8sQ0FBQyxrQkFBSztBQUNwRCxNQUFNLHNCQUFzQixFQUFFLG1CQUFPLENBQUMsbUJBQU07QUFDNUMsTUFBTSxTQUFTLEVBQUUsbUJBQU8sQ0FBQyxxRUFBbUI7O0FBRTVDLHdCQUF3QixtQkFBTyxDQUFDLG1DQUFzQjtBQUN0RCxxQkFBcUIsbUJBQU8sQ0FBQywwRUFBb0I7QUFDakQsa0JBQWtCLG1CQUFPLENBQUMsa0VBQWdCOztBQUUxQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsS0FBSztBQUMvQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywwQ0FBMEM7QUFDeEQ7QUFDQTtBQUNBLGNBQWMsZ0RBQWdEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSx5Q0FBeUMsY0FBYztBQUN2RCwyQ0FBMkMsa0NBQWtDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsY0FBYztBQUM1RDs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGtDQUFrQztBQUM1RTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdlBZOztBQUVaLE1BQU0sY0FBYyxFQUFFLG1CQUFPLENBQUMsd0RBQVc7QUFDekMsbUJBQW1CLG1CQUFPLENBQUMsb0VBQWlCO0FBQzVDLGdCQUFnQixtQkFBTyxDQUFDLDREQUFhO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLDREQUFhO0FBQ3JDLGVBQWUsbUJBQU8sQ0FBQywwREFBWTtBQUNuQyxlQUFlLG1CQUFPLENBQUMsNERBQWE7QUFDcEMsYUFBYSxtQkFBTyxDQUFDLHNEQUFVO0FBQy9CLFlBQVksbUJBQU8sQ0FBQyxvREFBUztBQUM3QixXQUFXLG1CQUFPLENBQUMsa0RBQVE7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLFlBQVksSUFBcUM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTyxLQUFLLHFCQUFxQjtBQUNoRSwwQ0FBMEMsd0JBQXdCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxpQkFBaUI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDcmlCWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FB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QUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQ0FBb0MsUUFBUTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrQkFBa0I7QUFDMUIsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtB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QUNBOztBQUVBLHVEQUF1RDtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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Qy9CLGVBQWUsK0NBQWM7QUFDN0IsZUFBZSwrQ0FBYztBQUM3QixjQUFjLDhDQUFhO0FBQzNCLGFBQWEsNkNBQVk7QUFDekIsYUFBYSw2Q0FBWTtBQUN6QixhQUFhLDZDQUFZOzs7Ozs7O1VDN0JoQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2F0dGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmF0dGxlc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZVN0YXJ0LmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW5HYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JhbmRvbWl6ZUJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy91cGRhdGVVSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BpY29jb2xvcnMvcGljb2NvbG9ycy5icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9hdC1ydWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9jb21tZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9jb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2Nzcy1zeW50YXgtZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2RlY2xhcmF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvZnJvbUpTT04uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2lucHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9sYXp5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvbWFwLWdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvbm8td29yay1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3BhcnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3Bvc3Rjc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3ByZXZpb3VzLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3J1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3N0cmluZ2lmaWVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3N5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3Rva2VuaXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi93YXJuLW9uY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy5jc3M/YThkMCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy9pZ25vcmVkfC9ob21lL2Z1ZG8vcmVwb3MvQmF0dGxlc2hpcC9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWJ8Li90ZXJtaW5hbC1oaWdobGlnaHQiLCJ3ZWJwYWNrOi8vL2lnbm9yZWR8L2hvbWUvZnVkby9yZXBvcy9CYXR0bGVzaGlwL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYnxmcyIsIndlYnBhY2s6Ly8vaWdub3JlZHwvaG9tZS9mdWRvL3JlcG9zL0JhdHRsZXNoaXAvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGlifHBhdGgiLCJ3ZWJwYWNrOi8vL2lnbm9yZWR8L2hvbWUvZnVkby9yZXBvcy9CYXR0bGVzaGlwL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYnxzb3VyY2UtbWFwLWpzIiwid2VicGFjazovLy9pZ25vcmVkfC9ob21lL2Z1ZG8vcmVwb3MvQmF0dGxlc2hpcC9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWJ8dXJsIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uYW5vaWQvbm9uLXNlY3VyZS9pbmRleC5janMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3Bvc3Rjc3MubWpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1cGRhdGVTY3JlZW4gZnJvbSBcIi4vdXBkYXRlVUlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0YWNrT3RoZXIoaHVtYW4sIGNvbXB1dGVyLCBjZWxsKSB7XG4gICAgbGV0IHJvdyA9IHBhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnNsaWNlKDQsIDUpKTtcbiAgICBsZXQgY29sID0gcGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0uc2xpY2UoNSkpXG4gICAgaWYgKGNvbXB1dGVyLmJvYXJkW3Jvd11bY29sXSA9PSAwIHx8IGNvbXB1dGVyLmJvYXJkW3Jvd11bY29sXSA9PSAxKSB7XG4gICAgICAgIGh1bWFuLmF0dGFjayhyb3csIGNvbCwgY29tcHV0ZXIpO1xuICAgICAgICBjb21wdXRlci5haUF0dGFjayhodW1hbik7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWFuQlwiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdXBkYXRlU2NyZWVuKGh1bWFuLmJvYXJkLCBjb21wdXRlci5ib2FyZClcbiAgICAgICAgfVxuICAgIH1cbn0iLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAoc2hpcExlbmd0aCkge1xuICBjb25zdCBzaGlwcyA9IHtcbiAgICBsZW5ndGg6IHNoaXBMZW5ndGgsXG4gICAgZ290SGl0OiAwLFxuICAgIHN1bms6IGZhbHNlLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmdvdEhpdCsrO1xuICAgIH0sXG5cbiAgICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMubGVuZ3RoID09PSB0aGlzLmdvdEhpdCA/IHRoaXMuc3VuayA9IHRydWUgOiB0aGlzLnN1bmsgPSBmYWxzZVxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIHsgc2hpcHMgfTtcbn1cbiIsImltcG9ydCB7IHBhcnNlIH0gZnJvbSAncG9zdGNzcyc7XG5pbXBvcnQgUmFuZG9taXplIGZyb20gJy4vcmFuZG9taXplQm9hcmQnO1xuaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgU2hpcCBmcm9tICcuL2JhdHRsZXNoaXAnO1xuaW1wb3J0IGdhbWVTdGFydCBmcm9tICcuL21haW5HYW1lJztcblxudmFyIHN0YXJ0U2NyZWVuID0gXCJcIiArXG4gICAgXCIgIDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XCIgK1xuICAgIFwiICAgIDxoZWFkZXIgY2xhc3M9XFxcImZpeGVkSGVhZFxcXCI+XCIgK1xuICAgIFwiICAgICAgPGgxPkJhdHRsZSBTaGlwPC9oMT5cIiArXG4gICAgXCIgICAgICA8cD5XaGVyZSB0aGUgcmVhbCBvbmUgZmlnaHRzPC9wPlwiICtcbiAgICBcIiAgICA8L2hlYWRlcj5cIiArXG4gICAgXCIgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkXFxcIj48L2Rpdj5cIiArXG4gICAgXCIgICAgPG1haW4+XCIgK1xuICAgIFwiICAgICAgPGRpdiBjbGFzcz1cXFwiY29udHJvbFxcXCI+XCIgK1xuICAgIFwiICAgICAgPGRpdiBjbGFzcz1cXFwibmFtZUNvbnRyb2xcXFwiPlwiICtcbiAgICBcIiAgICAgICAgPHAgY2xhc3M9XFxcImlucHV0SGVhZFxcXCI+VHlwZSB5b3VyIE5hbWU8L3A+IDxicj5cIiArXG4gICAgXCIgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBtYXhsZW5ndGg9XFxcIjEyXFxcIiBtaW5sZW5ndGg9XFxcIjFcXFwiPlwiICtcbiAgICBcIiAgICAgICAgPHAgY2xhc3M9XFxcImVycm9yXFxcIj48L3A+XCIgK1xuICAgIFwiICAgICAgPC9kaXY+XCIgK1xuICAgIFwiICAgICAgPGRpdiBjbGFzcz1cXFwibW92ZXNcXFwiPlwiICtcbiAgICBcIiAgICAgICAgICAgPHA+SG9sZCB0aGUgc2hpcCBmcm9tIGZpcnN0IHRpbGUgYW5kIGRyYWcgaXQgKG9ubHkgZm9yIHBjIHVzZXJzKTwvcD5cIiArXG4gICAgXCIgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXAgczVcXFwiICBkcmFnZ2FibGU9dHJ1ZSA+PC9kaXY+XCIgK1xuICAgIFwiICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwIHM0XFxcIiAgZHJhZ2dhYmxlPXRydWUgPjwvZGl2PlwiICtcbiAgICBcIiAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcCBzM1xcXCIgIGRyYWdnYWJsZT10cnVlID48L2Rpdj5cIiArXG4gICAgXCIgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXAgczJcXFwiICBkcmFnZ2FibGU9dHJ1ZSA+PC9kaXY+XCIgK1xuICAgIFwiICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwIHMxXFxcIiAgZHJhZ2dhYmxlPXRydWUgPjwvZGl2PlwiICtcbiAgICBcIiAgICAgICA8L2Rpdj5cIiArXG4gICAgXCIgICAgICAgICAgIDxoMz5PUjwvaDM+XCIgK1xuICAgIFwiICAgICAgIDxkaXYgY2xhc3M9XFxcInJhbmRvbVxcXCI+UmFuZG9taXplPC9kaXY+XCIgK1xuICAgIFwiICAgICAgIDxkaXYgY2xhc3M9XFxcInJlc2V0XFxcIj5SZXNldDwvZGl2PlwiICtcbiAgICBcIiAgICAgIDxkaXY+IFwiICtcbiAgICBcIiAgICA8L21haW4+XCIgK1xuICAgIFwiICAgIDxmb290ZXI+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tLzEwMjM0NTY3WlxcXCI+PHN0cm9uZz4mY29weTsgRnVkbzwvc3Ryb25nPjwvYT48L2Zvb3Rlcj5cIiArXG4gICAgXCIgIDwvZGl2PlwiICtcbiAgICBcIlwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VVSSgpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKVxuICAgIGxldCBzdGFydENvb3JkcyA9IFtdXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuaW5uZXJIVE1MID0gc3RhcnRTY3JlZW47XG5cbiAgICAvKiogTWFrZSBHcmlkICovXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGBjZWxsYCwgYGMke2l9JHtqfWApO1xuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkJykuYXBwZW5kKGNlbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZpbGxpbmcgdXAgbW92ZXMgaW5zaWRlIGJsb2NrICovXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgIGxldCBjdXJyZW50U2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zJHtpfWApO1xuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSBpOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBwYXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwLmFwcGVuZChwYXJ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBOYW1lIFZhbGlkYXRpb24gKi9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLmlubmVySFRNTCA9IFwiTm8gZW1wdHkgbmFtZXMgYWxsb3dlZCFcIlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuc3R5bGUuYm94U2hhZG93ID0gXCItMXB4IDFweCAxNXB4IDdweCByZ2JhKDI1NSwwLDAsMC4wOSlcIlxuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInJlZFwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuc3R5bGUuYm94U2hhZG93ID0gXCJub25lXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gXCJibGFja1wiXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLyoqIFJhbmRvbWl6ZSBwbGFjZW1lbnQgKi9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9tJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgUmFuZG9taXplKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLmlubmVySFRNTCA9IFwiTm8gZW1wdHkgbmFtZXMgYWxsb3dlZCFcIlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuc3R5bGUuYm94U2hhZG93ID0gXCItMXB4IDFweCAxNXB4IDdweCByZ2JhKDI1NSwwLDAsMC4wOSlcIlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS5zdHlsZS5ib3JkZXJDb2xvcj0gXCJyZWRcIlxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8qKiBEcmFnIGFuZCBkcm9wIHBsYWNlbWVudCAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwJykuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGUgPT4ge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50U2hpcFwiLCBKU09OLnN0cmluZ2lmeSh7IGNsYXNzOiBzaGlwLmNsYXNzTGlzdFswXSwgc2l6ZTogcGFyc2VJbnQoc2hpcC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcInNcIiwgJycpKSB9KSlcbiAgICAgICAgfSlcbiAgICB9KTtcblxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXJ0Q29vcmRzLmluY2x1ZGVzKGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNTYWZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2l9YCkgIT09IG51bGwgJiYgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7aX1gKSkuY29vcmQgPT0gY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2hpcCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtjdXJyZW50U2hpcH1gKSkudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY3VycmVudFNoaXA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSkpICsgaX0ke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKX1gKSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSkpICsgaX0ke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09IFwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTYWZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FmZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGN1cnJlbnRTaGlwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpfSR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpKSArIGl9YCkgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpfSR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpKSArIGl9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID09PSBcIndoaXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NhZmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTYWZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzU2FmZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGN1cnJlbnRTaGlwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7Y3VycmVudFNoaXB9YCkpLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpfSR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpKSArIGl9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpKSArIGl9JHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSl9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IChjdXJyZW50U2hpcCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2N1cnJlbnRTaGlwfWApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmVydGljYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHNoaXAke2N1cnJlbnRTaGlwfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSl9JHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSkpICsgaX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpKSArIGl9JHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSl9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gKGN1cnJlbnRTaGlwIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7Y3VycmVudFNoaXB9YCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52ZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHNoaXAke2N1cnJlbnRTaGlwfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIEFsbG93IGRyb3BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFNoaXBcIikpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNpemU7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhJbmRleCA9IHBhcnNlSW50KGNlbGxJbmRleCkgKyAoZGF0YS5zaXplIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5zbGljZSgxLCAyKX0ke21heEluZGV4LnRvU3RyaW5nKCl9YCkgIT09IG51bGwgJiYgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgIT09ICdyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyYXknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50U2hpcFwiKSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbEluZGV4ID0gY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heEluZGV4ID0gcGFyc2VJbnQoY2VsbEluZGV4KSArIChkYXRhLnNpemUgLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnNsaWNlKDEsIDIpfSR7bWF4SW5kZXgudG9TdHJpbmcoKX1gKSAhPT0gbnVsbCAmJiBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciAhPT0gJ3JlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50U2hpcFwiKSk7XG4gICAgICAgICAgICBsZXQgaXNEcm9wcGVkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgaXNTYWZlID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSk7XG4gICAgICAgICAgICBjb25zdCBtYXhJbmRleCA9IHBhcnNlSW50KGNlbGxJbmRleCkgKyAoZGF0YS5zaXplIC0gMSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zaXplID09IDEpIHtcbiAgICAgICAgICAgICAgICBpc1NhZmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRhLnNpemU7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpfSR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpKSArIGl9YCkgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgJiYgZGF0YS5zaXplID09IDEgfHwgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMCwgMSl9JHtwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSkpICsgaX1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPT09IFwid2hpdGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNTYWZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICBpc1NhZmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNpemU7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0uc2xpY2UoMSwgMil9JHttYXhJbmRleC50b1N0cmluZygpfWApICE9PSBudWxsICYmIGlzU2FmZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3Jkcy5wdXNoKGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBzaGlwJHtkYXRhLnNpemV9YCwgSlNPTi5zdHJpbmdpZnkoeyBjb29yZDogc3RhcnRDb29yZHNbc3RhcnRDb29yZHMubGVuZ3RoIC0gMV0sIHZlcnRpY2FsOiBmYWxzZSB9KSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q2VsbEluZGV4ID0gcGFyc2VJbnQoY2VsbEluZGV4KSArIGk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxUb0ZpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0uc2xpY2UoMSwgMil9JHtuZXh0Q2VsbEluZGV4LnRvU3RyaW5nKCl9YClcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRvRmlsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgaXNEcm9wcGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0Ryb3BwZWQpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucyR7ZGF0YS5zaXplfWApLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAnKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlcycpLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb25maXJtXFxcIj5Db25maXJtPC9kaXY+XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUudHJpbSgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGh1bWFuID0gbmV3IFBsYXllcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hpcFJPV0NPT1JEID0gcGFyc2VJbnQoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7aX1gKSkuY29vcmQuc2xpY2UoMCwgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaGlwQ09MQ09PUkQgPSBwYXJzZUludChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtpfWApKS5jb29yZC5zbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzVmVydGljYWwgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtpfWApKS52ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRTaGlwID0gbmV3IFNoaXAoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHVtYW4uYm9hcmRTaGlwKHNoaXBST1dDT09SRCwgc2hpcENPTENPT1JELCBzZWxlY3RlZFNoaXAsIGlzVmVydGljYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdDb21wdXRlcicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXIuYWlCb2FyZFNoaXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZVN0YXJ0KGh1bWFuICwgY29tcHV0ZXIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLmlubmVySFRNTCA9IFwiTm8gZW1wdHkgbmFtZXMgYWxsb3dlZCFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuc3R5bGUuYm94U2hhZG93ID0gXCItMXB4IDFweCAxNXB4IDdweCByZ2JhKDI1NSwwLDAsMC4wOSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS5zdHlsZS5ib3JkZXJDb2xvciA9IFwicmVkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpXG4gICAgICAgIG1ha2VVSSgpO1xuICAgIH0pXG59XG5tYWtlVUkoKSIsImltcG9ydCBtYWtlVUkgZnJvbSBcIi4vZ2FtZVN0YXJ0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVCb2FyZCgpIHtcbiAgICBsZXQgYm9hcmQgPSBuZXcgQXJyYXkoMTApLmZpbGwoMCkubWFwKCgpID0+IG5ldyBBcnJheSgxMCkuZmlsbCgwKSk7XG5cbiAgICAvKiogcHVibGljIGZ1bmN0aW9uIHRvIHJldHVybiBib2FyZCAqL1xuICAgIGxldCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gICAgbGV0IHNoaXBzQm9hcmRlZCA9IFtdO1xuXG4gICAgLyoqIFBsYWNlIHNoaXAgdmVydGljYWxseSBvbiBib2FyZCAsIGFuZCBjYWxsIGJhY2t0cmFja2luZyBpZiBzaGlwIGFscmVhZHkgZXhpc3RzIG9uIHRoZSBwYXRoICovXG4gICAgbGV0IHZlcnRpY2FsUGxhY2UgPSAoc2hpcExlbmd0aCwgcm93LCBjb2wsIHNoaXApID0+IHtcbiAgICAgICAgbGV0IHRlbXBCYWNrVHJhY2s7XG4gICAgICAgIGxldCBlbmRpbmcgPSAwO1xuICAgICAgICBsZXQgY29vcmRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmRbcm93ICsgaV1bY29sXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJvYXJkW3JvdyArIGldW2NvbF0gPSAxO1xuICAgICAgICAgICAgICAgIGVuZGluZysrXG4gICAgICAgICAgICAgICAgY29vcmRzLnB1c2goW3JvdyArIGksIGNvbF0pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXBCYWNrVHJhY2sgPSBpIC0gMTtcbiAgICAgICAgICAgICAgICBiYWNrVHJhY2tWZXJ0aWNhbCh0ZW1wQmFja1RyYWNrLCByb3csIGNvbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZGluZyA9PT0gc2hpcExlbmd0aCAmJiBjb29yZHMubGVuZ3RoID09PSBzaGlwTGVuZ3RoKSB7XG4gICAgICAgICAgICBzaGlwc0JvYXJkZWQucHVzaCh7IHNoaXA6IHNoaXAuc2hpcHMsIGNvb3JkaW5hdGVzOiBjb29yZHMgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQbGFjZSBzaGlwIGhvcml6b250YWxseSBvbiBib2FyZCAsIGFuZCBjYWxsIGJhY2t0cmFja2luZyBpZiBzaGlwIGFscmVhZHkgZXhpc3RzIG9uIHRoZSBwYXRoICovXG4gICAgbGV0IGhvcml6b250YWxQbGFjZSA9IChzaGlwTGVuZ3RoLCByb3csIGNvbCwgc2hpcCkgPT4ge1xuICAgICAgICBsZXQgdGVtcEJhY2tUcmFjaztcbiAgICAgICAgbGV0IGVuZGluZyA9IDA7XG4gICAgICAgIGxldCBjb29yZHMgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sICsgaV0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBib2FyZFtyb3ddW2NvbCArIGldID0gMTtcbiAgICAgICAgICAgICAgICBlbmRpbmcrK1xuICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKFtyb3csIGNvbCArIGldKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcEJhY2tUcmFjayA9IGkgLSAxO1xuICAgICAgICAgICAgICAgIGJhY2tUcmFja0hvcml6b250YWwodGVtcEJhY2tUcmFjaywgcm93LCBjb2wpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbmRpbmcgPT09IHNoaXBMZW5ndGggJiYgY29vcmRzLmxlbmd0aCA9PT0gc2hpcExlbmd0aCkge1xuICAgICAgICAgICAgc2hpcHNCb2FyZGVkLnB1c2goeyBzaGlwOiBzaGlwLnNoaXBzLCBjb29yZGluYXRlczogY29vcmRzIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2hlY2tzIGlmIHRoZSBwb3NpdGlvbiBpcyB2YWxpZCBvciBub3QgYW5kIHRoZW4gYmFzZWQgb24gdmVydGljYWwgcGFyYW1ldGVyIHZhbHVlICwgY2FsbCB0aGUgc3VpdGFibGUgZnVuY3Rpb24gdG8gcGxhY2UgaXQgKi9cbiAgICBsZXQgUGxhY2VTaGlwID0gKHJvdywgY29sLCBzaGlwLCB2ZXJ0aWNhbCA9IHRydWUpID0+IHtcbiAgICAgICAgaWYgKGJvYXJkW3Jvd10gIT09IHVuZGVmaW5lZCAmJiBib2FyZFtyb3ddW2NvbF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHZlcnRpY2FsICYmIGJvYXJkW3JvdyArIHNoaXAuc2hpcHMubGVuZ3RoXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljYWxQbGFjZShzaGlwLnNoaXBzLmxlbmd0aCwgcm93LCBjb2wsIHNoaXApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmVydGljYWwgJiYgYm9hcmRbcm93XVtjb2wgKyBzaGlwLnNoaXBzLmxlbmd0aF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGhvcml6b250YWxQbGFjZShzaGlwLnNoaXBzLmxlbmd0aCwgcm93LCBjb2wsIHNoaXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBib3RoIG9mIHRoZSBiYWNrVHJhY2sgZG93biBoZXJlICwgdGFrZXMgdGhlIGluZGV4IHZhbHVlIGZyb20gd2hlcmUgYWZ0ZXJ3YXJkIGFub3RoZXIgc2hpcCB3YXMgdGhlcmUgdGhlbiBzdGFydCBiYWNrdHJhY2tpbmdcbiAgICAgKiB1bnRpbCBpbmRleCBpcyAwIGFuZCBib2FyZCBpcyByZXNldCB0byB3aGF0IGl0cyBwcmV2aW91cyBzdGF0ZSB3YXNcbiAgICAgKi9cbiAgICBsZXQgYmFja1RyYWNrVmVydGljYWwgPSAoaW5kZXgsIHJvdywgY29sKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGJvYXJkW3JvdyArIGldW2NvbF0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGJhY2tUcmFja0hvcml6b250YWwgPSAoaW5kZXgsIHJvdywgY29sKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBsZXQgcmVjaWV2ZUF0dGFjayA9IChyb3csIGNvbCAsIGVuZW15Qm9hcmQpID0+IHtcblxuICAgICAgICAvKiogQ2hlY2sgaWYgaXRzIGEgdmFsaWQgY29vcmRpbmF0ZSB0byBoaXQgYW5kIG5vdCBiZWluZyBoaXQgYmVmb3JlICovXG4gICAgICAgIGlmIChib2FyZFtyb3ddICE9PSB1bmRlZmluZWQgJiYgYm9hcmRbcm93XVtjb2xdICE9PSB1bmRlZmluZWQgJiYgYm9hcmRbcm93XVtjb2xdICE9PSAnaGl0Jykge1xuICAgICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGJvYXJkW3Jvd11bY29sXSA9ICdoaXQnO1xuICAgICAgICAgICAgICAgIGxldCBoaXRTaGlwID0gc2hpcHNCb2FyZGVkLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5jb29yZGluYXRlcy5zb21lKGNvb3JkID0+IGNvb3JkWzBdID09PSByb3cgJiYgY29vcmRbMV0gPT09IGNvbCkpO1xuICAgICAgICAgICAgICAgIGhpdFNoaXBbMF0uc2hpcC5oaXQoKTtcbiAgICAgICAgICAgICAgICBoaXRTaGlwWzBdLnNoaXAuaXNTdW5rKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlR2FtZShoaXRTaGlwWzBdLnNoaXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYm9hcmRbcm93XVtjb2xdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbcm93XVtjb2xdID0gJ21pc3MnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVuZEdhbWUoZW5lbXlCb2FyZClcbiAgICB9XG5cbiAgICAvKiogVXBkYXRlIHRoZSBib2FyZGVkIHNoaXBzICovXG4gICAgbGV0IHVwZGF0ZUdhbWUgPSAoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoc2hpcC5zdW5rKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBzaGlwc0JvYXJkZWQuZmluZEluZGV4KChzKSA9PiBzaGlwID09PSBzLnNoaXApXG4gICAgICAgICAgICBzaGlwc0JvYXJkZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBFbmQgZ2FtZSBpZiBnYW1lYm9hcmQncyBhbGwgYm9hcmRlZCBzaGlwcyBhcmUgZG93biAqL1xuICAgIGxldCBlbmRHYW1lID0gKGVuZW15Qm9hcmQpID0+IHtcbiAgICAgICAgaWYgKHNoaXBzQm9hcmRlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gXCJZb3VcIlxuICAgICAgICAgICAgaWYoZW5lbXlCb2FyZC5uYW1lICE9PSBcIkNvbXB1dGVyXCIpe1xuICAgICAgICAgICAgICAgIG5hbWUgPSBcIkNvbXB1dGVyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8aDEgY2xhc3M9XFxcImFubm91bmNlbWVudFxcXCI+JHtuYW1lfSB3b24gYWdhaW5zdCAke2VuZW15Qm9hcmQubmFtZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGxheUFnYWluXFxcIj5QbGF5IEFnYWluPC9kaXY+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXlBZ2FpbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyAsICgpID0+IHtcbiAgICAgICAgICAgICAgICBtYWtlVUkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gXCJTdGlsbCBvbmdvaW5nXCJcbiAgICB9XG4gICAgcmV0dXJuIHsgUGxhY2VTaGlwLCBnZXRCb2FyZCwgcmVjaWV2ZUF0dGFjaywgc2hpcHNCb2FyZGVkIH1cbn0iLCJpbXBvcnQgYXR0YWNrT3RoZXIgZnJvbSBcIi4vYXR0YWNrXCI7XG5cbnZhciBzdGFydFNjcmVlbiA9IFwiXCIgK1xuICAgIFwiICA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiPlwiICtcbiAgICBcIiAgICA8aGVhZGVyIGNsYXNzPVxcXCJmaXhlZEhlYWRcXFwiPlwiICtcbiAgICBcIiAgICAgIDxoMT5CYXR0bGUgU2hpcDwvaDE+XCIgK1xuICAgIFwiICAgICAgPHA+V2hlcmUgdGhlIHJlYWwgb25lIGZpZ2h0czwvcD5cIiArXG4gICAgXCIgICAgPC9oZWFkZXI+XCIgK1xuICAgIFwiICAgICAgPHA+WW91PC9wPlwiICtcbiAgICBcIiAgICAgIDxkaXYgY2xhc3M9XFxcImh1bWFuQiBib2FyZFxcXCI+PC9kaXY+XCIgK1xuICAgIFwiICAgICAgPHA+T3Bwb25lbnQ8L3A+XCIgK1xuICAgIFwiICAgICAgPGRpdiBjbGFzcz1cXFwiQUlCIGJvYXJkXFxcIj48L2Rpdj5cIiArXG4gICAgXCIgICAgPGZvb3Rlcj48YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vMTAyMzQ1NjdaXFxcIj48c3Ryb25nPiZjb3B5OyBGdWRvPC9zdHJvbmc+PC9hPjwvZm9vdGVyPlwiICtcbiAgICBcIiAgPC9kaXY+XCIgK1xuICAgIFwiXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVTdGFydChodW1hbiwgY29tcHV0ZXIpIHtcbiAgICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5pbm5lckhUTUwgPSBzdGFydFNjcmVlbjtcblxuICAgIC8qKiBNYWtlIEdyaWQgKi9cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQnKS5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGBjZWxsYCwgYGNlbGwke2l9JHtqfWApO1xuICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcIilcbiAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmQoY2VsbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGVtcENvb3JkcyA9IGh1bWFuLmdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLm1hcCgoc2hpcCkgPT4gc2hpcC5jb29yZGluYXRlcyk7XG4gICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gaTsgaisrKSB7XG4gICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2godGVtcENvb3Jkc1tpXVtqXSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgaHVtYW5CID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1hbkJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIGh1bWFuQi5xdWVyeVNlbGVjdG9yKGAuY2VsbCR7c2hpcENvb3Jkc1tpXVswXX0ke3NoaXBDb29yZHNbaV1bMV19YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLkFJQlwiKS5jaGlsZE5vZGVzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycgLCBlID0+IHtcbiAgICAgICAgICAgIGF0dGFja090aGVyKGh1bWFuICwgY29tcHV0ZXIgLCBjZWxsKTtcbiAgICAgICAgfSlcbiAgICB9KVxufSIsImltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcbmltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXllcihwbGF5ZXJOYW1lLCBpc0FJID0gdHJ1ZSkge1xuICAgIGxldCBuYW1lID0gcGxheWVyTmFtZTtcbiAgICBsZXQgZ2FtZUJvYXJkRmFjdCA9IG5ldyBHYW1lQm9hcmQoKTtcbiAgICBsZXQgYm9hcmQgPSBnYW1lQm9hcmRGYWN0LmdldEJvYXJkKCk7XG5cbiAgICBsZXQgYm9hcmRTaGlwID0gKHJvdywgY29sLCBzaGlwLCB2ZXJ0aWNhbCA9IHRydWUpID0+IHtcbiAgICAgICAgaWYgKGdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCAhPT0gNSkge1xuICAgICAgICAgICAgZ2FtZUJvYXJkRmFjdC5QbGFjZVNoaXAocm93LCBjb2wsIHNoaXAsIHZlcnRpY2FsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBhaUJvYXJkU2hpcCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzQUkpIHtcbiAgICAgICAgICAgIHdoaWxlIChnYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcChnYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICBsZXQgdmVydGljYWwgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xuICAgICAgICAgICAgICAgIGxldCBpc1ZhbGlkU3BvdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKCFpc1ZhbGlkU3BvdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lQm9hcmRGYWN0LlBsYWNlU2hpcChyb3csIGNvbCwgc2hpcCwgdmVydGljYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFNwb3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFpQXR0YWNrID0gKGVuZW15Qm9hcmQpID0+IHtcbiAgICAgICAgaWYgKGlzQUkpIHtcbiAgICAgICAgICAgIGlmIChlbmVteUJvYXJkLmdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCA8PSA1ICYmIGVuZW15Qm9hcmQuZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBsZXQgZUJvYXJkID0gZW5lbXlCb2FyZC5nYW1lQm9hcmRGYWN0LmdldEJvYXJkKCk7XG4gICAgICAgICAgICAgICAgbGV0IGlzVmFsaWRTcG90ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoIWlzVmFsaWRTcG90KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICAgICAgICAgICAgICAgICAgICBpZiAoZUJvYXJkW3Jvd11bY29sXSA9PSAwIHx8IGVCb2FyZFtyb3ddW2NvbF0gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFNwb3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlCb2FyZC5nYW1lQm9hcmRGYWN0LnJlY2lldmVBdHRhY2socm93LCBjb2wgLCBlbmVteUJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCByYW5kb20gPSAoKSA9PiB7XG4gICAgICAgIHdoaWxlIChnYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKGdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgbGV0IHZlcnRpY2FsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcbiAgICAgICAgICAgIGxldCBpc1ZhbGlkU3BvdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB3aGlsZSAoIWlzVmFsaWRTcG90KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZUJvYXJkRmFjdC5QbGFjZVNoaXAocm93LCBjb2wsIHNoaXAsIHZlcnRpY2FsKTtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFNwb3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBhdHRhY2sgPSAocm93LCBjb2wsIGVuZW15Qm9hcmQpID0+IHtcbiAgICAgICAgaWYgKGVuZW15Qm9hcmQuZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoIDw9IDUgJiYgZW5lbXlCb2FyZC5nYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgZW5lbXlCb2FyZC5nYW1lQm9hcmRGYWN0LnJlY2lldmVBdHRhY2socm93LCBjb2wgLCBlbmVteUJvYXJkKTtcbiAgICAgICAgICAgIHJldHVybiBcIkFsbCBnb29kIG9uIHdlc3Rlcm4gZnJvbnRcIlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiUGxhY2UgYWxsIHRoZSBzaGlwcyBvbiB5b3VyIGJvYXJkIGJlZm9yZSBzdGFydGluZyB0aGUgYXR0YWNrXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBib2FyZFNoaXAsIGFpQm9hcmRTaGlwLCBhdHRhY2ssIGFpQXR0YWNrLHJhbmRvbSwgbmFtZSwgYm9hcmQsIGdhbWVCb2FyZEZhY3QgfVxufSAiLCJpbXBvcnQgZ2FtZVN0YXJ0IGZyb20gXCIuL21haW5HYW1lXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSYW5kb21pemUobmFtZSl7XG4gICAgbGV0IGh1bWFuID0gbmV3IFBsYXllcihuYW1lICwgZmFsc2UpO1xuICAgIGh1bWFuLnJhbmRvbSgpO1xuXG4gICAgbGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcignQ29tcHV0ZXInICwgdHJ1ZSk7XG4gICAgY29tcHV0ZXIuYWlCb2FyZFNoaXAoKTtcbiAgICBnYW1lU3RhcnQoaHVtYW4gLCBjb21wdXRlcilcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1cGRhdGVTY3JlZW4oaHVtYW5CICwgYWlCKXtcbiAgICBsZXQgaFVJID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWFuQicpO1xuICAgIGxldCBhVUkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQUlCJylcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDEwOyBpKyspe1xuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgMTA7IGorKyl7XG4gICAgICAgICAgICBpZihodW1hbkJbaV1bal0gPT0gXCJoaXRcIil7XG4gICAgICAgICAgICAgICAgaFVJLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsJHtpfSR7an1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Y29yYWxcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihodW1hbkJbaV1bal0gPT0gMSl7XG4gICAgICAgICAgICAgICAgaFVJLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsJHtpfSR7an1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGh1bWFuQltpXVtqXSA9PSBcIm1pc3NcIil7XG4gICAgICAgICAgICAgICAgaFVJLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsJHtpfSR7an1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFpQltpXVtqXSA9PSBcImhpdFwiKXtcbiAgICAgICAgICAgICAgICBhVUkucXVlcnlTZWxlY3RvcihgLmNlbGwke2l9JHtqfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRjb3JhbFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFpQltpXVtqXSA9PSBcIm1pc3NcIil7XG4gICAgICAgICAgICAgICAgYVVJLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsJHtpfSR7an1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9Db250ZW50L2hlYWRlckYudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9Db250ZW50L1BsYXlwZW5TYW5zLUV4dHJhTGlnaHQudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQHRhaWx3aW5kIGJhc2U7XG5AdGFpbHdpbmQgY29tcG9uZW50cztcbkB0YWlsd2luZCB1dGlsaXRpZXM7XG5cblxuQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiaGVhZGVyRlwiO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTogXCJub3JtYWxGXCI7XG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG59XG5cbkBrZXlmcmFtZXMgaGVhZGVyIHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjkwcHgpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgIH1cblxuICAgIDI1JSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjE3LjVweCk7XG4gICAgICAgIG9wYWNpdHk6IDAuMjU7XG4gICAgfVxuXG4gICAgNTAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNDVweCk7XG4gICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICB9XG5cbiAgICA3NSUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwcHgpO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxufVxuXG5cbkBrZXlmcmFtZXMgZ3JpZCB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwcHgpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgIH1cblxuICAgIDEwMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIG1haW4ge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MHB4KTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbn1cblxuKiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBmb250LWZhbWlseTogXCJub3JtYWxGXCI7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY29udGFpbmVyIHtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBmaXQtY29udGVudCgxNSUpIGZpdC1jb250ZW50KDUwJSkgZml0LWNvbnRlbnQoMjAlKSBhdXRvO1xuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDIwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMjUsIDQzLCAxMzcsIDAuMjEpO1xufVxuXG5oMSB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICAgIGFuaW1hdGlvbjogaGVhZGVyIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XG59XG5cbmgxPnAge1xuICAgIGFuaW1hdGlvbjogaGVhZGVyIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XG59XG5cbmhlYWRlciB7XG4gICAgYW5pbWF0aW9uOiBoZWFkZXIgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYm9yZGVyOiAxcHggcmlkZ2UgYmxhY2s7XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgZm9udC1mYW1pbHk6IFwibm9ybWFsRlwiO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoOTIsIDU5LCAxOTcsIDAuMjIpO1xuICAgIG1heC1oZWlnaHQ6IDI5MHB4O1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG5tYWluIHtcbiAgICBhbmltYXRpb246IG1haW4gODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcbiAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uY29udHJvbHtcbiAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYm9hcmQge1xuICAgIHdpZHRoOiAyOTBweDtcbiAgICBoZWlnaHQ6IDI5MHB4O1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI5cHgpO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAyOXB4KTtcbiAgICBhbmltYXRpb246IGdyaWQgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcbn1cblxuLmNlbGwge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcbiAgICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5tb3ZlcyB7XG4gICAgbWFyZ2luOiAwO1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZmlsbCwgZml0LWNvbnRlbnQoNzVweCkpO1xuICAgIGdhcDogNXB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICBib3JkZXItdG9wOiAxcHggcmlkZ2UgYmxhY2s7XG4gICAgcGFkZGluZzogNXB4O1xufVxuXG4ubW92ZXM+ZGl2Om5vdCguY29uZmlybSkge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIDI5cHgpO1xuICAgIGdhcDogMDtcbiAgICB6LWluZGV4OiAyO1xuICAgIGN1cnNvcjogbW92ZTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC40cyBsaW5lYXI7XG4gICAgLXdlYmtpdC11c2VyLWRyYWc6IGVsZW1lbnQ7XG4gICAgaGVpZ2h0OiAyOXB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnM1IHtcbiAgICB3aWR0aDogMTQ1cHg7XG59XG5cbi5zNCB7XG4gICAgd2lkdGg6IDExNnB4O1xufVxuXG4uczMge1xuICAgIHdpZHRoOiA4N3B4O1xufVxuXG4uczIge1xuICAgIHdpZHRoOiA1OHB4O1xufVxuXG4uczEge1xuICAgIHdpZHRoOiAyOXB4O1xufVxuXG5cbi5tb3Zlcz5kaXY+ZGl2IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gICAgb3V0bGluZTogMXB4IHJpZGdlIGJsYWNrO1xufVxuXG5cbmZvb3RlciB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGFuaW1hdGlvbjogbWFpbiA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xufVxuXG4ucmFuZG9tLFxuLnJlc2V0IHtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICAgIHBhZGRpbmc6IDZweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XG59XG5cbi5yYW5kb20ge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5yYW5kb206aG92ZXIsXG4ucmVzZXQ6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICM1RDVENUQ7XG59XG5cbi5yYW5kb206YWN0aXZlLFxuLnJlc2V0OmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogIzM3MzczNztcbn1cblxuaW5wdXQge1xuICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gICAgd2lkdGg6IDI5MHB4O1xufVxuXG4uaW5wdXRIZWFkIHtcbiAgICBtYXJnaW46IDEwcHg7XG59XG5cbi5lcnJvciB7XG4gICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgY29sb3I6IHJlZDtcbiAgICBwYWRkaW5nOiAzcHg7XG59XG5cbi5odW1hbkIge1xuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbi5BSUI+ZGl2IHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4xNXMgbGluZWFyO1xufVxuXG4uQUlCPmRpdjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpXG59XG5cbi5wbGF5QWdhaW4sXG4uY29uZmlybSB7XG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcbiAgICBmb250LXNpemU6IDIzcHg7XG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XG4gICAgcGFkZGluZzogMTVweDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtdmFyaWFudDogbm9ybWFsO1xuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiKDE2NCwgMTYsIDE2KSAwJSwgcmdiKDIwMywgMCwgMCkgNTAlLCByZ2IoMTE3LCAwLCAwKSAxMDAlKTtcbiAgICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTkpIDVweCA1cHggMTVweCA1cHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiKDI4LCAxMTAsIDE2NCk7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnBsYXlBZ2Fpbjpob3Zlcixcbi5jb25maXJtOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjQTQxMDEwO1xufVxuXG4ucGxheUFnYWluOmFjdGl2ZSxcbi5jb25maXJtOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogIzc1MDAwMDtcbn1cblxuLmNvbmZpcm0ge1xuICAgIGhlaWdodDogNTBweDtcbiAgICBhbmltYXRpb246IGdyaWQgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcblxufVxuXG5hIHtcbiAgICBjb2xvcjogcmVkO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbmhlYWRlcitwLFxuLmh1bWFuQitwIHtcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xufVxuXG4uYW5ub3VuY2VtZW50IHtcbiAgICBncmlkLWFyZWE6IDIvMS8zLzM7XG59XG5cbi5wbGF5QWdhaW4ge1xuICAgIG1heC13aWR0aDogMjAwcHg7XG4gICAgZ3JpZC1hcmVhOiAzLzEvNC8zO1xuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6OTM2cHgpIHtcbiAgICAuY29udGFpbmVyIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1MCUgNTAlO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGZpdC1jb250ZW50KDI5MHB4KSBhdXRvO1xuICAgICAgICBwbGFjZS1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIGhlYWRlciB7XG4gICAgICAgIGdyaWQtYXJlYTogMS8xLzIvMztcbiAgICB9XG5cbiAgICAuaHVtYW5CIHtcbiAgICAgICAgZ3JpZC1hcmVhOiAyLzEvMy8yO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgLkFJQiB7XG4gICAgICAgIGdyaWQtYXJlYTogMi8yLzMvMztcbiAgICB9XG5cbiAgICBoZWFkZXIrcCxcbiAgICAuaHVtYW5CK3Age1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XG4gICAgICAgIGFsaWduLXNlbGY6IHN0YXJ0O1xuICAgICAgICBwYWRkaW5nOiA2cHg7XG4gICAgfVxuXG4gICAgLmh1bWFuQiB7XG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1lbmQ7XG4gICAgfVxuXG4gICAgLkFJQiB7XG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcbiAgICB9XG5cbiAgICAuaHVtYW5CK3Age1xuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiA0NXB4O1xuICAgIH1cblxuICAgIGhlYWRlcitwIHtcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LWVuZDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA0NXB4O1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTMwcHgpIHtcbiAgICAuYW5ub3VuY2VtZW50IHtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGNBQWM7QUFDZCxvQkFBb0I7QUFDcEIsbUJBQW1COzs7QUFHbkI7SUFDSSxzQkFB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d0I7SUFDNUI7O0lBRUE7UUFDSSx3QkFBd0I7UUFDeEIsaUJBQWlCO0lBQ3JCOztJQUVBO1FBQ0ksc0JBQXNCO1FBQ3RCLGtCQUFrQjtJQUN0QjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxlQUFlO0lBQ25CO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQHRhaWx3aW5kIGJhc2U7XFxuQHRhaWx3aW5kIGNvbXBvbmVudHM7XFxuQHRhaWx3aW5kIHV0aWxpdGllcztcXG5cXG5cXG5AZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJoZWFkZXJGXFxcIjtcXG4gICAgc3JjOiB1cmwoLi9Db250ZW50L2hlYWRlckYudHRmKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwibm9ybWFsRlxcXCI7XFxuICAgIHNyYzogdXJsKC4vQ29udGVudC9QbGF5cGVuU2Fucy1FeHRyYUxpZ2h0LnR0Zik7XFxufVxcblxcbkBrZXlmcmFtZXMgaGVhZGVyIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yOTBweCk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxuXFxuICAgIDI1JSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIxNy41cHgpO1xcbiAgICAgICAgb3BhY2l0eTogMC4yNTtcXG4gICAgfVxcblxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNDVweCk7XFxuICAgICAgICBvcGFjaXR5OiAwLjU7XFxuICAgIH1cXG5cXG4gICAgNzUlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzBweCk7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxufVxcblxcblxcbkBrZXlmcmFtZXMgZ3JpZCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTBweCk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIG1haW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwcHgpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG59XFxuXFxuKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwibm9ybWFsRlxcXCI7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICAgIG92ZXJmbG93OiBzY3JvbGw7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBmaXQtY29udGVudCgxNSUpIGZpdC1jb250ZW50KDUwJSkgZml0LWNvbnRlbnQoMjAlKSBhdXRvO1xcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIyNSwgNDMsIDEzNywgMC4yMSk7XFxufVxcblxcbmgxIHtcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcbiAgICBhbmltYXRpb246IGhlYWRlciA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xcbn1cXG5cXG5oMT5wIHtcXG4gICAgYW5pbWF0aW9uOiBoZWFkZXIgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgYW5pbWF0aW9uOiBoZWFkZXIgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggcmlkZ2UgYmxhY2s7XFxuICAgIGJvcmRlci10b3A6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJub3JtYWxGXFxcIjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg5MiwgNTksIDE5NywgMC4yMik7XFxuICAgIG1heC1oZWlnaHQ6IDI5MHB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxubWFpbiB7XFxuICAgIGFuaW1hdGlvbjogbWFpbiA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xcbiAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5jb250cm9se1xcbiAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIHdpZHRoOiAyOTBweDtcXG4gICAgaGVpZ2h0OiAyOTBweDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI5cHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjlweCk7XFxuICAgIGFuaW1hdGlvbjogZ3JpZCA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4ubW92ZXMge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZmlsbCwgZml0LWNvbnRlbnQoNzVweCkpO1xcbiAgICBnYXA6IDVweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHJpZGdlIGJsYWNrO1xcbiAgICBwYWRkaW5nOiA1cHg7XFxufVxcblxcbi5tb3Zlcz5kaXY6bm90KC5jb25maXJtKSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCAyOXB4KTtcXG4gICAgZ2FwOiAwO1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICBjdXJzb3I6IG1vdmU7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjRzIGxpbmVhcjtcXG4gICAgLXdlYmtpdC11c2VyLWRyYWc6IGVsZW1lbnQ7XFxuICAgIGhlaWdodDogMjlweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uczUge1xcbiAgICB3aWR0aDogMTQ1cHg7XFxufVxcblxcbi5zNCB7XFxuICAgIHdpZHRoOiAxMTZweDtcXG59XFxuXFxuLnMzIHtcXG4gICAgd2lkdGg6IDg3cHg7XFxufVxcblxcbi5zMiB7XFxuICAgIHdpZHRoOiA1OHB4O1xcbn1cXG5cXG4uczEge1xcbiAgICB3aWR0aDogMjlweDtcXG59XFxuXFxuXFxuLm1vdmVzPmRpdj5kaXYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICAgIG91dGxpbmU6IDFweCByaWRnZSBibGFjaztcXG59XFxuXFxuXFxuZm9vdGVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBhbmltYXRpb246IG1haW4gODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcXG59XFxuXFxuLnJhbmRvbSxcXG4ucmVzZXQge1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBsaW5lLWhlaWdodDogMTZweDtcXG4gICAgcGFkZGluZzogNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC12YXJpYW50OiBub3JtYWw7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcXG59XFxuXFxuLnJhbmRvbSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbi5yYW5kb206aG92ZXIsXFxuLnJlc2V0OmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogIzVENUQ1RDtcXG59XFxuXFxuLnJhbmRvbTphY3RpdmUsXFxuLnJlc2V0OmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQ6ICMzNzM3Mzc7XFxufVxcblxcbmlucHV0IHtcXG4gICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIHBhZGRpbmc6IDVweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBmb250LXNpemU6IDI1cHg7XFxuICAgIHdpZHRoOiAyOTBweDtcXG59XFxuXFxuLmlucHV0SGVhZCB7XFxuICAgIG1hcmdpbjogMTBweDtcXG59XFxuXFxuLmVycm9yIHtcXG4gICAgbWFyZ2luLXRvcDogMTVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICBjb2xvcjogcmVkO1xcbiAgICBwYWRkaW5nOiAzcHg7XFxufVxcblxcbi5odW1hbkIge1xcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbn1cXG5cXG4uQUlCPmRpdiB7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cyBsaW5lYXI7XFxufVxcblxcbi5BSUI+ZGl2OmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpXFxufVxcblxcbi5wbGF5QWdhaW4sXFxuLmNvbmZpcm0ge1xcbiAgICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcbiAgICBmb250LXNpemU6IDIzcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xcbiAgICBwYWRkaW5nOiAxNXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiKDE2NCwgMTYsIDE2KSAwJSwgcmdiKDIwMywgMCwgMCkgNTAlLCByZ2IoMTE3LCAwLCAwKSAxMDAlKTtcXG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjE5KSA1cHggNXB4IDE1cHggNXB4O1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMjgsIDExMCwgMTY0KTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5wbGF5QWdhaW46aG92ZXIsXFxuLmNvbmZpcm06aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAjQTQxMDEwO1xcbn1cXG5cXG4ucGxheUFnYWluOmFjdGl2ZSxcXG4uY29uZmlybTphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kOiAjNzUwMDAwO1xcbn1cXG5cXG4uY29uZmlybSB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYW5pbWF0aW9uOiBncmlkIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XFxuXFxufVxcblxcbmEge1xcbiAgICBjb2xvcjogcmVkO1xcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG5oZWFkZXIrcCxcXG4uaHVtYW5CK3Age1xcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xcbn1cXG5cXG4uYW5ub3VuY2VtZW50IHtcXG4gICAgZ3JpZC1hcmVhOiAyLzEvMy8zO1xcbn1cXG5cXG4ucGxheUFnYWluIHtcXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcXG4gICAgZ3JpZC1hcmVhOiAzLzEvNC8zO1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjkzNnB4KSB7XFxuICAgIC5jb250YWluZXIge1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1MCUgNTAlO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBmaXQtY29udGVudCgyOTBweCkgYXV0bztcXG4gICAgICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIH1cXG5cXG4gICAgaGVhZGVyIHtcXG4gICAgICAgIGdyaWQtYXJlYTogMS8xLzIvMztcXG4gICAgfVxcblxcbiAgICAuaHVtYW5CIHtcXG4gICAgICAgIGdyaWQtYXJlYTogMi8xLzMvMjtcXG4gICAgICAgIG1hcmdpbjogMDtcXG4gICAgfVxcblxcbiAgICAuQUlCIHtcXG4gICAgICAgIGdyaWQtYXJlYTogMi8yLzMvMztcXG4gICAgfVxcblxcbiAgICBoZWFkZXIrcCxcXG4gICAgLmh1bWFuQitwIHtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGZvbnQtc2l6ZTogeHgtbGFyZ2U7XFxuICAgICAgICBhbGlnbi1zZWxmOiBzdGFydDtcXG4gICAgICAgIHBhZGRpbmc6IDZweDtcXG4gICAgfVxcblxcbiAgICAuaHVtYW5CIHtcXG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1lbmQ7XFxuICAgIH1cXG5cXG4gICAgLkFJQiB7XFxuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XFxuICAgIH1cXG5cXG4gICAgLmh1bWFuQitwIHtcXG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1zdGFydDtcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA0NXB4O1xcbiAgICB9XFxuXFxuICAgIGhlYWRlcitwIHtcXG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1lbmQ7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDQ1cHg7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTMwcHgpIHtcXG4gICAgLmFubm91bmNlbWVudCB7XFxuICAgICAgICBmb250LXNpemU6IDIwcHg7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwidmFyIHg9U3RyaW5nO1xudmFyIGNyZWF0ZT1mdW5jdGlvbigpIHtyZXR1cm4ge2lzQ29sb3JTdXBwb3J0ZWQ6ZmFsc2UscmVzZXQ6eCxib2xkOngsZGltOngsaXRhbGljOngsdW5kZXJsaW5lOngsaW52ZXJzZTp4LGhpZGRlbjp4LHN0cmlrZXRocm91Z2g6eCxibGFjazp4LHJlZDp4LGdyZWVuOngseWVsbG93OngsYmx1ZTp4LG1hZ2VudGE6eCxjeWFuOngsd2hpdGU6eCxncmF5OngsYmdCbGFjazp4LGJnUmVkOngsYmdHcmVlbjp4LGJnWWVsbG93OngsYmdCbHVlOngsYmdNYWdlbnRhOngsYmdDeWFuOngsYmdXaGl0ZTp4fX07XG5tb2R1bGUuZXhwb3J0cz1jcmVhdGUoKTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZUNvbG9ycyA9IGNyZWF0ZTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXInKVxuXG5jbGFzcyBBdFJ1bGUgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgIHN1cGVyKGRlZmF1bHRzKVxuICAgIHRoaXMudHlwZSA9ICdhdHJ1bGUnXG4gIH1cblxuICBhcHBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICBpZiAoIXRoaXMucHJveHlPZi5ub2RlcykgdGhpcy5ub2RlcyA9IFtdXG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZCguLi5jaGlsZHJlbilcbiAgfVxuXG4gIHByZXBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICBpZiAoIXRoaXMucHJveHlPZi5ub2RlcykgdGhpcy5ub2RlcyA9IFtdXG4gICAgcmV0dXJuIHN1cGVyLnByZXBlbmQoLi4uY2hpbGRyZW4pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBdFJ1bGVcbkF0UnVsZS5kZWZhdWx0ID0gQXRSdWxlXG5cbkNvbnRhaW5lci5yZWdpc3RlckF0UnVsZShBdFJ1bGUpXG4iLCIndXNlIHN0cmljdCdcblxubGV0IE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKVxuXG5jbGFzcyBDb21tZW50IGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ2NvbW1lbnQnXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21tZW50XG5Db21tZW50LmRlZmF1bHQgPSBDb21tZW50XG4iLCIndXNlIHN0cmljdCdcblxubGV0IHsgaXNDbGVhbiwgbXkgfSA9IHJlcXVpcmUoJy4vc3ltYm9scycpXG5sZXQgRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuL2RlY2xhcmF0aW9uJylcbmxldCBDb21tZW50ID0gcmVxdWlyZSgnLi9jb21tZW50JylcbmxldCBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJylcblxubGV0IHBhcnNlLCBSdWxlLCBBdFJ1bGUsIFJvb3RcblxuZnVuY3Rpb24gY2xlYW5Tb3VyY2Uobm9kZXMpIHtcbiAgcmV0dXJuIG5vZGVzLm1hcChpID0+IHtcbiAgICBpZiAoaS5ub2RlcykgaS5ub2RlcyA9IGNsZWFuU291cmNlKGkubm9kZXMpXG4gICAgZGVsZXRlIGkuc291cmNlXG4gICAgcmV0dXJuIGlcbiAgfSlcbn1cblxuZnVuY3Rpb24gbWFya0RpcnR5VXAobm9kZSkge1xuICBub2RlW2lzQ2xlYW5dID0gZmFsc2VcbiAgaWYgKG5vZGUucHJveHlPZi5ub2Rlcykge1xuICAgIGZvciAobGV0IGkgb2Ygbm9kZS5wcm94eU9mLm5vZGVzKSB7XG4gICAgICBtYXJrRGlydHlVcChpKVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBOb2RlIHtcbiAgYXBwZW5kKC4uLmNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIGxldCBub2RlcyA9IHRoaXMubm9ybWFsaXplKGNoaWxkLCB0aGlzLmxhc3QpXG4gICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLnByb3h5T2Yubm9kZXMucHVzaChub2RlKVxuICAgIH1cblxuICAgIHRoaXMubWFya0RpcnR5KClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjbGVhblJhd3Moa2VlcEJldHdlZW4pIHtcbiAgICBzdXBlci5jbGVhblJhd3Moa2VlcEJldHdlZW4pXG4gICAgaWYgKHRoaXMubm9kZXMpIHtcbiAgICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5ub2Rlcykgbm9kZS5jbGVhblJhd3Moa2VlcEJldHdlZW4pXG4gICAgfVxuICB9XG5cbiAgZWFjaChjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5wcm94eU9mLm5vZGVzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5nZXRJdGVyYXRvcigpXG5cbiAgICBsZXQgaW5kZXgsIHJlc3VsdFxuICAgIHdoaWxlICh0aGlzLmluZGV4ZXNbaXRlcmF0b3JdIDwgdGhpcy5wcm94eU9mLm5vZGVzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSB0aGlzLmluZGV4ZXNbaXRlcmF0b3JdXG4gICAgICByZXN1bHQgPSBjYWxsYmFjayh0aGlzLnByb3h5T2Yubm9kZXNbaW5kZXhdLCBpbmRleClcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSBicmVha1xuXG4gICAgICB0aGlzLmluZGV4ZXNbaXRlcmF0b3JdICs9IDFcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5pbmRleGVzW2l0ZXJhdG9yXVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGV2ZXJ5KGNvbmRpdGlvbikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLmV2ZXJ5KGNvbmRpdGlvbilcbiAgfVxuXG4gIGdldEl0ZXJhdG9yKCkge1xuICAgIGlmICghdGhpcy5sYXN0RWFjaCkgdGhpcy5sYXN0RWFjaCA9IDBcbiAgICBpZiAoIXRoaXMuaW5kZXhlcykgdGhpcy5pbmRleGVzID0ge31cblxuICAgIHRoaXMubGFzdEVhY2ggKz0gMVxuICAgIGxldCBpdGVyYXRvciA9IHRoaXMubGFzdEVhY2hcbiAgICB0aGlzLmluZGV4ZXNbaXRlcmF0b3JdID0gMFxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBnZXRQcm94eVByb2Nlc3NvcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KG5vZGUsIHByb3ApIHtcbiAgICAgICAgaWYgKHByb3AgPT09ICdwcm94eU9mJykge1xuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0gZWxzZSBpZiAoIW5vZGVbcHJvcF0pIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVtwcm9wXVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHByb3AgPT09ICdlYWNoJyB8fFxuICAgICAgICAgICh0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycgJiYgcHJvcC5zdGFydHNXaXRoKCd3YWxrJykpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVbcHJvcF0oXG4gICAgICAgICAgICAgIC4uLmFyZ3MubWFwKGkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChjaGlsZCwgaW5kZXgpID0+IGkoY2hpbGQudG9Qcm94eSgpLCBpbmRleClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByb3AgPT09ICdldmVyeScgfHwgcHJvcCA9PT0gJ3NvbWUnKSB7XG4gICAgICAgICAgcmV0dXJuIGNiID0+IHtcbiAgICAgICAgICAgIHJldHVybiBub2RlW3Byb3BdKChjaGlsZCwgLi4ub3RoZXIpID0+XG4gICAgICAgICAgICAgIGNiKGNoaWxkLnRvUHJveHkoKSwgLi4ub3RoZXIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByb3AgPT09ICdyb290Jykge1xuICAgICAgICAgIHJldHVybiAoKSA9PiBub2RlLnJvb3QoKS50b1Byb3h5KClcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSAnbm9kZXMnKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUubm9kZXMubWFwKGkgPT4gaS50b1Byb3h5KCkpXG4gICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gJ2ZpcnN0JyB8fCBwcm9wID09PSAnbGFzdCcpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVtwcm9wXS50b1Byb3h5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVtwcm9wXVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzZXQobm9kZSwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG5vZGVbcHJvcF0gPT09IHZhbHVlKSByZXR1cm4gdHJ1ZVxuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWVcbiAgICAgICAgaWYgKHByb3AgPT09ICduYW1lJyB8fCBwcm9wID09PSAncGFyYW1zJyB8fCBwcm9wID09PSAnc2VsZWN0b3InKSB7XG4gICAgICAgICAgbm9kZS5tYXJrRGlydHkoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5kZXgoY2hpbGQpIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnbnVtYmVyJykgcmV0dXJuIGNoaWxkXG4gICAgaWYgKGNoaWxkLnByb3h5T2YpIGNoaWxkID0gY2hpbGQucHJveHlPZlxuICAgIHJldHVybiB0aGlzLnByb3h5T2Yubm9kZXMuaW5kZXhPZihjaGlsZClcbiAgfVxuXG4gIGluc2VydEFmdGVyKGV4aXN0LCBhZGQpIHtcbiAgICBsZXQgZXhpc3RJbmRleCA9IHRoaXMuaW5kZXgoZXhpc3QpXG4gICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoYWRkLCB0aGlzLnByb3h5T2Yubm9kZXNbZXhpc3RJbmRleF0pLnJldmVyc2UoKVxuICAgIGV4aXN0SW5kZXggPSB0aGlzLmluZGV4KGV4aXN0KVxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHRoaXMucHJveHlPZi5ub2Rlcy5zcGxpY2UoZXhpc3RJbmRleCArIDEsIDAsIG5vZGUpXG5cbiAgICBsZXQgaW5kZXhcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2lkXVxuICAgICAgaWYgKGV4aXN0SW5kZXggPCBpbmRleCkge1xuICAgICAgICB0aGlzLmluZGV4ZXNbaWRdID0gaW5kZXggKyBub2Rlcy5sZW5ndGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1hcmtEaXJ0eSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKGV4aXN0LCBhZGQpIHtcbiAgICBsZXQgZXhpc3RJbmRleCA9IHRoaXMuaW5kZXgoZXhpc3QpXG4gICAgbGV0IHR5cGUgPSBleGlzdEluZGV4ID09PSAwID8gJ3ByZXBlbmQnIDogZmFsc2VcbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShhZGQsIHRoaXMucHJveHlPZi5ub2Rlc1tleGlzdEluZGV4XSwgdHlwZSkucmV2ZXJzZSgpXG4gICAgZXhpc3RJbmRleCA9IHRoaXMuaW5kZXgoZXhpc3QpXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2RlcykgdGhpcy5wcm94eU9mLm5vZGVzLnNwbGljZShleGlzdEluZGV4LCAwLCBub2RlKVxuXG4gICAgbGV0IGluZGV4XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF1cbiAgICAgIGlmIChleGlzdEluZGV4IDw9IGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleCArIG5vZGVzLmxlbmd0aFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFya0RpcnR5KClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBub3JtYWxpemUobm9kZXMsIHNhbXBsZSkge1xuICAgIGlmICh0eXBlb2Ygbm9kZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBub2RlcyA9IGNsZWFuU291cmNlKHBhcnNlKG5vZGVzKS5ub2RlcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobm9kZXMpKSB7XG4gICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApXG4gICAgICBmb3IgKGxldCBpIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSwgJ2lnbm9yZScpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2Rlcy50eXBlID09PSAncm9vdCcgJiYgdGhpcy50eXBlICE9PSAnZG9jdW1lbnQnKSB7XG4gICAgICBub2RlcyA9IG5vZGVzLm5vZGVzLnNsaWNlKDApXG4gICAgICBmb3IgKGxldCBpIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSwgJ2lnbm9yZScpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2Rlcy50eXBlKSB7XG4gICAgICBub2RlcyA9IFtub2Rlc11cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnByb3ApIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9kZXMudmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgZmllbGQgaXMgbWlzc2VkIGluIG5vZGUgY3JlYXRpb24nKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZXMudmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGVzLnZhbHVlID0gU3RyaW5nKG5vZGVzLnZhbHVlKVxuICAgICAgfVxuICAgICAgbm9kZXMgPSBbbmV3IERlY2xhcmF0aW9uKG5vZGVzKV1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnNlbGVjdG9yKSB7XG4gICAgICBub2RlcyA9IFtuZXcgUnVsZShub2RlcyldXG4gICAgfSBlbHNlIGlmIChub2Rlcy5uYW1lKSB7XG4gICAgICBub2RlcyA9IFtuZXcgQXRSdWxlKG5vZGVzKV1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnRleHQpIHtcbiAgICAgIG5vZGVzID0gW25ldyBDb21tZW50KG5vZGVzKV1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG5vZGUgdHlwZSBpbiBub2RlIGNyZWF0aW9uJylcbiAgICB9XG5cbiAgICBsZXQgcHJvY2Vzc2VkID0gbm9kZXMubWFwKGkgPT4ge1xuICAgICAgLyogYzggaWdub3JlIG5leHQgKi9cbiAgICAgIGlmICghaVtteV0pIENvbnRhaW5lci5yZWJ1aWxkKGkpXG4gICAgICBpID0gaS5wcm94eU9mXG4gICAgICBpZiAoaS5wYXJlbnQpIGkucGFyZW50LnJlbW92ZUNoaWxkKGkpXG4gICAgICBpZiAoaVtpc0NsZWFuXSkgbWFya0RpcnR5VXAoaSlcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHNhbXBsZSAmJiB0eXBlb2Ygc2FtcGxlLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGkucmF3cy5iZWZvcmUgPSBzYW1wbGUucmF3cy5iZWZvcmUucmVwbGFjZSgvXFxTL2csICcnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpLnBhcmVudCA9IHRoaXMucHJveHlPZlxuICAgICAgcmV0dXJuIGlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHByb2Nlc3NlZFxuICB9XG5cbiAgcHJlcGVuZCguLi5jaGlsZHJlbikge1xuICAgIGNoaWxkcmVuID0gY2hpbGRyZW4ucmV2ZXJzZSgpXG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIGxldCBub2RlcyA9IHRoaXMubm9ybWFsaXplKGNoaWxkLCB0aGlzLmZpcnN0LCAncHJlcGVuZCcpLnJldmVyc2UoKVxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2RlcykgdGhpcy5wcm94eU9mLm5vZGVzLnVuc2hpZnQobm9kZSlcbiAgICAgIGZvciAobGV0IGlkIGluIHRoaXMuaW5kZXhlcykge1xuICAgICAgICB0aGlzLmluZGV4ZXNbaWRdID0gdGhpcy5pbmRleGVzW2lkXSArIG5vZGVzLmxlbmd0aFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFya0RpcnR5KClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBwdXNoKGNoaWxkKSB7XG4gICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgIHRoaXMucHJveHlPZi5ub2Rlcy5wdXNoKGNoaWxkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVBbGwoKSB7XG4gICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLnByb3h5T2Yubm9kZXMpIG5vZGUucGFyZW50ID0gdW5kZWZpbmVkXG4gICAgdGhpcy5wcm94eU9mLm5vZGVzID0gW11cblxuICAgIHRoaXMubWFya0RpcnR5KClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVDaGlsZChjaGlsZCkge1xuICAgIGNoaWxkID0gdGhpcy5pbmRleChjaGlsZClcbiAgICB0aGlzLnByb3h5T2Yubm9kZXNbY2hpbGRdLnBhcmVudCA9IHVuZGVmaW5lZFxuICAgIHRoaXMucHJveHlPZi5ub2Rlcy5zcGxpY2UoY2hpbGQsIDEpXG5cbiAgICBsZXQgaW5kZXhcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2lkXVxuICAgICAgaWYgKGluZGV4ID49IGNoaWxkKSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleCAtIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1hcmtEaXJ0eSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVwbGFjZVZhbHVlcyhwYXR0ZXJuLCBvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0c1xuICAgICAgb3B0cyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy53YWxrRGVjbHMoZGVjbCA9PiB7XG4gICAgICBpZiAob3B0cy5wcm9wcyAmJiAhb3B0cy5wcm9wcy5pbmNsdWRlcyhkZWNsLnByb3ApKSByZXR1cm5cbiAgICAgIGlmIChvcHRzLmZhc3QgJiYgIWRlY2wudmFsdWUuaW5jbHVkZXMob3B0cy5mYXN0KSkgcmV0dXJuXG5cbiAgICAgIGRlY2wudmFsdWUgPSBkZWNsLnZhbHVlLnJlcGxhY2UocGF0dGVybiwgY2FsbGJhY2spXG4gICAgfSlcblxuICAgIHRoaXMubWFya0RpcnR5KClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzb21lKGNvbmRpdGlvbikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLnNvbWUoY29uZGl0aW9uKVxuICB9XG5cbiAgd2FsayhjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVhY2goKGNoaWxkLCBpKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgY2hpbGQuYWRkVG9FcnJvcihlKVxuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UgJiYgY2hpbGQud2Fsaykge1xuICAgICAgICByZXN1bHQgPSBjaGlsZC53YWxrKGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSlcbiAgfVxuXG4gIHdhbGtBdFJ1bGVzKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBuYW1lXG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2F0cnVsZScpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChuYW1lIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2F0cnVsZScgJiYgbmFtZS50ZXN0KGNoaWxkLm5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdhdHJ1bGUnICYmIGNoaWxkLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB3YWxrQ29tbWVudHMoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHdhbGtEZWNscyhwcm9wLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gcHJvcFxuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdkZWNsJykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHByb3AgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZGVjbCcgJiYgcHJvcC50ZXN0KGNoaWxkLnByb3ApKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdkZWNsJyAmJiBjaGlsZC5wcm9wID09PSBwcm9wKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd2Fsa1J1bGVzKHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gc2VsZWN0b3JcblxuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdydWxlJykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ3J1bGUnICYmIHNlbGVjdG9yLnRlc3QoY2hpbGQuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdydWxlJyAmJiBjaGlsZC5zZWxlY3RvciA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXQgZmlyc3QoKSB7XG4gICAgaWYgKCF0aGlzLnByb3h5T2Yubm9kZXMpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5wcm94eU9mLm5vZGVzWzBdXG4gIH1cblxuICBnZXQgbGFzdCgpIHtcbiAgICBpZiAoIXRoaXMucHJveHlPZi5ub2RlcykgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLnByb3h5T2Yubm9kZXNbdGhpcy5wcm94eU9mLm5vZGVzLmxlbmd0aCAtIDFdXG4gIH1cbn1cblxuQ29udGFpbmVyLnJlZ2lzdGVyUGFyc2UgPSBkZXBlbmRhbnQgPT4ge1xuICBwYXJzZSA9IGRlcGVuZGFudFxufVxuXG5Db250YWluZXIucmVnaXN0ZXJSdWxlID0gZGVwZW5kYW50ID0+IHtcbiAgUnVsZSA9IGRlcGVuZGFudFxufVxuXG5Db250YWluZXIucmVnaXN0ZXJBdFJ1bGUgPSBkZXBlbmRhbnQgPT4ge1xuICBBdFJ1bGUgPSBkZXBlbmRhbnRcbn1cblxuQ29udGFpbmVyLnJlZ2lzdGVyUm9vdCA9IGRlcGVuZGFudCA9PiB7XG4gIFJvb3QgPSBkZXBlbmRhbnRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXJcbkNvbnRhaW5lci5kZWZhdWx0ID0gQ29udGFpbmVyXG5cbi8qIGM4IGlnbm9yZSBzdGFydCAqL1xuQ29udGFpbmVyLnJlYnVpbGQgPSBub2RlID0+IHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ2F0cnVsZScpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgQXRSdWxlLnByb3RvdHlwZSlcbiAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdydWxlJykge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLCBSdWxlLnByb3RvdHlwZSlcbiAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdkZWNsJykge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLCBEZWNsYXJhdGlvbi5wcm90b3R5cGUpXG4gIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnY29tbWVudCcpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgQ29tbWVudC5wcm90b3R5cGUpXG4gIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAncm9vdCcpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgUm9vdC5wcm90b3R5cGUpXG4gIH1cblxuICBub2RlW215XSA9IHRydWVcblxuICBpZiAobm9kZS5ub2Rlcykge1xuICAgIG5vZGUubm9kZXMuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBDb250YWluZXIucmVidWlsZChjaGlsZClcbiAgICB9KVxuICB9XG59XG4vKiBjOCBpZ25vcmUgc3RvcCAqL1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBwaWNvID0gcmVxdWlyZSgncGljb2NvbG9ycycpXG5cbmxldCB0ZXJtaW5hbEhpZ2hsaWdodCA9IHJlcXVpcmUoJy4vdGVybWluYWwtaGlnaGxpZ2h0JylcblxuY2xhc3MgQ3NzU3ludGF4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGxpbmUsIGNvbHVtbiwgc291cmNlLCBmaWxlLCBwbHVnaW4pIHtcbiAgICBzdXBlcihtZXNzYWdlKVxuICAgIHRoaXMubmFtZSA9ICdDc3NTeW50YXhFcnJvcidcbiAgICB0aGlzLnJlYXNvbiA9IG1lc3NhZ2VcblxuICAgIGlmIChmaWxlKSB7XG4gICAgICB0aGlzLmZpbGUgPSBmaWxlXG4gICAgfVxuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIHRoaXMuc291cmNlID0gc291cmNlXG4gICAgfVxuICAgIGlmIChwbHVnaW4pIHtcbiAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbHVtbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICh0eXBlb2YgbGluZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZVxuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZS5saW5lXG4gICAgICAgIHRoaXMuY29sdW1uID0gbGluZS5jb2x1bW5cbiAgICAgICAgdGhpcy5lbmRMaW5lID0gY29sdW1uLmxpbmVcbiAgICAgICAgdGhpcy5lbmRDb2x1bW4gPSBjb2x1bW4uY29sdW1uXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRNZXNzYWdlKClcblxuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgQ3NzU3ludGF4RXJyb3IpXG4gICAgfVxuICB9XG5cbiAgc2V0TWVzc2FnZSgpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLnBsdWdpbiA/IHRoaXMucGx1Z2luICsgJzogJyA6ICcnXG4gICAgdGhpcy5tZXNzYWdlICs9IHRoaXMuZmlsZSA/IHRoaXMuZmlsZSA6ICc8Y3NzIGlucHV0PidcbiAgICBpZiAodHlwZW9mIHRoaXMubGluZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubWVzc2FnZSArPSAnOicgKyB0aGlzLmxpbmUgKyAnOicgKyB0aGlzLmNvbHVtblxuICAgIH1cbiAgICB0aGlzLm1lc3NhZ2UgKz0gJzogJyArIHRoaXMucmVhc29uXG4gIH1cblxuICBzaG93U291cmNlQ29kZShjb2xvcikge1xuICAgIGlmICghdGhpcy5zb3VyY2UpIHJldHVybiAnJ1xuXG4gICAgbGV0IGNzcyA9IHRoaXMuc291cmNlXG4gICAgaWYgKGNvbG9yID09IG51bGwpIGNvbG9yID0gcGljby5pc0NvbG9yU3VwcG9ydGVkXG4gICAgaWYgKHRlcm1pbmFsSGlnaGxpZ2h0KSB7XG4gICAgICBpZiAoY29sb3IpIGNzcyA9IHRlcm1pbmFsSGlnaGxpZ2h0KGNzcylcbiAgICB9XG5cbiAgICBsZXQgbGluZXMgPSBjc3Muc3BsaXQoL1xccj9cXG4vKVxuICAgIGxldCBzdGFydCA9IE1hdGgubWF4KHRoaXMubGluZSAtIDMsIDApXG4gICAgbGV0IGVuZCA9IE1hdGgubWluKHRoaXMubGluZSArIDIsIGxpbmVzLmxlbmd0aClcblxuICAgIGxldCBtYXhXaWR0aCA9IFN0cmluZyhlbmQpLmxlbmd0aFxuXG4gICAgbGV0IG1hcmssIGFzaWRlXG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICBsZXQgeyBib2xkLCBncmF5LCByZWQgfSA9IHBpY28uY3JlYXRlQ29sb3JzKHRydWUpXG4gICAgICBtYXJrID0gdGV4dCA9PiBib2xkKHJlZCh0ZXh0KSlcbiAgICAgIGFzaWRlID0gdGV4dCA9PiBncmF5KHRleHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmsgPSBhc2lkZSA9IHN0ciA9PiBzdHJcbiAgICB9XG5cbiAgICByZXR1cm4gbGluZXNcbiAgICAgIC5zbGljZShzdGFydCwgZW5kKVxuICAgICAgLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IG51bWJlciA9IHN0YXJ0ICsgMSArIGluZGV4XG4gICAgICAgIGxldCBndXR0ZXIgPSAnICcgKyAoJyAnICsgbnVtYmVyKS5zbGljZSgtbWF4V2lkdGgpICsgJyB8ICdcbiAgICAgICAgaWYgKG51bWJlciA9PT0gdGhpcy5saW5lKSB7XG4gICAgICAgICAgbGV0IHNwYWNpbmcgPVxuICAgICAgICAgICAgYXNpZGUoZ3V0dGVyLnJlcGxhY2UoL1xcZC9nLCAnICcpKSArXG4gICAgICAgICAgICBsaW5lLnNsaWNlKDAsIHRoaXMuY29sdW1uIC0gMSkucmVwbGFjZSgvW15cXHRdL2csICcgJylcbiAgICAgICAgICByZXR1cm4gbWFyaygnPicpICsgYXNpZGUoZ3V0dGVyKSArIGxpbmUgKyAnXFxuICcgKyBzcGFjaW5nICsgbWFyaygnXicpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcgJyArIGFzaWRlKGd1dHRlcikgKyBsaW5lXG4gICAgICB9KVxuICAgICAgLmpvaW4oJ1xcbicpXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgY29kZSA9IHRoaXMuc2hvd1NvdXJjZUNvZGUoKVxuICAgIGlmIChjb2RlKSB7XG4gICAgICBjb2RlID0gJ1xcblxcbicgKyBjb2RlICsgJ1xcbidcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICc6ICcgKyB0aGlzLm1lc3NhZ2UgKyBjb2RlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDc3NTeW50YXhFcnJvclxuQ3NzU3ludGF4RXJyb3IuZGVmYXVsdCA9IENzc1N5bnRheEVycm9yXG4iLCIndXNlIHN0cmljdCdcblxubGV0IE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKVxuXG5jbGFzcyBEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgIGlmIChcbiAgICAgIGRlZmF1bHRzICYmXG4gICAgICB0eXBlb2YgZGVmYXVsdHMudmFsdWUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgZGVmYXVsdHMudmFsdWUgIT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBkZWZhdWx0cyA9IHsgLi4uZGVmYXVsdHMsIHZhbHVlOiBTdHJpbmcoZGVmYXVsdHMudmFsdWUpIH1cbiAgICB9XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ2RlY2wnXG4gIH1cblxuICBnZXQgdmFyaWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcC5zdGFydHNXaXRoKCctLScpIHx8IHRoaXMucHJvcFswXSA9PT0gJyQnXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZWNsYXJhdGlvblxuRGVjbGFyYXRpb24uZGVmYXVsdCA9IERlY2xhcmF0aW9uXG4iLCIndXNlIHN0cmljdCdcblxubGV0IENvbnRhaW5lciA9IHJlcXVpcmUoJy4vY29udGFpbmVyJylcblxubGV0IExhenlSZXN1bHQsIFByb2Nlc3NvclxuXG5jbGFzcyBEb2N1bWVudCBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgLy8gdHlwZSBuZWVkcyB0byBiZSBwYXNzZWQgdG8gc3VwZXIsIG90aGVyd2lzZSBjaGlsZCByb290cyB3b24ndCBiZSBub3JtYWxpemVkIGNvcnJlY3RseVxuICAgIHN1cGVyKHsgdHlwZTogJ2RvY3VtZW50JywgLi4uZGVmYXVsdHMgfSlcblxuICAgIGlmICghdGhpcy5ub2Rlcykge1xuICAgICAgdGhpcy5ub2RlcyA9IFtdXG4gICAgfVxuICB9XG5cbiAgdG9SZXN1bHQob3B0cyA9IHt9KSB7XG4gICAgbGV0IGxhenkgPSBuZXcgTGF6eVJlc3VsdChuZXcgUHJvY2Vzc29yKCksIHRoaXMsIG9wdHMpXG5cbiAgICByZXR1cm4gbGF6eS5zdHJpbmdpZnkoKVxuICB9XG59XG5cbkRvY3VtZW50LnJlZ2lzdGVyTGF6eVJlc3VsdCA9IGRlcGVuZGFudCA9PiB7XG4gIExhenlSZXN1bHQgPSBkZXBlbmRhbnRcbn1cblxuRG9jdW1lbnQucmVnaXN0ZXJQcm9jZXNzb3IgPSBkZXBlbmRhbnQgPT4ge1xuICBQcm9jZXNzb3IgPSBkZXBlbmRhbnRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudFxuRG9jdW1lbnQuZGVmYXVsdCA9IERvY3VtZW50XG4iLCIndXNlIHN0cmljdCdcblxubGV0IERlY2xhcmF0aW9uID0gcmVxdWlyZSgnLi9kZWNsYXJhdGlvbicpXG5sZXQgUHJldmlvdXNNYXAgPSByZXF1aXJlKCcuL3ByZXZpb3VzLW1hcCcpXG5sZXQgQ29tbWVudCA9IHJlcXVpcmUoJy4vY29tbWVudCcpXG5sZXQgQXRSdWxlID0gcmVxdWlyZSgnLi9hdC1ydWxlJylcbmxldCBJbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQnKVxubGV0IFJvb3QgPSByZXF1aXJlKCcuL3Jvb3QnKVxubGV0IFJ1bGUgPSByZXF1aXJlKCcuL3J1bGUnKVxuXG5mdW5jdGlvbiBmcm9tSlNPTihqc29uLCBpbnB1dHMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHJldHVybiBqc29uLm1hcChuID0+IGZyb21KU09OKG4pKVxuXG4gIGxldCB7IGlucHV0czogb3duSW5wdXRzLCAuLi5kZWZhdWx0cyB9ID0ganNvblxuICBpZiAob3duSW5wdXRzKSB7XG4gICAgaW5wdXRzID0gW11cbiAgICBmb3IgKGxldCBpbnB1dCBvZiBvd25JbnB1dHMpIHtcbiAgICAgIGxldCBpbnB1dEh5ZHJhdGVkID0geyAuLi5pbnB1dCwgX19wcm90b19fOiBJbnB1dC5wcm90b3R5cGUgfVxuICAgICAgaWYgKGlucHV0SHlkcmF0ZWQubWFwKSB7XG4gICAgICAgIGlucHV0SHlkcmF0ZWQubWFwID0ge1xuICAgICAgICAgIC4uLmlucHV0SHlkcmF0ZWQubWFwLFxuICAgICAgICAgIF9fcHJvdG9fXzogUHJldmlvdXNNYXAucHJvdG90eXBlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlucHV0cy5wdXNoKGlucHV0SHlkcmF0ZWQpXG4gICAgfVxuICB9XG4gIGlmIChkZWZhdWx0cy5ub2Rlcykge1xuICAgIGRlZmF1bHRzLm5vZGVzID0ganNvbi5ub2Rlcy5tYXAobiA9PiBmcm9tSlNPTihuLCBpbnB1dHMpKVxuICB9XG4gIGlmIChkZWZhdWx0cy5zb3VyY2UpIHtcbiAgICBsZXQgeyBpbnB1dElkLCAuLi5zb3VyY2UgfSA9IGRlZmF1bHRzLnNvdXJjZVxuICAgIGRlZmF1bHRzLnNvdXJjZSA9IHNvdXJjZVxuICAgIGlmIChpbnB1dElkICE9IG51bGwpIHtcbiAgICAgIGRlZmF1bHRzLnNvdXJjZS5pbnB1dCA9IGlucHV0c1tpbnB1dElkXVxuICAgIH1cbiAgfVxuICBpZiAoZGVmYXVsdHMudHlwZSA9PT0gJ3Jvb3QnKSB7XG4gICAgcmV0dXJuIG5ldyBSb290KGRlZmF1bHRzKVxuICB9IGVsc2UgaWYgKGRlZmF1bHRzLnR5cGUgPT09ICdkZWNsJykge1xuICAgIHJldHVybiBuZXcgRGVjbGFyYXRpb24oZGVmYXVsdHMpXG4gIH0gZWxzZSBpZiAoZGVmYXVsdHMudHlwZSA9PT0gJ3J1bGUnKSB7XG4gICAgcmV0dXJuIG5ldyBSdWxlKGRlZmF1bHRzKVxuICB9IGVsc2UgaWYgKGRlZmF1bHRzLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgIHJldHVybiBuZXcgQ29tbWVudChkZWZhdWx0cylcbiAgfSBlbHNlIGlmIChkZWZhdWx0cy50eXBlID09PSAnYXRydWxlJykge1xuICAgIHJldHVybiBuZXcgQXRSdWxlKGRlZmF1bHRzKVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBub2RlIHR5cGU6ICcgKyBqc29uLnR5cGUpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmcm9tSlNPTlxuZnJvbUpTT04uZGVmYXVsdCA9IGZyb21KU09OXG4iLCIndXNlIHN0cmljdCdcblxubGV0IHsgU291cmNlTWFwQ29uc3VtZXIsIFNvdXJjZU1hcEdlbmVyYXRvciB9ID0gcmVxdWlyZSgnc291cmNlLW1hcC1qcycpXG5sZXQgeyBmaWxlVVJMVG9QYXRoLCBwYXRoVG9GaWxlVVJMIH0gPSByZXF1aXJlKCd1cmwnKVxubGV0IHsgaXNBYnNvbHV0ZSwgcmVzb2x2ZSB9ID0gcmVxdWlyZSgncGF0aCcpXG5sZXQgeyBuYW5vaWQgfSA9IHJlcXVpcmUoJ25hbm9pZC9ub24tc2VjdXJlJylcblxubGV0IHRlcm1pbmFsSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi90ZXJtaW5hbC1oaWdobGlnaHQnKVxubGV0IENzc1N5bnRheEVycm9yID0gcmVxdWlyZSgnLi9jc3Mtc3ludGF4LWVycm9yJylcbmxldCBQcmV2aW91c01hcCA9IHJlcXVpcmUoJy4vcHJldmlvdXMtbWFwJylcblxubGV0IGZyb21PZmZzZXRDYWNoZSA9IFN5bWJvbCgnZnJvbU9mZnNldENhY2hlJylcblxubGV0IHNvdXJjZU1hcEF2YWlsYWJsZSA9IEJvb2xlYW4oU291cmNlTWFwQ29uc3VtZXIgJiYgU291cmNlTWFwR2VuZXJhdG9yKVxubGV0IHBhdGhBdmFpbGFibGUgPSBCb29sZWFuKHJlc29sdmUgJiYgaXNBYnNvbHV0ZSlcblxuY2xhc3MgSW5wdXQge1xuICBjb25zdHJ1Y3Rvcihjc3MsIG9wdHMgPSB7fSkge1xuICAgIGlmIChcbiAgICAgIGNzcyA9PT0gbnVsbCB8fFxuICAgICAgdHlwZW9mIGNzcyA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICh0eXBlb2YgY3NzID09PSAnb2JqZWN0JyAmJiAhY3NzLnRvU3RyaW5nKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb3N0Q1NTIHJlY2VpdmVkICR7Y3NzfSBpbnN0ZWFkIG9mIENTUyBzdHJpbmdgKVxuICAgIH1cblxuICAgIHRoaXMuY3NzID0gY3NzLnRvU3RyaW5nKClcblxuICAgIGlmICh0aGlzLmNzc1swXSA9PT0gJ1xcdUZFRkYnIHx8IHRoaXMuY3NzWzBdID09PSAnXFx1RkZGRScpIHtcbiAgICAgIHRoaXMuaGFzQk9NID0gdHJ1ZVxuICAgICAgdGhpcy5jc3MgPSB0aGlzLmNzcy5zbGljZSgxKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0JPTSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZnJvbSkge1xuICAgICAgaWYgKFxuICAgICAgICAhcGF0aEF2YWlsYWJsZSB8fFxuICAgICAgICAvXlxcdys6XFwvXFwvLy50ZXN0KG9wdHMuZnJvbSkgfHxcbiAgICAgICAgaXNBYnNvbHV0ZShvcHRzLmZyb20pXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5maWxlID0gb3B0cy5mcm9tXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbGUgPSByZXNvbHZlKG9wdHMuZnJvbSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGF0aEF2YWlsYWJsZSAmJiBzb3VyY2VNYXBBdmFpbGFibGUpIHtcbiAgICAgIGxldCBtYXAgPSBuZXcgUHJldmlvdXNNYXAodGhpcy5jc3MsIG9wdHMpXG4gICAgICBpZiAobWFwLnRleHQpIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXBcbiAgICAgICAgbGV0IGZpbGUgPSBtYXAuY29uc3VtZXIoKS5maWxlXG4gICAgICAgIGlmICghdGhpcy5maWxlICYmIGZpbGUpIHRoaXMuZmlsZSA9IHRoaXMubWFwUmVzb2x2ZShmaWxlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5maWxlKSB7XG4gICAgICB0aGlzLmlkID0gJzxpbnB1dCBjc3MgJyArIG5hbm9pZCg2KSArICc+J1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXApIHRoaXMubWFwLmZpbGUgPSB0aGlzLmZyb21cbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2UsIGxpbmUsIGNvbHVtbiwgb3B0cyA9IHt9KSB7XG4gICAgbGV0IHJlc3VsdCwgZW5kTGluZSwgZW5kQ29sdW1uXG5cbiAgICBpZiAobGluZSAmJiB0eXBlb2YgbGluZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBzdGFydCA9IGxpbmVcbiAgICAgIGxldCBlbmQgPSBjb2x1bW5cbiAgICAgIGlmICh0eXBlb2Ygc3RhcnQub2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5mcm9tT2Zmc2V0KHN0YXJ0Lm9mZnNldClcbiAgICAgICAgbGluZSA9IHBvcy5saW5lXG4gICAgICAgIGNvbHVtbiA9IHBvcy5jb2xcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmUgPSBzdGFydC5saW5lXG4gICAgICAgIGNvbHVtbiA9IHN0YXJ0LmNvbHVtblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBlbmQub2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5mcm9tT2Zmc2V0KGVuZC5vZmZzZXQpXG4gICAgICAgIGVuZExpbmUgPSBwb3MubGluZVxuICAgICAgICBlbmRDb2x1bW4gPSBwb3MuY29sXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbmRMaW5lID0gZW5kLmxpbmVcbiAgICAgICAgZW5kQ29sdW1uID0gZW5kLmNvbHVtblxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWNvbHVtbikge1xuICAgICAgbGV0IHBvcyA9IHRoaXMuZnJvbU9mZnNldChsaW5lKVxuICAgICAgbGluZSA9IHBvcy5saW5lXG4gICAgICBjb2x1bW4gPSBwb3MuY29sXG4gICAgfVxuXG4gICAgbGV0IG9yaWdpbiA9IHRoaXMub3JpZ2luKGxpbmUsIGNvbHVtbiwgZW5kTGluZSwgZW5kQ29sdW1uKVxuICAgIGlmIChvcmlnaW4pIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBDc3NTeW50YXhFcnJvcihcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgb3JpZ2luLmVuZExpbmUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gb3JpZ2luLmxpbmVcbiAgICAgICAgICA6IHsgY29sdW1uOiBvcmlnaW4uY29sdW1uLCBsaW5lOiBvcmlnaW4ubGluZSB9LFxuICAgICAgICBvcmlnaW4uZW5kTGluZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBvcmlnaW4uY29sdW1uXG4gICAgICAgICAgOiB7IGNvbHVtbjogb3JpZ2luLmVuZENvbHVtbiwgbGluZTogb3JpZ2luLmVuZExpbmUgfSxcbiAgICAgICAgb3JpZ2luLnNvdXJjZSxcbiAgICAgICAgb3JpZ2luLmZpbGUsXG4gICAgICAgIG9wdHMucGx1Z2luXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBDc3NTeW50YXhFcnJvcihcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgZW5kTGluZSA9PT0gdW5kZWZpbmVkID8gbGluZSA6IHsgY29sdW1uLCBsaW5lIH0sXG4gICAgICAgIGVuZExpbmUgPT09IHVuZGVmaW5lZCA/IGNvbHVtbiA6IHsgY29sdW1uOiBlbmRDb2x1bW4sIGxpbmU6IGVuZExpbmUgfSxcbiAgICAgICAgdGhpcy5jc3MsXG4gICAgICAgIHRoaXMuZmlsZSxcbiAgICAgICAgb3B0cy5wbHVnaW5cbiAgICAgIClcbiAgICB9XG5cbiAgICByZXN1bHQuaW5wdXQgPSB7IGNvbHVtbiwgZW5kQ29sdW1uLCBlbmRMaW5lLCBsaW5lLCBzb3VyY2U6IHRoaXMuY3NzIH1cbiAgICBpZiAodGhpcy5maWxlKSB7XG4gICAgICBpZiAocGF0aFRvRmlsZVVSTCkge1xuICAgICAgICByZXN1bHQuaW5wdXQudXJsID0gcGF0aFRvRmlsZVVSTCh0aGlzLmZpbGUpLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5pbnB1dC5maWxlID0gdGhpcy5maWxlXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZnJvbU9mZnNldChvZmZzZXQpIHtcbiAgICBsZXQgbGFzdExpbmUsIGxpbmVUb0luZGV4XG4gICAgaWYgKCF0aGlzW2Zyb21PZmZzZXRDYWNoZV0pIHtcbiAgICAgIGxldCBsaW5lcyA9IHRoaXMuY3NzLnNwbGl0KCdcXG4nKVxuICAgICAgbGluZVRvSW5kZXggPSBuZXcgQXJyYXkobGluZXMubGVuZ3RoKVxuICAgICAgbGV0IHByZXZJbmRleCA9IDBcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGluZVRvSW5kZXhbaV0gPSBwcmV2SW5kZXhcbiAgICAgICAgcHJldkluZGV4ICs9IGxpbmVzW2ldLmxlbmd0aCArIDFcbiAgICAgIH1cblxuICAgICAgdGhpc1tmcm9tT2Zmc2V0Q2FjaGVdID0gbGluZVRvSW5kZXhcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZVRvSW5kZXggPSB0aGlzW2Zyb21PZmZzZXRDYWNoZV1cbiAgICB9XG4gICAgbGFzdExpbmUgPSBsaW5lVG9JbmRleFtsaW5lVG9JbmRleC5sZW5ndGggLSAxXVxuXG4gICAgbGV0IG1pbiA9IDBcbiAgICBpZiAob2Zmc2V0ID49IGxhc3RMaW5lKSB7XG4gICAgICBtaW4gPSBsaW5lVG9JbmRleC5sZW5ndGggLSAxXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtYXggPSBsaW5lVG9JbmRleC5sZW5ndGggLSAyXG4gICAgICBsZXQgbWlkXG4gICAgICB3aGlsZSAobWluIDwgbWF4KSB7XG4gICAgICAgIG1pZCA9IG1pbiArICgobWF4IC0gbWluKSA+PiAxKVxuICAgICAgICBpZiAob2Zmc2V0IDwgbGluZVRvSW5kZXhbbWlkXSkge1xuICAgICAgICAgIG1heCA9IG1pZCAtIDFcbiAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPj0gbGluZVRvSW5kZXhbbWlkICsgMV0pIHtcbiAgICAgICAgICBtaW4gPSBtaWQgKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWluID0gbWlkXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY29sOiBvZmZzZXQgLSBsaW5lVG9JbmRleFttaW5dICsgMSxcbiAgICAgIGxpbmU6IG1pbiArIDFcbiAgICB9XG4gIH1cblxuICBtYXBSZXNvbHZlKGZpbGUpIHtcbiAgICBpZiAoL15cXHcrOlxcL1xcLy8udGVzdChmaWxlKSkge1xuICAgICAgcmV0dXJuIGZpbGVcbiAgICB9XG4gICAgcmV0dXJuIHJlc29sdmUodGhpcy5tYXAuY29uc3VtZXIoKS5zb3VyY2VSb290IHx8IHRoaXMubWFwLnJvb3QgfHwgJy4nLCBmaWxlKVxuICB9XG5cbiAgb3JpZ2luKGxpbmUsIGNvbHVtbiwgZW5kTGluZSwgZW5kQ29sdW1uKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkgcmV0dXJuIGZhbHNlXG4gICAgbGV0IGNvbnN1bWVyID0gdGhpcy5tYXAuY29uc3VtZXIoKVxuXG4gICAgbGV0IGZyb20gPSBjb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHsgY29sdW1uLCBsaW5lIH0pXG4gICAgaWYgKCFmcm9tLnNvdXJjZSkgcmV0dXJuIGZhbHNlXG5cbiAgICBsZXQgdG9cbiAgICBpZiAodHlwZW9mIGVuZExpbmUgPT09ICdudW1iZXInKSB7XG4gICAgICB0byA9IGNvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3IoeyBjb2x1bW46IGVuZENvbHVtbiwgbGluZTogZW5kTGluZSB9KVxuICAgIH1cblxuICAgIGxldCBmcm9tVXJsXG5cbiAgICBpZiAoaXNBYnNvbHV0ZShmcm9tLnNvdXJjZSkpIHtcbiAgICAgIGZyb21VcmwgPSBwYXRoVG9GaWxlVVJMKGZyb20uc291cmNlKVxuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tVXJsID0gbmV3IFVSTChcbiAgICAgICAgZnJvbS5zb3VyY2UsXG4gICAgICAgIHRoaXMubWFwLmNvbnN1bWVyKCkuc291cmNlUm9vdCB8fCBwYXRoVG9GaWxlVVJMKHRoaXMubWFwLm1hcEZpbGUpXG4gICAgICApXG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgIGNvbHVtbjogZnJvbS5jb2x1bW4sXG4gICAgICBlbmRDb2x1bW46IHRvICYmIHRvLmNvbHVtbixcbiAgICAgIGVuZExpbmU6IHRvICYmIHRvLmxpbmUsXG4gICAgICBsaW5lOiBmcm9tLmxpbmUsXG4gICAgICB1cmw6IGZyb21VcmwudG9TdHJpbmcoKVxuICAgIH1cblxuICAgIGlmIChmcm9tVXJsLnByb3RvY29sID09PSAnZmlsZTonKSB7XG4gICAgICBpZiAoZmlsZVVSTFRvUGF0aCkge1xuICAgICAgICByZXN1bHQuZmlsZSA9IGZpbGVVUkxUb1BhdGgoZnJvbVVybClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDIgKi9cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmaWxlOiBwcm90b2NvbCBpcyBub3QgYXZhaWxhYmxlIGluIHRoaXMgUG9zdENTUyBidWlsZGApXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHNvdXJjZSA9IGNvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3IoZnJvbS5zb3VyY2UpXG4gICAgaWYgKHNvdXJjZSkgcmVzdWx0LnNvdXJjZSA9IHNvdXJjZVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIGxldCBqc29uID0ge31cbiAgICBmb3IgKGxldCBuYW1lIG9mIFsnaGFzQk9NJywgJ2NzcycsICdmaWxlJywgJ2lkJ10pIHtcbiAgICAgIGlmICh0aGlzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAganNvbltuYW1lXSA9IHRoaXNbbmFtZV1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICBqc29uLm1hcCA9IHsgLi4udGhpcy5tYXAgfVxuICAgICAgaWYgKGpzb24ubWFwLmNvbnN1bWVyQ2FjaGUpIHtcbiAgICAgICAganNvbi5tYXAuY29uc3VtZXJDYWNoZSA9IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ganNvblxuICB9XG5cbiAgZ2V0IGZyb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZSB8fCB0aGlzLmlkXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFxuSW5wdXQuZGVmYXVsdCA9IElucHV0XG5cbmlmICh0ZXJtaW5hbEhpZ2hsaWdodCAmJiB0ZXJtaW5hbEhpZ2hsaWdodC5yZWdpc3RlcklucHV0KSB7XG4gIHRlcm1pbmFsSGlnaGxpZ2h0LnJlZ2lzdGVySW5wdXQoSW5wdXQpXG59XG4iLCIndXNlIHN0cmljdCdcblxubGV0IHsgaXNDbGVhbiwgbXkgfSA9IHJlcXVpcmUoJy4vc3ltYm9scycpXG5sZXQgTWFwR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9tYXAtZ2VuZXJhdG9yJylcbmxldCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpXG5sZXQgQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXInKVxubGV0IERvY3VtZW50ID0gcmVxdWlyZSgnLi9kb2N1bWVudCcpXG5sZXQgd2Fybk9uY2UgPSByZXF1aXJlKCcuL3dhcm4tb25jZScpXG5sZXQgUmVzdWx0ID0gcmVxdWlyZSgnLi9yZXN1bHQnKVxubGV0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5sZXQgUm9vdCA9IHJlcXVpcmUoJy4vcm9vdCcpXG5cbmNvbnN0IFRZUEVfVE9fQ0xBU1NfTkFNRSA9IHtcbiAgYXRydWxlOiAnQXRSdWxlJyxcbiAgY29tbWVudDogJ0NvbW1lbnQnLFxuICBkZWNsOiAnRGVjbGFyYXRpb24nLFxuICBkb2N1bWVudDogJ0RvY3VtZW50JyxcbiAgcm9vdDogJ1Jvb3QnLFxuICBydWxlOiAnUnVsZSdcbn1cblxuY29uc3QgUExVR0lOX1BST1BTID0ge1xuICBBdFJ1bGU6IHRydWUsXG4gIEF0UnVsZUV4aXQ6IHRydWUsXG4gIENvbW1lbnQ6IHRydWUsXG4gIENvbW1lbnRFeGl0OiB0cnVlLFxuICBEZWNsYXJhdGlvbjogdHJ1ZSxcbiAgRGVjbGFyYXRpb25FeGl0OiB0cnVlLFxuICBEb2N1bWVudDogdHJ1ZSxcbiAgRG9jdW1lbnRFeGl0OiB0cnVlLFxuICBPbmNlOiB0cnVlLFxuICBPbmNlRXhpdDogdHJ1ZSxcbiAgcG9zdGNzc1BsdWdpbjogdHJ1ZSxcbiAgcHJlcGFyZTogdHJ1ZSxcbiAgUm9vdDogdHJ1ZSxcbiAgUm9vdEV4aXQ6IHRydWUsXG4gIFJ1bGU6IHRydWUsXG4gIFJ1bGVFeGl0OiB0cnVlXG59XG5cbmNvbnN0IE5PVF9WSVNJVE9SUyA9IHtcbiAgT25jZTogdHJ1ZSxcbiAgcG9zdGNzc1BsdWdpbjogdHJ1ZSxcbiAgcHJlcGFyZTogdHJ1ZVxufVxuXG5jb25zdCBDSElMRFJFTiA9IDBcblxuZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nXG59XG5cbmZ1bmN0aW9uIGdldEV2ZW50cyhub2RlKSB7XG4gIGxldCBrZXkgPSBmYWxzZVxuICBsZXQgdHlwZSA9IFRZUEVfVE9fQ0xBU1NfTkFNRVtub2RlLnR5cGVdXG4gIGlmIChub2RlLnR5cGUgPT09ICdkZWNsJykge1xuICAgIGtleSA9IG5vZGUucHJvcC50b0xvd2VyQ2FzZSgpXG4gIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnYXRydWxlJykge1xuICAgIGtleSA9IG5vZGUubmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBpZiAoa2V5ICYmIG5vZGUuYXBwZW5kKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHR5cGUsXG4gICAgICB0eXBlICsgJy0nICsga2V5LFxuICAgICAgQ0hJTERSRU4sXG4gICAgICB0eXBlICsgJ0V4aXQnLFxuICAgICAgdHlwZSArICdFeGl0LScgKyBrZXlcbiAgICBdXG4gIH0gZWxzZSBpZiAoa2V5KSB7XG4gICAgcmV0dXJuIFt0eXBlLCB0eXBlICsgJy0nICsga2V5LCB0eXBlICsgJ0V4aXQnLCB0eXBlICsgJ0V4aXQtJyArIGtleV1cbiAgfSBlbHNlIGlmIChub2RlLmFwcGVuZCkge1xuICAgIHJldHVybiBbdHlwZSwgQ0hJTERSRU4sIHR5cGUgKyAnRXhpdCddXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFt0eXBlLCB0eXBlICsgJ0V4aXQnXVxuICB9XG59XG5cbmZ1bmN0aW9uIHRvU3RhY2sobm9kZSkge1xuICBsZXQgZXZlbnRzXG4gIGlmIChub2RlLnR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICBldmVudHMgPSBbJ0RvY3VtZW50JywgQ0hJTERSRU4sICdEb2N1bWVudEV4aXQnXVxuICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ3Jvb3QnKSB7XG4gICAgZXZlbnRzID0gWydSb290JywgQ0hJTERSRU4sICdSb290RXhpdCddXG4gIH0gZWxzZSB7XG4gICAgZXZlbnRzID0gZ2V0RXZlbnRzKG5vZGUpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGV2ZW50SW5kZXg6IDAsXG4gICAgZXZlbnRzLFxuICAgIGl0ZXJhdG9yOiAwLFxuICAgIG5vZGUsXG4gICAgdmlzaXRvckluZGV4OiAwLFxuICAgIHZpc2l0b3JzOiBbXVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFuTWFya3Mobm9kZSkge1xuICBub2RlW2lzQ2xlYW5dID0gZmFsc2VcbiAgaWYgKG5vZGUubm9kZXMpIG5vZGUubm9kZXMuZm9yRWFjaChpID0+IGNsZWFuTWFya3MoaSkpXG4gIHJldHVybiBub2RlXG59XG5cbmxldCBwb3N0Y3NzID0ge31cblxuY2xhc3MgTGF6eVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByb2Nlc3NvciwgY3NzLCBvcHRzKSB7XG4gICAgdGhpcy5zdHJpbmdpZmllZCA9IGZhbHNlXG4gICAgdGhpcy5wcm9jZXNzZWQgPSBmYWxzZVxuXG4gICAgbGV0IHJvb3RcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgY3NzID09PSAnb2JqZWN0JyAmJlxuICAgICAgY3NzICE9PSBudWxsICYmXG4gICAgICAoY3NzLnR5cGUgPT09ICdyb290JyB8fCBjc3MudHlwZSA9PT0gJ2RvY3VtZW50JylcbiAgICApIHtcbiAgICAgIHJvb3QgPSBjbGVhbk1hcmtzKGNzcylcbiAgICB9IGVsc2UgaWYgKGNzcyBpbnN0YW5jZW9mIExhenlSZXN1bHQgfHwgY3NzIGluc3RhbmNlb2YgUmVzdWx0KSB7XG4gICAgICByb290ID0gY2xlYW5NYXJrcyhjc3Mucm9vdClcbiAgICAgIGlmIChjc3MubWFwKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5tYXAgPT09ICd1bmRlZmluZWQnKSBvcHRzLm1hcCA9IHt9XG4gICAgICAgIGlmICghb3B0cy5tYXAuaW5saW5lKSBvcHRzLm1hcC5pbmxpbmUgPSBmYWxzZVxuICAgICAgICBvcHRzLm1hcC5wcmV2ID0gY3NzLm1hcFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcGFyc2VyID0gcGFyc2VcbiAgICAgIGlmIChvcHRzLnN5bnRheCkgcGFyc2VyID0gb3B0cy5zeW50YXgucGFyc2VcbiAgICAgIGlmIChvcHRzLnBhcnNlcikgcGFyc2VyID0gb3B0cy5wYXJzZXJcbiAgICAgIGlmIChwYXJzZXIucGFyc2UpIHBhcnNlciA9IHBhcnNlci5wYXJzZVxuXG4gICAgICB0cnkge1xuICAgICAgICByb290ID0gcGFyc2VyKGNzcywgb3B0cylcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkID0gdHJ1ZVxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3JcbiAgICAgIH1cblxuICAgICAgaWYgKHJvb3QgJiYgIXJvb3RbbXldKSB7XG4gICAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDIgKi9cbiAgICAgICAgQ29udGFpbmVyLnJlYnVpbGQocm9vdClcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlc3VsdCA9IG5ldyBSZXN1bHQocHJvY2Vzc29yLCByb290LCBvcHRzKVxuICAgIHRoaXMuaGVscGVycyA9IHsgLi4ucG9zdGNzcywgcG9zdGNzcywgcmVzdWx0OiB0aGlzLnJlc3VsdCB9XG4gICAgdGhpcy5wbHVnaW5zID0gdGhpcy5wcm9jZXNzb3IucGx1Z2lucy5tYXAocGx1Z2luID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcGx1Z2luID09PSAnb2JqZWN0JyAmJiBwbHVnaW4ucHJlcGFyZSkge1xuICAgICAgICByZXR1cm4geyAuLi5wbHVnaW4sIC4uLnBsdWdpbi5wcmVwYXJlKHRoaXMucmVzdWx0KSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGx1Z2luXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jKCkge1xuICAgIGlmICh0aGlzLmVycm9yKSByZXR1cm4gUHJvbWlzZS5yZWplY3QodGhpcy5lcnJvcilcbiAgICBpZiAodGhpcy5wcm9jZXNzZWQpIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5yZXN1bHQpXG4gICAgaWYgKCF0aGlzLnByb2Nlc3NpbmcpIHtcbiAgICAgIHRoaXMucHJvY2Vzc2luZyA9IHRoaXMucnVuQXN5bmMoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzaW5nXG4gIH1cblxuICBjYXRjaChvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS5jYXRjaChvblJlamVjdGVkKVxuICB9XG5cbiAgZmluYWxseShvbkZpbmFsbHkpIHtcbiAgICByZXR1cm4gdGhpcy5hc3luYygpLnRoZW4ob25GaW5hbGx5LCBvbkZpbmFsbHkpXG4gIH1cblxuICBnZXRBc3luY0Vycm9yKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXNlIHByb2Nlc3MoY3NzKS50aGVuKGNiKSB0byB3b3JrIHdpdGggYXN5bmMgcGx1Z2lucycpXG4gIH1cblxuICBoYW5kbGVFcnJvcihlcnJvciwgbm9kZSkge1xuICAgIGxldCBwbHVnaW4gPSB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luXG4gICAgdHJ5IHtcbiAgICAgIGlmIChub2RlKSBub2RlLmFkZFRvRXJyb3IoZXJyb3IpXG4gICAgICB0aGlzLmVycm9yID0gZXJyb3JcbiAgICAgIGlmIChlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICYmICFlcnJvci5wbHVnaW4pIHtcbiAgICAgICAgZXJyb3IucGx1Z2luID0gcGx1Z2luLnBvc3Rjc3NQbHVnaW5cbiAgICAgICAgZXJyb3Iuc2V0TWVzc2FnZSgpXG4gICAgICB9IGVsc2UgaWYgKHBsdWdpbi5wb3N0Y3NzVmVyc2lvbikge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGxldCBwbHVnaW5OYW1lID0gcGx1Z2luLnBvc3Rjc3NQbHVnaW5cbiAgICAgICAgICBsZXQgcGx1Z2luVmVyID0gcGx1Z2luLnBvc3Rjc3NWZXJzaW9uXG4gICAgICAgICAgbGV0IHJ1bnRpbWVWZXIgPSB0aGlzLnJlc3VsdC5wcm9jZXNzb3IudmVyc2lvblxuICAgICAgICAgIGxldCBhID0gcGx1Z2luVmVyLnNwbGl0KCcuJylcbiAgICAgICAgICBsZXQgYiA9IHJ1bnRpbWVWZXIuc3BsaXQoJy4nKVxuXG4gICAgICAgICAgaWYgKGFbMF0gIT09IGJbMF0gfHwgcGFyc2VJbnQoYVsxXSkgPiBwYXJzZUludChiWzFdKSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICdVbmtub3duIGVycm9yIGZyb20gUG9zdENTUyBwbHVnaW4uIFlvdXIgY3VycmVudCBQb3N0Q1NTICcgK1xuICAgICAgICAgICAgICAgICd2ZXJzaW9uIGlzICcgK1xuICAgICAgICAgICAgICAgIHJ1bnRpbWVWZXIgK1xuICAgICAgICAgICAgICAgICcsIGJ1dCAnICtcbiAgICAgICAgICAgICAgICBwbHVnaW5OYW1lICtcbiAgICAgICAgICAgICAgICAnIHVzZXMgJyArXG4gICAgICAgICAgICAgICAgcGx1Z2luVmVyICtcbiAgICAgICAgICAgICAgICAnLiBQZXJoYXBzIHRoaXMgaXMgdGhlIHNvdXJjZSBvZiB0aGUgZXJyb3IgYmVsb3cuJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLyogYzggaWdub3JlIG5leHQgMyAqL1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIH1cbiAgICByZXR1cm4gZXJyb3JcbiAgfVxuXG4gIHByZXBhcmVWaXNpdG9ycygpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG4gICAgbGV0IGFkZCA9IChwbHVnaW4sIHR5cGUsIGNiKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW3R5cGVdKSB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdXG4gICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKFtwbHVnaW4sIGNiXSlcbiAgICB9XG4gICAgZm9yIChsZXQgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IGluIHBsdWdpbikge1xuICAgICAgICAgIGlmICghUExVR0lOX1BST1BTW2V2ZW50XSAmJiAvXltBLVpdLy50ZXN0KGV2ZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgVW5rbm93biBldmVudCAke2V2ZW50fSBpbiAke3BsdWdpbi5wb3N0Y3NzUGx1Z2lufS4gYCArXG4gICAgICAgICAgICAgICAgYFRyeSB0byB1cGRhdGUgUG9zdENTUyAoJHt0aGlzLnByb2Nlc3Nvci52ZXJzaW9ufSBub3cpLmBcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFOT1RfVklTSVRPUlNbZXZlbnRdKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBsdWdpbltldmVudF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGZpbHRlciBpbiBwbHVnaW5bZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgICBhZGQocGx1Z2luLCBldmVudCwgcGx1Z2luW2V2ZW50XVtmaWx0ZXJdKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhZGQoXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbixcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgKyAnLScgKyBmaWx0ZXIudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luW2V2ZW50XVtmaWx0ZXJdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW5bZXZlbnRdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGFkZChwbHVnaW4sIGV2ZW50LCBwbHVnaW5bZXZlbnRdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmhhc0xpc3RlbmVyID0gT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmxlbmd0aCA+IDBcbiAgfVxuXG4gIGFzeW5jIHJ1bkFzeW5jKCkge1xuICAgIHRoaXMucGx1Z2luID0gMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbHVnaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcGx1Z2luID0gdGhpcy5wbHVnaW5zW2ldXG4gICAgICBsZXQgcHJvbWlzZSA9IHRoaXMucnVuT25Sb290KHBsdWdpbilcbiAgICAgIGlmIChpc1Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBwcm9taXNlXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgdGhpcy5oYW5kbGVFcnJvcihlcnJvcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJlcGFyZVZpc2l0b3JzKClcbiAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcikge1xuICAgICAgbGV0IHJvb3QgPSB0aGlzLnJlc3VsdC5yb290XG4gICAgICB3aGlsZSAoIXJvb3RbaXNDbGVhbl0pIHtcbiAgICAgICAgcm9vdFtpc0NsZWFuXSA9IHRydWVcbiAgICAgICAgbGV0IHN0YWNrID0gW3RvU3RhY2socm9vdCldXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnZpc2l0VGljayhzdGFjaylcbiAgICAgICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBhd2FpdCBwcm9taXNlXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGxldCBub2RlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0ubm9kZVxuICAgICAgICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGUsIG5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxpc3RlbmVycy5PbmNlRXhpdCkge1xuICAgICAgICBmb3IgKGxldCBbcGx1Z2luLCB2aXNpdG9yXSBvZiB0aGlzLmxpc3RlbmVycy5PbmNlRXhpdCkge1xuICAgICAgICAgIHRoaXMucmVzdWx0Lmxhc3RQbHVnaW4gPSBwbHVnaW5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJvb3QudHlwZSA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICAgICAgICBsZXQgcm9vdHMgPSByb290Lm5vZGVzLm1hcChzdWJSb290ID0+XG4gICAgICAgICAgICAgICAgdmlzaXRvcihzdWJSb290LCB0aGlzLmhlbHBlcnMpXG4gICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChyb290cylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGF3YWl0IHZpc2l0b3Iocm9vdCwgdGhpcy5oZWxwZXJzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKVxuICB9XG5cbiAgcnVuT25Sb290KHBsdWdpbikge1xuICAgIHRoaXMucmVzdWx0Lmxhc3RQbHVnaW4gPSBwbHVnaW5cbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdvYmplY3QnICYmIHBsdWdpbi5PbmNlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdC5yb290LnR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgICBsZXQgcm9vdHMgPSB0aGlzLnJlc3VsdC5yb290Lm5vZGVzLm1hcChyb290ID0+XG4gICAgICAgICAgICBwbHVnaW4uT25jZShyb290LCB0aGlzLmhlbHBlcnMpXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKGlzUHJvbWlzZShyb290c1swXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChyb290cylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcm9vdHNcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbHVnaW4uT25jZSh0aGlzLnJlc3VsdC5yb290LCB0aGlzLmhlbHBlcnMpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbih0aGlzLnJlc3VsdC5yb290LCB0aGlzLnJlc3VsdClcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgdGhpcy5oYW5kbGVFcnJvcihlcnJvcilcbiAgICB9XG4gIH1cblxuICBzdHJpbmdpZnkoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHRocm93IHRoaXMuZXJyb3JcbiAgICBpZiAodGhpcy5zdHJpbmdpZmllZCkgcmV0dXJuIHRoaXMucmVzdWx0XG4gICAgdGhpcy5zdHJpbmdpZmllZCA9IHRydWVcblxuICAgIHRoaXMuc3luYygpXG5cbiAgICBsZXQgb3B0cyA9IHRoaXMucmVzdWx0Lm9wdHNcbiAgICBsZXQgc3RyID0gc3RyaW5naWZ5XG4gICAgaWYgKG9wdHMuc3ludGF4KSBzdHIgPSBvcHRzLnN5bnRheC5zdHJpbmdpZnlcbiAgICBpZiAob3B0cy5zdHJpbmdpZmllcikgc3RyID0gb3B0cy5zdHJpbmdpZmllclxuICAgIGlmIChzdHIuc3RyaW5naWZ5KSBzdHIgPSBzdHIuc3RyaW5naWZ5XG5cbiAgICBsZXQgbWFwID0gbmV3IE1hcEdlbmVyYXRvcihzdHIsIHRoaXMucmVzdWx0LnJvb3QsIHRoaXMucmVzdWx0Lm9wdHMpXG4gICAgbGV0IGRhdGEgPSBtYXAuZ2VuZXJhdGUoKVxuICAgIHRoaXMucmVzdWx0LmNzcyA9IGRhdGFbMF1cbiAgICB0aGlzLnJlc3VsdC5tYXAgPSBkYXRhWzFdXG5cbiAgICByZXR1cm4gdGhpcy5yZXN1bHRcbiAgfVxuXG4gIHN5bmMoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHRocm93IHRoaXMuZXJyb3JcbiAgICBpZiAodGhpcy5wcm9jZXNzZWQpIHJldHVybiB0aGlzLnJlc3VsdFxuICAgIHRoaXMucHJvY2Vzc2VkID0gdHJ1ZVxuXG4gICAgaWYgKHRoaXMucHJvY2Vzc2luZykge1xuICAgICAgdGhyb3cgdGhpcy5nZXRBc3luY0Vycm9yKClcbiAgICB9XG5cbiAgICBmb3IgKGxldCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICBsZXQgcHJvbWlzZSA9IHRoaXMucnVuT25Sb290KHBsdWdpbilcbiAgICAgIGlmIChpc1Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5nZXRBc3luY0Vycm9yKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByZXBhcmVWaXNpdG9ycygpXG4gICAgaWYgKHRoaXMuaGFzTGlzdGVuZXIpIHtcbiAgICAgIGxldCByb290ID0gdGhpcy5yZXN1bHQucm9vdFxuICAgICAgd2hpbGUgKCFyb290W2lzQ2xlYW5dKSB7XG4gICAgICAgIHJvb3RbaXNDbGVhbl0gPSB0cnVlXG4gICAgICAgIHRoaXMud2Fsa1N5bmMocm9vdClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmxpc3RlbmVycy5PbmNlRXhpdCkge1xuICAgICAgICBpZiAocm9vdC50eXBlID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgICAgZm9yIChsZXQgc3ViUm9vdCBvZiByb290Lm5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2l0U3luYyh0aGlzLmxpc3RlbmVycy5PbmNlRXhpdCwgc3ViUm9vdClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52aXNpdFN5bmModGhpcy5saXN0ZW5lcnMuT25jZUV4aXQsIHJvb3QpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXN1bHRcbiAgfVxuXG4gIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCEoJ2Zyb20nIGluIHRoaXMub3B0cykpIHtcbiAgICAgICAgd2Fybk9uY2UoXG4gICAgICAgICAgJ1dpdGhvdXQgYGZyb21gIG9wdGlvbiBQb3N0Q1NTIGNvdWxkIGdlbmVyYXRlIHdyb25nIHNvdXJjZSBtYXAgJyArXG4gICAgICAgICAgICAnYW5kIHdpbGwgbm90IGZpbmQgQnJvd3NlcnNsaXN0IGNvbmZpZy4gU2V0IGl0IHRvIENTUyBmaWxlIHBhdGggJyArXG4gICAgICAgICAgICAnb3IgdG8gYHVuZGVmaW5lZGAgdG8gcHJldmVudCB0aGlzIHdhcm5pbmcuJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmNzc1xuICB9XG5cbiAgdmlzaXRTeW5jKHZpc2l0b3JzLCBub2RlKSB7XG4gICAgZm9yIChsZXQgW3BsdWdpbiwgdmlzaXRvcl0gb2YgdmlzaXRvcnMpIHtcbiAgICAgIHRoaXMucmVzdWx0Lmxhc3RQbHVnaW4gPSBwbHVnaW5cbiAgICAgIGxldCBwcm9taXNlXG4gICAgICB0cnkge1xuICAgICAgICBwcm9taXNlID0gdmlzaXRvcihub2RlLCB0aGlzLmhlbHBlcnMpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZSwgbm9kZS5wcm94eU9mKVxuICAgICAgfVxuICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ3Jvb3QnICYmIG5vZGUudHlwZSAhPT0gJ2RvY3VtZW50JyAmJiAhbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChpc1Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5nZXRBc3luY0Vycm9yKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2aXNpdFRpY2soc3RhY2spIHtcbiAgICBsZXQgdmlzaXQgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXVxuICAgIGxldCB7IG5vZGUsIHZpc2l0b3JzIH0gPSB2aXNpdFxuXG4gICAgaWYgKG5vZGUudHlwZSAhPT0gJ3Jvb3QnICYmIG5vZGUudHlwZSAhPT0gJ2RvY3VtZW50JyAmJiAhbm9kZS5wYXJlbnQpIHtcbiAgICAgIHN0YWNrLnBvcCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodmlzaXRvcnMubGVuZ3RoID4gMCAmJiB2aXNpdC52aXNpdG9ySW5kZXggPCB2aXNpdG9ycy5sZW5ndGgpIHtcbiAgICAgIGxldCBbcGx1Z2luLCB2aXNpdG9yXSA9IHZpc2l0b3JzW3Zpc2l0LnZpc2l0b3JJbmRleF1cbiAgICAgIHZpc2l0LnZpc2l0b3JJbmRleCArPSAxXG4gICAgICBpZiAodmlzaXQudmlzaXRvckluZGV4ID09PSB2aXNpdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgdmlzaXQudmlzaXRvcnMgPSBbXVxuICAgICAgICB2aXNpdC52aXNpdG9ySW5kZXggPSAwXG4gICAgICB9XG4gICAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdmlzaXRvcihub2RlLnRvUHJveHkoKSwgdGhpcy5oZWxwZXJzKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGUsIG5vZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZpc2l0Lml0ZXJhdG9yICE9PSAwKSB7XG4gICAgICBsZXQgaXRlcmF0b3IgPSB2aXNpdC5pdGVyYXRvclxuICAgICAgbGV0IGNoaWxkXG4gICAgICB3aGlsZSAoKGNoaWxkID0gbm9kZS5ub2Rlc1tub2RlLmluZGV4ZXNbaXRlcmF0b3JdXSkpIHtcbiAgICAgICAgbm9kZS5pbmRleGVzW2l0ZXJhdG9yXSArPSAxXG4gICAgICAgIGlmICghY2hpbGRbaXNDbGVhbl0pIHtcbiAgICAgICAgICBjaGlsZFtpc0NsZWFuXSA9IHRydWVcbiAgICAgICAgICBzdGFjay5wdXNoKHRvU3RhY2soY2hpbGQpKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2aXNpdC5pdGVyYXRvciA9IDBcbiAgICAgIGRlbGV0ZSBub2RlLmluZGV4ZXNbaXRlcmF0b3JdXG4gICAgfVxuXG4gICAgbGV0IGV2ZW50cyA9IHZpc2l0LmV2ZW50c1xuICAgIHdoaWxlICh2aXNpdC5ldmVudEluZGV4IDwgZXZlbnRzLmxlbmd0aCkge1xuICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW3Zpc2l0LmV2ZW50SW5kZXhdXG4gICAgICB2aXNpdC5ldmVudEluZGV4ICs9IDFcbiAgICAgIGlmIChldmVudCA9PT0gQ0hJTERSRU4pIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZXMgJiYgbm9kZS5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICBub2RlW2lzQ2xlYW5dID0gdHJ1ZVxuICAgICAgICAgIHZpc2l0Lml0ZXJhdG9yID0gbm9kZS5nZXRJdGVyYXRvcigpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgICB2aXNpdC52aXNpdG9ycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2sucG9wKClcbiAgfVxuXG4gIHdhbGtTeW5jKG5vZGUpIHtcbiAgICBub2RlW2lzQ2xlYW5dID0gdHJ1ZVxuICAgIGxldCBldmVudHMgPSBnZXRFdmVudHMobm9kZSlcbiAgICBmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgIGlmIChldmVudCA9PT0gQ0hJTERSRU4pIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZXMpIHtcbiAgICAgICAgICBub2RlLmVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgaWYgKCFjaGlsZFtpc0NsZWFuXSkgdGhpcy53YWxrU3luYyhjaGlsZClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdmlzaXRvcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudF1cbiAgICAgICAgaWYgKHZpc2l0b3JzKSB7XG4gICAgICAgICAgaWYgKHRoaXMudmlzaXRTeW5jKHZpc2l0b3JzLCBub2RlLnRvUHJveHkoKSkpIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2FybmluZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3luYygpLndhcm5pbmdzKClcbiAgfVxuXG4gIGdldCBjb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLmNvbnRlbnRcbiAgfVxuXG4gIGdldCBjc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkuY3NzXG4gIH1cblxuICBnZXQgbWFwKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLm1hcFxuICB9XG5cbiAgZ2V0IG1lc3NhZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS5tZXNzYWdlc1xuICB9XG5cbiAgZ2V0IG9wdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0Lm9wdHNcbiAgfVxuXG4gIGdldCBwcm9jZXNzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LnByb2Nlc3NvclxuICB9XG5cbiAgZ2V0IHJvb3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3luYygpLnJvb3RcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0xhenlSZXN1bHQnXG4gIH1cbn1cblxuTGF6eVJlc3VsdC5yZWdpc3RlclBvc3Rjc3MgPSBkZXBlbmRhbnQgPT4ge1xuICBwb3N0Y3NzID0gZGVwZW5kYW50XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGF6eVJlc3VsdFxuTGF6eVJlc3VsdC5kZWZhdWx0ID0gTGF6eVJlc3VsdFxuXG5Sb290LnJlZ2lzdGVyTGF6eVJlc3VsdChMYXp5UmVzdWx0KVxuRG9jdW1lbnQucmVnaXN0ZXJMYXp5UmVzdWx0KExhenlSZXN1bHQpXG4iLCIndXNlIHN0cmljdCdcblxubGV0IGxpc3QgPSB7XG4gIGNvbW1hKHN0cmluZykge1xuICAgIHJldHVybiBsaXN0LnNwbGl0KHN0cmluZywgWycsJ10sIHRydWUpXG4gIH0sXG5cbiAgc3BhY2Uoc3RyaW5nKSB7XG4gICAgbGV0IHNwYWNlcyA9IFsnICcsICdcXG4nLCAnXFx0J11cbiAgICByZXR1cm4gbGlzdC5zcGxpdChzdHJpbmcsIHNwYWNlcylcbiAgfSxcblxuICBzcGxpdChzdHJpbmcsIHNlcGFyYXRvcnMsIGxhc3QpIHtcbiAgICBsZXQgYXJyYXkgPSBbXVxuICAgIGxldCBjdXJyZW50ID0gJydcbiAgICBsZXQgc3BsaXQgPSBmYWxzZVxuXG4gICAgbGV0IGZ1bmMgPSAwXG4gICAgbGV0IGluUXVvdGUgPSBmYWxzZVxuICAgIGxldCBwcmV2UXVvdGUgPSAnJ1xuICAgIGxldCBlc2NhcGUgPSBmYWxzZVxuXG4gICAgZm9yIChsZXQgbGV0dGVyIG9mIHN0cmluZykge1xuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBlc2NhcGUgPSBmYWxzZVxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICdcXFxcJykge1xuICAgICAgICBlc2NhcGUgPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKGluUXVvdGUpIHtcbiAgICAgICAgaWYgKGxldHRlciA9PT0gcHJldlF1b3RlKSB7XG4gICAgICAgICAgaW5RdW90ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnXCInIHx8IGxldHRlciA9PT0gXCInXCIpIHtcbiAgICAgICAgaW5RdW90ZSA9IHRydWVcbiAgICAgICAgcHJldlF1b3RlID0gbGV0dGVyXG4gICAgICB9IGVsc2UgaWYgKGxldHRlciA9PT0gJygnKSB7XG4gICAgICAgIGZ1bmMgKz0gMVxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICcpJykge1xuICAgICAgICBpZiAoZnVuYyA+IDApIGZ1bmMgLT0gMVxuICAgICAgfSBlbHNlIGlmIChmdW5jID09PSAwKSB7XG4gICAgICAgIGlmIChzZXBhcmF0b3JzLmluY2x1ZGVzKGxldHRlcikpIHNwbGl0ID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoc3BsaXQpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgIT09ICcnKSBhcnJheS5wdXNoKGN1cnJlbnQudHJpbSgpKVxuICAgICAgICBjdXJyZW50ID0gJydcbiAgICAgICAgc3BsaXQgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudCArPSBsZXR0ZXJcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobGFzdCB8fCBjdXJyZW50ICE9PSAnJykgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSlcbiAgICByZXR1cm4gYXJyYXlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3Rcbmxpc3QuZGVmYXVsdCA9IGxpc3RcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgeyBTb3VyY2VNYXBDb25zdW1lciwgU291cmNlTWFwR2VuZXJhdG9yIH0gPSByZXF1aXJlKCdzb3VyY2UtbWFwLWpzJylcbmxldCB7IGRpcm5hbWUsIHJlbGF0aXZlLCByZXNvbHZlLCBzZXAgfSA9IHJlcXVpcmUoJ3BhdGgnKVxubGV0IHsgcGF0aFRvRmlsZVVSTCB9ID0gcmVxdWlyZSgndXJsJylcblxubGV0IElucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpXG5cbmxldCBzb3VyY2VNYXBBdmFpbGFibGUgPSBCb29sZWFuKFNvdXJjZU1hcENvbnN1bWVyICYmIFNvdXJjZU1hcEdlbmVyYXRvcilcbmxldCBwYXRoQXZhaWxhYmxlID0gQm9vbGVhbihkaXJuYW1lICYmIHJlc29sdmUgJiYgcmVsYXRpdmUgJiYgc2VwKVxuXG5jbGFzcyBNYXBHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihzdHJpbmdpZnksIHJvb3QsIG9wdHMsIGNzc1N0cmluZykge1xuICAgIHRoaXMuc3RyaW5naWZ5ID0gc3RyaW5naWZ5XG4gICAgdGhpcy5tYXBPcHRzID0gb3B0cy5tYXAgfHwge31cbiAgICB0aGlzLnJvb3QgPSByb290XG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIHRoaXMuY3NzID0gY3NzU3RyaW5nXG4gICAgdGhpcy51c2VzRmlsZVVybHMgPSAhdGhpcy5tYXBPcHRzLmZyb20gJiYgdGhpcy5tYXBPcHRzLmFic29sdXRlXG5cbiAgICB0aGlzLm1lbW9pemVkRmlsZVVSTHMgPSBuZXcgTWFwKClcbiAgICB0aGlzLm1lbW9pemVkUGF0aHMgPSBuZXcgTWFwKClcbiAgICB0aGlzLm1lbW9pemVkVVJMcyA9IG5ldyBNYXAoKVxuICB9XG5cbiAgYWRkQW5ub3RhdGlvbigpIHtcbiAgICBsZXQgY29udGVudFxuXG4gICAgaWYgKHRoaXMuaXNJbmxpbmUoKSkge1xuICAgICAgY29udGVudCA9XG4gICAgICAgICdkYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyB0aGlzLnRvQmFzZTY0KHRoaXMubWFwLnRvU3RyaW5nKCkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb25cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29udGVudCA9IHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uKHRoaXMub3B0cy50bywgdGhpcy5yb290KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gdGhpcy5vdXRwdXRGaWxlKCkgKyAnLm1hcCdcbiAgICB9XG4gICAgbGV0IGVvbCA9ICdcXG4nXG4gICAgaWYgKHRoaXMuY3NzLmluY2x1ZGVzKCdcXHJcXG4nKSkgZW9sID0gJ1xcclxcbidcblxuICAgIHRoaXMuY3NzICs9IGVvbCArICcvKiMgc291cmNlTWFwcGluZ1VSTD0nICsgY29udGVudCArICcgKi8nXG4gIH1cblxuICBhcHBseVByZXZNYXBzKCkge1xuICAgIGZvciAobGV0IHByZXYgb2YgdGhpcy5wcmV2aW91cygpKSB7XG4gICAgICBsZXQgZnJvbSA9IHRoaXMudG9VcmwodGhpcy5wYXRoKHByZXYuZmlsZSkpXG4gICAgICBsZXQgcm9vdCA9IHByZXYucm9vdCB8fCBkaXJuYW1lKHByZXYuZmlsZSlcbiAgICAgIGxldCBtYXBcblxuICAgICAgaWYgKHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHByZXYudGV4dClcbiAgICAgICAgaWYgKG1hcC5zb3VyY2VzQ29udGVudCkge1xuICAgICAgICAgIG1hcC5zb3VyY2VzQ29udGVudCA9IG1hcC5zb3VyY2VzQ29udGVudC5tYXAoKCkgPT4gbnVsbClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwID0gcHJldi5jb25zdW1lcigpXG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFwLmFwcGx5U291cmNlTWFwKG1hcCwgZnJvbSwgdGhpcy50b1VybCh0aGlzLnBhdGgocm9vdCkpKVxuICAgIH1cbiAgfVxuXG4gIGNsZWFyQW5ub3RhdGlvbigpIHtcbiAgICBpZiAodGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09IGZhbHNlKSByZXR1cm5cblxuICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgIGxldCBub2RlXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5yb290Lm5vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLnJvb3Qubm9kZXNbaV1cbiAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ2NvbW1lbnQnKSBjb250aW51ZVxuICAgICAgICBpZiAobm9kZS50ZXh0LmluZGV4T2YoJyMgc291cmNlTWFwcGluZ1VSTD0nKSA9PT0gMCkge1xuICAgICAgICAgIHRoaXMucm9vdC5yZW1vdmVDaGlsZChpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNzcykge1xuICAgICAgdGhpcy5jc3MgPSB0aGlzLmNzcy5yZXBsYWNlKC8oXFxuKT9cXC9cXCojW1xcU1xcc10qP1xcKlxcLyQvZ20sICcnKVxuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlKCkge1xuICAgIHRoaXMuY2xlYXJBbm5vdGF0aW9uKClcbiAgICBpZiAocGF0aEF2YWlsYWJsZSAmJiBzb3VyY2VNYXBBdmFpbGFibGUgJiYgdGhpcy5pc01hcCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZU1hcCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXN1bHQgPSAnJ1xuICAgICAgdGhpcy5zdHJpbmdpZnkodGhpcy5yb290LCBpID0+IHtcbiAgICAgICAgcmVzdWx0ICs9IGlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gW3Jlc3VsdF1cbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZU1hcCgpIHtcbiAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICB0aGlzLmdlbmVyYXRlU3RyaW5nKClcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxldCBwcmV2ID0gdGhpcy5wcmV2aW91cygpWzBdLmNvbnN1bWVyKClcbiAgICAgIHByZXYuZmlsZSA9IHRoaXMub3V0cHV0RmlsZSgpXG4gICAgICB0aGlzLm1hcCA9IFNvdXJjZU1hcEdlbmVyYXRvci5mcm9tU291cmNlTWFwKHByZXYpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7IGZpbGU6IHRoaXMub3V0cHV0RmlsZSgpIH0pXG4gICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKHtcbiAgICAgICAgZ2VuZXJhdGVkOiB7IGNvbHVtbjogMCwgbGluZTogMSB9LFxuICAgICAgICBvcmlnaW5hbDogeyBjb2x1bW46IDAsIGxpbmU6IDEgfSxcbiAgICAgICAgc291cmNlOiB0aGlzLm9wdHMuZnJvbVxuICAgICAgICAgID8gdGhpcy50b1VybCh0aGlzLnBhdGgodGhpcy5vcHRzLmZyb20pKVxuICAgICAgICAgIDogJzxubyBzb3VyY2U+J1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1NvdXJjZXNDb250ZW50KCkpIHRoaXMuc2V0U291cmNlc0NvbnRlbnQoKVxuICAgIGlmICh0aGlzLnJvb3QgJiYgdGhpcy5wcmV2aW91cygpLmxlbmd0aCA+IDApIHRoaXMuYXBwbHlQcmV2TWFwcygpXG4gICAgaWYgKHRoaXMuaXNBbm5vdGF0aW9uKCkpIHRoaXMuYWRkQW5ub3RhdGlvbigpXG5cbiAgICBpZiAodGhpcy5pc0lubGluZSgpKSB7XG4gICAgICByZXR1cm4gW3RoaXMuY3NzXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3RoaXMuY3NzLCB0aGlzLm1hcF1cbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVN0cmluZygpIHtcbiAgICB0aGlzLmNzcyA9ICcnXG4gICAgdGhpcy5tYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHsgZmlsZTogdGhpcy5vdXRwdXRGaWxlKCkgfSlcblxuICAgIGxldCBsaW5lID0gMVxuICAgIGxldCBjb2x1bW4gPSAxXG5cbiAgICBsZXQgbm9Tb3VyY2UgPSAnPG5vIHNvdXJjZT4nXG4gICAgbGV0IG1hcHBpbmcgPSB7XG4gICAgICBnZW5lcmF0ZWQ6IHsgY29sdW1uOiAwLCBsaW5lOiAwIH0sXG4gICAgICBvcmlnaW5hbDogeyBjb2x1bW46IDAsIGxpbmU6IDAgfSxcbiAgICAgIHNvdXJjZTogJydcbiAgICB9XG5cbiAgICBsZXQgbGluZXMsIGxhc3RcbiAgICB0aGlzLnN0cmluZ2lmeSh0aGlzLnJvb3QsIChzdHIsIG5vZGUsIHR5cGUpID0+IHtcbiAgICAgIHRoaXMuY3NzICs9IHN0clxuXG4gICAgICBpZiAobm9kZSAmJiB0eXBlICE9PSAnZW5kJykge1xuICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5saW5lID0gbGluZVxuICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5jb2x1bW4gPSBjb2x1bW4gLSAxXG4gICAgICAgIGlmIChub2RlLnNvdXJjZSAmJiBub2RlLnNvdXJjZS5zdGFydCkge1xuICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gdGhpcy5zb3VyY2VQYXRoKG5vZGUpXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gbm9kZS5zb3VyY2Uuc3RhcnQubGluZVxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwuY29sdW1uID0gbm9kZS5zb3VyY2Uuc3RhcnQuY29sdW1uIC0gMVxuICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcobWFwcGluZylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IG5vU291cmNlXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gMVxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwuY29sdW1uID0gMFxuICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcobWFwcGluZylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaW5lcyA9IHN0ci5tYXRjaCgvXFxuL2cpXG4gICAgICBpZiAobGluZXMpIHtcbiAgICAgICAgbGluZSArPSBsaW5lcy5sZW5ndGhcbiAgICAgICAgbGFzdCA9IHN0ci5sYXN0SW5kZXhPZignXFxuJylcbiAgICAgICAgY29sdW1uID0gc3RyLmxlbmd0aCAtIGxhc3RcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbiArPSBzdHIubGVuZ3RoXG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlICYmIHR5cGUgIT09ICdzdGFydCcpIHtcbiAgICAgICAgbGV0IHAgPSBub2RlLnBhcmVudCB8fCB7IHJhd3M6IHt9IH1cbiAgICAgICAgbGV0IGNoaWxkbGVzcyA9XG4gICAgICAgICAgbm9kZS50eXBlID09PSAnZGVjbCcgfHwgKG5vZGUudHlwZSA9PT0gJ2F0cnVsZScgJiYgIW5vZGUubm9kZXMpXG4gICAgICAgIGlmICghY2hpbGRsZXNzIHx8IG5vZGUgIT09IHAubGFzdCB8fCBwLnJhd3Muc2VtaWNvbG9uKSB7XG4gICAgICAgICAgaWYgKG5vZGUuc291cmNlICYmIG5vZGUuc291cmNlLmVuZCkge1xuICAgICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSB0aGlzLnNvdXJjZVBhdGgobm9kZSlcbiAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwubGluZSA9IG5vZGUuc291cmNlLmVuZC5saW5lXG4gICAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmNvbHVtbiA9IG5vZGUuc291cmNlLmVuZC5jb2x1bW4gLSAxXG4gICAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5saW5lID0gbGluZVxuICAgICAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQuY29sdW1uID0gY29sdW1uIC0gMlxuICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyhtYXBwaW5nKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IG5vU291cmNlXG4gICAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmxpbmUgPSAxXG4gICAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmNvbHVtbiA9IDBcbiAgICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmxpbmUgPSBsaW5lXG4gICAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5jb2x1bW4gPSBjb2x1bW4gLSAxXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKG1hcHBpbmcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlzQW5ub3RhdGlvbigpIHtcbiAgICBpZiAodGhpcy5pc0lubGluZSgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uXG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmV2aW91cygpLnNvbWUoaSA9PiBpLmFubm90YXRpb24pXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpc0lubGluZSgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5pbmxpbmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLmlubGluZVxuICAgIH1cblxuICAgIGxldCBhbm5vdGF0aW9uID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb25cbiAgICBpZiAodHlwZW9mIGFubm90YXRpb24gIT09ICd1bmRlZmluZWQnICYmIGFubm90YXRpb24gIT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByZXZpb3VzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmV2aW91cygpLnNvbWUoaSA9PiBpLmlubGluZSlcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlzTWFwKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLm1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAhIXRoaXMub3B0cy5tYXBcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5sZW5ndGggPiAwXG4gIH1cblxuICBpc1NvdXJjZXNDb250ZW50KCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudFxuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKGkgPT4gaS53aXRoQ29udGVudCgpKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgb3V0cHV0RmlsZSgpIHtcbiAgICBpZiAodGhpcy5vcHRzLnRvKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoKHRoaXMub3B0cy50bylcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0cy5mcm9tKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoKHRoaXMub3B0cy5mcm9tKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ3RvLmNzcydcbiAgICB9XG4gIH1cblxuICBwYXRoKGZpbGUpIHtcbiAgICBpZiAodGhpcy5tYXBPcHRzLmFic29sdXRlKSByZXR1cm4gZmlsZVxuICAgIGlmIChmaWxlLmNoYXJDb2RlQXQoMCkgPT09IDYwIC8qIGA8YCAqLykgcmV0dXJuIGZpbGVcbiAgICBpZiAoL15cXHcrOlxcL1xcLy8udGVzdChmaWxlKSkgcmV0dXJuIGZpbGVcbiAgICBsZXQgY2FjaGVkID0gdGhpcy5tZW1vaXplZFBhdGhzLmdldChmaWxlKVxuICAgIGlmIChjYWNoZWQpIHJldHVybiBjYWNoZWRcblxuICAgIGxldCBmcm9tID0gdGhpcy5vcHRzLnRvID8gZGlybmFtZSh0aGlzLm9wdHMudG8pIDogJy4nXG5cbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgZnJvbSA9IGRpcm5hbWUocmVzb2x2ZShmcm9tLCB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbikpXG4gICAgfVxuXG4gICAgbGV0IHBhdGggPSByZWxhdGl2ZShmcm9tLCBmaWxlKVxuICAgIHRoaXMubWVtb2l6ZWRQYXRocy5zZXQoZmlsZSwgcGF0aClcblxuICAgIHJldHVybiBwYXRoXG4gIH1cblxuICBwcmV2aW91cygpIHtcbiAgICBpZiAoIXRoaXMucHJldmlvdXNNYXBzKSB7XG4gICAgICB0aGlzLnByZXZpb3VzTWFwcyA9IFtdXG4gICAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICAgIHRoaXMucm9vdC53YWxrKG5vZGUgPT4ge1xuICAgICAgICAgIGlmIChub2RlLnNvdXJjZSAmJiBub2RlLnNvdXJjZS5pbnB1dC5tYXApIHtcbiAgICAgICAgICAgIGxldCBtYXAgPSBub2RlLnNvdXJjZS5pbnB1dC5tYXBcbiAgICAgICAgICAgIGlmICghdGhpcy5wcmV2aW91c01hcHMuaW5jbHVkZXMobWFwKSkge1xuICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzTWFwcy5wdXNoKG1hcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaW5wdXQgPSBuZXcgSW5wdXQodGhpcy5jc3MsIHRoaXMub3B0cylcbiAgICAgICAgaWYgKGlucHV0Lm1hcCkgdGhpcy5wcmV2aW91c01hcHMucHVzaChpbnB1dC5tYXApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucHJldmlvdXNNYXBzXG4gIH1cblxuICBzZXRTb3VyY2VzQ29udGVudCgpIHtcbiAgICBsZXQgYWxyZWFkeSA9IHt9XG4gICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgdGhpcy5yb290LndhbGsobm9kZSA9PiB7XG4gICAgICAgIGlmIChub2RlLnNvdXJjZSkge1xuICAgICAgICAgIGxldCBmcm9tID0gbm9kZS5zb3VyY2UuaW5wdXQuZnJvbVxuICAgICAgICAgIGlmIChmcm9tICYmICFhbHJlYWR5W2Zyb21dKSB7XG4gICAgICAgICAgICBhbHJlYWR5W2Zyb21dID0gdHJ1ZVxuICAgICAgICAgICAgbGV0IGZyb21VcmwgPSB0aGlzLnVzZXNGaWxlVXJsc1xuICAgICAgICAgICAgICA/IHRoaXMudG9GaWxlVXJsKGZyb20pXG4gICAgICAgICAgICAgIDogdGhpcy50b1VybCh0aGlzLnBhdGgoZnJvbSkpXG4gICAgICAgICAgICB0aGlzLm1hcC5zZXRTb3VyY2VDb250ZW50KGZyb21VcmwsIG5vZGUuc291cmNlLmlucHV0LmNzcylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmNzcykge1xuICAgICAgbGV0IGZyb20gPSB0aGlzLm9wdHMuZnJvbVxuICAgICAgICA/IHRoaXMudG9VcmwodGhpcy5wYXRoKHRoaXMub3B0cy5mcm9tKSlcbiAgICAgICAgOiAnPG5vIHNvdXJjZT4nXG4gICAgICB0aGlzLm1hcC5zZXRTb3VyY2VDb250ZW50KGZyb20sIHRoaXMuY3NzKVxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZVBhdGgobm9kZSkge1xuICAgIGlmICh0aGlzLm1hcE9wdHMuZnJvbSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9VcmwodGhpcy5tYXBPcHRzLmZyb20pXG4gICAgfSBlbHNlIGlmICh0aGlzLnVzZXNGaWxlVXJscykge1xuICAgICAgcmV0dXJuIHRoaXMudG9GaWxlVXJsKG5vZGUuc291cmNlLmlucHV0LmZyb20pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRvVXJsKHRoaXMucGF0aChub2RlLnNvdXJjZS5pbnB1dC5mcm9tKSlcbiAgICB9XG4gIH1cblxuICB0b0Jhc2U2NChzdHIpIHtcbiAgICBpZiAoQnVmZmVyKSB7XG4gICAgICByZXR1cm4gQnVmZmVyLmZyb20oc3RyKS50b1N0cmluZygnYmFzZTY0JylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSlcbiAgICB9XG4gIH1cblxuICB0b0ZpbGVVcmwocGF0aCkge1xuICAgIGxldCBjYWNoZWQgPSB0aGlzLm1lbW9pemVkRmlsZVVSTHMuZ2V0KHBhdGgpXG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZFxuXG4gICAgaWYgKHBhdGhUb0ZpbGVVUkwpIHtcbiAgICAgIGxldCBmaWxlVVJMID0gcGF0aFRvRmlsZVVSTChwYXRoKS50b1N0cmluZygpXG4gICAgICB0aGlzLm1lbW9pemVkRmlsZVVSTHMuc2V0KHBhdGgsIGZpbGVVUkwpXG5cbiAgICAgIHJldHVybiBmaWxlVVJMXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2BtYXAuYWJzb2x1dGVgIG9wdGlvbiBpcyBub3QgYXZhaWxhYmxlIGluIHRoaXMgUG9zdENTUyBidWlsZCdcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICB0b1VybChwYXRoKSB7XG4gICAgbGV0IGNhY2hlZCA9IHRoaXMubWVtb2l6ZWRVUkxzLmdldChwYXRoKVxuICAgIGlmIChjYWNoZWQpIHJldHVybiBjYWNoZWRcblxuICAgIGlmIChzZXAgPT09ICdcXFxcJykge1xuICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFxcXC9nLCAnLycpXG4gICAgfVxuXG4gICAgbGV0IHVybCA9IGVuY29kZVVSSShwYXRoKS5yZXBsYWNlKC9bIz9dL2csIGVuY29kZVVSSUNvbXBvbmVudClcbiAgICB0aGlzLm1lbW9pemVkVVJMcy5zZXQocGF0aCwgdXJsKVxuXG4gICAgcmV0dXJuIHVybFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwR2VuZXJhdG9yXG4iLCIndXNlIHN0cmljdCdcblxubGV0IE1hcEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vbWFwLWdlbmVyYXRvcicpXG5sZXQgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKVxubGV0IHdhcm5PbmNlID0gcmVxdWlyZSgnLi93YXJuLW9uY2UnKVxubGV0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBSZXN1bHQgPSByZXF1aXJlKCcuL3Jlc3VsdCcpXG5cbmNsYXNzIE5vV29ya1Jlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByb2Nlc3NvciwgY3NzLCBvcHRzKSB7XG4gICAgY3NzID0gY3NzLnRvU3RyaW5nKClcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gZmFsc2VcblxuICAgIHRoaXMuX3Byb2Nlc3NvciA9IHByb2Nlc3NvclxuICAgIHRoaXMuX2NzcyA9IGNzc1xuICAgIHRoaXMuX29wdHMgPSBvcHRzXG4gICAgdGhpcy5fbWFwID0gdW5kZWZpbmVkXG4gICAgbGV0IHJvb3RcblxuICAgIGxldCBzdHIgPSBzdHJpbmdpZnlcbiAgICB0aGlzLnJlc3VsdCA9IG5ldyBSZXN1bHQodGhpcy5fcHJvY2Vzc29yLCByb290LCB0aGlzLl9vcHRzKVxuICAgIHRoaXMucmVzdWx0LmNzcyA9IGNzc1xuXG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucmVzdWx0LCAncm9vdCcsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYucm9vdFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgbWFwID0gbmV3IE1hcEdlbmVyYXRvcihzdHIsIHJvb3QsIHRoaXMuX29wdHMsIGNzcylcbiAgICBpZiAobWFwLmlzTWFwKCkpIHtcbiAgICAgIGxldCBbZ2VuZXJhdGVkQ1NTLCBnZW5lcmF0ZWRNYXBdID0gbWFwLmdlbmVyYXRlKClcbiAgICAgIGlmIChnZW5lcmF0ZWRDU1MpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuY3NzID0gZ2VuZXJhdGVkQ1NTXG4gICAgICB9XG4gICAgICBpZiAoZ2VuZXJhdGVkTWFwKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm1hcCA9IGdlbmVyYXRlZE1hcFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jKCkge1xuICAgIGlmICh0aGlzLmVycm9yKSByZXR1cm4gUHJvbWlzZS5yZWplY3QodGhpcy5lcnJvcilcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucmVzdWx0KVxuICB9XG5cbiAgY2F0Y2gob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkuY2F0Y2gob25SZWplY3RlZClcbiAgfVxuXG4gIGZpbmFsbHkob25GaW5hbGx5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRmluYWxseSwgb25GaW5hbGx5KVxuICB9XG5cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5lcnJvcikgdGhyb3cgdGhpcy5lcnJvclxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG5cbiAgdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoISgnZnJvbScgaW4gdGhpcy5fb3B0cykpIHtcbiAgICAgICAgd2Fybk9uY2UoXG4gICAgICAgICAgJ1dpdGhvdXQgYGZyb21gIG9wdGlvbiBQb3N0Q1NTIGNvdWxkIGdlbmVyYXRlIHdyb25nIHNvdXJjZSBtYXAgJyArXG4gICAgICAgICAgICAnYW5kIHdpbGwgbm90IGZpbmQgQnJvd3NlcnNsaXN0IGNvbmZpZy4gU2V0IGl0IHRvIENTUyBmaWxlIHBhdGggJyArXG4gICAgICAgICAgICAnb3IgdG8gYHVuZGVmaW5lZGAgdG8gcHJldmVudCB0aGlzIHdhcm5pbmcuJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nzc1xuICB9XG5cbiAgd2FybmluZ3MoKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQuY3NzXG4gIH1cblxuICBnZXQgY3NzKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5jc3NcbiAgfVxuXG4gIGdldCBtYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0Lm1hcFxuICB9XG5cbiAgZ2V0IG1lc3NhZ2VzKCkge1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgZ2V0IG9wdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0Lm9wdHNcbiAgfVxuXG4gIGdldCBwcm9jZXNzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LnByb2Nlc3NvclxuICB9XG5cbiAgZ2V0IHJvb3QoKSB7XG4gICAgaWYgKHRoaXMuX3Jvb3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yb290XG4gICAgfVxuXG4gICAgbGV0IHJvb3RcbiAgICBsZXQgcGFyc2VyID0gcGFyc2VcblxuICAgIHRyeSB7XG4gICAgICByb290ID0gcGFyc2VyKHRoaXMuX2NzcywgdGhpcy5fb3B0cylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5lcnJvciA9IGVycm9yXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZXJyb3IpIHtcbiAgICAgIHRocm93IHRoaXMuZXJyb3JcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcm9vdCA9IHJvb3RcbiAgICAgIHJldHVybiByb290XG4gICAgfVxuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnTm9Xb3JrUmVzdWx0J1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9Xb3JrUmVzdWx0XG5Ob1dvcmtSZXN1bHQuZGVmYXVsdCA9IE5vV29ya1Jlc3VsdFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCB7IGlzQ2xlYW4sIG15IH0gPSByZXF1aXJlKCcuL3N5bWJvbHMnKVxubGV0IENzc1N5bnRheEVycm9yID0gcmVxdWlyZSgnLi9jc3Mtc3ludGF4LWVycm9yJylcbmxldCBTdHJpbmdpZmllciA9IHJlcXVpcmUoJy4vc3RyaW5naWZpZXInKVxubGV0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5JylcblxuZnVuY3Rpb24gY2xvbmVOb2RlKG9iaiwgcGFyZW50KSB7XG4gIGxldCBjbG9uZWQgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKClcblxuICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIHtcbiAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDIgKi9cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmIChpID09PSAncHJveHlDYWNoZScpIGNvbnRpbnVlXG4gICAgbGV0IHZhbHVlID0gb2JqW2ldXG4gICAgbGV0IHR5cGUgPSB0eXBlb2YgdmFsdWVcblxuICAgIGlmIChpID09PSAncGFyZW50JyAmJiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHBhcmVudCkgY2xvbmVkW2ldID0gcGFyZW50XG4gICAgfSBlbHNlIGlmIChpID09PSAnc291cmNlJykge1xuICAgICAgY2xvbmVkW2ldID0gdmFsdWVcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZS5tYXAoaiA9PiBjbG9uZU5vZGUoaiwgY2xvbmVkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB2YWx1ZSA9IGNsb25lTm9kZSh2YWx1ZSlcbiAgICAgIGNsb25lZFtpXSA9IHZhbHVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNsb25lZFxufVxuXG5jbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMgPSB7fSkge1xuICAgIHRoaXMucmF3cyA9IHt9XG4gICAgdGhpc1tpc0NsZWFuXSA9IGZhbHNlXG4gICAgdGhpc1tteV0gPSB0cnVlXG5cbiAgICBmb3IgKGxldCBuYW1lIGluIGRlZmF1bHRzKSB7XG4gICAgICBpZiAobmFtZSA9PT0gJ25vZGVzJykge1xuICAgICAgICB0aGlzLm5vZGVzID0gW11cbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBkZWZhdWx0c1tuYW1lXSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5hcHBlbmQobm9kZS5jbG9uZSgpKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZChub2RlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1tuYW1lXSA9IGRlZmF1bHRzW25hbWVdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkVG9FcnJvcihlcnJvcikge1xuICAgIGVycm9yLnBvc3Rjc3NOb2RlID0gdGhpc1xuICAgIGlmIChlcnJvci5zdGFjayAmJiB0aGlzLnNvdXJjZSAmJiAvXFxuXFxzezR9YXQgLy50ZXN0KGVycm9yLnN0YWNrKSkge1xuICAgICAgbGV0IHMgPSB0aGlzLnNvdXJjZVxuICAgICAgZXJyb3Iuc3RhY2sgPSBlcnJvci5zdGFjay5yZXBsYWNlKFxuICAgICAgICAvXFxuXFxzezR9YXQgLyxcbiAgICAgICAgYCQmJHtzLmlucHV0LmZyb219OiR7cy5zdGFydC5saW5lfToke3Muc3RhcnQuY29sdW1ufSQmYFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gZXJyb3JcbiAgfVxuXG4gIGFmdGVyKGFkZCkge1xuICAgIHRoaXMucGFyZW50Lmluc2VydEFmdGVyKHRoaXMsIGFkZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYXNzaWduKG92ZXJyaWRlcyA9IHt9KSB7XG4gICAgZm9yIChsZXQgbmFtZSBpbiBvdmVycmlkZXMpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBvdmVycmlkZXNbbmFtZV1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGJlZm9yZShhZGQpIHtcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgYWRkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjbGVhblJhd3Moa2VlcEJldHdlZW4pIHtcbiAgICBkZWxldGUgdGhpcy5yYXdzLmJlZm9yZVxuICAgIGRlbGV0ZSB0aGlzLnJhd3MuYWZ0ZXJcbiAgICBpZiAoIWtlZXBCZXR3ZWVuKSBkZWxldGUgdGhpcy5yYXdzLmJldHdlZW5cbiAgfVxuXG4gIGNsb25lKG92ZXJyaWRlcyA9IHt9KSB7XG4gICAgbGV0IGNsb25lZCA9IGNsb25lTm9kZSh0aGlzKVxuICAgIGZvciAobGV0IG5hbWUgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICBjbG9uZWRbbmFtZV0gPSBvdmVycmlkZXNbbmFtZV1cbiAgICB9XG4gICAgcmV0dXJuIGNsb25lZFxuICB9XG5cbiAgY2xvbmVBZnRlcihvdmVycmlkZXMgPSB7fSkge1xuICAgIGxldCBjbG9uZWQgPSB0aGlzLmNsb25lKG92ZXJyaWRlcylcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRBZnRlcih0aGlzLCBjbG9uZWQpXG4gICAgcmV0dXJuIGNsb25lZFxuICB9XG5cbiAgY2xvbmVCZWZvcmUob3ZlcnJpZGVzID0ge30pIHtcbiAgICBsZXQgY2xvbmVkID0gdGhpcy5jbG9uZShvdmVycmlkZXMpXG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIGNsb25lZClcbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICBlcnJvcihtZXNzYWdlLCBvcHRzID0ge30pIHtcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIGxldCB7IGVuZCwgc3RhcnQgfSA9IHRoaXMucmFuZ2VCeShvcHRzKVxuICAgICAgcmV0dXJuIHRoaXMuc291cmNlLmlucHV0LmVycm9yKFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICB7IGNvbHVtbjogc3RhcnQuY29sdW1uLCBsaW5lOiBzdGFydC5saW5lIH0sXG4gICAgICAgIHsgY29sdW1uOiBlbmQuY29sdW1uLCBsaW5lOiBlbmQubGluZSB9LFxuICAgICAgICBvcHRzXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBuZXcgQ3NzU3ludGF4RXJyb3IobWVzc2FnZSlcbiAgfVxuXG4gIGdldFByb3h5UHJvY2Vzc29yKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXQobm9kZSwgcHJvcCkge1xuICAgICAgICBpZiAocHJvcCA9PT0gJ3Byb3h5T2YnKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSAncm9vdCcpIHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4gbm9kZS5yb290KCkudG9Qcm94eSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVbcHJvcF1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgc2V0KG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIGlmIChub2RlW3Byb3BdID09PSB2YWx1ZSkgcmV0dXJuIHRydWVcbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wID09PSAncHJvcCcgfHxcbiAgICAgICAgICBwcm9wID09PSAndmFsdWUnIHx8XG4gICAgICAgICAgcHJvcCA9PT0gJ25hbWUnIHx8XG4gICAgICAgICAgcHJvcCA9PT0gJ3BhcmFtcycgfHxcbiAgICAgICAgICBwcm9wID09PSAnaW1wb3J0YW50JyB8fFxuICAgICAgICAgIC8qIGM4IGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgcHJvcCA9PT0gJ3RleHQnXG4gICAgICAgICkge1xuICAgICAgICAgIG5vZGUubWFya0RpcnR5KClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1hcmtEaXJ0eSgpIHtcbiAgICBpZiAodGhpc1tpc0NsZWFuXSkge1xuICAgICAgdGhpc1tpc0NsZWFuXSA9IGZhbHNlXG4gICAgICBsZXQgbmV4dCA9IHRoaXNcbiAgICAgIHdoaWxlICgobmV4dCA9IG5leHQucGFyZW50KSkge1xuICAgICAgICBuZXh0W2lzQ2xlYW5dID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZXh0KCkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybiB1bmRlZmluZWRcbiAgICBsZXQgaW5kZXggPSB0aGlzLnBhcmVudC5pbmRleCh0aGlzKVxuICAgIHJldHVybiB0aGlzLnBhcmVudC5ub2Rlc1tpbmRleCArIDFdXG4gIH1cblxuICBwb3NpdGlvbkJ5KG9wdHMsIHN0cmluZ1JlcHJlc2VudGF0aW9uKSB7XG4gICAgbGV0IHBvcyA9IHRoaXMuc291cmNlLnN0YXJ0XG4gICAgaWYgKG9wdHMuaW5kZXgpIHtcbiAgICAgIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5pbmRleCwgc3RyaW5nUmVwcmVzZW50YXRpb24pXG4gICAgfSBlbHNlIGlmIChvcHRzLndvcmQpIHtcbiAgICAgIHN0cmluZ1JlcHJlc2VudGF0aW9uID0gdGhpcy50b1N0cmluZygpXG4gICAgICBsZXQgaW5kZXggPSBzdHJpbmdSZXByZXNlbnRhdGlvbi5pbmRleE9mKG9wdHMud29yZClcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUoaW5kZXgsIHN0cmluZ1JlcHJlc2VudGF0aW9uKVxuICAgIH1cbiAgICByZXR1cm4gcG9zXG4gIH1cblxuICBwb3NpdGlvbkluc2lkZShpbmRleCwgc3RyaW5nUmVwcmVzZW50YXRpb24pIHtcbiAgICBsZXQgc3RyaW5nID0gc3RyaW5nUmVwcmVzZW50YXRpb24gfHwgdGhpcy50b1N0cmluZygpXG4gICAgbGV0IGNvbHVtbiA9IHRoaXMuc291cmNlLnN0YXJ0LmNvbHVtblxuICAgIGxldCBsaW5lID0gdGhpcy5zb3VyY2Uuc3RhcnQubGluZVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgICBpZiAoc3RyaW5nW2ldID09PSAnXFxuJykge1xuICAgICAgICBjb2x1bW4gPSAxXG4gICAgICAgIGxpbmUgKz0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uICs9IDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBjb2x1bW4sIGxpbmUgfVxuICB9XG5cbiAgcHJldigpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcylcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQubm9kZXNbaW5kZXggLSAxXVxuICB9XG5cbiAgcmFuZ2VCeShvcHRzKSB7XG4gICAgbGV0IHN0YXJ0ID0ge1xuICAgICAgY29sdW1uOiB0aGlzLnNvdXJjZS5zdGFydC5jb2x1bW4sXG4gICAgICBsaW5lOiB0aGlzLnNvdXJjZS5zdGFydC5saW5lXG4gICAgfVxuICAgIGxldCBlbmQgPSB0aGlzLnNvdXJjZS5lbmRcbiAgICAgID8ge1xuICAgICAgICBjb2x1bW46IHRoaXMuc291cmNlLmVuZC5jb2x1bW4gKyAxLFxuICAgICAgICBsaW5lOiB0aGlzLnNvdXJjZS5lbmQubGluZVxuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIGNvbHVtbjogc3RhcnQuY29sdW1uICsgMSxcbiAgICAgICAgbGluZTogc3RhcnQubGluZVxuICAgICAgfVxuXG4gICAgaWYgKG9wdHMud29yZCkge1xuICAgICAgbGV0IHN0cmluZ1JlcHJlc2VudGF0aW9uID0gdGhpcy50b1N0cmluZygpXG4gICAgICBsZXQgaW5kZXggPSBzdHJpbmdSZXByZXNlbnRhdGlvbi5pbmRleE9mKG9wdHMud29yZClcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3RhcnQgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKGluZGV4LCBzdHJpbmdSZXByZXNlbnRhdGlvbilcbiAgICAgICAgZW5kID0gdGhpcy5wb3NpdGlvbkluc2lkZShpbmRleCArIG9wdHMud29yZC5sZW5ndGgsIHN0cmluZ1JlcHJlc2VudGF0aW9uKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0cy5zdGFydCkge1xuICAgICAgICBzdGFydCA9IHtcbiAgICAgICAgICBjb2x1bW46IG9wdHMuc3RhcnQuY29sdW1uLFxuICAgICAgICAgIGxpbmU6IG9wdHMuc3RhcnQubGluZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuaW5kZXgpIHtcbiAgICAgICAgc3RhcnQgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKG9wdHMuaW5kZXgpXG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLmVuZCkge1xuICAgICAgICBlbmQgPSB7XG4gICAgICAgICAgY29sdW1uOiBvcHRzLmVuZC5jb2x1bW4sXG4gICAgICAgICAgbGluZTogb3B0cy5lbmQubGluZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZW5kSW5kZXgpIHtcbiAgICAgICAgZW5kID0gdGhpcy5wb3NpdGlvbkluc2lkZShvcHRzLmVuZEluZGV4KVxuICAgICAgfSBlbHNlIGlmIChvcHRzLmluZGV4KSB7XG4gICAgICAgIGVuZCA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5pbmRleCArIDEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZW5kLmxpbmUgPCBzdGFydC5saW5lIHx8XG4gICAgICAoZW5kLmxpbmUgPT09IHN0YXJ0LmxpbmUgJiYgZW5kLmNvbHVtbiA8PSBzdGFydC5jb2x1bW4pXG4gICAgKSB7XG4gICAgICBlbmQgPSB7IGNvbHVtbjogc3RhcnQuY29sdW1uICsgMSwgbGluZTogc3RhcnQubGluZSB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZW5kLCBzdGFydCB9XG4gIH1cblxuICByYXcocHJvcCwgZGVmYXVsdFR5cGUpIHtcbiAgICBsZXQgc3RyID0gbmV3IFN0cmluZ2lmaWVyKClcbiAgICByZXR1cm4gc3RyLnJhdyh0aGlzLCBwcm9wLCBkZWZhdWx0VHlwZSlcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpXG4gICAgfVxuICAgIHRoaXMucGFyZW50ID0gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlcGxhY2VXaXRoKC4uLm5vZGVzKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICBsZXQgYm9va21hcmsgPSB0aGlzXG4gICAgICBsZXQgZm91bmRTZWxmID0gZmFsc2VcbiAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IHRoaXMpIHtcbiAgICAgICAgICBmb3VuZFNlbGYgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAoZm91bmRTZWxmKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIoYm9va21hcmssIG5vZGUpXG4gICAgICAgICAgYm9va21hcmsgPSBub2RlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKGJvb2ttYXJrLCBub2RlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZm91bmRTZWxmKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcm9vdCgpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpc1xuICAgIHdoaWxlIChyZXN1bHQucGFyZW50ICYmIHJlc3VsdC5wYXJlbnQudHlwZSAhPT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnBhcmVudFxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB0b0pTT04oXywgaW5wdXRzKSB7XG4gICAgbGV0IGZpeGVkID0ge31cbiAgICBsZXQgZW1pdElucHV0cyA9IGlucHV0cyA9PSBudWxsXG4gICAgaW5wdXRzID0gaW5wdXRzIHx8IG5ldyBNYXAoKVxuICAgIGxldCBpbnB1dHNOZXh0SW5kZXggPSAwXG5cbiAgICBmb3IgKGxldCBuYW1lIGluIHRoaXMpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsIG5hbWUpKSB7XG4gICAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDIgKi9cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lID09PSAncGFyZW50JyB8fCBuYW1lID09PSAncHJveHlDYWNoZScpIGNvbnRpbnVlXG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW25hbWVdXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLm1hcChpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIGkudG9KU09OKSB7XG4gICAgICAgICAgICByZXR1cm4gaS50b0pTT04obnVsbCwgaW5wdXRzKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS50b0pTT04pIHtcbiAgICAgICAgZml4ZWRbbmFtZV0gPSB2YWx1ZS50b0pTT04obnVsbCwgaW5wdXRzKVxuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnc291cmNlJykge1xuICAgICAgICBsZXQgaW5wdXRJZCA9IGlucHV0cy5nZXQodmFsdWUuaW5wdXQpXG4gICAgICAgIGlmIChpbnB1dElkID09IG51bGwpIHtcbiAgICAgICAgICBpbnB1dElkID0gaW5wdXRzTmV4dEluZGV4XG4gICAgICAgICAgaW5wdXRzLnNldCh2YWx1ZS5pbnB1dCwgaW5wdXRzTmV4dEluZGV4KVxuICAgICAgICAgIGlucHV0c05leHRJbmRleCsrXG4gICAgICAgIH1cbiAgICAgICAgZml4ZWRbbmFtZV0gPSB7XG4gICAgICAgICAgZW5kOiB2YWx1ZS5lbmQsXG4gICAgICAgICAgaW5wdXRJZCxcbiAgICAgICAgICBzdGFydDogdmFsdWUuc3RhcnRcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZml4ZWRbbmFtZV0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbWl0SW5wdXRzKSB7XG4gICAgICBmaXhlZC5pbnB1dHMgPSBbLi4uaW5wdXRzLmtleXMoKV0ubWFwKGlucHV0ID0+IGlucHV0LnRvSlNPTigpKVxuICAgIH1cblxuICAgIHJldHVybiBmaXhlZFxuICB9XG5cbiAgdG9Qcm94eSgpIHtcbiAgICBpZiAoIXRoaXMucHJveHlDYWNoZSkge1xuICAgICAgdGhpcy5wcm94eUNhY2hlID0gbmV3IFByb3h5KHRoaXMsIHRoaXMuZ2V0UHJveHlQcm9jZXNzb3IoKSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJveHlDYWNoZVxuICB9XG5cbiAgdG9TdHJpbmcoc3RyaW5naWZpZXIgPSBzdHJpbmdpZnkpIHtcbiAgICBpZiAoc3RyaW5naWZpZXIuc3RyaW5naWZ5KSBzdHJpbmdpZmllciA9IHN0cmluZ2lmaWVyLnN0cmluZ2lmeVxuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIHN0cmluZ2lmaWVyKHRoaXMsIGkgPT4ge1xuICAgICAgcmVzdWx0ICs9IGlcbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHdhcm4ocmVzdWx0LCB0ZXh0LCBvcHRzKSB7XG4gICAgbGV0IGRhdGEgPSB7IG5vZGU6IHRoaXMgfVxuICAgIGZvciAobGV0IGkgaW4gb3B0cykgZGF0YVtpXSA9IG9wdHNbaV1cbiAgICByZXR1cm4gcmVzdWx0Lndhcm4odGV4dCwgZGF0YSlcbiAgfVxuXG4gIGdldCBwcm94eU9mKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlXG5Ob2RlLmRlZmF1bHQgPSBOb2RlXG4iLCIndXNlIHN0cmljdCdcblxubGV0IENvbnRhaW5lciA9IHJlcXVpcmUoJy4vY29udGFpbmVyJylcbmxldCBQYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcicpXG5sZXQgSW5wdXQgPSByZXF1aXJlKCcuL2lucHV0JylcblxuZnVuY3Rpb24gcGFyc2UoY3NzLCBvcHRzKSB7XG4gIGxldCBpbnB1dCA9IG5ldyBJbnB1dChjc3MsIG9wdHMpXG4gIGxldCBwYXJzZXIgPSBuZXcgUGFyc2VyKGlucHV0KVxuICB0cnkge1xuICAgIHBhcnNlci5wYXJzZSgpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGUubmFtZSA9PT0gJ0Nzc1N5bnRheEVycm9yJyAmJiBvcHRzICYmIG9wdHMuZnJvbSkge1xuICAgICAgICBpZiAoL1xcLnNjc3MkL2kudGVzdChvcHRzLmZyb20pKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9XG4gICAgICAgICAgICAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIFNDU1Mgd2l0aCAnICtcbiAgICAgICAgICAgICd0aGUgc3RhbmRhcmQgQ1NTIHBhcnNlcjsgJyArXG4gICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2NzcyBwYXJzZXInXG4gICAgICAgIH0gZWxzZSBpZiAoL1xcLnNhc3MvaS50ZXN0KG9wdHMuZnJvbSkpIHtcbiAgICAgICAgICBlLm1lc3NhZ2UgKz1cbiAgICAgICAgICAgICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU2FzcyB3aXRoICcgK1xuICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICd0cnkgYWdhaW4gd2l0aCB0aGUgcG9zdGNzcy1zYXNzIHBhcnNlcidcbiAgICAgICAgfSBlbHNlIGlmICgvXFwubGVzcyQvaS50ZXN0KG9wdHMuZnJvbSkpIHtcbiAgICAgICAgICBlLm1lc3NhZ2UgKz1cbiAgICAgICAgICAgICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgTGVzcyB3aXRoICcgK1xuICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICd0cnkgYWdhaW4gd2l0aCB0aGUgcG9zdGNzcy1sZXNzIHBhcnNlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBlXG4gIH1cblxuICByZXR1cm4gcGFyc2VyLnJvb3Rcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxucGFyc2UuZGVmYXVsdCA9IHBhcnNlXG5cbkNvbnRhaW5lci5yZWdpc3RlclBhcnNlKHBhcnNlKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBEZWNsYXJhdGlvbiA9IHJlcXVpcmUoJy4vZGVjbGFyYXRpb24nKVxubGV0IHRva2VuaXplciA9IHJlcXVpcmUoJy4vdG9rZW5pemUnKVxubGV0IENvbW1lbnQgPSByZXF1aXJlKCcuL2NvbW1lbnQnKVxubGV0IEF0UnVsZSA9IHJlcXVpcmUoJy4vYXQtcnVsZScpXG5sZXQgUm9vdCA9IHJlcXVpcmUoJy4vcm9vdCcpXG5sZXQgUnVsZSA9IHJlcXVpcmUoJy4vcnVsZScpXG5cbmNvbnN0IFNBRkVfQ09NTUVOVF9ORUlHSEJPUiA9IHtcbiAgZW1wdHk6IHRydWUsXG4gIHNwYWNlOiB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpbmRMYXN0V2l0aFBvc2l0aW9uKHRva2Vucykge1xuICBmb3IgKGxldCBpID0gdG9rZW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGV0IHRva2VuID0gdG9rZW5zW2ldXG4gICAgbGV0IHBvcyA9IHRva2VuWzNdIHx8IHRva2VuWzJdXG4gICAgaWYgKHBvcykgcmV0dXJuIHBvc1xuICB9XG59XG5cbmNsYXNzIFBhcnNlciB7XG4gIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0XG5cbiAgICB0aGlzLnJvb3QgPSBuZXcgUm9vdCgpXG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5yb290XG4gICAgdGhpcy5zcGFjZXMgPSAnJ1xuICAgIHRoaXMuc2VtaWNvbG9uID0gZmFsc2VcbiAgICB0aGlzLmN1c3RvbVByb3BlcnR5ID0gZmFsc2VcblxuICAgIHRoaXMuY3JlYXRlVG9rZW5pemVyKClcbiAgICB0aGlzLnJvb3Quc291cmNlID0geyBpbnB1dCwgc3RhcnQ6IHsgY29sdW1uOiAxLCBsaW5lOiAxLCBvZmZzZXQ6IDAgfSB9XG4gIH1cblxuICBhdHJ1bGUodG9rZW4pIHtcbiAgICBsZXQgbm9kZSA9IG5ldyBBdFJ1bGUoKVxuICAgIG5vZGUubmFtZSA9IHRva2VuWzFdLnNsaWNlKDEpXG4gICAgaWYgKG5vZGUubmFtZSA9PT0gJycpIHtcbiAgICAgIHRoaXMudW5uYW1lZEF0cnVsZShub2RlLCB0b2tlbilcbiAgICB9XG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdKVxuXG4gICAgbGV0IHR5cGVcbiAgICBsZXQgcHJldlxuICAgIGxldCBzaGlmdFxuICAgIGxldCBsYXN0ID0gZmFsc2VcbiAgICBsZXQgb3BlbiA9IGZhbHNlXG4gICAgbGV0IHBhcmFtcyA9IFtdXG4gICAgbGV0IGJyYWNrZXRzID0gW11cblxuICAgIHdoaWxlICghdGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkpIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKClcbiAgICAgIHR5cGUgPSB0b2tlblswXVxuXG4gICAgICBpZiAodHlwZSA9PT0gJygnIHx8IHR5cGUgPT09ICdbJykge1xuICAgICAgICBicmFja2V0cy5wdXNoKHR5cGUgPT09ICcoJyA/ICcpJyA6ICddJylcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3snICYmIGJyYWNrZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYnJhY2tldHMucHVzaCgnfScpXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IGJyYWNrZXRzW2JyYWNrZXRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIGJyYWNrZXRzLnBvcCgpXG4gICAgICB9XG5cbiAgICAgIGlmIChicmFja2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICc7Jykge1xuICAgICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24odG9rZW5bMl0pXG4gICAgICAgICAgbm9kZS5zb3VyY2UuZW5kLm9mZnNldCsrXG4gICAgICAgICAgdGhpcy5zZW1pY29sb24gPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgICBvcGVuID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ30nKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzaGlmdCA9IHBhcmFtcy5sZW5ndGggLSAxXG4gICAgICAgICAgICBwcmV2ID0gcGFyYW1zW3NoaWZ0XVxuICAgICAgICAgICAgd2hpbGUgKHByZXYgJiYgcHJldlswXSA9PT0gJ3NwYWNlJykge1xuICAgICAgICAgICAgICBwcmV2ID0gcGFyYW1zWy0tc2hpZnRdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHByZXZbM10gfHwgcHJldlsyXSlcbiAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kLm9mZnNldCsrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZW5kKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyYW1zLnB1c2godG9rZW4pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKHRva2VuKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkpIHtcbiAgICAgICAgbGFzdCA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBub2RlLnJhd3MuYmV0d2VlbiA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHBhcmFtcylcbiAgICBpZiAocGFyYW1zLmxlbmd0aCkge1xuICAgICAgbm9kZS5yYXdzLmFmdGVyTmFtZSA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tU3RhcnQocGFyYW1zKVxuICAgICAgdGhpcy5yYXcobm9kZSwgJ3BhcmFtcycsIHBhcmFtcylcbiAgICAgIGlmIChsYXN0KSB7XG4gICAgICAgIHRva2VuID0gcGFyYW1zW3BhcmFtcy5sZW5ndGggLSAxXVxuICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRva2VuWzNdIHx8IHRva2VuWzJdKVxuICAgICAgICBub2RlLnNvdXJjZS5lbmQub2Zmc2V0KytcbiAgICAgICAgdGhpcy5zcGFjZXMgPSBub2RlLnJhd3MuYmV0d2VlblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUucmF3cy5hZnRlck5hbWUgPSAnJ1xuICAgICAgbm9kZS5wYXJhbXMgPSAnJ1xuICAgIH1cblxuICAgIGlmIChvcGVuKSB7XG4gICAgICBub2RlLm5vZGVzID0gW11cbiAgICAgIHRoaXMuY3VycmVudCA9IG5vZGVcbiAgICB9XG4gIH1cblxuICBjaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpIHtcbiAgICBsZXQgY29sb24gPSB0aGlzLmNvbG9uKHRva2VucylcbiAgICBpZiAoY29sb24gPT09IGZhbHNlKSByZXR1cm5cblxuICAgIGxldCBmb3VuZGVkID0gMFxuICAgIGxldCB0b2tlblxuICAgIGZvciAobGV0IGogPSBjb2xvbiAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tqXVxuICAgICAgaWYgKHRva2VuWzBdICE9PSAnc3BhY2UnKSB7XG4gICAgICAgIGZvdW5kZWQgKz0gMVxuICAgICAgICBpZiAoZm91bmRlZCA9PT0gMikgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgdGhlIHRva2VuIGlzIGEgd29yZCwgZS5nLiBgIWltcG9ydGFudGAsIGByZWRgIG9yIGFueSBvdGhlciB2YWxpZCBwcm9wZXJ0eSdzIHZhbHVlLlxuICAgIC8vIFRoZW4gd2UgbmVlZCB0byByZXR1cm4gdGhlIGNvbG9uIGFmdGVyIHRoYXQgd29yZCB0b2tlbi4gWzNdIGlzIHRoZSBcImVuZFwiIGNvbG9uIG9mIHRoYXQgd29yZC5cbiAgICAvLyBBbmQgYmVjYXVzZSB3ZSBuZWVkIGl0IGFmdGVyIHRoYXQgb25lIHdlIGRvICsxIHRvIGdldCB0aGUgbmV4dCBvbmUuXG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihcbiAgICAgICdNaXNzZWQgc2VtaWNvbG9uJyxcbiAgICAgIHRva2VuWzBdID09PSAnd29yZCcgPyB0b2tlblszXSArIDEgOiB0b2tlblsyXVxuICAgIClcbiAgfVxuXG4gIGNvbG9uKHRva2Vucykge1xuICAgIGxldCBicmFja2V0cyA9IDBcbiAgICBsZXQgdG9rZW4sIHR5cGUsIHByZXZcbiAgICBmb3IgKGxldCBbaSwgZWxlbWVudF0gb2YgdG9rZW5zLmVudHJpZXMoKSkge1xuICAgICAgdG9rZW4gPSBlbGVtZW50XG4gICAgICB0eXBlID0gdG9rZW5bMF1cblxuICAgICAgaWYgKHR5cGUgPT09ICcoJykge1xuICAgICAgICBicmFja2V0cyArPSAxXG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gJyknKSB7XG4gICAgICAgIGJyYWNrZXRzIC09IDFcbiAgICAgIH1cbiAgICAgIGlmIChicmFja2V0cyA9PT0gMCAmJiB0eXBlID09PSAnOicpIHtcbiAgICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgICAgdGhpcy5kb3VibGVDb2xvbih0b2tlbilcbiAgICAgICAgfSBlbHNlIGlmIChwcmV2WzBdID09PSAnd29yZCcgJiYgcHJldlsxXSA9PT0gJ3Byb2dpZCcpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJldiA9IHRva2VuXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29tbWVudCh0b2tlbikge1xuICAgIGxldCBub2RlID0gbmV3IENvbW1lbnQoKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSlcbiAgICBub2RlLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRva2VuWzNdIHx8IHRva2VuWzJdKVxuICAgIG5vZGUuc291cmNlLmVuZC5vZmZzZXQrK1xuXG4gICAgbGV0IHRleHQgPSB0b2tlblsxXS5zbGljZSgyLCAtMilcbiAgICBpZiAoL15cXHMqJC8udGVzdCh0ZXh0KSkge1xuICAgICAgbm9kZS50ZXh0ID0gJydcbiAgICAgIG5vZGUucmF3cy5sZWZ0ID0gdGV4dFxuICAgICAgbm9kZS5yYXdzLnJpZ2h0ID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1hdGNoID0gdGV4dC5tYXRjaCgvXihcXHMqKShbXl0qXFxTKShcXHMqKSQvKVxuICAgICAgbm9kZS50ZXh0ID0gbWF0Y2hbMl1cbiAgICAgIG5vZGUucmF3cy5sZWZ0ID0gbWF0Y2hbMV1cbiAgICAgIG5vZGUucmF3cy5yaWdodCA9IG1hdGNoWzNdXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlVG9rZW5pemVyKCkge1xuICAgIHRoaXMudG9rZW5pemVyID0gdG9rZW5pemVyKHRoaXMuaW5wdXQpXG4gIH1cblxuICBkZWNsKHRva2VucywgY3VzdG9tUHJvcGVydHkpIHtcbiAgICBsZXQgbm9kZSA9IG5ldyBEZWNsYXJhdGlvbigpXG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2Vuc1swXVsyXSlcblxuICAgIGxldCBsYXN0ID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVxuICAgIGlmIChsYXN0WzBdID09PSAnOycpIHtcbiAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZVxuICAgICAgdG9rZW5zLnBvcCgpXG4gICAgfVxuXG4gICAgbm9kZS5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbihcbiAgICAgIGxhc3RbM10gfHwgbGFzdFsyXSB8fCBmaW5kTGFzdFdpdGhQb3NpdGlvbih0b2tlbnMpXG4gICAgKVxuICAgIG5vZGUuc291cmNlLmVuZC5vZmZzZXQrK1xuXG4gICAgd2hpbGUgKHRva2Vuc1swXVswXSAhPT0gJ3dvcmQnKSB7XG4gICAgICBpZiAodG9rZW5zLmxlbmd0aCA9PT0gMSkgdGhpcy51bmtub3duV29yZCh0b2tlbnMpXG4gICAgICBub2RlLnJhd3MuYmVmb3JlICs9IHRva2Vucy5zaGlmdCgpWzFdXG4gICAgfVxuICAgIG5vZGUuc291cmNlLnN0YXJ0ID0gdGhpcy5nZXRQb3NpdGlvbih0b2tlbnNbMF1bMl0pXG5cbiAgICBub2RlLnByb3AgPSAnJ1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBsZXQgdHlwZSA9IHRva2Vuc1swXVswXVxuICAgICAgaWYgKHR5cGUgPT09ICc6JyB8fCB0eXBlID09PSAnc3BhY2UnIHx8IHR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgbm9kZS5wcm9wICs9IHRva2Vucy5zaGlmdCgpWzFdXG4gICAgfVxuXG4gICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJ1xuXG4gICAgbGV0IHRva2VuXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zLnNoaWZ0KClcblxuICAgICAgaWYgKHRva2VuWzBdID09PSAnOicpIHtcbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdG9rZW5bMV1cbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3dvcmQnICYmIC9cXHcvLnRlc3QodG9rZW5bMV0pKSB7XG4gICAgICAgICAgdGhpcy51bmtub3duV29yZChbdG9rZW5dKVxuICAgICAgICB9XG4gICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vZGUucHJvcFswXSA9PT0gJ18nIHx8IG5vZGUucHJvcFswXSA9PT0gJyonKSB7XG4gICAgICBub2RlLnJhd3MuYmVmb3JlICs9IG5vZGUucHJvcFswXVxuICAgICAgbm9kZS5wcm9wID0gbm9kZS5wcm9wLnNsaWNlKDEpXG4gICAgfVxuXG4gICAgbGV0IGZpcnN0U3BhY2VzID0gW11cbiAgICBsZXQgbmV4dFxuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBuZXh0ID0gdG9rZW5zWzBdWzBdXG4gICAgICBpZiAobmV4dCAhPT0gJ3NwYWNlJyAmJiBuZXh0ICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICBmaXJzdFNwYWNlcy5wdXNoKHRva2Vucy5zaGlmdCgpKVxuICAgIH1cblxuICAgIHRoaXMucHJlY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKVxuXG4gICAgZm9yIChsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICAgIGlmICh0b2tlblsxXS50b0xvd2VyQ2FzZSgpID09PSAnIWltcG9ydGFudCcpIHtcbiAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlXG4gICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnN0cmluZ0Zyb20odG9rZW5zLCBpKVxuICAgICAgICBzdHJpbmcgPSB0aGlzLnNwYWNlc0Zyb21FbmQodG9rZW5zKSArIHN0cmluZ1xuICAgICAgICBpZiAoc3RyaW5nICE9PSAnICFpbXBvcnRhbnQnKSBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyaW5nXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKHRva2VuWzFdLnRvTG93ZXJDYXNlKCkgPT09ICdpbXBvcnRhbnQnKSB7XG4gICAgICAgIGxldCBjYWNoZSA9IHRva2Vucy5zbGljZSgwKVxuICAgICAgICBsZXQgc3RyID0gJydcbiAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgICBsZXQgdHlwZSA9IGNhY2hlW2pdWzBdXG4gICAgICAgICAgaWYgKHN0ci50cmltKCkuaW5kZXhPZignIScpID09PSAwICYmIHR5cGUgIT09ICdzcGFjZScpIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0ciA9IGNhY2hlLnBvcCgpWzFdICsgc3RyXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ci50cmltKCkuaW5kZXhPZignIScpID09PSAwKSB7XG4gICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlXG4gICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0clxuICAgICAgICAgIHRva2VucyA9IGNhY2hlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuWzBdICE9PSAnc3BhY2UnICYmIHRva2VuWzBdICE9PSAnY29tbWVudCcpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgaGFzV29yZCA9IHRva2Vucy5zb21lKGkgPT4gaVswXSAhPT0gJ3NwYWNlJyAmJiBpWzBdICE9PSAnY29tbWVudCcpXG5cbiAgICBpZiAoaGFzV29yZCkge1xuICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gZmlyc3RTcGFjZXMubWFwKGkgPT4gaVsxXSkuam9pbignJylcbiAgICAgIGZpcnN0U3BhY2VzID0gW11cbiAgICB9XG4gICAgdGhpcy5yYXcobm9kZSwgJ3ZhbHVlJywgZmlyc3RTcGFjZXMuY29uY2F0KHRva2VucyksIGN1c3RvbVByb3BlcnR5KVxuXG4gICAgaWYgKG5vZGUudmFsdWUuaW5jbHVkZXMoJzonKSAmJiAhY3VzdG9tUHJvcGVydHkpIHtcbiAgICAgIHRoaXMuY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKVxuICAgIH1cbiAgfVxuXG4gIGRvdWJsZUNvbG9uKHRva2VuKSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihcbiAgICAgICdEb3VibGUgY29sb24nLFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdIH0sXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gKyB0b2tlblsxXS5sZW5ndGggfVxuICAgIClcbiAgfVxuXG4gIGVtcHR5UnVsZSh0b2tlbikge1xuICAgIGxldCBub2RlID0gbmV3IFJ1bGUoKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSlcbiAgICBub2RlLnNlbGVjdG9yID0gJydcbiAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnXG4gICAgdGhpcy5jdXJyZW50ID0gbm9kZVxuICB9XG5cbiAgZW5kKHRva2VuKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudC5ub2RlcyAmJiB0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnQucmF3cy5zZW1pY29sb24gPSB0aGlzLnNlbWljb2xvblxuICAgIH1cbiAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlXG5cbiAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciA9ICh0aGlzLmN1cnJlbnQucmF3cy5hZnRlciB8fCAnJykgKyB0aGlzLnNwYWNlc1xuICAgIHRoaXMuc3BhY2VzID0gJydcblxuICAgIGlmICh0aGlzLmN1cnJlbnQucGFyZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnQuc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24odG9rZW5bMl0pXG4gICAgICB0aGlzLmN1cnJlbnQuc291cmNlLmVuZC5vZmZzZXQrK1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50LnBhcmVudFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVuZXhwZWN0ZWRDbG9zZSh0b2tlbilcbiAgICB9XG4gIH1cblxuICBlbmRGaWxlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQucGFyZW50KSB0aGlzLnVuY2xvc2VkQmxvY2soKVxuICAgIGlmICh0aGlzLmN1cnJlbnQubm9kZXMgJiYgdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb25cbiAgICB9XG4gICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgPSAodGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgfHwgJycpICsgdGhpcy5zcGFjZXNcbiAgICB0aGlzLnJvb3Quc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy50b2tlbml6ZXIucG9zaXRpb24oKSlcbiAgfVxuXG4gIGZyZWVTZW1pY29sb24odG9rZW4pIHtcbiAgICB0aGlzLnNwYWNlcyArPSB0b2tlblsxXVxuICAgIGlmICh0aGlzLmN1cnJlbnQubm9kZXMpIHtcbiAgICAgIGxldCBwcmV2ID0gdGhpcy5jdXJyZW50Lm5vZGVzW3RoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGggLSAxXVxuICAgICAgaWYgKHByZXYgJiYgcHJldi50eXBlID09PSAncnVsZScgJiYgIXByZXYucmF3cy5vd25TZW1pY29sb24pIHtcbiAgICAgICAgcHJldi5yYXdzLm93blNlbWljb2xvbiA9IHRoaXMuc3BhY2VzXG4gICAgICAgIHRoaXMuc3BhY2VzID0gJydcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBIZWxwZXJzXG5cbiAgZ2V0UG9zaXRpb24ob2Zmc2V0KSB7XG4gICAgbGV0IHBvcyA9IHRoaXMuaW5wdXQuZnJvbU9mZnNldChvZmZzZXQpXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHVtbjogcG9zLmNvbCxcbiAgICAgIGxpbmU6IHBvcy5saW5lLFxuICAgICAgb2Zmc2V0XG4gICAgfVxuICB9XG5cbiAgaW5pdChub2RlLCBvZmZzZXQpIHtcbiAgICB0aGlzLmN1cnJlbnQucHVzaChub2RlKVxuICAgIG5vZGUuc291cmNlID0ge1xuICAgICAgaW5wdXQ6IHRoaXMuaW5wdXQsXG4gICAgICBzdGFydDogdGhpcy5nZXRQb3NpdGlvbihvZmZzZXQpXG4gICAgfVxuICAgIG5vZGUucmF3cy5iZWZvcmUgPSB0aGlzLnNwYWNlc1xuICAgIHRoaXMuc3BhY2VzID0gJydcbiAgICBpZiAobm9kZS50eXBlICE9PSAnY29tbWVudCcpIHRoaXMuc2VtaWNvbG9uID0gZmFsc2VcbiAgfVxuXG4gIG90aGVyKHN0YXJ0KSB7XG4gICAgbGV0IGVuZCA9IGZhbHNlXG4gICAgbGV0IHR5cGUgPSBudWxsXG4gICAgbGV0IGNvbG9uID0gZmFsc2VcbiAgICBsZXQgYnJhY2tldCA9IG51bGxcbiAgICBsZXQgYnJhY2tldHMgPSBbXVxuICAgIGxldCBjdXN0b21Qcm9wZXJ0eSA9IHN0YXJ0WzFdLnN0YXJ0c1dpdGgoJy0tJylcblxuICAgIGxldCB0b2tlbnMgPSBbXVxuICAgIGxldCB0b2tlbiA9IHN0YXJ0XG4gICAgd2hpbGUgKHRva2VuKSB7XG4gICAgICB0eXBlID0gdG9rZW5bMF1cbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKVxuXG4gICAgICBpZiAodHlwZSA9PT0gJygnIHx8IHR5cGUgPT09ICdbJykge1xuICAgICAgICBpZiAoIWJyYWNrZXQpIGJyYWNrZXQgPSB0b2tlblxuICAgICAgICBicmFja2V0cy5wdXNoKHR5cGUgPT09ICcoJyA/ICcpJyA6ICddJylcbiAgICAgIH0gZWxzZSBpZiAoY3VzdG9tUHJvcGVydHkgJiYgY29sb24gJiYgdHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIGlmICghYnJhY2tldCkgYnJhY2tldCA9IHRva2VuXG4gICAgICAgIGJyYWNrZXRzLnB1c2goJ30nKVxuICAgICAgfSBlbHNlIGlmIChicmFja2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICc7Jykge1xuICAgICAgICAgIGlmIChjb2xvbikge1xuICAgICAgICAgICAgdGhpcy5kZWNsKHRva2VucywgY3VzdG9tUHJvcGVydHkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgICAgdGhpcy5ydWxlKHRva2VucylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnfScpIHtcbiAgICAgICAgICB0aGlzLnRva2VuaXplci5iYWNrKHRva2Vucy5wb3AoKSlcbiAgICAgICAgICBlbmQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnOicpIHtcbiAgICAgICAgICBjb2xvbiA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBicmFja2V0c1ticmFja2V0cy5sZW5ndGggLSAxXSkge1xuICAgICAgICBicmFja2V0cy5wb3AoKVxuICAgICAgICBpZiAoYnJhY2tldHMubGVuZ3RoID09PSAwKSBicmFja2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSBlbmQgPSB0cnVlXG4gICAgaWYgKGJyYWNrZXRzLmxlbmd0aCA+IDApIHRoaXMudW5jbG9zZWRCcmFja2V0KGJyYWNrZXQpXG5cbiAgICBpZiAoZW5kICYmIGNvbG9uKSB7XG4gICAgICBpZiAoIWN1c3RvbVByb3BlcnR5KSB7XG4gICAgICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgdG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdXG4gICAgICAgICAgaWYgKHRva2VuICE9PSAnc3BhY2UnICYmIHRva2VuICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICAgICAgdGhpcy50b2tlbml6ZXIuYmFjayh0b2tlbnMucG9wKCkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGVjbCh0b2tlbnMsIGN1c3RvbVByb3BlcnR5KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVua25vd25Xb3JkKHRva2VucylcbiAgICB9XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICBsZXQgdG9rZW5cbiAgICB3aGlsZSAoIXRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpXG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnc3BhY2UnOlxuICAgICAgICAgIHRoaXMuc3BhY2VzICs9IHRva2VuWzFdXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICc7JzpcbiAgICAgICAgICB0aGlzLmZyZWVTZW1pY29sb24odG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICd9JzpcbiAgICAgICAgICB0aGlzLmVuZCh0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ2NvbW1lbnQnOlxuICAgICAgICAgIHRoaXMuY29tbWVudCh0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ2F0LXdvcmQnOlxuICAgICAgICAgIHRoaXMuYXRydWxlKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAneyc6XG4gICAgICAgICAgdGhpcy5lbXB0eVJ1bGUodG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMub3RoZXIodG9rZW4pXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5lbmRGaWxlKClcbiAgfVxuXG4gIHByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKC8qIHRva2VucyAqLykge1xuICAgIC8vIEhvb2sgZm9yIFNhZmUgUGFyc2VyXG4gIH1cblxuICByYXcobm9kZSwgcHJvcCwgdG9rZW5zLCBjdXN0b21Qcm9wZXJ0eSkge1xuICAgIGxldCB0b2tlbiwgdHlwZVxuICAgIGxldCBsZW5ndGggPSB0b2tlbnMubGVuZ3RoXG4gICAgbGV0IHZhbHVlID0gJydcbiAgICBsZXQgY2xlYW4gPSB0cnVlXG4gICAgbGV0IG5leHQsIHByZXZcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldXG4gICAgICB0eXBlID0gdG9rZW5bMF1cbiAgICAgIGlmICh0eXBlID09PSAnc3BhY2UnICYmIGkgPT09IGxlbmd0aCAtIDEgJiYgIWN1c3RvbVByb3BlcnR5KSB7XG4gICAgICAgIGNsZWFuID0gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgIHByZXYgPSB0b2tlbnNbaSAtIDFdID8gdG9rZW5zW2kgLSAxXVswXSA6ICdlbXB0eSdcbiAgICAgICAgbmV4dCA9IHRva2Vuc1tpICsgMV0gPyB0b2tlbnNbaSArIDFdWzBdIDogJ2VtcHR5J1xuICAgICAgICBpZiAoIVNBRkVfQ09NTUVOVF9ORUlHSEJPUltwcmV2XSAmJiAhU0FGRV9DT01NRU5UX05FSUdIQk9SW25leHRdKSB7XG4gICAgICAgICAgaWYgKHZhbHVlLnNsaWNlKC0xKSA9PT0gJywnKSB7XG4gICAgICAgICAgICBjbGVhbiA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlICs9IHRva2VuWzFdXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsZWFuID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgKz0gdG9rZW5bMV1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjbGVhbikge1xuICAgICAgbGV0IHJhdyA9IHRva2Vucy5yZWR1Y2UoKGFsbCwgaSkgPT4gYWxsICsgaVsxXSwgJycpXG4gICAgICBub2RlLnJhd3NbcHJvcF0gPSB7IHJhdywgdmFsdWUgfVxuICAgIH1cbiAgICBub2RlW3Byb3BdID0gdmFsdWVcbiAgfVxuXG4gIHJ1bGUodG9rZW5zKSB7XG4gICAgdG9rZW5zLnBvcCgpXG5cbiAgICBsZXQgbm9kZSA9IG5ldyBSdWxlKClcbiAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5zWzBdWzJdKVxuXG4gICAgbm9kZS5yYXdzLmJldHdlZW4gPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCh0b2tlbnMpXG4gICAgdGhpcy5yYXcobm9kZSwgJ3NlbGVjdG9yJywgdG9rZW5zKVxuICAgIHRoaXMuY3VycmVudCA9IG5vZGVcbiAgfVxuXG4gIHNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCh0b2tlbnMpIHtcbiAgICBsZXQgbGFzdFRva2VuVHlwZVxuICAgIGxldCBzcGFjZXMgPSAnJ1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBsYXN0VG9rZW5UeXBlID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVswXVxuICAgICAgaWYgKGxhc3RUb2tlblR5cGUgIT09ICdzcGFjZScgJiYgbGFzdFRva2VuVHlwZSAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgc3BhY2VzID0gdG9rZW5zLnBvcCgpWzFdICsgc3BhY2VzXG4gICAgfVxuICAgIHJldHVybiBzcGFjZXNcbiAgfVxuXG4gIC8vIEVycm9yc1xuXG4gIHNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHRva2Vucykge1xuICAgIGxldCBuZXh0XG4gICAgbGV0IHNwYWNlcyA9ICcnXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIG5leHQgPSB0b2tlbnNbMF1bMF1cbiAgICAgIGlmIChuZXh0ICE9PSAnc3BhY2UnICYmIG5leHQgIT09ICdjb21tZW50JykgYnJlYWtcbiAgICAgIHNwYWNlcyArPSB0b2tlbnMuc2hpZnQoKVsxXVxuICAgIH1cbiAgICByZXR1cm4gc3BhY2VzXG4gIH1cblxuICBzcGFjZXNGcm9tRW5kKHRva2Vucykge1xuICAgIGxldCBsYXN0VG9rZW5UeXBlXG4gICAgbGV0IHNwYWNlcyA9ICcnXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGxhc3RUb2tlblR5cGUgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdXG4gICAgICBpZiAobGFzdFRva2VuVHlwZSAhPT0gJ3NwYWNlJykgYnJlYWtcbiAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlc1xuICAgIH1cbiAgICByZXR1cm4gc3BhY2VzXG4gIH1cblxuICBzdHJpbmdGcm9tKHRva2VucywgZnJvbSkge1xuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIGZvciAobGV0IGkgPSBmcm9tOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gdG9rZW5zW2ldWzFdXG4gICAgfVxuICAgIHRva2Vucy5zcGxpY2UoZnJvbSwgdG9rZW5zLmxlbmd0aCAtIGZyb20pXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgdW5jbG9zZWRCbG9jaygpIHtcbiAgICBsZXQgcG9zID0gdGhpcy5jdXJyZW50LnNvdXJjZS5zdGFydFxuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1VuY2xvc2VkIGJsb2NrJywgcG9zLmxpbmUsIHBvcy5jb2x1bW4pXG4gIH1cblxuICB1bmNsb3NlZEJyYWNrZXQoYnJhY2tldCkge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICAnVW5jbG9zZWQgYnJhY2tldCcsXG4gICAgICB7IG9mZnNldDogYnJhY2tldFsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IGJyYWNrZXRbMl0gKyAxIH1cbiAgICApXG4gIH1cblxuICB1bmV4cGVjdGVkQ2xvc2UodG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgJ1VuZXhwZWN0ZWQgfScsXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gfSxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlblsyXSArIDEgfVxuICAgIClcbiAgfVxuXG4gIHVua25vd25Xb3JkKHRva2Vucykge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICAnVW5rbm93biB3b3JkJyxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlbnNbMF1bMl0gfSxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlbnNbMF1bMl0gKyB0b2tlbnNbMF1bMV0ubGVuZ3RoIH1cbiAgICApXG4gIH1cblxuICB1bm5hbWVkQXRydWxlKG5vZGUsIHRva2VuKSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihcbiAgICAgICdBdC1ydWxlIHdpdGhvdXQgbmFtZScsXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gfSxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlblsyXSArIHRva2VuWzFdLmxlbmd0aCB9XG4gICAgKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyXG4iLCIndXNlIHN0cmljdCdcblxubGV0IENzc1N5bnRheEVycm9yID0gcmVxdWlyZSgnLi9jc3Mtc3ludGF4LWVycm9yJylcbmxldCBEZWNsYXJhdGlvbiA9IHJlcXVpcmUoJy4vZGVjbGFyYXRpb24nKVxubGV0IExhenlSZXN1bHQgPSByZXF1aXJlKCcuL2xhenktcmVzdWx0JylcbmxldCBDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpXG5sZXQgUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wcm9jZXNzb3InKVxubGV0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5JylcbmxldCBmcm9tSlNPTiA9IHJlcXVpcmUoJy4vZnJvbUpTT04nKVxubGV0IERvY3VtZW50ID0gcmVxdWlyZSgnLi9kb2N1bWVudCcpXG5sZXQgV2FybmluZyA9IHJlcXVpcmUoJy4vd2FybmluZycpXG5sZXQgQ29tbWVudCA9IHJlcXVpcmUoJy4vY29tbWVudCcpXG5sZXQgQXRSdWxlID0gcmVxdWlyZSgnLi9hdC1ydWxlJylcbmxldCBSZXN1bHQgPSByZXF1aXJlKCcuL3Jlc3VsdC5qcycpXG5sZXQgSW5wdXQgPSByZXF1aXJlKCcuL2lucHV0JylcbmxldCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxubGV0IGxpc3QgPSByZXF1aXJlKCcuL2xpc3QnKVxubGV0IFJ1bGUgPSByZXF1aXJlKCcuL3J1bGUnKVxubGV0IFJvb3QgPSByZXF1aXJlKCcuL3Jvb3QnKVxubGV0IE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKVxuXG5mdW5jdGlvbiBwb3N0Y3NzKC4uLnBsdWdpbnMpIHtcbiAgaWYgKHBsdWdpbnMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkocGx1Z2luc1swXSkpIHtcbiAgICBwbHVnaW5zID0gcGx1Z2luc1swXVxuICB9XG4gIHJldHVybiBuZXcgUHJvY2Vzc29yKHBsdWdpbnMpXG59XG5cbnBvc3Rjc3MucGx1Z2luID0gZnVuY3Rpb24gcGx1Z2luKG5hbWUsIGluaXRpYWxpemVyKSB7XG4gIGxldCB3YXJuaW5nUHJpbnRlZCA9IGZhbHNlXG4gIGZ1bmN0aW9uIGNyZWF0b3IoLi4uYXJncykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuICYmICF3YXJuaW5nUHJpbnRlZCkge1xuICAgICAgd2FybmluZ1ByaW50ZWQgPSB0cnVlXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBuYW1lICtcbiAgICAgICAgICAnOiBwb3N0Y3NzLnBsdWdpbiB3YXMgZGVwcmVjYXRlZC4gTWlncmF0aW9uIGd1aWRlOlxcbicgK1xuICAgICAgICAgICdodHRwczovL2V2aWxtYXJ0aWFucy5jb20vY2hyb25pY2xlcy9wb3N0Y3NzLTgtcGx1Z2luLW1pZ3JhdGlvbidcbiAgICAgIClcbiAgICAgIGlmIChwcm9jZXNzLmVudi5MQU5HICYmIHByb2Nlc3MuZW52LkxBTkcuc3RhcnRzV2l0aCgnY24nKSkge1xuICAgICAgICAvKiBjOCBpZ25vcmUgbmV4dCA3ICovXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBuYW1lICtcbiAgICAgICAgICAgICc6IOmHjOmdoiBwb3N0Y3NzLnBsdWdpbiDooqvlvIPnlKguIOi/geenu+aMh+WNlzpcXG4nICtcbiAgICAgICAgICAgICdodHRwczovL3d3dy53M2N0ZWNoLmNvbS90b3BpYy8yMjI2J1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICAgIGxldCB0cmFuc2Zvcm1lciA9IGluaXRpYWxpemVyKC4uLmFyZ3MpXG4gICAgdHJhbnNmb3JtZXIucG9zdGNzc1BsdWdpbiA9IG5hbWVcbiAgICB0cmFuc2Zvcm1lci5wb3N0Y3NzVmVyc2lvbiA9IG5ldyBQcm9jZXNzb3IoKS52ZXJzaW9uXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVyXG4gIH1cblxuICBsZXQgY2FjaGVcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0b3IsICdwb3N0Y3NzJywge1xuICAgIGdldCgpIHtcbiAgICAgIGlmICghY2FjaGUpIGNhY2hlID0gY3JlYXRvcigpXG4gICAgICByZXR1cm4gY2FjaGVcbiAgICB9XG4gIH0pXG5cbiAgY3JlYXRvci5wcm9jZXNzID0gZnVuY3Rpb24gKGNzcywgcHJvY2Vzc09wdHMsIHBsdWdpbk9wdHMpIHtcbiAgICByZXR1cm4gcG9zdGNzcyhbY3JlYXRvcihwbHVnaW5PcHRzKV0pLnByb2Nlc3MoY3NzLCBwcm9jZXNzT3B0cylcbiAgfVxuXG4gIHJldHVybiBjcmVhdG9yXG59XG5cbnBvc3Rjc3Muc3RyaW5naWZ5ID0gc3RyaW5naWZ5XG5wb3N0Y3NzLnBhcnNlID0gcGFyc2VcbnBvc3Rjc3MuZnJvbUpTT04gPSBmcm9tSlNPTlxucG9zdGNzcy5saXN0ID0gbGlzdFxuXG5wb3N0Y3NzLmNvbW1lbnQgPSBkZWZhdWx0cyA9PiBuZXcgQ29tbWVudChkZWZhdWx0cylcbnBvc3Rjc3MuYXRSdWxlID0gZGVmYXVsdHMgPT4gbmV3IEF0UnVsZShkZWZhdWx0cylcbnBvc3Rjc3MuZGVjbCA9IGRlZmF1bHRzID0+IG5ldyBEZWNsYXJhdGlvbihkZWZhdWx0cylcbnBvc3Rjc3MucnVsZSA9IGRlZmF1bHRzID0+IG5ldyBSdWxlKGRlZmF1bHRzKVxucG9zdGNzcy5yb290ID0gZGVmYXVsdHMgPT4gbmV3IFJvb3QoZGVmYXVsdHMpXG5wb3N0Y3NzLmRvY3VtZW50ID0gZGVmYXVsdHMgPT4gbmV3IERvY3VtZW50KGRlZmF1bHRzKVxuXG5wb3N0Y3NzLkNzc1N5bnRheEVycm9yID0gQ3NzU3ludGF4RXJyb3JcbnBvc3Rjc3MuRGVjbGFyYXRpb24gPSBEZWNsYXJhdGlvblxucG9zdGNzcy5Db250YWluZXIgPSBDb250YWluZXJcbnBvc3Rjc3MuUHJvY2Vzc29yID0gUHJvY2Vzc29yXG5wb3N0Y3NzLkRvY3VtZW50ID0gRG9jdW1lbnRcbnBvc3Rjc3MuQ29tbWVudCA9IENvbW1lbnRcbnBvc3Rjc3MuV2FybmluZyA9IFdhcm5pbmdcbnBvc3Rjc3MuQXRSdWxlID0gQXRSdWxlXG5wb3N0Y3NzLlJlc3VsdCA9IFJlc3VsdFxucG9zdGNzcy5JbnB1dCA9IElucHV0XG5wb3N0Y3NzLlJ1bGUgPSBSdWxlXG5wb3N0Y3NzLlJvb3QgPSBSb290XG5wb3N0Y3NzLk5vZGUgPSBOb2RlXG5cbkxhenlSZXN1bHQucmVnaXN0ZXJQb3N0Y3NzKHBvc3Rjc3MpXG5cbm1vZHVsZS5leHBvcnRzID0gcG9zdGNzc1xucG9zdGNzcy5kZWZhdWx0ID0gcG9zdGNzc1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCB7IFNvdXJjZU1hcENvbnN1bWVyLCBTb3VyY2VNYXBHZW5lcmF0b3IgfSA9IHJlcXVpcmUoJ3NvdXJjZS1tYXAtanMnKVxubGV0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jIH0gPSByZXF1aXJlKCdmcycpXG5sZXQgeyBkaXJuYW1lLCBqb2luIH0gPSByZXF1aXJlKCdwYXRoJylcblxuZnVuY3Rpb24gZnJvbUJhc2U2NChzdHIpIHtcbiAgaWYgKEJ1ZmZlcikge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShzdHIsICdiYXNlNjQnKS50b1N0cmluZygpXG4gIH0gZWxzZSB7XG4gICAgLyogYzggaWdub3JlIG5leHQgMiAqL1xuICAgIHJldHVybiB3aW5kb3cuYXRvYihzdHIpXG4gIH1cbn1cblxuY2xhc3MgUHJldmlvdXNNYXAge1xuICBjb25zdHJ1Y3Rvcihjc3MsIG9wdHMpIHtcbiAgICBpZiAob3B0cy5tYXAgPT09IGZhbHNlKSByZXR1cm5cbiAgICB0aGlzLmxvYWRBbm5vdGF0aW9uKGNzcylcbiAgICB0aGlzLmlubGluZSA9IHRoaXMuc3RhcnRXaXRoKHRoaXMuYW5ub3RhdGlvbiwgJ2RhdGE6JylcblxuICAgIGxldCBwcmV2ID0gb3B0cy5tYXAgPyBvcHRzLm1hcC5wcmV2IDogdW5kZWZpbmVkXG4gICAgbGV0IHRleHQgPSB0aGlzLmxvYWRNYXAob3B0cy5mcm9tLCBwcmV2KVxuICAgIGlmICghdGhpcy5tYXBGaWxlICYmIG9wdHMuZnJvbSkge1xuICAgICAgdGhpcy5tYXBGaWxlID0gb3B0cy5mcm9tXG4gICAgfVxuICAgIGlmICh0aGlzLm1hcEZpbGUpIHRoaXMucm9vdCA9IGRpcm5hbWUodGhpcy5tYXBGaWxlKVxuICAgIGlmICh0ZXh0KSB0aGlzLnRleHQgPSB0ZXh0XG4gIH1cblxuICBjb25zdW1lcigpIHtcbiAgICBpZiAoIXRoaXMuY29uc3VtZXJDYWNoZSkge1xuICAgICAgdGhpcy5jb25zdW1lckNhY2hlID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHRoaXMudGV4dClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uc3VtZXJDYWNoZVxuICB9XG5cbiAgZGVjb2RlSW5saW5lKHRleHQpIHtcbiAgICBsZXQgYmFzZUNoYXJzZXRVcmkgPSAvXmRhdGE6YXBwbGljYXRpb25cXC9qc29uO2NoYXJzZXQ9dXRmLT84O2Jhc2U2NCwvXG4gICAgbGV0IGJhc2VVcmkgPSAvXmRhdGE6YXBwbGljYXRpb25cXC9qc29uO2Jhc2U2NCwvXG4gICAgbGV0IGNoYXJzZXRVcmkgPSAvXmRhdGE6YXBwbGljYXRpb25cXC9qc29uO2NoYXJzZXQ9dXRmLT84LC9cbiAgICBsZXQgdXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbiwvXG5cbiAgICBpZiAoY2hhcnNldFVyaS50ZXN0KHRleHQpIHx8IHVyaS50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHRleHQuc3Vic3RyKFJlZ0V4cC5sYXN0TWF0Y2gubGVuZ3RoKSlcbiAgICB9XG5cbiAgICBpZiAoYmFzZUNoYXJzZXRVcmkudGVzdCh0ZXh0KSB8fCBiYXNlVXJpLnRlc3QodGV4dCkpIHtcbiAgICAgIHJldHVybiBmcm9tQmFzZTY0KHRleHQuc3Vic3RyKFJlZ0V4cC5sYXN0TWF0Y2gubGVuZ3RoKSlcbiAgICB9XG5cbiAgICBsZXQgZW5jb2RpbmcgPSB0ZXh0Lm1hdGNoKC9kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjsoW14sXSspLC8pWzFdXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBzb3VyY2UgbWFwIGVuY29kaW5nICcgKyBlbmNvZGluZylcbiAgfVxuXG4gIGdldEFubm90YXRpb25VUkwoc291cmNlTWFwU3RyaW5nKSB7XG4gICAgcmV0dXJuIHNvdXJjZU1hcFN0cmluZy5yZXBsYWNlKC9eXFwvXFwqXFxzKiMgc291cmNlTWFwcGluZ1VSTD0vLCAnJykudHJpbSgpXG4gIH1cblxuICBpc01hcChtYXApIHtcbiAgICBpZiAodHlwZW9mIG1hcCAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2YgbWFwLm1hcHBpbmdzID09PSAnc3RyaW5nJyB8fFxuICAgICAgdHlwZW9mIG1hcC5fbWFwcGluZ3MgPT09ICdzdHJpbmcnIHx8XG4gICAgICBBcnJheS5pc0FycmF5KG1hcC5zZWN0aW9ucylcbiAgICApXG4gIH1cblxuICBsb2FkQW5ub3RhdGlvbihjc3MpIHtcbiAgICBsZXQgY29tbWVudHMgPSBjc3MubWF0Y2goL1xcL1xcKlxccyojIHNvdXJjZU1hcHBpbmdVUkw9L2dtKVxuICAgIGlmICghY29tbWVudHMpIHJldHVyblxuXG4gICAgLy8gc291cmNlTWFwcGluZ1VSTHMgZnJvbSBjb21tZW50cywgc3RyaW5ncywgZXRjLlxuICAgIGxldCBzdGFydCA9IGNzcy5sYXN0SW5kZXhPZihjb21tZW50cy5wb3AoKSlcbiAgICBsZXQgZW5kID0gY3NzLmluZGV4T2YoJyovJywgc3RhcnQpXG5cbiAgICBpZiAoc3RhcnQgPiAtMSAmJiBlbmQgPiAtMSkge1xuICAgICAgLy8gTG9jYXRlIHRoZSBsYXN0IHNvdXJjZU1hcHBpbmdVUkwgdG8gYXZvaWQgcGlja2luXG4gICAgICB0aGlzLmFubm90YXRpb24gPSB0aGlzLmdldEFubm90YXRpb25VUkwoY3NzLnN1YnN0cmluZyhzdGFydCwgZW5kKSlcbiAgICB9XG4gIH1cblxuICBsb2FkRmlsZShwYXRoKSB7XG4gICAgdGhpcy5yb290ID0gZGlybmFtZShwYXRoKVxuICAgIGlmIChleGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICB0aGlzLm1hcEZpbGUgPSBwYXRoXG4gICAgICByZXR1cm4gcmVhZEZpbGVTeW5jKHBhdGgsICd1dGYtOCcpLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgfVxuICB9XG5cbiAgbG9hZE1hcChmaWxlLCBwcmV2KSB7XG4gICAgaWYgKHByZXYgPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICBpZiAodHlwZW9mIHByZXYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwcmV2XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmV2ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxldCBwcmV2UGF0aCA9IHByZXYoZmlsZSlcbiAgICAgICAgaWYgKHByZXZQYXRoKSB7XG4gICAgICAgICAgbGV0IG1hcCA9IHRoaXMubG9hZEZpbGUocHJldlBhdGgpXG4gICAgICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgJ1VuYWJsZSB0byBsb2FkIHByZXZpb3VzIHNvdXJjZSBtYXA6ICcgKyBwcmV2UGF0aC50b1N0cmluZygpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcmV2IGluc3RhbmNlb2YgU291cmNlTWFwQ29uc3VtZXIpIHtcbiAgICAgICAgcmV0dXJuIFNvdXJjZU1hcEdlbmVyYXRvci5mcm9tU291cmNlTWFwKHByZXYpLnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAocHJldiBpbnN0YW5jZW9mIFNvdXJjZU1hcEdlbmVyYXRvcikge1xuICAgICAgICByZXR1cm4gcHJldi50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNNYXAocHJldikpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHByZXYpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHByZXZpb3VzIHNvdXJjZSBtYXAgZm9ybWF0OiAnICsgcHJldi50b1N0cmluZygpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWNvZGVJbmxpbmUodGhpcy5hbm5vdGF0aW9uKVxuICAgIH0gZWxzZSBpZiAodGhpcy5hbm5vdGF0aW9uKSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy5hbm5vdGF0aW9uXG4gICAgICBpZiAoZmlsZSkgbWFwID0gam9pbihkaXJuYW1lKGZpbGUpLCBtYXApXG4gICAgICByZXR1cm4gdGhpcy5sb2FkRmlsZShtYXApXG4gICAgfVxuICB9XG5cbiAgc3RhcnRXaXRoKHN0cmluZywgc3RhcnQpIHtcbiAgICBpZiAoIXN0cmluZykgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHIoMCwgc3RhcnQubGVuZ3RoKSA9PT0gc3RhcnRcbiAgfVxuXG4gIHdpdGhDb250ZW50KCkge1xuICAgIHJldHVybiAhIShcbiAgICAgIHRoaXMuY29uc3VtZXIoKS5zb3VyY2VzQ29udGVudCAmJlxuICAgICAgdGhpcy5jb25zdW1lcigpLnNvdXJjZXNDb250ZW50Lmxlbmd0aCA+IDBcbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcmV2aW91c01hcFxuUHJldmlvdXNNYXAuZGVmYXVsdCA9IFByZXZpb3VzTWFwXG4iLCIndXNlIHN0cmljdCdcblxubGV0IE5vV29ya1Jlc3VsdCA9IHJlcXVpcmUoJy4vbm8td29yay1yZXN1bHQnKVxubGV0IExhenlSZXN1bHQgPSByZXF1aXJlKCcuL2xhenktcmVzdWx0JylcbmxldCBEb2N1bWVudCA9IHJlcXVpcmUoJy4vZG9jdW1lbnQnKVxubGV0IFJvb3QgPSByZXF1aXJlKCcuL3Jvb3QnKVxuXG5jbGFzcyBQcm9jZXNzb3Ige1xuICBjb25zdHJ1Y3RvcihwbHVnaW5zID0gW10pIHtcbiAgICB0aGlzLnZlcnNpb24gPSAnOC40LjMxJ1xuICAgIHRoaXMucGx1Z2lucyA9IHRoaXMubm9ybWFsaXplKHBsdWdpbnMpXG4gIH1cblxuICBub3JtYWxpemUocGx1Z2lucykge1xuICAgIGxldCBub3JtYWxpemVkID0gW11cbiAgICBmb3IgKGxldCBpIG9mIHBsdWdpbnMpIHtcbiAgICAgIGlmIChpLnBvc3Rjc3MgPT09IHRydWUpIHtcbiAgICAgICAgaSA9IGkoKVxuICAgICAgfSBlbHNlIGlmIChpLnBvc3Rjc3MpIHtcbiAgICAgICAgaSA9IGkucG9zdGNzc1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkoaS5wbHVnaW5zKSkge1xuICAgICAgICBub3JtYWxpemVkID0gbm9ybWFsaXplZC5jb25jYXQoaS5wbHVnaW5zKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgaS5wb3N0Y3NzUGx1Z2luKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQucHVzaChpKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBub3JtYWxpemVkLnB1c2goaSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIChpLnBhcnNlIHx8IGkuc3RyaW5naWZ5KSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdQb3N0Q1NTIHN5bnRheGVzIGNhbm5vdCBiZSB1c2VkIGFzIHBsdWdpbnMuIEluc3RlYWQsIHBsZWFzZSB1c2UgJyArXG4gICAgICAgICAgICAgICdvbmUgb2YgdGhlIHN5bnRheC9wYXJzZXIvc3RyaW5naWZpZXIgb3B0aW9ucyBhcyBvdXRsaW5lZCAnICtcbiAgICAgICAgICAgICAgJ2luIHlvdXIgUG9zdENTUyBydW5uZXIgZG9jdW1lbnRhdGlvbi4nXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaSArICcgaXMgbm90IGEgUG9zdENTUyBwbHVnaW4nKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplZFxuICB9XG5cbiAgcHJvY2Vzcyhjc3MsIG9wdHMgPSB7fSkge1xuICAgIGlmIChcbiAgICAgIHRoaXMucGx1Z2lucy5sZW5ndGggPT09IDAgJiZcbiAgICAgIHR5cGVvZiBvcHRzLnBhcnNlciA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBvcHRzLnN0cmluZ2lmaWVyID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIG9wdHMuc3ludGF4ID09PSAndW5kZWZpbmVkJ1xuICAgICkge1xuICAgICAgcmV0dXJuIG5ldyBOb1dvcmtSZXN1bHQodGhpcywgY3NzLCBvcHRzKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IExhenlSZXN1bHQodGhpcywgY3NzLCBvcHRzKVxuICAgIH1cbiAgfVxuXG4gIHVzZShwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLnBsdWdpbnMuY29uY2F0KHRoaXMubm9ybWFsaXplKFtwbHVnaW5dKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvY2Vzc29yXG5Qcm9jZXNzb3IuZGVmYXVsdCA9IFByb2Nlc3NvclxuXG5Sb290LnJlZ2lzdGVyUHJvY2Vzc29yKFByb2Nlc3NvcilcbkRvY3VtZW50LnJlZ2lzdGVyUHJvY2Vzc29yKFByb2Nlc3NvcilcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgV2FybmluZyA9IHJlcXVpcmUoJy4vd2FybmluZycpXG5cbmNsYXNzIFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByb2Nlc3Nvciwgcm9vdCwgb3B0cykge1xuICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yXG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdXG4gICAgdGhpcy5yb290ID0gcm9vdFxuICAgIHRoaXMub3B0cyA9IG9wdHNcbiAgICB0aGlzLmNzcyA9IHVuZGVmaW5lZFxuICAgIHRoaXMubWFwID0gdW5kZWZpbmVkXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jc3NcbiAgfVxuXG4gIHdhcm4odGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgaWYgKCFvcHRzLnBsdWdpbikge1xuICAgICAgaWYgKHRoaXMubGFzdFBsdWdpbiAmJiB0aGlzLmxhc3RQbHVnaW4ucG9zdGNzc1BsdWdpbikge1xuICAgICAgICBvcHRzLnBsdWdpbiA9IHRoaXMubGFzdFBsdWdpbi5wb3N0Y3NzUGx1Z2luXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHdhcm5pbmcgPSBuZXcgV2FybmluZyh0ZXh0LCBvcHRzKVxuICAgIHRoaXMubWVzc2FnZXMucHVzaCh3YXJuaW5nKVxuXG4gICAgcmV0dXJuIHdhcm5pbmdcbiAgfVxuXG4gIHdhcm5pbmdzKCkge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzLmZpbHRlcihpID0+IGkudHlwZSA9PT0gJ3dhcm5pbmcnKVxuICB9XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXN1bHRcblJlc3VsdC5kZWZhdWx0ID0gUmVzdWx0XG4iLCIndXNlIHN0cmljdCdcblxubGV0IENvbnRhaW5lciA9IHJlcXVpcmUoJy4vY29udGFpbmVyJylcblxubGV0IExhenlSZXN1bHQsIFByb2Nlc3NvclxuXG5jbGFzcyBSb290IGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAncm9vdCdcbiAgICBpZiAoIXRoaXMubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICB9XG5cbiAgbm9ybWFsaXplKGNoaWxkLCBzYW1wbGUsIHR5cGUpIHtcbiAgICBsZXQgbm9kZXMgPSBzdXBlci5ub3JtYWxpemUoY2hpbGQpXG5cbiAgICBpZiAoc2FtcGxlKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ3ByZXBlbmQnKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBzYW1wbGUucmF3cy5iZWZvcmUgPSB0aGlzLm5vZGVzWzFdLnJhd3MuYmVmb3JlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHNhbXBsZS5yYXdzLmJlZm9yZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3QgIT09IHNhbXBsZSkge1xuICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgbm9kZS5yYXdzLmJlZm9yZSA9IHNhbXBsZS5yYXdzLmJlZm9yZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVzXG4gIH1cblxuICByZW1vdmVDaGlsZChjaGlsZCwgaWdub3JlKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleChjaGlsZClcblxuICAgIGlmICghaWdub3JlICYmIGluZGV4ID09PSAwICYmIHRoaXMubm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5ub2Rlc1sxXS5yYXdzLmJlZm9yZSA9IHRoaXMubm9kZXNbaW5kZXhdLnJhd3MuYmVmb3JlXG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnJlbW92ZUNoaWxkKGNoaWxkKVxuICB9XG5cbiAgdG9SZXN1bHQob3B0cyA9IHt9KSB7XG4gICAgbGV0IGxhenkgPSBuZXcgTGF6eVJlc3VsdChuZXcgUHJvY2Vzc29yKCksIHRoaXMsIG9wdHMpXG4gICAgcmV0dXJuIGxhenkuc3RyaW5naWZ5KClcbiAgfVxufVxuXG5Sb290LnJlZ2lzdGVyTGF6eVJlc3VsdCA9IGRlcGVuZGFudCA9PiB7XG4gIExhenlSZXN1bHQgPSBkZXBlbmRhbnRcbn1cblxuUm9vdC5yZWdpc3RlclByb2Nlc3NvciA9IGRlcGVuZGFudCA9PiB7XG4gIFByb2Nlc3NvciA9IGRlcGVuZGFudFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3RcblJvb3QuZGVmYXVsdCA9IFJvb3RcblxuQ29udGFpbmVyLnJlZ2lzdGVyUm9vdChSb290KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpXG5sZXQgbGlzdCA9IHJlcXVpcmUoJy4vbGlzdCcpXG5cbmNsYXNzIFJ1bGUgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgIHN1cGVyKGRlZmF1bHRzKVxuICAgIHRoaXMudHlwZSA9ICdydWxlJ1xuICAgIGlmICghdGhpcy5ub2RlcykgdGhpcy5ub2RlcyA9IFtdXG4gIH1cblxuICBnZXQgc2VsZWN0b3JzKCkge1xuICAgIHJldHVybiBsaXN0LmNvbW1hKHRoaXMuc2VsZWN0b3IpXG4gIH1cblxuICBzZXQgc2VsZWN0b3JzKHZhbHVlcykge1xuICAgIGxldCBtYXRjaCA9IHRoaXMuc2VsZWN0b3IgPyB0aGlzLnNlbGVjdG9yLm1hdGNoKC8sXFxzKi8pIDogbnVsbFxuICAgIGxldCBzZXAgPSBtYXRjaCA/IG1hdGNoWzBdIDogJywnICsgdGhpcy5yYXcoJ2JldHdlZW4nLCAnYmVmb3JlT3BlbicpXG4gICAgdGhpcy5zZWxlY3RvciA9IHZhbHVlcy5qb2luKHNlcClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1bGVcblJ1bGUuZGVmYXVsdCA9IFJ1bGVcblxuQ29udGFpbmVyLnJlZ2lzdGVyUnVsZShSdWxlKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IERFRkFVTFRfUkFXID0ge1xuICBhZnRlcjogJ1xcbicsXG4gIGJlZm9yZUNsb3NlOiAnXFxuJyxcbiAgYmVmb3JlQ29tbWVudDogJ1xcbicsXG4gIGJlZm9yZURlY2w6ICdcXG4nLFxuICBiZWZvcmVPcGVuOiAnICcsXG4gIGJlZm9yZVJ1bGU6ICdcXG4nLFxuICBjb2xvbjogJzogJyxcbiAgY29tbWVudExlZnQ6ICcgJyxcbiAgY29tbWVudFJpZ2h0OiAnICcsXG4gIGVtcHR5Qm9keTogJycsXG4gIGluZGVudDogJyAgICAnLFxuICBzZW1pY29sb246IGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHJldHVybiBzdHJbMF0udG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufVxuXG5jbGFzcyBTdHJpbmdpZmllciB7XG4gIGNvbnN0cnVjdG9yKGJ1aWxkZXIpIHtcbiAgICB0aGlzLmJ1aWxkZXIgPSBidWlsZGVyXG4gIH1cblxuICBhdHJ1bGUobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgbGV0IG5hbWUgPSAnQCcgKyBub2RlLm5hbWVcbiAgICBsZXQgcGFyYW1zID0gbm9kZS5wYXJhbXMgPyB0aGlzLnJhd1ZhbHVlKG5vZGUsICdwYXJhbXMnKSA6ICcnXG5cbiAgICBpZiAodHlwZW9mIG5vZGUucmF3cy5hZnRlck5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBuYW1lICs9IG5vZGUucmF3cy5hZnRlck5hbWVcbiAgICB9IGVsc2UgaWYgKHBhcmFtcykge1xuICAgICAgbmFtZSArPSAnICdcbiAgICB9XG5cbiAgICBpZiAobm9kZS5ub2Rlcykge1xuICAgICAgdGhpcy5ibG9jayhub2RlLCBuYW1lICsgcGFyYW1zKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZW5kID0gKG5vZGUucmF3cy5iZXR3ZWVuIHx8ICcnKSArIChzZW1pY29sb24gPyAnOycgOiAnJylcbiAgICAgIHRoaXMuYnVpbGRlcihuYW1lICsgcGFyYW1zICsgZW5kLCBub2RlKVxuICAgIH1cbiAgfVxuXG4gIGJlZm9yZUFmdGVyKG5vZGUsIGRldGVjdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIGlmIChub2RlLnR5cGUgPT09ICdkZWNsJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlRGVjbCcpXG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ29tbWVudCcpXG4gICAgfSBlbHNlIGlmIChkZXRlY3QgPT09ICdiZWZvcmUnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVSdWxlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ2xvc2UnKVxuICAgIH1cblxuICAgIGxldCBidWYgPSBub2RlLnBhcmVudFxuICAgIGxldCBkZXB0aCA9IDBcbiAgICB3aGlsZSAoYnVmICYmIGJ1Zi50eXBlICE9PSAncm9vdCcpIHtcbiAgICAgIGRlcHRoICs9IDFcbiAgICAgIGJ1ZiA9IGJ1Zi5wYXJlbnRcbiAgICB9XG5cbiAgICBpZiAodmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICBsZXQgaW5kZW50ID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2luZGVudCcpXG4gICAgICBpZiAoaW5kZW50Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGRlcHRoOyBzdGVwKyspIHZhbHVlICs9IGluZGVudFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgYmxvY2sobm9kZSwgc3RhcnQpIHtcbiAgICBsZXQgYmV0d2VlbiA9IHRoaXMucmF3KG5vZGUsICdiZXR3ZWVuJywgJ2JlZm9yZU9wZW4nKVxuICAgIHRoaXMuYnVpbGRlcihzdGFydCArIGJldHdlZW4gKyAneycsIG5vZGUsICdzdGFydCcpXG5cbiAgICBsZXQgYWZ0ZXJcbiAgICBpZiAobm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5ib2R5KG5vZGUpXG4gICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJywgJ2VtcHR5Qm9keScpXG4gICAgfVxuXG4gICAgaWYgKGFmdGVyKSB0aGlzLmJ1aWxkZXIoYWZ0ZXIpXG4gICAgdGhpcy5idWlsZGVyKCd9Jywgbm9kZSwgJ2VuZCcpXG4gIH1cblxuICBib2R5KG5vZGUpIHtcbiAgICBsZXQgbGFzdCA9IG5vZGUubm9kZXMubGVuZ3RoIC0gMVxuICAgIHdoaWxlIChsYXN0ID4gMCkge1xuICAgICAgaWYgKG5vZGUubm9kZXNbbGFzdF0udHlwZSAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgbGFzdCAtPSAxXG4gICAgfVxuXG4gICAgbGV0IHNlbWljb2xvbiA9IHRoaXMucmF3KG5vZGUsICdzZW1pY29sb24nKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoaWxkID0gbm9kZS5ub2Rlc1tpXVxuICAgICAgbGV0IGJlZm9yZSA9IHRoaXMucmF3KGNoaWxkLCAnYmVmb3JlJylcbiAgICAgIGlmIChiZWZvcmUpIHRoaXMuYnVpbGRlcihiZWZvcmUpXG4gICAgICB0aGlzLnN0cmluZ2lmeShjaGlsZCwgbGFzdCAhPT0gaSB8fCBzZW1pY29sb24pXG4gICAgfVxuICB9XG5cbiAgY29tbWVudChub2RlKSB7XG4gICAgbGV0IGxlZnQgPSB0aGlzLnJhdyhub2RlLCAnbGVmdCcsICdjb21tZW50TGVmdCcpXG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5yYXcobm9kZSwgJ3JpZ2h0JywgJ2NvbW1lbnRSaWdodCcpXG4gICAgdGhpcy5idWlsZGVyKCcvKicgKyBsZWZ0ICsgbm9kZS50ZXh0ICsgcmlnaHQgKyAnKi8nLCBub2RlKVxuICB9XG5cbiAgZGVjbChub2RlLCBzZW1pY29sb24pIHtcbiAgICBsZXQgYmV0d2VlbiA9IHRoaXMucmF3KG5vZGUsICdiZXR3ZWVuJywgJ2NvbG9uJylcbiAgICBsZXQgc3RyaW5nID0gbm9kZS5wcm9wICsgYmV0d2VlbiArIHRoaXMucmF3VmFsdWUobm9kZSwgJ3ZhbHVlJylcblxuICAgIGlmIChub2RlLmltcG9ydGFudCkge1xuICAgICAgc3RyaW5nICs9IG5vZGUucmF3cy5pbXBvcnRhbnQgfHwgJyAhaW1wb3J0YW50J1xuICAgIH1cblxuICAgIGlmIChzZW1pY29sb24pIHN0cmluZyArPSAnOydcbiAgICB0aGlzLmJ1aWxkZXIoc3RyaW5nLCBub2RlKVxuICB9XG5cbiAgZG9jdW1lbnQobm9kZSkge1xuICAgIHRoaXMuYm9keShub2RlKVxuICB9XG5cbiAgcmF3KG5vZGUsIG93biwgZGV0ZWN0KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgaWYgKCFkZXRlY3QpIGRldGVjdCA9IG93blxuXG4gICAgLy8gQWxyZWFkeSBoYWRcbiAgICBpZiAob3duKSB7XG4gICAgICB2YWx1ZSA9IG5vZGUucmF3c1tvd25dXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50XG5cbiAgICBpZiAoZGV0ZWN0ID09PSAnYmVmb3JlJykge1xuICAgICAgLy8gSGFjayBmb3IgZmlyc3QgcnVsZSBpbiBDU1NcbiAgICAgIGlmICghcGFyZW50IHx8IChwYXJlbnQudHlwZSA9PT0gJ3Jvb3QnICYmIHBhcmVudC5maXJzdCA9PT0gbm9kZSkpIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgICB9XG5cbiAgICAgIC8vIGByb290YCBub2RlcyBpbiBgZG9jdW1lbnRgIHNob3VsZCB1c2Ugb25seSB0aGVpciBvd24gcmF3c1xuICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQudHlwZSA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGbG9hdGluZyBjaGlsZCB3aXRob3V0IHBhcmVudFxuICAgIGlmICghcGFyZW50KSByZXR1cm4gREVGQVVMVF9SQVdbZGV0ZWN0XVxuXG4gICAgLy8gRGV0ZWN0IHN0eWxlIGJ5IG90aGVyIG5vZGVzXG4gICAgbGV0IHJvb3QgPSBub2RlLnJvb3QoKVxuICAgIGlmICghcm9vdC5yYXdDYWNoZSkgcm9vdC5yYXdDYWNoZSA9IHt9XG4gICAgaWYgKHR5cGVvZiByb290LnJhd0NhY2hlW2RldGVjdF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gcm9vdC5yYXdDYWNoZVtkZXRlY3RdXG4gICAgfVxuXG4gICAgaWYgKGRldGVjdCA9PT0gJ2JlZm9yZScgfHwgZGV0ZWN0ID09PSAnYWZ0ZXInKSB7XG4gICAgICByZXR1cm4gdGhpcy5iZWZvcmVBZnRlcihub2RlLCBkZXRlY3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtZXRob2QgPSAncmF3JyArIGNhcGl0YWxpemUoZGV0ZWN0KVxuICAgICAgaWYgKHRoaXNbbWV0aG9kXSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXNbbWV0aG9kXShyb290LCBub2RlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzW293bl1cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHZhbHVlID0gREVGQVVMVF9SQVdbZGV0ZWN0XVxuXG4gICAgcm9vdC5yYXdDYWNoZVtkZXRlY3RdID0gdmFsdWVcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZUNsb3NlKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYWZ0ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdmFsdWUgPSBpLnJhd3MuYWZ0ZXJcbiAgICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAodmFsdWUpIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxTL2csICcnKVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlQ29tbWVudChyb290LCBub2RlKSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrQ29tbWVudHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZVxuICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZURlY2wnKVxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxTL2csICcnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZURlY2wocm9vdCwgbm9kZSkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2Fsa0RlY2xzKGkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZWZvcmVcbiAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCdcXG4nKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVSdWxlJylcbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcUy9nLCAnJylcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVPcGVuKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS50eXBlICE9PSAnZGVjbCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmV0d2VlblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZVJ1bGUocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIChpLnBhcmVudCAhPT0gcm9vdCB8fCByb290LmZpcnN0ICE9PSBpKSkge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlXG4gICAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCdcXG4nKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcUy9nLCAnJylcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0NvbG9uKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGtEZWNscyhpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJldHdlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJldHdlZW4ucmVwbGFjZSgvW15cXHM6XS9nLCAnJylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0VtcHR5Qm9keShyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYWZ0ZXJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdJbmRlbnQocm9vdCkge1xuICAgIGlmIChyb290LnJhd3MuaW5kZW50KSByZXR1cm4gcm9vdC5yYXdzLmluZGVudFxuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGxldCBwID0gaS5wYXJlbnRcbiAgICAgIGlmIChwICYmIHAgIT09IHJvb3QgJiYgcC5wYXJlbnQgJiYgcC5wYXJlbnQgPT09IHJvb3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxldCBwYXJ0cyA9IGkucmF3cy5iZWZvcmUuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgdmFsdWUgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXVxuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxTL2csICcnKVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd1NlbWljb2xvbihyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggJiYgaS5sYXN0LnR5cGUgPT09ICdkZWNsJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5zZW1pY29sb25cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdWYWx1ZShub2RlLCBwcm9wKSB7XG4gICAgbGV0IHZhbHVlID0gbm9kZVtwcm9wXVxuICAgIGxldCByYXcgPSBub2RlLnJhd3NbcHJvcF1cbiAgICBpZiAocmF3ICYmIHJhdy52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiByYXcucmF3XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByb290KG5vZGUpIHtcbiAgICB0aGlzLmJvZHkobm9kZSlcbiAgICBpZiAobm9kZS5yYXdzLmFmdGVyKSB0aGlzLmJ1aWxkZXIobm9kZS5yYXdzLmFmdGVyKVxuICB9XG5cbiAgcnVsZShub2RlKSB7XG4gICAgdGhpcy5ibG9jayhub2RlLCB0aGlzLnJhd1ZhbHVlKG5vZGUsICdzZWxlY3RvcicpKVxuICAgIGlmIChub2RlLnJhd3Mub3duU2VtaWNvbG9uKSB7XG4gICAgICB0aGlzLmJ1aWxkZXIobm9kZS5yYXdzLm93blNlbWljb2xvbiwgbm9kZSwgJ2VuZCcpXG4gICAgfVxuICB9XG5cbiAgc3RyaW5naWZ5KG5vZGUsIHNlbWljb2xvbikge1xuICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgIGlmICghdGhpc1tub2RlLnR5cGVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdVbmtub3duIEFTVCBub2RlIHR5cGUgJyArXG4gICAgICAgICAgbm9kZS50eXBlICtcbiAgICAgICAgICAnLiAnICtcbiAgICAgICAgICAnTWF5YmUgeW91IG5lZWQgdG8gY2hhbmdlIFBvc3RDU1Mgc3RyaW5naWZpZXIuJ1xuICAgICAgKVxuICAgIH1cbiAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBzZW1pY29sb24pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmdpZmllclxuU3RyaW5naWZpZXIuZGVmYXVsdCA9IFN0cmluZ2lmaWVyXG4iLCIndXNlIHN0cmljdCdcblxubGV0IFN0cmluZ2lmaWVyID0gcmVxdWlyZSgnLi9zdHJpbmdpZmllcicpXG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShub2RlLCBidWlsZGVyKSB7XG4gIGxldCBzdHIgPSBuZXcgU3RyaW5naWZpZXIoYnVpbGRlcilcbiAgc3RyLnN0cmluZ2lmeShub2RlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuc3RyaW5naWZ5LmRlZmF1bHQgPSBzdHJpbmdpZnlcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cy5pc0NsZWFuID0gU3ltYm9sKCdpc0NsZWFuJylcblxubW9kdWxlLmV4cG9ydHMubXkgPSBTeW1ib2woJ215JylcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTSU5HTEVfUVVPVEUgPSBcIidcIi5jaGFyQ29kZUF0KDApXG5jb25zdCBET1VCTEVfUVVPVEUgPSAnXCInLmNoYXJDb2RlQXQoMClcbmNvbnN0IEJBQ0tTTEFTSCA9ICdcXFxcJy5jaGFyQ29kZUF0KDApXG5jb25zdCBTTEFTSCA9ICcvJy5jaGFyQ29kZUF0KDApXG5jb25zdCBORVdMSU5FID0gJ1xcbicuY2hhckNvZGVBdCgwKVxuY29uc3QgU1BBQ0UgPSAnICcuY2hhckNvZGVBdCgwKVxuY29uc3QgRkVFRCA9ICdcXGYnLmNoYXJDb2RlQXQoMClcbmNvbnN0IFRBQiA9ICdcXHQnLmNoYXJDb2RlQXQoMClcbmNvbnN0IENSID0gJ1xccicuY2hhckNvZGVBdCgwKVxuY29uc3QgT1BFTl9TUVVBUkUgPSAnWycuY2hhckNvZGVBdCgwKVxuY29uc3QgQ0xPU0VfU1FVQVJFID0gJ10nLmNoYXJDb2RlQXQoMClcbmNvbnN0IE9QRU5fUEFSRU5USEVTRVMgPSAnKCcuY2hhckNvZGVBdCgwKVxuY29uc3QgQ0xPU0VfUEFSRU5USEVTRVMgPSAnKScuY2hhckNvZGVBdCgwKVxuY29uc3QgT1BFTl9DVVJMWSA9ICd7Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9DVVJMWSA9ICd9Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBTRU1JQ09MT04gPSAnOycuY2hhckNvZGVBdCgwKVxuY29uc3QgQVNURVJJU0sgPSAnKicuY2hhckNvZGVBdCgwKVxuY29uc3QgQ09MT04gPSAnOicuY2hhckNvZGVBdCgwKVxuY29uc3QgQVQgPSAnQCcuY2hhckNvZGVBdCgwKVxuXG5jb25zdCBSRV9BVF9FTkQgPSAvW1xcdFxcblxcZlxcciBcIiMnKCkvO1tcXFxcXFxde31dL2dcbmNvbnN0IFJFX1dPUkRfRU5EID0gL1tcXHRcXG5cXGZcXHIgIVwiIycoKTo7QFtcXFxcXFxde31dfFxcLyg/PVxcKikvZ1xuY29uc3QgUkVfQkFEX0JSQUNLRVQgPSAvLltcXHJcXG5cIicoL1xcXFxdL1xuY29uc3QgUkVfSEVYX0VTQ0FQRSA9IC9bXFxkYS1mXS9pXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9rZW5pemVyKGlucHV0LCBvcHRpb25zID0ge30pIHtcbiAgbGV0IGNzcyA9IGlucHV0LmNzcy52YWx1ZU9mKClcbiAgbGV0IGlnbm9yZSA9IG9wdGlvbnMuaWdub3JlRXJyb3JzXG5cbiAgbGV0IGNvZGUsIG5leHQsIHF1b3RlLCBjb250ZW50LCBlc2NhcGVcbiAgbGV0IGVzY2FwZWQsIGVzY2FwZVBvcywgcHJldiwgbiwgY3VycmVudFRva2VuXG5cbiAgbGV0IGxlbmd0aCA9IGNzcy5sZW5ndGhcbiAgbGV0IHBvcyA9IDBcbiAgbGV0IGJ1ZmZlciA9IFtdXG4gIGxldCByZXR1cm5lZCA9IFtdXG5cbiAgZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHBvc1xuICB9XG5cbiAgZnVuY3Rpb24gdW5jbG9zZWQod2hhdCkge1xuICAgIHRocm93IGlucHV0LmVycm9yKCdVbmNsb3NlZCAnICsgd2hhdCwgcG9zKVxuICB9XG5cbiAgZnVuY3Rpb24gZW5kT2ZGaWxlKCkge1xuICAgIHJldHVybiByZXR1cm5lZC5sZW5ndGggPT09IDAgJiYgcG9zID49IGxlbmd0aFxuICB9XG5cbiAgZnVuY3Rpb24gbmV4dFRva2VuKG9wdHMpIHtcbiAgICBpZiAocmV0dXJuZWQubGVuZ3RoKSByZXR1cm4gcmV0dXJuZWQucG9wKClcbiAgICBpZiAocG9zID49IGxlbmd0aCkgcmV0dXJuXG5cbiAgICBsZXQgaWdub3JlVW5jbG9zZWQgPSBvcHRzID8gb3B0cy5pZ25vcmVVbmNsb3NlZCA6IGZhbHNlXG5cbiAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQocG9zKVxuXG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICBjYXNlIE5FV0xJTkU6XG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgY2FzZSBUQUI6XG4gICAgICBjYXNlIENSOlxuICAgICAgY2FzZSBGRUVEOiB7XG4gICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChuZXh0KVxuICAgICAgICB9IHdoaWxlIChcbiAgICAgICAgICBjb2RlID09PSBTUEFDRSB8fFxuICAgICAgICAgIGNvZGUgPT09IE5FV0xJTkUgfHxcbiAgICAgICAgICBjb2RlID09PSBUQUIgfHxcbiAgICAgICAgICBjb2RlID09PSBDUiB8fFxuICAgICAgICAgIGNvZGUgPT09IEZFRURcbiAgICAgICAgKVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnc3BhY2UnLCBjc3Muc2xpY2UocG9zLCBuZXh0KV1cbiAgICAgICAgcG9zID0gbmV4dCAtIDFcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBPUEVOX1NRVUFSRTpcbiAgICAgIGNhc2UgQ0xPU0VfU1FVQVJFOlxuICAgICAgY2FzZSBPUEVOX0NVUkxZOlxuICAgICAgY2FzZSBDTE9TRV9DVVJMWTpcbiAgICAgIGNhc2UgQ09MT046XG4gICAgICBjYXNlIFNFTUlDT0xPTjpcbiAgICAgIGNhc2UgQ0xPU0VfUEFSRU5USEVTRVM6IHtcbiAgICAgICAgbGV0IGNvbnRyb2xDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKVxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbY29udHJvbENoYXIsIGNvbnRyb2xDaGFyLCBwb3NdXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgT1BFTl9QQVJFTlRIRVNFUzoge1xuICAgICAgICBwcmV2ID0gYnVmZmVyLmxlbmd0aCA/IGJ1ZmZlci5wb3AoKVsxXSA6ICcnXG4gICAgICAgIG4gPSBjc3MuY2hhckNvZGVBdChwb3MgKyAxKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJldiA9PT0gJ3VybCcgJiZcbiAgICAgICAgICBuICE9PSBTSU5HTEVfUVVPVEUgJiZcbiAgICAgICAgICBuICE9PSBET1VCTEVfUVVPVEUgJiZcbiAgICAgICAgICBuICE9PSBTUEFDRSAmJlxuICAgICAgICAgIG4gIT09IE5FV0xJTkUgJiZcbiAgICAgICAgICBuICE9PSBUQUIgJiZcbiAgICAgICAgICBuICE9PSBGRUVEICYmXG4gICAgICAgICAgbiAhPT0gQ1JcbiAgICAgICAgKSB7XG4gICAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGVzY2FwZWQgPSBmYWxzZVxuICAgICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcpJywgbmV4dCArIDEpXG4gICAgICAgICAgICBpZiAobmV4dCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgaWYgKGlnbm9yZSB8fCBpZ25vcmVVbmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVuY2xvc2VkKCdicmFja2V0JylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXNjYXBlUG9zID0gbmV4dFxuICAgICAgICAgICAgd2hpbGUgKGNzcy5jaGFyQ29kZUF0KGVzY2FwZVBvcyAtIDEpID09PSBCQUNLU0xBU0gpIHtcbiAgICAgICAgICAgICAgZXNjYXBlUG9zIC09IDFcbiAgICAgICAgICAgICAgZXNjYXBlZCA9ICFlc2NhcGVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAoZXNjYXBlZClcblxuICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYnJhY2tldHMnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF1cblxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoJyknLCBwb3MgKyAxKVxuICAgICAgICAgIGNvbnRlbnQgPSBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSlcblxuICAgICAgICAgIGlmIChuZXh0ID09PSAtMSB8fCBSRV9CQURfQlJBQ0tFVC50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJygnLCAnKCcsIHBvc11cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFRva2VuID0gWydicmFja2V0cycsIGNvbnRlbnQsIHBvcywgbmV4dF1cbiAgICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIFNJTkdMRV9RVU9URTpcbiAgICAgIGNhc2UgRE9VQkxFX1FVT1RFOiB7XG4gICAgICAgIHF1b3RlID0gY29kZSA9PT0gU0lOR0xFX1FVT1RFID8gXCInXCIgOiAnXCInXG4gICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGVzY2FwZWQgPSBmYWxzZVxuICAgICAgICAgIG5leHQgPSBjc3MuaW5kZXhPZihxdW90ZSwgbmV4dCArIDEpXG4gICAgICAgICAgaWYgKG5leHQgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIG5leHQgPSBwb3MgKyAxXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1bmNsb3NlZCgnc3RyaW5nJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZXNjYXBlUG9zID0gbmV4dFxuICAgICAgICAgIHdoaWxlIChjc3MuY2hhckNvZGVBdChlc2NhcGVQb3MgLSAxKSA9PT0gQkFDS1NMQVNIKSB7XG4gICAgICAgICAgICBlc2NhcGVQb3MgLT0gMVxuICAgICAgICAgICAgZXNjYXBlZCA9ICFlc2NhcGVkXG4gICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChlc2NhcGVkKVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnc3RyaW5nJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdXG4gICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBBVDoge1xuICAgICAgICBSRV9BVF9FTkQubGFzdEluZGV4ID0gcG9zICsgMVxuICAgICAgICBSRV9BVF9FTkQudGVzdChjc3MpXG4gICAgICAgIGlmIChSRV9BVF9FTkQubGFzdEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCA9IFJFX0FUX0VORC5sYXN0SW5kZXggLSAyXG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ2F0LXdvcmQnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF1cblxuICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgQkFDS1NMQVNIOiB7XG4gICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgZXNjYXBlID0gdHJ1ZVxuICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpID09PSBCQUNLU0xBU0gpIHtcbiAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICBlc2NhcGUgPSAhZXNjYXBlXG4gICAgICAgIH1cbiAgICAgICAgY29kZSA9IGNzcy5jaGFyQ29kZUF0KG5leHQgKyAxKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgZXNjYXBlICYmXG4gICAgICAgICAgY29kZSAhPT0gU0xBU0ggJiZcbiAgICAgICAgICBjb2RlICE9PSBTUEFDRSAmJlxuICAgICAgICAgIGNvZGUgIT09IE5FV0xJTkUgJiZcbiAgICAgICAgICBjb2RlICE9PSBUQUIgJiZcbiAgICAgICAgICBjb2RlICE9PSBDUiAmJlxuICAgICAgICAgIGNvZGUgIT09IEZFRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgbmV4dCArPSAxXG4gICAgICAgICAgaWYgKFJFX0hFWF9FU0NBUEUudGVzdChjc3MuY2hhckF0KG5leHQpKSkge1xuICAgICAgICAgICAgd2hpbGUgKFJFX0hFWF9FU0NBUEUudGVzdChjc3MuY2hhckF0KG5leHQgKyAxKSkpIHtcbiAgICAgICAgICAgICAgbmV4dCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpID09PSBTUEFDRSkge1xuICAgICAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3dvcmQnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF1cblxuICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKGNvZGUgPT09IFNMQVNIICYmIGNzcy5jaGFyQ29kZUF0KHBvcyArIDEpID09PSBBU1RFUklTSykge1xuICAgICAgICAgIG5leHQgPSBjc3MuaW5kZXhPZignKi8nLCBwb3MgKyAyKSArIDFcbiAgICAgICAgICBpZiAobmV4dCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKGlnbm9yZSB8fCBpZ25vcmVVbmNsb3NlZCkge1xuICAgICAgICAgICAgICBuZXh0ID0gY3NzLmxlbmd0aFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdW5jbG9zZWQoJ2NvbW1lbnQnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnY29tbWVudCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XVxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBSRV9XT1JEX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxXG4gICAgICAgICAgUkVfV09SRF9FTkQudGVzdChjc3MpXG4gICAgICAgICAgaWYgKFJFX1dPUkRfRU5ELmxhc3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQgPSBSRV9XT1JEX0VORC5sYXN0SW5kZXggLSAyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VycmVudFRva2VuID0gWyd3b3JkJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdXG4gICAgICAgICAgYnVmZmVyLnB1c2goY3VycmVudFRva2VuKVxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgcG9zKytcbiAgICByZXR1cm4gY3VycmVudFRva2VuXG4gIH1cblxuICBmdW5jdGlvbiBiYWNrKHRva2VuKSB7XG4gICAgcmV0dXJuZWQucHVzaCh0b2tlbilcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmFjayxcbiAgICBlbmRPZkZpbGUsXG4gICAgbmV4dFRva2VuLFxuICAgIHBvc2l0aW9uXG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbid1c2Ugc3RyaWN0J1xuXG5sZXQgcHJpbnRlZCA9IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2Fybk9uY2UobWVzc2FnZSkge1xuICBpZiAocHJpbnRlZFttZXNzYWdlXSkgcmV0dXJuXG4gIHByaW50ZWRbbWVzc2FnZV0gPSB0cnVlXG5cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLndhcm4pIHtcbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSlcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIFdhcm5pbmcge1xuICBjb25zdHJ1Y3Rvcih0ZXh0LCBvcHRzID0ge30pIHtcbiAgICB0aGlzLnR5cGUgPSAnd2FybmluZydcbiAgICB0aGlzLnRleHQgPSB0ZXh0XG5cbiAgICBpZiAob3B0cy5ub2RlICYmIG9wdHMubm9kZS5zb3VyY2UpIHtcbiAgICAgIGxldCByYW5nZSA9IG9wdHMubm9kZS5yYW5nZUJ5KG9wdHMpXG4gICAgICB0aGlzLmxpbmUgPSByYW5nZS5zdGFydC5saW5lXG4gICAgICB0aGlzLmNvbHVtbiA9IHJhbmdlLnN0YXJ0LmNvbHVtblxuICAgICAgdGhpcy5lbmRMaW5lID0gcmFuZ2UuZW5kLmxpbmVcbiAgICAgIHRoaXMuZW5kQ29sdW1uID0gcmFuZ2UuZW5kLmNvbHVtblxuICAgIH1cblxuICAgIGZvciAobGV0IG9wdCBpbiBvcHRzKSB0aGlzW29wdF0gPSBvcHRzW29wdF1cbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGlmICh0aGlzLm5vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuZXJyb3IodGhpcy50ZXh0LCB7XG4gICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICBwbHVnaW46IHRoaXMucGx1Z2luLFxuICAgICAgICB3b3JkOiB0aGlzLndvcmRcbiAgICAgIH0pLm1lc3NhZ2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbHVnaW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBsdWdpbiArICc6ICcgKyB0aGlzLnRleHRcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50ZXh0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXJuaW5nXG5XYXJuaW5nLmRlZmF1bHQgPSBXYXJuaW5nXG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCJsZXQgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbmxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgZGVmYXVsdFNpemUgPSAyMSkgPT4ge1xuICByZXR1cm4gKHNpemUgPSBkZWZhdWx0U2l6ZSkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgbGV0IGkgPSBzaXplXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWQgKz0gYWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5sZW5ndGgpIHwgMF1cbiAgICB9XG4gICAgcmV0dXJuIGlkXG4gIH1cbn1cbmxldCBuYW5vaWQgPSAoc2l6ZSA9IDIxKSA9PiB7XG4gIGxldCBpZCA9ICcnXG4gIGxldCBpID0gc2l6ZVxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWQgKz0gdXJsQWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiA2NCkgfCAwXVxuICB9XG4gIHJldHVybiBpZFxufVxubW9kdWxlLmV4cG9ydHMgPSB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQgfVxuIiwiaW1wb3J0IHBvc3Rjc3MgZnJvbSAnLi9wb3N0Y3NzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBwb3N0Y3NzXG5cbmV4cG9ydCBjb25zdCBzdHJpbmdpZnkgPSBwb3N0Y3NzLnN0cmluZ2lmeVxuZXhwb3J0IGNvbnN0IGZyb21KU09OID0gcG9zdGNzcy5mcm9tSlNPTlxuZXhwb3J0IGNvbnN0IHBsdWdpbiA9IHBvc3Rjc3MucGx1Z2luXG5leHBvcnQgY29uc3QgcGFyc2UgPSBwb3N0Y3NzLnBhcnNlXG5leHBvcnQgY29uc3QgbGlzdCA9IHBvc3Rjc3MubGlzdFxuXG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSBwb3N0Y3NzLmRvY3VtZW50XG5leHBvcnQgY29uc3QgY29tbWVudCA9IHBvc3Rjc3MuY29tbWVudFxuZXhwb3J0IGNvbnN0IGF0UnVsZSA9IHBvc3Rjc3MuYXRSdWxlXG5leHBvcnQgY29uc3QgcnVsZSA9IHBvc3Rjc3MucnVsZVxuZXhwb3J0IGNvbnN0IGRlY2wgPSBwb3N0Y3NzLmRlY2xcbmV4cG9ydCBjb25zdCByb290ID0gcG9zdGNzcy5yb290XG5cbmV4cG9ydCBjb25zdCBDc3NTeW50YXhFcnJvciA9IHBvc3Rjc3MuQ3NzU3ludGF4RXJyb3JcbmV4cG9ydCBjb25zdCBEZWNsYXJhdGlvbiA9IHBvc3Rjc3MuRGVjbGFyYXRpb25cbmV4cG9ydCBjb25zdCBDb250YWluZXIgPSBwb3N0Y3NzLkNvbnRhaW5lclxuZXhwb3J0IGNvbnN0IFByb2Nlc3NvciA9IHBvc3Rjc3MuUHJvY2Vzc29yXG5leHBvcnQgY29uc3QgRG9jdW1lbnQgPSBwb3N0Y3NzLkRvY3VtZW50XG5leHBvcnQgY29uc3QgQ29tbWVudCA9IHBvc3Rjc3MuQ29tbWVudFxuZXhwb3J0IGNvbnN0IFdhcm5pbmcgPSBwb3N0Y3NzLldhcm5pbmdcbmV4cG9ydCBjb25zdCBBdFJ1bGUgPSBwb3N0Y3NzLkF0UnVsZVxuZXhwb3J0IGNvbnN0IFJlc3VsdCA9IHBvc3Rjc3MuUmVzdWx0XG5leHBvcnQgY29uc3QgSW5wdXQgPSBwb3N0Y3NzLklucHV0XG5leHBvcnQgY29uc3QgUnVsZSA9IHBvc3Rjc3MuUnVsZVxuZXhwb3J0IGNvbnN0IFJvb3QgPSBwb3N0Y3NzLlJvb3RcbmV4cG9ydCBjb25zdCBOb2RlID0gcG9zdGNzcy5Ob2RlXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2dhbWVTdGFydC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJ1cGRhdGVTY3JlZW4iLCJhdHRhY2tPdGhlciIsImh1bWFuIiwiY29tcHV0ZXIiLCJjZWxsIiwicm93IiwicGFyc2VJbnQiLCJjbGFzc0xpc3QiLCJzbGljZSIsImNvbCIsImJvYXJkIiwiYXR0YWNrIiwiYWlBdHRhY2siLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJTaGlwIiwic2hpcExlbmd0aCIsInNoaXBzIiwibGVuZ3RoIiwiZ290SGl0Iiwic3VuayIsImhpdCIsImlzU3VuayIsInBhcnNlIiwiUmFuZG9taXplIiwiUGxheWVyIiwiZ2FtZVN0YXJ0Iiwic3RhcnRTY3JlZW4iLCJtYWtlVUkiLCJsb2NhbFN0b3JhZ2UiLCJjbGVhciIsInN0YXJ0Q29vcmRzIiwiaW5uZXJIVE1MIiwiaSIsImoiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiY29uY2F0Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3VycmVudFNoaXAiLCJwYXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRyaW0iLCJzdHlsZSIsImJveFNoYWRvdyIsImJvcmRlckNvbG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzaGlwIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzaXplIiwicmVwbGFjZSIsImluY2x1ZGVzIiwiaXNTYWZlIiwiZ2V0SXRlbSIsImNvb3JkIiwidmVydGljYWwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwicHJldmVudERlZmF1bHQiLCJjZWxsSW5kZXgiLCJtYXhJbmRleCIsInRvU3RyaW5nIiwiaXNEcm9wcGVkIiwicHVzaCIsIm5leHRDZWxsSW5kZXgiLCJjZWxsVG9GaWxsIiwicmVtb3ZlIiwic2hpcFJPV0NPT1JEIiwic2hpcENPTENPT1JEIiwiaXNWZXJ0aWNhbCIsInNlbGVjdGVkU2hpcCIsImJvYXJkU2hpcCIsImFpQm9hcmRTaGlwIiwiR2FtZUJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwiZ2V0Qm9hcmQiLCJzaGlwc0JvYXJkZWQiLCJ2ZXJ0aWNhbFBsYWNlIiwidGVtcEJhY2tUcmFjayIsImVuZGluZyIsImNvb3JkcyIsImJhY2tUcmFja1ZlcnRpY2FsIiwiY29vcmRpbmF0ZXMiLCJob3Jpem9udGFsUGxhY2UiLCJiYWNrVHJhY2tIb3Jpem9udGFsIiwiUGxhY2VTaGlwIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiaW5kZXgiLCJyZWNpZXZlQXR0YWNrIiwiZW5lbXlCb2FyZCIsImhpdFNoaXAiLCJmaWx0ZXIiLCJzb21lIiwidXBkYXRlR2FtZSIsImVuZEdhbWUiLCJmaW5kSW5kZXgiLCJzIiwic3BsaWNlIiwibmFtZSIsIl9sb29wIiwiX2xvb3AyIiwiX2oiLCJ0ZW1wQ29vcmRzIiwiZ2FtZUJvYXJkRmFjdCIsInNoaXBDb29yZHMiLCJodW1hbkIiLCJjaGlsZE5vZGVzIiwicGxheWVyTmFtZSIsImlzQUkiLCJNYXRoIiwicmFuZG9tIiwiaXNWYWxpZFNwb3QiLCJmbG9vciIsImVCb2FyZCIsImFpQiIsImhVSSIsImFVSSJdLCJzb3VyY2VSb290IjoiIn0=