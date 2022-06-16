import React from "react";
import {
    Bitcoin,
    Layout,
    LayoutBox,
    USER_HINT_PRICE_DID_NOT_CHANGE,
    USER_HINT_GUESSING,
    USER_HINT_GUESS_FAILURE,
    USER_HINT_GUESS_SUCCESS,
    USER_HINT_START,
    ERROR_SOMETHING_WENT_WRONG,
} from "common";
import styled from "styled-components";
import Header from "./header";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { AWSEndpoint, JWTCookieName, Notification, GuessOptions } from "common";
import { useCookies } from "react-cookie";
import { UserState, setState, setScore } from "features/user/userSlice";

const Home: React.FC = () => {
    const url = `${AWSEndpoint}/place-guess`;
    const urlGetUser = `${AWSEndpoint}/get-user`;

    const coinCapURL = "https://api.coincap.io/v2/assets/bitcoin";
    const user = useAppSelector((state) => state.user);
    const [bitcoinPrice, setBitcoinPrice] = React.useState<number>(0);
    const [disableButtons, setDisableButtons] = React.useState<boolean>(false);
    const [cookies] = useCookies([JWTCookieName]);
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
    const [openError, setOpenError] = React.useState<boolean>(false);
    const [openResults, setOpenResults] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [userHint, setUserHint] = React.useState<string>(USER_HINT_START);
    const [errorMessage, setErrorMessage] = React.useState<string>(ERROR_SOMETHING_WENT_WRONG);

    const pollResult = async () => {
        await setInterval(async () => {
            try {
                const result = await fetch(urlGetUser, {
                    method: "POST",
                    body: JSON.stringify({ username: user.username }),
                });

                if (result.status === 201) {
                    const { score, state } = await result.json();
                    if (state === UserState.CAN_GUESS) {
                        setOpenResults(true);

                        if (score > user.score) {
                            setUserHint(USER_HINT_GUESS_SUCCESS);
                        } else if (score === user.score) {
                            setUserHint(USER_HINT_PRICE_DID_NOT_CHANGE);
                        } else {
                            setUserHint(USER_HINT_GUESS_FAILURE);
                        }

                        dispatch(setScore(score));
                        dispatch(setState(UserState.CAN_GUESS));
                        return;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }, 15000);
    };

    const fetchBitcoinPrice = async (): Promise<void> => {
        const response = await fetch(coinCapURL, {
            method: "GET",
            redirect: "follow",
        });

        if (response.status === 200) {
            const bitcoinPrice = (await response.json()) as Bitcoin;

            setBitcoinPrice(Number.parseFloat(bitcoinPrice.data.priceUsd));
        }
    };

    const getBitcoinPrice = async (): Promise<void> => {
        await setInterval(async () => {
            await fetchBitcoinPrice();
        }, 10000);
    };

    const placeGuess = async (guess: GuessOptions): Promise<void> => {
        if (user.state === UserState.GUESSING) {
            return;
        }

        if (!(JWTCookieName in cookies)) {
            return;
        }

        try {
            setDisableButtons(true);

            const JWT = cookies[JWTCookieName];
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${JWT}` },
                body: JSON.stringify({ guess }),
            });

            if (response.status === 201) {
                setOpenSuccess(true);
                const { userState } = await response.json();
                dispatch(setState(userState));
                setUserHint(USER_HINT_GUESSING);
                await pollResult();
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
            setDisableButtons(false);
        }
    };

    React.useEffect(() => {
        if (user.state === UserState.GUESSING) {
            (async () => pollResult())();
        }
        (async () => fetchBitcoinPrice())();
        (async () => getBitcoinPrice())();
    }, [getBitcoinPrice, fetchBitcoinPrice]);

    return (
        <Layout>
            <Header />
            <LayoutBox placeSelf="start" minHeight="100px">
                <Content>
                    <UserHint>{userHint}</UserHint>
                </Content>
            </LayoutBox>
            <LayoutBox placeSelf="start">
                <Content>
                    <BitcoinPrice>1 BTC = {bitcoinPrice.toFixed(2)}$</BitcoinPrice>
                    <ButtonContainer>
                        <GuessButton variant="contained" disabled={disableButtons || user.state === 1} onClick={() => placeGuess(GuessOptions.UP)}>
                            Up
                        </GuessButton>
                        <GuessButton variant="contained" disabled={disableButtons || user.state === 1} onClick={() => placeGuess(GuessOptions.DOWN)}>
                            Down
                        </GuessButton>
                    </ButtonContainer>
                </Content>
            </LayoutBox>
            <Notification message="Made guess successfully! :-)" severity="success" open={openSuccess} setOpen={setOpenSuccess} />
            <Notification open={openError} setOpen={setOpenError} message={errorMessage} severity="error" />
            <Notification message="Your results just came in! :-)" severity="info" open={openResults} setOpen={setOpenResults} />
        </Layout>
    );
};

export default Home;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const UserHint = styled.p`
    text-align: center;
    padding: 20px;
`;

const ButtonContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GuessButton = styled(Button)`
    margin: 10px 0 !important;
    width: 90%;
`;

const BitcoinPrice = styled.h1`
    margin-top: 50px;
`;
