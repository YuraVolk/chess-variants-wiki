import { assertNonUndefined } from "@client/ts/baseTypes";
import { RequestManager } from "@client/ts/logic/index/GameBoardWorker";
import { compareCoordinates } from "@moveGeneration/Board/BoardInterface";
import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";

const fenStart = `[StartFen4 "2PC"]
[Variant "FFA"]
[RuleVariants "Castling EnPassant Play4Mate Prom=11"]
[TimeControl "1 | 5"]`;

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

	const requestManager = new RequestManager();

	const start = new Date();
	requestManager.construct("2PC", PGN_4);
	expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(5);
	expect(requestManager.getMoveTree().length).toBe(202);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length])).toBeFalsy();
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
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart}
    1. Nj4-i6 .. Nj11-i9
    2. j5-j6 .. j10-j9
    3. Bi4-j5 .. Bi11-j10
    4. O-O .. O-O`
	);
	requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1]);

	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleKingside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleQueenside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleKingside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleQueenside")).toBeFalsy();
});

test("Castling Queenside", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart}
        1. Ne4-f6 .. Ne11-f9
        2. g5-g7 .. g10-g8
        3. Qg4-g6 .. Qg11-g9
        4. Bf4-g5 .. Bf11-g10
        5. O-O-O .. O-O-O`
	);
	requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1]);

	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleKingside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(requestManager, 0, "castleQueenside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleKingside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(requestManager, 2, "castleQueenside")).toBeTruthy();
});

test("Diagonal Checkmate by Bot", () => {
	const requestManager = new RequestManager();
	requestManager.construct("2PC", `${fenStart} 1. i5-i6 .. h10-h9 2. j5-j7`);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	const start = new Date();
	const botMove = requestManager.playPreferredBotMove();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);

	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.getFENSettings().points[0]).toBeLessThan(requestManager.getFENSettings().points[2]);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
});

test("Diagonal Checkmate, no move by Bot", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart} 
        1. i5-i6 .. h10-h9
        2. j5-j7 .. Qg11-k7+#`
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
});

test("Supported Checkmate by Bot", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart} 
    1. h5-h6 .. Ne11-f9
    2. Bi4-f7 .. e10-e9
    3. Qg4-i6 .. d10-d8`
	);

	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getBoardInstance().data.gameOver).toBeFalsy();
	const start = new Date();
	const botMove = requestManager.playPreferredBotMove();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);
	expect(requestManager.getFENSettings().fenOptions.dead[2]).toBeTruthy();
	expect(requestManager.getFENSettings().points[2]).toBeLessThan(requestManager.getFENSettings().points[0]);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
});

test("Supported Checkmate, no move by Bot", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart} 
        1. h5-h6 .. Ne11-f9
        2. Bi4-f7 .. e10-e9
        3. Qg4-i6 .. d10-d8
        4. Qi6xi10+#`
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
});

test("Semi-Smothered Checkmate with Bot", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart} 
        1. h5-h7 .. h10-h8
        2. Qg4-k8 .. Kh11-h10`
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	const start = new Date();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	const botMove = requestManager.playPreferredBotMove();
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
	expect(requestManager.getFENSettings().fenOptions.dead[2]).toBeTruthy();
	expect(requestManager.getFENSettings().points[2]).toBeLessThan(requestManager.getFENSettings().points[0]);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
});

test("Semi-Smothered Checkmate, no move by Bot", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart} 
        1. h5-h7 .. h10-h8
        2. Qg4-k8 .. Kh11-h10
        3. Qk8xh8+#`
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	const moveTreeLength = requestManager.getMoveTree().length;
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
	expect(requestManager.playPreferredBotMove()).toBeUndefined();
	expect(requestManager.getMoveTree().length).toBe(moveTreeLength);
});

test("Discovered Smothered Mate with Bot", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart}
    1. g5-g7 .. Nj11-i9
    2. f5-f7 .. h10-h8
    3. g7xh8 .. Ni9-j7
    4. Nj4-i6 .. Ne11-f9
    5. Bf4-i7 .. Bi11-e7+
    6. Ne4-g5 .. Qg11-h10
    7. d5-d6 .. Nj7xh8
    8. d6xBe7`
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(15);
	const start = new Date();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	const botMove = requestManager.playPreferredBotMove();
	assertNonUndefined(botMove);
	requestManager.makeMove(botMove);
	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.getFENSettings().points[0]).toBeLessThan(requestManager.getFENSettings().points[2]);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
});

test("Discovered Smothered Mate, no move by Bot", () => {
	const requestManager = new RequestManager();

	requestManager.construct(
		"2PC",
		`${fenStart}
        1. g5-g7 .. Nj11-i9
        2. f5-f7 .. h10-h8
        3. g7xh8 .. Ni9-j7
        4. Nj4-i6 .. Ne11-f9
        5. Bf4-i7 .. Bi11-e7+
        6. Ne4-g5 .. Qg11-h10
        7. d5-d6 .. Nj7xh8
        8. d6xBe7 .. Nh8-g6+#`
	);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(16);
	const start = new Date();
	expect(requestManager.playPreferredBotMove()).toBeUndefined();
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(600);
	expect(requestManager.getFENSettings().fenOptions.dead[0]).toBeTruthy();
	expect(requestManager.getFENSettings().points[0]).toBeLessThan(requestManager.getFENSettings().points[2]);
	expect(requestManager.getBoardInstance().data.gameOver).toBeTruthy();
});

test("En Passant", () => {
	const gameOfPointsFEN = `[StartFen4 "2PC"]
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

	const requestManager = new RequestManager();
	const start = new Date();
	requestManager.construct("2PC", gameOfPointsFEN);
	expect(new Date().getSeconds() - start.getSeconds()).toBeLessThanOrEqual(2);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(20);
	expect(requestManager.getFENSettings().points[0]).toBe(2);
	expect(requestManager.getFENSettings().points[2]).toBe(2);
});

test("Legal Promotion", () => {
	const promotionTestPGN4 = `
    [StartFen4 "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'dim':'8x8','wb':true}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,rP,rP,yP,yP,yP,yP,rP,rP,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,yP,yP,rP,rP,rP,rP,yP,yP,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"]
    [Variant "FFA"]
    [RuleVariants "EnPassant"]
    [CurrentMove "0"]
    [TimeControl "1 | 15D"]
    
    1. j10xRk11=B .. j5xRk4=N
    2. k10xNj11=R .. k5xNj4=R
    3. d10xNe11=N .. d5xNe4=B
    4. e10xRd11=Q .. e5xRd4=Q
    5. Qd11xQd4 .. Be4xf5
    6. Rj11xRj4 .. Nk4xi5
    7. Ne11xg10`;

	const requestManager = new RequestManager();
	const start = new Date();
	requestManager.construct("2PC", promotionTestPGN4);
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
    [RuleVariants "EnPassant"]
    [CurrentMove "0"]
    [TimeControl "1|15D"]

    1. j10xRk11=x .. j5xRk4=X`;

	const requestManager = new RequestManager();
	const start = new Date();
	requestManager.construct("2PC", illegalPromotionTestFEN);
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

	const requestManager = new RequestManager();
	const start = new Date();
	requestManager.construct("2PC", illegalPromotionTestFEN);
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1500);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(0);
	expect(requestManager.getBoardInstance().data.gameOver).toBeFalsy();
});

test("Illegal Promotion Rank", () => {
	const illegalPromotionTestFEN = `
    [StartFen4 "R-0,1,0,1-1,1,1,1-1,1,1,1-0,0,0,0-0-{'dim':'8x8','wb':true}-x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,yR,yN,yB,yQ,yK,yB,yN,yR,x,x,x/x,x,x,2,yP,yP,yP,yP,2,x,x,x/x,x,x,1,rP,4,rP,1,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,1,yP,4,yP,1,x,x,x/x,x,x,2,rP,rP,rP,rP,2,x,x,x/x,x,x,rR,rN,rB,rQ,rK,rB,rN,rR,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x"]
    [Variant "FFA"]
    [RuleVariants "EnPassant"]
    [CurrentMove "2"]
    [TimeControl "1|15D"]

    1. j9-j10=Q .. j6-j5=Q`;

	const requestManager = new RequestManager();
	const start = new Date();
	requestManager.construct("2PC", illegalPromotionTestFEN);
	expect(new Date().getMilliseconds() - start.getMilliseconds()).toBeLessThanOrEqual(1500);
	expect(requestManager.loadSnapshotByPath([requestManager.getMoveTree().length - 1])).toBeTruthy();
	expect(requestManager.getMoveTree().length).toBe(0);
	expect(requestManager.getBoardInstance().data.gameOver).toBeFalsy();
});
