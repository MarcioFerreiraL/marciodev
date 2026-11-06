import Clinics from "./Clinics.astro";
import Barbearia from "./Barbearia.astro";
import AssistenciaTecnica from "./AssistenciaTecnica.astro";
import Urbansense from "./Urbansense.astro";
import LanchoneteGordinha from "./LanchoneteGordinha.astro";
import Observatorio from "./Observatorio.astro";

/** Banner ilustrado de cada projeto, pelo id (nome do arquivo em src/content/projetos). */
export const banners: Record<string, typeof Clinics> = {
  clinics: Clinics,
  barbearia: Barbearia,
  "assistencia-tecnica": AssistenciaTecnica,
  urbansense: Urbansense,
  "lanchonete-gordinha": LanchoneteGordinha,
  "observatorio-upe": Observatorio,
};
