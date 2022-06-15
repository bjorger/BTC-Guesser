import { useAppDispatch, useAppSelector } from "app/hooks";
import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { setUser, UserState } from "features/user/userSlice";

const Header: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    const JWTCookieName = process.env["REACT_APP_JWT_COOKIE_NAME"] || "";

    const [, , removeCookie] = useCookies([JWTCookieName]);
    const dispatch = useAppDispatch();

    const logOut = async () => {
        removeCookie(JWTCookieName);
        dispatch(
            setUser({
                username: "",
                score: 0,
                JWT: "",
                isLoggedIn: false,
                state: UserState.CAN_GUESS,
            }),
        );
    };

    return (
        <Container>
            <Logo>BITCOIN GUESSER</Logo>
            <Score>Your Score: {user.score}</Score>
            <Button type="button" variant="outlined" onClick={() => logOut()}>
                Log Out
            </Button>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    grid-column: 1 / span 24;
    background: ${({ theme }) => theme.palette.white};
    ${({ theme }) => theme.boxShadow};
    height: 100px;
    box-shadow: 5px 5px 12px -2px #000000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
`;

const Logo = styled.div`
    display: none;
    @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
        display: block;
    }
`;

const Score = styled.p`
    text-align: center;
`;
