import { Alert, Button, Snackbar } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { FormController } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FormData } from "./registerForm";
import { useCookies } from "react-cookie";
import { setJWT, setLoggedIn } from "features/user/userSlice";

const LoginForm: React.FC = () => {
    const AWSEndpoint = process.env["REACT_APP_AWS_ENDPOINT"] || "";
    const JWTCookieName = process.env["REACT_APP_JWT_COOKIE_NAME"] || "";
    const url = `${AWSEndpoint}/login-user`;

    const dispatch = useAppDispatch();
    const { control, handleSubmit } = useForm<FormData>();
    const [cookies, setCookie] = useCookies([JWTCookieName]);

    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
    const [openError, setOpenError] = React.useState<boolean>(false);
    const [disableButton, setDisableButton] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async () => {
            if (JWTCookieName in cookies) {
                const JWT = cookies[JWTCookieName];

                try {
                    setDisableButton(true);
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${JWT}` },
                    });

                    if (response.status === 201) {
                        const { JWT } = await response.json();
                        setCookie(JWTCookieName, JWT);
                        dispatch(setJWT(JWT));
                        dispatch(setLoggedIn(true));
                        setOpenSuccess(true);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setDisableButton(false);
                }
            }
        })();
    }, []);

    const onLogin = handleSubmit(async (data: FormData) => {
        try {
            setDisableButton(true);
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                const { JWT } = await response.json();
                setCookie(JWTCookieName, JWT);
                dispatch(setJWT(JWT));
                dispatch(setLoggedIn(true));
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
                <Button variant="contained" type="submit" disabled={disableButton}>
                    Login
                </Button>
            </Form>
            <Snackbar open={openSuccess} autoHideDuration={6000}>
                <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
                    Successfully logged in! :)
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000}>
                <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: "100%" }}>
                    Oops! Something went wrong! :(
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
