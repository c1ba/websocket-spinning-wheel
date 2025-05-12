import type React from "react";
import { InputContainer, StyledInput, StyledLabel } from "./styles";

type TextInputProps = {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({label, placeholder, onChange, value}) => {
    return <InputContainer>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
    </InputContainer>;
};

export default TextInput;