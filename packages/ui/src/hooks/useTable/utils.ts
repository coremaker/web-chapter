import {
	BaseTableClasses,
	BaseTableProps,
} from "../../components/Table/BaseTable";
import { RowAction } from "../../components/Table/types";

interface TablePropsWithDefaults extends BaseTableProps {
	defaultRowsPerPage: number;
	classes: Partial<BaseTableClasses>;
	rowActions: RowAction[];
}

type GetTablePropsFunc = (props: BaseTableProps) => TablePropsWithDefaults;

export const getTablePropsWithDefaults: GetTablePropsFunc = (
	tableProps: BaseTableProps
) => ({ defaultRowsPerPage: 10, rowActions: [], classes: {}, ...tableProps });
