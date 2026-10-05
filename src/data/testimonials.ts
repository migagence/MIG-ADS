import jeanChristophe from '../assets/people/jean-christophe-gadrat.png';
import mariam from '../assets/people/mariam-gassama.png';
import joia from '../assets/people/joia-paris-logo.png';
import gaby from '../assets/people/gaby-baillargeaux.png';
import newlife from '../assets/people/newlife-logo.png';
import mouna from '../assets/people/mouna-lascar.png';
import sandrine from '../assets/people/sandrine-wagner.png';

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  image: ImageMetadata;
  imageAlt: string;
  /** Témoignage mis en avant en tête de section. */
  featured?: boolean;
  /** Chiffre mis en avant, repris tel quel de la citation. */
  stat?: { value: string; label: string };
};

/**
 * Témoignages repris mot pour mot de la landing page actuelle (orthographe d’origine conservée).
 * Ordre d’affichage : le premier est mis en avant, puis les suivants dans l’ordre (les 4 premiers sont affichés).
 */
export const testimonials: Testimonial[] = [
  {
    id: 'johanna-saada',
    featured: true,
    stat: { value: '250K€ → +650K€', label: 'de CA en 6 mois de collaboration' },
    quote:
      'En passant de 250 000€ à +650 000€ de CA en 6 mois de collaboration, je ne peux que recommander leurs services! Un travail de professionnel sur tous les domaines : site web, ads et les mails… Merci à Matthieu et Ismaël !',
    name: 'Johanna Saada',
    role: 'Propriétaire',
    company: 'Joia Paris',
    image: joia,
    imageAlt: 'Logo Joia Paris',
  },
  {
    id: 'jean-christophe-gadrat',
    quote:
      'Avec MIG, en seulement 8 mois je suis passé de 4 000€ à 40 000€ de CA avec la refonte de mon site web et les optimisations sur la partie email marketing. Je recommande fortement, FONCÉS.',
    name: 'Jean-Christophe Gadrat',
    role: 'Fondateur',
    company: 'Siho',
    image: jeanChristophe,
    imageAlt: 'Portrait de Jean-Christophe Gadrat',
  },
  {
    id: 'mariam-gassama',
    quote:
      'Super satisfaite de toute l’équipe qui on su me créer un site internet de qualité franchement même mes proches sont choqués du rendu de mon site. Équipe professionnelle disponible à l’écoute et toujours prête à satisfaire nos attentes. Je recommande vraiment.',
    name: 'Mariam Gassama',
    role: 'Fondatrice',
    company: 'Body Suite',
    image: mariam,
    imageAlt: 'Portrait de Mariam Gassama',
  },
  {
    id: 'julien-olivier',
    quote:
      'Je recommande MIG +++ pour leur écoute attentive envers leurs clients, leur disponibilité et leur dynamisme. Ils accompagnent véritablement votre projet, allant au-delà de la simple prestation. Ils s’impliquent activement, cherchant à comprendre votre vision et vos valeurs pour mieux saisir l’essence de votre marque et la sublimer.',
    name: 'Julien Olivier',
    role: 'Fondateur',
    company: 'New Life',
    image: newlife,
    imageAlt: 'Logo Newlife',
  },
  {
    id: 'sandrine-wagner',
    quote:
      'J’ai fait appel à MIG dès mon lancement d’activité. Ils ont directement compris les enjeux et ont su nous proposer une marche à suivre. Grâce à eux nous avons gagné des mois de travail. Au-delà du professionnel c’est aussi une relation humaine qui s’est installée. Ils n’hésitent pas à surdélivrer et à donner sans rien attendre en retour. De véritables experts et passionnés qui sont disponibles tous les jours de la semaine avec qui on peut échanger constamment.',
    name: 'Sandrine Wagner',
    role: 'Fondatrice',
    company: 'Lotica',
    image: sandrine,
    imageAlt: 'Portrait de Sandrine Wagner',
  },
  {
    id: 'mouna-lascar',
    quote:
      'Équipe très compétente, même pour des personnes qui n’ont aucune expérience dans la création de marque, il s’occupe de tout de A à Z, grâce à eux avec un défit ma marque a vu le jour en 6 mois sans aucun problème, personnes de grande confiance disponibles, rassurants et toujours à l’écoute de leurs clients, je recommande vivement MIG vous pouvez y aller les yeux fermés, en tout cas je parlerai d’eux avec grande fierté, satisfaction et sans anonymat.',
    name: 'Mouna Lascar',
    role: 'Fondatrice',
    company: 'GUINEA',
    image: mouna,
    imageAlt: 'Portrait de Mouna Lascar',
  },
  {
    id: 'gaby-baillargeaux',
    quote:
      'J’ai été en contact avec MIG pour refaire le site internet de la marque pour laquelle je travaille. Non seulement le tarif était plus qu’abordable pour la qualité du travail fourni et le temps passé, mais en plus l’équipe a été réactive, à l’écoute et flexible. Le résultat a été bien au-delà des mes attentes grâce à leur force de proposition et à leurs conseils bienveillants. Je recommande vivement et je referai sans hésitation appelle à eux pour leurs services.',
    name: 'Gaby Baillargeaux',
    role: 'Responsable Marketing',
    image: gaby,
    imageAlt: 'Portrait de Gaby Baillargeaux',
  },
];
