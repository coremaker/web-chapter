import { ChangeEvent, ReactNode, useMemo } from 'react';
import { CheckboxRendererArgs, GenericRowStructure, Row } from '../types';
import { Checkbox, Radio } from '@mui/material';

interface HeadRowSelectorProps<T extends GenericRowStructure> {
    selectedRowsCount: number;
    rows: Row<T>[];
    handleAllRowsSelection: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    renderCheckbox?: (args: CheckboxRendererArgs) => ReactNode;
}
interface RowSelectorProps<T extends GenericRowStructure> {
    selectionType: 'single' | 'multiple';
    row: Row<T>;
    selectedRowIdsState: Record<string, boolean>;
    handleRowSelection: (rowId: string, selected: boolean) => void;
    renderCheckbox?: (args: CheckboxRendererArgs) => ReactNode;
}

export const HeadRowSelector = <T extends GenericRowStructure>({
    renderCheckbox,
    selectedRowsCount,
    rows,
    handleAllRowsSelection,
}: HeadRowSelectorProps<T>) => {
    const checkboxProps = useMemo(
        () => ({
            checked: selectedRowsCount === rows.length,
            indeterminate: selectedRowsCount > 0 && selectedRowsCount < rows.length,
            onChange: handleAllRowsSelection,
        }),
        [selectedRowsCount, rows.length, handleAllRowsSelection]
    );
    const CustomComponent = useMemo(() => {
        if (!renderCheckbox) return null;
        return renderCheckbox({ ...checkboxProps });
    }, [renderCheckbox]);

    if (!CustomComponent) return <Checkbox {...checkboxProps} inputProps={{ 'aria-label': 'select all rows' }} />;
    return CustomComponent;
};

const SingleSelectionTypeSelector = <T extends GenericRowStructure>({
    handleRowSelection,
    renderCheckbox,
    row,
    selectedRowIdsState,
}: Omit<RowSelectorProps<T>, 'selectionType'>) => {
    const CustomComponent = useMemo(() => {
        if (!renderCheckbox) return null;
        return renderCheckbox({
            rowId: row.cells.id.value,
            checked: !!selectedRowIdsState[row.cells.id.value],
            onChange: (e) => handleRowSelection(row.cells.id.value, e.target.checked),
        });
    }, []);

    if (!CustomComponent) {
        return (
            <Radio
                size="small"
                checked={!!selectedRowIdsState[row.cells.id.value]}
                onChange={(e) => handleRowSelection(row.cells.id.value, e.target.checked)}
                inputProps={{ 'aria-label': 'select row' }}
            />
        );
    }

    return CustomComponent;
};
export const MultipleSelectionTypeSelector = <T extends GenericRowStructure>({
    handleRowSelection,
    renderCheckbox,
    row,
    selectedRowIdsState,
}: Omit<RowSelectorProps<T>, 'selectionType'>) => {
    const CustomComponent = useMemo(() => {
        if (!renderCheckbox) return null;
        return renderCheckbox({
            rowId: row.cells.id.value,
            checked: !!selectedRowIdsState[row.cells.id.value],
            onChange: (e) => handleRowSelection(row.cells.id.value, e.target.checked),
        });
    }, []);

    if (!CustomComponent) {
        return (
            <Checkbox
                size="small"
                checked={!!selectedRowIdsState[row.cells.id.value]}
                onChange={(e) => handleRowSelection(row.cells.id.value, e.target.checked)}
                inputProps={{ 'aria-label': `select row ${row.cells.id.value}` }}
            />
        );
    }

    return CustomComponent;
};
const RowSelector = <T extends GenericRowStructure>({
    selectionType,
    renderCheckbox,
    ...props
}: RowSelectorProps<T>) => {
    if (selectionType === 'single') return <SingleSelectionTypeSelector renderCheckbox={renderCheckbox} {...props} />;

    return <MultipleSelectionTypeSelector renderCheckbox={renderCheckbox} {...props} />;
};

export default RowSelector;
