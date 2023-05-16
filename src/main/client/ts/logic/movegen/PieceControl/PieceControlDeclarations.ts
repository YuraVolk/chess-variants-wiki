import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { PieceControl } from "./PieceControl";
import { AttackType, createPieceDeclaration, dameLetter, defaultPieces, grasshopperPieceLetter, pawnPieceLetter } from "./PieceControlInterface";

const orthogonalMoves: Coordinate[] = [
	[-1, 0],
	[1, 0],
	[0, 1],
	[0, -1]
];
const diagonalMoves: Coordinate[] = [
	[-1, -1],
	[1, 1],
	[-1, 1],
	[1, -1]
];
const kingDirections = [...orthogonalMoves, ...diagonalMoves];
const knightHops: Coordinate[] = [
	[-1, -2],
	[-2, -1],
	[-1, 2],
	[2, -1],
	[-2, 1],
	[1, -2],
	[1, 2],
	[2, 1]
];
const camelHops: Coordinate[] = [
	[-1, -3],
	[-3, -1],
	[-1, 3],
	[3, -1],
	[-3, 1],
	[1, -3],
	[1, 3],
	[3, 1]
];
const dabbabaHops: Coordinate[] = [
	[-2, 0],
	[2, 0],
	[0, 2],
	[0, -2]
];
const alfilHops: Coordinate[] = [
	[-2, -2],
	[2, 2],
	[-2, 2],
	[2, -2]
];
export const initPieceControlDeclarations = () => {
	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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
			piece: defaultPieces.rook,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: false,
				isSliding: true,
				isPawn: false,
				isColorBound: false
			},
			naming: {
				name: "Rook",
				shortName: defaultPieces.rook.toLowerCase()
			}
		}
	});

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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
			piece: defaultPieces.bishop,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: false,
				isSliding: true,
				isPawn: false,
				isColorBound: true
			},
			naming: {
				name: "Bishop",
				shortName: defaultPieces.bishop.toLowerCase()
			}
		}
	});

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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
			piece: defaultPieces.king,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: true,
				isSliding: false,
				isPawn: false,
				isColorBound: false
			},
			naming: {
				name: "King",
				shortName: defaultPieces.king.toLowerCase()
			}
		}
	});

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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
			piece: defaultPieces.queen,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: false,
				isSliding: true,
				isPawn: false,
				isColorBound: false
			},
			naming: {
				name: "Queen",
				shortName: defaultPieces.queen.toLowerCase()
			}
		}
	});

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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
			piece: dameLetter,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: false,
				isSliding: true,
				isPawn: false,
				isColorBound: false
			},
			naming: {
				name: "1-point queen",
				shortName: dameLetter.toLowerCase()
			}
		}
	});

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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
			piece: defaultPieces.knight,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: true,
				isSliding: false,
				isPawn: false,
				isColorBound: false
			},
			naming: {
				name: "Knight",
				shortName: defaultPieces.knight.toLowerCase()
			}
		}
	});

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
			constructor() {
				super();
				this.hooks.usePerspective = [true, true, true, true];
				this.hooks.usePawnLogic = {};
			}

			getPossibleCells() {
				this.generateJumpAttack({ displacement: [-1, -1], special: AttackType.AttackOnly });
				this.generateJumpAttack({ displacement: [-1, 1], special: AttackType.AttackOnly });
				this.generateSlidingAttack({
					displacement: [-1, 0],
					special: AttackType.MoveOnly,
					limit: this.baseRankActive ? 2 : 1,
					irreversible: true
				});
				return this.moves;
			}

			rayGenJumpingAttacks() {
				this.generateJumpAttack({ displacement: [-1, -1], special: AttackType.RayTrace });
				this.generateJumpAttack({ displacement: [-1, 1], special: AttackType.RayTrace });
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
			piece: pawnPieceLetter,
			moveGenerationSettings: {
				isComplex: false,
				isJumping: true,
				isSliding: false,
				isPawn: true,
				isColorBound: false
			},
			naming: {
				name: "Pawn",
				shortName: pawnPieceLetter.toLowerCase()
			}
		}
	});

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
			constructor() {
				super();
				this.hooks.usePerspective = [true, true, true, true];
				this.hooks.usePawnLogic = {};
			}

			getPossibleCells() {
				this.generateSlidingAttack({
					displacement: [-1, -1],
					special: AttackType.MoveOnly,
					limit: this.baseRankActive ? 2 : 1,
					irreversible: true
				});
				this.generateSlidingAttack({
					displacement: [-1, 1],
					special: AttackType.MoveOnly,
					limit: this.baseRankActive ? 2 : 1,
					irreversible: true
				});
				this.generateJumpAttack({ displacement: [-1, -1], special: AttackType.AttackOnly });
				return this.moves;
			}

			rayGenJumpingAttacks() {
				this.generateJumpAttack({ displacement: [-1, -1], special: AttackType.RayTrace });
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

	const stoneGeneralControl = createPieceDeclaration({
		baseClassRef: class extends PieceControl {
			constructor() {
				super();
				this.hooks.usePerspective = [true, true, true, true];
				this.hooks.usePawnLogic = {};
			}

			getPossibleCells() {
				this.generateSlidingAttack({
					displacement: [-1, -1],
					special: AttackType.MoveOnly,
					limit: this.baseRankActive ? 2 : 0,
					irreversible: true
				});
				this.generateSlidingAttack({
					displacement: [-1, 1],
					special: AttackType.MoveOnly,
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
				this.generateJumpAttack({ displacement: [-1, -1], special: AttackType.RayTrace });
				this.generateJumpAttack({ displacement: [-1, 1], special: AttackType.RayTrace });
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

	const soldierControl = createPieceDeclaration({
		baseClassRef: class extends PieceControl {
			constructor() {
				super();
				this.hooks.usePerspective = [true, true, true, true];
				this.hooks.usePawnLogic = {};
			}

			getPossibleCells() {
				this.generateSlidingAttack({
					displacement: [-1, 0],
					special: AttackType.MoveOnly,
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
				this.generateJumpAttack({ displacement: [-1, 0], special: AttackType.RayTrace });
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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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

	const xiangqiHorseControl = createPieceDeclaration({
		baseClassRef: class extends PieceControl {
			constructor() {
				super();
				this.hooks.useTrajectory = [
					[-1, 0],
					[1, 0],
					[0, 1],
					[0, -1]
				];
			}

			getPossibleCells() {
				this.generateJumpAttack({ displacement: [-1, -2], special: AttackType.Normal, squareBlockingIndex: 3 });
				this.generateJumpAttack({ displacement: [1, -2], special: AttackType.Normal, squareBlockingIndex: 3 });
				this.generateJumpAttack({ displacement: [-1, 2], special: AttackType.Normal, squareBlockingIndex: 2 });
				this.generateJumpAttack({ displacement: [1, 2], special: AttackType.Normal, squareBlockingIndex: 2 });
				this.generateJumpAttack({ displacement: [2, -1], special: AttackType.Normal, squareBlockingIndex: 1 });
				this.generateJumpAttack({ displacement: [2, 1], special: AttackType.Normal, squareBlockingIndex: 1 });
				this.generateJumpAttack({ displacement: [-2, -1], special: AttackType.Normal, squareBlockingIndex: 0 });
				this.generateJumpAttack({ displacement: [-2, 1], special: AttackType.Normal, squareBlockingIndex: 0 });

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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
			constructor() {
				super();
				this.hooks.useTrajectory = [
					[-1, 0],
					[1, 0],
					[0, 1],
					[0, -1]
				];
			}

			getPossibleCells() {
				xiangqiHorseControl.getPossibleCells.call(this);
				this.sliding.forEach((displacement) => {
					this.generateSlidingAttack({ displacement });
				});

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

	createPieceDeclaration({
		baseClassRef: class extends PieceControl {
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
			piece: grasshopperPieceLetter,
			moveGenerationSettings: {
				isComplex: true,
				isJumping: true,
				isSliding: false,
				isPawn: false,
				isColorBound: false
			},
			naming: {
				name: "Grasshopper",
				shortName: grasshopperPieceLetter.toLowerCase(),
				description: "jumps in any direction hopping over the first piece, landing immediately behind it"
			}
		}
	});
};
