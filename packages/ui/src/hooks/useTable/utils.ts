import { TableClasses, TableProps } from "../../components/Table/Table";
import { RowAction } from "../../components/Table/types";

interface TablePropsWithDefaults extends TableProps {
	defaultRowsPerPage: number;
	classes: TableClasses;
	rowActions: RowAction[];
}

type GetTablePropsFunc = (props: TableProps) => TablePropsWithDefaults;

export const getTablePropsWithDefaults: GetTablePropsFunc = (
	tableProps: TableProps
) => ({ defaultRowsPerPage: 10, rowActions: [], classes: {}, ...tableProps });
