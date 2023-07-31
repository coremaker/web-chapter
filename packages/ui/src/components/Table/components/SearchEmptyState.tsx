import { TableCell, TableRow } from '@mui/material';

const SearchEmptyState = () => {
    return (
        <TableRow>
            <TableCell
                colSpan={1000000}
                sx={{
                    textAlign: 'center',
                }}
            >
                No results found
            </TableCell>
        </TableRow>
    );
};

export default SearchEmptyState;
