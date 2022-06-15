import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    min-height: 100vh;

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

interface LayoutBoxProps {
    placeSelf: "start" | "center";
    minHeight?: string;
}

export const LayoutBox = styled(Box)<LayoutBoxProps>`
    width: 100%;
    grid-column: 3 / span 20;
    place-self: ${({ placeSelf }) => placeSelf};
    min-height: ${({ minHeight }) => (minHeight ? minHeight : "350px")};
    border-radius: 10px;
    ${({ theme }) => theme.boxShadow};
    background: ${({ theme }) => theme.palette.white};
    padding: 0px;

    @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
        grid-column: 10 / span 6;
        padding: 50px;
    }

    @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.lg}px`}) {
        grid-column: 10 / span 5;
    }
`;
