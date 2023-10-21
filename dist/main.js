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
              break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFFdkIsU0FBU0MsV0FBV0EsQ0FBQ0MsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRTtFQUN2RCxJQUFJQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0YsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDakQsSUFBSUMsR0FBRyxHQUFHSCxRQUFRLENBQUNGLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUMsSUFBSUwsUUFBUSxDQUFDTyxLQUFLLENBQUNMLEdBQUcsQ0FBQyxDQUFDSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUlOLFFBQVEsQ0FBQ08sS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ2hFUCxLQUFLLENBQUNTLE1BQU0sQ0FBQ04sR0FBRyxFQUFFSSxHQUFHLEVBQUVOLFFBQVEsQ0FBQztJQUNoQ0EsUUFBUSxDQUFDUyxRQUFRLENBQUNWLEtBQUssQ0FBQztJQUN4QixJQUFJVyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7TUFDNUNkLHFEQUFZLENBQUNFLEtBQUssQ0FBQ1EsS0FBSyxFQUFFUCxRQUFRLENBQUNPLEtBQUssQ0FBQztJQUM3QztFQUNKO0FBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ1hlLFNBQVNLLElBQUlBLENBQUNDLFVBQVUsRUFBRTtFQUN2QyxJQUFNQyxLQUFLLEdBQUc7SUFDWkMsTUFBTSxFQUFFRixVQUFVO0lBQ2xCRyxNQUFNLEVBQUUsQ0FBQztJQUNUQyxJQUFJLEVBQUUsS0FBSztJQUVYQyxHQUFHLEVBQUUsU0FBQUEsSUFBQSxFQUFZO01BQ2YsSUFBSSxDQUFDRixNQUFNLEVBQUU7SUFDZixDQUFDO0lBRURHLE1BQU0sRUFBRSxTQUFBQSxPQUFBLEVBQVk7TUFDbEIsSUFBSSxDQUFDSixNQUFNLEtBQUssSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSSxDQUFDQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQ0EsSUFBSSxHQUFHLEtBQUs7SUFDcEU7RUFDRixDQUFDO0VBRUQsT0FBTztJQUFFSCxLQUFLLEVBQUxBO0VBQU0sQ0FBQztBQUNsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJnQztBQUNTO0FBQ25CO0FBQ1E7QUFDRTtBQUNHO0FBRW5DLElBQUlVLFdBQVcsR0FBRyxFQUFFLEdBQ2hCLDZCQUE2QixHQUM3QixrQ0FBa0MsR0FDbEMsNEJBQTRCLEdBQzVCLHdDQUF3QyxHQUN4QyxlQUFlLEdBQ2YscUNBQXFDLEdBQ3JDLFlBQVksR0FDWiwrQkFBK0IsR0FDL0IsbUNBQW1DLEdBQ25DLHdEQUF3RCxHQUN4RCxnRUFBZ0UsR0FDaEUsaUNBQWlDLEdBQ2pDLGNBQWMsR0FDZCw2QkFBNkIsR0FDN0IsaUZBQWlGLEdBQ2pGLDJEQUEyRCxHQUMzRCwyREFBMkQsR0FDM0QsMkRBQTJELEdBQzNELDJEQUEyRCxHQUMzRCwyREFBMkQsR0FDM0QsZUFBZSxHQUNmLHdCQUF3QixHQUN4Qiw4Q0FBOEMsR0FDOUMseUNBQXlDLEdBQ3pDLGNBQWMsR0FDZCxhQUFhLEdBQ2IsZ0dBQWdHLEdBQ2hHLFVBQVUsR0FDVixFQUFFO0FBR1MsU0FBU0MsTUFBTUEsQ0FBQSxFQUFHO0VBQzdCQyxZQUFZLENBQUNDLEtBQUssQ0FBQyxDQUFDO0VBQ3BCLElBQUlDLFdBQVcsR0FBRyxFQUFFO0VBQ3BCbEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUNrQixTQUFTLEdBQUdMLFdBQVc7O0VBRXREOztFQUVBLEtBQUssSUFBSU0sQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7SUFDekIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUN6QixJQUFJOUIsSUFBSSxHQUFHUyxRQUFRLENBQUNzQixhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3hDL0IsSUFBSSxDQUFDRyxTQUFTLENBQUM2QixHQUFHLGFBQUFDLE1BQUEsQ0FBYUosQ0FBQyxFQUFBSSxNQUFBLENBQUdILENBQUMsQ0FBRSxDQUFDO01BQ3ZDOUIsSUFBSSxDQUFDa0MsWUFBWSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQztNQUN0RHpCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDeUIsTUFBTSxDQUFDbkMsSUFBSSxDQUFDO0lBQ2pEO0VBQ0o7O0VBRUE7RUFDQSxLQUFLLElBQUk2QixFQUFDLEdBQUcsQ0FBQyxFQUFFQSxFQUFDLElBQUksQ0FBQyxFQUFFQSxFQUFDLEVBQUUsRUFBRTtJQUN6QixJQUFJTyxXQUFXLEdBQUczQixRQUFRLENBQUNDLGFBQWEsTUFBQXVCLE1BQUEsQ0FBTUosRUFBQyxDQUFFLENBQUM7SUFDbEQsS0FBSyxJQUFJQyxFQUFDLEdBQUcsQ0FBQyxFQUFFQSxFQUFDLElBQUlELEVBQUMsRUFBRUMsRUFBQyxFQUFFLEVBQUU7TUFDekIsSUFBSU8sSUFBSSxHQUFHNUIsUUFBUSxDQUFDc0IsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUN4Q0ssV0FBVyxDQUFDRCxNQUFNLENBQUNFLElBQUksQ0FBQztJQUM1QjtFQUNKOztFQUVBO0VBQ0E1QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzRCLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFBQyxDQUFDLEVBQUk7SUFDMUQsSUFBSUEsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7TUFDOUJqQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQ2tCLFNBQVMsR0FBRyx5QkFBeUI7TUFDdEVuQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQ2lDLEtBQUssQ0FBQ0MsU0FBUyxHQUFHLHNDQUFzQztNQUN6RkwsQ0FBQyxDQUFDQyxNQUFNLENBQUNHLEtBQUssQ0FBQ0UsV0FBVyxHQUFHLEtBQUs7SUFDdEMsQ0FBQyxNQUNJO01BQ0RwQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQ2tCLFNBQVMsR0FBRyxFQUFFO01BQy9DbkIsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUNpQyxLQUFLLENBQUNDLFNBQVMsR0FBRyxNQUFNO01BQ3pETCxDQUFDLENBQUNDLE1BQU0sQ0FBQ0csS0FBSyxDQUFDRSxXQUFXLEdBQUcsT0FBTztJQUN4QztFQUNKLENBQUMsQ0FBQzs7RUFFRjtFQUNBcEMsUUFBUSxDQUFDQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM0QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsQ0FBQyxFQUFJO0lBQzdELElBQUk5QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQytCLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7TUFDckR0QiwyREFBUyxDQUFDWCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQytCLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUMsQ0FBQztNQUN2RGpCLFlBQVksQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxNQUNHO01BQ0FqQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQ2tCLFNBQVMsR0FBRyx5QkFBeUI7TUFDdEVuQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQ2lDLEtBQUssQ0FBQ0MsU0FBUyxHQUFHLHNDQUFzQztNQUN6Rm5DLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDaUMsS0FBSyxDQUFDRSxXQUFXLEdBQUUsS0FBSztJQUM1RDtFQUNKLENBQUMsQ0FBQzs7RUFFRjtFQUNBcEMsUUFBUSxDQUFDcUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUs7SUFDakRBLElBQUksQ0FBQ1YsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUFDLENBQUMsRUFBSTtNQUNwQ2QsWUFBWSxDQUFDd0IsT0FBTyxDQUFDLGFBQWEsRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUM7UUFBRSxTQUFPSCxJQUFJLENBQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQUVpRCxJQUFJLEVBQUVsRCxRQUFRLENBQUM4QyxJQUFJLENBQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNrRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztNQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pJLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUdGNUMsUUFBUSxDQUFDcUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFDL0MsSUFBSSxFQUFLO0lBRWpEQSxJQUFJLENBQUNzQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsQ0FBQyxFQUFJO01BQ2hDLElBQUlaLFdBQVcsQ0FBQzJCLFFBQVEsQ0FBQ3RELElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQzFELElBQUlFLE1BQU0sR0FBRyxLQUFLO1FBQ2xCLElBQUluQixZQUFXO1FBQ2YsS0FBSyxJQUFJUCxHQUFDLEdBQUcsQ0FBQyxFQUFFQSxHQUFDLElBQUksQ0FBQyxFQUFFQSxHQUFDLEVBQUUsRUFBRTtVQUN6QixJQUFJSixZQUFZLENBQUMrQixPQUFPLFFBQUF2QixNQUFBLENBQVFKLEdBQUMsQ0FBRSxDQUFDLEtBQUssSUFBSSxJQUFJcUIsSUFBSSxDQUFDL0IsS0FBSyxDQUFDTSxZQUFZLENBQUMrQixPQUFPLFFBQUF2QixNQUFBLENBQVFKLEdBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQzRCLEtBQUssSUFBSXpELElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN2SWpCLFlBQVcsR0FBR1AsR0FBQztZQUNmO1VBQ0o7UUFDSjtRQUVBLElBQUlxQixJQUFJLENBQUMvQixLQUFLLENBQUNNLFlBQVksQ0FBQytCLE9BQU8sUUFBQXZCLE1BQUEsQ0FBUUcsWUFBVyxDQUFFLENBQUMsQ0FBQyxDQUFDc0IsUUFBUSxLQUFLLEtBQUssRUFBRTtVQUMzRSxLQUFLLElBQUk3QixHQUFDLEdBQUcsQ0FBQyxFQUFFQSxHQUFDLEdBQUdPLFlBQVcsRUFBRVAsR0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSXBCLFFBQVEsQ0FBQ0MsYUFBYSxNQUFBdUIsTUFBQSxDQUFNL0IsUUFBUSxDQUFDRixJQUFJLENBQUNHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUNqRCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUd5QixHQUFDLEVBQUFJLE1BQUEsQ0FBR2pDLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEtBQUssSUFBSSxJQUMvSUssUUFBUSxDQUFDQyxhQUFhLE1BQUF1QixNQUFBLENBQU0vQixRQUFRLENBQUNGLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBR3lCLEdBQUMsRUFBQUksTUFBQSxDQUFHakMsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNrRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDakQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQ3VDLEtBQUssQ0FBQ2dCLGVBQWUsS0FBSyxPQUFPLEVBQ2hMO2NBQ0VKLE1BQU0sR0FBRyxJQUFJO1lBQ2pCLENBQUMsTUFDSTtjQUNEQSxNQUFNLEdBQUcsS0FBSztjQUNkO1lBQ0o7VUFDSjtRQUNKLENBQUMsTUFDSTtVQUNELEtBQUssSUFBSTFCLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBR08sWUFBVyxFQUFFUCxHQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJcEIsUUFBUSxDQUFDQyxhQUFhLE1BQUF1QixNQUFBLENBQU1qQyxJQUFJLENBQUNHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUNqRCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFBNkIsTUFBQSxDQUFHL0IsUUFBUSxDQUFDRixJQUFJLENBQUNHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUNqRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR3lCLEdBQUMsQ0FBRSxDQUFDLEtBQUssSUFBSSxJQUMvSXBCLFFBQVEsQ0FBQ0MsYUFBYSxNQUFBdUIsTUFBQSxDQUFNakMsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNrRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDakQsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQTZCLE1BQUEsQ0FBRy9CLFFBQVEsQ0FBQ0YsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNrRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDakQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUd5QixHQUFDLENBQUUsQ0FBQyxDQUFDYyxLQUFLLENBQUNnQixlQUFlLEtBQUssT0FBTyxFQUFFO2NBQ2hMSixNQUFNLEdBQUcsSUFBSTtZQUNqQixDQUFDLE1BQ0k7Y0FDREEsTUFBTSxHQUFHLEtBQUs7Y0FDZDtZQUNKO1VBQ0o7UUFDSjtRQUNBLElBQUlBLE1BQU0sRUFBRTtVQUNSLEtBQUssSUFBSTFCLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBR08sWUFBVyxFQUFFUCxHQUFDLEVBQUUsRUFBRTtZQUNsQztjQUNJLElBQUlxQixJQUFJLENBQUMvQixLQUFLLENBQUNNLFlBQVksQ0FBQytCLE9BQU8sUUFBQXZCLE1BQUEsQ0FBUUcsWUFBVyxDQUFFLENBQUMsQ0FBQyxDQUFDc0IsUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDM0VqRCxRQUFRLENBQUNDLGFBQWEsTUFBQXVCLE1BQUEsQ0FBTWpDLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUE2QixNQUFBLENBQUcvQixRQUFRLENBQUNGLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHeUIsR0FBQyxDQUFFLENBQUMsQ0FBQ2MsS0FBSyxDQUFDZ0IsZUFBZSxHQUFHLE9BQU87Z0JBQ3pLbEQsUUFBUSxDQUFDQyxhQUFhLE1BQUF1QixNQUFBLENBQU0vQixRQUFRLENBQUNGLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBR3lCLEdBQUMsRUFBQUksTUFBQSxDQUFHakMsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNrRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDakQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQ3VDLEtBQUssQ0FBQ2dCLGVBQWUsR0FBRyxLQUFLO2dCQUN2SyxJQUFJOUIsR0FBQyxLQUFNTyxZQUFXLEdBQUcsQ0FBRSxFQUFFO2tCQUN6QixJQUFJd0IsSUFBSSxHQUFHVixJQUFJLENBQUMvQixLQUFLLENBQUNNLFlBQVksQ0FBQytCLE9BQU8sUUFBQXZCLE1BQUEsQ0FBUUcsWUFBVyxDQUFFLENBQUMsQ0FBQztrQkFDakV3QixJQUFJLENBQUNGLFFBQVEsR0FBRyxJQUFJO2tCQUNwQmpDLFlBQVksQ0FBQ3dCLE9BQU8sUUFBQWhCLE1BQUEsQ0FBUUcsWUFBVyxHQUFJYyxJQUFJLENBQUNDLFNBQVMsQ0FBQ1MsSUFBSSxDQUFDLENBQUM7Z0JBQ3BFO2dCQUFDO2NBQ0wsQ0FBQyxNQUNJO2dCQUNEbkQsUUFBUSxDQUFDQyxhQUFhLE1BQUF1QixNQUFBLENBQU1qQyxJQUFJLENBQUNHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUNqRCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFBNkIsTUFBQSxDQUFHL0IsUUFBUSxDQUFDRixJQUFJLENBQUNHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUNqRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR3lCLEdBQUMsQ0FBRSxDQUFDLENBQUNjLEtBQUssQ0FBQ2dCLGVBQWUsR0FBRyxLQUFLO2dCQUN2S2xELFFBQVEsQ0FBQ0MsYUFBYSxNQUFBdUIsTUFBQSxDQUFNL0IsUUFBUSxDQUFDRixJQUFJLENBQUNHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUNqRCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUd5QixHQUFDLEVBQUFJLE1BQUEsQ0FBR2pDLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUN1QyxLQUFLLENBQUNnQixlQUFlLEdBQUcsT0FBTztnQkFDekssSUFBSTlCLEdBQUMsS0FBTU8sWUFBVyxHQUFHLENBQUUsRUFBRTtrQkFDekIsSUFBSXdCLEtBQUksR0FBR1YsSUFBSSxDQUFDL0IsS0FBSyxDQUFDTSxZQUFZLENBQUMrQixPQUFPLFFBQUF2QixNQUFBLENBQVFHLFlBQVcsQ0FBRSxDQUFDLENBQUM7a0JBQ2pFd0IsS0FBSSxDQUFDRixRQUFRLEdBQUcsS0FBSztrQkFDckJqQyxZQUFZLENBQUN3QixPQUFPLFFBQUFoQixNQUFBLENBQVFHLFlBQVcsR0FBSWMsSUFBSSxDQUFDQyxTQUFTLENBQUNTLEtBQUksQ0FBQyxDQUFDO2dCQUNwRTtnQkFBQztjQUNMO1lBQ0o7VUFDSjtRQUNKO01BQ0o7SUFDSixDQUFDLENBQUM7SUFFRjVELElBQUksQ0FBQ3NDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDQyxDQUFDLEVBQUs7TUFDckNBLENBQUMsQ0FBQ3NCLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUM7O0lBRUY3RCxJQUFJLENBQUNzQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQUMsQ0FBQyxFQUFJO01BQ3BDLElBQU1xQixJQUFJLEdBQUdWLElBQUksQ0FBQy9CLEtBQUssQ0FBQ00sWUFBWSxDQUFDK0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO01BQzVELEtBQUssSUFBSTNCLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBRytCLElBQUksQ0FBQ1IsSUFBSSxFQUFFdkIsR0FBQyxFQUFFLEVBQUU7UUFDaEMsSUFBTWlDLFNBQVMsR0FBRzlELElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBTTJELFFBQVEsR0FBRzdELFFBQVEsQ0FBQzRELFNBQVMsQ0FBQyxJQUFJRixJQUFJLENBQUNSLElBQUksR0FBRyxDQUFDLENBQUM7UUFDdEQsSUFBSTNDLFFBQVEsQ0FBQ0MsYUFBYSxNQUFBdUIsTUFBQSxDQUFNakMsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUE2QixNQUFBLENBQUc4QixRQUFRLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLElBQUksSUFBSWhFLElBQUksQ0FBQzJDLEtBQUssQ0FBQ2dCLGVBQWUsS0FBSyxLQUFLLEVBQUU7VUFDckkzRCxJQUFJLENBQUMyQyxLQUFLLENBQUNnQixlQUFlLEdBQUcsTUFBTTtRQUN2QztNQUNKO0lBQ0osQ0FBQyxDQUFDO0lBRUYzRCxJQUFJLENBQUNzQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQUMsQ0FBQyxFQUFJO01BQ3BDLElBQU1xQixJQUFJLEdBQUdWLElBQUksQ0FBQy9CLEtBQUssQ0FBQ00sWUFBWSxDQUFDK0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO01BQzVELEtBQUssSUFBSTNCLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBRytCLElBQUksQ0FBQ1IsSUFBSSxFQUFFdkIsR0FBQyxFQUFFLEVBQUU7UUFDaEMsSUFBTWlDLFNBQVMsR0FBRzlELElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBTTJELFFBQVEsR0FBRzdELFFBQVEsQ0FBQzRELFNBQVMsQ0FBQyxJQUFJRixJQUFJLENBQUNSLElBQUksR0FBRyxDQUFDLENBQUM7UUFDdEQsSUFBSTNDLFFBQVEsQ0FBQ0MsYUFBYSxNQUFBdUIsTUFBQSxDQUFNakMsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUE2QixNQUFBLENBQUc4QixRQUFRLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQyxLQUFLLElBQUksSUFBSWhFLElBQUksQ0FBQzJDLEtBQUssQ0FBQ2dCLGVBQWUsS0FBSyxLQUFLLEVBQUU7VUFDckkzRCxJQUFJLENBQUMyQyxLQUFLLENBQUNnQixlQUFlLEdBQUcsT0FBTztRQUN4QztNQUNKO0lBQ0osQ0FBQyxDQUFDO0lBRUYzRCxJQUFJLENBQUNzQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO01BQ2pDQSxDQUFDLENBQUNzQixjQUFjLENBQUMsQ0FBQztNQUNsQixJQUFNRCxJQUFJLEdBQUdWLElBQUksQ0FBQy9CLEtBQUssQ0FBQ00sWUFBWSxDQUFDK0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO01BQzVELElBQUlTLFNBQVMsR0FBRyxLQUFLO01BQ3JCLElBQUlWLE1BQU0sR0FBRyxLQUFLO01BQ2xCLElBQU1PLFNBQVMsR0FBRzlELElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDN0QsSUFBTTJELFFBQVEsR0FBRzdELFFBQVEsQ0FBQzRELFNBQVMsQ0FBQyxJQUFJRixJQUFJLENBQUNSLElBQUksR0FBRyxDQUFDLENBQUM7TUFDdEQsSUFBSVEsSUFBSSxDQUFDUixJQUFJLElBQUksQ0FBQyxFQUFFO1FBQ2hCRyxNQUFNLEdBQUcsSUFBSTtNQUNqQjtNQUNBLEtBQUssSUFBSTFCLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBRytCLElBQUksQ0FBQ1IsSUFBSSxFQUFFdkIsR0FBQyxFQUFFLEVBQUU7UUFDaEMsSUFBSXBCLFFBQVEsQ0FBQ0MsYUFBYSxNQUFBdUIsTUFBQSxDQUFNakMsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNrRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDakQsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQTZCLE1BQUEsQ0FBRy9CLFFBQVEsQ0FBQ0YsSUFBSSxDQUFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNrRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDakQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUd5QixHQUFDLENBQUUsQ0FBQyxLQUFLLElBQUksSUFDL0krQixJQUFJLENBQUNSLElBQUksSUFBSSxDQUFDLElBQUszQyxRQUFRLENBQUNDLGFBQWEsTUFBQXVCLE1BQUEsQ0FBTWpDLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUE2QixNQUFBLENBQUcvQixRQUFRLENBQUNGLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHeUIsR0FBQyxDQUFFLENBQUMsQ0FBQ2MsS0FBSyxDQUFDZ0IsZUFBZSxLQUFLLE9BQVEsRUFBRTtVQUNwTUosTUFBTSxHQUFHLElBQUk7UUFDakIsQ0FBQyxNQUNJO1VBQ0R2RCxJQUFJLENBQUMyQyxLQUFLLENBQUNnQixlQUFlLEdBQUcsT0FBTztVQUNwQ0osTUFBTSxHQUFHLEtBQUs7VUFDZDtRQUNKO01BQ0o7TUFDQSxLQUFLLElBQUkxQixHQUFDLEdBQUcsQ0FBQyxFQUFFQSxHQUFDLEdBQUcrQixJQUFJLENBQUNSLElBQUksRUFBRXZCLEdBQUMsRUFBRSxFQUFFO1FBQ2hDLElBQUlwQixRQUFRLENBQUNDLGFBQWEsTUFBQXVCLE1BQUEsQ0FBTWpDLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFBNkIsTUFBQSxDQUFHOEIsUUFBUSxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFFLENBQUMsS0FBSyxJQUFJLElBQUlULE1BQU0sRUFBRTtVQUN2RyxJQUFJMUIsR0FBQyxJQUFJLENBQUMsRUFBRTtZQUNSRixXQUFXLENBQUN1QyxJQUFJLENBQUNsRSxJQUFJLENBQUNHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEQ1QixZQUFZLENBQUN3QixPQUFPLFFBQUFoQixNQUFBLENBQVEyQixJQUFJLENBQUNSLElBQUksR0FBSUYsSUFBSSxDQUFDQyxTQUFTLENBQUM7Y0FBRU0sS0FBSyxFQUFFOUIsV0FBVyxDQUFDQSxXQUFXLENBQUNiLE1BQU0sR0FBRyxDQUFDLENBQUM7Y0FBRTRDLFFBQVEsRUFBRTtZQUFNLENBQUMsQ0FBQyxDQUFDO1VBQzdIO1VBQ0EsSUFBTVMsYUFBYSxHQUFHakUsUUFBUSxDQUFDNEQsU0FBUyxDQUFDLEdBQUdqQyxHQUFDO1VBQzdDLElBQU11QyxVQUFVLEdBQUczRCxRQUFRLENBQUNDLGFBQWEsTUFBQXVCLE1BQUEsQ0FBTWpDLElBQUksQ0FBQ0csU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFBNkIsTUFBQSxDQUFHa0MsYUFBYSxDQUFDSCxRQUFRLENBQUMsQ0FBQyxDQUFFLENBQUM7VUFDMUdJLFVBQVUsQ0FBQ3pCLEtBQUssQ0FBQ2dCLGVBQWUsR0FBRyxLQUFLO1VBQ3hDTSxTQUFTLEdBQUcsSUFBSTtRQUNwQjtNQUNKO01BQ0EsSUFBSUEsU0FBUyxFQUFFO1FBQ1h4RCxRQUFRLENBQUNDLGFBQWEsTUFBQXVCLE1BQUEsQ0FBTTJCLElBQUksQ0FBQ1IsSUFBSSxDQUFFLENBQUMsQ0FBQ2lCLE1BQU0sQ0FBQyxDQUFDO01BQ3JEO01BQ0EsSUFBSTVELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMxQ0QsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUNrQixTQUFTLDZFQUV6QztRQUVEbkIsUUFBUSxDQUFDQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM0QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsQ0FBQyxFQUFJO1VBQzlELElBQUk5QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQytCLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckQsSUFBSTVDLEtBQUssR0FBRyxJQUFJdUIsK0NBQU0sQ0FBQ1osUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMrQixLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEUsS0FBSyxJQUFJYixJQUFDLEdBQUcsQ0FBQyxFQUFFQSxJQUFDLElBQUksQ0FBQyxFQUFFQSxJQUFDLEVBQUUsRUFBRTtjQUN6QixJQUFJeUMsWUFBWSxHQUFHcEUsUUFBUSxDQUFDZ0QsSUFBSSxDQUFDL0IsS0FBSyxDQUFDTSxZQUFZLENBQUMrQixPQUFPLFFBQUF2QixNQUFBLENBQVFKLElBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQzRCLEtBQUssQ0FBQ3JELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Y0FDM0YsSUFBSW1FLFlBQVksR0FBR3JFLFFBQVEsQ0FBQ2dELElBQUksQ0FBQy9CLEtBQUssQ0FBQ00sWUFBWSxDQUFDK0IsT0FBTyxRQUFBdkIsTUFBQSxDQUFRSixJQUFDLENBQUUsQ0FBQyxDQUFDLENBQUM0QixLQUFLLENBQUNyRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDeEYsSUFBSW9FLFVBQVUsR0FBR3RCLElBQUksQ0FBQy9CLEtBQUssQ0FBQ00sWUFBWSxDQUFDK0IsT0FBTyxRQUFBdkIsTUFBQSxDQUFRSixJQUFDLENBQUUsQ0FBQyxDQUFDLENBQUM2QixRQUFRO2NBQ3RFLElBQUllLFlBQVksR0FBRyxJQUFJOUQsbURBQUksQ0FBQ2tCLElBQUMsQ0FBQztjQUM5Qi9CLEtBQUssQ0FBQzRFLFNBQVMsQ0FBQ0osWUFBWSxFQUFFQyxZQUFZLEVBQUVFLFlBQVksRUFBRUQsVUFBVSxDQUFDO1lBQ3pFO1lBQ0EsSUFBSXpFLFFBQVEsR0FBRyxJQUFJc0IsK0NBQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO1lBQzNDdEIsUUFBUSxDQUFDNEUsV0FBVyxDQUFDLENBQUM7WUFDdEJsRCxZQUFZLENBQUNDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCSixxREFBUyxDQUFDeEIsS0FBSyxFQUFHQyxRQUFRLENBQUM7VUFDL0IsQ0FBQyxNQUNHO1lBQ0FVLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDa0IsU0FBUyxHQUFHLHlCQUF5QjtZQUN0RW5CLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDaUMsS0FBSyxDQUFDQyxTQUFTLEdBQUcsc0NBQXNDO1lBQ3pGbkMsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUNpQyxLQUFLLENBQUNFLFdBQVcsR0FBRyxLQUFLO1VBQzdEO1FBQ0osQ0FBQyxDQUFDO01BQ047SUFDSixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRnBDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDNEIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDN0RiLFlBQVksQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDcEJGLE1BQU0sQ0FBQyxDQUFDO0VBQ1osQ0FBQyxDQUFDO0FBQ047QUFDQUEsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyUXlCO0FBRWxCLFNBQVNvRCxTQUFTQSxDQUFBLEVBQUc7RUFDaEMsSUFBSXRFLEtBQUssR0FBRyxJQUFJdUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNDLEdBQUcsQ0FBQztJQUFBLE9BQU0sSUFBSUYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQUEsRUFBQzs7RUFFbEU7RUFDQSxJQUFJRSxRQUFRLEdBQUcsU0FBWEEsUUFBUUEsQ0FBQTtJQUFBLE9BQVMxRSxLQUFLO0VBQUE7RUFFMUIsSUFBSTJFLFlBQVksR0FBRyxFQUFFOztFQUVyQjtFQUNBLElBQUlDLGFBQWEsR0FBRyxTQUFoQkEsYUFBYUEsQ0FBSXRFLFVBQVUsRUFBRVgsR0FBRyxFQUFFSSxHQUFHLEVBQUUyQyxJQUFJLEVBQUs7SUFDaEQsSUFBSW1DLGFBQWE7SUFDakIsSUFBSUMsTUFBTSxHQUFHLENBQUM7SUFDZCxJQUFJQyxNQUFNLEdBQUcsRUFBRTtJQUNmLEtBQUssSUFBSXhELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2pCLFVBQVUsRUFBRWlCLENBQUMsRUFBRSxFQUFFO01BQ2pDLElBQUl2QixLQUFLLENBQUNMLEdBQUcsR0FBRzRCLENBQUMsQ0FBQyxDQUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCQyxLQUFLLENBQUNMLEdBQUcsR0FBRzRCLENBQUMsQ0FBQyxDQUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUN2QitFLE1BQU0sRUFBRTtRQUNSQyxNQUFNLENBQUNuQixJQUFJLENBQUMsQ0FBQ2pFLEdBQUcsR0FBRzRCLENBQUMsRUFBRXhCLEdBQUcsQ0FBQyxDQUFDO01BRS9CLENBQUMsTUFDSTtRQUNEOEUsYUFBYSxHQUFHdEQsQ0FBQyxHQUFHLENBQUM7UUFDckJ5RCxpQkFBaUIsQ0FBQ0gsYUFBYSxFQUFFbEYsR0FBRyxFQUFFSSxHQUFHLENBQUM7UUFDMUM7TUFDSjtJQUNKO0lBQ0EsSUFBSStFLE1BQU0sS0FBS3hFLFVBQVUsSUFBSXlFLE1BQU0sQ0FBQ3ZFLE1BQU0sS0FBS0YsVUFBVSxFQUFFO01BQ3ZEcUUsWUFBWSxDQUFDZixJQUFJLENBQUM7UUFBRWxCLElBQUksRUFBRUEsSUFBSSxDQUFDbkMsS0FBSztRQUFFMEUsV0FBVyxFQUFFRjtNQUFPLENBQUMsQ0FBQztJQUNoRTtFQUNKLENBQUM7O0VBRUQ7RUFDQSxJQUFJRyxlQUFlLEdBQUcsU0FBbEJBLGVBQWVBLENBQUk1RSxVQUFVLEVBQUVYLEdBQUcsRUFBRUksR0FBRyxFQUFFMkMsSUFBSSxFQUFLO0lBQ2xELElBQUltQyxhQUFhO0lBQ2pCLElBQUlDLE1BQU0sR0FBRyxDQUFDO0lBQ2QsSUFBSUMsTUFBTSxHQUFHLEVBQUU7SUFDZixLQUFLLElBQUl4RCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdqQixVQUFVLEVBQUVpQixDQUFDLEVBQUUsRUFBRTtNQUNqQyxJQUFJdkIsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxHQUFHd0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCdkIsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxHQUFHd0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN2QnVELE1BQU0sRUFBRTtRQUNSQyxNQUFNLENBQUNuQixJQUFJLENBQUMsQ0FBQ2pFLEdBQUcsRUFBRUksR0FBRyxHQUFHd0IsQ0FBQyxDQUFDLENBQUM7TUFDL0IsQ0FBQyxNQUNJO1FBQ0RzRCxhQUFhLEdBQUd0RCxDQUFDLEdBQUcsQ0FBQztRQUNyQjRELG1CQUFtQixDQUFDTixhQUFhLEVBQUVsRixHQUFHLEVBQUVJLEdBQUcsQ0FBQztRQUM1QztNQUNKO0lBQ0o7SUFDQSxJQUFJK0UsTUFBTSxLQUFLeEUsVUFBVSxJQUFJeUUsTUFBTSxDQUFDdkUsTUFBTSxLQUFLRixVQUFVLEVBQUU7TUFDdkRxRSxZQUFZLENBQUNmLElBQUksQ0FBQztRQUFFbEIsSUFBSSxFQUFFQSxJQUFJLENBQUNuQyxLQUFLO1FBQUUwRSxXQUFXLEVBQUVGO01BQU8sQ0FBQyxDQUFDO0lBQ2hFO0VBQ0osQ0FBQzs7RUFFRDtFQUNBLElBQUlLLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJekYsR0FBRyxFQUFFSSxHQUFHLEVBQUUyQyxJQUFJLEVBQXNCO0lBQUEsSUFBcEJVLFFBQVEsR0FBQWlDLFNBQUEsQ0FBQTdFLE1BQUEsUUFBQTZFLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsSUFBSTtJQUM1QyxJQUFJckYsS0FBSyxDQUFDTCxHQUFHLENBQUMsS0FBSzJGLFNBQVMsSUFBSXRGLEtBQUssQ0FBQ0wsR0FBRyxDQUFDLENBQUNJLEdBQUcsQ0FBQyxLQUFLdUYsU0FBUyxFQUFFO01BQzNELElBQUlsQyxRQUFRLElBQUlwRCxLQUFLLENBQUNMLEdBQUcsSUFBSStDLElBQUksQ0FBQ25DLEtBQUssQ0FBQ0MsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs4RSxTQUFTLEVBQUU7UUFDaEVWLGFBQWEsQ0FBQ2xDLElBQUksQ0FBQ25DLEtBQUssQ0FBQ0MsTUFBTSxFQUFFYixHQUFHLEVBQUVJLEdBQUcsRUFBRTJDLElBQUksQ0FBQztNQUNwRCxDQUFDLE1BQ0ksSUFBSSxDQUFDVSxRQUFRLElBQUlwRCxLQUFLLENBQUNMLEdBQUcsQ0FBQyxDQUFDSSxHQUFHLElBQUkyQyxJQUFJLENBQUNuQyxLQUFLLENBQUNDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLOEUsU0FBUyxFQUFFO1FBQzNFSixlQUFlLENBQUN4QyxJQUFJLENBQUNuQyxLQUFLLENBQUNDLE1BQU0sRUFBRWIsR0FBRyxFQUFFSSxHQUFHLEVBQUUyQyxJQUFJLENBQUM7TUFDdEQ7SUFDSjtFQUNKLENBQUM7O0VBRUQ7QUFDSjtBQUNBO0FBQ0E7RUFDSSxJQUFJc0MsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFpQkEsQ0FBSU8sS0FBSyxFQUFFNUYsR0FBRyxFQUFFSSxHQUFHLEVBQUs7SUFDekMsS0FBSyxJQUFJd0IsQ0FBQyxHQUFHZ0UsS0FBSyxFQUFFaEUsQ0FBQyxJQUFJLENBQUMsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDN0J2QixLQUFLLENBQUNMLEdBQUcsR0FBRzRCLENBQUMsQ0FBQyxDQUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUMzQjtFQUNKLENBQUM7RUFFRCxJQUFJb0YsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFtQkEsQ0FBSUksS0FBSyxFQUFFNUYsR0FBRyxFQUFFSSxHQUFHLEVBQUs7SUFDM0MsS0FBSyxJQUFJd0IsQ0FBQyxHQUFHZ0UsS0FBSyxFQUFFaEUsQ0FBQyxJQUFJLENBQUMsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDN0J2QixLQUFLLENBQUNMLEdBQUcsQ0FBQyxDQUFDSSxHQUFHLEdBQUd3QixDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzNCO0VBQ0osQ0FBQztFQUdELElBQUlpRSxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUk3RixHQUFHLEVBQUVJLEdBQUcsRUFBRzBGLFVBQVUsRUFBSztJQUUzQztJQUNBLElBQUl6RixLQUFLLENBQUNMLEdBQUcsQ0FBQyxLQUFLMkYsU0FBUyxJQUFJdEYsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLEtBQUt1RixTQUFTLElBQUl0RixLQUFLLENBQUNMLEdBQUcsQ0FBQyxDQUFDSSxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUU7TUFDeEYsSUFBSUMsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCQyxLQUFLLENBQUNMLEdBQUcsQ0FBQyxDQUFDSSxHQUFHLENBQUMsR0FBRyxLQUFLO1FBQ3ZCLElBQUkyRixPQUFPLEdBQUdmLFlBQVksQ0FBQ2dCLE1BQU0sQ0FBQyxVQUFDakQsSUFBSTtVQUFBLE9BQUtBLElBQUksQ0FBQ3VDLFdBQVcsQ0FBQ1csSUFBSSxDQUFDLFVBQUF6QyxLQUFLO1lBQUEsT0FBSUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLeEQsR0FBRyxJQUFJd0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLcEQsR0FBRztVQUFBLEVBQUM7UUFBQSxFQUFDO1FBQ2pIMkYsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDaEQsSUFBSSxDQUFDL0IsR0FBRyxDQUFDLENBQUM7UUFDckIrRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNoRCxJQUFJLENBQUM5QixNQUFNLENBQUMsQ0FBQztRQUN4QmlGLFVBQVUsQ0FBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDaEQsSUFBSSxDQUFDO01BQy9CLENBQUMsTUFDSSxJQUFJMUMsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzVCQyxLQUFLLENBQUNMLEdBQUcsQ0FBQyxDQUFDSSxHQUFHLENBQUMsR0FBRyxNQUFNO01BQzVCO0lBQ0o7SUFDQSxPQUFPK0YsT0FBTyxDQUFDTCxVQUFVLENBQUM7RUFDOUIsQ0FBQzs7RUFFRDtFQUNBLElBQUlJLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFJbkQsSUFBSSxFQUFLO0lBQ3ZCLElBQUlBLElBQUksQ0FBQ2hDLElBQUksRUFBRTtNQUNYLElBQUk2RSxLQUFLLEdBQUdaLFlBQVksQ0FBQ29CLFNBQVMsQ0FBQyxVQUFDQyxDQUFDO1FBQUEsT0FBS3RELElBQUksS0FBS3NELENBQUMsQ0FBQ3RELElBQUk7TUFBQSxFQUFDO01BQzFEaUMsWUFBWSxDQUFDc0IsTUFBTSxDQUFDVixLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDO0VBQ0osQ0FBQzs7RUFFRDtFQUNBLElBQUlPLE9BQU8sR0FBRyxTQUFWQSxPQUFPQSxDQUFJTCxVQUFVLEVBQUs7SUFDMUIsSUFBSWQsWUFBWSxDQUFDbkUsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUMzQixJQUFJMEYsSUFBSSxHQUFHLEtBQUs7TUFDaEIsSUFBR1QsVUFBVSxDQUFDUyxJQUFJLEtBQUssVUFBVSxFQUFDO1FBQzlCQSxJQUFJLEdBQUcsVUFBVTtNQUNyQjtNQUNBL0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUNrQixTQUFTLCtDQUFBSyxNQUFBLENBQ2pCdUUsSUFBSSxtQkFBQXZFLE1BQUEsQ0FBZ0I4RCxVQUFVLENBQUNTLElBQUksK0VBRS9EO01BQ0QvRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQzRCLGdCQUFnQixDQUFDLE9BQU8sRUFBRyxZQUFNO1FBQ2xFZCxzREFBTSxDQUFDLENBQUM7TUFDWixDQUFDLENBQUM7SUFDTjtJQUVBLE9BQU8sZUFBZTtFQUMxQixDQUFDO0VBQ0QsT0FBTztJQUFFa0UsU0FBUyxFQUFUQSxTQUFTO0lBQUVWLFFBQVEsRUFBUkEsUUFBUTtJQUFFYyxhQUFhLEVBQWJBLGFBQWE7SUFBRWIsWUFBWSxFQUFaQTtFQUFhLENBQUM7QUFDL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSW1DO0FBRW5DLElBQUkxRCxXQUFXLEdBQUcsRUFBRSxHQUNoQiw2QkFBNkIsR0FDN0Isa0NBQWtDLEdBQ2xDLDRCQUE0QixHQUM1Qix3Q0FBd0MsR0FDeEMsZUFBZSxHQUNmLGtCQUFrQixHQUNsQiwwQ0FBMEMsR0FDMUMsdUJBQXVCLEdBQ3ZCLHVDQUF1QyxHQUN2QyxnR0FBZ0csR0FDaEcsVUFBVSxHQUNWLEVBQUU7QUFFUyxTQUFTRCxTQUFTQSxDQUFDeEIsS0FBSyxFQUFFQyxRQUFRLEVBQUU7RUFFL0NVLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDa0IsU0FBUyxHQUFHTCxXQUFXOztFQUV0RDtFQUFBLElBQUFrRixLQUFBLFlBQUFBLE1BQUE1RSxDQUFBLEVBQzZCO0lBQUEsSUFBQTZFLE1BQUEsWUFBQUEsT0FBQUMsRUFBQSxFQUNJO01BQ3pCbEcsUUFBUSxDQUFDcUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFDekMsS0FBSyxFQUFLO1FBQ25ELElBQUlOLElBQUksR0FBR1MsUUFBUSxDQUFDc0IsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN4Qy9CLElBQUksQ0FBQ0csU0FBUyxDQUFDNkIsR0FBRyxnQkFBQUMsTUFBQSxDQUFnQkosQ0FBQyxFQUFBSSxNQUFBLENBQUdILEVBQUMsQ0FBRSxDQUFDO1FBQzFDOUIsSUFBSSxDQUFDa0MsWUFBWSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQztRQUN0RDVCLEtBQUssQ0FBQzZCLE1BQU0sQ0FBQ25DLElBQUksQ0FBQztNQUN0QixDQUFDLENBQUM7SUFDTixDQUFDO0lBUEQsS0FBSyxJQUFJOEIsRUFBQyxHQUFHLENBQUMsRUFBRUEsRUFBQyxHQUFHLEVBQUUsRUFBRUEsRUFBQyxFQUFFO01BQUE0RSxNQUFBLENBQUFDLEVBQUE7SUFBQTtFQVEvQixDQUFDO0VBVEQsS0FBSyxJQUFJOUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFO0lBQUE0RSxLQUFBLENBQUE1RSxDQUFBO0VBQUE7RUFXM0IsSUFBSStFLFVBQVUsR0FBRzlHLEtBQUssQ0FBQytHLGFBQWEsQ0FBQzVCLFlBQVksQ0FBQ0YsR0FBRyxDQUFDLFVBQUMvQixJQUFJO0lBQUEsT0FBS0EsSUFBSSxDQUFDdUMsV0FBVztFQUFBLEVBQUM7RUFDakYsSUFBSXVCLFVBQVUsR0FBRyxFQUFFO0VBQ25CLEtBQUssSUFBSWpGLEVBQUMsR0FBRyxDQUFDLEVBQUVBLEVBQUMsR0FBRytFLFVBQVUsQ0FBQzlGLE1BQU0sRUFBRWUsRUFBQyxFQUFFLEVBQUU7SUFDeEMsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUlELEVBQUMsRUFBRUMsQ0FBQyxFQUFFLEVBQUU7TUFDekJnRixVQUFVLENBQUM1QyxJQUFJLENBQUMwQyxVQUFVLENBQUMvRSxFQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLENBQUM7SUFDckM7RUFDSjtFQUNBLElBQUlpRixNQUFNLEdBQUd0RyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDOUMsS0FBSyxJQUFJbUIsR0FBQyxHQUFHLENBQUMsRUFBRUEsR0FBQyxHQUFHLEVBQUUsRUFBRUEsR0FBQyxFQUFFLEVBQUU7SUFDekJrRixNQUFNLENBQUNyRyxhQUFhLFNBQUF1QixNQUFBLENBQVM2RSxVQUFVLENBQUNqRixHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQUksTUFBQSxDQUFHNkUsVUFBVSxDQUFDakYsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDYyxLQUFLLENBQUNnQixlQUFlLEdBQUcsS0FBSztFQUNyRztFQUVBbEQsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUNzRyxVQUFVLENBQUNqRSxPQUFPLENBQUMsVUFBQy9DLElBQUksRUFBSztJQUN4REEsSUFBSSxDQUFDc0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFHLFVBQUFDLENBQUMsRUFBSTtNQUNqQzFDLG1EQUFXLENBQUNDLEtBQUssRUFBR0MsUUFBUSxFQUFHQyxJQUFJLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRnQztBQUNJO0FBRXJCLFNBQVNxQixNQUFNQSxDQUFDNEYsVUFBVSxFQUFlO0VBQUEsSUFBYkMsSUFBSSxHQUFBdkIsU0FBQSxDQUFBN0UsTUFBQSxRQUFBNkUsU0FBQSxRQUFBQyxTQUFBLEdBQUFELFNBQUEsTUFBRyxJQUFJO0VBQ2xELElBQUlhLElBQUksR0FBR1MsVUFBVTtFQUNyQixJQUFJSixhQUFhLEdBQUcsSUFBSWpDLGtEQUFTLENBQUMsQ0FBQztFQUNuQyxJQUFJdEUsS0FBSyxHQUFHdUcsYUFBYSxDQUFDN0IsUUFBUSxDQUFDLENBQUM7RUFFcEMsSUFBSU4sU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUl6RSxHQUFHLEVBQUVJLEdBQUcsRUFBRTJDLElBQUksRUFBc0I7SUFBQSxJQUFwQlUsUUFBUSxHQUFBaUMsU0FBQSxDQUFBN0UsTUFBQSxRQUFBNkUsU0FBQSxRQUFBQyxTQUFBLEdBQUFELFNBQUEsTUFBRyxJQUFJO0lBQzVDLElBQUlrQixhQUFhLENBQUM1QixZQUFZLENBQUNuRSxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ3pDK0YsYUFBYSxDQUFDbkIsU0FBUyxDQUFDekYsR0FBRyxFQUFFSSxHQUFHLEVBQUUyQyxJQUFJLEVBQUVVLFFBQVEsQ0FBQztJQUNyRDtFQUNKLENBQUM7RUFFRCxJQUFJaUIsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUEsRUFBUztJQUNwQixJQUFJdUMsSUFBSSxFQUFFO01BQ04sT0FBT0wsYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUMxQyxJQUFJa0MsSUFBSSxHQUFHLElBQUlyQyxtREFBSSxDQUFDa0csYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJNEMsUUFBUSxHQUFHeUQsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUc7UUFDbEMsSUFBSUMsV0FBVyxHQUFHLEtBQUs7UUFFdkIsT0FBTyxDQUFDQSxXQUFXLEVBQUU7VUFDakIsSUFBSXBILEdBQUcsR0FBR2tILElBQUksQ0FBQ0csS0FBSyxDQUFDSCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1VBQ3hDLElBQUkvRyxHQUFHLEdBQUc4RyxJQUFJLENBQUNHLEtBQUssQ0FBQ0gsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztVQUN4QyxJQUFJOUcsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCd0csYUFBYSxDQUFDbkIsU0FBUyxDQUFDekYsR0FBRyxFQUFFSSxHQUFHLEVBQUUyQyxJQUFJLEVBQUVVLFFBQVEsQ0FBQztZQUNqRDJELFdBQVcsR0FBRyxJQUFJO1VBQ3RCO1FBQ0o7TUFDSjtJQUNKO0VBQ0osQ0FBQztFQUVELElBQUk3RyxRQUFRLEdBQUcsU0FBWEEsUUFBUUEsQ0FBSXVGLFVBQVUsRUFBSztJQUMzQixJQUFJbUIsSUFBSSxFQUFFO01BQ04sSUFBSW5CLFVBQVUsQ0FBQ2MsYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxJQUFJLENBQUMsSUFBSWlGLFVBQVUsQ0FBQ2MsYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxHQUFHLENBQUMsRUFBRztRQUN4RyxJQUFJeUcsTUFBTSxHQUFHeEIsVUFBVSxDQUFDYyxhQUFhLENBQUM3QixRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJcUMsV0FBVyxHQUFHLEtBQUs7UUFFdkIsT0FBTyxDQUFDQSxXQUFXLEVBQUU7VUFDakIsSUFBSXBILEdBQUcsR0FBR2tILElBQUksQ0FBQ0csS0FBSyxDQUFDSCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1VBQ3hDLElBQUkvRyxHQUFHLEdBQUc4RyxJQUFJLENBQUNHLEtBQUssQ0FBQ0gsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztVQUN4QyxJQUFJRyxNQUFNLENBQUN0SCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJa0gsTUFBTSxDQUFDdEgsR0FBRyxDQUFDLENBQUNJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoRGdILFdBQVcsR0FBRyxJQUFJO1lBQ2xCdEIsVUFBVSxDQUFDYyxhQUFhLENBQUNmLGFBQWEsQ0FBQzdGLEdBQUcsRUFBRUksR0FBRyxFQUFHMEYsVUFBVSxDQUFDO1VBQ2pFO1FBQ0o7TUFDSjtJQUNKO0VBQ0osQ0FBQztFQUVELElBQUlxQixNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBQSxFQUFTO0lBQ2YsT0FBT1AsYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUMxQyxJQUFJa0MsSUFBSSxHQUFHLElBQUlyQyxtREFBSSxDQUFDa0csYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxHQUFHLENBQUMsQ0FBQztNQUMxRCxJQUFJNEMsUUFBUSxHQUFHeUQsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUc7TUFDbEMsSUFBSUMsV0FBVyxHQUFHLEtBQUs7TUFFdkIsT0FBTyxDQUFDQSxXQUFXLEVBQUU7UUFDakIsSUFBSXBILEdBQUcsR0FBR2tILElBQUksQ0FBQ0csS0FBSyxDQUFDSCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLElBQUkvRyxHQUFHLEdBQUc4RyxJQUFJLENBQUNHLEtBQUssQ0FBQ0gsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QyxJQUFJOUcsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1VBQ3ZCd0csYUFBYSxDQUFDbkIsU0FBUyxDQUFDekYsR0FBRyxFQUFFSSxHQUFHLEVBQUUyQyxJQUFJLEVBQUVVLFFBQVEsQ0FBQztVQUNqRDJELFdBQVcsR0FBRyxJQUFJO1FBQ3RCO01BQ0o7SUFDSjtFQUNKLENBQUM7RUFFRCxJQUFJOUcsTUFBTSxHQUFHLFNBQVRBLE1BQU1BLENBQUlOLEdBQUcsRUFBRUksR0FBRyxFQUFFMEYsVUFBVSxFQUFLO0lBQ25DLElBQUlBLFVBQVUsQ0FBQ2MsYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxJQUFJLENBQUMsSUFBSWlGLFVBQVUsQ0FBQ2MsYUFBYSxDQUFDNUIsWUFBWSxDQUFDbkUsTUFBTSxHQUFHLENBQUMsRUFBRztNQUN4R2lGLFVBQVUsQ0FBQ2MsYUFBYSxDQUFDZixhQUFhLENBQUM3RixHQUFHLEVBQUVJLEdBQUcsRUFBRzBGLFVBQVUsQ0FBQztNQUM3RCxPQUFPLDJCQUEyQjtJQUN0QyxDQUFDLE1BQ0k7TUFDRCxPQUFPLDhEQUE4RDtJQUN6RTtFQUNKLENBQUM7RUFDRCxPQUFPO0lBQUVyQixTQUFTLEVBQVRBLFNBQVM7SUFBRUMsV0FBVyxFQUFYQSxXQUFXO0lBQUVwRSxNQUFNLEVBQU5BLE1BQU07SUFBRUMsUUFBUSxFQUFSQSxRQUFRO0lBQUM0RyxNQUFNLEVBQU5BLE1BQU07SUFBRVosSUFBSSxFQUFKQSxJQUFJO0lBQUVsRyxLQUFLLEVBQUxBLEtBQUs7SUFBRXVHLGFBQWEsRUFBYkE7RUFBYyxDQUFDO0FBQzFGOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlFbUM7QUFDTDtBQUVmLFNBQVN6RixTQUFTQSxDQUFDb0YsSUFBSSxFQUFDO0VBQ25DLElBQUkxRyxLQUFLLEdBQUcsSUFBSXVCLCtDQUFNLENBQUNtRixJQUFJLEVBQUcsS0FBSyxDQUFDO0VBQ3BDMUcsS0FBSyxDQUFDc0gsTUFBTSxDQUFDLENBQUM7RUFFZCxJQUFJckgsUUFBUSxHQUFHLElBQUlzQiwrQ0FBTSxDQUFDLFVBQVUsRUFBRyxJQUFJLENBQUM7RUFDNUN0QixRQUFRLENBQUM0RSxXQUFXLENBQUMsQ0FBQztFQUN0QnJELHFEQUFTLENBQUN4QixLQUFLLEVBQUdDLFFBQVEsQ0FBQztBQUMvQjs7Ozs7Ozs7Ozs7Ozs7O0FDVmUsU0FBU0gsWUFBWUEsQ0FBQ21ILE1BQU0sRUFBR1MsR0FBRyxFQUFDO0VBQzlDLElBQUlDLEdBQUcsR0FBR2hILFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQztFQUMzQyxJQUFJZ0gsR0FBRyxHQUFHakgsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0VBQ3hDLEtBQUksSUFBSW1CLENBQUMsR0FBRyxDQUFDLEVBQUdBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFDO0lBQ3hCLEtBQUksSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUM7TUFDdkIsSUFBR2lGLE1BQU0sQ0FBQ2xGLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUM7UUFDckIyRixHQUFHLENBQUMvRyxhQUFhLFNBQUF1QixNQUFBLENBQVNKLENBQUMsRUFBQUksTUFBQSxDQUFHSCxDQUFDLENBQUUsQ0FBQyxDQUFDYSxLQUFLLENBQUNnQixlQUFlLEdBQUcsWUFBWTtNQUMzRSxDQUFDLE1BQ0ksSUFBR29ELE1BQU0sQ0FBQ2xGLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUM7UUFDdEIyRixHQUFHLENBQUMvRyxhQUFhLFNBQUF1QixNQUFBLENBQVNKLENBQUMsRUFBQUksTUFBQSxDQUFHSCxDQUFDLENBQUUsQ0FBQyxDQUFDYSxLQUFLLENBQUNnQixlQUFlLEdBQUcsS0FBSztNQUNwRSxDQUFDLE1BQ0ksSUFBR29ELE1BQU0sQ0FBQ2xGLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUM7UUFDM0IyRixHQUFHLENBQUMvRyxhQUFhLFNBQUF1QixNQUFBLENBQVNKLENBQUMsRUFBQUksTUFBQSxDQUFHSCxDQUFDLENBQUUsQ0FBQyxDQUFDYSxLQUFLLENBQUNnQixlQUFlLEdBQUcsaUJBQWlCO01BQ2hGO01BRUEsSUFBRzZELEdBQUcsQ0FBQzNGLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUM7UUFDbEI0RixHQUFHLENBQUNoSCxhQUFhLFNBQUF1QixNQUFBLENBQVNKLENBQUMsRUFBQUksTUFBQSxDQUFHSCxDQUFDLENBQUUsQ0FBQyxDQUFDYSxLQUFLLENBQUNnQixlQUFlLEdBQUcsWUFBWTtNQUMzRSxDQUFDLE1BQ0ksSUFBRzZELEdBQUcsQ0FBQzNGLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUM7UUFDeEI0RixHQUFHLENBQUNoSCxhQUFhLFNBQUF1QixNQUFBLENBQVNKLENBQUMsRUFBQUksTUFBQSxDQUFHSCxDQUFDLENBQUUsQ0FBQyxDQUFDYSxLQUFLLENBQUNnQixlQUFlLEdBQUcsaUJBQWlCO01BQ2hGO0lBRUo7RUFDSjtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFDMEc7QUFDakI7QUFDTztBQUNoRyw0Q0FBNEMsdUhBQXdDO0FBQ3BGLDRDQUE0QyxxSkFBdUQ7QUFDbkcsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxlQUFlLG1DQUFtQztBQUNsRDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNGQUFzRixZQUFZLGVBQWUsTUFBTSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsS0FBSyxPQUFPLEtBQUssS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxLQUFLLE1BQU0sS0FBSyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLEtBQUssTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLFFBQVEsS0FBSyxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sTUFBTSxZQUFZLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssS0FBSyxNQUFNLE1BQU0sWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxN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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsaUJBQWlCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JpQlk7O0FBRVo7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNB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Q0EsVUFBVSx3Q0FBd0M7QUFDbEQsVUFBVSxvQ0FBb0M7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7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VjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0NBQW9DLFFBQVE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsa0JBQWtCO0FBQzFCLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QW9DLE9BQU87QUFDM0MsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTs7QUFFQSx1REFBdUQ7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Z0JBQWdCLGdEQUFlO0FBQy9CLGdCQUFnQixnREFBZTtBQUMvQixlQUFlLCtDQUFjO0FBQzdCLGVBQWUsK0NBQWM7QUFDN0IsY0FBYyw4Q0FBYTtBQUMzQixhQUFhLDZDQUFZO0FBQ3pCLGFBQWEsNkNBQVk7QUFDekIsYUFBYSw2Q0FBWTs7Ozs7OztVQzdCaEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hdHRhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluR2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9yYW5kb21pemVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlVUkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9waWNvY29sb3JzL3BpY29jb2xvcnMuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvYXQtcnVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvY29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9jc3Mtc3ludGF4LWVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9kZWNsYXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvZG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2Zyb21KU09OLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvbGF6eS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL21hcC1nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL25vLXdvcmstcmVzdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9ub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcGFyc2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9wb3N0Y3NzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9wcmV2aW91cy1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGliL3Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvcmVzdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9ydWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9zdHJpbmdpZmllci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9zeW1ib2xzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi90b2tlbml6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWIvd2Fybi1vbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi93YXJuaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMuY3NzP2E4ZDAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vaWdub3JlZHwvaG9tZS9mdWRvL3JlcG9zL0JhdHRsZXNoaXAvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGlifC4vdGVybWluYWwtaGlnaGxpZ2h0Iiwid2VicGFjazovLy9pZ25vcmVkfC9ob21lL2Z1ZG8vcmVwb3MvQmF0dGxlc2hpcC9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWJ8ZnMiLCJ3ZWJwYWNrOi8vL2lnbm9yZWR8L2hvbWUvZnVkby9yZXBvcy9CYXR0bGVzaGlwL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYnxwYXRoIiwid2VicGFjazovLy9pZ25vcmVkfC9ob21lL2Z1ZG8vcmVwb3MvQmF0dGxlc2hpcC9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWJ8c291cmNlLW1hcC1qcyIsIndlYnBhY2s6Ly8vaWdub3JlZHwvaG9tZS9mdWRvL3JlcG9zL0JhdHRsZXNoaXAvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGlifHVybCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmFub2lkL25vbi1zZWN1cmUvaW5kZXguY2pzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYi9wb3N0Y3NzLm1qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXBkYXRlU2NyZWVuIGZyb20gXCIuL3VwZGF0ZVVJXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF0dGFja090aGVyKGh1bWFuLCBjb21wdXRlciwgY2VsbCkge1xuICAgIGxldCByb3cgPSBwYXJzZUludChjZWxsLmNsYXNzTGlzdFsxXS5zbGljZSg0LCA1KSk7XG4gICAgbGV0IGNvbCA9IHBhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnNsaWNlKDUpKVxuICAgIGlmIChjb21wdXRlci5ib2FyZFtyb3ddW2NvbF0gPT0gMCB8fCBjb21wdXRlci5ib2FyZFtyb3ddW2NvbF0gPT0gMSkge1xuICAgICAgICBodW1hbi5hdHRhY2socm93LCBjb2wsIGNvbXB1dGVyKTtcbiAgICAgICAgY29tcHV0ZXIuYWlBdHRhY2soaHVtYW4pO1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1hbkJcIikgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlbihodW1hbi5ib2FyZCwgY29tcHV0ZXIuYm9hcmQpXG4gICAgICAgIH1cbiAgICB9XG59IiwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKHNoaXBMZW5ndGgpIHtcbiAgY29uc3Qgc2hpcHMgPSB7XG4gICAgbGVuZ3RoOiBzaGlwTGVuZ3RoLFxuICAgIGdvdEhpdDogMCxcbiAgICBzdW5rOiBmYWxzZSxcblxuICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5nb3RIaXQrKztcbiAgICB9LFxuXG4gICAgaXNTdW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9PT0gdGhpcy5nb3RIaXQgPyB0aGlzLnN1bmsgPSB0cnVlIDogdGhpcy5zdW5rID0gZmFsc2VcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiB7IHNoaXBzIH07XG59XG4iLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3Bvc3Rjc3MnO1xuaW1wb3J0IFJhbmRvbWl6ZSBmcm9tICcuL3JhbmRvbWl6ZUJvYXJkJztcbmltcG9ydCAnLi9zdHlsZXMuY3NzJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9iYXR0bGVzaGlwJztcbmltcG9ydCBnYW1lU3RhcnQgZnJvbSAnLi9tYWluR2FtZSc7XG5cbnZhciBzdGFydFNjcmVlbiA9IFwiXCIgK1xuICAgIFwiICA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiPlwiICtcbiAgICBcIiAgICA8aGVhZGVyIGNsYXNzPVxcXCJmaXhlZEhlYWRcXFwiPlwiICtcbiAgICBcIiAgICAgIDxoMT5CYXR0bGUgU2hpcDwvaDE+XCIgK1xuICAgIFwiICAgICAgPHA+V2hlcmUgdGhlIHJlYWwgb25lIGZpZ2h0czwvcD5cIiArXG4gICAgXCIgICAgPC9oZWFkZXI+XCIgK1xuICAgIFwiICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZFxcXCI+PC9kaXY+XCIgK1xuICAgIFwiICAgIDxtYWluPlwiICtcbiAgICBcIiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRyb2xcXFwiPlwiICtcbiAgICBcIiAgICAgIDxkaXYgY2xhc3M9XFxcIm5hbWVDb250cm9sXFxcIj5cIiArXG4gICAgXCIgICAgICAgIDxwIGNsYXNzPVxcXCJpbnB1dEhlYWRcXFwiPlR5cGUgeW91ciBOYW1lPC9wPiA8YnI+XCIgK1xuICAgIFwiICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbWF4bGVuZ3RoPVxcXCIxMlxcXCIgbWlubGVuZ3RoPVxcXCIxXFxcIj5cIiArXG4gICAgXCIgICAgICAgIDxwIGNsYXNzPVxcXCJlcnJvclxcXCI+PC9wPlwiICtcbiAgICBcIiAgICAgIDwvZGl2PlwiICtcbiAgICBcIiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vdmVzXFxcIj5cIiArXG4gICAgXCIgICAgICAgICAgIDxwPkhvbGQgdGhlIHNoaXAgZnJvbSBmaXJzdCB0aWxlIGFuZCBkcmFnIGl0IChvbmx5IGZvciBwYyB1c2Vycyk8L3A+XCIgK1xuICAgIFwiICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwIHM1XFxcIiAgZHJhZ2dhYmxlPXRydWUgPjwvZGl2PlwiICtcbiAgICBcIiAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcCBzNFxcXCIgIGRyYWdnYWJsZT10cnVlID48L2Rpdj5cIiArXG4gICAgXCIgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNoaXAgczNcXFwiICBkcmFnZ2FibGU9dHJ1ZSA+PC9kaXY+XCIgK1xuICAgIFwiICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzaGlwIHMyXFxcIiAgZHJhZ2dhYmxlPXRydWUgPjwvZGl2PlwiICtcbiAgICBcIiAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2hpcCBzMVxcXCIgIGRyYWdnYWJsZT10cnVlID48L2Rpdj5cIiArXG4gICAgXCIgICAgICAgPC9kaXY+XCIgK1xuICAgIFwiICAgICAgICAgICA8aDM+T1I8L2gzPlwiICtcbiAgICBcIiAgICAgICA8ZGl2IGNsYXNzPVxcXCJyYW5kb21cXFwiPlJhbmRvbWl6ZTwvZGl2PlwiICtcbiAgICBcIiAgICAgICA8ZGl2IGNsYXNzPVxcXCJyZXNldFxcXCI+UmVzZXQ8L2Rpdj5cIiArXG4gICAgXCIgICAgICA8ZGl2PiBcIiArXG4gICAgXCIgICAgPC9tYWluPlwiICtcbiAgICBcIiAgICA8Zm9vdGVyPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS8xMDIzNDU2N1pcXFwiPjxzdHJvbmc+JmNvcHk7IEZ1ZG88L3N0cm9uZz48L2E+PC9mb290ZXI+XCIgK1xuICAgIFwiICA8L2Rpdj5cIiArXG4gICAgXCJcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlVUkoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKClcbiAgICBsZXQgc3RhcnRDb29yZHMgPSBbXVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmlubmVySFRNTCA9IHN0YXJ0U2NyZWVuO1xuXG4gICAgLyoqIE1ha2UgR3JpZCAqL1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChgY2VsbGAsIGBjJHtpfSR7an1gKTtcbiAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcIilcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZCcpLmFwcGVuZChjZWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGaWxsaW5nIHVwIG1vdmVzIGluc2lkZSBibG9jayAqL1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xuICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucyR7aX1gKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gaTsgaisrKSB7XG4gICAgICAgICAgICBsZXQgcGFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjdXJyZW50U2hpcC5hcHBlbmQocGFydCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTmFtZSBWYWxpZGF0aW9uICovXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC52YWx1ZS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5pbm5lckhUTUwgPSBcIk5vIGVtcHR5IG5hbWVzIGFsbG93ZWQhXCJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLnN0eWxlLmJveFNoYWRvdyA9IFwiLTFweCAxcHggMTVweCA3cHggcmdiYSgyNTUsMCwwLDAuMDkpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZWRcIlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJykuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLnN0eWxlLmJveFNoYWRvdyA9IFwibm9uZVwiXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiYmxhY2tcIlxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8qKiBSYW5kb21pemUgcGxhY2VtZW50ICovXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgICAgICAgIFJhbmRvbWl6ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5pbm5lckhUTUwgPSBcIk5vIGVtcHR5IG5hbWVzIGFsbG93ZWQhXCJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLnN0eWxlLmJveFNoYWRvdyA9IFwiLTFweCAxcHggMTVweCA3cHggcmdiYSgyNTUsMCwwLDAuMDkpXCJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jykuc3R5bGUuYm9yZGVyQ29sb3I9IFwicmVkXCJcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvKiogRHJhZyBhbmQgZHJvcCBwbGFjZW1lbnQgKi9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBlID0+IHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFNoaXBcIiwgSlNPTi5zdHJpbmdpZnkoeyBjbGFzczogc2hpcC5jbGFzc0xpc3RbMF0sIHNpemU6IHBhcnNlSW50KHNoaXAuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJzXCIsICcnKSkgfSkpXG4gICAgICAgIH0pXG4gICAgfSk7XG5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChzdGFydENvb3Jkcy5pbmNsdWRlcyhjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzU2FmZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtpfWApICE9PSBudWxsICYmIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2l9YCkpLmNvb3JkID09IGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNoaXAgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7Y3VycmVudFNoaXB9YCkpLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGN1cnJlbnRTaGlwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpKSArIGl9JHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSl9YCkgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpKSArIGl9JHtjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSl9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID09PSBcIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FmZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NhZmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjdXJyZW50U2hpcDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKX0ke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKSkgKyBpfWApICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKX0ke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKSkgKyBpfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9PT0gXCJ3aGl0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTYWZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FmZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1NhZmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjdXJyZW50U2hpcDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2N1cnJlbnRTaGlwfWApKS52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKX0ke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKSkgKyBpfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKSkgKyBpfSR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAoY3VycmVudFNoaXAgLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzaGlwJHtjdXJyZW50U2hpcH1gKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBzaGlwJHtjdXJyZW50U2hpcH1gLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpfSR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpKSArIGl9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKSkgKyBpfSR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IChjdXJyZW50U2hpcCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2N1cnJlbnRTaGlwfWApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmVydGljYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBzaGlwJHtjdXJyZW50U2hpcH1gLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBBbGxvdyBkcm9wXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRTaGlwXCIpKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4SW5kZXggPSBwYXJzZUludChjZWxsSW5kZXgpICsgKGRhdGEuc2l6ZSAtIDEpO1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0uc2xpY2UoMSwgMil9JHttYXhJbmRleC50b1N0cmluZygpfWApICE9PSBudWxsICYmIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yICE9PSAncmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmF5JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFNoaXBcIikpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNpemU7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhJbmRleCA9IHBhcnNlSW50KGNlbGxJbmRleCkgKyAoZGF0YS5zaXplIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jJHtjZWxsLmNsYXNzTGlzdFsxXS5zbGljZSgxLCAyKX0ke21heEluZGV4LnRvU3RyaW5nKCl9YCkgIT09IG51bGwgJiYgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgIT09ICdyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFNoaXBcIikpO1xuICAgICAgICAgICAgbGV0IGlzRHJvcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGlzU2FmZSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgY2VsbEluZGV4ID0gY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpO1xuICAgICAgICAgICAgY29uc3QgbWF4SW5kZXggPSBwYXJzZUludChjZWxsSW5kZXgpICsgKGRhdGEuc2l6ZSAtIDEpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgaXNTYWZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0YS5zaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgwLCAxKX0ke3BhcnNlSW50KGNlbGwuY2xhc3NMaXN0WzFdLnJlcGxhY2UoXCJjXCIsICcnKS5zbGljZSgxKSkgKyBpfWApICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICYmIGRhdGEuc2l6ZSA9PSAxIHx8IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYyR7Y2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDAsIDEpfSR7cGFyc2VJbnQoY2VsbC5jbGFzc0xpc3RbMV0ucmVwbGFjZShcImNcIiwgJycpLnNsaWNlKDEpKSArIGl9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID09PSBcIndoaXRlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzU2FmZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgaXNTYWZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnNsaWNlKDEsIDIpfSR7bWF4SW5kZXgudG9TdHJpbmcoKX1gKSAhPT0gbnVsbCAmJiBpc1NhZmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMucHVzaChjZWxsLmNsYXNzTGlzdFsxXS5yZXBsYWNlKFwiY1wiLCAnJykpXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgc2hpcCR7ZGF0YS5zaXplfWAsIEpTT04uc3RyaW5naWZ5KHsgY29vcmQ6IHN0YXJ0Q29vcmRzW3N0YXJ0Q29vcmRzLmxlbmd0aCAtIDFdLCB2ZXJ0aWNhbDogZmFsc2UgfSkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dENlbGxJbmRleCA9IHBhcnNlSW50KGNlbGxJbmRleCkgKyBpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsVG9GaWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmMke2NlbGwuY2xhc3NMaXN0WzFdLnNsaWNlKDEsIDIpfSR7bmV4dENlbGxJbmRleC50b1N0cmluZygpfWApXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUb0ZpbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgICAgIGlzRHJvcHBlZCA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNEcm9wcGVkKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnMke2RhdGEuc2l6ZX1gKS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwJykgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZXMnKS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29uZmlybVxcXCI+Q29uZmlybTwvZGl2PlxuICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBodW1hbiA9IG5ldyBQbGF5ZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNoaXBST1dDT09SRCA9IHBhcnNlSW50KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHNoaXAke2l9YCkpLmNvb3JkLnNsaWNlKDAsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hpcENPTENPT1JEID0gcGFyc2VJbnQoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7aX1gKSkuY29vcmQuc2xpY2UoMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc1ZlcnRpY2FsID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc2hpcCR7aX1gKSkudmVydGljYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkU2hpcCA9IG5ldyBTaGlwKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh1bWFuLmJvYXJkU2hpcChzaGlwUk9XQ09PUkQsIHNoaXBDT0xDT09SRCwgc2VsZWN0ZWRTaGlwLCBpc1ZlcnRpY2FsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcignQ29tcHV0ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyLmFpQm9hcmRTaGlwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVTdGFydChodW1hbiAsIGNvbXB1dGVyKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKS5pbm5lckhUTUwgPSBcIk5vIGVtcHR5IG5hbWVzIGFsbG93ZWQhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpLnN0eWxlLmJveFNoYWRvdyA9IFwiLTFweCAxcHggMTVweCA3cHggcmdiYSgyNTUsMCwwLDAuMDkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jykuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInJlZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNldCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKVxuICAgICAgICBtYWtlVUkoKTtcbiAgICB9KVxufVxubWFrZVVJKCkiLCJpbXBvcnQgbWFrZVVJIGZyb20gXCIuL2dhbWVTdGFydFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lQm9hcmQoKSB7XG4gICAgbGV0IGJvYXJkID0gbmV3IEFycmF5KDEwKS5maWxsKDApLm1hcCgoKSA9PiBuZXcgQXJyYXkoMTApLmZpbGwoMCkpO1xuXG4gICAgLyoqIHB1YmxpYyBmdW5jdGlvbiB0byByZXR1cm4gYm9hcmQgKi9cbiAgICBsZXQgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAgIGxldCBzaGlwc0JvYXJkZWQgPSBbXTtcblxuICAgIC8qKiBQbGFjZSBzaGlwIHZlcnRpY2FsbHkgb24gYm9hcmQgLCBhbmQgY2FsbCBiYWNrdHJhY2tpbmcgaWYgc2hpcCBhbHJlYWR5IGV4aXN0cyBvbiB0aGUgcGF0aCAqL1xuICAgIGxldCB2ZXJ0aWNhbFBsYWNlID0gKHNoaXBMZW5ndGgsIHJvdywgY29sLCBzaGlwKSA9PiB7XG4gICAgICAgIGxldCB0ZW1wQmFja1RyYWNrO1xuICAgICAgICBsZXQgZW5kaW5nID0gMDtcbiAgICAgICAgbGV0IGNvb3JkcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGJvYXJkW3JvdyArIGldW2NvbF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gMTtcbiAgICAgICAgICAgICAgICBlbmRpbmcrK1xuICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKFtyb3cgKyBpLCBjb2xdKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZW1wQmFja1RyYWNrID0gaSAtIDE7XG4gICAgICAgICAgICAgICAgYmFja1RyYWNrVmVydGljYWwodGVtcEJhY2tUcmFjaywgcm93LCBjb2wpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbmRpbmcgPT09IHNoaXBMZW5ndGggJiYgY29vcmRzLmxlbmd0aCA9PT0gc2hpcExlbmd0aCkge1xuICAgICAgICAgICAgc2hpcHNCb2FyZGVkLnB1c2goeyBzaGlwOiBzaGlwLnNoaXBzLCBjb29yZGluYXRlczogY29vcmRzIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUGxhY2Ugc2hpcCBob3Jpem9udGFsbHkgb24gYm9hcmQgLCBhbmQgY2FsbCBiYWNrdHJhY2tpbmcgaWYgc2hpcCBhbHJlYWR5IGV4aXN0cyBvbiB0aGUgcGF0aCAqL1xuICAgIGxldCBob3Jpem9udGFsUGxhY2UgPSAoc2hpcExlbmd0aCwgcm93LCBjb2wsIHNoaXApID0+IHtcbiAgICAgICAgbGV0IHRlbXBCYWNrVHJhY2s7XG4gICAgICAgIGxldCBlbmRpbmcgPSAwO1xuICAgICAgICBsZXQgY29vcmRzID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3ddW2NvbCArIGldID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IDE7XG4gICAgICAgICAgICAgICAgZW5kaW5nKytcbiAgICAgICAgICAgICAgICBjb29yZHMucHVzaChbcm93LCBjb2wgKyBpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXBCYWNrVHJhY2sgPSBpIC0gMTtcbiAgICAgICAgICAgICAgICBiYWNrVHJhY2tIb3Jpem9udGFsKHRlbXBCYWNrVHJhY2ssIHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5kaW5nID09PSBzaGlwTGVuZ3RoICYmIGNvb3Jkcy5sZW5ndGggPT09IHNoaXBMZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXBzQm9hcmRlZC5wdXNoKHsgc2hpcDogc2hpcC5zaGlwcywgY29vcmRpbmF0ZXM6IGNvb3JkcyB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrcyBpZiB0aGUgcG9zaXRpb24gaXMgdmFsaWQgb3Igbm90IGFuZCB0aGVuIGJhc2VkIG9uIHZlcnRpY2FsIHBhcmFtZXRlciB2YWx1ZSAsIGNhbGwgdGhlIHN1aXRhYmxlIGZ1bmN0aW9uIHRvIHBsYWNlIGl0ICovXG4gICAgbGV0IFBsYWNlU2hpcCA9IChyb3csIGNvbCwgc2hpcCwgdmVydGljYWwgPSB0cnVlKSA9PiB7XG4gICAgICAgIGlmIChib2FyZFtyb3ddICE9PSB1bmRlZmluZWQgJiYgYm9hcmRbcm93XVtjb2xdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh2ZXJ0aWNhbCAmJiBib2FyZFtyb3cgKyAoc2hpcC5zaGlwcy5sZW5ndGggLSAxKV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2FsUGxhY2Uoc2hpcC5zaGlwcy5sZW5ndGgsIHJvdywgY29sLCBzaGlwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZlcnRpY2FsICYmIGJvYXJkW3Jvd11bY29sICsgKHNoaXAuc2hpcHMubGVuZ3RoIC0gMSldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsUGxhY2Uoc2hpcC5zaGlwcy5sZW5ndGgsIHJvdywgY29sLCBzaGlwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYm90aCBvZiB0aGUgYmFja1RyYWNrIGRvd24gaGVyZSAsIHRha2VzIHRoZSBpbmRleCB2YWx1ZSBmcm9tIHdoZXJlIGFmdGVyd2FyZCBhbm90aGVyIHNoaXAgd2FzIHRoZXJlIHRoZW4gc3RhcnQgYmFja3RyYWNraW5nXG4gICAgICogdW50aWwgaW5kZXggaXMgMCBhbmQgYm9hcmQgaXMgcmVzZXQgdG8gd2hhdCBpdHMgcHJldmlvdXMgc3RhdGUgd2FzXG4gICAgICovXG4gICAgbGV0IGJhY2tUcmFja1ZlcnRpY2FsID0gKGluZGV4LCByb3csIGNvbCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBiYWNrVHJhY2tIb3Jpem9udGFsID0gKGluZGV4LCByb3csIGNvbCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBib2FyZFtyb3ddW2NvbCArIGldID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbGV0IHJlY2lldmVBdHRhY2sgPSAocm93LCBjb2wgLCBlbmVteUJvYXJkKSA9PiB7XG5cbiAgICAgICAgLyoqIENoZWNrIGlmIGl0cyBhIHZhbGlkIGNvb3JkaW5hdGUgdG8gaGl0IGFuZCBub3QgYmVpbmcgaGl0IGJlZm9yZSAqL1xuICAgICAgICBpZiAoYm9hcmRbcm93XSAhPT0gdW5kZWZpbmVkICYmIGJvYXJkW3Jvd11bY29sXSAhPT0gdW5kZWZpbmVkICYmIGJvYXJkW3Jvd11bY29sXSAhPT0gJ2hpdCcpIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICBib2FyZFtyb3ddW2NvbF0gPSAnaGl0JztcbiAgICAgICAgICAgICAgICBsZXQgaGl0U2hpcCA9IHNoaXBzQm9hcmRlZC5maWx0ZXIoKHNoaXApID0+IHNoaXAuY29vcmRpbmF0ZXMuc29tZShjb29yZCA9PiBjb29yZFswXSA9PT0gcm93ICYmIGNvb3JkWzFdID09PSBjb2wpKTtcbiAgICAgICAgICAgICAgICBoaXRTaGlwWzBdLnNoaXAuaGl0KCk7XG4gICAgICAgICAgICAgICAgaGl0U2hpcFswXS5zaGlwLmlzU3VuaygpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUdhbWUoaGl0U2hpcFswXS5zaGlwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJvYXJkW3Jvd11bY29sXSA9ICdtaXNzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbmRHYW1lKGVuZW15Qm9hcmQpXG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZSB0aGUgYm9hcmRlZCBzaGlwcyAqL1xuICAgIGxldCB1cGRhdGVHYW1lID0gKHNoaXApID0+IHtcbiAgICAgICAgaWYgKHNoaXAuc3Vuaykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gc2hpcHNCb2FyZGVkLmZpbmRJbmRleCgocykgPT4gc2hpcCA9PT0gcy5zaGlwKVxuICAgICAgICAgICAgc2hpcHNCb2FyZGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW5kIGdhbWUgaWYgZ2FtZWJvYXJkJ3MgYWxsIGJvYXJkZWQgc2hpcHMgYXJlIGRvd24gKi9cbiAgICBsZXQgZW5kR2FtZSA9IChlbmVteUJvYXJkKSA9PiB7XG4gICAgICAgIGlmIChzaGlwc0JvYXJkZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IFwiWW91XCJcbiAgICAgICAgICAgIGlmKGVuZW15Qm9hcmQubmFtZSAhPT0gXCJDb21wdXRlclwiKXtcbiAgICAgICAgICAgICAgICBuYW1lID0gXCJDb21wdXRlclwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJykuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGgxIGNsYXNzPVxcXCJhbm5vdW5jZW1lbnRcXFwiPiR7bmFtZX0gd29uIGFnYWluc3QgJHtlbmVteUJvYXJkLm5hbWV9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBsYXlBZ2FpblxcXCI+UGxheSBBZ2FpbjwvZGl2PlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5QWdhaW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWFrZVVJKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwiU3RpbGwgb25nb2luZ1wiXG4gICAgfVxuICAgIHJldHVybiB7IFBsYWNlU2hpcCwgZ2V0Qm9hcmQsIHJlY2lldmVBdHRhY2ssIHNoaXBzQm9hcmRlZCB9XG59IiwiaW1wb3J0IGF0dGFja090aGVyIGZyb20gXCIuL2F0dGFja1wiO1xuXG52YXIgc3RhcnRTY3JlZW4gPSBcIlwiICtcbiAgICBcIiAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIj5cIiArXG4gICAgXCIgICAgPGhlYWRlciBjbGFzcz1cXFwiZml4ZWRIZWFkXFxcIj5cIiArXG4gICAgXCIgICAgICA8aDE+QmF0dGxlIFNoaXA8L2gxPlwiICtcbiAgICBcIiAgICAgIDxwPldoZXJlIHRoZSByZWFsIG9uZSBmaWdodHM8L3A+XCIgK1xuICAgIFwiICAgIDwvaGVhZGVyPlwiICtcbiAgICBcIiAgICAgIDxwPllvdTwvcD5cIiArXG4gICAgXCIgICAgICA8ZGl2IGNsYXNzPVxcXCJodW1hbkIgYm9hcmRcXFwiPjwvZGl2PlwiICtcbiAgICBcIiAgICAgIDxwPk9wcG9uZW50PC9wPlwiICtcbiAgICBcIiAgICAgIDxkaXYgY2xhc3M9XFxcIkFJQiBib2FyZFxcXCI+PC9kaXY+XCIgK1xuICAgIFwiICAgIDxmb290ZXI+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tLzEwMjM0NTY3WlxcXCI+PHN0cm9uZz4mY29weTsgRnVkbzwvc3Ryb25nPjwvYT48L2Zvb3Rlcj5cIiArXG4gICAgXCIgIDwvZGl2PlwiICtcbiAgICBcIlwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lU3RhcnQoaHVtYW4sIGNvbXB1dGVyKSB7XG4gICAgXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuaW5uZXJIVE1MID0gc3RhcnRTY3JlZW47XG5cbiAgICAvKiogTWFrZSBHcmlkICovXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkJykuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChgY2VsbGAsIGBjZWxsJHtpfSR7an1gKTtcbiAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIpXG4gICAgICAgICAgICAgICAgYm9hcmQuYXBwZW5kKGNlbGwpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRlbXBDb29yZHMgPSBodW1hbi5nYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5tYXAoKHNoaXApID0+IHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgIGxldCBzaGlwQ29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGk7IGorKykge1xuICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKHRlbXBDb29yZHNbaV1bal0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGh1bWFuQiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtYW5CXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgICBodW1hbkIucXVlcnlTZWxlY3RvcihgLmNlbGwke3NoaXBDb29yZHNbaV1bMF19JHtzaGlwQ29vcmRzW2ldWzFdfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5BSUJcIikuY2hpbGROb2Rlcy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snICwgZSA9PiB7XG4gICAgICAgICAgICBhdHRhY2tPdGhlcihodW1hbiAsIGNvbXB1dGVyICwgY2VsbCk7XG4gICAgICAgIH0pXG4gICAgfSlcbn0iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5pbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXIocGxheWVyTmFtZSwgaXNBSSA9IHRydWUpIHtcbiAgICBsZXQgbmFtZSA9IHBsYXllck5hbWU7XG4gICAgbGV0IGdhbWVCb2FyZEZhY3QgPSBuZXcgR2FtZUJvYXJkKCk7XG4gICAgbGV0IGJvYXJkID0gZ2FtZUJvYXJkRmFjdC5nZXRCb2FyZCgpO1xuXG4gICAgbGV0IGJvYXJkU2hpcCA9IChyb3csIGNvbCwgc2hpcCwgdmVydGljYWwgPSB0cnVlKSA9PiB7XG4gICAgICAgIGlmIChnYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggIT09IDUpIHtcbiAgICAgICAgICAgIGdhbWVCb2FyZEZhY3QuUGxhY2VTaGlwKHJvdywgY29sLCBzaGlwLCB2ZXJ0aWNhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYWlCb2FyZFNoaXAgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc0FJKSB7XG4gICAgICAgICAgICB3aGlsZSAoZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoIDwgNSkge1xuICAgICAgICAgICAgICAgIGxldCBzaGlwID0gbmV3IFNoaXAoZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICAgICAgbGV0IHZlcnRpY2FsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcbiAgICAgICAgICAgICAgICBsZXQgaXNWYWxpZFNwb3QgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHdoaWxlICghaXNWYWxpZFNwb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUJvYXJkRmFjdC5QbGFjZVNoaXAocm93LCBjb2wsIHNoaXAsIHZlcnRpY2FsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWRTcG90ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBhaUF0dGFjayA9IChlbmVteUJvYXJkKSA9PiB7XG4gICAgICAgIGlmIChpc0FJKSB7XG4gICAgICAgICAgICBpZiAoZW5lbXlCb2FyZC5nYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggPD0gNSAmJiBlbmVteUJvYXJkLmdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVCb2FyZCA9IGVuZW15Qm9hcmQuZ2FtZUJvYXJkRmFjdC5nZXRCb2FyZCgpO1xuICAgICAgICAgICAgICAgIGxldCBpc1ZhbGlkU3BvdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKCFpc1ZhbGlkU3BvdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVCb2FyZFtyb3ddW2NvbF0gPT0gMCB8fCBlQm9hcmRbcm93XVtjb2xdID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWRTcG90ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15Qm9hcmQuZ2FtZUJvYXJkRmFjdC5yZWNpZXZlQXR0YWNrKHJvdywgY29sICwgZW5lbXlCb2FyZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmFuZG9tID0gKCkgPT4ge1xuICAgICAgICB3aGlsZSAoZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoIDwgNSkge1xuICAgICAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcChnYW1lQm9hcmRGYWN0LnNoaXBzQm9hcmRlZC5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgIGxldCB2ZXJ0aWNhbCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XG4gICAgICAgICAgICBsZXQgaXNWYWxpZFNwb3QgPSBmYWxzZTtcblxuICAgICAgICAgICAgd2hpbGUgKCFpc1ZhbGlkU3BvdCkge1xuICAgICAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2xdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVCb2FyZEZhY3QuUGxhY2VTaGlwKHJvdywgY29sLCBzaGlwLCB2ZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWRTcG90ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYXR0YWNrID0gKHJvdywgY29sLCBlbmVteUJvYXJkKSA9PiB7XG4gICAgICAgIGlmIChlbmVteUJvYXJkLmdhbWVCb2FyZEZhY3Quc2hpcHNCb2FyZGVkLmxlbmd0aCA8PSA1ICYmIGVuZW15Qm9hcmQuZ2FtZUJvYXJkRmFjdC5zaGlwc0JvYXJkZWQubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIGVuZW15Qm9hcmQuZ2FtZUJvYXJkRmFjdC5yZWNpZXZlQXR0YWNrKHJvdywgY29sICwgZW5lbXlCb2FyZCk7XG4gICAgICAgICAgICByZXR1cm4gXCJBbGwgZ29vZCBvbiB3ZXN0ZXJuIGZyb250XCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIlBsYWNlIGFsbCB0aGUgc2hpcHMgb24geW91ciBib2FyZCBiZWZvcmUgc3RhcnRpbmcgdGhlIGF0dGFja1wiXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgYm9hcmRTaGlwLCBhaUJvYXJkU2hpcCwgYXR0YWNrLCBhaUF0dGFjayxyYW5kb20sIG5hbWUsIGJvYXJkLCBnYW1lQm9hcmRGYWN0IH1cbn0gIiwiaW1wb3J0IGdhbWVTdGFydCBmcm9tIFwiLi9tYWluR2FtZVwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmFuZG9taXplKG5hbWUpe1xuICAgIGxldCBodW1hbiA9IG5ldyBQbGF5ZXIobmFtZSAsIGZhbHNlKTtcbiAgICBodW1hbi5yYW5kb20oKTtcblxuICAgIGxldCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoJ0NvbXB1dGVyJyAsIHRydWUpO1xuICAgIGNvbXB1dGVyLmFpQm9hcmRTaGlwKCk7XG4gICAgZ2FtZVN0YXJ0KGh1bWFuICwgY29tcHV0ZXIpXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlU2NyZWVuKGh1bWFuQiAsIGFpQil7XG4gICAgbGV0IGhVSSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1hbkInKTtcbiAgICBsZXQgYVVJID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFJQicpXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCAxMDsgaSsrKXtcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDEwOyBqKyspe1xuICAgICAgICAgICAgaWYoaHVtYW5CW2ldW2pdID09IFwiaGl0XCIpe1xuICAgICAgICAgICAgICAgIGhVSS5xdWVyeVNlbGVjdG9yKGAuY2VsbCR7aX0ke2p9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGNvcmFsXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoaHVtYW5CW2ldW2pdID09IDEpe1xuICAgICAgICAgICAgICAgIGhVSS5xdWVyeVNlbGVjdG9yKGAuY2VsbCR7aX0ke2p9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihodW1hbkJbaV1bal0gPT0gXCJtaXNzXCIpe1xuICAgICAgICAgICAgICAgIGhVSS5xdWVyeVNlbGVjdG9yKGAuY2VsbCR7aX0ke2p9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihhaUJbaV1bal0gPT0gXCJoaXRcIil7XG4gICAgICAgICAgICAgICAgYVVJLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsJHtpfSR7an1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Y29yYWxcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhaUJbaV1bal0gPT0gXCJtaXNzXCIpe1xuICAgICAgICAgICAgICAgIGFVSS5xdWVyeVNlbGVjdG9yKGAuY2VsbCR7aX0ke2p9YCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vQ29udGVudC9oZWFkZXJGLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vQ29udGVudC9QbGF5cGVuU2Fucy1FeHRyYUxpZ2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEB0YWlsd2luZCBiYXNlO1xuQHRhaWx3aW5kIGNvbXBvbmVudHM7XG5AdGFpbHdpbmQgdXRpbGl0aWVzO1xuXG5cbkBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcImhlYWRlckZcIjtcbiAgICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwibm9ybWFsRlwiO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xufVxuXG5Aa2V5ZnJhbWVzIGhlYWRlciB7XG4gICAgMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTI5MHB4KTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5cbiAgICAyNSUge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIxNy41cHgpO1xuICAgICAgICBvcGFjaXR5OiAwLjI1O1xuICAgIH1cblxuICAgIDUwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTQ1cHgpO1xuICAgICAgICBvcGFjaXR5OiAwLjU7XG4gICAgfVxuXG4gICAgNzUlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MHB4KTtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbn1cblxuXG5Aa2V5ZnJhbWVzIGdyaWQge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MHB4KTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5cbiAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbn1cblxuQGtleWZyYW1lcyBtYWluIHtcbiAgICAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTBweCk7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG59XG5cbioge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgZm9udC1mYW1pbHk6IFwibm9ybWFsRlwiO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmNvbnRhaW5lciB7XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogZml0LWNvbnRlbnQoMTUlKSBmaXQtY29udGVudCg1MCUpIGZpdC1jb250ZW50KDIwJSkgYXV0bztcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjI1LCA0MywgMTM3LCAwLjIxKTtcbn1cblxuaDEge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBhbmltYXRpb246IGhlYWRlciA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xufVxuXG5oMT5wIHtcbiAgICBhbmltYXRpb246IGhlYWRlciA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xufVxuXG5oZWFkZXIge1xuICAgIGFuaW1hdGlvbjogaGVhZGVyIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJvcmRlcjogMXB4IHJpZGdlIGJsYWNrO1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGZvbnQtZmFtaWx5OiBcIm5vcm1hbEZcIjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDkyLCA1OSwgMTk3LCAwLjIyKTtcbiAgICBtYXgtaGVpZ2h0OiAyOTBweDtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxubWFpbiB7XG4gICAgYW5pbWF0aW9uOiBtYWluIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmNvbnRyb2x7XG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJvYXJkIHtcbiAgICB3aWR0aDogMjkwcHg7XG4gICAgaGVpZ2h0OiAyOTBweDtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOXB4KTtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjlweCk7XG4gICAgYW5pbWF0aW9uOiBncmlkIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XG59XG5cbi5jZWxsIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XG4gICAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4ubW92ZXMge1xuICAgIG1hcmdpbjogMDtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpbGwsIGZpdC1jb250ZW50KDc1cHgpKTtcbiAgICBnYXA6IDVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgYm9yZGVyLXRvcDogMXB4IHJpZGdlIGJsYWNrO1xuICAgIHBhZGRpbmc6IDVweDtcbn1cblxuLm1vdmVzPmRpdjpub3QoLmNvbmZpcm0pIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCAyOXB4KTtcbiAgICBnYXA6IDA7XG4gICAgei1pbmRleDogMjtcbiAgICBjdXJzb3I6IG1vdmU7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNHMgbGluZWFyO1xuICAgIC13ZWJraXQtdXNlci1kcmFnOiBlbGVtZW50O1xuICAgIGhlaWdodDogMjlweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5zNSB7XG4gICAgd2lkdGg6IDE0NXB4O1xufVxuXG4uczQge1xuICAgIHdpZHRoOiAxMTZweDtcbn1cblxuLnMzIHtcbiAgICB3aWR0aDogODdweDtcbn1cblxuLnMyIHtcbiAgICB3aWR0aDogNThweDtcbn1cblxuLnMxIHtcbiAgICB3aWR0aDogMjlweDtcbn1cblxuXG4ubW92ZXM+ZGl2PmRpdiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgIG91dGxpbmU6IDFweCByaWRnZSBibGFjaztcbn1cblxuXG5mb290ZXIge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBhbmltYXRpb246IG1haW4gODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcbn1cblxuLnJhbmRvbSxcbi5yZXNldCB7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBwYWRkaW5nOiA2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgZm9udC12YXJpYW50OiBub3JtYWw7XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgbGluZWFyO1xufVxuXG4ucmFuZG9tIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ucmFuZG9tOmhvdmVyLFxuLnJlc2V0OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjNUQ1RDVEO1xufVxuXG4ucmFuZG9tOmFjdGl2ZSxcbi5yZXNldDphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6ICMzNzM3Mzc7XG59XG5cbmlucHV0IHtcbiAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICAgIHdpZHRoOiAyOTBweDtcbn1cblxuLmlucHV0SGVhZCB7XG4gICAgbWFyZ2luOiAxMHB4O1xufVxuXG4uZXJyb3Ige1xuICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIGNvbG9yOiByZWQ7XG4gICAgcGFkZGluZzogM3B4O1xufVxuXG4uaHVtYW5CIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xufVxuXG4uQUlCPmRpdiB7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGxpbmVhcjtcbn1cblxuLkFJQj5kaXY6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKVxufVxuXG4ucGxheUFnYWluLFxuLmNvbmZpcm0ge1xuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XG4gICAgZm9udC1zaXplOiAyM3B4O1xuICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xuICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYigxNjQsIDE2LCAxNikgMCUsIHJnYigyMDMsIDAsIDApIDUwJSwgcmdiKDExNywgMCwgMCkgMTAwJSk7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjE5KSA1cHggNXB4IDE1cHggNXB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYigyOCwgMTEwLCAxNjQpO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5wbGF5QWdhaW46aG92ZXIsXG4uY29uZmlybTpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogI0E0MTAxMDtcbn1cblxuLnBsYXlBZ2FpbjphY3RpdmUsXG4uY29uZmlybTphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6ICM3NTAwMDA7XG59XG5cbi5jb25maXJtIHtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgYW5pbWF0aW9uOiBncmlkIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XG5cbn1cblxuYSB7XG4gICAgY29sb3I6IHJlZDtcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuXG5oZWFkZXIrcCxcbi5odW1hbkIrcCB7XG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcbn1cblxuLmFubm91bmNlbWVudCB7XG4gICAgZ3JpZC1hcmVhOiAyLzEvMy8zO1xufVxuXG4ucGxheUFnYWluIHtcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xuICAgIGdyaWQtYXJlYTogMy8xLzQvMztcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjkzNnB4KSB7XG4gICAgLmNvbnRhaW5lciB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNTAlIDUwJTtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBmaXQtY29udGVudCgyOTBweCkgYXV0bztcbiAgICAgICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgICB9XG5cbiAgICBoZWFkZXIge1xuICAgICAgICBncmlkLWFyZWE6IDEvMS8yLzM7XG4gICAgfVxuXG4gICAgLmh1bWFuQiB7XG4gICAgICAgIGdyaWQtYXJlYTogMi8xLzMvMjtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cblxuICAgIC5BSUIge1xuICAgICAgICBncmlkLWFyZWE6IDIvMi8zLzM7XG4gICAgfVxuXG4gICAgaGVhZGVyK3AsXG4gICAgLmh1bWFuQitwIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBmb250LXNpemU6IHh4LWxhcmdlO1xuICAgICAgICBhbGlnbi1zZWxmOiBzdGFydDtcbiAgICAgICAgcGFkZGluZzogNnB4O1xuICAgIH1cblxuICAgIC5odW1hbkIge1xuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtZW5kO1xuICAgIH1cblxuICAgIC5BSUIge1xuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgfVxuXG4gICAgLmh1bWFuQitwIHtcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xuICAgICAgICBtYXJnaW4tbGVmdDogNDVweDtcbiAgICB9XG5cbiAgICBoZWFkZXIrcCB7XG4gICAgICAgIGp1c3RpZnktc2VsZjogZmxleC1lbmQ7XG4gICAgICAgIG1hcmdpbi1yaWdodDogNDVweDtcbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUzMHB4KSB7XG4gICAgLmFubm91bmNlbWVudCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wi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UUFDbEIsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixZQUFZO0lBQ2hCOztJQUVBO1FBQ0ksc0JBQXNCO0lBQzFCOztJQUVBO1FBQ0ksd0JBQXdCO0lBQzVCOztJQUVBO1FBQ0ksd0JBQXdCO1FBQ3hCLGlCQUFpQjtJQUNyQjs7SUFFQTtRQUNJLHNCQUFzQjtRQUN0QixrQkFBa0I7SUFDdEI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksZUFBZTtJQUNuQjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkB0YWlsd2luZCBiYXNlO1xcbkB0YWlsd2luZCBjb21wb25lbnRzO1xcbkB0YWlsd2luZCB1dGlsaXRpZXM7XFxuXFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiaGVhZGVyRlxcXCI7XFxuICAgIHNyYzogdXJsKC4vQ29udGVudC9oZWFkZXJGLnR0Zik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogXFxcIm5vcm1hbEZcXFwiO1xcbiAgICBzcmM6IHVybCguL0NvbnRlbnQvUGxheXBlblNhbnMtRXh0cmFMaWdodC50dGYpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGhlYWRlciB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjkwcHgpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcblxcbiAgICAyNSUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMTcuNXB4KTtcXG4gICAgICAgIG9wYWNpdHk6IDAuMjU7XFxuICAgIH1cXG5cXG4gICAgNTAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTQ1cHgpO1xcbiAgICAgICAgb3BhY2l0eTogMC41O1xcbiAgICB9XFxuXFxuICAgIDc1JSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwcHgpO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbn1cXG5cXG5cXG5Aa2V5ZnJhbWVzIGdyaWQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwcHgpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBtYWluIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MHB4KTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxufVxcblxcbioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgICBmb250LWZhbWlseTogXFxcIm5vcm1hbEZcXFwiO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogZml0LWNvbnRlbnQoMTUlKSBmaXQtY29udGVudCg1MCUpIGZpdC1jb250ZW50KDIwJSkgYXV0bztcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMjUsIDQzLCAxMzcsIDAuMjEpO1xcbn1cXG5cXG5oMSB7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gICAgYW5pbWF0aW9uOiBoZWFkZXIgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcXG59XFxuXFxuaDE+cCB7XFxuICAgIGFuaW1hdGlvbjogaGVhZGVyIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGFuaW1hdGlvbjogaGVhZGVyIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHJpZGdlIGJsYWNrO1xcbiAgICBib3JkZXItdG9wOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwibm9ybWFsRlxcXCI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoOTIsIDU5LCAxOTcsIDAuMjIpO1xcbiAgICBtYXgtaGVpZ2h0OiAyOTBweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcblxcbm1haW4ge1xcbiAgICBhbmltYXRpb246IG1haW4gODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcXG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uY29udHJvbHtcXG4gICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICB3aWR0aDogMjkwcHg7XFxuICAgIGhlaWdodDogMjkwcHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOXB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDI5cHgpO1xcbiAgICBhbmltYXRpb246IGdyaWQgODAwbXMgZWFzZSAwcyAxIG5vcm1hbCBmb3J3YXJkcztcXG59XFxuXFxuLmNlbGwge1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLm1vdmVzIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpbGwsIGZpdC1jb250ZW50KDc1cHgpKTtcXG4gICAgZ2FwOiA1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZy10b3A6IDEwcHg7XFxuICAgIGJvcmRlci10b3A6IDFweCByaWRnZSBibGFjaztcXG4gICAgcGFkZGluZzogNXB4O1xcbn1cXG5cXG4ubW92ZXM+ZGl2Om5vdCguY29uZmlybSkge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgMjlweCk7XFxuICAgIGdhcDogMDtcXG4gICAgei1pbmRleDogMjtcXG4gICAgY3Vyc29yOiBtb3ZlO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC40cyBsaW5lYXI7XFxuICAgIC13ZWJraXQtdXNlci1kcmFnOiBlbGVtZW50O1xcbiAgICBoZWlnaHQ6IDI5cHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnM1IHtcXG4gICAgd2lkdGg6IDE0NXB4O1xcbn1cXG5cXG4uczQge1xcbiAgICB3aWR0aDogMTE2cHg7XFxufVxcblxcbi5zMyB7XFxuICAgIHdpZHRoOiA4N3B4O1xcbn1cXG5cXG4uczIge1xcbiAgICB3aWR0aDogNThweDtcXG59XFxuXFxuLnMxIHtcXG4gICAgd2lkdGg6IDI5cHg7XFxufVxcblxcblxcbi5tb3Zlcz5kaXY+ZGl2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgICBvdXRsaW5lOiAxcHggcmlkZ2UgYmxhY2s7XFxufVxcblxcblxcbmZvb3RlciB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYW5pbWF0aW9uOiBtYWluIDgwMG1zIGVhc2UgMHMgMSBub3JtYWwgZm9yd2FyZHM7XFxufVxcblxcbi5yYW5kb20sXFxuLnJlc2V0IHtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDE2cHg7XFxuICAgIHBhZGRpbmc6IDZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtdmFyaWFudDogbm9ybWFsO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XFxufVxcblxcbi5yYW5kb20ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG4ucmFuZG9tOmhvdmVyLFxcbi5yZXNldDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQ6ICM1RDVENUQ7XFxufVxcblxcbi5yYW5kb206YWN0aXZlLFxcbi5yZXNldDphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kOiAjMzczNzM3O1xcbn1cXG5cXG5pbnB1dCB7XFxuICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICBwYWRkaW5nOiA1cHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgZm9udC1zaXplOiAyNXB4O1xcbiAgICB3aWR0aDogMjkwcHg7XFxufVxcblxcbi5pbnB1dEhlYWQge1xcbiAgICBtYXJnaW46IDEwcHg7XFxufVxcblxcbi5lcnJvciB7XFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgY29sb3I6IHJlZDtcXG4gICAgcGFkZGluZzogM3B4O1xcbn1cXG5cXG4uaHVtYW5CIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG59XFxuXFxuLkFJQj5kaXYge1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4xNXMgbGluZWFyO1xcbn1cXG5cXG4uQUlCPmRpdjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKVxcbn1cXG5cXG4ucGxheUFnYWluLFxcbi5jb25maXJtIHtcXG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gICAgZm9udC1zaXplOiAyM3B4O1xcbiAgICBsaW5lLWhlaWdodDogMjNweDtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC12YXJpYW50OiBub3JtYWw7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYigxNjQsIDE2LCAxNikgMCUsIHJnYigyMDMsIDAsIDApIDUwJSwgcmdiKDExNywgMCwgMCkgMTAwJSk7XFxuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xOSkgNXB4IDVweCAxNXB4IDVweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiKDI4LCAxMTAsIDE2NCk7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ucGxheUFnYWluOmhvdmVyLFxcbi5jb25maXJtOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogI0E0MTAxMDtcXG59XFxuXFxuLnBsYXlBZ2FpbjphY3RpdmUsXFxuLmNvbmZpcm06YWN0aXZlIHtcXG4gICAgYmFja2dyb3VuZDogIzc1MDAwMDtcXG59XFxuXFxuLmNvbmZpcm0ge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGFuaW1hdGlvbjogZ3JpZCA4MDBtcyBlYXNlIDBzIDEgbm9ybWFsIGZvcndhcmRzO1xcblxcbn1cXG5cXG5hIHtcXG4gICAgY29sb3I6IHJlZDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuaGVhZGVyK3AsXFxuLmh1bWFuQitwIHtcXG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcXG59XFxuXFxuLmFubm91bmNlbWVudCB7XFxuICAgIGdyaWQtYXJlYTogMi8xLzMvMztcXG59XFxuXFxuLnBsYXlBZ2FpbiB7XFxuICAgIG1heC13aWR0aDogMjAwcHg7XFxuICAgIGdyaWQtYXJlYTogMy8xLzQvMztcXG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo5MzZweCkge1xcbiAgICAuY29udGFpbmVyIHtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNTAlIDUwJTtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogZml0LWNvbnRlbnQoMjkwcHgpIGF1dG87XFxuICAgICAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIGhlYWRlciB7XFxuICAgICAgICBncmlkLWFyZWE6IDEvMS8yLzM7XFxuICAgIH1cXG5cXG4gICAgLmh1bWFuQiB7XFxuICAgICAgICBncmlkLWFyZWE6IDIvMS8zLzI7XFxuICAgICAgICBtYXJnaW46IDA7XFxuICAgIH1cXG5cXG4gICAgLkFJQiB7XFxuICAgICAgICBncmlkLWFyZWE6IDIvMi8zLzM7XFxuICAgIH1cXG5cXG4gICAgaGVhZGVyK3AsXFxuICAgIC5odW1hbkIrcCB7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBmb250LXNpemU6IHh4LWxhcmdlO1xcbiAgICAgICAgYWxpZ24tc2VsZjogc3RhcnQ7XFxuICAgICAgICBwYWRkaW5nOiA2cHg7XFxuICAgIH1cXG5cXG4gICAgLmh1bWFuQiB7XFxuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtZW5kO1xcbiAgICB9XFxuXFxuICAgIC5BSUIge1xcbiAgICAgICAganVzdGlmeS1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgICB9XFxuXFxuICAgIC5odW1hbkIrcCB7XFxuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnQ7XFxuICAgICAgICBtYXJnaW4tbGVmdDogNDVweDtcXG4gICAgfVxcblxcbiAgICBoZWFkZXIrcCB7XFxuICAgICAgICBqdXN0aWZ5LXNlbGY6IGZsZXgtZW5kO1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA0NXB4O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUzMHB4KSB7XFxuICAgIC5hbm5vdW5jZW1lbnQge1xcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsInZhciB4PVN0cmluZztcbnZhciBjcmVhdGU9ZnVuY3Rpb24oKSB7cmV0dXJuIHtpc0NvbG9yU3VwcG9ydGVkOmZhbHNlLHJlc2V0OngsYm9sZDp4LGRpbTp4LGl0YWxpYzp4LHVuZGVybGluZTp4LGludmVyc2U6eCxoaWRkZW46eCxzdHJpa2V0aHJvdWdoOngsYmxhY2s6eCxyZWQ6eCxncmVlbjp4LHllbGxvdzp4LGJsdWU6eCxtYWdlbnRhOngsY3lhbjp4LHdoaXRlOngsZ3JheTp4LGJnQmxhY2s6eCxiZ1JlZDp4LGJnR3JlZW46eCxiZ1llbGxvdzp4LGJnQmx1ZTp4LGJnTWFnZW50YTp4LGJnQ3lhbjp4LGJnV2hpdGU6eH19O1xubW9kdWxlLmV4cG9ydHM9Y3JlYXRlKCk7XG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVDb2xvcnMgPSBjcmVhdGU7XG4iLCIndXNlIHN0cmljdCdcblxubGV0IENvbnRhaW5lciA9IHJlcXVpcmUoJy4vY29udGFpbmVyJylcblxuY2xhc3MgQXRSdWxlIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAnYXRydWxlJ1xuICB9XG5cbiAgYXBwZW5kKC4uLmNoaWxkcmVuKSB7XG4gICAgaWYgKCF0aGlzLnByb3h5T2Yubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICAgIHJldHVybiBzdXBlci5hcHBlbmQoLi4uY2hpbGRyZW4pXG4gIH1cblxuICBwcmVwZW5kKC4uLmNoaWxkcmVuKSB7XG4gICAgaWYgKCF0aGlzLnByb3h5T2Yubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICAgIHJldHVybiBzdXBlci5wcmVwZW5kKC4uLmNoaWxkcmVuKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXRSdWxlXG5BdFJ1bGUuZGVmYXVsdCA9IEF0UnVsZVxuXG5Db250YWluZXIucmVnaXN0ZXJBdFJ1bGUoQXRSdWxlKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJylcblxuY2xhc3MgQ29tbWVudCBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgIHN1cGVyKGRlZmF1bHRzKVxuICAgIHRoaXMudHlwZSA9ICdjb21tZW50J1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudFxuQ29tbWVudC5kZWZhdWx0ID0gQ29tbWVudFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCB7IGlzQ2xlYW4sIG15IH0gPSByZXF1aXJlKCcuL3N5bWJvbHMnKVxubGV0IERlY2xhcmF0aW9uID0gcmVxdWlyZSgnLi9kZWNsYXJhdGlvbicpXG5sZXQgQ29tbWVudCA9IHJlcXVpcmUoJy4vY29tbWVudCcpXG5sZXQgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpXG5cbmxldCBwYXJzZSwgUnVsZSwgQXRSdWxlLCBSb290XG5cbmZ1bmN0aW9uIGNsZWFuU291cmNlKG5vZGVzKSB7XG4gIHJldHVybiBub2Rlcy5tYXAoaSA9PiB7XG4gICAgaWYgKGkubm9kZXMpIGkubm9kZXMgPSBjbGVhblNvdXJjZShpLm5vZGVzKVxuICAgIGRlbGV0ZSBpLnNvdXJjZVxuICAgIHJldHVybiBpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG1hcmtEaXJ0eVVwKG5vZGUpIHtcbiAgbm9kZVtpc0NsZWFuXSA9IGZhbHNlXG4gIGlmIChub2RlLnByb3h5T2Yubm9kZXMpIHtcbiAgICBmb3IgKGxldCBpIG9mIG5vZGUucHJveHlPZi5ub2Rlcykge1xuICAgICAgbWFya0RpcnR5VXAoaSlcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgTm9kZSB7XG4gIGFwcGVuZCguLi5jaGlsZHJlbikge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShjaGlsZCwgdGhpcy5sYXN0KVxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2RlcykgdGhpcy5wcm94eU9mLm5vZGVzLnB1c2gobm9kZSlcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtEaXJ0eSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKSB7XG4gICAgc3VwZXIuY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKVxuICAgIGlmICh0aGlzLm5vZGVzKSB7XG4gICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMubm9kZXMpIG5vZGUuY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKVxuICAgIH1cbiAgfVxuXG4gIGVhY2goY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMucHJveHlPZi5ub2RlcykgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGxldCBpdGVyYXRvciA9IHRoaXMuZ2V0SXRlcmF0b3IoKVxuXG4gICAgbGV0IGluZGV4LCByZXN1bHRcbiAgICB3aGlsZSAodGhpcy5pbmRleGVzW2l0ZXJhdG9yXSA8IHRoaXMucHJveHlPZi5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2l0ZXJhdG9yXVxuICAgICAgcmVzdWx0ID0gY2FsbGJhY2sodGhpcy5wcm94eU9mLm5vZGVzW2luZGV4XSwgaW5kZXgpXG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkgYnJlYWtcblxuICAgICAgdGhpcy5pbmRleGVzW2l0ZXJhdG9yXSArPSAxXG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMuaW5kZXhlc1tpdGVyYXRvcl1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBldmVyeShjb25kaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5ldmVyeShjb25kaXRpb24pXG4gIH1cblxuICBnZXRJdGVyYXRvcigpIHtcbiAgICBpZiAoIXRoaXMubGFzdEVhY2gpIHRoaXMubGFzdEVhY2ggPSAwXG4gICAgaWYgKCF0aGlzLmluZGV4ZXMpIHRoaXMuaW5kZXhlcyA9IHt9XG5cbiAgICB0aGlzLmxhc3RFYWNoICs9IDFcbiAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLmxhc3RFYWNoXG4gICAgdGhpcy5pbmRleGVzW2l0ZXJhdG9yXSA9IDBcblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZ2V0UHJveHlQcm9jZXNzb3IoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldChub2RlLCBwcm9wKSB7XG4gICAgICAgIGlmIChwcm9wID09PSAncHJveHlPZicpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9IGVsc2UgaWYgKCFub2RlW3Byb3BdKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVbcHJvcF1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBwcm9wID09PSAnZWFjaCcgfHxcbiAgICAgICAgICAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnICYmIHByb3Auc3RhcnRzV2l0aCgnd2FsaycpKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBub2RlW3Byb3BdKFxuICAgICAgICAgICAgICAuLi5hcmdzLm1hcChpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoY2hpbGQsIGluZGV4KSA9PiBpKGNoaWxkLnRvUHJveHkoKSwgaW5kZXgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSAnZXZlcnknIHx8IHByb3AgPT09ICdzb21lJykge1xuICAgICAgICAgIHJldHVybiBjYiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZVtwcm9wXSgoY2hpbGQsIC4uLm90aGVyKSA9PlxuICAgICAgICAgICAgICBjYihjaGlsZC50b1Byb3h5KCksIC4uLm90aGVyKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSAncm9vdCcpIHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4gbm9kZS5yb290KCkudG9Qcm94eSgpXG4gICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gJ25vZGVzJykge1xuICAgICAgICAgIHJldHVybiBub2RlLm5vZGVzLm1hcChpID0+IGkudG9Qcm94eSgpKVxuICAgICAgICB9IGVsc2UgaWYgKHByb3AgPT09ICdmaXJzdCcgfHwgcHJvcCA9PT0gJ2xhc3QnKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVbcHJvcF0udG9Qcm94eSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVbcHJvcF1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgc2V0KG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIGlmIChub2RlW3Byb3BdID09PSB2YWx1ZSkgcmV0dXJuIHRydWVcbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlXG4gICAgICAgIGlmIChwcm9wID09PSAnbmFtZScgfHwgcHJvcCA9PT0gJ3BhcmFtcycgfHwgcHJvcCA9PT0gJ3NlbGVjdG9yJykge1xuICAgICAgICAgIG5vZGUubWFya0RpcnR5KClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluZGV4KGNoaWxkKSB7XG4gICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ251bWJlcicpIHJldHVybiBjaGlsZFxuICAgIGlmIChjaGlsZC5wcm94eU9mKSBjaGlsZCA9IGNoaWxkLnByb3h5T2ZcbiAgICByZXR1cm4gdGhpcy5wcm94eU9mLm5vZGVzLmluZGV4T2YoY2hpbGQpXG4gIH1cblxuICBpbnNlcnRBZnRlcihleGlzdCwgYWRkKSB7XG4gICAgbGV0IGV4aXN0SW5kZXggPSB0aGlzLmluZGV4KGV4aXN0KVxuICAgIGxldCBub2RlcyA9IHRoaXMubm9ybWFsaXplKGFkZCwgdGhpcy5wcm94eU9mLm5vZGVzW2V4aXN0SW5kZXhdKS5yZXZlcnNlKClcbiAgICBleGlzdEluZGV4ID0gdGhpcy5pbmRleChleGlzdClcbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLnByb3h5T2Yubm9kZXMuc3BsaWNlKGV4aXN0SW5kZXggKyAxLCAwLCBub2RlKVxuXG4gICAgbGV0IGluZGV4XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF1cbiAgICAgIGlmIChleGlzdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4ICsgbm9kZXMubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRGlydHkoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGluc2VydEJlZm9yZShleGlzdCwgYWRkKSB7XG4gICAgbGV0IGV4aXN0SW5kZXggPSB0aGlzLmluZGV4KGV4aXN0KVxuICAgIGxldCB0eXBlID0gZXhpc3RJbmRleCA9PT0gMCA/ICdwcmVwZW5kJyA6IGZhbHNlXG4gICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoYWRkLCB0aGlzLnByb3h5T2Yubm9kZXNbZXhpc3RJbmRleF0sIHR5cGUpLnJldmVyc2UoKVxuICAgIGV4aXN0SW5kZXggPSB0aGlzLmluZGV4KGV4aXN0KVxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHRoaXMucHJveHlPZi5ub2Rlcy5zcGxpY2UoZXhpc3RJbmRleCwgMCwgbm9kZSlcblxuICAgIGxldCBpbmRleFxuICAgIGZvciAobGV0IGlkIGluIHRoaXMuaW5kZXhlcykge1xuICAgICAgaW5kZXggPSB0aGlzLmluZGV4ZXNbaWRdXG4gICAgICBpZiAoZXhpc3RJbmRleCA8PSBpbmRleCkge1xuICAgICAgICB0aGlzLmluZGV4ZXNbaWRdID0gaW5kZXggKyBub2Rlcy5sZW5ndGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1hcmtEaXJ0eSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgbm9ybWFsaXplKG5vZGVzLCBzYW1wbGUpIHtcbiAgICBpZiAodHlwZW9mIG5vZGVzID09PSAnc3RyaW5nJykge1xuICAgICAgbm9kZXMgPSBjbGVhblNvdXJjZShwYXJzZShub2Rlcykubm9kZXMpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKVxuICAgICAgZm9yIChsZXQgaSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoaS5wYXJlbnQpIGkucGFyZW50LnJlbW92ZUNoaWxkKGksICdpZ25vcmUnKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZXMudHlwZSA9PT0gJ3Jvb3QnICYmIHRoaXMudHlwZSAhPT0gJ2RvY3VtZW50Jykge1xuICAgICAgbm9kZXMgPSBub2Rlcy5ub2Rlcy5zbGljZSgwKVxuICAgICAgZm9yIChsZXQgaSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoaS5wYXJlbnQpIGkucGFyZW50LnJlbW92ZUNoaWxkKGksICdpZ25vcmUnKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZXMudHlwZSkge1xuICAgICAgbm9kZXMgPSBbbm9kZXNdXG4gICAgfSBlbHNlIGlmIChub2Rlcy5wcm9wKSB7XG4gICAgICBpZiAodHlwZW9mIG5vZGVzLnZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIGZpZWxkIGlzIG1pc3NlZCBpbiBub2RlIGNyZWF0aW9uJylcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5vZGVzLnZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBub2Rlcy52YWx1ZSA9IFN0cmluZyhub2Rlcy52YWx1ZSlcbiAgICAgIH1cbiAgICAgIG5vZGVzID0gW25ldyBEZWNsYXJhdGlvbihub2RlcyldXG4gICAgfSBlbHNlIGlmIChub2Rlcy5zZWxlY3Rvcikge1xuICAgICAgbm9kZXMgPSBbbmV3IFJ1bGUobm9kZXMpXVxuICAgIH0gZWxzZSBpZiAobm9kZXMubmFtZSkge1xuICAgICAgbm9kZXMgPSBbbmV3IEF0UnVsZShub2RlcyldXG4gICAgfSBlbHNlIGlmIChub2Rlcy50ZXh0KSB7XG4gICAgICBub2RlcyA9IFtuZXcgQ29tbWVudChub2RlcyldXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBub2RlIHR5cGUgaW4gbm9kZSBjcmVhdGlvbicpXG4gICAgfVxuXG4gICAgbGV0IHByb2Nlc3NlZCA9IG5vZGVzLm1hcChpID0+IHtcbiAgICAgIC8qIGM4IGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoIWlbbXldKSBDb250YWluZXIucmVidWlsZChpKVxuICAgICAgaSA9IGkucHJveHlPZlxuICAgICAgaWYgKGkucGFyZW50KSBpLnBhcmVudC5yZW1vdmVDaGlsZChpKVxuICAgICAgaWYgKGlbaXNDbGVhbl0pIG1hcmtEaXJ0eVVwKGkpXG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpLnJhd3MuYmVmb3JlID0gc2FtcGxlLnJhd3MuYmVmb3JlLnJlcGxhY2UoL1xcUy9nLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaS5wYXJlbnQgPSB0aGlzLnByb3h5T2ZcbiAgICAgIHJldHVybiBpXG4gICAgfSlcblxuICAgIHJldHVybiBwcm9jZXNzZWRcbiAgfVxuXG4gIHByZXBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLnJldmVyc2UoKVxuICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShjaGlsZCwgdGhpcy5maXJzdCwgJ3ByZXBlbmQnKS5yZXZlcnNlKClcbiAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHRoaXMucHJveHlPZi5ub2Rlcy51bnNoaWZ0KG5vZGUpXG4gICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IHRoaXMuaW5kZXhlc1tpZF0gKyBub2Rlcy5sZW5ndGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1hcmtEaXJ0eSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcHVzaChjaGlsZCkge1xuICAgIGNoaWxkLnBhcmVudCA9IHRoaXNcbiAgICB0aGlzLnByb3h5T2Yubm9kZXMucHVzaChjaGlsZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlQWxsKCkge1xuICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5wcm94eU9mLm5vZGVzKSBub2RlLnBhcmVudCA9IHVuZGVmaW5lZFxuICAgIHRoaXMucHJveHlPZi5ub2RlcyA9IFtdXG5cbiAgICB0aGlzLm1hcmtEaXJ0eSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQoY2hpbGQpIHtcbiAgICBjaGlsZCA9IHRoaXMuaW5kZXgoY2hpbGQpXG4gICAgdGhpcy5wcm94eU9mLm5vZGVzW2NoaWxkXS5wYXJlbnQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnByb3h5T2Yubm9kZXMuc3BsaWNlKGNoaWxkLCAxKVxuXG4gICAgbGV0IGluZGV4XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF1cbiAgICAgIGlmIChpbmRleCA+PSBjaGlsZCkge1xuICAgICAgICB0aGlzLmluZGV4ZXNbaWRdID0gaW5kZXggLSAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRGlydHkoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlcGxhY2VWYWx1ZXMocGF0dGVybiwgb3B0cywgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHNcbiAgICAgIG9wdHMgPSB7fVxuICAgIH1cblxuICAgIHRoaXMud2Fsa0RlY2xzKGRlY2wgPT4ge1xuICAgICAgaWYgKG9wdHMucHJvcHMgJiYgIW9wdHMucHJvcHMuaW5jbHVkZXMoZGVjbC5wcm9wKSkgcmV0dXJuXG4gICAgICBpZiAob3B0cy5mYXN0ICYmICFkZWNsLnZhbHVlLmluY2x1ZGVzKG9wdHMuZmFzdCkpIHJldHVyblxuXG4gICAgICBkZWNsLnZhbHVlID0gZGVjbC52YWx1ZS5yZXBsYWNlKHBhdHRlcm4sIGNhbGxiYWNrKVxuICAgIH0pXG5cbiAgICB0aGlzLm1hcmtEaXJ0eSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc29tZShjb25kaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5zb21lKGNvbmRpdGlvbilcbiAgfVxuXG4gIHdhbGsoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgbGV0IHJlc3VsdFxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IGNoaWxkLmFkZFRvRXJyb3IoZSlcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlICYmIGNoaWxkLndhbGspIHtcbiAgICAgICAgcmVzdWx0ID0gY2hpbGQud2FsayhjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0pXG4gIH1cblxuICB3YWxrQXRSdWxlcyhuYW1lLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gbmFtZVxuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdhdHJ1bGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAobmFtZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdhdHJ1bGUnICYmIG5hbWUudGVzdChjaGlsZC5uYW1lKSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnYXRydWxlJyAmJiBjaGlsZC5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd2Fsa0NvbW1lbnRzKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB3YWxrRGVjbHMocHJvcCwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IHByb3BcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZGVjbCcpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChwcm9wIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2RlY2wnICYmIHByb3AudGVzdChjaGlsZC5wcm9wKSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZGVjbCcgJiYgY2hpbGQucHJvcCA9PT0gcHJvcCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHdhbGtSdWxlcyhzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yXG5cbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAncnVsZScpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdydWxlJyAmJiBzZWxlY3Rvci50ZXN0KGNoaWxkLnNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAncnVsZScgJiYgY2hpbGQuc2VsZWN0b3IgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZ2V0IGZpcnN0KCkge1xuICAgIGlmICghdGhpcy5wcm94eU9mLm5vZGVzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMucHJveHlPZi5ub2Rlc1swXVxuICB9XG5cbiAgZ2V0IGxhc3QoKSB7XG4gICAgaWYgKCF0aGlzLnByb3h5T2Yubm9kZXMpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5wcm94eU9mLm5vZGVzW3RoaXMucHJveHlPZi5ub2Rlcy5sZW5ndGggLSAxXVxuICB9XG59XG5cbkNvbnRhaW5lci5yZWdpc3RlclBhcnNlID0gZGVwZW5kYW50ID0+IHtcbiAgcGFyc2UgPSBkZXBlbmRhbnRcbn1cblxuQ29udGFpbmVyLnJlZ2lzdGVyUnVsZSA9IGRlcGVuZGFudCA9PiB7XG4gIFJ1bGUgPSBkZXBlbmRhbnRcbn1cblxuQ29udGFpbmVyLnJlZ2lzdGVyQXRSdWxlID0gZGVwZW5kYW50ID0+IHtcbiAgQXRSdWxlID0gZGVwZW5kYW50XG59XG5cbkNvbnRhaW5lci5yZWdpc3RlclJvb3QgPSBkZXBlbmRhbnQgPT4ge1xuICBSb290ID0gZGVwZW5kYW50XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyXG5Db250YWluZXIuZGVmYXVsdCA9IENvbnRhaW5lclxuXG4vKiBjOCBpZ25vcmUgc3RhcnQgKi9cbkNvbnRhaW5lci5yZWJ1aWxkID0gbm9kZSA9PiB7XG4gIGlmIChub2RlLnR5cGUgPT09ICdhdHJ1bGUnKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUsIEF0UnVsZS5wcm90b3R5cGUpXG4gIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAncnVsZScpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgUnVsZS5wcm90b3R5cGUpXG4gIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnZGVjbCcpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgRGVjbGFyYXRpb24ucHJvdG90eXBlKVxuICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUsIENvbW1lbnQucHJvdG90eXBlKVxuICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ3Jvb3QnKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUsIFJvb3QucHJvdG90eXBlKVxuICB9XG5cbiAgbm9kZVtteV0gPSB0cnVlXG5cbiAgaWYgKG5vZGUubm9kZXMpIHtcbiAgICBub2RlLm5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgQ29udGFpbmVyLnJlYnVpbGQoY2hpbGQpXG4gICAgfSlcbiAgfVxufVxuLyogYzggaWdub3JlIHN0b3AgKi9cbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgcGljbyA9IHJlcXVpcmUoJ3BpY29jb2xvcnMnKVxuXG5sZXQgdGVybWluYWxIaWdobGlnaHQgPSByZXF1aXJlKCcuL3Rlcm1pbmFsLWhpZ2hsaWdodCcpXG5cbmNsYXNzIENzc1N5bnRheEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIHNvdXJjZSwgZmlsZSwgcGx1Z2luKSB7XG4gICAgc3VwZXIobWVzc2FnZSlcbiAgICB0aGlzLm5hbWUgPSAnQ3NzU3ludGF4RXJyb3InXG4gICAgdGhpcy5yZWFzb24gPSBtZXNzYWdlXG5cbiAgICBpZiAoZmlsZSkge1xuICAgICAgdGhpcy5maWxlID0gZmlsZVxuICAgIH1cbiAgICBpZiAoc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICAgIH1cbiAgICBpZiAocGx1Z2luKSB7XG4gICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpblxuICAgIH1cbiAgICBpZiAodHlwZW9mIGxpbmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb2x1bW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAodHlwZW9mIGxpbmUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHRoaXMubGluZSA9IGxpbmVcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGluZSA9IGxpbmUubGluZVxuICAgICAgICB0aGlzLmNvbHVtbiA9IGxpbmUuY29sdW1uXG4gICAgICAgIHRoaXMuZW5kTGluZSA9IGNvbHVtbi5saW5lXG4gICAgICAgIHRoaXMuZW5kQ29sdW1uID0gY29sdW1uLmNvbHVtblxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0TWVzc2FnZSgpXG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIENzc1N5bnRheEVycm9yKVxuICAgIH1cbiAgfVxuXG4gIHNldE1lc3NhZ2UoKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5wbHVnaW4gPyB0aGlzLnBsdWdpbiArICc6ICcgOiAnJ1xuICAgIHRoaXMubWVzc2FnZSArPSB0aGlzLmZpbGUgPyB0aGlzLmZpbGUgOiAnPGNzcyBpbnB1dD4nXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxpbmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgKz0gJzonICsgdGhpcy5saW5lICsgJzonICsgdGhpcy5jb2x1bW5cbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlICs9ICc6ICcgKyB0aGlzLnJlYXNvblxuICB9XG5cbiAgc2hvd1NvdXJjZUNvZGUoY29sb3IpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlKSByZXR1cm4gJydcblxuICAgIGxldCBjc3MgPSB0aGlzLnNvdXJjZVxuICAgIGlmIChjb2xvciA9PSBudWxsKSBjb2xvciA9IHBpY28uaXNDb2xvclN1cHBvcnRlZFxuICAgIGlmICh0ZXJtaW5hbEhpZ2hsaWdodCkge1xuICAgICAgaWYgKGNvbG9yKSBjc3MgPSB0ZXJtaW5hbEhpZ2hsaWdodChjc3MpXG4gICAgfVxuXG4gICAgbGV0IGxpbmVzID0gY3NzLnNwbGl0KC9cXHI/XFxuLylcbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCh0aGlzLmxpbmUgLSAzLCAwKVxuICAgIGxldCBlbmQgPSBNYXRoLm1pbih0aGlzLmxpbmUgKyAyLCBsaW5lcy5sZW5ndGgpXG5cbiAgICBsZXQgbWF4V2lkdGggPSBTdHJpbmcoZW5kKS5sZW5ndGhcblxuICAgIGxldCBtYXJrLCBhc2lkZVxuICAgIGlmIChjb2xvcikge1xuICAgICAgbGV0IHsgYm9sZCwgZ3JheSwgcmVkIH0gPSBwaWNvLmNyZWF0ZUNvbG9ycyh0cnVlKVxuICAgICAgbWFyayA9IHRleHQgPT4gYm9sZChyZWQodGV4dCkpXG4gICAgICBhc2lkZSA9IHRleHQgPT4gZ3JheSh0ZXh0KVxuICAgIH0gZWxzZSB7XG4gICAgICBtYXJrID0gYXNpZGUgPSBzdHIgPT4gc3RyXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpbmVzXG4gICAgICAuc2xpY2Uoc3RhcnQsIGVuZClcbiAgICAgIC5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBudW1iZXIgPSBzdGFydCArIDEgKyBpbmRleFxuICAgICAgICBsZXQgZ3V0dGVyID0gJyAnICsgKCcgJyArIG51bWJlcikuc2xpY2UoLW1heFdpZHRoKSArICcgfCAnXG4gICAgICAgIGlmIChudW1iZXIgPT09IHRoaXMubGluZSkge1xuICAgICAgICAgIGxldCBzcGFjaW5nID1cbiAgICAgICAgICAgIGFzaWRlKGd1dHRlci5yZXBsYWNlKC9cXGQvZywgJyAnKSkgK1xuICAgICAgICAgICAgbGluZS5zbGljZSgwLCB0aGlzLmNvbHVtbiAtIDEpLnJlcGxhY2UoL1teXFx0XS9nLCAnICcpXG4gICAgICAgICAgcmV0dXJuIG1hcmsoJz4nKSArIGFzaWRlKGd1dHRlcikgKyBsaW5lICsgJ1xcbiAnICsgc3BhY2luZyArIG1hcmsoJ14nKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnICcgKyBhc2lkZShndXR0ZXIpICsgbGluZVxuICAgICAgfSlcbiAgICAgIC5qb2luKCdcXG4nKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IGNvZGUgPSB0aGlzLnNob3dTb3VyY2VDb2RlKClcbiAgICBpZiAoY29kZSkge1xuICAgICAgY29kZSA9ICdcXG5cXG4nICsgY29kZSArICdcXG4nXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnOiAnICsgdGhpcy5tZXNzYWdlICsgY29kZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ3NzU3ludGF4RXJyb3JcbkNzc1N5bnRheEVycm9yLmRlZmF1bHQgPSBDc3NTeW50YXhFcnJvclxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJylcblxuY2xhc3MgRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBpZiAoXG4gICAgICBkZWZhdWx0cyAmJlxuICAgICAgdHlwZW9mIGRlZmF1bHRzLnZhbHVlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGRlZmF1bHRzLnZhbHVlICE9PSAnc3RyaW5nJ1xuICAgICkge1xuICAgICAgZGVmYXVsdHMgPSB7IC4uLmRlZmF1bHRzLCB2YWx1ZTogU3RyaW5nKGRlZmF1bHRzLnZhbHVlKSB9XG4gICAgfVxuICAgIHN1cGVyKGRlZmF1bHRzKVxuICAgIHRoaXMudHlwZSA9ICdkZWNsJ1xuICB9XG5cbiAgZ2V0IHZhcmlhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Auc3RhcnRzV2l0aCgnLS0nKSB8fCB0aGlzLnByb3BbMF0gPT09ICckJ1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGVjbGFyYXRpb25cbkRlY2xhcmF0aW9uLmRlZmF1bHQgPSBEZWNsYXJhdGlvblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpXG5cbmxldCBMYXp5UmVzdWx0LCBQcm9jZXNzb3JcblxuY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgIC8vIHR5cGUgbmVlZHMgdG8gYmUgcGFzc2VkIHRvIHN1cGVyLCBvdGhlcndpc2UgY2hpbGQgcm9vdHMgd29uJ3QgYmUgbm9ybWFsaXplZCBjb3JyZWN0bHlcbiAgICBzdXBlcih7IHR5cGU6ICdkb2N1bWVudCcsIC4uLmRlZmF1bHRzIH0pXG5cbiAgICBpZiAoIXRoaXMubm9kZXMpIHtcbiAgICAgIHRoaXMubm9kZXMgPSBbXVxuICAgIH1cbiAgfVxuXG4gIHRvUmVzdWx0KG9wdHMgPSB7fSkge1xuICAgIGxldCBsYXp5ID0gbmV3IExhenlSZXN1bHQobmV3IFByb2Nlc3NvcigpLCB0aGlzLCBvcHRzKVxuXG4gICAgcmV0dXJuIGxhenkuc3RyaW5naWZ5KClcbiAgfVxufVxuXG5Eb2N1bWVudC5yZWdpc3RlckxhenlSZXN1bHQgPSBkZXBlbmRhbnQgPT4ge1xuICBMYXp5UmVzdWx0ID0gZGVwZW5kYW50XG59XG5cbkRvY3VtZW50LnJlZ2lzdGVyUHJvY2Vzc29yID0gZGVwZW5kYW50ID0+IHtcbiAgUHJvY2Vzc29yID0gZGVwZW5kYW50XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnRcbkRvY3VtZW50LmRlZmF1bHQgPSBEb2N1bWVudFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBEZWNsYXJhdGlvbiA9IHJlcXVpcmUoJy4vZGVjbGFyYXRpb24nKVxubGV0IFByZXZpb3VzTWFwID0gcmVxdWlyZSgnLi9wcmV2aW91cy1tYXAnKVxubGV0IENvbW1lbnQgPSByZXF1aXJlKCcuL2NvbW1lbnQnKVxubGV0IEF0UnVsZSA9IHJlcXVpcmUoJy4vYXQtcnVsZScpXG5sZXQgSW5wdXQgPSByZXF1aXJlKCcuL2lucHV0JylcbmxldCBSb290ID0gcmVxdWlyZSgnLi9yb290JylcbmxldCBSdWxlID0gcmVxdWlyZSgnLi9ydWxlJylcblxuZnVuY3Rpb24gZnJvbUpTT04oanNvbiwgaW5wdXRzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSByZXR1cm4ganNvbi5tYXAobiA9PiBmcm9tSlNPTihuKSlcblxuICBsZXQgeyBpbnB1dHM6IG93bklucHV0cywgLi4uZGVmYXVsdHMgfSA9IGpzb25cbiAgaWYgKG93bklucHV0cykge1xuICAgIGlucHV0cyA9IFtdXG4gICAgZm9yIChsZXQgaW5wdXQgb2Ygb3duSW5wdXRzKSB7XG4gICAgICBsZXQgaW5wdXRIeWRyYXRlZCA9IHsgLi4uaW5wdXQsIF9fcHJvdG9fXzogSW5wdXQucHJvdG90eXBlIH1cbiAgICAgIGlmIChpbnB1dEh5ZHJhdGVkLm1hcCkge1xuICAgICAgICBpbnB1dEh5ZHJhdGVkLm1hcCA9IHtcbiAgICAgICAgICAuLi5pbnB1dEh5ZHJhdGVkLm1hcCxcbiAgICAgICAgICBfX3Byb3RvX186IFByZXZpb3VzTWFwLnByb3RvdHlwZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpbnB1dHMucHVzaChpbnB1dEh5ZHJhdGVkKVxuICAgIH1cbiAgfVxuICBpZiAoZGVmYXVsdHMubm9kZXMpIHtcbiAgICBkZWZhdWx0cy5ub2RlcyA9IGpzb24ubm9kZXMubWFwKG4gPT4gZnJvbUpTT04obiwgaW5wdXRzKSlcbiAgfVxuICBpZiAoZGVmYXVsdHMuc291cmNlKSB7XG4gICAgbGV0IHsgaW5wdXRJZCwgLi4uc291cmNlIH0gPSBkZWZhdWx0cy5zb3VyY2VcbiAgICBkZWZhdWx0cy5zb3VyY2UgPSBzb3VyY2VcbiAgICBpZiAoaW5wdXRJZCAhPSBudWxsKSB7XG4gICAgICBkZWZhdWx0cy5zb3VyY2UuaW5wdXQgPSBpbnB1dHNbaW5wdXRJZF1cbiAgICB9XG4gIH1cbiAgaWYgKGRlZmF1bHRzLnR5cGUgPT09ICdyb290Jykge1xuICAgIHJldHVybiBuZXcgUm9vdChkZWZhdWx0cylcbiAgfSBlbHNlIGlmIChkZWZhdWx0cy50eXBlID09PSAnZGVjbCcpIHtcbiAgICByZXR1cm4gbmV3IERlY2xhcmF0aW9uKGRlZmF1bHRzKVxuICB9IGVsc2UgaWYgKGRlZmF1bHRzLnR5cGUgPT09ICdydWxlJykge1xuICAgIHJldHVybiBuZXcgUnVsZShkZWZhdWx0cylcbiAgfSBlbHNlIGlmIChkZWZhdWx0cy50eXBlID09PSAnY29tbWVudCcpIHtcbiAgICByZXR1cm4gbmV3IENvbW1lbnQoZGVmYXVsdHMpXG4gIH0gZWxzZSBpZiAoZGVmYXVsdHMudHlwZSA9PT0gJ2F0cnVsZScpIHtcbiAgICByZXR1cm4gbmV3IEF0UnVsZShkZWZhdWx0cylcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbm9kZSB0eXBlOiAnICsganNvbi50eXBlKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnJvbUpTT05cbmZyb21KU09OLmRlZmF1bHQgPSBmcm9tSlNPTlxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCB7IFNvdXJjZU1hcENvbnN1bWVyLCBTb3VyY2VNYXBHZW5lcmF0b3IgfSA9IHJlcXVpcmUoJ3NvdXJjZS1tYXAtanMnKVxubGV0IHsgZmlsZVVSTFRvUGF0aCwgcGF0aFRvRmlsZVVSTCB9ID0gcmVxdWlyZSgndXJsJylcbmxldCB7IGlzQWJzb2x1dGUsIHJlc29sdmUgfSA9IHJlcXVpcmUoJ3BhdGgnKVxubGV0IHsgbmFub2lkIH0gPSByZXF1aXJlKCduYW5vaWQvbm9uLXNlY3VyZScpXG5cbmxldCB0ZXJtaW5hbEhpZ2hsaWdodCA9IHJlcXVpcmUoJy4vdGVybWluYWwtaGlnaGxpZ2h0JylcbmxldCBDc3NTeW50YXhFcnJvciA9IHJlcXVpcmUoJy4vY3NzLXN5bnRheC1lcnJvcicpXG5sZXQgUHJldmlvdXNNYXAgPSByZXF1aXJlKCcuL3ByZXZpb3VzLW1hcCcpXG5cbmxldCBmcm9tT2Zmc2V0Q2FjaGUgPSBTeW1ib2woJ2Zyb21PZmZzZXRDYWNoZScpXG5cbmxldCBzb3VyY2VNYXBBdmFpbGFibGUgPSBCb29sZWFuKFNvdXJjZU1hcENvbnN1bWVyICYmIFNvdXJjZU1hcEdlbmVyYXRvcilcbmxldCBwYXRoQXZhaWxhYmxlID0gQm9vbGVhbihyZXNvbHZlICYmIGlzQWJzb2x1dGUpXG5cbmNsYXNzIElucHV0IHtcbiAgY29uc3RydWN0b3IoY3NzLCBvcHRzID0ge30pIHtcbiAgICBpZiAoXG4gICAgICBjc3MgPT09IG51bGwgfHxcbiAgICAgIHR5cGVvZiBjc3MgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAodHlwZW9mIGNzcyA9PT0gJ29iamVjdCcgJiYgIWNzcy50b1N0cmluZylcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdENTUyByZWNlaXZlZCAke2Nzc30gaW5zdGVhZCBvZiBDU1Mgc3RyaW5nYClcbiAgICB9XG5cbiAgICB0aGlzLmNzcyA9IGNzcy50b1N0cmluZygpXG5cbiAgICBpZiAodGhpcy5jc3NbMF0gPT09ICdcXHVGRUZGJyB8fCB0aGlzLmNzc1swXSA9PT0gJ1xcdUZGRkUnKSB7XG4gICAgICB0aGlzLmhhc0JPTSA9IHRydWVcbiAgICAgIHRoaXMuY3NzID0gdGhpcy5jc3Muc2xpY2UoMSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYXNCT00gPSBmYWxzZVxuICAgIH1cblxuICAgIGlmIChvcHRzLmZyb20pIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXBhdGhBdmFpbGFibGUgfHxcbiAgICAgICAgL15cXHcrOlxcL1xcLy8udGVzdChvcHRzLmZyb20pIHx8XG4gICAgICAgIGlzQWJzb2x1dGUob3B0cy5mcm9tKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZmlsZSA9IG9wdHMuZnJvbVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWxlID0gcmVzb2x2ZShvcHRzLmZyb20pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhdGhBdmFpbGFibGUgJiYgc291cmNlTWFwQXZhaWxhYmxlKSB7XG4gICAgICBsZXQgbWFwID0gbmV3IFByZXZpb3VzTWFwKHRoaXMuY3NzLCBvcHRzKVxuICAgICAgaWYgKG1hcC50ZXh0KSB7XG4gICAgICAgIHRoaXMubWFwID0gbWFwXG4gICAgICAgIGxldCBmaWxlID0gbWFwLmNvbnN1bWVyKCkuZmlsZVxuICAgICAgICBpZiAoIXRoaXMuZmlsZSAmJiBmaWxlKSB0aGlzLmZpbGUgPSB0aGlzLm1hcFJlc29sdmUoZmlsZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZmlsZSkge1xuICAgICAgdGhpcy5pZCA9ICc8aW5wdXQgY3NzICcgKyBuYW5vaWQoNikgKyAnPidcbiAgICB9XG4gICAgaWYgKHRoaXMubWFwKSB0aGlzLm1hcC5maWxlID0gdGhpcy5mcm9tXG4gIH1cblxuICBlcnJvcihtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIG9wdHMgPSB7fSkge1xuICAgIGxldCByZXN1bHQsIGVuZExpbmUsIGVuZENvbHVtblxuXG4gICAgaWYgKGxpbmUgJiYgdHlwZW9mIGxpbmUgPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgc3RhcnQgPSBsaW5lXG4gICAgICBsZXQgZW5kID0gY29sdW1uXG4gICAgICBpZiAodHlwZW9mIHN0YXJ0Lm9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZnJvbU9mZnNldChzdGFydC5vZmZzZXQpXG4gICAgICAgIGxpbmUgPSBwb3MubGluZVxuICAgICAgICBjb2x1bW4gPSBwb3MuY29sXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5lID0gc3RhcnQubGluZVxuICAgICAgICBjb2x1bW4gPSBzdGFydC5jb2x1bW5cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZW5kLm9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZnJvbU9mZnNldChlbmQub2Zmc2V0KVxuICAgICAgICBlbmRMaW5lID0gcG9zLmxpbmVcbiAgICAgICAgZW5kQ29sdW1uID0gcG9zLmNvbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kTGluZSA9IGVuZC5saW5lXG4gICAgICAgIGVuZENvbHVtbiA9IGVuZC5jb2x1bW5cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFjb2x1bW4pIHtcbiAgICAgIGxldCBwb3MgPSB0aGlzLmZyb21PZmZzZXQobGluZSlcbiAgICAgIGxpbmUgPSBwb3MubGluZVxuICAgICAgY29sdW1uID0gcG9zLmNvbFxuICAgIH1cblxuICAgIGxldCBvcmlnaW4gPSB0aGlzLm9yaWdpbihsaW5lLCBjb2x1bW4sIGVuZExpbmUsIGVuZENvbHVtbilcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICByZXN1bHQgPSBuZXcgQ3NzU3ludGF4RXJyb3IoXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIG9yaWdpbi5lbmRMaW5lID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IG9yaWdpbi5saW5lXG4gICAgICAgICAgOiB7IGNvbHVtbjogb3JpZ2luLmNvbHVtbiwgbGluZTogb3JpZ2luLmxpbmUgfSxcbiAgICAgICAgb3JpZ2luLmVuZExpbmUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gb3JpZ2luLmNvbHVtblxuICAgICAgICAgIDogeyBjb2x1bW46IG9yaWdpbi5lbmRDb2x1bW4sIGxpbmU6IG9yaWdpbi5lbmRMaW5lIH0sXG4gICAgICAgIG9yaWdpbi5zb3VyY2UsXG4gICAgICAgIG9yaWdpbi5maWxlLFxuICAgICAgICBvcHRzLnBsdWdpblxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBuZXcgQ3NzU3ludGF4RXJyb3IoXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGVuZExpbmUgPT09IHVuZGVmaW5lZCA/IGxpbmUgOiB7IGNvbHVtbiwgbGluZSB9LFxuICAgICAgICBlbmRMaW5lID09PSB1bmRlZmluZWQgPyBjb2x1bW4gOiB7IGNvbHVtbjogZW5kQ29sdW1uLCBsaW5lOiBlbmRMaW5lIH0sXG4gICAgICAgIHRoaXMuY3NzLFxuICAgICAgICB0aGlzLmZpbGUsXG4gICAgICAgIG9wdHMucGx1Z2luXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzdWx0LmlucHV0ID0geyBjb2x1bW4sIGVuZENvbHVtbiwgZW5kTGluZSwgbGluZSwgc291cmNlOiB0aGlzLmNzcyB9XG4gICAgaWYgKHRoaXMuZmlsZSkge1xuICAgICAgaWYgKHBhdGhUb0ZpbGVVUkwpIHtcbiAgICAgICAgcmVzdWx0LmlucHV0LnVybCA9IHBhdGhUb0ZpbGVVUkwodGhpcy5maWxlKS50b1N0cmluZygpXG4gICAgICB9XG4gICAgICByZXN1bHQuaW5wdXQuZmlsZSA9IHRoaXMuZmlsZVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGZyb21PZmZzZXQob2Zmc2V0KSB7XG4gICAgbGV0IGxhc3RMaW5lLCBsaW5lVG9JbmRleFxuICAgIGlmICghdGhpc1tmcm9tT2Zmc2V0Q2FjaGVdKSB7XG4gICAgICBsZXQgbGluZXMgPSB0aGlzLmNzcy5zcGxpdCgnXFxuJylcbiAgICAgIGxpbmVUb0luZGV4ID0gbmV3IEFycmF5KGxpbmVzLmxlbmd0aClcbiAgICAgIGxldCBwcmV2SW5kZXggPSAwXG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxpbmVUb0luZGV4W2ldID0gcHJldkluZGV4XG4gICAgICAgIHByZXZJbmRleCArPSBsaW5lc1tpXS5sZW5ndGggKyAxXG4gICAgICB9XG5cbiAgICAgIHRoaXNbZnJvbU9mZnNldENhY2hlXSA9IGxpbmVUb0luZGV4XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmVUb0luZGV4ID0gdGhpc1tmcm9tT2Zmc2V0Q2FjaGVdXG4gICAgfVxuICAgIGxhc3RMaW5lID0gbGluZVRvSW5kZXhbbGluZVRvSW5kZXgubGVuZ3RoIC0gMV1cblxuICAgIGxldCBtaW4gPSAwXG4gICAgaWYgKG9mZnNldCA+PSBsYXN0TGluZSkge1xuICAgICAgbWluID0gbGluZVRvSW5kZXgubGVuZ3RoIC0gMVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWF4ID0gbGluZVRvSW5kZXgubGVuZ3RoIC0gMlxuICAgICAgbGV0IG1pZFxuICAgICAgd2hpbGUgKG1pbiA8IG1heCkge1xuICAgICAgICBtaWQgPSBtaW4gKyAoKG1heCAtIG1pbikgPj4gMSlcbiAgICAgICAgaWYgKG9mZnNldCA8IGxpbmVUb0luZGV4W21pZF0pIHtcbiAgICAgICAgICBtYXggPSBtaWQgLSAxXG4gICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0ID49IGxpbmVUb0luZGV4W21pZCArIDFdKSB7XG4gICAgICAgICAgbWluID0gbWlkICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1pbiA9IG1pZFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbDogb2Zmc2V0IC0gbGluZVRvSW5kZXhbbWluXSArIDEsXG4gICAgICBsaW5lOiBtaW4gKyAxXG4gICAgfVxuICB9XG5cbiAgbWFwUmVzb2x2ZShmaWxlKSB7XG4gICAgaWYgKC9eXFx3KzpcXC9cXC8vLnRlc3QoZmlsZSkpIHtcbiAgICAgIHJldHVybiBmaWxlXG4gICAgfVxuICAgIHJldHVybiByZXNvbHZlKHRoaXMubWFwLmNvbnN1bWVyKCkuc291cmNlUm9vdCB8fCB0aGlzLm1hcC5yb290IHx8ICcuJywgZmlsZSlcbiAgfVxuXG4gIG9yaWdpbihsaW5lLCBjb2x1bW4sIGVuZExpbmUsIGVuZENvbHVtbikge1xuICAgIGlmICghdGhpcy5tYXApIHJldHVybiBmYWxzZVxuICAgIGxldCBjb25zdW1lciA9IHRoaXMubWFwLmNvbnN1bWVyKClcblxuICAgIGxldCBmcm9tID0gY29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7IGNvbHVtbiwgbGluZSB9KVxuICAgIGlmICghZnJvbS5zb3VyY2UpIHJldHVybiBmYWxzZVxuXG4gICAgbGV0IHRvXG4gICAgaWYgKHR5cGVvZiBlbmRMaW5lID09PSAnbnVtYmVyJykge1xuICAgICAgdG8gPSBjb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHsgY29sdW1uOiBlbmRDb2x1bW4sIGxpbmU6IGVuZExpbmUgfSlcbiAgICB9XG5cbiAgICBsZXQgZnJvbVVybFxuXG4gICAgaWYgKGlzQWJzb2x1dGUoZnJvbS5zb3VyY2UpKSB7XG4gICAgICBmcm9tVXJsID0gcGF0aFRvRmlsZVVSTChmcm9tLnNvdXJjZSlcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbVVybCA9IG5ldyBVUkwoXG4gICAgICAgIGZyb20uc291cmNlLFxuICAgICAgICB0aGlzLm1hcC5jb25zdW1lcigpLnNvdXJjZVJvb3QgfHwgcGF0aFRvRmlsZVVSTCh0aGlzLm1hcC5tYXBGaWxlKVxuICAgICAgKVxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB7XG4gICAgICBjb2x1bW46IGZyb20uY29sdW1uLFxuICAgICAgZW5kQ29sdW1uOiB0byAmJiB0by5jb2x1bW4sXG4gICAgICBlbmRMaW5lOiB0byAmJiB0by5saW5lLFxuICAgICAgbGluZTogZnJvbS5saW5lLFxuICAgICAgdXJsOiBmcm9tVXJsLnRvU3RyaW5nKClcbiAgICB9XG5cbiAgICBpZiAoZnJvbVVybC5wcm90b2NvbCA9PT0gJ2ZpbGU6Jykge1xuICAgICAgaWYgKGZpbGVVUkxUb1BhdGgpIHtcbiAgICAgICAgcmVzdWx0LmZpbGUgPSBmaWxlVVJMVG9QYXRoKGZyb21VcmwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBjOCBpZ25vcmUgbmV4dCAyICovXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgZmlsZTogcHJvdG9jb2wgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIFBvc3RDU1MgYnVpbGRgKVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzb3VyY2UgPSBjb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKGZyb20uc291cmNlKVxuICAgIGlmIChzb3VyY2UpIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2VcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBsZXQganNvbiA9IHt9XG4gICAgZm9yIChsZXQgbmFtZSBvZiBbJ2hhc0JPTScsICdjc3MnLCAnZmlsZScsICdpZCddKSB7XG4gICAgICBpZiAodGhpc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIGpzb25bbmFtZV0gPSB0aGlzW25hbWVdXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAganNvbi5tYXAgPSB7IC4uLnRoaXMubWFwIH1cbiAgICAgIGlmIChqc29uLm1hcC5jb25zdW1lckNhY2hlKSB7XG4gICAgICAgIGpzb24ubWFwLmNvbnN1bWVyQ2FjaGUgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGpzb25cbiAgfVxuXG4gIGdldCBmcm9tKCkge1xuICAgIHJldHVybiB0aGlzLmZpbGUgfHwgdGhpcy5pZFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRcbklucHV0LmRlZmF1bHQgPSBJbnB1dFxuXG5pZiAodGVybWluYWxIaWdobGlnaHQgJiYgdGVybWluYWxIaWdobGlnaHQucmVnaXN0ZXJJbnB1dCkge1xuICB0ZXJtaW5hbEhpZ2hsaWdodC5yZWdpc3RlcklucHV0KElucHV0KVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCB7IGlzQ2xlYW4sIG15IH0gPSByZXF1aXJlKCcuL3N5bWJvbHMnKVxubGV0IE1hcEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vbWFwLWdlbmVyYXRvcicpXG5sZXQgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKVxubGV0IENvbnRhaW5lciA9IHJlcXVpcmUoJy4vY29udGFpbmVyJylcbmxldCBEb2N1bWVudCA9IHJlcXVpcmUoJy4vZG9jdW1lbnQnKVxubGV0IHdhcm5PbmNlID0gcmVxdWlyZSgnLi93YXJuLW9uY2UnKVxubGV0IFJlc3VsdCA9IHJlcXVpcmUoJy4vcmVzdWx0JylcbmxldCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxubGV0IFJvb3QgPSByZXF1aXJlKCcuL3Jvb3QnKVxuXG5jb25zdCBUWVBFX1RPX0NMQVNTX05BTUUgPSB7XG4gIGF0cnVsZTogJ0F0UnVsZScsXG4gIGNvbW1lbnQ6ICdDb21tZW50JyxcbiAgZGVjbDogJ0RlY2xhcmF0aW9uJyxcbiAgZG9jdW1lbnQ6ICdEb2N1bWVudCcsXG4gIHJvb3Q6ICdSb290JyxcbiAgcnVsZTogJ1J1bGUnXG59XG5cbmNvbnN0IFBMVUdJTl9QUk9QUyA9IHtcbiAgQXRSdWxlOiB0cnVlLFxuICBBdFJ1bGVFeGl0OiB0cnVlLFxuICBDb21tZW50OiB0cnVlLFxuICBDb21tZW50RXhpdDogdHJ1ZSxcbiAgRGVjbGFyYXRpb246IHRydWUsXG4gIERlY2xhcmF0aW9uRXhpdDogdHJ1ZSxcbiAgRG9jdW1lbnQ6IHRydWUsXG4gIERvY3VtZW50RXhpdDogdHJ1ZSxcbiAgT25jZTogdHJ1ZSxcbiAgT25jZUV4aXQ6IHRydWUsXG4gIHBvc3Rjc3NQbHVnaW46IHRydWUsXG4gIHByZXBhcmU6IHRydWUsXG4gIFJvb3Q6IHRydWUsXG4gIFJvb3RFeGl0OiB0cnVlLFxuICBSdWxlOiB0cnVlLFxuICBSdWxlRXhpdDogdHJ1ZVxufVxuXG5jb25zdCBOT1RfVklTSVRPUlMgPSB7XG4gIE9uY2U6IHRydWUsXG4gIHBvc3Rjc3NQbHVnaW46IHRydWUsXG4gIHByZXBhcmU6IHRydWVcbn1cblxuY29uc3QgQ0hJTERSRU4gPSAwXG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5mdW5jdGlvbiBnZXRFdmVudHMobm9kZSkge1xuICBsZXQga2V5ID0gZmFsc2VcbiAgbGV0IHR5cGUgPSBUWVBFX1RPX0NMQVNTX05BTUVbbm9kZS50eXBlXVxuICBpZiAobm9kZS50eXBlID09PSAnZGVjbCcpIHtcbiAgICBrZXkgPSBub2RlLnByb3AudG9Mb3dlckNhc2UoKVxuICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2F0cnVsZScpIHtcbiAgICBrZXkgPSBub2RlLm5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgaWYgKGtleSAmJiBub2RlLmFwcGVuZCkge1xuICAgIHJldHVybiBbXG4gICAgICB0eXBlLFxuICAgICAgdHlwZSArICctJyArIGtleSxcbiAgICAgIENISUxEUkVOLFxuICAgICAgdHlwZSArICdFeGl0JyxcbiAgICAgIHR5cGUgKyAnRXhpdC0nICsga2V5XG4gICAgXVxuICB9IGVsc2UgaWYgKGtleSkge1xuICAgIHJldHVybiBbdHlwZSwgdHlwZSArICctJyArIGtleSwgdHlwZSArICdFeGl0JywgdHlwZSArICdFeGl0LScgKyBrZXldXG4gIH0gZWxzZSBpZiAobm9kZS5hcHBlbmQpIHtcbiAgICByZXR1cm4gW3R5cGUsIENISUxEUkVOLCB0eXBlICsgJ0V4aXQnXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBbdHlwZSwgdHlwZSArICdFeGl0J11cbiAgfVxufVxuXG5mdW5jdGlvbiB0b1N0YWNrKG5vZGUpIHtcbiAgbGV0IGV2ZW50c1xuICBpZiAobm9kZS50eXBlID09PSAnZG9jdW1lbnQnKSB7XG4gICAgZXZlbnRzID0gWydEb2N1bWVudCcsIENISUxEUkVOLCAnRG9jdW1lbnRFeGl0J11cbiAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdyb290Jykge1xuICAgIGV2ZW50cyA9IFsnUm9vdCcsIENISUxEUkVOLCAnUm9vdEV4aXQnXVxuICB9IGVsc2Uge1xuICAgIGV2ZW50cyA9IGdldEV2ZW50cyhub2RlKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBldmVudEluZGV4OiAwLFxuICAgIGV2ZW50cyxcbiAgICBpdGVyYXRvcjogMCxcbiAgICBub2RlLFxuICAgIHZpc2l0b3JJbmRleDogMCxcbiAgICB2aXNpdG9yczogW11cbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhbk1hcmtzKG5vZGUpIHtcbiAgbm9kZVtpc0NsZWFuXSA9IGZhbHNlXG4gIGlmIChub2RlLm5vZGVzKSBub2RlLm5vZGVzLmZvckVhY2goaSA9PiBjbGVhbk1hcmtzKGkpKVxuICByZXR1cm4gbm9kZVxufVxuXG5sZXQgcG9zdGNzcyA9IHt9XG5cbmNsYXNzIExhenlSZXN1bHQge1xuICBjb25zdHJ1Y3Rvcihwcm9jZXNzb3IsIGNzcywgb3B0cykge1xuICAgIHRoaXMuc3RyaW5naWZpZWQgPSBmYWxzZVxuICAgIHRoaXMucHJvY2Vzc2VkID0gZmFsc2VcblxuICAgIGxldCByb290XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIGNzcyA9PT0gJ29iamVjdCcgJiZcbiAgICAgIGNzcyAhPT0gbnVsbCAmJlxuICAgICAgKGNzcy50eXBlID09PSAncm9vdCcgfHwgY3NzLnR5cGUgPT09ICdkb2N1bWVudCcpXG4gICAgKSB7XG4gICAgICByb290ID0gY2xlYW5NYXJrcyhjc3MpXG4gICAgfSBlbHNlIGlmIChjc3MgaW5zdGFuY2VvZiBMYXp5UmVzdWx0IHx8IGNzcyBpbnN0YW5jZW9mIFJlc3VsdCkge1xuICAgICAgcm9vdCA9IGNsZWFuTWFya3MoY3NzLnJvb3QpXG4gICAgICBpZiAoY3NzLm1hcCkge1xuICAgICAgICBpZiAodHlwZW9mIG9wdHMubWFwID09PSAndW5kZWZpbmVkJykgb3B0cy5tYXAgPSB7fVxuICAgICAgICBpZiAoIW9wdHMubWFwLmlubGluZSkgb3B0cy5tYXAuaW5saW5lID0gZmFsc2VcbiAgICAgICAgb3B0cy5tYXAucHJldiA9IGNzcy5tYXBcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBhcnNlciA9IHBhcnNlXG4gICAgICBpZiAob3B0cy5zeW50YXgpIHBhcnNlciA9IG9wdHMuc3ludGF4LnBhcnNlXG4gICAgICBpZiAob3B0cy5wYXJzZXIpIHBhcnNlciA9IG9wdHMucGFyc2VyXG4gICAgICBpZiAocGFyc2VyLnBhcnNlKSBwYXJzZXIgPSBwYXJzZXIucGFyc2VcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcm9vdCA9IHBhcnNlcihjc3MsIG9wdHMpXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yXG4gICAgICB9XG5cbiAgICAgIGlmIChyb290ICYmICFyb290W215XSkge1xuICAgICAgICAvKiBjOCBpZ25vcmUgbmV4dCAyICovXG4gICAgICAgIENvbnRhaW5lci5yZWJ1aWxkKHJvb3QpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZXN1bHQgPSBuZXcgUmVzdWx0KHByb2Nlc3Nvciwgcm9vdCwgb3B0cylcbiAgICB0aGlzLmhlbHBlcnMgPSB7IC4uLnBvc3Rjc3MsIHBvc3Rjc3MsIHJlc3VsdDogdGhpcy5yZXN1bHQgfVxuICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucHJvY2Vzc29yLnBsdWdpbnMubWFwKHBsdWdpbiA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ29iamVjdCcgJiYgcGx1Z2luLnByZXBhcmUpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ucGx1Z2luLCAuLi5wbHVnaW4ucHJlcGFyZSh0aGlzLnJlc3VsdCkgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpblxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhc3luYygpIHtcbiAgICBpZiAodGhpcy5lcnJvcikgcmV0dXJuIFByb21pc2UucmVqZWN0KHRoaXMuZXJyb3IpXG4gICAgaWYgKHRoaXMucHJvY2Vzc2VkKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucmVzdWx0KVxuICAgIGlmICghdGhpcy5wcm9jZXNzaW5nKSB7XG4gICAgICB0aGlzLnByb2Nlc3NpbmcgPSB0aGlzLnJ1bkFzeW5jKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc2luZ1xuICB9XG5cbiAgY2F0Y2gob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkuY2F0Y2gob25SZWplY3RlZClcbiAgfVxuXG4gIGZpbmFsbHkob25GaW5hbGx5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRmluYWxseSwgb25GaW5hbGx5KVxuICB9XG5cbiAgZ2V0QXN5bmNFcnJvcigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZSBwcm9jZXNzKGNzcykudGhlbihjYikgdG8gd29yayB3aXRoIGFzeW5jIHBsdWdpbnMnKVxuICB9XG5cbiAgaGFuZGxlRXJyb3IoZXJyb3IsIG5vZGUpIHtcbiAgICBsZXQgcGx1Z2luID0gdGhpcy5yZXN1bHQubGFzdFBsdWdpblxuICAgIHRyeSB7XG4gICAgICBpZiAobm9kZSkgbm9kZS5hZGRUb0Vycm9yKGVycm9yKVxuICAgICAgdGhpcy5lcnJvciA9IGVycm9yXG4gICAgICBpZiAoZXJyb3IubmFtZSA9PT0gJ0Nzc1N5bnRheEVycm9yJyAmJiAhZXJyb3IucGx1Z2luKSB7XG4gICAgICAgIGVycm9yLnBsdWdpbiA9IHBsdWdpbi5wb3N0Y3NzUGx1Z2luXG4gICAgICAgIGVycm9yLnNldE1lc3NhZ2UoKVxuICAgICAgfSBlbHNlIGlmIChwbHVnaW4ucG9zdGNzc1ZlcnNpb24pIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBsZXQgcGx1Z2luTmFtZSA9IHBsdWdpbi5wb3N0Y3NzUGx1Z2luXG4gICAgICAgICAgbGV0IHBsdWdpblZlciA9IHBsdWdpbi5wb3N0Y3NzVmVyc2lvblxuICAgICAgICAgIGxldCBydW50aW1lVmVyID0gdGhpcy5yZXN1bHQucHJvY2Vzc29yLnZlcnNpb25cbiAgICAgICAgICBsZXQgYSA9IHBsdWdpblZlci5zcGxpdCgnLicpXG4gICAgICAgICAgbGV0IGIgPSBydW50aW1lVmVyLnNwbGl0KCcuJylcblxuICAgICAgICAgIGlmIChhWzBdICE9PSBiWzBdIHx8IHBhcnNlSW50KGFbMV0pID4gcGFyc2VJbnQoYlsxXSkpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAnVW5rbm93biBlcnJvciBmcm9tIFBvc3RDU1MgcGx1Z2luLiBZb3VyIGN1cnJlbnQgUG9zdENTUyAnICtcbiAgICAgICAgICAgICAgICAndmVyc2lvbiBpcyAnICtcbiAgICAgICAgICAgICAgICBydW50aW1lVmVyICtcbiAgICAgICAgICAgICAgICAnLCBidXQgJyArXG4gICAgICAgICAgICAgICAgcGx1Z2luTmFtZSArXG4gICAgICAgICAgICAgICAgJyB1c2VzICcgK1xuICAgICAgICAgICAgICAgIHBsdWdpblZlciArXG4gICAgICAgICAgICAgICAgJy4gUGVyaGFwcyB0aGlzIGlzIHRoZSBzb3VyY2Ugb2YgdGhlIGVycm9yIGJlbG93LidcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDMgKi9cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSBjb25zb2xlLmVycm9yKGVycilcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yXG4gIH1cblxuICBwcmVwYXJlVmlzaXRvcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuICAgIGxldCBhZGQgPSAocGx1Z2luLCB0eXBlLCBjYikgPT4ge1xuICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1t0eXBlXSkgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXVxuICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChbcGx1Z2luLCBjYl0pXG4gICAgfVxuICAgIGZvciAobGV0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgIGlmICh0eXBlb2YgcGx1Z2luID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKGxldCBldmVudCBpbiBwbHVnaW4pIHtcbiAgICAgICAgICBpZiAoIVBMVUdJTl9QUk9QU1tldmVudF0gJiYgL15bQS1aXS8udGVzdChldmVudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYFVua25vd24gZXZlbnQgJHtldmVudH0gaW4gJHtwbHVnaW4ucG9zdGNzc1BsdWdpbn0uIGAgK1xuICAgICAgICAgICAgICAgIGBUcnkgdG8gdXBkYXRlIFBvc3RDU1MgKCR7dGhpcy5wcm9jZXNzb3IudmVyc2lvbn0gbm93KS5gXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghTk9UX1ZJU0lUT1JTW2V2ZW50XSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW5bZXZlbnRdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBmb3IgKGxldCBmaWx0ZXIgaW4gcGx1Z2luW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09ICcqJykge1xuICAgICAgICAgICAgICAgICAgYWRkKHBsdWdpbiwgZXZlbnQsIHBsdWdpbltldmVudF1bZmlsdGVyXSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYWRkKFxuICAgICAgICAgICAgICAgICAgICBwbHVnaW4sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ICsgJy0nICsgZmlsdGVyLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbltldmVudF1bZmlsdGVyXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luW2V2ZW50XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBhZGQocGx1Z2luLCBldmVudCwgcGx1Z2luW2V2ZW50XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5oYXNMaXN0ZW5lciA9IE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5sZW5ndGggPiAwXG4gIH1cblxuICBhc3luYyBydW5Bc3luYygpIHtcbiAgICB0aGlzLnBsdWdpbiA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBsdWdpbiA9IHRoaXMucGx1Z2luc1tpXVxuICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnJ1bk9uUm9vdChwbHVnaW4pXG4gICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgcHJvbWlzZVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByZXBhcmVWaXNpdG9ycygpXG4gICAgaWYgKHRoaXMuaGFzTGlzdGVuZXIpIHtcbiAgICAgIGxldCByb290ID0gdGhpcy5yZXN1bHQucm9vdFxuICAgICAgd2hpbGUgKCFyb290W2lzQ2xlYW5dKSB7XG4gICAgICAgIHJvb3RbaXNDbGVhbl0gPSB0cnVlXG4gICAgICAgIGxldCBzdGFjayA9IFt0b1N0YWNrKHJvb3QpXVxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxldCBwcm9taXNlID0gdGhpcy52aXNpdFRpY2soc3RhY2spXG4gICAgICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgcHJvbWlzZVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBsZXQgbm9kZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLm5vZGVcbiAgICAgICAgICAgICAgdGhyb3cgdGhpcy5oYW5kbGVFcnJvcihlLCBub2RlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5saXN0ZW5lcnMuT25jZUV4aXQpIHtcbiAgICAgICAgZm9yIChsZXQgW3BsdWdpbiwgdmlzaXRvcl0gb2YgdGhpcy5saXN0ZW5lcnMuT25jZUV4aXQpIHtcbiAgICAgICAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyb290LnR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgICAgICAgbGV0IHJvb3RzID0gcm9vdC5ub2Rlcy5tYXAoc3ViUm9vdCA9PlxuICAgICAgICAgICAgICAgIHZpc2l0b3Ioc3ViUm9vdCwgdGhpcy5oZWxwZXJzKVxuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocm9vdHMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhd2FpdCB2aXNpdG9yKHJvb3QsIHRoaXMuaGVscGVycylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KClcbiAgfVxuXG4gIHJ1bk9uUm9vdChwbHVnaW4pIHtcbiAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luXG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2YgcGx1Z2luID09PSAnb2JqZWN0JyAmJiBwbHVnaW4uT25jZSkge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHQucm9vdC50eXBlID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgICAgbGV0IHJvb3RzID0gdGhpcy5yZXN1bHQucm9vdC5ub2Rlcy5tYXAocm9vdCA9PlxuICAgICAgICAgICAgcGx1Z2luLk9uY2Uocm9vdCwgdGhpcy5oZWxwZXJzKVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChpc1Byb21pc2Uocm9vdHNbMF0pKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocm9vdHMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJvb3RzXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGx1Z2luLk9uY2UodGhpcy5yZXN1bHQucm9vdCwgdGhpcy5oZWxwZXJzKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4odGhpcy5yZXN1bHQucm9vdCwgdGhpcy5yZXN1bHQpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpXG4gICAgfVxuICB9XG5cbiAgc3RyaW5naWZ5KCkge1xuICAgIGlmICh0aGlzLmVycm9yKSB0aHJvdyB0aGlzLmVycm9yXG4gICAgaWYgKHRoaXMuc3RyaW5naWZpZWQpIHJldHVybiB0aGlzLnJlc3VsdFxuICAgIHRoaXMuc3RyaW5naWZpZWQgPSB0cnVlXG5cbiAgICB0aGlzLnN5bmMoKVxuXG4gICAgbGV0IG9wdHMgPSB0aGlzLnJlc3VsdC5vcHRzXG4gICAgbGV0IHN0ciA9IHN0cmluZ2lmeVxuICAgIGlmIChvcHRzLnN5bnRheCkgc3RyID0gb3B0cy5zeW50YXguc3RyaW5naWZ5XG4gICAgaWYgKG9wdHMuc3RyaW5naWZpZXIpIHN0ciA9IG9wdHMuc3RyaW5naWZpZXJcbiAgICBpZiAoc3RyLnN0cmluZ2lmeSkgc3RyID0gc3RyLnN0cmluZ2lmeVxuXG4gICAgbGV0IG1hcCA9IG5ldyBNYXBHZW5lcmF0b3Ioc3RyLCB0aGlzLnJlc3VsdC5yb290LCB0aGlzLnJlc3VsdC5vcHRzKVxuICAgIGxldCBkYXRhID0gbWFwLmdlbmVyYXRlKClcbiAgICB0aGlzLnJlc3VsdC5jc3MgPSBkYXRhWzBdXG4gICAgdGhpcy5yZXN1bHQubWFwID0gZGF0YVsxXVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0XG4gIH1cblxuICBzeW5jKCkge1xuICAgIGlmICh0aGlzLmVycm9yKSB0aHJvdyB0aGlzLmVycm9yXG4gICAgaWYgKHRoaXMucHJvY2Vzc2VkKSByZXR1cm4gdGhpcy5yZXN1bHRcbiAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcblxuICAgIGlmICh0aGlzLnByb2Nlc3NpbmcpIHtcbiAgICAgIHRocm93IHRoaXMuZ2V0QXN5bmNFcnJvcigpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnJ1bk9uUm9vdChwbHVnaW4pXG4gICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIHRocm93IHRoaXMuZ2V0QXN5bmNFcnJvcigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcmVwYXJlVmlzaXRvcnMoKVxuICAgIGlmICh0aGlzLmhhc0xpc3RlbmVyKSB7XG4gICAgICBsZXQgcm9vdCA9IHRoaXMucmVzdWx0LnJvb3RcbiAgICAgIHdoaWxlICghcm9vdFtpc0NsZWFuXSkge1xuICAgICAgICByb290W2lzQ2xlYW5dID0gdHJ1ZVxuICAgICAgICB0aGlzLndhbGtTeW5jKHJvb3QpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5saXN0ZW5lcnMuT25jZUV4aXQpIHtcbiAgICAgICAgaWYgKHJvb3QudHlwZSA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICAgIGZvciAobGV0IHN1YlJvb3Qgb2Ygcm9vdC5ub2Rlcykge1xuICAgICAgICAgICAgdGhpcy52aXNpdFN5bmModGhpcy5saXN0ZW5lcnMuT25jZUV4aXQsIHN1YlJvb3QpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmlzaXRTeW5jKHRoaXMubGlzdGVuZXJzLk9uY2VFeGl0LCByb290KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0XG4gIH1cblxuICB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICghKCdmcm9tJyBpbiB0aGlzLm9wdHMpKSB7XG4gICAgICAgIHdhcm5PbmNlKFxuICAgICAgICAgICdXaXRob3V0IGBmcm9tYCBvcHRpb24gUG9zdENTUyBjb3VsZCBnZW5lcmF0ZSB3cm9uZyBzb3VyY2UgbWFwICcgK1xuICAgICAgICAgICAgJ2FuZCB3aWxsIG5vdCBmaW5kIEJyb3dzZXJzbGlzdCBjb25maWcuIFNldCBpdCB0byBDU1MgZmlsZSBwYXRoICcgK1xuICAgICAgICAgICAgJ29yIHRvIGB1bmRlZmluZWRgIHRvIHByZXZlbnQgdGhpcyB3YXJuaW5nLidcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hc3luYygpLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jc3NcbiAgfVxuXG4gIHZpc2l0U3luYyh2aXNpdG9ycywgbm9kZSkge1xuICAgIGZvciAobGV0IFtwbHVnaW4sIHZpc2l0b3JdIG9mIHZpc2l0b3JzKSB7XG4gICAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luXG4gICAgICBsZXQgcHJvbWlzZVxuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvbWlzZSA9IHZpc2l0b3Iobm9kZSwgdGhpcy5oZWxwZXJzKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGUsIG5vZGUucHJveHlPZilcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnR5cGUgIT09ICdyb290JyAmJiBub2RlLnR5cGUgIT09ICdkb2N1bWVudCcgJiYgIW5vZGUucGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIHRocm93IHRoaXMuZ2V0QXN5bmNFcnJvcigpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmlzaXRUaWNrKHN0YWNrKSB7XG4gICAgbGV0IHZpc2l0ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV1cbiAgICBsZXQgeyBub2RlLCB2aXNpdG9ycyB9ID0gdmlzaXRcblxuICAgIGlmIChub2RlLnR5cGUgIT09ICdyb290JyAmJiBub2RlLnR5cGUgIT09ICdkb2N1bWVudCcgJiYgIW5vZGUucGFyZW50KSB7XG4gICAgICBzdGFjay5wb3AoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHZpc2l0b3JzLmxlbmd0aCA+IDAgJiYgdmlzaXQudmlzaXRvckluZGV4IDwgdmlzaXRvcnMubGVuZ3RoKSB7XG4gICAgICBsZXQgW3BsdWdpbiwgdmlzaXRvcl0gPSB2aXNpdG9yc1t2aXNpdC52aXNpdG9ySW5kZXhdXG4gICAgICB2aXNpdC52aXNpdG9ySW5kZXggKz0gMVxuICAgICAgaWYgKHZpc2l0LnZpc2l0b3JJbmRleCA9PT0gdmlzaXRvcnMubGVuZ3RoKSB7XG4gICAgICAgIHZpc2l0LnZpc2l0b3JzID0gW11cbiAgICAgICAgdmlzaXQudmlzaXRvckluZGV4ID0gMFxuICAgICAgfVxuICAgICAgdGhpcy5yZXN1bHQubGFzdFBsdWdpbiA9IHBsdWdpblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHZpc2l0b3Iobm9kZS50b1Byb3h5KCksIHRoaXMuaGVscGVycylcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5oYW5kbGVFcnJvcihlLCBub2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2aXNpdC5pdGVyYXRvciAhPT0gMCkge1xuICAgICAgbGV0IGl0ZXJhdG9yID0gdmlzaXQuaXRlcmF0b3JcbiAgICAgIGxldCBjaGlsZFxuICAgICAgd2hpbGUgKChjaGlsZCA9IG5vZGUubm9kZXNbbm9kZS5pbmRleGVzW2l0ZXJhdG9yXV0pKSB7XG4gICAgICAgIG5vZGUuaW5kZXhlc1tpdGVyYXRvcl0gKz0gMVxuICAgICAgICBpZiAoIWNoaWxkW2lzQ2xlYW5dKSB7XG4gICAgICAgICAgY2hpbGRbaXNDbGVhbl0gPSB0cnVlXG4gICAgICAgICAgc3RhY2sucHVzaCh0b1N0YWNrKGNoaWxkKSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmlzaXQuaXRlcmF0b3IgPSAwXG4gICAgICBkZWxldGUgbm9kZS5pbmRleGVzW2l0ZXJhdG9yXVxuICAgIH1cblxuICAgIGxldCBldmVudHMgPSB2aXNpdC5ldmVudHNcbiAgICB3aGlsZSAodmlzaXQuZXZlbnRJbmRleCA8IGV2ZW50cy5sZW5ndGgpIHtcbiAgICAgIGxldCBldmVudCA9IGV2ZW50c1t2aXNpdC5ldmVudEluZGV4XVxuICAgICAgdmlzaXQuZXZlbnRJbmRleCArPSAxXG4gICAgICBpZiAoZXZlbnQgPT09IENISUxEUkVOKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVzICYmIG5vZGUubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgbm9kZVtpc0NsZWFuXSA9IHRydWVcbiAgICAgICAgICB2aXNpdC5pdGVyYXRvciA9IG5vZGUuZ2V0SXRlcmF0b3IoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgdmlzaXQudmlzaXRvcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudF1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHN0YWNrLnBvcCgpXG4gIH1cblxuICB3YWxrU3luYyhub2RlKSB7XG4gICAgbm9kZVtpc0NsZWFuXSA9IHRydWVcbiAgICBsZXQgZXZlbnRzID0gZ2V0RXZlbnRzKG5vZGUpXG4gICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICBpZiAoZXZlbnQgPT09IENISUxEUkVOKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICAgICAgbm9kZS5lYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgIGlmICghY2hpbGRbaXNDbGVhbl0pIHRoaXMud2Fsa1N5bmMoY2hpbGQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHZpc2l0b3JzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdXG4gICAgICAgIGlmICh2aXNpdG9ycykge1xuICAgICAgICAgIGlmICh0aGlzLnZpc2l0U3luYyh2aXNpdG9ycywgbm9kZS50b1Byb3h5KCkpKSByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdhcm5pbmdzKCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS53YXJuaW5ncygpXG4gIH1cblxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5jb250ZW50XG4gIH1cblxuICBnZXQgY3NzKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLmNzc1xuICB9XG5cbiAgZ2V0IG1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5tYXBcbiAgfVxuXG4gIGdldCBtZXNzYWdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zeW5jKCkubWVzc2FnZXNcbiAgfVxuXG4gIGdldCBvcHRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5vcHRzXG4gIH1cblxuICBnZXQgcHJvY2Vzc29yKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5wcm9jZXNzb3JcbiAgfVxuXG4gIGdldCByb290KCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS5yb290XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdMYXp5UmVzdWx0J1xuICB9XG59XG5cbkxhenlSZXN1bHQucmVnaXN0ZXJQb3N0Y3NzID0gZGVwZW5kYW50ID0+IHtcbiAgcG9zdGNzcyA9IGRlcGVuZGFudFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExhenlSZXN1bHRcbkxhenlSZXN1bHQuZGVmYXVsdCA9IExhenlSZXN1bHRcblxuUm9vdC5yZWdpc3RlckxhenlSZXN1bHQoTGF6eVJlc3VsdClcbkRvY3VtZW50LnJlZ2lzdGVyTGF6eVJlc3VsdChMYXp5UmVzdWx0KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBsaXN0ID0ge1xuICBjb21tYShzdHJpbmcpIHtcbiAgICByZXR1cm4gbGlzdC5zcGxpdChzdHJpbmcsIFsnLCddLCB0cnVlKVxuICB9LFxuXG4gIHNwYWNlKHN0cmluZykge1xuICAgIGxldCBzcGFjZXMgPSBbJyAnLCAnXFxuJywgJ1xcdCddXG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBzcGFjZXMpXG4gIH0sXG5cbiAgc3BsaXQoc3RyaW5nLCBzZXBhcmF0b3JzLCBsYXN0KSB7XG4gICAgbGV0IGFycmF5ID0gW11cbiAgICBsZXQgY3VycmVudCA9ICcnXG4gICAgbGV0IHNwbGl0ID0gZmFsc2VcblxuICAgIGxldCBmdW5jID0gMFxuICAgIGxldCBpblF1b3RlID0gZmFsc2VcbiAgICBsZXQgcHJldlF1b3RlID0gJydcbiAgICBsZXQgZXNjYXBlID0gZmFsc2VcblxuICAgIGZvciAobGV0IGxldHRlciBvZiBzdHJpbmcpIHtcbiAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgZXNjYXBlID0gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnXFxcXCcpIHtcbiAgICAgICAgZXNjYXBlID0gdHJ1ZVxuICAgICAgfSBlbHNlIGlmIChpblF1b3RlKSB7XG4gICAgICAgIGlmIChsZXR0ZXIgPT09IHByZXZRdW90ZSkge1xuICAgICAgICAgIGluUXVvdGUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGxldHRlciA9PT0gJ1wiJyB8fCBsZXR0ZXIgPT09IFwiJ1wiKSB7XG4gICAgICAgIGluUXVvdGUgPSB0cnVlXG4gICAgICAgIHByZXZRdW90ZSA9IGxldHRlclxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICcoJykge1xuICAgICAgICBmdW5jICs9IDFcbiAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnKScpIHtcbiAgICAgICAgaWYgKGZ1bmMgPiAwKSBmdW5jIC09IDFcbiAgICAgIH0gZWxzZSBpZiAoZnVuYyA9PT0gMCkge1xuICAgICAgICBpZiAoc2VwYXJhdG9ycy5pbmNsdWRlcyhsZXR0ZXIpKSBzcGxpdCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNwbGl0KSB7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSAnJykgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSlcbiAgICAgICAgY3VycmVudCA9ICcnXG4gICAgICAgIHNwbGl0ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgKz0gbGV0dGVyXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxhc3QgfHwgY3VycmVudCAhPT0gJycpIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0XG5saXN0LmRlZmF1bHQgPSBsaXN0XG4iLCIndXNlIHN0cmljdCdcblxubGV0IHsgU291cmNlTWFwQ29uc3VtZXIsIFNvdXJjZU1hcEdlbmVyYXRvciB9ID0gcmVxdWlyZSgnc291cmNlLW1hcC1qcycpXG5sZXQgeyBkaXJuYW1lLCByZWxhdGl2ZSwgcmVzb2x2ZSwgc2VwIH0gPSByZXF1aXJlKCdwYXRoJylcbmxldCB7IHBhdGhUb0ZpbGVVUkwgfSA9IHJlcXVpcmUoJ3VybCcpXG5cbmxldCBJbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQnKVxuXG5sZXQgc291cmNlTWFwQXZhaWxhYmxlID0gQm9vbGVhbihTb3VyY2VNYXBDb25zdW1lciAmJiBTb3VyY2VNYXBHZW5lcmF0b3IpXG5sZXQgcGF0aEF2YWlsYWJsZSA9IEJvb2xlYW4oZGlybmFtZSAmJiByZXNvbHZlICYmIHJlbGF0aXZlICYmIHNlcClcblxuY2xhc3MgTWFwR2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3Ioc3RyaW5naWZ5LCByb290LCBvcHRzLCBjc3NTdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeVxuICAgIHRoaXMubWFwT3B0cyA9IG9wdHMubWFwIHx8IHt9XG4gICAgdGhpcy5yb290ID0gcm9vdFxuICAgIHRoaXMub3B0cyA9IG9wdHNcbiAgICB0aGlzLmNzcyA9IGNzc1N0cmluZ1xuICAgIHRoaXMudXNlc0ZpbGVVcmxzID0gIXRoaXMubWFwT3B0cy5mcm9tICYmIHRoaXMubWFwT3B0cy5hYnNvbHV0ZVxuXG4gICAgdGhpcy5tZW1vaXplZEZpbGVVUkxzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5tZW1vaXplZFBhdGhzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5tZW1vaXplZFVSTHMgPSBuZXcgTWFwKClcbiAgfVxuXG4gIGFkZEFubm90YXRpb24oKSB7XG4gICAgbGV0IGNvbnRlbnRcblxuICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcbiAgICAgIGNvbnRlbnQgPVxuICAgICAgICAnZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgdGhpcy50b0Jhc2U2NCh0aGlzLm1hcC50b1N0cmluZygpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnRlbnQgPSB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbih0aGlzLm9wdHMudG8sIHRoaXMucm9vdClcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9IHRoaXMub3V0cHV0RmlsZSgpICsgJy5tYXAnXG4gICAgfVxuICAgIGxldCBlb2wgPSAnXFxuJ1xuICAgIGlmICh0aGlzLmNzcy5pbmNsdWRlcygnXFxyXFxuJykpIGVvbCA9ICdcXHJcXG4nXG5cbiAgICB0aGlzLmNzcyArPSBlb2wgKyAnLyojIHNvdXJjZU1hcHBpbmdVUkw9JyArIGNvbnRlbnQgKyAnICovJ1xuICB9XG5cbiAgYXBwbHlQcmV2TWFwcygpIHtcbiAgICBmb3IgKGxldCBwcmV2IG9mIHRoaXMucHJldmlvdXMoKSkge1xuICAgICAgbGV0IGZyb20gPSB0aGlzLnRvVXJsKHRoaXMucGF0aChwcmV2LmZpbGUpKVxuICAgICAgbGV0IHJvb3QgPSBwcmV2LnJvb3QgfHwgZGlybmFtZShwcmV2LmZpbGUpXG4gICAgICBsZXQgbWFwXG5cbiAgICAgIGlmICh0aGlzLm1hcE9wdHMuc291cmNlc0NvbnRlbnQgPT09IGZhbHNlKSB7XG4gICAgICAgIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihwcmV2LnRleHQpXG4gICAgICAgIGlmIChtYXAuc291cmNlc0NvbnRlbnQpIHtcbiAgICAgICAgICBtYXAuc291cmNlc0NvbnRlbnQgPSBtYXAuc291cmNlc0NvbnRlbnQubWFwKCgpID0+IG51bGwpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcCA9IHByZXYuY29uc3VtZXIoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLm1hcC5hcHBseVNvdXJjZU1hcChtYXAsIGZyb20sIHRoaXMudG9VcmwodGhpcy5wYXRoKHJvb3QpKSlcbiAgICB9XG4gIH1cblxuICBjbGVhckFubm90YXRpb24oKSB7XG4gICAgaWYgKHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICBsZXQgbm9kZVxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMucm9vdC5ub2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBub2RlID0gdGhpcy5yb290Lm5vZGVzW2ldXG4gICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdjb21tZW50JykgY29udGludWVcbiAgICAgICAgaWYgKG5vZGUudGV4dC5pbmRleE9mKCcjIHNvdXJjZU1hcHBpbmdVUkw9JykgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnJvb3QucmVtb3ZlQ2hpbGQoaSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jc3MpIHtcbiAgICAgIHRoaXMuY3NzID0gdGhpcy5jc3MucmVwbGFjZSgvKFxcbik/XFwvXFwqI1tcXFNcXHNdKj9cXCpcXC8kL2dtLCAnJylcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZSgpIHtcbiAgICB0aGlzLmNsZWFyQW5ub3RhdGlvbigpXG4gICAgaWYgKHBhdGhBdmFpbGFibGUgJiYgc291cmNlTWFwQXZhaWxhYmxlICYmIHRoaXMuaXNNYXAoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVNYXAoKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzdWx0ID0gJydcbiAgICAgIHRoaXMuc3RyaW5naWZ5KHRoaXMucm9vdCwgaSA9PiB7XG4gICAgICAgIHJlc3VsdCArPSBpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIFtyZXN1bHRdXG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVNYXAoKSB7XG4gICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgdGhpcy5nZW5lcmF0ZVN0cmluZygpXG4gICAgfSBlbHNlIGlmICh0aGlzLnByZXZpb3VzKCkubGVuZ3RoID09PSAxKSB7XG4gICAgICBsZXQgcHJldiA9IHRoaXMucHJldmlvdXMoKVswXS5jb25zdW1lcigpXG4gICAgICBwcmV2LmZpbGUgPSB0aGlzLm91dHB1dEZpbGUoKVxuICAgICAgdGhpcy5tYXAgPSBTb3VyY2VNYXBHZW5lcmF0b3IuZnJvbVNvdXJjZU1hcChwcmV2KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoeyBmaWxlOiB0aGlzLm91dHB1dEZpbGUoKSB9KVxuICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyh7XG4gICAgICAgIGdlbmVyYXRlZDogeyBjb2x1bW46IDAsIGxpbmU6IDEgfSxcbiAgICAgICAgb3JpZ2luYWw6IHsgY29sdW1uOiAwLCBsaW5lOiAxIH0sXG4gICAgICAgIHNvdXJjZTogdGhpcy5vcHRzLmZyb21cbiAgICAgICAgICA/IHRoaXMudG9VcmwodGhpcy5wYXRoKHRoaXMub3B0cy5mcm9tKSlcbiAgICAgICAgICA6ICc8bm8gc291cmNlPidcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNTb3VyY2VzQ29udGVudCgpKSB0aGlzLnNldFNvdXJjZXNDb250ZW50KClcbiAgICBpZiAodGhpcy5yb290ICYmIHRoaXMucHJldmlvdXMoKS5sZW5ndGggPiAwKSB0aGlzLmFwcGx5UHJldk1hcHMoKVxuICAgIGlmICh0aGlzLmlzQW5ub3RhdGlvbigpKSB0aGlzLmFkZEFubm90YXRpb24oKVxuXG4gICAgaWYgKHRoaXMuaXNJbmxpbmUoKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLmNzc11cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt0aGlzLmNzcywgdGhpcy5tYXBdXG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVTdHJpbmcoKSB7XG4gICAgdGhpcy5jc3MgPSAnJ1xuICAgIHRoaXMubWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7IGZpbGU6IHRoaXMub3V0cHV0RmlsZSgpIH0pXG5cbiAgICBsZXQgbGluZSA9IDFcbiAgICBsZXQgY29sdW1uID0gMVxuXG4gICAgbGV0IG5vU291cmNlID0gJzxubyBzb3VyY2U+J1xuICAgIGxldCBtYXBwaW5nID0ge1xuICAgICAgZ2VuZXJhdGVkOiB7IGNvbHVtbjogMCwgbGluZTogMCB9LFxuICAgICAgb3JpZ2luYWw6IHsgY29sdW1uOiAwLCBsaW5lOiAwIH0sXG4gICAgICBzb3VyY2U6ICcnXG4gICAgfVxuXG4gICAgbGV0IGxpbmVzLCBsYXN0XG4gICAgdGhpcy5zdHJpbmdpZnkodGhpcy5yb290LCAoc3RyLCBub2RlLCB0eXBlKSA9PiB7XG4gICAgICB0aGlzLmNzcyArPSBzdHJcblxuICAgICAgaWYgKG5vZGUgJiYgdHlwZSAhPT0gJ2VuZCcpIHtcbiAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQubGluZSA9IGxpbmVcbiAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQuY29sdW1uID0gY29sdW1uIC0gMVxuICAgICAgICBpZiAobm9kZS5zb3VyY2UgJiYgbm9kZS5zb3VyY2Uuc3RhcnQpIHtcbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHRoaXMuc291cmNlUGF0aChub2RlKVxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwubGluZSA9IG5vZGUuc291cmNlLnN0YXJ0LmxpbmVcbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmNvbHVtbiA9IG5vZGUuc291cmNlLnN0YXJ0LmNvbHVtbiAtIDFcbiAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKG1hcHBpbmcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSBub1NvdXJjZVxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwubGluZSA9IDFcbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmNvbHVtbiA9IDBcbiAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKG1hcHBpbmcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGluZXMgPSBzdHIubWF0Y2goL1xcbi9nKVxuICAgICAgaWYgKGxpbmVzKSB7XG4gICAgICAgIGxpbmUgKz0gbGluZXMubGVuZ3RoXG4gICAgICAgIGxhc3QgPSBzdHIubGFzdEluZGV4T2YoJ1xcbicpXG4gICAgICAgIGNvbHVtbiA9IHN0ci5sZW5ndGggLSBsYXN0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW4gKz0gc3RyLmxlbmd0aFxuICAgICAgfVxuXG4gICAgICBpZiAobm9kZSAmJiB0eXBlICE9PSAnc3RhcnQnKSB7XG4gICAgICAgIGxldCBwID0gbm9kZS5wYXJlbnQgfHwgeyByYXdzOiB7fSB9XG4gICAgICAgIGxldCBjaGlsZGxlc3MgPVxuICAgICAgICAgIG5vZGUudHlwZSA9PT0gJ2RlY2wnIHx8IChub2RlLnR5cGUgPT09ICdhdHJ1bGUnICYmICFub2RlLm5vZGVzKVxuICAgICAgICBpZiAoIWNoaWxkbGVzcyB8fCBub2RlICE9PSBwLmxhc3QgfHwgcC5yYXdzLnNlbWljb2xvbikge1xuICAgICAgICAgIGlmIChub2RlLnNvdXJjZSAmJiBub2RlLnNvdXJjZS5lbmQpIHtcbiAgICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gdGhpcy5zb3VyY2VQYXRoKG5vZGUpXG4gICAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmxpbmUgPSBub2RlLnNvdXJjZS5lbmQubGluZVxuICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5jb2x1bW4gPSBub2RlLnNvdXJjZS5lbmQuY29sdW1uIC0gMVxuICAgICAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQubGluZSA9IGxpbmVcbiAgICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmNvbHVtbiA9IGNvbHVtbiAtIDJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcobWFwcGluZylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSBub1NvdXJjZVxuICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gMVxuICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5jb2x1bW4gPSAwXG4gICAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5saW5lID0gbGluZVxuICAgICAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQuY29sdW1uID0gY29sdW1uIC0gMVxuICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyhtYXBwaW5nKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpc0Fubm90YXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaXNJbmxpbmUoKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvblxuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKGkgPT4gaS5hbm5vdGF0aW9uKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaXNJbmxpbmUoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuaW5saW5lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5pbmxpbmVcbiAgICB9XG5cbiAgICBsZXQgYW5ub3RhdGlvbiA9IHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uXG4gICAgaWYgKHR5cGVvZiBhbm5vdGF0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBhbm5vdGF0aW9uICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKGkgPT4gaS5pbmxpbmUpXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpc01hcCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5tYXAgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gISF0aGlzLm9wdHMubWFwXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkubGVuZ3RoID4gMFxuICB9XG5cbiAgaXNTb3VyY2VzQ29udGVudCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcE9wdHMuc291cmNlc0NvbnRlbnRcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkuc29tZShpID0+IGkud2l0aENvbnRlbnQoKSlcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIG91dHB1dEZpbGUoKSB7XG4gICAgaWYgKHRoaXMub3B0cy50bykge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aCh0aGlzLm9wdHMudG8pXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdHMuZnJvbSkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aCh0aGlzLm9wdHMuZnJvbSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICd0by5jc3MnXG4gICAgfVxuICB9XG5cbiAgcGF0aChmaWxlKSB7XG4gICAgaWYgKHRoaXMubWFwT3B0cy5hYnNvbHV0ZSkgcmV0dXJuIGZpbGVcbiAgICBpZiAoZmlsZS5jaGFyQ29kZUF0KDApID09PSA2MCAvKiBgPGAgKi8pIHJldHVybiBmaWxlXG4gICAgaWYgKC9eXFx3KzpcXC9cXC8vLnRlc3QoZmlsZSkpIHJldHVybiBmaWxlXG4gICAgbGV0IGNhY2hlZCA9IHRoaXMubWVtb2l6ZWRQYXRocy5nZXQoZmlsZSlcbiAgICBpZiAoY2FjaGVkKSByZXR1cm4gY2FjaGVkXG5cbiAgICBsZXQgZnJvbSA9IHRoaXMub3B0cy50byA/IGRpcm5hbWUodGhpcy5vcHRzLnRvKSA6ICcuJ1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZyb20gPSBkaXJuYW1lKHJlc29sdmUoZnJvbSwgdGhpcy5tYXBPcHRzLmFubm90YXRpb24pKVxuICAgIH1cblxuICAgIGxldCBwYXRoID0gcmVsYXRpdmUoZnJvbSwgZmlsZSlcbiAgICB0aGlzLm1lbW9pemVkUGF0aHMuc2V0KGZpbGUsIHBhdGgpXG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG5cbiAgcHJldmlvdXMoKSB7XG4gICAgaWYgKCF0aGlzLnByZXZpb3VzTWFwcykge1xuICAgICAgdGhpcy5wcmV2aW91c01hcHMgPSBbXVxuICAgICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgICB0aGlzLnJvb3Qud2Fsayhub2RlID0+IHtcbiAgICAgICAgICBpZiAobm9kZS5zb3VyY2UgJiYgbm9kZS5zb3VyY2UuaW5wdXQubWFwKSB7XG4gICAgICAgICAgICBsZXQgbWFwID0gbm9kZS5zb3VyY2UuaW5wdXQubWFwXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJldmlvdXNNYXBzLmluY2x1ZGVzKG1hcCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c01hcHMucHVzaChtYXApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGlucHV0ID0gbmV3IElucHV0KHRoaXMuY3NzLCB0aGlzLm9wdHMpXG4gICAgICAgIGlmIChpbnB1dC5tYXApIHRoaXMucHJldmlvdXNNYXBzLnB1c2goaW5wdXQubWFwKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByZXZpb3VzTWFwc1xuICB9XG5cbiAgc2V0U291cmNlc0NvbnRlbnQoKSB7XG4gICAgbGV0IGFscmVhZHkgPSB7fVxuICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgIHRoaXMucm9vdC53YWxrKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZS5zb3VyY2UpIHtcbiAgICAgICAgICBsZXQgZnJvbSA9IG5vZGUuc291cmNlLmlucHV0LmZyb21cbiAgICAgICAgICBpZiAoZnJvbSAmJiAhYWxyZWFkeVtmcm9tXSkge1xuICAgICAgICAgICAgYWxyZWFkeVtmcm9tXSA9IHRydWVcbiAgICAgICAgICAgIGxldCBmcm9tVXJsID0gdGhpcy51c2VzRmlsZVVybHNcbiAgICAgICAgICAgICAgPyB0aGlzLnRvRmlsZVVybChmcm9tKVxuICAgICAgICAgICAgICA6IHRoaXMudG9VcmwodGhpcy5wYXRoKGZyb20pKVxuICAgICAgICAgICAgdGhpcy5tYXAuc2V0U291cmNlQ29udGVudChmcm9tVXJsLCBub2RlLnNvdXJjZS5pbnB1dC5jc3MpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5jc3MpIHtcbiAgICAgIGxldCBmcm9tID0gdGhpcy5vcHRzLmZyb21cbiAgICAgICAgPyB0aGlzLnRvVXJsKHRoaXMucGF0aCh0aGlzLm9wdHMuZnJvbSkpXG4gICAgICAgIDogJzxubyBzb3VyY2U+J1xuICAgICAgdGhpcy5tYXAuc2V0U291cmNlQ29udGVudChmcm9tLCB0aGlzLmNzcylcbiAgICB9XG4gIH1cblxuICBzb3VyY2VQYXRoKG5vZGUpIHtcbiAgICBpZiAodGhpcy5tYXBPcHRzLmZyb20pIHtcbiAgICAgIHJldHVybiB0aGlzLnRvVXJsKHRoaXMubWFwT3B0cy5mcm9tKVxuICAgIH0gZWxzZSBpZiAodGhpcy51c2VzRmlsZVVybHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvRmlsZVVybChub2RlLnNvdXJjZS5pbnB1dC5mcm9tKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy50b1VybCh0aGlzLnBhdGgobm9kZS5zb3VyY2UuaW5wdXQuZnJvbSkpXG4gICAgfVxuICB9XG5cbiAgdG9CYXNlNjQoc3RyKSB7XG4gICAgaWYgKEJ1ZmZlcikge1xuICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0cikudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpXG4gICAgfVxuICB9XG5cbiAgdG9GaWxlVXJsKHBhdGgpIHtcbiAgICBsZXQgY2FjaGVkID0gdGhpcy5tZW1vaXplZEZpbGVVUkxzLmdldChwYXRoKVxuICAgIGlmIChjYWNoZWQpIHJldHVybiBjYWNoZWRcblxuICAgIGlmIChwYXRoVG9GaWxlVVJMKSB7XG4gICAgICBsZXQgZmlsZVVSTCA9IHBhdGhUb0ZpbGVVUkwocGF0aCkudG9TdHJpbmcoKVxuICAgICAgdGhpcy5tZW1vaXplZEZpbGVVUkxzLnNldChwYXRoLCBmaWxlVVJMKVxuXG4gICAgICByZXR1cm4gZmlsZVVSTFxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgbWFwLmFic29sdXRlYCBvcHRpb24gaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIFBvc3RDU1MgYnVpbGQnXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgdG9VcmwocGF0aCkge1xuICAgIGxldCBjYWNoZWQgPSB0aGlzLm1lbW9pemVkVVJMcy5nZXQocGF0aClcbiAgICBpZiAoY2FjaGVkKSByZXR1cm4gY2FjaGVkXG5cbiAgICBpZiAoc2VwID09PSAnXFxcXCcpIHtcbiAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuICAgIH1cblxuICAgIGxldCB1cmwgPSBlbmNvZGVVUkkocGF0aCkucmVwbGFjZSgvWyM/XS9nLCBlbmNvZGVVUklDb21wb25lbnQpXG4gICAgdGhpcy5tZW1vaXplZFVSTHMuc2V0KHBhdGgsIHVybClcblxuICAgIHJldHVybiB1cmxcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcEdlbmVyYXRvclxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBNYXBHZW5lcmF0b3IgPSByZXF1aXJlKCcuL21hcC1nZW5lcmF0b3InKVxubGV0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5JylcbmxldCB3YXJuT25jZSA9IHJlcXVpcmUoJy4vd2Fybi1vbmNlJylcbmxldCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgUmVzdWx0ID0gcmVxdWlyZSgnLi9yZXN1bHQnKVxuXG5jbGFzcyBOb1dvcmtSZXN1bHQge1xuICBjb25zdHJ1Y3Rvcihwcm9jZXNzb3IsIGNzcywgb3B0cykge1xuICAgIGNzcyA9IGNzcy50b1N0cmluZygpXG4gICAgdGhpcy5zdHJpbmdpZmllZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9wcm9jZXNzb3IgPSBwcm9jZXNzb3JcbiAgICB0aGlzLl9jc3MgPSBjc3NcbiAgICB0aGlzLl9vcHRzID0gb3B0c1xuICAgIHRoaXMuX21hcCA9IHVuZGVmaW5lZFxuICAgIGxldCByb290XG5cbiAgICBsZXQgc3RyID0gc3RyaW5naWZ5XG4gICAgdGhpcy5yZXN1bHQgPSBuZXcgUmVzdWx0KHRoaXMuX3Byb2Nlc3Nvciwgcm9vdCwgdGhpcy5fb3B0cylcbiAgICB0aGlzLnJlc3VsdC5jc3MgPSBjc3NcblxuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnJlc3VsdCwgJ3Jvb3QnLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJvb3RcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IG1hcCA9IG5ldyBNYXBHZW5lcmF0b3Ioc3RyLCByb290LCB0aGlzLl9vcHRzLCBjc3MpXG4gICAgaWYgKG1hcC5pc01hcCgpKSB7XG4gICAgICBsZXQgW2dlbmVyYXRlZENTUywgZ2VuZXJhdGVkTWFwXSA9IG1hcC5nZW5lcmF0ZSgpXG4gICAgICBpZiAoZ2VuZXJhdGVkQ1NTKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LmNzcyA9IGdlbmVyYXRlZENTU1xuICAgICAgfVxuICAgICAgaWYgKGdlbmVyYXRlZE1hcCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5tYXAgPSBnZW5lcmF0ZWRNYXBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYygpIHtcbiAgICBpZiAodGhpcy5lcnJvcikgcmV0dXJuIFByb21pc2UucmVqZWN0KHRoaXMuZXJyb3IpXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnJlc3VsdClcbiAgfVxuXG4gIGNhdGNoKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5hc3luYygpLmNhdGNoKG9uUmVqZWN0ZWQpXG4gIH1cblxuICBmaW5hbGx5KG9uRmluYWxseSkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZpbmFsbHksIG9uRmluYWxseSlcbiAgfVxuXG4gIHN5bmMoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHRocm93IHRoaXMuZXJyb3JcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRcbiAgfVxuXG4gIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCEoJ2Zyb20nIGluIHRoaXMuX29wdHMpKSB7XG4gICAgICAgIHdhcm5PbmNlKFxuICAgICAgICAgICdXaXRob3V0IGBmcm9tYCBvcHRpb24gUG9zdENTUyBjb3VsZCBnZW5lcmF0ZSB3cm9uZyBzb3VyY2UgbWFwICcgK1xuICAgICAgICAgICAgJ2FuZCB3aWxsIG5vdCBmaW5kIEJyb3dzZXJzbGlzdCBjb25maWcuIFNldCBpdCB0byBDU1MgZmlsZSBwYXRoICcgK1xuICAgICAgICAgICAgJ29yIHRvIGB1bmRlZmluZWRgIHRvIHByZXZlbnQgdGhpcyB3YXJuaW5nLidcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9jc3NcbiAgfVxuXG4gIHdhcm5pbmdzKCkge1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LmNzc1xuICB9XG5cbiAgZ2V0IGNzcygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQuY3NzXG4gIH1cblxuICBnZXQgbWFwKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5tYXBcbiAgfVxuXG4gIGdldCBtZXNzYWdlcygpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGdldCBvcHRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5vcHRzXG4gIH1cblxuICBnZXQgcHJvY2Vzc29yKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5wcm9jZXNzb3JcbiAgfVxuXG4gIGdldCByb290KCkge1xuICAgIGlmICh0aGlzLl9yb290KSB7XG4gICAgICByZXR1cm4gdGhpcy5fcm9vdFxuICAgIH1cblxuICAgIGxldCByb290XG4gICAgbGV0IHBhcnNlciA9IHBhcnNlXG5cbiAgICB0cnkge1xuICAgICAgcm9vdCA9IHBhcnNlcih0aGlzLl9jc3MsIHRoaXMuX29wdHMpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICAgIH1cblxuICAgIGlmICh0aGlzLmVycm9yKSB7XG4gICAgICB0aHJvdyB0aGlzLmVycm9yXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSByb290XG4gICAgICByZXR1cm4gcm9vdFxuICAgIH1cbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ05vV29ya1Jlc3VsdCdcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vV29ya1Jlc3VsdFxuTm9Xb3JrUmVzdWx0LmRlZmF1bHQgPSBOb1dvcmtSZXN1bHRcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgeyBpc0NsZWFuLCBteSB9ID0gcmVxdWlyZSgnLi9zeW1ib2xzJylcbmxldCBDc3NTeW50YXhFcnJvciA9IHJlcXVpcmUoJy4vY3NzLXN5bnRheC1lcnJvcicpXG5sZXQgU3RyaW5naWZpZXIgPSByZXF1aXJlKCcuL3N0cmluZ2lmaWVyJylcbmxldCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpXG5cbmZ1bmN0aW9uIGNsb25lTm9kZShvYmosIHBhcmVudCkge1xuICBsZXQgY2xvbmVkID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpXG5cbiAgZm9yIChsZXQgaSBpbiBvYmopIHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSB7XG4gICAgICAvKiBjOCBpZ25vcmUgbmV4dCAyICovXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoaSA9PT0gJ3Byb3h5Q2FjaGUnKSBjb250aW51ZVxuICAgIGxldCB2YWx1ZSA9IG9ialtpXVxuICAgIGxldCB0eXBlID0gdHlwZW9mIHZhbHVlXG5cbiAgICBpZiAoaSA9PT0gJ3BhcmVudCcgJiYgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwYXJlbnQpIGNsb25lZFtpXSA9IHBhcmVudFxuICAgIH0gZWxzZSBpZiAoaSA9PT0gJ3NvdXJjZScpIHtcbiAgICAgIGNsb25lZFtpXSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgY2xvbmVkW2ldID0gdmFsdWUubWFwKGogPT4gY2xvbmVOb2RlKGosIGNsb25lZCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkgdmFsdWUgPSBjbG9uZU5vZGUodmFsdWUpXG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9uZWRcbn1cblxuY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzID0ge30pIHtcbiAgICB0aGlzLnJhd3MgPSB7fVxuICAgIHRoaXNbaXNDbGVhbl0gPSBmYWxzZVxuICAgIHRoaXNbbXldID0gdHJ1ZVxuXG4gICAgZm9yIChsZXQgbmFtZSBpbiBkZWZhdWx0cykge1xuICAgICAgaWYgKG5hbWUgPT09ICdub2RlcycpIHtcbiAgICAgICAgdGhpcy5ub2RlcyA9IFtdXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2YgZGVmYXVsdHNbbmFtZV0pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5vZGUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKG5vZGUuY2xvbmUoKSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBlbmQobm9kZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbbmFtZV0gPSBkZWZhdWx0c1tuYW1lXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZFRvRXJyb3IoZXJyb3IpIHtcbiAgICBlcnJvci5wb3N0Y3NzTm9kZSA9IHRoaXNcbiAgICBpZiAoZXJyb3Iuc3RhY2sgJiYgdGhpcy5zb3VyY2UgJiYgL1xcblxcc3s0fWF0IC8udGVzdChlcnJvci5zdGFjaykpIHtcbiAgICAgIGxldCBzID0gdGhpcy5zb3VyY2VcbiAgICAgIGVycm9yLnN0YWNrID0gZXJyb3Iuc3RhY2sucmVwbGFjZShcbiAgICAgICAgL1xcblxcc3s0fWF0IC8sXG4gICAgICAgIGAkJiR7cy5pbnB1dC5mcm9tfToke3Muc3RhcnQubGluZX06JHtzLnN0YXJ0LmNvbHVtbn0kJmBcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yXG4gIH1cblxuICBhZnRlcihhZGQpIHtcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRBZnRlcih0aGlzLCBhZGQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFzc2lnbihvdmVycmlkZXMgPSB7fSkge1xuICAgIGZvciAobGV0IG5hbWUgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICB0aGlzW25hbWVdID0gb3ZlcnJpZGVzW25hbWVdXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBiZWZvcmUoYWRkKSB7XG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIGFkZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKSB7XG4gICAgZGVsZXRlIHRoaXMucmF3cy5iZWZvcmVcbiAgICBkZWxldGUgdGhpcy5yYXdzLmFmdGVyXG4gICAgaWYgKCFrZWVwQmV0d2VlbikgZGVsZXRlIHRoaXMucmF3cy5iZXR3ZWVuXG4gIH1cblxuICBjbG9uZShvdmVycmlkZXMgPSB7fSkge1xuICAgIGxldCBjbG9uZWQgPSBjbG9uZU5vZGUodGhpcylcbiAgICBmb3IgKGxldCBuYW1lIGluIG92ZXJyaWRlcykge1xuICAgICAgY2xvbmVkW25hbWVdID0gb3ZlcnJpZGVzW25hbWVdXG4gICAgfVxuICAgIHJldHVybiBjbG9uZWRcbiAgfVxuXG4gIGNsb25lQWZ0ZXIob3ZlcnJpZGVzID0ge30pIHtcbiAgICBsZXQgY2xvbmVkID0gdGhpcy5jbG9uZShvdmVycmlkZXMpXG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgY2xvbmVkKVxuICAgIHJldHVybiBjbG9uZWRcbiAgfVxuXG4gIGNsb25lQmVmb3JlKG92ZXJyaWRlcyA9IHt9KSB7XG4gICAgbGV0IGNsb25lZCA9IHRoaXMuY2xvbmUob3ZlcnJpZGVzKVxuICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBjbG9uZWQpXG4gICAgcmV0dXJuIGNsb25lZFxuICB9XG5cbiAgZXJyb3IobWVzc2FnZSwgb3B0cyA9IHt9KSB7XG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICBsZXQgeyBlbmQsIHN0YXJ0IH0gPSB0aGlzLnJhbmdlQnkob3B0cylcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5pbnB1dC5lcnJvcihcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgeyBjb2x1bW46IHN0YXJ0LmNvbHVtbiwgbGluZTogc3RhcnQubGluZSB9LFxuICAgICAgICB7IGNvbHVtbjogZW5kLmNvbHVtbiwgbGluZTogZW5kLmxpbmUgfSxcbiAgICAgICAgb3B0c1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IENzc1N5bnRheEVycm9yKG1lc3NhZ2UpXG4gIH1cblxuICBnZXRQcm94eVByb2Nlc3NvcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KG5vZGUsIHByb3ApIHtcbiAgICAgICAgaWYgKHByb3AgPT09ICdwcm94eU9mJykge1xuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IG5vZGUucm9vdCgpLnRvUHJveHkoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBub2RlW3Byb3BdXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHNldChub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICBpZiAobm9kZVtwcm9wXSA9PT0gdmFsdWUpIHJldHVybiB0cnVlXG4gICAgICAgIG5vZGVbcHJvcF0gPSB2YWx1ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcCA9PT0gJ3Byb3AnIHx8XG4gICAgICAgICAgcHJvcCA9PT0gJ3ZhbHVlJyB8fFxuICAgICAgICAgIHByb3AgPT09ICduYW1lJyB8fFxuICAgICAgICAgIHByb3AgPT09ICdwYXJhbXMnIHx8XG4gICAgICAgICAgcHJvcCA9PT0gJ2ltcG9ydGFudCcgfHxcbiAgICAgICAgICAvKiBjOCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIHByb3AgPT09ICd0ZXh0J1xuICAgICAgICApIHtcbiAgICAgICAgICBub2RlLm1hcmtEaXJ0eSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtYXJrRGlydHkoKSB7XG4gICAgaWYgKHRoaXNbaXNDbGVhbl0pIHtcbiAgICAgIHRoaXNbaXNDbGVhbl0gPSBmYWxzZVxuICAgICAgbGV0IG5leHQgPSB0aGlzXG4gICAgICB3aGlsZSAoKG5leHQgPSBuZXh0LnBhcmVudCkpIHtcbiAgICAgICAgbmV4dFtpc0NsZWFuXSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcylcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQubm9kZXNbaW5kZXggKyAxXVxuICB9XG5cbiAgcG9zaXRpb25CeShvcHRzLCBzdHJpbmdSZXByZXNlbnRhdGlvbikge1xuICAgIGxldCBwb3MgPSB0aGlzLnNvdXJjZS5zdGFydFxuICAgIGlmIChvcHRzLmluZGV4KSB7XG4gICAgICBwb3MgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKG9wdHMuaW5kZXgsIHN0cmluZ1JlcHJlc2VudGF0aW9uKVxuICAgIH0gZWxzZSBpZiAob3B0cy53b3JkKSB7XG4gICAgICBzdHJpbmdSZXByZXNlbnRhdGlvbiA9IHRoaXMudG9TdHJpbmcoKVxuICAgICAgbGV0IGluZGV4ID0gc3RyaW5nUmVwcmVzZW50YXRpb24uaW5kZXhPZihvcHRzLndvcmQpXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSBwb3MgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKGluZGV4LCBzdHJpbmdSZXByZXNlbnRhdGlvbilcbiAgICB9XG4gICAgcmV0dXJuIHBvc1xuICB9XG5cbiAgcG9zaXRpb25JbnNpZGUoaW5kZXgsIHN0cmluZ1JlcHJlc2VudGF0aW9uKSB7XG4gICAgbGV0IHN0cmluZyA9IHN0cmluZ1JlcHJlc2VudGF0aW9uIHx8IHRoaXMudG9TdHJpbmcoKVxuICAgIGxldCBjb2x1bW4gPSB0aGlzLnNvdXJjZS5zdGFydC5jb2x1bW5cbiAgICBsZXQgbGluZSA9IHRoaXMuc291cmNlLnN0YXJ0LmxpbmVcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgaWYgKHN0cmluZ1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgY29sdW1uID0gMVxuICAgICAgICBsaW5lICs9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbiArPSAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgY29sdW1uLCBsaW5lIH1cbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGxldCBpbmRleCA9IHRoaXMucGFyZW50LmluZGV4KHRoaXMpXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lm5vZGVzW2luZGV4IC0gMV1cbiAgfVxuXG4gIHJhbmdlQnkob3B0cykge1xuICAgIGxldCBzdGFydCA9IHtcbiAgICAgIGNvbHVtbjogdGhpcy5zb3VyY2Uuc3RhcnQuY29sdW1uLFxuICAgICAgbGluZTogdGhpcy5zb3VyY2Uuc3RhcnQubGluZVxuICAgIH1cbiAgICBsZXQgZW5kID0gdGhpcy5zb3VyY2UuZW5kXG4gICAgICA/IHtcbiAgICAgICAgY29sdW1uOiB0aGlzLnNvdXJjZS5lbmQuY29sdW1uICsgMSxcbiAgICAgICAgbGluZTogdGhpcy5zb3VyY2UuZW5kLmxpbmVcbiAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICBjb2x1bW46IHN0YXJ0LmNvbHVtbiArIDEsXG4gICAgICAgIGxpbmU6IHN0YXJ0LmxpbmVcbiAgICAgIH1cblxuICAgIGlmIChvcHRzLndvcmQpIHtcbiAgICAgIGxldCBzdHJpbmdSZXByZXNlbnRhdGlvbiA9IHRoaXMudG9TdHJpbmcoKVxuICAgICAgbGV0IGluZGV4ID0gc3RyaW5nUmVwcmVzZW50YXRpb24uaW5kZXhPZihvcHRzLndvcmQpXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHN0YXJ0ID0gdGhpcy5wb3NpdGlvbkluc2lkZShpbmRleCwgc3RyaW5nUmVwcmVzZW50YXRpb24pXG4gICAgICAgIGVuZCA9IHRoaXMucG9zaXRpb25JbnNpZGUoaW5kZXggKyBvcHRzLndvcmQubGVuZ3RoLCBzdHJpbmdSZXByZXNlbnRhdGlvbilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdHMuc3RhcnQpIHtcbiAgICAgICAgc3RhcnQgPSB7XG4gICAgICAgICAgY29sdW1uOiBvcHRzLnN0YXJ0LmNvbHVtbixcbiAgICAgICAgICBsaW5lOiBvcHRzLnN0YXJ0LmxpbmVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcHRzLmluZGV4KSB7XG4gICAgICAgIHN0YXJ0ID0gdGhpcy5wb3NpdGlvbkluc2lkZShvcHRzLmluZGV4KVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5lbmQpIHtcbiAgICAgICAgZW5kID0ge1xuICAgICAgICAgIGNvbHVtbjogb3B0cy5lbmQuY29sdW1uLFxuICAgICAgICAgIGxpbmU6IG9wdHMuZW5kLmxpbmVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcHRzLmVuZEluZGV4KSB7XG4gICAgICAgIGVuZCA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5lbmRJbmRleClcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5pbmRleCkge1xuICAgICAgICBlbmQgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKG9wdHMuaW5kZXggKyAxKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGVuZC5saW5lIDwgc3RhcnQubGluZSB8fFxuICAgICAgKGVuZC5saW5lID09PSBzdGFydC5saW5lICYmIGVuZC5jb2x1bW4gPD0gc3RhcnQuY29sdW1uKVxuICAgICkge1xuICAgICAgZW5kID0geyBjb2x1bW46IHN0YXJ0LmNvbHVtbiArIDEsIGxpbmU6IHN0YXJ0LmxpbmUgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGVuZCwgc3RhcnQgfVxuICB9XG5cbiAgcmF3KHByb3AsIGRlZmF1bHRUeXBlKSB7XG4gICAgbGV0IHN0ciA9IG5ldyBTdHJpbmdpZmllcigpXG4gICAgcmV0dXJuIHN0ci5yYXcodGhpcywgcHJvcCwgZGVmYXVsdFR5cGUpXG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKVxuICAgIH1cbiAgICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZXBsYWNlV2l0aCguLi5ub2Rlcykge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgbGV0IGJvb2ttYXJrID0gdGhpc1xuICAgICAgbGV0IGZvdW5kU2VsZiA9IGZhbHNlXG4gICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmIChub2RlID09PSB0aGlzKSB7XG4gICAgICAgICAgZm91bmRTZWxmID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGZvdW5kU2VsZikge1xuICAgICAgICAgIHRoaXMucGFyZW50Lmluc2VydEFmdGVyKGJvb2ttYXJrLCBub2RlKVxuICAgICAgICAgIGJvb2ttYXJrID0gbm9kZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZShib29rbWFyaywgbm9kZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWZvdW5kU2VsZikge1xuICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJvb3QoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXNcbiAgICB3aGlsZSAocmVzdWx0LnBhcmVudCAmJiByZXN1bHQucGFyZW50LnR5cGUgIT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5wYXJlbnRcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgdG9KU09OKF8sIGlucHV0cykge1xuICAgIGxldCBmaXhlZCA9IHt9XG4gICAgbGV0IGVtaXRJbnB1dHMgPSBpbnB1dHMgPT0gbnVsbFxuICAgIGlucHV0cyA9IGlucHV0cyB8fCBuZXcgTWFwKClcbiAgICBsZXQgaW5wdXRzTmV4dEluZGV4ID0gMFxuXG4gICAgZm9yIChsZXQgbmFtZSBpbiB0aGlzKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCBuYW1lKSkge1xuICAgICAgICAvKiBjOCBpZ25vcmUgbmV4dCAyICovXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBpZiAobmFtZSA9PT0gJ3BhcmVudCcgfHwgbmFtZSA9PT0gJ3Byb3h5Q2FjaGUnKSBjb250aW51ZVxuICAgICAgbGV0IHZhbHVlID0gdGhpc1tuYW1lXVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZml4ZWRbbmFtZV0gPSB2YWx1ZS5tYXAoaSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBpID09PSAnb2JqZWN0JyAmJiBpLnRvSlNPTikge1xuICAgICAgICAgICAgcmV0dXJuIGkudG9KU09OKG51bGwsIGlucHV0cylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUudG9KU09OKSB7XG4gICAgICAgIGZpeGVkW25hbWVdID0gdmFsdWUudG9KU09OKG51bGwsIGlucHV0cylcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3NvdXJjZScpIHtcbiAgICAgICAgbGV0IGlucHV0SWQgPSBpbnB1dHMuZ2V0KHZhbHVlLmlucHV0KVxuICAgICAgICBpZiAoaW5wdXRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgaW5wdXRJZCA9IGlucHV0c05leHRJbmRleFxuICAgICAgICAgIGlucHV0cy5zZXQodmFsdWUuaW5wdXQsIGlucHV0c05leHRJbmRleClcbiAgICAgICAgICBpbnB1dHNOZXh0SW5kZXgrK1xuICAgICAgICB9XG4gICAgICAgIGZpeGVkW25hbWVdID0ge1xuICAgICAgICAgIGVuZDogdmFsdWUuZW5kLFxuICAgICAgICAgIGlucHV0SWQsXG4gICAgICAgICAgc3RhcnQ6IHZhbHVlLnN0YXJ0XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpeGVkW25hbWVdID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW1pdElucHV0cykge1xuICAgICAgZml4ZWQuaW5wdXRzID0gWy4uLmlucHV0cy5rZXlzKCldLm1hcChpbnB1dCA9PiBpbnB1dC50b0pTT04oKSlcbiAgICB9XG5cbiAgICByZXR1cm4gZml4ZWRcbiAgfVxuXG4gIHRvUHJveHkoKSB7XG4gICAgaWYgKCF0aGlzLnByb3h5Q2FjaGUpIHtcbiAgICAgIHRoaXMucHJveHlDYWNoZSA9IG5ldyBQcm94eSh0aGlzLCB0aGlzLmdldFByb3h5UHJvY2Vzc29yKCkpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3h5Q2FjaGVcbiAgfVxuXG4gIHRvU3RyaW5nKHN0cmluZ2lmaWVyID0gc3RyaW5naWZ5KSB7XG4gICAgaWYgKHN0cmluZ2lmaWVyLnN0cmluZ2lmeSkgc3RyaW5naWZpZXIgPSBzdHJpbmdpZmllci5zdHJpbmdpZnlcbiAgICBsZXQgcmVzdWx0ID0gJydcbiAgICBzdHJpbmdpZmllcih0aGlzLCBpID0+IHtcbiAgICAgIHJlc3VsdCArPSBpXG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB3YXJuKHJlc3VsdCwgdGV4dCwgb3B0cykge1xuICAgIGxldCBkYXRhID0geyBub2RlOiB0aGlzIH1cbiAgICBmb3IgKGxldCBpIGluIG9wdHMpIGRhdGFbaV0gPSBvcHRzW2ldXG4gICAgcmV0dXJuIHJlc3VsdC53YXJuKHRleHQsIGRhdGEpXG4gIH1cblxuICBnZXQgcHJveHlPZigpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZVxuTm9kZS5kZWZhdWx0ID0gTm9kZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpXG5sZXQgUGFyc2VyID0gcmVxdWlyZSgnLi9wYXJzZXInKVxubGV0IElucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpXG5cbmZ1bmN0aW9uIHBhcnNlKGNzcywgb3B0cykge1xuICBsZXQgaW5wdXQgPSBuZXcgSW5wdXQoY3NzLCBvcHRzKVxuICBsZXQgcGFyc2VyID0gbmV3IFBhcnNlcihpbnB1dClcbiAgdHJ5IHtcbiAgICBwYXJzZXIucGFyc2UoKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChlLm5hbWUgPT09ICdDc3NTeW50YXhFcnJvcicgJiYgb3B0cyAmJiBvcHRzLmZyb20pIHtcbiAgICAgICAgaWYgKC9cXC5zY3NzJC9pLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPVxuICAgICAgICAgICAgJ1xcbllvdSB0cmllZCB0byBwYXJzZSBTQ1NTIHdpdGggJyArXG4gICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLXNjc3MgcGFyc2VyJ1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC5zYXNzL2kudGVzdChvcHRzLmZyb20pKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9XG4gICAgICAgICAgICAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIFNhc3Mgd2l0aCAnICtcbiAgICAgICAgICAgICd0aGUgc3RhbmRhcmQgQ1NTIHBhcnNlcjsgJyArXG4gICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2FzcyBwYXJzZXInXG4gICAgICAgIH0gZWxzZSBpZiAoL1xcLmxlc3MkL2kudGVzdChvcHRzLmZyb20pKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9XG4gICAgICAgICAgICAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIExlc3Mgd2l0aCAnICtcbiAgICAgICAgICAgICd0aGUgc3RhbmRhcmQgQ1NTIHBhcnNlcjsgJyArXG4gICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3MtbGVzcyBwYXJzZXInXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgZVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlci5yb290XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VcbnBhcnNlLmRlZmF1bHQgPSBwYXJzZVxuXG5Db250YWluZXIucmVnaXN0ZXJQYXJzZShwYXJzZSlcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuL2RlY2xhcmF0aW9uJylcbmxldCB0b2tlbml6ZXIgPSByZXF1aXJlKCcuL3Rva2VuaXplJylcbmxldCBDb21tZW50ID0gcmVxdWlyZSgnLi9jb21tZW50JylcbmxldCBBdFJ1bGUgPSByZXF1aXJlKCcuL2F0LXJ1bGUnKVxubGV0IFJvb3QgPSByZXF1aXJlKCcuL3Jvb3QnKVxubGV0IFJ1bGUgPSByZXF1aXJlKCcuL3J1bGUnKVxuXG5jb25zdCBTQUZFX0NPTU1FTlRfTkVJR0hCT1IgPSB7XG4gIGVtcHR5OiB0cnVlLFxuICBzcGFjZTogdHJ1ZVxufVxuXG5mdW5jdGlvbiBmaW5kTGFzdFdpdGhQb3NpdGlvbih0b2tlbnMpIHtcbiAgZm9yIChsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxldCB0b2tlbiA9IHRva2Vuc1tpXVxuICAgIGxldCBwb3MgPSB0b2tlblszXSB8fCB0b2tlblsyXVxuICAgIGlmIChwb3MpIHJldHVybiBwb3NcbiAgfVxufVxuXG5jbGFzcyBQYXJzZXIge1xuICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dFxuXG4gICAgdGhpcy5yb290ID0gbmV3IFJvb3QoKVxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMucm9vdFxuICAgIHRoaXMuc3BhY2VzID0gJydcbiAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlXG4gICAgdGhpcy5jdXN0b21Qcm9wZXJ0eSA9IGZhbHNlXG5cbiAgICB0aGlzLmNyZWF0ZVRva2VuaXplcigpXG4gICAgdGhpcy5yb290LnNvdXJjZSA9IHsgaW5wdXQsIHN0YXJ0OiB7IGNvbHVtbjogMSwgbGluZTogMSwgb2Zmc2V0OiAwIH0gfVxuICB9XG5cbiAgYXRydWxlKHRva2VuKSB7XG4gICAgbGV0IG5vZGUgPSBuZXcgQXRSdWxlKClcbiAgICBub2RlLm5hbWUgPSB0b2tlblsxXS5zbGljZSgxKVxuICAgIGlmIChub2RlLm5hbWUgPT09ICcnKSB7XG4gICAgICB0aGlzLnVubmFtZWRBdHJ1bGUobm9kZSwgdG9rZW4pXG4gICAgfVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSlcblxuICAgIGxldCB0eXBlXG4gICAgbGV0IHByZXZcbiAgICBsZXQgc2hpZnRcbiAgICBsZXQgbGFzdCA9IGZhbHNlXG4gICAgbGV0IG9wZW4gPSBmYWxzZVxuICAgIGxldCBwYXJhbXMgPSBbXVxuICAgIGxldCBicmFja2V0cyA9IFtdXG5cbiAgICB3aGlsZSAoIXRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpXG4gICAgICB0eXBlID0gdG9rZW5bMF1cblxuICAgICAgaWYgKHR5cGUgPT09ICcoJyB8fCB0eXBlID09PSAnWycpIHtcbiAgICAgICAgYnJhY2tldHMucHVzaCh0eXBlID09PSAnKCcgPyAnKScgOiAnXScpXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7JyAmJiBicmFja2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGJyYWNrZXRzLnB1c2goJ30nKVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBicmFja2V0c1ticmFja2V0cy5sZW5ndGggLSAxXSkge1xuICAgICAgICBicmFja2V0cy5wb3AoKVxuICAgICAgfVxuXG4gICAgICBpZiAoYnJhY2tldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnOycpIHtcbiAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRva2VuWzJdKVxuICAgICAgICAgIG5vZGUuc291cmNlLmVuZC5vZmZzZXQrK1xuICAgICAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgICAgb3BlbiA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd9Jykge1xuICAgICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2hpZnQgPSBwYXJhbXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgcHJldiA9IHBhcmFtc1tzaGlmdF1cbiAgICAgICAgICAgIHdoaWxlIChwcmV2ICYmIHByZXZbMF0gPT09ICdzcGFjZScpIHtcbiAgICAgICAgICAgICAgcHJldiA9IHBhcmFtc1stLXNoaWZ0XVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbihwcmV2WzNdIHx8IHByZXZbMl0pXG4gICAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZC5vZmZzZXQrK1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmVuZCh0b2tlbilcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKHRva2VuKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMucHVzaCh0b2tlbilcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICAgIGxhc3QgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgbm9kZS5yYXdzLmJldHdlZW4gPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZChwYXJhbXMpXG4gICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcbiAgICAgIG5vZGUucmF3cy5hZnRlck5hbWUgPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHBhcmFtcylcbiAgICAgIHRoaXMucmF3KG5vZGUsICdwYXJhbXMnLCBwYXJhbXMpXG4gICAgICBpZiAobGFzdCkge1xuICAgICAgICB0b2tlbiA9IHBhcmFtc1twYXJhbXMubGVuZ3RoIC0gMV1cbiAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbih0b2tlblszXSB8fCB0b2tlblsyXSlcbiAgICAgICAgbm9kZS5zb3VyY2UuZW5kLm9mZnNldCsrXG4gICAgICAgIHRoaXMuc3BhY2VzID0gbm9kZS5yYXdzLmJldHdlZW5cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJ1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLnJhd3MuYWZ0ZXJOYW1lID0gJydcbiAgICAgIG5vZGUucGFyYW1zID0gJydcbiAgICB9XG5cbiAgICBpZiAob3Blbikge1xuICAgICAgbm9kZS5ub2RlcyA9IFtdXG4gICAgICB0aGlzLmN1cnJlbnQgPSBub2RlXG4gICAgfVxuICB9XG5cbiAgY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKSB7XG4gICAgbGV0IGNvbG9uID0gdGhpcy5jb2xvbih0b2tlbnMpXG4gICAgaWYgKGNvbG9uID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICBsZXQgZm91bmRlZCA9IDBcbiAgICBsZXQgdG9rZW5cbiAgICBmb3IgKGxldCBqID0gY29sb24gLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbal1cbiAgICAgIGlmICh0b2tlblswXSAhPT0gJ3NwYWNlJykge1xuICAgICAgICBmb3VuZGVkICs9IDFcbiAgICAgICAgaWYgKGZvdW5kZWQgPT09IDIpIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIC8vIElmIHRoZSB0b2tlbiBpcyBhIHdvcmQsIGUuZy4gYCFpbXBvcnRhbnRgLCBgcmVkYCBvciBhbnkgb3RoZXIgdmFsaWQgcHJvcGVydHkncyB2YWx1ZS5cbiAgICAvLyBUaGVuIHdlIG5lZWQgdG8gcmV0dXJuIHRoZSBjb2xvbiBhZnRlciB0aGF0IHdvcmQgdG9rZW4uIFszXSBpcyB0aGUgXCJlbmRcIiBjb2xvbiBvZiB0aGF0IHdvcmQuXG4gICAgLy8gQW5kIGJlY2F1c2Ugd2UgbmVlZCBpdCBhZnRlciB0aGF0IG9uZSB3ZSBkbyArMSB0byBnZXQgdGhlIG5leHQgb25lLlxuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICAnTWlzc2VkIHNlbWljb2xvbicsXG4gICAgICB0b2tlblswXSA9PT0gJ3dvcmQnID8gdG9rZW5bM10gKyAxIDogdG9rZW5bMl1cbiAgICApXG4gIH1cblxuICBjb2xvbih0b2tlbnMpIHtcbiAgICBsZXQgYnJhY2tldHMgPSAwXG4gICAgbGV0IHRva2VuLCB0eXBlLCBwcmV2XG4gICAgZm9yIChsZXQgW2ksIGVsZW1lbnRdIG9mIHRva2Vucy5lbnRyaWVzKCkpIHtcbiAgICAgIHRva2VuID0gZWxlbWVudFxuICAgICAgdHlwZSA9IHRva2VuWzBdXG5cbiAgICAgIGlmICh0eXBlID09PSAnKCcpIHtcbiAgICAgICAgYnJhY2tldHMgKz0gMVxuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICcpJykge1xuICAgICAgICBicmFja2V0cyAtPSAxXG4gICAgICB9XG4gICAgICBpZiAoYnJhY2tldHMgPT09IDAgJiYgdHlwZSA9PT0gJzonKSB7XG4gICAgICAgIGlmICghcHJldikge1xuICAgICAgICAgIHRoaXMuZG91YmxlQ29sb24odG9rZW4pXG4gICAgICAgIH0gZWxzZSBpZiAocHJldlswXSA9PT0gJ3dvcmQnICYmIHByZXZbMV0gPT09ICdwcm9naWQnKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHByZXYgPSB0b2tlblxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbW1lbnQodG9rZW4pIHtcbiAgICBsZXQgbm9kZSA9IG5ldyBDb21tZW50KClcbiAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0pXG4gICAgbm9kZS5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbih0b2tlblszXSB8fCB0b2tlblsyXSlcbiAgICBub2RlLnNvdXJjZS5lbmQub2Zmc2V0KytcblxuICAgIGxldCB0ZXh0ID0gdG9rZW5bMV0uc2xpY2UoMiwgLTIpXG4gICAgaWYgKC9eXFxzKiQvLnRlc3QodGV4dCkpIHtcbiAgICAgIG5vZGUudGV4dCA9ICcnXG4gICAgICBub2RlLnJhd3MubGVmdCA9IHRleHRcbiAgICAgIG5vZGUucmF3cy5yaWdodCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtYXRjaCA9IHRleHQubWF0Y2goL14oXFxzKikoW15dKlxcUykoXFxzKikkLylcbiAgICAgIG5vZGUudGV4dCA9IG1hdGNoWzJdXG4gICAgICBub2RlLnJhd3MubGVmdCA9IG1hdGNoWzFdXG4gICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVRva2VuaXplcigpIHtcbiAgICB0aGlzLnRva2VuaXplciA9IHRva2VuaXplcih0aGlzLmlucHV0KVxuICB9XG5cbiAgZGVjbCh0b2tlbnMsIGN1c3RvbVByb3BlcnR5KSB7XG4gICAgbGV0IG5vZGUgPSBuZXcgRGVjbGFyYXRpb24oKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlbnNbMF1bMl0pXG5cbiAgICBsZXQgbGFzdCA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1cbiAgICBpZiAobGFzdFswXSA9PT0gJzsnKSB7XG4gICAgICB0aGlzLnNlbWljb2xvbiA9IHRydWVcbiAgICAgIHRva2Vucy5wb3AoKVxuICAgIH1cblxuICAgIG5vZGUuc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24oXG4gICAgICBsYXN0WzNdIHx8IGxhc3RbMl0gfHwgZmluZExhc3RXaXRoUG9zaXRpb24odG9rZW5zKVxuICAgIClcbiAgICBub2RlLnNvdXJjZS5lbmQub2Zmc2V0KytcblxuICAgIHdoaWxlICh0b2tlbnNbMF1bMF0gIT09ICd3b3JkJykge1xuICAgICAgaWYgKHRva2Vucy5sZW5ndGggPT09IDEpIHRoaXMudW5rbm93bldvcmQodG9rZW5zKVxuICAgICAgbm9kZS5yYXdzLmJlZm9yZSArPSB0b2tlbnMuc2hpZnQoKVsxXVxuICAgIH1cbiAgICBub2RlLnNvdXJjZS5zdGFydCA9IHRoaXMuZ2V0UG9zaXRpb24odG9rZW5zWzBdWzJdKVxuXG4gICAgbm9kZS5wcm9wID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbGV0IHR5cGUgPSB0b2tlbnNbMF1bMF1cbiAgICAgIGlmICh0eXBlID09PSAnOicgfHwgdHlwZSA9PT0gJ3NwYWNlJyB8fCB0eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIG5vZGUucHJvcCArPSB0b2tlbnMuc2hpZnQoKVsxXVxuICAgIH1cblxuICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gJydcblxuICAgIGxldCB0b2tlblxuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0b2tlbiA9IHRva2Vucy5zaGlmdCgpXG5cbiAgICAgIGlmICh0b2tlblswXSA9PT0gJzonKSB7XG4gICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd3b3JkJyAmJiAvXFx3Ly50ZXN0KHRva2VuWzFdKSkge1xuICAgICAgICAgIHRoaXMudW5rbm93bldvcmQoW3Rva2VuXSlcbiAgICAgICAgfVxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub2RlLnByb3BbMF0gPT09ICdfJyB8fCBub2RlLnByb3BbMF0gPT09ICcqJykge1xuICAgICAgbm9kZS5yYXdzLmJlZm9yZSArPSBub2RlLnByb3BbMF1cbiAgICAgIG5vZGUucHJvcCA9IG5vZGUucHJvcC5zbGljZSgxKVxuICAgIH1cblxuICAgIGxldCBmaXJzdFNwYWNlcyA9IFtdXG4gICAgbGV0IG5leHRcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbmV4dCA9IHRva2Vuc1swXVswXVxuICAgICAgaWYgKG5leHQgIT09ICdzcGFjZScgJiYgbmV4dCAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgZmlyc3RTcGFjZXMucHVzaCh0b2tlbnMuc2hpZnQoKSlcbiAgICB9XG5cbiAgICB0aGlzLnByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2VucylcblxuICAgIGZvciAobGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldXG4gICAgICBpZiAodG9rZW5bMV0udG9Mb3dlckNhc2UoKSA9PT0gJyFpbXBvcnRhbnQnKSB7XG4gICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZVxuICAgICAgICBsZXQgc3RyaW5nID0gdGhpcy5zdHJpbmdGcm9tKHRva2VucywgaSlcbiAgICAgICAgc3RyaW5nID0gdGhpcy5zcGFjZXNGcm9tRW5kKHRva2VucykgKyBzdHJpbmdcbiAgICAgICAgaWYgKHN0cmluZyAhPT0gJyAhaW1wb3J0YW50Jykgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0cmluZ1xuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmICh0b2tlblsxXS50b0xvd2VyQ2FzZSgpID09PSAnaW1wb3J0YW50Jykge1xuICAgICAgICBsZXQgY2FjaGUgPSB0b2tlbnMuc2xpY2UoMClcbiAgICAgICAgbGV0IHN0ciA9ICcnXG4gICAgICAgIGZvciAobGV0IGogPSBpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgbGV0IHR5cGUgPSBjYWNoZVtqXVswXVxuICAgICAgICAgIGlmIChzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCAmJiB0eXBlICE9PSAnc3BhY2UnKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHIgPSBjYWNoZS5wb3AoKVsxXSArIHN0clxuICAgICAgICB9XG4gICAgICAgIGlmIChzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCkge1xuICAgICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZVxuICAgICAgICAgIG5vZGUucmF3cy5pbXBvcnRhbnQgPSBzdHJcbiAgICAgICAgICB0b2tlbnMgPSBjYWNoZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlblswXSAhPT0gJ3NwYWNlJyAmJiB0b2tlblswXSAhPT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGhhc1dvcmQgPSB0b2tlbnMuc29tZShpID0+IGlbMF0gIT09ICdzcGFjZScgJiYgaVswXSAhPT0gJ2NvbW1lbnQnKVxuXG4gICAgaWYgKGhhc1dvcmQpIHtcbiAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IGZpcnN0U3BhY2VzLm1hcChpID0+IGlbMV0pLmpvaW4oJycpXG4gICAgICBmaXJzdFNwYWNlcyA9IFtdXG4gICAgfVxuICAgIHRoaXMucmF3KG5vZGUsICd2YWx1ZScsIGZpcnN0U3BhY2VzLmNvbmNhdCh0b2tlbnMpLCBjdXN0b21Qcm9wZXJ0eSlcblxuICAgIGlmIChub2RlLnZhbHVlLmluY2x1ZGVzKCc6JykgJiYgIWN1c3RvbVByb3BlcnR5KSB7XG4gICAgICB0aGlzLmNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2VucylcbiAgICB9XG4gIH1cblxuICBkb3VibGVDb2xvbih0b2tlbikge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICAnRG91YmxlIGNvbG9uJyxcbiAgICAgIHsgb2Zmc2V0OiB0b2tlblsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdICsgdG9rZW5bMV0ubGVuZ3RoIH1cbiAgICApXG4gIH1cblxuICBlbXB0eVJ1bGUodG9rZW4pIHtcbiAgICBsZXQgbm9kZSA9IG5ldyBSdWxlKClcbiAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0pXG4gICAgbm9kZS5zZWxlY3RvciA9ICcnXG4gICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJ1xuICAgIHRoaXMuY3VycmVudCA9IG5vZGVcbiAgfVxuXG4gIGVuZCh0b2tlbikge1xuICAgIGlmICh0aGlzLmN1cnJlbnQubm9kZXMgJiYgdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb25cbiAgICB9XG4gICAgdGhpcy5zZW1pY29sb24gPSBmYWxzZVxuXG4gICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgPSAodGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgfHwgJycpICsgdGhpcy5zcGFjZXNcbiAgICB0aGlzLnNwYWNlcyA9ICcnXG5cbiAgICBpZiAodGhpcy5jdXJyZW50LnBhcmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50LnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRva2VuWzJdKVxuICAgICAgdGhpcy5jdXJyZW50LnNvdXJjZS5lbmQub2Zmc2V0KytcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudC5wYXJlbnRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51bmV4cGVjdGVkQ2xvc2UodG9rZW4pXG4gICAgfVxuICB9XG5cbiAgZW5kRmlsZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50LnBhcmVudCkgdGhpcy51bmNsb3NlZEJsb2NrKClcbiAgICBpZiAodGhpcy5jdXJyZW50Lm5vZGVzICYmIHRoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudC5yYXdzLnNlbWljb2xvbiA9IHRoaXMuc2VtaWNvbG9uXG4gICAgfVxuICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzXG4gICAgdGhpcy5yb290LnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRoaXMudG9rZW5pemVyLnBvc2l0aW9uKCkpXG4gIH1cblxuICBmcmVlU2VtaWNvbG9uKHRva2VuKSB7XG4gICAgdGhpcy5zcGFjZXMgKz0gdG9rZW5bMV1cbiAgICBpZiAodGhpcy5jdXJyZW50Lm5vZGVzKSB7XG4gICAgICBsZXQgcHJldiA9IHRoaXMuY3VycmVudC5ub2Rlc1t0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoIC0gMV1cbiAgICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3J1bGUnICYmICFwcmV2LnJhd3Mub3duU2VtaWNvbG9uKSB7XG4gICAgICAgIHByZXYucmF3cy5vd25TZW1pY29sb24gPSB0aGlzLnNwYWNlc1xuICAgICAgICB0aGlzLnNwYWNlcyA9ICcnXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSGVscGVyc1xuXG4gIGdldFBvc2l0aW9uKG9mZnNldCkge1xuICAgIGxldCBwb3MgPSB0aGlzLmlucHV0LmZyb21PZmZzZXQob2Zmc2V0KVxuICAgIHJldHVybiB7XG4gICAgICBjb2x1bW46IHBvcy5jb2wsXG4gICAgICBsaW5lOiBwb3MubGluZSxcbiAgICAgIG9mZnNldFxuICAgIH1cbiAgfVxuXG4gIGluaXQobm9kZSwgb2Zmc2V0KSB7XG4gICAgdGhpcy5jdXJyZW50LnB1c2gobm9kZSlcbiAgICBub2RlLnNvdXJjZSA9IHtcbiAgICAgIGlucHV0OiB0aGlzLmlucHV0LFxuICAgICAgc3RhcnQ6IHRoaXMuZ2V0UG9zaXRpb24ob2Zmc2V0KVxuICAgIH1cbiAgICBub2RlLnJhd3MuYmVmb3JlID0gdGhpcy5zcGFjZXNcbiAgICB0aGlzLnNwYWNlcyA9ICcnXG4gICAgaWYgKG5vZGUudHlwZSAhPT0gJ2NvbW1lbnQnKSB0aGlzLnNlbWljb2xvbiA9IGZhbHNlXG4gIH1cblxuICBvdGhlcihzdGFydCkge1xuICAgIGxldCBlbmQgPSBmYWxzZVxuICAgIGxldCB0eXBlID0gbnVsbFxuICAgIGxldCBjb2xvbiA9IGZhbHNlXG4gICAgbGV0IGJyYWNrZXQgPSBudWxsXG4gICAgbGV0IGJyYWNrZXRzID0gW11cbiAgICBsZXQgY3VzdG9tUHJvcGVydHkgPSBzdGFydFsxXS5zdGFydHNXaXRoKCctLScpXG5cbiAgICBsZXQgdG9rZW5zID0gW11cbiAgICBsZXQgdG9rZW4gPSBzdGFydFxuICAgIHdoaWxlICh0b2tlbikge1xuICAgICAgdHlwZSA9IHRva2VuWzBdXG4gICAgICB0b2tlbnMucHVzaCh0b2tlbilcblxuICAgICAgaWYgKHR5cGUgPT09ICcoJyB8fCB0eXBlID09PSAnWycpIHtcbiAgICAgICAgaWYgKCFicmFja2V0KSBicmFja2V0ID0gdG9rZW5cbiAgICAgICAgYnJhY2tldHMucHVzaCh0eXBlID09PSAnKCcgPyAnKScgOiAnXScpXG4gICAgICB9IGVsc2UgaWYgKGN1c3RvbVByb3BlcnR5ICYmIGNvbG9uICYmIHR5cGUgPT09ICd7Jykge1xuICAgICAgICBpZiAoIWJyYWNrZXQpIGJyYWNrZXQgPSB0b2tlblxuICAgICAgICBicmFja2V0cy5wdXNoKCd9JylcbiAgICAgIH0gZWxzZSBpZiAoYnJhY2tldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnOycpIHtcbiAgICAgICAgICBpZiAoY29sb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGVjbCh0b2tlbnMsIGN1c3RvbVByb3BlcnR5KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICAgIHRoaXMucnVsZSh0b2tlbnMpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ30nKSB7XG4gICAgICAgICAgdGhpcy50b2tlbml6ZXIuYmFjayh0b2tlbnMucG9wKCkpXG4gICAgICAgICAgZW5kID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJzonKSB7XG4gICAgICAgICAgY29sb24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gYnJhY2tldHNbYnJhY2tldHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgYnJhY2tldHMucG9wKClcbiAgICAgICAgaWYgKGJyYWNrZXRzLmxlbmd0aCA9PT0gMCkgYnJhY2tldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuaXplci5uZXh0VG9rZW4oKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkgZW5kID0gdHJ1ZVxuICAgIGlmIChicmFja2V0cy5sZW5ndGggPiAwKSB0aGlzLnVuY2xvc2VkQnJhY2tldChicmFja2V0KVxuXG4gICAgaWYgKGVuZCAmJiBjb2xvbikge1xuICAgICAgaWYgKCFjdXN0b21Qcm9wZXJ0eSkge1xuICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgIHRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVswXVxuICAgICAgICAgIGlmICh0b2tlbiAhPT0gJ3NwYWNlJyAmJiB0b2tlbiAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgICAgIHRoaXMudG9rZW5pemVyLmJhY2sodG9rZW5zLnBvcCgpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRlY2wodG9rZW5zLCBjdXN0b21Qcm9wZXJ0eSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51bmtub3duV29yZCh0b2tlbnMpXG4gICAgfVxuICB9XG5cbiAgcGFyc2UoKSB7XG4gICAgbGV0IHRva2VuXG4gICAgd2hpbGUgKCF0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuaXplci5uZXh0VG9rZW4oKVxuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgIGNhc2UgJ3NwYWNlJzpcbiAgICAgICAgICB0aGlzLnNwYWNlcyArPSB0b2tlblsxXVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnOyc6XG4gICAgICAgICAgdGhpcy5mcmVlU2VtaWNvbG9uKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnfSc6XG4gICAgICAgICAgdGhpcy5lbmQodG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdjb21tZW50JzpcbiAgICAgICAgICB0aGlzLmNvbW1lbnQodG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdhdC13b3JkJzpcbiAgICAgICAgICB0aGlzLmF0cnVsZSh0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ3snOlxuICAgICAgICAgIHRoaXMuZW1wdHlSdWxlKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLm90aGVyKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZW5kRmlsZSgpXG4gIH1cblxuICBwcmVjaGVja01pc3NlZFNlbWljb2xvbigvKiB0b2tlbnMgKi8pIHtcbiAgICAvLyBIb29rIGZvciBTYWZlIFBhcnNlclxuICB9XG5cbiAgcmF3KG5vZGUsIHByb3AsIHRva2VucywgY3VzdG9tUHJvcGVydHkpIHtcbiAgICBsZXQgdG9rZW4sIHR5cGVcbiAgICBsZXQgbGVuZ3RoID0gdG9rZW5zLmxlbmd0aFxuICAgIGxldCB2YWx1ZSA9ICcnXG4gICAgbGV0IGNsZWFuID0gdHJ1ZVxuICAgIGxldCBuZXh0LCBwcmV2XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXVxuICAgICAgdHlwZSA9IHRva2VuWzBdXG4gICAgICBpZiAodHlwZSA9PT0gJ3NwYWNlJyAmJiBpID09PSBsZW5ndGggLSAxICYmICFjdXN0b21Qcm9wZXJ0eSkge1xuICAgICAgICBjbGVhbiA9IGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgICBwcmV2ID0gdG9rZW5zW2kgLSAxXSA/IHRva2Vuc1tpIC0gMV1bMF0gOiAnZW1wdHknXG4gICAgICAgIG5leHQgPSB0b2tlbnNbaSArIDFdID8gdG9rZW5zW2kgKyAxXVswXSA6ICdlbXB0eSdcbiAgICAgICAgaWYgKCFTQUZFX0NPTU1FTlRfTkVJR0hCT1JbcHJldl0gJiYgIVNBRkVfQ09NTUVOVF9ORUlHSEJPUltuZXh0XSkge1xuICAgICAgICAgIGlmICh2YWx1ZS5zbGljZSgtMSkgPT09ICcsJykge1xuICAgICAgICAgICAgY2xlYW4gPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSArPSB0b2tlblsxXVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGVhbiA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlICs9IHRva2VuWzFdXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY2xlYW4pIHtcbiAgICAgIGxldCByYXcgPSB0b2tlbnMucmVkdWNlKChhbGwsIGkpID0+IGFsbCArIGlbMV0sICcnKVxuICAgICAgbm9kZS5yYXdzW3Byb3BdID0geyByYXcsIHZhbHVlIH1cbiAgICB9XG4gICAgbm9kZVtwcm9wXSA9IHZhbHVlXG4gIH1cblxuICBydWxlKHRva2Vucykge1xuICAgIHRva2Vucy5wb3AoKVxuXG4gICAgbGV0IG5vZGUgPSBuZXcgUnVsZSgpXG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2Vuc1swXVsyXSlcblxuICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21FbmQodG9rZW5zKVxuICAgIHRoaXMucmF3KG5vZGUsICdzZWxlY3RvcicsIHRva2VucylcbiAgICB0aGlzLmN1cnJlbnQgPSBub2RlXG4gIH1cblxuICBzcGFjZXNBbmRDb21tZW50c0Zyb21FbmQodG9rZW5zKSB7XG4gICAgbGV0IGxhc3RUb2tlblR5cGVcbiAgICBsZXQgc3BhY2VzID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF1cbiAgICAgIGlmIChsYXN0VG9rZW5UeXBlICE9PSAnc3BhY2UnICYmIGxhc3RUb2tlblR5cGUgIT09ICdjb21tZW50JykgYnJlYWtcbiAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlc1xuICAgIH1cbiAgICByZXR1cm4gc3BhY2VzXG4gIH1cblxuICAvLyBFcnJvcnNcblxuICBzcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCh0b2tlbnMpIHtcbiAgICBsZXQgbmV4dFxuICAgIGxldCBzcGFjZXMgPSAnJ1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBuZXh0ID0gdG9rZW5zWzBdWzBdXG4gICAgICBpZiAobmV4dCAhPT0gJ3NwYWNlJyAmJiBuZXh0ICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICBzcGFjZXMgKz0gdG9rZW5zLnNoaWZ0KClbMV1cbiAgICB9XG4gICAgcmV0dXJuIHNwYWNlc1xuICB9XG5cbiAgc3BhY2VzRnJvbUVuZCh0b2tlbnMpIHtcbiAgICBsZXQgbGFzdFRva2VuVHlwZVxuICAgIGxldCBzcGFjZXMgPSAnJ1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBsYXN0VG9rZW5UeXBlID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVswXVxuICAgICAgaWYgKGxhc3RUb2tlblR5cGUgIT09ICdzcGFjZScpIGJyZWFrXG4gICAgICBzcGFjZXMgPSB0b2tlbnMucG9wKClbMV0gKyBzcGFjZXNcbiAgICB9XG4gICAgcmV0dXJuIHNwYWNlc1xuICB9XG5cbiAgc3RyaW5nRnJvbSh0b2tlbnMsIGZyb20pIHtcbiAgICBsZXQgcmVzdWx0ID0gJydcbiAgICBmb3IgKGxldCBpID0gZnJvbTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0ICs9IHRva2Vuc1tpXVsxXVxuICAgIH1cbiAgICB0b2tlbnMuc3BsaWNlKGZyb20sIHRva2Vucy5sZW5ndGggLSBmcm9tKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHVuY2xvc2VkQmxvY2soKSB7XG4gICAgbGV0IHBvcyA9IHRoaXMuY3VycmVudC5zb3VyY2Uuc3RhcnRcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmNsb3NlZCBibG9jaycsIHBvcy5saW5lLCBwb3MuY29sdW1uKVxuICB9XG5cbiAgdW5jbG9zZWRCcmFja2V0KGJyYWNrZXQpIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgJ1VuY2xvc2VkIGJyYWNrZXQnLFxuICAgICAgeyBvZmZzZXQ6IGJyYWNrZXRbMl0gfSxcbiAgICAgIHsgb2Zmc2V0OiBicmFja2V0WzJdICsgMSB9XG4gICAgKVxuICB9XG5cbiAgdW5leHBlY3RlZENsb3NlKHRva2VuKSB7XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihcbiAgICAgICdVbmV4cGVjdGVkIH0nLFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdIH0sXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gKyAxIH1cbiAgICApXG4gIH1cblxuICB1bmtub3duV29yZCh0b2tlbnMpIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgJ1Vua25vd24gd29yZCcsXG4gICAgICB7IG9mZnNldDogdG9rZW5zWzBdWzJdIH0sXG4gICAgICB7IG9mZnNldDogdG9rZW5zWzBdWzJdICsgdG9rZW5zWzBdWzFdLmxlbmd0aCB9XG4gICAgKVxuICB9XG5cbiAgdW5uYW1lZEF0cnVsZShub2RlLCB0b2tlbikge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICAnQXQtcnVsZSB3aXRob3V0IG5hbWUnLFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdIH0sXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gKyB0b2tlblsxXS5sZW5ndGggfVxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlclxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBDc3NTeW50YXhFcnJvciA9IHJlcXVpcmUoJy4vY3NzLXN5bnRheC1lcnJvcicpXG5sZXQgRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuL2RlY2xhcmF0aW9uJylcbmxldCBMYXp5UmVzdWx0ID0gcmVxdWlyZSgnLi9sYXp5LXJlc3VsdCcpXG5sZXQgQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXInKVxubGV0IFByb2Nlc3NvciA9IHJlcXVpcmUoJy4vcHJvY2Vzc29yJylcbmxldCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpXG5sZXQgZnJvbUpTT04gPSByZXF1aXJlKCcuL2Zyb21KU09OJylcbmxldCBEb2N1bWVudCA9IHJlcXVpcmUoJy4vZG9jdW1lbnQnKVxubGV0IFdhcm5pbmcgPSByZXF1aXJlKCcuL3dhcm5pbmcnKVxubGV0IENvbW1lbnQgPSByZXF1aXJlKCcuL2NvbW1lbnQnKVxubGV0IEF0UnVsZSA9IHJlcXVpcmUoJy4vYXQtcnVsZScpXG5sZXQgUmVzdWx0ID0gcmVxdWlyZSgnLi9yZXN1bHQuanMnKVxubGV0IElucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpXG5sZXQgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmxldCBsaXN0ID0gcmVxdWlyZSgnLi9saXN0JylcbmxldCBSdWxlID0gcmVxdWlyZSgnLi9ydWxlJylcbmxldCBSb290ID0gcmVxdWlyZSgnLi9yb290JylcbmxldCBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJylcblxuZnVuY3Rpb24gcG9zdGNzcyguLi5wbHVnaW5zKSB7XG4gIGlmIChwbHVnaW5zLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KHBsdWdpbnNbMF0pKSB7XG4gICAgcGx1Z2lucyA9IHBsdWdpbnNbMF1cbiAgfVxuICByZXR1cm4gbmV3IFByb2Nlc3NvcihwbHVnaW5zKVxufVxuXG5wb3N0Y3NzLnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbihuYW1lLCBpbml0aWFsaXplcikge1xuICBsZXQgd2FybmluZ1ByaW50ZWQgPSBmYWxzZVxuICBmdW5jdGlvbiBjcmVhdG9yKC4uLmFyZ3MpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybiAmJiAhd2FybmluZ1ByaW50ZWQpIHtcbiAgICAgIHdhcm5pbmdQcmludGVkID0gdHJ1ZVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgbmFtZSArXG4gICAgICAgICAgJzogcG9zdGNzcy5wbHVnaW4gd2FzIGRlcHJlY2F0ZWQuIE1pZ3JhdGlvbiBndWlkZTpcXG4nICtcbiAgICAgICAgICAnaHR0cHM6Ly9ldmlsbWFydGlhbnMuY29tL2Nocm9uaWNsZXMvcG9zdGNzcy04LXBsdWdpbi1taWdyYXRpb24nXG4gICAgICApXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTEFORyAmJiBwcm9jZXNzLmVudi5MQU5HLnN0YXJ0c1dpdGgoJ2NuJykpIHtcbiAgICAgICAgLyogYzggaWdub3JlIG5leHQgNyAqL1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgbmFtZSArXG4gICAgICAgICAgICAnOiDph4zpnaIgcG9zdGNzcy5wbHVnaW4g6KKr5byD55SoLiDov4Hnp7vmjIfljZc6XFxuJyArXG4gICAgICAgICAgICAnaHR0cHM6Ly93d3cudzNjdGVjaC5jb20vdG9waWMvMjIyNidcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgdHJhbnNmb3JtZXIgPSBpbml0aWFsaXplciguLi5hcmdzKVxuICAgIHRyYW5zZm9ybWVyLnBvc3Rjc3NQbHVnaW4gPSBuYW1lXG4gICAgdHJhbnNmb3JtZXIucG9zdGNzc1ZlcnNpb24gPSBuZXcgUHJvY2Vzc29yKCkudmVyc2lvblxuICAgIHJldHVybiB0cmFuc2Zvcm1lclxuICB9XG5cbiAgbGV0IGNhY2hlXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdG9yLCAncG9zdGNzcycsIHtcbiAgICBnZXQoKSB7XG4gICAgICBpZiAoIWNhY2hlKSBjYWNoZSA9IGNyZWF0b3IoKVxuICAgICAgcmV0dXJuIGNhY2hlXG4gICAgfVxuICB9KVxuXG4gIGNyZWF0b3IucHJvY2VzcyA9IGZ1bmN0aW9uIChjc3MsIHByb2Nlc3NPcHRzLCBwbHVnaW5PcHRzKSB7XG4gICAgcmV0dXJuIHBvc3Rjc3MoW2NyZWF0b3IocGx1Z2luT3B0cyldKS5wcm9jZXNzKGNzcywgcHJvY2Vzc09wdHMpXG4gIH1cblxuICByZXR1cm4gY3JlYXRvclxufVxuXG5wb3N0Y3NzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeVxucG9zdGNzcy5wYXJzZSA9IHBhcnNlXG5wb3N0Y3NzLmZyb21KU09OID0gZnJvbUpTT05cbnBvc3Rjc3MubGlzdCA9IGxpc3RcblxucG9zdGNzcy5jb21tZW50ID0gZGVmYXVsdHMgPT4gbmV3IENvbW1lbnQoZGVmYXVsdHMpXG5wb3N0Y3NzLmF0UnVsZSA9IGRlZmF1bHRzID0+IG5ldyBBdFJ1bGUoZGVmYXVsdHMpXG5wb3N0Y3NzLmRlY2wgPSBkZWZhdWx0cyA9PiBuZXcgRGVjbGFyYXRpb24oZGVmYXVsdHMpXG5wb3N0Y3NzLnJ1bGUgPSBkZWZhdWx0cyA9PiBuZXcgUnVsZShkZWZhdWx0cylcbnBvc3Rjc3Mucm9vdCA9IGRlZmF1bHRzID0+IG5ldyBSb290KGRlZmF1bHRzKVxucG9zdGNzcy5kb2N1bWVudCA9IGRlZmF1bHRzID0+IG5ldyBEb2N1bWVudChkZWZhdWx0cylcblxucG9zdGNzcy5Dc3NTeW50YXhFcnJvciA9IENzc1N5bnRheEVycm9yXG5wb3N0Y3NzLkRlY2xhcmF0aW9uID0gRGVjbGFyYXRpb25cbnBvc3Rjc3MuQ29udGFpbmVyID0gQ29udGFpbmVyXG5wb3N0Y3NzLlByb2Nlc3NvciA9IFByb2Nlc3NvclxucG9zdGNzcy5Eb2N1bWVudCA9IERvY3VtZW50XG5wb3N0Y3NzLkNvbW1lbnQgPSBDb21tZW50XG5wb3N0Y3NzLldhcm5pbmcgPSBXYXJuaW5nXG5wb3N0Y3NzLkF0UnVsZSA9IEF0UnVsZVxucG9zdGNzcy5SZXN1bHQgPSBSZXN1bHRcbnBvc3Rjc3MuSW5wdXQgPSBJbnB1dFxucG9zdGNzcy5SdWxlID0gUnVsZVxucG9zdGNzcy5Sb290ID0gUm9vdFxucG9zdGNzcy5Ob2RlID0gTm9kZVxuXG5MYXp5UmVzdWx0LnJlZ2lzdGVyUG9zdGNzcyhwb3N0Y3NzKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBvc3Rjc3NcbnBvc3Rjc3MuZGVmYXVsdCA9IHBvc3Rjc3NcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgeyBTb3VyY2VNYXBDb25zdW1lciwgU291cmNlTWFwR2VuZXJhdG9yIH0gPSByZXF1aXJlKCdzb3VyY2UtbWFwLWpzJylcbmxldCB7IGV4aXN0c1N5bmMsIHJlYWRGaWxlU3luYyB9ID0gcmVxdWlyZSgnZnMnKVxubGV0IHsgZGlybmFtZSwgam9pbiB9ID0gcmVxdWlyZSgncGF0aCcpXG5cbmZ1bmN0aW9uIGZyb21CYXNlNjQoc3RyKSB7XG4gIGlmIChCdWZmZXIpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20oc3RyLCAnYmFzZTY0JykudG9TdHJpbmcoKVxuICB9IGVsc2Uge1xuICAgIC8qIGM4IGlnbm9yZSBuZXh0IDIgKi9cbiAgICByZXR1cm4gd2luZG93LmF0b2Ioc3RyKVxuICB9XG59XG5cbmNsYXNzIFByZXZpb3VzTWFwIHtcbiAgY29uc3RydWN0b3IoY3NzLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMubWFwID09PSBmYWxzZSkgcmV0dXJuXG4gICAgdGhpcy5sb2FkQW5ub3RhdGlvbihjc3MpXG4gICAgdGhpcy5pbmxpbmUgPSB0aGlzLnN0YXJ0V2l0aCh0aGlzLmFubm90YXRpb24sICdkYXRhOicpXG5cbiAgICBsZXQgcHJldiA9IG9wdHMubWFwID8gb3B0cy5tYXAucHJldiA6IHVuZGVmaW5lZFxuICAgIGxldCB0ZXh0ID0gdGhpcy5sb2FkTWFwKG9wdHMuZnJvbSwgcHJldilcbiAgICBpZiAoIXRoaXMubWFwRmlsZSAmJiBvcHRzLmZyb20pIHtcbiAgICAgIHRoaXMubWFwRmlsZSA9IG9wdHMuZnJvbVxuICAgIH1cbiAgICBpZiAodGhpcy5tYXBGaWxlKSB0aGlzLnJvb3QgPSBkaXJuYW1lKHRoaXMubWFwRmlsZSlcbiAgICBpZiAodGV4dCkgdGhpcy50ZXh0ID0gdGV4dFxuICB9XG5cbiAgY29uc3VtZXIoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnN1bWVyQ2FjaGUpIHtcbiAgICAgIHRoaXMuY29uc3VtZXJDYWNoZSA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih0aGlzLnRleHQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbnN1bWVyQ2FjaGVcbiAgfVxuXG4gIGRlY29kZUlubGluZSh0ZXh0KSB7XG4gICAgbGV0IGJhc2VDaGFyc2V0VXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjtjaGFyc2V0PXV0Zi0/ODtiYXNlNjQsL1xuICAgIGxldCBiYXNlVXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjtiYXNlNjQsL1xuICAgIGxldCBjaGFyc2V0VXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjtjaGFyc2V0PXV0Zi0/OCwvXG4gICAgbGV0IHVyaSA9IC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb24sL1xuXG4gICAgaWYgKGNoYXJzZXRVcmkudGVzdCh0ZXh0KSB8fCB1cmkudGVzdCh0ZXh0KSkge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh0ZXh0LnN1YnN0cihSZWdFeHAubGFzdE1hdGNoLmxlbmd0aCkpXG4gICAgfVxuXG4gICAgaWYgKGJhc2VDaGFyc2V0VXJpLnRlc3QodGV4dCkgfHwgYmFzZVVyaS50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm4gZnJvbUJhc2U2NCh0ZXh0LnN1YnN0cihSZWdFeHAubGFzdE1hdGNoLmxlbmd0aCkpXG4gICAgfVxuXG4gICAgbGV0IGVuY29kaW5nID0gdGV4dC5tYXRjaCgvZGF0YTphcHBsaWNhdGlvblxcL2pzb247KFteLF0rKSwvKVsxXVxuICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgc291cmNlIG1hcCBlbmNvZGluZyAnICsgZW5jb2RpbmcpXG4gIH1cblxuICBnZXRBbm5vdGF0aW9uVVJMKHNvdXJjZU1hcFN0cmluZykge1xuICAgIHJldHVybiBzb3VyY2VNYXBTdHJpbmcucmVwbGFjZSgvXlxcL1xcKlxccyojIHNvdXJjZU1hcHBpbmdVUkw9LywgJycpLnRyaW0oKVxuICB9XG5cbiAgaXNNYXAobWFwKSB7XG4gICAgaWYgKHR5cGVvZiBtYXAgIT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIG1hcC5tYXBwaW5ncyA9PT0gJ3N0cmluZycgfHxcbiAgICAgIHR5cGVvZiBtYXAuX21hcHBpbmdzID09PSAnc3RyaW5nJyB8fFxuICAgICAgQXJyYXkuaXNBcnJheShtYXAuc2VjdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgbG9hZEFubm90YXRpb24oY3NzKSB7XG4gICAgbGV0IGNvbW1lbnRzID0gY3NzLm1hdGNoKC9cXC9cXCpcXHMqIyBzb3VyY2VNYXBwaW5nVVJMPS9nbSlcbiAgICBpZiAoIWNvbW1lbnRzKSByZXR1cm5cblxuICAgIC8vIHNvdXJjZU1hcHBpbmdVUkxzIGZyb20gY29tbWVudHMsIHN0cmluZ3MsIGV0Yy5cbiAgICBsZXQgc3RhcnQgPSBjc3MubGFzdEluZGV4T2YoY29tbWVudHMucG9wKCkpXG4gICAgbGV0IGVuZCA9IGNzcy5pbmRleE9mKCcqLycsIHN0YXJ0KVxuXG4gICAgaWYgKHN0YXJ0ID4gLTEgJiYgZW5kID4gLTEpIHtcbiAgICAgIC8vIExvY2F0ZSB0aGUgbGFzdCBzb3VyY2VNYXBwaW5nVVJMIHRvIGF2b2lkIHBpY2tpblxuICAgICAgdGhpcy5hbm5vdGF0aW9uID0gdGhpcy5nZXRBbm5vdGF0aW9uVVJMKGNzcy5zdWJzdHJpbmcoc3RhcnQsIGVuZCkpXG4gICAgfVxuICB9XG5cbiAgbG9hZEZpbGUocGF0aCkge1xuICAgIHRoaXMucm9vdCA9IGRpcm5hbWUocGF0aClcbiAgICBpZiAoZXhpc3RzU3luYyhwYXRoKSkge1xuICAgICAgdGhpcy5tYXBGaWxlID0gcGF0aFxuICAgICAgcmV0dXJuIHJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKS50b1N0cmluZygpLnRyaW0oKVxuICAgIH1cbiAgfVxuXG4gIGxvYWRNYXAoZmlsZSwgcHJldikge1xuICAgIGlmIChwcmV2ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXG5cbiAgICBpZiAocHJldikge1xuICAgICAgaWYgKHR5cGVvZiBwcmV2ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gcHJldlxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcHJldiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsZXQgcHJldlBhdGggPSBwcmV2KGZpbGUpXG4gICAgICAgIGlmIChwcmV2UGF0aCkge1xuICAgICAgICAgIGxldCBtYXAgPSB0aGlzLmxvYWRGaWxlKHByZXZQYXRoKVxuICAgICAgICAgIGlmICghbWFwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICdVbmFibGUgdG8gbG9hZCBwcmV2aW91cyBzb3VyY2UgbWFwOiAnICsgcHJldlBhdGgudG9TdHJpbmcoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWFwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJldiBpbnN0YW5jZW9mIFNvdXJjZU1hcENvbnN1bWVyKSB7XG4gICAgICAgIHJldHVybiBTb3VyY2VNYXBHZW5lcmF0b3IuZnJvbVNvdXJjZU1hcChwcmV2KS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHByZXYgaW5zdGFuY2VvZiBTb3VyY2VNYXBHZW5lcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHByZXYudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTWFwKHByZXYpKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwcmV2KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdVbnN1cHBvcnRlZCBwcmV2aW91cyBzb3VyY2UgbWFwIGZvcm1hdDogJyArIHByZXYudG9TdHJpbmcoKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmlubGluZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlSW5saW5lKHRoaXMuYW5ub3RhdGlvbilcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5ub3RhdGlvbikge1xuICAgICAgbGV0IG1hcCA9IHRoaXMuYW5ub3RhdGlvblxuICAgICAgaWYgKGZpbGUpIG1hcCA9IGpvaW4oZGlybmFtZShmaWxlKSwgbWFwKVxuICAgICAgcmV0dXJuIHRoaXMubG9hZEZpbGUobWFwKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0V2l0aChzdHJpbmcsIHN0YXJ0KSB7XG4gICAgaWYgKCFzdHJpbmcpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyKDAsIHN0YXJ0Lmxlbmd0aCkgPT09IHN0YXJ0XG4gIH1cblxuICB3aXRoQ29udGVudCgpIHtcbiAgICByZXR1cm4gISEoXG4gICAgICB0aGlzLmNvbnN1bWVyKCkuc291cmNlc0NvbnRlbnQgJiZcbiAgICAgIHRoaXMuY29uc3VtZXIoKS5zb3VyY2VzQ29udGVudC5sZW5ndGggPiAwXG4gICAgKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJldmlvdXNNYXBcblByZXZpb3VzTWFwLmRlZmF1bHQgPSBQcmV2aW91c01hcFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBOb1dvcmtSZXN1bHQgPSByZXF1aXJlKCcuL25vLXdvcmstcmVzdWx0JylcbmxldCBMYXp5UmVzdWx0ID0gcmVxdWlyZSgnLi9sYXp5LXJlc3VsdCcpXG5sZXQgRG9jdW1lbnQgPSByZXF1aXJlKCcuL2RvY3VtZW50JylcbmxldCBSb290ID0gcmVxdWlyZSgnLi9yb290JylcblxuY2xhc3MgUHJvY2Vzc29yIHtcbiAgY29uc3RydWN0b3IocGx1Z2lucyA9IFtdKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gJzguNC4zMSdcbiAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLm5vcm1hbGl6ZShwbHVnaW5zKVxuICB9XG5cbiAgbm9ybWFsaXplKHBsdWdpbnMpIHtcbiAgICBsZXQgbm9ybWFsaXplZCA9IFtdXG4gICAgZm9yIChsZXQgaSBvZiBwbHVnaW5zKSB7XG4gICAgICBpZiAoaS5wb3N0Y3NzID09PSB0cnVlKSB7XG4gICAgICAgIGkgPSBpKClcbiAgICAgIH0gZWxzZSBpZiAoaS5wb3N0Y3NzKSB7XG4gICAgICAgIGkgPSBpLnBvc3Rjc3NcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KGkucGx1Z2lucykpIHtcbiAgICAgICAgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZWQuY29uY2F0KGkucGx1Z2lucylcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGkgPT09ICdvYmplY3QnICYmIGkucG9zdGNzc1BsdWdpbikge1xuICAgICAgICBub3JtYWxpemVkLnB1c2goaSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbm9ybWFsaXplZC5wdXNoKGkpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpID09PSAnb2JqZWN0JyAmJiAoaS5wYXJzZSB8fCBpLnN0cmluZ2lmeSkpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnUG9zdENTUyBzeW50YXhlcyBjYW5ub3QgYmUgdXNlZCBhcyBwbHVnaW5zLiBJbnN0ZWFkLCBwbGVhc2UgdXNlICcgK1xuICAgICAgICAgICAgICAnb25lIG9mIHRoZSBzeW50YXgvcGFyc2VyL3N0cmluZ2lmaWVyIG9wdGlvbnMgYXMgb3V0bGluZWQgJyArXG4gICAgICAgICAgICAgICdpbiB5b3VyIFBvc3RDU1MgcnVubmVyIGRvY3VtZW50YXRpb24uJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGkgKyAnIGlzIG5vdCBhIFBvc3RDU1MgcGx1Z2luJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRcbiAgfVxuXG4gIHByb2Nlc3MoY3NzLCBvcHRzID0ge30pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnBsdWdpbnMubGVuZ3RoID09PSAwICYmXG4gICAgICB0eXBlb2Ygb3B0cy5wYXJzZXIgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2Ygb3B0cy5zdHJpbmdpZmllciA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBvcHRzLnN5bnRheCA9PT0gJ3VuZGVmaW5lZCdcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXcgTm9Xb3JrUmVzdWx0KHRoaXMsIGNzcywgb3B0cylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBMYXp5UmVzdWx0KHRoaXMsIGNzcywgb3B0cylcbiAgICB9XG4gIH1cblxuICB1c2UocGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zID0gdGhpcy5wbHVnaW5zLmNvbmNhdCh0aGlzLm5vcm1hbGl6ZShbcGx1Z2luXSkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2Nlc3NvclxuUHJvY2Vzc29yLmRlZmF1bHQgPSBQcm9jZXNzb3JcblxuUm9vdC5yZWdpc3RlclByb2Nlc3NvcihQcm9jZXNzb3IpXG5Eb2N1bWVudC5yZWdpc3RlclByb2Nlc3NvcihQcm9jZXNzb3IpXG4iLCIndXNlIHN0cmljdCdcblxubGV0IFdhcm5pbmcgPSByZXF1aXJlKCcuL3dhcm5pbmcnKVxuXG5jbGFzcyBSZXN1bHQge1xuICBjb25zdHJ1Y3Rvcihwcm9jZXNzb3IsIHJvb3QsIG9wdHMpIHtcbiAgICB0aGlzLnByb2Nlc3NvciA9IHByb2Nlc3NvclxuICAgIHRoaXMubWVzc2FnZXMgPSBbXVxuICAgIHRoaXMucm9vdCA9IHJvb3RcbiAgICB0aGlzLm9wdHMgPSBvcHRzXG4gICAgdGhpcy5jc3MgPSB1bmRlZmluZWRcbiAgICB0aGlzLm1hcCA9IHVuZGVmaW5lZFxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzXG4gIH1cblxuICB3YXJuKHRleHQsIG9wdHMgPSB7fSkge1xuICAgIGlmICghb3B0cy5wbHVnaW4pIHtcbiAgICAgIGlmICh0aGlzLmxhc3RQbHVnaW4gJiYgdGhpcy5sYXN0UGx1Z2luLnBvc3Rjc3NQbHVnaW4pIHtcbiAgICAgICAgb3B0cy5wbHVnaW4gPSB0aGlzLmxhc3RQbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB3YXJuaW5nID0gbmV3IFdhcm5pbmcodGV4dCwgb3B0cylcbiAgICB0aGlzLm1lc3NhZ2VzLnB1c2god2FybmluZylcblxuICAgIHJldHVybiB3YXJuaW5nXG4gIH1cblxuICB3YXJuaW5ncygpIHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlcy5maWx0ZXIoaSA9PiBpLnR5cGUgPT09ICd3YXJuaW5nJylcbiAgfVxuXG4gIGdldCBjb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNzc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzdWx0XG5SZXN1bHQuZGVmYXVsdCA9IFJlc3VsdFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBDb250YWluZXIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpXG5cbmxldCBMYXp5UmVzdWx0LCBQcm9jZXNzb3JcblxuY2xhc3MgUm9vdCBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ3Jvb3QnXG4gICAgaWYgKCF0aGlzLm5vZGVzKSB0aGlzLm5vZGVzID0gW11cbiAgfVxuXG4gIG5vcm1hbGl6ZShjaGlsZCwgc2FtcGxlLCB0eXBlKSB7XG4gICAgbGV0IG5vZGVzID0gc3VwZXIubm9ybWFsaXplKGNoaWxkKVxuXG4gICAgaWYgKHNhbXBsZSkge1xuICAgICAgaWYgKHR5cGUgPT09ICdwcmVwZW5kJykge1xuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc2FtcGxlLnJhd3MuYmVmb3JlID0gdGhpcy5ub2Rlc1sxXS5yYXdzLmJlZm9yZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBzYW1wbGUucmF3cy5iZWZvcmVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmZpcnN0ICE9PSBzYW1wbGUpIHtcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgIG5vZGUucmF3cy5iZWZvcmUgPSBzYW1wbGUucmF3cy5iZWZvcmVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2Rlc1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQoY2hpbGQsIGlnbm9yZSkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXgoY2hpbGQpXG5cbiAgICBpZiAoIWlnbm9yZSAmJiBpbmRleCA9PT0gMCAmJiB0aGlzLm5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMubm9kZXNbMV0ucmF3cy5iZWZvcmUgPSB0aGlzLm5vZGVzW2luZGV4XS5yYXdzLmJlZm9yZVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZChjaGlsZClcbiAgfVxuXG4gIHRvUmVzdWx0KG9wdHMgPSB7fSkge1xuICAgIGxldCBsYXp5ID0gbmV3IExhenlSZXN1bHQobmV3IFByb2Nlc3NvcigpLCB0aGlzLCBvcHRzKVxuICAgIHJldHVybiBsYXp5LnN0cmluZ2lmeSgpXG4gIH1cbn1cblxuUm9vdC5yZWdpc3RlckxhenlSZXN1bHQgPSBkZXBlbmRhbnQgPT4ge1xuICBMYXp5UmVzdWx0ID0gZGVwZW5kYW50XG59XG5cblJvb3QucmVnaXN0ZXJQcm9jZXNzb3IgPSBkZXBlbmRhbnQgPT4ge1xuICBQcm9jZXNzb3IgPSBkZXBlbmRhbnRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb290XG5Sb290LmRlZmF1bHQgPSBSb290XG5cbkNvbnRhaW5lci5yZWdpc3RlclJvb3QoUm9vdClcbiIsIid1c2Ugc3RyaWN0J1xuXG5sZXQgQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXInKVxubGV0IGxpc3QgPSByZXF1aXJlKCcuL2xpc3QnKVxuXG5jbGFzcyBSdWxlIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAncnVsZSdcbiAgICBpZiAoIXRoaXMubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICB9XG5cbiAgZ2V0IHNlbGVjdG9ycygpIHtcbiAgICByZXR1cm4gbGlzdC5jb21tYSh0aGlzLnNlbGVjdG9yKVxuICB9XG5cbiAgc2V0IHNlbGVjdG9ycyh2YWx1ZXMpIHtcbiAgICBsZXQgbWF0Y2ggPSB0aGlzLnNlbGVjdG9yID8gdGhpcy5zZWxlY3Rvci5tYXRjaCgvLFxccyovKSA6IG51bGxcbiAgICBsZXQgc2VwID0gbWF0Y2ggPyBtYXRjaFswXSA6ICcsJyArIHRoaXMucmF3KCdiZXR3ZWVuJywgJ2JlZm9yZU9wZW4nKVxuICAgIHRoaXMuc2VsZWN0b3IgPSB2YWx1ZXMuam9pbihzZXApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSdWxlXG5SdWxlLmRlZmF1bHQgPSBSdWxlXG5cbkNvbnRhaW5lci5yZWdpc3RlclJ1bGUoUnVsZSlcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBERUZBVUxUX1JBVyA9IHtcbiAgYWZ0ZXI6ICdcXG4nLFxuICBiZWZvcmVDbG9zZTogJ1xcbicsXG4gIGJlZm9yZUNvbW1lbnQ6ICdcXG4nLFxuICBiZWZvcmVEZWNsOiAnXFxuJyxcbiAgYmVmb3JlT3BlbjogJyAnLFxuICBiZWZvcmVSdWxlOiAnXFxuJyxcbiAgY29sb246ICc6ICcsXG4gIGNvbW1lbnRMZWZ0OiAnICcsXG4gIGNvbW1lbnRSaWdodDogJyAnLFxuICBlbXB0eUJvZHk6ICcnLFxuICBpbmRlbnQ6ICcgICAgJyxcbiAgc2VtaWNvbG9uOiBmYWxzZVxufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cikge1xuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cblxuY2xhc3MgU3RyaW5naWZpZXIge1xuICBjb25zdHJ1Y3RvcihidWlsZGVyKSB7XG4gICAgdGhpcy5idWlsZGVyID0gYnVpbGRlclxuICB9XG5cbiAgYXRydWxlKG5vZGUsIHNlbWljb2xvbikge1xuICAgIGxldCBuYW1lID0gJ0AnICsgbm9kZS5uYW1lXG4gICAgbGV0IHBhcmFtcyA9IG5vZGUucGFyYW1zID8gdGhpcy5yYXdWYWx1ZShub2RlLCAncGFyYW1zJykgOiAnJ1xuXG4gICAgaWYgKHR5cGVvZiBub2RlLnJhd3MuYWZ0ZXJOYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmFtZSArPSBub2RlLnJhd3MuYWZ0ZXJOYW1lXG4gICAgfSBlbHNlIGlmIChwYXJhbXMpIHtcbiAgICAgIG5hbWUgKz0gJyAnXG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZXMpIHtcbiAgICAgIHRoaXMuYmxvY2sobm9kZSwgbmFtZSArIHBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGVuZCA9IChub2RlLnJhd3MuYmV0d2VlbiB8fCAnJykgKyAoc2VtaWNvbG9uID8gJzsnIDogJycpXG4gICAgICB0aGlzLmJ1aWxkZXIobmFtZSArIHBhcmFtcyArIGVuZCwgbm9kZSlcbiAgICB9XG4gIH1cblxuICBiZWZvcmVBZnRlcihub2RlLCBkZXRlY3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICBpZiAobm9kZS50eXBlID09PSAnZGVjbCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZURlY2wnKVxuICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZUNvbW1lbnQnKVxuICAgIH0gZWxzZSBpZiAoZGV0ZWN0ID09PSAnYmVmb3JlJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZUNsb3NlJylcbiAgICB9XG5cbiAgICBsZXQgYnVmID0gbm9kZS5wYXJlbnRcbiAgICBsZXQgZGVwdGggPSAwXG4gICAgd2hpbGUgKGJ1ZiAmJiBidWYudHlwZSAhPT0gJ3Jvb3QnKSB7XG4gICAgICBkZXB0aCArPSAxXG4gICAgICBidWYgPSBidWYucGFyZW50XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlLmluY2x1ZGVzKCdcXG4nKSkge1xuICAgICAgbGV0IGluZGVudCA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdpbmRlbnQnKVxuICAgICAgaWYgKGluZGVudC5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCBkZXB0aDsgc3RlcCsrKSB2YWx1ZSArPSBpbmRlbnRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGJsb2NrKG5vZGUsIHN0YXJ0KSB7XG4gICAgbGV0IGJldHdlZW4gPSB0aGlzLnJhdyhub2RlLCAnYmV0d2VlbicsICdiZWZvcmVPcGVuJylcbiAgICB0aGlzLmJ1aWxkZXIoc3RhcnQgKyBiZXR3ZWVuICsgJ3snLCBub2RlLCAnc3RhcnQnKVxuXG4gICAgbGV0IGFmdGVyXG4gICAgaWYgKG5vZGUubm9kZXMgJiYgbm9kZS5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYm9keShub2RlKVxuICAgICAgYWZ0ZXIgPSB0aGlzLnJhdyhub2RlLCAnYWZ0ZXInKVxuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicsICdlbXB0eUJvZHknKVxuICAgIH1cblxuICAgIGlmIChhZnRlcikgdGhpcy5idWlsZGVyKGFmdGVyKVxuICAgIHRoaXMuYnVpbGRlcignfScsIG5vZGUsICdlbmQnKVxuICB9XG5cbiAgYm9keShub2RlKSB7XG4gICAgbGV0IGxhc3QgPSBub2RlLm5vZGVzLmxlbmd0aCAtIDFcbiAgICB3aGlsZSAobGFzdCA+IDApIHtcbiAgICAgIGlmIChub2RlLm5vZGVzW2xhc3RdLnR5cGUgIT09ICdjb21tZW50JykgYnJlYWtcbiAgICAgIGxhc3QgLT0gMVxuICAgIH1cblxuICAgIGxldCBzZW1pY29sb24gPSB0aGlzLnJhdyhub2RlLCAnc2VtaWNvbG9uJylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaGlsZCA9IG5vZGUubm9kZXNbaV1cbiAgICAgIGxldCBiZWZvcmUgPSB0aGlzLnJhdyhjaGlsZCwgJ2JlZm9yZScpXG4gICAgICBpZiAoYmVmb3JlKSB0aGlzLmJ1aWxkZXIoYmVmb3JlKVxuICAgICAgdGhpcy5zdHJpbmdpZnkoY2hpbGQsIGxhc3QgIT09IGkgfHwgc2VtaWNvbG9uKVxuICAgIH1cbiAgfVxuXG4gIGNvbW1lbnQobm9kZSkge1xuICAgIGxldCBsZWZ0ID0gdGhpcy5yYXcobm9kZSwgJ2xlZnQnLCAnY29tbWVudExlZnQnKVxuICAgIGxldCByaWdodCA9IHRoaXMucmF3KG5vZGUsICdyaWdodCcsICdjb21tZW50UmlnaHQnKVxuICAgIHRoaXMuYnVpbGRlcignLyonICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0ICsgJyovJywgbm9kZSlcbiAgfVxuXG4gIGRlY2wobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgbGV0IGJldHdlZW4gPSB0aGlzLnJhdyhub2RlLCAnYmV0d2VlbicsICdjb2xvbicpXG4gICAgbGV0IHN0cmluZyA9IG5vZGUucHJvcCArIGJldHdlZW4gKyB0aGlzLnJhd1ZhbHVlKG5vZGUsICd2YWx1ZScpXG5cbiAgICBpZiAobm9kZS5pbXBvcnRhbnQpIHtcbiAgICAgIHN0cmluZyArPSBub2RlLnJhd3MuaW1wb3J0YW50IHx8ICcgIWltcG9ydGFudCdcbiAgICB9XG5cbiAgICBpZiAoc2VtaWNvbG9uKSBzdHJpbmcgKz0gJzsnXG4gICAgdGhpcy5idWlsZGVyKHN0cmluZywgbm9kZSlcbiAgfVxuXG4gIGRvY3VtZW50KG5vZGUpIHtcbiAgICB0aGlzLmJvZHkobm9kZSlcbiAgfVxuXG4gIHJhdyhub2RlLCBvd24sIGRldGVjdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIGlmICghZGV0ZWN0KSBkZXRlY3QgPSBvd25cblxuICAgIC8vIEFscmVhZHkgaGFkXG4gICAgaWYgKG93bikge1xuICAgICAgdmFsdWUgPSBub2RlLnJhd3Nbb3duXVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudFxuXG4gICAgaWYgKGRldGVjdCA9PT0gJ2JlZm9yZScpIHtcbiAgICAgIC8vIEhhY2sgZm9yIGZpcnN0IHJ1bGUgaW4gQ1NTXG4gICAgICBpZiAoIXBhcmVudCB8fCAocGFyZW50LnR5cGUgPT09ICdyb290JyAmJiBwYXJlbnQuZmlyc3QgPT09IG5vZGUpKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuXG4gICAgICAvLyBgcm9vdGAgbm9kZXMgaW4gYGRvY3VtZW50YCBzaG91bGQgdXNlIG9ubHkgdGhlaXIgb3duIHJhd3NcbiAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmxvYXRpbmcgY2hpbGQgd2l0aG91dCBwYXJlbnRcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuIERFRkFVTFRfUkFXW2RldGVjdF1cblxuICAgIC8vIERldGVjdCBzdHlsZSBieSBvdGhlciBub2Rlc1xuICAgIGxldCByb290ID0gbm9kZS5yb290KClcbiAgICBpZiAoIXJvb3QucmF3Q2FjaGUpIHJvb3QucmF3Q2FjaGUgPSB7fVxuICAgIGlmICh0eXBlb2Ygcm9vdC5yYXdDYWNoZVtkZXRlY3RdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHJvb3QucmF3Q2FjaGVbZGV0ZWN0XVxuICAgIH1cblxuICAgIGlmIChkZXRlY3QgPT09ICdiZWZvcmUnIHx8IGRldGVjdCA9PT0gJ2FmdGVyJykge1xuICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlQWZ0ZXIobm9kZSwgZGV0ZWN0KVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWV0aG9kID0gJ3JhdycgKyBjYXBpdGFsaXplKGRldGVjdClcbiAgICAgIGlmICh0aGlzW21ldGhvZF0pIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzW21ldGhvZF0ocm9vdCwgbm9kZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgICAgICB2YWx1ZSA9IGkucmF3c1tvd25dXG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB2YWx1ZSA9IERFRkFVTFRfUkFXW2RldGVjdF1cblxuICAgIHJvb3QucmF3Q2FjaGVbZGV0ZWN0XSA9IHZhbHVlXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVDbG9zZShyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmFmdGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmFmdGVyXG4gICAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCdcXG4nKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcUy9nLCAnJylcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZUNvbW1lbnQocm9vdCwgbm9kZSkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2Fsa0NvbW1lbnRzKGkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZWZvcmVcbiAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCdcXG4nKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVEZWNsJylcbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcUy9nLCAnJylcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVEZWNsKHJvb3QsIG5vZGUpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGtEZWNscyhpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlXG4gICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpXG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgJycpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlT3Blbihyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkudHlwZSAhPT0gJ2RlY2wnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJldHdlZW5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVSdWxlKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiAoaS5wYXJlbnQgIT09IHJvb3QgfHwgcm9vdC5maXJzdCAhPT0gaSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZVxuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJylcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgJycpXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdDb2xvbihyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrRGVjbHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZXR3ZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZXR3ZWVuLnJlcGxhY2UoL1teXFxzOl0vZywgJycpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdFbXB0eUJvZHkocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIGkubm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmFmdGVyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3SW5kZW50KHJvb3QpIHtcbiAgICBpZiAocm9vdC5yYXdzLmluZGVudCkgcmV0dXJuIHJvb3QucmF3cy5pbmRlbnRcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBsZXQgcCA9IGkucGFyZW50XG4gICAgICBpZiAocCAmJiBwICE9PSByb290ICYmIHAucGFyZW50ICYmIHAucGFyZW50ID09PSByb290KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsZXQgcGFydHMgPSBpLnJhd3MuYmVmb3JlLnNwbGl0KCdcXG4nKVxuICAgICAgICAgIHZhbHVlID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV1cbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcUy9nLCAnJylcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdTZW1pY29sb24ocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIGkubm9kZXMubGVuZ3RoICYmIGkubGFzdC50eXBlID09PSAnZGVjbCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3Muc2VtaWNvbG9uXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3VmFsdWUobm9kZSwgcHJvcCkge1xuICAgIGxldCB2YWx1ZSA9IG5vZGVbcHJvcF1cbiAgICBsZXQgcmF3ID0gbm9kZS5yYXdzW3Byb3BdXG4gICAgaWYgKHJhdyAmJiByYXcudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmF3LnJhd1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcm9vdChub2RlKSB7XG4gICAgdGhpcy5ib2R5KG5vZGUpXG4gICAgaWYgKG5vZGUucmF3cy5hZnRlcikgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5hZnRlcilcbiAgfVxuXG4gIHJ1bGUobm9kZSkge1xuICAgIHRoaXMuYmxvY2sobm9kZSwgdGhpcy5yYXdWYWx1ZShub2RlLCAnc2VsZWN0b3InKSlcbiAgICBpZiAobm9kZS5yYXdzLm93blNlbWljb2xvbikge1xuICAgICAgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5vd25TZW1pY29sb24sIG5vZGUsICdlbmQnKVxuICAgIH1cbiAgfVxuXG4gIHN0cmluZ2lmeShub2RlLCBzZW1pY29sb24pIHtcbiAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICBpZiAoIXRoaXNbbm9kZS50eXBlXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVW5rbm93biBBU1Qgbm9kZSB0eXBlICcgK1xuICAgICAgICAgIG5vZGUudHlwZSArXG4gICAgICAgICAgJy4gJyArXG4gICAgICAgICAgJ01heWJlIHlvdSBuZWVkIHRvIGNoYW5nZSBQb3N0Q1NTIHN0cmluZ2lmaWVyLidcbiAgICAgIClcbiAgICB9XG4gICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICB0aGlzW25vZGUudHlwZV0obm9kZSwgc2VtaWNvbG9uKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5naWZpZXJcblN0cmluZ2lmaWVyLmRlZmF1bHQgPSBTdHJpbmdpZmllclxuIiwiJ3VzZSBzdHJpY3QnXG5cbmxldCBTdHJpbmdpZmllciA9IHJlcXVpcmUoJy4vc3RyaW5naWZpZXInKVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkobm9kZSwgYnVpbGRlcikge1xuICBsZXQgc3RyID0gbmV3IFN0cmluZ2lmaWVyKGJ1aWxkZXIpXG4gIHN0ci5zdHJpbmdpZnkobm9kZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbnN0cmluZ2lmeS5kZWZhdWx0ID0gc3RyaW5naWZ5XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMuaXNDbGVhbiA9IFN5bWJvbCgnaXNDbGVhbicpXG5cbm1vZHVsZS5leHBvcnRzLm15ID0gU3ltYm9sKCdteScpXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgU0lOR0xFX1FVT1RFID0gXCInXCIuY2hhckNvZGVBdCgwKVxuY29uc3QgRE9VQkxFX1FVT1RFID0gJ1wiJy5jaGFyQ29kZUF0KDApXG5jb25zdCBCQUNLU0xBU0ggPSAnXFxcXCcuY2hhckNvZGVBdCgwKVxuY29uc3QgU0xBU0ggPSAnLycuY2hhckNvZGVBdCgwKVxuY29uc3QgTkVXTElORSA9ICdcXG4nLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNQQUNFID0gJyAnLmNoYXJDb2RlQXQoMClcbmNvbnN0IEZFRUQgPSAnXFxmJy5jaGFyQ29kZUF0KDApXG5jb25zdCBUQUIgPSAnXFx0Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBDUiA9ICdcXHInLmNoYXJDb2RlQXQoMClcbmNvbnN0IE9QRU5fU1FVQVJFID0gJ1snLmNoYXJDb2RlQXQoMClcbmNvbnN0IENMT1NFX1NRVUFSRSA9ICddJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX1BBUkVOVEhFU0VTID0gJygnLmNoYXJDb2RlQXQoMClcbmNvbnN0IENMT1NFX1BBUkVOVEhFU0VTID0gJyknLmNoYXJDb2RlQXQoMClcbmNvbnN0IE9QRU5fQ1VSTFkgPSAneycuY2hhckNvZGVBdCgwKVxuY29uc3QgQ0xPU0VfQ1VSTFkgPSAnfScuY2hhckNvZGVBdCgwKVxuY29uc3QgU0VNSUNPTE9OID0gJzsnLmNoYXJDb2RlQXQoMClcbmNvbnN0IEFTVEVSSVNLID0gJyonLmNoYXJDb2RlQXQoMClcbmNvbnN0IENPTE9OID0gJzonLmNoYXJDb2RlQXQoMClcbmNvbnN0IEFUID0gJ0AnLmNoYXJDb2RlQXQoMClcblxuY29uc3QgUkVfQVRfRU5EID0gL1tcXHRcXG5cXGZcXHIgXCIjJygpLztbXFxcXFxcXXt9XS9nXG5jb25zdCBSRV9XT1JEX0VORCA9IC9bXFx0XFxuXFxmXFxyICFcIiMnKCk6O0BbXFxcXFxcXXt9XXxcXC8oPz1cXCopL2dcbmNvbnN0IFJFX0JBRF9CUkFDS0VUID0gLy5bXFxyXFxuXCInKC9cXFxcXS9cbmNvbnN0IFJFX0hFWF9FU0NBUEUgPSAvW1xcZGEtZl0vaVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRva2VuaXplcihpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG4gIGxldCBjc3MgPSBpbnB1dC5jc3MudmFsdWVPZigpXG4gIGxldCBpZ25vcmUgPSBvcHRpb25zLmlnbm9yZUVycm9yc1xuXG4gIGxldCBjb2RlLCBuZXh0LCBxdW90ZSwgY29udGVudCwgZXNjYXBlXG4gIGxldCBlc2NhcGVkLCBlc2NhcGVQb3MsIHByZXYsIG4sIGN1cnJlbnRUb2tlblxuXG4gIGxldCBsZW5ndGggPSBjc3MubGVuZ3RoXG4gIGxldCBwb3MgPSAwXG4gIGxldCBidWZmZXIgPSBbXVxuICBsZXQgcmV0dXJuZWQgPSBbXVxuXG4gIGZ1bmN0aW9uIHBvc2l0aW9uKCkge1xuICAgIHJldHVybiBwb3NcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuY2xvc2VkKHdoYXQpIHtcbiAgICB0aHJvdyBpbnB1dC5lcnJvcignVW5jbG9zZWQgJyArIHdoYXQsIHBvcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZE9mRmlsZSgpIHtcbiAgICByZXR1cm4gcmV0dXJuZWQubGVuZ3RoID09PSAwICYmIHBvcyA+PSBsZW5ndGhcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRUb2tlbihvcHRzKSB7XG4gICAgaWYgKHJldHVybmVkLmxlbmd0aCkgcmV0dXJuIHJldHVybmVkLnBvcCgpXG4gICAgaWYgKHBvcyA+PSBsZW5ndGgpIHJldHVyblxuXG4gICAgbGV0IGlnbm9yZVVuY2xvc2VkID0gb3B0cyA/IG9wdHMuaWdub3JlVW5jbG9zZWQgOiBmYWxzZVxuXG4gICAgY29kZSA9IGNzcy5jaGFyQ29kZUF0KHBvcylcblxuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgY2FzZSBORVdMSU5FOlxuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgIGNhc2UgVEFCOlxuICAgICAgY2FzZSBDUjpcbiAgICAgIGNhc2UgRkVFRDoge1xuICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQobmV4dClcbiAgICAgICAgfSB3aGlsZSAoXG4gICAgICAgICAgY29kZSA9PT0gU1BBQ0UgfHxcbiAgICAgICAgICBjb2RlID09PSBORVdMSU5FIHx8XG4gICAgICAgICAgY29kZSA9PT0gVEFCIHx8XG4gICAgICAgICAgY29kZSA9PT0gQ1IgfHxcbiAgICAgICAgICBjb2RlID09PSBGRUVEXG4gICAgICAgIClcblxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3NwYWNlJywgY3NzLnNsaWNlKHBvcywgbmV4dCldXG4gICAgICAgIHBvcyA9IG5leHQgLSAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgT1BFTl9TUVVBUkU6XG4gICAgICBjYXNlIENMT1NFX1NRVUFSRTpcbiAgICAgIGNhc2UgT1BFTl9DVVJMWTpcbiAgICAgIGNhc2UgQ0xPU0VfQ1VSTFk6XG4gICAgICBjYXNlIENPTE9OOlxuICAgICAgY2FzZSBTRU1JQ09MT046XG4gICAgICBjYXNlIENMT1NFX1BBUkVOVEhFU0VTOiB7XG4gICAgICAgIGxldCBjb250cm9sQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSlcbiAgICAgICAgY3VycmVudFRva2VuID0gW2NvbnRyb2xDaGFyLCBjb250cm9sQ2hhciwgcG9zXVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIE9QRU5fUEFSRU5USEVTRVM6IHtcbiAgICAgICAgcHJldiA9IGJ1ZmZlci5sZW5ndGggPyBidWZmZXIucG9wKClbMV0gOiAnJ1xuICAgICAgICBuID0gY3NzLmNoYXJDb2RlQXQocG9zICsgMSlcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXYgPT09ICd1cmwnICYmXG4gICAgICAgICAgbiAhPT0gU0lOR0xFX1FVT1RFICYmXG4gICAgICAgICAgbiAhPT0gRE9VQkxFX1FVT1RFICYmXG4gICAgICAgICAgbiAhPT0gU1BBQ0UgJiZcbiAgICAgICAgICBuICE9PSBORVdMSU5FICYmXG4gICAgICAgICAgbiAhPT0gVEFCICYmXG4gICAgICAgICAgbiAhPT0gRkVFRCAmJlxuICAgICAgICAgIG4gIT09IENSXG4gICAgICAgICkge1xuICAgICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBlc2NhcGVkID0gZmFsc2VcbiAgICAgICAgICAgIG5leHQgPSBjc3MuaW5kZXhPZignKScsIG5leHQgKyAxKVxuICAgICAgICAgICAgaWYgKG5leHQgPT09IC0xKSB7XG4gICAgICAgICAgICAgIGlmIChpZ25vcmUgfHwgaWdub3JlVW5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1bmNsb3NlZCgnYnJhY2tldCcpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVzY2FwZVBvcyA9IG5leHRcbiAgICAgICAgICAgIHdoaWxlIChjc3MuY2hhckNvZGVBdChlc2NhcGVQb3MgLSAxKSA9PT0gQkFDS1NMQVNIKSB7XG4gICAgICAgICAgICAgIGVzY2FwZVBvcyAtPSAxXG4gICAgICAgICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKGVzY2FwZWQpXG5cbiAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ2JyYWNrZXRzJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdXG5cbiAgICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcpJywgcG9zICsgMSlcbiAgICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpXG5cbiAgICAgICAgICBpZiAobmV4dCA9PT0gLTEgfHwgUkVfQkFEX0JSQUNLRVQudGVzdChjb250ZW50KSkge1xuICAgICAgICAgICAgY3VycmVudFRva2VuID0gWycoJywgJygnLCBwb3NdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYnJhY2tldHMnLCBjb250ZW50LCBwb3MsIG5leHRdXG4gICAgICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBTSU5HTEVfUVVPVEU6XG4gICAgICBjYXNlIERPVUJMRV9RVU9URToge1xuICAgICAgICBxdW90ZSA9IGNvZGUgPT09IFNJTkdMRV9RVU9URSA/IFwiJ1wiIDogJ1wiJ1xuICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBlc2NhcGVkID0gZmFsc2VcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YocXVvdGUsIG5leHQgKyAxKVxuICAgICAgICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKGlnbm9yZSB8fCBpZ25vcmVVbmNsb3NlZCkge1xuICAgICAgICAgICAgICBuZXh0ID0gcG9zICsgMVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdW5jbG9zZWQoJ3N0cmluZycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVzY2FwZVBvcyA9IG5leHRcbiAgICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgICAgZXNjYXBlUG9zIC09IDFcbiAgICAgICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZXNjYXBlZClcblxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3N0cmluZycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XVxuICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgQVQ6IHtcbiAgICAgICAgUkVfQVRfRU5ELmxhc3RJbmRleCA9IHBvcyArIDFcbiAgICAgICAgUkVfQVRfRU5ELnRlc3QoY3NzKVxuICAgICAgICBpZiAoUkVfQVRfRU5ELmxhc3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgIG5leHQgPSBjc3MubGVuZ3RoIC0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQgPSBSRV9BVF9FTkQubGFzdEluZGV4IC0gMlxuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFRva2VuID0gWydhdC13b3JkJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdXG5cbiAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIEJBQ0tTTEFTSDoge1xuICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgIGVzY2FwZSA9IHRydWVcbiAgICAgICAgd2hpbGUgKGNzcy5jaGFyQ29kZUF0KG5leHQgKyAxKSA9PT0gQkFDS1NMQVNIKSB7XG4gICAgICAgICAgbmV4dCArPSAxXG4gICAgICAgICAgZXNjYXBlID0gIWVzY2FwZVxuICAgICAgICB9XG4gICAgICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChuZXh0ICsgMSlcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVzY2FwZSAmJlxuICAgICAgICAgIGNvZGUgIT09IFNMQVNIICYmXG4gICAgICAgICAgY29kZSAhPT0gU1BBQ0UgJiZcbiAgICAgICAgICBjb2RlICE9PSBORVdMSU5FICYmXG4gICAgICAgICAgY29kZSAhPT0gVEFCICYmXG4gICAgICAgICAgY29kZSAhPT0gQ1IgJiZcbiAgICAgICAgICBjb2RlICE9PSBGRUVEXG4gICAgICAgICkge1xuICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIGlmIChSRV9IRVhfRVNDQVBFLnRlc3QoY3NzLmNoYXJBdChuZXh0KSkpIHtcbiAgICAgICAgICAgIHdoaWxlIChSRV9IRVhfRVNDQVBFLnRlc3QoY3NzLmNoYXJBdChuZXh0ICsgMSkpKSB7XG4gICAgICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNzcy5jaGFyQ29kZUF0KG5leHQgKyAxKSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgICAgICAgbmV4dCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFRva2VuID0gWyd3b3JkJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdXG5cbiAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmIChjb2RlID09PSBTTEFTSCAmJiBjc3MuY2hhckNvZGVBdChwb3MgKyAxKSA9PT0gQVNURVJJU0spIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoJyovJywgcG9zICsgMikgKyAxXG4gICAgICAgICAgaWYgKG5leHQgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmUgfHwgaWdub3JlVW5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVuY2xvc2VkKCdjb21tZW50JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ2NvbW1lbnQnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF1cbiAgICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgUkVfV09SRF9FTkQubGFzdEluZGV4ID0gcG9zICsgMVxuICAgICAgICAgIFJFX1dPUkRfRU5ELnRlc3QoY3NzKVxuICAgICAgICAgIGlmIChSRV9XT1JEX0VORC5sYXN0SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIG5leHQgPSBjc3MubGVuZ3RoIC0gMVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0ID0gUkVfV09SRF9FTkQubGFzdEluZGV4IC0gMlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XVxuICAgICAgICAgIGJ1ZmZlci5wdXNoKGN1cnJlbnRUb2tlbilcbiAgICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIH1cblxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIHBvcysrXG4gICAgcmV0dXJuIGN1cnJlbnRUb2tlblxuICB9XG5cbiAgZnVuY3Rpb24gYmFjayh0b2tlbikge1xuICAgIHJldHVybmVkLnB1c2godG9rZW4pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJhY2ssXG4gICAgZW5kT2ZGaWxlLFxuICAgIG5leHRUb2tlbixcbiAgICBwb3NpdGlvblxuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4ndXNlIHN0cmljdCdcblxubGV0IHByaW50ZWQgPSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdhcm5PbmNlKG1lc3NhZ2UpIHtcbiAgaWYgKHByaW50ZWRbbWVzc2FnZV0pIHJldHVyblxuICBwcmludGVkW21lc3NhZ2VdID0gdHJ1ZVxuXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS53YXJuKSB7XG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBXYXJuaW5nIHtcbiAgY29uc3RydWN0b3IodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gJ3dhcm5pbmcnXG4gICAgdGhpcy50ZXh0ID0gdGV4dFxuXG4gICAgaWYgKG9wdHMubm9kZSAmJiBvcHRzLm5vZGUuc291cmNlKSB7XG4gICAgICBsZXQgcmFuZ2UgPSBvcHRzLm5vZGUucmFuZ2VCeShvcHRzKVxuICAgICAgdGhpcy5saW5lID0gcmFuZ2Uuc3RhcnQubGluZVxuICAgICAgdGhpcy5jb2x1bW4gPSByYW5nZS5zdGFydC5jb2x1bW5cbiAgICAgIHRoaXMuZW5kTGluZSA9IHJhbmdlLmVuZC5saW5lXG4gICAgICB0aGlzLmVuZENvbHVtbiA9IHJhbmdlLmVuZC5jb2x1bW5cbiAgICB9XG5cbiAgICBmb3IgKGxldCBvcHQgaW4gb3B0cykgdGhpc1tvcHRdID0gb3B0c1tvcHRdXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBpZiAodGhpcy5ub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmVycm9yKHRoaXMudGV4dCwge1xuICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgcGx1Z2luOiB0aGlzLnBsdWdpbixcbiAgICAgICAgd29yZDogdGhpcy53b3JkXG4gICAgICB9KS5tZXNzYWdlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGx1Z2luKSB7XG4gICAgICByZXR1cm4gdGhpcy5wbHVnaW4gKyAnOiAnICsgdGhpcy50ZXh0XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudGV4dFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2FybmluZ1xuV2FybmluZy5kZWZhdWx0ID0gV2FybmluZ1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwibGV0IHVybEFscGhhYmV0ID1cbiAgJ3VzZWFuZG9tLTI2VDE5ODM0MFBYNzVweEpBQ0tWRVJZTUlOREJVU0hXT0xGX0dRWmJmZ2hqa2xxdnd5enJpY3QnXG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIGRlZmF1bHRTaXplID0gMjEpID0+IHtcbiAgcmV0dXJuIChzaXplID0gZGVmYXVsdFNpemUpID0+IHtcbiAgICBsZXQgaWQgPSAnJ1xuICAgIGxldCBpID0gc2l6ZVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlkICs9IGFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKSB8IDBdXG4gICAgfVxuICAgIHJldHVybiBpZFxuICB9XG59XG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgaSA9IHNpemVcbiAgd2hpbGUgKGktLSkge1xuICAgIGlkICs9IHVybEFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogNjQpIHwgMF1cbiAgfVxuICByZXR1cm4gaWRcbn1cbm1vZHVsZS5leHBvcnRzID0geyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0IH1cbiIsImltcG9ydCBwb3N0Y3NzIGZyb20gJy4vcG9zdGNzcy5qcydcblxuZXhwb3J0IGRlZmF1bHQgcG9zdGNzc1xuXG5leHBvcnQgY29uc3Qgc3RyaW5naWZ5ID0gcG9zdGNzcy5zdHJpbmdpZnlcbmV4cG9ydCBjb25zdCBmcm9tSlNPTiA9IHBvc3Rjc3MuZnJvbUpTT05cbmV4cG9ydCBjb25zdCBwbHVnaW4gPSBwb3N0Y3NzLnBsdWdpblxuZXhwb3J0IGNvbnN0IHBhcnNlID0gcG9zdGNzcy5wYXJzZVxuZXhwb3J0IGNvbnN0IGxpc3QgPSBwb3N0Y3NzLmxpc3RcblxuZXhwb3J0IGNvbnN0IGRvY3VtZW50ID0gcG9zdGNzcy5kb2N1bWVudFxuZXhwb3J0IGNvbnN0IGNvbW1lbnQgPSBwb3N0Y3NzLmNvbW1lbnRcbmV4cG9ydCBjb25zdCBhdFJ1bGUgPSBwb3N0Y3NzLmF0UnVsZVxuZXhwb3J0IGNvbnN0IHJ1bGUgPSBwb3N0Y3NzLnJ1bGVcbmV4cG9ydCBjb25zdCBkZWNsID0gcG9zdGNzcy5kZWNsXG5leHBvcnQgY29uc3Qgcm9vdCA9IHBvc3Rjc3Mucm9vdFxuXG5leHBvcnQgY29uc3QgQ3NzU3ludGF4RXJyb3IgPSBwb3N0Y3NzLkNzc1N5bnRheEVycm9yXG5leHBvcnQgY29uc3QgRGVjbGFyYXRpb24gPSBwb3N0Y3NzLkRlY2xhcmF0aW9uXG5leHBvcnQgY29uc3QgQ29udGFpbmVyID0gcG9zdGNzcy5Db250YWluZXJcbmV4cG9ydCBjb25zdCBQcm9jZXNzb3IgPSBwb3N0Y3NzLlByb2Nlc3NvclxuZXhwb3J0IGNvbnN0IERvY3VtZW50ID0gcG9zdGNzcy5Eb2N1bWVudFxuZXhwb3J0IGNvbnN0IENvbW1lbnQgPSBwb3N0Y3NzLkNvbW1lbnRcbmV4cG9ydCBjb25zdCBXYXJuaW5nID0gcG9zdGNzcy5XYXJuaW5nXG5leHBvcnQgY29uc3QgQXRSdWxlID0gcG9zdGNzcy5BdFJ1bGVcbmV4cG9ydCBjb25zdCBSZXN1bHQgPSBwb3N0Y3NzLlJlc3VsdFxuZXhwb3J0IGNvbnN0IElucHV0ID0gcG9zdGNzcy5JbnB1dFxuZXhwb3J0IGNvbnN0IFJ1bGUgPSBwb3N0Y3NzLlJ1bGVcbmV4cG9ydCBjb25zdCBSb290ID0gcG9zdGNzcy5Sb290XG5leHBvcnQgY29uc3QgTm9kZSA9IHBvc3Rjc3MuTm9kZVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9nYW1lU3RhcnQuanNcIik7XG4iLCIiXSwibmFtZXMiOlsidXBkYXRlU2NyZWVuIiwiYXR0YWNrT3RoZXIiLCJodW1hbiIsImNvbXB1dGVyIiwiY2VsbCIsInJvdyIsInBhcnNlSW50IiwiY2xhc3NMaXN0Iiwic2xpY2UiLCJjb2wiLCJib2FyZCIsImF0dGFjayIsImFpQXR0YWNrIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiU2hpcCIsInNoaXBMZW5ndGgiLCJzaGlwcyIsImxlbmd0aCIsImdvdEhpdCIsInN1bmsiLCJoaXQiLCJpc1N1bmsiLCJwYXJzZSIsIlJhbmRvbWl6ZSIsIlBsYXllciIsImdhbWVTdGFydCIsInN0YXJ0U2NyZWVuIiwibWFrZVVJIiwibG9jYWxTdG9yYWdlIiwiY2xlYXIiLCJzdGFydENvb3JkcyIsImlubmVySFRNTCIsImkiLCJqIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImNvbmNhdCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsImN1cnJlbnRTaGlwIiwicGFydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJ0cmltIiwic3R5bGUiLCJib3hTaGFkb3ciLCJib3JkZXJDb2xvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwic2hpcCIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwic2l6ZSIsInJlcGxhY2UiLCJpbmNsdWRlcyIsImlzU2FmZSIsImdldEl0ZW0iLCJjb29yZCIsInZlcnRpY2FsIiwiYmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInByZXZlbnREZWZhdWx0IiwiY2VsbEluZGV4IiwibWF4SW5kZXgiLCJ0b1N0cmluZyIsImlzRHJvcHBlZCIsInB1c2giLCJuZXh0Q2VsbEluZGV4IiwiY2VsbFRvRmlsbCIsInJlbW92ZSIsInNoaXBST1dDT09SRCIsInNoaXBDT0xDT09SRCIsImlzVmVydGljYWwiLCJzZWxlY3RlZFNoaXAiLCJib2FyZFNoaXAiLCJhaUJvYXJkU2hpcCIsIkdhbWVCb2FyZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsImdldEJvYXJkIiwic2hpcHNCb2FyZGVkIiwidmVydGljYWxQbGFjZSIsInRlbXBCYWNrVHJhY2siLCJlbmRpbmciLCJjb29yZHMiLCJiYWNrVHJhY2tWZXJ0aWNhbCIsImNvb3JkaW5hdGVzIiwiaG9yaXpvbnRhbFBsYWNlIiwiYmFja1RyYWNrSG9yaXpvbnRhbCIsIlBsYWNlU2hpcCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImluZGV4IiwicmVjaWV2ZUF0dGFjayIsImVuZW15Qm9hcmQiLCJoaXRTaGlwIiwiZmlsdGVyIiwic29tZSIsInVwZGF0ZUdhbWUiLCJlbmRHYW1lIiwiZmluZEluZGV4IiwicyIsInNwbGljZSIsIm5hbWUiLCJfbG9vcCIsIl9sb29wMiIsIl9qIiwidGVtcENvb3JkcyIsImdhbWVCb2FyZEZhY3QiLCJzaGlwQ29vcmRzIiwiaHVtYW5CIiwiY2hpbGROb2RlcyIsInBsYXllck5hbWUiLCJpc0FJIiwiTWF0aCIsInJhbmRvbSIsImlzVmFsaWRTcG90IiwiZmxvb3IiLCJlQm9hcmQiLCJhaUIiLCJoVUkiLCJhVUkiXSwic291cmNlUm9vdCI6IiJ9