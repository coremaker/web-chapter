import { ThemeProvider } from '@mui/material';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { theme } from '../theme/theme';
import Table from './BaseTable';
import { headCells, rows } from './MockData';

describe('<Table />', () => {
    const wrapperRender = (comp: ReactNode) => render(<ThemeProvider theme={theme}>{comp}</ThemeProvider>);

    it.each(Object.values(headCells))('renders the head cell: %s', (cell) => {
        const { getByText } = wrapperRender(<Table showIdCell headCells={headCells} rows={[]} />);
        expect(getByText(cell.value)).toBeInTheDocument();
    });

    it('renders the row', () => {
        const { getByText } = wrapperRender(<Table headCells={headCells} rows={rows.slice(0, 1)} />);
        expect(getByText(rows[0].cells.username.value)).toBeInTheDocument();
    });

    it('renders each cell of the row', () => {
        const { getByTestId } = wrapperRender(<Table showIdCell headCells={headCells} rows={rows.slice(0, 1)} />);
        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);

        const { address, ...cells } = rows[0].cells;

        Object.values(cells).forEach((cell) => {
            expect(within(renderedRow).getByText(cell.value)).toBeInTheDocument();
        });
        expect(within(renderedRow).getByText(address.value.city)).toBeInTheDocument();
        expect(within(renderedRow).getByText(address.value.street)).toBeInTheDocument();
    });

    it("doesn't render the ID row when showIdCell is not given", () => {
        const { queryByText } = wrapperRender(<Table headCells={headCells} rows={rows.slice(0, 1)} />);
        expect(queryByText(rows[0].cells.id.value)).toBeFalsy();
    });

    it('renders custom label text for the id column if passed as prop', () => {
        const { getByTestId } = wrapperRender(
            <Table showIdCell headCells={{ ...headCells, id: { value: 'Test custom id label' } }} rows={rows} />
        );
        const renderedHead = getByTestId('table-head');
        expect(within(renderedHead).getByText('Test custom id label')).toBeInTheDocument();
    });

    it('renders an ellipsis icon in the last cell when rowActions are defined in props ', () => {
        const { getByTestId } = wrapperRender(
            <Table headCells={headCells} rows={rows} rowActions={[{ id: '1', label: 'Action 1', onClick() {} }]} />
        );

        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);
        const cells = within(renderedRow).getAllByTestId(/table-row-cell/);
        const ellipsisButton = within(cells[cells.length - 1]).getByTestId(`ellipsis-button-${rows[0].cells.id.value}`);

        expect(ellipsisButton).toBeInTheDocument();
    });

    it("doesn't render the table actions for rows that disabled them", () => {
        const { queryByRole } = render(
            <Table<{ id: string; test: string }>
                headCells={{ id: { value: 'ID' }, test: { value: 'Test' } }}
                rows={[
                    { disableActions: true, cells: { id: { value: '0' }, test: { value: 'test no actions' } } },
                    { disableActions: false, cells: { id: { value: '1' }, test: { value: 'test actions' } } },
                ]}
                rowActions={[{ id: '1', label: 'Action 1', onClick() {} }]}
            />
        );

        expect(
            queryByRole('button', {
                name: `open menu for row id ${rows[0].cells.id.value}`,
            })
        ).not.toBeInTheDocument();

        expect(
            queryByRole('button', {
                name: `open menu for row id ${rows[1].cells.id.value}`,
            })
        ).toBeInTheDocument();
    });

    it('calls the onMenuOpen prop when rowActions are defined in props and the menu is opening', async () => {
        const mockOnMenuOpen = vi.fn();

        const { getByTestId } = wrapperRender(
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

        fireEvent.click(ellipsisButton);

        expect(mockOnMenuOpen).toHaveBeenCalledTimes(1);
    });

    it('renders all rowActions when clicking on the ellipsis button', async () => {
        const { getByText, getAllByRole } = wrapperRender(
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

        const tableBody = getAllByRole('rowgroup')[1];
        const firstRow = within(tableBody).getAllByRole('row')[0];
        const cells = within(firstRow).getAllByRole('cell');

        const ellipsisButton = within(cells[cells.length - 1]).getByTestId(`ellipsis-button-${rows[0].cells.id.value}`);

        fireEvent.click(ellipsisButton);
        expect(getByText('Action 1')).toBeInTheDocument();
        expect(getByText('Action 2')).toBeInTheDocument();
        expect(getByText('Action 3')).toBeInTheDocument();
    });

    it('renders all rowActions when clicking on the ellipsis button and the rowAction has a custom renderer', async () => {
        const { getByText, getByRole } = wrapperRender(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[
                    {
                        id: '1',
                        renderComponent: ({ key }) => <div key={key}>Custom renderer Action 1</div>,
                    },
                    {
                        id: '12',
                        renderComponent: ({ key }) => <div key={key}>Custom renderer Action 2</div>,
                    },
                    { id: '123', label: 'Action 3', onClick() {} },
                ]}
            />
        );

        const ellipsisButton = getByRole('button', { name: `open menu for row id ${rows[0].cells.id.value}` });

        fireEvent.click(ellipsisButton);
        expect(getByText('Custom renderer Action 1')).toBeInTheDocument();
        expect(getByText('Custom renderer Action 2')).toBeInTheDocument();
        expect(getByText('Action 3')).toBeInTheDocument();
    });

    it('calls the onClick function passed on rowAction prop', async () => {
        const mockRowAction = vi.fn();
        const { getByRole, getAllByRole } = wrapperRender(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[{ id: '1', label: 'Action', onClick: mockRowAction }]}
            />
        );

        const tableBody = getAllByRole('rowgroup')[1];
        const firstRenderedRow = within(tableBody).getAllByRole('row')[0];
        const cells = within(firstRenderedRow).getAllByRole('cell');
        const ellipsisButton = within(cells[cells.length - 1]).getByRole('button', {
            name: `open menu for row id ${rows[0].cells.id.value}`,
        });

        fireEvent.click(ellipsisButton);

        const menuItem = getByRole('menuitem', { name: 'Action' });
        fireEvent.click(menuItem);
        expect(mockRowAction).toHaveBeenCalledTimes(1);
    });

    it('calls closeMenu function passed on the renderComponent', async () => {
        const { getByRole, getAllByRole } = wrapperRender(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[
                    {
                        id: '1',
                        renderComponent: ({ key, row, options: { closeMenu } }) => (
                            <button type="button" key={key} id={row.cells.id.value} onClick={() => closeMenu()}>
                                Action
                            </button>
                        ),
                    },
                ]}
            />
        );

        const tableBody = getAllByRole('rowgroup')[1];
        const firstRenderedRow = within(tableBody).getAllByRole('row')[0];
        const cells = within(firstRenderedRow).getAllByRole('cell');
        const ellipsisButton = within(cells[cells.length - 1]).getByRole('button', {
            name: `open menu for row id ${rows[0].cells.id.value}`,
        });
        fireEvent.click(ellipsisButton);

        const menuItem = getByRole('button', { name: 'Action' });
        fireEvent.click(menuItem);

        expect(ellipsisButton).not.toHaveAttribute('aria-expanded', 'true');
    });

    it('calls closeMenu function passed on the onClick', async () => {
        const { getByRole, getAllByRole } = wrapperRender(
            <Table
                headCells={headCells}
                rows={rows}
                rowActions={[
                    {
                        id: '1',
                        label: 'Action',
                        onClick: (_row, _e, { closeMenu }) => {
                            closeMenu();
                        },
                    },
                ]}
            />
        );

        const tableBody = getAllByRole('rowgroup')[1];
        const firstRenderedRow = within(tableBody).getAllByRole('row')[0];
        const cells = within(firstRenderedRow).getAllByRole('cell');
        const ellipsisButton = within(cells[cells.length - 1]).getByRole('button', {
            name: `open menu for row id ${rows[0].cells.id.value}`,
        });
        fireEvent.click(ellipsisButton);

        const menuItem = getByRole('menuitem', { name: 'Action' });
        fireEvent.click(menuItem);

        expect(ellipsisButton).not.toHaveAttribute('aria-expanded', 'true');
    });

    it('renders the search input', () => {
        const { getByRole } = wrapperRender(
            <Table makeSearchableRowContent={(row) => row.cells.fullName.value} headCells={headCells} rows={rows} />
        );
        expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('filters the rendered rows based when the search input has any value', async () => {
        const { getByRole, getAllByRole } = wrapperRender(
            <Table makeSearchableRowContent={(row) => row.cells.fullName.value} headCells={headCells} rows={rows} />
        );
        const searchInput = getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'John Doe0' } });

        const tableBody = getAllByRole('rowgroup')[1];
        await waitFor(() => {
            const renderedRows = within(tableBody).getAllByRole('row');

            renderedRows.forEach((row) => {
                expect(within(row).getByRole('cell', { name: /John Doe0/ })).toBeInTheDocument();
            });
        });
    });

    it('correctly shows the empty search fallback if no results were found', async () => {
        const { getByRole, queryByTestId, getByText } = wrapperRender(
            <Table makeSearchableRowContent={(row) => row.cells.fullName.value} headCells={headCells} rows={rows} />
        );
        const searchInput = getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'non-existing-value' } });

        expect(getByText('No results found')).toBeInTheDocument();

        expect(queryByTestId('table-pagination')).not.toBeInTheDocument();
    });

    it('renders checkboxes for every row when the table is selectable', () => {
        const { getAllByRole } = wrapperRender(<Table selectable headCells={headCells} rows={rows} />);

        const checkboxes = getAllByRole('checkbox');
        const checkboxesCountWithHeader = rows.length + 1;

        expect(checkboxes.length).toBe(checkboxesCountWithHeader);
    });

    it('selects all rows when clicking the checkbox in the header area', async () => {
        const { getByTestId } = wrapperRender(<Table selectable headCells={headCells} rows={rows} />);

        const tableHeadArea = getByTestId('table-head');

        const headAreaCheckbox = within(tableHeadArea).getByRole('checkbox');

        fireEvent.click(headAreaCheckbox);

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckboxes = within(tableBodyArea).getAllByRole('checkbox');

        expect(tableBodyCheckboxes.length).toBe(rows.length);
    });

    it('correctly renders the selected rows when selection is controlled', () => {
        const { getByTestId } = wrapperRender(
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
        const { getByTestId, rerender } = wrapperRender(
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
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        );
        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckedCheckboxes = within(tableBodyArea).getAllByRole('checkbox', {
            checked: true,
        });

        expect(tableBodyCheckedCheckboxes.length).toBe(1);
    });

    it("doesn't update the selected rows, but calls the onChange callback when selection is controlled and the checkbox is clicked", async () => {
        const mockOnCheckboxChange = vi.fn();

        const { getByTestId } = wrapperRender(
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

        fireEvent.click(tableBodyCheckboxes[0]);

        const bodyCheckedCheckBoxes = within(tableBodyArea).queryAllByRole('checkbox', { checked: true });

        expect(bodyCheckedCheckBoxes.length).toBe(0);
        expect(mockOnCheckboxChange).toHaveBeenCalledTimes(1);
    });

    it('automatically selects the head checkbox if all the body checkboxes are selected', async () => {
        const { getByTestId, getAllByTestId } = wrapperRender(
            <Table selectable headCells={headCells} rows={rows.slice(0, 2)} />
        );

        const renderedRows = getAllByTestId(/table-body-row/);
        const secondTableRowCheckbox = within(renderedRows[0]).getByRole('checkbox');
        fireEvent.click(secondTableRowCheckbox);
        const thirdTableRowCheckbox = within(renderedRows[1]).getByRole('checkbox');
        fireEvent.click(thirdTableRowCheckbox);

        const tableHeadArea = getByTestId('table-head');
        const headAreaCheckbox = within(tableHeadArea).getByRole('checkbox');

        expect(headAreaCheckbox).toBeChecked();
    });

    it('selects the row when clicking a the checkbox next to it', async () => {
        const { getByTestId, getAllByTestId } = wrapperRender(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={5}
                rowsPerPageOptions={[5, 10]}
                renderTableActions={(selectedRows) => {
                    const numberOfSelectedRows = Object.values(selectedRows).filter((selected) => selected).length;
                    return <div data-testid="selected-rows-count">Total: {numberOfSelectedRows}</div>;
                }}
            />
        );

        const renderedRows = getAllByTestId(/table-body-row/);

        const tableRowCheckbox = within(renderedRows[2]).getByRole('checkbox');

        fireEvent.click(tableRowCheckbox);

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckedCheckboxes = within(tableBodyArea).getAllByRole('checkbox', {
            checked: true,
        });
        const selectedRowsCount = getByTestId('selected-rows-count');

        expect(tableBodyCheckedCheckboxes.length).toEqual(1);
        expect(within(selectedRowsCount).getByText('Total: 1')).toBeInTheDocument();
    });

    it('unselects all rows when clicking a the checkbox in the head area and some checkboxes are already selected', async () => {
        const { getByTestId, getAllByTestId } = wrapperRender(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={5}
                rowsPerPageOptions={[5, 10]}
                renderTableActions={(selectedRows) => {
                    const numberOfSelectedRows = Object.values(selectedRows).filter((selected) => selected).length;
                    return <div data-testid="selected-rows-count">Total: {numberOfSelectedRows}</div>;
                }}
            />
        );

        const renderedRows = getAllByTestId(/table-body-row/);
        const secondTableRowCheckbox = within(renderedRows[2]).getByRole('checkbox');
        fireEvent.click(secondTableRowCheckbox);
        const thirdTableRowCheckbox = within(renderedRows[3]).getByRole('checkbox');
        fireEvent.click(thirdTableRowCheckbox);

        const tableHeadArea = getByTestId('table-head');
        const headAreaCheckbox = within(tableHeadArea).getByRole('checkbox');
        fireEvent.click(headAreaCheckbox);

        const tableBodyArea = getByTestId('table-body');
        const tableBodyCheckedCheckboxes = within(tableBodyArea).queryAllByRole('checkbox', {
            checked: true,
        });
        const selectedRowsCount = getByTestId('selected-rows-count');

        expect(tableBodyCheckedCheckboxes.length).toEqual(0);
        expect(within(selectedRowsCount).getByText('Total: 0')).toBeInTheDocument();
    });

    it('renders a checkbox in the header area when the table is selectable', () => {
        const { getByTestId } = wrapperRender(<Table selectable headCells={headCells} rows={rows} />);
        const renderedHead = getByTestId('table-head');

        expect(within(renderedHead).getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders the pagination with all the buttons when the prop "paginated" is given', () => {
        const { getByTestId } = wrapperRender(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={2}
                rowsPerPageOptions={[2, 4]}
                paginated
            />
        );

        const paginationComponent = getByTestId('table-pagination');
        const renderedNextButton = within(paginationComponent).getByTestId('table-pagination-item-next');
        const renderedPrevButton = within(paginationComponent).getByTestId('table-pagination-item-previous');

        expect(renderedNextButton).toBeInTheDocument();
        expect(renderedPrevButton).toBeInTheDocument();
    });

    it('renders only the current page when the prop "paginated" is given', () => {
        const { getByText } = wrapperRender(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={2}
                rowsPerPageOptions={[2, 4]}
                paginated
            />
        );

        expect(getByText(rows[0].cells.fullName.value)).toBeInTheDocument();
        expect(getByText(rows[1].cells.fullName.value)).toBeInTheDocument();
    });

    it('moves to the next page when the prop "paginated" is given and we click the next button', async () => {
        const { getByText, getByTestId } = wrapperRender(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={2}
                rowsPerPageOptions={[2, 4]}
                paginated
            />
        );

        const paginationComponent = getByTestId('table-pagination');

        const renderedNextButton = within(paginationComponent).getByTestId('table-pagination-item-next');

        fireEvent.click(renderedNextButton);

        expect(getByText(rows[2].cells.fullName.value)).toBeInTheDocument();
        expect(getByText(rows[3].cells.fullName.value)).toBeInTheDocument();
    });

    it('moves to the prev page when the prop "paginated" is given and we click the prev button', async () => {
        const { getByText, getByTestId } = wrapperRender(
            <Table
                selectable
                headCells={headCells}
                rows={rows}
                defaultRowsPerPage={2}
                rowsPerPageOptions={[2, 4]}
                paginated
            />
        );

        const paginationComponent = getByTestId('table-pagination');
        const renderedNextButton = within(paginationComponent).getByTestId('table-pagination-item-next');
        const renderedPrevButton = within(paginationComponent).getByTestId('table-pagination-item-previous');

        fireEvent.click(renderedNextButton);
        fireEvent.click(renderedNextButton);
        fireEvent.click(renderedPrevButton);

        expect(getByText(rows[2].cells.fullName.value)).toBeInTheDocument();
        expect(getByText(rows[3].cells.fullName.value)).toBeInTheDocument();
    });

    it('initially renders all the rows int the order they were given as props', () => {
        const { getAllByTestId } = wrapperRender(<Table selectable showIdCell headCells={headCells} rows={rows} />);

        const renderedRows = getAllByTestId(/table-body-row/);

        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(rows[index].cells.id.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically by the ID column when the column head is clicked', async () => {
        const { getByText, getAllByTestId } = wrapperRender(
            <Table selectable showIdCell headCells={headCells} rows={rows} />
        );

        const userIdHeadCell = getByText(/User ID/);

        const sortedRows = [...rows].sort((row1, row2) => {
            return row1.cells.id.value.localeCompare(row2.cells.id.value);
        });

        fireEvent.click(userIdHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(sortedRows[index].cells.id.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically by a column when the column head is clicked', async () => {
        const { getAllByTestId, getByTestId } = wrapperRender(
            <Table selectable showIdCell headCells={headCells} rows={rows} />
        );

        const renderedHead = getByTestId('table-head');
        const nameHeadCell = within(renderedHead).getByText(/Name/);

        const sortedRows = [...rows].sort((row1, row2) => {
            return row1.cells.fullName.value.localeCompare(row2.cells.fullName.value);
        });

        fireEvent.click(nameHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(sortedRows[index].cells.fullName.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically in descending order by a column when the column head is clicked', async () => {
        const { getAllByTestId, getByTestId } = wrapperRender(
            <Table selectable showIdCell headCells={headCells} rows={rows} />
        );
        const renderedHead = getByTestId('table-head');
        const nameHeadCell = within(renderedHead).getByText(/Name/);

        const descendingSorted = [...rows].sort((row1, row2) => {
            return row2.cells.fullName.value.localeCompare(row1.cells.fullName.value);
        });

        fireEvent.click(nameHeadCell);
        fireEvent.click(nameHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(descendingSorted[index].cells.fullName.value)).toBeInTheDocument();
        });
    });

    it('sorts alphabetically in descending order by ID column when the column head is clicked two times', async () => {
        const { getByText, getAllByTestId } = wrapperRender(
            <Table selectable showIdCell headCells={headCells} rows={rows} />
        );

        const userIdHeadCell = getByText(/User ID/);

        const descendingSorted = [...rows].sort((row1, row2) => {
            return row2.cells.id.value.localeCompare(row1.cells.id.value);
        });

        fireEvent.click(userIdHeadCell);
        fireEvent.click(userIdHeadCell);

        const renderedRows = getAllByTestId(/table-body-row/);
        renderedRows.forEach((row, index) => {
            expect(within(row).getByText(descendingSorted[index].cells.id.value)).toBeInTheDocument();
        });
    });

    it('renders the generic value using a custom renderer', async () => {
        const { getByText } = wrapperRender(<Table selectable showIdCell headCells={headCells} rows={rows} />);

        expect(getByText(/Street 12/)).toBeInTheDocument();
    });

    it('calls the onRowClick prop when it is defined in props', async () => {
        const mockOnRowClick = vi.fn();

        const { getByTestId } = render(<Table headCells={headCells} rows={rows} onRowClick={mockOnRowClick} />);

        const renderedRow = getByTestId(`table-body-row-${rows[0].cells.id.value}`);

        fireEvent.click(renderedRow);

        expect(mockOnRowClick).toHaveBeenCalledTimes(1);
    });
});
