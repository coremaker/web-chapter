import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Table from "./BaseTable";
import { headCells, rows } from "./mock-data";

describe("<Table />", () => {
	it.each(headCells)("renders the header cell: %s", (cell) => {
		const { getByText } = render(<Table headCells={headCells} rows={[]} />);
		expect(getByText(cell.label)).toBeInTheDocument();
	});

	it("renders the row", () => {
		const { getByText } = render(
			<Table headCells={headCells} rows={rows.slice(0, 1)} />
		);
		expect(getByText(rows[0].cells[0].label)).toBeInTheDocument();
	});

	it("renders each cell of the row", () => {
		const { getByTestId } = render(
			<Table headCells={headCells} rows={rows.slice(0, 1)} />
		);
		const renderedRow = getByTestId(`table-body-row-${rows[0].id}`);

		rows[0].cells.forEach((cell) =>
			expect(within(renderedRow).getByText(cell.label)).toBeInTheDocument()
		);
	});

	it('renders column with default text "Id" and the row id', () => {
		const { getByText, getByTestId } = render(
			<Table showIdCell headCells={headCells} rows={rows.slice(0, 1)} />
		);

		const renderedRow = getByTestId(`table-body-row-${rows[0].id}`);
		expect(within(renderedRow).getByText(rows[0].id)).toBeInTheDocument();
		expect(getByText("ID")).toBeInTheDocument();
	});

	it("renders custom label text for the id column if passed as prop", () => {
		const { getByTestId } = render(
			<Table
				showIdCell
				headIdCell={{
					label: "Test custom id label",
				}}
				headCells={headCells}
				rows={rows}
			/>
		);
		const renderedHead = getByTestId("table-head");
		expect(
			within(renderedHead).getByText("Test custom id label")
		).toBeInTheDocument();
	});

	it("renders an ellipsis icon in the last cell when rowActions are defined in props ", () => {
		const { getByTestId } = render(
			<Table
				headCells={headCells}
				rows={rows}
				rowActions={[{ label: "Action 1", onClick() {} }]}
			/>
		);

		const renderedRow = getByTestId(`table-body-row-${rows[0].id}`);
		const cells = within(renderedRow).getAllByTestId("table-row-cell");
		const ellipsisButton = within(cells[cells.length - 1]).getByTestId(
			`ellipsis-button-${rows[0].id}`
		);

		expect(ellipsisButton).toBeInTheDocument();
	});

	it("renders all rowActions when clicking on the ellipsis button", async () => {
		const { getByTestId, getByText } = render(
			<Table
				headCells={headCells}
				rows={rows}
				rowActions={[
					{ label: "Action 1", onClick() {} },
					{ label: "Action 2", onClick() {} },
					{ label: "Action 3", onClick() {} },
				]}
			/>
		);

		const renderedRow = getByTestId(`table-body-row-${rows[0].id}`);
		const cells = within(renderedRow).getAllByTestId("table-row-cell");
		const ellipsisButton = within(cells[cells.length - 1]).getByTestId(
			`ellipsis-button-${rows[0].id}`
		);

		await userEvent.click(ellipsisButton);
		expect(getByText("Action 1")).toBeInTheDocument();
		expect(getByText("Action 2")).toBeInTheDocument();
		expect(getByText("Action 3")).toBeInTheDocument();
	});

	it("renders all rowActions when clicking on the ellipsis button for row: %s", async () => {
		const mockRowAction = vi.fn();
		const { getByTestId } = render(
			<Table
				headCells={headCells}
				rows={rows}
				rowActions={[{ label: "Action", onClick: mockRowAction }]}
			/>
		);

		const renderedRow = getByTestId(`table-body-row-${rows[0].id}`);
		const cells = within(renderedRow).getAllByTestId("table-row-cell");
		const ellipsisButton = within(cells[cells.length - 1]).getByTestId(
			`ellipsis-button-${rows[0].id}`
		);

		await userEvent.click(ellipsisButton);
		const menuItem = getByTestId(`menu-item-${rows[0].id}-Action`);
		await userEvent.click(menuItem);

		expect(mockRowAction).toHaveBeenCalledTimes(1);
		expect(mockRowAction).toHaveBeenCalledWith(rows[0]);
	});

	it("renders the search input", () => {
		const { getByRole } = render(
			<Table
				makeSearchableRowContent={(row) => row.cells[0].label}
				headCells={headCells}
				rows={rows}
			/>
		);
		expect(getByRole("textbox")).toBeInTheDocument();
	});

	it("filters the rendered rows based when the search input has any value", async () => {
		const { getByRole, findAllByTestId } = render(
			<Table
				makeSearchableRowContent={(row) => row.cells[0].label}
				headCells={headCells}
				rows={rows}
			/>
		);
		const searchInput = getByRole("textbox");
		await userEvent.type(searchInput, rows[5].cells[0].label);
		const renderedRows = await findAllByTestId(/table-body-row/);

		renderedRows.forEach((row) => {
			expect(
				within(row).getByText(rows[5].cells[0].label, { exact: false })
			).toBeInTheDocument();
		});
	});

	it("renders checkboxes for every row when the table is selectable", () => {
		const { getAllByRole } = render(
			<Table selectable headCells={headCells} rows={rows} />
		);

		const checkboxes = getAllByRole("checkbox");
		const checkboxesCountWithHeader = rows.length + 1;

		expect(checkboxes.length).toBe(checkboxesCountWithHeader);
	});

	it("selects all rows when clicking the checkbox in the header area", async () => {
		const { getByTestId } = render(
			<Table selectable headCells={headCells} rows={rows} />
		);

		const tableHeadArea = getByTestId("table-head");

		const headAreaCheckbox = within(tableHeadArea).getByRole("checkbox");

		await userEvent.click(headAreaCheckbox);

		const tableBodyArea = getByTestId("table-body");
		const tableBodyCheckboxes = within(tableBodyArea).getAllByRole("checkbox");

		expect(tableBodyCheckboxes.length).toBe(rows.length);
	});

	it("automatically selects the head checkbox if all the body checkboxes are selected", async () => {
		const { getByTestId, getAllByTestId } = render(
			<Table selectable headCells={headCells} rows={rows.slice(0, 2)} />
		);

		const renderedRows = getAllByTestId(/table-body-row/);
		const secondTableRowCheckbox = within(renderedRows[0]).getByRole(
			"checkbox"
		);
		await userEvent.click(secondTableRowCheckbox);
		const thirdTableRowCheckbox = within(renderedRows[1]).getByRole("checkbox");
		await userEvent.click(thirdTableRowCheckbox);

		const tableHeadArea = getByTestId("table-head");
		const headAreaCheckbox = within(tableHeadArea).getByRole("checkbox");

		expect(headAreaCheckbox).toBeChecked();
	});

	it("selects the row when clicking a the checkbox next to it", async () => {
		const { getByTestId, getAllByTestId } = render(
			<Table
				selectable
				headCells={headCells}
				rows={rows}
				defaultRowsPerPage={5}
				renderTableActions={(selectedRows) => {
					const numberOfSelectedRows = Object.values(selectedRows).filter(
						(selected) => selected
					).length;
					return (
						<div data-testid="selected-rows-count">
							Total: {numberOfSelectedRows}
						</div>
					);
				}}
			/>
		);

		const renderedRows = getAllByTestId(/table-body-row/);

		const tableRowCheckbox = within(renderedRows[2]).getByRole("checkbox");

		await userEvent.click(tableRowCheckbox);

		const tableBodyArea = getByTestId("table-body");
		const tableBodyCheckedCheckboxes = within(tableBodyArea).getAllByRole(
			"checkbox",
			{
				checked: true,
			}
		);
		const selectedRowsCount = getByTestId("selected-rows-count");

		expect(tableBodyCheckedCheckboxes.length).toEqual(1);
		expect(within(selectedRowsCount).getByText("Total: 1")).toBeInTheDocument();
	});

	it("unselects all rows when clicking a the checkbox in the head area and some checkboxes are already selected", async () => {
		const { getByTestId, getAllByTestId } = render(
			<Table
				selectable
				headCells={headCells}
				rows={rows}
				defaultRowsPerPage={5}
				renderTableActions={(selectedRows) => {
					const numberOfSelectedRows = Object.values(selectedRows).filter(
						(selected) => selected
					).length;
					return (
						<div data-testid="selected-rows-count">
							Total: {numberOfSelectedRows}
						</div>
					);
				}}
			/>
		);

		const renderedRows = getAllByTestId(/table-body-row/);
		const secondTableRowCheckbox = within(renderedRows[2]).getByRole(
			"checkbox"
		);
		await userEvent.click(secondTableRowCheckbox);
		const thirdTableRowCheckbox = within(renderedRows[3]).getByRole("checkbox");
		await userEvent.click(thirdTableRowCheckbox);

		const tableHeadArea = getByTestId("table-head");
		const headAreaCheckbox = within(tableHeadArea).getByRole("checkbox");
		await userEvent.click(headAreaCheckbox);

		const tableBodyArea = getByTestId("table-body");
		const tableBodyCheckedCheckboxes = within(tableBodyArea).queryAllByRole(
			"checkbox",
			{
				checked: true,
			}
		);
		const selectedRowsCount = getByTestId("selected-rows-count");

		expect(tableBodyCheckedCheckboxes.length).toEqual(0);
		expect(within(selectedRowsCount).getByText("Total: 0")).toBeInTheDocument();
	});

	it("renders a checkbox in the header area when the table is selectable", () => {
		const { getByTestId } = render(
			<Table selectable headCells={headCells} rows={rows} />
		);

		const renderedHead = getByTestId("table-head");

		expect(within(renderedHead).getByRole("checkbox")).toBeInTheDocument();
	});

	it('renders the pagination with all the buttons when the prop "paginated" is given', () => {
		const { getByTestId } = render(
			<Table
				selectable
				headCells={headCells}
				rows={rows}
				defaultRowsPerPage={2}
				paginated
			/>
		);

		const paginationComponent = getByTestId("table-pagination");
		const renderedNextButton = within(paginationComponent).getByRole("button", {
			name: /next/i,
		});
		const renderedPrevButton = within(paginationComponent).getByRole("button", {
			name: /prev/i,
		});

		expect(renderedNextButton).toBeInTheDocument();
		expect(renderedPrevButton).toBeInTheDocument();
	});

	it('renders only the current page when the prop "paginated" is given', () => {
		const { getByText } = render(
			<Table
				selectable
				headCells={headCells}
				rows={rows}
				defaultRowsPerPage={2}
				paginated
			/>
		);

		expect(getByText(rows[0].cells[0].label)).toBeInTheDocument();
		expect(getByText(rows[1].cells[0].label)).toBeInTheDocument();
	});

	it('moves to the next page when the prop "paginated" is given and we click the next button', async () => {
		const { getByText, getByTestId } = render(
			<Table
				selectable
				headCells={headCells}
				rows={rows}
				defaultRowsPerPage={2}
				paginated
			/>
		);

		const paginationComponent = getByTestId("table-pagination");
		const renderedNextButton = within(paginationComponent).getByRole("button", {
			name: /next/i,
		});

		await userEvent.click(renderedNextButton);

		expect(getByText(rows[2].cells[0].label)).toBeInTheDocument();
		expect(getByText(rows[3].cells[0].label)).toBeInTheDocument();
	});

	it('moves to the prev page when the prop "paginated" is given and we click the prev button', async () => {
		const { getByText, getByTestId } = render(
			<Table
				selectable
				headCells={headCells}
				rows={rows}
				defaultRowsPerPage={2}
				paginated
			/>
		);

		const paginationComponent = getByTestId("table-pagination");
		const renderedNextButton = within(paginationComponent).getByRole("button", {
			name: /next/i,
		});
		const renderedPrevButton = within(paginationComponent).getByRole("button", {
			name: /prev/i,
		});

		await userEvent.click(renderedNextButton);
		await userEvent.click(renderedNextButton);
		await userEvent.click(renderedPrevButton);

		expect(getByText(rows[2].cells[0].label)).toBeInTheDocument();
		expect(getByText(rows[3].cells[0].label)).toBeInTheDocument();
	});

	it("initially renders all the rows int the order they were given as props", () => {
		const { getAllByTestId } = render(
			<Table selectable showIdCell headCells={headCells} rows={rows} />
		);

		const renderedRows = getAllByTestId(/table-body-row/);

		renderedRows.forEach((row, index) => {
			expect(within(row).getByText(rows[index].id)).toBeInTheDocument();
		});
	});

	it("sorts alphabetically by any column when the column head is clicked", async () => {
		const { getByText, getAllByTestId } = render(
			<Table
				selectable
				showIdCell
				headCells={headCells}
				rows={rows}
				headIdCell={{ label: "User ID" }}
			/>
		);

		const userIdHeadCell = getByText(/User ID/);

		const sortedRows = [...rows].sort((row1, row2) => {
			return row1.id.localeCompare(row2.id);
		});

		await userEvent.click(userIdHeadCell);

		const renderedRows = getAllByTestId(/table-body-row/);
		renderedRows.forEach((row, index) => {
			expect(within(row).getByText(sortedRows[index].id)).toBeInTheDocument();
		});
	});

	it("sorts alphabetically in descending order by any column when the column head is clicked two times", async () => {
		const { getByText, getAllByTestId } = render(
			<Table
				selectable
				showIdCell
				headCells={headCells}
				rows={rows}
				headIdCell={{ label: "User ID" }}
			/>
		);

		const userIdHeadCell = getByText(/User ID/);

		const sortedRows = [...rows].sort((row1, row2) => {
			return row2.id.localeCompare(row1.id);
		});

		await userEvent.click(userIdHeadCell);
		await userEvent.click(userIdHeadCell);

		const renderedRows = getAllByTestId(/table-body-row/);
		renderedRows.forEach((row, index) => {
			expect(within(row).getByText(sortedRows[index].id)).toBeInTheDocument();
		});
	});
});