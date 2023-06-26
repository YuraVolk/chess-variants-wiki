import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { READONLY_MAPPED_TAGS, SidebarEditorInterface } from "../SidebarEditorInterface";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { emptyPieceString, PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { sidebarEditorsAdapter } from "../SidebarEditorSlice";

export const pieceDroppingReducers = {
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
    }
} satisfies Record<string, (state: Draft<EntityState<SidebarEditorInterface>>, action: never) => void>;
