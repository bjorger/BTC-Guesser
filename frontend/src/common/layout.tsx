import React from "react";
import styled from "styled-components";

interface LayoutProps {
    fullScreen?: boolean;
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, fullScreen = false }) => {
    return <Container fullScreen={fullScreen}>{children}</Container>;
};

export default Layout;

interface ContainerProps {
    fullScreen: boolean;
}

const Container = styled.div<ContainerProps>`
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    min-height: ${({ fullScreen }) => (fullScreen ? "100vh" : "")};

    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;
