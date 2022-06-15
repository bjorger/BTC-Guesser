import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Layout, LayoutBox } from "common";
import TabPanel, { a11yProps } from "./tabPanel";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export interface FormData {
    username: string;
    password: string;
    confirmPassword?: string;
}

const Login: React.FC = () => {
    const [tab, setTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Layout>
            <LayoutBox placeSelf="center">
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
            </LayoutBox>
        </Layout>
    );
};

export default Login;

const TabsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
