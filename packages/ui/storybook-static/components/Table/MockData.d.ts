import { HeadRowCells, Row } from './types';
export declare const range: (end: number) => number[];
export interface RowStructure {
    id: string;
    username: string;
    fullName: string;
    role: string;
    lastActive: string;
    status: string;
    address: {
        city: string;
        street: string;
    };
}
export declare const headCells: HeadRowCells<RowStructure>;
export declare const rows: Row<RowStructure>[];
export interface RowStructureWithStickyActions {
    id: string;
    username: string;
    fullName: string;
    role: string;
    lastActive: string;
    status: string;
    address: {
        city: string;
        street: string;
    };
    actions: string;
}
export declare const headCellsWithSticky: HeadRowCells<RowStructureWithStickyActions>;
export declare const rowsWithSticky: Row<RowStructureWithStickyActions>[];
