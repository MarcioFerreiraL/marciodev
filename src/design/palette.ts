/**
 * Paleta harmônica (complementar + análogo): azul 220° e marrom 40° são
 * complementares; roxo 260° é análogo ao azul. Neutros tingidos a 40°.
 * Os dois temas são espelhados: mesmas funções, luminosidade invertida.
 */
export const HUES = { purple: 260, blue: 220, brown: 40, neutral: 40 } as const;

export type Theme = "dark" | "light";
export type Role =
  | "bg" | "surface" | "tag" | "border" | "text" | "muted"
  | "purple" | "blue" | "brown" | "onPurple";

export const palette: Record<Theme, Record<Role, string>> = {
  dark: {
    bg: "#15130F", surface: "#201D18", tag: "#2F291E", border: "#3A352C",
    text: "#EEEAE2", muted: "#B1ABA0",
    purple: "#B797F7", blue: "#7BA3F4", brown: "#CAAD72", onPurple: "#211736",
  },
  light: {
    bg: "#F9F6F1", surface: "#F1EDE4", tag: "#E8DFCF", border: "#DBD4C7",
    text: "#1E1B15", muted: "#655F53",
    purple: "#6231C4", blue: "#194CB3", brown: "#6B5324", onPurple: "#FFFFFF",
  },
};

const cssName = (role: Role) => `--c-${role.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

/** Declarações CSS (`--c-bg:#15130F;…`) de um tema. */
export function toCssVars(theme: Theme): string {
  return (Object.entries(palette[theme]) as [Role, string][])
    .map(([role, hex]) => `${cssName(role)}:${hex}`)
    .join(";");
}
