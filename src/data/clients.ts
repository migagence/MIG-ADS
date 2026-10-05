import laBelleFragrance from '../assets/logos/client-la-belle-fragrance.png';
import attarStudio from '../assets/logos/clients/attar-studio.png';
import beauteInsolente from '../assets/logos/clients/beaute-insolente.png';
import brille from '../assets/logos/clients/brille.png';
import cosmeticHairShop from '../assets/logos/clients/cosmetic-hair-shop.png';
import folieCosmetic from '../assets/logos/clients/folie-cosmetic.png';
import jennah from '../assets/logos/clients/jennah.png';
import joiaParis from '../assets/logos/clients/joia-paris.png';
import klode from '../assets/logos/clients/klode.png';
import lunaeParis from '../assets/logos/clients/lunae-paris.png';
import nonnaLab from '../assets/logos/clients/nonna-lab.png';
import saintFleur from '../assets/logos/clients/saint-fleur.png';
import siho from '../assets/logos/clients/siho.png';
import socup from '../assets/logos/clients/socup.png';
import woodVibe from '../assets/logos/clients/wood-vibe.png';

export type ClientLogo = { name: string; image: ImageMetadata; height: number };

/**
 * Logos clients fournis par MIG (Google Drive, 05/10/2026), normalisés en blanc pour le fond bleu nuit.
 * `height` = hauteur d’affichage (px), ajustée par marque pour un poids visuel équilibré.
 * La Belle Fragrance provient du bandeau de l’ancien site.
 * TODO MIG : un 16ᵉ logo du dossier Drive n’est pas téléchargeable (droits d’accès) et le logo
 * Natural 5 n’est pas exploitable en monochrome (aplat) : les renvoyer en PNG transparent si besoin.
 */
export const clientLogos: ClientLogo[] = [
  { name: 'La Belle Fragrance', image: laBelleFragrance, height: 20 },
  { name: 'Joia Paris', image: joiaParis, height: 30 },
  { name: 'Siho', image: siho, height: 32 },
  { name: 'Attar Studio', image: attarStudio, height: 26 },
  { name: 'Cosmetic Hair Shop', image: cosmeticHairShop, height: 13 },
  { name: 'Lünae Paris', image: lunaeParis, height: 24 },
  { name: 'Klode', image: klode, height: 22 },
  { name: 'Beauté Insolente', image: beauteInsolente, height: 34 },
  { name: 'Brillë', image: brille, height: 22 },
  { name: 'Folie Cosmetic', image: folieCosmetic, height: 15 },
  { name: 'Jennah', image: jennah, height: 18 },
  { name: 'Nonna Lab', image: nonnaLab, height: 16 },
  { name: 'Saint-Fleur', image: saintFleur, height: 24 },
  { name: 'Socup', image: socup, height: 22 },
  { name: 'Wood Vibe', image: woodVibe, height: 18 },
];
