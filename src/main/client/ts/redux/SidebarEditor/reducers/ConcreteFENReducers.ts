import type { Draft, EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { SidebarEditorInterface } from "../SidebarEditorInterface";
import { sidebarEditorsAdapter } from "../SidebarEditorSlice";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import type { Tuple } from "@client/ts/baseTypes";
import { totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { stringifyCoordinate } from "@moveGeneration/Board/BoardInterface";
import { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";

export const fenTagReducers = {
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
    }
} satisfies Record<string, (state: Draft<EntityState<SidebarEditorInterface>>, action: never) => void>;
