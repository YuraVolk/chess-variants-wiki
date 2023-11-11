import { assertNonUndefined } from "@client/ts/baseTypes";
import { RequestManager } from "@client/ts/logic/index/GameBoardWorker";
import { compareCoordinates } from "@moveGeneration/Board/BoardInterface";
import { Termination, boardDimension } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { serializeInsufficientMaterialState } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/InsufficientMaterial/StateSerializer";

const fenStart = `[StartFen4 "2PC"]
[Variant "FFA"]
[RuleVariants "Castling EnPassant Play4Mate Prom=11"]
[TimeControl "1 | 5"]`;

const requestManager = new RequestManager();
const insufficientMaterialState = (() => {
    requestManager.construct("2PC", fenStart);
    const insufficientMaterialChecker = requestManager.getBoardInstance().insufficientMaterialChecker;
    assertNonUndefined(insufficientMaterialChecker);
    return serializeInsufficientMaterialState(insufficientMaterialChecker.state);
})();

test("Long Game Parsing", () => {
	const PGN_4 = `[StartFen4 "2PC"]
    [Variant "FFA"]
    [RuleVariants "EnPassant Play4Mate Prom=11"]
    [CurrentMove "202"]
    [TimeControl "1 | 5"]
    
    1. e5-e7 .. d10-d8
    2. d5-d6 .. j10-j8
    3. k5-k7 .. h10-h9
    4. Bf4-e5 .. i10-i9
    5. h5-h7 .. h9-h8
    6. Qg4-k8+ .. Kh11-h10
    7. f5-f6 .. j8xk7
    8. Qk8xk7 .. d8xe7
    9. d6xe7 .. Rd11xRd4
    10. Be5xRd4 .. k10-k9
    11. j5-j7 .. g10-g8
    12. i5-i6 .. g8xh7
    13. i6xh7 .. Qg11-g10
    14. Bi4-k6 .. Qg10-g6
    15. Bk6-j5 .. Qg6xNe4+
    16. Kh4-i5 .. Qe4xBd4
    17. Nj4-h5 .. Qd4-d9
    18. Nh5-g7 .. e10-e8
    19. Ng7-i8+ .. Kh10-g11
    20. g5-g7 .. Ne11-f9
    21. Rk4-e4 .. Nf9-h10
    22. g7xh8 .. i9xh8
    23. Re4-g4+ .. Kg11-h11
    24. Qk7-k8+ .. Nh10-j9
    25. Ki5-i6 .. Nj11-h10
    26. Rg4-g6 .. Qd9-i9
    27. Ki6-h5 .. Qi9-j8
    28. Ni8-g9+ .. f10xNg9
    29. Qk8xQj8 .. k9xQj8
    30. Bj5-k6 .. Nj9-i7+
    31. Kh5-g4 .. Rk11xBk6
    32. Rg6xg9 .. Bf11xj7+
    33. Kg4-f5 .. Rk6-g6
    34. Rg9xRg6 .. Kh11-i10
    35. Rg6-g11 .. Ni7-h9
    36. Rg11-g9 .. Nh10-j9
    37. Rg9-g6 .. Nh9-f8
    38. Rg6-h6 .. Nf8-d9
    39. Rh6-j6 .. Nd9xe7+
    40. f6xNe7 .. Bi11xe7
    41. Rj6xBj7 .. Be7-h10
    42. Rj7-j4 .. Nj9-i7
    43. Rj4-j6 .. Ni7-h5
    44. Rj6-j5 .. Nh5-g7+
    45. Kf5-e4 .. Bh10-i9
    46. Rj5-e5 .. Bi9-h10
    47. Re5-d5 .. Bh10-e7
    48. Rd5-j5 .. Ng7-i6
    49. Rj5-j6 .. Ni6-g5+
    50. Ke4-d4 .. Ng5xh7
    51. Rj6-j5 .. Be7-f6+
    52. Kd4-e4 .. Nh7-g5+
    53. Ke4-f5 .. Ng5-h7
    54. Kf5-f4 .. Bf6-g5+
    55. Kf4-e4 .. Nh7-f6+
    56. Ke4-f5 .. Nf6-h7
    57. Kf5-e6 .. Nh7-f8+
    58. Ke6-d5 .. Nf8-h7
    59. Rj5-j4 .. Nh7-f6+
    60. Kd5-e6 .. Nf6-h5
    61. Rj4-j5 .. Nh5-f4+
    62. Ke6-f5 .. Bg5-h6
    63. Kf5-f6 .. Bh6-g7+
    64. Kf6-f5 .. Nf4-d5
    65. Kf5-g6 .. Nd5-e7+
    66. Kg6-h5 .. Ki10-h9
    67. Kh5-i6 .. Kh9-g8
    68. Rj5-h5 .. j8-j7+
    69. Ki6xj7 .. Kg8-f9
    70. Kj7-k8 .. Kf9-g9
    71. Rh5-h4 .. Ne7-g6
    72. Rh4-h5 .. Ng6-i7+
    73. Kk8-k9 .. Ni7xRh5
    74. Kk9-k10 .. Nh5-i7
    75. Kk10-j11 .. Ni7-h9
    76. Kj11-k10 .. Nh9-i11+
    77. Kk10-j11 .. Ni11-j9
    78. Kj11-k10 .. Nj9-h10
    79. Kk10-k9 .. Nh10-i8+
    80. Kk9-j8 .. Ni8-j10
    81. Kj8-j9 .. Nj10-h9
    82. Kj9-k9 .. Nh9-i7
    83. Kk9-k10 .. Kg9-g8
    84. Kk10-j11 .. Ni7-h9
    85. Kj11-k10 .. Nh9-j8+
    86. Kk10-j9 .. Nj8-h9
    87. Kj9-k9 .. Bg7-h6+
    88. Kk9-k10 .. Nh9-i11+
    89. Kk10-j11 .. Bh6-k9
    90. Kj11-i10 .. Kg8-h7
    91. Ki10-h11 .. Ni11-j9
    92. Kh11-g11 .. Kh7-g8
    93. Kg11-f10 .. Kg8-f8
    94. Kf10-e10 .. Nj9-h10
    95. Ke10-d9 .. Nh10-f9
    96. Kd9-e10 .. h8-h7
    97. Ke10-f10 .. h7-h6
    98. Kf10-g10 .. h6-h5
    99. Kg10-f10 .. h5-h4=Q
    100. Kf10-e10 .. Qh4-h10+
    101. Ke10-d9 .. Qh10-d10+#`;

	const start = new Date();
	requestManager.constructWithGeneratedData(PGN_4, insufficientMaterialState);
	expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(5);
	expect(requestManager.getMoveTree().length).toBe(202);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length])).toBeFalsy();
    const terminationString: Termination = "CHECKMATE • 0-1";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

function checkWhetherCastlingOccurred(requestManager: RequestManager, color: NumericColor, castling: "castleKingside" | "castleQueenside") {
	const fenSettings = requestManager.getFENSettings();
	if (fenSettings.fenOptions[castling][color]) return false;
	const royal = fenSettings.fenOptions.royal[color];
	if (!royal) return false;
	const baseSnapshot = requestManager.getBoardInstance().moves.getBoardSnapshot(requestManager.getBoardInstance().moves.moves[0]);
	assertNonUndefined(baseSnapshot);

	return (
		!compareCoordinates(baseSnapshot.boardSnapshot.data.fenOptionsSnapshot.tagsSnapshot.royal[color] ?? [-1, -1], royal) &&
		(castling === "castleKingside" ? royal[1] > boardDimension / 2 : royal[1] <= boardDimension / 2)
	);
}

test("Castling Kingside", () => {
	requestManager.constructWithGeneratedData(
        `${fenStart}
        1. Nj4-i6 .. Nj11-i9
        2. j5-j6 .. j10-j9
        3. Bi4-j5 .. Bi11-j10
        4. O-O .. O-O`,
        insufficientMaterialState
    );
	requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1]);

	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleKingside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleQueenside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleKingside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleQueenside")).toBeFalsy();
});

test("Castling Queenside", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. Ne4-f6 .. Ne11-f9
        2. g5-g7 .. g10-g8
        3. Qg4-g6 .. Qg11-g9
        4. Bf4-g5 .. Bf11-g10
        5. O-O-O .. O-O-O`,
        insufficientMaterialState
	);
	requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1]);

	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleKingside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleQueenside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleKingside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleQueenside")).toBeTruthy();
});

test("Diagonal Checkmate by Bot", () => {
	requestManager.constructWithGeneratedData(`${fenStart} 1. i5-i6 .. h10-h9 2. j5-j7`, insufficientMaterialState);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	const start = new Date();
	const botMove = requestManager.playPreferredBotMove();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);

	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.getFENSettings().points[0]).toBeLessThan(requestManager.getFENSettings().points[2]);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
    const terminationString: Termination = "CHECKMATE • 0-1";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Diagonal Checkmate, no move by Bot", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart} 
        1. i5-i6 .. h10-h9
        2. j5-j7 .. Qg11-k7+#`,
        insufficientMaterialState
	);

	const moveTreeLength = requestManager.getMoveTree().length;
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.getFENSettings().points[0]).toBeLessThan(requestManager.getFENSettings().points[2]);
	const start = new Date();
	expect(requestManager.playPreferredBotMove()).toBeUndefined();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	expect(requestManager.getMoveTree().length).toBe(moveTreeLength);
    const terminationString: Termination = "CHECKMATE • 0-1";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Supported Checkmate by Bot", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart} 
        1. h5-h6 .. Ne11-f9
        2. Bi4-f7 .. e10-e9
        3. Qg4-i6 .. d10-d8`,
        insufficientMaterialState
	);

	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getBoardInstance().data.gameOver).toBeFalsy();
	const start = new Date();
	const botMove = requestManager.playPreferredBotMove();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1000);
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);
	expect(requestManager.getFENSettings().fenOptions.dead[2]).toBeTruthy();
	expect(requestManager.getFENSettings().points[2]).toBeLessThan(requestManager.getFENSettings().points[0]);
    const terminationString: Termination = "CHECKMATE • 1-0";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Supported Checkmate, no move by Bot", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart} 
        1. h5-h6 .. Ne11-f9
        2. Bi4-f7 .. e10-e9
        3. Qg4-i6 .. d10-d8
        4. Qi6xi10+#`,
        insufficientMaterialState
	);

	const moveTreeLength = requestManager.getMoveTree().length;
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
	expect(requestManager.getFENSettings().fenOptions.dead[2]).toBeTruthy();
	expect(requestManager.getFENSettings().points[2]).toBeLessThan(requestManager.getFENSettings().points[0]);
	const start = new Date();
	expect(requestManager.playPreferredBotMove()).toBeUndefined();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	expect(requestManager.getMoveTree().length).toBe(moveTreeLength);
    const terminationString: Termination = "CHECKMATE • 1-0";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Semi-Smothered Checkmate with Bot", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart} 
        1. h5-h7 .. h10-h8
        2. Qg4-k8 .. Kh11-h10`,
        insufficientMaterialState
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	const start = new Date();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1000);
	const botMove = requestManager.playPreferredBotMove();
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
	expect(requestManager.getFENSettings().fenOptions.dead[2]).toBeTruthy();
	expect(requestManager.getFENSettings().points[2]).toBeLessThan(requestManager.getFENSettings().points[0]);
    const terminationString: Termination = "CHECKMATE • 1-0";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Semi-Smothered Checkmate, no move by Bot", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart} 
        1. h5-h7 .. h10-h8
        2. Qg4-k8 .. Kh11-h10
        3. Qk8xh8+#`,
        insufficientMaterialState
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	const moveTreeLength = requestManager.getMoveTree().length;
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
	expect(requestManager.playPreferredBotMove()).toBeUndefined();
	expect(requestManager.getMoveTree().length).toBe(moveTreeLength);
    const terminationString: Termination = "CHECKMATE • 1-0";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Discovered Smothered Mate with Bot", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. g5-g7 .. Nj11-i9
        2. f5-f7 .. h10-h8
        3. g7xh8 .. Ni9-j7
        4. Nj4-i6 .. Ne11-f9
        5. Bf4-i7 .. Bi11-e7+
        6. Ne4-g5 .. Qg11-h10
        7. d5-d6 .. Nj7xh8
        8. d6xBe7`,
        insufficientMaterialState
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(15);
	const start = new Date();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1000);
	const botMove = requestManager.playPreferredBotMove();
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);
	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.getFENSettings().points[0]).toBeLessThan(requestManager.getFENSettings().points[2]);
    const terminationString: Termination = "CHECKMATE • 0-1";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Discovered Smothered Mate, no move by Bot", () => {
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. g5-g7 .. Nj11-i9
        2. f5-f7 .. h10-h8
        3. g7xh8 .. Ni9-j7
        4. Nj4-i6 .. Ne11-f9
        5. Bf4-i7 .. Bi11-e7+
        6. Ne4-g5 .. Qg11-h10
        7. d5-d6 .. Nj7xh8
        8. d6xBe7 .. Nh8-g6+#`,
        insufficientMaterialState
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(16);
	const start = new Date();
	expect(requestManager.playPreferredBotMove()).toBeUndefined();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.getFENSettings().points[0]).toBeLessThan(requestManager.getFENSettings().points[2]);
    const terminationString: Termination = "CHECKMATE • 0-1";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("En Passant", () => {
	const gameOfPointsFEN = `[StartFen4 "2PC"]
    [Variant "FFA"]
    [RuleVariants "EnPassant Prom=11"]
    [CurrentMove "0"]
    [TimeControl "1 | 5"]
    
    1. h5-h7 .. f10-f8
    2. h7-h8 .. g10-g8
    3. h8xg9 .. f8-f7
    4. e5-e7 .. f7xe6
    5. i5-i7 .. j10-j8
    6. i7-i8 .. h10-h8
    7. i8xh9 .. j8-j7
    8. k5-k7 .. j7xk6
    9. f5-f7 .. e10-e9
    10. f7-f8 .. e9-e8
    11. f8-e9 { (illegal) }`;

	const start = new Date();
	requestManager.constructWithGeneratedData(gameOfPointsFEN, insufficientMaterialState);
	expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(3);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(20);
	expect(requestManager.getFENSettings().points[0]).toBe(2);
	expect(requestManager.getFENSettings().points[2]).toBe(2);
});

test("Legal Promotion", () => {
	const promotionTestPGN4 = `
    [StartFen4 "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'dim':'8x8','wb':true}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,rP,rP,yP,yP,yP,yP,rP,rP,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,yP,yP,rP,rP,rP,rP,yP,yP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"]
    [Variant "FFA"]
    [RuleVariants "EnPassant Prom=11"]
    [CurrentMove "0"]
    [TimeControl "1 | 15D"]
    
    1. j10xRk11=B .. j5xRk4=N
    2. k10xNj11=R .. k5xNj4=R
    3. d10xNe11=N .. d5xNe4=B
    4. e10xRd11=Q .. e5xRd4=Q
    5. Qd11xQd4 .. Be4xf5
    6. Rj11xRj4 .. Nk4xi5
    7. Ne11xg10`;

	const start = new Date();
	requestManager.constructWithGeneratedData(promotionTestPGN4, insufficientMaterialState);
	expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(13);
	expect(requestManager.getFENSettings().points[0]).toBe(31);
	expect(requestManager.getFENSettings().points[2]).toBe(18);
});

test("Illegal Promotion to different pieces", () => {
	const illegalPromotionTestFEN = `
    [StartFen4 "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'dim':'8x8','wb':true}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,rP,rP,yP,yP,yP,yP,rP,rP,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,yP,yP,rP,rP,rP,rP,yP,yP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"]
    [Variant "FFA"]
    [RuleVariants "EnPassant Prom=11"]
    [CurrentMove "0"]
    [TimeControl "1|15D"]

    1. j10xRk11=x .. j5xRk4=X`;

	const start = new Date();
	requestManager.constructWithGeneratedData(illegalPromotionTestFEN, insufficientMaterialState);
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1500);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(0);
	expect(requestManager.getBoardInstance().data.gameOver).toBeFalsy();
});

test("Illegal Promotion Syntax", () => {
	const illegalPromotionTestFEN = `
    [StartFen4 "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'dim':'8x8','wb':true}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,rP,rP,yP,yP,yP,yP,rP,rP,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,yP,yP,rP,rP,rP,rP,yP,yP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"]
    [Variant "FFA"]
    [RuleVariants "EnPassant"]
    [CurrentMove "0"]
    [TimeControl "1|15D"]

    1. j10xRk11= .. j5xRk4=`;

	const start = new Date();
	requestManager.constructWithGeneratedData(illegalPromotionTestFEN, insufficientMaterialState);
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1500);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(2);
	expect(requestManager.getBoardInstance().data.gameOver).toBeFalsy();
});

test("Illegal Promotion Rank", () => {
	const illegalPromotionTestFEN = `
    [StartFen4 "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'dim':'8x8','wb':true}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,2,yP,yP,yP,yP,2,x,x,x/x,x,x,1,rP,4,rP,1,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,1,yP,4,yP,1,x,x,x/x,x,x,2,rP,rP,rP,rP,2,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"]
    [Variant "FFA"]
    [RuleVariants "EnPassant Prom=11"]
    [CurrentMove "2"]
    [TimeControl "1|15D"]

    1. j9-j10=Q .. j6-j5=Q`;

	const start = new Date();
	requestManager.constructWithGeneratedData(illegalPromotionTestFEN, insufficientMaterialState);
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1500);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(0);
	expect(requestManager.getBoardInstance().data.gameOver).toBeFalsy();
});

test("Force Promotion", () => {
	const forcePromotionFEN = `[StartFen4 "2PC"]
    [Variant "FFA"]
    [RuleVariants "EnPassant"]
    [CurrentMove "0"]
    [TimeControl "1 | 5"]
    
    1. h5-h7 .. f10-f8
    2. h7-h8 .. g10-g8
    3. h8xg9 .. f8-f7
    4. e5-e7 .. f7xe6
    5. i5-i7 .. j10-j8
    6. i7-i8 .. h10-h8
    7. i8xh9 .. j8-j7
    8. k5-k7 .. j7xk6
    9. f5-f7 .. e10-e9
    10. f7-f8 .. e9-e8
    11. f8-e9 { (illegal) }`;

	const start = new Date();
	requestManager.constructWithGeneratedData(forcePromotionFEN, insufficientMaterialState);
	expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(3);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(2);
	expect(requestManager.getFENSettings().points[0]).toBe(0);
	expect(requestManager.getFENSettings().points[2]).toBe(0);
});

test("Threefold Repetition Through Alternative Lines", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. Nj4-i6 .. Nj11-i9
        2. Ni6-j4 .. Ni9-j11
        3. Ne4-f6 
            .. (.. 3. Nj4-i6 .. Nj11-i9
            4. Ni6-j4 .. Ni9-j11)`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(5);
    expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1, 0, 3])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(24);
	expect(requestManager.getFENSettings().points[2]).toBe(24);
    const terminationString: Termination = "THREEFOLD REPETITION • ½-½";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Threefold Repetition Through Main Lines", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. Nj4-i6 .. Nj11-i9
        2. Ni6-j4 .. Ni9-j11
        3. Nj4-i6 .. Nj11-i9
        4. Ni6-j4 .. Ni9-j11`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(8);
    expect(requestManager.loadSnapshotByPath([7])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(24);
	expect(requestManager.getFENSettings().points[2]).toBe(24);
    const terminationString: Termination = "THREEFOLD REPETITION • ½-½";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Insufficient Material with sole Bishop", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. e5-e7 .. d10-d8
        2. f5-f6 .. k10-k8
        3. j5-j6 .. h10-h9
        4. k5-k7 .. Nj11-h10
        5. i5-i7 .. f10-f9
        6. Nj4-i6 .. j10-j9
        7. h5-h7 .. i10-i8
        8. h7xi8 .. h9xi8
        9. Qg4-h5 .. d8xe7
        10. f6xe7 .. e10-e8
        11. Bf4-e5 .. Rk11-k10
        12. g5-g6 .. g10-g8
        13. Be5-i9 .. Rk10-i10
        14. Bi9xNh10 .. Bi11xBh10
        15. Qh5-e5 .. Bh10xe7+
        16. Qe5xBe7 .. Qg11-h10+
        17. Qe7xQh10+ .. Ri10xQh10+
        18. Ni6-h8 .. f9-f8
        19. Kh4-i5 .. Rd11xd5+
        20. Rd4xRd5 .. Rh10-j10
        21. Rd5-e5 .. Bf11-d9
        22. Ne4-f6 .. e8-e7
        23. Nf6xg8 .. Bd9-e10
        24. Bi4-j5 .. Kh11-g11
        25. Re5-h5 .. Ne11-d9
        26. Rk4-h4 .. Rj10-k10
        27. Rh5-h6 .. Rk10-j10
        28. Rh4-k4 .. Nd9-f10
        29. Rk4-f4 .. Be10xNg8
        30. Bj5xBg8 .. Nf10xBg8
        31. Rh6-i6 .. Rj10-f10
        32. Nh8xj9 .. e7-e6
        33. Rf4-e4 .. Rf10-e10
        34. Nj9-h8 .. Ng8-f6
        35. Re4-f4 .. e6-e5
        36. Rf4xNf6 .. e5-e4=Q
        37. Rf6xf8 .. Qe4-e9
        38. g6-g7 .. Re10-f10
        39. Nh8-f7 .. Qe9-d10
        40. Rf8-g8+ .. Rf10-g10
        41. Rg8xRg10+ .. Qd10xRg10
        42. Nf7-e9 .. Qg10xg7+
        43. Ki5-j5 .. Qg7xNe9
        44. Ri6-g6+ .. Kg11-h11
        45. Kj5-k6 .. Qe9-i5
        46. Rg6-f6 .. Qi5-i4+
        47. Kk6-k5 .. Qi4-h5+
        48. Kk5-k6 .. Qh5-j7+
        49. Kk6-k5 .. Qj7-g4
        50. Rf6-f11+ .. Kh11-g10
        51. Rf11-f8 .. Qg4-g5+
        52. Kk5-k6 .. Qg5-g6
        53. Rf8-f4 .. Qg6-i6
        54. Kk6-k5 .. Kg10-g9
        55. Rf4-j4 .. Kg9-g8
        56. Rj4-h4 .. Kg8-g7
        57. Rh4-j4 .. Kg7-h6
        58. Rj4-h4+ .. Kh6-i5
        59. Rh4-j4 .. Qi6-h6
        60. Kk5-k4 .. Qh6xj6
        61. Rj4xQj6 .. Ki5xRj6
        62. Kk4-j4 .. Kj6xi7
        63. Kj4-i5 .. Ki7-j7
        64. Ki5-h5 .. Kj7xk7
        65. Kh5-h6 .. Kk7-j6
        66. Kh6-g7 .. k8-k7
        67. Kg7-f6 .. k7-k6
        68. Kf6-g7 .. k6-k5
        69. Kg7-f6 .. k5-k4=R
        70. Kf6-e6 .. Rk4-e4+
        71. Ke6-f5 .. Re4-e5+
        72. Kf5xRe5 .. i8-i7
        73. Ke5-f6 .. i7-i6
        74. Kf6-f7 .. i6-i5
        75. Kf7-f8 .. i5-i4=B`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(150);
    expect(requestManager.loadSnapshotByPath([149])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(24);
	expect(requestManager.getFENSettings().points[2]).toBe(24);
    const terminationString: Termination = "INSUFFICIENT MATERIAL • ½-½";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Insufficient Material with two same-color Bishops", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. d5-d7 .. j10-j8
        2. k5-k7 .. h10-h9
        3. f5-f7 .. j8xk7
        4. Ne4-f6 .. e10-e9
        5. g5-g7 .. Bi11-e7
        6. Bf4-g5 .. f10-f8
        7. g7xf8 .. e9xf8
        8. j5-j7 .. k7xj6
        9. i5xj6 .. k10-k8
        10. Nj4-i6 .. Ne11-f9
        11. Bg5-j8 .. i10-i9
        12. Bj8-g5 .. g10-g8
        13. h5-h7 .. g8xf7
        14. Bi4xf7 .. h9-h8
        15. Bf7-g8 .. Nj11-h10
        16. Ni6xh8 .. i9xNh8
        17. Bg8-e6 .. Bf11-j7
        18. Qg4-f4 .. Nh10-j9
        19. Be6-g8 .. Qg11-g10
        20. Bg5-j8 .. Bj7-k6
        21. Qf4-g5 .. d10-d8
        22. Bg8xNf9 .. Qg10xBf9
        23. Rk4xBk6 .. Qf9-h9
        24. Rk6-k4 .. Be7xNf6
        25. e5xBf6 .. Qh9-j7
        26. Qg5-h6 .. Qj7-f11
        27. Qh6-i6 .. Qf11-j7
        28. Qi6xQj7 .. k8xQj7
        29. Rk4-k9 .. Rd11-d9
        30. O-O-O .. Rd9-h9
        31. Rg4-g11+ .. Kh11-i10
        32. Rk9xRk11 .. Nj9xRk11
        33. Rg11xNk11 .. Rh9-j9
        34. Bj8-h6 .. Rj9-f9
        35. Bh6-j8 .. Ki10-h9
        36. Kf4-f5 .. Kh9-g9
        37. Rk11-e11 .. Kg9-f10
        38. Re11-g11 .. Kf10-e9
        39. Bj8-h10 .. Ke9-d9
        40. Rg11-g9 .. Rf9xRg9
        41. Bh10xRg9 .. f8-f7
        42. Bg9xh8 .. Kd9-e9
        43. Bh8-g7+ .. Ke9-d9
        44. Bg7-f8 .. Kd9-e10
        45. Kf5-g5 .. Ke10-f9
        46. Bf8-g7 .. Kf9-g10
        47. Bg7-h8 .. Kg10-h9
        48. Bh8-g7 .. Kh9-i10
        49. Bg7-h8 .. Ki10-h11
        50. Kg5-h6 .. Kh11-i10
        51. Kh6-i5 .. Ki10-h9
        52. Bh8-i7 .. Kh9-i10
        53. Bi7-g9 .. Ki10-h9
        54. Bg9-f10 .. Kh9-i10
        55. Bf10xd8 .. Ki10-h9
        56. Bd8-f10 .. Kh9-g10
        57. Bf10-h8 .. Kg10-h9
        58. Bh8-i7 .. Kh9-i10
        59. Bi7-h8 .. Ki10-h11
        60. Ki5-h6 .. Kh11-g10
        61. Kh6-g5 .. Kg10-h9
        62. Bh8-g7 .. Kh9-g10
        63. Bg7-i9 .. Kg10-h9
        64. Bi9-j10 .. Kh9-i10
        65. Bj10-h8 .. Ki10-h11
        66. Kg5-f5 .. Kh11-i10
        67. Kf5-e5 .. Ki10-h9
        68. Bh8-g7 .. Kh9-g10
        69. Bg7-h8 .. Kg10-f11
        70. Ke5-f5 .. Kf11-e10
        71. Kf5-g5 .. Ke10-d9
        72. Bh8-f10 .. Kd9-e10
        73. Bf10-d8 .. Ke10-d9
        74. Bd8-e7 .. Kd9-e10
        75. Be7-g9 .. Ke10-d9
        76. Bg9-h8 .. Kd9-e9
        77. Bh8-g7+ .. Ke9-d9
        78. Kg5-h6 .. Kd9-e10
        79. Bg7-h8 .. Ke10-d9
        80. Bh8-f10 .. Kd9-e10
        81. Bf10-d8 .. Ke10-d9
        82. Bd8-e7 .. Kd9-e10
        83. Be7-f8 .. Ke10-d9
        84. Kh6-g7 .. Kd9-e10
        85. Kg7xf7 .. Ke10-d9
        86. Bf8-e7 .. Kd9-e10
        87. Be7-d8 .. Ke10-d9
        88. Kf7-e7 .. Kd9-e10
        89. f6-f7 .. Ke10-d11
        90. Ke7-f8 .. Kd11-e10
        91. Kf8-g7 .. Ke10-d9
        92. Bd8-f10 .. Kd9-e10
        93. Bf10-i7 .. Ke10-d9
        94. d7-d8 .. Kd9xd8
        95. f7-f8 .. Kd8-e8
        96. f8-f9 .. Ke8xf9
        97. Bi7-g9 .. Kf9xBg9
        98. h7-h8+ .. Kg9-f9
        99. Kg7-h7 .. Kf9-f8
        100. Kh7-i7 .. Kf8-e9
        101. Ki7xj7 .. Ke9-f8
        102. Kj7-i8 .. Kf8-e8
        103. j6-j7 .. Ke8-f8
        104. j7-j8 .. Kf8-e7
        105. j8-j9 .. Ke7-f6
        106. j9-j10 .. Kf6-g7
        107. j10-j11=B .. Kg7-h6
        108. h8-h9 .. Kh6-i6
        109. h9-h10 .. Ki6-h6
        110. h10-h11=B`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(219);
    expect(requestManager.loadSnapshotByPath([218])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(24);
	expect(requestManager.getFENSettings().points[2]).toBe(24);
    const terminationString: Termination = "INSUFFICIENT MATERIAL • ½-½";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Insufficient Material with a sole Knight", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. d5-d7 .. f10-f8
        2. g5-g7 .. e10-e9
        3. j5-j7 .. h10-h9
        4. Qg4-g5 .. d10-d8
        5. f5-f6 .. k10-k8
        6. Qg5-j8 .. Qg11xQj8
        7. Bf4xQj8 .. k8xj7
        8. Bi4-j5 .. g10-g8
        9. k5-k7 .. f8xg7
        10. f6xg7 .. i10-i9
        11. Bj8-i7 .. i9-i8
        12. Bi7-f10 .. Ne11-g10
        13. Ne4-f6 .. Bi11-e7
        14. Bj5-i4 .. Be7-h10
        15. Nf6xg8 .. h9xNg8
        16. k7-k8 .. Bh10-e7+
        17. Kh4-g4 .. j10-j8
        18. i5-i7 .. j7xi6
        19. Nj4xi6 .. Be7-h10
        20. Bi4-k6 .. Nj11-k9
        21. Rk4-j4 .. j8-j7
        22. Bk6-i4 .. j7xNi6
        23. h5xi6 .. Rd11-d10
        24. Rd4-f4 .. Rd10xBf10
        25. Rf4xRf10 .. Kh11-i10
        26. Rj4-j9 .. i8-i7
        27. Rf10-f9 .. Nk9-i8
        28. k8-k9 .. Ni8xg7
        29. Rj9-j10+ .. Ki10-h11
        30. Rf9xBf11+ .. Bh10-g11
        31. Rf11xBg11+ .. Kh11xRg11
        32. k9-k10 .. Ng10-i9
        33. Bi4-g6 .. Ng7xi6
        34. Bg6-e4 .. Ni9-h11
        35. Rj10-d10 .. Nh11-i9
        36. Rd10-j10 .. Ni9-h11
        37. Rj10-j11 .. Rk11xRj11
        38. k10xRj11=Q .. g8-g7
        39. Qj11-g8+ .. Kg11-f10
        40. Qg8xNi6 .. Nh11-g9
        41. Qi6xi7 .. Kf10-e10
        42. Qi7xg7 .. Ng9-f11
        43. Be4-h7+ .. Ke10-e11
        44. e5-e7 .. d8xe7
        45. Qg7xe7 .. Ke11-d10
        46. Bh7-e10 .. Kd10xBe10
        47. Qe7xe9+ .. Ke10xQe9
        48. d7-d8+ .. Ke9xd8`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(96);
    expect(requestManager.loadSnapshotByPath([95])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(24);
	expect(requestManager.getFENSettings().points[2]).toBe(24);
    const terminationString: Termination = "INSUFFICIENT MATERIAL • ½-½";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Sufficient Material with a sole Rook", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. d5-d7 .. k10-k8
        2. f5-f7 .. h10-h9
        3. k5-k7 .. Nj11-i9
        4. i5-i7 .. Bi11-e7
        5. Ne4-f6 .. j10-j9
        6. Qg4-e6 .. d10-d8
        7. Nj4-i6 .. f10-f9
        8. h5-h7 .. Qg11-f10
        9. j5-j6 .. Ni9-j7
        10. Ni6-g7 .. h9-h8
        11. i7xh8 .. i10-i8
        12. Ng7xi8 .. j9xNi8
        13. Bi4-h5 .. Qf10xh8
        14. Qe6-f5 .. Nj7-i9
        15. Bh5xk8+ .. Rk11xBk8
        16. g5-g6 .. Rk8-k11
        17. Bf4-i7 .. Qh8-h9
        18. O-O-O .. Ni9xh7
        19. g6xNh7 .. Ne11-d9
        20. h7xi8 .. Qh9xf7
        21. Rk4-h4+ .. Kh11-g11
        22. Qf5-h5 .. e10-e8
        23. d7xe8 .. f9xe8
        24. Kf4-e4 .. Qf7xQh5
        25. Rh4xQh5 .. Be7xNf6
        26. e5xBf6 .. Nd9-f8
        27. i8-i9 .. Rk11-k10
        28. Rh5-h8 .. g10-g8
        29. Rg4xg8+ .. Nf8-g10
        30. Rh8-h7 .. e8-e7
        31. f6xe7 .. d8xe7
        32. Rh7-h10 .. Rk10xRh10
        33. i9xRh10+ .. Kg11xh10
        34. j6-j7 .. Ng10-i9
        35. Bi7-g9+ .. Kh10-h11
        36. Rg8-h8+ .. Kh11-g10
        37. Bg9xe7 .. Ni9xj7
        38. Rh8-h10+ .. Kg10-f9
        39. Ke4-f5 .. Nj7-i9
        40. Rh10-h8 .. Bf11-j7
        41. Rh8-f8+ .. Kf9-g10
        42. Be7-f6 .. Rd11-d9
        43. Bf6-d8 .. Kg10-h9
        44. Kf5-e5 .. Kh9-i10
        45. Rf8-f10+ .. Bj7-g10
        46. Rf10-f8 .. Rd9xBd8
        47. Rf8xRd8 .. Bg10-j7
        48. Rd8-d10+ .. Bj7-g10
        49. Rd10xBg10+ .. Ni9xRg10
        50. Ke5-f5 .. Ng10-i9
        51. Kf5-e6 .. Ki10-h9
        52. Ke6-e5 .. Kh9-g8
        53. Ke5-f5 .. Kg8-h9
        54. Kf5-g6 .. Kh9-g9
        55. Kg6-h6 .. Kg9-h9
        56. Kh6-i7 .. Kh9-g9
        57. Ki7-j8 .. Kg9-h9
        58. k7-k8 .. Ni9-h7+
        59. Kj8-j9 .. Kh9-g9
        60. k8-k9 .. Kg9-f9
        61. k9-k10 .. Kf9-g9
        62. k10-k11=R .. Kg9-f9
        63. Rk11-h11 .. Nh7-g9
        64. Rh11-h9 .. Kf9-e8
        65. Kj9-i9 .. Ng9-f7
        66. Ki9-i8 .. Ke8-e7
        67. Ki8-h7 .. Nf7-g5+
        68. Kh7-g6 .. Ng5-f7
        69. Rh9-h7 .. Ke7-d6
        70. Rh7xNf7 .. Kd6-e5
        71. Rf7-f5+ .. Ke5-d6
        72. Rf5-f6+ .. Kd6-e7
        73. Rf6-f7+ .. Ke7-d8
        74. Kg6-f6 .. Kd8-e9
        75. Kf6-e7 .. Ke9-d10
        76. Rf7-f8 .. Kd10-d11
        77. Ke7-e8 .. Kd11-e11
        78. Rf8-f9 .. Ke11-d10
        79. Ke8-d8 .. Kd10-e10
        80. Kd8-e8 .. Ke10-e11
        81. Ke8-e9 .. Ke11-d11
        82. Rf9-f11+#`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(163);
    expect(requestManager.loadSnapshotByPath([162])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(48);
	expect(requestManager.getFENSettings().points[2]).toBe(0);
    const terminationString: Termination = "CHECKMATE • 1-0";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});


test("Sufficient Material with a sole Queen", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. d5-d7 .. f10-f8
        2. g5-g7 .. e10-e9
        3. j5-j7 .. h10-h9
        4. Qg4-g5 .. d10-d8
        5. f5-f6 .. k10-k8
        6. Qg5-j8 .. Qg11xQj8
        7. Bf4xQj8 .. k8xj7
        8. Bi4-j5 .. g10-g8
        9. k5-k7 .. f8xg7
        10. f6xg7 .. i10-i9
        11. Bj8-i7 .. i9-i8
        12. Bi7-f10 .. Ne11-g10
        13. Ne4-f6 .. Bi11-e7
        14. Bj5-i4 .. Be7-h10
        15. Nf6xg8 .. h9xNg8
        16. k7-k8 .. Bh10-e7+
        17. Kh4-g4 .. j10-j8
        18. i5-i7 .. j7xi6
        19. Nj4xi6 .. Be7-h10
        20. Bi4-k6 .. Nj11-k9
        21. Rk4-j4 .. j8-j7
        22. Bk6-j5 .. j7xNi6
        23. Bj5xi6 .. Bf11-e10
        24. Bi6xg8 .. Be10xBg8
        25. Rj4-j10 .. Bg8-e6+
        26. Kg4-h4 .. Bh10-k7+
        27. Kh4-i4 .. Be6-i10
        28. Rj10xBi10 .. Kh11xRi10
        29. Bf10-g9 .. Ki10-h9
        30. Bg9-f10 .. Bk7-j8
        31. Rd4-d6 .. Rk11-f11
        32. Rd6-f6 .. Rd11-d10
        33. Rf6-f9+ .. Kh9-i10
        34. Rf9-j9 .. Bj8-h6
        35. Bf10-h8 .. Rf11-f4+
        36. Ki4-j5 .. Rf4-j4+
        37. Kj5-i6 .. Nk9-j7
        38. Rj9-j10+ .. Ki10-h9
        39. Rj10-j9+ .. Kh9-h10
        40. Rj9-j10+ .. Kh10-g11
        41. Rj10-j11+ .. Kg11-h10
        42. Bh8-k11 .. Ng10-i9
        43. Rj11-j10+ .. Kh10-g9
        44. Rj10xRd10 .. Bh6xg7
        45. Rd10-j10 .. Ni9xk8
        46. Rj10-j9+ .. Nj7-i9
        47. Rj9xRj4 .. Bg7xRj4
        48. h5-h6 .. Kg9-f10
        49. e5-e6 .. Ni9-j7
        50. h6-h7 .. Nj7-k5+
        51. Ki6-j5 .. Nk8-i7+
        52. Kj5xBj4 .. Nk5-i6+
        53. Kj4-i5 .. i8xh7
        54. Ki5-h6 .. Ni7-j5+
        55. Kh6xh7 .. Ni6-g5+
        56. Kh7-g6 .. Ng5xe6
        57. Bk11-h8+ .. Kf10-e10
        58. Bh8-g9 .. Nj5-h4+
        59. Kg6-h5 .. Nh4-f5
        60. Kh5-g6 .. Nf5-e7+
        61. Kg6-f6 .. Ne6-f4
        62. Bg9xNe7 .. Ke10-d10
        63. Be7-d6 .. Nf4-d5+
        64. Kf6-e5 .. Nd5-e7
        65. Bd6xNe7 .. Kd10-e10
        66. Ke5-e6 .. Ke10-f10
        67. Be7-f6 .. Kf10-f9
        68. Ke6-f7 .. Kf9-e10
        69. Kf7-e8 .. Ke10-f10
        70. Bf6-g7 .. Kf10-e10
        71. Bg7xe9 .. Ke10-f11
        72. Be9xd8 .. Kf11-g10
        73. Bd8-f10 .. Kg10xBf10
        74. d7-d8 .. Kf10-g9
        75. d8-d9 .. Kg9-h9
        76. d9-d10 .. Kh9-i8
        77. d10-d11=Q .. Ki8-j8
        78. Qd11-h7 .. Kj8-k9
        79. Ke8-f8 .. Kk9-j10
        80. Kf8-g8 .. Kj10-i11
        81. Kg8-h9 .. Ki11-h11
        82. Qh7-d11+#`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(163);
    expect(requestManager.loadSnapshotByPath([162])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(48);
	expect(requestManager.getFENSettings().points[2]).toBe(0);
    const terminationString: Termination = "CHECKMATE • 1-0";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Sufficient Material with Bishop and Knight on opposite Sides", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. j5-j7 .. k10-k8 
        2. h5-h6 .. g10-g8 
        3. j7xk8 .. j10-j8 
        4. k8xj9 .. i10xj9 
        5. k5-k7 .. Nj11-i9 
        6. e5-e7 .. h10-h8 
        7. f5-f6 .. Bf11-j7 
        8. Qg4-f5 .. Bj7-i8 
        9. Bi4-e8+ .. f10-f9 
        10. Be8xf9+ .. Ne11xf9 
        11. Qf5-d7 .. Bi8-g6 
        12. Nj4-i6 .. e10-e8 
        13. Qd7-e6 .. d10-d8 
        14. d5-d6 .. Qg11-g9 
        15. Ni6-g7 .. Bg6-f7 
        16. Qe6-e5 .. Bi11-h10 
        17. Ng7xf9 .. Qg9xf9 
        18. g5-g7 .. h8xg7 
        19. f6xg7 .. d8xe7 
        20. d6xe7 .. Qf9-g9 
        21. Rd4xd11+ .. Bh10-g11 
        22. i5-i7 .. Qg9-g10 
        23. Rd11xg11+ .. Kh11xg11 
        24. Qe5-f5 .. Qg10-i8 
        25. Qf5-e5 .. Qi8-j7 
        26. Qe5-i5 .. Ni9-h7 
        27. Qi5-k5 .. Qj7xk7+ 
        28. Qk5xk7+ .. Rk11xk7 
        29. Rk4xk7 .. j9-j8 
        30. Rk7-k11+ .. Kg11-f10 
        31. Rk11-k10+ .. Kf10-f9 
        32. Rk10-k9+ .. Kf9-g10 
        33. Rk9-k10+ .. Kg10-f11 
        34. Rk10-k11+ .. Kf11-g10 
        35. Rk11-i11 .. Kg10-f9 
        36. Ri11-f11+ .. Kf9-g10 
        37. Rf11-j11 .. j8xi7 
        38. h6xi7 .. Kg10-h9 
        39. Rj11-i11 .. Kh9-h10 
        40. Ri11-f11 .. Kh10-h9 
        41. Rf11-f9+ .. Kh9-i8 
        42. Bf4-h6 .. Ki8-j7 
        43. Rf9-j9+ .. Kj7-i6 
        44. Bh6-f4 .. Nh7-i5 
        45. Rj9-j4 .. Ni5-g6+ 
        46. Kh4-g5 .. Ng6xi7 
        47. Kg5-h4 .. Ni7-g6+ 
        48. Kh4-g5 .. Ng6-i7 
        49. Kg5-g4 .. Ki6-i5 
        50. Rj4-h4 .. Bf7-h5+ 
        51. Rh4xh5+ .. Ni7xh5 
        52. Bf4-e5 .. Ki5-h6 
        53. Ne4-g5 .. Nh5xg7 
        54. Ng5-i4+ .. Kh6-g6 
        55. Be5-f4 .. Kg6-f7 
        56. Bf4-g5 .. Ng7-f9 
        57. Kg4-h4 .. Nf9xe7 
        58. Ni4-h6+ .. Kf7-f8 
        59. Bg5-f6 .. g8-g7 
        60. Bf6-g5 .. g7xh6 
        61. Bg5xh6+ .. Kf8-f7 
        62. Bh6-g5 .. Ne7-f9 
        63. Kh4-g4 .. e8-e7 
        64. Bg5xe7 .. Nf9-g7 
        65. Be7-g5 .. Kf7-g8 
        66. Kg4-h4 .. Kg8-h7 
        67. Kh4-i4 .. Kh7-i6
        68. Ki4-j4 .. Ng7-h5+ 
        69. Kj4-k4 .. Ki6-j6 
        70. Bg5-h6 .. Kj6-k6 
        71. Bh6-j4 72. Nh5-j6#`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(142);
    expect(requestManager.loadSnapshotByPath([141])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(0);
	expect(requestManager.getFENSettings().points[2]).toBe(48);
    const terminationString: Termination = "CHECKMATE • 0-1";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});

test("Illegal Castling (Kingside Main Line)", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. Nj4-i6 .. Nj11-i9 
        2. f5-f6 .. 
            (..  3. O-O )
           f10-f9 .. 
            (..  3. O-O )
            (..  3. h10-h8 ) 
        3. Ne4-d6 .. Ne11-d9 
        4. e5-e7 .. e10-e8 
        5. Bf4-e5 .. Bf11-e10 
        6. O-O .. O-O`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(10);
    expect(requestManager.loadSnapshotByPath([2, 0, 0])).toBeFalsy();
    expect(requestManager.loadSnapshotByPath([3, 1, 0])).toBeFalsy();
    expect(requestManager.loadSnapshotByPath([3, 0, 0])).toBeTruthy();
});

test("Illegal Castling (Queenside Main Line)", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. Ne4-f6 .. Ne11-f9 
        2. e5-e6 .. e10-e9 
        3. Bf4-e5 .. Bf11-e10 
        4. Nj4-i6 .. 
            (..  5. O-O-O )
           Nj11-i9 .. 
            (..  5. h10-h8 ) 
            (..  5. O-O-O ) 
        5. h5-h6 .. h10-h9 
        6. O-O-O .. O-O-O`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
    expect(requestManager.getMoveTree().length).toBe(10);
    expect(requestManager.loadSnapshotByPath([6, 0, 0])).toBeFalsy();
    expect(requestManager.loadSnapshotByPath([7, 1, 0])).toBeFalsy();
    expect(requestManager.loadSnapshotByPath([7, 0, 0])).toBeTruthy();
});

test("Stalemate", () => {
    const start = new Date();
    requestManager.constructWithGeneratedData(
        `${fenStart}
        1. k5-k7 .. d10-d8
        2. h5-h6 .. k10-k8
        3. Bi4-h5 .. j10-j9
        4. Nj4-i6 .. i10-i8
        5. f5-f6 .. f10-f8
        6. e5-e7 .. d8xe7
        7. d5-d7 .. e7xd6
        8. Rd4xd6 .. Ne11-d9
        9. Rd6-d7 .. Qg11-f10
        10. Rd7-i7 .. Qf10-e9
        11. Ri7-e7 .. f8xRe7
        12. f6-f7 .. e7-e6
        13. f7-f8 .. Nd9xf8
        14. Ne4-f6 .. Nf8-d7
        15. Nf6xNd7 .. Rd11xNd7
        16. j5-j6 .. Rd7-d5
        17. Bh5-f7 .. Rd5-f5
        18. Bf7-g8 .. h10-h9
        19. Bg8xe6 .. Qe9xBe6
        20. Ni6-g7 .. Qe6-e4
        21. Qg4xRf5 .. Qe4xQf5
        22. Ng7xQf5 .. e10-e8
        23. Bf4-d6 .. Bi11xBd6
        24. Nf5xBd6 .. Bf11-d9
        25. Nd6-f5 .. Nj11-i9
        26. i5-i7 .. Ni9-h7
        27. g5-g6 .. Nh7xj6
        28. Rk4-k6 .. Nj6-h7
        29. Rk6-i6 .. Nh7-f6
        30. Kh4-i5 .. Nf6-g4+
        31. Ki5-j6 .. Bd9-e10
        32. Ri6-i4 .. Ng4-f6
        33. Ri4-i5 .. Nf6-g4
        34. Ri5-g5 .. Ng4-f6
        35. g6-g7 .. Nf6-h7+
        36. Kj6-k5 .. Nh7xRg5
        37. Kk5-j6 .. Be10-h7
        38. Nf5-d6 .. Bh7-g6
        39. Kj6-k5 .. Kh11-i10
        40. Kk5-j6 .. Bg6-h5
        41. Nd6-f5 .. Rk11-f11
        42. Nf5-e7 .. g10-g8
        43. Ne7xg8 .. h9xNg8
        44. Kj6-i5 .. Bh5-i6
        45. Ki5-j6 .. Rf11-h11
        46. Kj6-k5 .. Rh11xh6
        47. Kk5-j4 .. Rh6-h5
        48. S`,
        insufficientMaterialState
    );
});

test("50-Move Rule", () => {
    const start = new Date();
	requestManager.constructWithGeneratedData(
		`${fenStart}
        1. e5-e7 .. d10-d8
        2. f5-f6 .. j10-j8
        3. k5-k7 .. h10-h8
        4. g5-g7 .. i10-i9
        5. k7xj8 .. d8xe7
        6. j8xi9 .. Qg11xi9
        7. Nj4-i6 .. Rd11-d8
        8. d5-d7 .. e7xd6
        9. j5-j7 .. Qi9-h10
        10. Ni6xh8 .. e10-e8
        11. Qg4-e6 .. Qh10-h9
        12. Rd4xd6 .. Bi11xRd6
        13. Qe6xQh9+ .. g10xQh9
        14. Bf4xBd6 .. Bf11-e10
        15. i5-i6 .. Rd8-d7
        16. h5-h7 .. Be10-f9
        17. Nh8xBf9 .. Ne11xNf9
        18. Bi4xe8 .. Rd7-d8
        19. Be8xNf9+ .. Kh11-i10
        20. Rk4-k8 .. Rd8xRk8
        21. j7xRk8 .. Nj11-i9
        22. k8-k9 .. Rk11-g11
        23. i6-i7 .. Rg11-g9
        24. Bd6xRg9 .. f10xBg9
        25. f6-f7 .. Ki10-j9
        26. Ne4-f6 .. Kj9xk9
        27. Kh4-h5 .. g9-g8
        28. h7xg8 .. Kk9-j9
        29. g8xh9 .. k10-k8
        30. Nf6-h7 .. Ni9xNh7
        31. Bf9xNh7+ .. Kj9-i9
        32. Kh5-h6 .. Ki9xh9
        33. Bh7-j9 .. Kh9-i9
        34. Bj9xk8 .. Ki9-h9
        35. Bk8-j7+ .. Kh9-h10
        36. Bj7-i8 .. Kh10-i11
        37. Kh6-g6 .. Ki11-h10
        38. Kg6-f6 .. Kh10-i11
        39. Bi8-k10 .. Ki11-h10
        40. Bk10-j9 .. Kh10-i9
        41. Bj9-k10 .. Ki9-j10
        42. Bk10-i8 .. Kj10-i9
        43. Bi8-j7 .. Ki9-j10
        44. Bj7-k8 .. Kj10-i9
        45. Bk8-h11 .. Ki9-h10
        46. Bh11-f9 .. Kh10-i9
        47. Bf9-h7 .. Ki9-h10
        48. Kf6-g6 .. Kh10-g11
        49. Bh7-i8 .. Kg11-f10
        50. Kg6-f6 .. Kf10-e11
        51. Bi8-g10 .. Ke11-f10
        52. Bg10-h11 .. Kf10-g11
        53. Bh11-f9 .. Kg11-f10
        54. Bf9-d11 .. Kf10-g11
        55. Bd11-e10 .. Kg11-f10
        56. Be10-g8 .. Kf10-g11
        57. Bg8-h9 .. Kg11-h10
        58. Bh9-f11 .. Kh10-i11
        59. Bf11-i8 .. Ki11-h10
        60. Kf6-g6 .. Kh10-i9
        61. Kg6-h7 .. Ki9-j10
        62. Kh7-h6 .. Kj10-i9
        63. Bi8-h7 .. Ki9-h10
        64. Bh7-f9 .. Kh10-i9
        65. Bf9-g10 .. Ki9-h10
        66. Bg10-f11 .. Kh10-g11
        67. Bf11-i8 .. Kg11-f10
        68. Kh6-g6 .. Kf10-e11
        69. Kg6-h6 .. Ke11-d10
        70. Kh6-g6 .. Kd10-d9
        71. Bi8-f11+ .. Kd9-d8
        72. Bf11-e10 .. Kd8-e9
        73. Be10-f11 .. Ke9-f10
        74. Bf11-h9 .. Kf10-e11
        75. Bh9-g10 .. Ke11-f10
        76. Bg10-e8 .. Kf10-e11
        77. Be8-f9 .. Ke11-f10
        78. Bf9-g8 .. Kf10-g11
        79. Bg8-f9 .. Kg11-h10
        80. Kg6-h7 .. Kh10-i11
        81. g7-g8 .. Ki11-j10
        82. g8-g9 .. Kj10-i10
        83. Bf9-g10 .. Ki10-i11
        84. Kh7-h8 .. Ki11-i10
        85. Kh8-g8 .. Ki10-i11
        86. Kg8-f8 .. Ki11-i10
        87. Bg10-i8 .. Ki10-h11
        88. Bi8-f11 .. Kh11-g11
        89. Bf11-i8 .. Kg11-h11
        90. Bi8-h9 .. Kh11-g11
        91. Kf8-g8 .. Kg11-h11
        92. Bh9-i8 .. Kh11-g11
        93. Kg8-g7 .. Kg11-h11
        94. Kg7-f8 .. Kh11-g11
        95. Bi8-h9 .. Kg11-h11
        96. Kf8-g8 .. Kh11-g11
        97. Bh9-i8 .. Kg11-h11
        98. Kg8-g7 .. Kh11-g11
        99. Kg7-g6 .. Kg11-h11
        100. Kg6-h6 .. Kh11-g11
        101. Kh6-i6 .. Kg11-h11
        102. Bi8-f11 .. Kh11-g11
        103. Bf11-h9 .. Kg11-h11
        104. Bh9-i8 .. Kh11-g11
        105. Ki6-h6 .. Kg11-h11
        106. Kh6-g6 .. Kh11-g11
        107. Kg6-f6 .. Kg11-h11
        108. Kf6-e6 .. Kh11-g11
        109. Ke6-e7 .. Kg11-h11
        110. Ke7-f6 .. Kh11-g11
        111. Bi8-h9 .. Kg11-h11
        112. Kf6-g7 .. Kh11-g11
        113. Kg7-h8 .. Kg11-h11
        114. Kh8-h7 .. Kh11-g11
        115. Kh7-g7 .. Kg11-h11
        116. Kg7-h8 .. Kh11-g11
        117. Kh8-h7 .. Kg11-h11
        118. Kh7-h6 .. Kh11-g11
        119. Kh6-h7 .. Kg11-h11
        120. Kh7-g8 .. Kh11-g11
        121. Bh9-i8 .. Kg11-h11
        122. Kg8-f8 .. Kh11-g11
        123. Bi8-h9 .. Kg11-h11
        124. Bh9-f11 .. Kh11-g11
        125. Bf11-d9 .. Kg11-h11
        126. Bd9-e8+ .. Kh11-g11
        127. Be8-f9 .. Kg11-f11
        128. Bf9-h11 .. Kf11-g11
        129. g9-g10 .. Kg11-h10
        130. Kf8-f9 .. Kh10-g11
        131. Kf9-g8 .. Kg11-h10
        132. Kg8-f8 .. Kh10-g11
        133. Kf8-g7 .. Kg11-f10
        134. Kg7-f8 .. Kf10-g11
        135. Kf8-e8 .. Kg11-h10
        136. Ke8-e7 .. Kh10-g11
        137. f7-f8 .. Kg11-f10
        138. g10-g11=Q+ .. Kf10xQg11
        139. Bh11-e8 .. Kg11-f10
        140. f8-f9 .. Kf10-g11
        141. Ke7-f8 .. Kg11-f10
        142. i7-i8 .. Kf10-g11
        143. f9-f10+ .. Kg11xf10
        144. i8-i9 .. Kf10-g11
        145. i9-i10 .. Kg11-h10
        146. Be8-h11 .. Kh10-i11
        147. Kf8-g9 .. Ki11-j10
        148. Kg9-h10 .. Kj10-j9
        149. i10-i11=N+ .. Kj9-j8
        150. Ni11-h9+ .. Kj8-k7
        151. Bh11-j9 .. Kk7-j6
        152. Nh9-j8 .. Kj6-j5
        153. Bj9-h7+ .. Kj5-i4
        154. Bh7-g6+ .. Ki4-j4
        155. Nj8-i6+ .. Kj4-i5
        156. Bg6-h7 .. Ki5-h6
        157. Ni6-j8 .. Kh6-i5
        158. Nj8-k6+ .. Ki5-h6
        159. Bh7-g8 .. Kh6-g7
        160. Nk6-i7 .. Kg7-f6
        161. Ni7-h5+ .. Kf6-g5
        162. Bg8-f7 .. Kg5-h4
        163. Bf7-g6 .. Kh4-g5
        164. Bg6-d9 .. Kg5-h6
        165. Bd9-f7 .. Kh6-i5
        166. Bf7-g6 .. Ki5-h6
        167. Nh5-f4 .. Kh6-i5
        168. Kh10-i9 .. Ki5-j6
        169. Nf4-h5+ .. Kj6-k5
        170. Nh5-i7 .. Kk5-k4
        171. Bg6-h7+ .. Kk4-k5
        172. Ki9-i8 .. Kk5-j4
        173. Ni7-k6+ .. Kj4-k5
        174. Nk6-i5 .. Kk5-j4
        175. Ni5-k4 .. Kj4-k5
        176. Bh7-i6 .. Kk5-j4
        177. Nk4-j6 .. Kj4-i5
        178. Ki8-i7 .. Ki5-h4
        179. Nj6-h5 .. Kh4-g5
        180. Ki7-h7 .. Kg5-h4
        181. Kh7-h8 .. Kh4-i5
        182. Bi6-j7 .. Ki5-h4
        183. Nh5-j6 .. Kh4-g5
        184. Nj6-h7+ .. Kg5-f4
        185. Nh7-f6 .. Kf4-e5
        186. Nf6-g4+ .. Ke5-d6
        187. Ng4-f6 .. Kd6-e7
        188. Nf6-g8+ .. Ke7-d6
        189. Bj7-g4 .. Kd6-e5
        190. Ng8-e7 .. Ke5-f4
        191. Bg4-f5 .. Kf4-g5
        192. Bf5-g6 .. Kg5-f4
        193. Ne7-d5+ .. Kf4-g5
        194. Bg6-h7 .. Kg5-h4
        195. Nd5-f6 .. Kh4-i4
        196. Bh7-g6+ .. Ki4-j5
        197. Bg6-h7+ .. Kj5-k5
        198. Nf6-h5 .. Kk5-k6
        199. Bh7-i8+`,
        insufficientMaterialState
	);

    expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(3);
    expect(requestManager.getMoveTree().length).toBe(397);
    expect(requestManager.loadSnapshotByPath([396])).toBeTruthy();
    expect(requestManager.getFENSettings().points[0]).toBe(24);
	expect(requestManager.getFENSettings().points[2]).toBe(24);
    const terminationString: Termination = "50-MOVE RULE • ½-½";
    expect(requestManager.getBoardInstance().data.gameOver).toBe(terminationString);
});
