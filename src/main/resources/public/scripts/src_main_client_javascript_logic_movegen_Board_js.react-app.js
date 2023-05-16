/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/client/javascript/logic/movegen/Board.js":
/*!***********************************************************!*\
  !*** ./src/main/client/javascript/logic/movegen/Board.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Board": () => (/* binding */ Board),
/* harmony export */   "colorEnum": () => (/* binding */ colorEnum),
/* harmony export */   "specialMovesEnum": () => (/* binding */ specialMovesEnum)
/* harmony export */ });
/* harmony import */ var _utils_MoveTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/MoveTree */ "./src/main/client/javascript/logic/utils/MoveTree.js");
/* harmony import */ var _utils_Parsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Parsers */ "./src/main/client/javascript/logic/utils/Parsers.js");
/* harmony import */ var _PieceControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PieceControl */ "./src/main/client/javascript/logic/movegen/PieceControl.js");
/* harmony import */ var _Reporter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Reporter */ "./src/main/client/javascript/logic/movegen/Reporter.js");
/* harmony import */ var _Variant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Variant */ "./src/main/client/javascript/logic/movegen/Variant.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }






var colorEnum = {
  get r() {
    return 0;
  },

  get b() {
    return 1;
  },

  get y() {
    return 2;
  },

  get g() {
    return 3;
  },

  get Red() {
    return 0;
  },

  get Blue() {
    return 1;
  },

  get Yellow() {
    return 2;
  },

  get Green() {
    return 3;
  },

  get '0'() {
    return 'r';
  },

  get '1'() {
    return 'b';
  },

  get '2'() {
    return 'y';
  },

  get '3'() {
    return 'g';
  }

};
var specialMovesEnum = {
  get resign() {
    return 'R';
  },

  get stalemate() {
    return 'S';
  },

  get draw() {
    return 'D';
  },

  get pass() {
    return 'P';
  },

  get timeout() {
    return 'T';
  }

};
var variantTypes = {
  solo: Symbol(),
  ffa: Symbol(),
  teams: Symbol()
};
var baseImmunes = Array(4).fill(false);

var createBasePreGeneratedAttacks = function createBasePreGeneratedAttacks() {
  return {
    hoppingPieces: Array.from({
      length: 14
    }, function () {
      return Array.from({
        length: 14
      }, function () {
        return 0;
      });
    }),
    slidingPieces: Array.from({
      length: 14
    }, function () {
      return Array.from({
        length: 14
      }, function () {
        return 0;
      });
    }),
    hoppingPieceLines: [],
    slidingPiecesLines: [],
    slidingPiecesRayTracing: [],
    attackingColors: Array.from({
      length: 14
    }, function () {
      return Array.from({
        length: 14
      }, function () {
        return 0;
      });
    })
  };
};

var Board = /*#__PURE__*/function () {
  // type = static, game, puzzle
  function Board(type, pgn4) {
    var _this = this,
        _tagFunctions;

    _classCallCheck(this, Board);

    this.controls = new Map();
    this.controlsSettings = new Map();
    this.data = {};
    this.moves = (0,_utils_MoveTree__WEBPACK_IMPORTED_MODULE_0__.createMoveTree)();
    this.preGeneratedAttacks = createBasePreGeneratedAttacks();
    this.board = [];
    this.boardMemo = [];
    this.isComplexSetup = {
      hasComplexPieces: false,
      hasComplexRules: false,
      isComplex: function isComplex() {
        return this.hasComplexPieces || this.hasComplexRules;
      }
    };
    this.reporter = new _Reporter__WEBPACK_IMPORTED_MODULE_3__.Reporter(Object.values(_Reporter__WEBPACK_IMPORTED_MODULE_3__.topicLines));
    this.gameData = {
      gameNumber: undefined,
      timeControl: undefined,
      players: [{}, {}, {}, {}],
      site: undefined,
      date: undefined,
      result: undefined,
      termination: undefined
    };
    this.gameType = {
      type: variantTypes.ffa,
      teamSettings: {
        firstTeamColors: undefined,
        secondTeamColors: undefined
      },
      getBaseColors: function getBaseColors(color) {
        if (this.isFFA()) {
          return Array(4).fill(undefined).map(function (_, i) {
            return i === color;
          });
        } else {
          return this.teamSettings.firstTeamColors[color] ? this.teamSettings.firstTeamColors : this.teamSettings.secondTeamColors;
        }
      },
      isFFA: function isFFA() {
        return this.type === variantTypes.solo || this.type === variantTypes.ffa;
      }
    };
    var pgn4Tags, pgn4Moves;
    var match = pgn4.match(/(?=1\.\s*?[xA-ZΑ-ωa-n0-9-])/);

    if (match !== null && match !== void 0 && match.index) {
      pgn4Moves = pgn4.substring(match.index);
      pgn4Tags = pgn4.substring(0, match.index).split("]");
      this.moves.moves = (0,_utils_Parsers__WEBPACK_IMPORTED_MODULE_1__.parsePGN4moves)(pgn4Moves);
    } else {
      pgn4Tags = pgn4.split("]");
    }

    var tagFunctions = (_tagFunctions = {}, _defineProperty(_tagFunctions, 'StartFen4', {
      func: function func(fen4) {
        var _parseFEN = (0,_utils_Parsers__WEBPACK_IMPORTED_MODULE_1__.parseFEN4)(fen4, function (letter) {
          if (letter.startsWith("d") || letter.length === 1) return;
          var realLetter = letter.charAt(1);
          if (_this.controls.has(realLetter)) return;
          var information = _PieceControl__WEBPACK_IMPORTED_MODULE_2__.PieceControl.getConstructor(realLetter);
          var control = Reflect.construct(information.construct, []);
          control.setReporter(_this.reporter);

          _this.controls.set(realLetter, control);

          _this.controlsSettings.set(realLetter, information);

          if (information.isComplex) _this.isComplexSetup.hasComplexPieces = true;
        });

        _this.board = _parseFEN.board;
        _this.data = _parseFEN.data;
      },
      arguments: null
    }), _defineProperty(_tagFunctions, 'RuleVariants', {
      func: function func(rules) {
        var list = (0,_Variant__WEBPACK_IMPORTED_MODULE_4__.parseGameRules)(rules);

        _this.reporter.addGameRules(list);
      },
      arguments: null
    }), _defineProperty(_tagFunctions, 'Variant', {
      func: function func(variant) {
        switch (variant) {
          case "FFA":
            _this.gameType.type = variantTypes.ffa;
            break;

          case "Solo":
            _this.gameType.type = variantTypes.solo;
            break;

          case "Teams":
            _this.gameType.type = variantTypes.teams;
            _this.gameType.teamSettings.firstTeamColors = [true, false, true, false];
            _this.gameType.teamSettings.secondTeamColors = [false, true, false, true];
        }
      },
      arguments: null
    }), _defineProperty(_tagFunctions, 'Date', {
      func: function func(date) {
        _this.gameData.date = new Date(date);
      },
      arguments: null
    }), _defineProperty(_tagFunctions, 'GameNr', {
      func: function func(number) {
        if (!isNaN(number)) _this.gameData.gameNumber = parseInt(number, 10);
      },
      arguments: null
    }), _defineProperty(_tagFunctions, 'Termination', {
      func: function func(termination) {
        _this.gameData.termination = termination;
      },
      arguments: null
    }), _defineProperty(_tagFunctions, 'Site', {
      func: function func(site) {
        _this.gameData.site = site;
      },
      arguments: null
    }), _defineProperty(_tagFunctions, 'TimeControl', {
      func: function func(tc) {
        _this.gameData.timeControl = tc;
      },
      arguments: null
    }), _tagFunctions);

    var parsePlayerMatch = function parsePlayerMatch(match, content) {
      if (match[2] !== undefined) {
        _this.gameData.players[colorEnum[match[1]]].elo = parseInt(content, 10);
      } else {
        _this.gameData.players[colorEnum[match[1]]].name = content;
      }
    };

    var leftFunctions = new Set(Object.keys(tagFunctions));
    pgn4Tags.forEach(function (tag) {
      var isPresent = false;

      var _iterator = _createForOfIteratorHelper(leftFunctions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          var tagStart = "[".concat(v, " \"");

          if (tag.startsWith(tagStart)) {
            isPresent = true;
            tagFunctions[v].arguments = tag.replace(tagStart, "").slice(0, -1);
            leftFunctions["delete"](v);
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!isPresent) {
        var playerMatch = tag.match(/\[(Red|Blue|Yellow|Green)(Elo)?\s*?"/);
        if (playerMatch) parsePlayerMatch(playerMatch, tag.replace(playerMatch[0], "").slice(0, -1));
      }
    });

    var parseTag = function parseTag(obj) {
      if (obj.arguments) obj.func.call(_this, obj.arguments);
    };

    parseTag(tagFunctions['Variant']);
    parseTag(tagFunctions['StartFen4']);
    parseTag(tagFunctions['RuleVariants']);
    parseTag(tagFunctions['Termination']);
    parseTag(tagFunctions['Date']);
    parseTag(tagFunctions['GameNr']);
    parseTag(tagFunctions['Site']);
    parseTag(tagFunctions['TimeControl']);
    this.reporter.evaluateCase(this.reporter.createShallowCase(_Reporter__WEBPACK_IMPORTED_MODULE_3__.topicLines.boardModification, this.gameType, this));
    this.currentBoard = this.board;
    this.pregenerateAttacks();
    this.insufficientMaterialModule = null;
    var insufficientMaterialGenerationWorker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_main_client_javascript_logic_movegen_Board_js"), __webpack_require__.b));
    insufficientMaterialGenerationWorker.postMessage({
      board: this
    });
  }

  _createClass(Board, [{
    key: "createVirtualCopy",
    value: function createVirtualCopy() {
      var excludedObjects = new WeakSet([this.data, this.board, this.boardMemo, this.isComplexSetup, this.preGeneratedAttacks, this.insufficientMaterialModule]);
      var targetObject = {};

      var _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(Board.prototype)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var property = _step2.value;
          if (property === 'constructor') continue;
          targetObject[property] = Board.prototype[property].bind(targetObject);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var field = _step3.value;

          if (_typeof(this[field]) === 'object') {
            if (excludedObjects.has(this[field])) {
              excludedObjects["delete"](this[field]);
            } else {
              targetObject[field] = this[field];
            }
          } else {
            targetObject[field] = this[field];
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      targetObject.board = [];
      targetObject.boardMemo = [];
      targetObject.isComplexSetup = Object.assign({}, this.isComplexSetup);
      targetObject.preGeneratedAttacks = createBasePreGeneratedAttacks();
      targetObject.data = this.data.createVirtualCopy();
      targetObject.insufficientMaterialModule = this.insufficientMaterialModule;
      return targetObject;
    }
  }, {
    key: "getSquares",
    value: function getSquares() {
      return this.board;
    }
  }, {
    key: "getReporter",
    value: function getReporter() {
      return this.reporter;
    }
  }, {
    key: "getPieceControls",
    value: function getPieceControls() {
      return this.controls;
    }
  }, {
    key: "getBoardData",
    value: function getBoardData() {
      return this.data;
    }
  }, {
    key: "isKingInCheck",
    value: function isKingInCheck(baseColor) {
      var fenRoyal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.data.fenOptions.royal;
      if (!fenRoyal[baseColor]) return false;

      if (this.isComplexSetup) {
        for (var i = 0; i < 14; i++) {
          for (var j = 0; j < 14; j++) {
            var square = this.currentBoard[i][j];
            if (square.length !== 2 || square.startsWith("d")) continue;
            var color = square.charAt(0);
            if (colorEnum[color] === baseColor) continue;
            var control = this.controls.get(square.charAt(1));
            control.setColor(color);
            control.baseRankActive = false;
            control.setCoordinates(this.currentBoard, this.data.fenOptions, [j, i]);
            control.immunePieces = baseImmunes;
            var threats = control.getPseudoLegalMoves();
            if (threats.some(function (a) {
              return a.every(function (v, i) {
                return v === fenRoyal[baseColor][i];
              });
            })) return true;
          }
        }

        return false;
      } else {
        var coordinates = fenRoyal[baseColor];
        return this.preGeneratedAttacks.slidingPieces[coordinates[1]][coordinates[0]] || this.preGeneratedAttacks.hoppingPieces[coordinates[1]][coordinates[0]];
      }
    }
  }, {
    key: "getPlayerPieces",
    value: function getPlayerPieces() {
      var playerPieces = [[], [], [], []];

      for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
          var square = this.currentBoard[i][j];
          var color = colorEnum[square.charAt(0)];
          if (color !== undefined) playerPieces[color].push([j, i]);
        }
      }

      return playerPieces;
    }
  }, {
    key: "getCheckmatesAndStalemates",
    value: function getCheckmatesAndStalemates() {
      var _this2 = this;

      var kingChecks = Array(4).fill(false);
      var legalMoves = Array(4).fill(false);
      var playerPieces = this.getPlayerPieces();

      for (var i = 0; i < playerPieces[this.data.sideToMove].length; i++) {
        var move = playerPieces[this.data.sideToMove][i];

        if (this.getLegalMoves(move[0], move[1]).length) {
          legalMoves[this.data.sideToMove] = true;
          break;
        }
      }

      if (this.isKingInCheck(this.data.sideToMove)) kingChecks[this.data.sideToMove] = true;
      var virtualCopy = this.createVirtualCopy();
      virtualCopy.board = this.board;
      virtualCopy.boardMemo = this.boardMemo;
      virtualCopy.currentBoard = virtualCopy.board;
      playerPieces.forEach(function (moves, p) {
        if (p === _this2.data.sideToMove) return;
        if (!virtualCopy.isComplexSetup.isComplex()) virtualCopy.pregenerateAttacks(p);

        for (var _i = 0; _i < moves.length; _i++) {
          if (virtualCopy.getLegalMoves(moves[_i][0], moves[_i][1], p).length) {
            legalMoves[p] = true;
            break;
          }

          if (virtualCopy.isKingInCheck(p)) kingChecks[p] = true;
        }
      });
      return {
        checkmates: legalMoves.map(function (move, i) {
          return !move && kingChecks[i];
        }),
        stalemates: legalMoves.map(function (move, i) {
          return !move && !kingChecks[i];
        })
      };
    }
  }, {
    key: "runComplexLegalityEvaluationChecks",
    value: function runComplexLegalityEvaluationChecks() {
      if (this.isComplexSetup.hasComplexRules) return;

      for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
          var square = this.currentBoard[i][j];
          var piece = colorEnum[square.charAt(1)];

          if (piece && this.controlsSettings.get(piece) && this.controlsSettings.get(piece).isComplex) {
            this.isComplexSetup.hasComplexPieces = true;
            return;
          }
        }
      }
    }
  }, {
    key: "makeMove",
    value: function makeMove(_startX, _startY, _endX, _endY) {
      var _this$data;

      var _promotion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      (_this$data = this.data).affectOptions.apply(_this$data, [this].concat(Array.prototype.slice.call(arguments)));

      this.pregenerateAttacks();
      this.runComplexLegalityEvaluationChecks();
    }
    /**
     * Futer benchmarks:
     * Std: 30 moves per second
     * Atomic & racing with xiangqi horses: 15 moves per second
     */

  }, {
    key: "makeVirtualMove",
    value: function makeVirtualMove(_startX, _startY, _endX, _endY) {
      var _this$data2;

      var _promotion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      this.boardMemo = this.board.map(function (r) {
        return r.slice();
      }).slice();
      this.currentBoard = this.boardMemo;
      this.runComplexLegalityEvaluationChecks();
      return (_this$data2 = this.data).createVirtualEffect.apply(_this$data2, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "pregenerateAttacks",
    value: function pregenerateAttacks() {
      var _this3 = this;

      var sideToMove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.sideToMove;
      this.preGeneratedAttacks = createBasePreGeneratedAttacks();

      var _loop = function _loop(i) {
        var _loop2 = function _loop2(j) {
          var square = _this3.currentBoard[i][j];
          if (square.length !== 2 || square.startsWith("d")) return "continue";
          var color = square.charAt(0);
          if (colorEnum[color] === sideToMove) return "continue";
          var letter = square.charAt(1);

          var control = _this3.controls.get(square.charAt(1));

          control.setColor(color);
          control.baseRankActive = false;
          control.setCoordinates(_this3.currentBoard, _this3.data.fenOptions, [j, i]);
          control.setBaseImmunePieces(Array(4).fill(false));

          if (_this3.controlsSettings.get(letter).isJumping) {
            control.rayGenJumpingAttacks().forEach(function (a) {
              _this3.preGeneratedAttacks.hoppingPieces[a[1]][a[0]]++;

              _this3.preGeneratedAttacks.hoppingPieceLines.push([[j, i], a]);

              var l = _this3.preGeneratedAttacks.attackingColors[a[1]][a[0]];

              if (l !== -1 && _this3.preGeneratedAttacks.attackingColors[a[1]][a[0]] !== colorEnum[color] + 1) {
                _this3.preGeneratedAttacks.attackingColors[a[1]][a[0]] = l === 0 ? 1 + colorEnum[color] : -1;
              }
            });
          }

          if (_this3.controlsSettings.get(letter).isSliding) {
            var attacks = control.rayGenSlidingAttacks();
            attacks.forEach(function (a) {
              a.forEach(function (sa) {
                sa.forEach(function (ssa) {
                  _this3.preGeneratedAttacks.slidingPieces[ssa[1]][ssa[0]]++;
                  var l = _this3.preGeneratedAttacks.attackingColors[ssa[1]][ssa[0]];

                  if (l !== -1 && _this3.preGeneratedAttacks.attackingColors[ssa[1]][ssa[0]] !== colorEnum[color] + 1) {
                    _this3.preGeneratedAttacks.attackingColors[ssa[1]][ssa[0]] = l === 0 ? 1 + colorEnum[color] : -1;
                  }
                });
              });

              _this3.preGeneratedAttacks.slidingPiecesLines.push([[j, i]].concat(_toConsumableArray(a)));
            });
            control.rayGenSlidingAttacks(_PieceControl__WEBPACK_IMPORTED_MODULE_2__.attackTypeEnum.rayTraceLimited).forEach(function (a) {
              _this3.preGeneratedAttacks.slidingPiecesRayTracing.push([[j, i]].concat(_toConsumableArray(a)));
            });
          }
        };

        for (var j = 0; j < 14; j++) {
          var _ret = _loop2(j);

          if (_ret === "continue") continue;
        }
      };

      for (var i = 0; i < 14; i++) {
        _loop(i);
      }
    }
  }, {
    key: "isTheMoveLegal",
    value: function isTheMoveLegal(color, attackX, attackY, pieceX, pieceY) {
      var promotion = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

      if (this.isComplexSetup.isComplex()) {
        var virtualFEN = this.makeVirtualMove(pieceX, pieceY, attackX, attackY, promotion);
        var check = this.isKingInCheck(color, virtualFEN.fenOptions.royal);
        this.currentBoard = this.board;
        this.runComplexLegalityEvaluationChecks();
        return check;
      } else {
        var _this$data$fenOptions = _slicedToArray(this.data.fenOptions.royal[color], 2),
            royalX = _this$data$fenOptions[0],
            royalY = _this$data$fenOptions[1];

        var isRoyalMove = royalX === pieceX && royalY === pieceY;
        var attackers = this.preGeneratedAttacks.hoppingPieces[royalY][royalX] + this.preGeneratedAttacks.slidingPieces[royalY][royalX];
        var targetSafety = this.preGeneratedAttacks.slidingPieces[attackY][attackX] + this.preGeneratedAttacks.hoppingPieces[attackY][attackX] === 0;
        var legalitySettings = {
          canKingCapture: undefined
        };

        for (var i = 0; i < this.data.fenOptions.royal.length; i++) {
          if (i !== color && this.data.fenOptions.royal[i] && this.data.fenOptions.royal[i][0] === attackX && this.data.fenOptions.royal[i][1] === attackY) {
            var royalDefendedSquare = this.preGeneratedAttacks.attackingColors[this.data.fenOptions.royal[i][1]][this.data.fenOptions.royal[i][0]];

            if ((royalDefendedSquare === i + 1 || royalDefendedSquare === 0) && (isRoyalMove || this.preGeneratedAttacks.attackingColors[royalY][royalX] === i + 1)) {
              legalitySettings.canKingCapture = i + 1;
            }
          }
        }

        for (var lineWrapIndex = 0; lineWrapIndex < this.preGeneratedAttacks.slidingPiecesRayTracing.length; lineWrapIndex++) {
          var _this$preGeneratedAtt = _slicedToArray(this.preGeneratedAttacks.slidingPiecesRayTracing[lineWrapIndex], 2),
              attackingPiece = _this$preGeneratedAtt[0],
              attackLine = _this$preGeneratedAtt[1];

          var isPieceUnderAttack = false,
              isRoyalUnderAttack = false,
              isTheTargetSquarePinListed = false;

          for (var attackIndex = 0; attackIndex < attackLine.length; attackIndex++) {
            var _attackLine$attackInd = _slicedToArray(attackLine[attackIndex], 2),
                attackedX = _attackLine$attackInd[0],
                attackedY = _attackLine$attackInd[1];

            if (!isPieceUnderAttack && attackedX === pieceX && attackedY === pieceY) isPieceUnderAttack = true;else if (!isTheTargetSquarePinListed && isPieceUnderAttack && !isRoyalUnderAttack && attackedX === attackX && attackedY === attackY) isTheTargetSquarePinListed = true;
            if (!isRoyalUnderAttack && attackedX === royalX && attackedY === royalY) isRoyalUnderAttack = true;

            if (isRoyalMove) {
              if (isRoyalUnderAttack && attackedX === attackX && attackedY === attackY) {
                if (legalitySettings.canKingCapture > 0 && colorEnum[this.currentBoard[attackedY][attackedX].charAt(0)] + 1 === legalitySettings.canKingCapture) continue;
                return false;
              }
            } else {
              if (isPieceUnderAttack && isRoyalUnderAttack && attackingPiece[0] !== attackX && attackingPiece[1] !== attackY && !isTheTargetSquarePinListed) {
                if (legalitySettings.canKingCapture > 0 && colorEnum[this.currentBoard[attackedY][attackedX].charAt(0)] + 1 === legalitySettings.canKingCapture) continue;
                return false;
              }
            }
          }
        }

        if (attackers > 1) {
          return isRoyalMove ? targetSafety || legalitySettings.canKingCapture : legalitySettings.canKingCapture;
        } else if (attackers === 1) {
          if (!isRoyalMove) {
            if (this.preGeneratedAttacks.hoppingPieces[royalY][royalX] === 1) {
              for (var _lineWrapIndex = 0; _lineWrapIndex < this.preGeneratedAttacks.hoppingPieceLines.length; _lineWrapIndex++) {
                var _this$preGeneratedAtt2 = _slicedToArray(this.preGeneratedAttacks.hoppingPieceLines[_lineWrapIndex], 2),
                    _attackingPiece = _this$preGeneratedAtt2[0],
                    attackCoordinates = _this$preGeneratedAtt2[1];

                if (attackCoordinates[0] === royalX && attackCoordinates[1] === royalY && _attackingPiece[0] === attackX && _attackingPiece[1] === attackY) {
                  return true;
                }
              }

              return legalitySettings.canKingCapture;
            } else {
              for (var _lineWrapIndex2 = 0; _lineWrapIndex2 < this.preGeneratedAttacks.slidingPiecesLines.length; _lineWrapIndex2++) {
                var _this$preGeneratedAtt3 = _slicedToArray(this.preGeneratedAttacks.slidingPiecesRayTracing[_lineWrapIndex2], 2),
                    _attackingPiece2 = _this$preGeneratedAtt3[0],
                    _attackLine = _this$preGeneratedAtt3[1];

                var _isRoyalUnderAttack = false,
                    isTheTargetSquareBlocked = false;

                for (var _attackIndex = 0; _attackIndex < _attackLine.length; _attackIndex++) {
                  var _attackLine$_attackIn = _slicedToArray(_attackLine[_attackIndex], 2),
                      _attackedX = _attackLine$_attackIn[0],
                      _attackedY = _attackLine$_attackIn[1];

                  if (!_isRoyalUnderAttack && _attackedX === royalX && _attackedY === royalY) _isRoyalUnderAttack = true;else if (!isTheTargetSquareBlocked && !_isRoyalUnderAttack && _attackedX === attackX && _attackedY === attackY) isTheTargetSquareBlocked = true;

                  if (_isRoyalUnderAttack && !(_attackingPiece2[0] === attackX && _attackingPiece2[1] === attackY) && !isTheTargetSquareBlocked) {
                    if (legalitySettings.canKingCapture > 0 && colorEnum[this.currentBoard[_attackedY][_attackedX].charAt(0)] + 1 === legalitySettings.canKingCapture) continue;
                    return legalitySettings.canKingCapture;
                  }
                }
              }

              return true;
            }
          } else {
            return targetSafety || legalitySettings.canKingCapture;
          }
        } else {
          return isRoyalMove ? targetSafety || legalitySettings.canKingCapture : true;
        }
      }
    }
  }, {
    key: "getLegalMoves",
    value: function getLegalMoves(x, y) {
      var _this4 = this;

      var baseColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.data.sideToMove;

      if (this.currentBoard[y] && this.currentBoard[y][x] && this.currentBoard[y][x].length === 2) {
        var piece = this.currentBoard[y][x];
        var color = piece.charAt(0);
        var control = this.controls.get(piece.charAt(1));
        control.setColor(color);
        if (control.color !== baseColor) return [];

        if (control.hooks.usePawnLogic && this.data.fenOptions.pawnBaseRank < 13) {
          control.setBaseRankActive(this.data.fenOptions.pawnBaseRank - 1, x, y);
        }

        control.setCoordinates(this.currentBoard, this.data.fenOptions, [x, y]);
        control.setBaseImmunePieces(this.gameType.getBaseColors(colorEnum[color]));
        var pseudoLegalMoves = control.getPseudoLegalMoves();

        if (this.data.fenOptions.royal[colorEnum[color]]) {
          return pseudoLegalMoves.filter(function (m) {
            return _this4.isTheMoveLegal(colorEnum[color], m[0], m[1], x, y);
          });
        } else {
          return pseudoLegalMoves;
        }
      } else {
        return [];
      }
    }
  }]);

  return Board;
}();



/***/ }),

/***/ "./src/main/client/javascript/logic/movegen/PieceControl.js":
/*!******************************************************************!*\
  !*** ./src/main/client/javascript/logic/movegen/PieceControl.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attackTypeEnum": () => (/* binding */ attackTypeEnum),
/* harmony export */   "PieceControl": () => (/* binding */ PieceControl)
/* harmony export */ });
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ "./src/main/client/javascript/logic/movegen/Board.js");
/* harmony import */ var _Reporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reporter */ "./src/main/client/javascript/logic/movegen/Reporter.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var attackTypeEnum = {
  attackOnly: Symbol(),
  moveOnly: Symbol(),
  normal: Symbol(),
  rayGen: Symbol(),
  rayTrace: Symbol(),
  rayTraceLimited: Symbol(),
  isRayTrace: function isRayTrace(attackType) {
    return attackType === this.rayTrace || attackType === this.rayTraceLimited;
  }
};

var PieceControl = /*#__PURE__*/function () {
  /*---------------------------------- INITIALIZATION -----------------------------------------*/
  function PieceControl(pieceLetter, inferredOptions) {
    _classCallCheck(this, PieceControl);

    PieceControl.letterMap.set(pieceLetter, inferredOptions);
    this.moves = [];
    this.color = 0; // default

    this.sliding = [];
    this.jumping = [];
    this.rayGenCache = [];
    this.hooks = {
      useTrajectory: undefined,
      usePerspective: undefined,
      usePawnLogic: undefined,
      useHopping: undefined
    };
    this.reporter = null;
    this.letter = pieceLetter;
    this.moveLegalityCase = null;
    this.baseRankActive = false;
    this.immunePieces = [];
    this["extends"] = [];
  }

  _createClass(PieceControl, [{
    key: "setColor",
    value: function setColor(color) {
      var _colorEnum$color;

      this.color = (_colorEnum$color = _Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[color]) !== null && _colorEnum$color !== void 0 ? _colorEnum$color : 0;
    }
  }, {
    key: "setBaseImmunePieces",
    value: function setBaseImmunePieces(immunePieces) {
      this.immunePieces = immunePieces; // array [false, false, true, false] i.e.
    }
  }, {
    key: "setBaseRankActive",
    value: function setBaseRankActive(baseRank, x, y) {
      this.baseRankActive = [13 - y, x, y, 13 - x][this.color] === baseRank;
    }
  }, {
    key: "setCoordinates",
    value: function setCoordinates(board, fenOptions, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          x = _ref2[0],
          y = _ref2[1];

      this.board = board;
      this.x = x;
      this.y = y;
      this.moves = [];
      this.fenOptions = fenOptions;
    }
  }, {
    key: "setReporter",
    value: function setReporter(reporter) {
      this.reporter = reporter;
      reporter.evaluateCase(reporter.createShallowCase(_Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.moveGeneration, this.hooks, this));
      this.moveLegalityCase = reporter.createCase(_Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.moveGenerationLegality);
    }
    /*---------------------------------- INITIALIZATION -----------------------------------------*/

    /*-------------------------------------------------------------------------------------------*/

    /*--------------------------------- MOVE GENERATION -----------------------------------------*/

  }, {
    key: "modifyDisplacements",
    value: function modifyDisplacements(x, y) {
      return [[x, y], [-y, x], [-x, -y], [y, -x]][this.color];
    }
  }, {
    key: "pushMove",
    value: function pushMove(x, y, isRayGen) {
      if (!isRayGen && this.hooks.usePawnLogic && this.hooks.usePawnLogic.promotionRanks) {
        if (this.hooks.usePawnLogic.promotionRanks[this.color] === (this.color % 2 === 0 ? y : x)) {
          var _this$hooks$usePawnLo;

          this.moves.push([x, y, [(_this$hooks$usePawnLo = this.hooks.usePawnLogic.promotionPieces) !== null && _this$hooks$usePawnLo !== void 0 ? _this$hooks$usePawnLo : 'QRBN']]);
        } else {
          this.moves.push([x, y]);
        }
      } else {
        this.moves.push([x, y]);
      }
    }
  }, {
    key: "generateSlidingAttack",
    value: function generateSlidingAttack(displacementX, displacementY) {
      var special = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : attackTypeEnum.normal;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;
      var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
      var rayGenCache = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var rayTraceLimit = 0;

      if (this.hooks.usePerspective && this.hooks.usePerspective[this.color]) {
        var _this$modifyDisplacem = this.modifyDisplacements(displacementX, displacementY);

        var _this$modifyDisplacem2 = _slicedToArray(_this$modifyDisplacem, 2);

        displacementX = _this$modifyDisplacem2[0];
        displacementY = _this$modifyDisplacem2[1];
      }

      var startX = this.x + displacementX,
          startY = this.y + displacementY;
      var xLength = this.board[0].length,
          yLength = this.board.length;
      var isRayGen = rayGenCache || attackTypeEnum.isRayTrace(special);

      while (limit > 0 && startX >= 0 && startX < xLength && startY >= 0 && startY < yLength) {
        // TODO add trajectories?
        // Move possibility
        if (!this.getMovePossibility(startX, startY, special, rayGenCache)) {
          this.moveLegalityCase.tests.isBlocked = [true, false];
        } else this.moveLegalityCase.tests.isBlocked = [false, false]; // Always delegate legality checks, except if it is raytracing, raytracing doesn't need legality checks.


        if (this.reporter.evaluateCase(this.moveLegalityCase, {
          inferredClass: this,
          arguments: {
            special: special,
            startX: this.x,
            startY: this.y
          }
        }, isRayGen)) {
          this.pushMove(startX, startY, isRayGen);
        } // Raytracing for getting pinned pieces, AKA rayTraceLimited


        if (special === attackTypeEnum.rayTraceLimited && this.board[startY][startX].length !== 0) {
          rayTraceLimit++;
          if (rayTraceLimit === 2) break;
        }

        if (!attackTypeEnum.isRayTrace(special) && this.board[startY][startX].length !== 0) {
          break;
        }

        startX += displacementX;
        startY += displacementY;
        limit--;
      }
    }
  }, {
    key: "generateJumpAttack",
    value: function generateJumpAttack(displacementX, displacementY) {
      var special = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : attackTypeEnum.normal;
      var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
      var rayGenCache = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      if (this.hooks.usePerspective && this.hooks.usePerspective[this.color]) {
        var _this$modifyDisplacem3 = this.modifyDisplacements(displacementX, displacementY);

        var _this$modifyDisplacem4 = _slicedToArray(_this$modifyDisplacem3, 2);

        displacementX = _this$modifyDisplacem4[0];
        displacementY = _this$modifyDisplacem4[1];
      }

      var startX = this.x + displacementX,
          startY = this.y + displacementY;
      var isRayGen = rayGenCache || attackTypeEnum.isRayTrace(special);

      if (this.hooks.useTrajectory && i !== -1) {
        // Bifuracted pieces, i.e. xiangqi horse
        var trajectory = this.hooks.useTrajectory[i];
        var trajectoryX, trajectoryY;

        if (this.hooks.usePerspective && this.hooks.usePerspective[this.color]) {
          var _this$modifyDisplacem5 = this.modifyDisplacements(trajectory[0], trajectory[1]);

          var _this$modifyDisplacem6 = _slicedToArray(_this$modifyDisplacem5, 2);

          trajectoryX = _this$modifyDisplacem6[0];
          trajectoryY = _this$modifyDisplacem6[1];
        } else {
          trajectoryX = trajectory[0], trajectoryY = trajectory[1];
        } // Check bifuraction possibility


        if (!this.getMovePossibility(this.x + trajectoryX, this.y + trajectoryY, special, rayGenCache)) {
          this.moveLegalityCase.tests.isTrajectoryBlocked = [true, true];
        } else this.moveLegalityCase.tests.isTrajectoryBlocked = [false, true];
      } // Check move possibility


      if (!this.getMovePossibility(startX, startY, special, rayGenCache)) {
        this.moveLegalityCase.tests.isBlocked = [true, false];
      } else this.moveLegalityCase.tests.isBlocked = [false, false];

      if (this.reporter.evaluateCase(this.moveLegalityCase, {
        inferredClass: this,
        arguments: {
          special: special,
          startX: startX,
          startY: startY
        }
      }, isRayGen)) {
        this.pushMove(startX, startY, isRayGen);
      }

      this.reporter.resetCase(this.moveLegalityCase);
    }
  }, {
    key: "getMovePossibility",
    value: function getMovePossibility(startX, startY) {
      var _this = this;

      var special = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : attackTypeEnum.normal;
      var rayGenCache = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var modifiedX = startX,
          modifiedY = startY;
      if (!this.board[modifiedY] || this.board[modifiedY][modifiedX] === undefined) return false; // Out of bounds?

      var piece = this.board[modifiedY][modifiedX]; // Make sure you don't capture immune zombie or your own piece, unless it is ray-genning to get legal moves.

      if (!rayGenCache && !attackTypeEnum.isRayTrace(special)) {
        var _this$immunePieces, _colorEnum$piece$char;

        if ((_this$immunePieces = this.immunePieces[(_colorEnum$piece$char = _Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[piece.charAt(0)]) !== null && _colorEnum$piece$char !== void 0 ? _colorEnum$piece$char : null]) !== null && _this$immunePieces !== void 0 ? _this$immunePieces : false) return false;
      }

      var pushTo = function pushTo() {
        if (rayGenCache) {
          _this.rayGenCache.push(rayGenCache);
        }

        return true;
      };

      if (special === attackTypeEnum.normal) {
        if (piece.length !== 1) {
          return pushTo();
        }
      } else if (special === attackTypeEnum.rayGen) {
        if (piece.length !== 0) {
          return pushTo();
        }
      } else if (special === attackTypeEnum.attackOnly) {
        if (piece.length === 2) {
          return pushTo();
        }
      } else if (special === attackTypeEnum.moveOnly) {
        if (piece.length === 0) {
          return pushTo();
        }
      } else if (attackTypeEnum.isRayTrace(special)) {
        return pushTo();
      }

      return false;
    }
    /*--------------------------------- MOVE GENERATION -----------------------------------------*/

    /*-------------------------------------------------------------------------------------------*/

    /*------------------------------- OUTPUT GENERATION -----------------------------------------*/

  }, {
    key: "getPossibleCells",
    value: function getPossibleCells() {
      var _this2 = this;

      if (this.hooks.useHopping) {
        this.sliding.forEach(function (a) {
          return _this2.generateSlidingAttack(a[0], a[1], attackTypeEnum.rayGen, Infinity, null, a.slice());
        });
        var moves = this.moves.slice();
        this.moves = [];
        moves.forEach(function (s, i) {
          var startX = s[0] + _this2.rayGenCache[i][0];
          var startY = s[1] + _this2.rayGenCache[i][1];

          if (_this2.getMovePossibility(startX, startY)) {
            _this2.moveLegalityCase.tests.isBlocked = [false, false];
          } else _this2.moveLegalityCase.tests.isBlocked = [true, false];

          if (_this2.reporter.evaluateCase(_this2.moveLegalityCase, {
            inferredClass: _this2,
            arguments: {
              startX: startX,
              startY: startY,
              special: attackTypeEnum.normal
            }
          })) {
            _this2.moves.push([startX, startY]);
          }

          _this2.reporter.resetCase(_this2.moveLegalityCase);
        });
        this.rayGenCache = [];
      } else {
        this.sliding.forEach(function (a) {
          return _this2.generateSlidingAttack(a[0], a[1]);
        });
        this.jumping.forEach(function (a) {
          return _this2.generateJumpAttack(a[0], a[1]);
        });
      }
    }
  }, {
    key: "rayGenJumpingAttacks",
    value: function rayGenJumpingAttacks() {
      var _this3 = this;

      this.jumping.forEach(function (a) {
        return _this3.generateJumpAttack(a[0], a[1], attackTypeEnum.rayTrace);
      });
      return this.moves.splice(0);
    }
  }, {
    key: "rayGenSlidingAttacks",
    value: function rayGenSlidingAttacks(trace) {
      var _this4 = this;

      var slidingLines = [];
      this.sliding.forEach(function (a) {
        _this4.generateSlidingAttack(a[0], a[1], trace !== null && trace !== void 0 ? trace : attackTypeEnum.normal);

        if (_this4.moves.length !== 0) {
          slidingLines.push([_this4.moves.splice(0)]);
        }
      });
      return slidingLines;
    }
  }, {
    key: "getPseudoLegalMoves",
    value: function getPseudoLegalMoves() {
      this["extends"].forEach(function (f) {
        return f();
      });
      this.getPossibleCells();
      return this.moves.splice(0);
    }
    /*------------------------------- OUTPUT GENERATION -----------------------------------------*/

  }], [{
    key: "getConstructor",
    value: function getConstructor(letter) {
      var _PieceControl$letterM;

      return (_PieceControl$letterM = PieceControl.letterMap.get(letter)) !== null && _PieceControl$letterM !== void 0 ? _PieceControl$letterM : PieceControl;
    }
  }]);

  return PieceControl;
}();

_defineProperty(PieceControl, "letterMap", new Map());

var RookControl = /*#__PURE__*/function (_PieceControl) {
  _inherits(RookControl, _PieceControl);

  var _super = _createSuper(RookControl);

  function RookControl() {
    var _this5;

    _classCallCheck(this, RookControl);

    _this5 = _super.call(this, "R", {
      construct: this instanceof RookControl ? this.constructor : void 0,
      points: 5,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this5.sliding = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    return _this5;
  }

  return _createClass(RookControl);
}(PieceControl);

var BishopControl = /*#__PURE__*/function (_PieceControl2) {
  _inherits(BishopControl, _PieceControl2);

  var _super2 = _createSuper(BishopControl);

  function BishopControl() {
    var _this6;

    _classCallCheck(this, BishopControl);

    _this6 = _super2.call(this, "B", {
      construct: this instanceof BishopControl ? this.constructor : void 0,
      points: 5,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this6.sliding = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
    return _this6;
  }

  return _createClass(BishopControl);
}(PieceControl);

var QueenControl = /*#__PURE__*/function (_PieceControl3) {
  _inherits(QueenControl, _PieceControl3);

  var _super3 = _createSuper(QueenControl);

  function QueenControl() {
    var _this7;

    _classCallCheck(this, QueenControl);

    _this7 = _super3.call(this, "Q", {
      construct: this instanceof QueenControl ? this.constructor : void 0,
      points: 9,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this7.sliding = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    return _this7;
  }

  return _createClass(QueenControl);
}(PieceControl);

var DameControl = /*#__PURE__*/function (_PieceControl4) {
  _inherits(DameControl, _PieceControl4);

  var _super4 = _createSuper(DameControl);

  function DameControl() {
    var _this8;

    _classCallCheck(this, DameControl);

    _this8 = _super4.call(this, "D", {
      construct: this instanceof DameControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this8.sliding = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    return _this8;
  }

  return _createClass(DameControl);
}(PieceControl);

var KingControl = /*#__PURE__*/function (_PieceControl5) {
  _inherits(KingControl, _PieceControl5);

  var _super5 = _createSuper(KingControl);

  function KingControl() {
    var _this9;

    _classCallCheck(this, KingControl);

    _this9 = _super5.call(this, "K", {
      construct: this instanceof KingControl ? this.constructor : void 0,
      points: 3,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this9.jumping = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    return _this9;
  }

  return _createClass(KingControl);
}(PieceControl);

var GeneralControl = /*#__PURE__*/function (_PieceControl6) {
  _inherits(GeneralControl, _PieceControl6);

  var _super6 = _createSuper(GeneralControl);

  function GeneralControl() {
    var _this10;

    _classCallCheck(this, GeneralControl);

    _this10 = _super6.call(this, "M", {
      construct: this instanceof GeneralControl ? this.constructor : void 0,
      points: 5,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this10.jumping = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1], [-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
    return _this10;
  }

  return _createClass(GeneralControl);
}(PieceControl);

var FerzControl = /*#__PURE__*/function (_PieceControl7) {
  _inherits(FerzControl, _PieceControl7);

  var _super7 = _createSuper(FerzControl);

  function FerzControl() {
    var _this11;

    _classCallCheck(this, FerzControl);

    _this11 = _super7.call(this, "F", {
      construct: this instanceof FerzControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this11.jumping = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
    return _this11;
  }

  return _createClass(FerzControl);
}(PieceControl);

var WazirControl = /*#__PURE__*/function (_PieceControl8) {
  _inherits(WazirControl, _PieceControl8);

  var _super8 = _createSuper(WazirControl);

  function WazirControl() {
    var _this12;

    _classCallCheck(this, WazirControl);

    _this12 = _super8.call(this, "W", {
      construct: this instanceof WazirControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this12.jumping = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    return _this12;
  }

  return _createClass(WazirControl);
}(PieceControl);

var DabbabaControl = /*#__PURE__*/function (_PieceControl9) {
  _inherits(DabbabaControl, _PieceControl9);

  var _super9 = _createSuper(DabbabaControl);

  function DabbabaControl() {
    var _this13;

    _classCallCheck(this, DabbabaControl);

    _this13 = _super9.call(this, "S", {
      construct: this instanceof DabbabaControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this13.jumping = [[-2, 0], [2, 0], [0, 2], [0, -2]];
    return _this13;
  }

  return _createClass(DabbabaControl);
}(PieceControl);

var DabbabaRiderControl = /*#__PURE__*/function (_PieceControl10) {
  _inherits(DabbabaRiderControl, _PieceControl10);

  var _super10 = _createSuper(DabbabaRiderControl);

  function DabbabaRiderControl() {
    var _this14;

    _classCallCheck(this, DabbabaRiderControl);

    _this14 = _super10.call(this, "T", {
      construct: this instanceof DabbabaRiderControl ? this.constructor : void 0,
      points: 4,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this14.sliding = [[-2, 0], [2, 0], [0, 2], [0, -2]];
    return _this14;
  }

  return _createClass(DabbabaRiderControl);
}(PieceControl);

var AlfilControl = /*#__PURE__*/function (_PieceControl11) {
  _inherits(AlfilControl, _PieceControl11);

  var _super11 = _createSuper(AlfilControl);

  function AlfilControl() {
    var _this15;

    _classCallCheck(this, AlfilControl);

    _this15 = _super11.call(this, "I", {
      construct: this instanceof AlfilControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this15.jumping = [[-2, -2], [2, 2], [-2, 2], [2, -2]];
    return _this15;
  }

  return _createClass(AlfilControl);
}(PieceControl);

var AlfilRiderControl = /*#__PURE__*/function (_PieceControl12) {
  _inherits(AlfilRiderControl, _PieceControl12);

  var _super12 = _createSuper(AlfilRiderControl);

  function AlfilRiderControl() {
    var _this16;

    _classCallCheck(this, AlfilRiderControl);

    _this16 = _super12.call(this, "J", {
      construct: this instanceof AlfilRiderControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this16.sliding = [[-2, -2], [2, 2], [-2, 2], [2, -2]];
    return _this16;
  }

  return _createClass(AlfilRiderControl);
}(PieceControl);

var AlibabaControl = /*#__PURE__*/function (_PieceControl13) {
  _inherits(AlibabaControl, _PieceControl13);

  var _super13 = _createSuper(AlibabaControl);

  function AlibabaControl() {
    var _this17;

    _classCallCheck(this, AlibabaControl);

    _this17 = _super13.call(this, "Y", {
      construct: this instanceof AlibabaControl ? this.constructor : void 0,
      points: 3,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this17.jumping = [[-2, 0], [2, 0], [0, 2], [0, -2], [-2, -2], [2, 2], [-2, 2], [2, -2]];
    return _this17;
  }

  return _createClass(AlibabaControl);
}(PieceControl);

var AlibabaRiderControl = /*#__PURE__*/function (_PieceControl14) {
  _inherits(AlibabaRiderControl, _PieceControl14);

  var _super14 = _createSuper(AlibabaRiderControl);

  function AlibabaRiderControl() {
    var _this18;

    _classCallCheck(this, AlibabaRiderControl);

    _this18 = _super14.call(this, "Z", {
      construct: this instanceof AlibabaRiderControl ? this.constructor : void 0,
      points: 6,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this18.sliding = [[-2, 0], [2, 0], [0, 2], [0, -2], [-2, -2], [2, 2], [-2, 2], [2, -2]];
    return _this18;
  }

  return _createClass(AlibabaRiderControl);
}(PieceControl);

var AmazonControl = /*#__PURE__*/function (_PieceControl15) {
  _inherits(AmazonControl, _PieceControl15);

  var _super15 = _createSuper(AmazonControl);

  function AmazonControl() {
    var _this19;

    _classCallCheck(this, AmazonControl);

    _this19 = _super15.call(this, "A", {
      construct: this instanceof AmazonControl ? this.constructor : void 0,
      points: 12,
      isComplex: false,
      isJumping: true,
      isSliding: true
    });
    _this19.sliding = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    _this19.jumping = [[-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
    return _this19;
  }

  return _createClass(AmazonControl);
}(PieceControl);

var KnightControl = /*#__PURE__*/function (_PieceControl16) {
  _inherits(KnightControl, _PieceControl16);

  var _super16 = _createSuper(KnightControl);

  function KnightControl() {
    var _this20;

    _classCallCheck(this, KnightControl);

    _this20 = _super16.call(this, "N", {
      construct: this instanceof KnightControl ? this.constructor : void 0,
      points: 3,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this20.jumping = [[-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
    return _this20;
  }

  return _createClass(KnightControl);
}(PieceControl);

var CamelControl = /*#__PURE__*/function (_PieceControl17) {
  _inherits(CamelControl, _PieceControl17);

  var _super17 = _createSuper(CamelControl);

  function CamelControl() {
    var _this21;

    _classCallCheck(this, CamelControl);

    _this21 = _super17.call(this, "C", {
      construct: this instanceof CamelControl ? this.constructor : void 0,
      points: 3,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this21.jumping = [[-1, -3], [-3, -1], [-1, 3], [3, -1], [-3, 1], [1, -3], [1, 3], [3, 1]];
    return _this21;
  }

  return _createClass(CamelControl);
}(PieceControl);

var ChancellorControl = /*#__PURE__*/function (_PieceControl18) {
  _inherits(ChancellorControl, _PieceControl18);

  var _super18 = _createSuper(ChancellorControl);

  function ChancellorControl() {
    var _this22;

    _classCallCheck(this, ChancellorControl);

    _this22 = _super18.call(this, "E", {
      construct: this instanceof ChancellorControl ? this.constructor : void 0,
      points: 7,
      isComplex: false,
      isJumping: true,
      isSliding: true
    });
    _this22.sliding = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    _this22.jumping = [[-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
    return _this22;
  }

  return _createClass(ChancellorControl);
}(PieceControl);

var ArchbishopControl = /*#__PURE__*/function (_PieceControl19) {
  _inherits(ArchbishopControl, _PieceControl19);

  var _super19 = _createSuper(ArchbishopControl);

  function ArchbishopControl() {
    var _this23;

    _classCallCheck(this, ArchbishopControl);

    _this23 = _super19.call(this, "H", {
      construct: this instanceof ArchbishopControl ? this.constructor : void 0,
      points: 7,
      isComplex: false,
      isJumping: true,
      isSliding: true
    });
    _this23.sliding = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
    _this23.jumping = [[-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
    return _this23;
  }

  return _createClass(ArchbishopControl);
}(PieceControl);

var KnightRiderControl = /*#__PURE__*/function (_PieceControl20) {
  _inherits(KnightRiderControl, _PieceControl20);

  var _super20 = _createSuper(KnightRiderControl);

  function KnightRiderControl() {
    var _this24;

    _classCallCheck(this, KnightRiderControl);

    _this24 = _super20.call(this, "O", {
      construct: this instanceof KnightRiderControl ? this.constructor : void 0,
      points: 7,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this24.sliding = [[-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
    return _this24;
  }

  return _createClass(KnightRiderControl);
}(PieceControl);

var CamelRiderControl = /*#__PURE__*/function (_PieceControl21) {
  _inherits(CamelRiderControl, _PieceControl21);

  var _super21 = _createSuper(CamelRiderControl);

  function CamelRiderControl() {
    var _this25;

    _classCallCheck(this, CamelRiderControl);

    _this25 = _super21.call(this, "L", {
      construct: this instanceof CamelRiderControl ? this.constructor : void 0,
      points: 7,
      isComplex: false,
      isJumping: false,
      isSliding: true
    });
    _this25.sliding = [[-1, -3], [-3, -1], [-1, 3], [3, -1], [-3, 1], [1, -3], [1, 3], [3, 1]];
    return _this25;
  }

  return _createClass(CamelRiderControl);
}(PieceControl);

var WildebeestControl = /*#__PURE__*/function (_PieceControl22) {
  _inherits(WildebeestControl, _PieceControl22);

  var _super22 = _createSuper(WildebeestControl);

  function WildebeestControl() {
    var _this26;

    _classCallCheck(this, WildebeestControl);

    _this26 = _super22.call(this, "V", {
      construct: this instanceof WildebeestControl ? this.constructor : void 0,
      points: 5,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this26.jumping = [[-1, -3], [-3, -1], [-1, 3], [3, -1], [-3, 1], [1, -3], [1, 3], [3, 1], [-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
    return _this26;
  }

  return _createClass(WildebeestControl);
}(PieceControl);

var PawnControl = /*#__PURE__*/function (_PieceControl23) {
  _inherits(PawnControl, _PieceControl23);

  var _super23 = _createSuper(PawnControl);

  function PawnControl() {
    var _this27;

    _classCallCheck(this, PawnControl);

    _this27 = _super23.call(this, "P", {
      construct: this instanceof PawnControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this27.hooks.usePerspective = Array(4).fill(true);
    _this27.hooks.usePawnLogic = true;
    return _this27;
  }

  _createClass(PawnControl, [{
    key: "getPossibleCells",
    value: function getPossibleCells() {
      this.generateJumpAttack(-1, -1, attackTypeEnum.attackOnly);
      this.generateJumpAttack(1, -1, attackTypeEnum.attackOnly);
      this.generateSlidingAttack(0, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 1);
      return this.moves;
    }
  }, {
    key: "rayGenJumpingAttacks",
    value: function rayGenJumpingAttacks() {
      this.generateJumpAttack(-1, -1, attackTypeEnum.rayTrace);
      this.generateJumpAttack(1, -1, attackTypeEnum.rayTrace);
      var moves = this.moves.slice();
      this.moves = [];
      return moves;
    }
  }]);

  return PawnControl;
}(PieceControl);

var BerolinaControl = /*#__PURE__*/function (_PieceControl24) {
  _inherits(BerolinaControl, _PieceControl24);

  var _super24 = _createSuper(BerolinaControl);

  function BerolinaControl() {
    var _this28;

    _classCallCheck(this, BerolinaControl);

    _this28 = _super24.call(this, "α", {
      construct: this instanceof BerolinaControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this28.hooks.usePerspective = Array(4).fill(true);
    _this28.hooks.usePawnLogic = true;
    return _this28;
  }

  _createClass(BerolinaControl, [{
    key: "getPossibleCells",
    value: function getPossibleCells() {
      this.generateSlidingAttack(-1, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 1);
      this.generateSlidingAttack(1, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 1);
      this.generateJumpAttack(0, -1, attackTypeEnum.attackOnly);
      return this.moves;
    }
  }, {
    key: "rayGenJumpingAttacks",
    value: function rayGenJumpingAttacks() {
      this.generateJumpAttack(0, -1, attackTypeEnum.rayTrace);
      var moves = this.moves.slice();
      this.moves = [];
      return moves;
    }
  }]);

  return BerolinaControl;
}(PieceControl);

var StoneGeneralControl = /*#__PURE__*/function (_PieceControl25) {
  _inherits(StoneGeneralControl, _PieceControl25);

  var _super25 = _createSuper(StoneGeneralControl);

  function StoneGeneralControl() {
    var _this29;

    _classCallCheck(this, StoneGeneralControl);

    _this29 = _super25.call(this, "γ", {
      construct: this instanceof StoneGeneralControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this29.hooks.usePerspective = Array(4).fill(true);
    _this29.hooks.usePawnLogic = true;
    return _this29;
  }

  _createClass(StoneGeneralControl, [{
    key: "getPossibleCells",
    value: function getPossibleCells() {
      this.generateSlidingAttack(-1, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 0);
      this.generateSlidingAttack(1, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 0);
      this.generateJumpAttack(-1, -1);
      this.generateJumpAttack(1, -1);
      return this.moves;
    }
  }, {
    key: "rayGenJumpingAttacks",
    value: function rayGenJumpingAttacks() {
      this.generateJumpAttack(-1, -1, attackTypeEnum.rayTrace);
      this.generateJumpAttack(1, -1, attackTypeEnum.rayTrace);
      var moves = this.moves.slice();
      this.moves = [];
      return moves;
    }
  }]);

  return StoneGeneralControl;
}(PieceControl);

var SoldierControl = /*#__PURE__*/function (_PieceControl26) {
  _inherits(SoldierControl, _PieceControl26);

  var _super26 = _createSuper(SoldierControl);

  function SoldierControl() {
    var _this30;

    _classCallCheck(this, SoldierControl);

    _this30 = _super26.call(this, "β", {
      construct: this instanceof SoldierControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this30.hooks.usePerspective = Array(4).fill(true);
    _this30.hooks.usePawnLogic = true;
    return _this30;
  }

  _createClass(SoldierControl, [{
    key: "getPossibleCells",
    value: function getPossibleCells() {
      this.generateSlidingAttack(0, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 0);
      this.generateJumpAttack(0, -1);
      return this.moves;
    }
  }, {
    key: "rayGenJumpingAttacks",
    value: function rayGenJumpingAttacks() {
      this.generateJumpAttack(0, -1, attackTypeEnum.rayTrace);
      var moves = this.moves.slice();
      this.moves = [];
      return moves;
    }
  }]);

  return SoldierControl;
}(PieceControl);

var SergeantControl = /*#__PURE__*/function (_PieceControl27) {
  _inherits(SergeantControl, _PieceControl27);

  var _super27 = _createSuper(SergeantControl);

  function SergeantControl() {
    var _this31;

    _classCallCheck(this, SergeantControl);

    _this31 = _super27.call(this, "δ", {
      construct: this instanceof SergeantControl ? this.constructor : void 0,
      points: 1,
      isComplex: false,
      isJumping: true,
      isSliding: false
    });
    _this31.hooks.usePerspective = Array(4).fill(true);
    _this31.hooks.usePawnLogic = true;
    return _this31;
  }

  _createClass(SergeantControl, [{
    key: "getPossibleCells",
    value: function getPossibleCells() {
      this.generateSlidingAttack(-1, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 0);
      this.generateSlidingAttack(1, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 0);
      this.generateSlidingAttack(0, -1, attackTypeEnum.moveOnly, this.baseRankActive ? 2 : 0);
      this.generateJumpAttack(0, -1);
      this.generateJumpAttack(-1, -1);
      this.generateJumpAttack(1, -1);
      return this.moves;
    }
  }, {
    key: "rayGenJumpingAttacks",
    value: function rayGenJumpingAttacks() {
      this.generateJumpAttack(0, -1, attackTypeEnum.rayTrace);
      this.generateJumpAttack(-1, -1, attackTypeEnum.rayTrace);
      this.generateJumpAttack(1, -1, attackTypeEnum.rayTrace);
      var moves = this.moves.slice();
      this.moves = [];
      return moves;
    }
  }]);

  return SergeantControl;
}(PieceControl);

var ChineseHorseControl = /*#__PURE__*/function (_PieceControl28) {
  _inherits(ChineseHorseControl, _PieceControl28);

  var _super28 = _createSuper(ChineseHorseControl);

  function ChineseHorseControl() {
    var _this32;

    _classCallCheck(this, ChineseHorseControl);

    _this32 = _super28.call(this, "U", {
      construct: this instanceof ChineseHorseControl ? this.constructor : void 0,
      points: 2,
      isComplex: true,
      isSliding: false,
      isJumping: true
    });
    _this32.hooks.useTrajectory = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    return _this32;
  }

  _createClass(ChineseHorseControl, [{
    key: "getPossibleCells",
    value: function getPossibleCells() {
      this.generateJumpAttack(-1, -2, attackTypeEnum.normal, 3);
      this.generateJumpAttack(1, -2, attackTypeEnum.normal, 3);
      this.generateJumpAttack(-1, 2, attackTypeEnum.normal, 2);
      this.generateJumpAttack(1, 2, attackTypeEnum.normal, 2);
      this.generateJumpAttack(2, -1, attackTypeEnum.normal, 1);
      this.generateJumpAttack(2, 1, attackTypeEnum.normal, 1);
      this.generateJumpAttack(-2, -1, attackTypeEnum.normal, 0);
      this.generateJumpAttack(-2, 1, attackTypeEnum.normal, 0);
      return this.moves;
    }
  }]);

  return ChineseHorseControl;
}(PieceControl);

var DragonBishopControl = /*#__PURE__*/function (_PieceControl29) {
  _inherits(DragonBishopControl, _PieceControl29);

  var _super29 = _createSuper(DragonBishopControl);

  function DragonBishopControl() {
    var _this33;

    _classCallCheck(this, DragonBishopControl);

    _this33 = _super29.call(this, "Δ", {
      construct: this instanceof DragonBishopControl ? this.constructor : void 0,
      points: 7,
      isComplex: true,
      isJumping: true,
      isSliding: true
    });
    _this33.sliding = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
    _this33.hooks.useTrajectory = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    return _this33;
  }

  _createClass(DragonBishopControl, [{
    key: "getPossibleCells",
    value: function getPossibleCells() {
      var _this34 = this;

      this.generateJumpAttack(-1, -2, attackTypeEnum.normal, 3);
      this.generateJumpAttack(1, -2, attackTypeEnum.normal, 3);
      this.generateJumpAttack(-1, 2, attackTypeEnum.normal, 2);
      this.generateJumpAttack(1, 2, attackTypeEnum.normal, 2);
      this.generateJumpAttack(2, -1, attackTypeEnum.normal, 1);
      this.generateJumpAttack(2, 1, attackTypeEnum.normal, 1);
      this.generateJumpAttack(-2, -1, attackTypeEnum.normal, 0);
      this.generateJumpAttack(-2, 1, attackTypeEnum.normal, 0);
      this.sliding.forEach(function (a) {
        _this34.generateSlidingAttack(a[0], a[1]);
      });
      return this.moves;
    }
  }]);

  return DragonBishopControl;
}(PieceControl);

var GrasshopperControl = /*#__PURE__*/function (_PieceControl30) {
  _inherits(GrasshopperControl, _PieceControl30);

  var _super30 = _createSuper(GrasshopperControl);

  function GrasshopperControl() {
    var _this35;

    _classCallCheck(this, GrasshopperControl);

    _this35 = _super30.call(this, "G", {
      construct: this instanceof GrasshopperControl ? this.constructor : void 0,
      points: 3,
      isComplex: true,
      isJumping: true,
      isSliding: false
    });
    _this35.hooks.useHopping = true;
    _this35.sliding = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    return _this35;
  }

  return _createClass(GrasshopperControl);
}(PieceControl);

var pieces = [KingControl, QueenControl, DameControl, RookControl, BishopControl, KnightControl, PawnControl, AmazonControl, ChancellorControl, ArchbishopControl, GeneralControl, CamelControl, WildebeestControl, GrasshopperControl, FerzControl, WazirControl, AlfilControl, DabbabaControl, AlibabaControl, ChineseHorseControl, BerolinaControl, SoldierControl, KnightRiderControl, CamelRiderControl, AlfilRiderControl, DabbabaRiderControl, AlibabaRiderControl, DragonBishopControl, StoneGeneralControl, SergeantControl];
pieces.forEach(function (p) {
  return Reflect.construct(p, []);
});


/***/ }),

/***/ "./src/main/client/javascript/logic/movegen/Reporter.js":
/*!**************************************************************!*\
  !*** ./src/main/client/javascript/logic/movegen/Reporter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "topicLines": () => (/* binding */ topicLines),
/* harmony export */   "Reporter": () => (/* binding */ Reporter)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var topicLines = {
  moveGeneration: Symbol(),
  // Sideways Pawns, Torpedo, promotion
  moveGenerationLegality: Symbol(),
  // Any Capture, Stonewall
  fenOptions: Symbol(),
  // opposite-side castling, N-Check, Self-check, Teammate
  postMoveOptions: Symbol(),
  // Fatal Capture, OxN, P4M, Atomic, Points for Mate, Takeover, Stalemate settings, Bare piece rule
  mateHandling: Symbol(),
  // No DKW, KotH, Racing Kings, 
  moveValidation: Symbol(),
  // Giveaway, Munching Chess, CTK, Allow Passing, Racing Kings
  boardModification: Symbol() // Chess 960, paradigm chess30, alt. teams

};

var Reporter = /*#__PURE__*/function () {
  function Reporter(topics) {
    _classCallCheck(this, Reporter);

    this.topics = topics.reduce(function (object, line) {
      return _objectSpread(_objectSpread({}, object), {}, _defineProperty({}, line, []));
    }, {});
    this.cases = new WeakMap();
    this.rules = [];
  }

  _createClass(Reporter, [{
    key: "addGameRules",
    value: function addGameRules(rules) {
      var _this = this;

      rules.forEach(function (rv) {
        if (rv.extendCategory && _this.topics[rv.extendCategory]) {
          _this.topics[rv.extendCategory].push(rv);
        }
      });
      this.rules = rules;
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return this.rules;
    }
  }, {
    key: "getProxy",
    value: function getProxy() {
      return new Proxy({}, {
        set: function set(target, prop, value) {
          if (!target[prop] || !target[prop].isFrozen || value === null) {
            if (value === null) {
              if (Reflect.has(target, prop)) {
                Reflect.deleteProperty(target, prop);
              }
            } else {
              var result = Reflect.set(target, prop, {
                passed: !value[0],
                isFrozen: value[1]
              });
              return Object.isExtensible(target) ? result : true;
            }
          }

          return true;
        }
      });
    }
  }, {
    key: "createCase",
    value: function createCase(topicLine) {
      if (!this.topics[topicLine]) return;
      var proxy = this.getProxy();
      var object = {
        uid: Symbol(),
        tests: proxy
      };
      this.cases.set(object, topicLine);
      return object;
    }
  }, {
    key: "createShallowCase",
    value: function createShallowCase(topicLine, inferredProxy, inferredClass) {
      if (!this.topics[topicLine]) return;
      var object = {
        uid: Symbol(),
        isShallow: true,
        proxyData: {
          baseObject: inferredProxy,
          baseClass: inferredClass
        },
        classMutations: [],
        objectMutations: [],
        addClassMutation: function addClassMutation(callback) {
          this.classMutations.push(callback);
        },
        addObjectMutation: function addObjectMutation(callback) {
          this.objectMutations.push(callback);
        }
      };
      this.cases.set(object, topicLine);
      return object;
    }
  }, {
    key: "evaluateCase",
    value: function evaluateCase(testCase, settings) {
      var ignoreOutput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (testCase.isShallow) {
        this.topics[this.cases.get(testCase)].forEach(function (rv) {
          if (rv.shallowEvaluate) rv.shallowEvaluate(testCase);
        });
        testCase.classMutations.forEach(function (m) {
          return m();
        });
        testCase.objectMutations.forEach(function (m) {
          return m();
        });
        this.resetCase(testCase);
      } else {
        if (!ignoreOutput) {
          this.topics[this.cases.get(testCase)].forEach(function (rv) {
            if (rv.evaluate) rv.evaluate(testCase.tests, settings);
          });
        }

        var passed = Object.values(testCase.tests).every(function (p) {
          return p.passed;
        });
        this.resetCase(testCase);
        return passed;
      }
    }
  }, {
    key: "evaluateCaseSuspended",
    value: function evaluateCaseSuspended(testCase, settings) {
      var _this2 = this;

      var ignoreOutput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (testCase.isShallow) {
        this.topics[this.cases.get(testCase)].forEach(function (rv) {
          if (rv.shallowEvaluate) rv.shallowEvaluate(testCase);
        });
        return function () {
          testCase.classMutations.forEach(function (m) {
            return m();
          });
          testCase.objectMutations.forEach(function (m) {
            return m();
          });

          _this2.resetCase(testCase);
        };
      } else {
        var suspendedCases = [];

        if (!ignoreOutput) {
          this.topics[this.cases.get(testCase)].forEach(function (rv) {
            if (rv.evaluate) {
              if (rv.suspended) {
                suspendedCases.push(rv);
              } else {
                rv.evaluate(testCase.tests, settings);
              }
            }
          });
        }

        return function () {
          if (!ignoreOutput) {
            Object.preventExtensions(testCase.tests);
            suspendedCases.forEach(function (rv) {
              return rv.evaluate(testCase.tests, settings);
            });
            var passed = Object.values(testCase.tests).every(function (p) {
              return p.passed;
            });

            _this2.resetCase(testCase);

            return passed;
          }
        };
      }
    }
  }, {
    key: "resetCase",
    value: function resetCase(testCase) {
      if (testCase.isShallow) {
        testCase = {};
      } else {
        testCase.tests = this.getProxy();
      }
    }
  }]);

  return Reporter;
}();



/***/ }),

/***/ "./src/main/client/javascript/logic/movegen/Variant.js":
/*!*************************************************************!*\
  !*** ./src/main/client/javascript/logic/movegen/Variant.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidewaysPawns": () => (/* binding */ SidewaysPawns),
/* harmony export */   "Torpedo": () => (/* binding */ Torpedo),
/* harmony export */   "AnyCapture": () => (/* binding */ AnyCapture),
/* harmony export */   "PromotionRank": () => (/* binding */ PromotionRank),
/* harmony export */   "PromoteTo": () => (/* binding */ PromoteTo),
/* harmony export */   "AlternativeTeams": () => (/* binding */ AlternativeTeams),
/* harmony export */   "ruleList": () => (/* binding */ ruleList),
/* harmony export */   "parseGameRules": () => (/* binding */ parseGameRules)
/* harmony export */ });
/* harmony import */ var _PieceControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PieceControl */ "./src/main/client/javascript/logic/movegen/PieceControl.js");
/* harmony import */ var _Reporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reporter */ "./src/main/client/javascript/logic/movegen/Reporter.js");
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Board */ "./src/main/client/javascript/logic/movegen/Board.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var ruleList = {};
var regExRules = {};

var SidewaysPawns = /*#__PURE__*/function () {
  function SidewaysPawns() {
    _classCallCheck(this, SidewaysPawns);

    ruleList["SidewaysPawns"] = this;
    this.extendCategory = _Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.moveGeneration;
  }

  _createClass(SidewaysPawns, [{
    key: "shallowEvaluate",
    value: function shallowEvaluate(object) {
      if (object.proxyData.baseClass.hooks.usePawnLogic) {
        object.addClassMutation(function () {
          object.proxyData.baseClass["extends"].push(function () {
            this.generateJumpAttack(-1, 0, _PieceControl__WEBPACK_IMPORTED_MODULE_0__.attackTypeEnum.moveOnly);
            this.generateJumpAttack(1, 0, _PieceControl__WEBPACK_IMPORTED_MODULE_0__.attackTypeEnum.moveOnly);
          }.bind(object.proxyData.baseClass));
        });
      }
    }
  }]);

  return SidewaysPawns;
}();

var Torpedo = /*#__PURE__*/function () {
  function Torpedo() {
    _classCallCheck(this, Torpedo);

    ruleList["Torpedo"] = this;
    this.extendCategory = _Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.moveGeneration;
  }

  _createClass(Torpedo, [{
    key: "shallowEvaluate",
    value: function shallowEvaluate(object) {
      if (object.proxyData.baseClass.hooks.usePawnLogic) {
        object.addClassMutation(function () {
          object.proxyData.baseClass["extends"].push(function () {
            this.baseRankActive = true;
          }.bind(object.proxyData.baseClass));
        });
      }
    }
  }]);

  return Torpedo;
}();

var AnyCapture = /*#__PURE__*/function () {
  function AnyCapture() {
    _classCallCheck(this, AnyCapture);

    ruleList["AnyCapture"] = this;
    this.extendCategory = _Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.moveGenerationLegality;
  }

  _createClass(AnyCapture, [{
    key: "evaluate",
    value: function evaluate(proxy, settings) {
      var _settings$arguments = settings.arguments,
          startX = _settings$arguments.startX,
          startY = _settings$arguments.startY,
          special = _settings$arguments.special;
      var _settings$inferredCla = settings.inferredClass,
          board = _settings$inferredCla.board,
          fenOptions = _settings$inferredCla.fenOptions;

      if (startX != null && startY != null) {
        if (special === _PieceControl__WEBPACK_IMPORTED_MODULE_0__.attackTypeEnum.moveOnly) return;
        if (!board[startY] || !board[startY][startX]) return;
        var piece = board[startY][startX];

        if (piece.length === 2) {
          var color = _Board__WEBPACK_IMPORTED_MODULE_2__.colorEnum[piece.charAt(0)];

          if (color && fenOptions.resigned[color] && fenOptions.zombieImmune[color]) {
            proxy.isBlocked = [true, true];
          } else {
            if (!!fenOptions.royal[color] && fenOptions.royal[color][0] === startX && fenOptions.royal[color][1] === startY) proxy.isBlocked = [true, true];else proxy.isBlocked = [false, false];
          }
        }
      }
    }
  }]);

  return AnyCapture;
}();

var PromotionRank = /*#__PURE__*/function () {
  function PromotionRank() {
    var match = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, PromotionRank);

    if (!match) regExRules['Prom=(\\d\\d?)'] = this instanceof PromotionRank ? this.constructor : void 0;else if (match[1]) {
      this.promotionRank = parseInt(match[1], 10) - 1;
    }
    this.extendCategory = _Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.moveGeneration;
  }

  _createClass(PromotionRank, [{
    key: "shallowEvaluate",
    value: function shallowEvaluate(object) {
      var _this = this;

      var hooks = object.proxyData.baseObject;

      if (hooks.usePawnLogic) {
        object.addObjectMutation(function () {
          if (_this.promotionRank === 98) {
            if (_typeof(hooks.usePawnLogic) !== 'object') {
              hooks.usePawnLogic = {
                promotionRanks: false
              };
            } else {
              hooks.usePawnLogic.promotionRanks = false;
            }
          } else {
            var promotionRanks = [13 - _this.promotionRank, _this.promotionRank, _this.promotionRank, 13 - _this.promotionRank];

            if (_typeof(hooks.usePawnLogic) !== 'object') {
              hooks.usePawnLogic = {
                promotionRanks: promotionRanks
              };
            } else {
              hooks.usePawnLogic.promotionRanks = promotionRanks;
            }
          }
        });
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return [13 - this.promotionRank, this.promotionRank, this.promotionRank, 13 - this.promotionRank];
    }
  }]);

  return PromotionRank;
}();

var PromoteTo = /*#__PURE__*/function () {
  function PromoteTo() {
    var match = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, PromoteTo);

    if (!match) regExRules['PromoteTo=([A-Zx]+)'] = this instanceof PromoteTo ? this.constructor : void 0;else if (match[1]) {
      this.promotionPieces = match[1].split("");
    }
    this.extendCategory = _Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.moveGeneration;
  }

  _createClass(PromoteTo, [{
    key: "shallowEvaluate",
    value: function shallowEvaluate(object) {
      var _this2 = this;

      var hooks = object.proxyData.baseObject;

      if (hooks.usePawnLogic) {
        object.addObjectMutation(function () {
          if (_typeof(hooks.usePawnLogic) !== 'object') {
            hooks.usePawnLogic = {
              promotionPieces: _this2.promotionPieces
            };
          } else {
            hooks.usePawnLogic.promotionPieces = _this2.promotionPieces;
          }
        });
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.promotionPieces;
    }
  }]);

  return PromoteTo;
}();

var AlternativeTeams = /*#__PURE__*/function () {
  function AlternativeTeams() {
    var match = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, AlternativeTeams);

    if (!match) regExRules['Teammate=(1|3)'] = this instanceof AlternativeTeams ? this.constructor : void 0;else if (match[1]) {
      this.teammate = parseInt(match[1], 10);
    }
    this.extendCategory = _Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.boardModification;
  }

  _createClass(AlternativeTeams, [{
    key: "shallowEvaluate",
    value: function shallowEvaluate(object) {
      var _this3 = this;

      var settings = object.proxyData.baseObject;

      if (!settings.isFFA()) {
        object.addObjectMutation(function () {
          if (_this3.teammate === 1) {
            settings.teamSettings.firstTeamColors = [true, true, false, false];
            settings.teamSettings.secondTeamColors = [false, false, true, true];
          } else {
            settings.teamSettings.firstTeamColors = [true, false, false, true];
            settings.teamSettings.secondTeamColors = [false, true, true, false];
          }
        });
      }
    }
  }]);

  return AlternativeTeams;
}();

[SidewaysPawns, Torpedo, AnyCapture, PromotionRank, PromoteTo, AlternativeTeams].forEach(function (rv) {
  return Reflect.construct(rv, []);
});

var parseGameRules = function parseGameRules(rules) {
  var finalList = [];
  var ruleList = rules.split(/\s+/);
  var regExRuleSet = new Set(Object.keys(regExRules));
  ruleList.forEach(function (rv) {
    if (!ruleList[rv]) {
      regExRuleSet.forEach(function (regex) {
        var match = rv.match(new RegExp(regex));

        if (match) {
          finalList.push(new regExRules[regex](match));
          regExRuleSet["delete"](regex);
        }
      });
    } else {
      finalList.push(ruleList[rv]);
    }
  });
  return finalList;
};



/***/ }),

/***/ "./src/main/client/javascript/logic/utils/CRC32.js":
/*!*********************************************************!*\
  !*** ./src/main/client/javascript/logic/utils/CRC32.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var crc32 = function () {
  var table = new Uint32Array(256);

  for (var i = 256; i--;) {
    var tmp = i;

    for (var k = 8; k--;) {
      tmp = tmp & 1 ? 3988292384 ^ tmp >>> 1 : tmp >>> 1;
    }

    table[i] = tmp;
  }

  var encoder = new TextEncoder();
  return function (str) {
    var arr = new Uint8Array();
    encoder.encodeInto(str, arr);
    var crc = -1;

    for (var _i = 0, l = arr.length; _i < l; _i++) {
      crc = crc >>> 8 ^ table[crc & 255 ^ arr[_i]];
    }

    return (crc ^ -1) >>> 0;
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (crc32);

/***/ }),

/***/ "./src/main/client/javascript/logic/utils/FENOptions.js":
/*!**************************************************************!*\
  !*** ./src/main/client/javascript/logic/utils/FENOptions.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createFENOptions)
/* harmony export */ });
/* harmony import */ var _movegen_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../movegen/Board */ "./src/main/client/javascript/logic/movegen/Board.js");
/* harmony import */ var _movegen_Reporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../movegen/Reporter */ "./src/main/client/javascript/logic/movegen/Reporter.js");
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



function createFENOptions() {
  var copySettings = function copySettings(object, base) {
    var val;

    if (_typeof(object) === 'object') {
      if (object === null) val = null;else {
        if (Array.isArray(object)) {
          val = object.map(copySettings);
        } else {
          val = Object.keys(object).reduce(function (p, n) {
            p[n] = copySettings(object[n], base);
            return p;
          }, {});
        }
      }
    } else if (typeof object !== 'function') {
      val = object;
    } else {
      val = object.bind(base);
    }

    return val;
  }; // The function has this set to the Board.js instance, and keeps the reference to the data object.


  function processRules(object, startX, startY, endX, endY, promotion) {
    var _this = this;

    var piece = promotion ? this.currentBoard[startY][startX].charAt(0).concat(promotion) : this.currentBoard[startY][startX];
    var endSquare = this.currentBoard[endY][endX];
    this.currentBoard[endY][endX] = piece;
    this.currentBoard[startY][startX] = '';
    object.fenOptions.royal = object.fenOptions.royal.map(function (r, i) {
      if (r) {
        if (r[0] === startX && r[1] === startY) {
          object.fenOptions.castleKingside[i] = false;
          object.fenOptions.castleQueenside[i] = false;
          return [endX, endY];
        } else return r.slice();
      } else return null;
    });

    if (object.fenOptions.enPassant && object.fenOptions.enPassant[object.sideToMove]) {
      object.fenOptions.enPassant[object.sideToMove] = '';
      if (object.fenOptions.enPassant.every(function (v) {
        return !v;
      })) object.fenOptions.enPassant = undefined;
    }

    var _this$getCheckmatesAn = this.getCheckmatesAndStalemates(),
        checkmates = _this$getCheckmatesAn.checkmates,
        stalemates = _this$getCheckmatesAn.stalemates;

    var totalMateSum = checkmates.reduce(function (p, n) {
      return n ? p + 20 : p;
    }, 0);
    var boardAlternations = {
      pointDistribution: {
        stalematePoints: stalemates.map(function (s, i) {
          return s && i === object.sideToMove ? 20 : 0;
        }),
        checkmatePoints: checkmates.map(function (_, i) {
          return i === object.sideToMove ? totalMateSum : 0;
        }),
        pieceCapturingPoints: Array(4).fill(0)
      },
      deadPieceList: [],
      takeoverPieceList: []
    };

    if (endSquare.length === 2) {
      var _this$controlsSetting, _this$controlsSetting2;

      boardAlternations.pointDistribution.pieceCapturingPoints[object.sideToMove] = (_this$controlsSetting = (_this$controlsSetting2 = this.controlsSettings.get(endSquare.charAt(1))) === null || _this$controlsSetting2 === void 0 ? void 0 : _this$controlsSetting2.points) !== null && _this$controlsSetting !== void 0 ? _this$controlsSetting : 0;
    }

    var detectedPieces = this.getPlayerPieces();
    detectedPieces.forEach(function (p, i) {
      if (checkmates[i] || i === object.sideToMove && stalemates[i]) {
        p.forEach(function (piece) {
          boardAlternations.deadPieceList.push(piece);
        });
        object.fenOptions.dead[i] = true;
      }
    });
    this.reporter.evaluateCase(this.reporter.createShallowCase(_movegen_Reporter__WEBPACK_IMPORTED_MODULE_1__.topicLines.fenOptions, boardAlternations, this));
    boardAlternations.deadPieceList.forEach(function (coord) {
      _this.currentBoard[coord[1]][coord[0]] = 'd' + _this.currentBoard[coord[1]][coord[0]].slice(1);
    });
    boardAlternations.takeoverPieceList.forEach(function (coord) {
      _this.currentBoard[coord[1]][coord[0]] = _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[object.sideToMove.toString()] + _this.currentBoard[coord[1]][coord[0]].slice(1);
    });

    if (this.gameType.isFFA()) {
      object.points = object.points.map(function (p, i) {
        return p + boardAlternations.pointDistribution.stalematePoints[i] + boardAlternations.pointDistribution.checkmatePoints[i] + boardAlternations.pointDistribution.pieceCapturingPoints[i];
      });
    }

    do {
      object.sideToMove = object.sideToMove === 3 ? 0 : object.sideToMove + 1;
    } while (object.fenOptions.dead[object.sideToMove]);
  }

  var validatedFenOptions = {
    zombieType: Array(4).fill(null),
    royal: undefined
  };
  return {
    points: [0, 0, 0, 0],
    sideToMove: 0,
    fenOptions: {
      dead: Array(4).fill(false),
      resigned: Array(4).fill(false),
      enPassant: undefined,
      castleKingside: Array(4).fill(false),
      castleQueenside: Array(4).fill(false),
      castleWith: 'R',
      boxOffset: 0,
      zombieImmune: Array(4).fill(null),
      pawnBaseRank: 2,
      wb: false,
      dimension: [14, 14],
      noCorners: true,
      lives: Array(4).fill(null),
      plyCount: 0,

      get zombieType() {
        return validatedFenOptions.zombieType.every(function (v) {
          return !v;
        }) ? false : validatedFenOptions.zombieType;
      },

      set zombieType(v) {
        validatedFenOptions.zombieType = v;
      },

      get royal() {
        return validatedFenOptions.royal;
      },

      set royal(v) {
        validatedFenOptions.royal = v.filter(function (v) {
          if (!v || typeof v === 'string') return true;else return v[0] >= 0 && v[0] < 14 && v[1] >= 0 && v[1] < 14;
        });
      }

    },
    constructPreliminaryHashString: function constructPreliminaryHashString(board) {
      var builder = '';
      builder + this.sideToMove, _readOnlyError("builder");
      this.points.reduce(function (p, n) {
        return p + '' + n;
      }, builder), _readOnlyError("builder");
      this.fenOptions.castleKingside.reduce(function (p, n) {
        return p + (n ? '1' : '0');
      }, builder), _readOnlyError("builder");
      this.fenOptions.castleQueenside.reduce(function (p, n) {
        return p + (n ? '1' : '0');
      }, builder), _readOnlyError("builder");
      this.fenOptions.lives.reduce(function (p, n) {
        return p + '' + (n !== null && n !== void 0 ? n : '');
      }, builder), _readOnlyError("builder");
      this.fenOptions.dead.reduce(function (p, n) {
        return p + (n ? '1' : '0');
      }, builder), _readOnlyError("builder");
      this.fenOptions.resigned.reduce(function (p, n) {
        return p + (n ? '1' : '0');
      }, builder), _readOnlyError("builder");
      this.fenOptions.resigned.reduce(function (p, n) {
        return p + (n ? '1' : '0');
      }, builder), _readOnlyError("builder");
      this.fenOptions.enPassant ? this.fenOptions.enPassant.reduce(function (p, n) {
        return p + '' + (n !== null && n !== void 0 ? n : '');
      }, builder) : builder, _readOnlyError("builder");
      board.reduce(function (p, n) {
        return p + n.join("-");
      }, builder), _readOnlyError("builder");
      return builder;
    },
    createVirtualEffect: function createVirtualEffect(board, startX, startY, endX, endY) {
      var promotion = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var newObject = copySettings(this, this);
      processRules.call(board, newObject, startX, startY, endX, endY, promotion, suppliedArguments);
      return newObject;
    },
    createVirtualCopy: function createVirtualCopy() {
      return copySettings(this, this);
    },
    affectOptions: function affectOptions(board, startX, startY, endX, endY) {
      var promotion = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      processRules.call(board, this, startX, startY, endX, endY, promotion);
    }
  };
}
;

/***/ }),

/***/ "./src/main/client/javascript/logic/utils/InsufficientMaterialGeneration.js":
/*!**********************************************************************************!*\
  !*** ./src/main/client/javascript/logic/utils/InsufficientMaterialGeneration.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _movegen_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../movegen/Board */ "./src/main/client/javascript/logic/movegen/Board.js");
/* harmony import */ var _movegen_Variant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../movegen/Variant */ "./src/main/client/javascript/logic/movegen/Variant.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }



var binaryMasks = Array(14).fill(1).map(function (v, i) {
  return v << 14 | v << 13 - i;
});

self.onmessage = function (_ref) {
  var board = _ref.data.board;
  // Step 1. Initialize the royals, get the optimal royal piece configuration.
  var possibleRoyals = [[], [], [], []];
  var boardSquares = board.getSquares(),
      options = board.getBoardData(),
      controls = board.getPieceControls(),
      reporter = board.getReporter();
  var promotionPieces = [],
      promotionRanks = [];
  reporter.getRules().forEach(function (r) {
    if (r instanceof _movegen_Variant__WEBPACK_IMPORTED_MODULE_1__.PromoteTo) {
      promotionPieces = r.getData();
    } else if (r instanceof _movegen_Variant__WEBPACK_IMPORTED_MODULE_1__.PromotionRank) {
      promotionRanks = r.getData();
    }
  });
  options.fenOptions.royal.forEach(function (r, i) {
    if (r) {
      if (controls.has(boardSquares[r[1]][r[0]]) && controls.get(boardSquares[r[1]][r[0]]).hooks.usePawnLogic) {
        possibleRoyals[i] = [boardSquares[r[1]][r[0]].charAt(1)].concat(_toConsumableArray(promotionPieces));
      } else possibleRoyals[i] = [boardSquares[r[1]][r[0]].charAt(1)];
    } else if (promotionPieces.includes("K")) {
      ["K"], _readOnlyError("possibleRoyals");
    }
  });
  var royalMoveSets = [["β", "W", "R", "E", "M", "Q", "D", "A"], ["γ", "F", "B", "H", "M", "Q", "D", "A", "Δ"], ["Y", "Z"], ["I", "J"], ["S", "T"], ["S", "Y"], ["I", "Y"], ["U", "N", "O", "M", "H", "A", "E", "Δ", "M", "V"], ["C", "L"], ["C", "V"]];
  var royalPieceSets = Array.from({
    length: 4
  }, function () {
    return new Set();
  });

  var _loop = function _loop(i) {
    if (possibleRoyals[i].length > 1) {
      royalMoveSets.forEach(function (e) {
        for (var _j5 = 0; _j5 < e.length; _j5++) {
          if (possibleRoyals[i].includes(e[_j5])) {
            var _ret = function () {
              var targetArr = e.slice(_j5 + 1);
              possibleRoyals[i].forEach(function (v) {
                if (!targetArr.includes(v)) {
                  royalPieceSets.add(v);
                }
              });
              return {
                v: void 0
              };
            }();

            if (_typeof(_ret) === "object") return _ret.v;
          }
        }

        possibleRoyals[i].forEach(function (v) {
          return royalPieceSets.add(v);
        });
      });
    } else if (possibleRoyals[i].length === 1) {
      royalPieceSets[i].add(possibleRoyals[i][0]);
    }
  };

  for (var i = 0; i < possibleRoyals.length; i++) {
    _loop(i);
  }

  performance.mark("insuffStart"); // Step 2. Get all the co-ordinates that a single piece can reach, and what can promoted pieces reach.

  var boardDestinations = new Map();
  var walls = "XxΘ";
  var emptyBoard = boardSquares.map(function (row) {
    return row.map(function (square) {
      return walls.includes(square) ? square : '';
    });
  });
  var virtualFenOptions = options.createVirtualCopy();
  var baseImmune = Array(4).fill(false);
  virtualFenOptions.fenOptions.royal = Array(4).fill(null);

  var getAllSquaresRecursively = function getAllSquaresRecursively(x, y, piece) {
    var currentSquares = new Set(),
        unvisitedSquares = new Set();
    var control = controls.get(piece.charAt(1));
    control.setColor(_movegen_Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[piece.charAt(0)]);

    if (control.hooks.usePawnLogic && options.fenOptions.pawnBaseRank < 13) {
      control.setBaseRankActive(options.fenOptions.pawnBaseRank - 1, x, y);
    }

    control.setBaseImmunePieces(baseImmune);

    var recurse = function recurse(x, y) {
      control.setCoordinates(emptyBoard, virtualFenOptions, [x, y]);
      var moves = control.getPseudoLegalMoves();
      if (moves.length === 0) return;
      moves.forEach(function (m) {
        var moveString = m[0] + ":" + m[1];

        if (!currentSquares.has(moveString)) {
          unvisitedSquares.add(moveString);
        }
      });

      var _iterator = _createForOfIteratorHelper(unvisitedSquares),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;

          var _value$split$map = value.split(":").map(function (v) {
            return parseInt(v, 10);
          }),
              _value$split$map2 = _slicedToArray(_value$split$map, 2),
              _x = _value$split$map2[0],
              _y = _value$split$map2[1];

          if (!currentSquares.has(value)) {
            currentSquares.add(value);
            recurse(_x, _y);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };

    recurse(x, y);
    var permutations = new Uint16Array(14).fill(1 << 14);
    currentSquares.forEach(function (value) {
      var valueArr = value.split(":").map(function (v) {
        return parseInt(v, 10);
      });
      permutations[valueArr[1]] |= binaryMasks[[valueArr[0]]];
    });
    unvisitedSquares.forEach(function (value) {
      var valueArr = value.split(":").map(function (v) {
        return parseInt(v, 10);
      });
      permutations[valueArr[1]] |= binaryMasks[[valueArr[0]]];
    });
    return permutations;
  };

  for (var _i2 = 0; _i2 < boardSquares.length; _i2++) {
    for (var j = 0; j < boardSquares[0].length; j++) {
      if (boardSquares[_i2][j].length === 2 && !boardSquares[_i2][j].startsWith("d")) {
        var piece = boardSquares[_i2][j].charAt(1);

        var permutations = getAllSquaresRecursively(j, _i2, boardSquares[_i2][j]);

        if (boardDestinations.has(piece)) {
          boardDestinations.set(piece, boardDestinations.get(piece).concat(permutations));
        } else {
          boardDestinations.set(piece, [permutations]);
        }
      }
    }
  }

  for (var _i3 = 0; _i3 < promotionPieces.length; _i3++) {
    for (var _j = 0; _j < promotionRanks.length; _j++) {
      var _piece = promotionPieces[_i3];
      var _x2 = 0,
          _y2 = 0;
      if (_j % 2 === 0) _y2 = promotionRanks[_j];else _x2 = promotionRanks[_j];

      var constructedPieceString = "p" + _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[_j.toString()] + _piece;

      var _permutations = getAllSquaresRecursively(_x2, _y2, boardSquares[_i3][_j]);

      if (boardDestinations.has(constructedPieceString)) {
        boardDestinations.set(constructedPieceString, boardDestinations.get(constructedPieceString).concat(_permutations));
      } else {
        boardDestinations.set(constructedPieceString, [_permutations]);
      }
    }
  }

  performance.mark("insuffEnd");
  performance.measure("measure1", "insuffStart", "insuffEnd");
  var registryIndexes = new Map();
  var registry = {};
  var entries = boardDestinations.entries();

  var _iterator2 = _createForOfIteratorHelper(entries),
      _step2;

  try {
    var _loop2 = function _loop2() {
      var entry = _step2.value;
      if (/[βαγδPG]/.test(entry[0])) return "continue";
      var isAlwaysIntersecting = true;
      var permutationArray = [];

      var _loop3 = function _loop3(_i7) {
        if (permutationArray.length === 0) {
          permutationArray.push(entry[1][_i7]);
        } else {
          var index = permutationArray.findIndex(function (uintArr) {
            return uintArr.every(function (n, j) {
              return n === entry[1][_i7][j];
            });
          });

          if (index > -1) {
            permutationArray.push(index);
          } else {
            permutationArray.push(entry[1][_i7]);
            isAlwaysIntersecting = false;
          }
        }
      };

      for (var _i7 = 0; _i7 < entry[1].length; _i7++) {
        _loop3(_i7);
      }

      if (!isAlwaysIntersecting) {
        var baseArray = [];
        permutationArray.forEach(function (uintArray) {
          if (typeof uintArray === 'number') return;
          var uid = Symbol();

          if (baseArray.length === 0) {
            uintArray.forEach(function (p) {
              var newArr = [];

              for (var _i8 = 0; _i8 < 14; _i8++) {
                newArr.push((p & binaryMasks[_i8]) === binaryMasks[_i8] ? uid : null);
              }

              baseArray.push(newArr);
            });
          } else {
            uintArray.forEach(function (p, j) {
              for (var _i9 = 0; _i9 < 14; _i9++) {
                if (!baseArray[j][_i9] && (p & binaryMasks[_i9]) === binaryMasks[_i9]) {
                  baseArray[j][_i9] = uid;
                }
              }
            });
          }

          registry[uid] = uintArray;
        });
        registryIndexes.set(entry[0], baseArray);
      }
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _ret2 = _loop2();

      if (_ret2 === "continue") continue;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  console.log(performance.getEntriesByType("measure")); // Step 3. Get all the possible squares the royal pieces can reach, and calculate the possible squares minus the opposition squares.
  // This will be a matrix of arrays of 2D arrays of a special object, with the covered squares being Uint16Arrays and the optimal square being an array of two numbers.

  var oppositionMatrix = Array.from({
    length: 4
  }, function () {
    return Array.from({
      length: 4
    }, function () {
      return null;
    });
  });

  var scanAttackSquares = function scanAttackSquares(piece) {
    var control = controls.get(piece);
    control.setColor(_movegen_Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[piece.charAt(0)]);

    if (control.hooks.usePawnLogic && options.fenOptions.pawnBaseRank < 13) {
      control.setBaseRankActive(options.fenOptions.pawnBaseRank - 1, x, y);
    }

    control.setBaseImmunePieces(baseImmune);
    var finalArray = Array.from({
      length: 14
    }, function () {
      return Array.from({
        length: 14
      }, function () {
        return null;
      });
    });

    for (var _i4 = 0; _i4 < boardSquares.length; _i4++) {
      for (var _j2 = 0; _j2 < boardSquares[0].length; _i4++) {
        if (emptyBoard[_i4][_j2].length === 0) {
          (function () {
            control.setCoordinates(emptyBoard, virtualFenOptions, [x, y]);
            var moves = control.getPseudoLegalMoves();
            var baseArray = Array.from({
              length: 14
            }, function () {
              return Array.from({
                length: 14
              }, function () {
                return '0';
              });
            });
            moves.forEach(function (m) {
              return baseArray[m[1]][m[0]] = '1';
            });
            var permutations = new Uint16Array(14);
            baseArray.forEach(function (r, i) {
              return permutations[i] = parseInt(r.join(""), 2);
            });
            finalArray[_i4][_j2] = permutations;
          })();
        }
      }
    }

    return finalArray;
  };

  for (var _i5 = 0; _i5 < possibleRoyals.length; _i5++) {
    for (var _j3 = 0; _j3 < possibleRoyals[_i5].length; _j3++) {
      var royal = possibleRoyals[_i5][_j3];
      if (!oppositionMatrix[_i5][_i5]) oppositionMatrix[_i5][_i5] = [];

      oppositionMatrix[_i5][_i5].push(scanAttackSquares(royal));
    }
  }

  for (var _i6 = 0; _i6 < oppositionMatrix.length; _i6++) {
    for (var _j4 = 0; _j4 < oppositionMatrix[0].length; _j4++) {
      if (_i6 === _j4) continue;
    }
  }
};

/***/ }),

/***/ "./src/main/client/javascript/logic/utils/MoveTree.js":
/*!************************************************************!*\
  !*** ./src/main/client/javascript/logic/utils/MoveTree.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lineSymbols": () => (/* binding */ lineSymbols),
/* harmony export */   "moveTypesSpecial": () => (/* binding */ moveTypesSpecial),
/* harmony export */   "createMoveTree": () => (/* binding */ createMoveTree)
/* harmony export */ });
/* harmony import */ var _movegen_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../movegen/Board */ "./src/main/client/javascript/logic/movegen/Board.js");
/* harmony import */ var _CRC32__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CRC32 */ "./src/main/client/javascript/logic/utils/CRC32.js");
/* harmony import */ var _Parsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Parsers */ "./src/main/client/javascript/logic/utils/Parsers.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }




var lineSymbols = {
  lineStart: Symbol(),
  lineEnd: Symbol()
};
var moveTypesSpecial = {
  castling: Symbol()
};

function createMoveDataFromPGN(moveString) {
  var move = {
    startCoordinates: [],
    endCoordinates: []
  };

  if (/O-O-?O?.*/.test(moveString)) {
    move.specialType = moveTypesSpecial.castling;
  } else {
    var coordinates = moveString.match(/[A-ZΑ-ω]([a-n]\d{1,2})(?:-|x)[A-ZΑ-ω]?([a-n]\d{1,2})/);
    move.startCoordinates = (0,_Parsers__WEBPACK_IMPORTED_MODULE_2__.parseSingleCoordinate)(coordinates[1]);
    move.endCoordinates = (0,_Parsers__WEBPACK_IMPORTED_MODULE_2__.parseSingleCoordinate)(coordinates[2]);
  }

  return move;
}

function createMoveTree() {
  var getSelection = function getSelection(root, path) {
    var currentSelection = root;

    for (var i = 0; i < path.length; i++) {
      if (Array.isArray(currentSelection)) {
        currentSelection = currentSelection[path[i]];
      } else {
        var _currentSelection;

        if ((_currentSelection = currentSelection) !== null && _currentSelection !== void 0 && _currentSelection.alternativeLines) {
          var _currentSelection2;

          currentSelection = (_currentSelection2 = currentSelection) === null || _currentSelection2 === void 0 ? void 0 : _currentSelection2.alternativeLines[path[i]];
        } else {
          currentSelection.alternativeLines = [];
          currentSelection = currentSelection.alternativeLines;
        }

        if (!currentSelection) return undefined;
      }
    }

    return currentSelection;
  };

  var generateObject = function generateObject(object, current) {
    var _ref, _ref2, _ref3, _ref4, _ref5;

    var suffix = '';
    var stripRegex = /\+#/g;

    switch (current[0]) {
      case 'moveName':
        var stripped = current[1].replace(stripRegex, '');
        object.moveName = stripped;
        object.moveData = createMoveDataFromPGN(stripped);
        break;

      case 'type':
        object.isResigned = (_ref = current[1].type === _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.resign) !== null && _ref !== void 0 ? _ref : false;
        object.isPassing = (_ref2 = current[1].type === _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.pass) !== null && _ref2 !== void 0 ? _ref2 : false;
        object.isTimeout = (_ref3 = current[1].type === _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.timeout) !== null && _ref3 !== void 0 ? _ref3 : false;
        object.isStalemate = (_ref4 = current[1].type === _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.stalemate) !== null && _ref4 !== void 0 ? _ref4 : false;
        object.isDraw = (_ref5 = current[1].type === _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.draw) !== null && _ref5 !== void 0 ? _ref5 : false;
        break;

      case 'comment':
        object.comment = current[1];
        break;

      case 'suffix':
        suffix = current[1].replace(stripRegex, '');

        if (suffix.startsWith('=')) {
          object.isPromotion = suffix.slice(1);
        }

        break;
    }

    if (suffix && object.moveName) object.moveName = object.moveName + suffix;
  };

  return _defineProperty({
    moves: [],
    currentMove: [0],
    boardHashes: new Map(),
    setNewMove: function setNewMove(path, move) {
      if (_typeof(move) !== 'object') return;
      var selection = getSelection(this.moves, path);

      if (selection) {
        if (Array.isArray(selection)) {
          selection.push(move[1]);
        } else {
          selection.alternativeLines = [];
          selection.alternativeLines.push([move[1]]);
        }
      }
    },
    getMove: function getMove(path) {
      var selection = getSelection(this.moves, path);
      var object = {};

      if (selection && typeof path[path.length - 1] === 'string') {
        object = selection[path[path.length - 1]];
      } else object = selection;

      var result = {};

      for (var _i = 0, _Object$entries = Object.entries(object); _i < _Object$entries.length; _i++) {
        var entry = _Object$entries[_i];

        if (entry[0] !== 'alternativeLines') {
          generateObject(result, entry);
        }
      }

      return result;
    },
    setHash: function setHash(data, board) {
      var str = data.constructPreliminaryHashString(board);
      var hash = (0,_CRC32__WEBPACK_IMPORTED_MODULE_1__["default"])(str);

      if (this.boardHashes.has(hash)) {
        this.boardHashes.set(hash, this.boardHashes.get(hash) + 1);
      } else {
        this.boardHashes.set(hash, 1);
      }
    },
    getHash: function getHash(data, board) {
      var str = data.constructPreliminaryHashString(board);
      var hash = (0,_CRC32__WEBPACK_IMPORTED_MODULE_1__["default"])(str);
      return this.boardHashes.has(hash) ? this.boardHashes.get(hash) : 0;
    }
  }, Symbol.iterator, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _marked, getEntries;

    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            getEntries = function _getEntries(entries, path) {
              var object, index, current, isAltGen, _i2, _Object$entries2, entry, _ref6;

              return _regeneratorRuntime().wrap(function getEntries$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      object = {};
                      index = 0;
                      current = entries[index];

                    case 3:
                      if (!(index < entries.length)) {
                        _context.next = 23;
                        break;
                      }

                      path.push(index);
                      isAltGen = null;

                      for (_i2 = 0, _Object$entries2 = Object.entries(current); _i2 < _Object$entries2.length; _i2++) {
                        entry = _Object$entries2[_i2];

                        if (entry[0] === 'alternativeLines') {
                          isAltGen = entry[1].length ? entry[1] : false;
                        } else {
                          generateObject(object, entry);
                        }
                      }

                      object.path = path.slice();
                      _context.next = 10;
                      return object;

                    case 10:
                      object = new Object();

                      if (!isAltGen) {
                        _context.next = 17;
                        break;
                      }

                      _context.next = 14;
                      return lineSymbols.lineStart;

                    case 14:
                      return _context.delegateYield(getEntries(isAltGen, path), "t0", 15);

                    case 15:
                      _context.next = 17;
                      return lineSymbols.lineEnd;

                    case 17:
                      _ref6 = [++index, entries[index]];
                      index = _ref6[0];
                      current = _ref6[1];
                      path.pop(index);
                      _context.next = 3;
                      break;

                    case 23:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _marked);
            };

            _marked = /*#__PURE__*/_regeneratorRuntime().mark(getEntries);
            return _context2.delegateYield(getEntries(this.moves, []), "t0", 3);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this);
  }));
}



/***/ }),

/***/ "./src/main/client/javascript/logic/utils/Parsers.js":
/*!***********************************************************!*\
  !*** ./src/main/client/javascript/logic/utils/Parsers.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseSingleCoordinate": () => (/* binding */ parseSingleCoordinate),
/* harmony export */   "parseEnPassantCoordinates": () => (/* binding */ parseEnPassantCoordinates),
/* harmony export */   "parsePGN4moves": () => (/* binding */ parsePGN4moves),
/* harmony export */   "parseFEN4": () => (/* binding */ parseFEN4)
/* harmony export */ });
/* harmony import */ var _movegen_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../movegen/Board */ "./src/main/client/javascript/logic/movegen/Board.js");
/* harmony import */ var _FENOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FENOptions */ "./src/main/client/javascript/logic/utils/FENOptions.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var parseSingleCoordinate = function parseSingleCoordinate(coordinate) {
  if (coordinate.length === 0) return null;
  return [coordinate.charCodeAt(0) - 97, 14 - parseInt(coordinate.slice(1), 10)];
};

var parseEnPassantCoordinates = function parseEnPassantCoordinates(coordinates) {
  if (coordinates.length === 0) return null;
  var coordinatesArray = coordinates.split(":");
  return [[coordinatesArray[0].charCodeAt(0) - 97, 14 - parseInt(coordinatesArray[0].slice(1), 10)], [coordinatesArray[1].charCodeAt(0) - 97, 14 - parseInt(coordinatesArray[1].slice(1), 10)]];
};

var parsePGN4moves = function parsePGN4moves(moves) {
  var constants = {
    SPLIT: '.',
    PIECE_REGEX: /[xA-ZΑ-ωa-n0-9-=+#]/,
    PIECE_REGEX_SIMPLIFIED: /[A-ZΑ-ωa-n0-9-]/,
    BRACKETS: {
      COMMENT_START: '{',
      COMMENT_END: '}',
      VARIATION_START: '(',
      VARIATION_END: ')'
    }
  };

  var parseMoves = function parseMoves(moves, path) {
    var moveList = [];
    var currentPath = path;

    var getMoveIndexes = function getMoveIndexes(mI) {
      while (moves[mI] && constants.PIECE_REGEX.test(moves[mI])) {
        mI++;
      }

      return mI;
    };

    var parseComment = function parseComment(mI) {
      while (moves[mI] && moves[mI] !== constants.BRACKETS.COMMENT_END) {
        mI++;
      }

      return mI;
    };

    var getEnumeratorIndex = function getEnumeratorIndex(mI) {
      while (moves[mI] && /\d|\./.test(moves[mI])) {
        mI++;
      }

      return --mI;
    };

    var findBracketIndex = function findBracketIndex(i) {
      var depth = 0;

      for (; i < moves.length; i++) {
        switch (moves[i]) {
          case constants.BRACKETS.COMMENT_START:
            i = parseComment(i);
            break;

          case constants.BRACKETS.VARIATION_START:
            depth++;
            break;

          case constants.BRACKETS.VARIATION_END:
            if (--depth === 0) {
              return i;
            }

            break;
        }
      }

      console.error("No closing matching parentheses");
      return i;
    };

    var setName = function setName(move, name) {
      if (name.endsWith(_movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.resign)) move.type = _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.resign;
      if (name.endsWith(_movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.timeout)) move.type = _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.timeout;
      if (name.endsWith(_movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.stalemate)) move.type = _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.stalemate;
      if (name === _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.pass || move.type === _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.specialMovesEnum.draw) move.type = name;
      var promotionMatch = name.match(/.*?(=[A-Zx])/);

      if (promotionMatch && promotionMatch[1]) {
        move.suffix = promotionMatch[1];
      }

      move.moveName = name;
      console.log(promotionMatch, move);
    };

    var currentMove = {
      alternativeLines: []
    };
    var increment = -1,
        variationIncrement = -1;

    for (var i = 0; i < moves.length; i++) {
      var beNaN = isNaN(moves[i]);

      if (beNaN && !/\s/.test(moves[i]) && moves[i] !== constants.SPLIT) {
        if (constants.PIECE_REGEX_SIMPLIFIED.test(moves[i])) {
          var indexes = getMoveIndexes(i);
          setName(currentMove, moves.substring(i, indexes));
          i = indexes - 1;
        } else if (moves[i] === constants.BRACKETS.COMMENT_START) {
          var _indexes = parseComment(i);

          currentMove.comment = moves.substring(i + 1, _indexes);
          i = _indexes;
        } else if (moves[i] === constants.BRACKETS.VARIATION_START) {
          var index = findBracketIndex(i);
          currentPath.push(increment + 1, ++variationIncrement);
          currentMove.alternativeLines.push(parseMoves(moves.substring(i + 1, index), currentPath.slice()));
          currentPath.pop();
          currentPath.pop();
          i = index;
        }
      } else if (moves[i] === constants.SPLIT && moves[i + 1] && moves[i + 1] === constants.SPLIT || moves[i].trim() && !beNaN && moves[i + 1] && (moves[i + 1] === constants.SPLIT || !isNaN(moves[i + 1]))) {
        if (!beNaN) i = getEnumeratorIndex(i);

        if (currentMove.moveName) {
          currentPath.push(++increment);
          currentMove.path = currentPath.slice();
          currentPath.pop();
          moveList.push(Object.assign({}, currentMove));
        }

        currentMove = {
          alternativeLines: []
        };
      }
    }

    if (currentMove.moveName) {
      currentPath.push(++increment);
      currentMove.path = currentPath.slice();
      moveList.push(Object.assign({}, currentMove));
    }

    return moveList;
  };

  return parseMoves(moves, []);
};

var parseFEN4 = function parseFEN4(fen4, addControlCallback) {
  var data = (0,_FENOptions__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var board = [];
  var parts = fen4.split("-");

  if (parts.length < 7 || parts[parts.length - 1].split("/").length !== 14) {
    console.error("FEN has less than 7 parts");
  } else {
    data.sideToMove = _movegen_Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[parts[0].charAt(0).toLowerCase()];
    data.fenOptions.dead = parts[1].split(",").map(function (e) {
      return parseInt(e, 10);
    });
    data.fenOptions.castleKingside = parts[2].split(",").map(function (e) {
      return parseInt(e, 10);
    });
    data.fenOptions.castleQueenside = parts[3].split(",").map(function (e) {
      return parseInt(e, 10);
    });
    data.points = parts[4].split(",").map(function (e) {
      return parseInt(e, 10);
    });
    data.fenOptions.plyCount = parseInt(parts[5], 10);

    try {
      if (parts[6].startsWith("{")) {
        var extra = JSON.parse(parts[6].replaceAll("\(", '[').replaceAll(")", "]").replaceAll("'", '"'));
        ["enPassant", "zombieType", "zombieImmune", "pawnBaseRank", "wb", "boxOffset", "noCorners", "lives", "castleWith", "royal"].forEach(function (e) {
          if (extra[e]) data.fenOptions[e] = extra[e];
        });
        var res = [];
        if (extra.resigned) res.push(extra.resigned);
        if (extra.stalemated) res.push(extra.stalemated);
        if (extra.flagged) res.push(extra.flagged);
        data.fenOptions.resigned = res[0] ? res[0].map(function (_, i) {
          return res.some(function (a) {
            return a[i];
          });
        }) : Array(4).fill(false);

        if (extra.dim) {
          data.fenOptions.dimension = extra.dim.split("x").map(function (e) {
            return parseInt(e, 10);
          });
        }
      }
    } catch (_) {
      fallback();
    }

    var fenPart = parts[6].startsWith("{") ? parts[7] : parts[6];
    var detectedRoyals = [null, null, null, null];
    fenPart.split("/").forEach(function (line, i) {
      board.push([]);
      var j = 0;
      line.split(",").forEach(function (p) {
        var altP = p.endsWith('"') ? p.slice(0, -1) : p;

        if (isNaN(altP)) {
          board[i].push(altP);

          if (!data.fenOptions.royal && !altP.startsWith("d") && altP.length !== 1) {
            if (altP.charAt(1) === "K") {
              detectedRoyals[_movegen_Board__WEBPACK_IMPORTED_MODULE_0__.colorEnum[altP.charAt(0)]] = [j, i];
            }
          }

          addControlCallback(altP);
        } else {
          var _board$i;

          (_board$i = board[i]).push.apply(_board$i, _toConsumableArray(Array(parseInt(altP, 10)).fill("")));

          j += parseInt(altP, 10) - 1;
        }

        j++;
      });
    });

    if (data.fenOptions.enPassant) {
      data.fenOptions.enPassant = data.fenOptions.enPassant.map(function (s) {
        return parseEnPassantCoordinates(s);
      });
    } else data.fenOptions.enPassant = Array(4).fill(null);

    if (data.fenOptions.royal) {
      data.fenOptions.royal = data.fenOptions.royal.map(function (s) {
        return parseSingleCoordinate(s);
      });
    } else data.fenOptions.royal = detectedRoyals;

    console.log(data.fenOptions);
  }

  return {
    board: board,
    data: data
  };
};



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
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".react-app.js";
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
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = self.location + "";
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_main_client_javascript_logic_movegen_Board_js": 1
/******/ 		};
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/client/javascript/logic/utils/InsufficientMaterialGeneration.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=src_main_client_javascript_logic_movegen_Board_js.react-app.js.map