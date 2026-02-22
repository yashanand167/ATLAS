export type Theme =
    | "Nova"
    | "Orion"
    | "Arctic"
    | "High Contrast"
    | "Aurora"
    | "Sunset"
    | "Deep Ocean"
    | "Gold"
    | "???"
    | "Nova X";

export type ThemeStore = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}