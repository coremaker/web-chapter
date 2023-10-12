import { MenuClasses } from '@mui/material';
import { ReactNode } from 'react';
import { GenericRowStructure, Row, RowAction } from '../types';
export interface EllipsisCellContentClasses {
    root: string;
    menu: Partial<MenuClasses>;
}
interface EllipsisCellContentProps<T extends GenericRowStructure> {
    row: Row<T>;
    label: string | ReactNode;
    classes?: Partial<EllipsisCellContentClasses>;
    rowActions: RowAction<T>[];
    icon?: ReactNode;
    onMenuOpen?: (row: Row<T>) => void;
    onMenuClose?: (row: Row<T>) => void;
}
declare const EllipsisCellContent: <T extends GenericRowStructure>({ row, label, rowActions, icon, classes, onMenuOpen, onMenuClose, }: EllipsisCellContentProps<T>) => import("react/jsx-runtime").JSX.Element;
export default EllipsisCellContent;
