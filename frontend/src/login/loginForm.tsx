import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FormData } from "./registerForm";
import { useCookies } from "react-cookie";
import { setUser, User } from "features/user/userSlice";
import Notification from "common/notification";
import { AWSEndpoint, JWTCookieName, FormController ,ERROR_COULD_NOT_LOG_USER_IN} from "common";

const LoginForm: React.FC = () => {
    const url = `${AWSEndpoint}/login-user`;

    const dispatch = useAppDispatch();
    const { control, handleSubmit } = useForm<FormData>();
    const [cookies, setCookie] = useCookies([JWTCookieName]);

    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
    const [openError, setOpenError] = React.useState<boolean>(false);
    const [openLogin, setOpenLogin] = React.useState<boolean>(false);
    const [disableButton, setDisableButton] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>(ERROR_COULD_NOT_LOG_USER_IN);

    React.useEffect(() => {
        (async () => {
            if (!(JWTCookieName in cookies)) {
                return;
            }

            setOpenLogin(true);

            try {
                setDisableButton(true);
                const JWT = cookies[JWTCookieName];

                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${JWT}` },
                });

                if (response.status === 201) {
                    const { username, state, score } = await response.json();

                    const user: User = {
                        username,
                        state,
                        score,
                        JWT,
                        isLoggedIn: true,
                    };

                    setCookie(JWTCookieName, JWT);
                    dispatch(setUser(user));
                    setOpenSuccess(true);
                } else {
                    const errorText = await response.text();
                    if (errorText) {
                        setErrorMessage(errorText);
                    }
                    setOpenError(true);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setDisableButton(false);
                setOpenLogin(false);
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
                const { JWT, user } = await response.json();

                const userState: User = {
                    ...user,
                    JWT,
                    isLoggedIn: true,
                };
                setCookie(JWTCookieName, JWT);
                dispatch(setUser(userState));
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
            <Notification open={openSuccess} setOpen={setOpenSuccess} message="Successfully logged in! :)" severity="success" />
            <Notification open={openError} setOpen={setOpenError} message={errorMessage} severity="error" />
            <Notification open={openLogin} setOpen={setOpenLogin} message="Logging you in..." severity="info" />
        </>
    );
};

export default LoginForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
