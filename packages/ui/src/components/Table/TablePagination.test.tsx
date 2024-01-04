import { ThemeProvider } from '@mui/material';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { theme } from '../theme/theme';
import { TablePagination, TablePaginationProps } from './TablePagination';

const Pagination = (props: TablePaginationProps) => (
    <ThemeProvider theme={theme}>
        <table>
            <TablePagination {...props} />
        </table>
    </ThemeProvider>
);

const sampleProps = {
    itemsCount: 10,
    currentPage: 0,
    rowsPerPage: 2,
    onChangePage: () => {},
};

const evenPages = [0, 1, 2, 3, 4];
const unevenPages = [0, 1, 2, 3];

describe('<TablePagination />', () => {
    it('renders the correct number of pages', () => {
        const { getByRole } = render(<Pagination {...sampleProps} />);
        evenPages.forEach((page) => expect(getByRole('button', { name: `${page + 1}` })).toBeInTheDocument());
    });

    it("renders the correct number of pages when the items doesn't divide exactly between pages", () => {
        const { getByRole } = render(
            <Pagination currentPage={0} itemsCount={10} rowsPerPage={3} onChangePage={() => {}} />
        );

        unevenPages.forEach((page) => expect(getByRole('button', { name: `${page + 1}` })).toBeInTheDocument());
    });

    it('renders the prev and next buttons', () => {
        const { getByRole } = render(
            <Pagination currentPage={0} itemsCount={10} rowsPerPage={2} onChangePage={() => {}} />
        );

        expect(getByRole('button', { name: 'next' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'previous' })).toBeInTheDocument();
    });

    it('renders an ellipsis when the number of pages is greater than', () => {
        const { getByTestId } = render(
            <Pagination currentPage={0} itemsCount={20} rowsPerPage={2} onChangePage={() => {}} />
        );

        expect(getByTestId('table-pagination-item-ellipsis')).toBeInTheDocument();
    });

    it('renders the prev button disabled when we are on the first page', () => {
        const { getByRole } = render(
            <Pagination currentPage={0} itemsCount={10} rowsPerPage={2} onChangePage={() => {}} />
        );
        expect(getByRole('button', { name: 'previous' })).toBeDisabled();
    });

    it('renders the next button disabled when we are on the last page', async () => {
        let page = 0;

        const { getByRole, rerender } = render(
            <Pagination
                currentPage={page}
                itemsCount={10}
                rowsPerPage={5}
                onChangePage={(e, changedPage) => {
                    page = changedPage;
                }}
            />
        );

        fireEvent.click(getByRole('button', { name: '2' }));

        rerender(
            <Pagination
                currentPage={page}
                itemsCount={10}
                rowsPerPage={5}
                onChangePage={(e, changedPage) => {
                    page = changedPage;
                }}
            />
        );
        await waitFor(() => {
            expect(getByRole('button', { name: 'next' })).toBeDisabled();
            expect(getByRole('button', { name: '2', current: true })).toBeInTheDocument();
        });
    });
});
