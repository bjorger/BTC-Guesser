import { TextField, Button, Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Layout from "../common/Layout";
import { a11yProps, TabPanel } from "./TabPanel";

interface FormData {
    username: string;
    password: string;
    confirm_password?: string;
}

export default function Login() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onLogin = handleSubmit((data) => console.log(data));
    const onRegister = handleSubmit((data) => console.log(data));

    const [tab, setTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Layout>
            <LoginBox>
                <TabsContainer sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Login" {...a11yProps(0)} />
                        <Tab label="Register" {...a11yProps(1)} />
                    </Tabs>
                </TabsContainer>
                <TabPanel value={tab} index={0}>
                    <Form onSubmit={onLogin}>
                        <CustomTextField {...(register("username"), { required: true })} variant="outlined" label="Username" />
                        <CustomTextField {...(register("password"), { required: true })} variant="outlined" label="Password" />
                        <Button variant="contained" type="button">
                            Login
                        </Button>
                    </Form>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Form onSubmit={onRegister}>
                        <CustomTextField {...(register("username"), { required: true })} variant="outlined" label="Username" />
                        <CustomTextField {...(register("password"), { required: true })} variant="outlined" label="Password" />
                        <CustomTextField {...(register("confirm_password"), { required: true })} variant="outlined" label="Password" />

                        <Button variant="contained" type="button">
                            Register
                        </Button>
                    </Form>
                </TabPanel>
            </LoginBox>
        </Layout>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const LoginBox = styled(Box)`
    width: 100%;
    grid-column: 10 / span 6;
    place-self: center;
    height: 300px;
    border-radius: 10px;
    box-shadow: 5px 5px 12px -2px #000000;
    padding: 50px;
`;

const TabsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CustomTextField = styled(TextField)`
    margin: 10px 0 !important;
`;
