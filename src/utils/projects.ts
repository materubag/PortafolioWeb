import { getCollection } from "astro:content";
import type { Lang } from "../i18n";
export async function projectsFor(lang: Lang) {
  const entries = await getCollection(
    "projects",
    ({ data }) => data.lang === lang,
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}
