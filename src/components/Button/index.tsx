import type React from "react";
import { StyledButton } from "./styles";

type ButtonProps = {
    label: string;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({label, onClick, disabled}) => {
    const onButtonClick = (e: React.MouseEvent) => {
        if (disabled) {
            return;
        }
        onClick?.(e);
    }
    return <StyledButton type="button" aria-label={`${label}`} onClick={onButtonClick} disabled={disabled}>{label}</StyledButton>
}

export default Button;