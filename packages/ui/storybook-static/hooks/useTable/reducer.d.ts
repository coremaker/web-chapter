import { SortDirection } from '@mui/material';
import { CellId, GenericRowStructure } from '../../components/Table/types';
export type SelectedRowIds = Record<string, boolean>;
export interface TableState<T extends GenericRowStructure> {
    selectedRowIds: SelectedRowIds;
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortByColumnId?: CellId<T> | null;
    sortDirection: SortDirection;
}
export type Action<T extends GenericRowStructure> = {
    type: 'update';
    payload: Partial<TableState<T>>;
};
export declare function reducer<T extends GenericRowStructure>(state: TableState<T>, action: Action<T>): TableState<T>;
