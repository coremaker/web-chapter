import { ReactNode } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
    text?: string;
    children?: ReactNode;
}

const Button = ({ text, children, className, href, fullWidth = false, ...props }: ButtonProps) => {
    return <MuiButton {...props}>{children || text}</MuiButton>;
};

export default Button;
