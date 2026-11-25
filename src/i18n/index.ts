export type Lang = "es" | "en";
export type Section = "home" | "projects" | "about" | "contact" | "cv";
export const sections: Section[] = [
  "home",
  "projects",
  "about",
  "contact",
  "cv",
];
export const labels = {
  es: {
    home: "Inicio",
    projects: "Proyectos",
    about: "Sobre mí",
    contact: "Contacto",
    cv: "CV",
  },
  en: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    cv: "CV",
  },
};
const segments = {
  es: {
    home: "",
    projects: "proyectos",
    about: "sobre-mi",
    contact: "contacto",
    cv: "cv",
  },
  en: {
    home: "",
    projects: "projects",
    about: "about",
    contact: "contact",
    cv: "cv",
  },
};
export function route(lang: Lang, section: Section, slug?: string) {
  const parts = [
    lang === "en" ? "en" : "",
    segments[lang][section],
    slug,
  ].filter(Boolean);
  return parts.length ? "/" + parts.join("/") + "/" : "/";
}
export function translate(lang: Lang, es: string, en: string) {
  return lang === "es" ? es : en;
}
