import { SortDirection } from "@mui/material";
import { produce } from "immer";
import mergeWith from "lodash.mergewith";

export type SelectedRowIds = Record<string, boolean>;

export interface TableState {
	selectedRowIds: SelectedRowIds;
	page: number;
	rowsPerPage: number;
	searchValue: string;
	sortByColumnId: null | "__id" | string;
	sortDirection: SortDirection;
}

export type Action = {
	type: "update";
	payload: Partial<TableState>;
};

export function reducer(state: TableState, action: Action) {
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
