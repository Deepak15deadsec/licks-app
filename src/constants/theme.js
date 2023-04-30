import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

let wr = (width / 391)
let hr = (height / 812)

export const COLORS = {
    // base colors
    primary: "#30D792", // green
    secondary: "#0C381F",   // dark green

    navigation: "#0C0C0C",

    green: "#66D59A",
    lightGreen: "#E6FEF0",

    lime: "#00BA63",
    emerald: "#2BC978",

    red: "#FF4134",
    lightRed: "#FFF1F0",

    purple: "#6B3CE9",
    lightpurple: "#F3EFFF",

    yellow: "#FFC664",
    lightyellow: "#FFF9EC",

    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#FCFBFC",
    gray: "#C1C3C5",
    darkgray: "#C3C6C7",

    darker: '#000000',
    lighter: '#fff',

    transparent: "transparent",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 18,
    body4: 14,
    body5: 12,
    heading: 16,
    paragraph: 16,
    label: 14,
    coin: 30,
    size12: 12,
    size10: 10,
    size14: wr * 14,
    size16: 16,
    size17: 17,
    size20: 20,
    size24: 24,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Inter-Regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Inter-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Inter-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Inter-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Inter-Bold", fontSize: SIZES.h4, lineHeight: 22 },

    body1: { fontFamily: "Inter-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Inter-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Inter-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Inter-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Inter-Regular", fontSize: SIZES.body5, lineHeight: 22 },

    heading: { fontFamily: "Inter-SemiBold", fontSize: SIZES.heading, lineHeight: 30 },
    paragraph: { fontFamily: "Inter-Medium", fontSize: SIZES.paragraph, lineHeight: 20 },
    label: { fontFamily: "Inter-Regular", fontSize: SIZES.label, lineHeight: 16 },
    coin: { fontFamily: "Inter-SemiBold", fontSize: SIZES.coin, lineHeight: 36 },
    category: { fontFamily: "Inter-Medium", fontSize: SIZES.size12, lineHeight: 14.52 },
    size12s: { fontFamily: "Inter-SemiBold", fontSize: SIZES.size12, lineHeight: 14.52 },
    size12m: { fontFamily: "Inter-Music", fontSize: SIZES.size12, lineHeight: 14.52 },
    size10m: { fontFamily: "Inter-Medium", fontSize: SIZES.size10, lineHeight: 12.1 },
    size14m: { fontFamily: "Inter-Medium", fontSize: SIZES.size14, lineHeight: 16 },
    size14r: { fontFamily: "Inter-Regular", fontSize: SIZES.size14, lineHeight: 16 },
    size16b: { fontFamily: "Inter-Bold", fontSize: SIZES.size16, lineHeight: 19 },
    size17m: { fontFamily: "Inter-Medium", fontSize: SIZES.size17, lineHeight: 21 },
    size16m: { fontFamily: "Inter-Medium", fontSize: SIZES.size16, lineHeight: 19 },
    size20s: { fontFamily: "Inter-SemiBold", fontSize: SIZES.size20, lineHeight: 24 },
    size24b: { fontFamily: "Inter-Bold", fontSize: SIZES.size24},
    size14b: { fontFamily: "Inter-Bold", fontSize: SIZES.size14},
};

export const TYPES = {
    dark: "dark",
    light: "light"
}


const appTheme = { COLORS, SIZES, FONTS, TYPES };

export default appTheme;