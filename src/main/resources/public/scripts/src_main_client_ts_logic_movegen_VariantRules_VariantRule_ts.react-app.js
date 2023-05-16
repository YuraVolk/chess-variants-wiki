(self["webpackChunkspring_react_app"] = self["webpackChunkspring_react_app"] || []).push([["src_main_client_ts_logic_movegen_VariantRules_VariantRule_ts"],{

/***/ "./src/main/client/ts/baseTypes.ts":
/*!*****************************************!*\
  !*** ./src/main/client/ts/baseTypes.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
const verifyFunctionType = (func) => typeof func === 'function';
const createTuple = (val, length) => Array.from({ length }).fill(val);
const createTupleFromCallback = (val, length) => Array.from({ length }, val);
const verifyTupleType = (arr, length) => arr.length === length;
function assertNonUndefined(data) {
    if (data == null)
        throw new Error("Expected the data above to be anything but null or undefined");
}
function throwOnNever(arg) {
    console.dir(arg);
    throw new TypeError(`Unexpected argument that is supposed to be of type never`);
}
function importAll(r) {
    r.keys().forEach(r);
}
function getEnumKeys(object) {
    const resultingArray = [];
    let key;
    for (key in object)
        resultingArray.push(key);
    return resultingArray;
}


/***/ }),

/***/ "./src/main/client/ts/interfaces/Colors.ts":
/*!*************************************************!*\
  !*** ./src/main/client/ts/interfaces/Colors.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHSLColor": function() { return /* binding */ createHSLColor; },
/* harmony export */   "createHexColor": function() { return /* binding */ createHexColor; },
/* harmony export */   "createRGBColor": function() { return /* binding */ createRGBColor; },
/* harmony export */   "validateHSLColor": function() { return /* binding */ validateHSLColor; },
/* harmony export */   "validateHexColor": function() { return /* binding */ validateHexColor; },
/* harmony export */   "validateIndexedColor": function() { return /* binding */ validateIndexedColor; },
/* harmony export */   "validateRGBColor": function() { return /* binding */ validateRGBColor; },
/* harmony export */   "verifyHSLColor": function() { return /* binding */ verifyHSLColor; },
/* harmony export */   "verifyHexColor": function() { return /* binding */ verifyHexColor; },
/* harmony export */   "verifyRGBColor": function() { return /* binding */ verifyRGBColor; },
/* harmony export */   "wrapHSLColor": function() { return /* binding */ wrapHSLColor; },
/* harmony export */   "wrapIndexedColor": function() { return /* binding */ wrapIndexedColor; },
/* harmony export */   "wrapRGBColor": function() { return /* binding */ wrapRGBColor; }
/* harmony export */ });
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseTypes */ "./src/main/client/ts/baseTypes.ts");

const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
const createHexColor = (color) => {
    if (hexColorRegex.test(color)) {
        return color;
    }
    else
        throw new TypeError("The supplied hex color is not a hex color: " + color);
};
const verifyHexColor = (color) => typeof color === 'string';
const validateHexColor = (color) => {
    if (typeof color === "string") {
        try {
            createHexColor(color);
            return true;
        }
        catch (_) {
            return false;
        }
    }
    else
        return false;
};
const createRGBColor = (color) => {
    if (color >= 0 || color <= 255) {
        return color;
    }
    else
        throw new TypeError(`The supplied RGB color value is not an RGB color value: ${color}`);
};
const wrapRGBColor = (color) => `rgb(${color.join(",")})`;
const verifyRGBColor = (color) => Array.isArray(color);
const validateRGBColor = (color) => {
    if (Array.isArray(color) && (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(color, 3)
        && color.every((c) => typeof c === "number")) {
        try {
            color.forEach(c => createRGBColor(c));
            return true;
        }
        catch (_) {
            return false;
        }
    }
    else
        return false;
};
const createHSLColor = (color) => {
    if ((color.hue >= 0 || color.hue <= 359) && (color.saturation >= 0 || color.saturation <= 100)
        && (color.lightness >= 0 || color.lightness <= 100)) {
        return color;
    }
    else
        throw new TypeError(`The supplied HSL value is not an HSL color: " + color`);
};
const wrapHSLColor = (color) => `hsl(${color.hue},${color.saturation}%,${color.lightness}%)`;
const verifyHSLColor = (color) => typeof color === 'object';
const validateHSLColor = (color) => {
    const verifyNumberRecord = (obj) => {
        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key))
                continue;
            if (typeof obj[key] !== "number")
                return false;
        }
        return true;
    };
    if (typeof color === "object" && color && "hue" in color
        && "saturation" in color && "lightness" in color
        && verifyNumberRecord(color)) {
        try {
            createHSLColor(color);
            return true;
        }
        catch (_) {
            return false;
        }
    }
    else
        return false;
};
const wrapIndexedColor = (color) => {
    if (verifyHexColor(color)) {
        return color;
    }
    else if (verifyRGBColor(color)) {
        return wrapRGBColor(color);
    }
    else if (verifyHSLColor(color)) {
        return wrapHSLColor(color);
    }
    else {
        return (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.throwOnNever)(color);
    }
};
const validateIndexedColor = (color) => {
    return validateHexColor(color) || validateRGBColor(color) || validateHSLColor(color);
};


/***/ }),

/***/ "./src/main/client/ts/logic/BaseInterfaces.ts":
/*!****************************************************!*\
  !*** ./src/main/client/ts/logic/BaseInterfaces.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHorizontalPlacementModulus": function() { return /* binding */ getHorizontalPlacementModulus; },
/* harmony export */   "getVerticalPlacementModulus": function() { return /* binding */ getVerticalPlacementModulus; },
/* harmony export */   "initializeBoardSquares": function() { return /* binding */ initializeBoardSquares; },
/* harmony export */   "isVerticalPlacement": function() { return /* binding */ isVerticalPlacement; }
/* harmony export */ });
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _movegen_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movegen/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");


const initializeBoardSquares = (baseValue) => (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(baseValue, _movegen_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension), _movegen_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension);
const isVerticalPlacement = (color) => color % 2 === 0;
function getVerticalPlacementModulus(num) {
    const result = num % 2;
    if (result !== 0 && result !== 1)
        throw new Error(`Invalid number passed: ${num}`);
    return result;
}
function getHorizontalPlacementModulus(num) {
    const result = (num % 2) ^ 1;
    if (result !== 0 && result !== 1)
        throw new Error(`Invalid number passed: ${num}`);
    return result;
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/Board/Board.ts":
/*!*********************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/Board/Board.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Board": function() { return /* binding */ Board; },
/* harmony export */   "baseImmunes": function() { return /* binding */ baseImmunes; }
/* harmony export */ });
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _MoveTree_MoveTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MoveTree/MoveTree */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTree.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _PieceControl_PieceControlBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../PieceControl/PieceControlBuilder */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlBuilder.ts");
/* harmony import */ var _PieceControl_PieceControlDeclarations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../PieceControl/PieceControlDeclarations */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlDeclarations.ts");
/* harmony import */ var _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../VariantRules/VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../VariantRules/VariantRuleSetup */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleSetup.ts");
/* harmony import */ var _BoardInterface__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _client_ts_utils_ObjectUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @client/ts/utils/ObjectUtils */ "./src/main/client/ts/utils/ObjectUtils.ts");
/* harmony import */ var _utils_Tags_InputOutputProcessing__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/Tags/InputOutputProcessing */ "./src/main/client/ts/logic/utils/Tags/InputOutputProcessing.ts");
















(0,_PieceControl_PieceControlDeclarations__WEBPACK_IMPORTED_MODULE_9__.initPieceControlDeclarations)();
const baseImmunes = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
class Board {
    controls = {};
    data;
    moves;
    preGeneratedAttacks = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.createBasePreGeneratedAttacks, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
    board;
    isComplexSetup = (0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.createComplexMoveLegalityTracker)();
    gameData;
    gameType = (0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.createGameTypeSettings)();
    variantRules;
    variantData;
    isTwoPlayer;
    insufficientMaterialModule;
    __baseClass;
    initDecoratorSettings() { }
    /*---------------------------------- INITIALIZATION -----------------------------------------*/
    constructor(pgn4) {
        this.__baseClass = this;
        const parsingResults = (0,_utils_Tags_InputOutputProcessing__WEBPACK_IMPORTED_MODULE_15__.parsePGN4)(pgn4);
        this.gameType.type = parsingResults.gameType;
        this.variantRules = parsingResults.variantRules;
        this.gameData = parsingResults.gameData;
        this.board = parsingResults.board;
        this.data = parsingResults.fenData;
        this.data.injectBoard(this);
        this.data = (0,_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_11__.decorateClassWithVariants)(this.data, _FENData_FENData__WEBPACK_IMPORTED_MODULE_4__.FENData, this.variantRules.fenDataDecorators);
        this.variantData = parsingResults.variantRuleData;
        this.variantRules = (0,_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_12__.validateVariantRules)(this);
        this.isTwoPlayer = this.data.getRealPlayers() === 2;
        this.initPieceControls(parsingResults.pieceSet);
        this.moves = (0,_MoveTree_MoveTree__WEBPACK_IMPORTED_MODULE_2__.createMoveTree)(this.createSnapshot());
        this.moves.moves = parsingResults.moves;
        this.pregenerateAttacks();
        /*
                new Promise((resolve: (value: InsufficientMaterialModule) => void) => {
                    setTimeout(() => resolve(generateInsufficientMatingPieces(this)), 0)
                }).then(result => {
                    this.insufficientMaterialModule = result;
                }).catch(exception => {
                    console.error("Failed to generate insufficient material module: ");
                    console.trace(exception);
                });*/
    }
    initPieceControls(pieces) {
        if (pieces.size === 0)
            return;
        const builder = new _PieceControl_PieceControlBuilder__WEBPACK_IMPORTED_MODULE_8__.PieceControlBuilder();
        builder.setFENData(this.data);
        builder.setVariantRules(this.variantRules.pieceControlDecorators);
        for (const piece of pieces) {
            const pieceControlConfigurator = builder.createPieceControlWrap(piece);
            this.controls[piece] = pieceControlConfigurator;
        }
    }
    getSquareVisibility() {
        return (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => []);
    }
    createSnapshot() {
        return {
            data: this.data.createSnapshot(),
            board: this.board.map(a => [...a]),
            isComplexSetup: Object.assign({}, this.isComplexSetup)
        };
    }
    loadSnapshot(snapshot) {
        this.isComplexSetup = { ...snapshot.isComplexSetup };
        this.data.loadSnapshot(snapshot.data);
        this.board = snapshot.board.map((row) => [...row]);
        this.pregenerateAttacks();
        this.runComplexLegalityEvaluationChecks();
    }
    createClone() {
        let targetObject = (0,_client_ts_utils_ObjectUtils__WEBPACK_IMPORTED_MODULE_14__.copyClass)(this.__baseClass, Board);
        targetObject.board = this.board.map(a => [...a]); // PieceStrings are immutable
        targetObject.isComplexSetup = Object.assign({}, this.isComplexSetup);
        targetObject.preGeneratedAttacks = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.createBasePreGeneratedAttacks, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
        targetObject.data = this.data.createClone();
        targetObject = (0,_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_11__.decorateClassWithVariants)(targetObject, Board, (0,_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_12__.copyVariantRules)(this.__baseClass.variantRules.boardDecorators));
        targetObject.data.injectBoard(targetObject);
        targetObject.data = (0,_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_11__.decorateClassWithVariants)(targetObject.data, _FENData_FENData__WEBPACK_IMPORTED_MODULE_4__.FENData, (0,_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_12__.copyVariantRules)(this.__baseClass.variantRules.fenDataDecorators));
        const presumedPieceLetters = new Set();
        let letter;
        for (letter in this.controls) {
            if (Object.prototype.hasOwnProperty.call(this.controls, letter)) {
                presumedPieceLetters.add(letter);
            }
        }
        targetObject.initPieceControls(presumedPieceLetters);
        targetObject.pregenerateAttacks();
        return targetObject;
    }
    /*---------------------------------- INITIALIZATION -----------------------------------------*/
    /*-------------------------------------------------------------------------------------------*/
    /*------------------------------------- UTILITIES -------------------------------------------*/
    isKingInCheck(baseColor, fenRoyal = this.data.fenOptions.tag("royal")) {
        const royal = fenRoyal[baseColor];
        if (!royal || this.data.fenOptions.tag("dead")[baseColor])
            return false;
        const coordinates = royal;
        return !!(this.preGeneratedAttacks[baseColor].slidingPieces[coordinates[0]][coordinates[1]]
            || this.preGeneratedAttacks[baseColor].hoppingPieces[coordinates[0]][coordinates[1]]);
    }
    getPlayerPieces() {
        const playerPieces = [[], [], [], []];
        for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; i++) {
            for (let j = 0; j < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; j++) {
                const square = this.board[i][j];
                if (square.isEmpty())
                    continue;
                const color = square.color;
                if (color !== _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_7__.deadColorIndex)
                    playerPieces[color].push([i, j]);
            }
        }
        return playerPieces;
    }
    getCheckmatesAndStalemates() {
        const dead = this.data.fenOptions.tag("dead"), royal = this.data.fenOptions.tag("royal");
        const kingChecks = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
        const legalMoves = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
        const playerPieces = this.getPlayerPieces();
        legalMoves[this.data.sideToMove] = true;
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
            if (dead[color])
                continue;
            const playerArmy = playerPieces[color];
            if (this.isKingInCheck(color)) {
                kingChecks[color] = true;
            }
            for (const piece of playerArmy) {
                if (this.getLegalMoves(piece[0], piece[1], color).length) {
                    legalMoves[color] = true;
                    break;
                }
            }
            if (!legalMoves[color]) {
                if (this.preGeneratedAttacks[color].pieceDrops.pawn.length || this.preGeneratedAttacks[color].pieceDrops.piece.length) {
                    legalMoves[color] = true;
                }
            }
        }
        const kingCaptures = royal.map((r, i) => !dead[i] && r
            ? this.board[r[0]][r[1]].isEmpty() || this.board[r[0]][r[1]].color !== i : false);
        return {
            checkmates: legalMoves.map((move, i) => kingCaptures[i] || (!move && kingChecks[i])),
            stalemates: legalMoves.map((move, i) => !move && !kingChecks[i]),
            checks: kingChecks
        };
    }
    runComplexLegalityEvaluationChecks() {
        if (this.isComplexSetup.hasComplexRules)
            return;
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 14; j++) {
                const square = this.board[i][j];
                if (square.isPiece() && _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_10__.pieceControlConfigSettings[square.piece].moveGenerationSettings.isComplex) {
                    this.isComplexSetup.hasComplexPieces = true;
                    return;
                }
            }
        }
    }
    getCurrentChecks(sideToMove = this.data.sideToMove) {
        const dead = this.data.fenOptions.tag("dead"), resigned = this.data.fenOptions.tag("resigned"), royal = this.data.fenOptions.tag("royal");
        const playerRoyals = royal.map((r, i) => r && !dead[i] && !resigned[i] ? r : null);
        const attackingCoordinates = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => [], _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
        for (const [startingCoordinate, attackList] of this.preGeneratedAttacks[sideToMove].pieceMovements) {
            for (const attack of attackList) {
                for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
                    if (color === sideToMove)
                        continue;
                    const royal = playerRoyals[color];
                    if (royal && (0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.compareCoordinates)(royal, attack.move)) {
                        attackingCoordinates[color].push(startingCoordinate);
                    }
                }
            }
        }
        return attackingCoordinates;
    }
    /*------------------------------------- UTILITIES -------------------------------------------*/
    /*-------------------------------------------------------------------------------------------*/
    /*---------------------------------------- API ----------------------------------------------*/
    makeMove(move, ignoreNextMoves = false) {
        let returnValues;
        const sideToMove = this.data.sideToMove, pregeneratedAttacks = this.preGeneratedAttacks;
        for (let i = 0; i < move.length; i++) {
            if (i === move.length - 1) {
                returnValues = this.data.affectOptions(move[i], {
                    ignoreCheckmateChecks: ignoreNextMoves, ignoreNextTurn: false
                });
            }
            else {
                this.data.affectOptions(move[i], {
                    ignoreCheckmateChecks: ignoreNextMoves, ignoreNextTurn: true
                });
            }
        }
        this.runComplexLegalityEvaluationChecks();
        if (ignoreNextMoves)
            return returnValues;
        const path = this.moves.currentMove.slice();
        path[path.length - 1]++;
        this.moves.currentMove = this.moves.setNewMove({
            move: (0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.createBaseMoveWrapper)({ path, moveData: move }),
            snapshot: {
                boardSnapshot: this.createSnapshot(),
                pregeneratedAttacks: pregeneratedAttacks[sideToMove]
            },
            fenDataString: this.data.constructPreliminaryHashString()
        });
        if (this.data.gameOver || this.data.getRealPlayers() === 1)
            return returnValues;
        if (returnValues.checkmates[this.data.sideToMove]) {
            returnValues = this.makeMove([{ type: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature.TeamsCheckmate }], true);
        }
        else if (returnValues.stalemates[this.data.sideToMove]) {
            returnValues = this.makeMove([{ type: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature.Stalemate }]);
        }
        return returnValues;
    }
    pregenerateAttacks(exclusiveSideToMoveGeneration = false) {
        const royal = this.data.fenOptions.tag("royal");
        this.preGeneratedAttacks = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.createBasePreGeneratedAttacks, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
        this.getPlayerPieces().forEach((army, armyColor) => {
            if (exclusiveSideToMoveGeneration !== false && exclusiveSideToMoveGeneration !== armyColor)
                return;
            const preGeneratedAttacks = this.preGeneratedAttacks[armyColor];
            for (const coordinate of army) {
                const square = this.board[coordinate[0]][coordinate[1]];
                if (!square.isPiece())
                    continue;
                const color = square.color;
                const letter = square.piece;
                const controlBuilder = this.controls[letter]().setColor(color)
                    .setCoordinates(coordinate[0], coordinate[1]).setBoard(this.board);
                const setting = _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_10__.pieceControlConfigSettings[square.piece];
                const resultingMoves = [];
                let control = controlBuilder.setBaseImmunePieces(this.gameType.getBaseColors(color)).constructPieceControl();
                resultingMoves.push(...control.getPseudoLegalMoves());
                control = controlBuilder.setBaseImmunePieces(baseImmunes).constructPieceControl();
                if (setting.moveGenerationSettings.isJumping) {
                    const attacks = control.rayGenJumpingAttacks();
                    for (const { move: attack } of attacks) {
                        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
                            if (color === armyColor)
                                continue;
                            const preGeneratedAttacks = this.preGeneratedAttacks[color];
                            preGeneratedAttacks.hoppingPieces[attack[0]][attack[1]]++;
                            preGeneratedAttacks.hoppingPieceLines.push([coordinate, attack]);
                            const l = preGeneratedAttacks.attackingColors[attack[0]][attack[1]];
                            if (~l && preGeneratedAttacks.attackingColors[attack[0]][attack[1]] !== color + 1) {
                                preGeneratedAttacks.attackingColors[attack[0]][attack[1]] = (l === 0 ? 1 + color : -1);
                            }
                        }
                    }
                }
                if (setting.moveGenerationSettings.isSliding) {
                    const attacks = control.rayGenSlidingAttacks();
                    for (const attack of attacks) {
                        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
                            if (color === armyColor)
                                continue;
                            const preGeneratedAttacks = this.preGeneratedAttacks[color];
                            for (const { move: subAttack } of attack) {
                                preGeneratedAttacks.slidingPieces[subAttack[0]][subAttack[1]]++;
                                const l = preGeneratedAttacks.attackingColors[subAttack[0]][subAttack[1]];
                                if (~l && preGeneratedAttacks.attackingColors[subAttack[0]][subAttack[1]] !== color + 1) {
                                    preGeneratedAttacks.attackingColors[subAttack[0]][subAttack[1]] = (l === 0 ? 1 + color : -1);
                                }
                            }
                            if (attack.length !== 0) {
                                preGeneratedAttacks.slidingPiecesLines.push([coordinate, attack.map(m => m.move)]);
                            }
                            else {
                                const coordinateArray = [];
                                preGeneratedAttacks.slidingPiecesLines.push([coordinate, coordinateArray]);
                            }
                        }
                    }
                    const rayGen = control.rayGenSlidingAttacks(_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_10__.AttackType.RayTraceLimited);
                    for (const attack of rayGen) {
                        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
                            if (color === armyColor)
                                continue;
                            const preGeneratedAttacks = this.preGeneratedAttacks[color];
                            if (attack.length !== 0) {
                                let isRoyalOnLine = false;
                                const resultingAttack = [];
                                for (const { move } of attack) {
                                    resultingAttack.push(move);
                                    if (isRoyalOnLine) {
                                        preGeneratedAttacks.slidingPieces[move[0]][move[1]]++;
                                    }
                                    else if ((0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.compareCoordinates)(royal[color] ?? [-1, -1], move)) {
                                        isRoyalOnLine = true;
                                    }
                                }
                                preGeneratedAttacks.slidingPiecesRayTracing.push([coordinate, attack.map(m => m.move)]);
                            }
                            else {
                                preGeneratedAttacks.slidingPiecesLines.push([coordinate, []]);
                            }
                        }
                    }
                }
                preGeneratedAttacks.pieceMovements.set((0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.stringifyCoordinate)(coordinate), resultingMoves);
            }
            preGeneratedAttacks.pieceDrops.piece = this.getDroppingMoves((0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_7__.createPieceFromData)(armyColor, _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_6__.nonPlayablePieces.wall));
            preGeneratedAttacks.pieceDrops.pawn = this.getDroppingMoves((0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_7__.createPieceFromData)(armyColor, _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_7__.pawnPieceString.piece));
        });
    }
    isSetupComplex() { return this.isComplexSetup.hasComplexPieces || this.isComplexSetup.hasComplexRules || this.data.isComplexEvaluation(); }
    isTheMoveLegal(color, moveData, isSeirawanDrop = false) {
        const royals = this.data.fenOptions.tag("royal");
        const { startCoordinates: [pieceI, pieceJ], endCoordinates: [attackI, attackJ] } = moveData;
        const royal = royals[color];
        if (!this.board[attackI][attackJ].isEmpty() && royal && attackI === royal[0] && attackJ === royal[1])
            return false;
        if (this.isSetupComplex()) {
            const snapshot = this.createSnapshot();
            const moveArray = [{
                    startCoordinates: [pieceI, pieceJ],
                    endCoordinates: [attackI, attackJ]
                }];
            if (isSeirawanDrop)
                moveArray.push({ piece: _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_7__.wallPieceString, endCoordinates: [pieceI, pieceJ] });
            const { checks, checkmates } = this.makeMove(moveArray, true);
            let isKingInCheck = checks[color] || checkmates[color];
            if (!isKingInCheck) {
                this.pregenerateAttacks(color);
                isKingInCheck = this.isKingInCheck(color);
            }
            this.loadSnapshot(snapshot);
            return !isKingInCheck;
        }
        else {
            const [royalI, royalJ] = royal ?? [null, null];
            const preGeneratedAttacks = this.preGeneratedAttacks[color];
            if (royalI === null)
                return true;
            const isRoyalMove = royalI === pieceI && royalJ === pieceJ;
            const attackers = preGeneratedAttacks.hoppingPieces[royalI][royalJ] +
                preGeneratedAttacks.slidingPieces[royalI][royalJ];
            const targetSafety = preGeneratedAttacks.slidingPieces[attackI][attackJ]
                + preGeneratedAttacks.hoppingPieces[attackI][attackJ] === 0;
            const legalitySettings = {
                canKingCapture: undefined
            };
            for (const kingCaptureColor of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
                const royal = royals[kingCaptureColor];
                if (kingCaptureColor !== color && royal && royal[0] === attackI && royal[1] === attackJ) {
                    const royalDefendedSquare = preGeneratedAttacks.attackingColors[royal[1]][royal[0]];
                    if ((royalDefendedSquare === kingCaptureColor + 1 || royalDefendedSquare === 0)
                        && (isRoyalMove || preGeneratedAttacks.attackingColors[royalI][royalJ] === kingCaptureColor + 1)) {
                        legalitySettings.canKingCapture = kingCaptureColor + 1;
                    }
                }
            }
            if (!this.gameType.isFFA() && legalitySettings.canKingCapture !== undefined)
                return true;
            for (const [attackingPiece, attackLine] of preGeneratedAttacks.slidingPiecesRayTracing) {
                let isPieceUnderAttack = false, isRoyalUnderAttack = false, isTheTargetSquarePinListed = false;
                for (const [attackedX, attackedY] of attackLine) {
                    if (!isPieceUnderAttack && attackedX === pieceI && attackedY === pieceJ)
                        isPieceUnderAttack = true;
                    else if (!isTheTargetSquarePinListed && !isRoyalUnderAttack &&
                        attackedX === attackI && attackedY === attackJ)
                        isTheTargetSquarePinListed = true;
                    if (!isRoyalUnderAttack && attackedX === royalI && attackedY === royalJ)
                        isRoyalUnderAttack = true;
                    if (isRoyalMove) {
                        if (isRoyalUnderAttack && attackedX === attackI && attackedY === attackJ) {
                            if (legalitySettings.canKingCapture && legalitySettings.canKingCapture > 0 && this.board[attackedX][attackedY].color + 1 === legalitySettings.canKingCapture)
                                continue;
                            return false;
                        }
                    }
                    else {
                        if (isPieceUnderAttack && isRoyalUnderAttack && !(0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.compareCoordinates)(attackingPiece, moveData.endCoordinates) && !isTheTargetSquarePinListed) {
                            if (legalitySettings.canKingCapture && legalitySettings.canKingCapture > 0 && this.board[attackedX][attackedY].color + 1 === legalitySettings.canKingCapture)
                                continue;
                            return false;
                        }
                    }
                }
            }
            if (attackers > 1) {
                return isRoyalMove ? targetSafety || Boolean(legalitySettings.canKingCapture) : Boolean(legalitySettings.canKingCapture);
            }
            else if (attackers === 1) {
                if (!isRoyalMove) {
                    if (preGeneratedAttacks.hoppingPieces[royalI][royalJ] === 1) {
                        for (const [attackingPiece, attackCoordinates] of preGeneratedAttacks.hoppingPieceLines) {
                            if (attackCoordinates[0] === royalI && attackCoordinates[1] === royalJ
                                && attackingPiece[0] === attackI && attackingPiece[1] === attackJ) {
                                return true;
                            }
                        }
                        return Boolean(legalitySettings.canKingCapture);
                    }
                    else {
                        for (const [attackingPiece, attackLine] of preGeneratedAttacks.slidingPiecesLines) {
                            let isRoyalUnderAttack = false, isTheTargetSquareBlocked = false;
                            for (const [attackedX, attackedY] of attackLine) {
                                if (!isRoyalUnderAttack && attackedX === royalI && attackedY === royalJ)
                                    isRoyalUnderAttack = true;
                                else if (!isTheTargetSquareBlocked && !isRoyalUnderAttack &&
                                    attackedX === attackI && attackedY === attackJ)
                                    isTheTargetSquareBlocked = true;
                                if (isRoyalUnderAttack && !(0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.compareCoordinates)(attackingPiece, moveData.endCoordinates) && !isTheTargetSquareBlocked) {
                                    if (legalitySettings.canKingCapture && legalitySettings.canKingCapture > 0 && this.board[attackedX][attackedY].color + 1 === legalitySettings.canKingCapture)
                                        continue;
                                    return Boolean(legalitySettings.canKingCapture);
                                }
                            }
                        }
                        return true;
                    }
                }
                else {
                    return targetSafety || Boolean(legalitySettings.canKingCapture);
                }
            }
            else {
                return isRoyalMove ? targetSafety || Boolean(legalitySettings.canKingCapture) : true;
            }
        }
    }
    getCastlingMoves(parameters) {
        const { i, j, baseColor } = parameters;
        const specialMoves = [];
        const royal = this.data.fenOptions.tag("royal")[baseColor];
        if (royal && royal[0] === i && royal[1] === j) {
            if (this.data.fenOptions.isKingsideCastlingAvailable(baseColor, this)) {
                specialMoves.push({
                    startCoordinates: [i, j],
                    endCoordinates: this.data.fenOptions.getKingsideCastlingEndCoordinate(baseColor),
                    specialType: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.SpecialMove.CastlingKingside
                });
            }
            if (this.data.fenOptions.isQueensideCastlingAvailable(baseColor, this)) {
                specialMoves.push({
                    startCoordinates: [i, j],
                    endCoordinates: this.data.fenOptions.getQueensideCastlingEndCoordinate(baseColor),
                    specialType: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.SpecialMove.CastlingQueenside
                });
            }
        }
        return specialMoves;
    }
    getEnPassantMoves(parameters) {
        const { i, j, baseColor, pieceLetter } = parameters;
        const specialMoves = [];
        if (_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_10__.pieceControlConfigSettings[pieceLetter].moveGenerationSettings.isPawn) {
            const enPassantCaptures = this.data.fenOptions.getAvailableEnPassantCaptures(baseColor);
            const pawnAttacks = this.controls[pieceLetter]()
                .setBaseImmunePieces(this.gameType.getBaseColors(baseColor))
                .setBoard(this.board).setCoordinates(i, j).setColor(baseColor)
                .constructPieceControl().rayGenJumpingAttacks();
            if (enPassantCaptures.length !== 0) {
                for (const attack of pawnAttacks) {
                    for (const enP of enPassantCaptures) {
                        if ((0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.compareCoordinates)(attack.move, enP)) {
                            const snapshot = this.createSnapshot();
                            const move = [{
                                    startCoordinates: [i, j],
                                    endCoordinates: attack.move,
                                    specialType: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.SpecialMove.EnPassant,
                                    isIrreversible: attack.irreversible
                                }];
                            this.makeMove(move, true);
                            this.pregenerateAttacks();
                            if (!this.isKingInCheck(baseColor))
                                specialMoves.push(move[0]);
                            this.loadSnapshot(snapshot);
                        }
                    }
                }
            }
        }
        return specialMoves;
    }
    getSpecialMoves(parameters) {
        return [...this.getCastlingMoves(parameters), ...this.getEnPassantMoves(parameters)];
    }
    getLegalMoves(i, j, baseColor = this.data.sideToMove, isSeirawanDrop = false) {
        const pieceString = this.board[i]?.[j], royal = this.data.fenOptions.tag("royal")[baseColor];
        if (pieceString.isPiece()) {
            const color = pieceString.color;
            if (color !== baseColor)
                return [];
            const pseudoLegalMoves = this.preGeneratedAttacks[color].pieceMovements.get((0,_BoardInterface__WEBPACK_IMPORTED_MODULE_13__.stringifyCoordinate)([i, j]));
            (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.assertNonUndefined)(pseudoLegalMoves);
            const specialMoves = this.getSpecialMoves({ i, j, baseColor, pieceLetter: pieceString.piece });
            return [...pseudoLegalMoves.map(generatedMove => {
                    const moveData = {
                        startCoordinates: [i, j],
                        endCoordinates: generatedMove.move,
                        isIrreversible: generatedMove.irreversible
                    };
                    if (generatedMove.move[2]) {
                        moveData.promotion = generatedMove.move[2].split("").map(piece => (0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_7__.createPieceFromData)(color, piece));
                    }
                    return moveData;
                }).filter(m => {
                    const capturedPieces = this.data.getCapturedPieces(m);
                    const isKingCapture = royal && (capturedPieces.find((c) => royal[0] === c[0] && royal[1] === c[1]));
                    return this.isTheMoveLegal(color, m, isSeirawanDrop) && !isKingCapture;
                }), ...specialMoves];
        }
        else {
            return [];
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDroppingMoves(_piece, _sideToMove = this.data.sideToMove) {
        return [];
    }
    getAllowedInternalMoves(sideToMove = this.data.sideToMove) {
        const currentMoves = [_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature.DrawByAgreement];
        const currentSnapshot = this.createSnapshot();
        this.makeMove([{ type: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature.Resign }], true);
        const maximum = Math.max(...this.data.points);
        const pointIndexes = this.data.points.reduce((p, n, i) => n === maximum ? [...p, i] : p, []);
        this.loadSnapshot(currentSnapshot);
        if (pointIndexes.length === 1 && pointIndexes[0] === sideToMove) {
            currentMoves.push(_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature.ClaimWin);
        }
        else {
            currentMoves.push(_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature.Resign, _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature.Timeout);
        }
        return currentMoves.map(type => ({ type }));
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts":
/*!******************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/Board/BoardInterface.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplaySettings": function() { return /* binding */ DisplaySettings; },
/* harmony export */   "compareCoordinates": function() { return /* binding */ compareCoordinates; },
/* harmony export */   "createBasePreGeneratedAttacks": function() { return /* binding */ createBasePreGeneratedAttacks; },
/* harmony export */   "createComplexMoveLegalityTracker": function() { return /* binding */ createComplexMoveLegalityTracker; },
/* harmony export */   "createGameTypeSettings": function() { return /* binding */ createGameTypeSettings; },
/* harmony export */   "stringifyCoordinate": function() { return /* binding */ stringifyCoordinate; },
/* harmony export */   "unstringifyCoordinate": function() { return /* binding */ unstringifyCoordinate; }
/* harmony export */ });
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");




var DisplaySettings;
(function (DisplaySettings) {
    DisplaySettings[DisplaySettings["Highlighted"] = 0] = "Highlighted";
    DisplaySettings[DisplaySettings["Fogged"] = 1] = "Fogged";
    DisplaySettings[DisplaySettings["Ghosted"] = 2] = "Ghosted";
    DisplaySettings[DisplaySettings["Blindfolded"] = 3] = "Blindfolded";
    DisplaySettings[DisplaySettings["PieceFacesCenter"] = 4] = "PieceFacesCenter";
})(DisplaySettings || (DisplaySettings = {}));
const baseTeams = [true, false, true, false];
const stringifyCoordinate = (coordinate) => `${coordinate[0]}:${coordinate[1]}`;
const unstringifyCoordinate = (coordinate) => {
    const result = coordinate.split(":").map(v => Number(v));
    if ((0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(result, 2) && result.every(n => !Number.isNaN(n))) {
        return result;
    }
    else
        throw new Error(`Unexpected stringified coordinate: ${coordinate}`);
};
const createGameTypeSettings = () => ({
    type: _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.VariantType.FFA,
    teamSettings: {
        firstTeamColors: baseTeams.map(e => e),
        secondTeamColors: baseTeams.map(e => !e)
    },
    getBaseColors(color) {
        if (this.isFFA()) {
            return (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)((_, i) => i === color, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.totalPlayers);
        }
        else {
            return this.teamSettings.firstTeamColors[color] ? this.teamSettings.firstTeamColors : this.teamSettings.secondTeamColors;
        }
    },
    isFFA() {
        return this.type === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.VariantType.FFA || this.type === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.VariantType.Solo;
    },
    isSameTeam(colorA, colorB) {
        if (colorA === colorB)
            return true;
        if (this.isFFA()) {
            return false;
        }
        else {
            return this.teamSettings.firstTeamColors[colorA]
                ? this.teamSettings.firstTeamColors[colorA] && this.teamSettings.firstTeamColors[colorA]
                : this.teamSettings.secondTeamColors[colorA] && this.teamSettings.secondTeamColors[colorB];
        }
    },
    getTeammateColor(color) {
        if (this.isFFA())
            return color;
        const teammateIndex = this.teamSettings.firstTeamColors[color]
            ? this.teamSettings.firstTeamColors.map((b, i) => b && i !== color).indexOf(true)
            : this.teamSettings.secondTeamColors.map((b, i) => b && i !== color).indexOf(true);
        return (0,_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_3__.verifyNumericColor)(teammateIndex) ? teammateIndex : color;
    }
});
const createComplexMoveLegalityTracker = () => ({
    hasComplexPieces: false,
    hasComplexRules: false,
});
const createBasePreGeneratedAttacks = () => {
    return {
        hoppingPieces: (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => 0),
        slidingPieces: (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => 0),
        hoppingPieceLines: [],
        slidingPiecesLines: [],
        slidingPiecesRayTracing: [],
        attackingColors: (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => 0),
        pieceMovements: new Map(),
        pieceDrops: {
            pawn: [], piece: []
        },
        variantRuleCache: {}
    };
};
const compareCoordinates = (coordinate1, coordinate2) => coordinate1[0] === coordinate2[0] && coordinate1[1] === coordinate2[1];


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/FENData/FENData.ts":
/*!*************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/FENData/FENData.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FENData": function() { return /* binding */ FENData; },
/* harmony export */   "FENOptions": function() { return /* reexport safe */ _FENOptions_FENOptions__WEBPACK_IMPORTED_MODULE_9__.FENOptions; }
/* harmony export */ });
/* harmony import */ var _BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _FENDataInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FENDataInterface */ "./src/main/client/ts/logic/movegen/FENData/FENDataInterface.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _FENOptions_FENOptions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FENOptions/FENOptions */ "./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptions.ts");
/* harmony import */ var _FENOptions_FENOptionsTagsInterface__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FENOptions/FENOptionsTagsInterface */ "./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptionsTagsInterface.ts");











const defaultPointsForMate = 20;
class FENData {
    points;
    sideToMove;
    fenOptions;
    plyCount;
    board;
    privateGameOver = false;
    __baseClass;
    initDecoratorSettings() { }
    constructor() {
        this.points = [0, 0, 0, 0];
        this.sideToMove = 0;
        this.fenOptions = new _FENOptions_FENOptions__WEBPACK_IMPORTED_MODULE_9__.FENOptions();
        this.plyCount = 0;
        this.__baseClass = this;
    }
    get gameOver() {
        return this.privateGameOver;
    }
    set gameOver(gameOver) {
        if (gameOver === false || this.privateGameOver === false) {
            this.privateGameOver = gameOver;
        }
    }
    injectBoard(board) {
        this.board = board;
        this.fenOptions.generateCastling(board);
    }
    createClone() {
        const newFENData = new FENData();
        newFENData.fenOptions = this.fenOptions.createClone();
        newFENData.points = [...this.points];
        newFENData.sideToMove = this.sideToMove;
        newFENData.plyCount = this.plyCount;
        return newFENData;
    }
    createSnapshot() {
        return {
            points: [...this.points],
            sideToMove: this.sideToMove,
            fenOptionsSnapshot: this.fenOptions.createSnapshot(),
            plyCount: this.plyCount,
            gameOver: this.gameOver
        };
    }
    loadSnapshot(snapshot) {
        this.fenOptions.loadSnapshot(snapshot.fenOptionsSnapshot);
        this.points = [...snapshot.points];
        this.sideToMove = snapshot.sideToMove;
        this.plyCount = snapshot.plyCount;
        this.privateGameOver = snapshot.gameOver;
    }
    getCapturedPieces(moveData) {
        const pieceString = this.board.board[moveData.endCoordinates[0]][moveData.endCoordinates[1]];
        return pieceString.isEmpty() || pieceString.isDead() ? [] : [[...moveData.endCoordinates]];
    }
    getCastlingPieceEndCoordinates(coordinates, color) {
        return [
            (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.isVerticalPlacement)(color)
                ? [coordinates[0], this.fenOptions.getKingsideCastlingTandemPiece(color)]
                : [this.fenOptions.getKingsideCastlingTandemPiece(color), coordinates[1]],
            (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.isVerticalPlacement)(color)
                ? [coordinates[0], this.fenOptions.getQueensideCastlingTandemPiece(color)]
                : [this.fenOptions.getQueensideCastlingTandemPiece(color), coordinates[1]],
        ];
    }
    processStandardMove(moveData) {
        const { startCoordinates: [startI, startJ], endCoordinates: [endI, endJ], promotion } = moveData;
        const endPiece = this.board.board[endI][endJ];
        const piece = promotion?.[0] ?? this.board.board[startI][startJ];
        const capturedPieces = this.getCapturedPieces(moveData);
        this.board.board[endI][endJ] = piece;
        this.board.board[startI][startJ] = _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.emptyPieceString;
        for (const coordinate of capturedPieces) {
            if ((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__.compareCoordinates)(coordinate, moveData.startCoordinates)) {
                this.board.board[endI][endJ] = _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.emptyPieceString;
            }
            else if (!(0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__.compareCoordinates)(coordinate, moveData.endCoordinates)) {
                this.board.board[coordinate[0]][coordinate[1]] = _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.emptyPieceString;
            }
        }
        const [kingsidePiece, queensidePiece] = this.getCastlingPieceEndCoordinates(moveData.startCoordinates, this.sideToMove);
        if ("specialType" in moveData) {
            const type = moveData.specialType;
            switch (type) {
                case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.SpecialMove.CastlingKingside: {
                    const secondKPiece = (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.isVerticalPlacement)(this.sideToMove)
                        ? this.board.board[startI][this.fenOptions.getKingsideCastlingTandemPiece(this.sideToMove)]
                        : this.board.board[this.fenOptions.getKingsideCastlingTandemPiece(this.sideToMove)][startJ];
                    const [kI, kJ] = this.fenOptions.getKingsideCastlingPieceEndCoordinate(this.sideToMove);
                    this.board.board[kI][kJ] = secondKPiece;
                    this.board.board[kingsidePiece[0]][kingsidePiece[1]] = _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.emptyPieceString;
                    break;
                }
                case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.SpecialMove.CastlingQueenside: {
                    const secondQPiece = (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.isVerticalPlacement)(this.sideToMove)
                        ? this.board.board[startI][this.fenOptions.getQueensideCastlingTandemPiece(this.sideToMove)]
                        : this.board.board[this.fenOptions.getQueensideCastlingTandemPiece(this.sideToMove)][startJ];
                    const [qI, qJ] = this.fenOptions.getQueensideCastlingPieceEndCoordinate(this.sideToMove);
                    this.board.board[qI][qJ] = secondQPiece;
                    this.board.board[queensidePiece[0]][queensidePiece[1]] = _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.emptyPieceString;
                    break;
                }
                default:
                    if (type === undefined || !(type in _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.SpecialMove)) {
                        console.error(`Unknown special move constant: ${String(type)}`);
                    }
            }
        }
        const castleKingside = this.fenOptions.tag("castleKingside"), castleQueenside = this.fenOptions.tag("castleQueenside"), royal = this.fenOptions.tag("royal");
        this.fenOptions.setTag("royal", this.fenOptions.tag("royal").map((r, i) => {
            if (r) {
                if (r[0] === startI && r[1] === startJ) {
                    castleKingside[i] = false;
                    castleQueenside[i] = false;
                    return [endI, endJ];
                }
                else
                    return [...r];
            }
            else
                return null;
        }));
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
            const royalPiece = royal[color];
            if (!royalPiece)
                continue;
            if ((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__.compareCoordinates)(royalPiece, moveData.startCoordinates)) {
                castleKingside[color] = false;
                castleQueenside[color] = false;
                break;
            }
            else if ((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__.compareCoordinates)(kingsidePiece, moveData.startCoordinates)) {
                castleKingside[color] = false;
                break;
            }
            else if ((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__.compareCoordinates)(queensidePiece, moveData.startCoordinates)) {
                castleQueenside[color] = false;
                break;
            }
        }
        return { endPiece: endPiece.isEmpty() ? [] : [endPiece] };
    }
    spreadPointsBetweenPlayersEvenly() {
        const resigned = this.fenOptions.tag("resigned"), dead = this.fenOptions.tag("dead");
        const realPlayers = resigned.reduce((p, n, i) => p + Number(n || dead[i]), 0);
        const individualPoints = Math.ceil(this.obtainPointsForMate() / realPlayers);
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
            if (!dead[color]) {
                this.assignPoints(color, individualPoints);
            }
        }
    }
    branchBetweenResignationMoves(move, sideToMove) {
        const playerName = (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.getPlayerNameFromColor)(sideToMove).toUpperCase();
        switch (move) {
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Resign:
                this.gameOver = `${playerName} RESIGNED!`;
                break;
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Timeout:
                this.gameOver = `${playerName} FORFEITS ON TIME!`;
                break;
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.ClaimWin:
                this.gameOver = `${playerName} CLAIMED THE WIN!`;
                break;
            default:
                (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.throwOnNever)(move);
        }
    }
    processInternalMove(internalMove) {
        const resigned = this.fenOptions.tag("resigned"), dead = this.fenOptions.tag("dead");
        const stalemates = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers);
        const insufficientMaterial = this.board.insufficientMaterialModule?.(this.board)?.every((b, i) => {
            if (i === this.sideToMove) {
                return b;
            }
            else {
                return b || dead[i];
            }
        });
        switch (internalMove.type) {
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Stalemate:
                dead[this.sideToMove] = true;
                stalemates[this.sideToMove] = true;
                break;
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Resign:
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Timeout:
                if (insufficientMaterial) {
                    this.assignGeneralTermination("Timeout vs Insufficient Material");
                }
            // * Fallthrough
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.ClaimWin: {
                resigned[this.sideToMove] = true;
                this.turnPiecesDead(this.sideToMove, { ...(0,_FENDataInterface__WEBPACK_IMPORTED_MODULE_1__.createDefaultArmyDeathSettings)(), excludeRoyals: true, doNotSetDead: true });
                const deadPlayers = dead.map((d, i) => d || resigned[i]).filter(Boolean);
                let isResignationOver = deadPlayers.length === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers - 1;
                if (insufficientMaterial) {
                    this.spreadPointsBetweenPlayersEvenly();
                }
                else if (deadPlayers.length === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers - 1) {
                    const alivePlayer = deadPlayers.findIndex(d => !d);
                    if ((0,_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_8__.verifyNumericColor)(alivePlayer)) {
                        this.assignPoints(alivePlayer, this.countTotalPointsOnBoard()
                            .reduce((p, n, i) => p + (i === alivePlayer ? n : 0), 0));
                        isResignationOver = true;
                    }
                }
                else if (!this.board.gameType.isFFA()) {
                    isResignationOver = true;
                }
                if (isResignationOver) {
                    this.branchBetweenResignationMoves(internalMove.type, this.sideToMove);
                }
                break;
            }
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.DrawByAgreement:
                this.gameOver = "½-½ AGREED.";
                break;
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Pass:
                break;
            case _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.TeamsCheckmate: {
                this.gameOver = `CHECKMATE • ${this.getCurrentResult()}`;
                this.turnPiecesDead(this.sideToMove);
                this.turnPiecesDead(this.board.gameType.getTeammateColor(this.sideToMove));
                break;
            }
            default:
                (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.throwOnNever)(internalMove.type);
        }
        return { stalemates };
    }
    processDroppingMove(move) {
        const bank = this.fenOptions.tag("bank"), areBanksEnabled = this.fenOptions.tag("areBanksEnabled"), setupComplete = this.fenOptions.tag("setupComplete");
        if (!this.board.variantData.duckChess && !areBanksEnabled[this.sideToMove])
            return;
        const playerBank = bank[this.sideToMove];
        const pieceStringReference = [...playerBank.keys()].find(pieceString => pieceString.piece === move.piece.piece);
        if (!pieceStringReference && !this.board.variantData.duckChess && move.piece.piece !== _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_8__.nonPlayablePieces.duck)
            return;
        const safeReference = pieceStringReference ?? move.piece;
        this.board.board[move.endCoordinates[0]][move.endCoordinates[1]] = move.piece;
        if (!setupComplete[this.sideToMove])
            return;
        const bankPieceCount = playerBank.get(safeReference);
        if (bankPieceCount == 1) {
            playerBank.delete(safeReference);
        }
        else if (bankPieceCount) {
            playerBank.set(safeReference, bankPieceCount - 1);
        }
    }
    turnPiecesDead(color, settings = (0,_FENDataInterface__WEBPACK_IMPORTED_MODULE_1__.createDefaultArmyDeathSettings)()) {
        const royal = this.fenOptions.tag("royal"), dead = this.fenOptions.tag("dead");
        const royalPiece = royal[color];
        if (!settings.doNotSetDead) {
            dead[color] = true;
            royal[color] = null;
        }
        for (const coordinate of this.board.getPlayerPieces()[color]) {
            if (settings.excludeRoyals && royalPiece && (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__.compareCoordinates)(coordinate, royalPiece))
                continue;
            const piece = this.board.board[coordinate[0]][coordinate[1]].piece;
            if (settings.onlyPawns && !_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__.pieceControlConfigSettings[piece].moveGenerationSettings.isPawn)
                continue;
            this.board.board[coordinate[0]][coordinate[1]] =
                (0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.createPieceFromData)(_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.deadColorIndex, this.board.board[coordinate[0]][coordinate[1]].piece);
        }
    }
    getKingCaptures() {
        const kingCaptures = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers);
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
            const royalCoordinate = this.fenOptions.tag("royal")[color];
            if (!royalCoordinate)
                continue;
            const pieceString = this.board.board[royalCoordinate[0]][royalCoordinate[1]];
            if (pieceString.isEmpty() || pieceString.color !== color) {
                kingCaptures[color] = true;
            }
        }
        return kingCaptures;
    }
    processPointsForChecks(currentChecks) {
        const sideToMove = this.sideToMove;
        const updatedChecks = this.board.getCurrentChecks(), playerChecks = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers);
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
            for (const coordinate of updatedChecks[color]) {
                if (!currentChecks[color].has(coordinate)) {
                    playerChecks[color] = true;
                    break;
                }
            }
        }
        const checkedPlayers = playerChecks.filter(Boolean).length;
        if (checkedPlayers === 2) {
            this.assignPoints(sideToMove, 1);
        }
        else if (checkedPlayers === 3) {
            this.assignPoints(sideToMove, 5);
        }
    }
    affectOptions(move, settings = (0,_FENDataInterface__WEBPACK_IMPORTED_MODULE_1__.createDefaultFENEffectSettings)()) {
        let moveStalemates;
        let endSquare;
        const currentChecks = this.board.getCurrentChecks().map(arr => new Set(arr));
        if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.verifyInternalMove)(move)) {
            moveStalemates = this.processInternalMove(move).stalemates;
        }
        else if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.verifyStandardMove)(move)) {
            endSquare = this.processStandardMove(move).endPiece;
        }
        else if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.verifyDroppingMove)(move)) {
            this.processDroppingMove(move);
        }
        if (!settings.ignoreCheckmateChecks)
            this.board.pregenerateAttacks();
        const { checkmates, stalemates, checks } = settings.ignoreCheckmateChecks ? {
            checkmates: (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers), checks: (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers), stalemates: (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers)
        } : this.board.getCheckmatesAndStalemates();
        if (moveStalemates) {
            for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers; i++) {
                if (moveStalemates[i]) {
                    stalemates[i] = true;
                }
            }
        }
        const totalMateSum = checkmates.reduce((p, n) => n ? p + this.obtainPointsForMate() : p, 0);
        const boardAlternations = {
            pointDistribution: {
                checkmatePoints: checkmates.map((_, i) => i === this.sideToMove ? totalMateSum : 0),
                pieceCapturingPoints: (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.createTuple)(0, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers)
            }
        };
        if (endSquare) {
            for (const piece of endSquare) {
                boardAlternations.pointDistribution.pieceCapturingPoints[this.sideToMove] = this.getPointsForPiece(piece);
            }
        }
        const kingCaptures = this.getKingCaptures();
        const dead = this.fenOptions.tag("dead"), resigned = this.fenOptions.tag("resigned");
        if (this.board.gameType.isFFA()) {
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
                if (dead[color] || resigned[color]) {
                    continue;
                }
                if (checkmates[color] || (color === this.sideToMove && stalemates[color])) {
                    this.turnPiecesDead(color);
                    continue;
                }
                this.assignPoints(color, boardAlternations.pointDistribution.checkmatePoints[color]
                    + boardAlternations.pointDistribution.pieceCapturingPoints[color]);
            }
        }
        else {
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
                if (kingCaptures[color]) {
                    this.turnPiecesDead(color);
                    this.assignGeneralTermination("King Captured");
                }
            }
        }
        const realPlayers = this.getRealPlayers();
        const isOver = this.board.gameType.isFFA() ? realPlayers === 1 : realPlayers !== _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers;
        if (isOver)
            this.assignGeneralTermination("Checkmate");
        if (!settings.ignoreNextTurn && !isOver) {
            this.processPointsForChecks(currentChecks);
            const insufficientPieces = this.board.insufficientMaterialModule?.(this.board);
            if (!this.gameOver && insufficientPieces?.every((insufficient, i) => dead[i] || insufficient)) {
                this.gameOver = `INSUFFICIENT MATERIAL • ${this.getCurrentResult()}`;
                this.spreadPointsBetweenPlayersEvenly();
            }
            if (this.getRealPlayers() > 1) {
                this.sideToMove = this.nextTurn();
            }
        }
        return { checkmates, stalemates, checks };
    }
    constructPreliminaryHashString() {
        let builder = '';
        builder += this.sideToMove;
        let key;
        for (key in this.fenOptions.tags) {
            const tag = this.fenOptions.tags[key];
            if (!(0,_FENOptions_FENOptionsTagsInterface__WEBPACK_IMPORTED_MODULE_10__.verifyDynamicFENOptionKey)(tag, key))
                continue;
            const serializedForm = tag.serialize();
            if (serializedForm)
                builder += serializedForm;
        }
        builder = this.board.board.reduce((p, n) => p + n.map(ps => ps.value || "-").join(""), builder);
        return builder;
    }
    getRealPlayers() {
        const dead = this.fenOptions.tag("dead"), resigned = this.fenOptions.tag("resigned");
        let totalPlayers = 0;
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
            if (resigned[color] || dead[color])
                continue;
            totalPlayers++;
        }
        return totalPlayers;
    }
    nextTurn(player = this.sideToMove) {
        if (this.getRealPlayers() <= 1)
            throw new Error("Next turn called while the game is terminated");
        return (0,_FENDataInterface__WEBPACK_IMPORTED_MODULE_1__.getNeighboringSideToMove)(player, this.fenOptions.tag("dead"));
    }
    previousTurn(player = this.sideToMove) {
        const dead = this.fenOptions.tag("dead");
        if (this.getRealPlayers() <= 1)
            throw new Error("Previous turn called while the game is terminated");
        let sideToMove = player;
        do {
            sideToMove = (sideToMove === 0 ? _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers - 1 : sideToMove - 1);
        } while (dead[sideToMove]);
        if ((0,_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_8__.verifyNumericColor)(sideToMove)) {
            return sideToMove;
        }
        else
            throw new Error(`Unexpected numeric color: ${sideToMove}`);
    }
    isComplexEvaluation() { return false; }
    obtainPointsForMate() {
        return defaultPointsForMate;
    }
    assignPoints(sideToMove, points) {
        if (points > 0) {
            this.points[sideToMove] += points;
        }
    }
    getPointsForPiece(pieceString) {
        if (pieceString.isPiece() && this.board.gameType.isFFA()) {
            return _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__.pieceControlConfigSettings[pieceString.piece].points.singlesPoints;
        }
        else
            return 0;
    }
    countTotalPointsOnBoard() {
        const royal = this.fenOptions.tag("royal"), resigned = this.fenOptions.tag("resigned"), zombieImmune = this.fenOptions.tag("zombieImmune");
        const resultingPoints = [0, 0, 0, 0];
        this.board.getPlayerPieces().forEach((army, color) => {
            if (zombieImmune[color])
                return;
            const royalPiece = royal[color];
            for (const coordinate of army) {
                if (royalPiece && (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_7__.compareCoordinates)(coordinate, royalPiece)) {
                    resultingPoints[color] += this.obtainPointsForMate();
                }
                else if (resigned[color]) {
                    const piece = this.board.board[coordinate[0]][coordinate[1]].piece;
                    resultingPoints[color] += _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__.pieceControlConfigSettings[piece].points.singlesPoints;
                }
            }
        });
        return resultingPoints;
    }
    getCurrentResult() {
        if (this.board.gameType.isFFA()) {
            const dead = this.fenOptions.tag("dead"), resigned = this.fenOptions.tag("resigned");
            if (!this.board.isTwoPlayer)
                throw new Error("Result can only get called for 2P and teams");
            const max = Math.max(...this.points);
            let firstAlivePlayer, maximumIndex;
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
                if (dead[color] || resigned[color])
                    continue;
                if (this.points[color] === max) {
                    if (maximumIndex === undefined) {
                        maximumIndex = color;
                    }
                    else
                        return "½-½";
                }
                if (firstAlivePlayer === undefined)
                    firstAlivePlayer = color;
            }
            return firstAlivePlayer === maximumIndex ? "1-0" : "0-1";
        }
        else {
            let result = "½-½";
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
                if (this.points[color] > 0) {
                    result = this.board.gameType.teamSettings.firstTeamColors[color] ? "1-0" : "0-1";
                    break;
                }
            }
            return result;
        }
    }
    assignGeneralTermination(generalTermination, sideToMove) {
        if (this.board.gameType.isFFA() && !this.board.isTwoPlayer) {
            if (sideToMove !== undefined) {
                switch (generalTermination) {
                    case "Stalemate":
                        this.gameOver = `${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.getPlayerNameFromColor)(sideToMove).toUpperCase()} STALEMATED!`;
                        return;
                }
            }
            if ((0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.verifyWinningTermination)(generalTermination)) {
                this.gameOver = `${generalTermination.toUpperCase()}!`;
            }
            else if ((0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.verifyDrawingTermination)(generalTermination)) {
                this.gameOver = `${generalTermination.toUpperCase()}`;
            }
            else {
                (0,_baseTypes__WEBPACK_IMPORTED_MODULE_3__.throwOnNever)(generalTermination);
            }
        }
        else {
            this.gameOver = `${generalTermination.toUpperCase()} • ${this.getCurrentResult()}`;
        }
    }
}



/***/ }),

/***/ "./src/main/client/ts/logic/movegen/FENData/FENDataInterface.ts":
/*!**********************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/FENData/FENDataInterface.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDefaultArmyDeathSettings": function() { return /* binding */ createDefaultArmyDeathSettings; },
/* harmony export */   "createDefaultFENEffectSettings": function() { return /* binding */ createDefaultFENEffectSettings; },
/* harmony export */   "getNeighboringSideToMove": function() { return /* binding */ getNeighboringSideToMove; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");


const createDefaultFENEffectSettings = () => ({
    ignoreCheckmateChecks: false, ignoreNextTurn: false
});
const createDefaultArmyDeathSettings = () => ({
    excludeRoyals: false, onlyPawns: false, doNotSetDead: false
});
function getNeighboringSideToMove(player, dead) {
    let sideToMove = player;
    do {
        sideToMove = (sideToMove === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers - 1 ? 0 : sideToMove + 1);
    } while (dead[sideToMove]);
    if ((0,_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.verifyNumericColor)(sideToMove)) {
        return sideToMove;
    }
    else
        throw new Error(`Unexpected numeric color: ${sideToMove}`);
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptions.ts":
/*!***************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptions.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FENOptions": function() { return /* binding */ FENOptions; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _moveGeneration_VariantRules_VariantRuleDefinitions_BoardVariantModules_EngineMoveGeneration_BotInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts");
/* harmony import */ var _utils_ObjectUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/ObjectUtils */ "./src/main/client/ts/utils/ObjectUtils.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _FENOptionsTagsInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FENOptionsTagsInterface */ "./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptionsTagsInterface.ts");






class FENOptions {
    tags = (0,_FENOptionsTagsInterface__WEBPACK_IMPORTED_MODULE_5__.createFENOptionsTags)();
    castlingKingsideData = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => ({ endCoordinates: -1, pieceCoordinates: -1, pieceEndCoordinates: -1, checkSquares: [] }), _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers);
    castlingQueensideData = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => ({ endCoordinates: -1, pieceCoordinates: -1, pieceEndCoordinates: -1, checkSquares: [] }), _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers);
    createSnapshot() {
        return {
            tagsSnapshot: (0,_FENOptionsTagsInterface__WEBPACK_IMPORTED_MODULE_5__.createFENOptionsTagsSnapshot)(this.tags)
        };
    }
    loadTagSnapshot(value, tag) {
        tag.loadSnapshot(value);
    }
    loadSnapshot(snapshot) {
        let key;
        for (key in snapshot.tagsSnapshot) {
            if (!Object.prototype.hasOwnProperty.call(snapshot.tagsSnapshot, key))
                continue;
            this.loadTagSnapshot(snapshot.tagsSnapshot[key], this.tags[key]);
        }
    }
    verifyKeyTag(key, snapshot) {
        return key in snapshot;
    }
    createClone() {
        const newOptions = (0,_utils_ObjectUtils__WEBPACK_IMPORTED_MODULE_3__.copyClass)(this, FENOptions);
        const snapshot = this.createSnapshot();
        newOptions.tags = (0,_FENOptionsTagsInterface__WEBPACK_IMPORTED_MODULE_5__.createFENOptionsTags)();
        newOptions.loadSnapshot(snapshot);
        let key;
        for (key in this.tags) {
            if (Object.prototype.hasOwnProperty.call(this.tags, key) && !this.verifyKeyTag(key, snapshot.tagsSnapshot)) {
                newOptions.tags[key].value = this.tags[key].createSnapshot();
            }
        }
        return newOptions;
    }
    tag(key) {
        return this.tags[key].value;
    }
    setTag(key, value) {
        this.tags[key].value = value;
    }
    generateCastling(board) {
        let [dimensionRY, dimensionBG] = this.tag("dim");
        if (!this.tag("noCorners")) {
            if (dimensionRY > 8)
                dimensionRY = 8;
            if (dimensionBG > 8)
                dimensionBG = 8;
        }
        const dimensions = [dimensionRY, dimensionBG, dimensionRY, dimensionBG];
        const royalRanks = this.tag("royal").map((r, i) => r ? r[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.getHorizontalPlacementModulus)(i)] : r);
        const royalCoordinates = this.tag("royal").map((r, i) => r ? r[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.getHorizontalPlacementModulus)(i)] : r);
        const kingsideCastlePieceCoordinate = [];
        const queensideCastlePieceCoordinate = [];
        const boardSquares = board.board;
        for (let i = 0; i < this.tag("royal").length; i++) {
            const royalCoordinateI = royalCoordinates[i];
            const royalRanksI = royalRanks[i];
            if (royalCoordinateI === null || royalRanksI === null) {
                kingsideCastlePieceCoordinate.push(-1);
                queensideCastlePieceCoordinate.push(-1);
                continue;
            }
            const condition = i % 2 === 0;
            for (let j = royalCoordinateI; j < 14; j++) {
                const pieceString = boardSquares[condition ? royalRanksI : j][condition ? j : royalRanksI];
                if (!pieceString.isEmpty() && pieceString.piece === this.tag("castleWith")) {
                    kingsideCastlePieceCoordinate.push(j);
                    break;
                }
                else if (j === 13) {
                    kingsideCastlePieceCoordinate.push(-1);
                }
            }
            for (let j = royalCoordinateI; j > -1; j--) {
                const pieceString = boardSquares[condition ? royalRanksI : j][condition ? j : royalRanksI];
                if (!pieceString.isEmpty() && pieceString.piece === this.tag("castleWith")) {
                    queensideCastlePieceCoordinate.push(j);
                    break;
                }
                else if (j === 0) {
                    queensideCastlePieceCoordinate.push(-1);
                }
            }
        }
        for (let i = 0; i < this.tag("royal").length; i++) {
            const royalCoordinate = royalCoordinates[i];
            if (royalCoordinate === null)
                continue;
            const d = dimensions[i] - 6 < 1 ? 1 : dimensions[i] - 6;
            if (kingsideCastlePieceCoordinate[i] === -1) {
                this.tag("castleKingside")[i] = false;
            }
            else {
                const kArr = [...Array(kingsideCastlePieceCoordinate[i] - royalCoordinate - 1).keys()];
                const endCoordinates = royalCoordinate + d;
                const castlingData = {
                    endCoordinates, checkSquares: kArr.map(j => j + royalCoordinate + 1),
                    pieceCoordinates: kingsideCastlePieceCoordinate[i], pieceEndCoordinates: endCoordinates - 1
                };
                if (royalCoordinate <= 6) {
                    this.castlingQueensideData[i] = castlingData;
                }
                else {
                    this.castlingKingsideData[i] = castlingData;
                }
            }
            if (queensideCastlePieceCoordinate[i] === -1) {
                this.tags.castleQueenside.value[i] = false;
            }
            else {
                const qArr = [...Array(royalCoordinate - queensideCastlePieceCoordinate[i] - 1).keys()];
                const endCoordinates = royalCoordinate - d;
                const castlingData = {
                    endCoordinates, checkSquares: royalCoordinate <= 6 ? qArr.map(j => j + royalCoordinate - 2) : qArr.map(j => j + royalCoordinate - 3),
                    pieceCoordinates: queensideCastlePieceCoordinate[i], pieceEndCoordinates: endCoordinates + 1
                };
                if (royalCoordinate <= 6) {
                    this.castlingKingsideData[i] = castlingData;
                }
                else {
                    this.castlingQueensideData[i] = castlingData;
                }
            }
        }
    }
    isCastlingAvailable(player, board, checks) {
        const royal = this.tag("royal")[player];
        if (royal === null)
            return false;
        const royalCoordinate = royal[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.getVerticalPlacementModulus)(player)];
        const squares = board.board;
        for (const checkSquare of checks) {
            const coordinateA = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.isVerticalPlacement)(player) ? royalCoordinate : checkSquare;
            const coordinateB = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.isVerticalPlacement)(player) ? checkSquare : royalCoordinate;
            if (!squares[coordinateA][coordinateB].isEmpty() ||
                board.preGeneratedAttacks[player].hoppingPieces[coordinateA][coordinateB] > 0 ||
                board.preGeneratedAttacks[player].slidingPieces[coordinateA][coordinateB] > 0)
                return false;
        }
        if (board.isKingInCheck(player))
            return false;
        return true;
    }
    isKingsideCastlingAvailable(player, board) {
        if (!this.tag("castleKingside")[player])
            return false;
        if (this.castlingKingsideData[player].endCoordinates === -1) {
            this.generateCastling(board);
        }
        return this.isCastlingAvailable(player, board, this.castlingKingsideData[player].checkSquares);
    }
    isQueensideCastlingAvailable(player, board) {
        if (!this.tag("castleQueenside")[player])
            return false;
        if (this.castlingQueensideData[player].endCoordinates === -1) {
            this.generateCastling(board);
        }
        return this.isCastlingAvailable(player, board, this.castlingQueensideData[player].checkSquares);
    }
    getCastlingEndCoordinate(player, coordinates) {
        const royalCoordinate = this.tag("royal")[player]?.[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.getVerticalPlacementModulus)(player)];
        (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.assertNonUndefined)(coordinates);
        (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.assertNonUndefined)(royalCoordinate);
        const coordinateA = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.isVerticalPlacement)(player) ? royalCoordinate : coordinates;
        const coordinateB = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.isVerticalPlacement)(player) ? coordinates : royalCoordinate;
        return [coordinateA, coordinateB];
    }
    getKingsideCastlingEndCoordinate(player) { return this.getCastlingEndCoordinate(player, this.castlingKingsideData[player].endCoordinates); }
    getQueensideCastlingEndCoordinate(player) { return this.getCastlingEndCoordinate(player, this.castlingQueensideData[player].endCoordinates); }
    getKingsideCastlingPieceEndCoordinate(player) { return this.getCastlingEndCoordinate(player, this.castlingKingsideData[player].pieceEndCoordinates); }
    getQueensideCastlingPieceEndCoordinate(player) { return this.getCastlingEndCoordinate(player, this.castlingQueensideData[player].pieceEndCoordinates); }
    getKingsideCastlingTandemPiece(player) { return this.castlingKingsideData[player].pieceCoordinates; }
    getQueensideCastlingTandemPiece(player) { return this.castlingQueensideData[player].pieceCoordinates; }
    getAvailableEnPassantCaptures(baseColor) {
        const coordinates = [];
        this.tag("enPassant").forEach((enPassant, i) => {
            if (i === baseColor)
                return;
            if (enPassant)
                coordinates.push(enPassant[0]);
        });
        return coordinates.map(e => [...e]);
    }
    getDefaultZombieAlgorithm(baseColor) {
        const algorithm = _moveGeneration_VariantRules_VariantRuleDefinitions_BoardVariantModules_EngineMoveGeneration_BotInterface__WEBPACK_IMPORTED_MODULE_2__.botAlgorithms.get(this.tag("resigned")[baseColor] ? this.tag("zombieType")[baseColor] : _moveGeneration_VariantRules_VariantRuleDefinitions_BoardVariantModules_EngineMoveGeneration_BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.F_Checker);
        (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.assertNonUndefined)(algorithm);
        return algorithm;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptionsTags.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptionsTags.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBankTag": function() { return /* binding */ createBankTag; },
/* harmony export */   "createBooleanTag": function() { return /* binding */ createBooleanTag; },
/* harmony export */   "createBooleanTupleTag": function() { return /* binding */ createBooleanTupleTag; },
/* harmony export */   "createBoxOffsetTag": function() { return /* binding */ createBoxOffsetTag; },
/* harmony export */   "createCastleWithTag": function() { return /* binding */ createCastleWithTag; },
/* harmony export */   "createDimensionTag": function() { return /* binding */ createDimensionTag; },
/* harmony export */   "createEnPassantTag": function() { return /* binding */ createEnPassantTag; },
/* harmony export */   "createLivesTag": function() { return /* binding */ createLivesTag; },
/* harmony export */   "createPawnBaseRankTag": function() { return /* binding */ createPawnBaseRankTag; },
/* harmony export */   "createPromotedFromTag": function() { return /* binding */ createPromotedFromTag; },
/* harmony export */   "createRoyalTag": function() { return /* binding */ createRoyalTag; },
/* harmony export */   "createSeirawanDropsTag": function() { return /* binding */ createSeirawanDropsTag; },
/* harmony export */   "createSetupPointsTag": function() { return /* binding */ createSetupPointsTag; },
/* harmony export */   "createZombiesTag": function() { return /* binding */ createZombiesTag; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @client/ts/utils/ArrayUtils */ "./src/main/client/ts/utils/ArrayUtils.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _moveGeneration_VariantRules_VariantRuleDefinitions_BoardVariantModules_EngineMoveGeneration_BotInterface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts");
/* harmony import */ var _client_ts_logic_utils_Tags_Moves_ParsePGNMoves__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @client/ts/logic/utils/Tags/Moves/ParsePGNMoves */ "./src/main/client/ts/logic/utils/Tags/Moves/ParsePGNMoves.ts");
/* harmony import */ var _client_ts_logic_utils_Tags_Utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @client/ts/logic/utils/Tags/Utils */ "./src/main/client/ts/logic/utils/Tags/Utils.ts");










const verifyParameterType = (param, type) => {
    return Array.isArray(param) && (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(param, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers) && param.every(v => typeof v === type);
};
function createBooleanTupleTag(parameters) {
    const { defaultValue, key, isStatic } = parameters;
    const resultingObject = {
        value: [...defaultValue],
        parse(value) {
            if (verifyParameterType(value, "boolean")) {
                return value;
            }
            else
                return this.createSnapshot();
        },
        serialize() {
            if (key === "castleKingside" || key === "castleQueenside" || key === "dead" || key === "areBanksEnabled")
                return;
            if (!(0,_client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__.compareArrays)(this.value, defaultValue)) {
                return `'${key}':(${this.value.join(",")})`;
            }
            else
                return;
        },
        createSnapshot() {
            return [...this.value];
        },
        loadSnapshot(snapshot) {
            const tuple = [...snapshot];
            this.value = tuple;
        }
    };
    if (isStatic)
        delete resultingObject.loadSnapshot;
    return resultingObject;
}
const defaultPawnBaseRank = 2;
const createPawnBaseRankTag = () => ({
    value: defaultPawnBaseRank,
    parse(value) {
        return typeof value === "number" && (value > 0 && value <= _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension) ? value : this.value;
    },
    serialize() {
        return this.value === defaultPawnBaseRank ? undefined : `'pawnBaseRank':${this.value}`;
    },
    createSnapshot() {
        return this.value;
    }
});
const createEnPassantTag = () => ({
    value: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(null, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers),
    parse(input) {
        if (verifyParameterType(input, "string")) {
            return input.map(v => (0,_client_ts_logic_utils_Tags_Utils__WEBPACK_IMPORTED_MODULE_9__.parseEnPassantCoordinates)(v) ?? null);
        }
        else
            return this.createSnapshot();
    },
    serialize() {
        if (this.value.some(v => !v)) {
            return `'enPassant':(${this.value.map(enP => enP ?
                `'${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.convertCoordinateToPGN4)(enP[0])}:${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.convertCoordinateToPGN4)(enP[1])}'` : "''").join(",")})`;
        }
        else
            return;
    },
    createSnapshot() {
        return this.value.map(enP => enP ? [[...enP[0]], [...enP[1]]] : enP);
    },
    loadSnapshot(snapshot) {
        this.value = snapshot.map(enP => enP ? [[...enP[0]], [...enP[1]]] : enP);
    }
});
const defaultCastleWith = "R";
const createCastleWithTag = () => ({
    value: defaultCastleWith,
    parse(input) {
        return typeof input === "string" ? input : this.value;
    },
    serialize() {
        return this.value === defaultCastleWith ? undefined : `'castleWith':${this.value}`;
    },
    createSnapshot() {
        return this.value;
    }
});
const defaultBoxOffset = 0;
const createBoxOffsetTag = () => ({
    value: defaultBoxOffset,
    parse(input) {
        return typeof input === "number" && (0,_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_4__.verifyNumericColor)(input) ? input : this.value;
    },
    serialize() {
        return this.value === defaultBoxOffset ? undefined : `'boxOffset':${this.value}`;
    },
    createSnapshot() {
        return this.value;
    }
});
function createBooleanTag(parameters) {
    const { defaultValue, key, isStatic } = parameters;
    const result = {
        value: defaultValue,
        parse(input) {
            return typeof input === "boolean" ? input : this.createSnapshot();
        },
        serialize() {
            return this.value === defaultValue ? undefined : `'${key}':${String(this.value)}`;
        },
        createSnapshot() {
            return this.value;
        },
        loadSnapshot(snapshot) {
            this.value = snapshot;
        }
    };
    if (isStatic)
        delete result.loadSnapshot;
    return result;
}
const defaultDimension = [14, 14];
const createDimensionTag = () => ({
    value: [...defaultDimension],
    parse(baseInput) {
        if (typeof baseInput !== "string")
            return this.createSnapshot();
        const input = baseInput.split("x");
        return Array.isArray(input) && (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(input, 2)
            && input.every((i) => {
                const v = Number(i);
                return !isNaN(v) && (v >= 2) && (v <= 14) && (v % 2 === 0);
            }) ? input.map(v => Number(v)).reverse() : this.createSnapshot();
    },
    serialize() {
        if ((0,_client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__.compareArrays)(this.value, defaultDimension))
            return;
        return `'dim':'${this.value.join("x")}'`;
    },
    createSnapshot() {
        return [...this.value];
    }
});
const defaultZombies = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(_moveGeneration_VariantRules_VariantRuleDefinitions_BoardVariantModules_EngineMoveGeneration_BotInterface__WEBPACK_IMPORTED_MODULE_7__.ZombieType.Rando, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers);
const createZombiesTag = () => ({
    value: [...defaultZombies],
    parse(input) {
        if (Array.isArray(input) && (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(input, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers)
            && input.every((v) => typeof v === 'string')) {
            const newZombies = this.createSnapshot();
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                const zombieType = input[color];
                if ((0,_moveGeneration_VariantRules_VariantRuleDefinitions_BoardVariantModules_EngineMoveGeneration_BotInterface__WEBPACK_IMPORTED_MODULE_7__.verifyZombieType)(zombieType))
                    newZombies[color] = zombieType;
            }
            return newZombies;
        }
        else
            return this.createSnapshot();
    },
    serialize() {
        if ((0,_client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__.compareArrays)(this.value, defaultZombies))
            return;
        return `'zombieType':(${this.value
            .map((t, i) => t === defaultZombies[i] ? "''" : `'${t}'`).join(",")})`;
    },
    createSnapshot() {
        return [...this.value];
    }
});
const createRoyalTag = () => ({
    value: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(null, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers),
    parse(input) {
        if (verifyParameterType(input, "string")) {
            return input.map(c => (0,_client_ts_logic_utils_Tags_Utils__WEBPACK_IMPORTED_MODULE_9__.parseSingleCoordinate)(c) ?? null);
        }
        else
            return this.createSnapshot();
    },
    serialize() {
        return `'royal':(${this.value.map(r => r ? `'${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.convertCoordinateToPGN4)(r)}'` : "''").join(",")})`;
    },
    createSnapshot() {
        return this.value.map(c => c ? [...c] : c);
    },
    loadSnapshot(snapshot) {
        this.value = snapshot.map(c => c ? [...c] : c);
    }
});
const createLivesTag = () => ({
    value: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(null, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers),
    parse(input) {
        if (verifyParameterType(input, "number")) {
            return input;
        }
        else
            return this.createSnapshot();
    },
    serialize() {
        if (this.value.some(v => v !== null)) {
            return `'lives':(${this.value.map(l => l ? String(l) : "1").join(",")})`;
        }
        else
            return;
    },
    createSnapshot() {
        return [...this.value];
    },
    loadSnapshot(snapshot) {
        this.value = [...snapshot];
    }
});
const createBankTag = () => ({
    value: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => new Map, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers),
    parse(input) {
        const defaultBanks = this.createSnapshot();
        if (verifyParameterType(input, "string")) {
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                for (const pieceDefinition of input[color].split(",")) {
                    const [piece, count = 1] = pieceDefinition.split("x").map((e, i) => i === 1 ? Number(e) : e);
                    if (typeof piece !== "string" || typeof count !== "number")
                        continue;
                    if (!/^(?:r|b|y|g).$/.test(piece))
                        continue;
                    const pieceLetter = piece.charAt(1);
                    if ((0,_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__.verifyPieceLetter)(pieceLetter)) {
                        defaultBanks[color].set((0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.createPieceFromString)(piece), count);
                    }
                }
            }
        }
        return defaultBanks;
    },
    serialize() {
        if (this.value.some(b => b.size !== 0)) {
            return `'bank':(${this.value.map(bank => {
                const resultingStrings = [];
                for (const [piece, count] of bank) {
                    if (count === 1) {
                        resultingStrings.push(piece.value);
                    }
                    else {
                        resultingStrings.push(`${piece.value}x${count}`);
                    }
                }
                return `'${resultingStrings.join(",")}'`;
            }).join(",")})`;
        }
        else
            return;
    },
    createSnapshot() {
        return this.value.map(m => new Map(m));
    },
    loadSnapshot(snapshot) {
        this.value = snapshot.map(m => new Map(m));
    }
});
const verifyPromotedFromRecord = (object) => typeof object === "object" && object !== null;
const createPromotedFromTag = () => ({
    value: new Map(),
    parse(input) {
        const promotedFromMap = new Map();
        if (!verifyPromotedFromRecord(input))
            return promotedFromMap;
        for (const key in input) {
            if (!Object.prototype.hasOwnProperty.call(promotedFromMap, key))
                continue;
            const parsedCoordinate = (0,_client_ts_logic_utils_Tags_Utils__WEBPACK_IMPORTED_MODULE_9__.parseSingleCoordinate)(key);
            const pieceLetter = input[key];
            if (!parsedCoordinate || typeof pieceLetter !== "string" || !(0,_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__.verifyPieceLetter)(pieceLetter))
                continue;
            promotedFromMap.set(parsedCoordinate, pieceLetter);
        }
        return promotedFromMap;
    },
    serialize() {
        if (this.value.size === 0)
            return;
        const promotedFromStrings = [];
        for (const [coordinate, piece] of this.value) {
            promotedFromStrings.push(`'${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.convertCoordinateToPGN4)(coordinate)}':'${piece}'`);
        }
        return `'promotedFrom':{${promotedFromStrings.join(",")}}`;
    },
    createSnapshot() {
        const newMap = new Map();
        for (const [coordinate, pieceLetter] of this.value.entries()) {
            newMap.set([...coordinate], pieceLetter);
        }
        return newMap;
    },
    loadSnapshot(snapshot) {
        this.value.clear();
        for (const [coordinate, pieceLetter] of snapshot.entries()) {
            this.value.set([...coordinate], pieceLetter);
        }
    }
});
const createSetupPointsTag = () => ({
    value: null,
    parse(input) {
        if (verifyParameterType(input, "number")) {
            return input;
        }
        else
            return this.createSnapshot();
    },
    serialize() {
        if (this.value) {
            return `'setupPoints':(${this.value.join(",")})`;
        }
        else
            return;
    },
    createSnapshot() {
        return this.value ? [...this.value] : this.value;
    },
    loadSnapshot(snapshot) {
        this.value = snapshot ? [...snapshot] : snapshot;
    }
});
const createSeirawanDropsTag = () => ({
    value: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => new Set(), _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers),
    parse(input) {
        const defaultValue = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => new Set(), _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers);
        if (Array.isArray(input) && ((0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(input, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers) || (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(input, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers + 1))
            && input.every((v) => Array.isArray(v))) {
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                const seirawanDropsArray = input[color];
                if (!seirawanDropsArray.every((v) => typeof v === 'string'))
                    continue;
                for (const pieceDefinition of seirawanDropsArray) {
                    if (!_client_ts_logic_utils_Tags_Moves_ParsePGNMoves__WEBPACK_IMPORTED_MODULE_8__.PGN4_SYNTAX.COORDINATE_REGEX.test(pieceDefinition))
                        continue;
                    const coordinate = (0,_client_ts_logic_utils_Tags_Utils__WEBPACK_IMPORTED_MODULE_9__.parseSingleCoordinate)(pieceDefinition);
                    if (coordinate) {
                        defaultValue[color].add((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__.stringifyCoordinate)(coordinate));
                    }
                }
            }
        }
        return defaultValue;
    },
    serialize() {
        if (this.value.every(m => m.size === 0))
            return;
        return `'seirawanDrops':(${this.value.map(coordinates => {
            return `(${[...coordinates].map(coord => `'${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.convertCoordinateToPGN4)((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__.unstringifyCoordinate)(coord))}'`).join(",")})`;
        }).join(",")})`;
    },
    createSnapshot() {
        return this.value.map(s => new Set(s));
    },
    loadSnapshot(snapshot) {
        this.value = snapshot.map(s => new Set(s));
    }
});


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptionsTagsInterface.ts":
/*!****************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptionsTagsInterface.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFENOptionsTags": function() { return /* binding */ createFENOptionsTags; },
/* harmony export */   "createFENOptionsTagsSnapshot": function() { return /* binding */ createFENOptionsTagsSnapshot; },
/* harmony export */   "verifyDynamicFENOptionKey": function() { return /* binding */ verifyDynamicFENOptionKey; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FENOptionsTags */ "./src/main/client/ts/logic/movegen/FENData/FENOptions/FENOptionsTags.ts");



const verifyDynamicFENOptionKey = (fenTag, key) => "loadSnapshot" in fenTag;
const verifyDynamicTag = (fenTag) => "loadSnapshot" in fenTag;
function createFENOptionsTags() {
    return {
        dead: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTupleTag)({ key: "dead", defaultValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers), isStatic: false }),
        resigned: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTupleTag)({ key: "resigned", defaultValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers), isStatic: false }),
        pawnBaseRank: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createPawnBaseRankTag)(),
        enPassant: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createEnPassantTag)(),
        boxOffset: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBoxOffsetTag)(),
        wb: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTag)({ key: "wb", defaultValue: false, isStatic: true }),
        dim: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createDimensionTag)(),
        noCorners: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTag)({ key: "noCorners", defaultValue: false, isStatic: true }),
        castleKingside: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTupleTag)({ key: "castleKingside", defaultValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(true, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers), isStatic: false }),
        castleQueenside: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTupleTag)({ key: "castleQueenside", defaultValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(true, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers), isStatic: false }),
        castleWith: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createCastleWithTag)(),
        zombieType: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createZombiesTag)(),
        zombieImmune: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTupleTag)({ key: "zombieImmune", defaultValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers), isStatic: false }),
        royal: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createRoyalTag)(),
        lives: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createLivesTag)(),
        bank: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBankTag)(),
        promotedFrom: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createPromotedFromTag)(),
        setupPoints: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createSetupPointsTag)(),
        setupComplete: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTupleTag)({ key: "setupComplete", defaultValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(true, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers), isStatic: false }),
        seirawanDrops: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createSeirawanDropsTag)(),
        areBanksEnabled: (0,_FENOptionsTags__WEBPACK_IMPORTED_MODULE_2__.createBooleanTupleTag)({ key: "areBanksEnabled", defaultValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers), isStatic: false })
    };
}
const setFENOptionsTag = (tags, key, tag) => tags[key] = tag.createSnapshot();
function createFENOptionsTagsSnapshot(tags) {
    const resultingTags = {};
    let fenTag;
    for (fenTag in tags) {
        if (!Object.prototype.hasOwnProperty.call(tags, fenTag))
            continue;
        const tag = tags[fenTag];
        if (!verifyDynamicFENOptionKey(tag, fenTag) || !verifyDynamicTag(tag))
            continue;
        setFENOptionsTag(resultingTags, fenTag, tag);
    }
    return resultingTags;
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts":
/*!**********************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/GameInformation/GameData.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


const validateComprehensiveUnionArray = () => (arr) => arr;
const playerNames = validateComprehensiveUnionArray()(["Red", "Blue", "Yellow", "Green", "White", "Black"]);
const individualTerminations = validateComprehensiveUnionArray()([
    "Won the Race", "Checkmated", "Stalemated", "Forfeits on Time", "Claimed the Win", "Resigned"
]);
const generalWinningTerminations = validateComprehensiveUnionArray()([
    "Checkmate", "King Captured", "King of the Hill", "Stalemate"
]);
const verifyWinningTermination = (termination) => {
    const generalWins = generalWinningTerminations;
    return generalWins.includes(termination);
};
const generalDrawingTerminations = validateComprehensiveUnionArray()([
    "50-move Rule",
    "Insufficient Material", "Threefold Repetition", "Timeout vs Insufficient Material"
]);
const verifyDrawingTermination = (termination) => {
    const generalDraws = generalDrawingTerminations;
    return generalDraws.includes(termination);
};
const generalTerminations = validateComprehensiveUnionArray()([...generalWinningTerminations, ...generalDrawingTerminations]);
const results = validateComprehensiveUnionArray()(["0-1", "1-0", "½-½"]);
const validateTerminationString = (termination) => {
    const capitalizedTermination = termination.toUpperCase();
    if (playerNames.some(str => capitalizedTermination.startsWith(str.toUpperCase()))
        && individualTerminations.some(str => capitalizedTermination.endsWith(str.toUpperCase() + "!"))) {
        return true;
    }
    else if (/.*?\s•\s.*/.test(capitalizedTermination)
        && generalTerminations.some(str => capitalizedTermination.startsWith(str.toUpperCase()))
        && results.some(str => capitalizedTermination.endsWith(str.toUpperCase()))) {
        return true;
    }
    else if (capitalizedTermination === "½-½ AGREED.") {
        return true;
    }
    return false;
};
const stringifyTimeControl = (timeControl) => {
    const noIncrement = timeControl.increment === 0;
    let timeControlString = "";
    if (timeControl.baseTime < 60) {
        timeControlString += noIncrement ? `${timeControl.baseTime * 60} sec` : `${timeControl.baseTime * 60}s`;
    }
    else if (timeControl.baseTime > 60 && noIncrement) {
        timeControlString += `${(0,_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__.truncateNumber)(timeControl.baseTime / 60, 1)} min`;
    }
    else {
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
const obtainTimeControlType = (timeControl) => {
    const { baseTime, increment, isDelay } = timeControl;
    if (isDelay) {
        const formula = baseTime / 40 + increment;
        if (formula > 11.5) {
            return TimeControlType.Rapid;
        }
        else if (formula <= 1.375) {
            return TimeControlType.Hyperbullet;
        }
        else if (formula <= 4.5) {
            return TimeControlType.Bullet;
        }
        else {
            return TimeControlType.Blitz;
        }
    }
    else {
        const formula = baseTime / 60 + increment;
        if (formula > 7.5) {
            return TimeControlType.Rapid;
        }
        else if (formula <= 0.5) {
            return TimeControlType.Hyperbullet;
        }
        else if (formula <= 3) {
            return TimeControlType.Bullet;
        }
        else {
            return TimeControlType.Blitz;
        }
    }
};
const convertCoordinateToPGN4 = (coordinate, dimension = boardDimension) => {
    if (dimension === boardDimension) {
        return `${String.fromCharCode(coordinate[1] + 97)}${boardDimension - coordinate[0]}`;
    }
    else {
        const alternation = (boardDimension - dimension) / 2;
        return `${String.fromCharCode(coordinate[1] - alternation + 97)}${boardDimension - coordinate[0] - alternation}`;
    }
};
const convertCoordinateToPGN4Array = (coordinate, dimension = boardDimension) => {
    if (dimension === boardDimension) {
        return [String.fromCharCode(coordinate[1] + 97), boardDimension - coordinate[0]];
    }
    else {
        const alternation = (boardDimension - dimension) / 2;
        return [String.fromCharCode(coordinate[1] - alternation + 97), boardDimension - coordinate[0] - alternation];
    }
};
const getOppositePlacedColor = (color) => {
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
const getPlayerNameFromColor = (color, wb = false) => {
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
const createDefaultNumericColorAdjustment = () => ({
    wb: false
});
var TimeControlType;
(function (TimeControlType) {
    TimeControlType["Hyperbullet"] = "Hyperbullet";
    TimeControlType["Bullet"] = "Bullet";
    TimeControlType["Blitz"] = "Blitz";
    TimeControlType["Rapid"] = "Rapid";
})(TimeControlType || (TimeControlType = {}));
var VariantType;
(function (VariantType) {
    VariantType["FFA"] = "FFA";
    VariantType["Teams"] = "Teams";
    VariantType["Solo"] = "Solo";
})(VariantType || (VariantType = {}));
const totalPlayers = 4;
const boardDimension = 14;
const colors = [0, 1, 2, 3];


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
const verifyNumericColor = (num) => num >= 0 && num < 4;
const nonPlayablePieces = {
    wall: "X", transparentWall: "x", duck: "Θ"
};
const colorEnum = {
    r: 0, b: 1, y: 2, g: 3
};
const verifyColorEnumValue = (value) => value in colorEnum;
const playerEnum = {
    Red: 0,
    Blue: 1,
    Yellow: 2,
    Green: 3,
    White: 0,
    Black: 2
};
const verifyPlayerEnumValue = (player) => player in playerEnum;
const stringColorEnum = {
    [0]: 'r', [1]: 'b', [2]: 'y', [3]: 'g', [4]: 'd',
};


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts":
/*!***********************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PieceString": function() { return /* binding */ PieceString; },
/* harmony export */   "createPieceFromData": function() { return /* binding */ createPieceFromData; },
/* harmony export */   "createPieceFromString": function() { return /* binding */ createPieceFromString; },
/* harmony export */   "deadColorIndex": function() { return /* binding */ deadColorIndex; },
/* harmony export */   "duckPieceString": function() { return /* binding */ duckPieceString; },
/* harmony export */   "emptyPieceString": function() { return /* binding */ emptyPieceString; },
/* harmony export */   "pawnPieceString": function() { return /* binding */ pawnPieceString; },
/* harmony export */   "wallPieceString": function() { return /* binding */ wallPieceString; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _GameUnits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");


const deadColorIndex = 4;
class PieceString {
    _color;
    _piece;
    static comparePieceStrings(pieceString1, pieceString2) {
        return pieceString1._piece === pieceString2._piece && pieceString1._color === pieceString2._color;
    }
    static comparePieceStringObjects(pieceString1, pieceString2) {
        return pieceString1._piece === pieceString2._piece && pieceString1._color === pieceString2._color;
    }
    static fromObjectToClass(object) {
        return new PieceString(object._color, object._piece);
    }
    value;
    constructor(_color, _piece) {
        this._color = _color;
        this._piece = _piece;
        this.value = _piece.length ? /[xXΘ]/.test(_piece) ? _piece : _GameUnits__WEBPACK_IMPORTED_MODULE_1__.stringColorEnum[_color] + _piece : '';
    }
    isDead() { return this._color === deadColorIndex && !this.isWall(); }
    isEmpty() { return this._piece.length === 0; }
    isWall() { return this.value.length === 1; }
    isPiece() { return this.value.length === 2 && this._color !== deadColorIndex; }
    get piece() {
        if (this.isEmpty())
            throw new TypeError("Accessing a piece string piece value while the piece string is empty.");
        return this._piece;
    }
    get color() {
        if (this.isEmpty())
            throw new TypeError("Accessing a piece string color value while the piece string is empty.");
        return this._color;
    }
    getStringifiedColor() {
        return this.value.charAt(0);
    }
    toObject() {
        return {
            _piece: this._piece,
            _color: this._color,
            value: this.value
        };
    }
}
const createPieceFromData = (color, piece) => {
    if ((0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.verifyPieceLetter)(piece)) {
        return new PieceString(color, piece);
    }
    throw new Error("Wrong color signature for the piece provided");
};
const createPieceFromString = (piece) => {
    const verifyColorEnum = (p) => p in _GameUnits__WEBPACK_IMPORTED_MODULE_1__.colorEnum;
    if (piece.length === 1 && (0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.verifyPieceLetter)(piece)) {
        return new PieceString(deadColorIndex, piece);
    }
    else {
        const color = piece.charAt(0);
        const pieceLetter = piece.charAt(1);
        if (!(0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.verifyPieceLetter)(pieceLetter))
            throw new Error("Wrong signature for the piece provided");
        if (color === 'd') {
            return new PieceString(deadColorIndex, pieceLetter);
        }
        else {
            if (verifyColorEnum(color)) {
                return new PieceString(_GameUnits__WEBPACK_IMPORTED_MODULE_1__.colorEnum[color], pieceLetter);
            }
            else
                throw new Error("Wrong color signature for the piece provided");
        }
    }
};
const testEmptyPieceString = new PieceString(0, _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.emptyLetter);
if (!testEmptyPieceString.isEmpty())
    throw new Error("Empty piece string is not isEmpty");
const emptyPieceString = testEmptyPieceString;
const testWallPieceString = new PieceString(deadColorIndex, _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.wallPieceLetter);
if (!testWallPieceString.isWall())
    throw new Error("Wall piece string is not isWall");
const wallPieceString = testWallPieceString;
const testActivePieceString = new PieceString(0, _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.pawnPieceLetter);
if (!testActivePieceString.isPiece())
    throw new Error("Active piece string is not isActive");
const pawnPieceString = testActivePieceString;
const testDuckPieceString = new PieceString(deadColorIndex, _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.duckLetter);
if (!testDuckPieceString.isWall())
    throw new Error("Wall piece string is not isWall");
const duckPieceString = testActivePieceString;


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/MoveTree/MoveNotationStringifier.ts":
/*!******************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/MoveTree/MoveNotationStringifier.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fullMoveNotationStringify": function() { return /* binding */ fullMoveNotationStringify; },
/* harmony export */   "moveNotation": function() { return /* binding */ moveNotation; },
/* harmony export */   "shortenedMoveNotationStringify": function() { return /* binding */ shortenedMoveNotationStringify; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/ArrayUtils */ "./src/main/client/ts/utils/ArrayUtils.ts");
/* harmony import */ var _BaseInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");







function generateCastlingString(moveData) {
    switch (moveData.specialType) {
        case _MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.SpecialMove.CastlingKingside:
            return "O-O";
        case _MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.SpecialMove.CastlingQueenside:
            return "O-O-O";
        default:
            return "";
    }
}
function extractPiece(metadata) {
    return metadata.movingPiece.piece !== _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.pawnPieceString.piece ? metadata.movingPiece.piece : "";
}
function obtainAmbiguousOrthogonality(parameters) {
    const { moveMetadata, move, snapshot: { boardSnapshot: { board }, pregeneratedAttacks: { pieceMovements } }, isCapture } = parameters;
    const { piece, color } = moveMetadata.movingPiece;
    const isPawn = piece === _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.pawnPieceString.piece;
    const registeredPieces = [];
    for (const [piece, movements] of pieceMovements) {
        const parsedCoordinate = (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_3__.unstringifyCoordinate)(piece);
        const boardPiece = board[parsedCoordinate[0]][parsedCoordinate[1]];
        if (boardPiece.isEmpty() || boardPiece.color !== color
            || boardPiece.piece !== piece)
            continue;
        if (movements.find(m => (0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__.compareArrays)(move.endCoordinates, m.move)) !== undefined) {
            registeredPieces.push(parsedCoordinate);
        }
    }
    if (color === _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.deadColorIndex)
        return [false, false];
    const ambiguousRank = (isCapture && isPawn && (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_2__.isVerticalPlacement)(color))
        || registeredPieces.some((c, i) => registeredPieces.some((c2, j) => i !== j && c[0] === c2[0]));
    const ambiguousFile = (isCapture && isPawn && !(0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_2__.isVerticalPlacement)(color))
        || registeredPieces.some((c, i) => registeredPieces.some((c2, j) => i !== j && c[1] === c2[1]));
    return [ambiguousRank, ambiguousFile];
}
function extractPromotion(move) {
    return move.promotion ? `=${move.promotion[0].piece}` : "";
}
function extractChecksAndCheckmates(metadata) {
    return "+".repeat(metadata.checks) + "#".repeat(metadata.checkmates);
}
const shortenedMoveNotationStringify = (moveWrapper, snapshot, dimension) => {
    let resultingString = "";
    let isFirstCapturingMoveSet = false;
    for (const move of moveWrapper.moveData) {
        if ((0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.verifyStandardMove)(move)) {
            if ((resultingString += generateCastlingString(move)))
                continue;
            resultingString += extractPiece(moveWrapper.metadata);
            const isCapture = !isFirstCapturingMoveSet && moveWrapper.metadata.isCapture;
            const [ambiguousRank, ambiguousFile] = obtainAmbiguousOrthogonality({
                isCapture, move, snapshot, moveMetadata: moveWrapper.metadata
            });
            if (ambiguousFile && !ambiguousRank) {
                resultingString += (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4Array)(move.startCoordinates, dimension)[1];
            }
            else if (!ambiguousFile && ambiguousRank) {
                resultingString += (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4Array)(move.startCoordinates, dimension)[0];
            }
            else if (ambiguousFile && ambiguousRank) {
                resultingString += (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4)(move.startCoordinates, dimension);
            }
            if (isCapture) {
                resultingString += "x";
                isFirstCapturingMoveSet = true;
            }
            resultingString += (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4)(move.endCoordinates, dimension);
            resultingString += extractPromotion(move);
        }
        else if ((0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.verifyDroppingMove)(move)) {
            resultingString += `@${move.piece.piece}`;
            resultingString += `${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4)(move.endCoordinates, dimension)}`;
        }
        else if ((0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.verifyInternalMove)(move)) {
            resultingString += move.type;
        }
        else
            (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.throwOnNever)(move);
    }
    resultingString += extractChecksAndCheckmates(moveWrapper.metadata);
    resultingString += moveWrapper.metadata.annotation ?? "";
    return resultingString;
};
const fullMoveNotationStringify = (moveWrapper) => {
    let resultingString = "";
    let firstStandardMoveCaptureSet = false;
    for (const move of moveWrapper.moveData) {
        if ((0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.verifyStandardMove)(move)) {
            if ((resultingString += generateCastlingString(move)))
                continue;
            resultingString += extractPiece(moveWrapper.metadata);
            resultingString += (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4)(move.startCoordinates);
            if (!firstStandardMoveCaptureSet && moveWrapper.metadata.isCapture) {
                resultingString += "x";
                firstStandardMoveCaptureSet = true;
            }
            else
                resultingString += "-";
            resultingString += (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4)(move.endCoordinates);
            resultingString += extractPromotion(move);
        }
        else if ((0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.verifyDroppingMove)(move)) {
            resultingString += `@${move.piece.piece}`;
            resultingString += `-${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.convertCoordinateToPGN4)(move.endCoordinates)}`;
        }
        else if ((0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.verifyInternalMove)(move)) {
            resultingString += move.type;
        }
        else
            (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.throwOnNever)(move);
    }
    resultingString += extractChecksAndCheckmates(moveWrapper.metadata);
    return resultingString;
};
const moveNotation = {
    fullMoveNotation: fullMoveNotationStringify,
    shortenedMoveNotation: shortenedMoveNotationStringify
};


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/MoveTree/MoveTree.ts":
/*!***************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/MoveTree/MoveTree.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alterCurrentPath": function() { return /* binding */ alterCurrentPath; },
/* harmony export */   "assertValidMove": function() { return /* binding */ assertValidMove; },
/* harmony export */   "createMoveTree": function() { return /* binding */ createMoveTree; },
/* harmony export */   "verifyValidMove": function() { return /* binding */ verifyValidMove; }
/* harmony export */ });
/* harmony import */ var _MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _MoveNotationStringifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MoveNotationStringifier */ "./src/main/client/ts/logic/movegen/MoveTree/MoveNotationStringifier.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/ArrayUtils */ "./src/main/client/ts/utils/ArrayUtils.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");





function alterCurrentPath(current, path) {
    let currentMove = [...current];
    for (let i = 0; i < currentMove.length; i++) {
        if (path[i] > currentMove[i])
            break;
        if (path[i] === currentMove[i]) {
            if (i === path.length - 1) {
                currentMove = currentMove.slice(0, i + 1);
                currentMove[i]--;
                break;
            }
        }
        else {
            currentMove = currentMove.slice(0, i + 1);
            currentMove[i] = path[i] - 1;
            break;
        }
    }
    const indexOfMinus = currentMove.indexOf(-1);
    if (indexOfMinus !== -1) {
        currentMove = currentMove.slice(0, indexOfMinus);
        let lastNumber = 0;
        do {
            const popped = currentMove.pop();
            if (popped === undefined) {
                lastNumber = -1;
                break;
            }
            lastNumber = popped;
        } while (lastNumber <= 0);
        if (lastNumber !== -1)
            currentMove.push(lastNumber);
    }
    return currentMove;
}
function verifyValidMove(move) {
    return move !== undefined && !Array.isArray(move);
}
function assertValidMove(move) {
    if (!move || Array.isArray(move)) {
        throw new Error("The selected move is not a valid move");
    }
}
const createMoveTree = (baseSnapshot) => {
    const snapshots = new WeakMap();
    const boardHashes = new Map();
    const moves = [];
    const startingSnapshot = {
        boardSnapshot: baseSnapshot,
        get hash() {
            throw new Error("Should not access hash on base move");
        },
        get pregeneratedAttacks() {
            throw new Error("Should not access pregenerated attacks on base move");
        }
    };
    function obtainMatchingAlternativeLine(baseMoveWrapper, newMoveWrapper) {
        for (const [alternativeFirstMove] of baseMoveWrapper.alternativeLines) {
            if (alternativeFirstMove.moveData.length !== newMoveWrapper.moveData.length)
                continue;
            if (alternativeFirstMove.moveData.every((m, i) => (0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.compareMoves)(m, newMoveWrapper.moveData[i]))) {
                return alternativeFirstMove.path;
            }
        }
        return false;
    }
    function stripEmptyAlternativeLines(current = moves) {
        for (const moveWrapper of current) {
            for (let i = 0; i < moveWrapper.alternativeLines.length; i++) {
                if (moveWrapper.alternativeLines[i].length === 0) {
                    moveWrapper.alternativeLines.splice(i, 1);
                }
                else
                    stripEmptyAlternativeLines(moveWrapper.alternativeLines[i]);
            }
        }
    }
    function stripDeletedMoveHashes(current, currentMove) {
        for (const moveWrapper of current) {
            const snapshot = snapshots.get(moveWrapper);
            if (!snapshot)
                continue;
            const { hash } = snapshot;
            const boardHash = boardHashes.get(hash);
            if (boardHash) {
                if (boardHash.length === 1) {
                    boardHashes.delete(hash);
                }
                else {
                    const currentLine = boardHash.findIndex(p => (0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__.compareArrays)(p, currentMove));
                    if (currentLine === -1) {
                        console.error("Current line for move wrapper not found in board hashes");
                    }
                    else {
                        boardHash.splice(currentLine, 1);
                    }
                }
            }
            for (const line of moveWrapper.alternativeLines)
                stripDeletedMoveHashes(line, currentMove);
        }
    }
    function addBoardSnapshot(parameters, currentMove) {
        const { move, snapshot, fenDataString } = parameters;
        snapshots.set(move, {
            boardSnapshot: snapshot.boardSnapshot,
            pregeneratedAttacks: snapshot.pregeneratedAttacks,
            hash: fenDataString
        });
        const boardHash = boardHashes.get(fenDataString);
        if (boardHash) {
            const hasAdditionalPath = boardHash.find(p => (0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__.compareArrays)(p, currentMove));
            boardHashes.set(fenDataString, hasAdditionalPath ? boardHash : [...boardHash, currentMove.slice()]);
        }
        else
            boardHashes.set(fenDataString, [currentMove.slice()]);
    }
    const assignMoveWrapperKey = (object, key, value) => {
        object[key] = value;
    };
    return {
        moves, currentMove: [-1],
        getMove(path) {
            return (0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.getMoveFromPathAndTree)(moves, path);
        },
        setNewMove(parameters) {
            const { move } = parameters;
            const moveWrapper = this.getMove(move.path.slice(0, -1));
            let path = move.path.slice();
            if (!moveWrapper)
                return path;
            if (Array.isArray(moveWrapper)) {
                if (moveWrapper.length > move.path[move.path.length - 1]) {
                    const currentMove = this.getMove(move.path);
                    if (Array.isArray(currentMove)) {
                        this.setNewMove({ ...parameters, move: { ...move, path: [...move.path, currentMove.length] } });
                    }
                    else if (currentMove) {
                        const alternativeLine = obtainMatchingAlternativeLine(currentMove, move);
                        if (alternativeLine) {
                            return alternativeLine;
                        }
                        else {
                            currentMove.alternativeLines.push([]);
                            const newMove = { ...move, path: [...move.path, currentMove.alternativeLines.length - 1, 0] };
                            path = newMove.path.slice();
                            return this.setNewMove({ ...parameters, move: newMove });
                        }
                    }
                }
                else {
                    moveWrapper.push(move);
                    addBoardSnapshot(parameters, this.currentMove);
                }
            }
            else {
                let key;
                for (key in move) {
                    if (Object.prototype.hasOwnProperty.call(move, key))
                        assignMoveWrapperKey(moveWrapper, key, move[key]);
                }
                addBoardSnapshot(parameters, this.currentMove);
            }
            return path;
        },
        getBoardSnapshot(move) {
            if (move === -1) {
                return startingSnapshot;
            }
            else {
                return snapshots.get(move);
            }
        },
        deleteMove(path) {
            let items = [];
            const moveWrapper = this.getMove(path.slice(0, -1));
            if (!moveWrapper)
                return;
            const finalIndex = path[path.length - 1];
            if (Array.isArray(moveWrapper)) {
                items = [...moveWrapper.splice(finalIndex, moveWrapper.length - finalIndex)];
            }
            else {
                if (moveWrapper.alternativeLines.length > 0) {
                    items = moveWrapper.alternativeLines.splice(path[path.length - 1], 1)[0];
                }
            }
            stripDeletedMoveHashes(items, this.currentMove);
            stripEmptyAlternativeLines();
            const newCurrentMove = alterCurrentPath(this.currentMove, path);
            this.currentMove = newCurrentMove.length === 0 ? [-1] : newCurrentMove;
        },
        getHash(preliminaryHashString) {
            const hash = boardHashes.get(preliminaryHashString);
            if (hash === undefined)
                return 0;
            let totalCount = 0;
            for (const line of hash) {
                for (let i = 0; i < line.length; i++) {
                    if (i + 1 % 2 !== 0 && i === line.length - 1) {
                        totalCount++;
                    }
                    else if (line[i] !== this.currentMove[i])
                        break;
                }
            }
            return totalCount;
        },
        stringifyMove(moveWrapper, dimension) {
            const snapshot = this.getBoardSnapshot(moveWrapper);
            if (!snapshot) {
                console.error("No snapshot assigned when moveWrapper is called");
                return "";
            }
            let key;
            for (key in _MoveNotationStringifier__WEBPACK_IMPORTED_MODULE_1__.moveNotation) {
                if (!Object.prototype.hasOwnProperty.call(_MoveNotationStringifier__WEBPACK_IMPORTED_MODULE_1__.moveNotation, key))
                    continue;
                moveWrapper.cachedNames[key] = _MoveNotationStringifier__WEBPACK_IMPORTED_MODULE_1__.moveNotation[key](moveWrapper, snapshot, dimension);
            }
        },
        augmentMoveWithMetadata(parameters) {
            const { move, board, makeMoveFunction } = parameters;
            const standardMove = move.find((m) => (0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(m));
            const movingPiece = standardMove
                ? board.board[standardMove.startCoordinates[0]][standardMove.startCoordinates[1]]
                : _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.pawnPieceString;
            const capturedPieces = standardMove ? board.data.getCapturedPieces(standardMove).length !== 0 : false;
            const postMoveResults = makeMoveFunction();
            const deadColors = [...board.data.fenOptions.tag("dead")];
            const currentSideToMove = board.data.sideToMove, currentMove = board.moves.getMove(board.moves.currentMove);
            assertValidMove(currentMove);
            if (board.moves.currentMove[board.moves.currentMove.length - 1] === 0
                || (0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__.findLastIndex)(deadColors, (b) => !b) === currentSideToMove) {
                const lastCurrentMoves = board.moves.getMove(board.moves.currentMove.slice(0, -1));
                if (!Array.isArray(lastCurrentMoves))
                    throw new Error("The selected move is not within an array");
                for (let i = lastCurrentMoves.length - 1; i >= 0; i--) {
                    const lastCurrent = lastCurrentMoves[i].metadata.currentFullMove;
                    if (lastCurrent) {
                        currentMove.metadata.currentFullMove = lastCurrent + 1;
                        break;
                    }
                    else if (i === 0) {
                        if (currentMove.path.length === 1) {
                            currentMove.metadata.currentFullMove = 1;
                        }
                        else {
                            const alternativeLineContainer = board.moves.getMove(board.moves.currentMove.slice(0, -3));
                            if (!Array.isArray(alternativeLineContainer))
                                throw new Error("The selected move is not within an array");
                            currentMove.metadata.currentFullMove = alternativeLineContainer[(0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__.findLastIndex)(alternativeLineContainer, (m) => Boolean(m.metadata.currentFullMove))]
                                .metadata.currentFullMove;
                        }
                    }
                }
            }
            currentMove.metadata.currentSideToMove = currentSideToMove;
            currentMove.metadata.isCapture = capturedPieces;
            currentMove.metadata.movingPiece = movingPiece;
            for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
                if (postMoveResults.checkmates[color]) {
                    currentMove.metadata.checkmates++;
                }
                else if (postMoveResults.checks[color]) {
                    currentMove.metadata.checks++;
                }
            }
            this.stringifyMove(currentMove, Math.max(...board.data.fenOptions.tag("dim")));
        }
    };
};


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts":
/*!************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InternalMoveSignature": function() { return /* binding */ InternalMoveSignature; },
/* harmony export */   "SpecialMove": function() { return /* binding */ SpecialMove; },
/* harmony export */   "compareMoves": function() { return /* binding */ compareMoves; },
/* harmony export */   "createBaseMoveWrapper": function() { return /* binding */ createBaseMoveWrapper; },
/* harmony export */   "createDummyMoveMetadata": function() { return /* binding */ createDummyMoveMetadata; },
/* harmony export */   "getLatestChainedMoves": function() { return /* binding */ getLatestChainedMoves; },
/* harmony export */   "getMoveFromPathAndTree": function() { return /* binding */ getMoveFromPathAndTree; },
/* harmony export */   "verifyDroppingMove": function() { return /* binding */ verifyDroppingMove; },
/* harmony export */   "verifyDroppingMoveArray": function() { return /* binding */ verifyDroppingMoveArray; },
/* harmony export */   "verifyInternalMove": function() { return /* binding */ verifyInternalMove; },
/* harmony export */   "verifyInternalMoveArray": function() { return /* binding */ verifyInternalMoveArray; },
/* harmony export */   "verifyMoveWrapperProperties": function() { return /* binding */ verifyMoveWrapperProperties; },
/* harmony export */   "verifyRequiredMove": function() { return /* binding */ verifyRequiredMove; },
/* harmony export */   "verifyStandardMove": function() { return /* binding */ verifyStandardMove; },
/* harmony export */   "verifyStandardMoveArray": function() { return /* binding */ verifyStandardMoveArray; }
/* harmony export */ });
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");


var SpecialMove;
(function (SpecialMove) {
    SpecialMove[SpecialMove["CastlingKingside"] = 0] = "CastlingKingside";
    SpecialMove[SpecialMove["CastlingQueenside"] = 1] = "CastlingQueenside";
    SpecialMove[SpecialMove["EnPassant"] = 2] = "EnPassant";
})(SpecialMove || (SpecialMove = {}));
var InternalMoveSignature;
(function (InternalMoveSignature) {
    InternalMoveSignature["Resign"] = "R";
    InternalMoveSignature["Timeout"] = "T";
    InternalMoveSignature["ClaimWin"] = "C";
    InternalMoveSignature["DrawByAgreement"] = "D";
    InternalMoveSignature["Stalemate"] = "S";
    InternalMoveSignature["Pass"] = "P";
    InternalMoveSignature["TeamsCheckmate"] = "#";
})(InternalMoveSignature || (InternalMoveSignature = {}));
const verifyRequiredMove = (move) => move.length > 0;
function verifyMoveWrapperProperties(moveWrapper) {
    return Boolean(moveWrapper.alternativeLines && moveWrapper.comment !== undefined && moveWrapper.path
        && moveWrapper.metadata && moveWrapper.moveData);
}
function compareMoves(move1, move2) {
    if (verifyStandardMove(move1)) {
        if (!verifyStandardMove(move2))
            return false;
        return (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__.compareCoordinates)(move1.startCoordinates, move2.startCoordinates)
            && (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__.compareCoordinates)(move1.endCoordinates, move2.endCoordinates)
            && (move1.specialType === move2.specialType
                || move1.specialType === SpecialMove.EnPassant
                || move2.specialType === SpecialMove.EnPassant);
    }
    else if (verifyDroppingMove(move1)) {
        if (!verifyDroppingMove(move2))
            return false;
        return (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__.compareCoordinates)(move1.endCoordinates, move2.endCoordinates)
            && _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_1__.PieceString.comparePieceStrings(move1.piece, move2.piece);
    }
    else if (verifyInternalMove(move1)) {
        if (!verifyInternalMove(move2))
            return false;
        return move1.type === move2.type;
    }
    throw new Error(`Unexpected move signature of first move ${JSON.stringify(move1)}`);
}
function createDummyMoveMetadata() {
    return {
        isCapture: false, movingPiece: _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_1__.pawnPieceString,
        checks: 0, checkmates: 0, currentSideToMove: 0,
        highlightedArrows: [], highlightedSquares: []
    };
}
const createBaseMoveWrapper = (requiredSettings, settings = {}) => {
    const wrapper = {
        path: requiredSettings.path, moveData: requiredSettings.moveData,
        comment: "", alternativeLines: [],
        metadata: createDummyMoveMetadata(),
        cachedNames: {
            fullMoveNotation: "",
            shortenedMoveNotation: ""
        }
    };
    return {
        ...wrapper,
        ...settings
    };
};
const verifyInternalMove = (move) => "type" in move;
const verifyDroppingMove = (move) => "piece" in move;
const verifyStandardMove = (move) => "startCoordinates" in move;
const verifyInternalMoveArray = (move) => "type" in move[0];
const verifyDroppingMoveArray = (move) => "piece" in move[0];
const verifyStandardMoveArray = (move) => "startCoordinates" in move[0];
const getMoveFromPathAndTree = (moves, path) => {
    if (path.length === 0)
        return moves;
    const movePath = path.slice();
    if (movePath[0] >= moves.length)
        return;
    let currentSelection = moves[movePath.shift() ?? 0];
    while (movePath.length > 0) {
        const currentIndex = movePath.shift();
        if (currentIndex !== undefined) {
            if (currentIndex >= currentSelection.alternativeLines.length)
                return;
            const alternativeLine = currentSelection.alternativeLines[currentIndex];
            const index = movePath.shift();
            if (index === undefined) {
                return alternativeLine;
            }
            if (index >= alternativeLine.length)
                return;
            currentSelection = alternativeLine[index];
        }
    }
    return currentSelection;
};
const getLatestChainedMoves = (move) => {
    if (move.length > 0 && move[0].nextChainedMoves) {
        return getLatestChainedMoves(move[0].nextChainedMoves);
    }
    else
        return move;
};


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts":
/*!***********************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PieceControl": function() { return /* binding */ PieceControl; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");



class PieceControl {
    color;
    sliding;
    jumping;
    hooks;
    moves;
    rayGenCache;
    baseRankActive;
    immunePieces;
    fenData;
    board;
    i;
    j;
    __baseClass;
    initDecoratorSettings() { }
    /*---------------------------------- INITIALIZATION -----------------------------------------*/
    constructor() {
        this.moves = [];
        this.color = 0;
        this.sliding = [];
        this.jumping = [];
        this.rayGenCache = [];
        this.hooks = {
            useTrajectory: undefined,
            usePerspective: undefined,
            usePawnLogic: undefined,
            useHopping: false
        };
        this.baseRankActive = false;
        this.immunePieces = [false, false, false, false];
        this.__baseClass = this;
    }
    configure(configuration) {
        this.color = configuration.color;
        this.immunePieces = configuration.immunePieces;
        [this.i, this.j] = configuration.coordinates;
        const baseRankCalc = [13 - this.i, this.j, this.i, 13 - this.j][this.color] - this.fenData.fenOptions.tag("pawnBaseRank");
        this.baseRankActive = configuration.baseRank ?? (baseRankCalc === -1 || baseRankCalc === -2);
        this.board = configuration.board;
    }
    setFENData(fenData) {
        this.fenData = fenData;
    }
    isRayTrace(attackType) { return attackType === _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.RayTrace || attackType === _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.RayTraceLimited; }
    /*---------------------------------- INITIALIZATION -----------------------------------------*/
    /*-------------------------------------------------------------------------------------------*/
    /*--------------------------------- MOVE GENERATION -----------------------------------------*/
    modifyDisplacements(i, j) {
        const baseDisplacements = [[i, j], [j, -i], [-i, -j], [-j, i]];
        return baseDisplacements[this.color];
    }
    pushMove(settings) {
        if (!settings.isRayGen && this.hooks.usePawnLogic && this.hooks.usePawnLogic.promotionRanks
            && this.hooks.usePawnLogic.promotionRanks[this.color] === (this.color % 2 === 0 ? settings.i : settings.j)
            && this.hooks.usePawnLogic.promotionPieces) {
            this.moves.push({
                move: [settings.i, settings.j, this.hooks.usePawnLogic.promotionPieces.join("")],
                irreversible: settings.irreversible ?? false
            });
            return;
        }
        else {
            this.moves.push({
                move: [settings.i, settings.j],
                irreversible: settings.irreversible ?? false
            });
        }
    }
    generateSlidingAttack(settings) {
        let [displacementI, displacementJ] = settings.displacement, limit = settings.limit ?? Infinity;
        const rayGenCache = settings.rayGenCache, special = settings.special ?? _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.Normal;
        let rayTraceLimit = 0;
        if (this.hooks.usePerspective?.[this.color]) {
            [displacementI, displacementJ] = this.modifyDisplacements(displacementI, displacementJ);
        }
        let startI = this.i + displacementI, startJ = this.j + displacementJ;
        const iLength = this.board[0].length, jLength = this.board.length;
        const isRayGen = rayGenCache ?? this.isRayTrace(special);
        while (limit > 0 && startI >= 0 && startI < iLength && startJ >= 0 && startJ < jLength) {
            // TODO add trajectories?
            if (this.getMovePossibility({ displacement: [startI, startJ], special, rayGenCache })) {
                this.pushMove({ i: startI, j: startJ, isRayGen: Boolean(isRayGen), irreversible: settings.irreversible });
            }
            if (special === _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.RayTraceLimited && !this.board[startI][startJ].isEmpty()) {
                rayTraceLimit++;
                if (rayTraceLimit === 2)
                    break;
            }
            if (!this.isRayTrace(special) && !this.board[startI][startJ].isEmpty()) {
                break;
            }
            startI += displacementI;
            startJ += displacementJ;
            limit--;
        }
    }
    generateJumpAttack(settings) {
        let [displacementI, displacementJ] = settings.displacement;
        const rayGenCache = settings.rayGenCache, squareBlockingIndex = settings.squareBlockingIndex, special = settings.special ?? _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.Normal;
        if (this.hooks.usePerspective?.[this.color]) {
            [displacementI, displacementJ] = this.modifyDisplacements(displacementI, displacementJ);
        }
        const startI = this.i + displacementI, startJ = this.j + displacementJ;
        const isRayGen = rayGenCache ?? this.isRayTrace(special);
        let isTestPassed = true;
        if (this.hooks.useTrajectory && squareBlockingIndex !== undefined) {
            const trajectory = this.hooks.useTrajectory[squareBlockingIndex];
            let trajectoryX, trajectoryY;
            if (this.hooks.usePerspective?.[this.color]) {
                [trajectoryX, trajectoryY] = this.modifyDisplacements(trajectory[0], trajectory[1]);
            }
            else {
                trajectoryX = trajectory[0], trajectoryY = trajectory[1];
            }
            if (!this.getMovePossibility({ displacement: [this.i + trajectoryX, this.j + trajectoryY], special, rayGenCache })) {
                isTestPassed = false;
            }
        }
        if (isTestPassed && this.getMovePossibility({ displacement: [startI, startJ], special, rayGenCache })) {
            this.pushMove({ i: startI, j: startJ, isRayGen: Boolean(isRayGen), irreversible: settings.irreversible });
        }
    }
    getMovePossibility(configuration) {
        const { displacement: [i, j], rayGenCache, special } = configuration;
        if (i < 0 || i >= _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension || j < 0 || j >= _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension)
            return false;
        const piece = this.board[i][j];
        if (!piece.isEmpty() && piece.color !== _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_1__.deadColorIndex && !rayGenCache && !this.isRayTrace(special ?? _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.Normal)) {
            if (this.immunePieces[piece.color] || this.fenData.fenOptions.tag("zombieImmune")[piece.color])
                return false;
        }
        const pushTo = () => {
            if (rayGenCache) {
                this.rayGenCache.push(rayGenCache);
            }
            return true;
        };
        if (special === undefined || special === _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.Normal) {
            if (!piece.isWall()) {
                return pushTo();
            }
        }
        else if (special === _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.RayGen) {
            if (!piece.isEmpty()) {
                return pushTo();
            }
        }
        else if (special === _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.AttackOnly) {
            if (!piece.isEmpty() && !piece.isWall()) {
                return pushTo();
            }
        }
        else if (special === _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.MoveOnly) {
            if (piece.isEmpty()) {
                return pushTo();
            }
        }
        else if (this.isRayTrace(special)) {
            return pushTo();
        }
        return false;
    }
    /*--------------------------------- MOVE GENERATION -----------------------------------------*/
    /*-------------------------------------------------------------------------------------------*/
    /*------------------------------- OUTPUT GENERATION -----------------------------------------*/
    getPossibleCells() {
        if (this.hooks.useHopping) {
            this.sliding.forEach(displacement => this.generateSlidingAttack({ displacement, special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.RayGen, rayGenCache: [...displacement] }));
            const moves = this.moves.slice();
            this.moves = [];
            moves.forEach((s, i) => {
                const startI = s.move[0] + this.rayGenCache[i][0];
                const startJ = s.move[1] + this.rayGenCache[i][1];
                if (this.getMovePossibility({ displacement: [startI, startJ] })) {
                    this.pushMove({ i: startI, j: startJ });
                }
            });
            this.rayGenCache = [];
        }
        else {
            this.sliding.forEach(a => this.generateSlidingAttack({ displacement: a }));
            this.jumping.forEach(a => this.generateJumpAttack({ displacement: a }));
        }
    }
    rayGenJumpingAttacks() {
        this.jumping.forEach(a => this.generateJumpAttack({ displacement: a, special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.AttackType.RayTrace }));
        return this.moves.splice(0);
    }
    rayGenSlidingAttacks(trace) {
        const slidingLines = [];
        this.sliding.forEach(a => {
            this.generateSlidingAttack({ displacement: a, special: trace });
            if (this.moves.length !== 0) {
                slidingLines.push(this.moves.splice(0));
            }
        });
        return slidingLines;
    }
    getPseudoLegalMoves() {
        this.getPossibleCells();
        return this.moves.splice(0);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlBuilder.ts":
/*!******************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/PieceControl/PieceControlBuilder.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PieceControlBuilder": function() { return /* binding */ PieceControlBuilder; },
/* harmony export */   "PieceControlConfigurator": function() { return /* binding */ PieceControlConfigurator; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _BaseInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../VariantRules/VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VariantRules/VariantRuleSetup */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleSetup.ts");
/* harmony import */ var _PieceControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _PieceControlInterface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");








class PieceControlConfigurator {
    _control;
    _isConfigured;
    constructor(control) {
        this._control = control;
        this._isConfigured = {
            coordinates: [0, 0],
            board: (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_2__.initializeBoardSquares)(() => _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.emptyPieceString),
            immunePieces: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers),
            color: 0
        };
    }
    setCoordinates(x, y) {
        this._isConfigured.coordinates = [x, y];
        return this;
    }
    setBaseImmunePieces(immune) {
        this._isConfigured.immunePieces = immune;
        return this;
    }
    setColor(color) {
        this._isConfigured.color = color;
        return this;
    }
    setBoard(board) {
        this._isConfigured.board = board;
        return this;
    }
    constructPieceControl() {
        this._control.configure(this._isConfigured);
        return this._control;
    }
}
class PieceControlBuilder {
    _generalConfig;
    constructor() { this._generalConfig = {}; }
    setFENData(fenData) { this._generalConfig.fenData = fenData; }
    setVariantRules(rules) { this._generalConfig.variantRules = rules; }
    createPieceControlWrap(letter) {
        const information = _PieceControlInterface__WEBPACK_IMPORTED_MODULE_7__.pieceControlConfigSettings[letter];
        const control = new information.construct();
        if (!this._generalConfig.fenData || !this._generalConfig.variantRules)
            throw new Error("PieceControl builder setup is not complete");
        control.setFENData(this._generalConfig.fenData);
        const decoratedControl = (0,_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_4__.decorateClassWithVariants)(control, _PieceControl__WEBPACK_IMPORTED_MODULE_6__.PieceControl, (0,_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_5__.copyVariantRules)(this._generalConfig.variantRules));
        return () => {
            return new PieceControlConfigurator(decoratedControl);
        };
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlDeclarations.ts":
/*!***********************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/PieceControl/PieceControlDeclarations.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initPieceControlDeclarations": function() { return /* binding */ initPieceControlDeclarations; }
/* harmony export */ });
/* harmony import */ var _PieceControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");


const orthogonalMoves = [[-1, 0], [1, 0], [0, 1], [0, -1]];
const diagonalMoves = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
const kingDirections = [...orthogonalMoves, ...diagonalMoves];
const knightHops = [[-1, -2], [-2, -1], [-1, 2], [2, -1], [-2, 1], [1, -2], [1, 2], [2, 1]];
const camelHops = [[-1, -3], [-3, -1], [-1, 3], [3, -1], [-3, 1], [1, -3], [1, 3], [3, 1]];
const dabbabaHops = [[-2, 0], [2, 0], [0, 2], [0, -2]];
const alfilHops = [[-2, -2], [2, 2], [-2, 2], [2, -2]];
const initPieceControlDeclarations = () => {
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = orthogonalMoves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 5,
                teamsPoints: 5,
                botFFAValue: 7,
                botTeamsValue: 7
            },
            piece: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.rook,
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Rook",
                shortName: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.rook.toLowerCase()
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = diagonalMoves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 5,
                teamsPoints: 4,
                botFFAValue: 6,
                botTeamsValue: 6
            },
            piece: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.bishop,
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Bishop",
                shortName: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.bishop.toLowerCase()
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = kingDirections;
            }
        },
        configuration: {
            points: {
                singlesPoints: 3,
                teamsPoints: 0,
                botFFAValue: 3,
                botTeamsValue: 3
            },
            piece: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.king,
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "King",
                shortName: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.king.toLowerCase()
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = kingDirections;
            }
        },
        configuration: {
            points: {
                singlesPoints: 9,
                teamsPoints: 10,
                botFFAValue: 14,
                botTeamsValue: 15
            },
            piece: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.queen,
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Queen",
                shortName: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.queen.toLowerCase()
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = kingDirections;
            }
        },
        configuration: {
            points: {
                singlesPoints: 9,
                teamsPoints: 10,
                botFFAValue: 13,
                botTeamsValue: 13
            },
            piece: "D",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "1-point queen",
                shortName: "d"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = knightHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 3,
                teamsPoints: 3,
                botFFAValue: 4,
                botTeamsValue: 4
            },
            piece: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.knight,
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Knight",
                shortName: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.knight.toLowerCase()
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = [...knightHops, ...kingDirections];
            }
        },
        configuration: {
            points: {
                singlesPoints: 5,
                teamsPoints: 5,
                botFFAValue: 7,
                botTeamsValue: 7
            },
            piece: "M",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "General",
                shortName: "m",
                description: "combines king and knight"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = diagonalMoves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 0.6,
                botTeamsValue: 0.6
            },
            piece: "F",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Ferz",
                shortName: "f",
                description: "moves one square diagonally"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = orthogonalMoves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 0.4,
                botTeamsValue: 0.4
            },
            piece: "W",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Wazir",
                shortName: "w",
                description: "moves one square horizontally or vertically"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = orthogonalMoves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 0.4,
                botTeamsValue: 0.4
            },
            piece: "W",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Wazir",
                shortName: "w",
                description: "moves one square horizontally or vertically"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = dabbabaHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 1.6,
                botTeamsValue: 1.6
            },
            piece: "S",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Dabbaba",
                shortName: "s",
                description: "jumps two squares horizontally or vertically"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = dabbabaHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 4,
                teamsPoints: 4,
                botFFAValue: 5.4,
                botTeamsValue: 5.4
            },
            piece: "T",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Dabbaba-rider",
                shortName: "t"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = alfilHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 0.5,
                botTeamsValue: 0.5
            },
            piece: "I",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Alfil",
                shortName: "i",
                description: "jumps two squares diagonally"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = alfilHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 3,
                teamsPoints: 3,
                botFFAValue: 4.5,
                botTeamsValue: 4.5
            },
            piece: "J",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Alfil-rider",
                shortName: "j"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = [...alfilHops, ...dabbabaHops];
            }
        },
        configuration: {
            points: {
                singlesPoints: 3,
                teamsPoints: 3,
                botFFAValue: 3,
                botTeamsValue: 3
            },
            piece: "Y",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Alibaba",
                shortName: "y",
                description: "combines alfil and dabbaba"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = [...alfilHops, ...dabbabaHops];
            }
        },
        configuration: {
            points: {
                singlesPoints: 6,
                teamsPoints: 6,
                botFFAValue: 6.2,
                botTeamsValue: 6.2
            },
            piece: "Z",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Alibaba-rider",
                shortName: "z"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = knightHops;
                this.sliding = kingDirections;
            }
        },
        configuration: {
            points: {
                singlesPoints: 12,
                teamsPoints: 12,
                botFFAValue: 17,
                botTeamsValue: 17
            },
            piece: "A",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Amazon",
                shortName: "a",
                description: "combines queen and knight"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = camelHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 3,
                teamsPoints: 3,
                botFFAValue: 4.2,
                botTeamsValue: 4.2
            },
            piece: "C",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Camel",
                shortName: "c",
                description: "an elongated 3-1 knight"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = knightHops;
                this.sliding = orthogonalMoves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 7,
                teamsPoints: 7,
                botFFAValue: 10,
                botTeamsValue: 10
            },
            piece: "E",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Chancellor",
                shortName: "a",
                description: "combines rook and knight"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = knightHops;
                this.sliding = diagonalMoves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 7,
                teamsPoints: 7,
                botFFAValue: 9,
                botTeamsValue: 9
            },
            piece: "H",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Archbishop",
                shortName: "h",
                description: "combines bishop and knight"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = knightHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 7,
                teamsPoints: 7,
                botFFAValue: 10,
                botTeamsValue: 10
            },
            piece: "O",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Knight-rider",
                shortName: "o"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.sliding = camelHops;
            }
        },
        configuration: {
            points: {
                singlesPoints: 7,
                teamsPoints: 7,
                botFFAValue: 8,
                botTeamsValue: 8
            },
            piece: "L",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: false,
                isSliding: true,
                isPawn: false,
                isColorBound: true
            },
            naming: {
                name: "Camel-rider",
                shortName: "l"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.jumping = [...camelHops, ...knightHops];
            }
        },
        configuration: {
            points: {
                singlesPoints: 5,
                teamsPoints: 5,
                botFFAValue: 8,
                botTeamsValue: 8
            },
            piece: "V",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Wildebeest",
                shortName: "v",
                description: "combines camel and knight"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.usePerspective = [true, true, true, true];
                this.hooks.usePawnLogic = {};
            }
            getPossibleCells() {
                this.generateJumpAttack({ displacement: [-1, -1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.AttackOnly });
                this.generateJumpAttack({ displacement: [-1, 1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.AttackOnly });
                this.generateSlidingAttack({
                    displacement: [-1, 0],
                    special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly,
                    limit: this.baseRankActive ? 2 : 1,
                    irreversible: true
                });
                return this.moves;
            }
            rayGenJumpingAttacks() {
                this.generateJumpAttack({ displacement: [-1, -1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.RayTrace });
                this.generateJumpAttack({ displacement: [-1, 1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.RayTrace });
                const moves = this.moves.slice();
                this.moves = [];
                return moves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 1,
                botTeamsValue: 0.4
            },
            piece: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pawnPieceLetter,
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: true,
                isColorBound: false
            },
            naming: {
                name: "Pawn",
                shortName: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pawnPieceLetter.toLowerCase()
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.usePerspective = [true, true, true, true];
                this.hooks.usePawnLogic = {};
            }
            getPossibleCells() {
                this.generateSlidingAttack({
                    displacement: [-1, -1],
                    special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly,
                    limit: this.baseRankActive ? 2 : 1,
                    irreversible: true
                });
                this.generateSlidingAttack({
                    displacement: [-1, 1],
                    special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly,
                    limit: this.baseRankActive ? 2 : 1,
                    irreversible: true
                });
                this.generateJumpAttack({ displacement: [-1, -1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.AttackOnly });
                return this.moves;
            }
            rayGenJumpingAttacks() {
                this.generateJumpAttack({ displacement: [-1, -1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.RayTrace });
                const moves = this.moves.slice();
                this.moves = [];
                return moves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 1,
                botTeamsValue: 0.4
            },
            piece: "α",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: true,
                isColorBound: false
            },
            naming: {
                name: "Berolina",
                shortName: "alpha",
                description: "a pawn that moves diagonally and captures forwards"
            }
        }
    });
    const stoneGeneralControl = (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.usePerspective = [true, true, true, true];
                this.hooks.usePawnLogic = {};
            }
            getPossibleCells() {
                this.generateSlidingAttack({
                    displacement: [-1, -1],
                    special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly,
                    limit: this.baseRankActive ? 2 : 0,
                    irreversible: true
                });
                this.generateSlidingAttack({
                    displacement: [-1, 1],
                    special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly,
                    limit: this.baseRankActive ? 2 : 0,
                    irreversible: true
                });
                this.generateJumpAttack({
                    displacement: [-1, -1],
                    irreversible: true
                });
                this.generateJumpAttack({
                    displacement: [-1, 1],
                    irreversible: true
                });
                return this.moves;
            }
            rayGenJumpingAttacks() {
                this.generateJumpAttack({ displacement: [-1, -1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.RayTrace });
                this.generateJumpAttack({ displacement: [-1, 1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.RayTrace });
                const moves = this.moves.slice();
                this.moves = [];
                return moves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 1,
                botTeamsValue: 0.4
            },
            piece: "γ",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: true,
                isColorBound: false
            },
            naming: {
                name: "Stone General",
                shortName: "gamma",
                description: "a pawn that moves and captures diagonally"
            }
        }
    });
    const soldierControl = (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.usePerspective = [true, true, true, true];
                this.hooks.usePawnLogic = {};
            }
            getPossibleCells() {
                this.generateSlidingAttack({
                    displacement: [-1, 0],
                    special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly,
                    limit: this.baseRankActive ? 2 : 0,
                    irreversible: true
                });
                this.generateJumpAttack({
                    displacement: [-1, 0],
                    irreversible: true
                });
                return this.moves;
            }
            rayGenJumpingAttacks() {
                this.generateJumpAttack({ displacement: [-1, 0], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.RayTrace });
                const moves = this.moves.slice();
                this.moves = [];
                return moves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 1,
                botTeamsValue: 0.4
            },
            piece: "β",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: true,
                isColorBound: false
            },
            naming: {
                name: "Soldier",
                shortName: "beta",
                description: "a pawn that moves and captures forwards only"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.usePerspective = [true, true, true, true];
                this.hooks.usePawnLogic = {};
            }
            getPossibleCells() {
                stoneGeneralControl.getPossibleCells.call(this);
                soldierControl.getPossibleCells.call(this);
                return this.moves;
            }
            rayGenJumpingAttacks() {
                stoneGeneralControl.rayGenJumpingAttacks.call(this);
                soldierControl.rayGenJumpingAttacks.call(this);
                const moves = this.moves.slice();
                this.moves = [];
                return moves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 1,
                teamsPoints: 1,
                botFFAValue: 1,
                botTeamsValue: 0.4
            },
            piece: "δ",
            moveGenerationSettings: {
                isComplex: false,
                isJumping: true,
                isSliding: false,
                isPawn: true,
                isColorBound: false
            },
            naming: {
                name: "Sergeant",
                shortName: "delta",
                description: "a pawn that moves and captures forwards and diagonally"
            }
        }
    });
    const xiangqiHorseControl = (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.useTrajectory = [[-1, 0], [1, 0], [0, 1], [0, -1]];
            }
            getPossibleCells() {
                this.generateJumpAttack({ displacement: [-1, -2], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 3 });
                this.generateJumpAttack({ displacement: [1, -2], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 3 });
                this.generateJumpAttack({ displacement: [-1, 2], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 2 });
                this.generateJumpAttack({ displacement: [1, 2], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 2 });
                this.generateJumpAttack({ displacement: [2, -1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 1 });
                this.generateJumpAttack({ displacement: [2, 1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 1 });
                this.generateJumpAttack({ displacement: [-2, -1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 0 });
                this.generateJumpAttack({ displacement: [-2, 1], special: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal, squareBlockingIndex: 0 });
                return this.moves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 2,
                teamsPoints: 2,
                botFFAValue: 2.1,
                botTeamsValue: 2.1
            },
            piece: "U",
            moveGenerationSettings: {
                isComplex: true,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Xiangqi horse",
                shortName: "u",
                description: "moves one square orthogonally and then one diagonally"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.useTrajectory = [[-1, 0], [1, 0], [0, 1], [0, -1]];
            }
            getPossibleCells() {
                xiangqiHorseControl.getPossibleCells.call(this);
                this.sliding.forEach(displacement => { this.generateSlidingAttack({ displacement }); });
                return this.moves;
            }
        },
        configuration: {
            points: {
                singlesPoints: 6,
                teamsPoints: 6,
                botFFAValue: 7.5,
                botTeamsValue: 7.5
            },
            piece: "Δ",
            moveGenerationSettings: {
                isComplex: true,
                isJumping: true,
                isSliding: true,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Dragon bishop",
                shortName: "deltaUpper",
                description: "combines bishop and xiangqi horse"
            }
        }
    });
    (0,_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.createPieceDeclaration)({
        baseClassRef: class extends _PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl {
            constructor() {
                super();
                this.hooks.useHopping = true;
                this.sliding = kingDirections;
            }
        },
        configuration: {
            points: {
                singlesPoints: 3,
                teamsPoints: 3,
                botFFAValue: 5.8,
                botTeamsValue: 5.8
            },
            piece: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.grasshopperPieceLetter,
            moveGenerationSettings: {
                isComplex: true,
                isJumping: true,
                isSliding: false,
                isPawn: false,
                isColorBound: false
            },
            naming: {
                name: "Grasshopper",
                shortName: _PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.grasshopperPieceLetter.toLowerCase(),
                description: "jumps in any direction hopping over the first piece, landing immediately behind it"
            }
        }
    });
};


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts":
/*!********************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttackType": function() { return /* binding */ AttackType; },
/* harmony export */   "createPieceDeclaration": function() { return /* binding */ createPieceDeclaration; },
/* harmony export */   "defaultPieces": function() { return /* binding */ defaultPieces; },
/* harmony export */   "duckLetter": function() { return /* binding */ duckLetter; },
/* harmony export */   "emptyLetter": function() { return /* binding */ emptyLetter; },
/* harmony export */   "grasshopperPieceLetter": function() { return /* binding */ grasshopperPieceLetter; },
/* harmony export */   "pawnPieceLetter": function() { return /* binding */ pawnPieceLetter; },
/* harmony export */   "pieceControlConfigSettings": function() { return /* binding */ pieceControlConfigSettings; },
/* harmony export */   "verifyPieceLetter": function() { return /* binding */ verifyPieceLetter; },
/* harmony export */   "wallPieceLetter": function() { return /* binding */ wallPieceLetter; }
/* harmony export */ });
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");

var AttackType;
(function (AttackType) {
    AttackType[AttackType["Normal"] = 0] = "Normal";
    AttackType[AttackType["MoveOnly"] = 1] = "MoveOnly";
    AttackType[AttackType["AttackOnly"] = 2] = "AttackOnly";
    AttackType[AttackType["RayGen"] = 3] = "RayGen";
    AttackType[AttackType["RayTrace"] = 4] = "RayTrace";
    AttackType[AttackType["RayTraceLimited"] = 5] = "RayTraceLimited";
})(AttackType || (AttackType = {}));
const nonPlayableValues = Object.values(_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.nonPlayablePieces);
const verifyPieceLetter = (piece) => piece in pieceControlConfigSettings || nonPlayableValues.includes(piece);
const pieceControlConfigSettings = nonPlayableValues.reduce((p, n) => ({
    ...p, [n]: {
        points: {
            singlesPoints: 1,
            teamsPoints: 1,
            botFFAValue: 1,
            botTeamsValue: 1,
        },
        piece: n,
        moveGenerationSettings: {
            isComplex: false,
            isJumping: false,
            isSliding: false,
            isPawn: false,
        },
        naming: {
            name: "Wall",
            shortName: n
        }
    }
}), {});
const createPieceDeclaration = (configuration) => {
    pieceControlConfigSettings[configuration.configuration.piece] = {
        ...configuration.configuration,
        construct: configuration.baseClassRef
    };
    return new configuration.baseClassRef();
};
function createPredefinedPieceLetter(letter) {
    return letter;
}
const pawnPieceLetter = createPredefinedPieceLetter("P");
const wallPieceLetter = createPredefinedPieceLetter(_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.nonPlayablePieces.wall);
const grasshopperPieceLetter = createPredefinedPieceLetter("G");
const defaultPieces = {
    queen: createPredefinedPieceLetter("Q"),
    rook: createPredefinedPieceLetter("R"),
    bishop: createPredefinedPieceLetter("B"),
    knight: createPredefinedPieceLetter("N"),
    king: createPredefinedPieceLetter("K")
};
const emptyLetter = createPredefinedPieceLetter("");
const duckLetter = createPredefinedPieceLetter(_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.nonPlayablePieces.duck);


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts":
/*!**********************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VariantRule": function() { return /* binding */ VariantRule; },
/* harmony export */   "decorateClassWithVariants": function() { return /* binding */ decorateClassWithVariants; }
/* harmony export */ });
/* harmony import */ var _client_ts_utils_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/utils/ObjectUtils */ "./src/main/client/ts/utils/ObjectUtils.ts");
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../baseTypes */ "./src/main/client/ts/baseTypes.ts");


const verifyHandlerProperty = (handler, key) => key in handler;
const verifyPrototypeProperty = (superClass, key) => key in superClass.prototype;
class VariantRule {
    dependencies = new Map();
    static variantRuleList = [];
    static initVariantRule(rv) {
        VariantRule.variantRuleList.push(rv);
    }
    decorator;
    wrappingDecorators = [];
    initializeBaseHandler(handler) {
        this.decorator = handler;
    }
    initializeWrappingHandler(handler) {
        this.wrappingDecorators.push(handler);
    }
    injectIntoBaseClass(callback) {
        return callback.bind(this.decorator);
    }
    callHandler(method, args) {
        for (const decorator of this.wrappingDecorators) {
            if (!verifyHandlerProperty(decorator, method))
                continue;
            const decoratorMethod = decorator[method];
            if (!(0,_baseTypes__WEBPACK_IMPORTED_MODULE_1__.verifyFunctionType)(decoratorMethod))
                continue;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return decoratorMethod.call(decorator, ...args);
        }
        const decoratorType = this.getDecoratorType();
        if (!verifyPrototypeProperty(decoratorType, method))
            throw new Error("Method called to callHandler is not a part of prototype");
        const prototypeMethod = decoratorType.prototype[method];
        if (!(0,_baseTypes__WEBPACK_IMPORTED_MODULE_1__.verifyFunctionType)(prototypeMethod))
            throw new Error("Method called to callHandler is not a part of prototype");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return prototypeMethod.call(this.decorator, ...args);
    }
}
const objectPrototype = new Set(Reflect.ownKeys(Reflect.getPrototypeOf({}) ?? []));
function decorateClassWithVariants(baseClass, classReference, variants) {
    if (variants.length === 0)
        return baseClass;
    const decoratorProperties = (0,_client_ts_utils_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.copyClass)(baseClass, classReference, true);
    const methods = new Set();
    decoratorProperties.initDecoratorSettings = () => {
        // Do nothing, this method only exists for the purpose of being overridden
    };
    methods.add("initDecoratorSettings");
    const lastInheritedMethods = new Set();
    let basePrototype = null;
    const verifyKeyInDecoratorProperties = (k) => typeof k !== 'number' && k in decoratorProperties && !objectPrototype.has(k) && !lastInheritedMethods.has(k);
    while ((basePrototype = Reflect.getPrototypeOf(basePrototype ?? baseClass))) {
        Reflect.ownKeys(basePrototype).forEach((k) => {
            if (verifyKeyInDecoratorProperties(k)) {
                decoratorProperties[k] = baseClass[k];
                methods.add(k);
                lastInheritedMethods.add(k);
            }
        });
    }
    const verifyOwnProperty = (k) => k in baseClass;
    for (const property of Object.getOwnPropertyNames(baseClass)) {
        if (!verifyOwnProperty(property))
            throw new Error("Expected prototype to not be overridden");
        const localProperty = property;
        Object.defineProperty(decoratorProperties, property, {
            get: function () {
                return baseClass[localProperty];
            },
            set: function (v) {
                baseClass[localProperty] = v;
            },
            enumerable: true, configurable: false
        });
    }
    decoratorProperties.__baseClass = baseClass;
    for (const method of methods) {
        const variantRuleChain = variants.filter(rv => method in rv);
        if (variantRuleChain.length === 0)
            continue;
        variantRuleChain[0].initializeBaseHandler(decoratorProperties);
        const variantDecorator = variantRuleChain.reduce((p, c) => {
            c.initializeBaseHandler(decoratorProperties);
            c.initializeWrappingHandler(p);
            return c;
        });
        if (method in decoratorProperties) {
            const variant = Reflect.get(variantDecorator, method);
            if (typeof variant === 'function') {
                const variantFunc = variant;
                if ((0,_baseTypes__WEBPACK_IMPORTED_MODULE_1__.verifyFunctionType)(decoratorProperties[method])) {
                    Object.defineProperty(decoratorProperties, method, {
                        value: (...args) => {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                            return variantFunc.bind(variantDecorator)(...args);
                        }, enumerable: false, writable: false, configurable: false
                    });
                }
            }
        }
    }
    decoratorProperties.initDecoratorSettings();
    return decoratorProperties;
}
(0,_baseTypes__WEBPACK_IMPORTED_MODULE_1__.importAll)(__webpack_require__("./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions sync recursive \\.ts$"));


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/AllowPassing.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/AllowPassing.ts ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AllowPassing": function() { return /* binding */ AllowPassing; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "allowPassing";
class AllowPassing extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(AllowPassing);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Allow Passing",
                description: "Players can pass instead of making a move",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.minor,
                displayIcon: "K"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^AllowPassing$/i.test(match);
    }
    serializeToParsingForm() {
        return "AllowPassing";
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.giveaway;
    }
    getAllowedInternalMoves(sideToMove = this.decorator.data.sideToMove) {
        const passingMoves = this.decorator.isKingInCheck(sideToMove) ? [] : [{ type: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_1__.InternalMoveSignature.Pass }];
        for (const decorator of this.wrappingDecorators) {
            if (decorator.getAllowedInternalMoves) {
                return [...passingMoves, ...decorator.getAllowedInternalMoves(sideToMove)];
            }
        }
        return [...passingMoves, ..._Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board.prototype.getAllowedInternalMoves.call(this.decorator, sideToMove)];
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/AlternativeTeams.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/AlternativeTeams.ts ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlternativeTeams": function() { return /* binding */ AlternativeTeams; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "alternativeTeams";
class AlternativeTeams extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(AlternativeTeams);
    }
    teammate;
    constructor(teammate) {
        super();
        if (typeof teammate === "number") {
            this.teammate = teammate;
        }
        else {
            this.teammate = 2;
        }
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board; }
    getPublicProperties() {
        const rbTeams = this.teammate === 1;
        const teamOne = rbTeams ? "Red & Blue" : "Red & Green";
        const teamTwo = rbTeams ? "Yellow & Green" : "Blue & Yellow";
        return {
            parameterValue: this.teammate,
            information: {
                name: `${teamOne} vs. ${teamTwo}`,
                description: `Alternative Teams: ${teamOne} form a team against ${teamTwo}`,
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.autogenous,
                displayIcon: "Đ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^Teammate=(1|3)$/);
        if (matchArray) {
            this.teammate = Number(matchArray[1]);
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `Teammate=${this.teammate}`;
    }
    isDisabled({ gameType }) {
        return gameType !== _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.VariantType.Teams;
    }
    initDecoratorSettings() {
        const teamSettings = this.decorator.gameType.teamSettings;
        if (this.teammate === 1) {
            teamSettings.firstTeamColors = [true, true, false, false];
            teamSettings.secondTeamColors = [false, false, true, true];
        }
        else if (this.teammate === 3) {
            teamSettings.firstTeamColors = [true, false, false, true];
            teamSettings.secondTeamColors = [false, true, true, false];
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/BarePieceRule.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/BarePieceRule.ts ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BarePieceRule": function() { return /* binding */ BarePieceRule; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");





const tag = "barePieceRule";
class BarePieceRule extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(BarePieceRule);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Bare piece rule",
                description: "Players with only one remaining piece are forfeit",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__.variantRuleColors.minor,
                displayIcon: "›"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^BarePieceLoses$/i.test(match);
    }
    isDisabled() {
        return false;
    }
    serializeToParsingForm() {
        return "BarePieceLoses";
    }
    makeMove() {
        const { data: { sideToMove }, board, preGeneratedAttacks } = this.decorator;
        const results = this.callHandler("makeMove", arguments);
        const playerPieces = this.decorator.getPlayerPieces()[sideToMove];
        if (playerPieces.length === 1) {
            const pieceMovements = preGeneratedAttacks[sideToMove].pieceMovements.get((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.stringifyCoordinate)(playerPieces[0]));
            if (pieceMovements) {
                for (const { move: coordinate } of pieceMovements) {
                    if (board[coordinate[0]][coordinate[1]].isPiece()) {
                        return results;
                    }
                }
                return this.decorator.makeMove([{ type: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Resign }]);
            }
        }
        return results;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Blindfold.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Blindfold.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Blindfold": function() { return /* binding */ Blindfold; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "blindfold";
class Blindfold extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(Blindfold);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Blindfold",
                description: "Pieces are invisible",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.visual,
                displayIcon: "έ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Blindfold$/i.test(match);
    }
    serializeToParsingForm() {
        return "Blindfold";
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.fogOfWar;
    }
    getSquareVisibility() {
        const squareVisibility = this.callHandler("getSquareVisibility", arguments);
        return squareVisibility.map((r, i) => r.map((v, j) => {
            if (this.decorator.board[i][j].isWall()) {
                return v;
            }
            else {
                return [...v, _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.DisplaySettings.Blindfolded];
            }
        }));
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/CaptureTheKing.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/CaptureTheKing.ts ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaptureTheKing": function() { return /* binding */ CaptureTheKing; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");



const tag = "captureTheKing";
class CaptureTheKing extends _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule.initVariantRule(CaptureTheKing);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Capture the King",
                description: "To checkmate, kings must be captured",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_2__.variantRuleColors.minor,
                displayIcon: "Ā"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^CaptureTheKing$/i.test(match);
    }
    serializeToParsingForm() {
        return "CaptureTheKing";
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.giveaway || variantDataRules.taboo;
    }
    isKingInCheck() {
        return false;
    }
    isTheMoveLegal() {
        return true;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Chess960.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Chess960.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chess960": function() { return /* binding */ Chess960; }
/* harmony export */ });
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");





const tag = "chess960";
class Chess960 extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(Chess960);
    }
    static chess960ranges = [...Array.from({ length: 9 }, (_, i) => [960 * (i + 1) + 1, 960 + 960 * (i + 1)]),
        ...Array.from({ length: 5 }, (_, i) => [10000 + 960 * (i + 1) + 1, 10960 + 960 * (i + 1)])];
    static minorPieceCache = (function () {
        const minorPieceCache = [];
        for (let i = 0; i < 4; i++) {
            for (let j = i + 1; j < 5; j++) {
                minorPieceCache.push([i, j]);
            }
        }
        return minorPieceCache;
    })();
    static pieceMasks = [
        [404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959],
        [5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19, 33, 34, 35, 37, 38, 39, 41, 42, 43, 45, 46, 47, 49, 50, 51, 53, 54, 55, 57, 58, 59, 61, 62, 63, 65, 66, 67, 69, 70, 71, 73, 74, 75, 77, 78, 79, 81, 82, 83, 85, 86, 87, 89, 90, 91, 93, 94, 95, 101, 102, 103, 105, 106, 107, 109, 110, 111, 113, 114, 115, 129, 130, 131, 145, 146, 147, 161, 162, 163, 177, 178, 179, 197, 198, 199, 201, 202, 203, 205, 206, 207, 209, 210, 211, 225, 226, 227, 241, 242, 243, 257, 258, 259, 273, 274, 275, 293, 294, 295, 297, 298, 299, 301, 302, 303, 305, 306, 307, 321, 322, 323, 337, 338, 339, 353, 354, 355, 369, 370, 371, 421, 422, 423, 425, 426, 427, 429, 430, 431, 437, 438, 439, 441, 442, 443, 445, 446, 447, 453, 454, 455, 457, 458, 459, 461, 462, 463, 469, 470, 471, 473, 474, 475, 477, 478, 479, 517, 518, 519, 521, 522, 523, 525, 526, 527, 533, 534, 535, 537, 538, 539, 541, 542, 543, 549, 550, 551, 553, 554, 555, 557, 558, 559, 565, 566, 567, 569, 570, 571, 573, 574, 575, 613, 614, 615, 617, 618, 619, 621, 622, 623, 629, 630, 631, 633, 634, 635, 637, 638, 639, 645, 646, 647, 649, 650, 651, 653, 654, 655, 661, 662, 663, 665, 666, 667, 669, 670, 671],
        [4, 5, 6, 7, 20, 21, 22, 23, 36, 37, 38, 39, 52, 53, 54, 55, 68, 69, 70, 71, 84, 85, 86, 87, 100, 101, 102, 103, 116, 117, 118, 119, 132, 133, 134, 135, 148, 149, 150, 151, 164, 165, 166, 167, 180, 181, 182, 183, 196, 197, 198, 199, 212, 213, 214, 215, 228, 229, 230, 231, 244, 245, 246, 247, 260, 261, 262, 263, 276, 277, 278, 279, 292, 293, 294, 295, 308, 309, 310, 311, 324, 325, 326, 327, 340, 341, 342, 343, 356, 357, 358, 359, 372, 373, 374, 375, 388, 389, 390, 391, 404, 405, 406, 407, 420, 421, 422, 423, 436, 437, 438, 439, 452, 453, 454, 455, 468, 469, 470, 471, 484, 485, 486, 487, 500, 501, 502, 503, 516, 517, 518, 519, 532, 533, 534, 535, 548, 549, 550, 551, 564, 565, 566, 567, 580, 581, 582, 583, 596, 597, 598, 599, 612, 613, 614, 615, 628, 629, 630, 631, 644, 645, 646, 647, 660, 661, 662, 663, 676, 677, 678, 679, 692, 693, 694, 695, 708, 709, 710, 711, 724, 725, 726, 727, 740, 741, 742, 743, 756, 757, 758, 759, 772, 773, 774, 775, 788, 789, 790, 791, 804, 805, 806, 807, 820, 821, 822, 823, 836, 837, 838, 839, 852, 853, 854, 855, 868, 869, 870, 871, 884, 885, 886, 887, 900, 901, 902, 903, 916, 917, 918, 919, 932, 933, 934, 935, 948, 949, 950, 951],
        [16, 20, 34, 35, 38, 39, 40, 44, 58, 59, 62, 63, 112, 116, 130, 131, 134, 135, 136, 140, 154, 155, 158, 159, 208, 212, 226, 227, 230, 231, 232, 236, 250, 251, 254, 255, 304, 308, 322, 323, 326, 327, 328, 332, 346, 347, 350, 351, 400, 404, 418, 419, 422, 423, 424, 428, 442, 443, 446, 447, 496, 500, 514, 515, 518, 519, 520, 524, 538, 539, 542, 543, 592, 596, 610, 611, 614, 615, 616, 620, 634, 635, 638, 639, 688, 692, 706, 707, 710, 711, 712, 716, 730, 731, 734, 735, 784, 788, 802, 803, 806, 807, 808, 812, 826, 827, 830, 831, 880, 884, 898, 899, 902, 903, 904, 908, 922, 923, 926, 927],
        [14, 15, 30, 31, 46, 47, 62, 63, 66, 67, 70, 71, 76, 77, 82, 83, 86, 87, 92, 93, 110, 111, 126, 127, 142, 143, 158, 159, 162, 163, 166, 167, 172, 173, 178, 179, 182, 183, 188, 189, 194, 195, 198, 199, 204, 205, 210, 211, 214, 215, 220, 221, 226, 227, 230, 231, 236, 237, 240, 241, 244, 245, 256, 257, 260, 261, 272, 273, 276, 277, 290, 291, 294, 295, 300, 301, 306, 307, 310, 311, 316, 317, 322, 323, 326, 327, 332, 333, 336, 337, 340, 341, 352, 353, 356, 357, 368, 369, 372, 373, 398, 399, 414, 415, 430, 431, 446, 447, 450, 451, 454, 455, 460, 461, 466, 467, 470, 471, 476, 477, 482, 483, 486, 487, 492, 493, 498, 499, 502, 503, 508, 509, 514, 515, 518, 519, 524, 525, 528, 529, 532, 533, 544, 545, 548, 549, 560, 561, 564, 565, 578, 579, 582, 583, 588, 589, 594, 595, 598, 599, 604, 605, 610, 611, 614, 615, 620, 621, 624, 625, 628, 629, 640, 641, 644, 645, 656, 657, 660, 661, 672, 673, 676, 677, 688, 689, 692, 693, 768, 769, 772, 773, 784, 785, 788, 789, 864, 865, 868, 869, 880, 881, 884, 885],
        [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 106, 110, 114, 118, 122, 126, 130, 134, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242, 246, 250, 254, 258, 262, 266, 270, 274, 278, 282, 286, 290, 294, 298, 302, 306, 310, 314, 318, 322, 326, 330, 334, 338, 342, 346, 350, 354, 358, 362, 366, 370, 374, 378, 382, 386, 390, 394, 398, 402, 406, 410, 414, 418, 422, 426, 430, 434, 438, 442, 446, 450, 454, 458, 462, 466, 470, 474, 478, 482, 486, 490, 494, 498, 502, 506, 510, 514, 518, 522, 526, 530, 534, 538, 542, 546, 550, 554, 558, 562, 566, 570, 574, 578, 582, 586, 590, 594, 598, 602, 606, 610, 614, 618, 622, 626, 630, 634, 638, 642, 646, 650, 654, 658, 662, 666, 670, 674, 678, 682, 686, 690, 694, 698, 702, 706, 710, 714, 718, 722, 726, 730, 734, 738, 742, 746, 750, 754, 758, 762, 766, 770, 774, 778, 782, 786, 790, 794, 798, 802, 806, 810, 814, 818, 822, 826, 830, 834, 838, 842, 846, 850, 854, 858, 862, 866, 870, 874, 878, 882, 886, 890, 894, 898, 902, 906, 910, 914, 918, 922, 926, 930, 934, 938, 942, 946, 950, 954, 958],
        [192, 193, 194, 196, 197, 198, 200, 201, 202, 208, 209, 210, 212, 213, 214, 216, 217, 218, 224, 225, 226, 228, 229, 230, 232, 233, 234, 240, 241, 242, 244, 245, 246, 248, 249, 250, 291, 295, 299, 307, 311, 315, 323, 327, 331, 339, 343, 347, 355, 359, 363, 368, 369, 370, 372, 373, 374, 376, 377, 378, 480, 481, 482, 484, 485, 486, 488, 489, 490, 496, 497, 498, 500, 501, 502, 504, 505, 506, 512, 513, 514, 516, 517, 518, 520, 521, 522, 528, 529, 530, 532, 533, 534, 536, 537, 538, 579, 583, 587, 595, 599, 603, 611, 615, 619, 627, 631, 635, 643, 647, 651, 656, 657, 658, 660, 661, 662, 664, 665, 666, 672, 673, 674, 676, 677, 678, 680, 681, 682, 688, 689, 690, 692, 693, 694, 696, 697, 698, 704, 705, 706, 708, 709, 710, 712, 713, 714, 720, 721, 722, 724, 725, 726, 728, 729, 730, 771, 775, 779, 787, 791, 795, 803, 807, 811, 819, 823, 827, 835, 839, 843, 848, 849, 850, 852, 853, 854, 856, 857, 858, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 931, 935, 939, 944, 945, 946, 948, 949, 950, 952, 953, 954],
        [1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30, 32, 33, 34, 36, 37, 38, 40, 41, 42, 44, 45, 46, 48, 49, 50, 52, 53, 54, 56, 57, 58, 60, 61, 62, 64, 65, 66, 68, 69, 70, 72, 73, 74, 76, 77, 78, 96, 97, 98, 100, 101, 102, 104, 105, 106, 108, 109, 110, 112, 113, 114, 116, 117, 118, 120, 121, 122, 124, 125, 126, 128, 129, 130, 132, 133, 134, 136, 137, 138, 140, 141, 142, 144, 145, 146, 148, 149, 150, 152, 153, 154, 156, 157, 158, 160, 161, 162, 164, 165, 166, 168, 169, 170, 172, 173, 174, 192, 193, 194, 196, 197, 198, 200, 201, 202, 204, 205, 206, 208, 209, 210, 212, 213, 214, 216, 217, 218, 220, 221, 222, 224, 225, 226, 228, 229, 230, 232, 233, 234, 236, 237, 238, 240, 241, 242, 244, 245, 246, 248, 249, 250, 252, 253, 254, 256, 257, 258, 260, 261, 262, 264, 265, 266, 268, 269, 270, 384, 385, 386, 388, 389, 390, 392, 393, 394, 396, 397, 398, 400, 401, 402, 404, 405, 406, 408, 409, 410, 412, 413, 414, 416, 417, 418, 420, 421, 422, 424, 425, 426, 428, 429, 430, 432, 433, 434, 436, 437, 438, 440, 441, 442, 444, 445, 446, 448, 449, 450, 452, 453, 454, 456, 457, 458, 460, 461, 462, 480, 481, 482, 484, 485, 486, 488, 489, 490, 492, 493, 494, 496, 497, 498, 500, 501, 502, 504, 505, 506, 508, 509, 510, 512, 513, 514, 516, 517, 518, 520, 521, 522, 524, 525, 526, 528, 529, 530, 532, 533, 534, 536, 537, 538, 540, 541, 542, 544, 545, 546, 548, 549, 550, 552, 553, 554, 556, 557, 558, 672, 673, 674, 676, 677, 678, 680, 681, 682, 684, 685, 686, 688, 689, 690, 692, 693, 694, 696, 697, 698, 700, 701, 702, 704, 705, 706, 708, 709, 710, 712, 713, 714, 716, 717, 718, 720, 721, 722, 724, 725, 726, 728, 729, 730, 732, 733, 734, 736, 737, 738, 740, 741, 742, 744, 745, 746, 748, 749, 750]
    ];
    static c960range = (function () {
        const arr = [...Array(961).keys()];
        arr.shift();
        return arr;
    })();
    static twins = [959, 955, 951, 947, 958, 954, 950, 946, 957, 953, 949, 945, 956, 952, 948, 944, 943, 939, 935, 931, 942, 938, 934, 930, 941, 937, 933, 929, 940, 936, 932, 928, 927, 923, 919, 915, 926, 922, 918, 914, 925, 921, 917, 913, 924, 920, 916, 912, 911, 907, 903, 899, 910, 906, 902, 898, 909, 905, 901, 897, 908, 904, 900, 896, 895, 891, 887, 883, 894, 890, 886, 882, 893, 889, 885, 881, 892, 888, 884, 880, 879, 875, 871, 867, 878, 874, 870, 866, 877, 873, 869, 865, 876, 872, 868, 864, 863, 859, 855, 851, 862, 858, 854, 850, 861, 857, 853, 849, 860, 856, 852, 848, 847, 843, 839, 835, 846, 842, 838, 834, 845, 841, 837, 833, 844, 840, 836, 832, 831, 827, 823, 819, 830, 826, 822, 818, 829, 825, 821, 817, 828, 824, 820, 816, 815, 811, 807, 803, 814, 810, 806, 802, 813, 809, 805, 801, 812, 808, 804, 800, 799, 795, 791, 787, 798, 794, 790, 786, 797, 793, 789, 785, 796, 792, 788, 784, 783, 779, 775, 771, 782, 778, 774, 770, 781, 777, 773, 769, 780, 776, 772, 768, 671, 667, 663, 659, 670, 666, 662, 658, 669, 665, 661, 657, 668, 664, 660, 656, 655, 651, 647, 643, 654, 650, 646, 642, 653, 649, 645, 641, 652, 648, 644, 640, 639, 635, 631, 627, 638, 634, 630, 626, 637, 633, 629, 625, 636, 632, 628, 624, 623, 619, 615, 611, 622, 618, 614, 610, 621, 617, 613, 609, 620, 616, 612, 608, 607, 603, 599, 595, 606, 602, 598, 594, 605, 601, 597, 593, 604, 600, 596, 592, 591, 587, 583, 579, 590, 586, 582, 578, 589, 585, 581, 577, 588, 584, 580, 576, 383, 379, 375, 371, 382, 378, 374, 370, 381, 377, 373, 369, 380, 376, 372, 368, 367, 363, 359, 355, 366, 362, 358, 354, 365, 361, 357, 353, 364, 360, 356, 352, 351, 347, 343, 339, 350, 346, 342, 338, 349, 345, 341, 337, 348, 344, 340, 336, 335, 331, 327, 323, 334, 330, 326, 322, 333, 329, 325, 321, 332, 328, 324, 320, 319, 315, 311, 307, 318, 314, 310, 306, 317, 313, 309, 305, 316, 312, 308, 304, 303, 299, 295, 291, 302, 298, 294, 290, 301, 297, 293, 289, 300, 296, 292, 288, 767, 763, 759, 755, 766, 762, 758, 754, 765, 761, 757, 753, 764, 760, 756, 752, 751, 747, 743, 739, 750, 746, 742, 738, 749, 745, 741, 737, 748, 744, 740, 736, 735, 731, 727, 723, 734, 730, 726, 722, 733, 729, 725, 721, 732, 728, 724, 720, 719, 715, 711, 707, 718, 714, 710, 706, 717, 713, 709, 705, 716, 712, 708, 704, 703, 699, 695, 691, 702, 698, 694, 690, 701, 697, 693, 689, 700, 696, 692, 688, 687, 683, 679, 675, 686, 682, 678, 674, 685, 681, 677, 673, 684, 680, 676, 672, 575, 571, 567, 563, 574, 570, 566, 562, 573, 569, 565, 561, 572, 568, 564, 560, 559, 555, 551, 547, 558, 554, 550, 546, 557, 553, 549, 545, 556, 552, 548, 544, 543, 539, 535, 531, 542, 538, 534, 530, 541, 537, 533, 529, 540, 536, 532, 528, 527, 523, 519, 515, 526, 522, 518, 514, 525, 521, 517, 513, 524, 520, 516, 512, 511, 507, 503, 499, 510, 506, 502, 498, 509, 505, 501, 497, 508, 504, 500, 496, 495, 491, 487, 483, 494, 490, 486, 482, 493, 489, 485, 481, 492, 488, 484, 480, 287, 283, 279, 275, 286, 282, 278, 274, 285, 281, 277, 273, 284, 280, 276, 272, 271, 267, 263, 259, 270, 266, 262, 258, 269, 265, 261, 257, 268, 264, 260, 256, 255, 251, 247, 243, 254, 250, 246, 242, 253, 249, 245, 241, 252, 248, 244, 240, 239, 235, 231, 227, 238, 234, 230, 226, 237, 233, 229, 225, 236, 232, 228, 224, 223, 219, 215, 211, 222, 218, 214, 210, 221, 217, 213, 209, 220, 216, 212, 208, 207, 203, 199, 195, 206, 202, 198, 194, 205, 201, 197, 193, 204, 200, 196, 192, 479, 475, 471, 467, 478, 474, 470, 466, 477, 473, 469, 465, 476, 472, 468, 464, 463, 459, 455, 451, 462, 458, 454, 450, 461, 457, 453, 449, 460, 456, 452, 448, 447, 443, 439, 435, 446, 442, 438, 434, 445, 441, 437, 433, 444, 440, 436, 432, 431, 427, 423, 419, 430, 426, 422, 418, 429, 425, 421, 417, 428, 424, 420, 416, 415, 411, 407, 403, 414, 410, 406, 402, 413, 409, 405, 401, 412, 408, 404, 400, 399, 395, 391, 387, 398, 394, 390, 386, 397, 393, 389, 385, 396, 392, 388, 384, 191, 187, 183, 179, 190, 186, 182, 178, 189, 185, 181, 177, 188, 184, 180, 176, 175, 171, 167, 163, 174, 170, 166, 162, 173, 169, 165, 161, 172, 168, 164, 160, 159, 155, 151, 147, 158, 154, 150, 146, 157, 153, 149, 145, 156, 152, 148, 144, 143, 139, 135, 131, 142, 138, 134, 130, 141, 137, 133, 129, 140, 136, 132, 128, 127, 123, 119, 115, 126, 122, 118, 114, 125, 121, 117, 113, 124, 120, 116, 112, 111, 107, 103, 99, 110, 106, 102, 98, 109, 105, 101, 97, 108, 104, 100, 96, 95, 91, 87, 83, 94, 90, 86, 82, 93, 89, 85, 81, 92, 88, 84, 80, 79, 75, 71, 67, 78, 74, 70, 66, 77, 73, 69, 65, 76, 72, 68, 64, 63, 59, 55, 51, 62, 58, 54, 50, 61, 57, 53, 49, 60, 56, 52, 48, 47, 43, 39, 35, 46, 42, 38, 34, 45, 41, 37, 33, 44, 40, 36, 32, 31, 27, 23, 19, 30, 26, 22, 18, 29, 25, 21, 17, 28, 24, 20, 16, 15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0];
    static legacy = {
        legacy2PThreshold: 1000,
        legacy2PRank: 3, legacy4Prank: 0,
        legacy2PTakeaway: 6160
    };
    static displacement = [3, 11];
    static createBaseChess960mappings() {
        return {
            colorBoundPieces: [2, 5],
            supermajorPieces: [3],
            minorPieces: [1, 6],
            royalPiece: [4],
            edgePieces: [0, 7]
        };
    }
    static regExp = /Chess960=(\d{1,5})/i;
    positionID;
    constructor(positionID) {
        super();
        if (typeof positionID === "number") {
            this.positionID = positionID;
        }
        else {
            this.positionID = -1;
        }
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board; }
    getPublicProperties() {
        return {
            parameterValue: this.positionID,
            information: {
                name: "Chess960",
                description: "Initial position with randomly shuffled pieces on home ranks",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__.variantRuleColors.startingPosition,
                displayIcon: "Č"
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(Chess960.regExp);
        if (matchArray) {
            const newID = Number(matchArray[1]);
            if (newID < 0 || newID > 15760)
                return false;
            this.positionID = newID;
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `Chess960=${this.positionID}`;
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        if (this.positionID === -1)
            throw new Error("Position ID for Chess960 is not defined");
        let nr = this.positionID;
        const boardSquares = this.decorator.board;
        let rank = Chess960.chess960ranges.findIndex((r) => nr >= r[0] && nr <= r[1]);
        if (rank === -1) {
            if (nr > Chess960.legacy.legacy2PThreshold) {
                rank = Chess960.legacy.legacy2PRank;
                nr -= Chess960.legacy.legacy2PTakeaway;
            }
            else {
                rank = Chess960.legacy.legacy4Prank;
            }
        }
        const pieceArrays = [[], [], [], []];
        const ranks = [13 - rank, rank, rank, 13 - rank];
        pieceArrays[0] = boardSquares[ranks[0]].slice(Chess960.displacement[0], Chess960.displacement[1]);
        pieceArrays[1] = boardSquares.map((row) => row[ranks[1]]).slice(Chess960.displacement[0], Chess960.displacement[1]);
        pieceArrays[2] = boardSquares[ranks[2]].slice(Chess960.displacement[0], Chess960.displacement[1]);
        pieceArrays[3] = boardSquares.map((row) => row[ranks[3]]).slice(Chess960.displacement[0], Chess960.displacement[1]);
        const walls = pieceArrays.map(a => a.map(p => p.isWall() ? true : false));
        const intersections = [];
        for (const wall of walls) {
            intersections.push(wall.reduce((p, c, i) => {
                if (c) {
                    return p.filter(v => Chess960.pieceMasks[i].includes(v));
                }
                else
                    return p;
            }, Chess960.c960range));
        }
        const calcNr = nr - Chess960.chess960ranges[rank][0];
        const positions = [];
        const generatePositionIndexes = (calcNr) => {
            const colorBoundIndexes = [2 * Math.floor((calcNr % 16 / 4)), 1 + 2 * (calcNr % 16 % 4)].sort();
            const supermajorIndex = Math.floor(calcNr / 16) % 6;
            const minorPieceIndexes = Chess960.minorPieceCache[Math.floor(calcNr / 96) % 10];
            const position = {
                colorBoundPieces: Array(8).fill(false),
                supermajorPieces: Array(8).fill(false),
                minorPieces: Array(8).fill(false),
                royalPiece: Array(8).fill(false),
                edgePieces: Array(8).fill(false)
            };
            let edgeSet = false, royalSet = false, colorDelta = 0, majorDelta = 0;
            for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension - Chess960.displacement[0] * 2; i++) {
                if (i === colorBoundIndexes[0] || i === colorBoundIndexes[1]) {
                    position.colorBoundPieces[i] = true;
                    colorDelta++;
                }
                else if (i === supermajorIndex + colorDelta) {
                    position.supermajorPieces[i] = true;
                    majorDelta++;
                }
                else if (i === minorPieceIndexes[0] + colorDelta + majorDelta || i === minorPieceIndexes[1] + colorDelta + majorDelta) {
                    position.minorPieces[i] = true;
                }
                else {
                    position[edgeSet ? royalSet ? "edgePieces" : "royalPiece" : "edgePieces"][i] = true;
                    royalSet = edgeSet;
                    edgeSet = true;
                }
            }
            return position;
        };
        for (const intersection of intersections) {
            if (intersection.length === 0)
                return null;
            let calcTempNr = calcNr;
            let cycles = 0;
            while (cycles < 2) {
                if (intersection.includes(calcTempNr)) {
                    positions.push(generatePositionIndexes(calcTempNr));
                    break;
                }
                else if (intersection.includes(Chess960.twins[calcTempNr - 1])) {
                    positions.push(generatePositionIndexes(Chess960.twins[calcTempNr - 1]));
                    break;
                }
                calcTempNr++;
                if (calcTempNr === 960)
                    calcTempNr = 0, cycles++;
            }
            if (cycles === 2)
                intersections.push([]);
        }
        const fenData = this.decorator.data;
        const royalPieces = fenData.fenOptions.tag("royal");
        const royalOnCorrectRank = royalPieces.map((r, i) => r !== null
            ? r[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.getVerticalPlacementModulus)(i)] === ranks[i]
                ? r[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.getVerticalPlacementModulus)(i)] : -1 : -1);
        const replaceRow = (player) => {
            const pieces = Chess960.createBaseChess960mappings();
            const royal = royalPieces[player];
            if (!royal)
                return;
            const r = royal[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.getVerticalPlacementModulus)(player)];
            const supermajorOverRoyal = royalOnCorrectRank[player] ? r <= 6 : false;
            for (let i = Chess960.displacement[0]; i < Chess960.displacement[1]; i++) {
                let k;
                for (k in pieces) {
                    if (!Object.prototype.hasOwnProperty.call(pieces, k) || !positions[player][k][i - 3])
                        continue;
                    if (royalOnCorrectRank[player] !== -1 && k === 'royalPiece' && r !== i) {
                        royal[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.getVerticalPlacementModulus)(player)] = i;
                    }
                    const mI = supermajorOverRoyal ? intersections[player].length === 960 ? _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension - 1 - i : i : i;
                    const piece = pieces[k].shift();
                    if (piece !== undefined) {
                        boardSquares[(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.isVerticalPlacement)(player) ? ranks[player] : mI][(0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.isVerticalPlacement)(player) ? mI : ranks[player]] =
                            pieceArrays[player][piece];
                        break;
                    }
                }
            }
        };
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.colors)
            replaceRow(color);
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Crazyhouse.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Crazyhouse.ts ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Crazyhouse": function() { return /* binding */ Crazyhouse; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _FENDataDecorators_FiftyMoveRule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FENDataDecorators/FiftyMoveRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FiftyMoveRule.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");







const tag = "crazyhouse";
class Crazyhouse extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(Crazyhouse);
    }
    dependencies = new Map([[_FENDataDecorators_FiftyMoveRule__WEBPACK_IMPORTED_MODULE_5__.FiftyMoveRule, [Infinity]]]);
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Crazyhouse",
                description: "You can drop pieces from banks",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.extending,
                displayIcon: "Ď"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Crazyhouse$/i.test(match);
    }
    serializeToParsingForm() {
        return "Crazyhouse";
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        this.decorator.data.fenOptions.setTag("areBanksEnabled", [true, true, true, true]);
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
    getDroppingMoves(piece, color = this.decorator.data.sideToMove) {
        if (piece.color !== color)
            return [];
        const royal = this.decorator.data.fenOptions.tag("royal")[color];
        if (royal && this.decorator.preGeneratedAttacks[color].hoppingPieces[royal[0]][royal[1]])
            return [];
        const isPawn = _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_4__.pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn;
        const resultingMoveDrops = [];
        const isRY = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_6__.isVerticalPlacement)(color);
        const pawnPromotionRank = this.decorator.variantData.promotionRank === false ? -1 : this.decorator.variantData.promotionRank;
        const pawnBaseRank = this.decorator.data.fenOptions.tag("pawnBaseRank");
        for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension; i++) {
            if (isPawn && isRY && (pawnPromotionRank === i || pawnBaseRank === i)) {
                continue;
            }
            for (let j = 0; j < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension; j++) {
                if (isPawn && !isRY && (pawnPromotionRank === j || pawnBaseRank === j)) {
                    continue;
                }
                const square = this.decorator.board[i][j];
                if (!square.isEmpty())
                    continue;
                resultingMoveDrops.push({ piece, endCoordinates: [i, j] });
            }
        }
        if (this.decorator.isKingInCheck(color)) {
            return resultingMoveDrops.filter(moveDrop => {
                const { checks, checkmates } = this.decorator.makeMove([moveDrop], true);
                return !checks[color] || checkmates[color] || this.decorator.isKingInCheck(color);
            });
        }
        else {
            return resultingMoveDrops;
        }
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/DuckChess.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/DuckChess.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DuckChess": function() { return /* binding */ DuckChess; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _CaptureTheKing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CaptureTheKing */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/CaptureTheKing.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");








const tag = "duckChess";
class DuckChess extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(DuckChess);
    }
    dependencies = new Map([[_CaptureTheKing__WEBPACK_IMPORTED_MODULE_4__.CaptureTheKing, []]]);
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Duck Chess",
                description: "The duck must be moved to an empty square after every move",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.extending,
                displayIcon: "ᾟ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^DuckChess$/i.test(match);
    }
    serializeToParsingForm() {
        return "DuckChess";
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.taboo;
    }
    getLegalMoves(i, j) {
        const moves = this.callHandler("getLegalMoves", arguments);
        const latestMoves = (0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_1__.getLatestChainedMoves)(moves);
        const ducks = [], emptySquares = [];
        for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_6__.boardDimension; i++) {
            for (let j = 0; j < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_6__.boardDimension; j++) {
                const pieceString = this.decorator.board[i][j];
                if (pieceString.isWall() && pieceString.piece === _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_7__.nonPlayablePieces.duck) {
                    ducks.push([i, j]);
                }
                else if (pieceString.isEmpty()) {
                    emptySquares.push([i, j]);
                }
            }
        }
        const droppingChainedMoves = [];
        const duckChainedMoves = [];
        if (ducks.length === 0) {
            for (const emptySquare of emptySquares) {
                droppingChainedMoves.push({ piece: _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.duckPieceString, endCoordinates: emptySquare });
            }
            droppingChainedMoves.push({ piece: _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.duckPieceString, endCoordinates: [i, j] });
        }
        else {
            for (const duck of ducks) {
                for (const emptySquare of emptySquares) {
                    duckChainedMoves.push({ startCoordinates: duck, endCoordinates: emptySquare });
                }
                duckChainedMoves.push({ startCoordinates: duck, endCoordinates: [i, j] });
            }
        }
        for (const move of latestMoves) {
            move.nextChainedMoves = droppingChainedMoves.length > 0 ? droppingChainedMoves : duckChainedMoves;
        }
        return moves;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/FogOfWar.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/FogOfWar.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FogOfWar": function() { return /* binding */ FogOfWar; }
/* harmony export */ });
/* harmony import */ var _BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _CaptureTheKing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CaptureTheKing */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/CaptureTheKing.ts");






const tag = "fogOfWar";
class FogOfWar extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(FogOfWar);
    }
    dependencies = new Map([[_CaptureTheKing__WEBPACK_IMPORTED_MODULE_5__.CaptureTheKing, []]]);
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Fog of War",
                description: "Players can only see their pieces and the squares they can legally move to",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__.variantRuleColors.widespread,
                displayIcon: "ό"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^FogOfWar$/i.test(match);
    }
    serializeToParsingForm() {
        return "FogOfWar";
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.taboo;
    }
    getSquareVisibility() {
        const currentPlayerMoves = (0,_BaseInterfaces__WEBPACK_IMPORTED_MODULE_0__.initializeBoardSquares)(() => false);
        const preGeneratedAttacks = this.decorator.preGeneratedAttacks[this.decorator.data.sideToMove];
        for (const [piece, moves] of preGeneratedAttacks.pieceMovements) {
            const startingCoordinate = (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__.unstringifyCoordinate)(piece);
            currentPlayerMoves[startingCoordinate[0]][startingCoordinate[1]] = true;
            for (const { move } of moves) {
                currentPlayerMoves[move[0]][move[1]] = true;
            }
        }
        for (const drop of [...preGeneratedAttacks.pieceDrops.pawn, ...preGeneratedAttacks.pieceDrops.piece]) {
            currentPlayerMoves[drop.endCoordinates[0]][drop.endCoordinates[1]] = true;
        }
        const squareVisibility = this.callHandler("getSquareVisibility", arguments);
        return squareVisibility.map((r, i) => r.map((v, j) => {
            if (this.decorator.board[i][j].isWall() || currentPlayerMoves[i][j]) {
                return v;
            }
            else {
                return [...v, _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__.DisplaySettings.Fogged];
            }
        }));
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ForcedCapture.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ForcedCapture.ts ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForcedCapture": function() { return /* binding */ ForcedCapture; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "forcedCapture";
class ForcedCapture extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(ForcedCapture);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Forced Capture",
                description: "Capturing is always compulsory",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.widespread,
                displayIcon: "đ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^ForcedCapture$/i.test(match);
    }
    serializeToParsingForm() {
        return "ForcedCapture";
    }
    isDisabled() {
        return false;
    }
    pregenerateAttacks() {
        const { data: { sideToMove }, board, preGeneratedAttacks } = this.decorator;
        this.callHandler("pregenerateAttacks", arguments);
        for (const piece of this.decorator.getPlayerPieces()[sideToMove]) {
            const moves = preGeneratedAttacks[sideToMove].pieceMovements.get((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.stringifyCoordinate)(piece));
            if (moves) {
                for (const { move: coordinate } of moves) {
                    if (board[coordinate[0]][coordinate[1]].isPiece()) {
                        preGeneratedAttacks[sideToMove].variantRuleCache.hasCaptures = true;
                        return;
                    }
                }
            }
        }
        preGeneratedAttacks[sideToMove].variantRuleCache.hasCaptures = false;
    }
    isTheMoveLegal(_, moveData) {
        const isCapturing = this.decorator.data.getCapturedPieces(moveData).length > 0;
        if (!isCapturing && this.decorator.preGeneratedAttacks[this.decorator.data.sideToMove].variantRuleCache.hasCaptures)
            return false;
        return this.callHandler("isTheMoveLegal", arguments);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/GameMetadataRules.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/GameMetadataRules.ts ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Anonymous": function() { return /* binding */ Anonymous; },
/* harmony export */   "SelfPartner": function() { return /* binding */ SelfPartner; },
/* harmony export */   "SemiAnonymous": function() { return /* binding */ SemiAnonymous; }
/* harmony export */ });
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../utils/ArrayUtils */ "./src/main/client/ts/utils/ArrayUtils.ts");
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");






const tag = "anonymous";
class Anonymous extends _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule.initVariantRule(Anonymous);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Anonymous",
                description: "Players' names and ratings are hidden",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__.variantRuleColors.metadata,
                displayIcon: "-"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Anonymous$/i.test(match);
    }
    serializeToParsingForm() {
        return "Anonymous";
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.totalPlayers; i++) {
            this.decorator.gameData.players[i].name = "Anonymous";
            this.decorator.gameData.players[i].elo = undefined;
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
}
const semiAnonTag = "semiAnonymous";
class SemiAnonymous extends _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule.initVariantRule(Anonymous);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Semi-Anonymous",
                description: "Players's colors are hidden",
                tag: semiAnonTag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__.variantRuleColors.metadata,
                displayIcon: "v"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Semi-Anonymous$/i.test(match);
    }
    serializeToParsingForm() {
        return "Semi-Anonymous";
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        (0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_0__.shuffleArray)(this.decorator.gameData.players);
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
}
const spTag = "selfPartner";
class SelfPartner extends _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule.initVariantRule(SelfPartner);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Self-Partner",
                description: "Both sides of the team were played by one player",
                tag: spTag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__.variantRuleColors.metadata,
                displayIcon: "Ὑ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^SelfPartner$/i.test(match);
    }
    serializeToParsingForm() {
        return "SelfPartner";
    }
    isDisabled({ gameType, fenTags }) {
        return gameType !== _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.VariantType.Teams || fenTags.resigned.value.filter(Boolean).length !== 0;
    }
    initDecoratorSettings() {
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
        const gameType = this.decorator.gameType;
        const firstTeamPlayer = gameType.teamSettings.firstTeamColors.indexOf(true), secondTeamPlayer = gameType.teamSettings.secondTeamColors.indexOf(true);
        if ((0,_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_3__.verifyNumericColor)(firstTeamPlayer)) {
            this.decorator.gameData.players[gameType.getTeammateColor(firstTeamPlayer)].name
                = this.decorator.gameData.players[firstTeamPlayer].name;
        }
        if ((0,_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_3__.verifyNumericColor)(secondTeamPlayer)) {
            this.decorator.gameData.players[gameType.getTeammateColor(secondTeamPlayer)].name
                = this.decorator.gameData.players[secondTeamPlayer].name;
        }
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Ghostboard.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Ghostboard.ts ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ghostboard": function() { return /* binding */ Ghostboard; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "ghostboard";
class Ghostboard extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(Ghostboard);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Ghostboard",
                description: "Board, clocks and players are invisible",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.visual,
                displayIcon: "Þ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Ghostboard$/i.test(match);
    }
    serializeToParsingForm() {
        return "Ghostboard";
    }
    isDisabled() {
        return false;
    }
    getSquareVisibility() {
        const squareVisibility = this.callHandler("getSquareVisibility", arguments);
        return squareVisibility.map(r => r.map(v => [...v, _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.DisplaySettings.Ghosted]));
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ParadigmChess30.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ParadigmChess30.ts ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParadigmChess30": function() { return /* binding */ ParadigmChess30; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");



const tag = "paradigmChess30";
class ParadigmChess30 extends _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule.initVariantRule(ParadigmChess30);
    }
    static paradigmRanges = [...Array.from({ length: 14 }, (_, i) => [30 * (i + 1) + 1, 30 + 30 * (i + 1)])];
    // 0 = color bound, 1 = minor, 2 = major
    static permutations = [[0, 0, 1, 1, 2], [0, 0, 1, 2, 1], [0, 0, 2, 1, 1], [0, 1, 0, 1, 2], [0, 1, 0, 2, 1], [0, 1, 1, 0, 2],
        [0, 1, 1, 2, 0], [0, 1, 2, 0, 1], [0, 1, 2, 1, 0], [0, 2, 0, 1, 1], [0, 2, 1, 0, 1], [0, 2, 1, 1, 0],
        [1, 0, 0, 1, 2], [1, 0, 0, 2, 1], [1, 0, 1, 0, 2], [1, 0, 1, 2, 0], [1, 0, 2, 0, 1], [1, 0, 2, 1, 0],
        [1, 1, 0, 0, 2], [1, 1, 0, 2, 0], [1, 1, 2, 0, 0], [1, 2, 0, 0, 1], [1, 2, 0, 1, 0], [1, 2, 1, 0, 0],
        [2, 0, 0, 1, 1], [2, 0, 1, 0, 1], [2, 0, 1, 1, 0], [2, 1, 0, 0, 1], [2, 1, 0, 1, 0], [2, 1, 1, 0, 0]];
    static legacy = {
        twoPlayerRank: 3,
        twoPlayerAdjustment: 30 * 4
    };
    preMethodExecution = false;
    positionId;
    constructor(positionId) {
        super();
        if (typeof positionId === "number") {
            this.positionId = positionId;
        }
        else {
            this.positionId = -1;
        }
    }
    getPublicProperties() {
        return {
            parameterValue: this.positionId,
            information: {
                name: "Paradigm Chess30",
                description: "Paradigm Chess30: Dragon bishops combine the movement of bishop and xiangqi horse. 30 semi-random starting positions",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_2__.variantRuleColors.startingPosition,
                displayIcon: "Ă"
            }
        };
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^ParadigmChess30=((\d{1,3}))$/i);
        if (matchArray) {
            const newID = Number(matchArray[1]);
            if (newID < 0 || newID > 450)
                return false;
            this.positionId = newID;
            return true;
        }
        else
            return false;
    }
    serializeToParsingForm() {
        return `ParadigmChess30=${this.positionId}`;
    }
    isDisabled() {
        return false;
    }
    getInformation() {
        return { name: "Paradigm Chess30", description: "Paradigm Chess30: Dragon bishops combine the movement of bishop and xiangqi horse. 30 semi-random starting positions", tag };
    }
    initDecoratorSettings() {
        if (this.positionId === -1)
            throw new Error("Position ID for Paradigm Chess30 is not defined");
        let nr = this.positionId;
        const boardSquares = this.decorator.board;
        const data = this.decorator.data;
        let rank = ParadigmChess30.paradigmRanges.findIndex((r) => nr >= r[0] && nr <= r[1]);
        if (rank === -1) {
            rank = ParadigmChess30.legacy.twoPlayerRank;
            nr += ParadigmChess30.legacy.twoPlayerAdjustment;
        }
        const calcNr = nr - ParadigmChess30.paradigmRanges[rank][0];
        const ranks = [13 - rank, rank, rank, 13 - rank];
        const pieceArrays = [[], [], [], []];
        pieceArrays[0] = boardSquares[ranks[0]].slice(4, 10);
        pieceArrays[1] = boardSquares.map((row) => row[ranks[1]]).slice(4, 10);
        pieceArrays[2] = boardSquares[ranks[2]].slice(4, 10);
        pieceArrays[3] = boardSquares.map((row) => row[ranks[3]]).slice(4, 10);
        const royalPieces = data.fenOptions.tag("royal"), dead = data.fenOptions.tag("dead");
        const replaceRow = (player) => {
            const r = royalPieces[player]?.[player % 2 === 0 ? 1 : 0];
            const pieceCoordinates = [[5, 8], [4, 9], [r === undefined || r >= 7 ? 6 : 7]];
            const moveCoordinate = (i, iter) => {
                if (dead[player])
                    return;
                const coordinateA = player % 2 === 0 ? ranks[player] : iter;
                const coordinateB = player % 2 === 0 ? iter : ranks[player];
                if (pieceArrays[player][pieceCoordinates[i][0] - 4].isWall()
                    || boardSquares[coordinateA][coordinateB].isWall())
                    return;
                royalPieces.some((r) => {
                    if (r && r[0] === coordinateA && r[1] === coordinateB) {
                        r[0] = coordinateB, r[1] = coordinateA;
                        return true;
                    }
                    return false;
                });
                boardSquares[coordinateA][coordinateB] = pieceArrays[player][(pieceCoordinates[i].shift() ?? 4) - 4];
            };
            let c = 0;
            const rp = r === undefined || r >= 7 ? 7 : 6;
            const permutations = rp === 6 ? ParadigmChess30.permutations[calcNr].slice().reverse() : ParadigmChess30.permutations[calcNr];
            for (let i = 4; i < 10; i++) {
                if (i === rp)
                    continue;
                moveCoordinate(permutations[c++], i);
            }
        };
        for (let i = 0; i < 4; i++)
            replaceRow(i);
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/PiecesFaceCenter.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/PiecesFaceCenter.ts ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PiecesFaceCenter": function() { return /* binding */ PiecesFaceCenter; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "piecesFaceCenter";
class PiecesFaceCenter extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(PiecesFaceCenter);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Pieces Face Center",
                description: "Pieces are rotated to face center",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.visual,
                displayIcon: "Ἑ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^PiecesFaceCenter$/i.test(match);
    }
    serializeToParsingForm() {
        return "PiecesFaceCenter";
    }
    isDisabled() {
        return false;
    }
    getSquareVisibility() {
        const squareVisibility = this.callHandler("getSquareVisibility", arguments);
        return squareVisibility.map((r, i) => r.map((v, j) => {
            if (!this.decorator.board[i][j].isPiece()) {
                return v;
            }
            else {
                return [...v, _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.DisplaySettings.PieceFacesCenter];
            }
        }));
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SeirawanSetup.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SeirawanSetup.ts ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SeirawanSetup": function() { return /* binding */ SeirawanSetup; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");






const tag = "seirawanSetup";
class SeirawanSetup extends _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule.initVariantRule(SeirawanSetup);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Seirawan Setup",
                description: "When moving a piece for the first time, a piece from the bank can be placed on the vacated square, as part of the move",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__.variantRuleColors.extending,
                displayIcon: "ᾘ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^SeirawanSetup$/i.test(match);
    }
    serializeToParsingForm() {
        return "SeirawanSetup";
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.crazyhouse || variantDataRules.setupChess !== false;
    }
    initDecoratorSettings() {
        const fenOptions = this.decorator.data.fenOptions;
        const areBanksEnabled = fenOptions.tag("areBanksEnabled"), dead = fenOptions.tag("dead"), seirawanDrops = fenOptions.tag("seirawanDrops"), bank = fenOptions.tag("bank");
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.colors) {
            if (!dead[color] && seirawanDrops[color].size > 0 && bank[color].size > 0) {
                areBanksEnabled[color] = true;
            }
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
    makeMove(move) {
        const { fenOptions, sideToMove } = this.decorator.data;
        const areBanksEnabled = fenOptions.tag("areBanksEnabled"), seirawanDrops = fenOptions.tag("seirawanDrops"), bank = fenOptions.tag("bank");
        let disabledIndex = false;
        if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.verifyStandardMove)(move[0])) {
            seirawanDrops[sideToMove].delete((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.stringifyCoordinate)(move[0].startCoordinates));
            if (seirawanDrops[sideToMove].size === 0 || bank[sideToMove].size === 0) {
                disabledIndex = true;
            }
        }
        const returnValue = this.callHandler("makeMove", arguments);
        if (disabledIndex) {
            seirawanDrops[sideToMove].clear();
            bank[sideToMove].clear();
            areBanksEnabled[sideToMove] = false;
        }
        return returnValue;
    }
    getLegalMoves(i, j) {
        const { fenOptions, sideToMove } = this.decorator.data;
        const seirawanDrops = fenOptions.tag("seirawanDrops"), bank = fenOptions.tag("bank");
        const startCoordinates = [i, j];
        const stringifiedCoordinate = (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.stringifyCoordinate)(startCoordinates);
        const coordinate = [...seirawanDrops[sideToMove]].find(c => c === stringifiedCoordinate);
        const validateWithDrops = bank[sideToMove].size !== 0 && coordinate !== undefined;
        const moves = this.callHandler("getLegalMoves", arguments);
        const continuations = [];
        for (const piece of bank[sideToMove].keys()) {
            continuations.push({ piece, endCoordinates: startCoordinates });
        }
        if (validateWithDrops && (0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.verifyRequiredMove)(continuations)) {
            for (const move of moves) {
                move.nextChainedMoves = continuations;
            }
        }
        return moves;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SelfCheck.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SelfCheck.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelfCheck": function() { return /* binding */ SelfCheck; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "selfCheck";
class SelfCheck extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(SelfCheck);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Self-checks cost lives",
                description: "Self-checks cost lives. Checkmate yourself to earn points",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.minor,
                displayIcon: "ν"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^SelfCheck$/i.test(match);
    }
    serializeToParsingForm() {
        return "SelfCheck";
    }
    isDisabled({ variantDataRules }) {
        return !variantDataRules.nCheck || !variantDataRules.captureTheKing;
    }
    getCurrentChecks(baseColor = this.decorator.data.sideToMove) {
        const { data: { fenOptions, sideToMove }, preGeneratedAttacks } = this.decorator;
        const baseChecks = this.callHandler("getCurrentChecks", arguments);
        const royal = fenOptions.tag("royal")[baseColor];
        const newCoordinates = [];
        if (royal) {
            for (const [attackingPiece, attackCoordinates] of preGeneratedAttacks[sideToMove].hoppingPieceLines) {
                if ((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.compareCoordinates)(attackCoordinates, royal)) {
                    newCoordinates.push((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.stringifyCoordinate)(attackingPiece));
                }
            }
            for (const [attackingPiece, attackLine] of preGeneratedAttacks[sideToMove].slidingPiecesLines) {
                for (const attackCoordinates of attackLine) {
                    if ((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.compareCoordinates)(attackCoordinates, royal)) {
                        newCoordinates.push((0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.stringifyCoordinate)(attackingPiece));
                        break;
                    }
                }
            }
        }
        baseChecks[baseColor] = newCoordinates;
        return baseChecks;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SetupChess.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SetupChess.ts ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetupChess": function() { return /* binding */ SetupChess; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");







const tag = "setupChess";
class SetupChess extends _VariantRule__WEBPACK_IMPORTED_MODULE_5__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_5__.VariantRule.initVariantRule(SetupChess);
    }
    disabled = false;
    setupPoints;
    wereBanksEnabled = [false, false, false, false];
    permutationCoordinates = [[], [], [], []];
    pawnPermutationCoordinates = [[], [], [], []];
    constructor(setupPoints) {
        super();
        if (typeof setupPoints === "number") {
            this.setupPoints = setupPoints;
        }
        else {
            this.setupPoints = 39;
        }
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_2__.Board; }
    getPublicProperties() {
        return {
            parameterValue: this.setupPoints,
            information: {
                name: `Setup ${this.setupPoints}`,
                description: `Set up ${this.setupPoints} points before the game starts`,
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_6__.variantRuleColors.phased,
                displayIcon: "Ἐ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^Setup=(\d+)$/);
        if (matchArray) {
            this.setupPoints = Number(matchArray[1]);
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `Setup=${this.setupPoints}`;
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        const fenOptions = this.decorator.data.fenOptions;
        const areBanksEnabled = fenOptions.tag("areBanksEnabled"), dead = fenOptions.tag("dead"), setupComplete = fenOptions.tag("setupComplete"), setupPoints = fenOptions.tag("setupPoints"), pawnBaseRank = fenOptions.tag("pawnBaseRank"), royal = fenOptions.tag("royal"), castleKingside = fenOptions.tag("castleKingside"), castleQueenside = fenOptions.tag("castleQueenside");
        const areSetupPointsUnset = setupPoints === null;
        const modifyDisplacements = (i, j, color) => {
            const baseDisplacements = [[13 - i, j], [j, i], [i, j], [13 - j, i]];
            return baseDisplacements[color];
        };
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
            let bankEnabled = false;
            if (areBanksEnabled[color]) {
                this.wereBanksEnabled[color] = true;
                bankEnabled = true;
            }
            else if (!setupComplete[color]) {
                areBanksEnabled[color] = true;
                bankEnabled = true;
            }
            if (bankEnabled) {
                const files = (0,_baseTypes__WEBPACK_IMPORTED_MODULE_1__.createTupleFromCallback)((_, i) => i, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension);
                const pawnRanks = [pawnBaseRank, pawnBaseRank + 1].filter(rank => rank >= 0 && rank <= 13);
                const ranks = [pawnBaseRank - 1, ...pawnRanks];
                this.permutationCoordinates[color] = files.flatMap(file => ranks.map((rank) => modifyDisplacements(rank, file, color)));
                this.pawnPermutationCoordinates[color] = files.flatMap(file => pawnRanks.map((rank) => modifyDisplacements(rank, file, color)));
            }
            if (!areSetupPointsUnset && !dead[color]) {
                setupPoints[color] = this.setupPoints;
            }
            if (!royal[color]) {
                castleKingside[color] = false;
                castleQueenside[color] = false;
            }
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
    getLegalMoves() {
        if (!this.disabled)
            return [];
        return this.callHandler("getLegalMoves", arguments);
    }
    getCoordinateList(piece) {
        return _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn
            ? this.pawnPermutationCoordinates
            : this.permutationCoordinates;
    }
    getDroppingMoves(piece, color = this.decorator.data.sideToMove) {
        if (piece.color !== color)
            return [];
        if (!this.disabled && !this.decorator.data.fenOptions.tag("setupComplete")[color]) {
            const coordinateList = this.getCoordinateList(piece);
            const resultingMoveDrops = [];
            for (const coordinate of coordinateList[color]) {
                if (this.decorator.board[coordinate[0]][coordinate[1]].isEmpty()) {
                    resultingMoveDrops.push({ piece, endCoordinates: coordinate });
                }
            }
            return resultingMoveDrops;
        }
        else
            return this.callHandler("getDroppingMoves", arguments);
    }
    makeMove(move, ignoreNextMoves = false) {
        const fenOptions = this.decorator.data.fenOptions;
        const areBanksEnabled = fenOptions.tag("areBanksEnabled"), dead = fenOptions.tag("dead"), setupComplete = fenOptions.tag("setupComplete"), setupPoints = fenOptions.tag("setupPoints"), bank = fenOptions.tag("bank"), royal = fenOptions.tag("royal");
        const color = this.decorator.data.sideToMove, moveData = move[0];
        const results = this.callHandler("makeMove", arguments);
        if (!this.disabled && !setupComplete[color] && (0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.verifyDroppingMove)(moveData)
            && setupPoints) {
            const pointValue = _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.pieceControlConfigSettings[moveData.piece.piece].points.singlesPoints;
            if (moveData.piece.piece === "K") {
                bank[color].delete(moveData.piece);
                royal[color] = moveData.endCoordinates;
            }
            else {
                setupPoints[color] -= pointValue;
            }
            const pointsLeft = setupPoints[color];
            for (const [piece] of bank[color]) {
                if (piece.piece !== "K" && pointValue > pointsLeft) {
                    bank[color].delete(piece);
                }
            }
            if (bank[color].size === 0) {
                setupComplete[color] = true;
            }
            else {
                const coordinateList = this.getCoordinateList(moveData.piece);
                let anyDrop = false;
                for (const coordinate of coordinateList[color]) {
                    if (this.decorator.board[coordinate[0]][coordinate[1]].isEmpty()) {
                        anyDrop = true;
                        break;
                    }
                }
                if (!anyDrop) {
                    setupComplete[color] = true;
                }
            }
        }
        if (setupComplete.every((v, i) => v || dead[i])) {
            this.disabled = true;
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                if (!this.wereBanksEnabled[color]) {
                    areBanksEnabled[color] = false;
                    bank[color].clear();
                }
            }
        }
        if (!this.disabled && !ignoreNextMoves && setupComplete[this.decorator.data.sideToMove]) {
            _Board_Board__WEBPACK_IMPORTED_MODULE_2__.Board.prototype.makeMove.call(this.decorator, [{ type: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.InternalMoveSignature.Pass }]);
        }
        return results;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Taboo.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Taboo.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Taboo": function() { return /* binding */ Taboo; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "taboo";
class Taboo extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(Taboo);
    }
    getDecoratorType() { return _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Taboo",
                description: "Giving check is forbidden",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.widespread,
                displayIcon: "="
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Taboo$/i.test(match);
    }
    serializeToParsingForm() {
        return "Taboo";
    }
    isDisabled() {
        return false;
    }
    isSetupComplex() { return true; }
    isTheMoveLegal(_, moveData) {
        const initialDead = this.decorator.data.fenOptions.tag("dead").slice();
        const snapshot = this.decorator.createSnapshot();
        try {
            this.decorator.makeMove([moveData], true);
            const newDead = this.decorator.data.fenOptions.tag("dead").slice();
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.colors) {
                if ((!initialDead[color] && newDead[color]) || this.decorator.isKingInCheck(color))
                    return false;
            }
            return true;
        }
        finally {
            this.decorator.loadSnapshot(snapshot);
        }
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluation.ts":
/*!********************************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluation.ts ***!
  \********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comfuterAlgorithm": function() { return /* binding */ comfuterAlgorithm; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _BotInterface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../BotInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts");
/* harmony import */ var _RandomEvaluation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RandomEvaluation */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluation.ts");









const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const stringifyKey = (i, j, color) => `${i},${j}/${color ?? ""}`;
function getPieceInFront(i, j, color) {
    switch (color) {
        case 0:
            return [i - 1, j];
        case 1:
            return [i, j + 1];
        case 2:
            return [i + 1, j];
        case 3:
            return [i, j - 1];
    }
}
function createComfuterAlgorithm() {
    let boardAccessors;
    function augmentBoardAccessorsFromBoard(board) {
        return {
            board,
            boardSquares: board.board, data: board.data, remainingReal: board.data.getRealPlayers(),
            remaining: board.data.fenOptions.tag("dead").map((v, i) => v ? false : i).filter(v => v === false),
            coverage: (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => []),
            pieces: board.getPlayerPieces(), controls: board.controls, royal: board.data.fenOptions.tag("royal"),
            hangingCache: new Map(), coverageCache: new Map(), pieceValueCache: new Map()
        };
    }
    function initializeBoardAccessorsFromBoard(board) {
        const promotionRank = board.variantData.promotionRank !== false
            ? [_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension - board.variantData.promotionRank,
                board.variantData.promotionRank - 1, board.variantData.promotionRank - 1,
                _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension - board.variantData.promotionRank]
            : (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(99, _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers);
        boardAccessors = {
            ...augmentBoardAccessorsFromBoard(board),
            variantData: board.variantData, promotionRank,
            isFFA: board.gameType.isFFA(), isTeams: !board.gameType.isFFA(),
            zombieType: board.data.fenOptions.tag("zombieType"), defaultSideToMove: board.data.sideToMove
        };
    }
    function getDistanceFromPromotion(color, i, j) {
        if (i === -1)
            return 99;
        return Math.abs(boardAccessors.promotionRank[color] - (color & 1 ? i : j)) || 99;
    }
    function getDistanceFromKing(i, j, color) {
        if (i === -1)
            return 999;
        const royalPiece = boardAccessors.royal[color];
        if (!royalPiece)
            return 999;
        const x = Math.abs(i - royalPiece[0]), y = Math.abs(j - royalPiece[1]);
        if (x === 0 && y === 0)
            return 999;
        return Math.max(x, y);
    }
    function inspectCoverage() {
        const { board, boardSquares, pieces, coverage } = boardAccessors;
        for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
            for (const coordinate of pieces[color]) {
                const pc = boardSquares[coordinate[0]][coordinate[1]];
                if (!pc.isPiece())
                    continue;
                const destinations = board.preGeneratedAttacks[color].pieceMovements.get((0,_moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__.stringifyCoordinate)(coordinate));
                if (!destinations)
                    continue;
                for (const dest of destinations) {
                    coverage[dest.move[0]][dest.move[1]].push(coordinate);
                }
            }
        }
    }
    function getCoverage(i, j, color) {
        const { coverageCache, coverage, boardSquares, data, board, zombieType, defaultSideToMove } = boardAccessors;
        const resigned = data.fenOptions.tag("resigned");
        const key = stringifyKey(i, j, color);
        if (coverageCache.has(key))
            return coverageCache.get(key);
        const attackers = [], defenders = [];
        const cvg = coverage[i][j];
        if (cvg.length) {
            for (const pieceC of cvg) {
                const piece = boardSquares[pieceC[0]][pieceC[1]];
                if (!piece.isPiece())
                    continue;
                const pieceColor = piece.color;
                if (resigned[pieceColor] && zombieType[pieceColor] === _BotInterface__WEBPACK_IMPORTED_MODULE_7__.ZombieType.Rando)
                    continue;
                if (board.gameType.isSameTeam(pieceColor, defaultSideToMove)) {
                    defenders.push(pieceC);
                }
                else {
                    attackers.push(pieceC);
                }
            }
        }
        const cache = color === defaultSideToMove ? { attackers, defenders } : { defenders: attackers, attackers: defenders };
        coverageCache.set(key, cache);
        return cache;
    }
    function getPieceValue(i, j) {
        const { boardSquares, pieceValueCache, isFFA, isTeams, remainingReal, royal, board } = boardAccessors;
        const coordinates = [i, j];
        const pieceString = boardSquares[i][j];
        if (!pieceString.isPiece())
            return 0;
        const piece = pieceString.piece;
        const key = `${coordinates[0]},${coordinates[1]}/${pieceString.color}`;
        if (pieceValueCache.has(key))
            return pieceValueCache.get(key);
        let value = 0;
        const controlSetting = _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_6__.pieceControlConfigSettings[piece];
        if (!controlSetting.moveGenerationSettings.isPawn) {
            value = isTeams ? controlSetting.points.botTeamsValue : controlSetting.points.botFFAValue;
        }
        else {
            value = isFFA ? 1 : 0.4;
            const promotionDistance = getDistanceFromPromotion(pieceString.color, ...coordinates);
            value += 2 / (getDistanceFromKing(...coordinates, pieceString.color) * 3) * (remainingReal / 4);
            value += 3 / (promotionDistance * 3);
            if (promotionDistance < 2) {
                const inFront = getPieceInFront(...coordinates, pieceString.color);
                const { attackers, defenders } = getCoverage(...inFront, pieceString.color);
                if (!defenders.length) {
                    value += 3 / promotionDistance;
                }
                if (attackers.length < defenders.length) {
                    value += 2 / promotionDistance;
                }
            }
        }
        let isRoyal = false;
        for (const royalPiece of royal) {
            if (!royalPiece)
                continue;
            if (royalPiece[0] === coordinates[0] && royalPiece[1] === coordinates[1]) {
                isRoyal = true;
                break;
            }
        }
        if (!isRoyal && piece !== _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__.pawnPieceString.piece) {
            for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                if (!board.gameType.isSameTeam(color, pieceString.color)) {
                    let d = getDistanceFromKing(...coordinates, color);
                    if (d < 3)
                        d = 2;
                    value += (5 - remainingReal) / d;
                }
            }
        }
        pieceValueCache.set(key, value);
        return value;
    }
    function getCoordinationEval(player) {
        const { pieces, remainingReal } = boardAccessors;
        let e = 0;
        for (const piece of pieces[player]) {
            const { defenders } = getCoverage(piece[0], piece[1], player);
            for (const d of defenders)
                e += 30 / (getPieceValue(d[0], d[1]) * 2);
        }
        if (remainingReal === 2) {
            e *= 0.4;
        }
        else if (remainingReal === 3) {
            e *= 0.7;
        }
        return e / 55;
    }
    function firstPlayerMovesBefore(p1, p2) {
        const { data, defaultSideToMove } = boardAccessors;
        let next = data.nextTurn();
        do {
            if (p1 === next)
                return true;
            if (p2 === next)
                return false;
            next = data.nextTurn(next);
        } while (next !== defaultSideToMove);
        return true;
    }
    function canRespondDirectlyToThreat(player, attackers) {
        const { boardSquares } = boardAccessors;
        let attackingPlayers = [];
        for (const pc of attackers) {
            const square = boardSquares[pc[0]][pc[1]];
            if (!square.isPiece())
                continue;
            attackingPlayers.push(square.color);
        }
        attackingPlayers = attackingPlayers.filter(onlyUnique);
        for (const a of attackingPlayers) {
            if (firstPlayerMovesBefore(player, a))
                return false;
        }
        return true;
    }
    function hanging(i, j, pieceValue = getPieceValue(i, j)) {
        const { hangingCache, boardSquares, remaining, data } = boardAccessors;
        const key = stringifyKey(i, j);
        if (hangingCache.has(key))
            return hangingCache.get(key);
        const square = boardSquares[i][j];
        if (!square.isPiece())
            return 0;
        const { attackers, defenders } = getCoverage(i, j, square.color);
        let attackerValue = 999;
        for (const pc of attackers) {
            attackerValue = Math.min(attackerValue, getPieceValue(pc[0], pc[1]));
        }
        let attackedFromLeft = false;
        const nextTurn = data.nextTurn(square.color);
        if (remaining.length > 2) {
            for (const pc of attackers) {
                if (boardSquares[pc[0]][pc[1]].color === nextTurn) {
                    attackedFromLeft = true;
                    break;
                }
            }
        }
        const threatened = pieceValue - attackerValue;
        let pawnDefends;
        for (const pc of defenders) {
            if (boardSquares[pc[0]][pc[1]].piece === _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__.pawnPieceString.piece) {
                pawnDefends = pc;
                break;
            }
        }
        let h = 0;
        const underDefended = attackers.length - defenders.length > 0;
        if (underDefended)
            h = pieceValue;
        if (underDefended && pawnDefends)
            h = 0;
        if (pawnDefends && attackers.length - defenders.length > 1) {
            h = getPieceValue(pawnDefends[0], pawnDefends[1]);
        }
        if (!h && threatened > 0)
            h = threatened;
        if (!h && attackedFromLeft && threatened >= -2) {
            h = -threatened;
        }
        if (h && canRespondDirectlyToThreat(square.color, attackers)) {
            h /= 6;
        }
        hangingCache.set(key, h);
        return h;
    }
    function getMobilityEval(player) {
        const { pieces, boardSquares, isTeams, royal, defaultSideToMove, board } = boardAccessors;
        let e = 0;
        for (const coordinate of pieces[player]) {
            if (hanging(coordinate[0], coordinate[1]) > 2)
                continue;
            const piece = boardSquares[coordinate[0]][coordinate[1]];
            if (!piece.isPiece())
                continue;
            let destinations = board.preGeneratedAttacks[player].pieceMovements.get((0,_moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_2__.stringifyCoordinate)(coordinate))?.length ?? 0;
            if (/[QDAEHΔ]/.test(piece.piece))
                destinations /= isTeams ? 2 : 3;
            if (/[RBV]]/.test(piece.piece))
                destinations /= isTeams ? 1.5 : 2;
            e += destinations / (isTeams ? 10 : board.gameType.type === _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.VariantType.Solo ? 21 : 16);
            let isRoyal = false;
            for (const royalPiece of royal) {
                if (!royalPiece)
                    continue;
                if (royalPiece[0] === coordinate[0] && royalPiece[1] === coordinate[1]) {
                    isRoyal = true;
                    break;
                }
            }
            if (!isRoyal && !isTeams && piece.piece === _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__.pawnPieceString.piece) {
                const blockedBy = getPieceInFront(coordinate[0], coordinate[1], player);
                const bSqr = boardSquares[blockedBy[0]][blockedBy[1]];
                if (bSqr.isEmpty())
                    continue;
                if (!bSqr.isPiece()) {
                    e -= 2;
                }
                else if (board.gameType.isSameTeam(bSqr.color, defaultSideToMove)) {
                    e -= 0.5;
                }
                else if (bSqr.piece === _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__.pawnPieceString.piece) {
                    e -= 1.8;
                }
                else if (player === bSqr.color) {
                    e -= 0.5;
                }
            }
        }
        return e;
    }
    function getDistFromHill(player) {
        const royalPiece = boardAccessors.royal[player];
        if (!royalPiece)
            return 999;
        const x = Math.abs(6.5 - royalPiece[0]);
        const y = Math.abs(6.5 - royalPiece[1]);
        const d = (x + y) / 2 + Math.max(x, y) / 2;
        if (!d)
            return 999;
        return d;
    }
    function getMatesEval() {
        const { board, variantData, data, pieces, remainingReal } = boardAccessors;
        board.data.sideToMove = board.data.previousTurn();
        const { checkmates, stalemates, checks } = board.getCheckmatesAndStalemates();
        board.data.sideToMove = board.data.nextTurn();
        let e = 0;
        for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
            if (checkmates[color]) {
                e += 500;
            }
            else if (stalemates[color])
                e -= 300;
        }
        const checksLength = checks.filter(Boolean).length;
        if (checksLength === 3) {
            e += 10;
        }
        else if (checksLength === 2) {
            e += 1;
        }
        else if (checksLength === 1) {
            const prev = data.previousTurn();
            if (remainingReal > 2 && checks[prev]) {
                e += 1.2;
            }
            else if (remainingReal === 2) {
                e += 0.1;
            }
            else {
                e += 0.4;
            }
        }
        if (checksLength && variantData.nCheck) {
            for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                const lives = data.fenOptions.tag("lives")[color];
                if (lives && checks[color])
                    e += 4 / (lives + 1);
            }
            e += 0.3;
        }
        if (variantData.barePieceRule) {
            for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                if (pieces[color].length <= 1)
                    e += 300;
            }
        }
        return e;
    }
    function getMaterialEval() {
        const { board, pieces, isTeams, remainingReal, defaultSideToMove, variantData } = boardAccessors;
        let myMaterial = 0, oppMaterial = 0;
        for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
            if (board.gameType.isSameTeam(color, defaultSideToMove)) {
                for (const pc of pieces[color]) {
                    let pieceValue = getPieceValue(pc[0], pc[1]);
                    pieceValue -= hanging(pc[0], pc[1]);
                    myMaterial += pieceValue;
                }
            }
            else {
                for (const pc of pieces[color]) {
                    let pcVal = getPieceValue(pc[0], pc[1]);
                    if (!isTeams && remainingReal === 4 && Math.abs(color - defaultSideToMove) === 2 && !variantData.giveaway) {
                        pcVal /= board.gameType.type === _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.VariantType.Solo ? 2 : 3;
                    }
                    pcVal -= hanging(pc[0], pc[1], pcVal);
                    oppMaterial -= pcVal;
                }
            }
        }
        if (!isTeams && remainingReal === 4) {
            oppMaterial /= 1.4;
            myMaterial *= 1.2;
        }
        if (!isTeams && remainingReal === 3) {
            oppMaterial /= 1.25;
            myMaterial *= 1.1;
        }
        myMaterial *= 2;
        oppMaterial *= 2;
        return { myMaterial, oppMaterial };
    }
    function getPinsEval() {
        const { board, royal, pieces, defaultSideToMove, remainingReal } = boardAccessors;
        let pinnedEval = 0, discovsEval = 0;
        for (const i of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
            const discovered = [];
            const pins = [];
            for (const piece of pieces[i]) {
                const royalPiece = royal[i];
                if (!royalPiece)
                    break;
                if (royalPiece[0] === piece[0] && royalPiece[1] === piece[1])
                    continue;
                const [royalX, royalY] = royalPiece;
                const pieceX = piece[0], pieceY = piece[1];
                for (const [attackPiece, attackLine] of board.preGeneratedAttacks[i].slidingPiecesRayTracing) {
                    let isPieceUnderAttack = false, isRoyalUnderAttack = false;
                    for (const [attackedX, attackedY] of attackLine) {
                        if (!isPieceUnderAttack && attackedX === pieceX && attackedY === pieceY)
                            isPieceUnderAttack = true;
                        if (!isRoyalUnderAttack && attackedX === royalX && attackedY === royalY)
                            isRoyalUnderAttack = true;
                        if (isPieceUnderAttack && isRoyalUnderAttack) {
                            pins.push(piece);
                        }
                        else if (isRoyalUnderAttack && !isPieceUnderAttack) {
                            discovered.push([attackPiece[0], attackPiece[1]]);
                        }
                    }
                }
            }
            for (const coordinate of pins) {
                if (hanging(coordinate[0], coordinate[1]) > 2)
                    continue;
                const pieceValue = Math.sqrt(getPieceValue(coordinate[0], coordinate[1]));
                if (!board.gameType.isSameTeam(i, defaultSideToMove)) {
                    pinnedEval += pieceValue / 2;
                }
                else {
                    pinnedEval -= pieceValue;
                }
            }
            for (const coordinate of discovered) {
                if (hanging(coordinate[0], coordinate[1]) > 2)
                    continue;
                const pieceValue = Math.sqrt(getPieceValue(coordinate[0], coordinate[1]));
                if (board.gameType.isSameTeam(i, defaultSideToMove)) {
                    discovsEval += pieceValue / 2;
                }
                else {
                    discovsEval -= pieceValue;
                }
            }
        }
        pinnedEval *= remainingReal / 6;
        discovsEval *= remainingReal / 6;
        if (discovsEval < 0)
            discovsEval /= 10;
        return { pinnedEval, discovsEval };
    }
    function getKingSafetyEval(player) {
        const { board, royal, boardSquares, remainingReal, data, variantData, defaultSideToMove } = boardAccessors;
        let kingEval = 0, checkableEval = 0, exposedEval = 0;
        if (variantData.giveaway)
            return { kingEval, checkableEval, exposedEval };
        const baseReferences = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => []);
        for (const [coordinate, attack] of board.preGeneratedAttacks[player].hoppingPieceLines) {
            baseReferences[attack[0]][attack[1]].push([coordinate[0], coordinate[1]]);
        }
        for (const [coordinate, line] of board.preGeneratedAttacks[player].slidingPiecesLines) {
            for (const attack of line) {
                baseReferences[attack[0]][attack[1]].push([coordinate[0], coordinate[1]]);
            }
        }
        const royalPiece = royal[player];
        const squareAccessDefinitions = new Set();
        if (royalPiece) {
            const isChecked = Boolean(board.preGeneratedAttacks[player].slidingPieces[royalPiece[0]][royalPiece[1]]
                || board.preGeneratedAttacks[player].hoppingPieces[royalPiece[0]][royalPiece[1]]);
            for (let i = 0; i < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension; i++) {
                for (let j = 0; j < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension; j++) {
                    if (isChecked) {
                        let checkableSq = 0;
                        if (remainingReal === 2) {
                            checkableSq -= 0.8;
                        }
                        else {
                            const players = baseReferences[i][j].map(coord => {
                                const piece = boardSquares[coord[0]][coord[1]];
                                if (!piece.isPiece())
                                    return player;
                                return piece.color;
                            });
                            const prev = data.nextTurn(player);
                            const next = data.previousTurn(player);
                            for (const player of players) {
                                if (remainingReal === 3) {
                                    checkableSq -= player === next ? 3 : 2;
                                }
                                else if (remainingReal === 4) {
                                    checkableSq -= player === next ? 5 : player === prev ? 2 : 3;
                                }
                            }
                        }
                        const { defenders } = getCoverage(i, j, player);
                        if (defenders.length)
                            checkableSq += 2.5;
                        if (checkableSq > 0)
                            checkableSq = 0;
                        const accessKey = stringifyKey(i, j);
                        if (!squareAccessDefinitions.has(accessKey)) {
                            exposedEval -= 0.123;
                            squareAccessDefinitions.add(accessKey);
                        }
                        checkableEval += checkableSq;
                    }
                }
            }
            const ki = royalPiece[0], kj = royalPiece[1];
            for (let d = 1; d < 3; d++) {
                const x = [ki, ki + d, ki - d];
                const y = [kj, kj + d, kj - d];
                for (const i of x) {
                    for (const j of y) {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        if (!boardSquares[i]?.[j])
                            continue;
                        if (i === ki && j === kj)
                            continue;
                        const pieceString = boardSquares[i][j];
                        if (!pieceString.isPiece())
                            continue;
                        if (board.gameType.isSameTeam(pieceString.color, player)) {
                            kingEval += pieceString.piece === _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__.pawnPieceString.piece ? 2 : 1;
                        }
                        else {
                            kingEval -= getPieceValue(i, j);
                        }
                    }
                }
            }
            for (let k = -1; k < 2; k++) {
                for (let h = -1; h < 2; h++) {
                    const i = ki + k;
                    const j = kj + h;
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (!boardSquares[i]?.[j])
                        continue;
                    const { attackers, defenders } = getCoverage(i, j, player);
                    kingEval -= 2 * attackers.length;
                    kingEval += 1 * defenders.length;
                }
            }
            kingEval /= 10;
        }
        if (variantData.nCheck && !board.gameType.isSameTeam(board.data.sideToMove, defaultSideToMove)) {
            const lives = data.fenOptions.tag("lives")[board.data.sideToMove];
            switch (lives) {
                case null:
                    break;
                case 2:
                    checkableEval *= 1.5;
                    break;
                case 1:
                    checkableEval *= 3;
                    break;
                default:
                    checkableEval *= 1.3;
            }
        }
        return { kingEval, checkableEval, exposedEval };
    }
    function isZombieEatZombie(move) {
        if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.verifyStandardMove)(move))
            return false;
        const { data, defaultSideToMove, boardSquares, variantData } = boardAccessors;
        if (variantData.giveaway)
            return false;
        const resigned = data.fenOptions.tag("resigned");
        if (!resigned[defaultSideToMove])
            return false;
        const targetPiece = boardSquares[move.endCoordinates[0]][move.endCoordinates[1]];
        if (!targetPiece.isPiece())
            return false;
        if (resigned[targetPiece.color])
            return true;
        return false;
    }
    function getEval(move) {
        let totalEval = 0;
        const { board, data, defaultSideToMove, variantData, royal, isTeams } = boardAccessors;
        const snapshot = board.createSnapshot();
        const isKingsideCastle = data.fenOptions.isKingsideCastlingAvailable(data.sideToMove, board), isQueensideCastle = data.fenOptions.isQueensideCastlingAvailable(data.sideToMove, board);
        board.makeMove([move], true);
        board.pregenerateAttacks();
        boardAccessors = { ...boardAccessors, ...augmentBoardAccessorsFromBoard(board) };
        inspectCoverage();
        const { myMaterial, oppMaterial } = getMaterialEval();
        const hillEval = variantData.kingOfTheHill ? 416 / (3 * getDistFromHill(defaultSideToMove)) : 0;
        if (variantData.giveaway) {
            totalEval = -3 * myMaterial - oppMaterial - (getCoordinationEval(defaultSideToMove) * 10) + hillEval;
        }
        else {
            totalEval += getMatesEval();
            const royalPiece = royal[defaultSideToMove];
            if (royalPiece) {
                const { attackers } = getCoverage(royalPiece[0], royalPiece[1], defaultSideToMove);
                if (attackers.length)
                    totalEval -= 700;
            }
            totalEval += getMobilityEval(defaultSideToMove);
            totalEval += getCoordinationEval(defaultSideToMove);
            if (isTeams) {
                const partner = _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors.find(v => v !== defaultSideToMove && board.gameType.isSameTeam(defaultSideToMove, v));
                if (partner)
                    Object.values(getKingSafetyEval(partner)).forEach(v => totalEval += v);
            }
            Object.values(getPinsEval()).forEach(v => totalEval += v);
            Object.values(getKingSafetyEval(defaultSideToMove)).forEach(v => totalEval += v);
            totalEval += myMaterial + oppMaterial + hillEval;
        }
        const isCastling = "specialType" in move && (move.specialType === _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.SpecialMove.CastlingKingside || move.specialType === _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.SpecialMove.CastlingQueenside);
        if (!isCastling && (isKingsideCastle || isQueensideCastle))
            totalEval -= 0.5;
        if (isZombieEatZombie(move)) {
            totalEval -= 10000;
        }
        switch (board.moves.getHash(board.data.constructPreliminaryHashString())) {
            case 1:
                totalEval -= 10000;
                break;
            case 2:
                totalEval -= 20000;
                break;
        }
        if (variantData.fiftyMoveRule && variantData.fiftyMoveRule - board.data.plyCount < 8)
            totalEval -= 150000;
        board.loadSnapshot(snapshot);
        return totalEval;
    }
    return {
        stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_7__.ZombieType.Futer,
        evaluate(moves, board) {
            initializeBoardAccessorsFromBoard(board.createClone());
            const moveValues = new Map();
            for (const move of moves) {
                if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.verifyInternalMove)(move)) {
                    switch (move.type) {
                        case _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.InternalMoveSignature.Resign:
                        case _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.InternalMoveSignature.Timeout:
                            moveValues.set(move, -Infinity);
                            break;
                        case _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.InternalMoveSignature.ClaimWin:
                            moveValues.set(move, Infinity);
                            break;
                    }
                }
                else
                    moveValues.set(move, getEval(move));
            }
            return moveValues;
        },
        pickPreferredMove(evaluations) {
            const sorted = [...evaluations.entries()].sort((a, b) => b[1] - a[1]);
            const best = [];
            for (const [move, evaluated] of sorted) {
                if (sorted[0][1] - evaluated > 0.5)
                    break;
                best.push(move);
            }
            if (best.length > 5)
                best.length = 5;
            let pick = Math.floor(Math.random() * best.length);
            if (pick > 0 && Math.random() > 0.8)
                pick = 0;
            if (pick > 1 && Math.random() > 0.8)
                pick = 1;
            if (pick > 2 && Math.random() > 0.8)
                pick = 2;
            return (0,_RandomEvaluation__WEBPACK_IMPORTED_MODULE_8__.randomlyPickNextChainedMoves)(best[pick]);
        }
    };
}
const comfuterAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_7__.createBotAlgorithm)(createComfuterAlgorithm());


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluationExtensions.ts":
/*!******************************************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluationExtensions.ts ***!
  \******************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comfuterCheckerAlgorithm": function() { return /* binding */ comfuterCheckerAlgorithm; },
/* harmony export */   "comfuterMuncherAlgorithm": function() { return /* binding */ comfuterMuncherAlgorithm; },
/* harmony export */   "comfuterPusherAlgorithm": function() { return /* binding */ comfuterPusherAlgorithm; },
/* harmony export */   "createComfuterBasedAlgorithm": function() { return /* binding */ createComfuterBasedAlgorithm; },
/* harmony export */   "patzerAlgorithm": function() { return /* binding */ patzerAlgorithm; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _BotInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BotInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts");
/* harmony import */ var _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ComfuterEvaluation */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluation.ts");




const createComfuterBasedAlgorithm = (algorithm) => ({
    ...algorithm,
    pickPreferredMove(...args) {
        return _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_3__.comfuterAlgorithm.pickPreferredMove.apply(this, args);
    }
});
const comfuterCheckerAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_2__.createBotAlgorithm)(createComfuterBasedAlgorithm({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.F_Checker,
    evaluate(moves, board) {
        const baseEvaluations = _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_3__.comfuterAlgorithm.evaluate.call(this, moves, board);
        for (const [move, evaluation] of baseEvaluations) {
            if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyInternalMove)(move))
                continue;
            const snapshot = board.createSnapshot();
            const { checks, checkmates } = board.makeMove([move]);
            const checksLength = checks.filter(Boolean).length;
            baseEvaluations.set(move, evaluation + (checkmates.includes(true)
                ? checksLength * 500
                : checksLength * 1500));
            board.moves.deleteMove(board.moves.currentMove);
            board.loadSnapshot(snapshot);
        }
        return baseEvaluations;
    }
}));
const comfuterMuncherAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_2__.createBotAlgorithm)(createComfuterBasedAlgorithm({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.F_Muncher,
    evaluate(moves, board) {
        const baseEvaluations = _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_3__.comfuterAlgorithm.evaluate.call(this, moves, board);
        for (const [move, evaluation] of baseEvaluations) {
            if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(move))
                continue;
            if (move.specialType === _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.SpecialMove.EnPassant
                || board.board[move.endCoordinates[0]][move.endCoordinates[1]].isEmpty())
                continue;
            baseEvaluations.set(move, evaluation + 5000);
        }
        return baseEvaluations;
    }
}));
const comfuterPusherAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_2__.createBotAlgorithm)(createComfuterBasedAlgorithm({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.F_Pusher,
    evaluate(moves, board) {
        const baseEvaluations = _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_3__.comfuterAlgorithm.evaluate.call(this, moves, board);
        for (const [move, evaluation] of baseEvaluations) {
            if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(move))
                continue;
            const pieceString = board.board[move.startCoordinates[0]][move.startCoordinates[1]];
            if (pieceString.isPiece() && !_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) {
                baseEvaluations.set(move, evaluation + 5000);
            }
        }
        return baseEvaluations;
    }
}));
const patzerAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_2__.createBotAlgorithm)(createComfuterBasedAlgorithm({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.Patzer,
    evaluate(moves, defaultBoard) {
        const baseEvaluations = _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_3__.comfuterAlgorithm.evaluate.call(this, moves, defaultBoard);
        for (const [move, evaluation] of baseEvaluations) {
            baseEvaluations.set(move, -evaluation);
        }
        return baseEvaluations;
    }
}));


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/MixedAlgorithms.ts":
/*!*****************************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/MixedAlgorithms.ts ***!
  \*****************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RanterAlgorithm": function() { return /* binding */ RanterAlgorithm; }
/* harmony export */ });
/* harmony import */ var _BotInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BotInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts");
/* harmony import */ var _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComfuterEvaluation */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluation.ts");
/* harmony import */ var _ComfuterEvaluationExtensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ComfuterEvaluationExtensions */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluationExtensions.ts");
/* harmony import */ var _RandomEvaluation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RandomEvaluation */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluation.ts");




const RanterAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_0__.createBotAlgorithm)((0,_ComfuterEvaluationExtensions__WEBPACK_IMPORTED_MODULE_2__.createComfuterBasedAlgorithm)({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_0__.ZombieType.Ranter,
    evaluate(...args) {
        if (Math.random() < 0.5) {
            return _RandomEvaluation__WEBPACK_IMPORTED_MODULE_3__.randoBotAlgorithm.evaluate.apply(this, args);
        }
        else
            return _ComfuterEvaluation__WEBPACK_IMPORTED_MODULE_1__.comfuterAlgorithm.evaluate.apply(this, args);
    }
}));


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluation.ts":
/*!******************************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluation.ts ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randoBotAlgorithm": function() { return /* binding */ randoBotAlgorithm; },
/* harmony export */   "randomlyPickNextChainedMoves": function() { return /* binding */ randomlyPickNextChainedMoves; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _BotInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BotInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts");


function randomlyPickNextChainedMoves(move, resultingMove = []) {
    const newMove = [...resultingMove, move];
    if (move.nextChainedMoves && (!move.isForcedContinuation && Math.random() > 0.5)) {
        return randomlyPickNextChainedMoves(move.nextChainedMoves[Math.floor(Math.random() * move.nextChainedMoves.length)], newMove);
    }
    else {
        if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyRequiredMove)(newMove))
            throw new Error("Required move length is 0");
        return newMove;
    }
}
const randoBotAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_1__.createBotAlgorithm)({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_1__.ZombieType.Rando,
    evaluate(moves, board) {
        const copyOfMoves = moves.slice();
        for (let i = moves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copyOfMoves[i], copyOfMoves[j]] = [moves[j], moves[i]];
        }
        const data = board.data, boardSquares = board.board;
        const zombieEatZombieMoves = [];
        const otherMoves = [];
        for (const move of copyOfMoves) {
            if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(move)) {
                const targetPiece = boardSquares[move.endCoordinates[1]][move.endCoordinates[0]];
                if (targetPiece.isPiece() && data.fenOptions.tag("resigned")[targetPiece.color]) {
                    zombieEatZombieMoves.push(move);
                    continue;
                }
            }
            otherMoves.push(move);
        }
        let startingEvaluation = 0;
        return new Map([
            ...otherMoves.reduce((p, n) => (p.push([n, --startingEvaluation]), p), []),
            ...zombieEatZombieMoves.reduce((p, n) => (p.push([n, --startingEvaluation / 2]), p), [])
        ]);
    },
    pickPreferredMove(evaluations) {
        return randomlyPickNextChainedMoves([...evaluations.entries()].reduce((p, n) => n[1] > p[1] ? n : p)[0]);
    }
});


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluationExtensions.ts":
/*!****************************************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluationExtensions.ts ***!
  \****************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkerAlgorithm": function() { return /* binding */ checkerAlgorithm; },
/* harmony export */   "createRandomBasedAlgorithm": function() { return /* binding */ createRandomBasedAlgorithm; },
/* harmony export */   "muncherAlgorithm": function() { return /* binding */ muncherAlgorithm; },
/* harmony export */   "pusherAlgorithm": function() { return /* binding */ pusherAlgorithm; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _BotInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BotInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts");
/* harmony import */ var _RandomEvaluation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RandomEvaluation */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluation.ts");




const createRandomBasedAlgorithm = (algorithm) => ({
    ...algorithm,
    pickPreferredMove(...args) {
        return _RandomEvaluation__WEBPACK_IMPORTED_MODULE_3__.randoBotAlgorithm.pickPreferredMove.apply(this, args);
    }
});
const checkerAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_2__.createBotAlgorithm)(createRandomBasedAlgorithm({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.Checker,
    evaluate(moves, board) {
        const baseEvaluations = _RandomEvaluation__WEBPACK_IMPORTED_MODULE_3__.randoBotAlgorithm.evaluate.call(this, moves, board);
        for (const [move, evaluation] of baseEvaluations) {
            const snapshot = board.createSnapshot();
            const { checks, checkmates } = board.makeMove([move]);
            if (checks.filter((c, i) => c && !checkmates[i] === c).length === 0) {
                baseEvaluations.set(move, evaluation / (evaluation / 2));
            }
            board.loadSnapshot(snapshot);
        }
        return baseEvaluations;
    }
}));
const muncherAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_2__.createBotAlgorithm)(createRandomBasedAlgorithm({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.Muncher,
    evaluate(moves, board) {
        const baseEvaluations = _RandomEvaluation__WEBPACK_IMPORTED_MODULE_3__.randoBotAlgorithm.evaluate.call(this, moves, board);
        for (const [move, evaluation] of baseEvaluations) {
            if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(move))
                continue;
            if (move.specialType === _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.SpecialMove.EnPassant
                || board.board[move.endCoordinates[0]][move.endCoordinates[1]].isEmpty())
                continue;
            baseEvaluations.set(move, evaluation / (evaluation / 2));
        }
        return baseEvaluations;
    }
}));
const pusherAlgorithm = (0,_BotInterface__WEBPACK_IMPORTED_MODULE_2__.createBotAlgorithm)(createRandomBasedAlgorithm({
    stringifiedType: _BotInterface__WEBPACK_IMPORTED_MODULE_2__.ZombieType.Pusher,
    evaluate(moves, board) {
        const baseEvaluations = _RandomEvaluation__WEBPACK_IMPORTED_MODULE_3__.randoBotAlgorithm.evaluate.call(this, moves, board);
        for (const [move, evaluation] of baseEvaluations) {
            if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(move))
                continue;
            const pieceString = board.board[move.startCoordinates[0]][move.startCoordinates[1]];
            if (pieceString.isPiece() && !_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) {
                baseEvaluations.set(move, evaluation / (evaluation / 2));
            }
        }
        return baseEvaluations;
    }
}));


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts ***!
  \***************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZombieType": function() { return /* binding */ ZombieType; },
/* harmony export */   "botAlgorithms": function() { return /* binding */ botAlgorithms; },
/* harmony export */   "createBotAlgorithm": function() { return /* binding */ createBotAlgorithm; },
/* harmony export */   "verifyZombieType": function() { return /* binding */ verifyZombieType; }
/* harmony export */ });
var ZombieType;
(function (ZombieType) {
    ZombieType["Rando"] = "rando";
    ZombieType["Futer"] = "comfuter";
    ZombieType["Ranter"] = "ranter";
    ZombieType["Patzer"] = "patzer";
    ZombieType["Pusher"] = "pusher";
    ZombieType["Checker"] = "checker";
    ZombieType["Muncher"] = "muncher";
    ZombieType["F_Pusher"] = "pusher_comfuter";
    ZombieType["F_Checker"] = "checker_comfuter";
    ZombieType["F_Muncher"] = "muncher_comfuter";
})(ZombieType || (ZombieType = {}));
const verifyZombieType = (zombieType) => zombieType in ZombieType;
const botAlgorithms = new Map();
function createBotAlgorithm(algorithm) {
    botAlgorithms.set(algorithm.stringifiedType, algorithm);
    return algorithm;
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/InsufficientMaterialGeneration.ts":
/*!*********************************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/InsufficientMaterialGeneration.ts ***!
  \*********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "countBitsOnBoard": function() { return /* binding */ countBitsOnBoard; },
/* harmony export */   "generateInsufficientMatingPieces": function() { return /* binding */ generateInsufficientMatingPieces; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _client_ts_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @client/ts/utils/NumberUtils */ "./src/main/client/ts/utils/NumberUtils.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _FENDataDecorators_StalemateOptions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../FENDataDecorators/StalemateOptions */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/StalemateOptions.ts");
/* harmony import */ var _PieceControlDecorators_PromotionRank__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../PieceControlDecorators/PromotionRank */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromotionRank.ts");









const binaryMasks = Array(_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension).fill(1).map((v, i) => v << _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension | v << (_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension - 1 - i));
const oneBitMask = 1 << _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension;
const maxSafeCheckingPieces = 9;
function countBitsOnBoard(board) {
    let setBits = 0;
    for (let x = 0; x < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; x++) {
        setBits += (0,_client_ts_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_4__.bitCount)(board[x] ^ oneBitMask);
    }
    return setBits;
}
function findMinimumOnBoardSquares(board) {
    let minimum = Infinity;
    for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; i++) {
        for (let j = 0; j < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; j++) {
            const setBits = countBitsOnBoard(board[i][j]);
            if (setBits !== 0 && setBits < minimum) {
                minimum = setBits;
            }
        }
    }
    return minimum;
}
function optimizePieceSet(possiblePieces, maximumTarget) {
    const optimalRoyalMoveSets = [
        ["β", "W", "R", "E", "M", "Q", "D", "A"],
        ["γ", "F", "B", "H", "M", "Q", "D", "A", "Δ"],
        ["Y", "Z"], ["I", "J"], ["S", "T"], ["S", "Y"], ["I", "Y"],
        ["U", "N", "O"], ["H", "A"], ["E", "A"], ["Δ", "H"], ["C", "L"], ["C", "V"]
    ];
    const moveSet = new Set();
    for (const optimalMoveSet of optimalRoyalMoveSets) {
        const detractionSet = maximumTarget ? optimalMoveSet.slice().reverse() : optimalMoveSet;
        for (const piece of possiblePieces) {
            if (detractionSet.includes(piece)) {
                const target = detractionSet.slice(0, -detractionSet.indexOf(piece)); // ! NOT A BUG
                target.forEach(t => { if (possiblePieces.includes(t) && (0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(t))
                    moveSet.add(t); });
                break;
            }
        }
    }
    if (moveSet.size === 0) {
        possiblePieces.forEach(p => { if ((0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(p))
            moveSet.add(p); });
    }
    return moveSet;
}
function generateInsufficientMatingPieces(baseBoard) {
    const board = baseBoard.createClone();
    // Step 1. Initialize the royals, get the optimal royal piece configuration.
    performance.mark("insufficientMaterialStart");
    const possibleRoyals = [[], [], [], []];
    const boardSquares = board.board, options = board.data, controls = board.controls, royals = options.fenOptions.tag("royal");
    const promotionPieces = board.variantData.promotionPieces || [];
    const promotionRank = board.variantData.promotionRank || _PieceControlDecorators_PromotionRank__WEBPACK_IMPORTED_MODULE_8__.disabledRank;
    royals.forEach((r, i) => {
        if (r) {
            const coordinate = boardSquares[r[0]][r[1]];
            if (_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[coordinate.piece].moveGenerationSettings.isPawn) {
                possibleRoyals[i] = [coordinate.piece, ...promotionPieces];
            }
            else
                possibleRoyals[i] = [coordinate.piece];
        }
        else if (promotionPieces.includes(_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.king)) {
            possibleRoyals[i] = [_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.defaultPieces.king];
        }
    });
    const royalPieceSets = Array.from({ length: 4 }, () => new Set());
    for (let i = 0; i < possibleRoyals.length; i++) {
        if (possibleRoyals[i].length > 1) {
            royalPieceSets[i] = optimizePieceSet(possibleRoyals[i], false);
        }
        else if (possibleRoyals[i].length === 1) {
            royalPieceSets[i].add(possibleRoyals[i][0]);
        }
    }
    // Step 2. Get all coordinates individual pieces can reach, for swift move generation.
    const boardDestinations = new Map();
    const emptyBoard = boardSquares.map(row => row.map(square => square.isWall() ? square : _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_6__.emptyPieceString));
    const walls = emptyBoard.map(row => row.map(square => square.isWall() ? true : false));
    const pieceMoveRegistry = {};
    const baseImmune = [false, false, false, false];
    const getAllSquaresRecursively = (x, y, piece) => {
        const currentSquares = new Set(), unvisitedSquares = new Set();
        if (!piece.isPiece())
            throw new TypeError(`Wrong piece signature detected at ${piece.value}`);
        const baseBuilder = controls[piece.piece]().setColor(piece.color).setBoard(emptyBoard).setBaseImmunePieces(baseImmune);
        const registryResult = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_3__.initializeBoardSquares)(() => new Uint16Array(_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension).fill(oneBitMask));
        const recurse = (x, y) => {
            const control = baseBuilder.setCoordinates(x, y).constructPieceControl();
            const moves = control.getPseudoLegalMoves();
            const moveLength = moves.length;
            if (moveLength === 0)
                return;
            for (let i = 0; i < moveLength; i++) {
                const move = moves[i].move;
                const moveString = (0,_moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__.stringifyCoordinate)(move);
                registryResult[x][y][move[0]] |= binaryMasks[move[1]];
                if (!currentSquares.has(moveString)) {
                    unvisitedSquares.add(moveString);
                }
            }
            for (const value of unvisitedSquares) {
                const [x, y] = value.split(":");
                if (!currentSquares.has(value)) {
                    currentSquares.add(value);
                    recurse(parseInt(x, 10), parseInt(y, 10));
                }
            }
        };
        recurse(x, y);
        if (!(piece.piece in pieceMoveRegistry))
            pieceMoveRegistry[piece.piece] = {};
        pieceMoveRegistry[piece.piece][Symbol()] = registryResult;
        const permutations = new Uint16Array(14).fill(oneBitMask);
        currentSquares.forEach(value => {
            const valueArr = value.split(":");
            permutations[parseInt(valueArr[0], 10)] |= binaryMasks[parseInt(valueArr[1], 10)];
        });
        unvisitedSquares.forEach(value => {
            const valueArr = value.split(":");
            permutations[parseInt(valueArr[0], 10)] |= binaryMasks[parseInt(valueArr[1], 10)];
        });
        return permutations;
    };
    function addToBoardDestinations(i, j, piece) {
        const permutations = getAllSquaresRecursively(i, j, piece);
        const boardPiece = boardDestinations.get(piece.piece);
        if (boardPiece) {
            boardDestinations.set(piece.piece, boardPiece.concat(permutations));
        }
        else {
            boardDestinations.set(piece.piece, [permutations]);
        }
    }
    for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; i++) {
        for (let j = 0; j < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; j++) {
            if (boardSquares[i][j].isPiece())
                addToBoardDestinations(i, j, boardSquares[i][j]);
        }
    }
    const hasPromotion = promotionRank !== _PieceControlDecorators_PromotionRank__WEBPACK_IMPORTED_MODULE_8__.disabledRank && promotionPieces.some(p => (0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(p));
    const promotionRanks = [_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension - promotionRank,
        promotionRank - 1, promotionRank - 1, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension - promotionRank];
    const optimizedPieces = optimizePieceSet(promotionPieces, true);
    if (hasPromotion) {
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
            for (let x = 0; x < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; x++) {
                const [i, j] = [color & 1 ? promotionRanks[color] : x, color & 1 ? x : promotionRanks[color]];
                if (walls[i][j])
                    continue;
                for (const piece of optimizedPieces) {
                    addToBoardDestinations(i, j, (0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_6__.createPieceFromData)(0, piece));
                }
            }
        }
    }
    const backwardsPieceRegistry = {};
    const entries = boardDestinations.entries();
    for (const [entry, uintArray] of entries) {
        if (/[βαγδPG]/.test(entry) || !(0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(entry))
            continue;
        let isAlwaysIntersecting = true;
        const permutationArray = [];
        for (const permutationEntry of uintArray) {
            if (permutationArray.length === 0) {
                permutationArray.push(permutationEntry);
            }
            else {
                const index = permutationArray.findIndex(uintArr => {
                    if (typeof uintArr !== "number")
                        return uintArr.every((n, j) => n === permutationEntry[j]);
                });
                if (~index) {
                    permutationArray.push(index);
                }
                else {
                    permutationArray.push(permutationEntry);
                    isAlwaysIntersecting = false;
                }
            }
        }
        if (isAlwaysIntersecting) {
            pieceMoveRegistry[entry] = {
                [Symbol()]: pieceMoveRegistry[entry][Object.getOwnPropertySymbols(pieceMoveRegistry[entry])[0]]
            };
        }
        else {
            if (!(entry in backwardsPieceRegistry)) {
                backwardsPieceRegistry[entry] = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_3__.initializeBoardSquares)(() => null);
            }
            const remappedSymbols = [];
            for (const squares of permutationArray) {
                let remappedSymbol;
                if (typeof squares === 'number') {
                    remappedSymbols.push(squares);
                    continue;
                }
                for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; i++) {
                    for (let j = 0; j < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; j++) {
                        if (squares[i] & binaryMasks[j] ^ oneBitMask) {
                            if (!remappedSymbol) {
                                remappedSymbol = Symbol();
                                remappedSymbols.push(remappedSymbol);
                            }
                            backwardsPieceRegistry[entry][i][j] ??= remappedSymbol;
                        }
                    }
                }
            }
            const uintValues = Object.getOwnPropertySymbols(pieceMoveRegistry[entry]).map(sym => pieceMoveRegistry[entry][sym]);
            pieceMoveRegistry[entry] = {};
            for (let i = 0; i < uintValues.length; i++) {
                const remapped = remappedSymbols[i];
                if (typeof remapped === 'number')
                    continue;
                if (typeof remapped === 'undefined')
                    break;
                pieceMoveRegistry[entry][remapped] = uintValues[i];
            }
        }
    }
    // Step 3. Generate the opposition squares for the royal pieces, since royal cannot attack each other.
    const royalMoves = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTuple)((0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_3__.initializeBoardSquares)(() => new Uint16Array(_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension).fill(oneBitMask)), _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
    const royalMoveMedians = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTuple)(0, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
    const oppositionDiagonalRowEchelon = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTuple)(undefined, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
    royals.forEach((r, x) => {
        if (r) {
            const royalPiece = boardSquares[r[0]][r[1]];
            const controlBuilder = controls[royalPiece.piece];
            const builder = controlBuilder().setColor(0).setBaseImmunePieces(baseImmune).setBoard(emptyBoard);
            const finalArray = Array.from({ length: 14 }, () => Array.from({ length: 14 }, () => new Uint16Array(14).fill(oneBitMask)));
            for (let i = 0; i < boardSquares.length; i++) {
                for (let j = 0; j < boardSquares[0].length; j++) {
                    if (emptyBoard[i][j].isWall())
                        continue;
                    const control = builder.setCoordinates(i, j).constructPieceControl();
                    const moves = control.getPseudoLegalMoves();
                    const permutationArray = new Uint16Array(14).fill(oneBitMask);
                    for (const { move } of moves) {
                        permutationArray[move[0]] |= binaryMasks[move[1]];
                    }
                    finalArray[i][j] = permutationArray;
                    royalMoves[x][i][j] = permutationArray;
                }
            }
            oppositionDiagonalRowEchelon[x] = finalArray;
        }
    });
    const oppositionMedians = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTupleFromCallback)(() => (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTuple)(0, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers), _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
    for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers; i++) {
        for (let j = 0; j < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers; j++) {
            if (i === j || oppositionDiagonalRowEchelon[i] === undefined)
                continue;
            const royalPieceA = royals[i], royalPieceB = royals[j];
            if (!royalPieceA || !royalPieceB)
                continue;
            const finalArray = Array.from({ length: 14 }, () => Array.from({ length: 14 }, () => 0));
            for (let i2 = 0; i2 < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; i2++) {
                for (let j2 = 0; j2 < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; j2++) {
                    if (emptyBoard[i2][j2].isWall())
                        continue;
                    const jjIndex = oppositionDiagonalRowEchelon[j];
                    const iiIndex = oppositionDiagonalRowEchelon[i];
                    if (!jjIndex || !iiIndex)
                        throw new Error(`Central opposition matrix indexes are undefined: ${jjIndex?.toString() ?? "undefined"}  ${iiIndex?.toString() ?? "undefined"}`);
                    if (jjIndex[i2][j2][royalPieceA[1]] & binaryMasks[royalPieceA[0]] ^ oneBitMask
                        && iiIndex[i2][j2][royalPieceB[1]] & binaryMasks[royalPieceB[0]] ^ oneBitMask) {
                        continue;
                    }
                    const uintArray = jjIndex[i2][j2].map((e, x) => e & iiIndex[i2][j2][x]);
                    let newResultingSquares = 0;
                    for (let dimSquare = 0; dimSquare < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; dimSquare++) {
                        newResultingSquares += (0,_client_ts_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_4__.bitCount)(uintArray[dimSquare]) - 1;
                    }
                    finalArray[i2][j2] = newResultingSquares;
                }
            }
            let minimum = Infinity;
            for (let i2 = 0; i2 < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; i2++) {
                for (let j2 = 0; j2 < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.boardDimension; j2++) {
                    if (finalArray[i2][j2] !== 0 && finalArray[i2][j2] < minimum) {
                        minimum = finalArray[i2][j2];
                    }
                }
            }
            oppositionMedians[i][j] = minimum - 1;
        }
    }
    for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
        royalMoveMedians[color] = findMinimumOnBoardSquares(royalMoves[color]);
    }
    // Step 4. Finally, generate all squares pieces can cover from default royal moves for each player.
    const nonIndexedPieceSymbol = Symbol();
    const pieceSquareMedians = {
        [_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.grasshopperPieceLetter]: { [nonIndexedPieceSymbol]: [2, 2, 2, 2] }
    };
    let currentMessages = 0, requiredMessages = 0;
    for (const pieceLetter in pieceMoveRegistry) {
        if (!(0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(pieceLetter) || !Object.prototype.hasOwnProperty.call(pieceMoveRegistry, pieceLetter))
            continue;
        if (pieceLetter in pieceSquareMedians)
            continue;
        pieceSquareMedians[pieceLetter] = {};
        const registeredSymbols = Object.getOwnPropertySymbols(pieceMoveRegistry[pieceLetter]);
        for (const registeredSymbol of registeredSymbols) {
            const pieceMedianCounter = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(1), __webpack_require__.b));
            pieceMedianCounter.postMessage({
                walls,
                moveRegistryArray: pieceMoveRegistry[pieceLetter][registeredSymbol].map(r => r.map(uint => uint.buffer)),
                royalMoves: royalMoves.map(board => board.map(r => r.map(uint => uint.buffer))),
                royalPieceSet: royalPieceSets.map(s => [...s])
            });
            requiredMessages++;
            pieceMedianCounter.onmessage = (e) => {
                pieceSquareMedians[pieceLetter][registeredSymbol] = e.data;
                currentMessages++;
            };
        }
    }
    const obtainPieceSymbolFromCoordinate = (board, coordinate) => {
        const piece = board.board[coordinate[0]][coordinate[1]];
        if (_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn && hasPromotion) {
            const availableSymbols = [...optimizedPieces]
                .filter(p => (0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.verifyPieceLetter)(p)
                && !_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[p].moveGenerationSettings.isPawn).map(p => pieceSquareMedians[p]);
            if (availableSymbols.length === 0) {
                return { selectedSymbol: nonIndexedPieceSymbol, piece };
            }
            else {
                const candidates = availableSymbols.map(s => {
                    return s[Object.getOwnPropertySymbols(s)[0]].reduce((p, n) => p + (n ?? 0), 0);
                });
                const candidateIndex = candidates.indexOf(Math.max(...candidates));
                const symbol = Object.getOwnPropertySymbols(availableSymbols[candidateIndex])[0];
                return {
                    selectedSymbol: symbol,
                    piece
                };
            }
        }
        else {
            const availableSymbols = Object.getOwnPropertySymbols(pieceSquareMedians[piece.piece]);
            const selectedSymbol = availableSymbols.length === 1
                ? availableSymbols[0]
                : backwardsPieceRegistry[piece.piece][coordinate[0]][coordinate[1]];
            (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.assertNonUndefined)(selectedSymbol);
            return { selectedSymbol, piece };
        }
    };
    const noRoyalsToMate = board.variantData.forcedCapture
        || board.variantData.captureTheKing || board.variantData.barePieceRule
        || board.variantData.nCheck;
    return (board) => {
        const fenOptions = board.data.fenOptions;
        const areBanksEnabled = fenOptions.tag("areBanksEnabled"), dead = fenOptions.tag("dead"), royal = fenOptions.tag("royal");
        const pieces = board.getPlayerPieces();
        const resultingInsufficientPieces = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
        if (board.variantData.kingOfTheHill || currentMessages !== requiredMessages
            || areBanksEnabled.some((b, i) => !dead[i] && b)) {
            return resultingInsufficientPieces;
        }
        const extraWalls = board.board.reduce((accumulator, row, i) => {
            return accumulator + row.reduce((accumulator, square, j) => {
                if (square.isWall() && !walls[i][j]) {
                    return accumulator + 1;
                }
                else
                    return accumulator;
            }, 0);
        }, 0);
        const royalPieceMedians = royalMoveMedians.map((median, i) => {
            if (!royal[i])
                return;
            let minimumMedian;
            if (board.variantData.stalemateOptions === _FENDataDecorators_StalemateOptions__WEBPACK_IMPORTED_MODULE_7__.stalemateOptionsValues.stalemateLoses) {
                minimumMedian = 1;
                median--;
            }
            else {
                median++;
                minimumMedian = 2;
            }
            median -= extraWalls;
            if (median < minimumMedian)
                median = minimumMedian;
            return median;
        });
        const squaresPlayerCanOutrange = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTupleFromCallback)(() => (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_2__.createTuple)(0, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers), _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers);
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
            const army = pieces[color];
            if (army.length > maxSafeCheckingPieces || dead[color])
                continue;
            for (const royalColor of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
                if (pieces[royalColor].length > maxSafeCheckingPieces
                    || color === royalColor || dead[royalColor])
                    continue;
                if (!royal[royalColor] || noRoyalsToMate) {
                    intersectionCheckLoop: for (const coordinate of army) {
                        const { piece, selectedSymbol } = obtainPieceSymbolFromCoordinate(board, coordinate);
                        const symbolsLength = Object.getOwnPropertySymbols(pieceSquareMedians[piece.piece]).length;
                        if (symbolsLength > 1 || _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[piece.piece].moveGenerationSettings.isColorBound) {
                            for (const enemyCoordinate of pieces[royalColor]) {
                                const { selectedSymbol: enemySymbol } = obtainPieceSymbolFromCoordinate(board, enemyCoordinate);
                                if (selectedSymbol === enemySymbol) {
                                    squaresPlayerCanOutrange[royalColor][color] = Infinity;
                                    break intersectionCheckLoop;
                                }
                            }
                        }
                        else {
                            squaresPlayerCanOutrange[royalColor][color] = Infinity;
                            break;
                        }
                    }
                    if (squaresPlayerCanOutrange[royalColor][color] !== Infinity) {
                        squaresPlayerCanOutrange[royalColor][color] = -1;
                    }
                }
                else {
                    const royalSquares = royalPieceMedians[royalColor];
                    if (royalSquares === undefined)
                        continue;
                    const fenRoyal = royal[color];
                    const currentColorBounds = [];
                    for (const coordinate of army) {
                        if (fenRoyal && (0,_moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__.compareCoordinates)(coordinate, fenRoyal)) {
                            if (board.variantData.royalsCannotCapture) {
                                squaresPlayerCanOutrange[color][royalColor]++;
                            }
                            else {
                                squaresPlayerCanOutrange[color][royalColor] += oppositionMedians[color][royalColor];
                            }
                        }
                        else {
                            const { piece, selectedSymbol } = obtainPieceSymbolFromCoordinate(board, coordinate);
                            if (hasPromotion && _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[piece.piece].moveGenerationSettings.isPawn) {
                                const medians = promotionPieces.map(piece => {
                                    const subSymbol = Object.getOwnPropertySymbols(pieceSquareMedians[piece])[0];
                                    return pieceSquareMedians[piece][subSymbol][royalColor] ?? 0;
                                });
                                squaresPlayerCanOutrange[color][royalColor] += Math.max(...medians);
                            }
                            else {
                                if (_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[piece.piece].moveGenerationSettings.isColorBound) {
                                    if (currentColorBounds.includes(selectedSymbol))
                                        continue;
                                    currentColorBounds.push(selectedSymbol);
                                }
                                squaresPlayerCanOutrange[color][royalColor] += pieceSquareMedians[piece.piece][selectedSymbol][royalColor] ?? 0;
                            }
                        }
                    }
                    squaresPlayerCanOutrange[color][royalColor] += pieces[royalColor].length - 1;
                }
            }
        }
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.colors) {
            if (dead[color])
                continue;
            let sum = 0;
            for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_5__.totalPlayers; i++) {
                if (i === color)
                    continue;
                sum += squaresPlayerCanOutrange[i][color];
            }
            const royal = royalPieceMedians[color];
            if ((royal !== undefined && sum <= royal && pieces[color].length <= maxSafeCheckingPieces)
                || sum < 0) {
                resultingInsufficientPieces[color] = true;
            }
        }
        return resultingInsufficientPieces;
    };
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/PieceMedianCounter.ts":
/*!*********************************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/PieceMedianCounter.ts ***!
  \*********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @client/ts/utils/ArrayUtils */ "./src/main/client/ts/utils/ArrayUtils.ts");
/* harmony import */ var _InsufficientMaterialGeneration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InsufficientMaterialGeneration */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/InsufficientMaterialGeneration.ts");






self.onmessage = (e) => {
    const { walls, royalPieceSet, royalMoves, moveRegistryArray } = e.data;
    const resultingMedianArray = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => 0), _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.totalPlayers);
    for (let i = 0; i < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; i++) {
        for (let j = 0; j < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; j++) {
            if (walls[i][j])
                continue;
            const moves = new Uint16Array(moveRegistryArray[i][j]);
            for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.colors) {
                if (royalPieceSet[color].length === 0) {
                    resultingMedianArray[color] = undefined;
                    continue;
                }
                else {
                    let resultingSquares = 0;
                    for (const royal of royalPieceSet[color]) {
                        if (!(0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_3__.verifyPieceLetter)(royal))
                            continue;
                        for (let royalI = 0; royalI < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; royalI++) {
                            for (let royalJ = 0; royalJ < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.boardDimension; royalJ++) {
                                const royalMoveSet = new Uint16Array(royalMoves[color][royalI][royalJ]);
                                const result = moves.map((e, x) => e & royalMoveSet[x]);
                                const newResultingSquares = (0,_InsufficientMaterialGeneration__WEBPACK_IMPORTED_MODULE_5__.countBitsOnBoard)(result);
                                if (newResultingSquares > resultingSquares) {
                                    resultingSquares = newResultingSquares;
                                }
                            }
                        }
                    }
                    const resultingMedian = resultingMedianArray[color];
                    if (resultingMedian)
                        resultingMedian[i][j] = resultingSquares;
                }
            }
        }
    }
    postMessage(resultingMedianArray.map(arr => {
        if (arr) {
            const minimum = (0,_client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_4__.countMinimumOf2DArrayExcludingZero)(arr);
            return minimum === Infinity ? 0 : minimum;
        }
        else
            return arr;
    }));
};


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Atomic.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Atomic.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Atomic": function() { return /* binding */ Atomic; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _PieceControlDecorators_RoyalsCannotCapture__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../PieceControlDecorators/RoyalsCannotCapture */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/RoyalsCannotCapture.ts");






const tag = "atomic";
class Atomic extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(Atomic);
    }
    dependencies = new Map([[_PieceControlDecorators_RoyalsCannotCapture__WEBPACK_IMPORTED_MODULE_5__.RoyalsCannotCapture, []]]);
    static atomicCoordinates = [[-1, -1], [-1, 0], [0, -1], [-1, 1], [1, -1], [1, 0], [0, 1], [1, 1]];
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_2__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Atomic",
                description: "Captures cause all surrounding pieces except pawns to explode",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__.variantRuleColors.extending,
                displayIcon: "ύ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Atomic$/i.test(match);
    }
    serializeToParsingForm() {
        return "Atomic";
    }
    isDisabled() {
        return false;
    }
    isComplexEvaluation() {
        return true;
    }
    getCapturedPieces(moveData) {
        const baseCoordinates = this.callHandler("getCapturedPieces", arguments);
        const addCoordinate = (disI, disJ) => {
            const coordinateI = moveData.endCoordinates[0] + disI;
            const coordinateJ = moveData.endCoordinates[1] + disJ;
            if (coordinateI >= 0 && coordinateI <= _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension
                && coordinateJ >= 0 && coordinateJ <= _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.boardDimension) {
                const pieceString = this.decorator.board.board[coordinateI][coordinateJ];
                if ((pieceString.isPiece() || pieceString.isDead())
                    && !_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) {
                    baseCoordinates.push([coordinateI, coordinateJ]);
                }
            }
        };
        if (baseCoordinates.length !== 0) {
            for (const [i, j] of Atomic.atomicCoordinates) {
                addCoordinate(i, j);
            }
            baseCoordinates.push([...moveData.startCoordinates]);
        }
        return baseCoordinates;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/DeadKingWalking.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/DeadKingWalking.ts ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeadKingWalking": function() { return /* binding */ DeadKingWalking; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_FENData_FENData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _moveGeneration_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @moveGeneration/VariantRules/VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _moveGeneration_VariantRules_VariantRuleInterface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @moveGeneration/VariantRules/VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");








const tag = "deadKingWalking";
class DeadKingWalking extends _moveGeneration_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_6__.VariantRule {
    static {
        _moveGeneration_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_6__.VariantRule.initVariantRule(DeadKingWalking);
    }
    getDecoratorType() { return _moveGeneration_FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Dead King Walking",
                description: "Resigned players are controlled by a bot",
                tag,
                color: _moveGeneration_VariantRules_VariantRuleInterface__WEBPACK_IMPORTED_MODULE_7__.variantRuleColors.autogenous,
                displayIcon: ""
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^DeadKingWalking$/i.test(match);
    }
    serializeToParsingForm() {
        return "DeadKingWalking";
    }
    isDisabled({ variantDataRules, gameType, fenTags }) {
        return gameType === _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.VariantType.Teams
            || fenTags.dead.value.reduce((p, n, i) => p + (Number(n || fenTags.resigned.value[i])), 0) <= _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers - 1
            || variantDataRules.pointsForMate !== false && variantDataRules.pointsForMate < 6;
    }
    processInternalMove(internalMove) {
        if (internalMove.type === _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.InternalMoveSignature.Resign
            || internalMove.type === _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.InternalMoveSignature.ClaimWin
            || internalMove.type === _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.InternalMoveSignature.Timeout) {
            const { sideToMove, fenOptions, board } = this.decorator;
            const dead = fenOptions.tag("dead"), resigned = fenOptions.tag("resigned");
            resigned[sideToMove] = true;
            dead[sideToMove] = true;
            for (const coordinate of board.getPlayerPieces()[sideToMove]) {
                const piece = board.board[coordinate[0]][coordinate[1]].piece;
                if (_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_5__.pieceControlConfigSettings[piece].moveGenerationSettings.isPawn) {
                    board.board[coordinate[0]][coordinate[1]] = (0,_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.createPieceFromData)(_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.deadColorIndex, piece);
                }
            }
            const deadPlayers = dead.map((d, i) => d || resigned[i]).filter(Boolean);
            if (deadPlayers.length === _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers - 1) {
                const alivePlayer = deadPlayers.findIndex(d => !d);
                if ((0,_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_2__.verifyNumericColor)(alivePlayer)) {
                    this.decorator.assignPoints(alivePlayer, this.decorator.countTotalPointsOnBoard()
                        .reduce((p, n, i) => p + (i === alivePlayer ? n : 0), 0));
                }
            }
            return { stalemates: [false, false, false, false] };
        }
        else
            return this.callHandler("processInternalMove", arguments);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/EnPassant.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/EnPassant.ts ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnPassant": function() { return /* binding */ EnPassant; }
/* harmony export */ });
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");









const tag = "enPassant";
class EnPassant extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(EnPassant);
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "En Passant",
                description: "Pawns can capture en passant",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__.variantRuleColors.minor,
                displayIcon: "ἣ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^EnPassant$/i.test(match);
    }
    serializeToParsingForm() {
        return "EnPassant";
    }
    isDisabled() {
        return false;
    }
    processStandardMove(moveData) {
        const enPassants = this.decorator.fenOptions.tag("enPassant");
        const { startCoordinates: [startI, startJ], endCoordinates: [endI, endJ] } = moveData;
        if (moveData.specialType === _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.SpecialMove.EnPassant) {
            const eligibleEnPassants = [];
            enPassants.forEach((e, i) => {
                if (!e)
                    return;
                if (e[0][0] === endI && e[0][1] === endJ)
                    eligibleEnPassants.push(i);
            });
            for (const enPassantCoordinate of eligibleEnPassants) {
                const enPassant = enPassants[enPassantCoordinate];
                (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_7__.assertNonUndefined)(enPassant);
                this.decorator.board.board[enPassant[1][0]][enPassant[1][1]] = _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_2__.emptyPieceString;
                enPassants[enPassantCoordinate] = null;
            }
        }
        else {
            const pieceString = this.decorator.board.board[startI][startJ];
            if (!pieceString.isEmpty() && pieceString.piece !== _GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_6__.nonPlayablePieces.duck) {
                enPassants[this.decorator.sideToMove] = null;
                const setting = _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_5__.pieceControlConfigSettings[pieceString.piece];
                if (setting.moveGenerationSettings.isPawn
                    && Math.abs((0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_8__.isVerticalPlacement)(this.decorator.sideToMove) ? startI - endI : startJ - endJ) === 2) {
                    const enPassantInfo = [
                        [Math.ceil((startI + endI) / 2), Math.ceil((startJ + endJ) / 2)],
                        [endI, endJ]
                    ];
                    enPassants[this.decorator.sideToMove] = enPassantInfo;
                }
            }
        }
        return this.callHandler("processStandardMove", arguments);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FatalCapture.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FatalCapture.ts ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FatalCapture": function() { return /* binding */ FatalCapture; }
/* harmony export */ });
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _PieceControlDecorators_RoyalsCannotCapture__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../PieceControlDecorators/RoyalsCannotCapture */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/RoyalsCannotCapture.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");









const tag = "fatalCapture";
class FatalCapture extends _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_4__.VariantRule.initVariantRule(FatalCapture);
    }
    dependencies = new Map([[_PieceControlDecorators_RoyalsCannotCapture__WEBPACK_IMPORTED_MODULE_6__.RoyalsCannotCapture, []]]);
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Fatal Capture",
                description: "Pieces (but not pawns) die when they capture",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_5__.variantRuleColors.extending,
                displayIcon: "•"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^FatalCapture$/i.test(match);
    }
    serializeToParsingForm() {
        return "FatalCapture";
    }
    isDisabled() {
        return false;
    }
    affectOptions(move) {
        let endCaptureCoordinates;
        if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_8__.verifyStandardMove)(move)) {
            const { startCoordinates: [startI, startJ], endCoordinates: [endI, endJ] } = move;
            const isCapture = this.decorator.board.board[endI][endJ].isPiece();
            const royal = this.decorator.fenOptions.tag("royal")[this.decorator.sideToMove];
            if (royal && startI === royal[0] && startJ === royal[1] && isCapture) {
                return {
                    checkmates: this.decorator.board.gameType.getBaseColors(this.decorator.sideToMove),
                    checks: (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.totalPlayers), stalemates: (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.totalPlayers)
                };
            }
            endCaptureCoordinates = isCapture ? move.endCoordinates : undefined;
        }
        const returnType = this.callHandler("affectOptions", arguments);
        if (endCaptureCoordinates) {
            const pieceString = this.decorator.board.board[endCaptureCoordinates[0]][endCaptureCoordinates[1]];
            if (!_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_7__.pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) {
                this.decorator.board.board[endCaptureCoordinates[0]][endCaptureCoordinates[1]] = (0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.createPieceFromData)(_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.deadColorIndex, this.decorator.board.board[endCaptureCoordinates[0]][endCaptureCoordinates[1]].piece);
            }
        }
        return returnType;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FiftyMoveRule.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FiftyMoveRule.ts ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FiftyMoveRule": function() { return /* binding */ FiftyMoveRule; }
/* harmony export */ });
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");



const tag = "fiftyMoveRule";
class FiftyMoveRule extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(FiftyMoveRule);
    }
    totalFullMoves;
    constructor(fullMoves) {
        super();
        if (typeof fullMoves === 'number' && fullMoves > 0) {
            this.totalFullMoves = fullMoves;
        }
        else {
            this.totalFullMoves = 50;
        }
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData; }
    getPublicProperties() {
        const isDisabled = this.totalFullMoves === Infinity;
        return {
            parameterValue: this.totalFullMoves,
            information: {
                name: isDisabled ? "50 move rule disabled" : `${this.totalFullMoves} move rule`,
                textualForm: "",
                description: isDisabled ? "50 move rule disabled" : `After ${this.totalFullMoves} full moves without captures or pawn pushes game is over`,
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^FiftyMoveRule=((?:\d+)|(?:Infinity))$/i);
        if (matchArray) {
            this.totalFullMoves = Number(matchArray[1]);
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `FiftyMoveRule=${this.totalFullMoves}`;
    }
    isDisabled() {
        return false;
    }
    processStandardMove(moveData) {
        if (this.decorator.getCapturedPieces(moveData).length > 0) {
            this.decorator.plyCount = 0;
        }
        return this.callHandler("processStandardMove", arguments);
    }
    affectOptions(move) {
        const results = this.callHandler("affectOptions", arguments);
        if (move.isIrreversible) {
            this.decorator.plyCount = 0;
        }
        else {
            this.decorator.plyCount++;
        }
        const alivePlayers = _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers - this.decorator.fenOptions.tag("dead").filter(Boolean).length;
        if (alivePlayers > 0 && Math.floor(this.decorator.plyCount / alivePlayers) > this.totalFullMoves) {
            this.decorator.assignGeneralTermination("50-move Rule");
            this.injectIntoBaseClass(function () {
                this.spreadPointsBetweenPlayersEvenly();
            })();
        }
        return results;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Giveaway.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Giveaway.ts ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Giveaway": function() { return /* binding */ Giveaway; }
/* harmony export */ });
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _BoardDecorators_ForcedCapture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BoardDecorators/ForcedCapture */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ForcedCapture.ts");
/* harmony import */ var _StalemateOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StalemateOptions */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/StalemateOptions.ts");






const tag = "giveaway";
class Giveaway extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(Giveaway);
    }
    static pointsForPiece = 3;
    static stalematePoints = {
        [1]: 200, [2]: 400, [3]: 600
    };
    dependencies = new Map([[_BoardDecorators_ForcedCapture__WEBPACK_IMPORTED_MODULE_4__.ForcedCapture, []], [_StalemateOptions__WEBPACK_IMPORTED_MODULE_5__.StalemateOptions, [_StalemateOptions__WEBPACK_IMPORTED_MODULE_5__.stalemateOptionsValues.stalemateWins]]]);
    initiallyAliveColors = _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers;
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Giveaway",
                description: "First to lose all pieces or stalemate wins",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.widespread,
                displayIcon: "Ὅ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Giveaway$/i.test(match);
    }
    serializeToParsingForm() {
        return "Giveaway";
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.taboo;
    }
    initDecoratorSettings() {
        this.decorator.fenOptions.setTag("royal", [null, null, null, null]);
        this.initiallyAliveColors = this.decorator.fenOptions.tag("dead")
            .map((d, i) => d || this.decorator.fenOptions.tag("resigned")[i])
            .filter(Boolean).length;
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
    processStandardMove(moveData) {
        const capturedPieces = this.decorator.getCapturedPieces(moveData);
        const board = this.decorator.board.board;
        for (const capturedPiece of capturedPieces) {
            const pieceString = board[capturedPiece[0]][capturedPiece[1]];
            if (pieceString.isPiece()) {
                this.assignPoints(pieceString.color, Giveaway.pointsForPiece, true);
            }
        }
        this.callHandler("processStandardMove", arguments);
        return { endPiece: [] };
    }
    affectOptions() {
        const returnType = this.callHandler("affectOptions", arguments);
        this.decorator.fenOptions.setTag("royal", [null, null, null, null]);
        return returnType;
    }
    obtainPointsForMate() {
        const aliveColors = this.decorator.fenOptions.tag("dead").filter(Boolean).length;
        switch (aliveColors) {
            case 1:
                if (this.initiallyAliveColors === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers) {
                    return Giveaway.stalematePoints[1];
                }
            // * Fallthrough
            case 2:
                if (this.initiallyAliveColors >= _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers - 1) {
                    return Giveaway.stalematePoints[2];
                }
            // * Fallthrough
            case 3:
                return Giveaway.stalematePoints[3];
            default:
                console.error(`Unexpected players length ${aliveColors}`);
                return 0;
        }
    }
    assignPoints(sideToMove, points, isGiveawayAssigned = false) {
        if (isGiveawayAssigned) {
            for (const decorator of this.wrappingDecorators) {
                if (decorator.assignPoints) {
                    decorator.assignPoints(sideToMove, points);
                    return;
                }
            }
            _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData.prototype.assignPoints.call(this.decorator, sideToMove, points);
        }
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/KingOfTheHill.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/KingOfTheHill.ts ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KingOfTheHill": function() { return /* binding */ KingOfTheHill; }
/* harmony export */ });
/* harmony import */ var _client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/utils/ArrayUtils */ "./src/main/client/ts/utils/ArrayUtils.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _client_ts_logic_utils_Tags_Utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @client/ts/logic/utils/Tags/Utils */ "./src/main/client/ts/logic/utils/Tags/Utils.ts");








const tag = "kingOfTheHill";
class KingOfTheHill extends _VariantRule__WEBPACK_IMPORTED_MODULE_5__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_5__.VariantRule.initVariantRule(KingOfTheHill);
    }
    static defaultCoordinates = [[7, 7], [7, 6], [6, 7], [6, 6]];
    static defaultRoyal = "K";
    hillSquares;
    constructor(hillSquares) {
        super();
        if (Array.isArray(hillSquares) && hillSquares.every((c) => Array.isArray(c) && c.length === 2 && c.every(n => typeof n === 'number'))) {
            this.hillSquares = hillSquares;
        }
        else {
            this.hillSquares = KingOfTheHill.defaultCoordinates;
        }
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_2__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: this.hillSquares,
            information: {
                name: "King of the Hill",
                description: "A king reaching the hill will checkmate all opponents",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_6__.variantRuleColors.autogenous,
                displayIcon: "Ī"
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.toLowerCase().match(/^KotH(?:=(.+))?$/i);
        if (matchArray) {
            if (matchArray[1]) {
                const coordinatesArray = [];
                const presumedOption = matchArray[1].split(",");
                for (const coordinate of presumedOption) {
                    const parsedCoordinate = (0,_client_ts_logic_utils_Tags_Utils__WEBPACK_IMPORTED_MODULE_7__.parseSingleCoordinate)(coordinate);
                    if (parsedCoordinate) {
                        coordinatesArray.push(parsedCoordinate);
                    }
                }
                if (coordinatesArray.length > 0) {
                    this.hillSquares = coordinatesArray;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        if ((0,_client_ts_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_0__.compareArrays)(this.hillSquares, KingOfTheHill.defaultCoordinates)) {
            return "KotH";
        }
        else {
            return `KotH=${this.hillSquares.map(c => (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.convertCoordinateToPGN4)(c)).join(",")}`;
        }
    }
    isDisabled() {
        return false;
    }
    affectOptions() {
        const { board, sideToMove, fenOptions } = this.decorator;
        const returnValues = this.callHandler("affectOptions", arguments);
        const royal = fenOptions.tag("royal")[sideToMove], dead = fenOptions.tag("dead"), wb = fenOptions.tag("wb");
        if (board.variantData.giveaway && this.hillSquares.some(c => {
            const pieceString = board.board[c[0]][c[1]];
            return pieceString.isPiece() && pieceString.piece === KingOfTheHill.defaultRoyal;
        })) {
            this.decorator.processInternalMove({ type: _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.InternalMoveSignature.Stalemate });
            returnValues.stalemates[sideToMove] = true;
        }
        else if (royal && this.hillSquares.some(c => (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.compareCoordinates)(c, royal))) {
            const pointsForMate = this.decorator.obtainPointsForMate();
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                if (color === sideToMove)
                    continue;
                if (!dead[color]) {
                    dead[color] = true;
                    this.decorator.assignPoints(sideToMove, pointsForMate);
                }
            }
            if (this.decorator.board.variantData.taboo) {
                this.decorator.gameOver = `${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.getPlayerNameFromColor)(sideToMove, wb).toUpperCase()} WON THE RACE!`;
            }
            else {
                this.decorator.assignGeneralTermination("King of the Hill");
            }
        }
        return returnValues;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/NCheck.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/NCheck.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NCheck": function() { return /* binding */ NCheck; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _FENData_FENDataInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../FENData/FENDataInterface */ "./src/main/client/ts/logic/movegen/FENData/FENDataInterface.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");







const tag = "nCheck";
class NCheck extends _VariantRule__WEBPACK_IMPORTED_MODULE_6__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_6__.VariantRule.initVariantRule(NCheck);
    }
    defaultChecks;
    constructor(defaultChecks) {
        super();
        if (Array.isArray(defaultChecks) && (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(defaultChecks, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers)
            && defaultChecks.every((check) => typeof check === 'number')) {
            this.defaultChecks = defaultChecks;
        }
        else {
            this.defaultChecks = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(3, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers);
        }
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_2__.FENData; }
    getPublicProperties() {
        const checks = this.defaultChecks.filter(Boolean).reduce((p, n, i, arr) => p + (arr[i - 1] === arr[i] ? "" : `-${n}`), "").slice(1);
        return {
            parameterValue: this.defaultChecks,
            information: {
                name: `${checks}-Check`,
                textualForm: `${checks}+`,
                description: `Checking a king ${checks} times is checkmate`,
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.toLowerCase().match(/^(\d\d?\d?(?:-\d\d?\d?){0,3})-check$/i);
        if (matchArray) {
            const checks = matchArray[1].split("-");
            for (let i = 0; i <= checks.length; i++) {
                if (checks[i]) {
                    this.defaultChecks[i] = Number(checks[i]);
                }
                else {
                    while (i !== _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers) {
                        this.defaultChecks[i] = this.defaultChecks[i - 1];
                        i++;
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `${this.defaultChecks.join("-")}-check`;
    }
    isDisabled({ variantDataRules }) {
        return variantDataRules.giveaway;
    }
    initDecoratorSettings() {
        const lives = this.decorator.fenOptions.tag("lives");
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
            if (lives[color] === null) {
                lives[color] = this.defaultChecks[color];
            }
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
    affectOptions(move, settings = (0,_FENData_FENDataInterface__WEBPACK_IMPORTED_MODULE_3__.createDefaultFENEffectSettings)()) {
        const { board, sideToMove } = this.decorator;
        const currentChecks = board.getCurrentChecks().map(arr => new Set(arr));
        const isNCheckValidated = !settings.ignoreCheckmateChecks && !settings.ignoreNextTurn;
        const royal = this.decorator.fenOptions.tag("royal"), lives = this.decorator.fenOptions.tag("lives");
        const results = this.callHandler("affectOptions", arguments);
        const isStandardMove = (0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_5__.verifyStandardMove)(move);
        if (isNCheckValidated) {
            const updatedChecks = board.getCurrentChecks(sideToMove);
            const playerChecks = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(0, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.totalPlayers);
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
                for (const coordinate of updatedChecks[color]) {
                    const royalPiece = royal[color];
                    if (!currentChecks[color].has(coordinate)
                        || (royalPiece && isStandardMove
                            && (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_1__.compareCoordinates)(move.endCoordinates, royalPiece))) {
                        playerChecks[color]++;
                    }
                }
            }
            if (lives.every((live) => live !== null)) {
                for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.colors) {
                    lives[color] -= playerChecks[color];
                    if (lives[color] <= 0) {
                        this.decorator.assignPoints(sideToMove, this.decorator.obtainPointsForMate());
                        this.decorator.turnPiecesDead(color);
                        lives[color] = 0;
                    }
                }
            }
            if (this.decorator.getRealPlayers() > 1) {
                this.decorator.sideToMove = this.decorator.nextTurn(sideToMove);
                board.pregenerateAttacks();
            }
        }
        return results;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/OppositeMultiplier.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/OppositeMultiplier.ts ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OppositeMultiplier": function() { return /* binding */ OppositeMultiplier; }
/* harmony export */ });
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");




const tag = "oppositeMultiplier";
class OppositeMultiplier extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(OppositeMultiplier);
    }
    oppositeMultiplierValue = 2;
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: this.oppositeMultiplierValue,
            information: {
                name: "Opposite's piece value",
                textualForm: `Ox${this.oppositeMultiplierValue}`,
                description: `Opposite's pieces are worth ${this.oppositeMultiplierValue} times their normal points value until one player is eliminated`,
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.toLowerCase().match(/^OppX=(2|3|4|5|6)$/i);
        if (matchArray) {
            this.oppositeMultiplierValue = Number(matchArray[1]);
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `OppX=${this.oppositeMultiplierValue}`;
    }
    isDisabled({ variantDataRules, gameType, fenTags }) {
        return gameType === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.VariantType.Teams
            || variantDataRules.giveaway
            || fenTags.dead.value.reduce((p, n, i) => p + (Number(n || fenTags.resigned.value[i])), 0) <= _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers - 1;
    }
    getPointsForPiece(pieceString) {
        const dead = this.decorator.fenOptions.tag("dead"), resigned = this.decorator.fenOptions.tag("resigned");
        const aliveColors = dead.map((d, i) => d || resigned[i]).filter(Boolean).length;
        if (aliveColors === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers && pieceString.isPiece()
            && pieceString.color === (0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.getOppositePlacedColor)(this.decorator.sideToMove)) {
            return _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_2__.pieceControlConfigSettings[pieceString.piece].points.singlesPoints * this.oppositeMultiplierValue;
        }
        else
            return this.callHandler("getPointsForPiece", arguments);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/OppositeSideCastling.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/OppositeSideCastling.ts ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OppositeSideCastling": function() { return /* binding */ OppositeSideCastling; }
/* harmony export */ });
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");





const tag = "oppositeSideCastling";
class OppositeSideCastling extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(OppositeSideCastling);
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Opposite-side Castling",
                description: "Once your opponent has castled, you can only castle to the opposite side",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.minor,
                displayIcon: "ὸ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^OppositeSideCastling$/i.test(match);
    }
    serializeToParsingForm() {
        return "OppositeSideCastling";
    }
    isDisabled() {
        return false;
    }
    processStandardMove(moveData) {
        const result = this.callHandler("processStandardMove", arguments);
        if ("specialType" in moveData) {
            let castlingDataReference;
            if (moveData.specialType === _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.SpecialMove.CastlingKingside) {
                castlingDataReference = this.decorator.fenOptions.tag("castleKingside");
            }
            else if (moveData.specialType === _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.SpecialMove.CastlingQueenside) {
                castlingDataReference = this.decorator.fenOptions.tag("castleQueenside");
            }
            if (castlingDataReference) {
                castlingDataReference[(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_4__.getOppositePlacedColor)(this.decorator.sideToMove)] = false;
            }
        }
        return result;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PiecesGoToBanks.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PiecesGoToBanks.ts ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PiecesGoToBanks": function() { return /* binding */ PiecesGoToBanks; }
/* harmony export */ });
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");





const tag = "piecesGoToBanks";
class PiecesGoToBanks extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Bank Captures",
                description: "Captured pieces go to banks",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.extending,
                displayIcon: "X"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Crazy(?:house|wan)$/i.test(match);
    }
    serializeToParsingForm() {
        return "";
    }
    isDisabled() {
        return false;
    }
    processStandardMove(moveData) {
        const promotedFrom = this.decorator.fenOptions.tag("promotedFrom");
        if (moveData.promotion) {
            const pieceLetter = this.decorator.board.board[moveData.startCoordinates[0]][moveData.startCoordinates[1]].piece;
            promotedFrom.set(moveData.endCoordinates, pieceLetter);
        }
        else {
            for (const [key, value] of promotedFrom) {
                if (key[0] === moveData.startCoordinates[0] && key[1] === moveData.endCoordinates[1]) {
                    promotedFrom.delete(key);
                    promotedFrom.set(moveData.endCoordinates, value);
                    break;
                }
            }
        }
        return this.callHandler("processStandardMove", arguments);
    }
    affectOptions(move) {
        const fenOptions = this.decorator.fenOptions;
        const areBanksEnabled = fenOptions.tag("areBanksEnabled"), bank = fenOptions.tag("bank"), promotedFrom = fenOptions.tag("promotedFrom");
        if (areBanksEnabled[this.decorator.sideToMove]) {
            if (!(0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.verifyInternalMove)(move)) {
                if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.verifyStandardMove)(move)) {
                    const captures = this.decorator.getCapturedPieces(move);
                    const sideToMove = this.decorator.sideToMove;
                    const addPieceToBank = (piece) => {
                        for (const [key, value] of bank[sideToMove]) {
                            if (key.piece === piece && key.color === sideToMove) {
                                bank[sideToMove].set(key, value + 1);
                                return;
                            }
                        }
                        bank[sideToMove].set((0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_1__.createPieceFromData)(sideToMove, piece), 1);
                    };
                    captures.forEach(c => {
                        for (const [key, value] of promotedFrom) {
                            if (key[0] === c[0] && key[1] === c[1]) {
                                promotedFrom.delete(key);
                                addPieceToBank(value);
                                return;
                            }
                        }
                        addPieceToBank(this.decorator.board.board[c[0]][c[1]].piece);
                    });
                }
            }
        }
        return this.callHandler("affectOptions", arguments);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PlayForMate.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PlayForMate.ts ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayForMate": function() { return /* binding */ PlayForMate; }
/* harmony export */ });
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "playForMate";
class PlayForMate extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(PlayForMate);
    }
    initiallyAliveColors = _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers;
    static checkmatePoints = {
        [1]: 24, [2]: 32, [3]: 48
    };
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Play for mate",
                description: "No points for pieces, only checkmates matter",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.pointsAlternation,
                displayIcon: "D"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Play4Mate$/i.test(match);
    }
    serializeToParsingForm() {
        return "Play4Mate";
    }
    isDisabled({ gameType }) {
        return gameType === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.VariantType.Teams;
    }
    initDecoratorSettings() {
        this.initiallyAliveColors = this.decorator.fenOptions.tag("dead")
            .map((d, i) => d || this.decorator.fenOptions.tag("resigned")[i])
            .filter(Boolean).length;
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
    obtainPointsForMate() {
        const aliveColors = this.decorator.fenOptions.tag("dead").filter(Boolean).length;
        switch (aliveColors) {
            case 1:
                if (this.initiallyAliveColors === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers) {
                    return PlayForMate.checkmatePoints[1];
                }
            // * Fallthrough
            case 2:
                if (this.initiallyAliveColors >= _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers - 1) {
                    return PlayForMate.checkmatePoints[2];
                }
            // * Fallthrough
            case 3:
                return PlayForMate.checkmatePoints[3];
            default:
                console.error(`Unexpected players length ${aliveColors}`);
                return 0;
        }
    }
    getPointsForPiece() {
        return 0;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PointsForMate.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PointsForMate.ts ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PointsForMate": function() { return /* binding */ PointsForMate; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");



const tag = "pointsForMate";
class PointsForMate extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(PointsForMate);
    }
    pointsForMate;
    constructor(pointsForMate) {
        super();
        if (typeof pointsForMate === "number") {
            this.pointsForMate = pointsForMate;
        }
        else {
            this.pointsForMate = 20;
        }
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: this.pointsForMate,
            information: {
                name: `${this.pointsForMate}-point checkmate`,
                textualForm: `+${this.pointsForMate}`,
                description: `Checkmates & king captures are worth ${this.pointsForMate} points`,
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^PointsForMate=(3|5|10|40)$/i);
        if (matchArray) {
            this.pointsForMate = Number(matchArray[1]);
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `PointsForMate=${this.pointsForMate}`;
    }
    isDisabled({ variantDataRules, gameType }) {
        return variantDataRules.giveaway || variantDataRules.playForMate || gameType === _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_0__.VariantType.Teams;
    }
    obtainPointsForMate() {
        return this.pointsForMate;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/StalemateOptions.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/StalemateOptions.ts ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StalemateOptions": function() { return /* binding */ StalemateOptions; },
/* harmony export */   "stalemateOptionsValues": function() { return /* binding */ stalemateOptionsValues; },
/* harmony export */   "verifyCustomStalemateValue": function() { return /* binding */ verifyCustomStalemateValue; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");





const tag = "stalemateOptions";
const stalemateOptionsValues = {
    stalemateLoses: "loss",
    stalemateWins: "win",
    stalemateDraws: "draw"
};
const verifyCustomStalemateValue = (v) => Object.values(stalemateOptionsValues).includes(v);
class StalemateOptions extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(StalemateOptions);
    }
    type;
    isFFA = false;
    constructor(type) {
        super();
        if (typeof type === 'string' && verifyCustomStalemateValue(type)) {
            this.type = type;
        }
        else {
            this.type = false;
        }
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__.FENData; }
    getPublicProperties() {
        const description = this.type === "draw"
            ? `Stalemate is a draw`
            : this.isFFA
                ? `The remaining players share the points`
                : `The stalemated player ${this.type === "loss" ? "loses" : "wins"}`;
        return {
            parameterValue: this.type,
            information: {
                name: description,
                description,
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__.variantRuleColors.minor,
                displayIcon: "Ὃ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.toLowerCase().match(/^Stalemate=(.+)$/i);
        if (matchArray) {
            const presumedOption = matchArray[1];
            if (verifyCustomStalemateValue(presumedOption)) {
                this.type = presumedOption;
            }
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `Stalemate=${this.type || "draw"}`;
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        if (this.type === false) {
            if (this.decorator.board.gameType.isFFA()
                && this.decorator.fenOptions.tag("dead").filter(Boolean).length > 2) {
                this.type = "win";
                this.isFFA = true;
            }
            else {
                this.type = "draw";
                this.isFFA = false;
            }
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
    processInternalMove(internalMove) {
        const currentTurn = this.decorator.sideToMove;
        const returnValues = this.callHandler("processInternalMove", arguments);
        if (internalMove.type === _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_2__.InternalMoveSignature.Stalemate) {
            const pointsForMate = this.decorator.obtainPointsForMate();
            switch (this.type) {
                case "loss":
                    if (!this.isFFA) {
                        this.decorator.points[currentTurn] += pointsForMate;
                        break;
                    }
                // * Fallthrough
                case "draw":
                    this.injectIntoBaseClass(function () {
                        this.spreadPointsBetweenPlayersEvenly();
                    })();
                    break;
                case "win":
                    this.decorator.points[this.decorator.sideToMove] += pointsForMate;
                    break;
                case false:
                    break;
                default:
                    (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.throwOnNever)(this.type);
            }
            if (this.decorator.getRealPlayers() === 1) {
                this.decorator.assignGeneralTermination("Stalemate", currentTurn);
            }
        }
        return returnValues;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Takeover.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Takeover.ts ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Takeover": function() { return /* binding */ Takeover; }
/* harmony export */ });
/* harmony import */ var _Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Board/BoardInterface */ "./src/main/client/ts/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");
/* harmony import */ var _DeadKingWalking__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DeadKingWalking */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/DeadKingWalking.ts");








const tag = "takeover";
class Takeover extends _VariantRule__WEBPACK_IMPORTED_MODULE_5__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_5__.VariantRule.initVariantRule(Takeover);
    }
    dependencies = new Map([[_DeadKingWalking__WEBPACK_IMPORTED_MODULE_7__.DeadKingWalking, []]]);
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__.FENData; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Takeover",
                description: "Checkmate players to take control of their pieces",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_6__.variantRuleColors.phased,
                displayIcon: "Ě"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Takeover$/i.test(match);
    }
    serializeToParsingForm() {
        return "Takeover";
    }
    isDisabled({ gameType }) {
        return gameType === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.VariantType.Teams;
    }
    affectOptions() {
        const sideToMove = this.decorator.sideToMove, detectedPieces = this.decorator.board.getPlayerPieces();
        const results = this.callHandler("affectOptions", arguments);
        for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.colors) {
            if (!results.checkmates[color])
                continue;
            for (const piece of detectedPieces[sideToMove]) {
                const pieceString = this.decorator.board.board[piece[0]][piece[1]];
                if (!pieceString.isDead() || _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_4__.pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn)
                    continue;
                this.decorator.board.board[piece[0]][piece[1]] = (0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.createPieceFromData)(sideToMove, pieceString.piece);
            }
        }
        return results;
    }
    countTotalPointsOnBoard() {
        const zombieImmune = this.decorator.fenOptions.tag("zombieImmune"), royals = this.decorator.fenOptions.tag("royal");
        const resultingPoints = [0, 0, 0, 0];
        this.decorator.board.getPlayerPieces().forEach((army, color) => {
            if (zombieImmune[color])
                return;
            const royal = royals[color];
            for (const coordinate of army) {
                if (royal && (0,_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_0__.compareCoordinates)(coordinate, royal)) {
                    resultingPoints[color] += this.decorator.obtainPointsForMate();
                }
                else {
                    const piece = this.decorator.board.board[coordinate[0]][coordinate[1]].piece;
                    resultingPoints[color] += _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_4__.pieceControlConfigSettings[piece].points.singlesPoints;
                }
            }
        });
        return resultingPoints;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/ThreefoldRepetition.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/ThreefoldRepetition.ts ***!
  \***********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThreefoldRepetition": function() { return /* binding */ ThreefoldRepetition; }
/* harmony export */ });
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");


const tag = "threefoldRepetition";
class ThreefoldRepetition extends _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule.initVariantRule(ThreefoldRepetition);
    }
    totalRepetitionsRequired;
    constructor(totalRepetitions) {
        super();
        if (typeof totalRepetitions === 'number' && totalRepetitions > 0) {
            this.totalRepetitionsRequired = totalRepetitions;
        }
        else {
            this.totalRepetitionsRequired = 3;
        }
    }
    getDecoratorType() { return _FENData_FENData__WEBPACK_IMPORTED_MODULE_0__.FENData; }
    getPublicProperties() {
        const isDisabled = this.totalRepetitionsRequired === Infinity;
        return {
            parameterValue: this.totalRepetitionsRequired,
            information: {
                name: isDisabled ? "3-fold repetition disabled" : `${this.totalRepetitionsRequired}-fold repetition`,
                textualForm: "",
                description: isDisabled ? "3-fold repetition disabled" : `After position repeats ${this.totalRepetitionsRequired} times game is over`,
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^ThreefoldRepetition=((?:\d+)|(?:Infinity))$/i);
        if (matchArray) {
            this.totalRepetitionsRequired = Number(matchArray[1]);
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `ThreefoldRepetition=${this.totalRepetitionsRequired}`;
    }
    isDisabled() {
        return false;
    }
    affectOptions() {
        const results = this.callHandler("affectOptions", arguments);
        const repetitions = this.decorator.board.moves.getHash(this.decorator.constructPreliminaryHashString());
        if (repetitions + 1 >= this.totalRepetitionsRequired) {
            this.decorator.assignGeneralTermination("Threefold Repetition");
            this.injectIntoBaseClass(function () {
                this.spreadPointsBetweenPlayersEvenly();
            })();
        }
        return results;
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/AnyCapture.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/AnyCapture.ts ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnyCapture": function() { return /* binding */ AnyCapture; }
/* harmony export */ });
/* harmony import */ var _baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");





const tag = "anyCapture";
class AnyCapture extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(AnyCapture);
    }
    getDecoratorType() { return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__.PieceControl; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Any Capture",
                description: "You can capture your own pieces",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_4__.variantRuleColors.autogenous,
                displayIcon: "ὶ"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^AnyCapture$/i.test(match);
    }
    serializeToParsingForm() {
        return "AnyCapture";
    }
    isDisabled() {
        return false;
    }
    configure(configuration) {
        const modifiedConfiguration = {
            ...configuration,
            immunePieces: (0,_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(false, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers),
        };
        for (const decorator of this.wrappingDecorators) {
            if (decorator.configure)
                return decorator.configure(modifiedConfiguration);
        }
        return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__.PieceControl.prototype.configure.call(this.decorator, modifiedConfiguration);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromoteTo.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromoteTo.ts ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PromoteTo": function() { return /* binding */ PromoteTo; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _client_ts_utils_StringFormatUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @client/ts/utils/StringFormatUtils */ "./src/main/client/ts/utils/StringFormatUtils.ts");
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");




const tag = "promotionPieces";
class PromoteTo extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(PromoteTo);
    }
    promotionPieces;
    constructor(promotionPieces) {
        super();
        this.promotionPieces = Array.isArray(promotionPieces)
            && promotionPieces.every((p) => typeof p === 'string' && (0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.verifyPieceLetter)(p))
            ? promotionPieces : [_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.defaultPieces.queen, _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.defaultPieces.rook, _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.defaultPieces.bishop, _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.defaultPieces.knight];
    }
    getDecoratorType() { return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__.PieceControl; }
    getPublicProperties() {
        const pieceNames = this.promotionPieces.reduce((p, c) => {
            const pieceName = _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.pieceControlConfigSettings[c].naming.name;
            return [...p, pieceName];
        }, []);
        return {
            parameterValue: this.promotionPieces,
            information: {
                name: "Promotion Pieces",
                textualForm: "",
                description: `Pawns promote to ${(0,_client_ts_utils_StringFormatUtils__WEBPACK_IMPORTED_MODULE_1__.prefixWithIndefiniteArticle)((0,_client_ts_utils_StringFormatUtils__WEBPACK_IMPORTED_MODULE_1__.compileEnumeration)(pieceNames))}`,
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^PromoteTo=([A-Zx]+)$/i);
        if (matchArray) {
            const inputPromotion = matchArray[1].split("").filter((p) => (0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.verifyPieceLetter)(p));
            if (inputPromotion.length)
                this.promotionPieces = inputPromotion;
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `PromoteTo=${this.promotionPieces.join("")}`;
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        if (this.decorator.hooks.usePawnLogic) {
            this.decorator.hooks.usePawnLogic.promotionPieces = this.promotionPieces;
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromotionRank.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromotionRank.ts ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PromotionRank": function() { return /* binding */ PromotionRank; },
/* harmony export */   "disabledRank": function() { return /* binding */ disabledRank; }
/* harmony export */ });
/* harmony import */ var _client_ts_utils_StringFormatUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/utils/StringFormatUtils */ "./src/main/client/ts/utils/StringFormatUtils.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");




const tag = "promotionRank";
const disabledRank = 99;
class PromotionRank extends _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_3__.VariantRule.initVariantRule(PromotionRank);
    }
    promotionRank;
    constructor(promotionRank) {
        super();
        this.promotionRank = typeof promotionRank === 'number' ? promotionRank : 8;
    }
    getDecoratorType() { return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__.PieceControl; }
    getPublicProperties() {
        return {
            parameterValue: this.promotionRank,
            information: {
                name: "Promotion Rank",
                textualForm: "",
                description: `on the ${this.promotionRank}${(0,_client_ts_utils_StringFormatUtils__WEBPACK_IMPORTED_MODULE_0__.formatOrdinalNumber)(this.promotionRank)} rank`,
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        const matchArray = match.match(/^Prom=(\d\d?)$/i);
        if (matchArray) {
            this.promotionRank = Number(matchArray[1]);
            return true;
        }
        else {
            return false;
        }
    }
    serializeToParsingForm() {
        return `Prom=${this.promotionRank}`;
    }
    isDisabled() {
        return false;
    }
    initDecoratorSettings() {
        if (this.decorator.hooks.usePawnLogic) {
            this.decorator.hooks.usePawnLogic.promotionRanks = [_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension - this.promotionRank,
                this.promotionRank - 1, this.promotionRank - 1, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.boardDimension - this.promotionRank];
        }
        for (const decorator of this.wrappingDecorators)
            decorator.initDecoratorSettings?.();
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/RoyalsCannotCapture.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/RoyalsCannotCapture.ts ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoyalsCannotCapture": function() { return /* binding */ RoyalsCannotCapture; }
/* harmony export */ });
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "royalsCannotCapture";
class RoyalsCannotCapture extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    getDecoratorType() { return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Royals Cannot Capture",
                description: "Royal pieces cannot capture pieces.",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.autogenous,
                displayIcon: "ᾈ"
            }
        };
    }
    matchesPGNDeclaration() {
        return false;
    }
    serializeToParsingForm() {
        return "";
    }
    isDisabled() {
        return false;
    }
    getMovePossibility(configuration) {
        const royal = this.decorator.fenData.fenOptions.tag("royal")[this.decorator.color];
        if (royal && royal[0] === this.decorator.i && royal[1] === this.decorator.j) {
            configuration.special = _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly;
        }
        for (const decorator of this.wrappingDecorators) {
            if (decorator.getMovePossibility)
                return decorator.getMovePossibility(configuration);
        }
        return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl.prototype.getMovePossibility.call(this.decorator, configuration);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Sideways.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Sideways.ts ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sideways": function() { return /* binding */ Sideways; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");




const tag = "sideways";
class Sideways extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(Sideways);
    }
    getDecoratorType() { return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_1__.PieceControl; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Sideways",
                description: "Pawns can also move one square sideways",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_3__.variantRuleColors.autogenous,
                displayIcon: "ί"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Sideways$/i.test(match);
    }
    serializeToParsingForm() {
        return "Sideways";
    }
    isDisabled() {
        return false;
    }
    getPossibleCells() {
        if (this.decorator.hooks.usePawnLogic) {
            this.injectIntoBaseClass(function () {
                this.generateJumpAttack({ displacement: [0, -1], special: _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.AttackType.MoveOnly });
                this.generateJumpAttack({ displacement: [0, 1], special: _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_0__.AttackType.MoveOnly });
            })();
        }
        for (const decorator of this.wrappingDecorators) {
            if (decorator.getPossibleCells)
                return decorator.getPossibleCells();
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const prototype = Object.getPrototypeOf(this.decorator);
        prototype.getPossibleCells.call(this.decorator);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Stonewall.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Stonewall.ts ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stonewall": function() { return /* binding */ Stonewall; }
/* harmony export */ });
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");



const tag = "stonewall";
class Stonewall extends _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_2__.VariantRule.initVariantRule(Stonewall);
    }
    getDecoratorType() {
        return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl;
    }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Stonewall",
                textualForm: "",
                description: "Dead pieces cannot be captured",
                tag
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Deadwall$/i.test(match);
    }
    serializeToParsingForm() {
        return "Deadwall";
    }
    isDisabled() {
        return false;
    }
    getMovePossibility(configuration) {
        const { displacement: [i, j], special } = configuration;
        let modifiedConfiguration = configuration;
        if ((special === _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.AttackOnly || special === _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.Normal || special === _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.RayGen) &&
            this.decorator.board[i] &&
            this.decorator.board[i][j] &&
            this.decorator.board[i][j].isDead()) {
            modifiedConfiguration = {
                ...configuration,
                special: _PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_1__.AttackType.MoveOnly
            };
        }
        for (const decorator of this.wrappingDecorators) {
            if (decorator.getMovePossibility)
                return decorator.getMovePossibility(configuration);
        }
        return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl.prototype.getMovePossibility.call(this.decorator, modifiedConfiguration);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Torpedo.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Torpedo.ts ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Torpedo": function() { return /* binding */ Torpedo; }
/* harmony export */ });
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VariantRuleInterface */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts");



const tag = "torpedo";
class Torpedo extends _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule {
    static {
        _VariantRule__WEBPACK_IMPORTED_MODULE_1__.VariantRule.initVariantRule(Torpedo);
    }
    getDecoratorType() { return _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl; }
    getPublicProperties() {
        return {
            parameterValue: true,
            information: {
                name: "Torpedo",
                description: "Pawns can always jump two squares",
                tag,
                color: _VariantRuleInterface__WEBPACK_IMPORTED_MODULE_2__.variantRuleColors.autogenous,
                displayIcon: "ά"
            }
        };
    }
    matchesPGNDeclaration(match) {
        return /^Torpedo$/i.test(match);
    }
    serializeToParsingForm() {
        return "Torpedo";
    }
    isDisabled() {
        return false;
    }
    configure(configuration) {
        const modifiedConfiguration = {
            ...configuration,
            baseRank: true
        };
        for (const decorator of this.wrappingDecorators) {
            if (decorator.configure)
                return decorator.configure(modifiedConfiguration);
        }
        _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_0__.PieceControl.prototype.configure.call(this.decorator, modifiedConfiguration);
    }
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleInterface.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "variantRuleColors": function() { return /* binding */ variantRuleColors; }
/* harmony export */ });
/* harmony import */ var _client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/interfaces/Colors */ "./src/main/client/ts/interfaces/Colors.ts");

const variantRuleColors = {
    minor: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#e01492"),
    visual: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#ad5709"),
    autogenous: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#f2791e"),
    metadata: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#89a5d3"),
    startingPosition: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#7030a0"),
    extending: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#fbaa07"),
    widespread: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#d40c0c"),
    pointsAlternation: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#00b0f0"),
    phased: (0,_client_ts_interfaces_Colors__WEBPACK_IMPORTED_MODULE_0__.createHexColor)("#00b050")
};


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleSetup.ts":
/*!***************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleSetup.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compileVariantRuleData": function() { return /* binding */ compileVariantRuleData; },
/* harmony export */   "copyVariantRules": function() { return /* binding */ copyVariantRules; },
/* harmony export */   "createBaseParsingTypes": function() { return /* binding */ createBaseParsingTypes; },
/* harmony export */   "parseVariantRules": function() { return /* binding */ parseVariantRules; },
/* harmony export */   "validateVariantRules": function() { return /* binding */ validateVariantRules; }
/* harmony export */ });
/* harmony import */ var _Board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Board/Board */ "./src/main/client/ts/logic/movegen/Board/Board.ts");
/* harmony import */ var _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PieceControl/PieceControl */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControl.ts");
/* harmony import */ var _VariantRuleDefinitions_BoardDecorators_ForcedCapture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VariantRuleDefinitions/BoardDecorators/ForcedCapture */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ForcedCapture.ts");
/* harmony import */ var _VariantRuleDefinitions_BoardDecorators_SeirawanSetup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VariantRuleDefinitions/BoardDecorators/SeirawanSetup */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SeirawanSetup.ts");
/* harmony import */ var _VariantRuleDefinitions_BoardDecorators_SetupChess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VariantRuleDefinitions/BoardDecorators/SetupChess */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SetupChess.ts");
/* harmony import */ var _VariantRuleDefinitions_BoardDecorators_Taboo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VariantRuleDefinitions/BoardDecorators/Taboo */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Taboo.ts");
/* harmony import */ var _VariantRuleDefinitions_FENDataDecorators_FiftyMoveRule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VariantRuleDefinitions/FENDataDecorators/FiftyMoveRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FiftyMoveRule.ts");
/* harmony import */ var _VariantRuleDefinitions_FENDataDecorators_Giveaway__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VariantRuleDefinitions/FENDataDecorators/Giveaway */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Giveaway.ts");
/* harmony import */ var _VariantRuleDefinitions_FENDataDecorators_StalemateOptions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VariantRuleDefinitions/FENDataDecorators/StalemateOptions */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/StalemateOptions.ts");
/* harmony import */ var _VariantRuleDefinitions_FENDataDecorators_ThreefoldRepetition__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./VariantRuleDefinitions/FENDataDecorators/ThreefoldRepetition */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/ThreefoldRepetition.ts");
/* harmony import */ var _VariantRuleDefinitions_PieceControlDecorators_PromoteTo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./VariantRuleDefinitions/PieceControlDecorators/PromoteTo */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromoteTo.ts");
/* harmony import */ var _VariantRuleDefinitions_PieceControlDecorators_PromotionRank__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./VariantRuleDefinitions/PieceControlDecorators/PromotionRank */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromotionRank.ts");
/* harmony import */ var _VariantRule__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VariantRule */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRule.ts");














const createBaseParsingTypes = () => ({
    boardDecorators: [], pieceControlDecorators: [], fenDataDecorators: []
});
const variantRulePriorities = [
    _VariantRuleDefinitions_BoardDecorators_SetupChess__WEBPACK_IMPORTED_MODULE_5__.SetupChess, _VariantRuleDefinitions_BoardDecorators_ForcedCapture__WEBPACK_IMPORTED_MODULE_3__.ForcedCapture, _VariantRuleDefinitions_BoardDecorators_Taboo__WEBPACK_IMPORTED_MODULE_6__.Taboo, _VariantRuleDefinitions_BoardDecorators_SeirawanSetup__WEBPACK_IMPORTED_MODULE_4__.SeirawanSetup,
    _VariantRuleDefinitions_PieceControlDecorators_PromoteTo__WEBPACK_IMPORTED_MODULE_11__.PromoteTo, _VariantRuleDefinitions_PieceControlDecorators_PromotionRank__WEBPACK_IMPORTED_MODULE_12__.PromotionRank,
    _VariantRuleDefinitions_FENDataDecorators_Giveaway__WEBPACK_IMPORTED_MODULE_8__.Giveaway
].reverse();
function differentiateDecoratorMethods(variant, methods) {
    const verifyDecorator = (rv, type) => rv.getDecoratorType() === type;
    if (verifyDecorator(variant, _Board_Board__WEBPACK_IMPORTED_MODULE_0__.Board)) {
        methods.boardDecorators(variant);
    }
    else if (verifyDecorator(variant, _PieceControl_PieceControl__WEBPACK_IMPORTED_MODULE_2__.PieceControl)) {
        methods.pieceControlDecorators(variant);
    }
    else if (verifyDecorator(variant, _FENData_FENData__WEBPACK_IMPORTED_MODULE_1__.FENData)) {
        methods.fenDataDecorators(variant);
    }
}
function parseVariantRules(rules) {
    const variantClasses = new Set();
    const variantRuleList = new Set();
    const forcedRules = [_VariantRuleDefinitions_PieceControlDecorators_PromotionRank__WEBPACK_IMPORTED_MODULE_12__.PromotionRank, _VariantRuleDefinitions_PieceControlDecorators_PromoteTo__WEBPACK_IMPORTED_MODULE_11__.PromoteTo, _VariantRuleDefinitions_FENDataDecorators_StalemateOptions__WEBPACK_IMPORTED_MODULE_9__.StalemateOptions, _VariantRuleDefinitions_FENDataDecorators_FiftyMoveRule__WEBPACK_IMPORTED_MODULE_7__.FiftyMoveRule, _VariantRuleDefinitions_FENDataDecorators_ThreefoldRepetition__WEBPACK_IMPORTED_MODULE_10__.ThreefoldRepetition];
    for (const variantRule of _VariantRule__WEBPACK_IMPORTED_MODULE_13__.VariantRule.variantRuleList) {
        const rv = new variantRule();
        variantRuleList.add(rv);
        variantClasses.add(variantRule);
    }
    const finalList = {
        boardDecorators: [], pieceControlDecorators: [], fenDataDecorators: []
    };
    const rulesStrings = rules.split(/\s+/);
    const insertVariantRule = (variant) => {
        differentiateDecoratorMethods(variant, {
            boardDecorators: (variant) => {
                finalList.boardDecorators.push(variant);
            },
            pieceControlDecorators: (variant) => {
                finalList.pieceControlDecorators.push(variant);
            },
            fenDataDecorators: (variant) => {
                finalList.fenDataDecorators.push(variant);
            }
        });
        for (const [dependency, dependencyArgs] of variant.dependencies) {
            if (!Object.values(finalList).some((decorators) => decorators.some(rv => rv instanceof dependency))) {
                insertVariantRule(new dependency(...dependencyArgs));
            }
        }
    };
    for (const variant of variantRuleList) {
        for (const ruleString of rulesStrings) {
            if (variant.matchesPGNDeclaration(ruleString)) {
                insertVariantRule(variant);
                variantRuleList.delete(variant);
            }
        }
    }
    for (const forcedRule of forcedRules) {
        const variant = new forcedRule();
        differentiateDecoratorMethods(variant, {
            boardDecorators: (variant) => {
                if (!finalList.boardDecorators.some(rule => rule instanceof forcedRule)) {
                    finalList.boardDecorators.push(variant);
                }
            },
            pieceControlDecorators: (variant) => {
                if (!finalList.pieceControlDecorators.some(rule => rule instanceof forcedRule)) {
                    finalList.pieceControlDecorators.push(variant);
                }
            },
            fenDataDecorators: (variant) => {
                if (!finalList.fenDataDecorators.some(rule => rule instanceof forcedRule)) {
                    finalList.fenDataDecorators.push(variant);
                }
            }
        });
    }
    for (const rule of variantRulePriorities) {
        const resultingRule = new rule();
        differentiateDecoratorMethods(resultingRule, {
            boardDecorators: () => {
                const index = finalList.boardDecorators.findIndex(c => c instanceof rule);
                if (index !== -1) {
                    finalList.boardDecorators.unshift(finalList.boardDecorators.splice(index, 1)[0]);
                }
            },
            pieceControlDecorators: () => {
                const index = finalList.pieceControlDecorators.findIndex(c => c instanceof rule);
                if (index !== -1) {
                    finalList.pieceControlDecorators.unshift(finalList.pieceControlDecorators.splice(index, 1)[0]);
                }
            },
            fenDataDecorators: () => {
                const index = finalList.fenDataDecorators.findIndex(c => c instanceof rule);
                if (index !== -1) {
                    finalList.fenDataDecorators.unshift(finalList.fenDataDecorators.splice(index, 1)[0]);
                }
            }
        });
    }
    return finalList;
}
function compileVariantRuleData(rules) {
    const finalObject = {};
    const variantRuleList = _VariantRule__WEBPACK_IMPORTED_MODULE_13__.VariantRule.variantRuleList.map(rv => new rv());
    for (const rule of variantRuleList) {
        finalObject[rule.getPublicProperties().information.tag] = false;
    }
    const setFinalObjectProperty = (properties) => {
        finalObject[properties.information.tag] = properties.parameterValue;
    };
    const ruleArray = [...rules.boardDecorators, ...rules.fenDataDecorators, ...rules.pieceControlDecorators];
    for (const rule of ruleArray) {
        setFinalObjectProperty(rule.getPublicProperties());
    }
    return finalObject;
}
function copyVariantRules(rvs) {
    return rvs.map(rv => {
        const parameterValue = rv.getPublicProperties().parameterValue;
        const parameterArray = parameterValue !== false ? [parameterValue] : [];
        const constructor = rv.constructor;
        return new constructor(parameterArray);
    });
}
function validateVariantRules(board) {
    const configuration = {
        variantDataRules: board.variantData,
        gameType: board.gameType.type,
        fenTags: board.data.fenOptions.tags
    };
    return {
        boardDecorators: board.variantRules.boardDecorators.filter(rv => !rv.isDisabled(configuration)),
        pieceControlDecorators: board.variantRules.pieceControlDecorators.filter(rv => !rv.isDisabled(configuration)),
        fenDataDecorators: board.variantRules.fenDataDecorators.filter(rv => !rv.isDisabled(configuration))
    };
}


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/InputOutputProcessing.ts":
/*!**********************************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/InputOutputProcessing.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parsePGN4": function() { return /* binding */ parsePGN4; },
/* harmony export */   "serializeBoard": function() { return /* binding */ serializeBoard; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _moveGeneration_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/VariantRules/VariantRuleSetup */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleSetup.ts");
/* harmony import */ var _Moves_ParsePGNMoves__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Moves/ParsePGNMoves */ "./src/main/client/ts/logic/utils/Tags/Moves/ParsePGNMoves.ts");
/* harmony import */ var _Moves_SerializePGNMoves__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Moves/SerializePGNMoves */ "./src/main/client/ts/logic/utils/Tags/Moves/SerializePGNMoves.ts");
/* harmony import */ var _TagInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TagInterface */ "./src/main/client/ts/logic/utils/Tags/TagInterface.ts");





function parsePGN4(pgn4) {
    let pgn4Tags, pgn4Moves = "";
    const match = pgn4.match(/(?=1\.\s*?[xA-ZΑ-ωa-n0-9-])/);
    if (match?.index) {
        pgn4Moves = pgn4.substring(match.index);
        pgn4Tags = pgn4.substring(0, match.index).split("]").map(t => t.trim());
    }
    else {
        pgn4Tags = pgn4.split("]").map(t => t.trim());
    }
    const moves = pgn4Moves.length ? (0,_Moves_ParsePGNMoves__WEBPACK_IMPORTED_MODULE_2__.parsePGN4Moves)(pgn4Moves) : [];
    const variantTags = (0,_TagInterface__WEBPACK_IMPORTED_MODULE_4__.createDefaultVariantTags)();
    for (const input of pgn4Tags) {
        let variantTag;
        for (variantTag in variantTags) {
            const tag = variantTags[variantTag];
            if (Object.prototype.hasOwnProperty.call(variantTags, variantTag) && tag.verifyTagInParsing(input)) {
                tag.currentValue = tag.parseTag(input);
                break;
            }
        }
    }
    const gameData = {
        site: variantTags.site.currentValue,
        gameNumber: variantTags.gameNumber.currentValue,
        date: variantTags.date.currentValue,
        timeControl: variantTags.timeControl.currentValue,
        players: variantTags.playerData.currentValue,
        termination: variantTags.termination.currentValue,
        result: undefined,
    };
    const variantRuleData = (0,_moveGeneration_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_1__.compileVariantRuleData)(variantTags.variantRules.currentValue);
    const promotionPieces = Array.isArray(variantRuleData.promotionPieces) ? variantRuleData.promotionPieces : [];
    const nonPlayablePieceValues = Object.values(_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_0__.nonPlayablePieces);
    return {
        gameData,
        gameType: variantTags.variantType.currentValue,
        variantRules: variantTags.variantRules.currentValue,
        variantRuleData,
        board: variantTags.startingPosition.currentValue.board,
        fenData: variantTags.startingPosition.currentValue.fenData,
        pieceSet: new Set([...variantTags.startingPosition.currentValue.pieceSet,
            ...promotionPieces].filter(e => !nonPlayablePieceValues.includes(e))),
        moves
    };
}
const defaultTags = (0,_TagInterface__WEBPACK_IMPORTED_MODULE_4__.createDefaultVariantTags)();
function serializeBoard(board) {
    return {
        board: Object.values(defaultTags).map(t => t.serialize(board))
            .filter((v) => v !== undefined).join("\n"),
        moves: (0,_Moves_SerializePGNMoves__WEBPACK_IMPORTED_MODULE_3__.serializePGNMoves)(board.moves)
    };
}


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/Moves/ParsePGNMoves.ts":
/*!********************************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/Moves/ParsePGNMoves.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PGN4_SYNTAX": function() { return /* binding */ PGN4_SYNTAX; },
/* harmony export */   "parsePGN4Moves": function() { return /* binding */ parsePGN4Moves; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeInterface */ "./src/main/client/ts/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @moveGeneration/PieceControl/PieceControlInterface */ "./src/main/client/ts/logic/movegen/PieceControl/PieceControlInterface.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Utils */ "./src/main/client/ts/logic/utils/Tags/Utils.ts");






const PGN4_SYNTAX = {
    SPLIT: '.',
    PIECE_REGEX: /[xA-ZΑ-ωa-nrbyg0-9-=+#@]/,
    PIECE_REGEX_SIMPLIFIED: /[A-ZΑ-ωa-n0-9-]/,
    MOVE_CAPTURING_REGEX: /^[A-ZΑ-ω]?([a-n]\d{1,2})(?:-|x[A-ZΑ-ω]?)[A-ZΑ-ω]?([a-n]\d{1,2})/,
    DUCK_MOVE_CAPTURING_REGEX: /Θ([a-n]\d{1,2})?-([a-n]\d{1,2})/,
    DROPPING_MOVE_CAPTURING_REGEX: /Θ?@([a-z])([A-ZΑ-ω])-([a-n]\d{1,2})/,
    BRACKETS: {
        COMMENT_START: '{',
        COMMENT_END: '}',
        VARIATION_START: '(',
        VARIATION_END: ')'
    },
    COORDINATE_REGEX: /[a-n](?:(?:1[0-4])|(?:[1-9]))/,
    COMMENT_SYNTAXES: {
        CLOCK: /\[%timestamp (-?\d+?)]/,
        ARROWS: /\[%cal ((?:R|B|Y|G).+?)]/,
        SQUARES: /\[%csl ((?:R|B|Y|G).+?)]/,
        ANNOTATION: /\[%ann (.+?)]/
    }
};
function obtainDuckMove(move) {
    const match = move.match(PGN4_SYNTAX.DUCK_MOVE_CAPTURING_REGEX);
    if (match) {
        if (match[1]) {
            const startCoordinates = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseSingleCoordinate)(match[1]);
            const endCoordinates = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseSingleCoordinate)(match[2]);
            if (!startCoordinates || !endCoordinates)
                return;
            return { startCoordinates, endCoordinates };
        }
        else {
            const endCoordinates = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseSingleCoordinate)(match[2]);
            if (!endCoordinates)
                return;
            return { piece: _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_2__.duckPieceString, endCoordinates };
        }
    }
    else
        return;
}
function obtainInternalType(type) {
    let internalMove;
    for (internalMove in _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature) {
        if (Object.prototype.hasOwnProperty.call(_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature, internalMove)) {
            if (_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature[internalMove] === type)
                return { type: _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.InternalMoveSignature[internalMove] };
        }
    }
}
function obtainDroppingMove(move) {
    const match = move.match(PGN4_SYNTAX.DROPPING_MOVE_CAPTURING_REGEX);
    if (match) {
        const [, color, piece, coordinate] = match;
        if (!(0,_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_1__.verifyColorEnumValue)(color) || !(0,_moveGeneration_PieceControl_PieceControlInterface__WEBPACK_IMPORTED_MODULE_4__.verifyPieceLetter)(piece))
            return;
        const endCoordinates = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseSingleCoordinate)(coordinate);
        if (!endCoordinates)
            return;
        return {
            piece: (0,_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_2__.createPieceFromData)(_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_1__.colorEnum[color], piece),
            endCoordinates
        };
    }
    else
        return;
}
function obtainStandardMove(move) {
    const moveData = { startCoordinates: [-1, -1], endCoordinates: [-1, -1] };
    const promotionMatch = move.match(/.*?=([A-Zx])/);
    if (promotionMatch?.[1]) {
        moveData.promotion = [(0,_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_2__.createPieceFromData)(_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_2__.deadColorIndex, promotionMatch[1].charAt(0))];
    }
    const moveCoordinates = move.match(PGN4_SYNTAX.MOVE_CAPTURING_REGEX);
    if (moveCoordinates) {
        const startCoordinate = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseSingleCoordinate)(moveCoordinates[1]);
        const endCoordinate = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseSingleCoordinate)(moveCoordinates[2]);
        (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.assertNonUndefined)(startCoordinate);
        (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.assertNonUndefined)(endCoordinate);
        moveData.startCoordinates = startCoordinate;
        moveData.endCoordinates = endCoordinate;
        return moveData;
    }
    else {
        if (/O-O-O.*/.test(move)) {
            return { ...moveData, specialType: _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.SpecialMove.CastlingQueenside };
        }
        else if (/O-O.*/.test(move)) {
            return { ...moveData, specialType: _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.SpecialMove.CastlingKingside };
        }
    }
}
function cloneMoveData(move) {
    if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.verifyInternalMove)(move)) {
        if ("startCoordinates" in move) {
            const newMove = {
                startCoordinates: [...move.startCoordinates],
                endCoordinates: [...move.endCoordinates]
            };
            if ("specialType" in move) {
                newMove.specialType = move.specialType;
            }
            if ("promotion" in move) {
                newMove.promotion = move.promotion;
            }
            return newMove;
        }
        else {
            return {
                endCoordinates: move.endCoordinates,
                piece: move.piece
            };
        }
    }
    else {
        return { type: move.type };
    }
}
const parsePGN4Moves = (moves) => {
    const parseMoves = (selectedMove, path) => {
        const moveList = [];
        const currentPath = path;
        function getMoveIndexes(mI) {
            while (selectedMove[mI] && PGN4_SYNTAX.PIECE_REGEX.test(selectedMove[mI]))
                mI++;
            return mI;
        }
        function parseComment(mI) {
            while (selectedMove[mI] && selectedMove[mI] !== PGN4_SYNTAX.BRACKETS.COMMENT_END)
                mI++;
            return mI;
        }
        function getEnumeratorIndex(mI) {
            while (selectedMove[mI] && /\d|\./.test(selectedMove[mI]))
                mI++;
            return --mI;
        }
        function findBracketIndex(i) {
            let depth = 0;
            for (; i < selectedMove.length; i++) {
                switch (selectedMove[i]) {
                    case PGN4_SYNTAX.BRACKETS.COMMENT_START:
                        i = parseComment(i);
                        break;
                    case PGN4_SYNTAX.BRACKETS.VARIATION_START:
                        depth++;
                        break;
                    case PGN4_SYNTAX.BRACKETS.VARIATION_END:
                        if (--depth === 0) {
                            return i;
                        }
                        break;
                }
            }
            throw new TypeError("No matching parentheses for input " + selectedMove);
        }
        function processMoveDataInsertion() {
            if (currentMoveData) {
                currentPath.push(++increment);
                currentMove.path = currentPath.slice();
                currentPath.pop();
                currentMove.moveData = currentMoveData.map(m => cloneMoveData(m));
                currentMove.metadata = (0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.createDummyMoveMetadata)();
                const clockSyntax = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.CLOCK);
                if (clockSyntax && !isNaN(Number(clockSyntax[1]))) {
                    currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.CLOCK, "");
                    currentMove.metadata.playerClock = Number(clockSyntax[1]);
                }
                const arrowSyntax = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.ARROWS);
                if (arrowSyntax) {
                    const arrows = arrowSyntax[1].split(",");
                    for (const arrow of arrows) {
                        const [color, coordinate] = [arrow[0], arrow.slice(1)];
                        const numericColor = color.toLowerCase(), arrowCoordinates = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseEnPassantCoordinates)(coordinate);
                        if (!(0,_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_1__.verifyColorEnumValue)(numericColor) || !arrowCoordinates)
                            continue;
                        currentMove.metadata.highlightedArrows.push([_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_1__.colorEnum[numericColor], ...arrowCoordinates]);
                    }
                    currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.ARROWS, "");
                }
                const squareSyntax = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.SQUARES);
                if (squareSyntax) {
                    const squares = squareSyntax[1].split(",");
                    for (const square of squares) {
                        const [color, inputCoordinate] = [square[0], square.slice(1)];
                        const numericColor = color.toLowerCase(), coordinate = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.parseSingleCoordinate)(inputCoordinate);
                        if (!(0,_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_1__.verifyColorEnumValue)(numericColor) || !coordinate)
                            continue;
                        currentMove.metadata.highlightedSquares.push([_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_1__.colorEnum[numericColor], coordinate]);
                    }
                    currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.SQUARES, "");
                }
                const annotationMatch = currentMove.comment?.match(PGN4_SYNTAX.COMMENT_SYNTAXES.ANNOTATION);
                if (annotationMatch) {
                    currentMove.metadata.annotation = annotationMatch[1];
                    currentMove.comment = currentMove.comment?.replace(PGN4_SYNTAX.COMMENT_SYNTAXES.ANNOTATION, "");
                }
                if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.verifyMoveWrapperProperties)(currentMove)) {
                    moveList.push(Object.assign({}, currentMove));
                }
                else {
                    console.error(`Not all properties of move wrapper are filled out: ${JSON.stringify(currentMove)}`);
                }
                currentMove = {
                    alternativeLines: [],
                    comment: ""
                };
                currentMoveData = undefined;
            }
        }
        function obtainMoveFromInfo(info) {
            const currentMove = [];
            const internalType = obtainInternalType(info[0]);
            if (info.length === 1 && internalType !== undefined) {
                return [internalType];
            }
            const standardMove = obtainStandardMove(info);
            if (standardMove)
                currentMove.push(standardMove);
            const droppingMove = obtainDroppingMove(info);
            if (droppingMove)
                currentMove.push(droppingMove);
            const duckMove = obtainDuckMove(info);
            if (duckMove)
                currentMove.push(duckMove);
            if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.verifyRequiredMove)(currentMove)) {
                return currentMove;
            }
            else
                throw new Error(`Move length is 0 for string ${info}`);
        }
        let currentMoveData;
        let currentMove = {
            alternativeLines: [],
            comment: ""
        };
        let increment = -1, variationIncrement = -1;
        try {
            for (let i = 0; i < selectedMove.length; i++) {
                const isNumNaN = isNaN(Number(selectedMove[i]));
                if (isNumNaN && !/\s/.test(selectedMove[i]) && selectedMove[i] !== PGN4_SYNTAX.SPLIT) {
                    if (PGN4_SYNTAX.PIECE_REGEX_SIMPLIFIED.test(selectedMove[i])) {
                        const index = getMoveIndexes(i);
                        currentMoveData = obtainMoveFromInfo(selectedMove.substring(i, index));
                        i = index;
                    }
                    else if (moves[i] === PGN4_SYNTAX.BRACKETS.COMMENT_START) {
                        const index = parseComment(i);
                        currentMove.comment = moves.substring(i + 1, index);
                        i = index;
                    }
                    else if (moves[i] === PGN4_SYNTAX.BRACKETS.VARIATION_START) {
                        const index = findBracketIndex(i);
                        currentPath.push(increment + 1, ++variationIncrement);
                        currentMove.alternativeLines?.push([...parseMoves(moves.substring(i + 1, index), currentPath.slice())]);
                        i = index;
                    }
                }
                else if ((selectedMove[i] === PGN4_SYNTAX.SPLIT && moves[i + 1] && moves[i + 1] === PGN4_SYNTAX.SPLIT)
                    || (moves[i].trim() && !isNumNaN) && moves[i + 1] && (moves[i + 1] === PGN4_SYNTAX.SPLIT || !isNaN(Number(moves[i + 1])))) {
                    if (!isNumNaN)
                        i = getEnumeratorIndex(i);
                    if (currentMoveData) {
                        processMoveDataInsertion();
                    }
                }
            }
        }
        catch (e) {
            console.trace(e);
        }
        finally {
            processMoveDataInsertion();
            currentPath.push(increment + 1);
            currentMove.path = currentPath.slice();
            if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_3__.verifyMoveWrapperProperties)(currentMove)) {
                moveList.push(Object.assign({}, currentMove));
            }
        }
        return moveList;
    };
    return parseMoves(moves, []);
};


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/Moves/SerializePGNMoves.ts":
/*!************************************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/Moves/SerializePGNMoves.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializePGNMoves": function() { return /* binding */ serializePGNMoves; }
/* harmony export */ });
function serializePGNMoves(moveTree) {
    let resultingString = "";
    const traverse = (moves) => {
        for (const moveWrapper of moves) {
            if (moveWrapper.metadata.currentFullMove) {
                resultingString = resultingString.replace(/\s\.\.\s$/, "");
                resultingString += ` ${moveWrapper.metadata.currentFullMove}. `;
            }
            resultingString += moveWrapper.cachedNames.fullMoveNotation;
            if (moveWrapper.comment)
                resultingString += ` {${moveWrapper.comment}}`;
            resultingString += " .. ";
            for (const alternativeLine of moveWrapper.alternativeLines) {
                resultingString += "(.. ";
                traverse(alternativeLine);
                resultingString += " )";
            }
        }
        resultingString = resultingString.replace(/\s\.\.\s$/, "");
    };
    traverse(moveTree.moves);
    return resultingString;
}


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/TagInterface.ts":
/*!*************************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/TagInterface.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDefaultVariantTags": function() { return /* binding */ createDefaultVariantTags; }
/* harmony export */ });
/* harmony import */ var _TagLogic_FENDataTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagLogic/FENDataTag */ "./src/main/client/ts/logic/utils/Tags/TagLogic/FENDataTag.ts");
/* harmony import */ var _TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagLogic/GameMetadataTags */ "./src/main/client/ts/logic/utils/Tags/TagLogic/GameMetadataTags.ts");
/* harmony import */ var _TagLogic_VariantRulesTag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TagLogic/VariantRulesTag */ "./src/main/client/ts/logic/utils/Tags/TagLogic/VariantRulesTag.ts");



const createDefaultVariantTags = () => ({
    variantType: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createVariantTypeTag)(),
    startingPosition: (0,_TagLogic_FENDataTag__WEBPACK_IMPORTED_MODULE_0__.createFENDataTag)(),
    variantRules: (0,_TagLogic_VariantRulesTag__WEBPACK_IMPORTED_MODULE_2__.createVariantRulesTag)(),
    date: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createDateTag)(), site: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createSiteTag)(),
    timeControl: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createTimeControlTag)(),
    termination: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createTerminationTag)(),
    gameNumber: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createGameNumberTag)(),
    playerData: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createPlayerDataTag)(),
    results: (0,_TagLogic_GameMetadataTags__WEBPACK_IMPORTED_MODULE_1__.createResultsTag)()
});


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/TagLogic/FENDataTag.ts":
/*!********************************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/TagLogic/FENDataTag.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkDimensionIntersection": function() { return /* binding */ checkDimensionIntersection; },
/* harmony export */   "createFENDataTag": function() { return /* binding */ createFENDataTag; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @client/ts/logic/BaseInterfaces */ "./src/main/client/ts/logic/BaseInterfaces.ts");
/* harmony import */ var _moveGeneration_FENData_FENData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/FENData/FENData */ "./src/main/client/ts/logic/movegen/FENData/FENData.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/GameUnits */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/GameUnits.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/PieceString */ "./src/main/client/ts/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils */ "./src/main/client/ts/logic/utils/Tags/Utils.ts");







function checkDimensionIntersection(dimension, [i, j]) {
    const dimensionI = (_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension - dimension[0]) / 2, dimensionJ = (_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension - dimension[1]) / 2;
    return i < dimensionI || i >= (dimensionI + dimension[0])
        || j < dimensionJ || j >= (dimensionJ + dimension[1]);
}
function serializeFENOptions(fenOptions) {
    const resultingStrings = [];
    let key;
    for (key in fenOptions.tags) {
        if (!Object.prototype.hasOwnProperty.call(fenOptions.tags, key))
            continue;
        const serializedForm = fenOptions.tags[key].serialize();
        if (serializedForm)
            resultingStrings.push(serializedForm);
    }
    return `{${resultingStrings.join(",")}}`;
}
function modifyFourBooleanParameter(part, fenDataArrayRef) {
    const booleans = part.split(",").map(e => Boolean(Number(e)));
    if ((0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(booleans, _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers)) {
        fenDataArrayRef.forEach((_, i, arr) => arr[i] = booleans[i]);
    }
    else {
        console.error("Incorrect amount of arguments for the boolean parameter length in FENData: " + part);
        console.trace(`Expected ${_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers} arguments, but got ${booleans.length}`);
    }
}
const predefinedFENpositions = {
    "4PC": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yK,yQ,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bQ,bP,10,gP,gK/bK,bP,10,gP,gQ/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
    "4PCo": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yK,yQ,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bK,bP,10,gP,gQ/bQ,bP,10,gP,gK/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
    "4PCb": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bQ,bP,10,gP,gQ/bK,bP,10,gP,gK/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
    "4PCn": "R-0,0,0,0-1,1,1,1-1,1,1,1-0,0,0,0-0-x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/bR,bP,10,gP,gR/bN,bP,10,gP,gN/bB,bP,10,gP,gB/bQ,bP,10,gP,gK/bK,bP,10,gP,gQ/bB,bP,10,gP,gB/bN,bP,10,gP,gN/bR,bP,10,gP,gR/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x",
    "2PC": "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'pawnBaseRank':5,'wb':true,'dim':'8x8'}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,yP,yP,yP,yP,yP,yP,yP,yP,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,rP,rP,rP,rP,rP,rP,rP,rP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"
};
const verifyPredefinedFENPosition = (fenShorthand) => fenShorthand in predefinedFENpositions;
const fenDataTag = "StartFen4";
const createFENDataTag = () => ({
    tag: "startingPosition",
    currentValue: {
        board: (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.emptyPieceString),
        fenData: new _moveGeneration_FENData_FENData__WEBPACK_IMPORTED_MODULE_2__.FENData(),
        pieceSet: new Set()
    },
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_6__.tagNamesEqual)(inputTag, fenDataTag);
    },
    parseTag(inputTag) {
        const tagContents = (0,_Utils__WEBPACK_IMPORTED_MODULE_6__.unwrapTag)(inputTag, fenDataTag);
        const fenDataString = verifyPredefinedFENPosition(tagContents) ? predefinedFENpositions[tagContents] : tagContents;
        const fenData = new _moveGeneration_FENData_FENData__WEBPACK_IMPORTED_MODULE_2__.FENData();
        const board = (0,_client_ts_logic_BaseInterfaces__WEBPACK_IMPORTED_MODULE_1__.initializeBoardSquares)(() => _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.emptyPieceString);
        const pieceSet = new Set();
        const transparentWall = (0,_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.createPieceFromString)("x");
        const parts = fenDataString.split("-");
        if (parts.length < 7 || parts[parts.length - 1].split("/").length !== _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension) {
            console.warn("FEN has less than 7 parts: " + fenDataString);
        }
        else {
            const sideToMove = parts[0].charAt(0).toLowerCase();
            if ((0,_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_4__.verifyColorEnumValue)(sideToMove)) {
                fenData.sideToMove = _moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_4__.colorEnum[sideToMove];
            }
            else {
                console.warn("FEN option 1: side to move is not an alphabetic color: " + sideToMove);
            }
            modifyFourBooleanParameter(parts[1], fenData.fenOptions.tag("dead"));
            modifyFourBooleanParameter(parts[2], fenData.fenOptions.tag("castleKingside"));
            modifyFourBooleanParameter(parts[3], fenData.fenOptions.tag("castleQueenside"));
            const points = parts[4].split(",").map(e => Number(e));
            if ((0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.verifyTupleType)(points, _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers)) {
                fenData.points = points;
            }
            else {
                console.warn(`FEN option 5: points is of incorrect length: ${points.join(",")}`);
            }
            fenData.plyCount = Number(parts[5]);
            const royals = (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(null, _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers);
            const verifyKeyInTags = (key) => key in fenData.fenOptions.tags;
            if (parts[6].startsWith("{")) {
                const initialParsing = JSON.parse(parts[6].replaceAll("(", '[').replaceAll(")", "]").replaceAll("'", '"'));
                if (typeof initialParsing !== 'object' || initialParsing === null)
                    throw new Error("Unexpected object definition syntax for " + String(initialParsing));
                for (const [key, value] of Object.entries(initialParsing)) {
                    if (!verifyKeyInTags(key))
                        continue;
                    const tag = fenData.fenOptions.tags[key];
                    tag.value = tag.parse(value);
                }
            }
            const position = parts[parts.length - 1].split("/"), dimension = fenData.fenOptions.tag("dim");
            position.forEach((line, i) => {
                let j = 0;
                for (let pieceStr of line.split(",")) {
                    if (pieceStr.endsWith('"'))
                        pieceStr = pieceStr.slice(0, -1);
                    if (isNaN(Number(pieceStr))) {
                        try {
                            if (!checkDimensionIntersection(dimension, [i, j])) {
                                const pieceString = (0,_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_5__.createPieceFromString)(pieceStr);
                                board[i][j] = pieceString;
                                if (pieceString.isPiece()) {
                                    if (pieceString.piece === "K" && !royals[pieceString.color]) {
                                        royals[pieceString.color] = [i, j];
                                    }
                                    pieceSet.add(pieceString.piece);
                                }
                            }
                        }
                        finally {
                            j++;
                        }
                    }
                    else
                        j += Number(pieceStr);
                }
            });
            for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                for (const [piece] of fenData.fenOptions.tag("bank")[color]) {
                    if (piece.piece in _moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_4__.nonPlayablePieces)
                        continue;
                    pieceSet.add(piece.piece);
                }
            }
            fenData.fenOptions.setTag("royal", royals);
            for (let i = 0; i < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension; i++) {
                for (let j = 0; j < _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension; j++) {
                    if (checkDimensionIntersection(dimension, [i, j]))
                        board[i][j] = transparentWall;
                }
            }
        }
        if (!fenData.fenOptions.tag("noCorners")) {
            const cornerAreaSize = 3, arrayDimension = _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.boardDimension - 1;
            baseLoop: for (let i = 0; i < cornerAreaSize; i++) {
                for (let j = 0; j < cornerAreaSize; j++) {
                    const squares = [
                        [i, j], [arrayDimension - i, j],
                        [i, arrayDimension - j], [arrayDimension - i, arrayDimension - j]
                    ];
                    for (const square of squares) {
                        const pieceString = board[square[0]][square[1]];
                        if (!pieceString.isWall() || pieceString.piece !== transparentWall.piece) {
                            fenData.fenOptions.setTag("noCorners", true);
                            break baseLoop;
                        }
                    }
                }
            }
        }
        return { fenData, board, pieceSet };
    },
    serialize(baseBoard) {
        const { board, data } = baseBoard;
        let resultingString = "";
        resultingString += `${_moveGeneration_GameInformation_GameUnits_GameUnits__WEBPACK_IMPORTED_MODULE_4__.stringColorEnum[data.sideToMove].toUpperCase()}-`;
        resultingString += `${data.fenOptions.tag("dead").map(d => Number(d)).join(",")}-`;
        resultingString += `${data.fenOptions.tag("castleKingside").map(d => Number(d)).join(",")}-`;
        resultingString += `${data.fenOptions.tag("castleQueenside").map(d => Number(d)).join(",")}-`;
        resultingString += `${data.points.join(",")}-`;
        resultingString += `${data.plyCount}-`;
        resultingString += `${serializeFENOptions(data.fenOptions)}-`;
        let currentEmptySquares = 0;
        for (const row of board) {
            for (const pieceString of row) {
                if (pieceString.isEmpty()) {
                    currentEmptySquares++;
                    continue;
                }
                if (currentEmptySquares !== 0) {
                    resultingString += `${currentEmptySquares},`;
                    currentEmptySquares = 0;
                }
                resultingString += `${pieceString.value},`;
            }
            if (currentEmptySquares !== 0) {
                resultingString += `${currentEmptySquares}/`;
                currentEmptySquares = 0;
            }
            else {
                resultingString = resultingString.slice(0, -1);
                resultingString += "/";
            }
        }
        resultingString = resultingString.slice(0, -1);
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_6__.wrapTag)(fenDataTag, resultingString);
    }
});


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/TagLogic/GameMetadataTags.ts":
/*!**************************************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/TagLogic/GameMetadataTags.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDateTag": function() { return /* binding */ createDateTag; },
/* harmony export */   "createGameNumberTag": function() { return /* binding */ createGameNumberTag; },
/* harmony export */   "createPlayerDataTag": function() { return /* binding */ createPlayerDataTag; },
/* harmony export */   "createResultsTag": function() { return /* binding */ createResultsTag; },
/* harmony export */   "createSiteTag": function() { return /* binding */ createSiteTag; },
/* harmony export */   "createTerminationTag": function() { return /* binding */ createTerminationTag; },
/* harmony export */   "createTimeControlTag": function() { return /* binding */ createTimeControlTag; },
/* harmony export */   "createVariantTypeTag": function() { return /* binding */ createVariantTypeTag; }
/* harmony export */ });
/* harmony import */ var _client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/ts/baseTypes */ "./src/main/client/ts/baseTypes.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/ts/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/NumberUtils */ "./src/main/client/ts/utils/NumberUtils.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils */ "./src/main/client/ts/logic/utils/Tags/Utils.ts");




const variantTypeTag = "Variant";
const createVariantTypeTag = () => ({
    tag: "variantType",
    currentValue: _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.VariantType.FFA,
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, variantTypeTag);
    },
    parseTag(inputTag) {
        const tagContents = (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(inputTag, variantTypeTag);
        for (const type of Object.values(_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.VariantType)) {
            if (tagContents === type)
                return type;
        }
        return _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.VariantType.FFA;
    },
    serialize(board) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(variantTypeTag, board.gameType.type);
    }
});
const variantDateTag = "Date";
const createDateTag = () => ({
    tag: "date",
    currentValue: new Date(),
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, variantDateTag);
    },
    parseTag(tagContents) {
        return new Date((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(tagContents, variantDateTag));
    },
    serialize(board) {
        if (!board.gameData.date)
            return;
        if (typeof board.gameData.date === "object") {
            return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(variantDateTag, board.gameData.date.toUTCString());
        }
        else {
            return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(variantDateTag, board.gameData.date);
        }
    }
});
const variantSiteTag = "Site";
const createSiteTag = () => ({
    tag: "site",
    currentValue: "",
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, variantSiteTag);
    },
    parseTag(tagContents) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(tagContents, variantSiteTag);
    },
    serialize(board) {
        if (!board.gameData.site)
            return;
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(variantSiteTag, board.gameData.site);
    }
});
const variantTimeControlTag = "TimeControl", getDefaultTimeControl = () => ({ baseTime: 180, increment: 2, isDelay: false });
const createTimeControlTag = () => ({
    tag: "timeControl",
    currentValue: getDefaultTimeControl(),
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, variantTimeControlTag);
    },
    parseTag(inputTag) {
        const defaultTC = getDefaultTimeControl();
        const matchArray = (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(inputTag, variantTimeControlTag)
            .match(/^((?:0\.\d\d?)?|(?:\d\d?s?))(?:(?:(?:\+|\|)(\d\d?)(D?))|(\smin))$/)?.slice(1);
        if (matchArray) {
            const [minutesMatch, secondsMatch, delay] = matchArray;
            if (!secondsMatch)
                return defaultTC;
            defaultTC.isDelay = delay ? true : false;
            if (/\smin/.test(secondsMatch)) {
                defaultTC.increment = 0;
            }
            else {
                defaultTC.increment = Number(secondsMatch);
            }
            if (minutesMatch.endsWith("s")) {
                defaultTC.baseTime = Math.round(Number(minutesMatch.slice(0, -1)));
            }
            else {
                defaultTC.baseTime = Number(minutesMatch) * 60;
            }
        }
        return defaultTC;
    },
    serialize(board) {
        const timeControl = board.gameData.timeControl;
        const noIncrement = timeControl.increment === 0;
        let timeControlString = "";
        if (timeControl.baseTime < 60) {
            timeControlString += noIncrement ? `${timeControl.baseTime * 60} sec` : `${timeControl.baseTime * 60}s`;
        }
        else if (timeControl.baseTime > 60 && noIncrement) {
            timeControlString += `${(0,_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__.truncateNumber)(timeControl.baseTime / 60, 1)} min`;
        }
        else {
            timeControlString += (0,_utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__.truncateNumber)(timeControl.baseTime / 60, 1);
        }
        if (!noIncrement) {
            timeControlString += "|";
            timeControlString += timeControl.increment;
        }
        if (timeControl.isDelay) {
            timeControlString += "D";
        }
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(variantTimeControlTag, timeControlString);
    }
});
const variantTerminationTag = "Termination";
const createTerminationTag = () => ({
    tag: "termination",
    currentValue: undefined,
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, variantTerminationTag);
    },
    parseTag(inputTag) {
        const tagContents = (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(inputTag, variantTerminationTag);
        return (0,_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.validateTerminationString)(tagContents) ? tagContents : undefined;
    },
    serialize(board) {
        if (!board.gameData.termination)
            return;
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(variantTerminationTag, board.gameData.termination);
    }
});
const variantGameId = "GameNr";
const createGameNumberTag = () => ({
    tag: "gameNumber",
    currentValue: undefined,
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, variantGameId);
    },
    parseTag(inputTag) {
        const id = Number((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(inputTag, variantGameId));
        return isNaN(id) ? undefined : id;
    },
    serialize(board) {
        if (!board.gameData.gameNumber)
            return;
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(variantGameId, board.gameData.gameNumber.toString());
    }
});
const createPlayerDataTag = () => ({
    tag: "playerData",
    currentValue: (0,_client_ts_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTupleFromCallback)(() => ({}), _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.totalPlayers),
    verifyTagInParsing(inputTag) {
        for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.colors) {
            const playerName = (0,_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.getPlayerNameFromColor)(color);
            if ((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, playerName) || (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, `${playerName}Elo`))
                return true;
        }
        return false;
    },
    parseTag(inputTag) {
        for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.colors) {
            const playerName = (0,_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.getPlayerNameFromColor)(color);
            const newCurrentValue = [...this.currentValue];
            if ((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, playerName)) {
                const name = (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(inputTag, playerName);
                if (name)
                    newCurrentValue[color] = { ...newCurrentValue[color], name };
                return newCurrentValue;
            }
            else if ((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, `${playerName}Elo`)) {
                const elo = Number((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(inputTag, playerName));
                if (!isNaN(elo))
                    newCurrentValue[color] = { ...newCurrentValue[color], elo };
                return newCurrentValue;
            }
        }
        throw new Error("Tag does not match any player data signature");
    },
    serialize(board) {
        const uniqueResultingTags = [];
        for (const color of _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.colors) {
            const playerData = board.gameData.players[color];
            if (playerData.elo) {
                uniqueResultingTags.push((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(`${_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.playerNames[color]}Elo`, String(playerData.elo)));
            }
            if (playerData.name) {
                uniqueResultingTags.push((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(`${_moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_1__.playerNames[color]}`, String(playerData.name)));
            }
        }
        return uniqueResultingTags.join("\n");
    }
});
const resultsTag = "Results";
const createResultsTag = () => ({
    tag: "results",
    currentValue: "",
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.tagNamesEqual)(inputTag, resultsTag);
    },
    parseTag(tagContents) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.unwrapTag)(tagContents, resultsTag);
    },
    serialize(board) {
        if (!board.gameData.result)
            return;
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.wrapTag)(resultsTag, board.gameData.result);
    }
});


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/TagLogic/VariantRulesTag.ts":
/*!*************************************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/TagLogic/VariantRulesTag.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVariantRulesTag": function() { return /* binding */ createVariantRulesTag; }
/* harmony export */ });
/* harmony import */ var _moveGeneration_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @moveGeneration/VariantRules/VariantRuleSetup */ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleSetup.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils */ "./src/main/client/ts/logic/utils/Tags/Utils.ts");


const variantRulesTag = "RuleVariants";
const createVariantRulesTag = () => ({
    tag: "variantRules",
    currentValue: (0,_moveGeneration_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_0__.createBaseParsingTypes)(),
    verifyTagInParsing(inputTag) {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.tagNamesEqual)(inputTag, variantRulesTag);
    },
    parseTag(tagContents) {
        return (0,_moveGeneration_VariantRules_VariantRuleSetup__WEBPACK_IMPORTED_MODULE_0__.parseVariantRules)((0,_Utils__WEBPACK_IMPORTED_MODULE_1__.unwrapTag)(tagContents, variantRulesTag));
    },
    serialize(board) {
        const resultingRuleList = [], variantRules = board.variantRules;
        const mergedRuleList = [
            ...variantRules.boardDecorators,
            ...variantRules.fenDataDecorators,
            ...variantRules.pieceControlDecorators
        ];
        for (const rule of mergedRuleList) {
            const serializedForm = rule.serializeToParsingForm();
            if (serializedForm) {
                resultingRuleList.push(serializedForm);
            }
        }
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.wrapTag)(variantRulesTag, resultingRuleList.join(" "));
    }
});


/***/ }),

/***/ "./src/main/client/ts/logic/utils/Tags/Utils.ts":
/*!******************************************************!*\
  !*** ./src/main/client/ts/logic/utils/Tags/Utils.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseEnPassantCoordinates": function() { return /* binding */ parseEnPassantCoordinates; },
/* harmony export */   "parseSingleCoordinate": function() { return /* binding */ parseSingleCoordinate; },
/* harmony export */   "tagNamesEqual": function() { return /* binding */ tagNamesEqual; },
/* harmony export */   "unwrapTag": function() { return /* binding */ unwrapTag; },
/* harmony export */   "wrapTag": function() { return /* binding */ wrapTag; }
/* harmony export */ });
function parseSingleCoordinate(coordinate) {
    if (coordinate.length === 0)
        return;
    const parsedCoordinate = [14 - Number(coordinate.slice(1)), coordinate.charCodeAt(0) - 97];
    if (Number.isNaN(parsedCoordinate[0]) || Number.isNaN(parsedCoordinate[1]))
        return;
    if (parsedCoordinate[0] < 0 || parsedCoordinate[0] > 13 || parsedCoordinate[1] < 0 || parsedCoordinate[1] > 13)
        return;
    return parsedCoordinate;
}
function parseEnPassantCoordinates(coordinates) {
    if (coordinates.length === 0)
        return;
    const coordinatesArray = coordinates.split(":");
    return [[14 - Number(coordinatesArray[0].slice(1)), coordinatesArray[0].charCodeAt(0) - 97],
        [14 - Number(coordinatesArray[1].slice(1)), coordinatesArray[1].charCodeAt(0) - 97]];
}
const wrapTag = (baseTag, content) => `[${baseTag} "${content}"]`;
const tagNamesEqual = (baseTag, definedTag) => baseTag.toLowerCase().startsWith(`[${definedTag.toLowerCase()} "`);
const unwrapTag = (baseTag, definedTag) => baseTag.replace(`[${definedTag} "`, "").slice(0, -1);


/***/ }),

/***/ "./src/main/client/ts/utils/ArrayUtils.ts":
/*!************************************************!*\
  !*** ./src/main/client/ts/utils/ArrayUtils.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compareArrays": function() { return /* binding */ compareArrays; },
/* harmony export */   "countMinimumOf2DArrayExcludingZero": function() { return /* binding */ countMinimumOf2DArrayExcludingZero; },
/* harmony export */   "findLastIndex": function() { return /* binding */ findLastIndex; },
/* harmony export */   "shuffleArray": function() { return /* binding */ shuffleArray; }
/* harmony export */ });
function shuffleArray(array) {
    let i = array.length;
    let r = 0;
    while (i !== 0) {
        r = Math.floor(Math.random() * i--);
        [array[i], array[r]] = [array[r], array[i]];
    }
    return array;
}
function compareArrays(arr1, arr2) {
    if (arr1 === arr2)
        return true;
    if (arr1.length !== arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++) {
        const first = arr1[i], second = arr2[i];
        if (Array.isArray(first) && Array.isArray(second)) {
            if (!compareArrays(first, second))
                return false;
        }
        else if (first !== second) {
            return false;
        }
    }
    return true;
}
function countMinimumOf2DArrayExcludingZero(array) {
    let minimum = Infinity;
    for (const row of array) {
        for (const number of row) {
            if (number !== 0 && number < minimum) {
                minimum = number;
            }
        }
    }
    return minimum;
}
function findLastIndex(array, callback) {
    let i = array.length;
    while (i--) {
        if (callback(array[i], i, array))
            return i;
    }
    return -1;
}


/***/ }),

/***/ "./src/main/client/ts/utils/NumberUtils.ts":
/*!*************************************************!*\
  !*** ./src/main/client/ts/utils/NumberUtils.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bitCount": function() { return /* binding */ bitCount; },
/* harmony export */   "truncateNumber": function() { return /* binding */ truncateNumber; }
/* harmony export */ });
function truncateNumber(number, digits) {
    const multiplier = Math.pow(10, digits);
    const adjusted = number * multiplier;
    if (adjusted < 0) {
        return Math.ceil(adjusted / multiplier);
    }
    else {
        return Math.floor(adjusted / multiplier);
    }
}
function bitCount(number) {
    number = number - ((number >> 1) & 0x55555555);
    number = (number & 0x33333333) + ((number >> 2) & 0x33333333);
    return ((number + (number >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
}


/***/ }),

/***/ "./src/main/client/ts/utils/ObjectUtils.ts":
/*!*************************************************!*\
  !*** ./src/main/client/ts/utils/ObjectUtils.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyClass": function() { return /* binding */ copyClass; },
/* harmony export */   "verifyObjectType": function() { return /* binding */ verifyObjectType; },
/* harmony export */   "verifyPropertiesInObject": function() { return /* binding */ verifyPropertiesInObject; }
/* harmony export */ });
function copyClass(instance, baseClass, customProperties = false) {
    const prototype = Object.getPrototypeOf(instance);
    if (typeof prototype !== 'object')
        throw new Error("Expected prototype to be an object");
    const properties = Object.create(prototype);
    if (typeof properties !== 'object' || properties === null)
        throw new Error("Expected prototype to be an object");
    const copy = Object.assign(properties, customProperties ? {} : instance);
    if (!(copy instanceof baseClass))
        throw new Error("Expected prototype to not be overridden");
    return copy;
}
const verifyObjectType = (v) => typeof v === "object" && v !== null;
function verifyPropertiesInObject(obj, keys) {
    for (const key of keys) {
        if (!Object.prototype.hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}


/***/ }),

/***/ "./src/main/client/ts/utils/StringFormatUtils.ts":
/*!*******************************************************!*\
  !*** ./src/main/client/ts/utils/StringFormatUtils.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compileEnumeration": function() { return /* binding */ compileEnumeration; },
/* harmony export */   "convertCamelCaseToKebabCase": function() { return /* binding */ convertCamelCaseToKebabCase; },
/* harmony export */   "convertSecondsToFlexibleHoursMinutesSeconds": function() { return /* binding */ convertSecondsToFlexibleHoursMinutesSeconds; },
/* harmony export */   "formatOrdinalNumber": function() { return /* binding */ formatOrdinalNumber; },
/* harmony export */   "hashString": function() { return /* binding */ hashString; },
/* harmony export */   "prefixWithIndefiniteArticle": function() { return /* binding */ prefixWithIndefiniteArticle; }
/* harmony export */ });
function formatOrdinalNumber(num) {
    const lastTwoDigits = Number(String(num).slice(-2));
    if (lastTwoDigits > 3 && lastTwoDigits < 21)
        return 'th';
    switch (lastTwoDigits % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}
function compileEnumeration(list) {
    if (list.length === 0)
        return "";
    if (list.length === 1)
        return list[0];
    let result = "";
    for (let i = 0; i < list.length; i++) {
        if (i === list.length - 2) {
            result += ` ${list[i]} or `;
        }
        else if (i === list.length - 1) {
            result += list[i];
        }
        else {
            result += list[i] + ", ";
        }
    }
    return result;
}
function prefixWithIndefiniteArticle(str) {
    const vowels = /[AEUIO]/i;
    return vowels.test(str.charAt(0)) ? "an " + str : "a " + str;
}
function convertSecondsToFlexibleHoursMinutesSeconds(seconds) {
    if (seconds >= 3600) {
        return new Date(seconds * 1000).toISOString().substring(11, 16);
    }
    else {
        return new Date(seconds * 1000).toISOString().substring(14, 19);
    }
}
function convertCamelCaseToKebabCase(baseString) {
    return baseString.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function hashString(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash;
}


/***/ }),

/***/ "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions sync recursive \\.ts$":
/*!******************************************************************************************!*\
  !*** ./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/ sync \.ts$ ***!
  \******************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./BoardDecorators/AllowPassing.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/AllowPassing.ts",
	"./BoardDecorators/AlternativeTeams.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/AlternativeTeams.ts",
	"./BoardDecorators/BarePieceRule.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/BarePieceRule.ts",
	"./BoardDecorators/Blindfold.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Blindfold.ts",
	"./BoardDecorators/CaptureTheKing.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/CaptureTheKing.ts",
	"./BoardDecorators/Chess960.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Chess960.ts",
	"./BoardDecorators/Crazyhouse.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Crazyhouse.ts",
	"./BoardDecorators/DuckChess.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/DuckChess.ts",
	"./BoardDecorators/FogOfWar.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/FogOfWar.ts",
	"./BoardDecorators/ForcedCapture.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ForcedCapture.ts",
	"./BoardDecorators/GameMetadataRules.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/GameMetadataRules.ts",
	"./BoardDecorators/Ghostboard.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Ghostboard.ts",
	"./BoardDecorators/ParadigmChess30.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/ParadigmChess30.ts",
	"./BoardDecorators/PiecesFaceCenter.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/PiecesFaceCenter.ts",
	"./BoardDecorators/SeirawanSetup.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SeirawanSetup.ts",
	"./BoardDecorators/SelfCheck.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SelfCheck.ts",
	"./BoardDecorators/SetupChess.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/SetupChess.ts",
	"./BoardDecorators/Taboo.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardDecorators/Taboo.ts",
	"./BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluation.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluation.ts",
	"./BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluationExtensions.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/ComfuterEvaluationExtensions.ts",
	"./BoardVariantModules/EngineMoveGeneration/Algorithms/MixedAlgorithms.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/MixedAlgorithms.ts",
	"./BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluation.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluation.ts",
	"./BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluationExtensions.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/Algorithms/RandomEvaluationExtensions.ts",
	"./BoardVariantModules/EngineMoveGeneration/BotInterface.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface.ts",
	"./BoardVariantModules/InsufficientMaterial/InsufficientMaterialGeneration.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/InsufficientMaterialGeneration.ts",
	"./BoardVariantModules/InsufficientMaterial/PieceMedianCounter.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/PieceMedianCounter.ts",
	"./FENDataDecorators/Atomic.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Atomic.ts",
	"./FENDataDecorators/DeadKingWalking.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/DeadKingWalking.ts",
	"./FENDataDecorators/EnPassant.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/EnPassant.ts",
	"./FENDataDecorators/FatalCapture.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FatalCapture.ts",
	"./FENDataDecorators/FiftyMoveRule.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/FiftyMoveRule.ts",
	"./FENDataDecorators/Giveaway.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Giveaway.ts",
	"./FENDataDecorators/KingOfTheHill.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/KingOfTheHill.ts",
	"./FENDataDecorators/NCheck.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/NCheck.ts",
	"./FENDataDecorators/OppositeMultiplier.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/OppositeMultiplier.ts",
	"./FENDataDecorators/OppositeSideCastling.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/OppositeSideCastling.ts",
	"./FENDataDecorators/PiecesGoToBanks.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PiecesGoToBanks.ts",
	"./FENDataDecorators/PlayForMate.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PlayForMate.ts",
	"./FENDataDecorators/PointsForMate.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/PointsForMate.ts",
	"./FENDataDecorators/StalemateOptions.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/StalemateOptions.ts",
	"./FENDataDecorators/Takeover.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/Takeover.ts",
	"./FENDataDecorators/ThreefoldRepetition.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/FENDataDecorators/ThreefoldRepetition.ts",
	"./PieceControlDecorators/AnyCapture.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/AnyCapture.ts",
	"./PieceControlDecorators/PromoteTo.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromoteTo.ts",
	"./PieceControlDecorators/PromotionRank.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/PromotionRank.ts",
	"./PieceControlDecorators/RoyalsCannotCapture.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/RoyalsCannotCapture.ts",
	"./PieceControlDecorators/Sideways.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Sideways.ts",
	"./PieceControlDecorators/Stonewall.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Stonewall.ts",
	"./PieceControlDecorators/Torpedo.ts": "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions/PieceControlDecorators/Torpedo.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/main/client/ts/logic/movegen/VariantRules/VariantRuleDefinitions sync recursive \\.ts$";

/***/ })

}]);
//# sourceMappingURL=src_main_client_ts_logic_movegen_VariantRules_VariantRule_ts.react-app.js.map