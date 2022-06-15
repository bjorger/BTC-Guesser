export const AWSEndpoint = process.env.REACT_APP_AWS_ENDPOINT || "";
export const JWTCookieName = process.env["REACT_APP_JWT_COOKIE_NAME"] || "";
export const USER_HINT_START =
    "To make a guess of the Bitcoin trend hit either UP or DOWN. After your guess has been placed, it will be evaluated in the next 60 seconds.";
export const USER_HINT_GUESSING =
    "Your guess has been accepted! This page will update itself and inform you if your guess was either successful or not.";
export const USER_HINT_GUESS_SUCCESS = "Your guess was a success! Check your score to see how many points you have.";
export const USER_HINT_GUESS_FAILURE = "Better luck next time! :-(";
