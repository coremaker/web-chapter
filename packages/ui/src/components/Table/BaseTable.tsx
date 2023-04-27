import {
  Checkbox,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { JSXElementConstructor, ReactNode } from "react";

import EllipsisCellContent, {
  EllipsisCellContentClasses,
} from "./components/EllipsisCellContent";
import TableCell, { TableCellClasses } from "./components/TableCell";
import {
  Cell,
  CheckboxRendererArgs,
  HeadCell,
  PaginationRendererArgs,
  Row,
  RowAction,
  SearchInputRendererArgs,
} from "./types";
import useTable from "../../hooks/useTable/useTable";
import { getTablePropsWithDefaults } from "../../hooks/useTable/utils";
import { SelectedRowIds } from "../../hooks/useTable/reducer";

interface BaseTableFooterClasses {
  root: string;
  cell: string;
}

export interface BaseTableClasses {
  root: string;
  headArea: string;
  searchInputContainer: string;
  actionsContainer: string;
  tableContainer: string;
  cell: Partial<TableCellClasses>;
  ellipsis: Partial<EllipsisCellContentClasses>;
  footer: Partial<BaseTableFooterClasses>;
}

export interface BaseTableProps {
  showIdCell?: boolean;
  headIdCell?: Omit<HeadCell, "id">;
  rowIdCell?: Omit<Cell, "label">;
  makeSearchableRowContent?: (row: Row) => string;
  searchInputPlaceholder?: string;
  selectable?: boolean;
  /**
   * This prop changes the selected rows state from uncontrolled to controlled
   */
  selectedRowIds?: SelectedRowIds;
  headCells: HeadCell[];
  rows: Row[];
  rowActions?: RowAction[];
  ellipsisIcon?: ReactNode;
  renderTableActions?: (selectedRows: SelectedRowIds) => ReactNode;
  renderTablePagination?: (args: PaginationRendererArgs) => ReactNode;
  renderSearchInput?: (args: SearchInputRendererArgs) => ReactNode;
  renderCheckbox?: (args: CheckboxRendererArgs) => ReactNode;
  onRowSelectionChange?: (rowId: string, selected: boolean) => void;
  onAllRowsSelectionChange?: (selected: boolean) => void;
  onRowMenuOpen?: (row: Row) => void;
  onRowMenuClose?: (row: Row) => void;
  defaultRowsPerPage?: number;
  paginated?: boolean;
  SortIcon?: JSXElementConstructor<{
    className: string;
  }>;
  classes?: Partial<BaseTableClasses>;
}

const BaseTable = (props: BaseTableProps) => {
  const {
    headCells,
    rows,
    selectable,
    makeSearchableRowContent,
    searchInputPlaceholder = "Search",
    showIdCell,
    headIdCell,
    rowIdCell,
    rowActions,
    ellipsisIcon,
    renderTableActions,
    renderTablePagination,
    renderSearchInput,
    renderCheckbox,
    defaultRowsPerPage,
    paginated,
    SortIcon,
    classes,
    onRowMenuOpen,
    onRowMenuClose,
  } = getTablePropsWithDefaults(props);

  const {
    renderCellContent,
    makeRowCellId,
    currentPageRows,
    filteredRows,
    handleChangePage,
    handleRowsPerPageChange,
    handleSortCellClick,
    handleChangeSearchValue,
    handleRowSelection,
    handleAllRowsSelection,
    state,
    selectedRowsCount,
  } = useTable(props);

  const { searchValue, sortByColumnId, sortDirection, page } = state;

  const { cell: cellClasses } = classes;

  const selectedRowIdsState = props.selectedRowIds
    ? props.selectedRowIds
    : state.selectedRowIds;

  const renderRowCell = (row: Row, cell: Cell, cellIndex: number) => {
    const cellContent = renderCellContent(cell);

    return (
      <TableCell
        key={makeRowCellId(row.id, cellIndex)}
        data-testid="table-row-cell"
        align={cell.numeric ? "right" : "left"}
        padding={cell.disablePadding ? "none" : "normal"}
        classes={{
          ...cellClasses,
          bodyCell: `${cellClasses?.bodyCell ?? ""} BaseTable__Cell__${
            headCells[cellIndex].id
          }`,
        }}
        SortIcon={SortIcon}
      >
        {cellIndex === row.cells.length - 1 && rowActions.length > 0 ? (
          <EllipsisCellContent
            row={row}
            label={cellContent}
            rowActions={rowActions}
            classes={classes.ellipsis}
            icon={ellipsisIcon}
            onMenuOpen={onRowMenuOpen}
            onMenuClose={onRowMenuClose}
          />
        ) : (
          cellContent
        )}
      </TableCell>
    );
  };

  const renderPaginationComponent = () => {
    if (!paginated) {
      return null;
    }

    if (renderTablePagination) {
      return renderTablePagination({
        page,
        defaultRowsPerPage,
        rows,
        handleChangePage,
        handleRowsPerPageChange,
      });
    }
    return (
      <TableFooter className={classes.footer?.root}>
        <TablePagination
          className={classes.footer?.cell}
          data-testid="table-pagination"
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          count={filteredRows.length}
          rowsPerPage={defaultRowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableFooter>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.headArea}>
        {makeSearchableRowContent && (
          <div className={classes.searchInputContainer}>
            {renderSearchInput ? (
              renderSearchInput({
                searchValue,
                handleChangeSearchValue,
              })
            ) : (
              <TextField
                placeholder={searchInputPlaceholder}
                onChange={(e) => handleChangeSearchValue(e.target.value)}
                value={searchValue}
              />
            )}
          </div>
        )}
        <div className={classes.actionsContainer}>
          {renderTableActions?.(selectedRowIdsState)}
        </div>
      </div>

      <TableContainer className={classes.tableContainer}>
        <MuiTable>
          <TableHead data-testid="table-head">
            <TableRow>
              {selectable && (
                <TableCell classes={cellClasses} isHeadCell padding="checkbox">
                  {renderCheckbox ? (
                    renderCheckbox({
                      onChange: handleAllRowsSelection,
                      checked: selectedRowsCount === rows.length,
                      indeterminate:
                        selectedRowsCount > 0 &&
                        selectedRowsCount < rows.length,
                    })
                  ) : (
                    <Checkbox
                      onChange={handleAllRowsSelection}
                      checked={selectedRowsCount === rows.length}
                      indeterminate={
                        selectedRowsCount > 0 && selectedRowsCount < rows.length
                      }
                      inputProps={{
                        "aria-label": "select all rows",
                      }}
                    />
                  )}
                </TableCell>
              )}
              {showIdCell && (
                <TableCell
                  isHeadCell
                  sortable={headIdCell?.sortable}
                  active={sortByColumnId === "__id"}
                  align="left"
                  sortDirection={
                    sortByColumnId === "__id" ? sortDirection : "desc"
                  }
                  padding={headIdCell?.disablePadding ? "none" : "normal"}
                  onClick={() => handleSortCellClick("__id")}
                  classes={cellClasses}
                  SortIcon={SortIcon}
                >
                  {headIdCell ? renderCellContent(headIdCell) : "ID"}
                </TableCell>
              )}
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  isHeadCell
                  align={headCell.numeric ? "right" : "left"}
                  active={sortByColumnId === headCell.id}
                  sortDirection={
                    headCell.id === sortByColumnId ? sortDirection : "desc"
                  }
                  SortIcon={SortIcon}
                  onClick={() => {
                    if (!headCell.sortable) {
                      return;
                    }

                    handleSortCellClick(headCell.id);
                  }}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortable={headCell.sortable}
                  classes={cellClasses}
                >
                  {renderCellContent(headCell)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody data-testid="table-body">
            {currentPageRows.map((row) => (
              <TableRow
                hover
                tabIndex={-1}
                key={row.id}
                data-testid={`table-body-row-${row.id}`}
                className={
                  selectedRowIdsState[row.id] ? "BaseTable__Row--selected" : ""
                }
              >
                {selectable && (
                  <TableCell
                    classes={cellClasses}
                    data-testid="table-row-cell"
                    padding="checkbox"
                  >
                    {renderCheckbox ? (
                      renderCheckbox({
                        rowId: row.id,
                        checked: !!selectedRowIdsState[row.id],
                        onChange: (e) =>
                          handleRowSelection(row.id, e.target.checked),
                      })
                    ) : (
                      <Checkbox
                        onChange={(e) =>
                          handleRowSelection(row.id, e.target.checked)
                        }
                        checked={!!selectedRowIdsState[row.id]}
                        inputProps={{
                          "aria-label": `select row ${row.id}`,
                        }}
                      />
                    )}
                  </TableCell>
                )}
                {showIdCell && (
                  <TableCell
                    classes={cellClasses}
                    data-testid="table-row-cell"
                    padding="none"
                  >
                    {renderCellContent({ ...rowIdCell, label: row.id })}
                  </TableCell>
                )}
                {row.cells
                  .slice(0, headCells.length)
                  .map((rowCell, cellIndex) =>
                    renderRowCell(row, rowCell, cellIndex)
                  )}
              </TableRow>
            ))}
          </TableBody>
          {renderPaginationComponent()}
        </MuiTable>
      </TableContainer>
    </div>
  );
};

export default BaseTable;
