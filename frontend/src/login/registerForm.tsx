import React from "react";
import { Button } from "@mui/material";
import { FormController, CustomTextField, Notification } from "common";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";

export interface FormData {
    username: string;
    password: string;
    confirmPassword?: string;
}

const RegisterForm: React.FC = () => {
    const AWSEndpoint = process.env.REACT_APP_AWS_ENDPOINT || "";
    const url = `${AWSEndpoint}/create-user`;

    const { control, handleSubmit, reset } = useForm<FormData>();
    const [passwordError, setPasswordError] = React.useState<boolean>(false);
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
    const [openError, setOpenError] = React.useState<boolean>(false);
    const [disableButton, setDisableButton] = React.useState<boolean>(false);

    const onRegister = handleSubmit(async (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            setPasswordError(true);
            return;
        }

        try {
            setDisableButton(true);

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                reset({
                    username: "",
                    password: "",
                    confirmPassword: "",
                });

                setOpenSuccess(true);
            } else {
                setOpenError(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDisableButton(false);
        }
    });

    return (
        <>
            <Form onSubmit={onRegister}>
                <FormController
                    name="username"
                    control={control}
                    label="Username"
                    helperText="Username must be atleast 7 characters long"
                    required
                    minLength={7}
                />
                <FormController
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                    helperText="Password must be atleast 7 characters long"
                    required
                    minLength={7}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{ required: true, minLength: 7 }}
                    render={({ field: { onChange, value } }) => (
                        <CustomTextField
                            type="password"
                            label="Confirm Password"
                            variant="filled"
                            value={value?.replace(" ", "")}
                            helperText={passwordError ? "Passwords must be equal" : " "}
                            error={passwordError}
                            onChange={onChange}
                        />
                    )}
                />
                <Button variant="contained" type="submit" disabled={disableButton}>
                    Register
                </Button>
            </Form>
            <Notification open={openSuccess} setOpen={setOpenSuccess} message="Successfully created Account!" severity="success" />
            <Notification open={openError} setOpen={setOpenError} message="Error while creating Account!" severity="error" />
        </>
    );
};

export default RegisterForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
