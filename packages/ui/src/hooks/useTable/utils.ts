import {
	BaseTableClasses,
	BaseTableProps,
} from "../../components/Table/BaseTable";
import { GenericRowInfo, RowAction } from "../../components/Table/types";

interface TablePropsWithDefaults<T extends GenericRowInfo>
	extends BaseTableProps<T> {
	defaultRowsPerPage: number;
	classes: Partial<BaseTableClasses>;
	rowActions: RowAction<T>[];
}

type GetTablePropsFunc = <T extends GenericRowInfo>(
	props: BaseTableProps<T>
) => TablePropsWithDefaults<T>;

export const getTablePropsWithDefaults: GetTablePropsFunc = <
	T extends GenericRowInfo
>(
	tableProps: BaseTableProps<T>
) => ({ defaultRowsPerPage: 10, rowActions: [], classes: {}, ...tableProps });
