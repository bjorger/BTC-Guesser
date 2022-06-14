import { css, FlattenInterpolation, SimpleInterpolation, ThemeProps } from "styled-components/macro";

interface Breakpoints {
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

interface Palette {
    white: string;
}

interface Fonts {}

interface Theme {
    breakpoints: Breakpoints;
    palette: Palette;
    fonts: Fonts;
}

const breakpoints: Breakpoints = {
    sm: 600,
    md: 1200,
    lg: 1460,
    xl: 1600,
};

const theme: Theme = {
    breakpoints,
    palette: {
        white: "#FFFFFF",
    },
    fonts: {},
};

export default theme;
