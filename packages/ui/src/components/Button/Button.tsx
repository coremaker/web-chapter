import { ReactNode } from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface ButtonProps extends MuiButtonProps {
	// Tag?: "button" | "a";
	text?: string;
	children?: ReactNode;
	// variant?: ButtonVariant;
	// href?: string;
	// fullWidth?: boolean;
}

const Button = ({
	text,
	children,
	className,
	href,
	fullWidth = false,
	// Tag = "button",
	...props
}: ButtonProps) => {
	return <MuiButton {...props}>{children || text}</MuiButton>;
};

export default Button;
