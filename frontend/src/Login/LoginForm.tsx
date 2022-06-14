import { Button } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import FormController from "common/FormController";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FormData } from "./RegisterForm";

const LoginForm: React.FC = () => {
    const AWSEndpoint = process.env.REACT_APP_AWS_ENDPOINT || "";

    const dispatch = useAppDispatch();
    //dispatch(decrement()

    const { control, handleSubmit } = useForm<FormData>();

    const onLogin = handleSubmit(async (data: FormData) => {
        const url = `${AWSEndpoint}/create-user`;
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            const user = await response.json();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Form onSubmit={onLogin}>
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
            <Button variant="contained" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
