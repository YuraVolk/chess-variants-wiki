"use strict";
(self["webpackChunkspring_react_app"] = self["webpackChunkspring_react_app"] || []).push([["src_main_client_ts_logic_movegen_VariantRules_VariantRuleDefinitions_BoardVariantModules_Insu-520908"],{

/***/ "./src/main/client/ts/baseTypes.ts":
/*!*****************************************!*\
  !*** ./src/main/client/ts/baseTypes.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assertNonUndefined": function() { return /* binding */ assertNonUndefined; },
/* harmony export */   "createTuple": function() { return /* binding */ createTuple; },
/* harmony export */   "createTupleFromCallback": function() { return /* binding */ createTupleFromCallback; },
/* harmony export */   "getEnumKeys": function() { return /* binding */ getEnumKeys; },
/* harmony export */   "importAll": function() { return /* binding */ importAll; },
/* harmony export */   "throwOnNever": function() { return /* binding */ throwOnNever; },
/* harmony export */   "verifyFunctionType": function() { return /* binding */ verifyFunctionType; },
/* harmony export */   "verifyTupleType": function() { return /* binding */ verifyTupleType; }
/* harmony export */ });
// eslint-disable-next-line @typescript-eslint/no-explicit-any

var verifyFunctionType = func => typeof func === "function";
var createTuple = (val, length) => Array.from({
  length
}).fill(val);
var createTupleFromCallback = (val, length) => Array.from({
  length
}, val);
var verifyTupleType = (arr, length) => arr.length === length;
function assertNonUndefined(data) {
  if (data == null) throw new Error("Expected the data above to be anything but null or undefined");
}
function throwOnNever(arg) {
  console.dir(arg);
  throw new TypeError("Unexpected argument that is supposed to be of type never");
}
function importAll(r) {
  r.keys().forEach(r);
}
function getEnumKeys(object) {
  var resultingArray = [];
  var key;
  for (key in object) resultingArray.push(key);
  return resultingArray;
}

/***/ }),

/***/ "./src/main/client/ts/logic/BaseInterfaces.ts":
/*!****************************************************!*\
  !*** ./src/main/client/ts/logic/BaseInterfaces.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHorizontalPlacementModulus": function() { return /* binding */ getHorizontalPlacementModulus; },
/* harmony export */   "getVerticalPlacementModulus": function() { return /* binding */ getVerticalPlacementModulus; },
/* harmony export */   "initializeBoardSquares": function() { return /* binding */ initializeBoardSquares; },
/* harmony export */   "isVerticalPlacement": function() { return /* binding */ isVerticalPlacement; }
/* harmony export */ });
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _movegen_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movegen/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");


var initializeBoardSquares = baseValue => (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(baseValue, _movegen_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension), _movegen_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension);
var isVerticalPlacement = color => color % 2 === 0;
function getVerticalPlacementModulus(num) {
  var result = num % 2;
  if (result !== 0 && result !== 1) throw new Error("Invalid number passed: ".concat(num));
  return result;
}
function getHorizontalPlacementModulus(num) {
  var result = num % 2 ^ 1;
  if (result !== 0 && result !== 1) throw new Error("Invalid number passed: ".concat(num));
  return result;
}

/***/ }),

/***/ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts":
/*!**********************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/GameInformation/GameData.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeControlType": function() { return /* binding */ TimeControlType; },
/* harmony export */   "VariantType": function() { return /* binding */ VariantType; },
/* harmony export */   "boardDimension": function() { return /* binding */ boardDimension; },
/* harmony export */   "colors": function() { return /* binding */ colors; },
/* harmony export */   "convertCoordinateToPGN4": function() { return /* binding */ convertCoordinateToPGN4; },
/* harmony export */   "convertCoordinateToPGN4Array": function() { return /* binding */ convertCoordinateToPGN4Array; },
/* harmony export */   "createDefaultNumericColorAdjustment": function() { return /* binding */ createDefaultNumericColorAdjustment; },
/* harmony export */   "getOppositePlacedColor": function() { return /* binding */ getOppositePlacedColor; },
/* harmony export */   "getPlayerNameFromColor": function() { return /* binding */ getPlayerNameFromColor; },
/* harmony export */   "obtainTimeControlType": function() { return /* binding */ obtainTimeControlType; },
/* harmony export */   "playerNames": function() { return /* binding */ playerNames; },
/* harmony export */   "stringifyTimeControl": function() { return /* binding */ stringifyTimeControl; },
/* harmony export */   "totalPlayers": function() { return /* binding */ totalPlayers; },
/* harmony export */   "validateComprehensiveUnionArray": function() { return /* binding */ validateComprehensiveUnionArray; },
/* harmony export */   "validateTerminationString": function() { return /* binding */ validateTerminationString; },
/* harmony export */   "verifyDrawingTermination": function() { return /* binding */ verifyDrawingTermination; },
/* harmony export */   "verifyWinningTermination": function() { return /* binding */ verifyWinningTermination; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/NumberUtils */ "./src/main/client/ts/utils/NumberUtils.ts");


var validateComprehensiveUnionArray = () => arr => arr;
var playerNames = validateComprehensiveUnionArray()(["Red", "Blue", "Yellow", "Green", "White", "Black"]);
var individualTerminations = validateComprehensiveUnionArray()(["Won the Race", "Checkmated", "Stalemated", "Forfeits on Time", "Claimed the Win", "Resigned"]);
var generalWinningTerminations = validateComprehensiveUnionArray()(["Checkmate", "King Captured", "King of the Hill", "Stalemate"]);
var verifyWinningTermination = termination => {
  var generalWins = generalWinningTerminations;
  return generalWins.includes(termination);
};
var generalDrawingTerminations = validateComprehensiveUnionArray()(["50-move Rule", "Insufficient Material", "Threefold Repetition", "Timeout vs Insufficient Material"]);
var verifyDrawingTermination = termination => {
  var generalDraws = generalDrawingTerminations;
  return generalDraws.includes(termination);
};
var generalTerminations = validateComprehensiveUnionArray()([...generalWinningTerminations, ...generalDrawingTerminations]);
var results = validateComprehensiveUnionArray()(["0-1", "1-0", "½-½"]);
var validateTerminationString = termination => {
  var capitalizedTermination = termination.toUpperCase();
  if (playerNames.some(str => capitalizedTermination.startsWith(str.toUpperCase())) && individualTerminations.some(str => capitalizedTermination.endsWith(str.toUpperCase() + "!"))) {
    return true;
  } else if (/.*?\s•\s.*/.test(capitalizedTermination) && generalTerminations.some(str => capitalizedTermination.startsWith(str.toUpperCase())) && results.some(str => capitalizedTermination.endsWith(str.toUpperCase()))) {
    return true;
  } else if (capitalizedTermination === "½-½ AGREED.") {
    return true;
  }
  return false;
};
var stringifyTimeControl = timeControl => {
  var noIncrement = timeControl.increment === 0;
  var timeControlString = "";
  if (timeControl.baseTime < 60) {
    timeControlString += noIncrement ? "".concat(timeControl.baseTime * 60, " sec") : "".concat(timeControl.baseTime * 60, "s");
  } else if (timeControl.baseTime > 60 && noIncrement) {
    timeControlString += "".concat((0,_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.truncateNumber)(timeControl.baseTime / 60, 1), " min");
  } else {
    timeControlString += (0,_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.truncateNumber)(timeControl.baseTime / 60, 1);
  }
  if (!noIncrement) {
    timeControlString += "|";
    timeControlString += timeControl.increment;
  }
  if (timeControl.isDelay) {
    timeControlString += "D";
  }
  return timeControlString;
};
var obtainTimeControlType = timeControl => {
  var baseTime = timeControl.baseTime,
    increment = timeControl.increment,
    isDelay = timeControl.isDelay;
  if (isDelay) {
    var formula = baseTime / 40 + increment;
    if (formula > 11.5) {
      return TimeControlType.Rapid;
    } else if (formula <= 1.375) {
      return TimeControlType.Hyperbullet;
    } else if (formula <= 4.5) {
      return TimeControlType.Bullet;
    } else {
      return TimeControlType.Blitz;
    }
  } else {
    var _formula = baseTime / 60 + increment;
    if (_formula > 7.5) {
      return TimeControlType.Rapid;
    } else if (_formula <= 0.5) {
      return TimeControlType.Hyperbullet;
    } else if (_formula <= 3) {
      return TimeControlType.Bullet;
    } else {
      return TimeControlType.Blitz;
    }
  }
};
var convertCoordinateToPGN4 = function convertCoordinateToPGN4(coordinate) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : boardDimension;
  if (dimension === boardDimension) {
    return "".concat(String.fromCharCode(coordinate[1] + 97)).concat(boardDimension - coordinate[0]);
  } else {
    var alternation = (boardDimension - dimension) / 2;
    return "".concat(String.fromCharCode(coordinate[1] - alternation + 97)).concat(boardDimension - coordinate[0] - alternation);
  }
};
var convertCoordinateToPGN4Array = function convertCoordinateToPGN4Array(coordinate) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : boardDimension;
  if (dimension === boardDimension) {
    return [String.fromCharCode(coordinate[1] + 97), boardDimension - coordinate[0]];
  } else {
    var alternation = (boardDimension - dimension) / 2;
    return [String.fromCharCode(coordinate[1] - alternation + 97), boardDimension - coordinate[0] - alternation];
  }
};
var getOppositePlacedColor = color => {
  switch (color) {
    case 0:
      return 2;
    case 1:
      return 3;
    case 2:
      return 0;
    case 3:
      return 1;
    default:
      return (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.throwOnNever)(color);
  }
};
var getPlayerNameFromColor = function getPlayerNameFromColor(color) {
  var wb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  switch (color) {
    case 0:
      return wb ? "White" : "Red";
    case 1:
      return "Blue";
    case 2:
      return wb ? "Black" : "Yellow";
    case 3:
      return "Green";
    default:
      return (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.throwOnNever)(color);
  }
};
var createDefaultNumericColorAdjustment = () => ({
  wb: false
});
var TimeControlType = /*#__PURE__*/function (TimeControlType) {
  TimeControlType["Hyperbullet"] = "Hyperbullet";
  TimeControlType["Bullet"] = "Bullet";
  TimeControlType["Blitz"] = "Blitz";
  TimeControlType["Rapid"] = "Rapid";
  return TimeControlType;
}({});
var VariantType = /*#__PURE__*/function (VariantType) {
  VariantType["FFA"] = "FFA";
  VariantType["Teams"] = "Teams";
  VariantType["Solo"] = "Solo";
  return VariantType;
}({});
var totalPlayers = 4;
var boardDimension = 14;
var colors = [0, 1, 2, 3];

/***/ }),

/***/ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colorEnum": function() { return /* binding */ colorEnum; },
/* harmony export */   "nonPlayablePieces": function() { return /* binding */ nonPlayablePieces; },
/* harmony export */   "playerEnum": function() { return /* binding */ playerEnum; },
/* harmony export */   "stringColorEnum": function() { return /* binding */ stringColorEnum; },
/* harmony export */   "verifyColorEnumValue": function() { return /* binding */ verifyColorEnumValue; },
/* harmony export */   "verifyNumericColor": function() { return /* binding */ verifyNumericColor; },
/* harmony export */   "verifyPlayerEnumValue": function() { return /* binding */ verifyPlayerEnumValue; }
/* harmony export */ });
var verifyNumericColor = num => num >= 0 && num < 4;
var nonPlayablePieces = {
  wall: "X",
  transparentWall: "x",
  duck: "Θ"
};
var colorEnum = {
  r: 0,
  b: 1,
  y: 2,
  g: 3
};
var verifyColorEnumValue = value => value in colorEnum;
var playerEnum = {
  Red: 0,
  Blue: 1,
  Yellow: 2,
  Green: 3,
  White: 0,
  Black: 2
};
var verifyPlayerEnumValue = player => player in playerEnum;
var stringColorEnum = {
  [0]: "r",
  [1]: "b",
  [2]: "y",
  [3]: "g",
  [4]: "d"
};

/***/ }),

/***/ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts":
/*!********************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttackType": function() { return /* binding */ AttackType; },
/* harmony export */   "createPieceDeclaration": function() { return /* binding */ createPieceDeclaration; },
/* harmony export */   "dameLetter": function() { return /* binding */ dameLetter; },
/* harmony export */   "defaultPieces": function() { return /* binding */ defaultPieces; },
/* harmony export */   "duckLetter": function() { return /* binding */ duckLetter; },
/* harmony export */   "emptyLetter": function() { return /* binding */ emptyLetter; },
/* harmony export */   "grasshopperPieceLetter": function() { return /* binding */ grasshopperPieceLetter; },
/* harmony export */   "nonPlayableValues": function() { return /* binding */ nonPlayableValues; },
/* harmony export */   "pawnPieceLetter": function() { return /* binding */ pawnPieceLetter; },
/* harmony export */   "pieceControlConfigSettings": function() { return /* binding */ pieceControlConfigSettings; },
/* harmony export */   "verifyPieceLetter": function() { return /* binding */ verifyPieceLetter; },
/* harmony export */   "wallPieceLetter": function() { return /* binding */ wallPieceLetter; }
/* harmony export */ });
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var AttackType = {
  Normal: 0,
  MoveOnly: 1,
  AttackOnly: 2,
  RayGen: 3,
  RayTrace: 4,
  RayTraceLimited: 5
};
var nonPlayableValues = Object.values(_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.nonPlayablePieces);
var verifyPieceLetter = piece => piece in pieceControlConfigSettings || nonPlayableValues.includes(piece);
var pieceControlConfigSettings = nonPlayableValues.reduce((p, n) => _objectSpread(_objectSpread({}, p), {}, {
  [n]: {
    points: {
      singlesPoints: 0,
      teamsPoints: 0,
      botFFAValue: 0,
      botTeamsValue: 0
    },
    piece: n,
    moveGenerationSettings: {
      isComplex: false,
      isJumping: false,
      isSliding: false,
      isPawn: false
    },
    naming: {
      name: "Wall",
      shortName: n
    }
  }
}), {});
var createPieceDeclaration = configuration => {
  pieceControlConfigSettings[configuration.configuration.piece] = _objectSpread(_objectSpread({}, configuration.configuration), {}, {
    construct: configuration.baseClassRef
  });
  return new configuration.baseClassRef();
};
function createPredefinedPieceLetter(letter) {
  return letter;
}
var pawnPieceLetter = createPredefinedPieceLetter("P");
var wallPieceLetter = createPredefinedPieceLetter(_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.nonPlayablePieces.wall);
var grasshopperPieceLetter = createPredefinedPieceLetter("G");
var defaultPieces = {
  queen: createPredefinedPieceLetter("Q"),
  rook: createPredefinedPieceLetter("R"),
  bishop: createPredefinedPieceLetter("B"),
  knight: createPredefinedPieceLetter("N"),
  king: createPredefinedPieceLetter("K")
};
var emptyLetter = createPredefinedPieceLetter("");
var duckLetter = createPredefinedPieceLetter(_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.nonPlayablePieces.duck);
var dameLetter = createPredefinedPieceLetter("D");

/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/PieceMedianCounter.ts":
/*!*********************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/PieceMedianCounter.ts ***!
  \*********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @client/ts/utils/ArrayUtils */ "./src/main/client/ts/utils/ArrayUtils.ts");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utilities */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/Utilities.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





self.onmessage = e => {
  var _e$data = e.data,
    walls = _e$data.walls,
    royalPieceSet = _e$data.royalPieceSet,
    royalMoves = _e$data.royalMoves,
    moveRegistryArray = _e$data.moveRegistryArray;
  var resultingMedianArray = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => 0), _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.totalPlayers);
  for (var i = 0; i < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; i++) {
    for (var j = 0; j < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; j++) {
      if (walls[i][j]) continue;
      var moves = new Uint16Array(moveRegistryArray[i][j]);
      var _iterator = _createForOfIteratorHelper(_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.colors),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var color = _step.value;
          if (royalPieceSet[color].length === 0) {
            resultingMedianArray[color] = undefined;
            continue;
          } else {
            var resultingSquares = 0;
            for (var royalI = 0; royalI < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; royalI++) {
              var _loop = function _loop() {
                var royalMoveSet = new Uint16Array(royalMoves[color][royalI][royalJ]);
                var result = moves.map((e, x) => e & royalMoveSet[x]);
                var newResultingSquares = (0,_Utilities__WEBPACK_IMPORTED_MODULE_4__.countBitsOnBoard)(result);
                if (newResultingSquares > resultingSquares) {
                  resultingSquares = newResultingSquares;
                }
              };
              for (var royalJ = 0; royalJ < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; royalJ++) {
                _loop();
              }
            }
            var resultingMedian = resultingMedianArray[color];
            if (resultingMedian) resultingMedian[i][j] = resultingSquares;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  postMessage(resultingMedianArray.map(arr => {
    if (arr) {
      var minimum = (0,_client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_3__.countMinimumOf2DArrayExcludingZero)(arr);
      return minimum === Infinity ? 0 : minimum;
    } else return arr;
  }));
};

/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/Utilities.ts":
/*!************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/Utilities.ts ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binaryMasks": function() { return /* binding */ binaryMasks; },
/* harmony export */   "countBitsOnBoard": function() { return /* binding */ countBitsOnBoard; },
/* harmony export */   "findMinimumOnBoardSquares": function() { return /* binding */ findMinimumOnBoardSquares; },
/* harmony export */   "oneBitMask": function() { return /* binding */ oneBitMask; },
/* harmony export */   "optimizePieceSet": function() { return /* binding */ optimizePieceSet; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/NumberUtils */ "./src/main/client/ts/utils/NumberUtils.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }



var binaryMasks = Array(_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension).fill(1).map((v, i) => v << _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension | v << _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension - 1 - i);
var oneBitMask = 1 << _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension;
function countBitsOnBoard(board) {
  var setBits = 0;
  for (var x = 0; x < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension; x++) {
    setBits += (0,_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__.bitCount)(board[x] ^ oneBitMask);
  }
  return setBits;
}
function findMinimumOnBoardSquares(board) {
  var minimum = Infinity;
  for (var i = 0; i < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension; i++) {
    for (var j = 0; j < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension; j++) {
      var setBits = countBitsOnBoard(board[i][j]);
      if (setBits !== 0 && setBits < minimum) {
        minimum = setBits;
      }
    }
  }
  return minimum;
}
function optimizePieceSet(possiblePieces, maximumTarget) {
  var optimalRoyalMoveSets = [["β", "W", "R", "E", "M", "Q", "D", "A"], ["γ", "F", "B", "H", "M", "Q", "D", "A", "Δ"], ["Y", "Z"], ["I", "J"], ["S", "T"], ["S", "Y"], ["I", "Y"], ["U", "N", "O"], ["H", "A"], ["E", "A"], ["Δ", "H"], ["C", "L"], ["C", "V"]];
  var moveSet = new Set();
  for (var _i = 0, _optimalRoyalMoveSets = optimalRoyalMoveSets; _i < _optimalRoyalMoveSets.length; _i++) {
    var optimalMoveSet = _optimalRoyalMoveSets[_i];
    var detractionSet = maximumTarget ? optimalMoveSet.slice().reverse() : optimalMoveSet;
    var _iterator = _createForOfIteratorHelper(possiblePieces),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var piece = _step.value;
        if (detractionSet.includes(piece)) {
          var target = detractionSet.slice(0, -detractionSet.indexOf(piece));
          target.forEach(t => {
            if (possiblePieces.includes(t) && (0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(t)) moveSet.add(t);
          });
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  if (moveSet.size === 0) {
    possiblePieces.forEach(p => {
      if ((0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(p)) moveSet.add(p);
    });
  }
  return moveSet;
}

/***/ }),

/***/ "./src/main/client/ts/utils/ArrayUtils.ts":
/*!************************************************!*\
  !*** ./src/main/client/ts/utils/ArrayUtils.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compareArrays": function() { return /* binding */ compareArrays; },
/* harmony export */   "countMinimumOf2DArrayExcludingZero": function() { return /* binding */ countMinimumOf2DArrayExcludingZero; },
/* harmony export */   "findLastIndex": function() { return /* binding */ findLastIndex; },
/* harmony export */   "shuffleArray": function() { return /* binding */ shuffleArray; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function shuffleArray(array) {
  var i = array.length;
  var r = 0;
  while (i !== 0) {
    r = Math.floor(Math.random() * i--);
    var _ref = [array[r], array[i]];
    array[i] = _ref[0];
    array[r] = _ref[1];
  }
  return array;
}
function compareArrays(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (var i = 0; i < arr1.length; i++) {
    var first = arr1[i],
      second = arr2[i];
    if (Array.isArray(first) && Array.isArray(second)) {
      if (!compareArrays(first, second)) return false;
    } else if (first !== second) {
      return false;
    }
  }
  return true;
}
function countMinimumOf2DArrayExcludingZero(array) {
  var minimum = Infinity;
  var _iterator = _createForOfIteratorHelper(array),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      var _iterator2 = _createForOfIteratorHelper(row),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var number = _step2.value;
          if (number !== 0 && number < minimum) {
            minimum = number;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return minimum;
}
function findLastIndex(array, callback) {
  var i = array.length;
  while (i--) {
    if (callback(array[i], i, array)) return i;
  }
  return -1;
}

/***/ }),

/***/ "./src/main/client/ts/utils/NumberUtils.ts":
/*!*************************************************!*\
  !*** ./src/main/client/ts/utils/NumberUtils.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bitCount": function() { return /* binding */ bitCount; },
/* harmony export */   "truncateNumber": function() { return /* binding */ truncateNumber; }
/* harmony export */ });
function truncateNumber(number, digits) {
  var multiplier = Math.pow(10, digits);
  var adjusted = number * multiplier;
  if (adjusted < 0) {
    return Math.ceil(adjusted / multiplier);
  } else {
    return Math.floor(adjusted / multiplier);
  }
}
function bitCount(number) {
  number = number - (number >> 1 & 0x55555555);
  number = (number & 0x33333333) + (number >> 2 & 0x33333333);
  return (number + (number >> 4) & 0xf0f0f0f) * 0x1010101 >> 24;
}

/***/ })

}]);
//# sourceMappingURL=src_main_client_ts_logic_movegen_VariantRules_VariantRuleDefinitions_BoardVariantModules_Insu-520908.react-app.js.map