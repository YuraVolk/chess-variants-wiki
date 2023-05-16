"use strict";
(self["webpackChunkspring_react_app"] = self["webpackChunkspring_react_app"] || []).push([["src_main_client_javascript_logic_index_GameBoardWorker_ts"],{

/***/ "./src/main/client/javascript/logic/index/GameBoardWorker.ts":
/*!*******************************************************************!*\
  !*** ./src/main/client/javascript/logic/index/GameBoardWorker.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dispatchSyncRecord": function() { return /* binding */ dispatchSyncRecord; },
/* harmony export */   "initialDispatches": function() { return /* binding */ initialDispatches; },
/* harmony export */   "requiredDispatches": function() { return /* binding */ requiredDispatches; }
/* harmony export */ });
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _moveGeneration_Board_Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @moveGeneration/Board/Board */ "./src/main/client/javascript/logic/movegen/Board/Board.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameData */ "./src/main/client/javascript/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @moveGeneration/GameInformation/GameUnits/PieceString */ "./src/main/client/javascript/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeInterface */ "./src/main/client/javascript/logic/movegen/MoveTree/MoveTreeInterface.ts");
/* harmony import */ var _moveGeneration_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @moveGeneration/VariantRules/VariantRule */ "./src/main/client/javascript/logic/movegen/VariantRules/VariantRule.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @utils/ArrayUtils */ "./src/main/client/javascript/utils/ArrayUtils.ts");
/* harmony import */ var _utils_Tags_InputOutputProcessing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/Tags/InputOutputProcessing */ "./src/main/client/javascript/logic/utils/Tags/InputOutputProcessing.ts");
/* harmony import */ var _client_javascript_baseTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @client/javascript/baseTypes */ "./src/main/client/javascript/baseTypes.ts");
/* harmony import */ var _moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @moveGeneration/Board/BoardInterface */ "./src/main/client/javascript/logic/movegen/Board/BoardInterface.ts");
/* harmony import */ var _moveGeneration_MoveTree_MoveTreeValidator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTreeValidator */ "./src/main/client/javascript/logic/movegen/MoveTree/MoveTreeValidator.ts");
/* harmony import */ var _moveGeneration_MoveTree_MoveTree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @moveGeneration/MoveTree/MoveTree */ "./src/main/client/javascript/logic/movegen/MoveTree/MoveTree.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












const requiredDispatches = [];
const initialDispatches = [];
const dispatchSyncRecord = {};
function withWorkerResult() {
    return function (_, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = (function (...args) {
            postMessage([propertyKey, originalMethod.apply(this, args)]);
        });
    };
}
function workerDataSync(type, gameObjectPropertySync) {
    return function (_, propertyKey) {
        if (type === "required") {
            initialDispatches.push(propertyKey);
            requiredDispatches.push(propertyKey);
        }
        else {
            initialDispatches.push(propertyKey);
        }
        dispatchSyncRecord[propertyKey] = gameObjectPropertySync;
    };
}
class RequestManager {
    board;
    initiallyAliveColors = [];
    internalMoves = [];
    legalMoves = new Map();
    fogOfWarPerspective = false;
    stripPieceStrings(object) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(JSON.stringify(object));
    }
    generateInitiallyAliveColors() {
        return this.board.data.fenOptions.tag("dead").map(d => !d).reduce((p, n, i) => {
            if (n) {
                return [...p, i];
            }
            else
                return p;
        }, []);
    }
    generateCurrentMoves() {
        this.internalMoves = this.board.getAllowedInternalMoves(), this.legalMoves = new Map();
        for (const piece of this.board.getPlayerPieces()[this.board.data.sideToMove]) {
            this.legalMoves.set((0,_moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_9__.stringifyCoordinate)(piece), this.board.getLegalMoves(piece[0], piece[1]));
        }
    }
    construct(pgn4) {
        this.board = new _moveGeneration_Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board(pgn4);
        this.board = (0,_moveGeneration_VariantRules_VariantRule__WEBPACK_IMPORTED_MODULE_5__.decorateClassWithVariants)(this.board, _moveGeneration_Board_Board__WEBPACK_IMPORTED_MODULE_1__.Board, this.board.variantRules.boardDecorators);
        this.generateInitiallyAliveColors();
        this.board.moves = (0,_moveGeneration_MoveTree_MoveTreeValidator__WEBPACK_IMPORTED_MODULE_10__.validateMoveTree)(this.board, this.board.moves);
        this.board.moves.currentMove = [-1];
        (0,_moveGeneration_MoveTree_MoveTreeValidator__WEBPACK_IMPORTED_MODULE_10__.changeGameTermination)(this.board);
        this.generateCurrentMoves();
    }
    getFENSettings() {
        const board = this.board;
        const royalCount = (0,_client_javascript_baseTypes__WEBPACK_IMPORTED_MODULE_8__.createTuple)(0, _moveGeneration_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_2__.totalPlayers);
        let isCustomRoyals = false;
        for (const row of this.board.board) {
            for (const square of row) {
                if (square.isPiece() && square.piece === "K" && ((++royalCount[square.color]) > 1)) {
                    isCustomRoyals = true;
                    break;
                }
            }
            if (isCustomRoyals)
                break;
        }
        return {
            sideToMove: board.data.sideToMove, points: [...board.data.points],
            isCustomRoyals,
            fenOptions: {
                areBanksEnabled: board.data.fenOptions.tag("areBanksEnabled"),
                whiteBlack: board.data.fenOptions.tag("wb"), dimension: board.data.fenOptions.tag("dim"),
                noCorners: board.data.fenOptions.tag("noCorners"), dead: board.data.fenOptions.tag("dead"),
                resigned: board.data.fenOptions.tag("resigned"), zombieType: board.data.fenOptions.tag("zombieType"),
                zombieImmune: board.data.fenOptions.tag("zombieImmune"), royal: board.data.fenOptions.tag("royal"),
                lives: board.data.fenOptions.tag("lives"), dim: board.data.fenOptions.tag("dim"),
                termination: board.data.gameOver,
                bank: board.data.fenOptions.tag("bank").map(map => {
                    const result = [];
                    for (const [key, value] of map) {
                        result.push([key.toObject(), value]);
                    }
                    return result;
                })
            }
        };
    }
    getInitiallyAliveColors() {
        return this.initiallyAliveColors;
    }
    getMoveTree() {
        const traverse = (moves, fullMoveCounter = 0) => {
            const results = [];
            for (const moveWrapper of moves) {
                const resultingWrapper = {
                    alternativeLines: [],
                    comment: moveWrapper.comment,
                    path: moveWrapper.path.slice(),
                    cachedNames: { ...moveWrapper.cachedNames },
                    metadata: {
                        currentSideToMove: moveWrapper.metadata.currentSideToMove,
                        playerClock: moveWrapper.metadata.playerClock,
                        highlightedArrows: moveWrapper.metadata.highlightedArrows,
                        highlightedSquares: moveWrapper.metadata.highlightedSquares
                    }
                };
                if (moveWrapper.metadata.currentFullMove)
                    resultingWrapper.metadata.currentFullMove = moveWrapper.metadata.currentFullMove;
                for (const alternativeLine of moveWrapper.alternativeLines) {
                    resultingWrapper.alternativeLines.push(traverse(alternativeLine, fullMoveCounter - 1));
                }
                results.push(resultingWrapper);
            }
            return results;
        };
        return traverse(this.board.moves.moves);
    }
    loadSnapshotByPath(path) {
        let snapshot;
        if ((0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_6__.compareArrays)(path, [-1])) {
            const preliminarySnapshot = this.board.moves.getBoardSnapshot(-1);
            (0,_client_javascript_baseTypes__WEBPACK_IMPORTED_MODULE_8__.assertNonUndefined)(preliminarySnapshot);
            snapshot = preliminarySnapshot;
        }
        else {
            const currentMove = this.board.moves.getMove(path);
            (0,_moveGeneration_MoveTree_MoveTree__WEBPACK_IMPORTED_MODULE_11__.assertValidMove)(currentMove);
            const preliminarySnapshot = this.board.moves.getBoardSnapshot(currentMove);
            if (!preliminarySnapshot)
                return false;
            snapshot = preliminarySnapshot;
        }
        this.board.loadSnapshot(snapshot.boardSnapshot);
        this.board.moves.currentMove = [...path];
        this.generateCurrentMoves();
        return true;
    }
    verifyNextChainedMovesAreDeleted(move) {
        return !("nextChainedMoves" in move);
    }
    convertStrippedMoveToNormal(move) {
        const newMove = [];
        for (const moveComponent of move) {
            delete moveComponent.nextChainedMoves;
            if (!this.verifyNextChainedMovesAreDeleted(moveComponent))
                throw new Error("Could not delete nextChainedMoves in move component");
            if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.verifyStandardMove)(moveComponent)) {
                newMove.push({ ...moveComponent, promotion: moveComponent.promotion?.map(p => _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.PieceString.fromObjectToClass(p)) });
            }
            else if ((0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.verifyDroppingMove)(moveComponent)) {
                newMove.push({ ...moveComponent, piece: _moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.PieceString.fromObjectToClass(moveComponent.piece) });
            }
            else
                newMove.push(moveComponent);
        }
        if (!(0,_moveGeneration_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_4__.verifyRequiredMove)(newMove))
            throw new Error("Supplied move object had 0 move components");
        return newMove;
    }
    makeMove(passedMove) {
        const board = this.board, move = this.convertStrippedMoveToNormal(passedMove);
        board.moves.augmentMoveWithMetadata({
            move, board, makeMoveFunction: () => {
                return board.makeMove(move);
            }
        });
        this.generateCurrentMoves();
    }
    serializeBoardToPGN() {
        return (0,_utils_Tags_InputOutputProcessing__WEBPACK_IMPORTED_MODULE_7__.serializeBoard)(this.board);
    }
    getDroppingMoves(pieceString) {
        if (this.board.data.gameOver)
            return [];
        return this.stripPieceStrings(this.board.getDroppingMoves(_moveGeneration_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_3__.PieceString.fromObjectToClass(pieceString)));
    }
    getLegalMoves(i, j) {
        if (this.board.data.gameOver)
            return [];
        return this.stripPieceStrings(this.legalMoves.get((0,_moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_9__.stringifyCoordinate)([i, j])) ?? this.board.getLegalMoves(i, j));
    }
    getInternalMoves() {
        if (this.board.data.gameOver)
            return [];
        return this.stripPieceStrings(this.internalMoves);
    }
    getVariantData() {
        return this.stripPieceStrings(this.board.variantData);
    }
    getBoard() {
        return this.board.board.map(r => r.map(p => p.toObject()));
    }
    getGameData() {
        const newGameData = { ...this.board.gameData };
        if (typeof newGameData.date === "object") {
            newGameData.date = newGameData.date.toUTCString();
        }
        return newGameData;
    }
    getCurrentMove() {
        return this.board.moves.currentMove;
    }
    getVariantRules() {
        const resultingRules = [];
        let key;
        for (key in this.board.variantRules) {
            if (!Object.prototype.hasOwnProperty.call(this.board.variantRules, key))
                continue;
            for (const variantRule of this.board.variantRules[key]) {
                resultingRules.push(variantRule.getPublicProperties());
            }
        }
        return resultingRules;
    }
    getVariantType() {
        return this.board.gameType.type;
    }
    deleteMove(path) {
        if (this.board.moves.moves.length !== 0)
            this.board.moves.deleteMove(path);
    }
    playPreferredBotMove() {
        if (this.board.data.getRealPlayers() <= 1)
            return;
        const legalMoves = [];
        for (const piece of this.board.getPlayerPieces()[this.board.data.sideToMove]) {
            legalMoves.push(...(this.legalMoves.get((0,_moveGeneration_Board_BoardInterface__WEBPACK_IMPORTED_MODULE_9__.stringifyCoordinate)(piece)) ?? this.board.getLegalMoves(piece[0], piece[1])));
        }
        // TODO Pick strongest piece
        legalMoves.push(...this.board.preGeneratedAttacks[this.board.data.sideToMove].pieceDrops.piece);
        legalMoves.push(...this.board.preGeneratedAttacks[this.board.data.sideToMove].pieceDrops.pawn);
        legalMoves.push(...this.internalMoves);
        const algorithm = this.board.data.fenOptions.getDefaultZombieAlgorithm(this.board.data.sideToMove);
        const moves = algorithm.evaluate(legalMoves, this.board);
        return this.stripPieceStrings(algorithm.pickPreferredMove(moves));
    }
    changeFogPerspective() {
        if (!this.board.variantData.fogOfWar || this.board.data.getRealPlayers() <= 1)
            return this.fogOfWarPerspective;
        if (this.fogOfWarPerspective === false) {
            this.fogOfWarPerspective = this.board.data.sideToMove;
        }
        else {
            const newPerspective = this.board.data.nextTurn(this.fogOfWarPerspective);
            if (newPerspective === this.board.data.sideToMove) {
                this.fogOfWarPerspective = false;
            }
            else
                this.fogOfWarPerspective = newPerspective;
        }
        return this.fogOfWarPerspective;
    }
    getSquareVisibility() {
        if (this.fogOfWarPerspective === false) {
            return this.board.getSquareVisibility();
        }
        else {
            const sideToMove = this.board.data.sideToMove;
            this.board.data.sideToMove = this.fogOfWarPerspective;
            const squareVisibility = this.board.getSquareVisibility();
            this.board.data.sideToMove = sideToMove;
            return squareVisibility;
        }
    }
}
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "construct", null);
__decorate([
    workerDataSync("required", "publicFENSettings"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getFENSettings", null);
__decorate([
    workerDataSync("initial", "initiallyAliveColors"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getInitiallyAliveColors", null);
__decorate([
    workerDataSync("required", "moveTree"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getMoveTree", null);
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "loadSnapshotByPath", null);
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "makeMove", null);
__decorate([
    workerDataSync("required", "serializedPGN"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "serializeBoardToPGN", null);
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getDroppingMoves", null);
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getLegalMoves", null);
__decorate([
    workerDataSync("required", "allowedInternalMoves"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getInternalMoves", null);
__decorate([
    workerDataSync("initial", "variantDataRules"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getVariantData", null);
__decorate([
    workerDataSync("required", "boardSquares"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getBoard", null);
__decorate([
    workerDataSync("required", "gameData"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getGameData", null);
__decorate([
    workerDataSync("required", "currentMove"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getCurrentMove", null);
__decorate([
    workerDataSync("initial", "variantRules"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getVariantRules", null);
__decorate([
    workerDataSync("initial", "variantType"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getVariantType", null);
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "deleteMove", null);
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "playPreferredBotMove", null);
__decorate([
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "changeFogPerspective", null);
__decorate([
    workerDataSync("required", "squareVisibility"),
    withWorkerResult(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestManager.prototype, "getSquareVisibility", null);
const requestManager = new RequestManager();
self.onmessage = (e) => {
    if (!(e.data.requestName in RequestManager.prototype))
        return;
    const method = RequestManager.prototype[e.data.requestName];
    method.apply(requestManager, e.data.parameters);
};


/***/ }),

/***/ "./src/main/client/javascript/logic/movegen/Board/BoardMoveValidator.ts":
/*!******************************************************************************!*\
  !*** ./src/main/client/javascript/logic/movegen/Board/BoardMoveValidator.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateBoardMove": function() { return /* binding */ validateBoardMove; }
/* harmony export */ });
/* harmony import */ var _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MoveTree/MoveTreeInterface */ "./src/main/client/javascript/logic/movegen/MoveTree/MoveTreeInterface.ts");

function validateBoardMove(board, move) {
    let startingMoves;
    const firstMove = move[0];
    if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(firstMove)) {
        startingMoves = board.getLegalMoves(firstMove.startCoordinates[0], firstMove.startCoordinates[1]);
    }
    else if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyDroppingMove)(firstMove)) {
        startingMoves = board.getDroppingMoves(firstMove.piece);
    }
    else if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyInternalMove)(firstMove)) {
        startingMoves = board.getAllowedInternalMoves();
    }
    else
        throw new Error(`Unexpected move signature encountered: ${JSON.stringify(move)}`);
    const specialMoveSettings = {
        hasEnPassant: false
    };
    if (board.variantData.duckChess && move.length === 1)
        return false;
    for (const moveComponent of move) {
        const move = startingMoves.find(legalMove => (0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.compareMoves)(legalMove, moveComponent));
        if (!move)
            return false;
        if ((0,_MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.verifyStandardMove)(move) && move.specialType === _MoveTree_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_0__.SpecialMove.EnPassant) {
            specialMoveSettings.hasEnPassant = true;
        }
        if (move.nextChainedMoves) {
            startingMoves = move.nextChainedMoves;
        }
    }
    return specialMoveSettings;
}


/***/ }),

/***/ "./src/main/client/javascript/logic/movegen/MoveTree/MoveTreeValidator.ts":
/*!********************************************************************************!*\
  !*** ./src/main/client/javascript/logic/movegen/MoveTree/MoveTreeValidator.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeGameTermination": function() { return /* binding */ changeGameTermination; },
/* harmony export */   "validateMoveTree": function() { return /* binding */ validateMoveTree; }
/* harmony export */ });
/* harmony import */ var _client_javascript_baseTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @client/javascript/baseTypes */ "./src/main/client/javascript/baseTypes.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/ArrayUtils */ "./src/main/client/javascript/utils/ArrayUtils.ts");
/* harmony import */ var _Board_BoardMoveValidator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Board/BoardMoveValidator */ "./src/main/client/javascript/logic/movegen/Board/BoardMoveValidator.ts");
/* harmony import */ var _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameInformation/GameData */ "./src/main/client/javascript/logic/movegen/GameInformation/GameData.ts");
/* harmony import */ var _GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameInformation/GameUnits/PieceString */ "./src/main/client/javascript/logic/movegen/GameInformation/GameUnits/PieceString.ts");
/* harmony import */ var _MoveTree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MoveTree */ "./src/main/client/javascript/logic/movegen/MoveTree/MoveTree.ts");
/* harmony import */ var _MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MoveTreeInterface */ "./src/main/client/javascript/logic/movegen/MoveTree/MoveTreeInterface.ts");







function validateMoveTree(board, moves) {
    const clonedBoard = board.createClone();
    clonedBoard.moves = (0,_MoveTree__WEBPACK_IMPORTED_MODULE_5__.createMoveTree)(clonedBoard.createSnapshot());
    clonedBoard.pregenerateAttacks();
    const dimension = Math.max(...clonedBoard.data.fenOptions.tag("dim"));
    function traverse(current, currentFullMove = 0, currentTimeOnClocks = (0,_client_javascript_baseTypes__WEBPACK_IMPORTED_MODULE_0__.createTuple)(board.gameData.timeControl.baseTime, _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers)) {
        const moves = [];
        let previousSideToMove = -1;
        for (let i = 0; i < current.length; i++) {
            const moveWrapper = current[i];
            const { moveData, path, alternativeLines } = moveWrapper;
            const newMoveWrapper = (0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.createBaseMoveWrapper)({ moveData, path: path.slice() }, {
                comment: moveWrapper.comment
            });
            let validationResult;
            try {
                if ((validationResult = (0,_Board_BoardMoveValidator__WEBPACK_IMPORTED_MODULE_2__.validateBoardMove)(clonedBoard, moveData) || undefined)) {
                    newMoveWrapper.moveData = moveData;
                }
                else
                    break;
            }
            catch (_) {
                break;
            }
            let firstStandardMoveSet = false;
            for (const moveComponent of moveData) {
                if ((0,_MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.verifyStandardMove)(moveComponent)) {
                    if ("promotion" in moveComponent) {
                        moveComponent.promotion = moveComponent.promotion?.map(p => {
                            if (p.isWall())
                                return p;
                            return (0,_GameInformation_GameUnits_PieceString__WEBPACK_IMPORTED_MODULE_4__.createPieceFromData)(clonedBoard.data.sideToMove, p.piece);
                        });
                    }
                    if (!firstStandardMoveSet) {
                        newMoveWrapper.metadata.movingPiece =
                            clonedBoard.board[moveComponent.startCoordinates[0]][moveComponent.startCoordinates[1]];
                        firstStandardMoveSet = true;
                    }
                    if (validationResult.hasEnPassant) {
                        moveComponent.specialType = _MoveTreeInterface__WEBPACK_IMPORTED_MODULE_6__.SpecialMove.EnPassant;
                        validationResult.hasEnPassant = false;
                        newMoveWrapper.metadata.isCapture = true;
                    }
                    if (clonedBoard.data.getCapturedPieces(moveComponent).length > 0)
                        newMoveWrapper.metadata.isCapture = true;
                }
            }
            if (i === 0 || (0,_utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__.findLastIndex)(clonedBoard.data.fenOptions.tag("dead"), (b) => !b) === previousSideToMove) {
                newMoveWrapper.metadata.currentFullMove = ++currentFullMove;
            }
            newMoveWrapper.metadata.currentSideToMove = previousSideToMove = clonedBoard.data.sideToMove;
            const results = clonedBoard.makeMove(moveData);
            for (let i = 0; i < _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.totalPlayers; i++) {
                if (results.checkmates[i]) {
                    newMoveWrapper.metadata.checkmates++;
                }
                else if (results.checks[i]) {
                    newMoveWrapper.metadata.checks++;
                }
            }
            for (const line of alternativeLines) {
                newMoveWrapper.alternativeLines.push(traverse(line, currentFullMove, [...currentTimeOnClocks]));
            }
            if (moveWrapper.metadata.playerClock) {
                currentTimeOnClocks[previousSideToMove] -= moveWrapper.metadata.playerClock;
            }
            newMoveWrapper.metadata.playerClock = currentTimeOnClocks[previousSideToMove];
            newMoveWrapper.metadata.highlightedArrows = moveWrapper.metadata.highlightedArrows;
            newMoveWrapper.metadata.highlightedSquares = moveWrapper.metadata.highlightedSquares;
            newMoveWrapper.metadata.annotation = moveWrapper.metadata.annotation;
            const currentMove = clonedBoard.moves.getMove(newMoveWrapper.path);
            (0,_MoveTree__WEBPACK_IMPORTED_MODULE_5__.assertValidMove)(currentMove);
            currentMove.metadata = newMoveWrapper.metadata;
            currentMove.comment = moveWrapper.comment;
            clonedBoard.moves.stringifyMove(currentMove, dimension);
        }
        return moves;
    }
    traverse(moves.moves);
    return clonedBoard.moves;
}
function changeGameTermination(board) {
    const currentMove = board.moves.getMove([board.moves.moves.length - 1]);
    const snapshot = board.moves.getBoardSnapshot((0,_MoveTree__WEBPACK_IMPORTED_MODULE_5__.verifyValidMove)(currentMove) ? currentMove : -1);
    (0,_client_javascript_baseTypes__WEBPACK_IMPORTED_MODULE_0__.assertNonUndefined)(snapshot);
    if (snapshot.boardSnapshot.data.gameOver) {
        board.gameData.termination = snapshot.boardSnapshot.data.gameOver;
        if (board.gameData.result)
            return;
        if (board.isTwoPlayer || board.gameType.type === _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.VariantType.Teams) {
            const currentSnapshot = board.createSnapshot();
            board.loadSnapshot(snapshot.boardSnapshot);
            board.gameData.result = board.data.getCurrentResult();
            board.loadSnapshot(currentSnapshot);
        }
        else {
            const currentResults = [];
            const dead = board.data.fenOptions.tag("dead"), resigned = board.data.fenOptions.tag("resigned"), wb = board.data.fenOptions.tag("wb"), points = snapshot.boardSnapshot.data.points;
            for (const color of _GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.colors) {
                if (dead[color] || resigned[color])
                    continue;
                currentResults.push(`${(0,_GameInformation_GameData__WEBPACK_IMPORTED_MODULE_3__.getPlayerNameFromColor)(color, wb)}: ${points[color]}`);
            }
            board.gameData.result = currentResults.join(" – ");
        }
    }
}


/***/ })

}]);
//# sourceMappingURL=src_main_client_javascript_logic_index_GameBoardWorker_ts.react-app.js.map