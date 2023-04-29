import { SortDirection } from "@mui/material";
import { produce } from "immer";
import mergeWith from "lodash.mergewith";
import { CellId, GenericRowInfo } from "src/components/Table";

export type SelectedRowIds = Record<string, boolean>;

export interface TableState<T extends GenericRowInfo> {
	selectedRowIds: SelectedRowIds;
	page: number;
	rowsPerPage: number;
	searchValue: string;
	sortByColumnId: CellId<T> | "__id" | null;
	sortDirection: SortDirection;
}

export type Action<T extends GenericRowInfo> = {
	type: "update";
	payload: Partial<TableState<T>>;
};

export function reducer<T extends GenericRowInfo>(
	state: TableState<T>,
	action: Action<T>
) {
	switch (action.type) {
		case "update": {
			return produce(state, (draftState) => {
				draftState = mergeWith(
					draftState,
					action.payload,
					(objValue, srcValue) => {
						if (Array.isArray(objValue)) {
							return srcValue;
						}
						return undefined;
					}
				);
			});
		}
		default: {
			return state;
		}
	}
}
