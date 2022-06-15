# Description

This is a simple app, that lets the user guess on the trend of Bitcoin ($BTC). To realize that, the app is completely serverless using AWS lambda functions in combination with step functions.

## How it works

The user makes a guess on the Bitcoin trend behavior of the next 60 seconds. The user can either decide if the trend goes up or down. After 60 seconds a AWS lambda functions will evaluate the users decision, by comparing the Bitcoin price at the time of the guess, the Bitcoin price after 60 seconds and the guess (either UP or DOWN) of the user.
After evaluating, the user score will be either increased by 1 (correct guess) or decreased by 1 (incorrect guess).
Also, to put a constraint on the user and prohibit extensive use of the API, each user will only be allowed to make a guess every 60 seconds.

The Bitcoin price data is fetched from the CoinGecko API.

Before a user can start, each user has to create an account. A user name is unique and cannot occur twice. After each successful logging a issue receives a JWT, with an infinite duration, which will be stored as a cookie. When the user logs out of the application, the JWT will be deleted.

The following constraints are active for creating a user:

-   A username must be atleast 7 characters long
-   A username cannot contain any whitespace
-   A password must be atleast 7 characters long
-   A password cannot contain any whitespace

# Backend

The backend is completely serverless and has been implemented using AWS lambda functions and step functions.
The stack consists as follows:

-   AWS lambda
-   AWS step function
-   NodeJS 12.x
-   TypeScript 4
-   bcrypt
-   jsonwebtoken
-   SAM (Serverless Application Model)
-   Mocha
-   Istanbul

# Frontend

The frontend is a simple React Application with Typescript.
The stack consists as follows:

-   ReactTS
-   Typescript 4
-   StyledComponents
-   Material UI
-   Redux
-   GitHub Pages for hosting
