import { SortDirection } from '@mui/material';
import { produce } from 'immer';
import mergeWith from 'lodash.mergewith';
import { CellId, GenericRowStructure } from 'src/components/Table/types';

export type SelectedRowIds = Record<string, boolean>;

export interface TableState<T extends GenericRowStructure> {
    selectedRowIds: SelectedRowIds;
    page: number;
    rowsPerPage: number;
    searchValue: string;
    sortByColumnId?: CellId<T> | null;
    sortDirection: SortDirection;
    defaultRowsPerPage?: number;
}

export type Action<T extends GenericRowStructure> = {
    type: 'update';
    payload: Partial<TableState<T>>;
};

export function reducer<T extends GenericRowStructure>(state: TableState<T>, action: Action<T>) {
    switch (action.type) {
        case 'update': {
            return produce(state, (draftState) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-param-reassign
                draftState = mergeWith(draftState, action.payload, (objValue, srcValue) => {
                    if (Array.isArray(objValue)) {
                        return srcValue;
                    }
                    return undefined;
                });
            });
        }
        default: {
            return state;
        }
    }
}
