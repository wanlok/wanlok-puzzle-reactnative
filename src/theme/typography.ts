type FontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "normal"
  | "bold";

type TypographyStyle = {
  fontSize: number;
  fontWeight: FontWeight;
};

export const typography: Record<string, TypographyStyle> = {
  h1: {
    fontSize: 96,
    fontWeight: "400",
  },
  h2: {
    fontSize: 60,
    fontWeight: "400",
  },
  h3: {
    fontSize: 48,
    fontWeight: "400",
  },
  h4: {
    fontSize: 34,
    fontWeight: "400",
  },
  h5: {
    fontSize: 24,
    fontWeight: "400",
  },
  h6: {
    fontSize: 20,
    fontWeight: "400",
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: "400",
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: "400",
  },
  body1: {
    fontSize: 16,
    fontWeight: "400",
  },
  body2: {
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    fontSize: 14,
    fontWeight: "400",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
  },
  overline: {
    fontSize: 12,
    fontWeight: "400",
  },
};
