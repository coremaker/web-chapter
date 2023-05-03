import { BaseTableClasses, BaseTableProps } from '../../components/Table/BaseTable';
import { GenericRowStructure, RowAction } from '../../components/Table/types';

export const HEAD_ROW_IDENTIFIER = '__head';

interface TablePropsWithDefaults<T extends GenericRowStructure> extends BaseTableProps<T> {
    defaultRowsPerPage: number;
    classes: Partial<BaseTableClasses>;
    rowActions: RowAction<T>[];
}

type GetTablePropsFunc = <T extends GenericRowStructure>(props: BaseTableProps<T>) => TablePropsWithDefaults<T>;

export const getTablePropsWithDefaults: GetTablePropsFunc = <T extends GenericRowStructure>(
    tableProps: BaseTableProps<T>
) => ({ defaultRowsPerPage: 10, rowActions: [], classes: {}, ...tableProps });
