import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Layout from "common/Layout";
import { a11yProps, TabPanel } from "./TabPanel";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export interface FormData {
    username: string;
    password: string;
    confirmPassword?: string;
}

export default function Login() {
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
                    <LoginForm />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <RegisterForm />
                </TabPanel>
            </LoginBox>
        </Layout>
    );
}

const LoginBox = styled(Box)`
    width: 100%;
    grid-column: 4 / span 18;
    place-self: center;
    min-height: 350px;
    border-radius: 10px;
    box-shadow: 5px 5px 12px -2px #000000;
    background: ${({ theme }) => theme.palette.white};
    padding: 20px;

    @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
        grid-column: 9 / span 7;
        padding: 50px;
    }

    @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.lg}px`}) {
        grid-column: 10 / span 5;
    }
`;

const TabsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
