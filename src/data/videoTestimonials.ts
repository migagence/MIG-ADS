import posterLeo from '../assets/video/poster-video-a.webp';
import posterJulien from '../assets/video/poster-video-b.webp';
import posterAmbre from '../assets/video/poster-lunae-paris.webp';

export type VideoTestimonial = {
  id: string;
  /** Citation reprise verbatim de la vidéo. Vide = carte en attente de la vidéo. */
  quote: string;
  name: string;
  company: string;
  /** Lien vers la boutique du client. */
  url?: string;
  poster: ImageMetadata;
  /**
   * Vidéo du témoignage : mp4 servi depuis /public/video ou identifiant Wistia.
   * Tant que `video` est absent, la carte affiche « Vidéo en cours de mise en ligne ».
   */
  video?: { src: string; type: 'mp4' | 'wistia' };
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'leo-eziclic',
    quote: 'Ça a porté ses fruits quasi immédiatement : on a commencé à être rentables directement avec Google Ads et Google Shopping.',
    name: 'Leo',
    company: 'EziClic',
    url: 'https://eziclic.com/',
    poster: posterLeo,
    video: { src: '/video/temoignage-leo-eziclic.mp4', type: 'mp4' },
  },
  {
    id: 'julien-dalicences',
    quote: 'Je suis passé de 200-300 € par jour à 1 500-2 000 € par jour. Je dépense en pub, mais je suis plus que rentable.',
    name: 'Julien',
    company: 'Da Licences',
    url: 'https://dalicences.fr/',
    poster: posterJulien,
    video: { src: '/video/temoignage-julien-dalicences.mp4', type: 'mp4' },
  },
  {
    // TODO MIG : vidéo d’Ambre à fournir (3ᵉ témoignage annoncé le 05/10/2026).
    id: 'ambre-lunae-paris',
    quote: '',
    name: 'Ambre',
    company: 'Lünae Paris',
    url: 'https://lunae-paris.com/',
    poster: posterAmbre,
  },
];
