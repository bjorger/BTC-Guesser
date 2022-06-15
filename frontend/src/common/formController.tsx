import React from "react";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import styled from "styled-components";
import { FormData } from "login";

interface FormControllerProps {
    name: "password" | "username" | "confirmPassword";
    label: string;
    control: Control<FormData, any>;
    minLength?: number;
    required?: boolean;
    helperText?: string;
    type?: React.HTMLInputTypeAttribute;
}

const FormController: React.FC<FormControllerProps> = ({ name, label, control, minLength = 0, required = false, helperText = "", type = "text" }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={{ required, minLength }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <CustomTextField
                    type={type}
                    label={label}
                    variant="filled"
                    value={value?.replace(" ", "")}
                    helperText={helperText}
                    error={!!error}
                    onChange={onChange}
                />
            )}
        />
    );
};

export default FormController;

export const CustomTextField = styled(TextField)`
    margin: 10px 0 !important;
`;
