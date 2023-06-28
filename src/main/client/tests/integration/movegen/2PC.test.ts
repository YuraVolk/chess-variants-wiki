import { assertNonUndefined } from "@client/ts/baseTypes";
import { RequestManager } from "@client/ts/logic/index/GameBoardWorker";
import { compareCoordinates } from "@moveGeneration/Board/BoardInterface";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";

test("Load long chess game", () => {
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

test("Castling in 2PC", () => {
	const fenStart = `[StartFen4 "2PC"]
    [Variant "FFA"]
    [RuleVariants "Castling EnPassant Play4Mate Prom=11"]
    [TimeControl "1 | 5"]`;
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

	function checkWhetherCastlingOccurred(color: NumericColor, castling: "castleKingside" | "castleQueenside") {
		const fenSettings = requestManager.getFENSettings();
		if (fenSettings.fenOptions[castling][color]) return false;
		const royal = fenSettings.fenOptions.royal[color];
		if (!royal) return false;
		const baseSnapshot = requestManager.getBoardInstance().moves.getBoardSnapshot(requestManager.getBoardInstance().moves.moves[0]);
		assertNonUndefined(baseSnapshot);
		return !compareCoordinates(baseSnapshot.boardSnapshot.data.fenOptionsSnapshot.tagsSnapshot.royal[color] ?? [-1, -1], royal);
	}

	expect(checkWhetherCastlingOccurred(0, "castleKingside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(0, "castleQueenside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(2, "castleKingside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(2, "castleQueenside")).toBeFalsy();

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

    expect(checkWhetherCastlingOccurred(0, "castleKingside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(0, "castleQueenside")).toBeTruthy();
	expect(checkWhetherCastlingOccurred(2, "castleKingside")).toBeFalsy();
	expect(checkWhetherCastlingOccurred(2, "castleQueenside")).toBeTruthy();
});
