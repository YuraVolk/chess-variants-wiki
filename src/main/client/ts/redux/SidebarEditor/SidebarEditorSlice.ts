import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ExtractStateTagByType, ExtractVariantRuleByType, READONLY_MAPPED_TAGS, SidebarEditorInterface } from "./SidebarEditorInterface";
import { createNewGameBoard, updateInteractionSettings } from "@client/ts/logic/index/GameBoardSlice";
import { VariantType, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { PieceString, PieceStringObject, emptyPieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { initializeBoardSquares } from "@client/ts/logic/BaseInterfaces";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { SimplexType, Tuple, assertDevOnly, createTuple } from "@client/ts/baseTypes";
import { getNeighboringSideToMove } from "@moveGeneration/FENData/FENDataInterface";
import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import type { RootState } from "../store";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import type { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { FENOptionsSerializedState, FENOptionsTags } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import { stringifyCoordinate } from "@moveGeneration/Board/BoardInterface";

const baseFalsyColors = createTuple(false, totalPlayers);

export const sidebarEditorsAdapter = createEntityAdapter<SidebarEditorInterface>();
export const sidebarEditorsSlice = createSlice({
	name: "sidebarEditors",
	initialState: sidebarEditorsAdapter.getInitialState(),
	reducers: {
		changeDimensionValue: (state, action: PayloadAction<{ id: number; newValue: number; selectedId: 0 | 1 }>) => {
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, action.payload.id);
			if (!editor?.publicFENSettings) return;

			const newValues: [number, number] =
				action.payload.selectedId === 0
					? [action.payload.newValue, editor.publicFENSettings.fenOptions.dim[1]]
					: [editor.publicFENSettings.fenOptions.dim[0], action.payload.newValue];
			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/changeDimension",
				payload: {
					id: action.payload.id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: {
								...editor.publicFENSettings.fenOptions,
								dim: newValues
							}
						}
					}
				}
			});
		},
		changeNumericColorValue: (state, action: PayloadAction<{ id: number; option: ExtractStateTagByType<NumericColor> }>) => {
			const { id, option } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/changeNumericColorValue",
				payload: {
					id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: {
								...editor.publicFENSettings.fenOptions,
								[option]: getNeighboringSideToMove(editor.publicFENSettings.fenOptions[option], baseFalsyColors)
							}
						}
					}
				}
			});
		},
		toggleBooleanValue: (state, action: PayloadAction<{ id: number; option: ExtractStateTagByType<boolean> }>) => {
			const { id, option } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/toggleBooleanValue",
				payload: {
					id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: {
								...editor.publicFENSettings.fenOptions,
								[option]: !editor.publicFENSettings.fenOptions[option]
							}
						}
					}
				}
			});
		},
		toggleBooleanTupleValue: (
			state,
			action: PayloadAction<{ id: number; index: NumericColor; option: ExtractStateTagByType<PlayerBooleanTuple> }>
		) => {
			const { id, option, index } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			const newValue: PlayerBooleanTuple = [...editor.publicFENSettings.fenOptions[option]];
			newValue[index] = !newValue[index];
			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/toggleBooleanTupleValue",
				payload: {
					id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: {
								...editor.publicFENSettings.fenOptions,
								[option]: newValue
							}
						}
					}
				}
			});
		},
		toggleBooleanVariantRule: (state, action: PayloadAction<{ id: number; option: ExtractVariantRuleByType<boolean> }>) => {
			const { id, option } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.variantDataRules) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/toggleVariantRule",
				payload: {
					id,
					changes: {
						variantDataRules: {
							...editor.variantDataRules,
							[option]: !editor.variantDataRules[option]
						}
					}
				}
			});
		},
		changeParametrizedVariantRule: (
			state,
			action: PayloadAction<{
				id: number;
				option: Exclude<keyof VariantDataRules, ExtractVariantRuleByType<boolean>>;
				newValue: StripPieceStringObjects<VariantDataRules>[keyof VariantDataRules];
			}>
		) => {
			const { id, option, newValue } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.variantDataRules) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/changeParametrizedRule",
				payload: {
					id,
					changes: {
						variantDataRules: {
							...editor.variantDataRules,
							[option]: newValue
						}
					}
				}
			});
		},
		dropPiece: (state, action: PayloadAction<{ id: number; endCoordinate: Coordinate }>) => {
			const { id, endCoordinate } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.currentDroppedPiece || !editor.publicFENSettings) return;

			if (Array.isArray(editor.currentDroppedPiece)) {
				const startCoordinate: Coordinate = editor.currentDroppedPiece;
				let newFenOptions = editor.publicFENSettings.fenOptions;
				for (const [tagName, tag] of READONLY_MAPPED_TAGS) {
					newFenOptions = {
						...newFenOptions,
						[tagName]: tag.mapNewEndCoordinate(editor.publicFENSettings.fenOptions[tagName] as never, startCoordinate, endCoordinate)
					};
				}

				sidebarEditorsAdapter.updateOne(state, {
					type: "sidebarEditors/movePieceOnBoard",
					payload: {
						id,
						changes: {
							isDroppingEnabled: false,
							currentDroppedPiece: undefined,
							boardSquares: editor.boardSquares.map((r, i) =>
								i === startCoordinate[0] || i === endCoordinate[0]
									? r.map((s, j) => {
											if (i === startCoordinate[0] && j === startCoordinate[1]) {
												return emptyPieceString.toObject();
											} else if (i === endCoordinate[0] && j === endCoordinate[1]) {
												return editor.boardSquares[startCoordinate[0]][startCoordinate[1]];
											} else return s;
									  })
									: r
							),
							publicFENSettings: {
								...editor.publicFENSettings,
								fenOptions: newFenOptions
							}
						}
					}
				});
			} else {
				const piece: PieceStringObject = editor.currentDroppedPiece;
				sidebarEditorsAdapter.updateOne(state, {
					type: "sidebarEditors/dropPieceOnBoard",
					payload: {
						id,
						changes: {
							isDroppingEnabled: false,
							currentDroppedPiece: undefined,
							boardSquares: editor.boardSquares.map((r, i) =>
								i === endCoordinate[0] ? r.map((s, j) => (j === endCoordinate[1] ? piece : s)) : r
							)
						}
					}
				});
			}
		},
		setCurrentDroppedPiece: (state, action: PayloadAction<{ id: number; piece?: PieceStringObject | Coordinate }>) => {
			const { id, piece } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/setCurrentDroppedPiece",
				payload: {
					id,
					changes: {
						isDroppingEnabled: false,
						currentDroppedPiece: piece
					}
				}
			});
		},
		deleteDroppedPiece: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.currentDroppedPiece || !Array.isArray(editor.currentDroppedPiece)) return;

			const startCoordinate: Coordinate = editor.currentDroppedPiece;
			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/deleteDroppedPiece",
				payload: {
					id,
					changes: {
						isDroppingEnabled: false,
						currentDroppedPiece: undefined,
						boardSquares: editor.boardSquares.map((r, i) =>
							i === startCoordinate[0] ? r.map((s, j) => (j === startCoordinate[1] ? emptyPieceString.toObject() : s)) : r
						)
					}
				}
			});
		},
		toggleEnabledSquares: (state, action: PayloadAction<{ id: number; piece: PieceStringObject }>) => {
			const { id, piece } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/disabledEnabledSquares",
				payload: {
					id,
					changes: {
						currentDroppedPiece: piece,
						isDroppingEnabled: true
					}
				}
			});
		},
		disableEnabledSquares: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/disabledEnabledSquares",
				payload: {
					id,
					changes: {
						currentDroppedPiece: undefined,
						isDroppingEnabled: false
					}
				}
			});
		},
		changeSideToMove: (state, action: PayloadAction<{ id: number; newSideToMove: NumericColor }>) => {
			const { id, newSideToMove } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/changeSideToMove",
				payload: {
					id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							sideToMove: newSideToMove
						}
					}
				}
			});
		},
		selectCoordinateBasedTag: (state, action: PayloadAction<{ id: number; newTag: keyof FENOptionsTags }>) => {
			const { id, newTag } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor) return;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/selectCoordinateBasedTag",
				payload: {
					id,
					changes: {
						selectedCoordinateFENtag: editor.selectedCoordinateFENtag === newTag ? undefined : newTag
					}
				}
			});
		},
		deleteRoyal: (state, action: PayloadAction<{ id: number; index: NumericColor }>) => {
			const { id, index } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			const newRoyal: Tuple<Coordinate | null, typeof totalPlayers> = [...editor.publicFENSettings.fenOptions.royal];
			newRoyal[index] = null;

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/nullifyRoyalStatus",
				payload: {
					id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: {
								...editor.publicFENSettings.fenOptions,
								royal: newRoyal
							}
						}
					}
				}
			});
		},
		setCoordinateBasedTagSquare: (state, action: PayloadAction<{ id: number; coordinate: Coordinate }>) => {
			const { id, coordinate } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			const newFenOptions = { ...editor.publicFENSettings.fenOptions };
			const boardSquare = PieceString.fromObjectToClass(editor.boardSquares[coordinate[0]][coordinate[1]]);

			switch (editor.selectedCoordinateFENtag) {
				case "royal":
					if (boardSquare.isPiece()) {
						newFenOptions.royal = newFenOptions.royal.map((r, i) => (i === boardSquare.color ? coordinate : r));
					}
					break;
				case "seirawanDrops": {
					const stringified = stringifyCoordinate(coordinate);
					newFenOptions.seirawanDrops = newFenOptions.seirawanDrops.map((coordinates, i) => {
						if (coordinates.includes(stringified)) return coordinates;
						if (boardSquare.isEmpty()) {
							if (i !== editor.publicFENSettings?.sideToMove) return coordinates;
						} else if (i !== boardSquare.color) {
							return coordinates;
						}

						return [...coordinates, stringified];
					});
					break;
				}
			}

			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/addCoordinateBasedValue",
				payload: {
					id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: newFenOptions
						}
					}
				}
			});
		},
		changeParametrizedFENTag: (
			state,
			action: PayloadAction<{
				id: number;
				option: ExtractStateTagByType<Tuple<Exclude<SimplexType, boolean>, typeof totalPlayers>>;
				newValue: FENOptionsSerializedState[ExtractStateTagByType<
					Tuple<Exclude<SimplexType, boolean>, typeof totalPlayers>
				>][NumericColor];
				index: NumericColor;
			}>
		) => {
			const { id, option, newValue, index } = action.payload;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor?.publicFENSettings) return;

			const newArray: Tuple<Exclude<SimplexType, boolean>, typeof totalPlayers> = [...editor.publicFENSettings.fenOptions[option]];
			newArray[index] = newValue;
			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/changeParametrizedFENTag",
				payload: {
					id,
					changes: {
						publicFENSettings: {
							...editor.publicFENSettings,
							fenOptions: {
								...editor.publicFENSettings.fenOptions,
								[option]: newArray
							}
						}
					}
				}
			});
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createNewGameBoard, (state, action) => {
			const emptyPieceStringObject = emptyPieceString.toObject();
			sidebarEditorsAdapter.addOne(state, {
				type: "sidebarEditors/createNew",
				payload: {
					id: action.payload.id,
					variantType: VariantType.FFA,
					boardSquares: initializeBoardSquares(() => emptyPieceStringObject),
					variantDataRules: undefined,
					publicFENSettings: undefined,
					currentMove: [-1],
					moveTree: [],
					serializedFEN: { board: "", moves: "" },
					isDroppingEnabled: false
				}
			});
		});

		builder.addCase(updateInteractionSettings, (state, action) => {
			const resultingObject: Partial<SidebarEditorInterface> = {};
			const payload = action.payload.settings,
				id = action.payload.id;
			const editor = sidebarEditorsAdapter.getSelectors().selectById(state, id);
			if (!editor) return;

			if (payload.variantType) resultingObject.variantType = payload.variantType;
			if (payload.boardSquares) resultingObject.boardSquares = payload.boardSquares;
			if (payload.variantDataRules) resultingObject.variantDataRules = payload.variantDataRules;
			if (payload.publicFENSettings) resultingObject.publicFENSettings = payload.publicFENSettings;
			sidebarEditorsAdapter.updateOne(state, {
				type: "sidebarEditors/syncSettings",
				payload: {
					id,
					changes: resultingObject
				}
			});
		});
	}
});

export const {
	changeDimensionValue,
	changeNumericColorValue,
	toggleBooleanValue,
	toggleBooleanTupleValue,
	toggleBooleanVariantRule,
	changeParametrizedVariantRule,
	dropPiece,
	setCurrentDroppedPiece,
	deleteDroppedPiece,
	toggleEnabledSquares,
	disableEnabledSquares,
	changeSideToMove,
	selectCoordinateBasedTag,
	deleteRoyal,
	setCoordinateBasedTagSquare,
	changeParametrizedFENTag
} = sidebarEditorsSlice.actions;
export default sidebarEditorsSlice.reducer;

export const selectEditorSidebar = (state: RootState, id: number) => {
	const sidebarEditor = sidebarEditorsAdapter.getSelectors().selectById(state.sidebarEditors, id);
	assertDevOnly(sidebarEditor !== undefined);
	return sidebarEditor;
};
export const selectEditorVariantType = (state: RootState, id: number) => selectEditorSidebar(state, id).variantType;
export const selectEditorBoardSquares = (state: RootState, id: number) => selectEditorSidebar(state, id).boardSquares;
export const selectEditorVariantDataRules = (state: RootState, id: number) => {
	const variantData = selectEditorSidebar(state, id).variantDataRules;
	assertDevOnly(variantData !== undefined);
	return variantData;
};
export const selectEditorFENSettings = (state: RootState, id: number) => {
	const fenSettings = selectEditorSidebar(state, id).publicFENSettings;
	assertDevOnly(fenSettings !== undefined);
	return fenSettings;
};
