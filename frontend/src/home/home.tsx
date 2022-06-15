import { Layout, LayoutBox } from "common";

import React from "react";
import styled from "styled-components";
import Header from "./header";
import { Button } from "@mui/material";

interface Bitcoin {
    market_data: { current_price: { eur: string } };
}

const Home: React.FC = () => {
    const coingeckoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";
    const [bitcoinPrice, setBitcoinPrice] = React.useState<number>(0);

    const fetchBitcoinPrice = async (): Promise<void> => {
        const response = await fetch(coingeckoURL, {
            method: "GET",
        });

        if (response.status === 200) {
            const bitcoinPriceFromAPI = (await response.json()) as Bitcoin;
            setBitcoinPrice(+bitcoinPriceFromAPI.market_data.current_price.eur);
        }
    };

    const getBitcoinPrice = async (): Promise<void> => {
        await setTimeout(async () => {
            await fetchBitcoinPrice();
        }, 10000);
    };

    React.useEffect(() => {
        (async () => fetchBitcoinPrice())();
        (async () => getBitcoinPrice())();
    }, [getBitcoinPrice]);

    return (
        <Layout>
            <Header />
            <LayoutBox placeSelf="start">
                <Content>
                    <h1>1 BTC = {bitcoinPrice}€</h1>
                    <ButtonContainer>
                        <GuessButton variant="contained">Up</GuessButton>
                        <GuessButton variant="contained">Down</GuessButton>
                    </ButtonContainer>
                </Content>
            </LayoutBox>
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
