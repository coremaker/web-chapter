import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Table from './BaseTable';
import { headCells, rows } from './mock-data';

describe('<Table />', () => {
    it.each(Object.values(headCells))('renders the head cell: %s', (cell) => {
        const { getByText } = render(<Table showIdCell headCells={headCells} rows={[]} />);
        expect(getByText(cell.value)).toBeInTheDocument();
    });

    it('renders the row', () => {
        const { getByText } = render(<Table headCells={headCells} rows={rows.slice(0, 1)} />);
        expect(getByText(rows[0].cells.username.value)).toBeInTheDocument();
    });

    it('renders each cell of the row', () => {
        const { getByTestId } = render(<Table showIdCell headCells={headCells} rows={rows.slice(0, 1)} />);
        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);

        const { address, ...cells } = rows[0].cells;

        Object.values(cells).forEach((cell) => {
            expect(within(renderedRow).getByText(cell.value)).toBeInTheDocument();
        });
        expect(within(renderedRow).getByText(address.value.city)).toBeInTheDocument();
        expect(within(renderedRow).getByText(address.value.street)).toBeInTheDocument();
    });

    it("doesn't render the ID row when showIdCell is not given", () => {
        const { queryByText } = render(<Table headCells={headCells} rows={rows.slice(0, 1)} />);
        expect(queryByText(rows[0].cells.id.value)).toBeFalsy();
    });

    it('renders custom label text for the id column if passed as prop', () => {
        const { getByTestId } = render(
            <Table showIdCell headCells={{ ...headCells, id: { value: 'Test custom id label' } }} rows={rows} />
        );
        const renderedHead = getByTestId('table-head');
        expect(within(renderedHead).getByText('Test custom id label')).toBeInTheDocument();
    });

    it('renders an ellipsis icon in the last cell when rowActions are defined in props ', () => {
        const { getByTestId } = render(
            <Table headCells={headCells} rows={rows} rowActions={[{ id: '1', label: 'Action 1', onClick() {} }]} />
        );

        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);
        const cells = within(renderedRow).getAllByTestId(/table-row-cell/);
        const ellipsisButton = within(cells[cells.length - 1]).getByTestId(`ellipsis-button-${rows[0].cells.id.value}`);

        expect(ellipsisButton).toBeInTheDocument();
    });

    it('calls the onMenuOpen prop when rowActions are defined in props and the menu is opening', async () => {
        const mockOnMenuOpen = vi.fn();

        const { getByTestId } = render(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[{ id: '1', label: 'Action 1', onClick() {} }]}
                onRowMenuOpen={mockOnMenuOpen}
            />
        );

        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);
        const cells = within(renderedRow).getAllByTestId(/table-row-cell/);
        const ellipsisButton = within(cells[cells.length - 1]).getByTestId(`ellipsis-button-${rows[0].cells.id.value}`);

        await userEvent.click(ellipsisButton);

        expect(mockOnMenuOpen).toHaveBeenCalledTimes(1);
    });

    it('renders all rowActions when clicking on the ellipsis button', async () => {
        const { getByTestId, getByText } = render(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[
                    { id: '1', label: 'Action 1', onClick() {} },
                    { id: '12', label: 'Action 2', onClick() {} },
                    { id: '123', label: 'Action 3', onClick() {} },
                ]}
            />
        );

        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);
        const cells = within(renderedRow).getAllByTestId(/table-row-cell/);
        const ellipsisButton = within(cells[cells.length - 1]).getByTestId(`ellipsis-button-${rows[0].cells.id.value}`);

        await userEvent.click(ellipsisButton);
        expect(getByText('Action 1')).toBeInTheDocument();
        expect(getByText('Action 2')).toBeInTheDocument();
        expect(getByText('Action 3')).toBeInTheDocument();
    });

    it('renders all rowActions when clicking on the ellipsis button and the rowAction has a custom renderer', async () => {
        const { getByTestId, getByText } = render(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[
                    {
                        id: '1',
                        renderComponent: () => <div>Custom renderer Action 1</div>,
                    },
                    {
                        id: '12',
                        renderComponent: () => <div>Custom renderer Action 2</div>,
                    },
                    { id: '123', label: 'Action 3', onClick() {} },
                ]}
            />
        );

        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);
        const cells = within(renderedRow).getAllByTestId(/table-row-cell/);
        const ellipsisButton = within(cells[cells.length - 1]).getByTestId(`ellipsis-button-${rows[0].cells.id.value}`);

        await userEvent.click(ellipsisButton);
        expect(getByText('Custom renderer Action 1')).toBeInTheDocument();
        expect(getByText('Custom renderer Action 2')).toBeInTheDocument();
        expect(getByText('Action 3')).toBeInTheDocument();
    });

    it('calls the onClick function passed on rowAction prop', async () => {
        const mockRowAction = vi.fn();
        const { getByTestId } = render(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[{ id: '1', label: 'Action', onClick: mockRowAction }]}
            />
        );

        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);
        const cells = within(renderedRow).getAllByTestId(/table-row-cell/);
        const ellipsisButton = within(cells[cells.length - 1]).getByTestId(`ellipsis-button-${rows[0].cells.id.value}`);

        await userEvent.click(ellipsisButton);

        const menuItem = getByTestId(`menu-item-${rows[0].cells.id.value}-1`);

        await userEvent.click(menuItem);

        expect(mockRowAction).toHaveBeenCalledTimes(1);
        expect(mockRowAction).toHaveBeenCalledWith(rows[0]);
    });

    it('renders the search input', () => {
        const { getByRole } = render(
            <Table makeSearchableRowContent={(row) => row.cells.fullName.value} headCells={headCells} rows={rows} />
        );
        expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('filters the rendered rows based when the search input has any value', async () => {
        const { getByRole, findAllByTestId } = render(
            <Table makeSearchableRowContent={(row) => row.cells.fullName.value} headCells={headCells} rows={rows} />
        );
        const searchInput = getByRole('textbox');
        await userEvent.type(searchInput, rows[5].cells.fullName.value);
        const renderedRows = await findAllByTestId(/table-body-row/);

        renderedRows.forEach((row) => {
            expect(within(row).getByText(rows[5].cells.fullName.value, { exact: false })).toBeInTheDocument();
        });
    });
    it('correctly shows the empty search fallback if no results were found', async () => {
        const { getByRole, queryByTestId, getByText } = render(
            <Table makeSearchableRowContent={(row) => row.cells.fullName.value} headCells={headCells} rows={rows} />
        );
        const searchInput = getByRole('textbox');
        await userEvent.type(searchInput, 'non-existing-value');

        expect(getByText('No results found')).toBeInTheDocument();

        expect(queryByTestId('table-pagination')).not.toBeInTheDocument();
    });

    it('renders checkboxes for every row when the table is selectable', () => {
        const { getAllByRole } = render(<Table selectable headCells={headCells} rows={rows} />);

        const checkboxes = getAllByRole('checkbox');
        const checkboxesCountWithHeader = rows.length + 1;

        expect(checkboxes.length).toBe(checkboxesCountWithHeader);
    });

    it('selects all rows when clicking the checkbox in the header area', async () => {
        const { getByTestId } = render(<Table selectable headCells={headCells} rows={rows} />);

        const tableHeadArea = getByTestId('table-head');

        const headAreaCheckbox = within(tableHeadArea).getByRole('checkbox');

        await userEvent.click(headAreaCheckbox);

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckboxes = within(tableBodyArea).getAllByRole('checkbox');

        expect(tableBodyCheckboxes.length).toBe(rows.length);
    });

    it('correctly renders the selected rows when selection is controlled', () => {
        const { getByTestId } = render(
            <Table
                selectable
                selectedRowIds={{
                    [rows[0].cells.id.value]: true,
                    [rows[2].cells.id.value]: true,
                }}
                headCells={headCells}
                rows={rows}
            />
        );

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckedCheckboxes = within(tableBodyArea).getAllByRole('checkbox', {
            checked: true,
        });

        expect(tableBodyCheckedCheckboxes.length).toBe(2);
    });

    it('correctly updates the selected rows when selection is controlled and the state changes', () => {
        const { getByTestId, rerender } = render(
            <Table
                selectable
                selectedRowIds={{
                    [rows[0].cells.id.value]: true,
                    [rows[2].cells.id.value]: true,
                }}
                headCells={headCells}
                rows={rows}
            />
        );

        rerender(
            <Table
                selectable
                selectedRowIds={{
                    [rows[5].cells.id.value]: true,
                    [rows[2].cells.id.value]: false,
                    [rows[0].cells.id.value]: false,
                }}
                headCells={headCells}
                rows={rows}
            />
        );
        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckedCheckboxes = within(tableBodyArea).getAllByRole('checkbox', {
            checked: true,
        });

        expect(tableBodyCheckedCheckboxes.length).toBe(1);
    });

    it("doesn't update the selected rows, but calls the onChange callback when selection is controlled and the checkbox is clicked", async () => {
        const mockOnCheckboxChange = vi.fn();

        const { getByTestId } = render(
            <Table
                selectable
                selectedRowIds={{}}
                headCells={headCells}
                rows={rows}
                onRowSelectionChange={mockOnCheckboxChange}
            />
        );

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckboxes = within(tableBodyArea).getAllByRole('checkbox');

        await userEvent.click(tableBodyCheckboxes[0]);

        const bodyCheckedCheckBoxes = within(tableBodyArea).queryAllByRole('checkbox', { checked: true });

        expect(bodyCheckedCheckBoxes.length).toBe(0);
        expect(mockOnCheckboxChange).toHaveBeenCalledTimes(1);
    });

    it('automatically selects the head checkbox if all the body checkboxes are selected', async () => {
        const { getByTestId, getAllByTestId } = render(
            <Table selectable headCells={headCells} rows={rows.slice(0, 2)} />
        );

        const renderedRows = getAllByTestId(/table-body-row/);
        const secondTableRowCheckbox = within(renderedRows[0]).getByRole('checkbox');
        await userEvent.click(secondTableRowCheckbox);
        const thirdTableRowCheckbox = within(renderedRows[1]).getByRole('checkbox');
        await userEvent.click(thirdTableRowCheckbox);

        const tableHeadArea = getByTestId('table-head');
        const headAreaCheckbox = within(tableHeadArea).getByRole('checkbox');

        expect(headAreaCheckbox).toBeChecked();
    });

    it('selects the row when clicking a the checkbox next to it', async () => {
        const { getByTestId, getAllByTestId } = render(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={5}
                renderTableActions={(selectedRows) => {
                    const numberOfSelectedRows = Object.values(selectedRows).filter((selected) => selected).length;
                    return <div data-testid="selected-rows-count">Total: {numberOfSelectedRows}</div>;
                }}
            />
        );

        const renderedRows = getAllByTestId(/table-body-row/);

        const tableRowCheckbox = within(renderedRows[2]).getByRole('checkbox');

        await userEvent.click(tableRowCheckbox);

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckedCheckboxes = within(tableBodyArea).getAllByRole('checkbox', {
            checked: true,
        });
        const selectedRowsCount = getByTestId('selected-rows-count');

        expect(tableBodyCheckedCheckboxes.length).toEqual(1);
        expect(within(selectedRowsCount).getByText('Total: 1')).toBeInTheDocument();
    });

    it('unselects all rows when clicking a the checkbox in the head area and some checkboxes are already selected', async () => {
        const { getByTestId, getAllByTestId } = render(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={5}
                renderTableActions={(selectedRows) => {
                    const numberOfSelectedRows = Object.values(selectedRows).filter((selected) => selected).length;
                    return <div data-testid="selected-rows-count">Total: {numberOfSelectedRows}</div>;
                }}
            />
        );

        const renderedRows = getAllByTestId(/table-body-row/);
        const secondTableRowCheckbox = within(renderedRows[2]).getByRole('checkbox');
        await userEvent.click(secondTableRowCheckbox);
        const thirdTableRowCheckbox = within(renderedRows[3]).getByRole('checkbox');
        await userEvent.click(thirdTableRowCheckbox);

        const tableHeadArea = getByTestId('table-head');
        const headAreaCheckbox = within(tableHeadArea).getByRole('checkbox');
        await userEvent.click(headAreaCheckbox);

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckedCheckboxes = within(tableBodyArea).queryAllByRole('checkbox', {
            checked: true,
        });
        const selectedRowsCount = getByTestId('selected-rows-count');

        expect(tableBodyCheckedCheckboxes.length).toEqual(0);
        expect(within(selectedRowsCount).getByText('Total: 0')).toBeInTheDocument();
    });

    it('renders a checkbox in the header area when the table is selectable', () => {
        const { getByTestId } = render(<Table selectable headCells={headCells} rows={rows} />);
        const renderedHead = getByTestId('table-head');

        expect(within(renderedHead).getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders the pagination with all the buttons when the prop "paginated" is given', () => {
        const { getByTestId } = render(
            <Table selectable headCells={headCells} rows={rows} defaultRowsPerPage={2} paginated />
        );

        const paginationComponent = getByTestId('table-pagination');
        const renderedNextButton = within(paginationComponent).getByRole('button', {
            name: /next/i,
        });
        const renderedPrevButton = within(paginationComponent).getByRole('button', {
            name: /prev/i,
        });

        expect(renderedNextButton).toBeInTheDocument();
        expect(renderedPrevButton).toBeInTheDocument();
    });

    it('renders only the current page when the prop "paginated" is given', () => {
        const { getByText } = render(
            <Table selectable headCells={headCells} rows={rows} defaultRowsPerPage={2} paginated />
        );

        expect(getByText(rows[0].cells.fullName.value)).toBeInTheDocument();
        expect(getByText(rows[1].cells.fullName.value)).toBeInTheDocument();
    });

    it('moves to the next page when the prop "paginated" is given and we click the next button', async () => {
        const { getByText, getByTestId } = render(
            <Table selectable headCells={headCells} rows={rows} defaultRowsPerPage={2} paginated />
        );

        const paginationComponent = getByTestId('table-pagination');

        const renderedNextButton = within(paginationComponent).getByRole('button', {
            name: /next/i,
        });

        await userEvent.click(renderedNextButton);

        expect(getByText(rows[2].cells.fullName.value)).toBeInTheDocument();
        expect(getByText(rows[3].cells.fullName.value)).toBeInTheDocument();
    });

    it('moves to the prev page when the prop "paginated" is given and we click the prev button', async () => {
        const { getByText, getByTestId } = render(
            <Table selectable headCells={headCells} rows={rows} defaultRowsPerPage={2} paginated />
        );

        const paginationComponent = getByTestId('table-pagination');
        const renderedNextButton = within(paginationComponent).getByRole('button', {
            name: /next/i,
        });
        const renderedPrevButton = within(paginationComponent).getByRole('button', {
            name: /prev/i,
        });

        await userEvent.click(renderedNextButton);
        await userEvent.click(renderedNextButton);
        await userEvent.click(renderedPrevButton);

        expect(getByText(rows[2].cells.fullName.value)).toBeInTheDocument();
        expect(getByText(rows[3].cells.fullName.value)).toBeInTheDocument();
    });

    it('initially renders all the rows int the order they were given as props', () => {
        const { getAllByTestId } = render(<Table selectable showIdCell headCells={headCells} rows={rows} />);

        const renderedRows = getAllByTestId(/table-body-row/);

        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(rows[index].cells.id.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically by the ID column when the column head is clicked', async () => {
        const { getByText, getAllByTestId } = render(<Table selectable showIdCell headCells={headCells} rows={rows} />);

        const userIdHeadCell = getByText(/User ID/);

        const sortedRows = [...rows].sort((row1, row2) => {
            return row1.cells.id.value.localeCompare(row2.cells.id.value);
        });

        await userEvent.click(userIdHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(sortedRows[index].cells.id.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically by a column when the column head is clicked', async () => {
        const { getAllByTestId, getByTestId } = render(
            <Table selectable showIdCell headCells={headCells} rows={rows} />
        );

        const renderedHead = getByTestId('table-head');
        const nameHeadCell = within(renderedHead).getByText(/Name/);

        const sortedRows = [...rows].sort((row1, row2) => {
            return row1.cells.fullName.value.localeCompare(row2.cells.fullName.value);
        });

        await userEvent.click(nameHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(sortedRows[index].cells.fullName.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically in descending order by a column when the column head is clicked', async () => {
        const { getAllByTestId, getByTestId } = render(
            <Table selectable showIdCell headCells={headCells} rows={rows} />
        );
        const renderedHead = getByTestId('table-head');
        const nameHeadCell = within(renderedHead).getByText(/Name/);

        const descendingSorted = [...rows].sort((row1, row2) => {
            return row2.cells.fullName.value.localeCompare(row1.cells.fullName.value);
        });

        await userEvent.click(nameHeadCell);
        await userEvent.click(nameHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(descendingSorted[index].cells.fullName.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically in descending order by ID column when the column head is clicked two times', async () => {
        const { getByText, getAllByTestId } = render(<Table selectable showIdCell headCells={headCells} rows={rows} />);

        const userIdHeadCell = getByText(/User ID/);

        const descendingSorted = [...rows].sort((row1, row2) => {
            return row2.cells.id.value.localeCompare(row1.cells.id.value);
        });

        await userEvent.click(userIdHeadCell);
        await userEvent.click(userIdHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(descendingSorted[index].cells.id.value)).toBeInTheDocument();
        });
    });

    it('renders the generic value using a custom renderer', async () => {
        const { getByText } = render(<Table selectable showIdCell headCells={headCells} rows={rows} />);

        expect(getByText(/Street 12/)).toBeInTheDocument();
    });
});
