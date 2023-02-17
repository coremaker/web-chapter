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
	// const buttonClasses = classNames(
	// 	"text-center rounded text-title-m font-title",
	// 	{
	// 		"w-full": fullWidth,
	// 		"py-2": variant === "contained" || variant === "outlined",
	// 		"disabled:bg-primary-300": props.disabled,
	// 		"bg-transparent border border-ink text-ink-500": variant === "outlined",
	// 		[`bg-${bgColor}`]: bgColor && variant === "contained",
	// 		[`font-title text-body-l hover:underline`]: variant === "ghost",
	// 		[`text-${textColor}`]: textColor,
	// 	},
	// 	className
	// );

	return <MuiButton {...props}>{children || text}</MuiButton>;
};

export default Button;
